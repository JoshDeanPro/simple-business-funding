import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "@/components/ui/icons";
import { SiteLayout } from "@/components/site-layout";
import { blogPosts } from "@/lib/blog-posts";
import { pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () => {
    const seo = pageHead({
      title: "Small Business Funding Resources | SmallBizLoans",
      description:
        "Practical guidance on business funding, bank statements, application documents, and reviewing funding terms.",
      path: "/blog",
    });
    return {
      ...seo,
      scripts: [
        toJsonLd(
          webpageSchema({
            title: "Small Business Funding Resources",
            description:
              "Practical guidance on business funding, bank statements, application documents, and reviewing funding terms.",
            path: "/blog",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "Resources", path: "/blog" },
            ],
          }),
        ),
      ],
    };
  },
  component: BlogPage,
});

const sections = [
  {
    title: "Preparing to apply",
    description: "Short articles about what to gather before you start.",
    posts: blogPosts.filter((post) => post.category === "Preparation"),
  },
  {
    title: "Understanding reviews",
    description: "Practical guidance on statements, cash flow, and funding terms.",
    posts: blogPosts.filter((post) => post.category !== "Preparation"),
  },
] as const;

function BlogPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand">Small business funding resources</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
            Practical guidance before you apply.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Static articles that help business owners prepare their information, understand how
            reviews work, and look at funding terms with a clearer lens.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight">What these resources cover</h2>
            <p className="mt-3 text-muted-foreground">
              These articles are meant to help you prepare for a funding request without forcing you
              through a long marketing funnel.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "What to gather before you apply",
              "How statements and revenue are reviewed",
              "What to look at before accepting an offer",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-surface p-5 text-sm font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-14">
          {sections.map((section) => (
            <section key={section.title}>
              <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
              <div className="mt-7 grid gap-6 lg:grid-cols-2">
                {section.posts.map((post) => (
                  <Link
                    key={post.slug}
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-surface"
                  >
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                      <span>{post.category}</span>
                      <span className="h-1 w-1 rounded-full bg-brand/60" />
                      <span className="inline-flex items-center gap-1 text-muted-foreground normal-case tracking-normal">
                        <Clock3 className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight group-hover:text-brand">
                      {post.title}
                    </h3>
                    <p className="mt-3 leading-7 text-muted-foreground">{post.intro}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                      Read article{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
