import Layout from "../components/Layout";
import { CONTACT_EMAIL } from "../constants/contact";
export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="trust-page">
        <header className="page-header">
          <h1>Privacy policy</h1>
          <p>Updated September 9, 2026</p>
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
            per tool, currently up to 100 tools. You can remove favorites,
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
