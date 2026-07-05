import { useEffect, useState } from "react";
import "../styles/Tool.css";

const algorithms = { "SHA-256": "SHA-256", "SHA-384": "SHA-384", "SHA-512": "SHA-512" };
const toHex = (buffer) => [...new Uint8Array(buffer)].map(byte => byte.toString(16).padStart(2, "0")).join("");

export default function HMACGenerator() {
  const [message, setMessage] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    document.title = "HMAC Generator - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Generate HMAC signatures locally using Web Crypto SHA-256, SHA-384, or SHA-512.");
  }, []);

  const generate = async () => {
    try {
      if (!message.trim() || !secret.trim()) throw new Error("Message and secret key are required.");
      setLoading("generate");
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: algorithms[algorithm] }, false, ["sign"]);
      const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
      setOutput(toHex(signature));
      setError("");
    } catch (e) {
      setOutput("");
      setError(e.message);
    } finally {
      setLoading("");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <div className="tool-container" aria-busy={loading ? "true" : "false"}>
      <div className="tool-header"><h1>🔏 HMAC Generator</h1><p>Generate secure HMAC signatures locally</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      <div className="form-grid">
        <div className="form-group"><label htmlFor="hmac-algorithm">Algorithm</label><select id="hmac-algorithm" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>{Object.keys(algorithms).map(name => <option key={name}>{name}</option>)}</select></div>
        <div className="form-group"><label htmlFor="hmac-secret">Secret key</label><input id="hmac-secret" type="password" value={secret} onChange={(e) => setSecret(e.target.value)} /></div>
      </div>
      <label htmlFor="hmac-message" className="output-label">Message</label><textarea id="hmac-message" className="tool-textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="tool-button" onClick={generate} disabled={Boolean(loading)} style={{width: "100%", marginBottom: "30px"}}>{loading ? "Generating..." : "Generate HMAC"}</button>
      {output && <div className="output-box" style={{overflowWrap: "anywhere"}}><div className="output-label">Signature</div>{output}<button className="tool-button-secondary" onClick={copy} style={{width: "100%", marginTop: "15px"}}>Copy Signature</button></div>}
    </div>
  );
}
