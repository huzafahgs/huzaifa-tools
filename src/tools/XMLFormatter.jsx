import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function XMLFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = "XML Formatter - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Format and validate XML with clean indentation directly in your browser.");
  }, []);

  const format = () => {
    try {
      if (!input.trim()) throw new Error("Enter XML before formatting.");
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "application/xml");
      const parseError = doc.querySelector("parsererror");
      if (parseError) throw new Error(parseError.textContent || "Invalid XML.");
      const raw = new XMLSerializer().serializeToString(doc);
      const lines = raw.replace(/>\s*</g, ">\n<").split("\n");
      let level = 0;
      const formatted = lines.map(line => {
        if (/^<\//.test(line)) level = Math.max(level - 1, 0);
        const value = `${"  ".repeat(level)}${line}`;
        if (/^<[^!?/][^>]*[^/]?>$/.test(line) && !line.includes("</")) level += 1;
        return value;
      }).join("\n");
      setOutput(formatted);
      setError("");
      setStatus("XML formatted successfully.");
    } catch (e) {
      setOutput("");
      setStatus("");
      setError(e.message);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setStatus("Copied to clipboard.");
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>XML Formatter</h1><p>Format and validate XML markup</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}
      <div className="tool-two-column">
        <div><label htmlFor="xml-format-input" className="output-label">XML input</label><textarea id="xml-format-input" className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} placeholder="<root><item>Value</item></root>" style={{height: "320px"}} /></div>
        <div><label htmlFor="xml-format-output" className="output-label">Formatted XML</label><textarea id="xml-format-output" className="tool-textarea" value={output} readOnly style={{height: "320px", background: "#0a0d1a"}} /></div>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px"}}><button className="tool-button" onClick={format}>Format XML</button><button className="tool-button" onClick={copy} disabled={!output}>Copy XML</button></div>
    </div>
  );
}
