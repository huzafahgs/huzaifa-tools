# AI Tools Batches 1 and 2 — activation checklist

The web release is safe to deploy before activation. It shows a clear unavailable state rather than producing simulated output. Existing tools, account routes and SMTP are independent of this integration.

Complete this activation checklist in the existing Supabase and Vercel projects:

1. In Supabase SQL Editor, apply the pending AI migrations as database owner in order: `supabase/migrations/202609110001_ai_tools.sql` (Batch 1, only if not already applied), then `supabase/migrations/202609110002_ai_batch2.sql` (Batch 2). Do not reapply the Accounts V1 migration or an already-applied AI migration. Batch 2 adds ten catalog identifiers and a public readiness flag; it does not change the shared quota, existing account policies, profile triggers or SMTP.
2. In the existing Vercel project's **Production** environment, add **`GEMINI_API_KEY`** with a valid Google Gemini API key authorized for `gemini-2.5-flash-lite`. Enter it directly in Vercel; do not paste it in chat, source code, or any `VITE_*` variable. The existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are reused on the server; no Supabase private/service-role key is needed.
3. Redeploy the latest main deployment so its function receives the new environment. Open `/api/ai` on the production domain: it should return `configured: true`, `catalogReady: true` and `batch2Ready: true`. These flags confirm configuration presence and migration availability, **not** provider billing or model access. Sign in with an existing confirmed account and test each newly activated task with a non-sensitive example before treating AI quality as verified. Respect the shared 10 requests/day per-account quota; do not raise it just to bypass QA limits.

If SQL reports the migration objects already exist, stop and inspect the migration state instead of rerunning or dropping tables. This migration is transactional; it is not intended as a repeatable seed script.

## Architecture

- Fifteen permanent routes share `src/tools/ai/AIWorkspace.jsx` and `src/data/aiTools.js`; Batch 2 configuration is in `src/data/aiBatch2.js`. No second endpoint or duplicated editors.
- `POST /api/ai` accepts only the fifteen registered tasks. Batch 1 keeps its 20–12,000 character input. Batch 2 uses task-specific 4,000/6,000/12,000-character maxima, 5/10/20-character minima, enumerated options and allowlisted context fields capped at 240 characters each. Required role/audience/product fields are validated client-side and server-side. No caller-specified URL, model, system prompt, tool execution, file upload or streaming proxy.
- The Vercel Node function verifies the bearer token with Supabase Auth, requires a confirmed non-anonymous user, reserves database quota, then calls the fixed Google OpenAI-compatible Chat Completions endpoint (`https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`) with `gemini-2.5-flash-lite`.
- Native server `fetch`; no new production dependency. The existing legacy static-build configuration is retained with an additive Node build/route for `/api/ai`. Domain, verification and the SPA fallback stay unchanged.
- `GET /api/ai` reveals only service flags. It checks the public, non-sensitive `ai_tools_ready()` and `ai_batch2_ready()` capabilities. A missing Batch 2 migration leaves Batch 1 available when otherwise configured. Until the appropriate migration exists, that batch's AI favorites/history are gated for both guests and signed-in users, preventing unknown-slug cloud imports. Batch 2 POST requests also require its readiness flag. The original 100 tools use their existing saving behavior.

## Limits and privacy

- Fixed global cap: **200 reserved requests per UTC day**, shared across all users. Fixed per-account cap: **10 per UTC day**, at least **30 seconds apart**. A transaction locks a singleton budget row, so limits survive parallel function instances and cold starts. A confirmed user can consume their own quota through the RPC, but cannot increase/reset counters or choose another identity.
- Quota reservation happens before generation. Provider errors, client cancellation and timeouts may still consume quota. No automatic retries or refunds that could bypass the cost bound. Cancellation clears the browser and ignores stale responses; it cannot retract an upstream request already accepted.
- Maximum JSON body 52,000 bytes, maximum output 2,200 tokens and 20,000 returned characters. Upstream timeouts are 8s for each auth/quota call, 3s for Batch 2 readiness and 35s for generation; function max duration 60s. Input and output limits bound request size, not an exact dollar budget. Provider project budgets/alerts are useful additional controls.
- No prompt/output logging, draft localStorage, conversation ID, or prompt/output account records. Output renders as plain text, never HTML. Drafts reset on account/route changes and Clear.
- Usage storage is one row per account (ID, latest day/count/time) plus one global row. Account deletion cascades to its usage row. Existing account RLS remains unchanged.
- No provider conversation state is requested. Google Gemini free-tier content may be used to improve Google products; paid-tier handling differs. Provider retention and abuse-monitoring policies still apply. This is **not** a promise of zero retention. The tool UI and Privacy page disclose external processing.
- Generation is a writing aid, not browsing, fact-checking, message sending or code execution. There are no exact word-count, originality or error-free guarantees.

## Verification and operations

Run `npm run build`, `npm run lint`, `node --test tests/ai-api.test.js tests/tools100.test.js scripts/test-account-storage.mjs`, and `git diff --check`.

The PostgreSQL test uses an existing local PGlite install via `PGLITE_MODULE`, then `node scripts/test-ai-rls.cjs`. It applies the Accounts and both AI migrations in an isolated database; it never modifies hosted Supabase.

The browser test uses an existing Playwright install via `PLAYWRIGHT_MODULE`, a built preview at `AI_TEST_BASE` (defaults to `http://127.0.0.1:4182`), and an external scratch directory set with `AI_QA_OUTPUT`. Run `node scripts/test-ai-browser.cjs`. Authentication/provider responses are explicit fixtures routed through the actual handler; passing this suite is not proof of live model generation. Do not put output screenshots/test reports in the source tree.

To disable generation, remove `GEMINI_API_KEY` from Production and redeploy. Leave the additive database objects in place; existing saved AI tool identifiers remain valid. Never weaken RLS to troubleshoot a generation error. Do not log bearer tokens or request bodies. SMTP/signup diagnosis remains a separate pending task.

## Gemini provider migration

The existing implementation used native fetch with the OpenAI Responses API, not an SDK. A base-URL-only swap would be incorrect: Gemini compatibility uses Chat Completions messages and choices. Only the provider request/response adapter and secret name change; all fifteen task instructions, auth, quotas, timeouts and routes stay shared. No SDK or dependency added; no OpenAI fallback or caller-controlled provider/model/URL.

Exact model: **gemini-2.5-flash-lite**. Reasoning is disabled with reasoning_effort: none; output is capped with max_tokens: 2200. Accept only one assistant text response ending with finish_reason: stop; reject blocked, incomplete, tool-call, empty or oversized results. No search or code execution is enabled.

Google lists a free tier and low-cost paid tier for this model. Actual project availability and provider rate limits must be verified in Google AI Studio; free service is not guaranteed. Application quotas remain 10/account/day, 30 seconds between requests and 200/day globally. Google limits can be lower. Paid usage follows the Google project's billing configuration; this migration does not enable billing or buy anything.

For the current production project, both AI migrations were applied successfully on September 13, 2026. **Do not reapply them.** Add only GEMINI_API_KEY as a server-only Production Secret in Vercel, then deploy this migration. Do not use OPENAI_API_KEY or any VITE_* secret. Until a real key is supplied, generation stays unavailable. Test results with fixtures are not real generation quality evidence.

Official references: [Google compatibility](https://ai.google.dev/gemini-api/docs/openai), [model](https://ai.google.dev/gemini-api/docs/models/gemini-2.5-flash-lite), [pricing](https://ai.google.dev/gemini-api/docs/pricing), [data terms](https://ai.google.dev/gemini-api/terms).
