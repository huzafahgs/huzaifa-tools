import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import tools from "../toolsData";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function AllTools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [params] = useSearchParams();
  const initialCategory = params.get("category");
  const [selectedCategory, setSelectedCategory] = useState(
    tools.some((t) => t.category === initialCategory) ? initialCategory : "All",
  );

  const categories = useMemo(
    () => ["All", ...new Set(tools.map((tool) => tool.category))],
    [],
  );

  const trimmedSearch = searchQuery.trim().toLowerCase();

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      !trimmedSearch ||
      tool.name.toLowerCase().includes(trimmedSearch) ||
      tool.description.toLowerCase().includes(trimmedSearch) ||
      tool.category.toLowerCase().includes(trimmedSearch);
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout title="All Tools">
      <section className="page-shell">
        <header className="page-header">
          <span className="eyebrow">
            THE TOOL LIBRARY / {tools.length} UTILITIES
          </span>
          <h1>All Tools</h1>
          <p>
            Explore {tools.length} tools from Huzaifa Tools. AI generation requires
            a confirmed account and service availability.
          </p>
        </header>

        <div className="search-wrap search-wrap--page">
          <label htmlFor="all-tools-search" className="search-label">
            Search all tools
          </label>
          <input
            id="all-tools-search"
            type="search"
            className="search"
            placeholder="Search by name, description, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div
          className="category-filter"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`category-pill${selectedCategory === category ? " category-pill--active" : ""}`}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              <span>{category}</span>
              <span className="category-count">
                {category === "All"
                  ? tools.length
                  : tools.filter((tool) => tool.category === category).length}
              </span>
            </button>
          ))}
        </div>

        <h2 className="section-title" aria-live="polite" aria-atomic="true">
          {selectedCategory === "All" ? "Catalog" : selectedCategory}
          <span className="section-count"> ({filteredTools.length})</span>
        </h2>

        <div className="tools-grid">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="empty-state" role="status">
            <h3 className="empty-state-title">No tools found</h3>
            <p className="empty-state-text">
              Try a different search term or category.
            </p>
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
          </div>
        )}
      </section>
    </Layout>
  );
}

export default AllTools;
