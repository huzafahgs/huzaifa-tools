import { useState } from "react";
import "../styles/Tool.css";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#050816");
  const [color2, setColor2] = useState("#ffd700");
  const [angle, setAngle] = useState(45);
  const [type, setType] = useState("linear");

  const gradient = type === "linear"
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssCode = `background: ${gradient};`;

  const copy = () => {
    navigator.clipboard.writeText(cssCode);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🌈 Gradient Generator</h1>
        <p>Create beautiful CSS gradients</p>
      </div>

      <div className="gradient-display" style={{background: gradient}}></div>

      <div className="form-grid">
        <div className="form-group">
          <label>Gradient Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>
        <div className="form-group">
          <label>Color 1</label>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            style={{width: "100%", height: "50px", border: "none", borderRadius: "8px", cursor: "pointer"}}
          />
        </div>
        <div className="form-group">
          <label>Color 2</label>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            style={{width: "100%", height: "50px", border: "none", borderRadius: "8px", cursor: "pointer"}}
          />
        </div>
        {type === "linear" && (
          <div className="form-group">
            <label>Angle: {angle}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="slider-input"
            />
          </div>
        )}
      </div>

      <div className="output-box">
        <div className="output-label">CSS Code:</div>
        {cssCode}
        <button className="tool-button-secondary" onClick={copy} style={{marginTop: "15px", width: "100%"}}>
          Copy CSS
        </button>
      </div>
    </div>
  );
}
