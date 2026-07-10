import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, PhoneCall } from "@/components/ui/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      meta: [...seo.meta, { name: "theme-color", content: "#071A2B" }],
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

const launcherOptions = [
  {
    id: "expense",
    title: "Immediate expense",
    message:
      "Handle immediate bills, supplier cycles, or unexpected equipment updates. We package your file for reviewer review.",
  },
  {
    id: "inventory",
    title: "Inventory or equipment",
    message:
      "Secure seasonal stock at bulk discounts or acquire machinery. Submit six months of statements to start.",
  },
  {
    id: "growth",
    title: "Growth opportunity",
    message:
      "Expand to new operating spaces, secure commercial contracts, or fund client expansion operations.",
  },
  {
    id: "capacity",
    title: "Hiring or capacity",
    message:
      "Add support technicians, seasonal operators, or increase capability to handle larger orders.",
  },
  {
    id: "breathing",
    title: "More breathing room",
    message:
      "Build operational reserves or navigate historically slower months with flexible working capital.",
  },
] as const;

function Index() {
  const [need, setNeed] = useState<string | null>(null);

  return (
    <SiteLayout>
      {/* 1. Integrated Editorial Brand Hero */}
      <section className="bg-midnight-gradient text-white relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        {/* Abstract background brand lighting */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute -top-32 left-[15%] h-[450px] w-[450px] rounded-full bg-glow-radial blur-3xl opacity-50" />
          <div className="absolute top-[30%] -right-32 h-[500px] w-[500px] rounded-full bg-glow-radial blur-3xl opacity-30" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Column (Copy and actions) */}
            <div className="space-y-6 lg:col-span-7">
              <h1 className="text-4xl font-extrabold tracking-tight leading-tight text-white sm:text-5xl lg:text-6xl font-display">
                Business funding for <span className="text-signal-lime">what comes next.</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-cloud/80 sm:text-lg">
                Handle an immediate expense, purchase inventory or equipment, prepare for an
                opportunity, or create more room to operate. We help you complete and submit your
                application to Mom &amp; Pop Business Funding.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  asChild
                  className="rounded-full btn-premium-cobalt px-7 py-3 text-sm h-11 shadow-lg"
                >
                  <Link to="/apply">
                    Start My Application <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href="#what-youll-need"
                  className="text-sm font-bold text-white hover:text-cloud transition-colors flex items-center gap-1.5 py-2.5 px-5 rounded-full border border-white/20 hover:bg-white/5"
                >
                  See What You&rsquo;ll Need
                </a>
              </div>

              {/* Process reassurance bullet */}
              <div className="pt-6 border-t border-white/10 text-xs text-cloud/70 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="flex items-center gap-2">
                  <span className="text-signal-lime">✓</span> One straightforward application
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-signal-lime">✓</span> Clear document requirements
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-signal-lime">✓</span> Human representative follow-up
                </span>
              </div>
            </div>

            {/* Right Column (Masked documentary photograph) */}
            <div className="lg:col-span-5 relative w-full max-w-sm sm:max-w-md justify-self-center lg:justify-self-end">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] rounded-tr-[5rem] rounded-bl-[5rem] border border-white/10 shadow-2xl">
                <img
                  src="/images/stock/hero.jpg"
                  alt="Confident owner operating a small local business"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy/60 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Compact Funding-Need Selector */}
      <section className="bg-white py-12 border-b border-neutral-border/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-center font-bold text-ink text-sm sm:text-base tracking-tight mb-6">
              What would you like your business to move forward on?
            </h3>

            <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-5">
              {launcherOptions.map((opt) => {
                const isSelected = need === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setNeed(opt.id)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer text-xs font-bold leading-snug outline-none focus-visible:ring-2 focus-visible:ring-cobalt ${
                      isSelected
                        ? "border-cobalt bg-soft-aqua text-cobalt shadow-sm"
                        : "border-neutral-border hover:border-cobalt/50 bg-cloud/40 hover:bg-white text-muted-text"
                    }`}
                  >
                    {opt.title}
                  </button>
                );
              })}
            </div>

            {need && (
              <div className="mt-6 p-4 bg-cloud border border-neutral-border/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <p className="text-xs sm:text-sm text-ink leading-relaxed max-w-xl font-medium">
                  {launcherOptions.find((o) => o.id === need)?.message}
                </p>
                <Button
                  asChild
                  className="rounded-full btn-premium-cobalt px-5 py-2 font-semibold shrink-0 text-xs h-9"
                >
                  <Link to="/apply">Start Application &rarr;</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Practical Business Outcomes */}
      <section className="bg-cloud/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
              Dependable capital support for operational priorities
            </h2>
            <p className="mt-2 text-sm text-muted-text leading-relaxed">
              Business funding is structured to help address short-term operating needs, purchase
              inventory, or manage cash flow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] items-stretch">
            {/* Featured Outcome card */}
            <div className="card-premium p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-ink mb-3">
                  Managing inventory and operations
                </h3>
                <p className="text-sm text-muted-text leading-relaxed">
                  Keeping day-to-day operations moving is critical. Business owners utilize funding
                  to purchase stock at bulk discounts, manage employee payroll cycles, cover
                  supplier invoices, or handle unexpected machinery repairs. Maintaining operational
                  rhythm prevents lost momentum.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-neutral-border/30 text-xs text-muted-text">
                Outcome priorities focus on supporting employees and planning operations instead of
                reacting to immediate hurdles.
              </div>
            </div>

            {/* Side list stack */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="card-premium p-5 rounded-2xl flex-1 flex flex-col justify-center">
                <h4 className="font-bold text-ink text-sm">Purchase required equipment</h4>
                <p className="mt-1 text-xs text-muted-text leading-relaxed">
                  Acquire restaurant equipment, repair machinery, commercial vehicles, or IT
                  hardware to increase operational capacity.
                </p>
              </div>
              <div className="card-premium p-5 rounded-2xl flex-1 flex flex-col justify-center">
                <h4 className="font-bold text-ink text-sm">Create financial flexibility</h4>
                <p className="mt-1 text-xs text-muted-text leading-relaxed">
                  Secure breathing room to cover rent, taxes, or utilities during historical slow
                  months or off-season periods.
                </p>
              </div>
              <div className="card-premium p-5 rounded-2xl flex-1 flex flex-col justify-center">
                <h4 className="font-bold text-ink text-sm">Invest in client expansion</h4>
                <p className="mt-1 text-xs text-muted-text leading-relaxed">
                  Finance initial raw materials, hire short-term contractors, or expand capacity to
                  fulfill larger corporate orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Simple Three-Step Application Process */}
      <section className="bg-midnight-navy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl border-l-2 border-signal-lime pl-4 mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Three steps to complete your file
            </h2>
            <p className="mt-2 text-sm text-cloud/70 leading-relaxed">
              We help you move your file from initial application to final review with clear,
              representative coordination.
            </p>
          </div>

          <div className="relative">
            {/* Desktop connecting track line */}
            <div className="absolute top-6 left-6 right-6 hidden h-[1px] bg-white/10 md:block" />

            <div className="grid gap-8 md:grid-cols-3 relative">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-signal-lime bg-midnight-navy text-signal-lime font-bold text-sm relative z-10 shadow-lg">
                    01
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Complete the form</h3>
                  <p className="mt-1.5 text-xs text-cloud/70 leading-relaxed">
                    Submit basic business details, owner contact information, and requested funding
                    parameters via our secure form.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-midnight-navy text-cloud/80 font-bold text-sm relative z-10">
                    02
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Provide bank statements</h3>
                  <p className="mt-1.5 text-xs text-cloud/70 leading-relaxed">
                    Provide six months of recent business bank statements. These are required to
                    evaluate cash flow and verify business activity.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-midnight-navy text-cloud/80 font-bold text-sm relative z-10">
                    03
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Review with coordinator</h3>
                  <p className="mt-1.5 text-xs text-cloud/70 leading-relaxed">
                    A representative will contact you directly to discuss the file details,
                    coordinate with the funder, and explain options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What Applicants Should Prepare */}
      <section id="what-youll-need" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Preparation Checklist */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">
              What you need to prepare
            </h2>
            <p className="text-xs text-muted-text leading-relaxed">
              Having the following files and details ready will help complete the coordinator review
              faster.
            </p>
            <ul className="mt-6 space-y-4 text-xs">
              {[
                "Legal business name and physical operating address",
                "Owner identification and tax ID (EIN)",
                "Six consecutive months of recent business bank statements",
                "Active business phone number and email address",
                "Original funding agreement (only if you carry an existing balance)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-soft-aqua text-cobalt font-bold">
                    ✓
                  </span>
                  <span className="text-ink font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiet, separate no-guarantee disclosure */}
          <div className="flex flex-col justify-center bg-cloud/35 p-6 rounded-2xl border border-neutral-border/30">
            <span className="text-xs font-bold text-cobalt mb-2">Approval notice</span>
            <p className="text-xs text-muted-text leading-relaxed">
              SmallBizLoans.com is an independent representative and does not make credit decisions.
              Approval, terms, and final offers depend entirely on the underwriting review of your
              statements and files conducted by Mom &amp; Pop Business Funding.
            </p>
          </div>
        </div>
      </section>

      {/* 6. How SmallBizLoans Helps (Role Explanation - lower in page) */}
      <section className="bg-cloud/40 border-t border-b border-neutral-border/20 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-4">
              How SmallBizLoans helps
            </h2>
            <p className="text-sm text-muted-text leading-relaxed">
              SmallBizLoans helps business owners prepare and submit applications to Mom &amp; Pop
              Business Funding. We are an independent representative, not a bank. Mom &amp; Pop
              Business Funding reviews submitted applications and determines whether funding options
              are available.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Human Contact Assistance */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="card-premium bg-soft-aqua/10 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-lg font-bold text-ink">Need assistance preparing your file?</h3>
            <p className="text-xs text-muted-text leading-relaxed">
              If you have questions about the requested statements or how the coordinator process
              operates, speak directly with our team during business hours.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs shrink-0 w-full sm:w-auto">
            <div>
              <span className="block text-[11px] font-bold text-muted-text mb-0.5">
                Direct Line
              </span>
              <a
                href="tel:+17209001921"
                className="text-ink font-bold hover:underline text-sm sm:text-base block"
              >
                (720) 900-1921
              </a>
            </div>
            <div>
              <span className="block text-[11px] font-bold text-muted-text mb-0.5">
                Email Support
              </span>
              <a
                href="mailto:lizzy.alemayehu@smallbizloanz.com"
                className="text-ink font-bold break-all hover:underline block"
              >
                lizzy.alemayehu@smallbizloanz.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Short FAQ Preview */}
      <section className="bg-cloud/20 border-t border-b border-neutral-border/20 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
              Common application questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="divide-y divide-neutral-border/40">
              <AccordionItem value="item-1" className="border-b border-neutral-border/40">
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline py-4 text-ink hover:text-cobalt transition-colors">
                  How many months of statements are required?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-text leading-relaxed pb-4">
                  Six months of consecutive recent business bank statements are requested so the
                  review can be conducted against actual operating history and cash flow.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-neutral-border/40">
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline py-4 text-ink hover:text-cobalt transition-colors">
                  Is approval guaranteed by SmallBizLoans?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-text leading-relaxed pb-4">
                  No. SmallBizLoans coordinates files but does not make credit decisions. Approval,
                  terms, and offers are determined exclusively by Mom &amp; Pop Business Funding
                  after review.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline py-4 text-ink hover:text-cobalt transition-colors">
                  Is SmallBizLoans a bank?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-text leading-relaxed pb-4">
                  No, we are an independent representative working to assist small business owners.
                  We help package files and submit them to direct funding providers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center mt-6">
            <Link to="/faq" className="text-xs font-bold text-cobalt hover:underline">
              View all frequently asked questions &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Final Application Action */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
            Start coordinating your application file
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-text">
            Submit your core business information online. The initial coordinator intake form takes
            approximately 5 minutes.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
            <Button
              asChild
              className="rounded-full btn-premium-cobalt px-7 py-3 font-semibold text-sm h-11 shadow-md"
            >
              <Link to="/apply">
                Start My Application <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full btn-premium-outline px-7 py-3 text-sm h-11"
            >
              <Link to="/contact">Contact Coordinator Desk</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
