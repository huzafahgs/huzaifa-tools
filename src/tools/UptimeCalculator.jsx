import { useState } from "react";
import { uptimeValue } from "./calculationMath";
import "../styles/Tool.css";
export default function UptimeCalculator() {
  const [days, setDays] = useState(""),
    [hours, setHours] = useState(""),
    [minutes, setMinutes] = useState(""),
    [windowMinutes, setWindow] = useState(""),
    [result, setResult] = useState(null),
    [error, setError] = useState("");
  const change = (setter, value) => {
    setter(value);
    setResult(null);
    setError("");
  };
  const calculate = (e) => {
    e.preventDefault();
    try {
      setResult(uptimeValue(days, hours, minutes, windowMinutes));
      setError("");
    } catch (e) {
      setResult(null);
      setError(e.message);
    }
  };
  return (
    <div className="tool-container">
      <header className="tool-header">
        <h1>Uptime Calculator</h1>
        <p>
          Total a duration. Add an observation window to calculate availability.
        </p>
      </header>
      <form onSubmit={calculate}>
        <div className="form-grid">
          {[
            ["days", "Days", days, setDays, undefined],
            ["hours", "Hours", hours, setHours, 23],
            ["minutes", "Minutes", minutes, setMinutes, 59],
          ].map(([id, label, value, setter, max]) => (
            <div className="form-group" key={id}>
              <label htmlFor={"uptime-" + id}>{label}</label>
              <input
                id={"uptime-" + id}
                type="number"
                min="0"
                max={max}
                step="1"
                placeholder="0"
                value={value}
                onChange={(e) => change(setter, e.target.value)}
              />
            </div>
          ))}
          <div className="form-group">
            <label htmlFor="uptime-window">
              Observation window (minutes, optional)
            </label>
            <input
              id="uptime-window"
              type="number"
              min="0.01"
              step="any"
              value={windowMinutes}
              onChange={(e) => change(setWindow, e.target.value)}
              aria-describedby="uptime-note"
              placeholder="For example, 1440 for one day"
            />
          </div>
        </div>
        <p id="uptime-note">
          Availability = uptime ÷ observation window × 100. Include both
          available and unavailable time in the window. Leave it blank for
          duration totals only.
        </p>
        <button className="tool-button" type="submit">
          Calculate uptime
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
      {result && (
        <div className="result-box" role="status">
          {[
            ["Total minutes", result.totalMinutes.toLocaleString()],
            ["Total hours", result.totalHours.toFixed(2)],
            ["Total days", result.totalDays.toFixed(2)],
            ...(result.percentage === null
              ? []
              : [["Availability", result.percentage.toFixed(4) + "%"]]),
          ].map(([label, value]) => (
            <div className="result-item" key={label}>
              <span className="result-label">{label}</span>
              <span className="result-value">{value}</span>
            </div>
          ))}
        </div>
      )}
      <p className="tool-help-note">
        This calculates from values you enter. It does not monitor a server or
        verify service-level compliance.
      </p>
    </div>
  );
}
