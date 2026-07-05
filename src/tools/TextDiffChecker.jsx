import { useEffect, useMemo, useState } from "react";
import "../styles/Tool.css";

export default function TextDiffChecker() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  useEffect(() => {
    document.title = "Text Diff Checker - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Compare two text blocks line by line and highlight differences.");
  }, []);

  const rows = useMemo(() => {
    const a = left.split(/\r?\n/);
    const b = right.split(/\r?\n/);
    const length = Math.max(a.length, b.length);
    return Array.from({ length }, (_, i) => ({ line: i + 1, left: a[i] ?? "", right: b[i] ?? "", same: (a[i] ?? "") === (b[i] ?? "") }));
  }, [left, right]);

  const changed = rows.filter(row => !row.same).length;

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>≠ Text Diff Checker</h1><p>Compare text line by line</p></div>
      <div className="tool-two-column">
        <div><label htmlFor="diff-left" className="output-label">Original text</label><textarea id="diff-left" className="tool-textarea" value={left} onChange={(e) => setLeft(e.target.value)} style={{height: "260px"}} /></div>
        <div><label htmlFor="diff-right" className="output-label">Changed text</label><textarea id="diff-right" className="tool-textarea" value={right} onChange={(e) => setRight(e.target.value)} style={{height: "260px"}} /></div>
      </div>
      <div className="info-message" role="status" aria-live="polite">{changed} different line{changed === 1 ? "" : "s"} found.</div>
      <div className="output-box" style={{overflowX: "auto"}}>
        <table className="tool-table"><thead><tr><th>Line</th><th>Original</th><th>Changed</th></tr></thead><tbody>{rows.map(row => <tr key={row.line} style={{background: row.same ? "transparent" : "#2a1f08"}}><td>{row.line}</td><td>{row.left}</td><td>{row.right}</td></tr>)}</tbody></table>
      </div>
    </div>
  );
}
