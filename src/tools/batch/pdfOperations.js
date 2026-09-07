import { PDFDocument } from 'pdf-lib';
import { checkFiles, pageNumbers, readImage, canvasBlob, pause } from './fileUtils.js';
async function load(file) {
  checkFiles([file], 1);
  try {
    const doc = await PDFDocument.load(await file.arrayBuffer());
    if (doc.getPageCount() > 200) throw new Error('Maximum 200 pages per PDF.');
    return doc;
  } catch (error) { throw new Error(`Cannot read ${file.name}: encrypted, damaged or unsupported PDF. ${error.message.includes('Maximum') ? error.message : 'Use an unencrypted PDF.'}`); }
}
const pdfBlob = async doc => new Blob([await doc.save()], { type:'application/pdf' });
export async function processPdf(mode, files, range, onProgress = () => {}) {
  checkFiles(files, mode === 'merge' || mode === 'images' ? 20 : 1);
  if (mode === 'images') {
    const out = await PDFDocument.create();
    for (const [index, file] of files.entries()) {
      onProgress(`Adding image ${index + 1} of ${files.length}…`); await pause();
      const image = await readImage(file), canvas = document.createElement('canvas');
      const scale = Math.min(1, 2400 / Math.max(image.naturalWidth, image.naturalHeight));
      canvas.width = Math.round(image.naturalWidth * scale); canvas.height = Math.round(image.naturalHeight * scale);
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const embedded = await out.embedJpg(await (await canvasBlob(canvas, 'image/jpeg', .9)).arrayBuffer());
      const page = out.addPage([595.28, 841.89]); const fit = Math.min(555.28 / embedded.width, 801.89 / embedded.height);
      page.drawImage(embedded, { x:(595.28 - embedded.width * fit) / 2, y:(841.89 - embedded.height * fit) / 2, width:embedded.width * fit, height:embedded.height * fit });
      canvas.width = canvas.height = 0;
    }
    return [{ blob:await pdfBlob(out), name:'images.pdf' }];
  }
  if (mode === 'merge') {
    if (files.length < 2) throw new Error('Choose at least two PDFs to merge.');
    const out = await PDFDocument.create();
    for (const [index, file] of files.entries()) {
      onProgress(`Merging file ${index + 1} of ${files.length}…`); await pause();
      const source = await load(file);
      if (out.getPageCount() + source.getPageCount() > 200) throw new Error('Merged output is limited to 200 pages.');
      (await out.copyPages(source, source.getPageIndices())).forEach(page => out.addPage(page));
    }
    return [{ blob:await pdfBlob(out), name:'merged.pdf' }];
  }
  const source = await load(files[0]);
  if (mode === 'extract') {
    const out = await PDFDocument.create();
    (await out.copyPages(source, pageNumbers(range, source.getPageCount()))).forEach(page => out.addPage(page));
    return [{ blob:await pdfBlob(out), name:'extracted-pages.pdf' }];
  }
  const groups = range.split(';');
  if (groups.length > 20) throw new Error('Create at most 20 output PDFs at a time.');
  const selections = groups.map(group => pageNumbers(group, source.getPageCount()));
  if (selections.reduce((sum, pages) => sum + pages.length, 0) > 200) throw new Error('Select at most 200 output pages across all groups.');
  const outputs = [];
  for (const [index, selection] of selections.entries()) {
    onProgress(`Creating part ${index + 1} of ${groups.length}…`); await pause();
    const out = await PDFDocument.create();
    (await out.copyPages(source, selection)).forEach(page => out.addPage(page));
    outputs.push({ blob:await pdfBlob(out), name:`split-part-${index + 1}.pdf` });
  }
  return outputs;
}
