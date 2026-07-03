import { useState } from "react";
import "../styles/Tool.css";

export default function URLEncoder() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  const encode = () => {
    try {
      setEncoded(encodeURIComponent(text));
      setDecoded("");
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  const decode = () => {
    try {
      setDecoded(decodeURIComponent(text));
      setEncoded("");
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  const copy = (val) => {
    navigator.clipboard.writeText(val);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔗 URL Encoder/Decoder</h1>
        <p>Encode and decode URLs</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter URL or text..."
        className="tool-textarea"
      />

      <div style={{display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "30px"}}>
        <button className="tool-button" onClick={encode}>Encode URL</button>
        <button className="tool-button" onClick={decode}>Decode URL</button>
      </div>

      <div className="tool-two-column">
        {encoded && (
          <div className="output-box">
            <div className="output-label">Encoded URL:</div>
            {encoded}
            <button className="tool-button-secondary" onClick={() => copy(encoded)} style={{marginTop: "15px", width: "100%"}}>
              Copy
            </button>
          </div>
        )}
        {decoded && (
          <div className="output-box">
            <div className="output-label">Decoded URL:</div>
            {decoded}
            <button className="tool-button-secondary" onClick={() => copy(decoded)} style={{marginTop: "15px", width: "100%"}}>
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
