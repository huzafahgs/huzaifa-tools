# Huzaifa Tools content opportunity pipeline

Updated: 2026-10-02

## Evidence baseline

- Production inventory before this batch: 116 tools and 117 indexable articles.
- One hundred tools already had a primary task guide. The uncovered set was the Zakat Calculator plus 15 closely related AI tools.
- Search Console baseline: 21 clicks, 180 impressions, 11.7% CTR and average position 23.4 over 28 days; 61 indexed and 192 not indexed. Phase 2 evidence favoured Image Rotate/Flip, Simple Interest, Running Pace and URL Parser. `/json-to-csv` was the only crawled-not-indexed URL at the Phase 3 checkpoint.
- The sitemap contained 242 URLs after the Zakat Calculator launch and before this article.
- Twenty-nine articles had no incoming `relatedSlugs` reference. Sixteen of these were legacy image articles, where adding more adjacent pages would increase overlap rather than usefulness.
- Current result review showed strong competition around generic percentage, JWT and PDF topics. Useful differentiation needs tool-specific limitations, reproducible examples, safety checks or locally relevant method detail—not another generic definition page.

## Editorial rules

1. One primary guide per tool unless a second page answers a clearly different task.
2. Prefer strengthening an existing page when the proposed intent substantially overlaps it.
3. Do not create fifteen near-duplicate AI guides. Group related tools into distinct workflows and link each relevant tool naturally.
4. Publish Islamic finance content only with reputable methodology sources, explicit assumptions and a clear boundary between arithmetic and religious rulings.
5. Every new article needs a unique title and description, a canonical/indexable route, visible Article/FAQ data, examples, relevant tool links and related articles.
6. Recheck Search Console after enough data accrues; no opportunity below is a traffic forecast.

## Ranked pipeline

