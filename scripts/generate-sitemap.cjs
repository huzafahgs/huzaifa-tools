const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

function escapeXml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function absoluteUrl(siteUrl, value) {
  return new URL(value, `${siteUrl}/`).href;
}

function imageMimeType(url) {
  const pathname = new URL(url).pathname.toLowerCase();
  if (pathname.endsWith('.webp')) return 'image/webp';
  if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) return 'image/jpeg';
  if (pathname.endsWith('.svg')) return 'image/svg+xml';
  return 'image/png';
}

async function main() {
  const toolsModuleUrl = pathToFileURL(
    path.resolve(__dirname, '../src/toolsData.js')
  );

  const toolsModule = await import(toolsModuleUrl.href);
  const tools = toolsModule.default || [];

  const blogsModuleUrl = pathToFileURL(
    path.resolve(__dirname, '../src/data/blogs.js')
  );

  const blogsModule = await import(blogsModuleUrl.href);
  const blogs = blogsModule.default || [];

  const registeredToolsPath = path.resolve(
    __dirname,
    '../src/tools/index.js'
  );

  const registeredToolsSource = fs.readFileSync(
    registeredToolsPath,
    'utf8'
  );

  const registeredToolSlugs = new Set(
    [...registeredToolsSource.matchAll(/registerTool\("([^"]+)"/g)].map(
      (match) => match[1]
    )
  );

  const registeredTools = tools.filter(
    (tool) =>
      tool?.slug &&
      registeredToolSlugs.has(tool.slug)
  );

  const SITE_URL =
    process.env.VITE_SITE_URL ||
    'https://ai-tools-by-huzaifa.vercel.app';

  const staticRoutes = [
    '/',
    '/all-tools',
    '/blog',
    '/pricing',
    '/contact',
    '/about-us',
    '/privacy-policy',
    '/terms-conditions',
    '/disclaimer',
  ];

  const urls = [
    ...staticRoutes.map((route) => ({
      loc: `${SITE_URL}${route}`,
      changefreq: 'weekly',
      priority: route === '/' ? '1.0' : '0.8',
    })),

    ...registeredTools.map((tool) => ({
      loc: `${SITE_URL}/${tool.slug}`,
      changefreq: 'weekly',
      priority: '0.8',
    })),

    ...blogs
      .filter((blog) => blog?.slug)
      .map((blog) => ({
        loc: `${SITE_URL}/blog/${blog.slug}`,
        changefreq: 'weekly',
        priority: '0.7',
      })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (item) =>
        `  <url><loc>${item.loc}</loc><changefreq>${item.changefreq}</changefreq><priority>${item.priority}</priority></url>`
    ),
    '</urlset>',
    '',
  ].join('\r\n');

  const outputPath = path.resolve(
    __dirname,
    '../public/sitemap.xml'
  );

  fs.writeFileSync(outputPath, xml, 'utf8');

  const feedItems = blogs
    .filter((blog) => blog?.slug && blog?.title && blog?.date)
    .sort((a, b) => b.date.localeCompare(a.date));

  const rssItems = feedItems.map((blog) => {
    const canonicalUrl = `${SITE_URL}/blog/${blog.slug}`;
    const description = blog.metaDescription || blog.ogDescription || '';
    const imageUrl = blog.featuredImage
      ? absoluteUrl(SITE_URL, blog.featuredImage)
      : null;

    return [
      '    <item>',
      `      <title>${escapeXml(blog.title)}</title>`,
      `      <link>${escapeXml(canonicalUrl)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(canonicalUrl)}</guid>`,
      `      <pubDate>${new Date(`${blog.date}T00:00:00Z`).toUTCString()}</pubDate>`,
      `      <description>${escapeXml(description)}</description>`,
      ...(imageUrl
        ? [
            `      <enclosure url="${escapeXml(imageUrl)}" type="${imageMimeType(imageUrl)}" />`,
            `      <media:content url="${escapeXml(imageUrl)}" medium="image" />`,
          ]
        : []),
      '    </item>',
    ].join('\r\n');
  });

  const latestDate = feedItems[0]?.date;
  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">',
    '  <channel>',
    '    <title>Huzaifa Tools Blog</title>',
    `    <link>${SITE_URL}/blog</link>`,
    '    <description>Practical guides for Huzaifa Tools, including calculators, converters, document, image, developer and AI workflows.</description>',
    '    <language>en</language>',
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    `    <image><url>${SITE_URL}/logo.png</url><title>Huzaifa Tools Blog</title><link>${SITE_URL}/blog</link></image>`,
    ...(latestDate
      ? [`    <lastBuildDate>${new Date(`${latestDate}T00:00:00Z`).toUTCString()}</lastBuildDate>`]
      : []),
    ...rssItems,
    '  </channel>',
    '</rss>',
    '',
  ].join('\r\n');

  const rssOutputPath = path.resolve(__dirname, '../public/rss.xml');
  fs.writeFileSync(rssOutputPath, rss, 'utf8');

  console.log(`Sitemap generated with ${urls.length} URLs`);
  console.log(`RSS feed generated with ${feedItems.length} articles`);
}

main().catch((error) => {
  console.error('Sitemap generation failed:', error);
  process.exit(1);
});
