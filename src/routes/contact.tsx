import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { emailRow, sendLeadEmail } from "@/lib/email.server";
import { claimSubmission, releaseSubmission } from "@/lib/submission-guard";
import { pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as {
          name?: string;
          business?: string;
          email?: string;
          phone?: string;
          message?: string;
          submissionId?: string;
        };
        const submissionId = body.submissionId?.trim();
        if (!submissionId) {
          return Response.json(
            { error: "Missing submission token." },
            {
              status: 400,
              headers: { "X-Robots-Tag": "noindex, nofollow" },
            },
          );
        }
        if (!claimSubmission(submissionId)) {
          return Response.json(
            { error: "This message was already submitted. Please refresh and try again." },
            {
              status: 409,
              headers: { "X-Robots-Tag": "noindex, nofollow" },
            },
          );
        }
        if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
          releaseSubmission(submissionId);
          return Response.json(
            { error: "Name, email, and message are required." },
            {
              status: 400,
              headers: { "X-Robots-Tag": "noindex, nofollow" },
            },
          );
        }
        try {
          await sendLeadEmail(
            `New contact request from ${body.name}`,
            [
              emailRow("Name", body.name),
              emailRow("Business", body.business),
              emailRow("Email", body.email),
              emailRow("Phone", body.phone),
            ],
            body.message,
          );
          return Response.json(
            { success: true },
            { headers: { "X-Robots-Tag": "noindex, nofollow" } },
          );
        } catch (error) {
          releaseSubmission(submissionId);
          console.error(error);
          return Response.json(
            { error: "We could not send your message. Please try again shortly." },
            {
              status: 500,
              headers: { "X-Robots-Tag": "noindex, nofollow" },
            },
          );
        }
      },
    },
  },
  head: () => {
    const seo = pageHead({
      title: "Contact SmallBizLoans | Business Funding Assistance",
      description:
        "Contact SmallBizLoans by phone, email, or the contact form for help with business funding questions and applications.",
      path: "/contact",
    });
    return {
      ...seo,
      scripts: [
        toJsonLd(
          webpageSchema({
            title: "Contact SmallBizLoans",
            description:
              "Contact SmallBizLoans by phone, email, or the contact form for help with business funding questions and applications.",
            path: "/contact",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ],
          }),
        ),
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const submissionId = useRef(crypto.randomUUID());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const form = new FormData(e.currentTarget);
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(form.entries()), submissionId: submissionId.current }),
      });
      if (!response.ok) throw new Error("Contact form submission failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Contact SmallBizLoans
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Get help with your business funding application.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Use the contact options below if you need help before you start the application or
              if you have questions about the review process.
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:lizzy.alemayehu@smallbizloanz.com"
                className="flex items-start gap-3 rounded-xl bg-card p-4 hover:bg-accent"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Email
                  </div>
                  <div className="mt-0.5 break-all text-sm font-medium">
                    lizzy.alemayehu@smallbizloanz.com
                  </div>
                </div>
              </a>
              <a
                href="tel:+17209001921"
                className="flex items-start gap-3 rounded-xl bg-card p-4 hover:bg-accent"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Phone
                  </div>
                  <div className="mt-0.5 text-sm font-medium">(720) 900-1921</div>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="text-sm text-muted-foreground">
              Tell us what you need help with. Include your business name if the question is about
              an application or a funding request.
            </p>
            {status === "sent" ? (
              <div className="mt-6 flex flex-col items-center text-center">
                <CheckCircle2 className="h-10 w-10 text-brand" />
                <h2 className="mt-4 text-xl font-semibold">Message sent</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thanks for reaching out. A representative will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <input type="hidden" name="submissionId" value={submissionId.current} readOnly />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Name" required autoComplete="name" />
                  <Field id="business" label="Business name" autoComplete="organization" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="email" label="Email" type="email" required autoComplete="email" />
                  <Field id="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" />
                </div>
                <div>
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    autoComplete="off"
                    className="mt-1.5"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-brand text-brand-foreground hover:bg-brand-hover"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </Button>
                {status === "error" && (
                  <p className="text-sm text-destructive">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
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
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        className="mt-1.5"
      />
    </div>
  );
}
