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
    if (
      ![p, r, n].every(Number.isFinite) ||
      p <= 0 ||
      r < 0 ||
      !Number.isInteger(n) ||
      n <= 0
    ) {
      setResult(null);
      alert(
        "Use a positive principal, nonnegative annual rate and positive whole months.",
      );
      return;
    }

    const emi =
      r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    if (!Number.isFinite(totalPayment)) {
      setResult(null);
      alert("These values exceed the supported calculation range.");
      return;
    }

    setResult({
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
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
          <label htmlFor="emicalculator-1">Loan Amount ($)</label>
          <input
            id="emicalculator-1"
            type="number"
            value={principal}
            onChange={(e) => {
              setPrincipal(e.target.value);
              setResult(null);
            }}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="emicalculator-2">Interest Rate (%) Per Year</label>
          <input
            id="emicalculator-2"
            type="number"
            value={rate}
            onChange={(e) => {
              setRate(e.target.value);
              setResult(null);
            }}
            placeholder="Enter rate"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="emicalculator-3">Duration (Months)</label>
          <input
            id="emicalculator-3"
            type="number"
            value={months}
            onChange={(e) => {
              setMonths(e.target.value);
              setResult(null);
            }}
            placeholder="Enter months"
          />
        </div>
      </div>

      <button
        className="tool-button"
        onClick={calculate}
        style={{ width: "100%", marginBottom: "30px" }}
      >
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
