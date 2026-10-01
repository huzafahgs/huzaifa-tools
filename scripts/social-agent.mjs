import fs from 'node:fs';
import path from 'node:path';
import tools from '../src/toolsData.js';

const stateDir = path.resolve(process.env.SOCIAL_STATE_DIR || 'data/social-agent');
const historyPath = path.join(stateDir, 'history.jsonl');
const statePath = path.join(stateDir, 'state.json');
const planPath = path.join(stateDir, 'today.json');
const siteUrl = (process.env.SOCIAL_SITE_URL || 'https://ai-tools-by-huzaifa.vercel.app').replace(/\/$/, '');
const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Karachi', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date());
const registrationSource = fs.readFileSync(new URL('../src/tools/index.js', import.meta.url), 'utf8');
const registeredSlugs = new Set([...registrationSource.matchAll(/registerTool\("([^"]+)"/g)].map((match) => match[1]));
const siteTools = tools.filter((tool) => tool?.slug && tool?.name && tool?.description && registeredSlugs.has(tool.slug));

const intros = [
  (tool) => `Need to ${tool.description.replace(/\.$/, '').toLowerCase()}?`,
  (tool) => `A small task can still interrupt your workflow: ${tool.description.replace(/\.$/, '').toLowerCase()}.`,
  (tool) => `Quick, practical tip: ${tool.description.replace(/\.$/, '').toLowerCase()}.`,
  (tool) => `Try this workflow when you need to ${tool.description.replace(/\.$/, '').toLowerCase()}.`,
  (tool) => `Working with text, files, or numbers? ${tool.description.replace(/\.$/, '').toLowerCase()}.`,
];

function ensureState() {
  fs.mkdirSync(stateDir, { recursive: true });
  if (!fs.existsSync(statePath)) fs.writeFileSync(statePath, JSON.stringify({ nextIndex: 0, lastReservedDate: null }, null, 2) + '\n');
  if (!fs.existsSync(historyPath)) fs.writeFileSync(historyPath, '');
}

function readHistory() {
  return fs.readFileSync(historyPath, 'utf8').split('\n').filter(Boolean).map((line) => {
    try { return JSON.parse(line); } catch { return null; }
  }).filter(Boolean);
}

function utmLink(tool, day, source = 'social') {
  const url = new URL(`/${tool.slug}`, siteUrl);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', 'organic_social');
  url.searchParams.set('utm_campaign', `hgs_social_${day.replaceAll('-', '')}`);
  url.searchParams.set('utm_content', tool.slug);
  return url.toString();
}

function stableChoice(seed, index, max) {
  let hash = 2166136261;
  for (const char of seed) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return Math.abs((hash + index * 31) >>> 0) % max;
}

function buildPlan(tool, rotationIndex) {
  const intro = intros[stableChoice(`${today}:${tool.slug}`, rotationIndex, intros.length)](tool);
  const link = utmLink(tool, today);
  const facebookLink = utmLink(tool, today, 'facebook');
  const instagramLink = utmLink(tool, today, 'instagram');
  const youtubeLink = utmLink(tool, today, 'youtube');
  const tags = ['#HuzaifaTools', '#FreeOnlineTools', `#${tool.category?.replace(/[^a-z\d]/gi, '') || 'Productivity'}`];
  const keywords = [tool.name, tool.category || 'online tools', 'Huzaifa Tools', 'how to', 'tutorial'];
  const usefulNote = tool.category === 'Security'
    ? 'Use it for ordinary work only; never paste passwords, private keys, or confidential data into tools you do not trust.'
    : tool.category === 'Calculator'
      ? 'Check the inputs and assumptions before using a result for a real financial, health, or other important decision.'
      : `Check the result before using it in a final document, project, or decision.`;
  const body = `${intro}\n\nOpen ${tool.name}, try it with a small example, then review the output. ${usefulNote}`;
  const caption = `${body}\n\nTry it: ${instagramLink}\n\n${tags.join(' ')}`;
  const shortScript = [
    { seconds: '0–3', visual: `On-screen question: “Need to ${tool.description.replace(/\.$/, '').toLowerCase()}?”`, voiceover: 'Here is a quick way to get started.' },
    { seconds: '3–9', visual: `Show the Huzaifa Tools ${tool.name} page and enter a harmless sample.`, voiceover: `Open ${tool.name} on Huzaifa Tools and enter a small example.` },
    { seconds: '9–15', visual: 'Show the result, then pause so the viewer can read it.', voiceover: `${tool.description} Check the output before relying on it.` },
    { seconds: '15–20', visual: 'End card with the tool name and the tracked landing-page URL.', voiceover: 'Find the link in this post.' },
  ];
  const postId = `${today}-${tool.slug}`;
  return {
    id: postId,
    date: today,
    tool: { name: tool.name, slug: tool.slug, category: tool.category, description: tool.description },
    landingPage: link,
    facebook: { title: tool.name, message: `${body}\n\nTry it: ${facebookLink}\n\n${tags.join(' ')}`, keywords, hashtags: tags, link: facebookLink },
    instagram: { caption, keywords, hashtags: tags, imagePath: `assets/${postId}.jpg` },
    youtube: {
      status: 'script_only',
      title: `${tool.name}: a quick practical walkthrough #Shorts`,
      description: `${body}\n\n${youtubeLink}\n\n${tags.join(' ')}`,
      keywords,
      shortVideoScript: shortScript,
    },
    asset: { imagePath: `assets/${postId}.jpg`, alt: `${tool.name} educational post card for Huzaifa Tools` },
    createdAt: new Date().toISOString(),
  };
}

function savePlan(plan) {
  fs.writeFileSync(planPath, JSON.stringify(plan, null, 2) + '\n');
  fs.writeFileSync(path.join(stateDir, 'today.md'), renderMarkdown(plan));
}

function renderMarkdown(plan) {
  return `# HGS Social Agent · ${plan.date}\n\n**Topic:** ${plan.tool.name} (${plan.tool.slug}) — ${plan.tool.description}\n\n**Tracked landing page:** ${plan.landingPage}\n\n## Facebook Page\n\n${plan.facebook.message}\n\n## Instagram\n\n${plan.instagram.caption}\n\nImage: \`${plan.instagram.imagePath}\` (JPEG card generated by the workflow).\n\n## YouTube Shorts concept (script only; no upload without a real video and approved API project)\n\n**Title:** ${plan.youtube.title}\n\n${plan.youtube.shortVideoScript.map((beat) => `- **${beat.seconds}s:** ${beat.visual} Voiceover: ${beat.voiceover}`).join('\n')}\n`;
}

function logEvent(entry) {
  fs.appendFileSync(historyPath, JSON.stringify({ timestamp: new Date().toISOString(), ...entry }) + '\n');
}

async function graphPost(pathPart, params) {
  const version = process.env.META_GRAPH_VERSION;
  if (!version) throw new Error('META_GRAPH_VERSION is not configured.');
  const url = new URL(`https://graph.facebook.com/${version}/${pathPart}`);
  const response = await fetch(url, { method: 'POST', body: new URLSearchParams(params), signal: AbortSignal.timeout(45_000) });
  const json = await response.json();
  if (!response.ok || json.error) throw new Error(`Meta API ${response.status}: ${json.error?.message || 'request failed'}`);
  return json;
}

async function graphGet(pathPart, params, token) {
  const version = process.env.META_GRAPH_VERSION;
  if (!version) throw new Error('META_GRAPH_VERSION is not configured.');
  const url = new URL(`https://graph.facebook.com/${version}/${pathPart}`);
  for (const [key, value] of Object.entries({ ...params, access_token: token })) url.searchParams.set(key, value);
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  const json = await response.json();
  if (!response.ok || json.error) throw new Error(`Meta API ${response.status}: ${json.error?.message || 'request failed'}`);
  return json;
}

async function publishFacebook(plan) {
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  const pageId = process.env.META_PAGE_ID;
  if (!token || !pageId) return { status: 'skipped', reason: 'Facebook Page authorization secrets are not configured.' };
  const result = await graphPost(`${encodeURIComponent(pageId)}/feed`, {
    message: plan.facebook.message,
    link: plan.facebook.link,
    access_token: token,
  });
  return { status: 'published', postId: result.id, url: `https://www.facebook.com/${result.id}` };
}

async function publishInstagram(plan) {
  const token = process.env.META_IG_ACCESS_TOKEN || process.env.META_PAGE_ACCESS_TOKEN;
  const accountId = process.env.META_IG_USER_ID;
  const imageBase = process.env.SOCIAL_IMAGE_BASE_URL;
  if (!token || !accountId || !imageBase) return { status: 'skipped', reason: 'Instagram needs account authorization and a publicly reachable JPEG base URL.' };
  const imageUrl = `${imageBase.replace(/\/$/, '')}/${path.basename(plan.instagram.imagePath)}`;
  const head = await fetch(imageUrl, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(20_000) });
  if (!head.ok || !(head.headers.get('content-type') || '').toLowerCase().startsWith('image/jpeg')) {
    return { status: 'skipped', reason: 'Configured Instagram image URL is not publicly reachable as JPEG.' };
  }
  const container = await graphPost(`${encodeURIComponent(accountId)}/media`, {
    image_url: imageUrl,
    caption: plan.instagram.caption,
    access_token: token,
  });
  const result = await graphPost(`${encodeURIComponent(accountId)}/media_publish`, {
    creation_id: container.id,
    access_token: token,
  });
  return { status: 'published', mediaId: result.id, imageUrl };
}

async function collectMetrics(entry) {
  if (entry.facebook?.status === 'published' && process.env.META_PAGE_ACCESS_TOKEN) {
    try {
      const details = await graphGet(entry.facebook.postId, { fields: 'shares,likes.summary(true),comments.summary(true)' }, process.env.META_PAGE_ACCESS_TOKEN);
      entry.facebook.metrics = {
        likes: details.likes?.summary?.total_count ?? null,
        comments: details.comments?.summary?.total_count ?? null,
        shares: details.shares?.count ?? 0,
        fetchedAt: new Date().toISOString(),
      };
    } catch (error) { entry.facebook.metricsError = error.message; }
  }
  if (entry.instagram?.status === 'published' && (process.env.META_IG_ACCESS_TOKEN || process.env.META_PAGE_ACCESS_TOKEN)) {
    try {
      const details = await graphGet(entry.instagram.mediaId, { fields: 'like_count,comments_count' }, process.env.META_IG_ACCESS_TOKEN || process.env.META_PAGE_ACCESS_TOKEN);
      entry.instagram.metrics = { likes: details.like_count ?? null, comments: details.comments_count ?? null, fetchedAt: new Date().toISOString() };
    } catch (error) { entry.instagram.metricsError = error.message; }
  }
}

function planCommand() {
  ensureState();
  const priorState = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  const history = readHistory();
  const existing = history.find((item) => item.date === today && item.type === 'reservation');
  if (existing) {
    console.log(`A publication slot is already reserved for ${today}; refusing a second plan.`);
    savePlan(existing.plan);
    return;
  }
  const idx = Number(priorState.nextIndex || 0) % siteTools.length;
  const tool = siteTools[idx];
  const plan = buildPlan(tool, idx);
  const reservation = { type: 'reservation', date: today, plan, platforms: ['facebook', 'instagram'], status: 'reserved' };
  logEvent(reservation);
  priorState.nextIndex = (idx + 1) % siteTools.length;
  priorState.lastReservedDate = today;
  fs.writeFileSync(statePath, JSON.stringify(priorState, null, 2) + '\n');
  savePlan(plan);
  console.log(`Reserved ${tool.slug} for ${today}; ${siteTools.length} catalog tools are available.`);
}

async function publishCommand() {
  ensureState();
  if (process.env.SOCIAL_PUBLISHING_ENABLED !== 'true') {
    console.log('Publishing is disabled (SOCIAL_PUBLISHING_ENABLED is not true).');
    logEvent({ type: 'run', date: today, status: 'dry_run', reason: 'Publishing kill switch is off.' });
    return;
  }
  const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
  const history = readHistory();
  const runIdentity = `${process.env.GITHUB_RUN_ID || 'local'}:${process.env.GITHUB_RUN_ATTEMPT || '1'}`;
  const attempt = [...history].reverse().find((item) => item.date === today && item.type === 'attempt');
  if (!attempt) {
    console.log('No durable publish reservation exists; refusing to call a platform API.');
    return;
  }
  if (history.some((item) => item.date === today && item.type === 'publication') || attempt.runIdentity !== runIdentity) {
    console.log(`A prior publish attempt or result exists for ${today}; refusing to retry.`);
    return;
  }
  // The workflow persists the attempt record before this command makes platform API calls.
  const result = { type: 'publication', date: today, postId: plan.id, tool: plan.tool, facebook: null, instagram: null, youtube: { status: 'script_only' } };
  for (const [platform, publish] of [['facebook', publishFacebook], ['instagram', publishInstagram]]) {
    try { result[platform] = await publish(plan); }
    catch (error) { result[platform] = { status: 'failed', error: error.message }; }
  }
  await collectMetrics(result);
  logEvent(result);
  fs.writeFileSync(path.join(stateDir, 'latest-report.md'), reportMarkdown(result));
  fs.writeFileSync(path.join(stateDir, 'latest-result.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(reportMarkdown(result));
  if ([result.facebook, result.instagram].some((item) => item.status === 'failed')) process.exitCode = 1;
}

function beginCommand() {
  ensureState();
  if (process.env.SOCIAL_PUBLISHING_ENABLED !== 'true') {
    console.log('Publishing disabled; leaving today as a preview only.');
    return;
  }
  const history = readHistory();
  if (history.some((item) => item.date === today && item.type === 'attempt')) {
    console.log(`A publish attempt already exists for ${today}; no second attempt will be made.`);
    return;
  }
  const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
  const runIdentity = `${process.env.GITHUB_RUN_ID || 'local'}:${process.env.GITHUB_RUN_ATTEMPT || '1'}`;
  logEvent({ type: 'attempt', date: today, postId: plan.id, status: 'started', runIdentity });
  console.log(`Recorded one-time publish intent for ${plan.id}.`);
}

function reportMarkdown(result) {
  const lines = [`# HGS Social Agent report · ${result.date}`, '', `**Topic:** ${result.tool.name} (${result.tool.slug})`, ''];
  for (const platform of ['facebook', 'instagram', 'youtube']) {
    const data = result[platform];
    const label = platform === 'youtube' ? 'YouTube Shorts' : platform[0].toUpperCase() + platform.slice(1);
    lines.push(`## ${label}`, '', `Status: **${data?.status || 'not run'}**`);
    if (data?.url) lines.push(`Published URL: ${data.url}`);
    if (data?.reason) lines.push(`Reason: ${data.reason}`);
    if (data?.error) lines.push(`Error: ${data.error}`);
    if (data?.metrics) lines.push(`Observed metrics (${data.metrics.fetchedAt}): ${JSON.stringify(data.metrics)}`);
    if (data?.metricsError) lines.push(`Metrics unavailable: ${data.metricsError}`);
    lines.push('');
  }
  lines.push(`Tracked landing page: ${result.tool.slug ? utmLink({ slug: result.tool.slug }, result.date) : ''}`, '');
  return lines.join('\n');
}

async function metricsCommand() {
  ensureState();
  const history = readHistory();
  const latest = [...history].reverse().find((item) => item.type === 'publication');
  if (!latest) { console.log('No successful or attempted publication is in the audit ledger yet.'); return; }
  await collectMetrics(latest);
  logEvent({ type: 'metrics_snapshot', date: today, postId: latest.postId, facebook: latest.facebook?.metrics || null, instagram: latest.instagram?.metrics || null });
  fs.writeFileSync(path.join(stateDir, 'latest-report.md'), reportMarkdown(latest));
  console.log(reportMarkdown(latest));
}

const command = process.argv[2] || 'plan';
if (command === 'plan') planCommand();
else if (command === 'begin') beginCommand();
else if (command === 'publish') await publishCommand();
else if (command === 'metrics') await metricsCommand();
else if (command === 'catalog-count') console.log(siteTools.length);
else throw new Error(`Unknown command: ${command}`);
