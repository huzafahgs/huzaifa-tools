import { useEffect, useMemo, useState } from "react";
import "../styles/Tool.css";

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Password Strength Checker - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Check password strength locally with practical security suggestions.");
  }, []);

  const analysis = useMemo(() => {
    const checks = [
      { ok: password.length >= 12, text: "Use at least 12 characters" },
      { ok: /[A-Z]/.test(password), text: "Add uppercase letters" },
      { ok: /[a-z]/.test(password), text: "Add lowercase letters" },
      { ok: /\d/.test(password), text: "Add numbers" },
      { ok: /[^A-Za-z0-9]/.test(password), text: "Add symbols" },
      { ok: !/(.)\1{2,}/.test(password), text: "Avoid repeated characters" }
    ];
    const score = checks.filter(check => check.ok).length;
    const label = score <= 2 ? "Weak" : score <= 4 ? "Good" : "Strong";
    return { checks, score, label };
  }, [password]);

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>🛡️ Password Strength Checker</h1><p>Check password quality without sending it anywhere</p></div>
      <label htmlFor="password-strength-input" className="output-label">Password</label>
      <input id="password-strength-input" className="tool-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a password to analyze" aria-describedby="password-strength-status" />
      <div id="password-strength-status" className={password ? (analysis.label === "Strong" ? "success-message" : "info-message") : "info-message"} role="status" aria-live="polite">
        {password ? `Strength: ${analysis.label} (${analysis.score}/6 checks passed)` : "Enter a password to see strength suggestions."}
      </div>
      <div className="result-box">
        {analysis.checks.map(check => (
          <div className="result-item" key={check.text}>
            <span className="result-label">{check.text}</span>
            <span className="result-value">{check.ok ? "Passed" : "Needed"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
