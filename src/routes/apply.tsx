import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Info, Upload, X } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { emailRow, sendLeadEmail } from "@/lib/email.server";

export const Route = createFileRoute("/apply")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as {
          form?: Record<string, unknown>;
          files?: Record<string, string[]>;
        };
        const form = body.form || {};
        if (!String(form.legalName || "").trim() || !String(form.email || "").trim()) {
          return Response.json({ error: "Business name and email are required." }, { status: 400 });
        }
        try {
          const fields = [
            "legalName",
            "primaryContact",
            "email",
            "bizPhone",
            "amountRequested",
            "ownershipType",
            "merchantType",
            "avgGrossSales",
            "avgCardSales",
          ];
          const rows = fields.map((field) => emailRow(field, form[field]));
          const files = body.files || {};
          rows.push(
            emailRow(
              "Uploaded files",
              Object.entries(files)
                .map(([key, values]) => `${key}: ${values.join(", ") || "none"}`)
                .join(" | "),
            ),
          );
          await sendLeadEmail(`New funding application from ${form.legalName}`, rows);
          return Response.json({ success: true });
        } catch (error) {
          console.error(error);
          return Response.json(
            { error: "We could not submit your application. Please try again shortly." },
            { status: 500 },
          );
        }
      },
    },
  },
  head: () => ({
    meta: [
      { title: "Apply — Smallbizloanz" },
      {
        name: "description",
        content:
          "Apply online for small business funding. A short, secure application with minimal paperwork.",
      },
      { property: "og:title", content: "Apply — Smallbizloanz" },
      {
        property: "og:description",
        content: "Apply online for small business funding in minutes.",
      },
    ],
  }),
  component: ApplyPage,
});

const steps = [
  "Business",
  "Ownership",
  "Profile",
  "Funding",
  "Documents",
  "Sign & submit",
] as const;

const ACCEPTED = ".pdf,.jpg,.jpeg,.png";
const MAX_MB = 15;

function ApplyPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm());
  const [bankStmts, setBankStmts] = useState<File[]>([]);
  const [contract, setContract] = useState<File[]>([]);
  const [supporting, setSupporting] = useState<File[]>([]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  function validateStep(): string | null {
    if (step === 0) {
      const req: (keyof typeof form)[] = [
        "legalName",
        "address",
        "city",
        "state",
        "zip",
        "bizPhone",
        "taxId",
        "primaryContact",
        "email",
        "dateStarted",
      ];
      for (const k of req)
        if (!String(form[k] ?? "").trim()) return "Please complete all required fields.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email address.";
    }
    if (step === 1) {
      const req: (keyof typeof form)[] = [
        "ownerName",
        "ownerPhone",
        "ownerAddress",
        "ownerCity",
        "ownerState",
        "ownerZip",
        "ownerDob",
        "ownerSsn",
        "ownership",
        "ownerTitle",
      ];
      for (const k of req)
        if (!String(form[k] ?? "").trim()) return "Please complete all required fields.";
      const pct = Number(form.ownership);
      if (isNaN(pct) || pct <= 0 || pct > 100) return "Please enter a valid ownership percentage.";
    }
    if (step === 2) {
      if (!form.ownershipType) return "Please select an ownership type.";
      if (!form.merchantType) return "Please select a merchant type.";
      if (form.merchantType === "Other" && !form.merchantOther.trim())
        return "Please describe your merchant type.";
    }
    if (step === 3) {
      if (!form.amountRequested.trim()) return "Please enter the amount requested.";
      if (!form.avgCardSales.trim() || !form.avgGrossSales.trim())
        return "Please complete the sales fields.";
      if (form.usedAdvance === "yes") {
        if (
          !form.prevCompany.trim() ||
          !form.origBalance.trim() ||
          !form.currentBalance.trim() ||
          !form.currentPayment.trim()
        )
          return "Please complete the previous funding fields.";
      }
    }
    if (step === 4) {
      if (bankStmts.length === 0)
        return "Please upload your six months of business bank statements.";
    }
    if (step === 5) {
      if (!form.signName.trim() || !form.signature.trim() || !form.signDate.trim())
        return "Please provide your legal name, electronic signature, and date.";
      if (!form.consent) return "Please check the authorization to submit.";
    }
    return null;
  }

  function next() {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const response = await fetch("/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          files: {
            bankStatements: bankStmts.map((file) => file.name),
            contracts: contract.map((file) => file.name),
            supporting: supporting.map((file) => file.name),
          },
        }),
      });
      if (!response.ok) throw new Error("Application submission failed");
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitting(false);
      setError("We could not submit your application. Please try again or contact us directly.");
    }
  }

  if (submitted) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/15 text-brand">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight">Application Received</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you. Your application has been submitted successfully. A representative will
            review your information and contact you regarding the next steps.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Business Funding Application
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Step {step + 1} of {steps.length} — {steps[step]}. Fields marked{" "}
            <span className="text-destructive">*</span> are required.
          </p>
          <Link to="/faq" className="mt-2 inline-flex text-sm font-medium text-brand hover:underline">
            Have questions? Read the FAQ.
          </Link>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 hidden flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground sm:flex">
            {steps.map((s, i) => (
              <span key={s} className={i === step ? "font-medium text-foreground" : ""}>
                {i + 1}. {s}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-4">
              <SectionTitle>Business information</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <F
                  label="Legal / corporate business name"
                  required
                  v={form.legalName}
                  on={(v) => set("legalName", v)}
                />
                <F label="DBA" v={form.dba} on={(v) => set("dba", v)} />
              </div>
              <F label="Physical address" required v={form.address} on={(v) => set("address", v)} />
              <div className="grid gap-4 sm:grid-cols-3">
                <F label="City" required v={form.city} on={(v) => set("city", v)} />
                <F label="State" required v={form.state} on={(v) => set("state", v)} />
                <F label="ZIP code" required v={form.zip} on={(v) => set("zip", v)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <F
                  label="Business phone"
                  type="tel"
                  required
                  v={form.bizPhone}
                  on={(v) => set("bizPhone", v)}
                />
                <F label="Fax" v={form.fax} on={(v) => set("fax", v)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <F
                  label="Federal Tax ID (EIN)"
                  required
                  v={form.taxId}
                  on={(v) => set("taxId", v)}
                />
                <F
                  label="Primary contact name"
                  required
                  v={form.primaryContact}
                  on={(v) => set("primaryContact", v)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <F
                  label="Email address"
                  type="email"
                  required
                  v={form.email}
                  on={(v) => set("email", v)}
                />
                <F label="Website" v={form.website} on={(v) => set("website", v)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <F
                  label="Date business started"
                  type="date"
                  required
                  v={form.dateStarted}
                  on={(v) => set("dateStarted", v)}
                />
                <F
                  label="Length of ownership (years)"
                  v={form.lengthOwnership}
                  on={(v) => set("lengthOwnership", v)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <F
                  label="Years at current location"
                  v={form.yearsAtLocation}
                  on={(v) => set("yearsAtLocation", v)}
                />
                <F
                  label="Number of locations"
                  v={form.numLocations}
                  on={(v) => set("numLocations", v)}
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <SectionTitle>Ownership information</SectionTitle>
              <Note>
                The applicant must have at least 67% ownership. If the primary applicant has less
                than 67% ownership, additional owner information may be required.
              </Note>
              <F
                label="Owner's full name"
                required
                v={form.ownerName}
                on={(v) => set("ownerName", v)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <F
                  label="Contact phone number"
                  type="tel"
                  required
                  v={form.ownerPhone}
                  on={(v) => set("ownerPhone", v)}
                />
                <F
                  label="Date of birth"
                  type="date"
                  required
                  v={form.ownerDob}
                  on={(v) => set("ownerDob", v)}
                />
              </div>
              <F
                label="Home address"
                required
                v={form.ownerAddress}
                on={(v) => set("ownerAddress", v)}
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <F label="City" required v={form.ownerCity} on={(v) => set("ownerCity", v)} />
                <F label="State" required v={form.ownerState} on={(v) => set("ownerState", v)} />
                <F label="ZIP code" required v={form.ownerZip} on={(v) => set("ownerZip", v)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <F
                  label="Social Security number"
                  required
                  v={form.ownerSsn}
                  on={(v) => set("ownerSsn", v)}
                />
                <F
                  label="Ownership %"
                  type="number"
                  required
                  v={form.ownership}
                  on={(v) => set("ownership", v)}
                />
                <F label="Title" required v={form.ownerTitle} on={(v) => set("ownerTitle", v)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <SectionTitle>Business profile</SectionTitle>
              <div>
                <Label className="mb-2 block">
                  Ownership type <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={form.ownershipType}
                  onValueChange={(v) => set("ownershipType", v)}
                  className="grid gap-2 sm:grid-cols-2"
                >
                  {["Sole proprietorship", "Corporation", "Partnership", "LLC"].map((o) => (
                    <label
                      key={o}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm hover:border-brand has-[[data-state=checked]]:border-brand has-[[data-state=checked]]:bg-brand/5"
                    >
                      <RadioGroupItem value={o} /> {o}
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label className="mb-2 block">
                  Merchant type <span className="text-destructive">*</span>
                </Label>
                <Select value={form.merchantType} onValueChange={(v) => set("merchantType", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Retail",
                      "Restaurant",
                      "Lodging",
                      "Service",
                      "Internet",
                      "Home-based",
                      "Automotive",
                      "Other",
                    ].map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.merchantType === "Other" && (
                  <div className="mt-3">
                    <F
                      label="Please describe"
                      required
                      v={form.merchantOther}
                      on={(v) => set("merchantOther", v)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <SectionTitle>Funding questions</SectionTitle>
              <Note>
                Funding may be available up to approximately two times the company's gross monthly
                bank revenue, subject to review and approval.
              </Note>
              <F
                label="Amount requested (USD)"
                type="number"
                required
                v={form.amountRequested}
                on={(v) => set("amountRequested", v)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <F
                  label="Average monthly Visa & Mastercard sales"
                  type="number"
                  required
                  v={form.avgCardSales}
                  on={(v) => set("avgCardSales", v)}
                />
                <F
                  label="Average gross monthly sales"
                  type="number"
                  required
                  v={form.avgGrossSales}
                  on={(v) => set("avgGrossSales", v)}
                />
              </div>
              <div>
                <Label className="mb-2 block">
                  Has the business used a cash advance plan before?{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={form.usedAdvance}
                  onValueChange={(v) => set("usedAdvance", v)}
                  className="grid gap-2 sm:grid-cols-2"
                >
                  {[
                    ["yes", "Yes"],
                    ["no", "No"],
                  ].map(([val, lab]) => (
                    <label
                      key={val}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm hover:border-brand has-[[data-state=checked]]:border-brand has-[[data-state=checked]]:bg-brand/5"
                    >
                      <RadioGroupItem value={val} /> {lab}
                    </label>
                  ))}
                </RadioGroup>
              </div>
              {form.usedAdvance === "yes" && (
                <div className="space-y-4 rounded-xl border border-dashed border-border bg-surface p-4">
                  <F
                    label="Previous funding company"
                    required
                    v={form.prevCompany}
                    on={(v) => set("prevCompany", v)}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <F
                      label="Original balance"
                      type="number"
                      required
                      v={form.origBalance}
                      on={(v) => set("origBalance", v)}
                    />
                    <F
                      label="Current balance"
                      type="number"
                      required
                      v={form.currentBalance}
                      on={(v) => set("currentBalance", v)}
                    />
                  </div>
                  <F
                    label="Current payment or daily holdback %"
                    required
                    v={form.currentPayment}
                    on={(v) => set("currentPayment", v)}
                  />
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <SectionTitle>Documents</SectionTitle>
              <FileField
                label="Six months of recent business bank statements"
                required
                files={bankStmts}
                setFiles={setBankStmts}
                multiple
                hint="PDF, JPG, JPEG, PNG — up to 15MB per file"
                setError={setError}
              />
              <FileField
                label="Original funding contract (if you have an existing cash advance or funding balance)"
                files={contract}
                setFiles={setContract}
                multiple
                setError={setError}
              />
              <FileField
                label="Optional supporting documents"
                files={supporting}
                setFiles={setSupporting}
                multiple
                setError={setError}
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <SectionTitle>Signature and authorization</SectionTitle>
              <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
                <p>By signing below, the applicant certifies that:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>All submitted information and documents are true, correct, and complete.</li>
                  <li>
                    Smallbizloanz.com, its agents, partners, and funding providers may verify the
                    submitted information.
                  </li>
                  <li>
                    Credit reports and other relevant business or owner information may be obtained
                    from third parties where permitted.
                  </li>
                </ul>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <F
                  label="Typed legal name"
                  required
                  v={form.signName}
                  on={(v) => set("signName", v)}
                />
                <F
                  label="Date"
                  type="date"
                  required
                  v={form.signDate}
                  on={(v) => set("signDate", v)}
                />
              </div>
              <div>
                <Label htmlFor="signature">
                  Electronic signature <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="signature"
                  className="mt-1.5 font-signature"
                  style={{
                    fontFamily: "'Segoe Script', 'Brush Script MT', cursive",
                    fontSize: "1.25rem",
                  }}
                  value={form.signature}
                  onChange={(e) => set("signature", e.target.value)}
                  placeholder="Type your signature"
                />
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4">
                <Checkbox
                  checked={form.consent}
                  onCheckedChange={(v) => set("consent", !!v)}
                  className="mt-0.5"
                />
                <span className="text-sm">
                  I authorize Smallbizloanz.com to review the information and documents I have
                  submitted, and I certify the statements above.
                </span>
              </label>
              {/* Simple spam trap */}
              <input
                type="text"
                name="website_url"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                value={form.honeypot}
                onChange={(e) => set("honeypot", e.target.value)}
              />
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={back}
              disabled={step === 0}
              className="rounded-full"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            {step < steps.length - 1 ? (
              <Button
                type="button"
                onClick={next}
                className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
              >
                Continue <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
              >
                {submitting ? "Submitting…" : "Submit application"}
              </Button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Your information is submitted securely. Smallbizloanz.com does not guarantee approval,
          funding, rates, terms, or funding amounts.
        </p>
      </section>
    </SiteLayout>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-brand/20 bg-brand/5 p-3 text-sm text-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
      <p>{children}</p>
    </div>
  );
}

function F({
  label,
  v,
  on,
  required,
  type = "text",
}: {
  label: string;
  v: string;
  on: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={v}
        onChange={(e) => on(e.target.value)}
        className="mt-1.5"
        required={required}
      />
    </div>
  );
}

function FileField({
  label,
  required,
  files,
  setFiles,
  multiple,
  hint,
  setError,
}: {
  label: string;
  required?: boolean;
  files: File[];
  setFiles: (f: File[]) => void;
  multiple?: boolean;
  hint?: string;
  setError: (v: string | null) => void;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    const ok: File[] = [];
    for (const f of picked) {
      if (f.size > MAX_MB * 1024 * 1024) {
        setError(`${f.name} is larger than ${MAX_MB}MB.`);
        continue;
      }
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!["pdf", "jpg", "jpeg", "png"].includes(ext)) {
        setError(`${f.name} is not a supported file type.`);
        continue;
      }
      ok.push(f);
    }
    setFiles(multiple ? [...files, ...ok] : ok.slice(0, 1));
    e.target.value = "";
  }
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      <label
        htmlFor={id}
        className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-background px-4 py-6 text-center transition-colors hover:border-brand hover:bg-brand/5"
      >
        <Upload className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium">
          Click to upload{multiple ? " files" : " a file"}
        </span>
        <span className="text-xs text-muted-foreground">{hint ?? "PDF, JPG, JPEG, PNG"}</span>
        <input
          id={id}
          type="file"
          accept={ACCEPTED}
          multiple={multiple}
          onChange={onSelect}
          className="sr-only"
        />
      </label>
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            >
              <span className="truncate pr-3">
                {f.name}{" "}
                <span className="text-muted-foreground">
                  · {(f.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </span>
              <button
                type="button"
                onClick={() => setFiles(files.filter((_, j) => j !== i))}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function initialForm() {
  return {
    // business
    legalName: "",
    dba: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    bizPhone: "",
    fax: "",
    taxId: "",
    primaryContact: "",
    email: "",
    website: "",
    dateStarted: "",
    lengthOwnership: "",
    yearsAtLocation: "",
    numLocations: "",
    // owner
    ownerName: "",
    ownerPhone: "",
    ownerAddress: "",
    ownerCity: "",
    ownerState: "",
    ownerZip: "",
    ownerDob: "",
    ownerSsn: "",
    ownership: "",
    ownerTitle: "",
    // profile
    ownershipType: "",
    merchantType: "",
    merchantOther: "",
    // funding
    amountRequested: "",
    avgCardSales: "",
    avgGrossSales: "",
    usedAdvance: "",
    prevCompany: "",
    origBalance: "",
    currentBalance: "",
    currentPayment: "",
    // sign
    signName: "",
    signature: "",
    signDate: "",
    consent: false,
    honeypot: "",
  };
}
