const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const DIST_DIR = path.resolve(__dirname, "../dist");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function setMeta(html, selector, tag) {
  const patterns = {
    description: /<meta name="description"[^>]*>/,
    robots: /<meta name="robots"[^>]*>/,
    canonical: /<link rel="canonical"[^>]*>/,
    ogTitle: /<meta property="og:title"[^>]*>/,
    ogDescription: /<meta property="og:description"[^>]*>/,
    ogUrl: /<meta property="og:url"[^>]*>/,
    ogType: /<meta property="og:type"[^>]*>/,
    ogImage: /<meta property="og:image"[^>]*>/,
    ogImageAlt: /<meta property="og:image:alt"[^>]*>/,
    twitterCard: /<meta name="twitter:card"[^>]*>/,
    twitterTitle: /<meta name="twitter:title"[^>]*>/,
    twitterDescription: /<meta name="twitter:description"[^>]*>/,
    twitterImage: /<meta name="twitter:image"[^>]*>/,
  };
  const pattern = patterns[selector];
  if (!pattern) throw new Error(`Unknown metadata selector: ${selector}`);
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `  ${tag}\n</head>`);
}

function renderHtml(template, seo) {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  const tags = {
    description: `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    robots: `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    canonical: `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`,
    ogTitle: `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />`,
    ogDescription: `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />`,
    ogUrl: `<meta property="og:url" content="${escapeHtml(seo.ogUrl)}" />`,
    ogType: `<meta property="og:type" content="${escapeHtml(seo.ogType)}" />`,
    ogImage: `<meta property="og:image" content="${escapeHtml(seo.ogImage)}" />`,
    ogImageAlt: '<meta property="og:image:alt" content="Huzaifa Tools" />',
    twitterCard: '<meta name="twitter:card" content="summary_large_image" />',
    twitterTitle: `<meta name="twitter:title" content="${escapeHtml(seo.twitterTitle)}" />`,
    twitterDescription: `<meta name="twitter:description" content="${escapeHtml(seo.twitterDescription)}" />`,
    twitterImage: `<meta name="twitter:image" content="${escapeHtml(seo.twitterImage)}" />`,
  };

  for (const [selector, tag] of Object.entries(tags)) html = setMeta(html, selector, tag);

  html = html.replace(/\s*<meta property="article:published_time"[^>]*>/g, "");
  if (seo.articlePublishedTime) {
    html = html.replace(
      "</head>",
      `  <meta property="article:published_time" content="${escapeHtml(seo.articlePublishedTime)}" />\n</head>`,
    );
  }

  html = html.replace(/\s*<script id="app-jsonld"[\s\S]*?<\/script>/g, "");
  if (seo.jsonLd) {
    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": Object.values(seo.jsonLd).filter(Boolean),
    }).replaceAll("<", "\\u003c");
    html = html.replace(
      "</head>",
      `  <script id="app-jsonld" type="application/ld+json">${jsonLd}</script>\n</head>`,
    );
  }

  return html;
}

async function main() {
  const [{ default: tools }, blogsModule, seoModule] = await Promise.all([
    import(pathToFileURL(path.resolve(__dirname, "../src/toolsData.js")).href),
    import(pathToFileURL(path.resolve(__dirname, "../src/data/blogs.js")).href),
    import(pathToFileURL(path.resolve(__dirname, "../src/seo/seoData.js")).href),
  ]);
  const blogs = blogsModule.getAllBlogs();
  const { getPageSeoData } = seoModule;
  const template = fs.readFileSync(path.join(DIST_DIR, "index.html"), "utf8");
  const staticRoutes = [
    "/",
    "/all-tools",
    "/blog",
    "/pricing",
    "/contact",
    "/about-us",
    "/privacy-policy",
    "/terms-conditions",
    "/disclaimer",
    "/favorites",
    "/history",
    "/chat",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/account",
    "/auth/callback",
  ];
  const routes = [
    ...staticRoutes,
    ...tools.map((tool) => `/${tool.slug}`),
    ...blogs.map((blog) => `/blog/${blog.slug}`),
  ];

  for (const route of routes) {
    const seo = getPageSeoData(route);
    const output = route === "/" ? "index.html" : `${route.slice(1)}.html`;
    const outputPath = path.join(DIST_DIR, output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, renderHtml(template, seo), "utf8");
  }

  const notFoundSeo = getPageSeoData("/__not-found__");
  const notFoundHtml = renderHtml(template, notFoundSeo).replace(
    /\s*<link rel="canonical"[^>]*>/,
    "",
  );
  fs.writeFileSync(path.join(DIST_DIR, "404.html"), notFoundHtml, "utf8");
  console.log(`Generated metadata shells for ${routes.length} routes plus 404.html`);
}

main().catch((error) => {
  console.error("Static metadata generation failed:", error);
  process.exit(1);
});
