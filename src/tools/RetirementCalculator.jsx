import { useState } from "react";
import "../styles/Tool.css";

export default function RetirementCalculator() {
  const [current, setCurrent] = useState("10000");
  const [monthly, setMonthly] = useState("500");
  const [years, setYears] = useState("25");
  const [rate, setRate] = useState("7");

  const months = Number(years) * 12;
  const r = Number(rate) / 100 / 12;
  const future =
    r === 0
      ? Number(current) + Number(monthly) * months
      : Number(current) * (1 + r) ** months +
        Number(monthly) * (((1 + r) ** months - 1) / r);
  const contributed = Number(current) + Number(monthly) * months;

  const valid =
    [current, monthly, years, rate].every(
      (v) => v !== "" && Number.isFinite(Number(v)),
    ) &&
    Number(current) >= 0 &&
    Number(monthly) >= 0 &&
    Number(years) >= 0 &&
    Number(rate) >= 0 &&
    Number.isFinite(future);

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🌅 Retirement Calculator</h1>
        <p>Estimate future retirement savings</p>
      </div>
      <div className="form-grid">
        {[
          ["current", "Current savings", current, setCurrent],
          ["monthly", "Monthly contribution", monthly, setMonthly],
          ["years", "Years to grow", years, setYears],
          ["rate", "Annual return %", rate, setRate],
        ].map(([id, label, value, setter]) => (
          <div className="form-group" key={id}>
            <label htmlFor={`retire-${id}`}>{label}</label>
            <input
              id={`retire-${id}`}
              type="number"
              value={value}
              onChange={(e) => setter(e.target.value)}
            />
          </div>
        ))}
      </div>
      {!valid && (
        <p role="alert">
          Enter finite, nonnegative values within the calculation range.
        </p>
      )}
      <div className="result-box" role="status">
        <div className="result-item">
          <span className="result-label">Estimated Future Value</span>
          <span className="result-value">
            {valid ? "$" + future.toFixed(2) : "—"}
          </span>
        </div>
        <div className="result-item">
          <span className="result-label">Estimated Growth</span>
          <span className="result-value">
            {valid ? "$" + (future - contributed).toFixed(2) : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
