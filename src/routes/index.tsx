import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileText,
  ClipboardCheck,
  PhoneCall,
  CheckCircle2,
  Building2,
  Clock,
  Layers,
  Landmark,
} from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

const benefits = [
  {
    icon: ClipboardCheck,
    title: "Simple application",
    desc: "A short online form — no lengthy paperwork or in-person visits.",
  },
  {
    icon: FileText,
    title: "Minimal paperwork",
    desc: "Six months of recent business bank statements is usually all we need.",
  },
  {
    icon: Layers,
    title: "Flexible funding options",
    desc: "Options structured around your revenue and how your business operates.",
  },
  {
    icon: Clock,
    title: "Fast review",
    desc: "Applications are reviewed promptly and you'll hear back from a real person.",
  },
  {
    icon: Building2,
    title: "Traditional & nontraditional",
    desc: "We work with retail, restaurants, service businesses, home-based, and more.",
  },
  {
    icon: Landmark,
    title: "Bank statement based",
    desc: "Funding decisions consider real cash flow, not just credit history.",
  },
];

const steps = [
  {
    n: "01",
    title: "Complete the online application",
    desc: "Tell us about your business and how much funding you're looking for.",
  },
  {
    n: "02",
    title: "Submit your documents",
    desc: "Upload six months of recent business bank statements and any supporting documents.",
  },
  {
    n: "03",
    title: "Talk with a representative",
    desc: "A representative reviews your application and contacts you regarding next steps.",
  },
];

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-24">
          <div className="relative z-10 flex flex-col justify-center">
            <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              Small Business Loans <span className="text-brand">Made Simple</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
              Access business funding through a straightforward application process with minimal
              paperwork.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90 sm:w-auto"
              >
                <Link to="/apply">
                  Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-full sm:w-auto">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Six months of recent business bank statements required.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-primary shadow-2xl shadow-primary/10 sm:aspect-[16/10]">
            <img
              src="/images/hero-business-funding.png"
              alt="Small-business owner reviewing plans with a funding advisor in a bakery"
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Funding built around your business
          </h2>
          <p className="mt-3 text-muted-foreground">
            We focus on making funding accessible for the businesses that traditional lenders often
            overlook.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-sm"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              Three simple steps from application to a conversation with a representative.
            </p>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-semibold text-brand">{s.n}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <Link to="/apply">
                Start your application <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Requirements strip */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">What you'll need</h2>
            <p className="mt-3 text-muted-foreground">
              We keep documentation light. The application itself takes most applicants under 15
              minutes.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Basic business and ownership information",
                "Six months of recent business bank statements",
                "Original funding contract (only if you have an existing balance)",
                "Any optional supporting documents you'd like to include",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground md:p-10">
            <PhoneCall className="h-6 w-6 opacity-80" />
            <h3 className="mt-4 text-2xl font-semibold">Prefer to talk it through?</h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Call or email and a representative will walk you through the process.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href="tel:+17209001921" className="block font-medium hover:underline">
                (720) 900-1921
              </a>
              <a
                href="mailto:lizzy.alemayehu@smallbizloanz.com"
                className="block font-medium break-all hover:underline"
              >
                lizzy.alemayehu@smallbizloanz.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
