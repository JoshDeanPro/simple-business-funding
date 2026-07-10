import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  PhoneCall,
} from "@/components/ui/icons";
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
    label: "Step 1",
    title: "An immediate expense",
    message: "Bills, supplier accounts, or sudden machinery failures can impact day-to-day operations. We can help submit your application file to Mom & Pop Business Funding to request a review.",
  },
  {
    id: "inventory",
    label: "Step 2",
    title: "Inventory or equipment",
    message: "Securing stock before a busy season or purchasing machinery allows you to expand capacity. Six months of recent bank statements will help complete your file.",
  },
  {
    id: "growth",
    label: "Step 3",
    title: "A growth opportunity",
    message: "Moving to a larger location, securing commercial leases, or locking down larger client contracts requires dependable working capital.",
  },
  {
    id: "capacity",
    label: "Step 4",
    title: "Hiring or added capacity",
    message: "Bringing on specialized technicians, adding seasonal helpers, or training staff ensures operations continue running smoothly.",
  },
  {
    id: "breathing",
    label: "Step 5",
    title: "More breathing room",
    message: "Building a cash reserve or setting aside capital to manage seasonal slower months provides operational peace of mind.",
  },
] as const;

function Index() {
  const [need, setNeed] = useState<string | null>(null);

  return (
    <SiteLayout>
      {/* 1. Immersive Brand Hero */}
      <section className="bg-midnight-gradient border-b border-neutral-border/20 text-white relative overflow-hidden pb-28 pt-16 sm:pt-20">
        {/* Soft background glows */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute -top-40 left-[10%] h-[500px] w-[500px] rounded-full bg-glow-radial blur-3xl opacity-60" />
          <div className="absolute top-[20%] -right-40 h-[600px] w-[600px] rounded-full bg-glow-radial blur-3xl opacity-40" />
        </div>
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Left side text and credentials */}
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight leading-none text-white sm:text-5xl lg:text-6xl font-display">
                Straightforward business funding <span className="text-signal-lime">to move forward.</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-cloud/80 sm:text-lg">
                Manage immediate operational expenses, purchase required inventory, or secure cash reserve breathing room. We help coordinate your file directly with Mom &amp; Pop Business Funding.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  asChild
                  className="rounded-full btn-premium-lime px-7 py-3 text-sm h-11 shadow-lg"
                >
                  <Link to="/apply">
                    Start My Application <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href="#what-youll-need"
                  className="text-sm font-bold text-cloud hover:text-white transition-colors flex items-center gap-1.5 py-2.5 px-4 rounded-full border border-white/20 hover:bg-white/5"
                >
                  See What You&rsquo;ll Need
                </a>
              </div>
              
              {/* Layered factual points */}
              <div className="pt-6 border-t border-white/10 grid gap-3 sm:grid-cols-2 text-xs text-cloud/70">
                <div className="flex items-center gap-2">
                  <span className="text-signal-lime font-bold">✓</span> One straightforward application
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-signal-lime font-bold">✓</span> Bank statements requested for review
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-signal-lime font-bold">✓</span> Human coordinator follow-up
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-signal-lime font-bold">✓</span> No guarantee of approval
                </div>
              </div>
            </div>

            {/* Right side visual composition */}
            <div className="relative justify-self-center lg:justify-self-end w-full max-w-sm sm:max-w-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src="/images/stock/hero.jpg"
                  alt="Small-business owner working confidently in a local shop"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy/60 to-transparent pointer-events-none" />
              </div>
              
              {/* Layered floating overlay card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl border border-neutral-border shadow-xl max-w-[230px] text-xs text-ink font-semibold animate-in zoom-in-50 duration-500">
                <span className="block text-cobalt font-bold text-[10px] uppercase tracking-wider mb-1">File Coordination</span>
                Representing your business files directly to Mom &amp; Pop Business Funding.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overlapping Need Launcher */}
      <section className="relative z-20 -mt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="bg-white border border-neutral-border rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-center font-bold text-ink text-base sm:text-lg uppercase tracking-wider border-b border-neutral-border/50 pb-3 mb-6">
              What would you like your business to move forward on?
            </h3>
            
            <div className="grid gap-3 sm:grid-cols-5">
              {launcherOptions.map((opt) => {
                const isSelected = need === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setNeed(opt.id)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      isSelected
                        ? "border-cobalt bg-soft-aqua text-cobalt ring-2 ring-cobalt/25 font-bold shadow-sm"
                        : "border-neutral-border hover:border-cobalt/50 bg-cloud/50 hover:bg-white text-muted-text"
                    }`}
                  >
                    <span className="block text-[9px] uppercase tracking-wider mb-1.5 font-extrabold opacity-65 text-muted-text">{opt.label}</span>
                    <span className="text-xs font-bold text-ink leading-snug">{opt.title}</span>
                  </button>
                );
              })}
            </div>
            
            {need && (
              <div className="mt-6 p-4 bg-cloud border border-neutral-border/60 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm text-ink leading-relaxed max-w-2xl font-medium">
                  {launcherOptions.find((o) => o.id === need)?.message}
                </p>
                <Button
                  asChild
                  className="rounded-full btn-premium-cobalt px-6 font-semibold shrink-0 text-xs h-9 shadow"
                >
                  <Link to="/apply">Start Application &rarr;</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Role Explanation (Declaring Coordinator Status) */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="bg-cloud border border-neutral-border/50 rounded-2xl p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] items-center">
            <div className="border-l-4 border-cobalt pl-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cobalt">Corporate Role</span>
              <h2 className="text-2xl font-bold tracking-tight text-ink mt-2">
                Our Relationship to Mom &amp; Pop Business Funding
              </h2>
            </div>
            <div className="text-sm text-muted-text space-y-4">
              <p>
                SmallBizLoans operates as an <strong>independent representative</strong>. We are not a bank, underwriting house, or direct lender. Our function is to assist small business owners in coordinating their files and submitting their applications to <strong>Mom &amp; Pop Business Funding</strong>.
              </p>
              <p>
                Once submitted, Mom &amp; Pop Business Funding reviews the business bank statements and application parameters to determine overall eligibility and terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Practical Business Outcomes */}
      <section className="bg-cloud/40 border-t border-b border-neutral-border/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cobalt">Business Outcomes</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink mt-2">
              Dependable capital support for operational priorities
            </h2>
            <p className="mt-2 text-sm text-muted-text leading-relaxed">
              Business funding is structured to help address short-term operating needs, purchase inventory, or manage cash flow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] items-stretch">
            {/* Featured block */}
            <div className="card-premium p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-growth-green">Featured Application</span>
                <h3 className="text-xl font-bold text-ink mt-2 mb-3">Managing inventory &amp; operations</h3>
                <p className="text-sm text-muted-text leading-relaxed">
                  Keeping day-to-day operations moving is critical. Business owners utilize funding to purchase stock at bulk discounts, manage employee payroll cycles, cover supplier invoices, or handle unexpected machinery repairs. Maintaining operational rhythm prevents lost momentum.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-neutral-border/30 text-xs text-muted-text italic">
                Outcome priorities focus on supporting employees and planning operations instead of reacting to immediate hurdles.
              </div>
            </div>

            {/* Side list stack */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="card-premium p-5 rounded-2xl flex-1 flex flex-col justify-center">
                <h4 className="font-bold text-ink text-sm">Purchase required equipment</h4>
                <p className="mt-1.5 text-xs text-muted-text leading-relaxed">
                  Acquire restaurant equipment, repair machinery, commercial vehicles, or IT hardware to increase operational capacity.
                </p>
              </div>
              <div className="card-premium p-5 rounded-2xl flex-1 flex flex-col justify-center">
                <h4 className="font-bold text-ink text-sm">Create financial flexibility</h4>
                <p className="mt-1.5 text-xs text-muted-text leading-relaxed">
                  Secure breathing room to cover rent, taxes, or utilities during historical slow months or off-season periods.
                </p>
              </div>
              <div className="card-premium p-5 rounded-2xl flex-1 flex flex-col justify-center">
                <h4 className="font-bold text-ink text-sm">Invest in client expansion</h4>
                <p className="mt-1.5 text-xs text-muted-text leading-relaxed">
                  Finance initial raw materials, hire short-term contractors, or expand capacity to fulfill larger corporate orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Connected Application Process */}
      <section className="bg-midnight-gradient text-white py-16 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl border-l-2 border-signal-lime pl-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-signal-lime">Clear Progression</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white mt-2">
              Three steps to complete your file
            </h2>
            <p className="mt-2 text-sm text-cloud/70 leading-relaxed">
              We help you move your file from initial application to final review with clear, representative coordination.
            </p>
          </div>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="absolute top-6 left-6 right-6 hidden h-[1px] bg-white/10 md:block" />
            
            <div className="grid gap-8 md:grid-cols-3 relative">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-signal-lime bg-midnight-navy text-signal-lime font-bold text-sm relative z-10 shadow-lg">
                    01
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-signal-lime md:hidden" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Complete the form</h3>
                  <p className="mt-1.5 text-xs text-cloud/70 leading-relaxed">
                    Submit basic business details, owner contact information, and requested funding parameters via our secure form.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-midnight-navy text-cloud/80 font-bold text-sm relative z-10">
                    02
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Provide bank statements</h3>
                  <p className="mt-1.5 text-xs text-cloud/70 leading-relaxed">
                    Provide six months of recent business bank statements. These are required to evaluate cash flow and verify business activity.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-midnight-navy text-cloud/80 font-bold text-sm relative z-10">
                    03
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Review with coordinator</h3>
                  <p className="mt-1.5 text-xs text-cloud/70 leading-relaxed">
                    A representative will contact you directly to discuss the file details, coordinate with the funder, and explain options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Preparation Section */}
      <section id="what-youll-need" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Checklist */}
          <div className="card-premium p-6 sm:p-8 rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cobalt">Requirements</span>
            <h2 className="text-xl font-bold text-ink mt-1 mb-2">What you need to prepare</h2>
            <p className="text-xs text-muted-text leading-relaxed">
              Having the following files and details ready will help complete the coordinator review faster.
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
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-soft-aqua text-cobalt font-bold">✓</span>
                  <span className="text-ink font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact help card */}
          <div className="card-premium bg-soft-aqua/30 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white border border-neutral-border text-cobalt">
                <PhoneCall className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">Need coordinate assistance?</h3>
              <p className="mt-2 text-xs text-muted-text leading-relaxed">
                If you have questions about the requested statements or how the coordinator process operates, speak directly with our team.
              </p>
              
              <div className="mt-6 space-y-3.5 text-xs">
                <div>
                  <span className="block text-[9px] uppercase font-bold text-muted-text">Coordinator Line</span>
                  <a href="tel:+17209001921" className="text-ink font-bold hover:underline mt-0.5 block text-sm">
                    (720) 900-1921
                  </a>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-muted-text">Coordinator Email</span>
                  <a
                    href="mailto:lizzy.alemayehu@smallbizloanz.com"
                    className="text-ink font-bold break-all hover:underline mt-0.5 block"
                  >
                    lizzy.alemayehu@smallbizloanz.com
                  </a>
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-[10px] text-muted-text leading-relaxed border-t border-neutral-border/30 pt-4">
              We operate during standard business hours to assist small business owners.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Short FAQ Preview */}
      <section className="bg-cloud/30 border-t border-b border-neutral-border/20 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cobalt">Got Questions?</span>
            <h2 className="text-2xl font-bold tracking-tight text-ink mt-2">
              Common application questions
            </h2>
          </div>
          
          <div className="card-premium bg-white p-6 rounded-2xl">
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1" className="border-b border-neutral-border/40 pb-2">
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-2 text-ink">
                  How many months of statements are required?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-text leading-relaxed pt-1">
                  Six months of consecutive recent business bank statements are requested so the review can be conducted against actual operating history and cash flow.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-neutral-border/40 pb-2">
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-2 text-ink">
                  Is approval guaranteed by SmallBizLoans?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-text leading-relaxed pt-1">
                  No. SmallBizLoans coordinates files but does not make credit decisions. Approval, terms, and offers are determined exclusively by Mom &amp; Pop Business Funding after review.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0 pb-0">
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-2 text-ink">
                  Is SmallBizLoans a bank?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-text leading-relaxed pt-1">
                  No, we are an independent representative working to assist small business owners. We help package files and submit them to direct funding providers.
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

      {/* 8. Final Application Action (Branded Footer CTA) */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Start coordinating your application file
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-text">
            Submit your core business information online. The initial coordinator intake form takes approximately 5 minutes.
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
