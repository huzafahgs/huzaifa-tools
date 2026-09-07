import { useState } from 'react';
import { Shell, Download, FileOrder } from './BatchUI';
import { checkFiles } from './fileUtils';
const titles = { merge:'PDF Merger', split:'PDF Splitter', extract:'PDF Page Extractor', images:'Images to PDF', render:'PDF to Images' };
const descriptions = { merge:'Combine PDFs in your chosen order.', split:'Create separate PDFs from semicolon-separated page groups.', extract:'Copy selected pages into one new PDF.', images:'Place each image on its own A4 PDF page.', render:'Render selected PDF pages into downloadable PNG images.' };
function PdfTool({ mode }) {
  const [files, setFiles] = useState([]), [range, setRange] = useState('1'), [error, setError] = useState(''), [status, setStatus] = useState(''), [busy, setBusy] = useState(false), [outputs, setOutputs] = useState([]), [inputKey, setInputKey] = useState(0);
  const multiple = mode === 'merge' || mode === 'images';
  const resetOutput = () => { setOutputs([]); setError(''); setStatus(''); };
  const run = async () => {
    resetOutput(); setBusy(true);
    try {
      checkFiles(files, multiple ? 20 : 1);
      const result = mode === 'render' ? await (await import('./pdfRender')).renderPdf(files[0], range, setStatus) : await (await import('./pdfOperations')).processPdf(mode, files, range, setStatus);
      setOutputs(result); setStatus(`Ready: ${result.length} downloadable ${result.length === 1 ? 'file' : 'files'}.`);
    } catch (e) { setError(e.message || 'Could not process this PDF. Try an unencrypted, smaller document.'); setStatus(''); }
    finally { setBusy(false); }
  };
  return <Shell title={titles[mode]} description={descriptions[mode]} {...{error,busy,status}}>
    <fieldset disabled={busy}>
      <label htmlFor="source-files">{mode === 'images' ? 'Source images' : multiple ? 'Source PDFs' : 'Source PDF'}</label>
      <input key={inputKey} id="source-files" type="file" multiple={multiple} accept={mode === 'images' ? 'image/jpeg,image/png,image/webp,image/gif,image/bmp,image/avif' : 'application/pdf,.pdf'} onChange={e => { resetOutput(); try { const selected = [...e.target.files]; checkFiles(selected, multiple ? 20 : 1); setFiles(selected); } catch (err) { setFiles([]); setError(err.message); } }} />
      <small>25 MB per file; 75 MB total; {multiple ? '20 files; ' : ''}200 PDF pages. {mode === 'render' ? 'Render up to 10 selected pages per run, at most 2000 pixels on the longest side.' : ''}</small>
      {multiple ? <FileOrder files={files} setFiles={next => { setFiles(next); resetOutput(); }} /> : files[0] && <p>{files[0].name}</p>}
      {!multiple && <><label htmlFor="page-range">{mode === 'split' ? 'Page groups (separate output PDFs)' : 'Pages to include'}</label><input id="page-range" value={range} onChange={e => { setRange(e.target.value); resetOutput(); }} /><p>{mode === 'split' ? 'Example: 1-2;3-5;6 creates three PDFs. A comma combines pages within one group.' : 'Example: 1,3-5. Pages are numbered from 1; duplicates are removed and your selection order is retained.'}</p></>}
      <div className="batch-actions"><button className="tool-button" onClick={run} disabled={!files.length}>Create {mode === 'render' ? 'images' : 'PDF output'}</button><button className="tool-button" onClick={() => { setFiles([]); setRange('1'); setInputKey(key => key + 1); resetOutput(); }}>Reset</button></div>
    </fieldset>
    {outputs.map(output => <Download key={output.name} {...output} />)}
    <details><summary>Limitations and useful checks</summary><p>{mode === 'images' ? 'Images are flattened onto white A4 pages, scaled to fit with margins, and encoded as JPEG. Animation, transparency, and original image metadata are not preserved. Images over 24 megapixels are rejected; embedded images are limited to 2400 pixels on the longest side.' : mode === 'render' ? 'This creates raster images, not editable text or OCR. Password-protected PDFs are unsupported. Complex fonts, forms, color profiles, and unusual PDFs may render differently; compare the download with the original.' : 'Use ordinary, unencrypted PDFs. Page content is copied; document-level bookmarks, attachments, form behavior, and digital signatures are not guaranteed to survive. Inspect the downloaded PDF before sharing.'}</p></details>
  </Shell>;
}
export const PDFMerger = () => <PdfTool mode="merge" />;
export const PDFSplitter = () => <PdfTool mode="split" />;
export const PDFPageExtractor = () => <PdfTool mode="extract" />;
export const ImagesToPDF = () => <PdfTool mode="images" />;
export const PDFToImages = () => <PdfTool mode="render" />;
