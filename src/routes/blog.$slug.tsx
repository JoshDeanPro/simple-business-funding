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
        <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 mt-12 mb-24">
          <p className="text-sm font-semibold text-cobalt">
            Article not found
          </p>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink font-display">
            That article is not available.
          </h1>
          <p className="mt-2 text-sm text-muted-text">
            Try looking through our resources library or return to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full btn-premium-cobalt px-5 py-2 text-sm font-semibold"
            >
              <ArrowLeft className="h-4 w-4" /> Back to resources
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full btn-premium-outline px-5 py-2 text-sm font-semibold"
            >
              Go home
            </Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const related = blogPosts.filter((item) => item.slug !== slug).slice(0, 2);
  const sectionId = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <SiteLayout>
      <article className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6">
        {/* Editorial Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-text">
          <Link to="/" className="hover:text-cobalt transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-cobalt transition-colors">Resources</Link>
          <span>/</span>
          <span className="text-ink">{post.category}</span>
        </div>

        {/* Article Header block */}
        <div className="mt-8 pb-10 border-b border-neutral-border/30 mb-10 text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-soft-aqua border border-cobalt/10 text-xs font-bold text-cobalt">
            {post.category}
          </span>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl font-display">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-muted-text max-w-2xl mx-auto">
            {post.intro}
          </p>
          
          {/* Author Block */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs text-muted-text">
            <span className="font-bold text-ink">Lizzy Alemayehu</span>
            <span>•</span>
            <span>File Coordinator</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] border border-neutral-border/20 shadow-md">
            <img src={post.image} alt={post.alt} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Double Column Editorial Grid */}
        <div className="grid gap-12 lg:grid-cols-[200px_1fr] items-start">
          {/* Left Column - Sticky Table of Contents */}
          <aside className="hidden lg:block lg:sticky lg:top-24 space-y-6">
            <div className="border-l border-neutral-border/50 pl-4 space-y-3 text-xs">
              <span className="block font-bold text-ink uppercase tracking-wider mb-2">
                On this page
              </span>
              {post.sections.map((section) => {
                const id = sectionId(section.heading);
                return (
                  <a
                    key={section.heading}
                    href={`#${id}`}
                    className="block text-muted-text hover:text-cobalt hover:underline font-semibold transition-colors"
                  >
                    {section.heading}
                  </a>
                );
              })}
            </div>
          </aside>

          {/* Right Column - Reading Content */}
          <div className="mx-auto max-w-2xl lg:mx-0">
            {post.sections.map((section, idx) => {
              const id = sectionId(section.heading);
              return (
                <section key={section.heading} id={id} className="scroll-mt-24 mb-10">
                  <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl mb-4 font-display">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-sm sm:text-base leading-relaxed text-muted-text">
                      {paragraph}
                    </p>
                  ))}
                  
                  {/* Inject an inline coordinator tip in the middle */}
                  {idx === 0 && (
                    <div className="my-8 p-5 bg-soft-aqua/30 border-l-4 border-cobalt rounded-r-xl text-xs sm:text-sm">
                      <span className="block font-bold text-ink mb-1">Lizzy&rsquo;s Tip</span>
                      <p className="text-muted-text leading-relaxed">
                        Make sure to include all pages of your PDF statements (even blank sheets) when uploading. Underwriters require full statement records to verify business activity.
                      </p>
                    </div>
                  )}
                </section>
              );
            })}

            {/* Call to Action Panel */}
            <div className="mt-16 p-6 sm:p-8 bg-cloud/40 border border-neutral-border/40 rounded-[2rem] text-ink space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-ink font-display">
                Ready to explore financing options?
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-text">
                Completing the secure online coordinator form takes about 5 minutes. We package your files and coordinate directly with Mom &amp; Pop Business Funding for underwriters&rsquo; review.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/apply"
                  className="inline-flex items-center gap-2 rounded-full btn-premium-cobalt px-5 py-2.5 text-xs font-semibold shadow"
                >
                  Start My Application <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full btn-premium-outline px-5 py-2.5 text-xs font-semibold"
                >
                  Contact Coordinator Desk
                </Link>
              </div>
            </div>

            {/* Related Resources */}
            <div className="mt-16 border-t border-neutral-border/30 pt-12">
              <h2 className="text-lg font-bold text-ink mb-6 font-display">Related publications</h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to="/blog/$slug"
                    params={{ slug: item.slug }}
                    className="group py-4 border-b border-neutral-border/20 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-cobalt">
                        {item.category}
                      </p>
                      <h3 className="mt-2 text-sm font-bold text-ink group-hover:text-cobalt transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-text line-clamp-2">{item.intro}</p>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cobalt hover:underline">
                      Read article{" "}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
