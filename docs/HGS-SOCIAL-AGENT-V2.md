# HGS Social Agent V2

Updated 2026-10-02 · Pre-launch content system · Publishing disabled

## Current boundary and actual site inventory

The scheduled GitHub Actions workflow remains the cloud runner; the Pixel can be offline. In the V2 workflow, `SOCIAL_PUBLISHING_ENABLED` and `SOCIAL_PREVIEW_REVIEWED` are hard-coded to `false`. No Social Agent post is authorized by this change. The separate audit ledger continues to record reservations and results on `social-agent-ledger`; plans and previews can be inspected as workflow artifacts and in the generated Markdown/JSON.

The generator reads the registered tools from `src/tools/index.js` and actual records from `src/toolsData.js` and their category data files. It currently sees 116 registered tools, with these category counts:

| Category | Registered tools |
|---|---:|
| Developer | 18 |
| AI | 15 |
| Calculator | 14 |
| Text | 12 |
| Converter | 9 |
| Number | 8 |
| Security | 6 |
| PDF | 5 |
| Image | 5 |
| Generator | 4 |
| Time | 4 |
| Utility | 4 |
| Health | 4 |
| Business | 3 |
| SEO | 2 |
| Finance | 1 |
| Student | 1 |
| Islamic | 1 |

The registered inventory has 118 published article records loaded by `src/data/blogs.js` (including tool-guide records). Existing help steps, tips, descriptions and related article links inform the demonstrations; generated copy is not copied from article prose. The public sitemap contains 242 URLs. There was no Search Console query/page export or live GSC connector available in the repository or this run. An older aggregate checkpoint (21 clicks, 180 impressions, 11.7% CTR, average position 23.4) has no page/query/date rows, so it is deliberately not used to rank tools. Add a current page-level export to `social-state/search-console.json` using rows like `[{"page":"https://ai-tools-by-huzaifa.vercel.app/pdf-merger","clicks":12,"impressions":400,"ctr":0.03,"position":8.2}]`; otherwise demand remains **unknown**.

## Daily content architecture

Each scheduled preview run collects any metrics the authorized APIs return, reads the ledger and optional page-level GSC export, chooses today’s topic, refreshes the 30-day queue, validates content, creates the branded JPEG and reserves/audits before any API call. The pipeline is planning-only while the two gates are false.

Selection balances category coverage and utility, then applies page-level Search Console evidence, available social metrics, article coverage, recent use and catalog rotation. The category cadence spans PDF, Image, Text, Calculator, Converter, Developer, AI and Islamic topics. Categories are selected from actual registered tools; a category with only one registered tool cannot be artificially repeated to fill a quota. The queue uses 30 distinct tools where possible, excludes reserved tools during a 30-topic cooldown, and only starts recycling older topics after the catalog rotation is exhausted. Content hashes and topic/date IDs are retained in the ledger. If it cannot produce a unique plan, validation stops the run.

Scoring is honest about evidence:

- GSC adds demand weight only when a matching page row has numeric clicks/impressions.
- Available likes/comments/shares/saves/link-clicks feed a small capped raw-interaction fallback when views/reach are absent. It is not called an engagement rate and is not interpreted as views or watch time.
- When views or reach later exist, the system can use observed interactions divided by that denominator. No metric is synthesized.
- An empty GSC file, missing tokens or missing metrics leave those signals empty.

The category templates start with the real task, demonstrate a small permitted sample, explain a check, and give a useful next step. Category-specific guardrails appear for security, AI, calculators, health, developer and Islamic topics. Islamic calculation content is framed as an estimate with the chosen method visible, not a religious ruling. Medical and financial content avoids personalized advice. No testimonial or unverified product claim is generated.

Every topic has distinct Facebook, Instagram and YouTube text, a platform hook/title/caption or description, useful keywords, at most four restrained hashtags, a platform-appropriate CTA, separate `utm_source` values (`facebook`, `instagram`, `youtube`) and a campaign/content tag. Links use `utm_medium=organic_social` and the registered tool path. Instagram caption URLs are labeled as plain text because they may not be tappable. Facebook uses a link attachment; YouTube uses the description. No Monetag or SmartLink URLs are included.

Every topic also has three 25-second, five-beat storyboards: one each for Facebook Reels, Instagram Reels and YouTube Shorts. They instruct a creator to show the real Huzaifa Tools interface and harmless sample data. The existing card renderer uses the unchanged `public/logo.png` and creates original text-led 1080×1350 JPEGs in the existing premium black/gold style. The batch helper can render all 30 preview cards; the daily workflow renders only today’s card to keep audit storage lean. Video remains `storyboard_only` until an approved provider or real recorded asset is available.

