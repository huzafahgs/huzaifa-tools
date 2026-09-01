import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function CalorieCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("75");
  const [activity, setActivity] = useState("1.55");

  useEffect(() => {
    document.title = "Calorie Calculator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Estimate daily maintenance, weight-loss, and weight-gain calories.");
  }, []);

  const bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + (gender === "male" ? 5 : -161);
  const maintenance = Math.max(0, bmr * Number(activity));

  return <div className="tool-container"><div className="tool-header"><h1>🍽️ Calorie Calculator</h1><p>Estimate daily calorie needs</p></div><div className="form-grid"><div className="form-group"><label htmlFor="cal-gender">Gender</label><select id="cal-gender" value={gender} onChange={e=>setGender(e.target.value)}><option value="male">Male</option><option value="female">Female</option></select></div>{[["age","Age",age,setAge],["height","Height cm",height,setHeight],["weight","Weight kg",weight,setWeight]].map(([id,label,value,setter])=><div className="form-group" key={id}><label htmlFor={`cal-${id}`}>{label}</label><input id={`cal-${id}`} type="number" value={value} onChange={e=>setter(e.target.value)} /></div>)}<div className="form-group"><label htmlFor="cal-activity">Activity</label><select id="cal-activity" value={activity} onChange={e=>setActivity(e.target.value)}><option value="1.2">Sedentary</option><option value="1.375">Light</option><option value="1.55">Moderate</option><option value="1.725">Very active</option></select></div></div><div className="result-box" role="status"><div className="result-item"><span className="result-label">Maintain</span><span className="result-value">{maintenance.toFixed(0)} cal/day</span></div><div className="result-item"><span className="result-label">Weight Loss</span><span className="result-value">{Math.max(0,maintenance-500).toFixed(0)} cal/day</span></div><div className="result-item"><span className="result-label">Weight Gain</span><span className="result-value">{(maintenance+500).toFixed(0)} cal/day</span></div></div></div>;
}
