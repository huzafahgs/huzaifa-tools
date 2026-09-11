# AI Tools Batch 1 — activation checklist

The web release is safe to deploy before activation. It shows a clear unavailable state rather than producing simulated output. Existing tools, account routes and SMTP are independent of this integration.

Complete this activation checklist in the existing Supabase and Vercel projects:

1. In Supabase SQL Editor, run **only** `supabase/migrations/202609110001_ai_tools.sql`, once, as the database owner. Do not reapply the Accounts V1 migration. This adds the five tool identifiers, protected usage counters and two narrowly scoped RPCs. It does not change existing account policies, profile triggers or SMTP.
2. In the existing Vercel project's **Production** environment, add **`OPENAI_API_KEY`** with a valid OpenAI project API key authorized for the Responses API and `gpt-4.1-mini`, with billing available. Enter it directly in Vercel; do not paste it in chat, source code, or any `VITE_*` variable. The existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are reused on the server; no Supabase private/service-role key is needed.
3. Redeploy the latest main deployment so its function receives the new environment. Open `/api/ai` on the production domain: it should return `configured: true` and `catalogReady: true`. This confirms configuration presence and migration availability, **not** provider billing or model access. Sign in with an existing confirmed account, generate one non-sensitive example, inspect the actual answer, and verify Copy/Clear. Test all five tasks before treating generation quality as verified.

If SQL reports the migration objects already exist, stop and inspect the migration state instead of rerunning or dropping tables. This migration is transactional; it is not intended as a repeatable seed script.

## Architecture

- Five permanent routes share `src/tools/ai/AIWorkspace.jsx` and `src/data/aiTools.js`.
- `POST /api/ai` accepts only the five registered tasks, 20–12,000 input characters and tool-specific enumerated settings. No caller-specified URL, model, system prompt, tool execution, file upload or streaming proxy.
- The Vercel Node function verifies the bearer token with Supabase Auth, requires a confirmed non-anonymous user, reserves database quota, then calls the fixed OpenAI Responses API endpoint with `gpt-4.1-mini`.
- Native server `fetch`; no new production dependency. The existing legacy static-build configuration is retained with an additive Node build/route for `/api/ai`. Domain, verification and the SPA fallback stay unchanged.
- `GET /api/ai` reveals only service flags. It checks the public, non-sensitive `ai_tools_ready()` capability. Until the migration exists, AI favorites/history are gated for both guests and signed-in users, preventing unknown-slug cloud imports. The original 100 tools use their existing saving behavior.

## Limits and privacy

- Fixed global cap: **200 reserved requests per UTC day**, shared across all users. Fixed per-account cap: **10 per UTC day**, at least **30 seconds apart**. A transaction locks a singleton budget row, so limits survive parallel function instances and cold starts. A confirmed user can consume their own quota through the RPC, but cannot increase/reset counters or choose another identity.
- Quota reservation happens before generation. Provider errors, client cancellation and timeouts may still consume quota. No automatic retries or refunds that could bypass the cost bound. Cancellation clears the browser and ignores stale responses; it cannot retract an upstream request already accepted.
- Maximum JSON body 52,000 bytes, maximum output 2,200 tokens and 20,000 returned characters. Upstream timeouts are 8s for each Supabase call and 35s for generation; function max duration 60s. Input and output limits bound request size, not an exact dollar budget. Provider project budgets/alerts are useful additional controls.
- No prompt/output logging, draft localStorage, conversation ID, or prompt/output account records. Output renders as plain text, never HTML. Drafts reset on account/route changes and Clear.
- Usage storage is one row per account (ID, latest day/count/time) plus one global row. Account deletion cascades to its usage row. Existing account RLS remains unchanged.
- `store: false` disables stored Responses application state. It is **not** a promise of zero provider retention; provider security/abuse-monitoring policies still apply. The tool UI and Privacy page disclose external processing.
- Generation is a writing aid, not browsing, fact-checking, message sending or code execution. There are no exact word-count, originality or error-free guarantees.

## Verification and operations

Run `npm run build`, `npm run lint`, `node --test tests/ai-api.test.js tests/tools100.test.js scripts/test-account-storage.mjs`, and `git diff --check`.

The PostgreSQL test uses an existing local PGlite install via `PGLITE_MODULE`, then `node scripts/test-ai-rls.cjs`. It applies both migrations in an isolated database; it never modifies hosted Supabase.

The browser test uses an existing Playwright install via `PLAYWRIGHT_MODULE`, a built preview at `AI_TEST_BASE` (defaults to `http://127.0.0.1:4182`), and an external scratch directory set with `AI_QA_OUTPUT`. Run `node scripts/test-ai-browser.cjs`. Authentication/provider responses are explicit fixtures routed through the actual handler; passing this suite is not proof of live model generation. Do not put output screenshots/test reports in the source tree.

To disable generation, remove `OPENAI_API_KEY` from Production and redeploy. Leave the additive database objects in place; existing saved AI tool identifiers remain valid. Never weaken RLS to troubleshoot a generation error. Do not log bearer tokens or request bodies. SMTP/signup diagnosis remains a separate pending task.

Official references: [OpenAI model](https://developers.openai.com/api/docs/models/gpt-4.1-mini), [OpenAI data controls](https://platform.openai.com/docs/guides/your-data), [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json).
