import { useState } from "react";
import "../styles/Tool.css";

export default function VolumeConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("liter");
  const [toUnit, setToUnit] = useState("milliliter");
  const [result, setResult] = useState("");

  const conversions = {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    cup: 4.22675,
    fluid_ounce: 33.814,
    cubic_meter: 0.001,
    cubic_centimeter: 1000
  };

  const convert = () => {
    if (!value) return;
    const converted = (value * conversions[toUnit]) / conversions[fromUnit];
    setResult(converted.toFixed(6));
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🥤 Volume Converter</h1>
        <p>Convert between volume units</p>
      </div>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter value"
        className="tool-input"
      />

      <div className="form-grid">
        <div className="form-group">
          <label>From</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {Object.keys(conversions).map(unit => (
              <option key={unit} value={unit}>{unit.replace("_", " ")}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>To</label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {Object.keys(conversions).map(unit => (
              <option key={unit} value={unit}>{unit.replace("_", " ")}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="tool-button" onClick={convert} style={{width: "100%", marginBottom: "30px"}}>
        Convert
      </button>

      {result && (
        <div className="output-box">
          <div className="output-label">Result:</div>
          {value} {fromUnit} = <strong style={{color: "gold"}}>{result}</strong> {toUnit}
        </div>
      )}
    </div>
  );
}
