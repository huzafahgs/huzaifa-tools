import { useState } from "react";
import "../styles/Tool.css";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>{ } JSON Formatter</h1>
        <p>Format and validate JSON code</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="tool-two-column">
        <div>
          <h3 style={{marginBottom: "10px", color: "gold"}}>Input JSON</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter JSON code...'
            className="tool-textarea"
            style={{height: "300px"}}
          />
        </div>
        <div>
          <h3 style={{marginBottom: "10px", color: "gold"}}>Output</h3>
          <textarea
            value={output}
            readOnly
            className="tool-textarea"
            style={{height: "300px", background: "#0a0d1a"}}
          />
        </div>
      </div>

      <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
        <button className="tool-button" onClick={format}>Format JSON</button>
        <button className="tool-button" onClick={minify}>Minify JSON</button>
        <button className="tool-button" onClick={copy}>Copy Output</button>
      </div>
    </div>
  );
}
