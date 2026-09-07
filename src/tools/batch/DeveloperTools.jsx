import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Shell } from './BatchUI';
const names = { csv:'JSON to CSV', html:'HTML Minifier', css:'CSS Formatter', js:'JavaScript Formatter' };
const descriptions = { csv:'Convert a flat JSON object array into spreadsheet-ready CSV.', html:'Reduce tag whitespace and remove ordinary comments while preserving text spacing.', css:'Format CSS with consistent indentation and readable declarations.', js:'Format JavaScript with a parser, without executing your code.' };
function DeveloperTool({ mode }) {
  const [input,setInput] = useState(''), [output,setOutput] = useState(''), [error,setError] = useState(''), [status,setStatus] = useState(''), [busy,setBusy] = useState(false);
  const job = useRef(null);
  useEffect(() => () => { if (job.current) { job.current.worker.terminate(); clearTimeout(job.current.timer); } }, []);
  const blob = useMemo(() => output ? new Blob([output], { type:mode === 'csv' ? 'text/csv;charset=utf-8' : 'text/plain;charset=utf-8' }) : null, [output,mode]);
  const run = () => {
    setError(''); setOutput(''); setStatus('');
    if (!input.trim() || input.length > 250000) { setError('Enter between 1 and 250,000 characters.'); return; }
    setBusy(true);
    try {
      const worker = new Worker(new URL('./developer.worker.js', import.meta.url), { type:'module' });
      const finish = () => { worker.terminate(); clearTimeout(job.current?.timer); job.current = null; setBusy(false); };
      const timer = setTimeout(() => { finish(); setError('Processing timed out. Try a smaller input.'); }, 30000);
      job.current = { worker,timer };
      worker.onmessage = ({data}) => { finish(); if (data.error) setError(data.error); else { setOutput(data.output); setStatus(`Complete: ${input.length.toLocaleString()} input characters → ${data.output.length.toLocaleString()} output characters.`); } };
      worker.onerror = () => { finish(); setError('Could not load the processor. Reload and try again.'); };
      worker.postMessage({ mode,input });
    } catch (e) { setBusy(false); setError(e.message); }
  };
  return <Shell title={names[mode]} description={descriptions[mode]} {...{busy,error,status}}>
    <fieldset disabled={busy}>
      <label htmlFor="code-input">{mode === 'csv' ? 'JSON input' : 'Source code'}</label><textarea id="code-input" className="tool-textarea" value={input} maxLength={250000} spellCheck="false" onChange={e => { setInput(e.target.value); setOutput(''); setError(''); setStatus(''); }} />
      <small>Maximum 250,000 characters. Processing runs in a separate browser worker.</small>
      <div className="batch-actions"><button className="tool-button" onClick={run}>{mode === 'csv' ? 'Convert to CSV' : mode === 'html' ? 'Minify HTML' : 'Format code'}</button><button className="tool-button" onClick={() => { setInput(''); setOutput(''); setError(''); setStatus(''); }}>Reset</button></div>
    </fieldset>
    <label htmlFor="code-output">Output</label><textarea id="code-output" className="tool-textarea" readOnly value={output} spellCheck="false" />
    <button className="tool-button" disabled={!output || busy} onClick={async () => { try { await navigator.clipboard.writeText(output); setStatus('Copied to clipboard.'); } catch { setError('Clipboard unavailable. Select and copy the output manually, or download it.'); } }}>Copy output</button>
    {blob && <Download blob={blob} name={`result.${mode === 'js' ? 'js' : mode}`} />}
    <details><summary>Examples and limitations</summary><p>{mode === 'csv' ? 'Example: [{"name":"Amina","score":90},{"name":"Bilal","score":85}] becomes two data rows. The union of keys creates columns; missing and null cells are empty. Nested values are rejected. String cells starting with spreadsheet formula characters receive an apostrophe; review how your spreadsheet imports them. Use at most 10,000 rows and 100 columns. JSON numbers follow JavaScript precision rules.' : mode === 'html' ? 'For static HTML, multiple spaces between attributes become one and ordinary comments are removed. Text spacing, preformatted elements, scripts and styles are preserved. Conditional and common special comments are retained. This is deliberately conservative: it does not minify CSS/JS, remove optional tags or sanitize HTML. Do not use it on framework templates that depend on comments without checking the result.' : mode === 'css' ? 'Example: .card{color:red;padding:8px} becomes a readable rule. Parsing catches malformed syntax; formatting is not a compatibility checker or a guarantee that every property is valid. Use plain CSS; framework-specific syntax may require its own formatter.' : 'Example: const total=(a,b)=>{return a+b} becomes consistently indented JavaScript. Parsing does not execute the source. This formats JavaScript and JSX, not TypeScript; formatting does not prove program correctness or make untrusted code safe.'}</p></details>
  </Shell>;
}
export const JSONToCSV = () => <DeveloperTool mode="csv" />;
export const HTMLMinifier = () => <DeveloperTool mode="html" />;
export const CSSFormatter = () => <DeveloperTool mode="css" />;
export const JavaScriptFormatter = () => <DeveloperTool mode="js" />;
