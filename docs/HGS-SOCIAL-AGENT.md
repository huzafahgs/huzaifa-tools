# HGS Social Agent V1

## What runs

`.github/workflows/hgs-social-agent.yml` schedules one run each day at 18:00 Pakistan time using GitHub Actions. It chooses the next registered tool from `src/toolsData.js`, writes platform-specific captions and a 25-second short-video storyboard, creates a Huzaifa-branded JPEG preview card, and appends its plan/result to the `social-agent-ledger` branch. The first reservation is saved before any publishing request. A failed or uncertain publish attempt is not retried that day.

Copy generation is local, deterministic, and free: the post uses the real catalog name and description, a short use/review instruction, and platform-specific UTM links. It does not invent usage statistics, testimonials, features, or claims. Tools rotate through the registered catalog before a topic repeats. Live publishing has two independent gates: `SOCIAL_PUBLISHING_ENABLED` must be `true` and `SOCIAL_PREVIEW_REVIEWED` must be `true`. Both default to `false`; the review gate stays off until the first preview has been reviewed. Setting either to `false` stops platform calls.

| Platform | V1 behavior | Required human authorization/setup |
| --- | --- | --- |
| Facebook Page | Can publish an organic Page link post and collect available likes, comments, and shares. | Meta developer app, Facebook Login, Page access token, Page ID, `pages_manage_posts`, and `pages_read_engagement` for engagement counts. |
| Instagram | Can publish a generated JPEG feed post and collect available likes/comments. | Instagram Professional account, linked Facebook Page, Meta app, `pages_show_list`, `pages_read_engagement`, `instagram_basic`, and `instagram_content_publish` permissions for Facebook Login, Instagram user ID, Page access token, and a publicly reachable JPEG. A public repo can serve the card from the ledger branch; private repos cannot serve it to Meta. |
| YouTube Shorts | Generates a title, description, keywords, storyboard, and voiceover script only. | V1 has no authorized video-generation API and no user-provided video to upload. YouTube Data API uploads from unverified projects are private until the project passes YouTube's audit, so public automatic uploads remain disabled. |

Meta uses Graph API v26.0 by default as the current version identified during implementation. Set the repository variable `META_GRAPH_VERSION` when upgrading. Keep all access tokens in GitHub Actions secrets; never put them in files or workflow YAML. With Facebook Login, one Page access token may be used for both Meta publishing paths. `META_IG_ACCESS_TOKEN` is optional if the same Page token is used.

## Turn on publishing after Meta setup

1. In Meta for Developers, create/configure an app and add Facebook Login and the Instagram API use case. Connect the Facebook Page and Instagram Professional account, grant the app the listed publish/read permissions, and complete App Review/Business Verification if Meta requires Advanced Access for the account.
2. In the repository's **Settings → Secrets and variables → Actions**, add secrets `META_PAGE_ID`, `META_PAGE_ACCESS_TOKEN`, `META_IG_USER_ID`; add `META_IG_ACCESS_TOKEN` only if it differs from the Page token.
3. Ensure the repository's GitHub Actions workflow permission allows the workflow to write contents. The workflow writes audit history to its own `social-agent-ledger` branch.
4. Keep `SOCIAL_PREVIEW_REVIEWED` unset or `false` until the first preview has been reviewed. Then, only after you explicitly decide to publish and complete account authorization, set both Actions variables `SOCIAL_PREVIEW_REVIEWED` and `SOCIAL_PUBLISHING_ENABLED` to `true`. Removing or setting either to `false` stops platform calls immediately.

If the repository is private, Instagram publishing safely skips because Meta cannot fetch the image from GitHub's raw host. V1 does not upload cards to a separate media host. A different `SOCIAL_IMAGE_BASE_URL` works only if that host already exposes the generated JPEG at the matching filename; no paid storage or extra service is configured. Facebook can be enabled independently.

The preview uses one short educational idea across platforms, with platform-specific captions, keywords, and hashtags. Instagram and YouTube still require an actual video file for Reels/Shorts publishing; V1 creates the storyboard and a companion image card, but does not synthesize a video from a consumer AI interface or fabricate a screen demo. Video-provider support remains pluggable after an official, free API is verified. Checked 2026-10-01: Meta's [Movie Gen page](https://ai.meta.com/research/movie-gen/) describes research rather than a generally available video-generation API. Google's official [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) lists Veo video generation without a free tier; no paid generator is configured or called. The video storyboard therefore uses a real Huzaifa Tools screen recording plan. The API does not attach a Monetag SmartLink. Posts point only to the relevant Huzaifa Tools page. Instagram caption URLs are plain text rather than tappable links in the standard feed, so its UTM URL is measurable only when a viewer opens/copies it; use the profile bio link manually if a tappable Instagram destination is needed. No Search Console export/connector was available to this code, so initial ranking priority is the real registered tool catalog rather than fabricated search demand.

## Run locally for a preview

```sh
SOCIAL_STATE_DIR=/tmp/hgs-social-preview node scripts/social-agent.mjs plan
python3 scripts/social-agent-card.py /tmp/hgs-social-preview
```

Do not set `SOCIAL_PUBLISHING_ENABLED=true` in a local shell. The cloud workflow is the only intended publisher and persists an attempt before it calls Meta.
