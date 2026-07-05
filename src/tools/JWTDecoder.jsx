import { useEffect, useState } from "react";
import "../styles/Tool.css";

export default function JWTDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    document.title = "JWT Decoder - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Decode JWT headers and payloads locally in your browser without sending tokens to a server.");
  }, []);

  const decodePart = (part) => JSON.parse(decodeURIComponent(atob(part.replace(/-/g, "+").replace(/_/g, "/")).split("").map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join("")));
  const copy = async () => {
    setLoading("copy");
    try {
      await navigator.clipboard.writeText(JSON.stringify(decoded, null, 2));
      setStatus("Decoded JWT copied.");
      setError("");
    } catch {
      setError("Clipboard access is not available.");
    } finally {
      setLoading("");
    }
  };

  const decode = () => {
    setLoading("decode");
    try {
      const parts = token.trim().split(".");
      if (parts.length !== 3) throw new Error("JWT must contain header, payload, and signature.");
      const data = { header: decodePart(parts[0]), payload: decodePart(parts[1]), signature: parts[2] };
      setDecoded(data);
      setStatus("JWT decoded locally. Signature is not verified.");
      setError("");
    } catch (e) {
      setDecoded(null);
      setStatus("");
      setError(e.message);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="tool-container" aria-busy={loading ? "true" : "false"}>
      <div className="tool-header"><h1>🔓 JWT Decoder</h1><p>Decode JWT tokens safely in your browser</p></div>
      {error && <div className="error-message" role="alert">{error}</div>}
      {status && <div className="info-message" role="status" aria-live="polite">{status}</div>}
      <label htmlFor="jwt-input" className="output-label">JWT token</label>
      <textarea id="jwt-input" value={token} onChange={(e) => setToken(e.target.value)} placeholder="eyJhbGciOi..." className="tool-textarea" />
      <button className="tool-button" onClick={decode} disabled={loading || !token.trim()} style={{width: "100%", marginBottom: "30px"}}>{loading === "decode" ? "Decoding..." : "Decode JWT"}</button>
      {decoded && (
        <div className="tool-two-column">
          <div className="output-box" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}><div className="output-label">Header</div>{JSON.stringify(decoded.header, null, 2)}</div>
          <div className="output-box" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}><div className="output-label">Payload</div>{JSON.stringify(decoded.payload, null, 2)}</div>
          <button className="tool-button-secondary" onClick={copy} disabled={loading} style={{gridColumn: "1 / -1"}}>{loading === "copy" ? "Copying..." : "Copy Decoded JSON"}</button>
        </div>
      )}
    </div>
  );
}
