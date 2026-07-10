import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { blogPosts } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Small Business Funding Insights — Smallbizloanz" },
      {
        name: "description",
        content:
          "Practical guidance about business funding, cash flow, and preparing a strong application.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand">The Smallbizloanz journal</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
            Useful guidance for building a stronger business.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Straightforward ideas about funding, cash flow, and getting ready for your next step.
          </p>
        </div>

        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className="group mt-12 grid overflow-hidden rounded-[2rem] border border-border bg-card transition-shadow hover:shadow-xl hover:shadow-primary/5 md:grid-cols-[1.05fr_0.95fr]"
        >
          <img
            src={featured.image}
            alt={featured.alt}
            className="aspect-[4/3] h-full w-full object-cover"
          />
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              <span>{featured.category}</span>
              <span className="h-1 w-1 rounded-full bg-brand/60" />
              <span>Featured</span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">{featured.intro}</p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              Read article{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        <div className="mt-16 flex items-end justify-between gap-6 border-b border-border pb-4">
          <h2 className="text-2xl font-semibold tracking-tight">More from the journal</h2>
          <span className="hidden text-sm text-muted-foreground sm:block">
            Practical, plain-English guidance
          </span>
        </div>
        <div className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {rest.map((post) => (
            <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="group">
              <article>
                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  <span>{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="inline-flex items-center gap-1 text-muted-foreground normal-case tracking-normal">
                    <Clock3 className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight group-hover:text-brand">
                  {post.title}
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">{post.intro}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
