import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Smallbizloanz" },
      {
        name: "description",
        content:
          "Answers to common questions about applying for small business funding through Smallbizloanz.",
      },
      { property: "og:title", content: "FAQ — Smallbizloanz" },
      {
        property: "og:description",
        content: "Common questions about the Smallbizloanz application and review process.",
      },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    q: "What documents are required?",
    a: "At minimum, six months of recent business bank statements. If you have an existing cash advance or funding balance, please include the original funding contract. You may also include any optional supporting documents that help explain your business.",
  },
  {
    q: "How long does the review process take?",
    a: "Once we receive a complete application and documents, a representative reviews the file and follows up promptly. Timing varies based on the completeness of the information submitted.",
  },
  {
    q: "Is approval guaranteed?",
    a: "No. Submitting an application does not guarantee approval or an offer of funding. Final eligibility and terms depend on review of the information and documents provided.",
  },
  {
    q: "Is credit reviewed?",
    a: "Credit and other relevant business or owner information may be reviewed from third-party sources where permitted. Funding decisions also consider bank statement activity and overall business cash flow.",
  },
  {
    q: "What can the funding be used for?",
    a: "Funding is intended for legitimate business purposes such as inventory, equipment, working capital, expansion, marketing, or other operating needs.",
  },
  {
    q: "What happens after an application is submitted?",
    a: "You'll see a confirmation on-screen and receive a follow-up email. A representative will review the application and contact you regarding next steps.",
  },
];

function FaqPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20">
        <img
          src="/images/blog-business-growth.png"
          alt="Business owner reviewing plans in a workshop"
          className="mb-10 h-56 w-full rounded-3xl object-cover object-center sm:h-72"
        />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-muted-foreground">
          Everything you need to know about applying. If your question isn't answered here, we're
          happy to help.
        </p>

        <Accordion
          type="single"
          collapsible
          className="mt-10 rounded-2xl border border-border bg-card px-2"
        >
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-border last:border-b-0"
            >
              <AccordionTrigger className="px-4 text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">
            <Link to="/apply">Apply Now</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
