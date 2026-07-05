import { useState } from "react";
import "../styles/Tool.css";

export default function MorseCodeConverter() {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

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

  const copyToClipboard = async (value) => {
    if (!value) {
      throw new Error("There is no Morse code to copy yet.");
    }

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (!copied) {
      throw new Error("Clipboard access is not available in this browser.");
    }
  };

  const convert = async () => {
    if (!text.trim()) {
      setError("Enter text before converting to Morse code.");
      setStatus("");
      setMorse("");
      return;
    }

    setLoadingAction("convert");
    setError("");
    setStatus("");
    const converted = text
      .toUpperCase()
      .split("")
      .map(char => char === " " ? "/" : morseMap[char] || "")
      .filter(code => code)
      .join(" ");

    if (!converted) {
      setMorse("");
      setError("No supported Morse code characters were found.");
      setLoadingAction("");
      return;
    }

    setMorse(converted);
    setStatus("Text converted to Morse code.");
    setLoadingAction("");
  };

  const copy = async () => {
    setLoadingAction("copy");
    setError("");
    setStatus("");
    try {
      await copyToClipboard(morse);
      setStatus("Copied to clipboard.");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <div className="tool-container" aria-busy={loadingAction ? "true" : "false"}>
      <div className="tool-header">
        <h1>📡 Morse Code Converter</h1>
        <p>Convert text to Morse code</p>
      </div>

      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}

      <label htmlFor="morse-input" className="output-label">
        Text to convert
      </label>
      <textarea
        id="morse-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
          setStatus("");
        }}
        placeholder="Enter text to convert..."
        className="tool-textarea"
        aria-describedby="morse-help"
      />
      <p id="morse-help" style={{ color: "#aaa", marginTop: "-20px", marginBottom: "20px" }}>
        Letters, numbers, common punctuation, and spaces are supported.
      </p>

      <button className="tool-button" onClick={convert} disabled={Boolean(loadingAction)} style={{width: "100%", marginBottom: "30px"}}>
        {loadingAction === "convert" ? "Converting..." : "Convert to Morse"}
      </button>

      {morse && (
        <div className="output-box" aria-live="polite">
          <div className="output-label">Morse Code:</div>
          <div style={{fontSize: "16px", fontWeight: "bold", color: "gold", wordBreak: "break-all"}}>
            {morse}
          </div>
          <button className="tool-button-secondary" onClick={copy} disabled={Boolean(loadingAction)} style={{marginTop: "15px", width: "100%"}}>
            {loadingAction === "copy" ? "Copying..." : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
