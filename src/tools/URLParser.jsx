import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function URLParser() {
  const [input, setInput] = useState("");
  const [parts, setParts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "URL Parser - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Parse URLs into protocol, hostname, path, query parameters, and hash fragments.");
  }, []);

  const parse = () => {
    try {
      if (!input.trim()) throw new Error("Enter a URL before parsing.");
      const url = new URL(input.trim());
      setParts({
        Protocol: url.protocol,
        Host: url.host,
        Hostname: url.hostname,
        Port: url.port || "Default",
        Path: url.pathname,
        Query: url.search || "None",
        Hash: url.hash || "None",
        Parameters: [...url.searchParams.entries()].map(([key, value]) => `${key}: ${value}`).join("\n") || "None"
      });
      setError("");
    } catch {
      setParts(null);
      setError("Enter a valid absolute URL, including http:// or https://.");
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>🔎 URL Parser</h1><p>Break URLs into readable parts</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      <label htmlFor="url-parser-input" className="output-label">URL</label>
      <input id="url-parser-input" className="tool-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="https://example.com/path?name=value#section" />
      <button className="tool-button" onClick={parse} style={{width: "100%", marginBottom: "30px"}}>Parse URL</button>
      {parts && <div className="result-box" aria-live="polite">{Object.entries(parts).map(([key, value]) => <div className="result-item" key={key}><span className="result-label">{key}</span><span className="result-value" style={{overflowWrap: "anywhere", whiteSpace: "pre-wrap"}}>{value}</span></div>)}</div>}
    </div>
  );
}
