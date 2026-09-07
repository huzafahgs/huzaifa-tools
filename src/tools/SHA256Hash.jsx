import { useState } from "react";
import { digestText } from './batch/textDigest';
import "../styles/Tool.css";

export default function SHA256Hash() {
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no hash to copy yet.");
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
    setLoadingAction("generate");
    setError("");
    setStatus("");
    setHash("");
    try {
      setHash(await digestText('SHA-256', text));
      setStatus("SHA-256 digest generated from the exact UTF-8 text.");
    } catch (e) { setError(e.message); }
    finally { setLoadingAction(""); }
  };

  const copy = async () => {
    setLoadingAction("copy");
    setError("");
    setStatus("");
    try {
      await copyToClipboard(hash);
      setStatus("Hash copied to clipboard.");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <div className="tool-container" aria-busy={loadingAction ? "true" : "false"}>
      <div className="tool-header">
        <h1>🔐 SHA256 Hash Generator</h1>
        <p>Generate a SHA-256 digest of UTF-8 text using the browser's Web Crypto API.</p>
      </div>

      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}

      <label htmlFor="sha256-input" className="output-label">
        Text to hash
      </label>
      <textarea
        id="sha256-input"
        value={text}
        maxLength={1000000}
        disabled={Boolean(loadingAction)}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
          setStatus("");
          setHash("");
        }}
        placeholder="Enter text to hash..."
        className="tool-textarea"
      />

      <button className="tool-button" onClick={generate} disabled={Boolean(loadingAction)} style={{width: "100%", marginBottom: "30px"}}>
        {loadingAction === "generate" ? "Generating..." : "Generate SHA256 Hash"}
      </button>

      {hash && (
        <div className="output-box" aria-live="polite">
          <div className="output-label">SHA256 Hash:</div>
          <div style={{wordBreak: "break-all", fontFamily: "monospace", marginBottom: "15px", fontSize: "12px"}}>
            {hash}
          </div>
          <button className="tool-button-secondary" onClick={copy} disabled={Boolean(loadingAction)} style={{width: "100%"}}>
            {loadingAction === "copy" ? "Copying..." : "Copy Hash"}
          </button>
        </div>
      )}

      <div style={{marginTop: "30px", padding: "15px", background: "#0a0d1a", borderRadius: "8px", fontSize: "12px", color: "#aaa"}}>
        <p><strong>Note:</strong> Processing stays in this browser. Whitespace and newlines are included; empty input hashes the empty string. This hashes text, not uploaded file bytes. A plain SHA-256 digest is not a password-storage scheme and does not authenticate a sender.</p>
      </div>
    </div>
  );
}
