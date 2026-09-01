import { useState } from "react";
import "../styles/Tool.css";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const charCount = text.length;
  const charCountNoSpace = text.replace(/\s/g, "").length;
  const wordCount = text.trim().split(/\s+/).filter(w => w).length;
  const lineCount = text.split('\n').filter(l => l.trim()).length;

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no text to copy yet.");
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

  const handleCopy = async () => {
    setLoadingAction("copy");
    setError("");
    setStatus("");
    try {
      await copyToClipboard(text);
      setStatus("Text copied to clipboard.");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingAction("");
    }
  };

  const handleClear = () => {
    setText("");
    setError("");
    setStatus("Text cleared.");
  };

  return (
    <div className="tool-container" aria-busy={loadingAction ? "true" : "false"}>
      <div className="tool-header">
        <h1>🔤 Character Counter</h1>
        <p>Count characters, words, and lines in your text</p>
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

      <label htmlFor="character-counter-input" className="output-label">
        Text to count
      </label>
      <textarea
        id="character-counter-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
          setStatus("");
        }}
        placeholder="Enter your text here..."
        className="tool-textarea"
        aria-describedby="character-counter-help"
      />
      <p id="character-counter-help" style={{ color: "#aaa", marginTop: "-20px", marginBottom: "20px" }}>
        Counts update automatically as you type.
      </p>

      <div className="tool-two-column">
        <div>
          <div className="stats-grid" aria-label="Character statistics" style={{gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))"}}>
            <div className="stat-box">
              <div className="stat-value">{charCount}</div>
              <div className="stat-label">Total Chars</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{charCountNoSpace}</div>
              <div className="stat-label">Chars (No Space)</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{wordCount}</div>
              <div className="stat-label">Words</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{lineCount}</div>
              <div className="stat-label">Lines</div>
            </div>
          </div>
        </div>
        <div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginBottom: "20px"}}>
            <button className="tool-button" onClick={handleCopy} disabled={Boolean(loadingAction)}>
              {loadingAction === "copy" ? "Copying..." : "Copy Text"}
            </button>
            <button className="tool-button" onClick={handleClear} disabled={!text || Boolean(loadingAction)}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}
