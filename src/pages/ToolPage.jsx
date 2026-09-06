import { Link, useParams } from "react-router-dom";
import tools from "../toolsData";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import { Suspense, useMemo } from "react";
import { getToolComponent } from "../toolRegistry";

function ToolPage() {
  const { slug } = useParams();
  const tool = tools.find((entry) => entry.slug === slug);
  const Component = getToolComponent(slug);

  const relatedTools = useMemo(() => {
    if (!tool) return [];
    return tools
      .filter((entry) => entry.category === tool.category && entry.slug !== tool.slug)
      .slice(0, 4);
  }, [tool]);

  if (!tool || !Component) {
    return (
      <Layout title="Tool Not Found">
        <div className="empty-state tool-not-found" role="status">
          <h1 className="empty-state-title">Tool Not Found</h1>
          <p className="empty-state-text">
            The tool you are looking for does not exist or is no longer available.
          </p>
          <div className="hero-actions">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/all-tools" className="btn-secondary">
              Browse all tools
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={tool.name}>
      <div className="tool-page">
        <nav className="tool-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/all-tools">{tool.category || "Tools"}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{tool.name}</span>
        </nav>

        <Suspense
          fallback={
            <div className="tool-container">
              <div className="loading-state" role="status" aria-live="polite">
                <span className="loading-spinner" aria-hidden="true" />
                <span>Loading {tool.name}...</span>
              </div>
            </div>
          }
        >
          <Component />
        </Suspense>

        <section className="tool-page-extras" aria-labelledby="tool-help-heading">
          <div className="tool-help-panel">
            <h2 id="tool-help-heading">About this tool</h2>
            <p>{tool.description}</p>
            <h3>How to use</h3>
            <ol className="tool-help-steps">
              <li>Enter or paste your input in the fields above.</li>
              <li>Review the options if the tool offers any settings.</li>
              <li>Read the result and copy or download it as needed.</li>
            </ol>
            <p className="tool-help-note">
              Most Huzaifa Tools run locally in your browser so your data stays on your device.
            </p>
          </div>

          {relatedTools.length > 0 && (
            <div className="related-tools" aria-labelledby="related-tools-heading">
              <h2 id="related-tools-heading">Related tools</h2>
              <div className="tools-grid tools-grid--related">
                {relatedTools.map((related) => (
                  <ToolCard key={related.slug} tool={related} />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

export default ToolPage;
