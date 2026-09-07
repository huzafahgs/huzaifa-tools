import { useEffect, useState } from 'react';
import '../../styles/Tool.css';
import './batch.css';
export function Shell({ title, description, error, busy, status, children }) {
  return <div className="tool-container batch-tool" aria-busy={busy}>
    <div className="tool-header"><h1>{title}</h1><p>{description}</p></div>
    <p className="batch-local">Local processing · Inputs are processed in this browser and are not uploaded by this tool.</p>
    {error && <p role="alert" className="error-message">{error}</p>}
    <p role="status" aria-live="polite">{busy ? status || 'Processing…' : status}</p>
    {children}
  </div>;
}
export function Download({ blob, name, preview = false }) {
  const [url, setUrl] = useState('');
  useEffect(() => { const next = URL.createObjectURL(blob); setUrl(next); return () => URL.revokeObjectURL(next); }, [blob]);
  return <div className="batch-download">{preview && url && <img src={url} alt={`Output preview: ${name}`} />}<a className="tool-button" href={url || undefined} download={name}>Download {name}</a><small>{(blob.size / 1024).toFixed(1)} KB · {blob.type}</small></div>;
}
export function FileOrder({ files, setFiles }) {
  const move = (index, offset) => { const next = [...files]; [next[index], next[index + offset]] = [next[index + offset], next[index]]; setFiles(next); };
  return <ol className="batch-files">{files.map((file, index) => <li key={`${index}-${file.name}`}><span>{file.name}</span><button type="button" disabled={!index} onClick={() => move(index, -1)} aria-label={`Move ${file.name} up`}>↑</button><button type="button" disabled={index === files.length - 1} onClick={() => move(index, 1)} aria-label={`Move ${file.name} down`}>↓</button><button type="button" onClick={() => setFiles(files.filter((_, i) => i !== index))} aria-label={`Remove ${file.name}`}>Remove</button></li>)}</ol>;
}
