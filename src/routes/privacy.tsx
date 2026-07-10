import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => {
    const seo = pageHead({
      title: "Privacy Policy | Smallbizloanz",
      description: "Privacy policy for Smallbizloanz.com.",
      path: "/privacy",
    });
    return {
      ...seo,
      scripts: [
        toJsonLd(
          webpageSchema({
            title: "Privacy Policy",
            description: "Privacy policy for Smallbizloanz.com.",
            path: "/privacy",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy" },
            ],
          }),
        ),
      ],
    };
  },
  component: () => (
    <SiteLayout>
      <article className="prose mx-auto max-w-3xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Privacy Policy</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          Smallbizloanz.com respects your privacy. We collect the information you provide through
          our application and contact forms to review your funding request, verify submitted
          details with permitted third parties, and communicate with you about your application.
          We do not sell your personal information. For questions about how we handle your
          information, contact us at{" "}
          <a
            className="text-brand hover:underline"
            href="mailto:lizzy.alemayehu@smallbizloanz.com"
          >
            lizzy.alemayehu@smallbizloanz.com
          </a>
          .
        </p>
      </article>
    </SiteLayout>
  ),
});
