export const SITE_NAME = "SmallBizLoans";
export const SITE_URL = "https://smallbizloanz.com";
export const DEFAULT_SOCIAL_IMAGE = "/social-card.svg";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function pageHead({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
  imageAlt = `${SITE_NAME} business funding preview`,
  type = "website",
  noindex = false,
}: SeoOptions) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: absoluteUrl(path) },
      { property: "og:image", content: absoluteUrl(image) },
      { property: "og:image:alt", content: imageAlt },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteUrl(image) },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(path) }],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "FinancialService"],
        name: SITE_NAME,
        url: SITE_URL,
        email: "lizzy.alemayehu@smallbizloanz.com",
        telephone: "(720) 900-1921",
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
    ],
  };
}

export function webpageSchema({
  title,
  description,
  path,
  breadcrumbs,
  type = "WebPage",
  mainEntity,
}: {
  title: string;
  description: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  type?: string;
  mainEntity?: Record<string, unknown>;
}) {
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": type,
      name: title,
      url: absoluteUrl(path),
      description,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      breadcrumb: {
        "@id": `${absoluteUrl(path)}#breadcrumbs`,
      },
    },
    breadcrumbSchema(breadcrumbs, path),
  ];

  if (mainEntity) {
    graph[0] = {
      ...graph[0],
      mainEntity,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function articleSchema({
  title,
  description,
  path,
  image,
  section,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  section: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: title,
        description,
        image: absoluteUrl(image),
        url: absoluteUrl(path),
        articleSection: section,
        author: {
          "@type": "Organization",
          name: SITE_NAME,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": absoluteUrl(path),
        },
      },
    ],
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[], path: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumbs`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function toJsonLd(value: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(value),
  };
}
