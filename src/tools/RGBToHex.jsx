import { useState } from "react";
import "../styles/Tool.css";

export default function RGBToHex() {
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(215);
  const [blue, setBlue] = useState(0);
  const [hex, setHex] = useState("#ffd700");

  const updateHex = (r, g, b) => {
    const hexValue = "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("").toUpperCase();
    setHex(hexValue);
  };

  const handleChange = (color, value) => {
    const val = Math.max(0, Math.min(255, parseInt(value) || 0));
    if (color === "r") {
      setRed(val);
      updateHex(val, green, blue);
    } else if (color === "g") {
      setGreen(val);
      updateHex(red, val, blue);
    } else {
      setBlue(val);
      updateHex(red, green, val);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(hex);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🖌️ RGB to Hex Converter</h1>
        <p>Convert RGB colors to hex</p>
      </div>

      <div style={{background: hex, width: "100%", height: "150px", borderRadius: "10px", border: "2px solid gold", marginBottom: "30px"}}></div>

      <div className="form-grid">
        <div className="form-group">
          <label>Red: {red}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={red}
            onChange={(e) => handleChange("r", e.target.value)}
            className="slider-input"
          />
        </div>
        <div className="form-group">
          <label>Green: {green}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={green}
            onChange={(e) => handleChange("g", e.target.value)}
            className="slider-input"
          />
        </div>
        <div className="form-group">
          <label>Blue: {blue}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={blue}
            onChange={(e) => handleChange("b", e.target.value)}
            className="slider-input"
          />
        </div>
      </div>

      <div className="output-box">
        <div className="output-label">Hex Color:</div>
        <div style={{fontSize: "24px", fontWeight: "bold", color: "gold", marginBottom: "15px"}}>
          {hex}
        </div>
        <button className="tool-button-secondary" onClick={copy} style={{width: "100%"}}>
          Copy Hex
        </button>
      </div>
    </div>
  );
}
