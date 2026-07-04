import { useState } from "react";
import "../styles/Tool.css";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const parseInput = () => {
    if (!input.trim()) {
      throw new Error("Enter JSON before formatting or minifying.");
    }

    return JSON.parse(input);
  };

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no output to copy yet.");
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

  const format = async () => {
    setLoadingAction("format");
    try {
      setError("");
      setStatus("");
      const parsed = parseInput();
      setOutput(JSON.stringify(parsed, null, 2));
      setStatus("JSON formatted successfully.");
    } catch (e) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    } finally {
      setLoadingAction("");
    }
  };

  const minify = async () => {
    setLoadingAction("minify");
    try {
      setError("");
      setStatus("");
      const parsed = parseInput();
      setOutput(JSON.stringify(parsed));
      setStatus("JSON minified successfully.");
    } catch (e) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    } finally {
      setLoadingAction("");
    }
  };

  const copy = async () => {
    setLoadingAction("copy");
    setError("");
    setStatus("");
    try {
      await copyToClipboard(output);
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
        <h1>{"{ }"} JSON Formatter</h1>
        <p>Format and validate JSON code</p>
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

      <div className="tool-two-column">
        <div>
          <label htmlFor="json-input" style={{display: "block", marginBottom: "10px", color: "gold", fontWeight: "bold"}}>Input JSON</label>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
              setStatus("");
            }}
            placeholder='Enter JSON code...'
            className="tool-textarea"
            aria-describedby="json-help"
            style={{height: "300px"}}
          />
          <p id="json-help" style={{ color: "#aaa", marginTop: "-20px", marginBottom: "20px" }}>
            Paste a valid JSON object, array, string, number, boolean, or null.
          </p>
        </div>
        <div>
          <label htmlFor="json-output" style={{display: "block", marginBottom: "10px", color: "gold", fontWeight: "bold"}}>Output</label>
          <textarea
            id="json-output"
            value={output}
            readOnly
            className="tool-textarea"
            aria-live="polite"
            style={{height: "300px", background: "#0a0d1a"}}
          />
        </div>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px"}}>
        <button className="tool-button" onClick={format} disabled={Boolean(loadingAction)}>
          {loadingAction === "format" ? "Formatting..." : "Format JSON"}
        </button>
        <button className="tool-button" onClick={minify} disabled={Boolean(loadingAction)}>
          {loadingAction === "minify" ? "Minifying..." : "Minify JSON"}
        </button>
        <button className="tool-button" onClick={copy} disabled={!output || Boolean(loadingAction)}>
          {loadingAction === "copy" ? "Copying..." : "Copy Output"}
        </button>
      </div>
    </div>
  );
}
