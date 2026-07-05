import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function JavaScriptMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = "JavaScript Minifier - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Minify simple JavaScript snippets by removing comments and extra whitespace.");
  }, []);

  const minify = () => {
    if (!input.trim()) {
      setError("Enter JavaScript before minifying.");
      setOutput("");
      return;
    }
    const minified = input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1").replace(/\s+/g, " ").replace(/\s*([{}();,:=+\-*/<>])\s*/g, "$1").trim();
    setOutput(minified);
    setError("");
    setStatus(`Reduced from ${input.length} to ${minified.length} characters.`);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setStatus("Copied to clipboard.");
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>JS JavaScript Minifier</h1><p>Compress JavaScript snippets quickly</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}
      <div className="tool-two-column">
        <div><label htmlFor="js-input" className="output-label">JavaScript input</label><textarea id="js-input" className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder="function hello() { console.log('Hi'); }" style={{height: "320px"}} /></div>
        <div><label htmlFor="js-output" className="output-label">Minified JavaScript</label><textarea id="js-output" className="tool-textarea" value={output} readOnly style={{height: "320px", background: "#0a0d1a"}} /></div>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px"}}>
        <button className="tool-button" onClick={minify}>Minify JS</button>
        <button className="tool-button" onClick={copy} disabled={!output}>Copy JS</button>
      </div>
    </div>
  );
}
