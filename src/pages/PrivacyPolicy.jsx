import Layout from "../components/Layout";
import { CONTACT_EMAIL } from "../constants/contact";
export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="trust-page">
        <header className="page-header">
          <h1>Privacy policy</h1>
          <p>Updated September 11, 2026</p>
        </header>
        <div className="trust-panel">
          <p>
            This policy describes data handling on Huzaifa Tools, operated by
            Huzaifa Group of Software.
          </p>
          <h2>Tool inputs and external services</h2>
          <p>
            Many utilities process inputs in browser memory. QR code generation
            sends the text or URL you enter to api.qrserver.com to create the
            image. Do not include passwords, private documents, or other
            sensitive information in QR requests. External services receive
            connection information such as your IP address and are subject to
            their own policies.
          </p>
          <h2>AI generation</h2>
          <p>
            When available, AI writing tools send the text and options you submit
            through our Vercel server to OpenAI. Drafts and results stay in the
            editor's memory and are not saved in account history or local draft
            storage. We do not log prompt or result content in the application.
            We request no stored Responses API state using store: false; this
            does not eliminate provider security or abuse-monitoring retention.
            See <a href="https://platform.openai.com/docs/guides/your-data">OpenAI's API data controls</a>.
            Do not submit confidential information, passwords or private tokens.
          </p>
          <p>
            AI abuse protection stores an account identifier, the most recent
            usage date, a request count and last-request time, plus a shared daily
            count. These contain no prompts or generated content. The per-account
            record is replaced as you use the service and removed when the account
            is deleted. Requests, including failed provider attempts, can consume
            quota. Clearing the editor cannot retract data already submitted.
          </p>
          <h2>Accounts and saved tools</h2>
          <p>
            When account services are configured, Supabase provides
            authentication and database storage. Signing up sends your email
            address and password directly to Supabase over an encrypted
            connection. Huzaifa Tools does not store your plaintext password.
            Your account stores your email, account timestamps, optional display
            name, favorite tool identifiers and the latest visit time for each
            recently opened tool. Account history does not include tool inputs,
            uploaded files, generated passwords or document contents. Opening a
            tool, rather than successfully completing an operation, creates a
            history entry.
          </p>
          <p>
            Supabase processes account and technical connection data under its
            own service terms and privacy practices. Authentication session
            tokens are persisted in browser storage so you can stay signed in.
            Sign out on shared devices. Cloud records remain until you delete
            them or request account deletion; history retains at most one record
            per tool, with the latest 100 shown in the history view. You can remove favorites,
            remove individual history entries or clear all account history.
          </p>
          <h2>Local preferences and imports</h2>
          <p>
            Without signing in, favorites and recent tool identifiers are saved
            in local browser storage. These records are separate from cloud
            account records. Signing in does not automatically upload them. The
            Account page offers an explicit import action; imported history is
            dated at import time, and existing cloud records are kept. Importing
            leaves guest records on the device. Clearing browser storage removes
            local records and sessions but does not delete cloud data.
          </p>
          <h2>Hosting and messages</h2>
          <p>
            Our hosting provider may process technical request data, including
            IP addresses, browser details, requested URLs, and timestamps, to
            deliver and protect the site. The contact form prepares an email in
            your email application. It does not send the message automatically.
            When you send it, we receive the details you include and use them to
            respond to your request.
          </p>
          <h2>Advertising and cookies</h2>
          <p>
            If Google advertising is enabled, Google and its partners may use
            cookies, web beacons, or IP addresses to deliver and measure ads.
            Advertising choices and applicable consent controls depend on your
            location. See{" "}
            <a href="https://policies.google.com/technologies/ads">
              Google's advertising information
            </a>{" "}
            for details. This disclosure does not mean that ads are active on
            every page.
          </p>
          <h2>Your choices</h2>
          <p>
            You can clear local storage, manage cookies through your browser,
            and choose not to submit data to external services. For a question
            about information you have emailed us or a request to delete your
            account or correspondence, contact{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <h2>Changes</h2>
          <p>
            We update this page when data practices change. The date above
            identifies the latest revision.
          </p>
        </div>
      </section>
    </Layout>
  );
}
