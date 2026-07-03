import { useState } from "react";
import "../styles/Tool.css";

export default function VATCalculator() {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState(10);
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!amount) return;
    const a = parseFloat(amount);
    const vat = (a * vatRate) / 100;
    const total = a + vat;

    setResult({
      vat: vat.toFixed(2),
      total: total.toFixed(2)
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🧾 VAT Calculator</h1>
        <p>Calculate VAT and taxes</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label>VAT Rate: {vatRate}%</label>
          <input
            type="range"
            min="0"
            max="50"
            value={vatRate}
            onChange={(e) => setVatRate(parseInt(e.target.value))}
            className="slider-input"
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
        Calculate VAT
      </button>

      {result && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Amount:</span>
            <span className="result-value">${amount}</span>
          </div>
          <div className="result-item">
            <span className="result-label">VAT ({vatRate}%):</span>
            <span className="result-value">${result.vat}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total:</span>
            <span className="result-value">${result.total}</span>
          </div>
        </div>
      )}
    </div>
  );
}
