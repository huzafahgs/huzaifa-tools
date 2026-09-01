import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function PaceCalculator() {
  const [distance, setDistance] = useState("5");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("25");
  const [unit, setUnit] = useState("km");

  useEffect(() => {
    document.title = "Pace Calculator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Calculate running pace and speed from distance and time.");
  }, []);

  const totalMinutes = Number(hours) * 60 + Number(minutes);
  const pace = Number(distance) > 0 ? totalMinutes / Number(distance) : 0;
  const speed = totalMinutes > 0 ? Number(distance) / (totalMinutes / 60) : 0;

  return <div className="tool-container"><div className="tool-header"><h1>🏃 Pace Calculator</h1><p>Calculate pace and speed</p></div><div className="form-grid"><div className="form-group"><label htmlFor="pace-distance">Distance</label><input id="pace-distance" type="number" value={distance} onChange={e=>setDistance(e.target.value)} /></div><div className="form-group"><label htmlFor="pace-unit">Unit</label><select id="pace-unit" value={unit} onChange={e=>setUnit(e.target.value)}><option value="km">Kilometers</option><option value="mi">Miles</option></select></div><div className="form-group"><label htmlFor="pace-hours">Hours</label><input id="pace-hours" type="number" value={hours} onChange={e=>setHours(e.target.value)} /></div><div className="form-group"><label htmlFor="pace-minutes">Minutes</label><input id="pace-minutes" type="number" value={minutes} onChange={e=>setMinutes(e.target.value)} /></div></div><div className="result-box" role="status"><div className="result-item"><span className="result-label">Pace</span><span className="result-value">{Math.floor(pace)}:{String(Math.round((pace%1)*60)).padStart(2,"0")} / {unit}</span></div><div className="result-item"><span className="result-label">Speed</span><span className="result-value">{speed.toFixed(2)} {unit}/h</span></div></div></div>;
}
