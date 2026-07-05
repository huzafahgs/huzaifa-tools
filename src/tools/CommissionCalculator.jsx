import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function CommissionCalculator() {
  const [sales, setSales] = useState("10000");
  const [rate, setRate] = useState("8");
  const [base, setBase] = useState("0");

  useEffect(() => {
    document.title = "Commission Calculator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Calculate sales commission, base pay, and total payout.");
  }, []);

  const commission = Number(sales || 0) * Number(rate || 0) / 100;
  const total = commission + Number(base || 0);

  return <div className="tool-container"><div className="tool-header"><h1>💼 Commission Calculator</h1><p>Calculate commission and total payout</p></div><div className="form-grid"><div className="form-group"><label htmlFor="commission-sales">Sales amount</label><input id="commission-sales" type="number" value={sales} onChange={e=>setSales(e.target.value)} /></div><div className="form-group"><label htmlFor="commission-rate">Commission rate %</label><input id="commission-rate" type="number" value={rate} onChange={e=>setRate(e.target.value)} /></div><div className="form-group"><label htmlFor="commission-base">Base pay</label><input id="commission-base" type="number" value={base} onChange={e=>setBase(e.target.value)} /></div></div><div className="result-box" role="status" aria-live="polite"><div className="result-item"><span className="result-label">Commission</span><span className="result-value">${commission.toFixed(2)}</span></div><div className="result-item"><span className="result-label">Total Pay</span><span className="result-value">${total.toFixed(2)}</span></div></div></div>;
}