## Rotation and metrics behavior

The 30-day JSON and Markdown queue can be regenerated each daily run. Once topic reservations are written, later runs use them to avoid the same tools and use actual publication metric snapshots when available. Article coverage is a modest editorial-gap signal and is based on actual `recommendedTools`, `relatedTools`, or `toolSlug` links. The data model keeps per-post IDs, content hashes, publication status, post IDs, metric snapshots and fetch errors. Unavailable signals remain `null`/unknown.

Meta metrics collected by the current code are whatever post-level like/comment/share fields are available. Some platforms/accounts expose more insight metrics than others; a failed or unsupported metric read is recorded with its error and does not block topic preparation. YouTube Analytics metrics are not wired until YouTube OAuth is approved and an actual channel exists.

## Publishing and failure safeguards

- The default workflow triggers are the existing daily 18:00 Pakistan-time schedule and manual workflow dispatch; the daily schedule may start late under GitHub load.
- V2 hard-locks both publishing flags to `false` in workflow YAML. No workflow-dispatch input can turn them on.
- A future publish requires both flags true, a durable same-run attempt record, and a valid current plan and JPEG. Asset paths must stay inside the audit `assets/` directory; JPEG signatures/size and social copy/UTMs/tool registration are checked before platform calls.
- The per-day attempt and publication ledger prevents a blind retry after success, error, timeout or uncertain result. A partial or uncertain outcome is recorded; a second attempt is refused.
- The plan validator checks registered routes, exact host/path, all expected UTM values, no extra UTM keys, per-platform text/title limits, repeated/excessive hashtags, no repeated tool in the queue, required storyboard beats, JPEG path, and misleading absolute claims. If a link’s route is absent from the real registry or a creative asset is invalid, validation blocks the attempt.
- Today’s preview is reserved once; the per-platform daily cap stays one. No fake followers/views/clicks, automated ad interactions, bought engagement, bots, click exchanges, manufactured metrics or misleading Monetag URLs.
- OAuth values belong only in encrypted GitHub Actions secrets. Do not paste passwords, OTPs, recovery codes or access tokens into chat. No credential is needed for the current preview-only operation.
- An immediate publishing kill switch is `SOCIAL_PUBLISHING_ENABLED=false`; the second independent gate is `SOCIAL_PREVIEW_REVIEWED=false`. In V2 both remain false in the workflow file until a separately authorized future change.

## Current official API paths and later setup requirements

This table describes the current integration path, not authorization already granted. Meta API versions, review requirements, permissions, account eligibility and quota rules can change; re-check the official dashboard/docs during actual connection.

| Platform | Eligible presence and official path | Later permission / API project requirement | Values eventually held as GitHub secrets or vars |
|---|---|---|---|
| Facebook | Official Huzaifa Tools Page. Current code writes one Page feed/link post with `/{page-id}/feed`, then attempts available Page post engagement reads. Person/Page access must have the Page task for content creation. | Meta developer app, Page access; request least-privilege `pages_show_list` to find the Page/token, `pages_manage_posts` to publish, and `pages_read_engagement` for the supported post engagement reads. Meta may require App Review/Advanced Access for the eventual app mode and assets. | Existing workflow consumes `META_PAGE_ID` and `META_PAGE_ACCESS_TOKEN` (secrets); `META_GRAPH_VERSION` is a repository variable (currently defaults to `v26.0`). For obtaining/renewing the Page token through a future OAuth helper, the Meta app ID/secret must also be kept as secrets there, but those are not consumed by the current workflow. |
| Instagram | Instagram Professional (Business or Creator) account. Current Facebook Login/Graph path discovers its linked account from the Page and publishes one image container then `media_publish`; personal profiles are not eligible for this publishing API path. | Link the professional account to the Huzaifa Tools Page. Least-privilege Facebook Login scopes for the current flow: `instagram_basic` to identify the linked account and `instagram_content_publish` for publishing; `instagram_manage_insights` only if later adding IG insight reads. Page discovery additionally needs the Page scopes above. Meta app role/test access and App Review/Advanced Access may be required. | Existing workflow consumes `META_IG_USER_ID` and accepts `META_IG_ACCESS_TOKEN` (secret), falling back to `META_PAGE_ACCESS_TOKEN` for the Page-token path. `SOCIAL_IMAGE_BASE_URL` is a repository variable and must serve a public JPEG for the current single-image endpoint. The current app publishes image posts, not Reels; official Reel publishing needs a real public video URL, a `REELS` media container, status polling to `FINISHED`, then `media_publish`. |
| YouTube | Official Huzaifa Tools channel owned/managed under `huzaifagroupofsoftware@gmail.com`. Current code creates Shorts scripts only; a real rendered/recorded video and an OAuth-enabled upload adapter are still required before any video upload. | Enable YouTube Data API v3 in a Google Cloud project; OAuth user consent to `https://www.googleapis.com/auth/youtube.upload` for uploads. The account must authorize the channel. Public upload visibility has an extra project audit: current official `videos.insert` docs say uploads from unverified projects created after 2020-07-28 are private until the API project passes compliance audit. For later non-monetary Analytics reports, add only `https://www.googleapis.com/auth/yt-analytics.readonly`; no monetary scope is requested. | Future secrets: `YOUTUBE_OAUTH_CLIENT_ID`, `YOUTUBE_OAUTH_CLIENT_SECRET`, and `YOUTUBE_REFRESH_TOKEN`; `YOUTUBE_CHANNEL_ID` is a non-secret repository variable if needed. OAuth application verification and the YouTube API project compliance audit are separate requirements from channel login. Never put credentials in source or chat. |

