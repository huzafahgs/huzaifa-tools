import { useState } from "react";
import "../styles/Tool.css";

export default function URLSlugGenerator() {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no slug to copy yet.");
    }

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (!copied) {
      throw new Error("Clipboard access is not available in this browser.");
    }
  };

  const generate = async () => {
    if (!text.trim()) {
      setError("Enter text before generating a slug.");
      setStatus("");
      setSlug("");
      return;
    }

    setLoadingAction("generate");
    setError("");
    setStatus("");
    const generated = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    if (!generated) {
      setSlug("");
      setError("Enter text with letters or numbers to create a slug.");
      setLoadingAction("");
      return;
    }

    setSlug(generated);
    setStatus("Slug generated successfully.");
    setLoadingAction("");
  };

  const copy = async () => {
    setLoadingAction("copy");
    setError("");
    setStatus("");
    try {
      await copyToClipboard(slug);
      setStatus("Copied to clipboard.");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <div className="tool-container" aria-busy={loadingAction ? "true" : "false"}>
      <div className="tool-header">
        <h1>📎 URL Slug Generator</h1>
        <p>Generate URL-friendly slugs</p>
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      {status && (
        <div className="success-message" role="status" aria-live="polite">
          {status}
        </div>
      )}

      <label htmlFor="slug-input" className="output-label">
        Text to convert
      </label>
      <textarea
        id="slug-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
          setStatus("");
        }}
        placeholder="Enter your text here..."
        className="tool-textarea"
        aria-describedby="slug-help"
      />
      <p id="slug-help" style={{ color: "#aaa", marginTop: "-20px", marginBottom: "20px" }}>
        Spaces become hyphens and symbols are removed.
      </p>

      <button className="tool-button" onClick={generate} disabled={Boolean(loadingAction)} style={{width: "100%", marginBottom: "30px"}}>
        {loadingAction === "generate" ? "Generating..." : "Generate Slug"}
      </button>

      {slug && (
        <div className="output-box" aria-live="polite" style={{overflowWrap: "anywhere"}}>
          <div className="output-label">Generated Slug:</div>
          {slug}
          <button className="tool-button-secondary" onClick={copy} disabled={Boolean(loadingAction)} style={{marginTop: "15px", width: "100%"}}>
            {loadingAction === "copy" ? "Copying..." : "Copy Slug"}
          </button>
        </div>
      )}
    </div>
  );
}
