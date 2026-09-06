import "./App.css";
import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import ToolCard from "./components/ToolCard";
import tools from "./toolsData";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toolCount = tools.length;
  const categories = ["All", ...new Set(tools.map((t) => t.category))];
  const trimmedSearch = searchQuery.trim();

  const filteredTools = tools.filter((tool) => {
    const query = trimmedSearch.toLowerCase();
    const matchesSearch =
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const hasActiveSearch = Boolean(trimmedSearch);
  const searchSummary = hasActiveSearch
    ? `${filteredTools.length} result${filteredTools.length === 1 ? "" : "s"} for "${trimmedSearch}"`
    : `Browse ${filteredTools.length} available tools`;

  const getCategoryCount = (category) =>
    category === "All"
      ? tools.length
      : tools.filter((tool) => tool.category === category).length;

  const scrollToTools = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("tool-catalog")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <Layout title="Home">
      <section className="hero animate-slide-up" aria-labelledby="hero-heading">
        <p className="hero-kicker">Huzaifa Group of Software</p>
        <h1 id="hero-heading">
          <span className="hero-brand">Huzaifa Tools</span>
          <span className="hero-subhead">
            Free browser-based utilities for everyday work
          </span>
        </h1>

        <p className="hero-tagline">
          {toolCount} free tools for text, calculators, converters, security, and productivity —
          ready to use without an account.
        </p>

        <div className="hero-search">
          <label htmlFor="home-tool-search" className="search-label">
            Search tools
          </label>
          <div className="search-wrap search-wrap--hero">
            <input
              id="home-tool-search"
              type="search"
              placeholder="Search tools, converters, calculators..."
              className="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setSearchQuery("");
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
          </div>
          <p id="home-tool-search-help" className="search-help">
            {searchSummary}. Press Escape to clear search.
          </p>
        </div>

        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={scrollToTools}>
            Browse tools
          </button>
          <Link to="/all-tools" className="btn-secondary">
            View all {toolCount} tools
          </Link>
        </div>

        <div className="stats" role="list">
          <div className="stat-card" role="listitem">
            {toolCount}+ Tools
          </div>
          <div className="stat-card" role="listitem">
            100% Free
          </div>
          <div className="stat-card" role="listitem">
            Runs in Browser
          </div>
          <div className="stat-card" role="listitem">
            Mobile Friendly
          </div>
        </div>
      </section>
      <p className="search-help">Preparing images for a website? Read our <Link to="/blog/image-compression-guide-2026">image compression guide</Link> or check <Link to="/privacy-policy">how tools handle data</Link>.</p>

      <div id="tool-catalog" className="category-filter" role="group" aria-label="Tool categories">
        {categories.map((category) => (
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
        {selectedCategory === "All" ? "All Tools" : `${selectedCategory} Tools`}
        <span className="section-count"> ({filteredTools.length})</span>
      </h2>

      <div className="tools-grid" aria-live="polite">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="empty-state" role="status">
          <div className="empty-state-icon" aria-hidden="true">
            🔍
          </div>
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
    </Layout>
  );
}

export default App;
