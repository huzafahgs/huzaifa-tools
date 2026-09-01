import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function BMRCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("75");

  useEffect(() => {
    document.title = "BMR Calculator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Estimate basal metabolic rate using the Mifflin-St Jeor formula.");
  }, []);

  const bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + (gender === "male" ? 5 : -161);

  return <div className="tool-container"><div className="tool-header"><h1>🔥 BMR Calculator</h1><p>Estimate calories burned at rest</p></div><div className="form-grid"><div className="form-group"><label htmlFor="bmr-gender">Gender</label><select id="bmr-gender" value={gender} onChange={e=>setGender(e.target.value)}><option value="male">Male</option><option value="female">Female</option></select></div>{[["age","Age",age,setAge],["height","Height cm",height,setHeight],["weight","Weight kg",weight,setWeight]].map(([id,label,value,setter])=><div className="form-group" key={id}><label htmlFor={`bmr-${id}`}>{label}</label><input id={`bmr-${id}`} type="number" value={value} onChange={e=>setter(e.target.value)} /></div>)}</div><div className="success-message" role="status" aria-live="polite">Estimated BMR: {Math.max(0,bmr).toFixed(0)} calories/day</div></div>;
}
