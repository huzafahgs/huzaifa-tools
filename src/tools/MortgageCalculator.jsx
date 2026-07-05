import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function MortgageCalculator() {
  const [price, setPrice] = useState("300000");
  const [down, setDown] = useState("60000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Mortgage Calculator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Estimate monthly mortgage payments, total payment, and total interest.");
  }, []);

  const calculate = () => {
    const p = Number(price) - Number(down);
    const monthlyRate = Number(rate) / 100 / 12;
    const months = Number(years) * 12;
    if (p <= 0 || monthlyRate < 0 || months <= 0) {
      setError("Enter valid home price, down payment, rate, and term.");
      setResult(null);
      return;
    }
    const monthly = monthlyRate === 0 ? p / months : p * monthlyRate * ((1 + monthlyRate) ** months) / (((1 + monthlyRate) ** months) - 1);
    setResult({ loan: p, monthly, total: monthly * months, interest: monthly * months - p });
    setError("");
  };

  return <div className="tool-container"><div className="tool-header"><h1>🏠 Mortgage Calculator</h1><p>Estimate monthly home loan payments</p></div>{error && <div className="error-message" role="alert">{error}</div>}<div className="form-grid">{[["price","Home price",price,setPrice],["down","Down payment",down,setDown],["rate","Annual interest %",rate,setRate],["years","Term years",years,setYears]].map(([id,label,value,setter])=><div className="form-group" key={id}><label htmlFor={id}>{label}</label><input id={id} type="number" value={value} onChange={e=>setter(e.target.value)} /></div>)}</div><button className="tool-button" onClick={calculate} style={{width:"100%"}}>Calculate Mortgage</button>{result && <div className="result-box" role="status" aria-live="polite">{Object.entries(result).map(([k,v])=><div className="result-item" key={k}><span className="result-label">{k}</span><span className="result-value">${v.toFixed(2)}</span></div>)}</div>}</div>;
}
