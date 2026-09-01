import { useState } from "react";
import "../styles/Tool.css";

export default function MD5Hash() {
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const toBase64 = (value) => {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  };

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
    if (!text.trim()) {
      setError("Enter text before generating a hash.");
      setStatus("");
      setHash("");
      return;
    }

    setLoadingAction("generate");
    setError("");
    setStatus("");
    const result = toBase64(text).split('').reduce((hash, char) => {
      return ((hash << 5) - hash) + char.charCodeAt(0);
    }, 0).toString(16);
    setHash(result);
    setStatus("Demo MD5 hash generated.");
    setLoadingAction("");
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
        <h1>🔒 MD5 Hash Generator</h1>
        <p>Generate MD5 hashes (demonstration only)</p>
      </div>

      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}

      <label htmlFor="md5-input" className="output-label">
        Text to hash
      </label>
      <textarea
        id="md5-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
          setStatus("");
        }}
        placeholder="Enter text to hash..."
        className="tool-textarea"
      />

      <button className="tool-button" onClick={generate} disabled={Boolean(loadingAction)} style={{width: "100%", marginBottom: "30px"}}>
        {loadingAction === "generate" ? "Generating..." : "Generate MD5 Hash"}
      </button>

      {hash && (
        <div className="output-box" aria-live="polite">
          <div className="output-label">MD5 Hash:</div>
          <div style={{wordBreak: "break-all", fontFamily: "monospace", marginBottom: "15px"}}>
            {hash}
          </div>
          <button className="tool-button-secondary" onClick={copy} disabled={Boolean(loadingAction)} style={{width: "100%"}}>
            {loadingAction === "copy" ? "Copying..." : "Copy Hash"}
          </button>
        </div>
      )}

      <div style={{marginTop: "30px", padding: "15px", background: "#0a0d1a", borderRadius: "8px", fontSize: "12px", color: "#aaa"}}>
        <p><strong>Note:</strong> This is a demonstration hash. For cryptographic purposes, use proper hashing libraries.</p>
      </div>
    </div>
  );
}
