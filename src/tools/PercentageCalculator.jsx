import { useState } from "react";
import "../styles/Tool.css";

export default function PercentageCalculator() {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [type, setType] = useState("percentage");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!value || !percentage) {
      alert("Please fill all fields!");
      return;
    }

    const v = parseFloat(value);
    const p = parseFloat(percentage);

    let res = {};
    
    if (type === "percentage") {
      res = {
        value: ((p / 100) * v).toFixed(2),
        description: `${p}% of ${v}`
      };
    } else if (type === "increase") {
      res = {
        value: (v + (p / 100) * v).toFixed(2),
        description: `${v} increased by ${p}%`
      };
    } else if (type === "decrease") {
      res = {
        value: (v - (p / 100) * v).toFixed(2),
        description: `${v} decreased by ${p}%`
      };
    } else if (type === "percent-of") {
      res = {
        value: ((p / v) * 100).toFixed(2) + "%",
        description: `${p} is what % of ${v}`
      };
    }

    setResult(res);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📊 Percentage Calculator</h1>
        <p>Calculate percentages in multiple ways</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Calculation Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="percentage">Calculate Percentage</option>
            <option value="increase">Percentage Increase</option>
            <option value="decrease">Percentage Decrease</option>
            <option value="percent-of">What Percent Of</option>
          </select>
        </div>
        <div className="form-group">
          <label>Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>
        <div className="form-group">
          <label>{type === "percent-of" ? "Number" : "Percentage"}</label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Enter percentage"
            step="0.01"
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
        Calculate
      </button>

      {result && (
        <div className="output-box">
          <div className="output-label">{result.description}</div>
          <div style={{fontSize: "28px", fontWeight: "bold", color: "gold", marginTop: "10px"}}>
            {result.value}
          </div>
        </div>
      )}
    </div>
  );
}