| Rank | Action | Proposed intent | Supports | Evidence / reason | Status |
| ---: | --- | --- | --- | --- | --- |
| 1 | New guide | Calculate Zakat with gold or silver nisab | Zakat Calculator | New useful tool had no guide; method and ruling differences need transparent explanation | Published in first batch |
| 2 | Improve existing | Flat JSON to CSV: nested-data rejection and spreadsheet checks | JSON to CSV | Only crawled-not-indexed URL; existing guide should be monitored and improved only from evidence | Monitor first |
| 3 | New guide | Verify an AI summary against its source | AI Text Summarizer, Study Notes | Distinct safety workflow; research shows factual consistency and omission risks | Published in second batch |
| 4 | New guide | Rewrite text without changing claims, numbers or citations | AI Grammar/Rewrite, Paraphraser | Distinct verification task shared by two tools | Approved candidate |
| 5 | New guide | Draft an email brief: purpose, context, tone and privacy | AI Email Generator, Writing Assistant | Practical workflow; avoids two overlapping product pages | Approved candidate |
| 6 | New guide | Build prompts with context, constraints and acceptance checks | AI Prompt Generator, Code Explainer | Supports verification rather than generic “prompt tips” | Approved candidate |
| 7 | New guide | Turn real experience into resume bullets without invented results | Resume Bullet Generator, Cover Letter Assistant | High-stakes factual boundary and clear paired workflow | Approved candidate |
| 8 | New guide | Product descriptions from verified specifications | Product Description Generator, FAQ Generator | Prevents invented claims; useful business workflow | Approved candidate |
| 9 | New guide | Platform-specific social captions without duplicate posting | Caption Generator, Title Generator | Distinct platform and claims-review workflow | Approved candidate |
| 10 | New guide | Blog outline from search intent without filler sections | Blog Outline Generator, Title Generator | Useful editorial planning; must not become scaled SEO guidance | Approved candidate |
| 11 | Improve existing | Rotate versus flip: mirrored text and EXIF orientation | Image Rotate/Flip | Phase 2 impressions and position 6.3; improve the proven page before adding another | Priority update |
| 12 | Improve existing | Simple interest: years, months and rate-unit checks | Simple Interest | Phase 2: 21 impressions, position 9.0 | Priority update |
| 13 | Improve existing | Running pace: distance units, elapsed time and treadmill checks | Pace Calculator | Relevant queries near positions 9–11 | Priority update |
| 14 | Improve existing | URL parts: origin, path, query, fragment and encoding | URL Parser | Phase 2 position 8.9 | Priority update |
| 15 | Improve links | Add contextual incoming links to orphan calculator guides | Tip, mortgage, ideal weight, uptime | Existing useful pages lack related-article discovery | Approved maintenance |
| 16 | Improve links | Connect orphan developer guides to adjacent workflows | Cron, CSV/JSON, regex, SQL, minifier | Existing content before new pages | Approved maintenance |
| 17 | Consolidate/refresh | Modern image formats cluster | Image Converter, Compressor | Several legacy articles overlap WebP/AVIF/format-choice intent | Research before changes |
| 18 | Consolidate/refresh | WordPress image compression cluster | Image Compressor, Resizer | Two WordPress pages plus broader compression pages overlap | Research before changes |
| 19 | Improve existing | Image compression and SEO measurements | Image Compressor | Existing stronger consolidated page; align with Google image guidance | Approved candidate |
| 20 | Improve existing | Mobile responsive image sizing and delivery | Image Resizer | Existing page, official Google guidance, no need for another URL | Approved candidate |
| 21 | New guide | Percentage points versus percentage change | Percentage Calculator | Distinct problem, but competitive; publish only with worked examples | Conditional |
| 22 | Improve existing | JWT decode versus verify | JWT Decoder | Existing guide already answers this well; improve links rather than duplicate | Update only |
| 23 | Improve existing | PDF merge/split preflight checklist | PDF tools | Existing separate guides cover tasks; a hub may cannibalize them | Hub only if GSC supports |
| 24 | New guide | Convert images to PDF for assignments and document submission | Images to PDF | Distinct student workflow if real queries appear | Conditional |
| 25 | New guide | Check image dimensions for forms and uploads | Image Resizer, Cropper | Distinct workflow; avoid generic “best dimensions” overlap | Conditional |
| 26 | New guide | CSV import checks for Excel and Google Sheets | CSV/JSON tools | Useful downstream workflow; do not duplicate JSON conversion guide | Conditional |
| 27 | New guide | HMAC test vectors: message bytes, key encoding and output format | HMAC Generator | Existing primary guide may be sufficient | Monitor existing |
| 28 | New guide | Color contrast across component states | Contrast Checker, Gradient Generator | Useful accessibility workflow beyond one colour pair | Conditional |
| 29 | New guide | Password generation and password-manager handoff | Password Generator, Strength Checker | Existing guides cover most intent; publish only with evidence | Monitor existing |
| 30 | New guide | Zakat worksheet update for business inventory | Zakat Calculator | Valuable but method-heavy; needs separate qualified review and should not be rushed | Deferred research |

## Ideas rejected or merged

- Fifteen separate “how to use this AI tool” pages: merged into eight distinct workflows to avoid near-duplicate intent.
- More generic image compression, WebP/AVIF and “future of images” posts: the legacy cluster is already dense and needs consolidation, not expansion.
- Generic “best free tools” listicles: weak differentiation and likely overlap with the existing platform guide.
- Separate “gold nisab calculator” and “silver nisab calculator” articles: one transparent comparison is more useful and avoids religious-method doorway pages.
- New JWT, percentage and PDF definition posts: current results are crowded and Huzaifa Tools already has substantial task guides.

## Next measurement gates

- Confirm the new Zakat guide is crawled/indexed and inspect its queries before adding adjacent Islamic-finance pages.
- Recheck `/json-to-csv`, the 191 discovered URLs and article landing-page impressions when authenticated Search Console is available.
- Use page/query evidence to choose between the AI-summary verification guide and improvements to the four Phase 2 winners.
- Do not publish the remaining pipeline as a timed quota. Each item requires its own research, content and production verification.
