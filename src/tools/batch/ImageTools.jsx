import { useState } from 'react';
import { Shell, Download } from './BatchUI';
import { readImage } from './fileUtils';
import { transformImage } from './imageOperations';
const names = { resize:'Image Resizer', crop:'Image Cropper', convert:'Image Converter', metadata:'Image Metadata Viewer', rotate:'Image Rotate & Flip' };
const descriptions = { resize:'Resize pixel dimensions, with optional aspect-ratio locking.', crop:'Select a precise rectangle using pixel coordinates and preview the result.', convert:'Export a genuine JPEG, PNG or WebP image in your browser.', metadata:'Inspect dimensions, file details and available EXIF metadata.', rotate:'Rotate by quarter turns or mirror an image without changing its subject.' };
const defaults = { width:1, height:1, x:0, y:0, type:'image/png', quality:.85, angle:0, flipX:false, flipY:false };
function ImageTool({ mode }) {
  const [source, setSource] = useState(null), [options, setOptions] = useState(defaults), [locked, setLocked] = useState(true), [busy, setBusy] = useState(false), [error, setError] = useState(''), [status, setStatus] = useState(''), [result, setResult] = useState(null), [metadata, setMetadata] = useState(null), [key, setKey] = useState(0);
  const clearOutput = () => { setResult(null); setError(''); setStatus(''); };
  const change = (field, value) => { clearOutput(); setOptions(current => {
    const next = { ...current, [field]:value };
    if (mode === 'resize' && locked && source && ['width','height'].includes(field)) {
      const ratio = source.image.naturalWidth / source.image.naturalHeight;
      next[field === 'width' ? 'height' : 'width'] = Math.max(1, Math.round(field === 'width' ? Number(value) / ratio : Number(value) * ratio));
    }
    return next;
  }); };
  const load = async file => {
    clearOutput(); setSource(null); setMetadata(null); if (!file) return;
    setBusy(true);
    try {
      const image = await readImage(file); setSource({ file, image }); setOptions({ ...defaults, width:image.naturalWidth, height:image.naturalHeight });
      if (mode === 'metadata') {
        const base = { fileName:file.name, fileType:file.type, bytes:file.size, width:image.naturalWidth, height:image.naturalHeight };
        try {
          const { default:exifr } = await import('exifr');
          const exif = await exifr.parse(file, { pick:['Make','Model','Software','DateTimeOriginal','ExposureTime','FNumber','ISO','FocalLength','Orientation','GPSLatitude','GPSLongitude'] });
          setMetadata({ ...base, exif:exif || 'No supported EXIF fields found.' });
        } catch { setMetadata({ ...base, exif:'EXIF is unavailable or could not be read from this file.' }); }
        setStatus('Metadata inspection complete.');
      } else setStatus(`Loaded ${image.naturalWidth} × ${image.naturalHeight} pixels. Choose settings and create a preview.`);
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  const run = async () => {
    clearOutput(); setBusy(true);
    try { const output = await transformImage(source.image, mode, options); setResult(output); setStatus(`Created ${output.width} × ${output.height} pixels.`); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  return <Shell title={names[mode]} description={descriptions[mode]} {...{busy,error,status}}>
    <fieldset disabled={busy}>
      <label htmlFor="image-file">Source image</label><input key={key} id="image-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp,image/avif" onChange={e => load(e.target.files[0])} />
      <small>At most 25 MB and 24 megapixels. JPEG, PNG, WebP, GIF, BMP or AVIF where the browser can decode it.</small>
      {source && <Download blob={source.file} name={source.file.name} preview />}
      {mode !== 'metadata' && <>
        {['resize','crop'].includes(mode) && <div className="batch-grid"><div><label htmlFor="image-width">Width (pixels)</label><input id="image-width" type="number" min="1" max="10000" value={options.width} onChange={e => change('width', e.target.value)} /></div><div><label htmlFor="image-height">Height (pixels)</label><input id="image-height" type="number" min="1" max="10000" value={options.height} onChange={e => change('height', e.target.value)} /></div></div>}
        {mode === 'resize' && <label><input type="checkbox" checked={locked} onChange={e => setLocked(e.target.checked)} />Preserve aspect ratio on dimension edits</label>}
        {mode === 'crop' && <div className="batch-grid"><div><label htmlFor="crop-x">Left (X pixels)</label><input id="crop-x" type="number" min="0" value={options.x} onChange={e => change('x',e.target.value)} /></div><div><label htmlFor="crop-y">Top (Y pixels)</label><input id="crop-y" type="number" min="0" value={options.y} onChange={e => change('y',e.target.value)} /></div></div>}
        {mode === 'rotate' && <><label htmlFor="rotation">Clockwise rotation</label><select id="rotation" value={options.angle} onChange={e => change('angle',e.target.value)}><option value="0">0°</option><option value="90">90°</option><option value="180">180°</option><option value="270">270°</option></select><label><input type="checkbox" checked={options.flipX} onChange={e => change('flipX',e.target.checked)} />Flip horizontally before rotation</label><label><input type="checkbox" checked={options.flipY} onChange={e => change('flipY',e.target.checked)} />Flip vertically before rotation</label></>}
        <label htmlFor="image-format">Output format</label><select id="image-format" value={options.type} onChange={e => change('type',e.target.value)}><option value="image/png">PNG (lossless)</option><option value="image/jpeg">JPEG (white background)</option><option value="image/webp">WebP</option></select>
        {options.type !== 'image/png' && <><label htmlFor="image-quality">Quality: {Math.round(options.quality * 100)}%</label><input id="image-quality" type="range" min="0.1" max="1" step="0.05" value={options.quality} onChange={e => change('quality',e.target.value)} /></>}
      </>}
      <div className="batch-actions">{mode !== 'metadata' && <button className="tool-button" onClick={run} disabled={!source}>Create preview</button>}<button className="tool-button" onClick={() => { setSource(null); setMetadata(null); setOptions(defaults); setKey(n => n + 1); clearOutput(); }}>Reset</button></div>
    </fieldset>
    {result && <Download blob={result.blob} name={`result.${result.blob.type === 'image/jpeg' ? 'jpg' : result.blob.type.split('/')[1]}`} preview />}
    {metadata && <><h2>Available metadata</h2><pre>{JSON.stringify(metadata,null,2)}</pre></>}
    <details><summary>{mode === 'metadata' ? 'What metadata can tell you' : 'Format and privacy notes'}</summary><p>{mode === 'metadata' ? 'EXIF can reveal a camera, capture time or location. Many images have no EXIF or only a subset of these fields. Values can be edited and do not prove authenticity. Do not share metadata screenshots containing private location details. This viewer does not remove metadata.' : 'Export creates a new raster image. Animation is not retained; JPEG replaces transparency with white. Original EXIF is not copied. Browser decoding may apply orientation and color conversion. A higher quality setting is not a guaranteed file size or lossless conversion; check the preview and downloaded file.'}</p></details>
  </Shell>;
}
export const ImageResizer = () => <ImageTool mode="resize" />;
export const ImageCropper = () => <ImageTool mode="crop" />;
export const ImageConverter = () => <ImageTool mode="convert" />;
export const ImageMetadataViewer = () => <ImageTool mode="metadata" />;
export const ImageRotateFlip = () => <ImageTool mode="rotate" />;
