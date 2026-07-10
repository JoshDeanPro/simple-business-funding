import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { blogPosts } from "@/lib/blog-posts";
import { pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () => ({
    ...pageHead({
      title: "Small Business Funding Resources | Smallbizloanz",
      description:
        "Practical guidance on business funding, bank statements, application documents, and reviewing funding terms.",
      path: "/blog",
    }),
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
  }),
  component: BlogPage,
});

function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand">Small business funding resources</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
            Practical guidance for preparing a stronger funding application.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Short, useful articles about business funding, bank statements, funding terms, and the
            application process.
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
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                {featured.readTime}
              </span>
            </div>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        <div className="mt-16 flex items-end justify-between gap-6 border-b border-border pb-4">
          <h2 className="text-2xl font-semibold tracking-tight">More resources</h2>
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
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
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

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
