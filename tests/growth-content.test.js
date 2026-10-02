import assert from "node:assert/strict";
import test from "node:test";

import blogs from "../src/data/blogs.js";
import { growthContentGuideTopics } from "../src/data/growthContentGuides.js";
import tools from "../src/toolsData.js";

test("growth guides have unique routes and valid tool relationships", async () => {
  const allSlugs = blogs.map((blog) => blog.slug);
  assert.equal(new Set(allSlugs).size, allSlugs.length);

  const toolSlugs = new Set(tools.map((tool) => tool.slug));
  const blogSlugs = new Set(allSlugs);

  for (const guide of growthContentGuideTopics) {
    assert.ok(toolSlugs.has(guide.toolSlug));
    assert.ok((guide.guideToolSlugs || []).every((slug) => toolSlugs.has(slug)));
    assert.ok(guide.relatedTools.every((slug) => toolSlugs.has(slug)));
    assert.ok(guide.relatedArticles.every((slug) => blogSlugs.has(slug)));
    assert.ok(guide.metaTitle.length <= 65);
    assert.ok(guide.metaDescription.length >= 120);
    assert.ok(guide.metaDescription.length <= 165);
    assert.ok(guide.faq.length >= 3);

    const article = await guide.content();
    assert.ok(article.split(/\s+/).length >= 1000);
    assert.match(article, new RegExp(`\\(/${guide.toolSlug}\\)`));
    for (const slug of guide.guideToolSlugs || []) {
      assert.match(article, new RegExp(`\\(/${slug}\\)`));
    }
  }
});
