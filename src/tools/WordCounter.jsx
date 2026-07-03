import { useState } from "react";
import "../styles/Tool.css";

export default function WordCounter() {
  const [text, setText] = useState("");

  const wordCount = text.trim().split(/\s+/).filter(w => w).length;
  const charCount = text.length;
  const charCountNoSpace = text.replace(/\s/g, "").length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphCount = text.split(/\n\n+/).filter(p => p.trim()).length;

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📄 Word Counter</h1>
        <p>Count words, characters, and sentences in your text</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        className="tool-textarea"
      />

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-value">{wordCount}</div>
          <div className="stat-label">Words</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{charCount}</div>
          <div className="stat-label">Characters</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{charCountNoSpace}</div>
          <div className="stat-label">Characters (No Space)</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{sentenceCount}</div>
          <div className="stat-label">Sentences</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{paragraphCount}</div>
          <div className="stat-label">Paragraphs</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{Math.ceil(wordCount / 200)}</div>
          <div className="stat-label">Reading Time (min)</div>
        </div>
      </div>
    </div>
  );
}
