import { useState } from "react";
import "../styles/Tool.css";

export default function Base64Converter() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const encodeUnicode = (value) => {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  };

  const decodeUnicode = (value) => {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  };

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
    const value = text.trim();
    if (!value) {
      setError("Enter text before encoding.");
      setStatus("");
      setEncoded("");
      setDecoded("");
      return;
    }

    setLoadingAction("encode");
    setError("");
    setStatus("");
    try {
      setEncoded(encodeUnicode(text));
      setDecoded("");
      setStatus("Text encoded successfully.");
    } catch (e) {
      setEncoded("");
      setError("Error encoding text: " + e.message);
    } finally {
      setLoadingAction("");
    }
  };

  const decodeText = async () => {
    const value = text.trim().replace(/\s/g, "");
    if (!value) {
      setError("Enter a Base64 string before decoding.");
      setStatus("");
      setEncoded("");
      setDecoded("");
      return;
    }

    setLoadingAction("decode");
    setError("");
    setStatus("");
    try {
      setDecoded(decodeUnicode(value));
      setEncoded("");
      setStatus("Base64 decoded successfully.");
    } catch (e) {
      setDecoded("");
      setError("Enter a valid UTF-8 Base64 string. " + e.message);
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
        <h1>🔐 Base64 Encoder/Decoder</h1>
        <p>Encode and decode Base64 strings</p>
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

      <label htmlFor="base64-input" className="output-label">
        Text or Base64 string
      </label>
      <textarea
        id="base64-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
          setStatus("");
        }}
        placeholder="Enter text or Base64 string..."
        className="tool-textarea"
        aria-describedby="base64-help"
      />
      <p id="base64-help" style={{ color: "#aaa", marginTop: "-20px", marginBottom: "20px" }}>
        Unicode text is supported for encoding and decoding.
      </p>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginBottom: "30px"}}>
        <button className="tool-button" onClick={encode} disabled={Boolean(loadingAction)}>
          {loadingAction === "encode" ? "Encoding..." : "Encode to Base64"}
        </button>
        <button className="tool-button" onClick={decodeText} disabled={Boolean(loadingAction)}>
          {loadingAction === "decode" ? "Decoding..." : "Decode from Base64"}
        </button>
      </div>

      <div className="tool-two-column">
        {encoded && (
          <div className="output-box" aria-live="polite" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>
            <div className="output-label">Base64 Encoded:</div>
            {encoded}
            <button className="tool-button-secondary" onClick={() => copy(encoded)} disabled={Boolean(loadingAction)} style={{marginTop: "15px", width: "100%"}}>
              {loadingAction === "copy" ? "Copying..." : "Copy"}
            </button>
          </div>
        )}
        {decoded && (
          <div className="output-box" aria-live="polite" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>
            <div className="output-label">Decoded Text:</div>
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
