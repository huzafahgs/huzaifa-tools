import { useState } from "react";
import "../styles/Tool.css";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");

  // Static exchange rates (you can update these or use a real API)
  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    INR: 83.12,
    AUD: 1.53,
    CAD: 1.36,
    CHF: 0.88,
    CNY: 7.24,
    SEK: 10.87,
    NZD: 1.62
  };

  const convert = () => {
    if (!amount) return;
    const converted = (amount * rates[toCurrency]) / rates[fromCurrency];
    setResult(converted.toFixed(2));
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>💱 Currency Converter</h1>
        <p>Convert between currencies</p>
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="tool-input"
      />

      <div className="form-grid">
        <div className="form-group">
          <label>From</label>
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {Object.keys(rates).map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>To</label>
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {Object.keys(rates).map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="tool-button" onClick={convert} style={{width: "100%", marginBottom: "30px"}}>
        Convert
      </button>

      {result && (
        <div className="output-box">
          <div className="output-label">Result:</div>
          {amount} {fromCurrency} = <strong style={{color: "gold"}}>{result}</strong> {toCurrency}
        </div>
      )}

      <div style={{marginTop: "30px", padding: "15px", background: "#0a0d1a", borderRadius: "8px", fontSize: "12px", color: "#aaa"}}>
        <p><strong>Note:</strong> Exchange rates are approximate and for demonstration only. Use live rates for actual transactions.</p>
      </div>
    </div>
  );
}
