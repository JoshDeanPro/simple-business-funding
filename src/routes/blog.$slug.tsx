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
        <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 card-premium rounded mt-12 mb-24">
          <p className="text-sm font-semibold text-cobalt uppercase tracking-wider">Article not found</p>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink">That article is not available.</h1>
          <p className="mt-2 text-sm text-muted-text">
            Try looking through our resources library or return to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full btn-premium-cobalt px-4 py-2 text-sm font-semibold"
            >
              <ArrowLeft className="h-4 w-4" /> Back to resources
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full btn-premium-outline px-4 py-2 text-sm font-semibold"
            >
              Go home
            </Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const related = blogPosts.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <SiteLayout>
      <article className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cobalt hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to all resources
        </Link>
        
        <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center border-b border-neutral-border/50 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cobalt">
              <span className="uppercase tracking-wider">{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-neutral-border" />
              <span className="text-muted-text">{post.readTime}</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-text">{post.intro}</p>
          </div>
          <div className="card-premium bg-cloud p-1 rounded-2xl overflow-hidden">
            <img
              src={post.image}
              alt={post.alt}
              className="w-full h-48 object-cover rounded-sm"
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          {post.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl border-l-2 border-cobalt pl-3 mb-4">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted-text">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {/* Talk card */}
          <div className="mt-14 card-premium p-6 sm:p-8 text-ink rounded-2xl">
            <h2 className="text-lg font-bold text-ink">Ready to explore financing options?</h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-text">
              Completing the secure online application takes about 5 minutes. You can also contact our team if you have questions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 rounded-full btn-premium-cobalt px-4 py-2 text-xs font-semibold"
              >
                Apply now <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full btn-premium-outline px-4 py-2 text-xs font-semibold"
              >
                Contact us
              </Link>
            </div>
          </div>

          {/* Related Resources */}
          <div className="mt-14 border-t border-neutral-border/50 pt-10">
            <h2 className="text-base font-bold text-ink uppercase tracking-wider mb-6">Related resources</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/blog/$slug"
                  params={{ slug: item.slug }}
                  className="group card-premium p-5 rounded-xl hover:border-cobalt transition-colors"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-cobalt">
                    {item.category}
                  </p>
                  <h3 className="mt-2.5 text-sm font-bold text-ink group-hover:text-cobalt transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-text line-clamp-2">{item.intro}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cobalt hover:underline">
                    Read article{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
