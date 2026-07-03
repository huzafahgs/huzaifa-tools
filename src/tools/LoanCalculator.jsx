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

    const monthlyRate = r / 100 / 12;
    const numberOfPayments = t * 12;
    
    const monthlyPayment = (p * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - p;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
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
          <label>Loan Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter loan amount"
          />
        </div>
        <div className="form-group">
          <label>Interest Rate (%) Per Year</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter interest rate"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Loan Period (Years)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter loan period"
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
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
