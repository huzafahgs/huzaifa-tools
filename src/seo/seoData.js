import tools from "../toolsData";
import logoAsset from "../assets/logo.png";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://ai-tools-by-huzaifa.vercel.app";
const DEFAULT_TITLE = "Huzaifa Office - 50+ Free AI Tools";
const DEFAULT_DESCRIPTION = "Huzaifa Office offers 50+ free AI tools for text processing, calculations, conversions, and productivity.";
const DEFAULT_IMAGE = logoAsset;

const ROUTE_META = {
  "/": {
    title: "Huzaifa Office - 50+ Free AI Tools",
    description: DEFAULT_DESCRIPTION,
  },
  "/all-tools": {
    title: "All Tools | Huzaifa Office",
    description: "Explore the full catalog of free tools on Huzaifa Office.",
  },
  "/blog": {
    title: "Blog | Huzaifa Office",
    description: "Read the latest updates, product news, and tips from Huzaifa Office.",
  },
  "/favorites": {
    title: "Favorites | Huzaifa Office",
    description: "Save and revisit your favorite tools on Huzaifa Office.",
  },
  "/history": {
    title: "History | Huzaifa Office",
    description: "Review your recent tool activity on Huzaifa Office.",
  },
  "/pricing": {
    title: "Pricing | Huzaifa Office",
    description: "Use Huzaifa Office tools completely free with a premium experience in mind.",
  },
  "/contact": {
    title: "Contact | Huzaifa Office",
    description: "Contact Huzaifa Group of Software for support, questions, or partnership inquiries.",
  },
  "/chat": {
    title: "AI Chat | Huzaifa Office",
    description: "Chat with Huzaifa Office for product guidance and support.",
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
    return `${tool.description} Fast, secure, and free on Huzaifa Office.`;
  }
  return `${tool.name} is available for free on Huzaifa Office.`;
}

function buildToolTitle(tool, fallbackTitle) {
  if (!tool) return fallbackTitle || DEFAULT_TITLE;
  if (tool.seoTitle) return tool.seoTitle;
  return `${tool.name} | Huzaifa Office`;
}

export function getPageSeoData(pathname, fallbackTitle) {
  const normalizedPath = normalizePath(pathname);
  const routeKey = normalizedPath === "/" ? "/" : normalizedPath;
  const tool = tools.find((entry) => entry.slug === normalizedPath.replace(/^\//, ""));
  const routeMeta = ROUTE_META[routeKey] || {};

  const title = tool
    ? buildToolTitle(tool, fallbackTitle)
    : routeMeta.title || fallbackTitle || DEFAULT_TITLE;

  const description = tool
    ? buildToolDescription(tool)
    : routeMeta.description || DEFAULT_DESCRIPTION;

  const canonicalPath = normalizedPath === "/" ? "/" : normalizedPath;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const pageTitle = title;
  const pageDescription = description;

  const breadcrumbItems = tool
    ? [
        { name: "Home", url: SITE_URL },
        { name: tool.category || "Tools", url: `${SITE_URL}/all-tools` },
        { name: tool.name, url: canonicalUrl },
      ]
    : [
        { name: "Home", url: SITE_URL },
        { name: routeMeta.title || DEFAULT_TITLE, url: canonicalUrl },
      ];

  return {
    title: pageTitle,
    description: pageDescription,
    canonicalUrl,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogUrl: canonicalUrl,
    ogImage: DEFAULT_IMAGE,
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: DEFAULT_IMAGE,
    breadcrumbs: breadcrumbItems,
    jsonLd: {
      webpage: {
        "@context": "https://schema.org",
        "@type": tool ? "WebPage" : "WebSite",
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
