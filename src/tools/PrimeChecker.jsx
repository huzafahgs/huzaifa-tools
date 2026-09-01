import { useState } from "react";
import "../styles/Tool.css";

export default function PrimeChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);

  const isPrime = (n) => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  const check = () => {
    if (!number) return;
    const n = parseInt(number);
    setResult(isPrime(n));
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔢 Prime Number Checker</h1>
        <p>Check if a number is prime</p>
      </div>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
        className="tool-input"
      />

      <button className="tool-button" onClick={check} style={{width: "100%", marginBottom: "30px"}}>
        Check if Prime
      </button>

      {result !== null && (
        <div className={result ? "success-message" : "info-message"} style={{fontSize: "18px", textAlign: "center", padding: "30px"}}>
          {number} is {result ? "a PRIME number" : "NOT a prime number"}
        </div>
      )}
    </div>
  );
}
