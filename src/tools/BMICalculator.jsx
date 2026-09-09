import { useState } from "react";
import { bmiValue } from "./calculationMath";
import "../styles/Tool.css";
export default function BMICalculator() {
  const [weight, setWeight] = useState(""),
    [height, setHeight] = useState(""),
    [unit, setUnit] = useState("metric"),
    [result, setResult] = useState(null),
    [error, setError] = useState("");
  const clear = () => {
    setResult(null);
    setError("");
  };
  const calculate = (e) => {
    e.preventDefault();
    try {
      setResult(bmiValue(weight, height, unit));
      setError("");
    } catch (e) {
      setResult(null);
      setError(e.message);
    }
  };
  const category =
    result < 18.5
      ? "Underweight"
      : result < 25
        ? "Normal weight"
        : result < 30
          ? "Overweight"
          : "Obese";
  return (
    <div className="tool-container">
      <header className="tool-header">
        <h1>BMI Calculator</h1>
        <p>Calculate an adult screening estimate from weight and height.</p>
      </header>
      <form onSubmit={calculate}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="bmi-unit">Unit system</label>
            <select
              id="bmi-unit"
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
                setWeight("");
                setHeight("");
                clear();
              }}
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, inches)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="bmi-weight">
              Weight ({unit === "metric" ? "kg" : "lbs"})
            </label>
            <input
              id="bmi-weight"
              type="number"
              step="any"
              min="0.01"
              required
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                clear();
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bmi-height">
              Height ({unit === "metric" ? "cm" : "inches"})
            </label>
            <input
              id="bmi-height"
              type="number"
              step="any"
              min="0.01"
              required
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                clear();
              }}
            />
          </div>
        </div>
        <button className="tool-button" type="submit">
          Calculate BMI
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
      {result !== null && (
        <div className="result-box" role="status">
          <div className="result-item">
            <span className="result-label">BMI</span>
            <span className="result-value">{result.toFixed(1)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Adult screening category</span>
            <span className="result-value">{category}</span>
          </div>
        </div>
      )}
      <p className="tool-help-note">
        BMI is a screening measure, not a diagnosis. This calculator does not
        use age-specific growth charts or assess individual clinical
        circumstances. Switching units clears the measurements so values are not
        silently reinterpreted.
      </p>
    </div>
  );
}
