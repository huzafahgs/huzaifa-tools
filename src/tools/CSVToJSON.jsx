import { useState } from "react";
import "../styles/Tool.css";

export default function CSVToJSON() {
  const [csv, setCSV] = useState("");
  const [json, setJSON] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      const lines = csv.trim().split("\n");
      if (lines.length < 2) {
        setError("CSV must have at least a header row and one data row");
        return;
      }

      const headers = lines[0].split(",").map(h => h.trim());
      const data = [];

      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const values = lines[i].split(",").map(v => v.trim());
        headers.forEach((header, index) => {
          obj[header] = values[index] || "";
        });
        data.push(obj);
      }

      setJSON(JSON.stringify(data, null, 2));
    } catch (e) {
      setError("Error converting CSV: " + e.message);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(json);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📊 CSV to JSON</h1>
        <p>Convert CSV data to JSON format</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="tool-two-column">
        <div>
          <h3 style={{marginBottom: "10px", color: "gold"}}>CSV Input</h3>
          <textarea
            value={csv}
            onChange={(e) => setCSV(e.target.value)}
            placeholder="name,age,city\nJohn,30,NYC\nJane,25,LA"
            className="tool-textarea"
            style={{height: "300px"}}
          />
        </div>
        <div>
          <h3 style={{marginBottom: "10px", color: "gold"}}>JSON Output</h3>
          <textarea
            value={json}
            readOnly
            className="tool-textarea"
            style={{height: "300px", background: "#0a0d1a"}}
          />
        </div>
      </div>

      <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
        <button className="tool-button" onClick={convert}>Convert to JSON</button>
        <button className="tool-button" onClick={copy} disabled={!json}>Copy JSON</button>
      </div>
    </div>
  );
}
