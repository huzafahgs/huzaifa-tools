import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function HTMLFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "HTML Formatter - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Beautify HTML markup with readable indentation.");
  }, []);

  const format = () => {
    if (!input.trim()) {
      setError("Enter HTML before formatting.");
      setOutput("");
      return;
    }
    let level = 0;
    const formatted = input.replace(/>\s*</g, ">\n<").split("\n").map(line => {
      const trimmed = line.trim();
      if (/^<\//.test(trimmed)) level = Math.max(level - 1, 0);
      const value = `${"  ".repeat(level)}${trimmed}`;
      if (/^<[^!/][^>]*[^/]?>$/.test(trimmed) && !trimmed.includes("</")) level += 1;
      return value;
    }).join("\n");
    setOutput(formatted);
    setError("");
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>HTML Formatter</h1><p>Beautify HTML markup</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      <div className="tool-two-column">
        <div><label htmlFor="html-format-input" className="output-label">HTML input</label><textarea id="html-format-input" className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} style={{height: "320px"}} /></div>
        <div><label htmlFor="html-format-output" className="output-label">Formatted HTML</label><textarea id="html-format-output" className="tool-textarea" value={output} readOnly style={{height: "320px", background: "#0a0d1a"}} /></div>
      </div>
      <button className="tool-button" onClick={format} style={{width: "100%"}}>Format HTML</button>
    </div>
  );
}
