import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => {
    const seo = pageHead({
      title: "Terms of Use | SmallBizLoans",
      description: "Terms of use for SmallBizLoans.com.",
      path: "/terms",
    });
    return {
      ...seo,
      scripts: [
        toJsonLd(
          webpageSchema({
            title: "Terms of Use",
            description: "Terms of use for SmallBizLoans.com.",
            path: "/terms",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "Terms of Use", path: "/terms" },
            ],
          }),
        ),
      ],
    };
  },
  component: () => (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 pb-24 pt-8 sm:px-6">
        <div className="mb-8 pb-4 border-b border-neutral-border/50">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-2 text-xs text-muted-text">
            Last Updated: July 2026
          </p>
        </div>
        
        <div className="max-w-2xl text-sm leading-relaxed text-muted-text space-y-4">
          <p>
            By using SmallBizLoans.com, you agree that all information and documents you submit through this website are accurate, complete, and represent the true operational status of your business to the best of your knowledge.
          </p>
          <p>
            SmallBizLoans.com is an independent representative coordinating application files with Mom &amp; Pop Business Funding. SmallBizLoans.com does not make underwriting reviews, credit decisions, or guarantee approval, funding, rates, terms, or final funding amounts. Submitting an application or contact form does not constitute an offer of credit or funding. Final eligibility depends entirely on review and verification of applicant information by Mom &amp; Pop Business Funding.
          </p>
        </div>
      </section>
    </SiteLayout>
  ),
});
