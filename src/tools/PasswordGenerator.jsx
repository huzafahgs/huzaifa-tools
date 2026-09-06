import { useState } from "react";
import "../styles/Tool.css";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const generatePassword = () => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    setStatus("");
    if (!chars) { setPassword(""); setStatus("Choose at least one character set."); return; }
    try {
      let pass = "";
      const bytes = new Uint8Array(128);
      // Reject excess values so every character has equal probability.
      const limit = 256 - (256 % chars.length);
      while (pass.length < length) {
        crypto.getRandomValues(bytes);
        for (const byte of bytes) {
          if (byte < limit) pass += chars[byte % chars.length];
          if (pass.length === length) break;
        }
      }
      setPassword(pass);
    } catch { setPassword(""); setStatus("Secure generation is unavailable in this browser."); }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(password); setStatus("Password copied."); }
    catch { setStatus("Unable to copy. Select the password and copy it manually."); }
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🔑 Password Generator</h1>
        <p>Generate a random password using the selected character sets.</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="password-length">Password length: {length}</label>
          <input
            id="password-length"
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="slider-input"
          />
        </div>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px"}}>
        <label style={{display: "flex", alignItems: "center", gap: "10px", cursor: "pointer"}}>
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            style={{width: "20px", height: "20px"}}
          />
          <span>Uppercase (A-Z)</span>
        </label>
        <label style={{display: "flex", alignItems: "center", gap: "10px", cursor: "pointer"}}>
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            style={{width: "20px", height: "20px"}}
          />
          <span>Lowercase (a-z)</span>
        </label>
        <label style={{display: "flex", alignItems: "center", gap: "10px", cursor: "pointer"}}>
          <input
            type="checkbox"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
            style={{width: "20px", height: "20px"}}
          />
          <span>Numbers (0-9)</span>
        </label>
        <label style={{display: "flex", alignItems: "center", gap: "10px", cursor: "pointer"}}>
          <input
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
            style={{width: "20px", height: "20px"}}
          />
          <span>Symbols (!@#$)</span>
        </label>
      </div>

      <button className="tool-button" onClick={generatePassword} style={{width: "100%", marginBottom: "20px"}}>
        Generate Password
      </button>

      {status && <p role="status">{status}</p>}
      {password && (
        <div className="output-box">
          <div className="output-label">Generated Password:</div>
          <div style={{fontSize: "18px", fontWeight: "bold", marginBottom: "15px", wordBreak: "break-all"}}>
            {password}
          </div>
          <button className="tool-button-secondary" onClick={copy} style={{width: "100%"}}>
            Copy Password
          </button>
        </div>
      )}
    </div>
  );
}
