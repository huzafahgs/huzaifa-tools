import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import { CONTACT_EMAIL } from "../constants/contact";
import NotFound from "../components/NotFound";
import Layout from "../components/Layout";
import { getAllBlogs, getBlogBySlug } from "../data/blogs";

function BlogPost() {
  const { slug } = useParams();
  const blog = useMemo(() => getBlogBySlug(slug), [slug]);
  const [contentHtml, setContentHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!blog) {
      setContentHtml("");
      setLoading(false);
      return () => {
        active = false;
      };
    }

    setLoading(true);
    blog
      .content()
      .then((markdown) => {
        if (!active) return;
        setContentHtml(marked.parse(markdown.replace(/^# .+\r?\n/, "")));
      })
      .catch(() => {
        if (!active) return;
        setContentHtml(
          "<p>Unable to load the article content at the moment. Please try again later.</p>"
        );
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [blog]);

  const relatedPosts = useMemo(() => {
    if (!blog) return [];
    return getAllBlogs()
      .filter((item) => item.slug !== blog.slug)
      .filter(
        (item) =>
          item.category === blog.category ||
          item.tags.some((tag) => blog.tags.includes(tag))
      )
      .slice(0, 3);
  }, [blog]);

  if (!blog) return <NotFound />;

  return (
    <Layout>
      <section className="blog-post-page">
        <nav className="tool-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/blog">Blog</Link></nav>
        <div className="blog-hero">
          <div className="blog-hero-meta">
            <span className="blog-badge">{blog.category}</span>
            <span>{blog.readingTime}</span>
          </div>

          <h1>{blog.title}</h1>
          <p className="blog-subtitle">{blog.metaDescription}</p>
          <div className="blog-post-meta">
            By {blog.author} · <time dateTime={blog.date}>{blog.date}</time>
            {blog.updated && <> · Updated <time dateTime={blog.updated}>{blog.updated}</time></>}
          </div>

          <img
            src={blog.featuredImage}
            alt=""
            width="800" height="200"
            className="blog-hero-image"
            loading="lazy"
          />
        </div>

        <div className="blog-content-layout">
          <article className="blog-content">
            {loading ? (
              <p>Loading article...</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            )}
          </article>

          <aside className="blog-sidebar">
            <div className="blog-sidebar-card">
              <h2>Explore Related Tools</h2>
              <ul className="sidebar-links">
                <li>
                  <Link to="/image-compressor">Image Compressor</Link>
                </li>
                <li>
                  <Link to="/all-tools">All Tools</Link>
                </li>
                <li>
                  <Link to="/blog/best-image-dimensions">Image sizing guide</Link>
                </li>
                <li>
                  <Link to="/word-counter">Word Counter</Link>
                </li>
                <li>
                  <Link to="/text-case-converter">Text Case Converter</Link>
                </li>
              </ul>
            </div>

            <div className="blog-sidebar-card">
              <h2>Need support?</h2>
              <p>
                Reach out to our team at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>{' '}
                to report a tool issue or suggest a correction to this guide.
              </p>
            </div>
          </aside>
        </div>

        {blog.faq.length > 0 && <section className="blog-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {blog.faq.map((item, index) => (
              <div key={index} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>}

        <section className="blog-related">
          <div className="section-heading">
            <h2>Related articles</h2>
          </div>
          {relatedPosts.length ? (
            <div className="blog-grid">
              {relatedPosts.map((item) => (
                <article key={item.slug} className="blog-card">
                  <img
                    src={item.featuredImage}
                    alt="" width="320" height="160"
                    className="blog-card-image"
                    loading="lazy"
                  />
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-card-badge">{item.category}</span>
                      <span>{item.readingTime}</span>
                    </div>
                    <h2><Link to={`/blog/${item.slug}`}>{item.title}</Link></h2>
                    <p>{item.metaDescription}</p>
                    <div className="blog-card-footer">
                      <span>{item.date}</span>
                      <Link to={`/blog/${item.slug}`} className="btn-primary">
                        Read more
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>No related articles are available at the moment.</p>
          )}
        </section>
      </section>
    </Layout>
  );
}

export default BlogPost;
