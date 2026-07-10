import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => {
    const seo = pageHead({
      title: "Privacy Policy | SmallBizLoans",
      description: "Privacy policy for SmallBizLoans.com.",
      path: "/privacy",
    });
    return {
      ...seo,
      scripts: [
        toJsonLd(
          webpageSchema({
            title: "Privacy Policy",
            description: "Privacy policy for SmallBizLoans.com.",
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
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        <div className="mb-8 pb-4 border-b border-neutral-border/50">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-muted-text">Last Updated: July 2026</p>
        </div>

        <div className="max-w-2xl text-sm leading-relaxed text-muted-text space-y-4">
          <p>
            SmallBizLoans.com respects your privacy and is committed to protecting your personal and
            operational information. We collect the information you provide through our application
            and contact forms to evaluate and review your business funding request, coordinate with
            Mom &amp; Pop Business Funding, verify details with permitted third-party sources, and
            communicate with you regarding the status of your file.
          </p>
          <p>
            We do not sell, rent, or distribute your personal or business information to third-party
            marketers. All information is managed securely. For questions about how we handle,
            collect, or share your information, please contact our coordinator desk at{" "}
            <a
              className="text-evergreen font-semibold hover:underline"
              href="mailto:lizzy.alemayehu@smallbizloanz.com"
            >
              lizzy.alemayehu@smallbizloanz.com
            </a>
            .
          </p>
        </div>
      </section>
    </SiteLayout>
  ),
});
