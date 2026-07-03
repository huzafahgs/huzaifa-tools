import { useState } from "react";
import "../styles/Tool.css";

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const conversions = {
    uppercase: (t) => t.toUpperCase(),
    lowercase: (t) => t.toLowerCase(),
    capitalize: (t) => t.replace(/\b\w/g, (char) => char.toUpperCase()),
    alternating: (t) => t.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join(''),
    sentence: (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(),
    inverse: (t) => t.split('').map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('')
  };

  const convert = (type) => {
    setResult(conversions[type](text));
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔠 Text Case Converter</h1>
        <p>Convert text between different cases</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        className="tool-textarea"
      />

      <div style={{display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "30px"}}>
        <button className="tool-button" onClick={() => convert('uppercase')}>UPPERCASE</button>
        <button className="tool-button" onClick={() => convert('lowercase')}>lowercase</button>
        <button className="tool-button" onClick={() => convert('capitalize')}>Capitalize Words</button>
        <button className="tool-button" onClick={() => convert('alternating')}>aLtErNaTiNg</button>
        <button className="tool-button" onClick={() => convert('sentence')}>Sentence case</button>
        <button className="tool-button" onClick={() => convert('inverse')}>InVeRsE cAsE</button>
      </div>

      {result && (
        <div className="output-box">
          <div className="output-label">Result:</div>
          {result}
          <button className="tool-button-secondary" onClick={copyResult} style={{marginTop: "15px", width: "100%"}}>
            Copy Result
          </button>
        </div>
      )}
    </div>
  );
}
