import { useState } from "react";
import "../styles/Tool.css";

export default function WeightConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kilogram");
  const [toUnit, setToUnit] = useState("pound");
  const [result, setResult] = useState("");

  const conversions = {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.001,
    stone: 0.157473
  };

  const convert = () => {
    if (!value) return;
    const converted = (value * conversions[toUnit]) / conversions[fromUnit];
    setResult(converted.toFixed(6));
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>⚡ Weight Converter</h1>
        <p>Convert between weight units</p>
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
              <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>To</label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {Object.keys(conversions).map(unit => (
              <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
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
