import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";

const posts = {
  "welcome-to-huzaifa-tools": {
    title: "Welcome to Huzaifa Tools Blog",
    date: "Published on July 3, 2024",
    intro:
      "Welcome to the Huzaifa Tools blog! We're excited to share updates, tips, and tutorials about using our platform.",
    content: [
      "Our mission is to provide you with the best free tools for text manipulation, calculations, conversions, and more.",
      "Each tool is designed with simplicity and efficiency in mind, so you can solve everyday tasks quickly and confidently.",
    ],
  },
  "50-tools-at-your-fingertips": {
    title: "50+ Tools at Your Fingertips",
    date: "Published on July 2, 2024",
    intro:
      "We've just launched our complete toolkit with over 50 free tools covering everything from text processing to calculations.",
    content: [
      "All tools work locally without requiring an API key, which keeps the experience fast, private, and easy to use.",
      "Whether you need to format text, calculate values, or convert data, everything is available in one place.",
    ],
  },
};

function BlogPost() {
  const { slug } = useParams();
  const post = posts[slug];

  if (!post) {
    return (
      <Layout title="Blog Post">
        <section style={{ padding: "40px" }}>
          <h1 style={{ color: "gold", marginBottom: "20px" }}>📰 Blog Post Not Found</h1>
          <p style={{ color: "#ddd", marginBottom: "20px" }}>The requested blog post could not be found.</p>
          <Link
            to="/blog"
            style={{
              background: "gold",
              color: "black",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            ← Back to Blog
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title={post.title}>
      <section style={{ padding: "40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <article
            style={{
              background: "#0c1022",
              border: "1px solid gold",
              borderRadius: "8px",
              padding: "30px",
            }}
          >
            <h1 style={{ color: "gold", marginBottom: "10px" }}>{post.title}</h1>
            <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "20px" }}>{post.date}</p>
            <p style={{ lineHeight: "1.7", color: "#ddd", marginBottom: "16px" }}>{post.intro}</p>
            {post.content.map((paragraph, index) => (
              <p key={index} style={{ lineHeight: "1.7", color: "#ddd", marginBottom: "16px" }}>
                {paragraph}
              </p>
            ))}
            <Link
              to="/blog"
              style={{
                background: "gold",
                color: "black",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "none",
                display: "inline-block",
                marginTop: "15px",
              }}
            >
              ← Back to Blog
            </Link>
          </article>
        </div>
      </section>
    </Layout>
  );
}

export default BlogPost;
