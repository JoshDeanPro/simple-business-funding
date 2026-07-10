import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Smallbizloanz" },
      { name: "description", content: "Get in touch with Smallbizloanz by phone, email, or the contact form." },
      { property: "og:title", content: "Contact — Smallbizloanz" },
      { property: "og:description", content: "Reach a Smallbizloanz representative by phone or email." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("sent");
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact us</h1>
            <p className="mt-4 text-muted-foreground">
              Have a question about the application or your business situation? We're happy to help.
            </p>
            <div className="mt-8 space-y-4">
              <a href="mailto:lizzy.alemayehu@smallbizloanz.com" className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-brand">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</div>
                  <div className="mt-0.5 break-all text-sm font-medium">lizzy.alemayehu@smallbizloanz.com</div>
                </div>
              </a>
              <a href="tel:+17209001921" className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-brand">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone</div>
                  <div className="mt-0.5 text-sm font-medium">(720) 900-1921</div>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            {status === "sent" ? (
              <div className="flex flex-col items-center text-center">
                <CheckCircle2 className="h-10 w-10 text-brand" />
                <h2 className="mt-4 text-xl font-semibold">Message sent</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thanks for reaching out. A representative will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Name" required />
                  <Field id="business" label="Business name" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="email" label="Email" type="email" required />
                  <Field id="phone" label="Phone" type="tel" />
                </div>
                <div>
                  <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                  <Textarea id="message" name="message" required rows={5} className="mt-1.5" />
                </div>
                <Button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90">
                  {status === "sending" ? "Sending…" : "Send message"}
                </Button>
                {status === "error" && (
                  <p className="text-sm text-destructive">Something went wrong. Please try again or email us directly.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ id, label, type = "text", required }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <Label htmlFor={id}>{label}{required && <span className="text-destructive"> *</span>}</Label>
      <Input id={id} name={id} type={type} required={required} className="mt-1.5" />
    </div>
  );
}
