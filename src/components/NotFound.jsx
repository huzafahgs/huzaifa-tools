import { Link } from "react-router-dom";
import Layout from "./Layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="empty-state tool-not-found">
        <p className="eyebrow">404</p>
        <h1 className="empty-state-title">Page not found</h1>
        <p className="empty-state-text">This page does not exist or is no longer available. Check the address or browse our tools and guides.</p>
        <div className="hero-actions">
          <Link to="/all-tools" className="btn-primary">Browse tools</Link>
          <Link to="/blog" className="btn-secondary">Read the blog</Link>
        </div>
      </section>
    </Layout>
  );
}
