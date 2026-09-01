import "./App.css";
import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import tools from "./toolsData";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(tools.map(t => t.category))];
  const trimmedSearch = searchQuery.trim();

  const filteredTools = tools.filter(tool => {
    const query = trimmedSearch.toLowerCase();
    const matchesSearch = tool.name.toLowerCase().includes(query) ||
                          tool.description.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const hasActiveSearch = Boolean(trimmedSearch);
  const searchSummary = hasActiveSearch
    ? `${filteredTools.length} result${filteredTools.length === 1 ? "" : "s"} for "${trimmedSearch}"`
    : `Browse ${filteredTools.length} available tools`;
  const getCategoryCount = (category) => (
    category === "All" ? tools.length : tools.filter(tool => tool.category === category).length
  );

  return (
    <Layout title="Home">
      <header className="topbar">
        <div className="search-wrap">
          <label htmlFor="home-tool-search" className="search-label">Search tools</label>
          <input
            id="home-tool-search"
            type="search"
            placeholder="Search tools, converters, calculators..."
            className="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSearchQuery("");
              }
            }}
            aria-describedby="home-tool-search-help"
            autoComplete="off"
          />
          {hasActiveSearch && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <p id="home-tool-search-help" className="search-help">
            {searchSummary}. Press Escape to clear search.
          </p>
        </div>
        <button type="button" className="login-btn">Login / Sign Up</button>
      </header>

      <section className="hero animate-slide-up" aria-labelledby="hero-heading">
        <p className="hero-kicker">Huzaifa Group of Software</p>
        <h1 id="hero-heading">
          All-in-One <span className="hero-accent">AI Tools</span> Platform
        </h1>

        <p className="hero-tagline">
          Free • Fast • Powerful • Secure • Developers • Students • Business
        </p>

        <div className="stats" role="list">
          <div className="stat-card" role="listitem">{tools.length}+ Tools</div>
          <div className="stat-card" role="listitem">100% Free</div>
          <div className="stat-card" role="listitem">Secure</div>
          <div className="stat-card" role="listitem">Mobile Friendly</div>
        </div>
      </section>

      <div className="category-filter" role="group" aria-label="Tool categories">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`category-pill${selectedCategory === category ? " category-pill--active" : ""}`}
          >
            <span>{category}</span>
            <span className="category-count">{getCategoryCount(category)}</span>
          </button>
        ))}
      </div>

      <h2 className="section-title">
        {selectedCategory === "All" ? "🔥 All Tools" : `🔥 ${selectedCategory} Tools`}
        <span className="section-count"> ({filteredTools.length})</span>
      </h2>

      <div className="tools-grid" aria-live="polite" aria-busy="false">
        {filteredTools.map((tool) => (
          <Link to={`/${tool.slug}`} key={tool.slug}>
            <article className="tool-card">
              <div className="tool-icon" aria-hidden="true">{tool.icon}</div>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <button type="button" className="use-btn">Use Now →</button>
            </article>
          </Link>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="empty-state" role="status">
          <div className="empty-state-icon" aria-hidden="true">🔍</div>
          <h3 className="empty-state-title">No tools found</h3>
          <p className="empty-state-text">
            Try clearing your search, using a broader keyword, or switching to All categories.
          </p>
          {(hasActiveSearch || selectedCategory !== "All") && (
            <button
              type="button"
              className="empty-state-action"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Reset filters
            </button>
          )}
        </div>
      )}

      <footer className="site-footer">
        <p>© 2024 Huzaifa Tools. All rights reserved.</p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "15px",
          margin: "15px 0",
          fontSize: "14px"
        }}>
          <Link to="/about-us" style={{ color: "gold", textDecoration: "none" }}>About Us</Link>
          <span style={{ color: "#444" }}>|</span>
          <Link to="/contact" style={{ color: "gold", textDecoration: "none" }}>Contact</Link>
          <span style={{ color: "#444" }}>|</span>
          <Link to="/privacy-policy" style={{ color: "gold", textDecoration: "none" }}>Privacy Policy</Link>
          <span style={{ color: "#444" }}>|</span>
          <Link to="/terms-conditions" style={{ color: "gold", textDecoration: "none" }}>Terms & Conditions</Link>
          <span style={{ color: "#444" }}>|</span>
          <Link to="/disclaimer" style={{ color: "gold", textDecoration: "none" }}>Disclaimer</Link>
        </div>
        <p className="brand-line">Powered by Huzaifa Group of Software</p>
      </footer>
    </Layout>
  );
}

export default App;
