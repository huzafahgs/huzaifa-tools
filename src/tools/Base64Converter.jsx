import { useState } from "react";
import "../styles/Tool.css";

export default function Base64Converter() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  const encode = () => {
    try {
      setEncoded(btoa(text));
      setDecoded("");
    } catch (e) {
      alert("Error encoding: " + e.message);
    }
  };

  const decodeText = () => {
    try {
      setDecoded(atob(text));
      setEncoded("");
    } catch (e) {
      alert("Error decoding: " + e.message);
    }
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔐 Base64 Encoder/Decoder</h1>
        <p>Encode and decode Base64 strings</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or Base64 string..."
        className="tool-textarea"
      />

      <div style={{display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "30px"}}>
        <button className="tool-button" onClick={encode}>Encode to Base64</button>
        <button className="tool-button" onClick={decodeText}>Decode from Base64</button>
      </div>

      <div className="tool-two-column">
        {encoded && (
          <div className="output-box">
            <div className="output-label">Base64 Encoded:</div>
            {encoded}
            <button className="tool-button-secondary" onClick={() => copy(encoded)} style={{marginTop: "15px", width: "100%"}}>
              Copy
            </button>
          </div>
        )}
        {decoded && (
          <div className="output-box">
            <div className="output-label">Decoded Text:</div>
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
