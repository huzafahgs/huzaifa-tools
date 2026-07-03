import { useState } from "react";
import "../styles/Tool.css";

export default function HexToDecimal() {
  const [hex, setHex] = useState("");
  const [decimal, setDecimal] = useState("");

  const convert = () => {
    try {
      const dec = parseInt(hex, 16);
      setDecimal(dec.toString());
    } catch (e) {
      alert("Invalid hexadecimal");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(decimal);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔀 Hex to Decimal</h1>
        <p>Convert hexadecimal to decimal</p>
      </div>

      <input
        type="text"
        value={hex}
        onChange={(e) => setHex(e.target.value.toUpperCase())}
        placeholder="Enter hexadecimal (e.g., 1A, FF)"
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
