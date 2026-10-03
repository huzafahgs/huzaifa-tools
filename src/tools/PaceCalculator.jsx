import { useEffect, useState } from "react";
import "../styles/Tool.css";
import { calculatePace } from "../utils/pace";

export default function PaceCalculator() {
  const [distance, setDistance] = useState("5");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("0");
  const [unit, setUnit] = useState("km");

  useEffect(() => {
    document.title = "Pace Calculator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Calculate running pace and speed from distance and time.");
  }, []);

  const result = calculatePace(distance, hours, minutes, seconds);

  return <div className="tool-container"><div className="tool-header"><h1>🏃 Pace Calculator</h1><p>Calculate pace and speed</p></div><div className="form-grid"><div className="form-group"><label htmlFor="pace-distance">Distance</label><input id="pace-distance" type="number" min="0" step="any" value={distance} onChange={e=>setDistance(e.target.value)} /></div><div className="form-group"><label htmlFor="pace-unit">Unit</label><select id="pace-unit" value={unit} onChange={e=>setUnit(e.target.value)}><option value="km">Kilometers</option><option value="mi">Miles</option></select></div><div className="form-group"><label htmlFor="pace-hours">Hours</label><input id="pace-hours" type="number" min="0" step="1" value={hours} onChange={e=>setHours(e.target.value)} /></div><div className="form-group"><label htmlFor="pace-minutes">Minutes</label><input id="pace-minutes" type="number" min="0" max="59" step="1" value={minutes} onChange={e=>setMinutes(e.target.value)} /></div><div className="form-group"><label htmlFor="pace-seconds">Seconds</label><input id="pace-seconds" type="number" min="0" max="59" step="1" value={seconds} onChange={e=>setSeconds(e.target.value)} /></div></div><div className="result-box" role="status" aria-live="polite">{result ? <><div className="result-item"><span className="result-label">Pace</span><span className="result-value">{result.paceMinutes}:{String(result.paceSeconds).padStart(2,"0")} / {unit}</span></div><div className="result-item"><span className="result-label">Speed</span><span className="result-value">{result.speed.toFixed(2)} {unit}/h</span></div></> : <p>Enter a positive distance and elapsed time. Minutes and seconds must each be from 0 to 59.</p>}</div></div>;
}
