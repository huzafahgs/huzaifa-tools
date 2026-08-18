import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import blogs from "../data/blogs";
import { marked } from "marked";

function BlogPost() {
  const { slug } = useParams();
  const post = blogs.find((b) => b.slug === slug);

  useEffect(() => {
    if (!post) return;

    const setMeta = (name, content, attr = "name") => {
      if (!content) return;
      const tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (tag) {
        tag.setAttribute("content", content);
      } else {
        const newTag = document.createElement("meta");
        newTag.setAttribute(attr, name);
        newTag.setAttribute("content", content);
        document.head.appendChild(newTag);
      }
    };

    const setLink = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (tag) {
        tag.setAttribute("href", href);
      } else {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        tag.setAttribute("href", href);
        document.head.appendChild(tag);
      }
    };

    document.title = post.metaTitle || post.title;
    setMeta("description", post.metaDescription);
    setMeta("og:title", post.metaTitle, "property");
    setMeta("og:description", post.metaDescription, "property");
    setMeta("og:type", "article", "property");
    setMeta("og:url", `${window.location.origin}/blog/${post.slug}`, "property");
    setMeta("og:image", post.featuredImage, "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", post.metaTitle);
    setMeta("twitter:description", post.metaDescription);
    setMeta("twitter:image", post.featuredImage);

    setLink("canonical", `${window.location.origin}/blog/${post.slug}`);

    // Remove existing JSON-LD script if present
    const existing = document.getElementById("blog-jsonld");
    if (existing) existing.remove();

    // Article JSON-LD
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.metaTitle || post.title,
      image: [post.featuredImage || `${window.location.origin}/favicon.png`],
      author: { "@type": "Person", name: post.author || "Huzaifa Tools" },
      datePublished: post.date,
      publisher: { "@type": "Organization", name: "Huzaifa Group of Software" },
      description: post.metaDescription,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${window.location.origin}/blog/${post.slug}`,
      },
    };

    const faqLd = post.faq && post.faq.length ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    } : null;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "blog-jsonld";
    const graph = faqLd ? [articleLd, faqLd] : [articleLd];
    script.textContent = JSON.stringify(graph);
    document.head.appendChild(script);

    // cleanup not necessary — let SeoHead handle other tags if route changes
  }, [post]);

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
            <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "20px" }}>{post.date} • {post.readingTime}</p>

            <div
              style={{ lineHeight: 1.7, color: "#ddd" }}
              dangerouslySetInnerHTML={{ __html: marked.parse(post.content || "") }}
            />

            {post.faq && post.faq.length > 0 && (
              <section style={{ marginTop: "24px" }}>
                <h2 style={{ color: "gold" }}>FAQ</h2>
                <div>
                  {post.faq.map((f, i) => (
                    <div key={i} style={{ marginBottom: "12px" }}>
                      <h3 style={{ color: "#fff", marginBottom: "6px" }}>{f.question}</h3>
                      <p style={{ color: "#ddd", marginTop: 0 }}>{f.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

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
