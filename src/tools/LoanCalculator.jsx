import { useState } from "react";
import "../styles/Tool.css";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!principal || !rate || !time) {
      alert("Please fill all fields!");
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    if (![p, r, t].every(Number.isFinite) || p <= 0 || r < 0 || t <= 0) {
      setResult(null);
      alert(
        "Use a positive principal and term, and a nonnegative annual rate.",
      );
      return;
    }

    const monthlyRate = r / 100 / 12;
    const numberOfPayments = t * 12;

    const monthlyPayment =
      r === 0
        ? p / numberOfPayments
        : (p * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - p;
    if (!Number.isFinite(totalPayment)) {
      setResult(null);
      alert("These values exceed the supported calculation range.");
      return;
    }

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>💰 Loan Calculator</h1>
        <p>Calculate loan payments and interest</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="loancalculator-1">Loan Amount ($)</label>
          <input
            id="loancalculator-1"
            type="number"
            value={principal}
            onChange={(e) => {
              setPrincipal(e.target.value);
              setResult(null);
            }}
            placeholder="Enter loan amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="loancalculator-2">Interest Rate (%) Per Year</label>
          <input
            id="loancalculator-2"
            type="number"
            value={rate}
            onChange={(e) => {
              setRate(e.target.value);
              setResult(null);
            }}
            placeholder="Enter interest rate"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="loancalculator-3">Loan Period (Years)</label>
          <input
            id="loancalculator-3"
            type="number"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setResult(null);
            }}
            placeholder="Enter loan period"
          />
        </div>
      </div>

      <button
        className="tool-button"
        onClick={calculate}
        style={{ width: "100%", marginBottom: "30px" }}
      >
        Calculate Loan
      </button>

      {result && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Monthly Payment:</span>
            <span className="result-value">${result.monthlyPayment}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Payment:</span>
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
