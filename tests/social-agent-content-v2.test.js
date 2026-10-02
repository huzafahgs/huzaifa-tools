import test from 'node:test';
import assert from 'node:assert/strict';
import { generatePipeline, registeredTools, validateSocialPlan } from '../scripts/social-agent-content-v2.mjs';

const startDate = '2026-10-03';

test('creates 30 unique daily tool plans with category coverage', () => {
  const queue = generatePipeline({ startDate, days: 30 });
  assert.equal(queue.items.length, 30);
  assert.equal(new Set(queue.items.map((item) => item.date)).size, 30);
  assert.equal(new Set(queue.items.map((item) => item.tool.slug)).size, 30);
  assert.equal(queue.items[7].tool.category, 'Islamic');
  for (const category of ['PDF', 'Image', 'Text', 'Calculator', 'Converter', 'Developer', 'AI', 'Islamic']) {
    assert.ok(queue.items.some((item) => item.tool.category === category), category);
  }
  assert.equal(queue.evidenceStatus.registeredToolInventory, registeredTools.length);
});

test('creates distinct copy, hooks, CTAs, links, and storyboards for all platforms', () => {
  const queue = generatePipeline({ startDate, days: 30 });
  for (const item of queue.items) {
    assert.notEqual(item.facebook.message, item.instagram.caption);
    assert.notEqual(item.instagram.caption, item.youtube.description);
    assert.ok(item.facebook.cta && item.instagram.cta && item.youtube.cta);
    assert.ok(item.facebook.keywords.length && item.instagram.keywords.length && item.youtube.keywords.length);
    assert.equal(item.youtube.shortVideoScript.length, 5);
    assert.ok(item.youtube.shortVideoScript.every((beat) => beat.voiceover && beat.visual));
    assert.ok(item.facebook.link.includes('utm_source=facebook'));
    assert.ok(item.instagram.link.includes('utm_source=instagram'));
    assert.ok(item.youtube.link.includes('utm_source=youtube'));
    assert.ok(item.facebook.message.length <= 5000);
    assert.ok(item.instagram.caption.length <= 2200);
    assert.ok(item.youtube.title.length <= 100);
    assert.ok(item.facebook.hashtags.length <= 4 && item.instagram.hashtags.length <= 4 && item.youtube.hashtags.length <= 4);
    assert.ok(item.contentHashes.facebook && item.contentHashes.instagram && item.contentHashes.youtube);
  }
});

test('does not claim Search Console demand when no export is supplied', () => {
  const queue = generatePipeline({ startDate, days: 30 });
  assert.match(queue.evidenceStatus.searchConsole, /no current GSC export supplied/);
  assert.ok(queue.items.every((item) => item.score.signals.searchConsole === null));
});

test('uses supplied page-level Search Console evidence in scoring', () => {
  const queue = generatePipeline({ startDate, days: 1, gscEvidence: [{ page: 'https://ai-tools-by-huzaifa.vercel.app/pdf-merger', clicks: 50, impressions: 1200, ctr: 0.041, position: 9.5 }] });
  assert.equal(queue.items[0].tool.slug, 'pdf-merger');
  assert.equal(queue.items[0].score.signals.searchConsole.clicks, 50);
});

test('avoids tools already reserved in history until the catalog rotation is exhausted', () => {
  const queue = generatePipeline({ startDate, days: 1, history: [{ type: 'reservation', date: '2026-10-01', plan: { tool: { slug: 'pdf-merger' } } }] });
  assert.notEqual(queue.items[0].tool.slug, 'pdf-merger');
});

test('fails closed on bad UTMs, duplicate hashtags, and excessive copy', () => {
  const plan = generatePipeline({ startDate, days: 1 }).items[0];
  const badLink = structuredClone(plan);
  badLink.facebook.link = 'https://example.com/' + plan.tool.slug;
  assert.throws(() => validateSocialPlan(badLink), /Landing link|UTM/);
  const duplicateTag = structuredClone(plan);
  duplicateTag.instagram.hashtags.push(duplicateTag.instagram.hashtags[0]);
  assert.throws(() => validateSocialPlan(duplicateTag), /hashtags/);
  const tooLong = structuredClone(plan);
  tooLong.facebook.message = 'x'.repeat(5001);
  assert.throws(() => validateSocialPlan(tooLong), /caption length/);
});

test('restarts rotation without repeating a tool in the rolling queue after old history grows', () => {
  const history = registeredTools.slice(0, 110).map((tool, index) => ({
    type: 'reservation', date: '2026-01-01', plan: { tool: { slug: tool.slug }, date: '2026-01-01' }, timestamp: String(index),
  }));
  const queue = generatePipeline({ startDate: '2026-12-01', days: 30, history, startingIndex: 110 });
  assert.equal(new Set(queue.items.map((item) => item.tool.slug)).size, 30);
  assert.ok(queue.items.every((item, index) => !queue.items.slice(0, index).some((prior) => prior.tool.slug === item.tool.slug)));
});


test('uses only observed raw interactions as a small fallback when reach and views are absent', () => {
  const history = [
    { type: 'publication', postId: 'old-pdf', tool: { slug: 'pdf-merger' }, facebook: { status: 'published' } },
    { type: 'metrics_snapshot', postId: 'old-pdf', facebook: { likes: 14, comments: 3, shares: 2 } },
  ];
  const queue = generatePipeline({ startDate: '2026-10-03', days: 1, history });
  const signal = queue.items[0].score.signals.socialMetrics;
  assert.equal(queue.items[0].tool.slug, 'pdf-merger');
  assert.equal(signal.likes, 14);
  assert.equal(signal.comments, 3);
  assert.equal(signal.engagementRate, null);
  assert.ok(signal.basedOn > 0);
  assert.ok(queue.items[0].score.signals.socialMetricsBoost > 0);
  assert.match(queue.items[0].score.basis, /raw social interactions \(not a rate\)/);
});
