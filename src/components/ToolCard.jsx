import { Link } from "react-router-dom";
import { getCategoryDesign } from "../design/categories";

export default function ToolCard({ tool }) {
  if (!tool?.slug) return null;

  return (
    <Link
      to={`/${tool.slug}`}
      className="tool-card-link"
      data-tone={getCategoryDesign(tool.category).tone}
    >
      <article className="tool-card">
        <div className="tool-icon" aria-hidden="true">
          {getCategoryDesign(tool.category).mark}
        </div>
        {tool.category ? (
          <span className="tool-card-category">{tool.category}</span>
        ) : null}
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
        <span className="use-btn" aria-hidden="true">
          Open tool <span>↗</span>
        </span>
      </article>
    </Link>
  );
}
