import { useState } from "react";
import "../styles/Tool.css";

export default function MarkupCalculator() {
  const [cost, setCost] = useState("");
  const [markup, setMarkup] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!cost || !markup) return;
    const c = parseFloat(cost);
    const m = parseFloat(markup);
    const markupAmount = (c * m) / 100;
    const sellingPrice = c + markupAmount;

    setResult({
      markup: markupAmount.toFixed(2),
      sellingPrice: sellingPrice.toFixed(2),
      profit: markupAmount.toFixed(2)
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📍 Markup Calculator</h1>
        <p>Calculate markup pricing</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Cost Price ($)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Enter cost price"
          />
        </div>
        <div className="form-group">
          <label>Markup (%)</label>
          <input
            type="number"
            value={markup}
            onChange={(e) => setMarkup(e.target.value)}
            placeholder="Enter markup percentage"
            step="0.01"
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
        Calculate Markup
      </button>

      {result && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Markup Amount:</span>
            <span className="result-value">${result.markup}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Selling Price:</span>
            <span className="result-value">${result.sellingPrice}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Profit:</span>
            <span className="result-value">${result.profit}</span>
          </div>
        </div>
      )}
    </div>
  );
}
