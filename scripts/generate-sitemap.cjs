const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

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

  console.log(`Sitemap generated with ${urls.length} URLs`);
}

main().catch((error) => {
  console.error('Sitemap generation failed:', error);
  process.exit(1);
});
