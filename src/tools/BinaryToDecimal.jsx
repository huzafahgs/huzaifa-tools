import { useState } from "react";
import "../styles/Tool.css";

export default function BinaryToDecimal() {
  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState("");

  const convert = () => {
    if (!binary) return;
    try {
      const dec = parseInt(binary, 2);
      setDecimal(dec.toString());
    } catch (e) {
      alert("Invalid binary");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(decimal);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>⚙️ Binary to Decimal</h1>
        <p>Convert binary to decimal</p>
      </div>

      <input
        type="text"
        value={binary}
        onChange={(e) => setBinary(e.target.value)}
        placeholder="Enter binary (e.g., 1010)"
        className="tool-input"
      />

      <button className="tool-button" onClick={convert} style={{width: "100%", marginBottom: "30px"}}>
        Convert
      </button>

      {decimal && (
        <div className="output-box">
          <div className="output-label">Decimal Value:</div>
          <div style={{fontSize: "28px", fontWeight: "bold", color: "gold"}}>
            {decimal}
          </div>
          <button className="tool-button-secondary" onClick={copy} style={{marginTop: "15px", width: "100%"}}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
