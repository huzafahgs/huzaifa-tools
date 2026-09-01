import { useState } from "react";
import "../styles/Tool.css";

export default function UnitConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [result, setResult] = useState("");

  const conversionFactors = {
    // Length
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
    // Weight
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.001,
    // Volume
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    cup: 4.22675,
  };

  const groups = {
    Length: ["meter", "kilometer", "centimeter", "millimeter", "mile", "yard", "foot", "inch"],
    Weight: ["kilogram", "gram", "milligram", "pound", "ounce", "ton"],
    Volume: ["liter", "milliliter", "gallon", "quart", "pint", "cup"]
  };

  const convert = () => {
    if (!value) return;
    const converted = (value * conversionFactors[toUnit]) / conversionFactors[fromUnit];
    setResult(converted.toFixed(6));
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📏 Unit Converter</h1>
        <p>Convert between various units</p>
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
            {Object.entries(groups).map(([group, units]) => (
              <optgroup label={group} key={group}>
                {units.map(unit => <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>To</label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {Object.entries(groups).map(([group, units]) => (
              <optgroup label={group} key={group}>
                {units.map(unit => <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>)}
              </optgroup>
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
