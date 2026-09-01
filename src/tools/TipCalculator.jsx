import { useState } from "react";
import "../styles/Tool.css";

export default function TipCalculator() {
  const [amount, setAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!amount) return;
    const total = parseFloat(amount);
    const tip = (total * tipPercent) / 100;
    const totalWithTip = total + tip;
    const perPerson = totalWithTip / people;

    setResult({
      tip: tip.toFixed(2),
      totalWithTip: totalWithTip.toFixed(2),
      perPerson: perPerson.toFixed(2)
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>💸 Tip Calculator</h1>
        <p>Calculate tips easily</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Bill Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter bill amount"
          />
        </div>
        <div className="form-group">
          <label>Tip Percentage: {tipPercent}%</label>
          <input
            type="range"
            min="0"
            max="50"
            value={tipPercent}
            onChange={(e) => setTipPercent(parseInt(e.target.value))}
            className="slider-input"
          />
        </div>
        <div className="form-group">
          <label>Number of People</label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
        Calculate Tip
      </button>

      {result && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Tip Amount:</span>
            <span className="result-value">${result.tip}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total (with tip):</span>
            <span className="result-value">${result.totalWithTip}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Per Person:</span>
            <span className="result-value">${result.perPerson}</span>
          </div>
        </div>
      )}
    </div>
  );
}
