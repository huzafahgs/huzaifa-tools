import "./App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import ToolCard from "./components/ToolCard";
import HeroOrbit from "./components/HeroOrbit";
import Reveal from "./components/Reveal";
import tools from "./toolsData";
import { getCategoryDesign } from "./design/categories";
import { getAllBlogs } from "./data/blogs";

const featured = [
  "pdf-merger",
  "image-resizer",
  "json-formatter",
  "word-counter",
  "password-generator",
  "percentage-calculator",
].map((s) => tools.find((t) => t.slug === s));
const areas = ["PDF", "Image", "Developer", "Text", "Security", "Calculator"];
export default function App() {
  const [query, setQuery] = useState("");
  const matches = tools.filter((t) =>
    (t.name + " " + t.description + " " + t.category)
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <Layout>
      <section className="landing-hero" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> BUILT FOR THE EVERYDAY
          </p>
          <h1 id="hero-heading">
            <span>Huzaifa Tools</span>Less friction.
            <br />
            <em>More creating.</em>
          </h1>
          <p className="landing-lead">
            Free online tools for useful everyday work. Shape a document,
            untangle your code, or find the answer to a calculation.
          </p>
          <div className="hero-actions">
            <a href="#discover" className="btn-primary">
              Find your tool <span aria-hidden="true">↗</span>
            </a>
            <Link to="/blog/huzaifa-tools-guide" className="btn-secondary">
              Meet your toolkit
            </Link>
          </div>
          <div className="hero-facts">
            <span>
              <b>{tools.length}</b> real utilities
            </span>
            <span>No account required</span>
            <Link to="/pricing">Free to use</Link>
          </div>
        </div>
        <HeroOrbit />
      </section>

      <section
        id="discover"
        className="discovery-bar"
        aria-labelledby="discovery-heading"
      >
        <div>
          <span className="eyebrow">WHAT ARE YOU WORKING ON?</span>
          <h2 id="discovery-heading">A useful tool is one search away.</h2>
        </div>
        <label className="home-search-field" htmlFor="home-tool-search">
          <span aria-hidden="true">⌕</span>
          <input
            id="home-tool-search"
            type="search"
            placeholder="Try PDF, JSON, image, percentage…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQuery("");
            }}
            autoComplete="off"
          />
          <span className="sr-only">Search tools</span>
        </label>
      </section>
      {query.trim() ? (
        <section className="search-results">
          <h2 role="status">{matches.length} matching tools</h2>
          <div className="tools-grid">
            {matches.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
          {!matches.length && (
            <div className="empty-state">
              <p>Try another name or a category such as PDF.</p>
              <button className="btn-secondary" onClick={() => setQuery("")}>
                Clear search
              </button>
            </div>
          )}
        </section>
      ) : (
        <>
          <Reveal>
            <section className="landing-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">01 / FIND YOUR FOCUS</span>
                  <h2>A workspace for every kind of task.</h2>
                </div>
                <Link to="/all-tools">All categories ↗</Link>
              </div>
              <div className="category-discovery">
                {areas.map((category) => {
                  const design = getCategoryDesign(category);
                  return (
                    <Link
                      to={"/all-tools?category=" + category}
                      key={category}
                      data-tone={design.tone}
                    >
                      <span className="category-mark" aria-hidden="true">
                        {design.mark}
                      </span>
                      <h3>{design.label}</h3>
                      <p>
                        {tools.filter((t) => t.category === category).length}{" "}
                        tools to explore <span aria-hidden="true">↗</span>
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          </Reveal>
          <Reveal>
            <section className="landing-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">02 / START SOMETHING USEFUL</span>
                  <h2>Small tools. Real work done.</h2>
                </div>
                <Link to="/all-tools">Browse all {tools.length} ↗</Link>
              </div>
              <div className="tools-grid">
                {featured.map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
              </div>
            </section>
          </Reveal>
        </>
      )}
      <Reveal>
        <section
          className="benefit-grid landing-section"
          aria-label="How the toolkit helps"
        >
          <div>
            <span className="eyebrow">DESIGNED TO GET OUT OF YOUR WAY</span>
            <h2>
              From task
              <br />
              to next step.
            </h2>
            <p>
              Open a utility, work with your input, and check the result. No
              dashboard to learn first.
            </p>
          </div>
          <article>
            <span>01</span>
            <h3>Start in your browser</h3>
            <p>
              No account setup for the current catalog. Each tool explains what
              it accepts and produces.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Understand the output</h3>
            <p>
              Dedicated guides cover examples, processing details and
              limitations. Know what a result can tell you.
            </p>
            <Link to="/privacy-policy">Read about data handling ↗</Link>
          </article>
        </section>
      </Reveal>
      <Reveal>
        <section className="editorial-feature landing-section">
          <div className="editorial-art" aria-hidden="true">
            <span>
              THE
              <br />
              HGS
              <br />
              <em>FIELD GUIDE</em>
            </span>
            <i />
          </div>
          <div>
            <span className="eyebrow">03 / KNOW YOUR TOOLS</span>
            <h2>
              A little understanding.
              <br />A better result.
            </h2>
            <p>
              Explore {getAllBlogs().length} articles covering practical
              workflows, examples and the details worth checking before you use
              an output.
            </p>
            <div className="hero-actions">
              <Link className="btn-primary" to="/blog/huzaifa-tools-guide">
                Read the complete guide ↗
              </Link>
              <Link to="/blog">Explore the journal</Link>
            </div>
          </div>
        </section>
      </Reveal>
      <section className="final-cta">
        <span className="eyebrow">MADE BY HUZAIFA GROUP OF SOFTWARE</span>
        <h2>What will you get done today?</h2>
        <Link to="/all-tools" className="btn-primary">
          Open your toolkit ↗
        </Link>
      </section>
    </Layout>
  );
}
