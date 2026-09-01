import { useEffect, useMemo, useState } from "react";
import "../styles/Tool.css";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testText, setTestText] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Regex Tester - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Test JavaScript regular expressions with flags, match counts, groups, and highlighted results.");
  }, []);

  const flagString = Object.entries(flags).filter(([, enabled]) => enabled).map(([flag]) => flag).join("");

  const matches = useMemo(() => {
    if (!pattern || !testText) return [];
    try {
      setError("");
      const regex = new RegExp(pattern, flagString.includes("g") ? flagString : `${flagString}g`);
      return [...testText.matchAll(regex)].filter(match => match[0] !== "");
    } catch (e) {
      setError(e.message);
      return [];
    }
  }, [pattern, testText, flagString]);

  const highlighted = useMemo(() => {
    if (!matches.length) return testText;
    let cursor = 0;
    return matches.map((match, index) => {
      const before = testText.slice(cursor, match.index);
      cursor = match.index + match[0].length;
      return { before, match: match[0], key: `${match.index}-${index}` };
    }).concat({ before: testText.slice(cursor), match: "", key: "tail" });
  }, [matches, testText]);

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>.* Regex Tester</h1>
        <p>Test regular expressions with live matches and groups</p>
      </div>

      {error && <div className="error-message" role="alert">Invalid regex: {error}</div>}
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="regex-pattern">Regular expression</label>
          <input id="regex-pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="\\b\\w+@\\w+\\.com\\b" />
        </div>
        <div className="form-group">
          <label>Flags</label>
          <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
            {Object.keys(flags).map(flag => (
              <label key={flag} style={{color: "white", display: "flex", gap: "6px", alignItems: "center"}}>
                <input type="checkbox" checked={flags[flag]} onChange={() => setFlags(prev => ({...prev, [flag]: !prev[flag]}))} />
                {flag}
              </label>
            ))}
          </div>
        </div>
      </div>

      <label htmlFor="regex-text" className="output-label">Test text</label>
      <textarea id="regex-text" value={testText} onChange={(e) => setTestText(e.target.value)} placeholder="Paste text to test..." className="tool-textarea" />

      <div className="info-message" role="status" aria-live="polite">
        {pattern && testText ? `${matches.length} match${matches.length === 1 ? "" : "es"} found.` : "Enter a pattern and test text to begin."}
      </div>

      {testText && (
        <div className="output-box" aria-live="polite" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>
          <div className="output-label">Highlighted Result</div>
          {Array.isArray(highlighted) ? highlighted.map(part => (
            <span key={part.key}>{part.before}{part.match && <mark style={{background: "gold", color: "black", padding: "2px 4px", borderRadius: "4px"}}>{part.match}</mark>}</span>
          )) : highlighted}
        </div>
      )}
    </div>
  );
}
