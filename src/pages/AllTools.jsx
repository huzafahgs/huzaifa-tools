import Layout from "../components/Layout";
import tools from "../toolsData";
import { Link } from "react-router-dom";

function AllTools() {
  return (
    <Layout title="All Tools">
      <section style={{ padding: "40px" }}>
        <h1 style={{ color: "gold", marginBottom: "30px" }}>🧰 All Tools ({tools.length})</h1>

        <div className="tools-grid">
          {tools.map((tool) => (
            <Link to={`/${tool.slug}`} key={tool.slug} style={{ textDecoration: "none" }}>
              <div className="tool-card">
                <div className="tool-icon">{tool.icon}</div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <button className="use-btn">Use Now →</button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default AllTools;
