import { useState } from "react";
import "../styles/Tool.css";

export default function UptimeCalculator() {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!days && !hours && !minutes) {
      alert("Please enter uptime values!");
      return;
    }

    const d = parseInt(days) || 0;
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;

    const totalMinutes = d * 24 * 60 + h * 60 + m;
    const percentage = ((totalMinutes) / (365.25 * 24 * 60 * 100)) * 100;

    setResult({
      totalMinutes,
      totalHours: (totalMinutes / 60).toFixed(2),
      totalDays: (totalMinutes / (24 * 60)).toFixed(2),
      percentage: percentage.toFixed(4)
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📡 Uptime Calculator</h1>
        <p>Calculate system uptime percentage</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Days</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Hours</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="0"
            min="0"
            max="23"
          />
        </div>
        <div className="form-group">
          <label>Minutes</label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="0"
            min="0"
            max="59"
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
        Calculate Uptime
      </button>

      {result && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Total Minutes</span>
            <span className="result-value">{result.totalMinutes.toLocaleString()}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Hours</span>
            <span className="result-value">{result.totalHours}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Days</span>
            <span className="result-value">{result.totalDays}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Uptime Percentage</span>
            <span className="result-value">{result.percentage}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
