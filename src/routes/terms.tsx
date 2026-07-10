import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => {
    const seo = pageHead({
      title: "Terms of Use | Smallbizloanz",
      description: "Terms of use for Smallbizloanz.com.",
      path: "/terms",
    });
    return {
      ...seo,
      scripts: [
        toJsonLd(
          webpageSchema({
            title: "Terms of Use",
            description: "Terms of use for Smallbizloanz.com.",
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
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Terms of Use</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Terms of Use</h1>
        <p className="mt-4 text-muted-foreground">
          By using Smallbizloanz.com you agree that all information you submit is accurate and
          complete to the best of your knowledge. Smallbizloanz.com does not guarantee approval,
          funding, rates, terms, or funding amounts. Submitting an application does not constitute
          an offer of credit or funding. Final eligibility and terms depend on review of the
          applicant&apos;s information and supporting documents.
        </p>
      </article>
    </SiteLayout>
  ),
});
