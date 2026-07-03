import { useState } from "react";
import "../styles/Tool.css";

export default function AreaConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("square_meter");
  const [toUnit, setToUnit] = useState("square_kilometer");
  const [result, setResult] = useState("");

  const conversions = {
    square_meter: 1,
    square_kilometer: 0.000001,
    square_centimeter: 10000,
    square_mile: 0.00000038610,
    square_yard: 1.19599,
    square_foot: 10.7639,
    square_inch: 1550,
    hectare: 0.0001,
    acre: 0.000247105
  };

  const convert = () => {
    if (!value) return;
    const converted = (value * conversions[toUnit]) / conversions[fromUnit];
    setResult(converted.toFixed(6));
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔲 Area Converter</h1>
        <p>Convert between area units</p>
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
