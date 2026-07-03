import { useState } from "react";
import "../styles/Tool.css";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!principal || !rate || !months) {
      alert("Please fill all fields!");
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(months);

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    setResult({
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🏦 EMI Calculator</h1>
        <p>Calculate monthly installments</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Loan Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label>Interest Rate (%) Per Year</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter rate"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Duration (Months)</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="Enter months"
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
        Calculate EMI
      </button>

      {result && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Monthly EMI:</span>
            <span className="result-value">${result.emi}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Amount:</span>
            <span className="result-value">${result.totalPayment}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Interest:</span>
            <span className="result-value">${result.totalInterest}</span>
          </div>
        </div>
      )}
    </div>
  );
}
