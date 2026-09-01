import { useState } from "react";
import "../styles/Tool.css";

export default function BinaryToDecimal() {
  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no decimal value to copy yet.");
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

  const convert = async () => {
    const value = binary.trim();
    if (!value) {
      setError("Enter a binary number before converting.");
      setStatus("");
      setDecimal("");
      return;
    }

    if (!/^-?[01]+$/.test(value)) {
      setError("Enter a valid binary number using only 0 and 1.");
      setStatus("");
      setDecimal("");
      return;
    }

    setLoadingAction("convert");
    setError("");
    setStatus("");
    try {
      const dec = parseInt(value, 2);
      if (!Number.isSafeInteger(dec)) {
        throw new Error("Number is too large to convert safely.");
      }

      setDecimal(dec.toString());
      setStatus("Binary converted to decimal.");
    } catch (e) {
      setDecimal("");
      setError(e.message);
    } finally {
      setLoadingAction("");
    }
  };

  const copy = async () => {
    setLoadingAction("copy");
    setError("");
    setStatus("");
    try {
      await copyToClipboard(decimal);
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
        <h1>⚙️ Binary to Decimal</h1>
        <p>Convert binary to decimal</p>
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

      <label htmlFor="binary-input" className="output-label">
        Binary number
      </label>
      <input
        id="binary-input"
        type="text"
        inputMode="numeric"
        value={binary}
        onChange={(e) => {
          setBinary(e.target.value);
          setError("");
          setStatus("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            convert();
          }
        }}
        placeholder="Enter binary (e.g., 1010)"
        className="tool-input"
        aria-describedby="binary-help"
      />
      <p id="binary-help" style={{ color: "#aaa", marginTop: "-10px", marginBottom: "20px" }}>
        Use only 0 and 1.
      </p>

      <button className="tool-button" onClick={convert} disabled={Boolean(loadingAction)} title="Convert binary to decimal" style={{width: "100%", marginBottom: "30px"}}>
        {loadingAction === "convert" ? "Converting..." : "Convert"}
      </button>

      {decimal && (
        <div className="output-box" aria-live="polite" style={{overflowWrap: "anywhere"}}>
          <div className="output-label">Decimal Value:</div>
          <div style={{fontSize: "28px", fontWeight: "bold", color: "gold"}}>
            {decimal}
          </div>
          <button className="tool-button-secondary" onClick={copy} disabled={Boolean(loadingAction)} title="Copy decimal value" style={{marginTop: "15px", width: "100%"}}>
            {loadingAction === "copy" ? "Copying..." : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
