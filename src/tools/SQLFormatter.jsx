import { useEffect, useState } from "react";
import "../styles/Tool.css";

const keywords = ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "JOIN", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "LIMIT"];

export default function SQLFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "SQL Formatter - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Format SQL queries with readable line breaks and uppercase keywords.");
  }, []);

  const format = () => {
    if (!input.trim()) {
      setError("Enter SQL before formatting.");
      setOutput("");
      return;
    }
    let value = input.replace(/\s+/g, " ").trim();
    keywords.forEach(keyword => {
      value = value.replace(new RegExp(`\\b${keyword}\\b`, "gi"), `\n${keyword}`);
    });
    setOutput(value.replace(/^\n/, "").replace(/,\s*/g, ",\n  "));
    setError("");
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>SQL Formatter</h1><p>Format SQL queries for readability</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      <div className="tool-two-column">
        <div><label htmlFor="sql-input" className="output-label">SQL input</label><textarea id="sql-input" className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} style={{height: "320px"}} /></div>
        <div><label htmlFor="sql-output" className="output-label">Formatted SQL</label><textarea id="sql-output" className="tool-textarea" value={output} readOnly style={{height: "320px", background: "#0a0d1a"}} /></div>
      </div>
      <button className="tool-button" onClick={format} style={{width: "100%"}}>Format SQL</button>
    </div>
  );
}
