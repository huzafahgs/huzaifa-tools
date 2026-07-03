import { useState } from "react";
import "../styles/Tool.css";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!weight || !height) {
      alert("Please enter both weight and height!");
      return;
    }

    let w = parseFloat(weight);
    let h = parseFloat(height);

    if (unit === "metric") {
      h = h / 100; // Convert cm to m
    } else {
      h = h / 12; // Convert inches to feet
    }

    const bmiValue = unit === "metric" ? w / (h * h) : (w / (h * h)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 25) setCategory("Normal Weight");
    else if (bmiValue < 30) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>⚖️ BMI Calculator</h1>
        <p>Calculate your Body Mass Index</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Unit System</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, inches)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Weight ({unit === "metric" ? "kg" : "lbs"})</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
          />
        </div>
        <div className="form-group">
          <label>Height ({unit === "metric" ? "cm" : "inches"})</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculateBMI} style={{width: "100%", marginBottom: "30px"}}>
        Calculate BMI
      </button>

      {bmi !== null && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Your BMI:</span>
            <span className="result-value">{bmi}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Category:</span>
            <span className="result-value">{category}</span>
          </div>
          <div style={{marginTop: "20px", padding: "15px", background: "#0a0d1a", borderRadius: "8px", fontSize: "12px", color: "#aaa"}}>
            <strong>BMI Categories:</strong>
            <ul style={{marginTop: "10px", marginLeft: "20px"}}>
              <li>Underweight: BMI &lt; 18.5</li>
              <li>Normal Weight: 18.5 - 24.9</li>
              <li>Overweight: 25.0 - 29.9</li>
              <li>Obese: BMI ≥ 30.0</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
