import { useEffect, useState } from "react";
import "../styles/Tool.css";
import { parseWebUrl } from "../utils/urlParser";

export default function URLParser() {
  const [input, setInput] = useState("");
  const [parts, setParts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "URL Parser - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Parse URLs into protocol, hostname, path, query parameters, and hash fragments.");
  }, []);

  const parse = (event) => {
    event.preventDefault();
    try {
      setParts(parseWebUrl(input));
      setError("");
    } catch (parseError) {
      setParts(null);
      setError(parseError.message);
    }
  };

  const updateInput = (event) => {
    setInput(event.target.value);
    setParts(null);
    setError("");
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>🔎 URL Parser</h1><p>Break URLs into readable parts</p></div>
      <form onSubmit={parse}>
        {error && <div className="error-message" role="alert">{error}</div>}
        <label htmlFor="url-parser-input" className="output-label">Absolute web URL</label>
        <input id="url-parser-input" className="tool-input" type="url" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck="false" value={input} onChange={updateInput} placeholder="https://example.com/path?name=value#section" />
        <button className="tool-button" type="submit" style={{width: "100%", marginBottom: "30px"}}>Parse URL</button>
      </form>
      {parts && <div className="result-box" aria-live="polite">{Object.entries(parts).map(([key, value]) => <div className="result-item" key={key}><span className="result-label">{key}</span><span className="result-value" style={{overflowWrap: "anywhere", whiteSpace: "pre-wrap"}}>{value}</span></div>)}</div>}
    </div>
  );
}
