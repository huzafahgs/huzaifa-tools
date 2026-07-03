import { useState } from "react";
import "../styles/Tool.css";

export default function HexToRGB() {
  const [hex, setHex] = useState("#ffd700");
  const [rgb, setRgb] = useState("255, 215, 0");

  const convert = (hexColor) => {
    setHex(hexColor);
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    setRgb(`${r}, ${g}, ${b}`);
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🎨 Hex to RGB Converter</h1>
        <p>Convert hex colors to RGB</p>
      </div>

      <input
        type="color"
        value={hex}
        onChange={(e) => convert(e.target.value)}
        style={{width: "100%", height: "100px", border: "none", borderRadius: "10px", cursor: "pointer", marginBottom: "30px"}}
      />

      <div className="color-code-box">
        <div className="color-code">
          <span>HEX:</span>
          <span className="value">{hex}</span>
          <button className="tool-button-secondary" onClick={() => copy(hex)}>Copy</button>
        </div>
        <div className="color-code">
          <span>RGB:</span>
          <span className="value">rgb({rgb})</span>
          <button className="tool-button-secondary" onClick={() => copy(`rgb(${rgb})`)}>Copy</button>
        </div>
      </div>
    </div>
  );
}
