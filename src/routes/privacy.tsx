import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Smallbizloanz" }, { name: "description", content: "Privacy policy for Smallbizloanz.com." }] }),
  component: () => (
    <SiteLayout>
      <article className="prose mx-auto max-w-3xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          Smallbizloanz.com respects your privacy. We collect the information you provide through our application and contact
          forms to review your funding request, verify submitted details with permitted third parties, and communicate with you
          about your application. We do not sell your personal information. For questions about how we handle your information,
          contact us at <a className="text-brand hover:underline" href="mailto:lizzy.alemayehu@smallbizloanz.com">lizzy.alemayehu@smallbizloanz.com</a>.
        </p>
      </article>
    </SiteLayout>
  ),
});
