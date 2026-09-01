import { useState } from "react";
import "../styles/Tool.css";

export default function FibonacciGenerator() {
  const [count, setCount] = useState(10);
  const [sequence, setSequence] = useState([]);

  const generate = () => {
    const n = Math.min(parseInt(count) || 0, 100);
    const fib = [];

    for (let i = 0; i < n; i++) {
      if (i === 0) fib.push(0);
      else if (i === 1) fib.push(1);
      else fib.push(fib[i - 1] + fib[i - 2]);
    }

    setSequence(fib);
  };

  const copy = () => {
    navigator.clipboard.writeText(sequence.join(", "));
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🌀 Fibonacci Generator</h1>
        <p>Generate Fibonacci sequence</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Number of Terms</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="10"
            min="1"
            max="100"
          />
        </div>
      </div>

      <button className="tool-button" onClick={generate} style={{width: "100%", marginBottom: "30px"}}>
        Generate Sequence
      </button>

      {sequence.length > 0 && (
        <div className="output-box">
          <div className="output-label">Fibonacci Sequence:</div>
          <div style={{marginBottom: "15px", wordBreak: "break-all"}}>
            {sequence.join(", ")}
          </div>
          <button className="tool-button-secondary" onClick={copy} style={{width: "100%"}}>
            Copy Sequence
          </button>
        </div>
      )}
    </div>
  );
}
