import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("175");

  useEffect(() => {
    document.title = "Ideal Weight Calculator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Estimate ideal body weight using common height-based formulas.");
  }, []);

  const inches = Number(height) / 2.54;
  const overFive = Math.max(0, inches - 60);
  const hamwi = gender === "male" ? 48 + 2.7 * overFive : 45.5 + 2.2 * overFive;
  const healthyLow = 18.5 * (Number(height) / 100) ** 2;
  const healthyHigh = 24.9 * (Number(height) / 100) ** 2;

  return <div className="tool-container"><div className="tool-header"><h1>⚖ Ideal Weight Calculator</h1><p>Estimate healthy weight ranges</p></div><div className="form-grid"><div className="form-group"><label htmlFor="ideal-gender">Gender</label><select id="ideal-gender" value={gender} onChange={e=>setGender(e.target.value)}><option value="male">Male</option><option value="female">Female</option></select></div><div className="form-group"><label htmlFor="ideal-height">Height cm</label><input id="ideal-height" type="number" value={height} onChange={e=>setHeight(e.target.value)} /></div></div><div className="result-box" role="status"><div className="result-item"><span className="result-label">Formula Estimate</span><span className="result-value">{hamwi.toFixed(1)} kg</span></div><div className="result-item"><span className="result-label">Healthy BMI Range</span><span className="result-value">{healthyLow.toFixed(1)} - {healthyHigh.toFixed(1)} kg</span></div></div></div>;
}
