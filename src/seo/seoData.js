import tools from "../toolsData";
import { getBlogBySlug } from "../data/blogs";
import logoAsset from "../assets/logo.png";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://ai-tools-by-huzaifa.vercel.app";
const DEFAULT_TITLE = "Huzaifa Tools – 600+ Free AI & Utility Tools";
const DEFAULT_DESCRIPTION = "Huzaifa Tools offers 600+ free AI and utility tools for text processing, calculations, conversions, and productivity.";
const DEFAULT_IMAGE = logoAsset;

const ROUTE_META = {
  "/": {
    title: "Huzaifa Tools – 600+ Free AI & Utility Tools",
    description: DEFAULT_DESCRIPTION,
  },
  "/all-tools": {
    title: "All Tools | Huzaifa Tools",
    description: "Explore the full catalog of free tools on Huzaifa Tools.",
  },
  "/blog": {
    title: "Blog | Huzaifa Tools",
    description: "Read the latest updates, product news, and tips from Huzaifa Tools.",
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
    description: "Use Huzaifa Tools completely free with a premium experience in mind.",
  },
  "/contact": {
    title: "Contact | Huzaifa Tools",
    description: "Contact Huzaifa Group of Software for support, questions, or partnership inquiries.",
  },
  "/chat": {
    title: "AI Chat | Huzaifa Tools",
    description: "Chat with Huzaifa Tools for product guidance and support.",
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
    return `${tool.description} Fast, secure, and free on Huzaifa Tools.`;
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
  const tool = tools.find((entry) => entry.slug === normalizedPath.replace(/^\//, ""));
  const blogSlug = normalizedPath.startsWith("/blog/")
    ? normalizedPath.replace("/blog/", "")
    : null;
  const blog = blogSlug ? getBlogBySlug(blogSlug) : null;
  const routeMeta = ROUTE_META[routeKey] || {};

  const title = blog
    ? blog.metaTitle
    : tool
    ? buildToolTitle(tool, fallbackTitle)
    : routeMeta.title || fallbackTitle || DEFAULT_TITLE;

  const description = blog
    ? blog.metaDescription
    : tool
    ? buildToolDescription(tool)
    : routeMeta.description || DEFAULT_DESCRIPTION;

  const canonicalPath = normalizedPath === "/" ? "/" : normalizedPath;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const pageTitle = title;
  const pageDescription = description;
  const ogType = blog ? "article" : tool ? "website" : "website";
  const ogImage = blog?.featuredImage || DEFAULT_IMAGE;

  const breadcrumbItems = blog
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
        dateModified: blog.date,
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
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogUrl: canonicalUrl,
    ogType,
    ogImage,
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: ogImage,
    articlePublishedTime: blog?.date || null,
    breadcrumbs: breadcrumbItems,
    jsonLd: {
      webpage: {
        "@context": "https://schema.org",
        "@type": blog ? "Article" : tool ? "WebPage" : "WebSite",
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
