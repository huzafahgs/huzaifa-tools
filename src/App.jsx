import "./App.css";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import tools from "./toolsData";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(tools.map(t => t.category))];

  // Filter tools based on search and category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src={logo} alt="Huzaifa Logo" className="logo" />
        <h2 className="brand">HUZAIFA</h2>

        <ul className="menu">
          <li>🏠 Home</li>
          <li>🧰 All Tools ({tools.length})</li>
          <li>⭐ Favorites</li>
          <li>🕒 History</li>
          <li>📰 Blog</li>
          <li>💰 Pricing</li>
          <li>📞 Contact</li>
        </ul>

        <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #222", fontSize: "12px", color: "#666", textAlign: "center" }}>
          <p>Powered by</p>
          <p style={{ color: "gold", fontWeight: "bold" }}>Huzaifa Group of Software</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="topbar">
          <input
            type="text"
            placeholder="Search any tool..."
            className="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="login-btn">Login / Sign Up</button>
        </header>

        <section className="hero">
          <h1>
            All-in-One <span>AI Tools</span> Platform
          </h1>

          <p>
            Free • Fast • Powerful • Secure • Developers • Students • Business
          </p>

          <div className="stats">
            <div className="stat-card">{tools.length}+ Tools</div>
            <div className="stat-card">100% Free</div>
            <div className="stat-card">Secure</div>
            <div className="stat-card">Mobile Friendly</div>
          </div>
        </section>

        {/* Category Filter */}
        <div style={{ marginBottom: "30px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: "10px 20px",
                background: selectedCategory === category ? "gold" : "#11182f",
                color: selectedCategory === category ? "black" : "gold",
                border: "1px solid gold",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s"
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <h2 className="section-title">
          {selectedCategory === "All" ? "🔥 All Tools" : `🔥 ${selectedCategory} Tools`} ({filteredTools.length})
        </h2>

        <div className="tools-grid">
          {filteredTools.map((tool) => (
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

        {filteredTools.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#aaa" }}>
            <p>No tools found matching your search.</p>
          </div>
        )}

        {/* Footer */}
        <footer style={{
          marginTop: "80px",
          paddingTop: "40px",
          paddingBottom: "40px",
          borderTop: "1px solid #222",
          textAlign: "center",
          color: "#666"
        }}>
          <p style={{ marginBottom: "10px" }}>© 2024 Huzaifa Tools. All rights reserved.</p>
          <p style={{ color: "gold", fontWeight: "bold" }}>Powered by Huzaifa Group of Software</p>
        </footer>
      </main>
    </div>
  );
}

export default App;