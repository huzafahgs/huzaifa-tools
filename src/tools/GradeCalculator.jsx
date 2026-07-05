import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState("85");
  const [midterm, setMidterm] = useState("78");
  const [finalExam, setFinalExam] = useState("90");
  const [weights, setWeights] = useState({ assignments: 30, midterm: 30, finalExam: 40 });

  useEffect(() => {
    document.title = "Grade Calculator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Calculate weighted course grades for assignments, midterms, and final exams.");
  }, []);

  const totalWeight = Number(weights.assignments) + Number(weights.midterm) + Number(weights.finalExam);
  const grade = totalWeight ? (Number(assignments)*weights.assignments + Number(midterm)*weights.midterm + Number(finalExam)*weights.finalExam) / totalWeight : 0;
  const letter = grade >= 90 ? "A" : grade >= 80 ? "B" : grade >= 70 ? "C" : grade >= 60 ? "D" : "F";

  return <div className="tool-container"><div className="tool-header"><h1>📝 Grade Calculator</h1><p>Calculate weighted student grades</p></div><div className="tool-two-column"><div className="form-grid">{[["assignments","Assignments %",assignments,setAssignments],["midterm","Midterm %",midterm,setMidterm],["finalExam","Final exam %",finalExam,setFinalExam]].map(([id,label,value,setter])=><div className="form-group" key={id}><label htmlFor={`grade-${id}`}>{label}</label><input id={`grade-${id}`} type="number" value={value} onChange={e=>setter(e.target.value)} /></div>)}</div><div className="form-grid">{Object.keys(weights).map(key=><div className="form-group" key={key}><label htmlFor={`weight-${key}`}>{key} weight</label><input id={`weight-${key}`} type="number" value={weights[key]} onChange={e=>setWeights(prev=>({...prev,[key]:Number(e.target.value)}))} /></div>)}</div></div><div className="success-message" role="status" aria-live="polite">Final Grade: {grade.toFixed(2)}% ({letter})</div></div>;
}
