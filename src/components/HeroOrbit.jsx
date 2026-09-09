import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
export default function HeroOrbit() {
  return (
    <div className="hero-orbit" aria-label="Explore a few useful tools">
      <div className="orbit-grid" aria-hidden="true" />
      <div className="orbit-ring orbit-ring--outer" aria-hidden="true" />
      <div className="orbit-ring orbit-ring--inner" aria-hidden="true" />
      <div className="orbit-core">
        <img src={logo} alt="Huzaifa Tools" width="100" height="100" />
        <span>YOUR EVERYDAY TOOLKIT</span>
      </div>
      <Link className="orbit-item orbit-item--pdf" to="/pdf-merger">
        <span aria-hidden="true">▤</span>
        <div>
          <small>DOCUMENTS</small>
          <strong>Merge your PDFs</strong>
        </div>
        <b aria-hidden="true">↗</b>
      </Link>
      <Link className="orbit-item orbit-item--code" to="/json-formatter">
        <span aria-hidden="true">{"{ }"}</span>
        <div>
          <small>DEVELOPMENT</small>
          <strong>Bring order to JSON</strong>
        </div>
        <b aria-hidden="true">↗</b>
      </Link>
      <Link className="orbit-item orbit-item--image" to="/image-resizer">
        <span aria-hidden="true">◈</span>
        <div>
          <small>IMAGES</small>
          <strong>Find the right size</strong>
        </div>
        <b aria-hidden="true">↗</b>
      </Link>
      <div className="orbit-caption">
        <i aria-hidden="true" />
        Small tasks. More momentum.
      </div>
    </div>
  );
}
