import Layout from "../components/Layout";

function Blog() {
  return (
    <Layout title="Blog">
      <section style={{ padding: "40px" }}>
        <h1 style={{ color: "gold", marginBottom: "30px" }}>📰 Blog</h1>

        <div style={{ maxWidth: "900px" }}>
          <article style={{
            background: "#0c1022",
            border: "1px solid gold",
            borderRadius: "8px",
            padding: "30px",
            marginBottom: "30px"
          }}>
            <h2 style={{ color: "gold" }}>Welcome to Huzaifa Tools Blog</h2>
            <p style={{ color: "#aaa", fontSize: "14px" }}>Published on July 3, 2024</p>
            <p style={{ lineHeight: "1.6", color: "#ddd" }}>
              Welcome to the Huzaifa Tools blog! We're excited to share updates, tips, and tutorials about using our platform.
            </p>
            <p style={{ lineHeight: "1.6", color: "#ddd" }}>
              Our mission is to provide you with the best free tools for text manipulation, calculations, conversions, and more.
              Each tool is designed with simplicity and efficiency in mind.
            </p>
            <button style={{
              background: "gold",
              color: "black",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "15px"
            }}>
              Read More →
            </button>
          </article>

          <article style={{
            background: "#0c1022",
            border: "1px solid gold",
            borderRadius: "8px",
            padding: "30px",
            marginBottom: "30px"
          }}>
            <h2 style={{ color: "gold" }}>50+ Tools at Your Fingertips</h2>
            <p style={{ color: "#aaa", fontSize: "14px" }}>Published on July 2, 2024</p>
            <p style={{ lineHeight: "1.6", color: "#ddd" }}>
              We've just launched our complete toolkit with over 50 free tools covering everything from text processing to calculations.
              All tools work locally without requiring an API key.
            </p>
            <button style={{
              background: "gold",
              color: "black",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "15px"
            }}>
              Read More →
            </button>
          </article>

          <div style={{ textAlign: "center", padding: "30px", color: "#666" }}>
            <p>More blog posts coming soon...</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Blog;
