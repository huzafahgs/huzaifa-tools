import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getAllBlogs, getBlogCategories } from "../data/blogs";

function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const blogs = useMemo(
    () =>
      [...getAllBlogs()].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  );

  const categories = useMemo(() => getBlogCategories(), []);

  const categoryCounts = useMemo(
    () =>
      blogs.reduce((counts, blog) => {
        counts[blog.category] = (counts[blog.category] || 0) + 1;
        return counts;
      }, {}),
    [blogs]
  );

  const normalizedSearch = search.trim().toLowerCase();
  const filteredBlogs = useMemo(
    () =>
      blogs.filter((blog) => {
        const matchesCategory = category === "All" || blog.category === category;
        const contentSearch = `${blog.title} ${blog.metaDescription} ${blog.category} ${blog.tags.join(" ")}`.toLowerCase();
        const matchesQuery = normalizedSearch
          ? contentSearch.includes(normalizedSearch)
          : true;

        return matchesCategory && matchesQuery;
      }),
    [blogs, category, normalizedSearch]
  );

  return (
    <Layout>
      <section className="blog-page">
        <div className="page-header">
          <span className="eyebrow">Huzaifa Tools Blog</span>
          <h1>Image Optimization, Performance, and SaaS SEO Insights</h1>
          <p>
            Discover premium guides, case-driven image strategies, and fast web
            optimization insights built for modern brands and startups.
          </p>
        </div>

        <div className="blog-actions">
          <label htmlFor="blog-search" className="search-wrap" style={{ minWidth: "280px" }}>
            <span className="search-label">Search blog posts</span>
            <input
              id="blog-search"
              type="search"
              className="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles, SEO, formats, and tools..."
              aria-label="Search blog posts"
            />
          </label>

          <div className="category-filter" role="tablist" aria-label="Blog categories">
            {categories.map((categoryName) => (
              <button
                key={categoryName}
                type="button"
                className={`category-pill ${categoryName === category ? "category-pill--active" : ""}`}
                onClick={() => setCategory(categoryName)}
                aria-pressed={categoryName === category}
              >
                {categoryName}
                <span className="category-count">{categoryName === "All" ? blogs.length : categoryCounts[categoryName] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="blog-grid">
          {filteredBlogs.map((blog) => (
            <article key={blog.slug} className="blog-card">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="blog-card-image"
                loading="lazy"
              />

              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-card-badge">{blog.category}</span>
                  <span>{blog.readingTime}</span>
                </div>

                <h2>{blog.title}</h2>
                <p>{blog.metaDescription}</p>

                <div className="blog-card-footer">
                  <span>{blog.date}</span>
                  <Link to={`/blog/${blog.slug}`} className="btn-primary">
                    Read article
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="empty-state">
            No blog posts matched your search. Try removing the filter or
            updating your query.
          </div>
        ) : null}
      </section>
    </Layout>
  );
}

export default Blog;
