import { useParams } from "react-router-dom";
import tools from "../toolsData";
import Layout from "../components/Layout";
import { Suspense, lazy } from "react";
import { getToolComponent } from "../toolRegistry";


const ComingSoon = lazy(() => import("../components/ComingSoon"));

function ToolPage() {
  const { slug } = useParams();
  const tool = tools.find(t => t.slug === slug);
  const Component = getToolComponent(slug);

  if (!tool) {
    return (
      <Layout title="Tool Not Found">
        <div style={{ padding: "40px", color: "white", textAlign: "center" }}>
          <h1 style={{ color: "gold" }}>Tool Not Found</h1>
          <p>The tool you're looking for doesn't exist.</p>
          <a href="/" style={{ color: "gold", textDecoration: "none", marginTop: "20px", display: "inline-block" }}>← Back to Home</a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={tool.name}>
      <Suspense fallback={<div style={{ padding: "40px", color: "white", textAlign: "center" }}>Loading...</div>}>
        {Component ? <Component /> : <ComingSoon toolName={tool.name} />}
      </Suspense>
    </Layout>
  );
}

export default ToolPage;