import { useState } from "react";
import "../styles/Tool.css";

export default function ColorPicker() {
  const [color, setColor] = useState("#ffd700");
  const [rgb, setRgb] = useState("255, 215, 0");
  const [hsl, setHsl] = useState("48, 100%, 50%");

  const handleColorChange = (newColor) => {
    setColor(newColor);
    updateColorFormats(newColor);
  };

  const updateColorFormats = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    setRgb(`${r}, ${g}, ${b}`);

    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const l = (max + min) / 2;

    let h = 0;
    let s = 0;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case rNorm:
          h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
          break;
        case gNorm:
          h = ((bNorm - rNorm) / d + 2) / 6;
          break;
        case bNorm:
          h = ((rNorm - gNorm) / d + 4) / 6;
          break;
        default:
          break;
      }
    }

    setHsl(`${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`);
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🎨 Color Picker</h1>
        <p>Pick and convert colors</p>
      </div>

      <div className="color-display" style={{backgroundColor: color}}></div>

      <input
        type="color"
        value={color}
        onChange={(e) => handleColorChange(e.target.value)}
        style={{width: "100%", height: "100px", border: "none", borderRadius: "10px", cursor: "pointer", marginBottom: "30px"}}
      />

      <div className="color-code-box">
        <div className="color-code">
          <span>HEX:</span>
          <span className="value">{color}</span>
          <button className="tool-button-secondary" onClick={() => copy(color)}>Copy</button>
        </div>
        <div className="color-code">
          <span>RGB:</span>
          <span className="value">rgb({rgb})</span>
          <button className="tool-button-secondary" onClick={() => copy(`rgb(${rgb})`)}>Copy</button>
        </div>
        <div className="color-code">
          <span>HSL:</span>
          <span className="value">hsl({hsl})</span>
          <button className="tool-button-secondary" onClick={() => copy(`hsl(${hsl})`)}>Copy</button>
        </div>
      </div>
    </div>
  );
}
