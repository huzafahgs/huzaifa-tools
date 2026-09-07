export async function digestText(algorithm, text) {
  if (text.length > 1000000) throw new Error('Use at most 1,000,000 characters.');
  const bytes = new TextEncoder().encode(text);
  let digest;
  if (algorithm === 'MD5') {
    const { md5 } = await import('@noble/hashes/legacy.js');
    digest = md5(bytes);
  } else if (algorithm === 'SHA-256') {
    if (!globalThis.crypto?.subtle) throw new Error('SHA-256 requires HTTPS and a browser with Web Crypto support.');
    digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  } else throw new Error('Unsupported hash algorithm.');
  return Array.from(digest, byte => byte.toString(16).padStart(2, '0')).join('');
}
