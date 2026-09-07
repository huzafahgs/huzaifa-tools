export const MAX_FILE_BYTES = 25 * 1024 * 1024;
export function checkFiles(files, max = 20) {
  if (!files.length || files.length > max) throw new Error(`Choose between 1 and ${max} files.`);
  if (files.some(file => !file.size || file.size > MAX_FILE_BYTES)) throw new Error('Each file must be nonempty and at most 25 MB.');
  if (files.reduce((sum, file) => sum + file.size, 0) > 75 * 1024 * 1024) throw new Error('Choose at most 75 MB in total.');
}
export function pageNumbers(value, count, limit = 200) {
  if (!value.trim()) throw new Error('Enter page numbers or ranges, for example 1,3-5.');
  const pages = [];
  for (const part of value.split(',')) {
    const match = part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!match) throw new Error('Use page numbers and ascending ranges such as 1,3-5.');
    const start = Number(match[1]), end = Number(match[2] || match[1]);
    if (start < 1 || end < start || end > count || end - start >= limit) throw new Error(`Pages must be between 1 and ${count}; maximum ${limit} selected pages.`);
    for (let page = start; page <= end; page++) if (!pages.includes(page - 1)) pages.push(page - 1);
    if (pages.length > limit) throw new Error(`Select no more than ${limit} pages.`);
  }
  return pages;
}
export async function readImage(file) {
  checkFiles([file], 1);
  if (!/^image\/(jpeg|png|webp|gif|bmp|avif)$/.test(file.type)) throw new Error('Choose a JPEG, PNG, WebP, GIF, BMP or AVIF image supported by your browser.');
  const url = URL.createObjectURL(file);
  try {
    const image = new Image(); image.src = url; await image.decode();
    if (!image.naturalWidth || image.naturalWidth * image.naturalHeight > 24000000) throw new Error('Image must be at most 24 megapixels.');
    return image;
  } catch (error) { throw new Error(error.message.includes('megapixels') ? error.message : 'The browser could not decode this image. Try JPEG or PNG.'); }
  finally { URL.revokeObjectURL(url); }
}
export function canvasBlob(canvas, type = 'image/png', quality = .85) {
  return new Promise((resolve, reject) => canvas.toBlob(blob => {
    if (!blob || blob.type !== type) reject(new Error(`This browser cannot export ${type}. Choose another format.`));
    else resolve(blob);
  }, type, quality));
}
export const pause = () => new Promise(resolve => setTimeout(resolve, 0));
