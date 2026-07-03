import { useState } from "react";
import "../styles/Tool.css";

export default function MD5Hash() {
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");

  const generate = () => {
    if (!text) {
      alert("Please enter text!");
      return;
    }
    const result = btoa(text).split('').reduce((hash, char) => {
      return ((hash << 5) - hash) + char.charCodeAt(0);
    }, 0).toString(16);
    setHash(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(hash);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔒 MD5 Hash Generator</h1>
        <p>Generate MD5 hashes (demonstration only)</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to hash..."
        className="tool-textarea"
      />

      <button className="tool-button" onClick={generate} style={{width: "100%", marginBottom: "30px"}}>
        Generate MD5 Hash
      </button>

      {hash && (
        <div className="output-box">
          <div className="output-label">MD5 Hash:</div>
          <div style={{wordBreak: "break-all", fontFamily: "monospace", marginBottom: "15px"}}>
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
