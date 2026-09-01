import { useState } from "react";
import "../styles/Tool.css";

export default function FactorialCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    if (!number) return;

    const n = parseInt(number);

    if (n < 0) {
      setError("Factorial is not defined for negative numbers");
      return;
    }

    if (n > 170) {
      setError("Number is too large");
      return;
    }

    let factorial = 1;
    for (let i = 2; i <= n; i++) {
      factorial *= i;
    }

    setResult(factorial.toString());
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔢 Factorial Calculator</h1>
        <p>Calculate factorials</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
        className="tool-input"
        min="0"
      />

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
        Calculate Factorial
      </button>

      {result && (
        <div className="output-box">
          <div className="output-label">{number}! =</div>
          <div style={{fontSize: "24px", fontWeight: "bold", color: "gold", wordBreak: "break-all"}}>
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
