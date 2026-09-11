import Layout from "../components/Layout";
import { Link } from "react-router-dom";
export default function Pricing() {
  return (
    <Layout>
      <section className="trust-page">
        <header className="page-header">
          <h1>Free tools, no subscription</h1>
          <p>
            Use everyday utilities without an account. AI generation requires a
            confirmed account and service availability.
          </p>
        </header>
        <div className="trust-panel">
          <h2>What does it cost?</h2>
          <p>
            The current tool catalog is free to use. There is no paid plan or
            checkout on this site. AI generation, when enabled, is limited to 10
            requests per account per UTC day, at least 30 seconds apart, with a
            shared daily service limit. Provider failures can still consume a
            request.
          </p>
          <h2>What should I know before using a tool?</h2>
          <p>
            Supported inputs and output formats depend on the tool. Large files
            can be limited by your device memory. Some features, including QR
            code generation, need a third-party service and an internet
            connection.
          </p>
          <p>
            Review the <Link to="/privacy-policy">privacy policy</Link> before
            entering sensitive information. For a problem or feature request,
            use our <Link to="/contact">contact page</Link>.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/all-tools">
              Browse available tools
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
