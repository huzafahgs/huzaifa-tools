import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import blogs from "../data/blogs";

function Blog() {
  const sorted = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Layout title="Blog">
      <section style={{ padding: "40px" }}>
        <h1 style={{ color: "gold", marginBottom: "30px" }}>📰 Blog</h1>

        <div style={{ maxWidth: "900px" }}>
          {sorted.map((post) => (
            <article
              key={post.id}
              style={{
                background: "#0c1022",
                border: "1px solid gold",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: "0 0 140px" }}>
                <img
                  src={post.featuredImage || "/assets/blog-placeholder.png"}
                  alt={post.title}
                  style={{ width: "140px", height: "90px", objectFit: "cover", borderRadius: "6px" }}
                />
              </div>

              <div style={{ flex: "1 1 auto" }}>
                <p style={{ color: "#aaa", fontSize: "13px", margin: 0 }}>
                  <strong style={{ color: "gold" }}>{post.category}</strong> • {post.date} • {post.readingTime}
                </p>
                <h2 style={{ color: "gold", marginTop: "8px", marginBottom: "8px" }}>{post.title}</h2>
                <p style={{ lineHeight: "1.6", color: "#ddd", marginBottom: "12px" }}>{post.metaDescription}</p>

                <Link
                  to={`/blog/${post.slug}`}
                  style={{
                    background: "gold",
                    color: "black",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}

          <div style={{ textAlign: "center", padding: "30px", color: "#666" }}>
            <p>More blog posts coming soon...</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Blog;
