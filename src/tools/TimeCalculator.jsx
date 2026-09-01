import { useState } from "react";
import "../styles/Tool.css";

export default function TimeCalculator() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!date1 || !date2) {
      alert("Please select both dates!");
      return;
    }

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const diffMs = Math.abs(d2 - d1);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    setResult({
      days: diffDays,
      hours: diffHours,
      minutes: diffMinutes,
      seconds: diffSeconds,
      totalHours: Math.floor(diffMs / (1000 * 60 * 60)),
      totalMinutes: Math.floor(diffMs / (1000 * 60))
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🕐 Time Calculator</h1>
        <p>Calculate time differences</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Start Date & Time</label>
          <input
            type="datetime-local"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Date & Time</label>
          <input
            type="datetime-local"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculate} style={{width: "100%", marginBottom: "30px"}}>
        Calculate Difference
      </button>

      {result && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Days</span>
            <span className="result-value">{result.days}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Hours</span>
            <span className="result-value">{result.hours}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Minutes</span>
            <span className="result-value">{result.minutes}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Hours</span>
            <span className="result-value">{result.totalHours}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Minutes</span>
            <span className="result-value">{result.totalMinutes}</span>
          </div>
        </div>
      )}
    </div>
  );
}
