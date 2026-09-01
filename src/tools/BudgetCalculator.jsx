import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function BudgetCalculator() {
  const [income, setIncome] = useState("4000");
  const [housing, setHousing] = useState("1200");
  const [food, setFood] = useState("500");
  const [transport, setTransport] = useState("300");
  const [other, setOther] = useState("600");

  useEffect(() => {
    document.title = "Budget Calculator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Compare monthly income, expenses, and savings with a simple budget calculator.");
  }, []);

  const expenses = [housing, food, transport, other].reduce((sum, value) => sum + Number(value || 0), 0);
  const savings = Number(income || 0) - expenses;

  return <div className="tool-container"><div className="tool-header"><h1>📒 Budget Calculator</h1><p>Track income, expenses, and savings</p></div><div className="form-grid">{[["income","Monthly income",income,setIncome],["housing","Housing",housing,setHousing],["food","Food",food,setFood],["transport","Transport",transport,setTransport],["other","Other expenses",other,setOther]].map(([id,label,value,setter])=><div className="form-group" key={id}><label htmlFor={`budget-${id}`}>{label}</label><input id={`budget-${id}`} type="number" min="0" value={value} onChange={e=>setter(e.target.value)} /></div>)}</div><div className={savings >= 0 ? "success-message" : "error-message"} role="status" aria-live="polite">Monthly savings: ${savings.toFixed(2)} ({Number(income)>0 ? ((savings/Number(income))*100).toFixed(1) : "0"}%)</div><div className="result-box"><div className="result-item"><span className="result-label">Total Expenses</span><span className="result-value">${expenses.toFixed(2)}</span></div></div></div>;
}
