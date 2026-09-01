import { useEffect, useState } from "react";
import "../styles/Tool.css";

const escapeXml = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const toXml = (value, name = "item", level = 0) => {
  const pad = "  ".repeat(level);
  if (Array.isArray(value)) return value.map(item => toXml(item, name, level)).join("\n");
  if (value && typeof value === "object") {
    const body = Object.entries(value).map(([key, child]) => toXml(child, key, level + 1)).join("\n");
    return `${pad}<${name}>\n${body}\n${pad}</${name}>`;
  }
  return `${pad}<${name}>${escapeXml(value ?? "")}</${name}>`;
};

export default function JSONToXML() {
  const [input, setInput] = useState("");
  const [root, setRoot] = useState("root");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "JSON to XML Converter - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Convert JSON objects and arrays into formatted XML.");
  }, []);

  const convert = () => {
    try {
      if (!input.trim()) throw new Error("Enter JSON before converting.");
      const parsed = JSON.parse(input);
      setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n${toXml(parsed, root.trim() || "root")}`);
      setError("");
    } catch (e) {
      setOutput("");
      setError(e.message);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>↕ JSON to XML</h1><p>Convert JSON into XML markup</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      <div className="form-group"><label htmlFor="json-xml-root">Root element name</label><input id="json-xml-root" value={root} onChange={(e) => setRoot(e.target.value.replace(/[^A-Za-z0-9_-]/g, ""))} /></div>
      <div className="tool-two-column">
        <div><label htmlFor="json-xml-input" className="output-label">JSON input</label><textarea id="json-xml-input" className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} style={{height: "320px"}} /></div>
        <div><label htmlFor="json-xml-output" className="output-label">XML output</label><textarea id="json-xml-output" className="tool-textarea" value={output} readOnly style={{height: "320px", background: "#0a0d1a"}} /></div>
      </div>
      <button className="tool-button" onClick={convert} style={{width: "100%"}}>Convert JSON to XML</button>
    </div>
  );
}