Meta API references: [Instagram Content Publishing](https://developers.facebook.com/docs/instagram-platform/content-publishing/), [Instagram API with Instagram Login](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/), [Pages API](https://developers.facebook.com/docs/pages-api/), [Permissions Reference](https://developers.facebook.com/docs/permissions/reference/). Meta’s official [Instagram Postman collection](https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api) shows the linked Page-token lookup and the Reel media container → status → publish sequence.

Google API references: [YouTube `videos.insert`](https://developers.google.com/youtube/v3/docs/videos/insert), [OAuth for web server applications](https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps), and [YouTube Analytics `reports.query`](https://developers.google.com/youtube/analytics/reference/reports/query). The upload call is limited by API project quotas/upload policies; the system remains capped at one publication per platform per day.

## Programmatic video provider investigation

No sustainable free official programmatic video-generation endpoint was found for this use. Google’s current Gemini pricing page lists Veo 3.1 generation as unavailable on the free API tier and billed per second on paid tiers. Gemini Omni Flash video generation is also on a paid tier. No public official Meta AI video-generation API for this publishing workflow was found. The productized consumer interfaces are not automated. No paid provider is enabled or requested. The provider interface remains intentionally pluggable (`video.provider` is unconfigured); a future provider must be official, affordable within an explicit approved budget, and produce real reviewable assets. Until then, use real manual screen recordings or storyboard-only previews.

## Reusable category approaches

| Category | Useful demo shape | Example proof/check |
|---|---|---|
| PDF | Arrange, split, extract, merge or protect a permitted sample | Open the downloaded PDF; inspect order/pages |
| Image | Resize, crop, convert or inspect a permitted sample | Open the export and check dimensions/format |
| Text | Count, convert case, clean or compare a small draft | Check spaces, line breaks and target limits |
| Calculator | Explain inputs, units and assumptions | Recheck sample inputs and interpretation |
| Converter | Convert a sample value between units/formats | Confirm output units and rounding |
| Developer | Format/convert/inspect harmless sample data | Validate real output; never imply valid business logic |
| AI | Demonstrate a clear non-sensitive brief and human review | Verify facts, privacy and instructions |
| Islamic | Show the selected calculation method/assumptions | Present estimate and encourage qualified guidance for rulings |

The actual copy builder reads each registered tool’s own `description`, `help.steps`, `tips` and article relationships, so these are editorial patterns rather than a repeated promotional script. Copyrighted music/stock clips, testimonials, fake interface outputs and copied article passages are excluded. Cards are generated from code and the owned HUZAIFA logo; video scripts request footage of our own live tool pages.

## Pre-launch content snapshot

`data/social-agent/prelaunch-2026-10-02/queue.json` and `queue.md` contain the real 30-day content window (2–31 October 2026) generated from the 116 registered tools and seeded with the actual 1 October Word Counter reservation from the audit history. It includes platform copy, per-platform UTM links, three storyboards per topic, scoring evidence, tool/article references and asset paths. The downloadable pre-launch package has 30 verified 1080×1350 JPEG cards generated from the unchanged official logo; the nightly workflow will render only the current day’s card.
