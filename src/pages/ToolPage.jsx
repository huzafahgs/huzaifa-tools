import { useParams } from "react-router-dom";
import tools from "../toolsData";
import Layout from "../components/Layout";
import { Suspense, lazy, useEffect } from "react";
import { getToolComponent } from "../toolRegistry";


const ComingSoon = lazy(() => import("../components/ComingSoon"));

const siteName = "Huzaifa Tools";
const defaultDescription = "Free premium online tools by Huzaifa Group of Software.";

const setMeta = (selector, attribute, value) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const nameMatch = selector.match(/\[name="([^"]+)"\]/);
    const propertyMatch = selector.match(/\[property="([^"]+)"\]/);
    if (nameMatch) tag.setAttribute("name", nameMatch[1]);
    if (propertyMatch) tag.setAttribute("property", propertyMatch[1]);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attribute, value);
};

const setCanonical = (url) => {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
};

function ToolPage() {
  const { slug } = useParams();
  const tool = tools.find(t => t.slug === slug);
  const Component = getToolComponent(slug);
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    const pageTitle = tool ? `${tool.name} - ${siteName}` : `Tool Not Found - ${siteName}`;
    const description = tool ? `${tool.description} Use ${tool.name} free on ${siteName}. Fast, secure, and browser-based.` : defaultDescription;
    const canonicalUrl = `${origin}/${tool ? tool.slug : ""}`;

    document.title = pageTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="robots"]', "content", tool ? "index, follow" : "noindex, follow");
    setCanonical(canonicalUrl);

    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:title"]', "content", pageTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:site_name"]', "content", siteName);

    setMeta('meta[name="twitter:card"]', "content", "summary");
    setMeta('meta[name="twitter:title"]', "content", pageTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
  }, [origin, tool]);

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
      <Suspense fallback={
        <div className="tool-container">
          <div className="loading-state" role="status" aria-live="polite">
            <span className="loading" aria-hidden="true"></span>
            <span>Loading {tool.name}...</span>
          </div>
        </div>
      }>
        {Component ? <Component /> : <ComingSoon toolName={tool.name} />}
      </Suspense>
    </Layout>
  );
}

export default ToolPage;
