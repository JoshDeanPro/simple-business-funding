import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "@/components/ui/icons";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-posts";
import { pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
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
  const featured = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-neutral-border/50">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Resources & Guides
          </h1>
          <p className="mt-2 text-sm text-muted-text max-w-2xl">
            Practical, plain-English guidance to help you prepare your business files, understand
            cash flow reviews, and navigate funding processes.
          </p>
        </div>

        {/* Featured Guide */}
        {featured && (
          <div className="card-premium p-6 sm:p-8 rounded mb-12">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-cobalt">
                  <span className="uppercase tracking-wider">{featured.category}</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-border" />
                  <span className="text-muted-text">{featured.readTime}</span>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-ink sm:text-3xl leading-tight">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featured.slug }}
                    className="hover:text-cobalt transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 text-sm text-muted-text leading-relaxed">{featured.intro}</p>
                <div className="mt-6">
                  <Button
                    asChild
                    className="rounded-full btn-premium-cobalt px-5 font-semibold text-xs h-9"
                  >
                    <Link to="/blog/$slug" params={{ slug: featured.slug }}>
                      Read Featured Guide <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="border border-neutral-border bg-paper p-1 rounded overflow-hidden shrink-0">
                <img
                  src={featured.image}
                  alt={featured.alt}
                  className="w-full h-44 object-cover rounded-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Articles List */}
        <div>
          <h3 className="text-base font-bold text-ink border-b border-neutral-border/50 pb-2 mb-6">
            All library articles
          </h3>
          <div className="space-y-4">
            {otherPosts.map((post) => (
              <div
                key={post.slug}
                className="group card-premium p-6 rounded flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-cobalt transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cobalt">
                    <span className="uppercase tracking-wider">{post.category}</span>
                    <span className="h-1 w-1 rounded-full bg-neutral-border" />
                    <span className="text-muted-text">{post.readTime}</span>
                  </div>
                  <h4 className="mt-2 text-lg font-bold text-ink group-hover:text-cobalt transition-colors leading-snug">
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      {post.title}
                    </Link>
                  </h4>
                  <p className="mt-2 text-xs text-muted-text leading-relaxed max-w-2xl">
                    {post.intro}
                  </p>
                </div>
                <div className="shrink-0">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full btn-premium-outline group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white font-semibold text-xs h-8 px-4"
                  >
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      Read Article
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
