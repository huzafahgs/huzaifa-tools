import { useState } from "react";
import "../styles/Tool.css";
import { convertUnit, groupForUnit, UNIT_GROUPS } from "./unitConversion";

export default function UnitConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [result, setResult] = useState("");

  const category = groupForUnit(fromUnit);
  const compatibleUnits = UNIT_GROUPS[category];

  const changeFromUnit = (nextUnit) => {
    const nextUnits = UNIT_GROUPS[groupForUnit(nextUnit)];
    setFromUnit(nextUnit);
    setToUnit(nextUnits.find((unit) => unit !== nextUnit) || nextUnit);
    setResult("");
  };

  const convert = () => {
    if (value === "") return;
    const converted = convertUnit(value, fromUnit, toUnit);
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
        id="unit-value"
        aria-label="Value to convert"
        value={value}
        onChange={(e) => { setValue(e.target.value); setResult(""); }}
        placeholder="Enter value"
        className="tool-input"
      />

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="unit-from">From</label>
          <select id="unit-from" value={fromUnit} onChange={(e) => changeFromUnit(e.target.value)}>
            {Object.entries(UNIT_GROUPS).map(([group, units]) => (
              <optgroup label={group} key={group}>
                {units.map(unit => <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="unit-to">To ({category})</label>
          <select id="unit-to" value={toUnit} onChange={(e) => { setToUnit(e.target.value); setResult(""); }}>
            {compatibleUnits.map(unit => <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>)}
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
