import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock3 } from "@/components/ui/icons";
import { SiteLayout } from "@/components/site-layout";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { articleSchema, pageHead, toJsonLd, webpageSchema } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) {
      return pageHead({
        title: "Article not found | SmallBizLoans",
        description: "The requested article is not available.",
        path: `/blog/${params.slug}`,
      });
    }

    const seo = pageHead({
      title: `${post.title} | SmallBizLoans`,
      description: post.intro,
      path: `/blog/${post.slug}`,
      type: "article",
    });

    return {
      ...seo,
      scripts: [
        toJsonLd(
          webpageSchema({
            title: post.title,
            description: post.intro,
            path: `/blog/${post.slug}`,
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "Resources", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ],
          }),
        ),
        toJsonLd(
          articleSchema({
            title: post.title,
            description: post.intro,
            path: `/blog/${post.slug}`,
            image: post.image,
            section: post.category,
          }),
        ),
      ],
    };
  },
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const { slug } = Route.useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
          <p className="text-sm font-semibold text-brand">Article not found</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">That article is not available.</h1>
          <p className="mt-4 text-muted-foreground">
            Try the resources page or go back to the home page.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand-hover"
            >
              <ArrowLeft className="h-4 w-4" /> Back to resources
            </Link>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent"
            >
              Apply
            </Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const related = blogPosts.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <SiteLayout>
      <article className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All resources
        </Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1 text-muted-foreground normal-case tracking-normal">
                <Clock3 className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{post.intro}</p>
          </div>
          <img
            src={post.image}
            alt={post.alt}
            className="aspect-[4/3] w-full rounded-[2rem] object-cover"
          />
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          {post.sections.map((section) => (
            <section key={section.heading} className="mb-12">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-8 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <div className="mt-14 rounded-2xl border border-border bg-surface p-7 text-foreground sm:p-9">
            <h2 className="text-2xl font-semibold">Ready to talk through your next step?</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Start with a short application or contact our team with a question.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-hover"
              >
                Apply now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-surface px-5 py-2.5 text-sm font-semibold hover:bg-accent"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-10">
            <h2 className="text-2xl font-semibold tracking-tight">Related resources</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/blog/$slug"
                  params={{ slug: item.slug }}
                  className="group rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                    {item.category}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-tight group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.intro}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
