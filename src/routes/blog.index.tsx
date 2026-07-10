import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

const categories = ["All", "Funding basics", "Applications", "Preparation"] as const;

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const featured = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  // Filter posts based on category selection
  const filteredPosts = activeCategory === "All"
    ? otherPosts
    : otherPosts.filter((p) => p.category === activeCategory);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        {/* Header Block */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-cobalt uppercase tracking-widest">
            Business Insights Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink mt-3 font-display">
            Guides &amp; strategy for business owners
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-text leading-relaxed">
            Grounded guidance on cash flow statement reviews, document requirements, and packaging your funding files.
          </p>
        </div>

        {/* Featured Guide Spotlight */}
        {featured && activeCategory === "All" && (
          <div className="pb-16 mb-16 border-b border-neutral-border/30">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-neutral-border/20 shadow-md">
                  <img
                    src={featured.image}
                    alt={featured.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-cobalt">
                  <span className="px-2.5 py-1 rounded-full bg-soft-aqua border border-cobalt/10">
                    {featured.category}
                  </span>
                  <span className="text-muted-text">• {featured.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink leading-tight font-display hover:text-cobalt transition-colors">
                  <Link to="/blog/$slug" params={{ slug: featured.slug }}>
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-text leading-relaxed">{featured.intro}</p>
                <div className="pt-2 flex items-center gap-3 text-xs text-muted-text">
                  <span className="font-semibold text-ink">Lizzy Alemayehu</span>
                  <span>•</span>
                  <span>July 10, 2026</span>
                </div>
                <div className="pt-2">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featured.slug }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cobalt hover:underline"
                  >
                    Read featured guide <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Filtering Pill Bar */}
        <div className="mb-10 pb-4 border-b border-neutral-border/30">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-ink mr-3">Filter by topic:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  activeCategory === cat
                    ? "bg-cobalt text-white border-cobalt shadow-sm"
                    : "bg-cloud/40 hover:bg-white text-muted-text border-neutral-border/50 hover:border-cobalt/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div>
          <h3 className="text-sm font-bold text-muted-text border-b border-neutral-border/50 pb-2 mb-6">
            {activeCategory === "All" ? "All publications" : `${activeCategory} articles`}
          </h3>
          
          {filteredPosts.length > 0 ? (
            <div className="space-y-2">
              {filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  className="group py-6 border-b border-neutral-border/30 last:border-b-0 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-cobalt">
                      <span className="px-2 py-0.5 rounded bg-soft-aqua/50 border border-cobalt/10">
                        {post.category}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-neutral-border" />
                      <span className="text-muted-text">{post.readTime}</span>
                    </div>
                    <h4 className="mt-3 text-lg font-bold text-ink group-hover:text-cobalt transition-colors leading-snug">
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </Link>
                    </h4>
                    <p className="mt-2 text-sm text-muted-text leading-relaxed max-w-2xl">
                      {post.intro}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cobalt hover:underline py-2"
                    >
                      Read article <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-cloud/30 rounded-2xl border border-dashed border-neutral-border/50">
              <p className="text-sm text-muted-text">No articles found in this category.</p>
            </div>
          )}
        </div>

        {/* Newsletter Subscription Band */}
        <div className="mt-20 p-8 rounded-[2.5rem] bg-midnight-navy text-white text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
            <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-glow-radial blur-2xl" />
          </div>
          
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-xs font-bold text-signal-lime uppercase tracking-widest">
              Stay Informed
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Insights delivered to your inbox
            </h3>
            <p className="text-xs sm:text-sm text-cloud/70 leading-relaxed">
              Stay up to date with the latest guidance on statement reviews, cash flow optimization, and financial underwriting parameters.
            </p>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscription verified!");
              }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your business email"
                className="flex-1 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 text-white placeholder:text-cloud/40 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-lime focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-navy"
              />
              <Button
                type="submit"
                className="rounded-full btn-premium-cobalt font-semibold text-sm shrink-0 px-6 py-2.5 h-10 shadow-md"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
