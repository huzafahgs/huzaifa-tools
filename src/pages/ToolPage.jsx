import { Link, useParams } from "react-router-dom";
import tools from "../toolsData";
import Layout from "../components/Layout";
import { Suspense } from "react";
import { getToolComponent } from "../toolRegistry";

function ToolPage() {
  const { slug } = useParams();
  const tool = tools.find((entry) => entry.slug === slug);
  const Component = getToolComponent(slug);

  if (!tool || !Component) {
    return (
      <Layout title="Tool Not Found">
        <div style={{ padding: "60px 20px", color: "white", textAlign: "center", minHeight: "50vh" }}>
          <h1 style={{ color: "gold", fontSize: "32px", marginBottom: "16px" }}>Tool Not Found</h1>
          <p style={{ color: "#ccc", fontSize: "16px", marginBottom: "24px" }}>
            The tool you are looking for does not exist or is no longer available.
          </p>
          <Link
            to="/"
            aria-label="Back to home page"
            style={{
              color: "#050816",
              backgroundColor: "gold",
              padding: "10px 24px",
              borderRadius: "6px",
              fontWeight: "600",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={tool.name}>
      <Suspense
        fallback={
          <div className="tool-container">
            <div className="loading-state" role="status" aria-live="polite">
              <span className="loading" aria-hidden="true"></span>
              <span>Loading {tool.name}...</span>
            </div>
          </div>
        }
      >
        <Component />
      </Suspense>
    </Layout>
  );
}

export default ToolPage;
