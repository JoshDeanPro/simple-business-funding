import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, Phone } from "@/components/ui/icons";
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
          console.error("Contact form submission failed");
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
        body: JSON.stringify({
          ...Object.fromEntries(form.entries()),
          submissionId: submissionId.current,
        }),
      });
      if (!response.ok) throw new Error("Contact form submission failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-neutral-border/50">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Contact & Support
          </h1>
          <p className="mt-2 text-sm text-muted-text max-w-xl">
            Reach out with questions about requirements, application status, or how we represent Mom
            & Pop Business Funding.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 items-start">
          {/* Expectations and contact methods */}
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-ink">What to expect</h2>
              <p className="mt-2 text-sm text-muted-text leading-relaxed">
                When you submit a contact request or call our support desk, a coordinator will
                respond to your query. If you have an active application, please include your
                business name so we can locate your file quickly.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-border/50">
              <div>
                <span className="block text-xs font-bold text-muted-text mb-1">Direct Line</span>
                <a href="tel:+17209001921" className="text-lg font-bold text-ink hover:underline">
                  (720) 900-1921
                </a>
                <span className="block text-xs text-muted-text mt-0.5">
                  Available during normal business hours.
                </span>
              </div>
              <div>
                <span className="block text-xs font-bold text-muted-text mb-1">
                  Coordinator Email
                </span>
                <a
                  href="mailto:lizzy.alemayehu@smallbizloanz.com"
                  className="text-base font-bold text-ink break-all hover:underline"
                >
                  lizzy.alemayehu@smallbizloanz.com
                </a>
                <span className="block text-xs text-muted-text mt-0.5">
                  Typically responds within one business day.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-border/50 text-xs text-muted-text leading-relaxed">
              <p>
                SmallBizLoans helps small business owners coordinate files and submit requests to
                Mom & Pop Business Funding. We do not make credit decisions or function as a direct
                lender.
              </p>
            </div>
          </div>

          {/* Simple Contact Form */}
          <div className="p-6 sm:p-8 rounded-2xl border border-neutral-border/30 bg-white">
            <h2 className="text-base font-bold text-ink border-b border-neutral-border/50 pb-2 mb-4">
              Send a Message
            </h2>
            {status === "sent" ? (
              <div className="py-8 flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-soft-aqua text-cobalt border border-cobalt">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">Message sent</h3>
                <p className="mt-2 text-xs text-muted-text max-w-xs leading-relaxed">
                  Thanks for reaching out. A coordinator will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
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
                    rows={4}
                    autoComplete="off"
                    className="mt-1.5"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full btn-premium-cobalt font-semibold"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </Button>
                {status === "error" && (
                  <p className="text-xs text-destructive mt-2 text-center">
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
