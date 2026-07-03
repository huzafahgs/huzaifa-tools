import { useState } from "react";
import "../styles/Tool.css";

export default function SHA256Hash() {
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");

  const generate = () => {
    if (!text) {
      alert("Please enter text!");
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    let hashValue = 0;
    for (let i = 0; i < data.length; i++) {
      hashValue = ((hashValue << 5) - hashValue) + data[i];
      hashValue = hashValue & hashValue;
    }
    setHash(Math.abs(hashValue).toString(16).padStart(64, '0'));
  };

  const copy = () => {
    navigator.clipboard.writeText(hash);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔐 SHA256 Hash Generator</h1>
        <p>Generate SHA256 hashes (demonstration only)</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to hash..."
        className="tool-textarea"
      />

      <button className="tool-button" onClick={generate} style={{width: "100%", marginBottom: "30px"}}>
        Generate SHA256 Hash
      </button>

      {hash && (
        <div className="output-box">
          <div className="output-label">SHA256 Hash:</div>
          <div style={{wordBreak: "break-all", fontFamily: "monospace", marginBottom: "15px", fontSize: "12px"}}>
            {hash}
          </div>
          <button className="tool-button-secondary" onClick={copy} style={{width: "100%"}}>
            Copy Hash
          </button>
        </div>
      )}

      <div style={{marginTop: "30px", padding: "15px", background: "#0a0d1a", borderRadius: "8px", fontSize: "12px", color: "#aaa"}}>
        <p><strong>Note:</strong> This is a demonstration hash. For cryptographic purposes, use proper hashing libraries.</p>
      </div>
    </div>
  );
}
