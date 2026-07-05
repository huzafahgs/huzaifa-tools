import { useState } from "react";
import "../styles/Tool.css";

export default function CSVToJSON() {
  const [csv, setCSV] = useState("");
  const [json, setJSON] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const parseCsvLine = (line) => {
    const values = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"' && nextChar === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    if (inQuotes) {
      throw new Error("CSV contains an unclosed quoted value.");
    }

    values.push(current.trim());
    return values;
  };

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no JSON output to copy yet.");
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
    if (!csv.trim()) {
      setError("Enter CSV data before converting.");
      setStatus("");
      setJSON("");
      return;
    }

    setLoadingAction("convert");
    try {
      setError("");
      setStatus("");
      const lines = csv.trim().split(/\r?\n/).filter(line => line.trim());
      if (lines.length < 2) {
        setError("CSV must have at least a header row and one data row");
        setJSON("");
        return;
      }

      const headers = parseCsvLine(lines[0]);
      if (headers.some(header => !header)) {
        setError("CSV headers cannot be empty.");
        setJSON("");
        return;
      }

      const data = [];

      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const values = parseCsvLine(lines[i]);
        headers.forEach((header, index) => {
          obj[header] = values[index] || "";
        });
        data.push(obj);
      }

      setJSON(JSON.stringify(data, null, 2));
      setStatus(`Converted ${data.length} row${data.length === 1 ? "" : "s"} to JSON.`);
    } catch (e) {
      setError("Error converting CSV: " + e.message);
      setJSON("");
    } finally {
      setLoadingAction("");
    }
  };

  const copy = async () => {
    setLoadingAction("copy");
    setError("");
    setStatus("");
    try {
      await copyToClipboard(json);
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
        <h1>📊 CSV to JSON</h1>
        <p>Convert CSV data to JSON format</p>
      </div>

      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}

      <div className="tool-two-column">
        <div>
          <label htmlFor="csv-input" style={{display: "block", marginBottom: "10px", color: "gold", fontWeight: "bold"}}>CSV Input</label>
          <textarea
            id="csv-input"
            value={csv}
            onChange={(e) => {
              setCSV(e.target.value);
              setError("");
              setStatus("");
            }}
            placeholder="name,age,city\nJohn,30,NYC\nJane,25,LA"
            className="tool-textarea"
            aria-describedby="csv-help"
            style={{height: "300px"}}
          />
          <p id="csv-help" style={{ color: "#aaa", marginTop: "-20px", marginBottom: "20px" }}>
            First row must contain headers. Quoted comma values are supported.
          </p>
        </div>
        <div>
          <label htmlFor="json-output" style={{display: "block", marginBottom: "10px", color: "gold", fontWeight: "bold"}}>JSON Output</label>
          <textarea
            id="json-output"
            value={json}
            readOnly
            className="tool-textarea"
            aria-live="polite"
            style={{height: "300px", background: "#0a0d1a"}}
          />
        </div>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px"}}>
        <button className="tool-button" onClick={convert} disabled={Boolean(loadingAction)}>
          {loadingAction === "convert" ? "Converting..." : "Convert to JSON"}
        </button>
        <button className="tool-button" onClick={copy} disabled={!json || Boolean(loadingAction)}>
          {loadingAction === "copy" ? "Copying..." : "Copy JSON"}
        </button>
      </div>
    </div>
  );
}
