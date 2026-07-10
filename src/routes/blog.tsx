import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Smallbizloanz" },
      {
        name: "description",
        content:
          "Educational articles about small business funding, cash flow, and applying for a loan.",
      },
      { property: "og:title", content: "Blog — Smallbizloanz" },
      { property: "og:description", content: "Educational articles about small business funding." },
    ],
  }),
  component: BlogPage,
});

const placeholders = [
  {
    title: "Understanding small business funding options",
    cat: "Funding basics",
    image: "/images/blog-business-basics.png",
    alt: "Boutique owner opening her storefront",
  },
  {
    title: "How lenders review business bank statements",
    cat: "Applications",
    image: "/images/blog-cash-flow.png",
    alt: "Restaurant owner reviewing cash-flow notes",
  },
  {
    title: "Preparing your business for a funding review",
    cat: "Preparation",
    image: "/images/blog-business-growth.png",
    alt: "Contractor reviewing plans on a tablet",
  },
  {
    title: "What ownership percentage means on an application",
    cat: "Applications",
    image: "/images/blog-business-basics.png",
    alt: "Boutique owner opening her storefront",
  },
  {
    title: "Managing cash flow month to month",
    cat: "Operations",
    image: "/images/blog-cash-flow.png",
    alt: "Restaurant owner reviewing cash-flow notes",
  },
  {
    title: "Traditional vs. nontraditional business funding",
    cat: "Funding basics",
    image: "/images/blog-business-growth.png",
    alt: "Contractor reviewing plans on a tablet",
  },
];

function BlogPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
          <p className="mt-4 text-muted-foreground">
            Educational articles about small business funding are coming soon. Check back for
            updates.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((p) => (
            <article
              key={p.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-sm"
            >
              <img
                src={p.image}
                alt={p.alt}
                className="aspect-[16/9] w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="mt-5 inline-block text-xs font-medium uppercase tracking-wider text-brand">
                {p.cat}
              </span>
              <h3 className="mt-2 text-lg font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">Article coming soon.</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
