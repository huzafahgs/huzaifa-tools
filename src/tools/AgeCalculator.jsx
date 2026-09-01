import { useState } from "react";
import "../styles/Tool.css";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [details, setDetails] = useState({});

  const calculateAge = () => {
    if (!birthDate) {
      alert("Please select a date!");
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge(years);
    setDetails({
      years,
      months,
      days,
      totalDays: Math.floor((today - birth) / (1000 * 60 * 60 * 24)),
      totalHours: Math.floor((today - birth) / (1000 * 60 * 60)),
      totalMinutes: Math.floor((today - birth) / (1000 * 60))
    });
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🎂 Age Calculator</h1>
        <p>Calculate your exact age</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
      </div>

      <button className="tool-button" onClick={calculateAge} style={{width: "100%", marginBottom: "30px"}}>
        Calculate Age
      </button>

      {age !== null && (
        <div className="result-box">
          <div className="result-item">
            <span className="result-label">Age:</span>
            <span className="result-value">{details.years} years, {details.months} months, {details.days} days</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Days:</span>
            <span className="result-value">{details.totalDays.toLocaleString()}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Hours:</span>
            <span className="result-value">{details.totalHours.toLocaleString()}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Minutes:</span>
            <span className="result-value">{details.totalMinutes.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
