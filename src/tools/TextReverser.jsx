import { useState } from "react";
import "../styles/Tool.css";

export default function TextReverser() {
  const [text, setText] = useState("");
  const [reversed, setReversed] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no reversed text to copy yet.");
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

  const runReverse = async (action, transform, successMessage) => {
    if (!text.trim()) {
      setError("Enter text before reversing.");
      setStatus("");
      setReversed("");
      return;
    }

    setLoadingAction(action);
    setError("");
    setStatus("");
    try {
      setReversed(transform(text));
      setStatus(successMessage);
    } catch (e) {
      setReversed("");
      setError(e.message);
    } finally {
      setLoadingAction("");
    }
  };

  const reverse = () => {
    runReverse("characters", (value) => Array.from(value).reverse().join(""), "Characters reversed.");
  };

  const reverseWords = () => {
    runReverse("words", (value) => value.split(" ").reverse().join(" "), "Words reversed.");
  };

  const reverseParagraphs = () => {
    runReverse("paragraphs", (value) => value.split("\n").reverse().join("\n"), "Paragraphs reversed.");
  };

  const copy = async () => {
    setLoadingAction("copy");
    setError("");
    setStatus("");
    try {
      await copyToClipboard(reversed);
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
        <h1>↩️ Text Reverser</h1>
        <p>Reverse text in different ways</p>
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

      <label htmlFor="reverse-input" className="output-label">
        Text to reverse
      </label>
      <textarea
        id="reverse-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
          setStatus("");
        }}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            reverse();
          }
        }}
        placeholder="Enter your text here..."
        className="tool-textarea"
        aria-describedby="reverse-help"
      />
      <p id="reverse-help" style={{ color: "#aaa", marginTop: "-20px", marginBottom: "20px" }}>
        Press Ctrl+Enter to reverse characters.
      </p>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "10px", marginBottom: "30px"}}>
        <button className="tool-button" onClick={reverse} disabled={Boolean(loadingAction)} title="Reverse characters">
          {loadingAction === "characters" ? "Reversing..." : "Reverse Characters"}
        </button>
        <button className="tool-button" onClick={reverseWords} disabled={Boolean(loadingAction)} title="Reverse word order">
          {loadingAction === "words" ? "Reversing..." : "Reverse Words"}
        </button>
        <button className="tool-button" onClick={reverseParagraphs} disabled={Boolean(loadingAction)} title="Reverse paragraph order">
          {loadingAction === "paragraphs" ? "Reversing..." : "Reverse Paragraphs"}
        </button>
      </div>

      {reversed && (
        <div className="output-box" aria-live="polite" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>
          <div className="output-label">Reversed Text:</div>
          {reversed}
          <button className="tool-button-secondary" onClick={copy} disabled={Boolean(loadingAction)} title="Copy reversed text" style={{marginTop: "15px", width: "100%"}}>
            {loadingAction === "copy" ? "Copying..." : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
