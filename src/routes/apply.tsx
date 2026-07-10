import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronLeft, ChevronRight, Info, Upload, X } from "lucide-react";
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { emailRow, sendLeadEmail } from "@/lib/email.server";
import { claimSubmission, releaseSubmission } from "@/lib/submission-guard";
import { pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

const fieldIds = {
  legalName: "legal-name",
  dba: "dba",
  address: "business-address",
  city: "business-city",
  state: "business-state",
  zip: "business-zip",
  bizPhone: "business-phone",
  fax: "business-fax",
  taxId: "business-tax-id",
  primaryContact: "primary-contact",
  email: "business-email",
  website: "website",
  dateStarted: "business-started",
  lengthOwnership: "ownership-length",
  yearsAtLocation: "years-at-location",
  numLocations: "num-locations",
  ownerName: "owner-name",
  ownerPhone: "owner-phone",
  ownerAddress: "owner-address",
  ownerCity: "owner-city",
  ownerState: "owner-state",
  ownerZip: "owner-zip",
  ownerDob: "owner-dob",
  ownerSsn: "owner-ssn",
  ownership: "ownership-percent",
  ownerTitle: "owner-title",
  ownershipType: "ownership-type",
  merchantType: "merchant-type",
  merchantOther: "merchant-other",
  amountRequested: "amount-requested",
  avgCardSales: "avg-card-sales",
  avgGrossSales: "avg-gross-sales",
  usedAdvance: "used-advance",
  prevCompany: "previous-company",
  origBalance: "original-balance",
  currentBalance: "current-balance",
  currentPayment: "current-payment",
  bankStatements: "bank-statements",
  contract: "funding-contract",
  supporting: "supporting-documents",
  signName: "typed-legal-name",
  signature: "electronic-signature",
  signDate: "signature-date",
  consent: "consent",
} as const;

const steps = ["Business", "Ownership", "Profile", "Funding", "Documents", "Sign & submit"] as const;
const ACCEPTED = ".pdf,.jpg,.jpeg,.png";
const MAX_MB = 15;

export const Route = createFileRoute("/apply")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const formData = await request.formData();
        const submissionId = String(formData.get("submissionId") ?? "").trim();
        if (!submissionId) {
          return Response.json(
            { error: "Missing submission token." },
            { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } },
          );
        }
        if (!claimSubmission(submissionId)) {
          return Response.json(
            { error: "This application was already submitted. Please refresh and try again." },
            { status: 409, headers: { "X-Robots-Tag": "noindex, nofollow" } },
          );
        }

        const text = (name: string) => String(formData.get(name) ?? "").trim();
        const email = text("email");
        const legalName = text("legalName");
        const requiredFields = [
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
          "ownershipType",
          "merchantType",
          "amountRequested",
          "avgCardSales",
          "avgGrossSales",
          "usedAdvance",
          "signName",
          "signature",
          "signDate",
        ] as const;

        const missing = requiredFields.filter((field) => !text(field));
        if (missing.length > 0 || !email || !/^\S+@\S+\.\S+$/.test(email)) {
          releaseSubmission(submissionId);
          return Response.json(
            { error: "Please complete the required application fields." },
            { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } },
          );
        }
        if (text("ownershipType") === "" || text("merchantType") === "") {
          releaseSubmission(submissionId);
          return Response.json(
            { error: "Please complete the business profile section." },
            { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } },
          );
        }
        if (text("merchantType") === "Other" && !text("merchantOther")) {
          releaseSubmission(submissionId);
          return Response.json(
            { error: "Please describe the merchant type." },
            { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } },
          );
        }
        if (!formData.getAll("bankStatements").some((value) => value instanceof File)) {
          releaseSubmission(submissionId);
          return Response.json(
            { error: "Please upload your six months of business bank statements." },
            { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } },
          );
        }
        if (text("consent") !== "true") {
          releaseSubmission(submissionId);
          return Response.json(
            { error: "Please authorize the submission before continuing." },
            { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } },
          );
        }

        try {
          const rows = [
            emailRow("Legal business name", legalName),
            emailRow("DBA", text("dba")),
            emailRow("Physical address", text("address")),
            emailRow("City", text("city")),
            emailRow("State", text("state")),
            emailRow("ZIP code", text("zip")),
            emailRow("Business phone", text("bizPhone")),
            emailRow("Fax", text("fax")),
            emailRow("Federal Tax ID", text("taxId")),
            emailRow("Primary contact", text("primaryContact")),
            emailRow("Email", email),
            emailRow("Website", text("website")),
            emailRow("Date business started", text("dateStarted")),
            emailRow("Length of ownership", text("lengthOwnership")),
            emailRow("Years at current location", text("yearsAtLocation")),
            emailRow("Number of locations", text("numLocations")),
            emailRow("Owner name", text("ownerName")),
            emailRow("Owner phone", text("ownerPhone")),
            emailRow("Owner address", text("ownerAddress")),
            emailRow("Owner city", text("ownerCity")),
            emailRow("Owner state", text("ownerState")),
            emailRow("Owner ZIP code", text("ownerZip")),
            emailRow("Owner date of birth", text("ownerDob")),
            emailRow("Owner SSN", text("ownerSsn")),
            emailRow("Ownership percentage", text("ownership")),
            emailRow("Owner title", text("ownerTitle")),
            emailRow("Ownership type", text("ownershipType")),
            emailRow("Merchant type", text("merchantType")),
            emailRow("Merchant type details", text("merchantOther")),
            emailRow("Amount requested", text("amountRequested")),
            emailRow("Average card sales", text("avgCardSales")),
            emailRow("Average gross sales", text("avgGrossSales")),
            emailRow("Used advance before", text("usedAdvance")),
            emailRow("Previous funding company", text("prevCompany")),
            emailRow("Original balance", text("origBalance")),
            emailRow("Current balance", text("currentBalance")),
            emailRow("Current payment", text("currentPayment")),
          ];

          const attachments = await collectAttachments(formData);
          await sendLeadEmail(
            `New funding application from ${legalName}`,
            rows,
            undefined,
            attachments,
          );
          return Response.json(
            { success: true },
            { headers: { "X-Robots-Tag": "noindex, nofollow" } },
          );
        } catch (error) {
          releaseSubmission(submissionId);
          console.error(error);
          return Response.json(
            { error: "We could not submit your application. Please try again shortly." },
            { status: 500, headers: { "X-Robots-Tag": "noindex, nofollow" } },
          );
        }
      },
    },
  },
  head: () => ({
    ...pageHead({
      title: "Apply for Small Business Funding | Smallbizloanz",
      description:
        "Apply online for small-business funding. The application requests business details, ownership information, and recent business bank statements.",
      path: "/apply",
    }),
    meta: [
      toJsonLd(
        webpageSchema({
          title: "Apply for Small Business Funding",
          description:
            "Apply online for small-business funding. The application requests business details, ownership information, and recent business bank statements.",
          path: "/apply",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Apply", path: "/apply" },
          ],
        }),
      ),
    ],
  }),
  component: ApplyPage,
});

