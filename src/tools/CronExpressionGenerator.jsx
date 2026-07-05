import { useEffect, useMemo, useState } from "react";
import "../styles/Tool.css";

const presets = {
  hourly: { expression: "0 * * * *", text: "Runs once every hour." },
  daily: { expression: "0 9 * * *", text: "Runs every day at 09:00." },
  weekly: { expression: "0 9 * * 1", text: "Runs every Monday at 09:00." },
  monthly: { expression: "0 9 1 * *", text: "Runs on the first day of every month at 09:00." },
  custom: { expression: "* * * * *", text: "Runs every minute." }
};

export default function CronExpressionGenerator() {
  const [preset, setPreset] = useState("daily");
  const [expression, setExpression] = useState(presets.daily.expression);
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = "Cron Expression Generator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Generate common cron expressions and understand schedule meanings.");
  }, []);

  const isValid = useMemo(() => expression.trim().split(/\s+/).length === 5, [expression]);
  const choosePreset = (value) => {
    setPreset(value);
    setExpression(presets[value].expression);
    setStatus("");
  };
  const copy = async () => {
    await navigator.clipboard.writeText(expression);
    setStatus("Cron expression copied.");
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>⏰ Cron Expression Generator</h1><p>Create common cron schedules</p></div>
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}
      {!isValid && <div className="error-message" role="alert">Cron expressions should contain 5 fields.</div>}
      <div className="form-grid">
        <div className="form-group"><label htmlFor="cron-preset">Preset</label><select id="cron-preset" value={preset} onChange={(e) => choosePreset(e.target.value)}>{Object.keys(presets).map(key => <option key={key} value={key}>{key}</option>)}</select></div>
        <div className="form-group"><label htmlFor="cron-expression">Expression</label><input id="cron-expression" value={expression} onChange={(e) => { setExpression(e.target.value); setPreset("custom"); }} /></div>
      </div>
      <div className="output-box" aria-live="polite"><div className="output-label">Schedule</div>{presets[preset]?.text || "Custom schedule. Verify with your scheduler before production use."}<button className="tool-button-secondary" onClick={copy} disabled={!isValid} style={{width: "100%", marginTop: "15px"}}>Copy Expression</button></div>
    </div>
  );
}
