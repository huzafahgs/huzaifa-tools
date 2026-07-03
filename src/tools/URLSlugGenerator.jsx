import { useState } from "react";
import "../styles/Tool.css";

export default function URLSlugGenerator() {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");

  const generate = () => {
    const generated = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setSlug(generated);
  };

  const copy = () => {
    navigator.clipboard.writeText(slug);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📎 URL Slug Generator</h1>
        <p>Generate URL-friendly slugs</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        className="tool-textarea"
      />

      <button className="tool-button" onClick={generate} style={{width: "100%", marginBottom: "30px"}}>
        Generate Slug
      </button>

      {slug && (
        <div className="output-box">
          <div className="output-label">Generated Slug:</div>
          {slug}
          <button className="tool-button-secondary" onClick={copy} style={{marginTop: "15px", width: "100%"}}>
            Copy Slug
          </button>
        </div>
      )}
    </div>
  );
}
