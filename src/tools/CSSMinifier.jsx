import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function CSSMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = "CSS Minifier - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Minify CSS by removing comments, whitespace, and unnecessary separators.");
  }, []);

  const minify = () => {
    if (!input.trim()) {
      setError("Enter CSS before minifying.");
      setOutput("");
      return;
    }
    const minified = input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,>+~])\s*/g, "$1").replace(/;}/g, "}").trim();
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
      <div className="tool-header"><h1>{ "{}" } CSS Minifier</h1><p>Compress CSS for faster delivery</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}
      <div className="tool-two-column">
        <div><label htmlFor="css-input" className="output-label">CSS input</label><textarea id="css-input" className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder="body { color: gold; }" style={{height: "320px"}} /></div>
        <div><label htmlFor="css-output" className="output-label">Minified CSS</label><textarea id="css-output" className="tool-textarea" value={output} readOnly style={{height: "320px", background: "#0a0d1a"}} /></div>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px"}}>
        <button className="tool-button" onClick={minify}>Minify CSS</button>
        <button className="tool-button" onClick={copy} disabled={!output}>Copy CSS</button>
      </div>
    </div>
  );
}
