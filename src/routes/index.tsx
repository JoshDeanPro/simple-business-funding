import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  Landmark,
  Layers,
  PhoneCall,
} from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  organizationSchema,
  pageHead,
  toJsonLd,
  webpageSchema,
  websiteSchema,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = pageHead({
      title: "Small Business Loans and Business Funding | SmallBizLoans",
      description:
        "Apply online for small-business funding with a clear review process, six months of recent business bank statements, and straightforward contact options.",
      path: "/",
      imageAlt: "SmallBizLoans small business loans and business funding",
    });
    return {
      ...seo,
      meta: [...seo.meta, { name: "theme-color", content: "#f9fafb" }],
      scripts: [
        toJsonLd(organizationSchema()),
        toJsonLd(websiteSchema()),
        toJsonLd(
          webpageSchema({
            title: "Small Business Loans and Business Funding",
            description:
              "Apply online for small-business funding with a clear review process and straightforward contact options.",
            path: "/",
            breadcrumbs: [{ name: "Home", path: "/" }],
          }),
        ),
      ],
    };
  },
  component: Index,
});

const benefits = [
  {
    icon: ClipboardCheck,
    title: "Simple application",
    desc: "A short online form with clear steps and no in-person visit required.",
  },
  {
    icon: FileText,
    title: "Focused documentation",
    desc: "Six months of recent business bank statements is generally the main upload request.",
  },
  {
    icon: Layers,
    title: "Flexible funding options",
    desc: "Options structured around your revenue and how your business operates.",
  },
  {
    icon: Clock,
    title: "Clear review process",
    desc: "Applications are reviewed based on the information and documents you submit.",
  },
  {
    icon: Building2,
    title: "Traditional & nontraditional",
    desc: "We work with retail, restaurants, service businesses, home-based businesses, and more.",
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
    desc: "Tell us about your business, the funding request, and basic contact information.",
  },
  {
    n: "02",
    title: "Submit your documents",
    desc: "Upload six months of recent business bank statements and any supporting documents.",
  },
  {
    n: "03",
    title: "Talk with a representative",
    desc: "A representative reviews the submission and follows up about next steps.",
  },
];

function Index() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:py-20">
          <div className="relative z-10 flex flex-col justify-center">
            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              Small Business Loans and Business Funding
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              Apply online for small-business funding. We review submitted business information,
              and six months of recent business bank statements may be required.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-brand text-brand-foreground hover:bg-brand-hover sm:w-auto"
              >
                <Link to="/apply">
                  Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-full sm:w-auto">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Business funding for eligible small businesses. No guarantee of approval or funding.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface shadow-lg shadow-foreground/10 sm:aspect-[16/10]">
            <img
              src="/images/stock/hero.jpg"
              alt="Small-business owner reviewing plans with a funding advisor in a bakery"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Business funding for eligible small businesses
          </h2>
          <p className="mt-3 text-muted-foreground">
            We keep the process straightforward so business owners can understand what is
            requested, what will be reviewed, and what happens next.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-transparent p-2 transition-colors hover:bg-surface"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              Three simple steps from online application to a conversation with a representative.
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
              className="rounded-full bg-brand text-brand-foreground hover:bg-brand-hover"
            >
              <Link to="/apply">
                Start your application <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">What you'll need</h2>
            <p className="mt-3 text-muted-foreground">
              We keep documentation focused on the information that helps us review the request.
              The application itself takes most applicants under 15 minutes.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Basic business and ownership information",
                "Six months of recent business bank statements",
                "Original funding contract (only if you have an existing balance)",
                "Any optional supporting documents you'd like to include",
                "A clear way to contact your business if we have questions",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              If you need help before you start, use the contact options below or read the FAQ
              page for a quick overview of the process.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-8 text-foreground md:p-10">
            <PhoneCall className="h-6 w-6 text-brand" />
            <h3 className="mt-4 text-2xl font-semibold">Prefer to talk it through?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
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
