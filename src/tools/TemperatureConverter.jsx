import { useState } from "react";
import "../styles/Tool.css";

export default function TemperatureConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("celsius");
  const [results, setResults] = useState({});

  const convert = () => {
    if (!value) return;

    const v = parseFloat(value);
    let celsius;

    if (fromUnit === "celsius") {
      celsius = v;
    } else if (fromUnit === "fahrenheit") {
      celsius = (v - 32) * (5 / 9);
    } else {
      celsius = v - 273.15;
    }

    setResults({
      celsius: celsius.toFixed(2),
      fahrenheit: (celsius * 9/5 + 32).toFixed(2),
      kelvin: (celsius + 273.15).toFixed(2)
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🌡️ Temperature Converter</h1>
        <p>Convert between C, F, and K</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter temperature"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>From</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
            <option value="kelvin">Kelvin (K)</option>
          </select>
        </div>
      </div>

      <button className="tool-button" onClick={convert} style={{width: "100%", marginBottom: "30px"}}>
        Convert
      </button>

      {Object.keys(results).length > 0 && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Celsius</span>
            <span className="result-value">{results.celsius}°C</span>
          </div>
          <div className="result-item">
            <span className="result-label">Fahrenheit</span>
            <span className="result-value">{results.fahrenheit}°F</span>
          </div>
          <div className="result-item">
            <span className="result-label">Kelvin</span>
            <span className="result-value">{results.kelvin}K</span>
          </div>
        </div>
      )}
    </div>
  );
}
