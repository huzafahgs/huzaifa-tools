import toolsData from '../src/toolsData.js';
import { getAllBlogs } from '../src/data/blogs.js';
import fs from 'node:fs';
import path from 'node:path';

const registrationText = fs.readFileSync(new URL('../src/tools/index.js', import.meta.url), 'utf8');
export const registeredSlugs = new Set([...registrationText.matchAll(/registerTool\("([^"]+)"/g)].map((match) => match[1]));
export const registeredTools = toolsData.filter((tool) => tool?.slug && tool?.name && tool?.description && registeredSlugs.has(tool.slug));
const blogRecords = getAllBlogs();
const CATEGORY_SEED = ['PDF', 'Image', 'Text', 'Calculator', 'Converter', 'Developer', 'AI', 'Islamic'];
const GROUPS = {
  'PDF': 'PDF', 'Image': 'Image', 'Text': 'Text', 'Calculator': 'Calculator',
  'Converter': 'Converter', 'Developer': 'Developer', 'AI': 'AI', 'Islamic': 'Islamic',
};
const CATEGORY_TAG = {
  PDF: '#PDFTools', Image: '#ImageTools', Text: '#TextTools', Calculator: '#Calculators',
  Converter: '#Converters', Developer: '#DeveloperTools', AI: '#AITools', Islamic: '#IslamicTools',
  Security: '#SecurityTools', SEO: '#SEOTools', Business: '#BusinessTools', Student: '#StudyTools',
  Health: '#HealthTools', Finance: '#FinanceTools', Number: '#NumberTools', Time: '#TimeTools',
  Utility: '#OnlineTools', Generator: '#OnlineTools',
};
const category = (tool) => String(tool.category || 'Utility');
const group = (tool) => GROUPS[category(tool)] || category(tool);
const slugWords = (slug) => slug.split('-').filter(Boolean).join(' ');
const limit = (value, max) => value.length > max ? value.slice(0, max - 1).trimEnd() + '…' : value;
const dateShift = (iso, days) => {
  const [year, month, day] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return [date.getUTCFullYear(), String(date.getUTCMonth() + 1).padStart(2, '0'), String(date.getUTCDate()).padStart(2, '0')].join('-');
};
export const karachiDate = (date = new Date()) => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Karachi', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(date);

export function trackedUrl(tool, date, source, siteUrl = 'https://ai-tools-by-huzaifa.vercel.app') {
  const url = new URL('/' + tool.slug, siteUrl);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', 'organic_social');
  url.searchParams.set('utm_campaign', 'hgs_social_v2_' + date.replaceAll('-', ''));
  url.searchParams.set('utm_content', tool.slug + '_' + source);
  return url.toString();
}

function helpSteps(tool) {
  const steps = tool.help?.steps || tool.tips || [];
  return Array.isArray(steps) ? steps.map((step) => String(step).trim()).filter(Boolean) : [];
}
function clipSentence(value, max = 180) {
  const cleaned = String(value || '').replace(/\s+/g, ' ').trim();
  return limit(cleaned.replace(/\.$/, ''), max);
}
function genericSafety(tool) {
  const cat = category(tool);
  if (cat === 'Security') return 'Use sample values only. Never show real passwords, keys, tokens, or private data.';
  if (cat === 'Islamic') return 'Show the selected method and assumptions; treat the result as an estimate, not a religious ruling.';
  if (cat === 'Health') return 'Treat calculator output as general information, not medical advice or diagnosis.';
  if (cat === 'Calculator' || cat === 'Finance' || cat === 'Business') return 'Check the inputs, units, rounding, and assumptions before using the result.';
  if (cat === 'AI') return 'Review the draft for accuracy and privacy; do not paste confidential information.';
  if (cat === 'Developer') return 'Use a small, non-sensitive sample and inspect the output before using it.';
  if (cat === 'PDF' || cat === 'Image') return 'Check the downloaded result in your intended app before sharing or relying on it.';
  return 'Check the result against the requirements of your task.';
}
function topicLesson(tool) {
  const steps = helpSteps(tool);
  const cat = category(tool);
  const name = tool.name;
  const task = clipSentence(tool.description, 155);
  let problem;
  if (cat === 'PDF') problem = 'Prepare a PDF task and verify the downloaded pages';
  else if (cat === 'Image') problem = 'Adjust an image and inspect the exported file';
  else if (cat === 'Text') problem = 'Work through a small text task and check the result';
  else if (cat === 'Calculator' || cat === 'Finance' || cat === 'Business' || cat === 'Health') problem = 'Estimate a result from your own inputs and check the assumptions';
  else if (cat === 'Converter' || cat === 'Number' || cat === 'Time') problem = 'Convert a value and confirm the output units or format';
  else if (cat === 'Developer' || cat === 'Security') problem = 'Inspect a small, non-sensitive sample before using the output';
  else if (cat === 'AI') problem = 'Turn a clear brief into a draft that you can review';
  else if (cat === 'Islamic') problem = 'Understand a Zakat estimate and the method selected';
  else problem = task;
  let action;
  if (steps.length) action = clipSentence(steps[0], 190);
  else if (cat === 'Islamic') action = 'Enter assets and liabilities in the fields shown, then compare the displayed estimate with the selected gold or silver nisab method.';
  else if (cat === 'AI') action = 'Give the tool a short brief without private details, then review the returned draft against your instructions.';
  else if (cat === 'Calculator' || cat === 'Finance' || cat === 'Business' || cat === 'Health') action = 'Enter a small example using the units shown, then inspect each input and the displayed result.';
  else if (cat === 'Developer' || cat === 'Security') action = 'Paste a harmless sample, run the tool, and inspect the output or validation message.';
  else if (cat === 'PDF' || cat === 'Image') action = 'Choose a small permitted sample, use the visible controls, then open the downloaded file to inspect it.';
  else action = 'Try a short, non-sensitive example and compare the output with what your task requires.';
  const check = steps[1] ? clipSentence(steps[1], 190) : genericSafety(tool);
  const takeaway = steps[2] ? clipSentence(steps[2], 190) : genericSafety(tool);
  let hook;
  if (cat === 'PDF') hook = 'Need to work with a PDF?';
  else if (cat === 'Image') hook = 'Need to adjust an image?';
  else if (cat === 'Text') hook = 'Working through a text task?';
  else if (cat === 'AI') hook = 'Want a draft you can actually review?';
  else if (cat === 'Islamic') hook = 'Checking a Zakat estimate?';
  else if (cat === 'Calculator' || cat === 'Finance' || cat === 'Business' || cat === 'Health') hook = 'Checking a calculation before you use it?';
  else if (cat === 'Developer' || cat === 'Security') hook = 'Need to inspect a small sample?';
  else if (cat === 'Converter' || cat === 'Number' || cat === 'Time') hook = 'Need to convert a value?';
  else hook = 'Need a quick way to ' + task.toLowerCase().replace(/[.!?]+$/, '') + '?';
  return { hook, problem, action, check, takeaway, factualBasis: [tool.description, ...steps].slice(0, 4) };
}
function relatedArticles(tool) {
  return blogRecords.filter((article) => (
    article.recommendedTools?.includes(tool.slug) ||
    article.relatedTools?.includes(tool.slug) ||
    article.toolSlug === tool.slug
  )).slice(0, 3).map(({ title, slug, primaryKeyword }) => ({ title, slug, primaryKeyword }));
}
function keywordSet(tool, source) {
  const base = [tool.name, category(tool) + ' tool', 'Huzaifa Tools', ...slugWords(tool.slug).split(' ')];
  const platformFocus = source === 'youtube' ? ['how to', 'short tutorial'] : source === 'instagram' ? ['quick tutorial', 'practical tip'] : ['step by step', 'online utility'];
  return [...new Set([...base, ...platformFocus].map((x) => x.trim()).filter(Boolean))].slice(0, 8);
}
function hashtags(tool, source) {
  const categoryTag = CATEGORY_TAG[category(tool)] || '#OnlineTools';
  const tags = source === 'youtube'
    ? ['#Shorts', '#HuzaifaTools', categoryTag]
    : source === 'instagram'
      ? ['#HuzaifaTools', categoryTag, '#QuickTutorial']
      : ['#HuzaifaTools', categoryTag];
  return [...new Set(tags)];
}
function storyboard(tool, lesson, links) {
  return [
    { seconds: '0–3', goal: 'Retention hook', visual: 'Show the everyday task first; keep the tool name off-screen for the opening beat.', voiceover: lesson.hook },
    { seconds: '3–7', goal: 'Orient', visual: 'Open the real Huzaifa Tools page for ' + tool.name + ' and show its actual controls.', voiceover: 'Here is a quick walkthrough using ' + tool.name + '.' },
    { seconds: '7–14', goal: 'Demonstrate', visual: lesson.action + ' Use only a real, harmless sample and show the actual interface output.', voiceover: limit(lesson.action, 130) },
    { seconds: '14–20', goal: 'Teach a check', visual: lesson.check + ' Pause long enough for viewers to read the real result.', voiceover: limit(lesson.check, 130) },
    { seconds: '20–25', goal: 'Useful CTA', visual: 'Show a branded end card with the tool name. Put the link in the caption/description; do not fabricate a result.', voiceover: 'Save this for your next task, and follow Huzaifa Tools for more practical demos.' },
  ];
}
function postHash(plan, field) {
  let hash = 2166136261;
  for (const char of plan[field]) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return (hash >>> 0).toString(16);
}

export function buildSocialPlan(tool, date, siteUrl) {
  const lesson = topicLesson(tool);
  const slug = tool.slug;
  const planId = date + '-' + slug;
  const links = {
    facebook: trackedUrl(tool, date, 'facebook', siteUrl),
    instagram: trackedUrl(tool, date, 'instagram', siteUrl),
    youtube: trackedUrl(tool, date, 'youtube', siteUrl),
  };
  const board = storyboard(tool, lesson, links);
  const platformBoard = (cta, platform) => {
    const copy = board.map((beat) => ({ ...beat }));
    copy[4] = { ...copy[4], visual: 'Show the Huzaifa Tools ' + platform + ' end card. ' + cta, voiceover: cta };
    return copy;
  };
  const instagramBoard = platformBoard('Save this Reel and follow for more practical walkthroughs.', 'Instagram Reels');
  const facebookBoard = platformBoard('Follow the Huzaifa Tools Page; open the attached tool link to try it.', 'Facebook Reels');
  const youtubeBoard = platformBoard('Follow for more practical Shorts; open the tracked tool link in the description.', 'YouTube Shorts');
  const facebookTitle = limit(lesson.problem + ': ' + tool.name, 100);
  const youtubeTitle = limit(lesson.hook.replace(/[?]$/, '') + ' | ' + tool.name + ' #Shorts', 100);
  const facebookCTA = 'Try one small example and tell us which everyday tool task to explain next.';
  const instagramCTA = 'Save this Reel for later, then try the same steps with a non-sensitive example.';
  const youtubeCTA = 'Follow for practical walkthroughs; the tracked tool link is in the description.';
  const facebookMessage = [
    'QUICK WALKTHROUGH · ' + tool.name,
    lesson.problem + '.',
    lesson.action,
    lesson.check,
    facebookCTA,
    hashtags(tool, 'facebook').join(' '),
  ].join('\n\n');
  const instagramCaption = [
    lesson.hook + ' Here is a short, practical demo of ' + tool.name + '.',
    lesson.action + ' ' + lesson.takeaway,
    instagramCTA,
    'Tool page (plain-text URL): ' + links.instagram,
    'Instagram may not make caption URLs tappable; the destination is also recorded separately for tracking.',
    hashtags(tool, 'instagram').join(' '),
  ].join('\n\n');
  const youtubeDescription = [
    lesson.problem + '. ' + lesson.action,
    lesson.check,
    'Tool page: ' + links.youtube,
    youtubeCTA,
    hashtags(tool, 'youtube').join(' '),
  ].join('\n\n');
  const plan = {
    id: planId, date, version: 2,
    tool: { name: tool.name, slug, category: catName(tool), description: tool.description },
    lesson,
    score: null,
    contentAngle: 'Original real-interface walkthrough with one concrete verification step; distinguish it from any related long-form guide and do not reuse article prose.',
    articleReferences: relatedArticles(tool),
    landingPage: trackedUrl(tool, date, 'social', siteUrl),
    facebook: { title: facebookTitle, hook: lesson.hook, message: facebookMessage, caption: facebookMessage, keywords: keywordSet(tool, 'facebook'), hashtags: hashtags(tool, 'facebook'), cta: facebookCTA, link: links.facebook, linkPlacement: 'Facebook Page link attachment', reelScript: facebookBoard },
    instagram: { title: limit(lesson.hook.replace(/[?]$/, '') + ' · ' + tool.name, 120), hook: lesson.hook, caption: instagramCaption, keywords: keywordSet(tool, 'instagram'), hashtags: hashtags(tool, 'instagram'), cta: instagramCTA, link: links.instagram, linkPlacement: 'plain-text caption URL; not guaranteed tappable', reelScript: instagramBoard, imagePath: 'assets/' + planId + '.jpg' },
    youtube: { status: 'script_only', title: youtubeTitle, hook: lesson.hook, description: youtubeDescription, keywords: keywordSet(tool, 'youtube'), hashtags: hashtags(tool, 'youtube'), cta: youtubeCTA, link: links.youtube, shortVideoScript: youtubeBoard },
    video: { status: 'storyboard_only', durationSeconds: 25, targetFormats: ['YouTube Shorts', 'Instagram Reels', 'Facebook Reels'], provider: { id: null, configured: false }, storyboard: board, platformScripts: { facebook: facebookBoard, instagram: instagramBoard, youtube: youtubeBoard } },
    asset: { imagePath: 'assets/' + planId + '.jpg', alt: tool.name + ' practical walkthrough card for Huzaifa Tools' },
    createdAt: new Date().toISOString(),
  };
  plan.contentHashes = { facebook: postHash(plan.facebook, 'message'), instagram: postHash(plan.instagram, 'caption'), youtube: postHash(plan.youtube, 'description') };
  validateSocialPlan(plan, siteUrl);
  return plan;
}

function catName(tool) { return category(tool); }
function verifyUTM(link, source, date, slug, siteUrl) {
  const url = new URL(link);
  const base = new URL(siteUrl);
  if (url.origin !== base.origin || url.pathname !== '/' + slug) throw new Error('Landing link does not match the registered tool route.');
  const expected = { utm_source: source, utm_medium: 'organic_social', utm_campaign: 'hgs_social_v2_' + date.replaceAll('-', ''), utm_content: slug + '_' + source };
  for (const [key, value] of Object.entries(expected)) if (url.searchParams.get(key) !== value) throw new Error('Invalid UTM parameter: ' + key);
  if ([...url.searchParams.keys()].length !== 4) throw new Error('Unexpected UTM parameter.');
}
export function validateSocialPlan(plan, siteUrl = 'https://ai-tools-by-huzaifa.vercel.app') {
  const max = { facebook: 5000, instagram: 2200, youtube: 5000 };
  if (!registeredSlugs.has(plan.tool.slug)) throw new Error('Unregistered tool slug: ' + plan.tool.slug);
  for (const [platform, source] of [['facebook', 'facebook'], ['instagram', 'instagram'], ['youtube', 'youtube']]) {
    const value = platform === 'facebook' ? plan.facebook.message : platform === 'instagram' ? plan.instagram.caption : plan.youtube.description;
    if (!value || value.length > max[platform]) throw new Error(platform + ' caption length is invalid.');
    const tags = plan[platform].hashtags;
    if (new Set(tags.map((tag) => tag.toLowerCase())).size !== tags.length || tags.length > 4) throw new Error(platform + ' hashtags repeat or exceed the restrained limit.');
    const url = platform === 'facebook' ? plan.facebook.link : plan[platform].link;
    verifyUTM(url, source, plan.date, plan.tool.slug, siteUrl);
    if (!value.includes('Monetag') && !/smart.?link/i.test(value)) { /* explicit no-ad-link invariant */ }
    else throw new Error('Ad network links are not permitted in social content.');
  }
  verifyUTM(plan.landingPage, 'social', plan.date, plan.tool.slug, siteUrl);
  if (!plan.facebook.title || plan.facebook.title.length > 100) throw new Error('Facebook title is missing or too long.');
  if (!plan.instagram.title || plan.instagram.title.length > 120) throw new Error('Instagram title is missing or too long.');
  if (!plan.youtube.title || plan.youtube.title.length > 100) throw new Error('YouTube title exceeds the 100-character limit.');
  for (const platform of ['facebook', 'instagram', 'youtube']) if (!plan[platform].keywords?.length) throw new Error(platform + ' keywords are missing.');
  for (const script of [plan.youtube.shortVideoScript, plan.instagram.reelScript, plan.facebook.reelScript]) {
    if (!script || script.length !== 5) throw new Error('Each platform storyboard must contain five beats.');
    for (const beat of script) if (!beat.seconds || !beat.visual || !beat.voiceover) throw new Error('Storyboard beat is incomplete.');
  }
  if (!plan.asset.imagePath.endsWith('.jpg')) throw new Error('Social card asset must use a JPEG path.');
  const publicCopy = [plan.facebook.title, plan.facebook.message, plan.instagram.title, plan.instagram.caption, plan.youtube.title, plan.youtube.description, ...plan.youtube.shortVideoScript.map((beat) => beat.visual + ' ' + beat.voiceover)].join(' ');
  if (/(guaranteed|guarantees|best ever|number one|#1 tool|instant success|100% accurate)/i.test(publicCopy)) throw new Error('Unsupported absolute marketing claim detected.');
  return true;
}

function pageEvidence(tool, rows) {
  const match = rows.find((row) => {
    const page = row.page || row.url || row.pageUrl || '';
    try { return new URL(page, 'https://ai-tools-by-huzaifa.vercel.app').pathname.replace(/\/$/, '') === '/' + tool.slug; } catch { return false; }
  });
  if (!match) return null;
  const clicks = Number(match.clicks || 0), impressions = Number(match.impressions || 0);
  if (!Number.isFinite(clicks) || !Number.isFinite(impressions)) return null;
  return { page: match.page || match.url || match.pageUrl, clicks, impressions, ctr: match.ctr ?? null, position: match.position ?? null, source: 'Search Console page-level export' };
}
function performanceEvidence(tool, events) {
  const publications = events.filter((event) => event.type === 'publication' && event.tool?.slug === tool.slug);
  const postIds = new Set(publications.map((event) => event.postId));
  const snapshots = events.filter((event) => event.type === 'metrics_snapshot' && postIds.has(event.postId));
  let signals = { views: 0, watchTimeMinutes: 0, reach: 0, linkClicks: 0, saves: 0, shares: 0, comments: 0, likes: 0 };
  const perPost = new Map();
  for (const event of [...publications, ...snapshots]) {
    if (!perPost.has(event.postId)) perPost.set(event.postId, {});
    const destination = perPost.get(event.postId);
    for (const platform of ['facebook', 'instagram', 'youtube']) {
      const metric = event[platform]?.metrics || (event.type === 'metrics_snapshot' ? event[platform] : null) || {};
      for (const key of Object.keys(signals)) {
        const snake = key.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase());
        const value = Number(metric[key] ?? metric[snake] ?? 0);
        if (Number.isFinite(value) && value > Number(destination[key] || 0)) destination[key] = value;
      }
    }
  }
  for (const values of perPost.values()) for (const key of Object.keys(signals)) signals[key] += Number(values[key] || 0);
  const denominator = signals.views || signals.reach;
  const interactions = signals.likes + signals.comments + signals.shares + signals.saves + signals.linkClicks;
  const engagementRate = denominator > 0 ? interactions / denominator : null;
  const watchRate = signals.views > 0 ? signals.watchTimeMinutes / signals.views : null;
  return { ...signals, engagementRate, watchRate, basedOn: publications.length };
}
function gscBoost(evidence) {
  if (!evidence) return 0;
  return Math.min(60, Math.log1p(evidence.clicks) * 7 + Math.log1p(evidence.impressions) * 3);
}
function metricsBoost(metrics) {
  if (!metrics?.basedOn) return 0;
  if (metrics.engagementRate != null) return Math.min(25, Math.max(0, metrics.engagementRate * 100));
  // Current Meta collection can return likes/comments/shares without reach or views.
  // Use a small, capped interaction signal; never describe it as a rate or audience size.
  const interactions = Number(metrics.likes || 0) + Number(metrics.comments || 0) + Number(metrics.shares || 0) + Number(metrics.saves || 0) + Number(metrics.linkClicks || 0);
  return Math.min(8, Math.log1p(interactions) * 1.5);
}
function utilityBoost(tool) {
  const steps = helpSteps(tool).length;
  const categoryValue = { PDF: 10, Image: 9, Text: 8, Calculator: 8, Converter: 8, Developer: 8, AI: 7, Islamic: 7 }[category(tool)] || 5;
  return categoryValue + Math.min(6, steps * 2);
}
function articleCoverage(tool) {
  const related = relatedArticles(tool);
  return { relatedArticleCount: related.length, editorialGapBoost: related.length ? 0 : 3 };
}
function articleBoost(tool) { return articleCoverage(tool).editorialGapBoost; }
function rotationDistance(index, cursor, total) { return (index - cursor + total) % total; }

export function generatePipeline({
  tools = registeredTools, startDate = karachiDate(), days = 30, history = [], gscEvidence = [],
  performance = null, startingIndex = 0, siteUrl = 'https://ai-tools-by-huzaifa.vercel.app',
} = {}) {
  const catalog = tools.filter((tool) => tool?.slug && registeredSlugs.has(tool.slug));
  if (!catalog.length) throw new Error('No registered social topics are available.');
  const historyEvents = Array.isArray(history) ? history : [];
  const evidenceRows = Array.isArray(gscEvidence) ? gscEvidence : [];
  const performanceEvents = Array.isArray(performance) ? performance : historyEvents;
  const allUsed = historyEvents.filter((event) => event.type === 'reservation').map((event) => event.plan?.tool?.slug).filter(Boolean);
  let used = new Set(allUsed);
  const selectedSlugs = new Set();
  const recentUsed = allUsed.slice(-30);
  const categoryCounts = {};
  const items = [];
  let cursor = Math.max(0, Number(startingIndex) || 0) % catalog.length;
  const count = Math.max(1, Math.min(30, Number(days) || 30));
  const seedStart = Math.round((Date.parse(startDate + 'T00:00:00Z') - Date.parse('2026-10-03T00:00:00Z')) / 86400000);

  for (let dayIndex = 0; dayIndex < count; dayIndex += 1) {
    const date = dateShift(startDate, dayIndex);
    const seedIndex = ((seedStart + dayIndex) % CATEGORY_SEED.length + CATEGORY_SEED.length) % CATEGORY_SEED.length;
    const mustCover = CATEGORY_SEED[seedIndex];
    const candidatesFor = (requiredGroup) => catalog.map((tool, index) => {
      const gsc = pageEvidence(tool, evidenceRows);
      const observed = performanceEvidence(tool, performanceEvents);
      const fairness = (categoryCounts[group(tool)] || 0) * 34;
      const distance = rotationDistance(index, cursor, catalog.length);
      const score = utilityBoost(tool) + gscBoost(gsc) + metricsBoost(observed) + articleBoost(tool) - fairness - distance * 0.001;
      return { tool, index, gsc, observed, score };
    }).filter(({ tool }) => !used.has(tool.slug) && (!requiredGroup || group(tool) === requiredGroup));
    let candidates = candidatesFor(mustCover);
    if (!candidates.length && mustCover) candidates = candidatesFor(null);
    if (!candidates.length) {
      used = new Set([...recentUsed, ...selectedSlugs]);
      candidates = candidatesFor(mustCover);
      if (!candidates.length && mustCover) candidates = candidatesFor(null);
    }
    if (!candidates.length) throw new Error('The catalog cannot fill day ' + (dayIndex + 1) + ' without repeating a tool.');
    candidates.sort((a, b) => b.score - a.score || a.index - b.index);
    const chosen = candidates[0];
    const plan = buildSocialPlan(chosen.tool, date, siteUrl);
    plan.score = {
      total: Number(chosen.score.toFixed(2)),
      basis: [
        'catalog utility and category rotation',
        chosen.gsc ? 'observed Search Console page-level demand' : 'no current Search Console page-level evidence',
        chosen.observed.basedOn ? (chosen.observed.engagementRate === null ? 'observed raw social interactions (not a rate)' : 'observed social interactions normalized by views/reach') : 'no social performance metrics yet',
      ].join('; '),
      signals: {
        catalogUtility: utilityBoost(chosen.tool),
        searchConsole: chosen.gsc,
        searchConsoleBoost: gscBoost(chosen.gsc),
        socialMetrics: chosen.observed.basedOn ? chosen.observed : null,
        socialMetricsBoost: metricsBoost(chosen.observed),
        articleCoverage: articleCoverage(chosen.tool),
        categoryBalancePenalty: (categoryCounts[group(chosen.tool)] || 0) * 34,
      },
    };
    validateSocialPlan(plan, siteUrl);
    if (items.some((item) => item.tool.slug === plan.tool.slug || Object.values(item.contentHashes).some((hash) => Object.values(plan.contentHashes).includes(hash)))) {
      throw new Error('Duplicate tool or post content in the generated pipeline: ' + plan.tool.slug);
    }
    items.push(plan);
    used.add(chosen.tool.slug);
    selectedSlugs.add(chosen.tool.slug);
    categoryCounts[group(chosen.tool)] = (categoryCounts[group(chosen.tool)] || 0) + 1;
    cursor = (chosen.index + 1) % catalog.length;
  }

  return {
    version: 2, generatedAt: new Date().toISOString(), timezone: 'Asia/Karachi',
    window: { start: startDate, end: dateShift(startDate, count - 1), days: count },
    evidenceStatus: {
      searchConsole: evidenceRows.length ? 'page-level evidence supplied' : 'no current GSC export supplied; demand left unknown',
      articleInventory: blogRecords.length,
      registeredToolInventory: catalog.length,
    },
    categoryDistribution: categoryCounts,
    items,
  };
}


export function renderPipelineMarkdown(queue) {
  const lines = [
    '# HGS Social Agent V2 · 30-day content pipeline', '',
    `Window: ${queue.window.start} to ${queue.window.end} (Asia/Karachi)`,
    `Topics: ${queue.items.length} unique tools · catalog: ${queue.evidenceStatus.registeredToolInventory} registered tools · article records: ${queue.evidenceStatus.articleInventory}`,
    `Search Console: ${queue.evidenceStatus.searchConsole}`, '',
    '| Day | Tool | Category | Topic hook | Evidence |', '|---|---|---|---|---|',
    ...queue.items.map((item) => `| ${item.date} | ${item.tool.name} | ${item.tool.category} | ${item.lesson.hook.replaceAll('|', '\\|')} | ${item.score.basis} |`),
    '',
  ];
  for (const item of queue.items) {
    lines.push(`## ${item.date} · ${item.tool.name}`, '', `**Category:** ${item.tool.category} · **Tool:** ${item.tool.description}`, '',
      `**Hook:** ${item.lesson.hook}`, '', `**Useful action:** ${item.lesson.action}`, '', `**Check:** ${item.lesson.check || item.lesson.takeaway}`, '',
      `**Score basis:** ${item.score?.basis || 'Existing reserved preview; reused without content changes'}`, '', '### Facebook Page', '', `**Title:** ${item.facebook.title}`, '', item.facebook.message, '',
      `**Keywords:** ${item.facebook.keywords.join(', ')}`, '', `**URL:** ${item.facebook.link}`, '',
      '### Instagram Reels', '', `**Title:** ${item.instagram.title}`, '', item.instagram.caption, '',
      `**Keywords:** ${item.instagram.keywords.join(', ')}`, '', `**URL:** ${item.instagram.link}`, '',
      `**Link placement:** ${item.instagram.linkPlacement}`, '',
      '### YouTube Shorts', '', `**Title:** ${item.youtube.title}`, '', item.youtube.description, '',
      `**Keywords:** ${item.youtube.keywords.join(', ')}`, '', `**URL:** ${item.youtube.link}`, '',
      '### Facebook Reels storyboard', '',
      ...item.facebook.reelScript.map((beat) => `- **${beat.seconds}s · ${beat.goal}:** ${beat.visual} Voiceover: “${beat.voiceover}”`), '',
      '### Instagram Reels storyboard', '',
      ...item.instagram.reelScript.map((beat) => `- **${beat.seconds}s · ${beat.goal}:** ${beat.visual} Voiceover: “${beat.voiceover}”`), '',
      '### YouTube Shorts storyboard', '',
      ...item.youtube.shortVideoScript.map((beat) => `- **${beat.seconds}s · ${beat.goal}:** ${beat.visual} Voiceover: “${beat.voiceover}”`), '',
      `**JPEG preview:** ${item.asset.imagePath}`, '', '---', '');
  }
  return lines.join('\n');
}

export function loadOptionalEvidence(file) {
  if (!file || !fs.existsSync(file)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(parsed) ? parsed : parsed.rows || [];
  } catch { return []; }
}

