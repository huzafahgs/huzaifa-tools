import tools from "../toolsData";
import { getBlogBySlug } from "../data/blogs";
import logoAsset from "../assets/logo.png";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://ai-tools-by-huzaifa.vercel.app";
const TOOL_COUNT = tools.length;
const DEFAULT_TITLE = `Huzaifa Tools – Free Online Utilities`;
const DEFAULT_DESCRIPTION = `Huzaifa Tools offers ${TOOL_COUNT} free browser utilities for text processing, calculations, conversions, and productivity.`;
const DEFAULT_IMAGE = new URL(logoAsset, SITE_URL).href;
const INDEXABLE_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const NOINDEX_ROBOTS = "noindex, follow";

const ACCOUNT_PATHS = ["/login", "/signup", "/forgot-password", "/reset-password", "/account", "/auth/callback"];
const ROUTE_META = {
  ...Object.fromEntries(ACCOUNT_PATHS.map(path => [path, { title: "Huzaifa Accounts | Huzaifa Tools", description: "Manage your Huzaifa Tools account, favorites and recently opened tools." }])),
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/all-tools": {
    title: "All Tools | Huzaifa Tools",
    description: "Explore the full catalog of free tools on Huzaifa Tools.",
  },
  "/blog": {
    title: "Blog | Huzaifa Tools",
    description: "Practical guides to PDF tasks, image editing, data conversion, and developer utilities, with worked examples, checks, and honest tool limitations.",
  },
  "/favorites": {
    title: "Favorites | Huzaifa Tools",
    description: "Save and revisit your favorite tools on Huzaifa Tools.",
  },
  "/history": {
    title: "History | Huzaifa Tools",
    description: "Review your recent tool activity on Huzaifa Tools.",
  },
  "/pricing": {
    title: "Pricing | Huzaifa Tools",
    description: "Use the current Huzaifa Tools catalog for free without an account or subscription. Review tool limits and data handling.",
  },
  "/contact": {
    title: "Contact | Huzaifa Tools",
    description: "Contact Huzaifa Group of Software for support, questions, or partnership inquiries.",
  },
  "/chat": {
    title: "AI Chat | Huzaifa Tools",
    description: "AI Chat is not available yet. Browse working utilities or contact Huzaifa Tools for product support.",
  },
  "/about-us": {
    title: "About Us | Huzaifa Tools",
    description: "Learn about Huzaifa Group of Software and the free tools platform.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Huzaifa Tools",
    description: "Read the Huzaifa Tools privacy policy.",
  },
  "/terms-conditions": {
    title: "Terms & Conditions | Huzaifa Tools",
    description: "Read the Huzaifa Tools terms and conditions.",
  },
  "/disclaimer": {
    title: "Disclaimer | Huzaifa Tools",
    description: "Read the Huzaifa Tools disclaimer.",
  },
};

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

function buildToolDescription(tool) {
  if (!tool) return DEFAULT_DESCRIPTION;
  if (tool.seoDescription) return tool.seoDescription;
  if (tool.description) {
    return `${tool.description} Free to use on Huzaifa Tools.`;
  }
  return `${tool.name} is available for free on Huzaifa Tools.`;
}

function buildToolTitle(tool, fallbackTitle) {
  if (!tool) return fallbackTitle || DEFAULT_TITLE;
  if (tool.seoTitle) return tool.seoTitle;
  return `${tool.name} | Huzaifa Tools`;
}

export function getPageSeoData(pathname, fallbackTitle) {
  const normalizedPath = normalizePath(pathname);
  const routeKey = normalizedPath === "/" ? "/" : normalizedPath;
  const slug = normalizedPath.replace(/^\//, "");
  const tool = tools.find((entry) => entry.slug === slug);
  const blogSlug = normalizedPath.startsWith("/blog/")
    ? normalizedPath.replace("/blog/", "")
    : null;
  const blog = blogSlug ? getBlogBySlug(blogSlug) : null;
  const routeMeta = ROUTE_META[routeKey] || {};
  const isKnownRoute = Boolean(blog || tool || ROUTE_META[routeKey]);
  const isMissingPage = !isKnownRoute;

  const title = isMissingPage
    ? "Page Not Found | Huzaifa Tools"
    : blog
    ? blog.metaTitle
    : tool
    ? buildToolTitle(tool, fallbackTitle)
    : routeMeta.title || fallbackTitle || DEFAULT_TITLE;

  const description = isMissingPage
    ? "This page does not exist or is no longer available. Browse the Huzaifa Tools catalog or blog."
    : blog
    ? blog.metaDescription
    : tool
    ? buildToolDescription(tool)
    : routeMeta.description || DEFAULT_DESCRIPTION;

  const canonicalPath = normalizedPath === "/" ? "/" : normalizedPath;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const pageTitle = title;
  const pageDescription = description;
  const ogType = blog ? "article" : tool ? "website" : "website";
  const ogImage = new URL(blog?.featuredImage || DEFAULT_IMAGE, SITE_URL).href;
  const noindex = isMissingPage || [...ACCOUNT_PATHS, "/favorites", "/history", "/chat"].includes(normalizedPath);
  const robots = isMissingPage ? "noindex, nofollow" : noindex ? NOINDEX_ROBOTS : INDEXABLE_ROBOTS;

  const breadcrumbItems = isMissingPage
    ? [
        { name: "Home", url: SITE_URL },
        { name: "Page Not Found", url: canonicalUrl },
      ]
    : blog
    ? [
        { name: "Home", url: SITE_URL },
        { name: "Blog", url: `${SITE_URL}/blog` },
        { name: blog.title, url: canonicalUrl },
      ]
    : tool
    ? [
        { name: "Home", url: SITE_URL },
        { name: tool.category || "Tools", url: `${SITE_URL}/all-tools` },
        { name: tool.name, url: canonicalUrl },
      ]
    : [
        { name: "Home", url: SITE_URL },
        { name: routeMeta.title || DEFAULT_TITLE, url: canonicalUrl },
      ];

  const articleSchema = blog
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        headline: blog.title,
        description: pageDescription,
        image: [ogImage],
        author: {
          "@type": "Organization",
          name: blog.author,
        },
        publisher: {
          "@type": "Organization",
          name: "Huzaifa Group of Software",
          logo: {
            "@type": "ImageObject",
            url: DEFAULT_IMAGE,
          },
        },
        datePublished: blog.date,
        dateModified: blog.updated || blog.date,
        ...(blog.wordCount ? { wordCount: blog.wordCount } : {}),
      }
    : null;

  const faqSchema = blog?.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: blog.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return {
    title: pageTitle,
    description: pageDescription,
    canonicalUrl,
    robots,
    noindex,
    ogTitle: blog?.ogTitle || pageTitle,
    ogDescription: blog?.ogDescription || pageDescription,
    ogUrl: canonicalUrl,
    ogType,
    ogImage,
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: ogImage,
    articlePublishedTime: blog?.date || null,
    breadcrumbs: breadcrumbItems,
    jsonLd: noindex
      ? null
      : {
          webpage: {
            "@context": "https://schema.org",
            "@type": normalizedPath === "/" ? "WebSite" : "WebPage",
            name: pageTitle,
            url: canonicalUrl,
            description: pageDescription,
            inLanguage: "en",
          },
          breadcrumb: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.url,
            })),
          },
          article: articleSchema,
          faq: faqSchema,
          tool: tool
            ? {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: tool.name,
                description: pageDescription,
                url: canonicalUrl,
                applicationCategory: "Utilities",
                operatingSystem: "Web",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              }
            : null,
        },
  };
}

export { SITE_URL };
