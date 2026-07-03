import { useState } from "react";
import "../styles/Tool.css";

export default function CharacterCounter() {
  const [text, setText] = useState("");

  const charCount = text.length;
  const charCountNoSpace = text.replace(/\s/g, "").length;
  const wordCount = text.trim().split(/\s+/).filter(w => w).length;
  const lineCount = text.split('\n').filter(l => l.trim()).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔤 Character Counter</h1>
        <p>Count characters, words, and lines in your text</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        className="tool-textarea"
      />

      <div className="tool-two-column">
        <div>
          <div className="stats-grid" style={{gridTemplateColumns: "1fr 1fr"}}>
            <div className="stat-box">
              <div className="stat-value">{charCount}</div>
              <div className="stat-label">Total Chars</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{charCountNoSpace}</div>
              <div className="stat-label">Chars (No Space)</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{wordCount}</div>
              <div className="stat-label">Words</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{lineCount}</div>
              <div className="stat-label">Lines</div>
            </div>
          </div>
        </div>
        <div>
          <div style={{marginBottom: "20px"}}>
            <button className="tool-button" onClick={handleCopy}>Copy Text</button>
            <button className="tool-button" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}
