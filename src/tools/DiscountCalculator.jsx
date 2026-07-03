import { useState } from "react";
import "../styles/Tool.css";

export default function DiscountCalculator() {
  const [original, setOriginal] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!original || !discount) return;
    const orig = parseFloat(original);
    const disc = parseFloat(discount);
    const discAmount = (orig * disc) / 100;
    const final = orig - discAmount;

    setResult({
      discount: discAmount.toFixed(2),
      final: final.toFixed(2),
      saved: `${disc}%`
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🏷️ Discount Calculator</h1>
        <p>Calculate discounts and final price</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Original Price ($)</label>
          <input
            type="number"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Enter original price"
          />
        </div>
        <div className="form-group">
          <label>Discount (%)</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter discount percentage"
            step="0.01"
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
        Calculate Discount
      </button>

      {result && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Discount Amount:</span>
            <span className="result-value">${result.discount}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Final Price:</span>
            <span className="result-value">${result.final}</span>
          </div>
          <div className="result-item">
            <span className="result-label">You Save:</span>
            <span className="result-value">{result.saved}</span>
          </div>
        </div>
      )}
    </div>
  );
}
