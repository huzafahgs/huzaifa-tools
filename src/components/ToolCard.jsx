import { Link } from "react-router-dom";

export default function ToolCard({ tool }) {
  if (!tool?.slug) return null;

  return (
    <Link to={`/${tool.slug}`} className="tool-card-link">
      <article className="tool-card">
        <div className="tool-icon" aria-hidden="true">
          {tool.icon}
        </div>
        {tool.category ? (
          <span className="tool-card-category">{tool.category}</span>
        ) : null}
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
        <span className="use-btn" aria-hidden="true">
          Use Now →
        </span>
      </article>
    </Link>
  );
}
