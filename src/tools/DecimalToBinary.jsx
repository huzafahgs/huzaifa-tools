import { useState } from "react";
import "../styles/Tool.css";

export default function DecimalToBinary() {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no binary value to copy yet.");
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
    const value = decimal.trim();
    if (!value) {
      setError("Enter a decimal number before converting.");
      setStatus("");
      setBinary("");
      return;
    }

    if (!/^-?\d+$/.test(value)) {
      setError("Enter a valid whole decimal number.");
      setStatus("");
      setBinary("");
      return;
    }

    setLoadingAction("convert");
    setError("");
    setStatus("");
    try {
      const number = Number(value);
      if (!Number.isSafeInteger(number)) {
        throw new Error("Number is too large to convert safely.");
      }

      const bin = number.toString(2);
      setBinary(bin);
      setStatus("Decimal converted to binary.");
    } catch (e) {
      setBinary("");
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
      await copyToClipboard(binary);
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
        <h1>01️⃣ Decimal to Binary</h1>
        <p>Convert decimal to binary</p>
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

      <label htmlFor="decimal-input" className="output-label">
        Decimal number
      </label>
      <input
        id="decimal-input"
        type="text"
        inputMode="numeric"
        value={decimal}
        onChange={(e) => {
          setDecimal(e.target.value);
          setError("");
          setStatus("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            convert();
          }
        }}
        placeholder="Enter decimal number"
        className="tool-input"
        aria-describedby="decimal-help"
      />
      <p id="decimal-help" style={{ color: "#aaa", marginTop: "-10px", marginBottom: "20px" }}>
        Whole numbers are supported.
      </p>

      <button className="tool-button" onClick={convert} disabled={Boolean(loadingAction)} title="Convert decimal to binary" style={{width: "100%", marginBottom: "30px"}}>
        {loadingAction === "convert" ? "Converting..." : "Convert"}
      </button>

      {binary && (
        <div className="output-box" aria-live="polite" style={{overflowWrap: "anywhere"}}>
          <div className="output-label">Binary Value:</div>
          <div style={{fontSize: "20px", fontWeight: "bold", color: "gold", wordBreak: "break-all"}}>
            {binary}
          </div>
          <button className="tool-button-secondary" onClick={copy} disabled={Boolean(loadingAction)} title="Copy binary value" style={{marginTop: "15px", width: "100%"}}>
            {loadingAction === "copy" ? "Copying..." : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
