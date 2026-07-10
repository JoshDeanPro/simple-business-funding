import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => {
    const seo = pageHead({
      title: "Small Business Funding FAQ | SmallBizLoans",
      description:
        "Answers to common questions about applying for small-business funding, bank statements, review timing, and application support.",
      path: "/faq",
    });
    return {
      ...seo,
      scripts: [
        toJsonLd(
          webpageSchema({
            title: "Small Business Funding FAQ",
            description:
              "Answers to common questions about applying for small-business funding, bank statements, review timing, and application support.",
            path: "/faq",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "FAQ", path: "/faq" },
            ],
          }),
        ),
      ],
    };
  },
  component: FaqPage,
});

const groups = [
  {
    title: "Before you apply",
    items: [
      {
        q: "What information is needed to apply?",
        a: "You will be asked for basic business information, ownership details, contact information, funding needs, and supporting documents. The application is designed to keep the process straightforward.",
      },
      {
        q: "What types of businesses may apply?",
        a: "A range of operating businesses may apply, including retail, restaurants, service businesses, home-based businesses, and other legitimate small-business operations.",
      },
    ],
  },
  {
    title: "Required information and documents",
    items: [
      {
        q: "How many months of bank statements are required?",
        a: "Six months of recent business bank statements may be required so the request can be reviewed against actual operating activity and cash flow.",
      },
      {
        q: "What can business funding be used for?",
        a: "Funding is intended for legitimate business purposes such as inventory, equipment, working capital, expansion, marketing, or other operating needs.",
      },
      {
        q: "Is personal or business credit reviewed?",
        a: "Credit and other relevant business or owner information may be reviewed from third-party sources where permitted. Funding decisions also consider bank statement activity and overall business cash flow.",
      },
    ],
  },
  {
    title: "Review and next steps",
    items: [
      {
        q: "How long does the review process take?",
        a: "Review timing depends on how complete the application is and whether supporting documents are easy to verify. Once the file is complete, a representative reviews it and follows up.",
      },
      {
        q: "Is approval guaranteed?",
        a: "No. Submitting an application does not guarantee approval or an offer of funding. Final eligibility and terms depend on review of the information and documents provided.",
      },
      {
        q: "What happens after an application is submitted?",
        a: "You will see a confirmation on-screen and receive a follow-up review. If additional information is needed, a representative will contact you using the details you provided.",
      },
    ],
  },
  {
    title: "Privacy and contact",
    items: [
      {
        q: "How can I get help with my application?",
        a: "You can contact SmallBizLoans by phone or email if you need help before or during the application process.",
      },
      {
        q: "Is SmallBizLoans a bank?",
        a: "No. SmallBizLoans helps business owners submit funding applications to Mom & Pop Business Funding. We are an independent representative, not a bank.",
      },
    ],
  },
] as const;

function FaqPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        {/* Help Center Header */}
        <div className="mb-10 pb-6 border-b border-neutral-border/50">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Help Center & FAQ
          </h1>
          <p className="mt-2 text-sm text-muted-text max-w-2xl">
            Plain-English answers about the application process, bank statement requirements,
            coordinator review timing, and coordinate files with Mom & Pop Business Funding.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[200px_1fr] items-start">
          {/* Sticky left navigation rail */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="hidden lg:block card-premium p-4 rounded text-xs">
              <h3 className="sm:text-sm font-bold text-ink mb-3 border-b border-neutral-border/50 pb-2">
                Help categories
              </h3>
              <ul className="space-y-2.5">
                {groups.map((group) => {
                  const id = group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <li key={group.title}>
                      <a
                        href={`#${id}`}
                        className="text-muted-text font-semibold hover:text-cobalt hover:underline transition-colors block"
                      >
                        {group.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Support Desk Card */}
            <div className="card-premium p-4 rounded text-xs">
              <h4 className="sm:text-sm font-bold text-ink mb-2">Still need help?</h4>
              <p className="text-muted-text leading-relaxed">
                Connect directly with our file representative desk for assistance.
              </p>
              <div className="mt-4 space-y-2.5 bg-cloud p-3 rounded border border-neutral-border/40">
                <div>
                  <span className="block text-[11px] font-bold text-muted-text">Call Support</span>
                  <a
                    href="tel:+17209001921"
                    className="text-ink font-bold hover:underline block mt-0.5"
                  >
                    (720) 900-1921
                  </a>
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-muted-text">Support Email</span>
                  <a
                    href="mailto:lizzy.alemayehu@smallbizloanz.com"
                    className="text-ink font-bold break-all hover:underline block mt-0.5"
                  >
                    lizzy.alemayehu@smallbizloanz.com
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* FAQ Sections */}
          <div className="space-y-12">
            {groups.map((group) => {
              const id = group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <section
                  key={group.title}
                  id={id}
                  className="scroll-mt-24 space-y-4 pb-6 border-b border-neutral-border/30 last:border-b-0 last:pb-0"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-ink mb-4">
                    {group.title}
                  </h2>
                  <Accordion type="single" collapsible className="divide-y divide-neutral-border/30">
                    {group.items.map((f, i) => (
                      <AccordionItem
                        key={f.q}
                        value={`${group.title}-${i}`}
                        className="border-b border-neutral-border/20 last:border-b-0"
                      >
                        <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline py-4 text-ink hover:text-cobalt transition-colors">
                          {f.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-text leading-relaxed pb-4">
                          {f.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              );
            })}

            {/* Small help action panel */}
            <div className="border-t border-neutral-border/50 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-ink">Ready to begin?</h3>
                <p className="text-xs text-muted-text">
                  Completing the initial online application takes about 5 minutes.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  asChild
                  className="rounded-full btn-premium-evergreen px-4 font-semibold text-xs h-8"
                >
                  <Link to="/apply">Start Application</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full btn-premium-outline px-4 text-xs h-8"
                >
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
