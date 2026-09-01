import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateValue, setDateValue] = useState(new Date().toISOString().slice(0, 16));
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Unix Timestamp Converter - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Convert Unix timestamps in seconds or milliseconds to readable dates and convert dates back to epoch time.");
  }, []);

  const convertTimestamp = () => {
    const raw = timestamp.trim();
    if (!/^\d{10,13}$/.test(raw)) {
      setError("Enter a 10-digit seconds or 13-digit milliseconds timestamp.");
      setResult("");
      return;
    }
    const ms = raw.length === 13 ? Number(raw) : Number(raw) * 1000;
    const date = new Date(ms);
    setError("");
    setResult(`Local: ${date.toLocaleString()}\nUTC: ${date.toUTCString()}\nISO: ${date.toISOString()}`);
  };

  const convertDate = () => {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      setError("Choose a valid date and time.");
      setResult("");
      return;
    }
    setError("");
    setResult(`Seconds: ${Math.floor(date.getTime() / 1000)}\nMilliseconds: ${date.getTime()}`);
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>⏳ Unix Timestamp Converter</h1><p>Convert epoch timestamps and readable dates</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      <div className="tool-two-column">
        <div><label htmlFor="timestamp-input" className="output-label">Unix timestamp</label><input id="timestamp-input" className="tool-input" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} inputMode="numeric" /><button className="tool-button" onClick={convertTimestamp} style={{width: "100%"}}>Timestamp to Date</button></div>
        <div><label htmlFor="date-input" className="output-label">Date and time</label><input id="date-input" className="tool-input" type="datetime-local" value={dateValue} onChange={(e) => setDateValue(e.target.value)} /><button className="tool-button" onClick={convertDate} style={{width: "100%"}}>Date to Timestamp</button></div>
      </div>
      {result && <div className="output-box" role="status" aria-live="polite" style={{whiteSpace: "pre-wrap"}}>{result}</div>}
    </div>
  );
}
