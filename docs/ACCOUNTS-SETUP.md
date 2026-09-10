# Huzaifa Accounts V1 — service setup and release gate

The application integration is prepared. Accounts are **not production-ready until the hosted project, database policies and email delivery are configured and tested**. Missing configuration displays an honest service-setup notice; it never creates a local fake login.

## Provider decision

Supabase combines managed email/password authentication, sessions and PostgreSQL in one service. SQL constraints and row-level security protect each user's records independently of React. Firebase Auth with Firestore rules is also viable, but would introduce a different document/rules model without a benefit for these small relational records. Neither requires replacing the React/Vite application or changing the Vercel domain.

The free Supabase plan can support an initial launch, subject to current quotas, email limits and project-pausing policies. Confirm current [pricing](https://supabase.com/pricing) before selecting a plan. Future AI usage and payment entitlements must be enforced by trusted server endpoints using verified Supabase identity; never trust a browser's plan or credit balance.

## Minimum configuration

1. Open [Supabase new project](https://supabase.com/dashboard/new), sign in and create a project for Huzaifa Tools. Choose the appropriate region and keep the database password in your password manager. No database password is needed by this frontend.
2. Open the project's **SQL Editor → New query** and run `supabase/migrations/202609090001_accounts.sql` once. It creates four tables, the 100-tool allowlist, timestamp triggers, privileges and RLS policies in one transaction. Do not rerun it against an already migrated database; use a new migration for later changes.
3. Open **Project Settings → API Keys / Connect**. Copy the **Project URL** and the **publishable key** beginning `sb_publishable_`. Configure:

   ```dotenv
   VITE_SUPABASE_URL=<your actual project URL>
   VITE_SUPABASE_PUBLISHABLE_KEY=<your actual publishable key>
   ```

   Put these two browser-safe values in local `.env.local` and in the existing Vercel project's **Settings → Environment Variables**. Rebuild after changing them. Do not change `VITE_SITE_URL`, the domain or verification files. `.env.example` is a blank template; never commit `.env.local`.

4. In **Authentication → URL Configuration**, set Site URL to `https://ai-tools-by-huzaifa.vercel.app`. Add these exact redirect URLs:
   - `https://ai-tools-by-huzaifa.vercel.app/auth/callback`
   - `http://localhost:5174/auth/callback` for local development, if used
   - `http://127.0.0.1:4182/auth/callback` for the local production-build test, if used

   Add a specific trusted preview callback only if needed. Do not allow arbitrary production wildcard redirects. PKCE verification/reset links must open in the same browser that requested them; the verifier is stored there. Links expire and are single-use. Keep the standard provider confirmation/reset templates using `ConfirmationURL`.

5. In **Authentication → Sign In / Providers → Email**, enable email/password and email confirmation. Set minimum password length to **12**, and keep rate limits enabled. Do not disable confirmation to bypass mail delivery. Enable leaked-password protection if supported by the selected plan. Consider provider-supported CAPTCHA before public launch if abuse warrants it; this integration does not currently submit CAPTCHA tokens.
6. Configure **Authentication → Email → SMTP Settings** with a real production mail provider: SMTP host, port, username, password, sender address and sender name `Huzaifa Tools`. Follow the provider's sender/domain verification requirements. Supabase's built-in test mailer is restricted and is not production email infrastructure. See [Supabase SMTP guidance](https://supabase.com/docs/guides/auth/auth-smtp). Store SMTP credentials only in Supabase; never in Vite, Git or chat. The site's support contact remains `huzaifagroupofsoftware@gmail.com`; a transactional sender may differ if its mail provider requires it.

Only the Project URL and publishable key need to be shared for frontend configuration. **Do not share a service-role key, `sb_secret_` key, database password, SMTP password, refresh token or confirmation link.** The browser client rejects non-publishable key formats, but build-time embedding happens before a runtime check: never put a private key in any `VITE_` variable.

## Data and authorization

- `account_profiles`: authenticated user UUID, optional display name (maximum 80 characters), server timestamps. A row is created on first profile save; the genuine email and creation date come from Auth.
- `account_favorites`: composite primary key `(user_id, tool_slug)`; no duplicates.
- `account_history`: same composite key, server-controlled `visited_at`; at most one latest visit per catalog tool (currently 100). Opening the route records a visit, not successful tool execution.
- `account_tool_catalog`: seeded valid identifiers; browser users cannot add or alter entries.
- All private tables have forced RLS. Both `USING` and `WITH CHECK` require `auth.uid() = user_id`. Client ID filters are convenience only; the database enforces ownership even if requests are forged. Anonymous access is revoked.
- Column privileges prevent clients from supplying history/profile timestamps. Foreign keys reject unknown tool identifiers. Auth-user deletion cascades through all account tables.
- History has no fields for inputs, outputs, PDFs, images, passwords, JWTs or arbitrary payloads. Names/routes are derived from the local tool catalog.
- Guest data is separate local browser storage. Import is explicit, allowlisted, idempotent and never automatic on sign-in. Existing cloud rows win; new imported visits receive the server import time. Guest records remain local. An interrupted import can partially complete across the two tables; retry safely completes it without duplicates.
- A provider session persists in browser storage. This is a managed SPA session, not an HttpOnly-cookie backend. XSS prevention and trusted scripts remain important. No plaintext password is persisted. Signing out is device-local; it does not promise to terminate other devices.
- Cloud lists load on session change/page reload and after mutations, not via realtime subscriptions. Refresh to see changes made on another device.

## Required hosted release checks

Use a designated non-production Supabase project or disposable test accounts that you control. Do not deploy a fixture/mock server.

1. Create and verify an account through real delivered email. Verify duplicate/invalid/weak-password behavior and generic UI errors.
2. Login, refresh, sign out, login again; verify expired-session handling and no protected-data flash. Test another tab/device.
3. Request a reset email and complete it in the requesting browser. Test expired/reused links, wrong-browser links and sign-in with the new password. Confirm redirect URLs and SMTP work on the deployed origin.
4. Save a display name; favorite/unfavorite; open tools; delete one history record and clear all. Confirm database rows contain identifiers/timestamps only.
5. Sign in to a second account; use its **own access token** to request the first account's profile, favorites and history directly from the Data API. Reads/deletes/updates must return no foreign rows; forged inserts/upserts must be rejected. Never test using a service-role key, because it bypasses RLS.
6. Test deliberate guest import, repeated import, failed requests, mobile keyboard/menu, session expiry, and storage disabled. Confirm guest/cloud records remain separate.
7. Run build, diff checks, storage tests, catalog/sitemap validation and browser regression. Review the exact diff, commit only this batch, push main, wait for Vercel success, and smoke-test the production origin. Remove disposable test accounts through authorized admin tooling.

Local PostgreSQL authorization tests validate actual database policy behavior with fixture JWT identities. SDK contract tests validate React flow integration. Neither proves hosted email delivery, hosted settings, real session security or cross-device operation; those remain release gates.

## Operations

Profile/account deletion requests go through the existing contact channel. An authorized project administrator can delete the verified requesting Auth user; database foreign keys remove associated profile/history/favorites. Never delete an account solely because an unauthenticated email asks. Review retention, provider backups and applicable obligations when handling such requests.

No private route is added to the sitemap. `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/auth/callback`, `/account`, `/history` and `/favorites` use `noindex, follow` with no structured-data graph. The existing SPA sets metadata client-side, so this is not an HTTP access-control mechanism. RLS remains the privacy boundary.

Official implementation references: [React Auth quickstart](https://supabase.com/docs/guides/auth/quickstarts/react), [password flows](https://supabase.com/docs/guides/auth/passwords), [PKCE](https://supabase.com/docs/guides/auth/sessions/pkce-flow), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).
