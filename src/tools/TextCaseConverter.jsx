import { useState } from "react";
import "../styles/Tool.css";

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const conversions = {
    uppercase: (t) => t.toUpperCase(),
    lowercase: (t) => t.toLowerCase(),
    capitalize: (t) => t.replace(/\b\w/g, (char) => char.toUpperCase()),
    alternating: (t) => t.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join(''),
    sentence: (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(),
    inverse: (t) => t.split('').map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('')
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

  const convert = async (type) => {
    if (!text.trim()) {
      setError("Enter text before converting case.");
      setStatus("");
      setResult("");
      return;
    }

    setLoadingAction(type);
    setError("");
    setStatus("");
    try {
      setResult(conversions[type](text));
      setStatus("Text converted successfully.");
    } catch (e) {
      setResult("");
      setError(e.message);
    } finally {
      setLoadingAction("");
    }
  };

  const copyResult = async () => {
    setLoadingAction("copy");
    setError("");
    setStatus("");
    try {
      await copyToClipboard(result);
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
        <h1>🔠 Text Case Converter</h1>
        <p>Convert text between different cases</p>
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

      <label htmlFor="case-converter-input" className="output-label">
        Text to convert
      </label>
      <textarea
        id="case-converter-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
          setStatus("");
        }}
        placeholder="Enter your text here..."
        className="tool-textarea"
      />

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px", marginBottom: "30px"}}>
        <button className="tool-button" onClick={() => convert('uppercase')} disabled={Boolean(loadingAction)}>UPPERCASE</button>
        <button className="tool-button" onClick={() => convert('lowercase')} disabled={Boolean(loadingAction)}>lowercase</button>
        <button className="tool-button" onClick={() => convert('capitalize')} disabled={Boolean(loadingAction)}>Capitalize Words</button>
        <button className="tool-button" onClick={() => convert('alternating')} disabled={Boolean(loadingAction)}>aLtErNaTiNg</button>
        <button className="tool-button" onClick={() => convert('sentence')} disabled={Boolean(loadingAction)}>Sentence case</button>
        <button className="tool-button" onClick={() => convert('inverse')} disabled={Boolean(loadingAction)}>InVeRsE cAsE</button>
      </div>

      {result && (
        <div className="output-box" aria-live="polite" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>
          <div className="output-label">Result:</div>
          {result}
          <button className="tool-button-secondary" onClick={copyResult} disabled={Boolean(loadingAction)} style={{marginTop: "15px", width: "100%"}}>
            {loadingAction === "copy" ? "Copying..." : "Copy Result"}
          </button>
        </div>
      )}
    </div>
  );
}
