import { useState } from "react";
import "../styles/Tool.css";

export default function URLEncoder() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no result to copy yet.");
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

  const encode = async () => {
    if (!text.trim()) {
      setError("Enter a URL or text before encoding.");
      setStatus("");
      setEncoded("");
      setDecoded("");
      return;
    }

    setLoadingAction("encode");
    setError("");
    setStatus("");
    try {
      setEncoded(encodeURIComponent(text));
      setDecoded("");
      setStatus("URL encoded successfully.");
    } catch (e) {
      setEncoded("");
      setError("Error encoding URL: " + e.message);
    } finally {
      setLoadingAction("");
    }
  };

  const decode = async () => {
    if (!text.trim()) {
      setError("Enter an encoded URL before decoding.");
      setStatus("");
      setEncoded("");
      setDecoded("");
      return;
    }

    setLoadingAction("decode");
    setError("");
    setStatus("");
    try {
      setDecoded(decodeURIComponent(text));
      setEncoded("");
      setStatus("URL decoded successfully.");
    } catch (e) {
      setDecoded("");
      setError("Enter a valid encoded URL. " + e.message);
    } finally {
      setLoadingAction("");
    }
  };

  const copy = async (value) => {
    setError("");
    setStatus("");
    setLoadingAction("copy");
    try {
      await copyToClipboard(value);
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
        <h1>🔗 URL Encoder/Decoder</h1>
        <p>Encode and decode URLs</p>
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

      <label htmlFor="url-input" className="output-label">
        URL or text
      </label>
      <textarea
        id="url-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
          setStatus("");
        }}
        placeholder="Enter URL or text..."
        className="tool-textarea"
        aria-describedby="url-help"
      />
      <p id="url-help" style={{ color: "#aaa", marginTop: "-20px", marginBottom: "20px" }}>
        Decode requires valid percent-encoded text.
      </p>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px", marginBottom: "30px"}}>
        <button className="tool-button" onClick={encode} disabled={Boolean(loadingAction)}>
          {loadingAction === "encode" ? "Encoding..." : "Encode URL"}
        </button>
        <button className="tool-button" onClick={decode} disabled={Boolean(loadingAction)}>
          {loadingAction === "decode" ? "Decoding..." : "Decode URL"}
        </button>
      </div>

      <div className="tool-two-column">
        {encoded && (
          <div className="output-box" aria-live="polite" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>
            <div className="output-label">Encoded URL:</div>
            {encoded}
            <button className="tool-button-secondary" onClick={() => copy(encoded)} disabled={Boolean(loadingAction)} style={{marginTop: "15px", width: "100%"}}>
              {loadingAction === "copy" ? "Copying..." : "Copy"}
            </button>
          </div>
        )}
        {decoded && (
          <div className="output-box" aria-live="polite" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>
            <div className="output-label">Decoded URL:</div>
            {decoded}
            <button className="tool-button-secondary" onClick={() => copy(decoded)} disabled={Boolean(loadingAction)} style={{marginTop: "15px", width: "100%"}}>
              {loadingAction === "copy" ? "Copying..." : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
