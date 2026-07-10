import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Layers,
  PhoneCall,
} from "@/components/ui/icons";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { organizationSchema, pageHead, toJsonLd, webpageSchema, websiteSchema } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = pageHead({
      title: "Small Business Funding | SmallBizLoans",
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
            title: "Small Business Funding",
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
    icon: Clock,
    title: "Keep operations moving",
    desc: "Funding may help with everyday business needs, payroll timing, inventory, or an unexpected expense.",
  },
  {
    icon: Building2,
    title: "Invest in what comes next",
    desc: "Owners may use funding toward equipment, inventory, a new opportunity, or preparing for growth.",
  },
  {
    icon: Layers,
    title: "Create breathing room",
    desc: "Additional working room may make it easier to manage a short-term business need without losing focus.",
  },
  {
    icon: ClipboardCheck,
    title: "Stay focused on the work",
    desc: "The right support may create more room to focus on customers, employees, family, and the business you built.",
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
              Business funding for what comes next
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              Handle an immediate business need, prepare for a new opportunity, or create more room
              to keep moving forward. Start with one straightforward application.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-brand text-brand-foreground hover:bg-brand-hover sm:w-auto"
              >
                <Link to="/apply">
                  Start your application <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-full sm:w-auto">
                <a href="#what-youll-need">See what you&rsquo;ll need</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              One application. Recent business bank statements. Personal help when you need it.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-sm leading-6 text-foreground">
              <p className="font-semibold text-foreground">
                A straightforward connection to business funding
              </p>
              <p className="mt-2 text-muted-foreground">
                SmallBizLoans helps business owners submit funding applications to Mom &amp; Pop
                Business Funding. We are an independent representative, not a bank. Mom &amp; Pop
                Business Funding reviews submitted applications and determines whether funding
                options are available.
              </p>
            </div>
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
            Funding that fits real business needs
          </h2>
          <p className="mt-3 text-muted-foreground">
            The goal is not pressure. It is making the request relevant, manageable, and clear
            enough that a busy business owner can decide whether to move forward.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={title}
              className={`rounded-2xl border border-border p-6 transition-colors ${
                index === 0 ? "bg-surface md:col-span-2 xl:col-span-1" : "bg-card"
              }`}
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-foreground">
                <Icon className="h-5 w-5" />
              </div>
              {index === 0 && <div className="mt-5 h-1 w-12 rounded-full bg-brand" />}
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
              A straightforward path from your first form to a conversation with a representative.
            </p>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-semibold text-foreground">{s.n}</span>
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
        <div
          id="what-youll-need"
          className="grid gap-10 rounded-3xl border border-border bg-card p-8 md:grid-cols-2 md:p-12"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight">What you&rsquo;ll need to apply</h2>
            <p className="mt-3 text-muted-foreground">
              Have the basics ready before you begin. The application asks about your business,
              ownership, contact information, and how the funding may support the business.
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
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              If you need help before you start, use the contact options below or read the FAQ page
              for a quick overview of the process.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-8 text-foreground md:p-10">
            <PhoneCall className="h-6 w-6 text-foreground" />
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

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl bg-foreground px-8 py-10 text-background sm:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Ready when you are
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your business deserves room to move forward
            </h2>
            <p className="mt-4 text-sm leading-7 text-background/75 sm:text-base">
              When the right opportunity or expense cannot wait, a funding application can be the
              first step toward understanding the options available to your business.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-brand text-brand-foreground hover:bg-brand-hover"
            >
              <Link to="/apply">
                Start your application <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-background/30 bg-transparent text-background hover:bg-background/10"
            >
              <a href="#what-youll-need">See what you&rsquo;ll need</a>
            </Button>
          </div>
          <p className="mt-5 text-xs leading-6 text-background/65">
            Submitting an application does not guarantee approval, funding, rates, terms, or funding
            amounts.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
