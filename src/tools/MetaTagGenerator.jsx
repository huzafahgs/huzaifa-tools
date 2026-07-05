import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function MetaTagGenerator() {
  const [form, setForm] = useState({ title: "", description: "", url: "", image: "", site: "Huzaifa Tools" });
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = "Meta Tag Generator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Generate SEO, Open Graph, and Twitter card meta tags for webpages.");
  }, []);

  const update = (key, value) => setForm(prev => ({...prev, [key]: value}));
  const generate = () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      setOutput("");
      return;
    }
    const tags = [
      `<title>${form.title}</title>`,
      `<meta name="description" content="${form.description}">`,
      form.url && `<link rel="canonical" href="${form.url}">`,
      `<meta property="og:title" content="${form.title}">`,
      `<meta property="og:description" content="${form.description}">`,
      form.url && `<meta property="og:url" content="${form.url}">`,
      form.image && `<meta property="og:image" content="${form.image}">`,
      `<meta property="og:site_name" content="${form.site}">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${form.title}">`,
      `<meta name="twitter:description" content="${form.description}">`,
      form.image && `<meta name="twitter:image" content="${form.image}">`
    ].filter(Boolean).join("\n");
    setOutput(tags);
    setError("");
    setStatus("Meta tags generated.");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setStatus("Copied to clipboard.");
  };

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>🏷️ Meta Tag Generator</h1><p>Create SEO and social sharing meta tags</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="success-message" role="status" aria-live="polite">{status}</div>}
      <div className="form-grid">
        {[
          ["title", "Page title"], ["description", "Meta description"], ["url", "Canonical URL"], ["image", "Social image URL"], ["site", "Site name"]
        ].map(([key, label]) => (
          <div className="form-group" key={key}><label htmlFor={`meta-${key}`}>{label}</label><input id={`meta-${key}`} value={form[key]} onChange={(e) => update(key, e.target.value)} /></div>
        ))}
      </div>
      <button className="tool-button" onClick={generate} style={{width: "100%", marginBottom: "30px"}}>Generate Meta Tags</button>
      {output && <div className="output-box" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}><div className="output-label">Generated Tags</div>{output}<button className="tool-button-secondary" onClick={copy} style={{width: "100%", marginTop: "15px"}}>Copy Tags</button></div>}
    </div>
  );
}
