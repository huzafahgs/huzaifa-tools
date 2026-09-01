import { useState } from "react";
import "../styles/Tool.css";

export default function EnergyConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("joule");
  const [toUnit, setToUnit] = useState("kilojoule");
  const [result, setResult] = useState("");

  const conversions = {
    joule: 1,
    kilojoule: 0.001,
    calorie: 0.239006,
    kilocalorie: 0.000239006,
    watt_hour: 0.000277778,
    kilowatt_hour: 0.000000277778,
    electronvolt: 6.242e18,
    btu: 0.000947817
  };

  const convert = () => {
    if (!value) return;
    const converted = (value * conversions[toUnit]) / conversions[fromUnit];
    setResult(converted.toFixed(6));
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>⚡ Energy Converter</h1>
        <p>Convert between energy units</p>
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
              <option key={unit} value={unit}>{unit.replace(/_/g, " ")}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>To</label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {Object.keys(conversions).map(unit => (
              <option key={unit} value={unit}>{unit.replace(/_/g, " ")}</option>
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
