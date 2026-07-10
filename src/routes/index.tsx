import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
    title: "Provide any requested documents",
    desc: "Recent business bank statements and supporting documents may be requested during follow-up.",
  },
  {
    n: "03",
    title: "Talk with a representative",
    desc: "A representative reviews the submission and follows up about next steps.",
  },
];

const goalChoices = [
  "Immediate business expenses",
  "Inventory or equipment",
  "Growth or a larger opportunity",
  "Hiring or increasing capacity",
  "Additional breathing room",
  "Something else",
] as const;

const focusChoices = [
  "Customers",
  "Growth",
  "Employees",
  "Planning instead of reacting",
  "More time outside the business",
  "Another priority",
] as const;

function Index() {
  const [goal, setGoal] = useState<(typeof goalChoices)[number] | "">("");
  const [focus, setFocus] = useState<(typeof focusChoices)[number] | "">("");

  return (
    <SiteLayout>
      {/* Editorial Hero */}
      <section className="bg-paper border-b border-neutral-border/50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Straightforward business funding for what comes next
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-text sm:text-lg">
              Manage an immediate operational need, purchase inventory, or create breathing room to keep your business moving forward. We represent Mom & Pop Business Funding to help you submit your application efficiently.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="rounded bg-evergreen text-white hover:bg-evergreen/90 px-6 font-semibold"
              >
                <Link to="/apply">
                  Start My Application <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <a
                href="#what-youll-need"
                className="text-sm font-semibold text-evergreen hover:text-evergreen/95 hover:underline"
              >
                See what you&rsquo;ll need to prepare
              </a>
            </div>
          </div>

          {/* Goal selection module directly under the hero text */}
          <div className="mt-12 border border-neutral-border bg-white p-6 rounded">
            <div className="border-b border-neutral-border/50 pb-4 mb-4">
              <h2 className="text-base font-bold text-ink">Guided Planning Worksheet</h2>
              <p className="text-xs text-muted-text mt-0.5">
                Understand how business funding might fit your goals. This reflection tool is local and is not stored or shared.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-evergreen">1. Identify your business need</span>
                <p className="text-xs text-muted-text mt-0.5">What keeps getting delayed or requires immediate capital?</p>
                <div className="mt-3 grid gap-1.5 sm:grid-cols-1">
                  {goalChoices.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setGoal(option)}
                      className={`w-full rounded border px-3 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-evergreen ${
                        goal === option
                          ? "border-evergreen bg-sage/30 text-evergreen"
                          : "border-neutral-border bg-white text-ink hover:bg-paper"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-evergreen">2. Select your priority focus</span>
                <p className="text-xs text-muted-text mt-0.5">What would handling that allow you to concentrate on?</p>
                <div className="mt-3 grid gap-1.5">
                  {focusChoices.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFocus(option)}
                      className={`w-full rounded border px-3 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-evergreen ${
                        focus === option
                          ? "border-evergreen bg-sage/30 text-evergreen"
                          : "border-neutral-border bg-white text-ink hover:bg-paper"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t border-neutral-border/50 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <span className="text-xs font-bold text-muted-text uppercase tracking-wider">Your Reflection Summary</span>
                <p className="text-sm font-semibold text-ink mt-1">
                  {goal && focus ? (
                    <span>
                      If funding helps with <span className="text-evergreen">{goal.toLowerCase()}</span>, it may create more room to focus on <span className="text-evergreen">{focus.toLowerCase()}</span>.
                    </span>
                  ) : (
                    <span className="text-muted-text italic">Select options in Step 1 and Step 2 to generate your reflection summary.</span>
                  )}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-3.5">
                <Button asChild size="sm" className="rounded bg-evergreen text-white hover:bg-evergreen/90 font-semibold">
                  <Link to="/apply">Start Application</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Documentary Image strip below the decision module */}
          <div className="mt-8 border border-neutral-border bg-white p-1.5 rounded">
            <img
              src="/images/stock/hero.jpg"
              alt="Small-business owner reviewing operations in a local shop"
              className="w-full h-auto max-h-[380px] object-cover rounded-sm"
            />
          </div>

          <div className="mt-6 border border-neutral-border bg-white p-5 rounded text-xs leading-relaxed text-ink">
            <p className="font-bold">Representing Mom & Pop Business Funding</p>
            <p className="mt-1.5 text-muted-text">
              SmallBizLoans assists small business owners in submitting applications directly to Mom & Pop Business Funding. We function as an independent representative. Mom & Pop Business Funding reviews all application files to determine eligibility and funding terms. We are not a direct lender or bank.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Funding Uses */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl border-l-2 border-evergreen pl-4">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Practical applications for business capital
          </h2>
          <p className="mt-2 text-sm text-muted-text leading-relaxed">
            Financing should resolve specific business challenges. Here is how small business owners commonly apply their working capital.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mt-10">
          <div className="lg:col-span-2 bg-white border border-neutral-border p-6 rounded">
            <span className="text-xs font-bold uppercase tracking-wider text-evergreen">Primary Application</span>
            <h3 className="mt-2 text-lg font-bold text-ink">Managing operations & inventory</h3>
            <p className="mt-3 text-sm text-muted-text leading-relaxed">
              Day-to-day operations should remain continuous. Small business owners utilize funding to handle seasonal inventory purchases, manage payroll cycles, pay vendor accounts, or manage unexpected equipment issues. Maintaining constant operations ensures you don't lose momentum.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-border p-5 rounded">
              <h4 className="font-bold text-ink text-sm">Purchase business equipment</h4>
              <p className="mt-1 text-xs text-muted-text">Acquire machinery, vehicles, computer hardware, or restaurant equipment to expand business capacity.</p>
            </div>
            <div className="bg-white border border-neutral-border p-5 rounded">
              <h4 className="font-bold text-ink text-sm">Create financial flexibility</h4>
              <p className="mt-1 text-xs text-muted-text">Secure breathing room during slower months or prepare for unexpected business needs.</p>
            </div>
            <div className="bg-white border border-neutral-border p-5 rounded">
              <h4 className="font-bold text-ink text-sm">Invest in client growth</h4>
              <p className="mt-1 text-xs text-muted-text">Finance marketing efforts, hire seasonal staff, or secure raw materials for larger contracts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Connected Process Flow */}
      <section className="bg-white border-t border-b border-neutral-border/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl border-l-2 border-evergreen pl-4 mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Application process
            </h2>
            <p className="mt-2 text-sm text-muted-text leading-relaxed">
              A structured path from your initial online submission to receiving a final decision.
            </p>
          </div>

          <div className="relative">
            {/* Horizontal connecting line for desktop */}
            <div className="absolute top-6 left-4 right-4 hidden h-[1px] bg-neutral-border md:block" />
            
            <div className="grid gap-8 md:grid-cols-3 relative">
              <div className="relative">
                <div className="flex items-center gap-3 md:flex-col md:items-start">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-evergreen bg-paper text-evergreen font-bold text-sm relative z-10">
                    01
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-signal-green border border-white" />
                  </div>
                  <div className="md:mt-4">
                    <h3 className="font-bold text-ink text-base">Complete the online form</h3>
                    <p className="mt-1.5 text-xs text-muted-text leading-relaxed">Submit core details about your business operations, requesting amount, and owner contact information.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center gap-3 md:flex-col md:items-start">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-neutral-border bg-white text-muted-text font-bold text-sm relative z-10">
                    02
                  </div>
                  <div className="md:mt-4">
                    <h3 className="font-bold text-ink text-base">Provide business bank statements</h3>
                    <p className="mt-1.5 text-xs text-muted-text leading-relaxed">Upload or email six months of recent business bank statements to complete your files.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center gap-3 md:flex-col md:items-start">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-neutral-border bg-white text-muted-text font-bold text-sm relative z-10">
                    03
                  </div>
                  <div className="md:mt-4">
                    <h3 className="font-bold text-ink text-base">Discuss with a representative</h3>
                    <p className="mt-1.5 text-xs text-muted-text leading-relaxed">A coordinator will contact you to confirm details and coordinate the review of your file.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-start">
            <Button
              asChild
              className="rounded bg-evergreen text-white hover:bg-evergreen/90 px-6 font-semibold"
            >
              <Link to="/apply">
                Start My Application <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Requirements and Contactsplit layout */}
      <section id="what-youll-need" className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="bg-white border border-neutral-border p-6 rounded">
            <h2 className="text-xl font-bold tracking-tight text-ink">What is required to apply</h2>
            <p className="mt-2 text-xs text-muted-text leading-relaxed">
              To expedite the review process, prepare the following items prior to starting the application form.
            </p>
            <ul className="mt-6 space-y-4 text-xs">
              {[
                "Basic corporate and ownership details",
                "Six months of consecutive recent business bank statements",
                "Active business phone number and email address",
                "Original funding contract (only if you carry an existing balance)",
                "Optional supporting documents showing steady business revenue",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-sage/40 text-evergreen">✓</span>
                  <span className="text-ink font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-blue-soft/50 border border-neutral-border p-6 rounded flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white border border-neutral-border text-evergreen">
                <PhoneCall className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">Need assistance preparing?</h3>
              <p className="mt-2 text-xs text-muted-text leading-relaxed">
                If you have questions about the application or requirements, our support team can guide you.
              </p>
              <div className="mt-6 space-y-3.5 text-xs">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-muted-text">Direct Phone</span>
                  <a href="tel:+17209001921" className="text-ink font-bold hover:underline mt-0.5 block">
                    (720) 900-1921
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-muted-text">Support Email</span>
                  <a
                    href="mailto:lizzy.alemayehu@smallbizloanz.com"
                    className="text-ink font-bold break-all hover:underline mt-0.5 block"
                  >
                    lizzy.alemayehu@smallbizloanz.com
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-6 text-[10px] text-muted-text leading-relaxed">
              We operate during standard business hours to assist small business owners.
            </p>
          </div>
        </div>
      </section>

      {/* Clear, Corporate Closing Action */}
      <section className="border-t border-neutral-border/50 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            A structured path to business financing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-text">
            When you require working capital to navigate operational demands or purchase inventory, our REPRESENTATIVES can coordinate file reviews with Mom & Pop Business Funding.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
            <Button
              asChild
              className="rounded bg-evergreen text-white hover:bg-evergreen/90 px-6 font-semibold"
            >
              <Link to="/apply">
                Start My Application <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded border-neutral-border hover:bg-paper text-ink"
            >
              <a href="#what-youll-need">Review Requirements</a>
            </Button>
          </div>
          <p className="mt-6 text-[10px] text-muted-text">
            SmallBizLoans does not guarantee approval, rates, terms, or funding amounts. All files are reviewed by Mom & Pop Business Funding.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