type ValidationResult = {
  fieldErrors: Record<string, string>;
  generalError?: string;
};

type FormState = ReturnType<typeof initialForm>;

function ApplyPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState(initialForm());
  const [bankStmts, setBankStmts] = useState<File[]>([]);
  const [contract, setContract] = useState<File[]>([]);
  const [supporting, setSupporting] = useState<File[]>([]);
  const submissionId = useRef(crypto.randomUUID());

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      if (!(key as string in current)) return current;
      const next = { ...current };
      delete next[key as string];
      return next;
    });
  }

  function setUploadError(key: string, message: string | null) {
    setFieldErrors((current) => {
      const next = { ...current };
      if (message) next[key] = message;
      else delete next[key];
      return next;
    });
  }

  function validateStep(): ValidationResult {
    const nextErrors: Record<string, string> = {};
    const required = (key: string, value: unknown, message: string) => {
      if (!String(value ?? "").trim()) nextErrors[key] = message;
    };

    if (step === 0) {
      required(fieldIds.legalName, form.legalName, "Enter the legal business name.");
      required(fieldIds.address, form.address, "Enter the business address.");
      required(fieldIds.city, form.city, "Enter the business city.");
      required(fieldIds.state, form.state, "Enter the business state.");
      required(fieldIds.zip, form.zip, "Enter the business ZIP code.");
      required(fieldIds.bizPhone, form.bizPhone, "Enter the business phone number.");
      required(fieldIds.taxId, form.taxId, "Enter the business tax ID.");
      required(fieldIds.primaryContact, form.primaryContact, "Enter the primary contact name.");
      required(fieldIds.email, form.email, "Enter the business email address.");
      required(fieldIds.dateStarted, form.dateStarted, "Enter the business start date.");
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
        nextErrors[fieldIds.email] = "Enter a valid email address.";
      }
    }

    if (step === 1) {
      required(fieldIds.ownerName, form.ownerName, "Enter the owner's full name.");
      required(fieldIds.ownerPhone, form.ownerPhone, "Enter the owner's phone number.");
      required(fieldIds.ownerAddress, form.ownerAddress, "Enter the owner's home address.");
      required(fieldIds.ownerCity, form.ownerCity, "Enter the owner's city.");
      required(fieldIds.ownerState, form.ownerState, "Enter the owner's state.");
      required(fieldIds.ownerZip, form.ownerZip, "Enter the owner's ZIP code.");
      required(fieldIds.ownerDob, form.ownerDob, "Enter the owner's date of birth.");
      required(fieldIds.ownerSsn, form.ownerSsn, "Enter the owner's Social Security number.");
      required(fieldIds.ownership, form.ownership, "Enter the ownership percentage.");
      required(fieldIds.ownerTitle, form.ownerTitle, "Enter the owner's title.");
      const pct = Number(form.ownership);
      if (form.ownership && (Number.isNaN(pct) || pct <= 0 || pct > 100)) {
        nextErrors[fieldIds.ownership] = "Enter a valid ownership percentage.";
      }
    }

    if (step === 2) {
      required(fieldIds.ownershipType, form.ownershipType, "Select an ownership type.");
      required(fieldIds.merchantType, form.merchantType, "Select a merchant type.");
      if (form.merchantType === "Other") {
        required(fieldIds.merchantOther, form.merchantOther, "Describe the merchant type.");
      }
    }

    if (step === 3) {
      required(fieldIds.amountRequested, form.amountRequested, "Enter the amount requested.");
      required(fieldIds.avgCardSales, form.avgCardSales, "Enter average card sales.");
      required(fieldIds.avgGrossSales, form.avgGrossSales, "Enter average gross monthly sales.");
      required(fieldIds.usedAdvance, form.usedAdvance, "Tell us whether the business has used a cash advance before.");
      if (form.usedAdvance === "yes") {
        required(fieldIds.prevCompany, form.prevCompany, "Enter the previous funding company.");
        required(fieldIds.origBalance, form.origBalance, "Enter the original balance.");
        required(fieldIds.currentBalance, form.currentBalance, "Enter the current balance.");
        required(fieldIds.currentPayment, form.currentPayment, "Enter the current payment or holdback.");
      }
    }

    if (step === 4) {
      if (bankStmts.length === 0) {
        nextErrors[fieldIds.bankStatements] = "Upload six months of recent business bank statements.";
      }
    }

    if (step === 5) {
      required(fieldIds.signName, form.signName, "Enter the typed legal name.");
      required(fieldIds.signature, form.signature, "Type the electronic signature.");
      required(fieldIds.signDate, form.signDate, "Enter the signing date.");
      if (!form.consent) {
        nextErrors[fieldIds.consent] = "Check the authorization box.";
      }
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length > 0
      ? { fieldErrors: nextErrors, generalError: "Please review the highlighted fields." }
      : { fieldErrors: {} };
  }

  function next() {
    const result = validateStep();
    if (result.generalError) {
      setError(result.generalError);
      return;
    }
    setError(null);
    setStep((value) => Math.min(value + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setError(null);
    setStep((value) => Math.max(value - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    const result = validateStep();
    if (result.generalError) {
      setError(result.generalError);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const body = new FormData();
      body.set("submissionId", submissionId.current);
      for (const [key, value] of Object.entries(form)) {
        body.set(key, typeof value === "boolean" ? String(value) : value);
      }
      bankStmts.forEach((file) => body.append("bankStatements", file));
      contract.forEach((file) => body.append("contract", file));
      supporting.forEach((file) => body.append("supporting", file));

      const response = await fetch("/apply", {
        method: "POST",
        body,
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Application submission failed");
      }
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submitError) {
      setSubmitting(false);
      setError(submitError instanceof Error ? submitError.message : "We could not submit your application. Please try again or contact us directly.");
    }
  }

  if (submitted) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/15 text-brand">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight">Application received</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you. Your application has been submitted successfully. A representative will
            review your information and contact you regarding the next steps.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">
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
        <div className="mb-8 space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-5 text-sm leading-6 text-muted-foreground">
            <p>
              Complete this application if you want Smallbizloanz to review a small-business
              funding request. The review may require six months of recent business bank
              statements and other business or ownership details. Submission does not guarantee
              approval or funding.
            </p>
            <div className="mt-3 flex flex-wrap gap-4 font-medium text-brand">
              <Link to="/faq" className="hover:underline">
                Read the FAQ
              </Link>
              <Link to="/contact" className="hover:underline">
                Contact us for help
              </Link>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Business Funding Application
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Step {step + 1} of {steps.length} - {steps[step]}. Fields marked{" "}
              <span className="text-destructive">*</span> are required.
            </p>
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
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-4">
              <SectionTitle>Business information</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id={fieldIds.legalName}
                  label="Legal / corporate business name"
                  value={form.legalName}
                  onChange={(value) => setField("legalName", value)}
                  autoComplete="organization"
                  required
                  error={fieldErrors[fieldIds.legalName]}
                />
                <Field
                  id={fieldIds.dba}
                  label="DBA"
                  value={form.dba}
                  onChange={(value) => setField("dba", value)}
                  autoComplete="organization"
                />
              </div>
              <Field
                id={fieldIds.address}
                label="Physical address"
                value={form.address}
                onChange={(value) => setField("address", value)}
                autoComplete="street-address"
                required
                error={fieldErrors[fieldIds.address]}
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  id={fieldIds.city}
                  label="City"
                  value={form.city}
                  onChange={(value) => setField("city", value)}
                  autoComplete="address-level2"
                  required
                  error={fieldErrors[fieldIds.city]}
                />
                <Field
                  id={fieldIds.state}
                  label="State"
                  value={form.state}
                  onChange={(value) => setField("state", value)}
                  autoComplete="address-level1"
                  required
                  error={fieldErrors[fieldIds.state]}
                />
                <Field
                  id={fieldIds.zip}
                  label="ZIP code"
                  value={form.zip}
                  onChange={(value) => setField("zip", value)}
                  autoComplete="postal-code"
                  inputMode="numeric"
                  required
                  error={fieldErrors[fieldIds.zip]}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id={fieldIds.bizPhone}
                  label="Business phone"
                  type="tel"
                  value={form.bizPhone}
                  onChange={(value) => setField("bizPhone", value)}
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  error={fieldErrors[fieldIds.bizPhone]}
                />
                <Field
                  id={fieldIds.fax}
                  label="Fax"
                  type="tel"
                  value={form.fax}
                  onChange={(value) => setField("fax", value)}
                  autoComplete="fax"
                  inputMode="tel"
                  error={fieldErrors[fieldIds.fax]}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id={fieldIds.taxId}
                  label="Federal Tax ID (EIN)"
                  value={form.taxId}
                  onChange={(value) => setField("taxId", value)}
                  autoComplete="off"
                  inputMode="numeric"
                  required
                  error={fieldErrors[fieldIds.taxId]}
                />
                <Field
                  id={fieldIds.primaryContact}
                  label="Primary contact name"
                  value={form.primaryContact}
                  onChange={(value) => setField("primaryContact", value)}
                  autoComplete="name"
                  required
                  error={fieldErrors[fieldIds.primaryContact]}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id={fieldIds.email}
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={(value) => setField("email", value)}
                  autoComplete="email"
                  required
                  error={fieldErrors[fieldIds.email]}
                />
                <Field
                  id={fieldIds.website}
                  label="Website"
                  value={form.website}
                  onChange={(value) => setField("website", value)}
                  autoComplete="url"
                  error={fieldErrors[fieldIds.website]}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id={fieldIds.dateStarted}
                  label="Date business started"
                  type="date"
                  value={form.dateStarted}
                  onChange={(value) => setField("dateStarted", value)}
                  required
                  error={fieldErrors[fieldIds.dateStarted]}
                />
                <Field
                  id={fieldIds.lengthOwnership}
                  label="Length of ownership (years)"
                  value={form.lengthOwnership}
                  onChange={(value) => setField("lengthOwnership", value)}
                  inputMode="decimal"
                  error={fieldErrors[fieldIds.lengthOwnership]}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id={fieldIds.yearsAtLocation}
                  label="Years at current location"
                  value={form.yearsAtLocation}
                  onChange={(value) => setField("yearsAtLocation", value)}
                  inputMode="decimal"
                  error={fieldErrors[fieldIds.yearsAtLocation]}
                />
                <Field
                  id={fieldIds.numLocations}
                  label="Number of locations"
                  value={form.numLocations}
                  onChange={(value) => setField("numLocations", value)}
                  inputMode="numeric"
                  error={fieldErrors[fieldIds.numLocations]}
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
              <Field
                id={fieldIds.ownerName}
                label="Owner's full name"
                value={form.ownerName}
                onChange={(value) => setField("ownerName", value)}
                autoComplete="name"
                required
                error={fieldErrors[fieldIds.ownerName]}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id={fieldIds.ownerPhone}
                  label="Contact phone number"
                  type="tel"
                  value={form.ownerPhone}
                  onChange={(value) => setField("ownerPhone", value)}
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  error={fieldErrors[fieldIds.ownerPhone]}
                />
                <Field
                  id={fieldIds.ownerDob}
                  label="Date of birth"
                  type="date"
                  value={form.ownerDob}
                  onChange={(value) => setField("ownerDob", value)}
                  required
                  error={fieldErrors[fieldIds.ownerDob]}
                />
              </div>
              <Field
                id={fieldIds.ownerAddress}
                label="Home address"
                value={form.ownerAddress}
                onChange={(value) => setField("ownerAddress", value)}
                autoComplete="street-address"
                required
                error={fieldErrors[fieldIds.ownerAddress]}
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  id={fieldIds.ownerCity}
                  label="City"
                  value={form.ownerCity}
                  onChange={(value) => setField("ownerCity", value)}
                  autoComplete="address-level2"
                  required
                  error={fieldErrors[fieldIds.ownerCity]}
                />
                <Field
                  id={fieldIds.ownerState}
                  label="State"
                  value={form.ownerState}
                  onChange={(value) => setField("ownerState", value)}
                  autoComplete="address-level1"
                  required
                  error={fieldErrors[fieldIds.ownerState]}
                />
                <Field
                  id={fieldIds.ownerZip}
                  label="ZIP code"
                  value={form.ownerZip}
                  onChange={(value) => setField("ownerZip", value)}
                  autoComplete="postal-code"
                  inputMode="numeric"
                  required
                  error={fieldErrors[fieldIds.ownerZip]}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  id={fieldIds.ownerSsn}
                  label="Social Security number"
                  value={form.ownerSsn}
                  onChange={(value) => setField("ownerSsn", value)}
                  autoComplete="off"
                  inputMode="numeric"
                  required
                  error={fieldErrors[fieldIds.ownerSsn]}
                />
                <Field
                  id={fieldIds.ownership}
                  label="Ownership %"
                  type="number"
                  value={form.ownership}
                  onChange={(value) => setField("ownership", value)}
                  inputMode="decimal"
                  required
                  error={fieldErrors[fieldIds.ownership]}
                />
                <Field
                  id={fieldIds.ownerTitle}
                  label="Title"
                  value={form.ownerTitle}
                  onChange={(value) => setField("ownerTitle", value)}
                  required
                  error={fieldErrors[fieldIds.ownerTitle]}
                />
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
                  onValueChange={(value) => setField("ownershipType", value)}
                  className="grid gap-2 sm:grid-cols-2"
                >
                  {["Sole proprietorship", "Corporation", "Partnership", "LLC"].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm hover:border-brand has-[[data-state=checked]]:border-brand has-[[data-state=checked]]:bg-brand/5"
                    >
                      <RadioGroupItem value={option} /> {option}
                    </label>
                  ))}
                </RadioGroup>
                {fieldErrors[fieldIds.ownershipType] && (
                  <p className="mt-2 text-sm text-destructive">{fieldErrors[fieldIds.ownershipType]}</p>
                )}
              </div>
              <div>
                <Label htmlFor={fieldIds.merchantType} className="mb-2 block">
                  Merchant type <span className="text-destructive">*</span>
                </Label>
                <Select value={form.merchantType} onValueChange={(value) => setField("merchantType", value)}>
                  <SelectTrigger id={fieldIds.merchantType}>
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
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors[fieldIds.merchantType] && (
                  <p className="mt-2 text-sm text-destructive">{fieldErrors[fieldIds.merchantType]}</p>
                )}
                {form.merchantType === "Other" && (
                  <div className="mt-3">
                    <Field
                      id={fieldIds.merchantOther}
                      label="Please describe"
                      value={form.merchantOther}
                      onChange={(value) => setField("merchantOther", value)}
                      required
                      error={fieldErrors[fieldIds.merchantOther]}
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
                The review focuses on the information you provide here, the bank statements, and
                the overall business profile. Funding is subject to review and approval.
              </Note>
              <Field
                id={fieldIds.amountRequested}
                label="Amount requested (USD)"
                type="number"
                value={form.amountRequested}
                onChange={(value) => setField("amountRequested", value)}
                inputMode="decimal"
                required
                error={fieldErrors[fieldIds.amountRequested]}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id={fieldIds.avgCardSales}
                  label="Average monthly Visa & Mastercard sales"
                  type="number"
                  value={form.avgCardSales}
                  onChange={(value) => setField("avgCardSales", value)}
                  inputMode="decimal"
                  required
                  error={fieldErrors[fieldIds.avgCardSales]}
                />
                <Field
                  id={fieldIds.avgGrossSales}
                  label="Average gross monthly sales"
                  type="number"
                  value={form.avgGrossSales}
                  onChange={(value) => setField("avgGrossSales", value)}
                  inputMode="decimal"
                  required
                  error={fieldErrors[fieldIds.avgGrossSales]}
                />
              </div>
              <div>
                <Label className="mb-2 block">
                  Has the business used a cash advance plan before?{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={form.usedAdvance}
                  onValueChange={(value) => setField("usedAdvance", value)}
                  className="grid gap-2 sm:grid-cols-2"
                >
                  {[
                    ["yes", "Yes"],
                    ["no", "No"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm hover:border-brand has-[[data-state=checked]]:border-brand has-[[data-state=checked]]:bg-brand/5"
                    >
                      <RadioGroupItem value={value} /> {label}
                    </label>
                  ))}
                </RadioGroup>
                {fieldErrors[fieldIds.usedAdvance] && (
                  <p className="mt-2 text-sm text-destructive">{fieldErrors[fieldIds.usedAdvance]}</p>
                )}
              </div>
              {form.usedAdvance === "yes" && (
                <div className="space-y-4 rounded-xl border border-dashed border-border bg-surface p-4">
                  <Field
                    id={fieldIds.prevCompany}
                    label="Previous funding company"
                    value={form.prevCompany}
                    onChange={(value) => setField("prevCompany", value)}
                    required
                    error={fieldErrors[fieldIds.prevCompany]}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      id={fieldIds.origBalance}
                      label="Original balance"
                      type="number"
                      value={form.origBalance}
                      onChange={(value) => setField("origBalance", value)}
                      inputMode="decimal"
                      required
                      error={fieldErrors[fieldIds.origBalance]}
                    />
                    <Field
                      id={fieldIds.currentBalance}
                      label="Current balance"
                      type="number"
                      value={form.currentBalance}
                      onChange={(value) => setField("currentBalance", value)}
                      inputMode="decimal"
                      required
                      error={fieldErrors[fieldIds.currentBalance]}
                    />
                  </div>
                  <Field
                    id={fieldIds.currentPayment}
                    label="Current payment or daily holdback %"
                    value={form.currentPayment}
                    onChange={(value) => setField("currentPayment", value)}
                    required
                    error={fieldErrors[fieldIds.currentPayment]}
                  />
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <SectionTitle>Documents</SectionTitle>
              <FileField
                id={fieldIds.bankStatements}
                label="Six months of recent business bank statements"
                required
                files={bankStmts}
                setFiles={setBankStmts}
                multiple
                hint="PDF, JPG, JPEG, PNG - up to 15MB per file"
                error={fieldErrors[fieldIds.bankStatements]}
                setError={(message) => setUploadError(fieldIds.bankStatements, message)}
              />
              <FileField
                id={fieldIds.contract}
                label="Original funding contract (if you have an existing cash advance or funding balance)"
                files={contract}
                setFiles={setContract}
                multiple
                error={fieldErrors[fieldIds.contract]}
                setError={(message) => setUploadError(fieldIds.contract, message)}
              />
              <FileField
                id={fieldIds.supporting}
                label="Optional supporting documents"
                files={supporting}
                setFiles={setSupporting}
                multiple
                error={fieldErrors[fieldIds.supporting]}
                setError={(message) => setUploadError(fieldIds.supporting, message)}
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
                <Field
                  id={fieldIds.signName}
                  label="Typed legal name"
                  value={form.signName}
                  onChange={(value) => setField("signName", value)}
                  autoComplete="name"
                  required
                  error={fieldErrors[fieldIds.signName]}
                />
                <Field
                  id={fieldIds.signDate}
                  label="Date"
                  type="date"
                  value={form.signDate}
                  onChange={(value) => setField("signDate", value)}
                  required
                  error={fieldErrors[fieldIds.signDate]}
                />
              </div>
              <div>
                <Label htmlFor={fieldIds.signature}>
                  Electronic signature <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={fieldIds.signature}
                  name={fieldIds.signature}
                  className="mt-1.5 font-signature"
                  style={{
                    fontFamily: "'Segoe Script', 'Brush Script MT', cursive",
                    fontSize: "1.25rem",
                  }}
                  value={form.signature}
                  onChange={(event) => setField("signature", event.target.value)}
                  placeholder="Type your signature"
                />
                {fieldErrors[fieldIds.signature] && (
                  <p className="mt-1 text-sm text-destructive">{fieldErrors[fieldIds.signature]}</p>
                )}
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4">
                <Checkbox
                  checked={form.consent}
                  onCheckedChange={(value) => setField("consent", !!value)}
                  className="mt-0.5"
                />
                <span className="text-sm">
                  I authorize Smallbizloanz.com to review the information and documents I have
                  submitted, and I certify the statements above.
                </span>
              </label>
              {fieldErrors[fieldIds.consent] && (
                <p className="text-sm text-destructive">{fieldErrors[fieldIds.consent]}</p>
              )}
              <input
                type="text"
                name="submissionId"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                value={submissionId.current}
                readOnly
              />
              <input
                type="text"
                name="website_url"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                value={form.honeypot}
                onChange={(event) => setField("honeypot", event.target.value)}
              />
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={back}
              disabled={step === 0 || submitting}
              className="rounded-full"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            {step < steps.length - 1 ? (
              <Button
                type="button"
                onClick={next}
                disabled={submitting}
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

function Field({
  id,
  label,
  value,
  onChange,
  required,
  type = "text",
  autoComplete,
  inputMode,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: ChangeEvent<HTMLInputElement>["target"]["inputMode"];
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="mt-1.5"
        required={required}
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function FileField({
  id,
  label,
  required,
  files,
  setFiles,
  multiple,
  hint,
  error,
  setError,
}: {
  id: string;
  label: string;
  required?: boolean;
  files: File[];
  setFiles: (files: File[]) => void;
  multiple?: boolean;
  hint?: string;
  error?: string;
  setError: (message: string | null) => void;
}) {
  function onSelect(event: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    const ok: File[] = [];
    let message: string | null = null;

    for (const file of picked) {
      if (file.size > MAX_MB * 1024 * 1024) {
        message = `${file.name} is larger than ${MAX_MB}MB.`;
        continue;
      }
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!["pdf", "jpg", "jpeg", "png"].includes(ext)) {
        message = `${file.name} is not a supported file type.`;
        continue;
      }
      ok.push(file);
    }

    if (ok.length > 0) {
      setFiles(multiple ? [...files, ...ok] : ok.slice(0, 1));
      setError(null);
    } else if (message) {
      setError(message);
    }

    event.target.value = "";
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
        <span className="text-xs text-muted-foreground">
          {hint ?? "PDF, JPG, JPEG, PNG"}
        </span>
        <input
          id={id}
          name={id}
          type="file"
          accept={ACCEPTED}
          multiple={multiple}
          onChange={onSelect}
          className="sr-only"
        />
      </label>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            >
              <span className="truncate pr-3">
                {file.name}{" "}
                <span className="text-muted-foreground">
                  - {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </span>
              <button
                type="button"
                onClick={() => setFiles(files.filter((_, current) => current !== index))}
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

async function collectAttachments(formData: FormData) {
  const attachments: Array<{ filename: string; content: string; contentType?: string }> = [];
  const include = (key: string) => {
    for (const value of formData.getAll(key)) {
      if (!(value instanceof File) || value.size === 0) continue;
      attachments.push({
        filename: value.name,
        content: Buffer.from(awaitFile(value)).toString("base64"),
        contentType: value.type || "application/octet-stream",
      });
    }
  };

  await include("bankStatements");
  await include("contract");
  await include("supporting");
  return attachments;
}

async function awaitFile(file: File) {
  return await file.arrayBuffer();
}

function initialForm() {
  return {
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
    ownershipType: "",
    merchantType: "",
    merchantOther: "",
    amountRequested: "",
    avgCardSales: "",
    avgGrossSales: "",
    usedAdvance: "",
    prevCompany: "",
    origBalance: "",
    currentBalance: "",
    currentPayment: "",
    signName: "",
    signature: "",
    signDate: "",
    consent: false,
    honeypot: "",
  };
}
