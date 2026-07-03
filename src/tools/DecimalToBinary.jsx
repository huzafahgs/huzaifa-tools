import { useState } from "react";
import "../styles/Tool.css";

export default function DecimalToBinary() {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");

  const convert = () => {
    if (!decimal) return;
    try {
      const bin = parseInt(decimal).toString(2);
      setBinary(bin);
    } catch (e) {
      alert("Invalid number");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(binary);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>01️⃣ Decimal to Binary</h1>
        <p>Convert decimal to binary</p>
      </div>

      <input
        type="number"
        value={decimal}
        onChange={(e) => setDecimal(e.target.value)}
        placeholder="Enter decimal number"
        className="tool-input"
      />

      <button className="tool-button" onClick={convert} style={{width: "100%", marginBottom: "30px"}}>
        Convert
      </button>

      {binary && (
        <div className="output-box">
          <div className="output-label">Binary Value:</div>
          <div style={{fontSize: "20px", fontWeight: "bold", color: "gold", wordBreak: "break-all"}}>
            {binary}
          </div>
          <button className="tool-button-secondary" onClick={copy} style={{marginTop: "15px", width: "100%"}}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
