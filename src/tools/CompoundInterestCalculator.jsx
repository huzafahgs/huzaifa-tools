import { useState } from "react";
import "../styles/Tool.css";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compound, setCompound] = useState("12");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!principal || !rate || !time) {
      alert("Please fill all fields!");
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const n = parseFloat(compound);

    const amount = p * Math.pow(1 + r / 100 / n, n * t);
    const interest = amount - p;

    setResult({
      interest: interest.toFixed(2),
      amount: amount.toFixed(2)
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📈 Compound Interest Calculator</h1>
        <p>Calculate compound interest</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Principal Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter principal"
          />
        </div>
        <div className="form-group">
          <label>Annual Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter rate"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Time (Years)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter years"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Compound Per Year</label>
          <select value={compound} onChange={(e) => setCompound(e.target.value)}>
            <option value="1">Annually</option>
            <option value="2">Semi-Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
        Calculate
      </button>

      {result && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Interest Earned:</span>
            <span className="result-value">${result.interest}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Amount:</span>
            <span className="result-value">${result.amount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
