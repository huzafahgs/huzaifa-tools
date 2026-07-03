import { useState } from "react";
import "../styles/Tool.css";

export default function MorseCodeConverter() {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  const morseMap = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
    G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
    M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
    S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..",
    0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-",
    5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
    "!": "-.-.--", "/": "-..-.", "(": "-.--.-", ")": "-.--.-",
    "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-",
    "+": ".-.-.", "-": "-....-", _: "..--.-", "\"": ".-..-.",
    "$": "...-..-", "@": ".--.-."
  };

  const convert = () => {
    if (!text) {
      alert("Please enter text!");
      return;
    }
    const converted = text
      .toUpperCase()
      .split("")
      .map(char => morseMap[char] || "")
      .filter(code => code)
      .join(" ");
    setMorse(converted);
  };

  const copy = () => {
    navigator.clipboard.writeText(morse);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📡 Morse Code Converter</h1>
        <p>Convert text to Morse code</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert..."
        className="tool-textarea"
      />

      <button className="tool-button" onClick={convert} style={{width: "100%", marginBottom: "30px"}}>
        Convert to Morse
      </button>

      {morse && (
        <div className="output-box">
          <div className="output-label">Morse Code:</div>
          <div style={{fontSize: "16px", fontWeight: "bold", color: "gold", wordBreak: "break-all"}}>
            {morse}
          </div>
          <button className="tool-button-secondary" onClick={copy} style={{marginTop: "15px", width: "100%"}}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
