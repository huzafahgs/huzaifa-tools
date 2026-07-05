import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function ROICalculator() {
  const [initial, setInitial] = useState("1000");
  const [finalValue, setFinalValue] = useState("1250");
  const [costs, setCosts] = useState("0");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "ROI Calculator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Calculate return on investment, net profit, and ROI percentage.");
  }, []);

  const calculate = () => {
    const invested = Number(initial) + Number(costs);
    const profit = Number(finalValue) - invested;
    if (invested <= 0) {
      setError("Initial investment plus costs must be greater than zero.");
      setResult(null);
      return;
    }
    setResult({ profit, roi: (profit / invested) * 100 });
    setError("");
  };

  return <div className="tool-container"><div className="tool-header"><h1>📈 ROI Calculator</h1><p>Measure return on investment</p></div>{error && <div className="error-message" role="alert">{error}</div>}<div className="form-grid"><div className="form-group"><label htmlFor="roi-initial">Initial investment</label><input id="roi-initial" type="number" value={initial} onChange={e=>setInitial(e.target.value)} /></div><div className="form-group"><label htmlFor="roi-final">Final value</label><input id="roi-final" type="number" value={finalValue} onChange={e=>setFinalValue(e.target.value)} /></div><div className="form-group"><label htmlFor="roi-costs">Extra costs</label><input id="roi-costs" type="number" value={costs} onChange={e=>setCosts(e.target.value)} /></div></div><button className="tool-button" onClick={calculate} style={{width:"100%"}}>Calculate ROI</button>{result && <div className="result-box" role="status"><div className="result-item"><span className="result-label">Net Profit</span><span className="result-value">${result.profit.toFixed(2)}</span></div><div className="result-item"><span className="result-label">ROI</span><span className="result-value">{result.roi.toFixed(2)}%</span></div></div>}</div>;
}
