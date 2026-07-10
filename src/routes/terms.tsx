import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Use — Smallbizloanz" }, { name: "description", content: "Terms of use for Smallbizloanz.com." }] }),
  component: () => (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Use</h1>
        <p className="mt-4 text-muted-foreground">
          By using Smallbizloanz.com you agree that all information you submit is accurate and complete to the best of your
          knowledge. Smallbizloanz.com does not guarantee approval, funding, rates, terms, or funding amounts. Submitting an
          application does not constitute an offer of credit or funding. Final eligibility and terms depend on review of the
          applicant's information and supporting documents.
        </p>
      </article>
    </SiteLayout>
  ),
});
