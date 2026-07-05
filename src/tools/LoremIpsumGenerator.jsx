import { useEffect, useState } from "react";
import "../styles/Tool.css";

const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(" ");

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(4);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = "Lorem Ipsum Generator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Generate clean lorem ipsum placeholder text for UI designs, mockups, and drafts.");
  }, []);

  const generate = () => {
    const pCount = Math.min(20, Math.max(1, Number(paragraphs) || 1));
    const sCount = Math.min(12, Math.max(1, Number(sentences) || 1));
    const text = Array.from({ length: pCount }, (_, p) => Array.from({ length: sCount }, (_, s) => {
      const start = (p * 7 + s * 5) % words.length;
      const sentenceWords = Array.from({ length: 10 + ((p + s) % 8) }, (_, i) => words[(start + i) % words.length]);
      return `${sentenceWords.join(" ").replace(/^\w/, c => c.toUpperCase())}.`;
    }).join(" ")).join("\n\n");
    setOutput(text);
    setStatus(`Generated ${pCount} paragraph${pCount === 1 ? "" : "s"}.`);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setStatus("Copied to clipboard.");
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>¶ Lorem Ipsum Generator</h1><p>Generate polished placeholder copy</p></div>
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}
      <div className="form-grid">
        <div className="form-group"><label htmlFor="lorem-paragraphs">Paragraphs</label><input id="lorem-paragraphs" type="number" min="1" max="20" value={paragraphs} onChange={(e) => setParagraphs(e.target.value)} /></div>
        <div className="form-group"><label htmlFor="lorem-sentences">Sentences per paragraph</label><input id="lorem-sentences" type="number" min="1" max="12" value={sentences} onChange={(e) => setSentences(e.target.value)} /></div>
      </div>
      <button className="tool-button" onClick={generate} style={{width: "100%", marginBottom: "30px"}}>Generate Text</button>
      {output && <div className="output-box" aria-live="polite" style={{whiteSpace: "pre-wrap"}}><div className="output-label">Generated Text</div>{output}<button className="tool-button-secondary" onClick={copy} style={{width: "100%", marginTop: "15px"}}>Copy Text</button></div>}
    </div>
  );
}
