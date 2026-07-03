import { useState } from "react";
import "../styles/Tool.css";

export default function TextReverser() {
  const [text, setText] = useState("");
  const [reversed, setReversed] = useState("");

  const reverse = () => {
    setReversed(text.split('').reverse().join(''));
  };

  const reverseWords = () => {
    setReversed(text.split(' ').reverse().join(' '));
  };

  const reverseParagraphs = () => {
    setReversed(text.split('\n').reverse().join('\n'));
  };

  const copy = () => {
    navigator.clipboard.writeText(reversed);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>↩️ Text Reverser</h1>
        <p>Reverse text in different ways</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        className="tool-textarea"
      />

      <div style={{display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "30px"}}>
        <button className="tool-button" onClick={reverse}>Reverse Characters</button>
        <button className="tool-button" onClick={reverseWords}>Reverse Words</button>
        <button className="tool-button" onClick={reverseParagraphs}>Reverse Paragraphs</button>
      </div>

      {reversed && (
        <div className="output-box">
          <div className="output-label">Reversed Text:</div>
          {reversed}
          <button className="tool-button-secondary" onClick={copy} style={{marginTop: "15px", width: "100%"}}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
