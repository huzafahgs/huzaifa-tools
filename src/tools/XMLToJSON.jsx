import { useEffect, useState } from "react";
import "../styles/Tool.css";

const nodeToObject = (node) => {
  if (node.nodeType === Node.TEXT_NODE) return node.nodeValue.trim();
  const obj = {};
  if (node.attributes?.length) {
    obj["@attributes"] = {};
    [...node.attributes].forEach(attr => { obj["@attributes"][attr.name] = attr.value; });
  }
  const children = [...node.childNodes].filter(child => child.nodeType !== Node.TEXT_NODE || child.nodeValue.trim());
  if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) return children[0].nodeValue.trim();
  children.forEach(child => {
    const value = nodeToObject(child);
    if (value === "") return;
    const name = child.nodeName;
    if (obj[name]) obj[name] = Array.isArray(obj[name]) ? [...obj[name], value] : [obj[name], value];
    else obj[name] = value;
  });
  return obj;
};

export default function XMLToJSON() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "XML to JSON Converter - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Convert XML documents into readable JSON with attributes preserved.");
  }, []);

  const convert = () => {
    try {
      if (!input.trim()) throw new Error("Enter XML before converting.");
      const doc = new DOMParser().parseFromString(input, "application/xml");
      const parseError = doc.querySelector("parsererror");
      if (parseError) throw new Error("Invalid XML.");
      setOutput(JSON.stringify({ [doc.documentElement.nodeName]: nodeToObject(doc.documentElement) }, null, 2));
      setError("");
    } catch (e) {
      setOutput("");
      setError(e.message);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>↔ XML to JSON</h1><p>Convert XML into structured JSON</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      <div className="tool-two-column">
        <div><label htmlFor="xml-json-input" className="output-label">XML input</label><textarea id="xml-json-input" className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} style={{height: "320px"}} /></div>
        <div><label htmlFor="xml-json-output" className="output-label">JSON output</label><textarea id="xml-json-output" className="tool-textarea" value={output} readOnly style={{height: "320px", background: "#0a0d1a"}} /></div>
      </div>
      <button className="tool-button" onClick={convert} style={{width: "100%"}}>Convert XML to JSON</button>
    </div>
  );
}
