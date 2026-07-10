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
      <section className="mx-auto max-w-4xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          Frequently asked questions
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Small business funding FAQ
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Plain-English answers about applying, what you need to prepare, who reviews the request,
          and what happens next.
        </p>

        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <section key={group.title}>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{group.title}</h2>
              <Accordion type="single" collapsible className="mt-4 border-y border-border">
                {group.items.map((f, i) => (
                  <AccordionItem
                    key={f.q}
                    value={`${group.title}-${i}`}
                    className="border-b border-border last:border-b-0"
                  >
                    <AccordionTrigger className="px-0 text-left text-base font-medium hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-0 text-sm text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="rounded-full bg-brand text-brand-foreground hover:bg-brand-hover"
          >
            <Link to="/apply">Apply for business funding</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
