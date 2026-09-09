import { Link, useParams } from "react-router-dom";
import tools from "../toolsData";
import NotFound from "../components/NotFound";
import Layout from "../components/Layout";
import { getToolHelp } from "../data/toolHelp";
import ToolCard from "../components/ToolCard";
import { Suspense, useMemo } from "react";
import { getToolComponent } from "../toolRegistry";
import { getCategoryDesign } from "../design/categories";

function ToolPage() {
  const { slug } = useParams();
  const tool = tools.find((entry) => entry.slug === slug);
  const Component = getToolComponent(slug);
  const help = tool ? getToolHelp(tool) : null;

  const relatedTools = useMemo(() => {
    if (!tool) return [];
    return tools
      .filter(
        (entry) => entry.category === tool.category && entry.slug !== tool.slug,
      )
      .slice(0, 4);
  }, [tool]);

  if (!tool || !Component) return <NotFound />;

  return (
    <Layout title={tool.name}>
      <div
        className="tool-page"
        data-tone={getCategoryDesign(tool.category).tone}
      >
        <nav className="tool-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/all-tools">{tool.category || "Tools"}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{tool.name}</span>
        </nav>
        <div className="tool-workspace-label">
          <span aria-hidden="true">
            {getCategoryDesign(tool.category).mark}
          </span>
          {getCategoryDesign(tool.category).label}
          <span>HUZAIFA WORKSPACE</span>
        </div>

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

        <section
          className="tool-page-extras"
          aria-labelledby="tool-help-heading"
        >
          <div className="tool-help-panel">
            <h2 id="tool-help-heading">About this tool</h2>
            <p>{tool.description}</p>
            {help.steps && (
              <>
                <h3>How to use</h3>
                <ol className="tool-help-steps">
                  {help.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </>
            )}
            <p className="tool-help-note">{help.note}</p>
            {help.guide && (
              <p>
                <Link to={help.guide}>{help.guideLabel}</Link>
              </p>
            )}
            <p>
              <Link to="/privacy-policy">Data handling</Link> ·{" "}
              <Link to="/contact">Report a problem</Link>
            </p>
          </div>

          {relatedTools.length > 0 && (
            <div
              className="related-tools"
              aria-labelledby="related-tools-heading"
            >
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
