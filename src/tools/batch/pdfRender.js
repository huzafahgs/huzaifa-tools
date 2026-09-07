import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { canvasBlob, checkFiles, pageNumbers, pause } from './fileUtils';
GlobalWorkerOptions.workerSrc = workerUrl;
export async function renderPdf(file, range, onProgress) {
  checkFiles([file], 1);
  const base = import.meta.env.BASE_URL + 'pdfjs/';
  const task = getDocument({ data:await file.arrayBuffer(), isEvalSupported:false, cMapUrl:base + 'cmaps/', cMapPacked:true, standardFontDataUrl:base + 'standard_fonts/', wasmUrl:base + 'wasm/' });
  try {
    const doc = await task.promise;
    if (doc.numPages > 200) throw new Error('Choose a PDF with no more than 200 pages.');
    const selected = pageNumbers(range, doc.numPages, 10), outputs = [];
    for (const [index, number] of selected.entries()) {
      onProgress(`Rendering page ${number + 1} (${index + 1}/${selected.length})…`); await pause();
      const page = await doc.getPage(number + 1), original = page.getViewport({ scale:1 });
      const scale = Math.min(1.5, 2000 / Math.max(original.width, original.height));
      const viewport = page.getViewport({ scale }), canvas = document.createElement('canvas');
      canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
      try {
        await page.render({ canvasContext:canvas.getContext('2d'), viewport, background:'rgb(255,255,255)' }).promise;
        outputs.push({ blob:await canvasBlob(canvas), name:`page-${number + 1}.png`, preview:true });
      } finally { canvas.width = canvas.height = 0; page.cleanup(); }
    }
    return outputs;
  } finally { await task.destroy(); }
}
