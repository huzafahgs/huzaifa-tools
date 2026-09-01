import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function HTMLEntityConverter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = "HTML Entity Encoder Decoder - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Encode and decode HTML entities for safe web content and markup.");
  }, []);

  const encode = () => {
    if (!text.trim()) {
      setError("Enter text before encoding.");
      setResult("");
      return;
    }
    setError("");
    setStatus("HTML entities encoded.");
    setResult(text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"));
  };

  const decode = () => {
    if (!text.trim()) {
      setError("Enter HTML entities before decoding.");
      setResult("");
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    setError("");
    setStatus("HTML entities decoded.");
    setResult(textarea.value);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setStatus("Copied to clipboard.");
    } catch {
      setError("Clipboard access is not available.");
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>&amp;; HTML Entity Encoder/Decoder</h1><p>Encode and decode HTML entities instantly</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}
      <label htmlFor="entity-input" className="output-label">Text or HTML entities</label>
      <textarea id="entity-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text or entities..." className="tool-textarea" />
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px"}}>
        <button className="tool-button" onClick={encode}>Encode</button>
        <button className="tool-button" onClick={decode}>Decode</button>
      </div>
      {result && <div className="output-box" aria-live="polite" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}><div className="output-label">Result</div>{result}<button className="tool-button-secondary" onClick={copy} style={{width: "100%", marginTop: "15px"}}>Copy Result</button></div>}
    </div>
  );
}
