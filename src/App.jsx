import "./App.css";
import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import tools from "./toolsData";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(tools.map(t => t.category))];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout title="Home">
      <header className="topbar">
        <div className="search-wrap">
          <label htmlFor="home-tool-search" className="search-label">Search tools</label>
          <input
            id="home-tool-search"
            type="search"
            placeholder="Search any tool..."
            className="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-describedby="home-tool-search-help"
            autoComplete="off"
          />
          <p id="home-tool-search-help" className="search-help">
            Find calculators, converters, generators, and developer tools.
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
            {category}
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
            Try a different search term or category to discover our full toolkit.
          </p>
        </div>
      )}

      <footer className="site-footer">
        <p>© 2024 Huzaifa Tools. All rights reserved.</p>
        <p className="brand-line">Powered by Huzaifa Group of Software</p>
      </footer>
    </Layout>
  );
}

export default App;
