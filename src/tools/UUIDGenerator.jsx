import { useState } from "react";
import "../styles/Tool.css";

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const generateUUIDs = async () => {
    const safeCount = Number(count);
    if (!Number.isInteger(safeCount) || safeCount < 1 || safeCount > 100) {
      setError("Enter a number from 1 to 100.");
      setStatus("");
      setUuids([]);
      return;
    }

    setLoadingAction("generate");
    setError("");
    setStatus("");
    const newUUIDs = [];
    for (let i = 0; i < safeCount; i++) {
      newUUIDs.push(generateUUID());
    }
    setUuids(newUUIDs);
    setStatus(`Generated ${newUUIDs.length} UUID${newUUIDs.length === 1 ? "" : "s"}.`);
    setLoadingAction("");
  };

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no UUID to copy yet.");
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

  const copy = async (id) => {
    setLoadingAction(id);
    setError("");
    setStatus("");
    try {
      await copyToClipboard(id);
      setStatus("UUID copied to clipboard.");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingAction("");
    }
  };

  const copyAll = async () => {
    setLoadingAction("copy-all");
    setError("");
    setStatus("");
    try {
      await copyToClipboard(uuids.join("\n"));
      setStatus("All UUIDs copied to clipboard.");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <div className="tool-container" aria-busy={loadingAction ? "true" : "false"}>
      <div className="tool-header">
        <h1>🆔 UUID Generator</h1>
        <p>Generate unique UUIDs</p>
      </div>

      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="uuid-count">Number of UUIDs</label>
          <input
            id="uuid-count"
            type="number"
            value={count}
            onChange={(e) => {
              setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)));
              setError("");
              setStatus("");
            }}
            min="1"
            max="100"
            aria-describedby="uuid-count-help"
          />
          <p id="uuid-count-help" style={{ color: "#aaa", fontSize: "12px" }}>
            Generate between 1 and 100 UUIDs.
          </p>
        </div>
      </div>

      <button className="tool-button" onClick={generateUUIDs} disabled={Boolean(loadingAction)} style={{width: "100%", marginBottom: "30px"}}>
        {loadingAction === "generate" ? "Generating..." : "Generate UUIDs"}
      </button>

      {uuids.length > 0 && (
        <div>
          <div style={{marginBottom: "15px"}}>
            <button className="tool-button" onClick={copyAll} disabled={Boolean(loadingAction)}>
              {loadingAction === "copy-all" ? "Copying..." : `Copy All (${uuids.length})`}
            </button>
          </div>
          <div aria-live="polite" style={{maxHeight: "400px", overflowY: "auto"}}>
            {uuids.map((id, i) => (
              <div key={id} className="result-item" style={{gap: "12px", flexWrap: "wrap"}}>
                <span className="result-label">UUID {i + 1}</span>
                <span className="result-value" style={{fontSize: "12px", fontFamily: "monospace", overflowWrap: "anywhere"}}>{id}</span>
                <button className="tool-button-secondary" onClick={() => copy(id)} disabled={Boolean(loadingAction)} style={{padding: "8px 15px", fontSize: "12px"}}>
                  {loadingAction === id ? "Copying..." : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
