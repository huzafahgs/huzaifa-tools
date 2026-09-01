import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function RobotsTxtGenerator() {
  const [agent, setAgent] = useState("*");
  const [disallow, setDisallow] = useState("/admin\n/private");
  const [allow, setAllow] = useState("/");
  const [sitemap, setSitemap] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = "Robots.txt Generator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Generate robots.txt rules with user-agent, allow, disallow, and sitemap directives.");
  }, []);

  const generate = () => {
    const lines = [`User-agent: ${agent.trim() || "*"}`];
    allow.split(/\r?\n/).map(v => v.trim()).filter(Boolean).forEach(v => lines.push(`Allow: ${v}`));
    disallow.split(/\r?\n/).map(v => v.trim()).filter(Boolean).forEach(v => lines.push(`Disallow: ${v}`));
    if (sitemap.trim()) lines.push("", `Sitemap: ${sitemap.trim()}`);
    setOutput(lines.join("\n"));
    setStatus("Robots.txt generated.");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setStatus("Copied to clipboard.");
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "robots.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>🤖 Robots.txt Generator</h1><p>Create search engine crawler rules</p></div>
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}
      <div className="form-grid">
        <div className="form-group"><label htmlFor="robots-agent">User-agent</label><input id="robots-agent" value={agent} onChange={(e) => setAgent(e.target.value)} /></div>
        <div className="form-group"><label htmlFor="robots-sitemap">Sitemap URL</label><input id="robots-sitemap" value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" /></div>
      </div>
      <div className="tool-two-column">
        <div><label htmlFor="robots-allow" className="output-label">Allow paths</label><textarea id="robots-allow" className="tool-textarea" value={allow} onChange={(e) => setAllow(e.target.value)} style={{height: "180px"}} /></div>
        <div><label htmlFor="robots-disallow" className="output-label">Disallow paths</label><textarea id="robots-disallow" className="tool-textarea" value={disallow} onChange={(e) => setDisallow(e.target.value)} style={{height: "180px"}} /></div>
      </div>
      <button className="tool-button" onClick={generate} style={{width: "100%", marginBottom: "30px"}}>Generate Robots.txt</button>
      {output && <div className="output-box" style={{whiteSpace: "pre-wrap"}}><div className="output-label">robots.txt</div>{output}<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px", marginTop: "15px"}}><button className="tool-button-secondary" onClick={copy}>Copy</button><button className="tool-button-secondary" onClick={download}>Download</button></div></div>}
    </div>
  );
}
