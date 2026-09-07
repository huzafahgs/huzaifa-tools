import { canvasBlob } from './fileUtils.js';
export async function transformImage(image, mode, options) {
  const sourceW = image.naturalWidth, sourceH = image.naturalHeight;
  let width = sourceW, height = sourceH;
  if (mode === 'resize' || mode === 'crop') { width = Number(options.width); height = Number(options.height); }
  const angle = Number(options.angle || 0);
  if (mode === 'rotate' && angle % 180) { width = sourceH; height = sourceW; }
  if (![width, height].every(n => Number.isInteger(n) && n > 0 && n <= 10000) || width * height > 24000000) throw new Error('Output dimensions must be positive whole numbers, at most 10,000 per side and 24 megapixels total.');
  const x = Number(options.x), y = Number(options.y);
  if (mode === 'crop' && (![x, y].every(n => Number.isInteger(n) && n >= 0) || x + width > sourceW || y + height > sourceH)) throw new Error('The crop rectangle must fit inside the source image. Coordinates start at its top-left corner.');
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  try {
    const ctx = canvas.getContext('2d');
    if (options.type === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, width, height); }
    if (mode === 'rotate') {
      ctx.translate(width / 2, height / 2); ctx.rotate(angle * Math.PI / 180); ctx.scale(options.flipX ? -1 : 1, options.flipY ? -1 : 1);
      ctx.drawImage(image, -sourceW / 2, -sourceH / 2);
    } else if (mode === 'crop') ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
    else ctx.drawImage(image, 0, 0, width, height);
    return { blob:await canvasBlob(canvas, options.type, Number(options.quality)), width, height };
  } finally { canvas.width = canvas.height = 0; }
}
