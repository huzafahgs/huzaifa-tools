import { useState } from "react";
import "../styles/Tool.css";

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(1);

  const generateUUIDs = () => {
    const newUUIDs = [];
    for (let i = 0; i < count; i++) {
      newUUIDs.push(generateUUID());
    }
    setUuids(newUUIDs);
  };

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const copy = (id) => {
    navigator.clipboard.writeText(id);
    alert("Copied!");
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    alert("Copied all!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🆔 UUID Generator</h1>
        <p>Generate unique UUIDs</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Number of UUIDs</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="100"
          />
        </div>
      </div>

      <button className="tool-button" onClick={generateUUIDs} style={{width: "100%", marginBottom: "30px"}}>
        Generate UUIDs
      </button>

      {uuids.length > 0 && (
        <div>
          <div style={{marginBottom: "15px"}}>
            <button className="tool-button" onClick={copyAll}>
              Copy All ({uuids.length})
            </button>
          </div>
          <div style={{maxHeight: "400px", overflowY: "auto"}}>
            {uuids.map((id, i) => (
              <div key={i} className="result-item">
                <span className="result-label">UUID {i + 1}</span>
                <span className="result-value" style={{fontSize: "12px", fontFamily: "monospace"}}>{id}</span>
                <button className="tool-button-secondary" onClick={() => copy(id)} style={{padding: "8px 15px", fontSize: "12px"}}>
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
