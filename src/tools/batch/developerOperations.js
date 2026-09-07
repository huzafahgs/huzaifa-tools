export function jsonToCsv(input) {
  const rows = JSON.parse(input);
  if (!Array.isArray(rows) || !rows.length || rows.length > 10000 || rows.some(row => !row || Array.isArray(row) || typeof row !== 'object')) throw new Error('Enter an array of 1–10,000 flat JSON objects.');
  const headers = [...new Set(rows.flatMap(Object.keys))];
  if (!headers.length || headers.length > 100) throw new Error('Use between 1 and 100 distinct column names.');
  const cell = value => {
    if (value != null && typeof value === 'object') throw new Error('Nested objects and arrays are not supported. Flatten them into columns first.');
    let text = value == null ? '' : String(value);
    // Spreadsheet-safe text, including column names; this deliberately changes risky cells.
    if (typeof value === 'string' && /^[\s]*[=+@-]|^[\t\r\n]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  };
  return [headers.map(cell).join(','), ...rows.map(row => headers.map(key => cell(Object.hasOwn(row,key) ? row[key] : null)).join(','))].join('\r\n');
}

// Preserve all text-node whitespace and raw/preformatted contents. No DOM insertion or execution.
export function minifyHtml(source) {
  return source.replace(/<(script|style|pre|textarea|title|xmp)\b[^>]*>[\s\S]*?<\/\1\s*>|<!--[\s\S]*?-->|<(?:[^>"']|"[^"]*"|'[^']*')*>/gi, token => {
    if (/^<(script|style|pre|textarea|title|xmp)\b/i.test(token)) return token;
    if (token.startsWith('<!--')) return /^<!--\s*(?:\[|!|#|\$|\/?ko\b|\/?\$|@)/i.test(token) ? token : '';
    if (/^<!|^<\?/.test(token)) return token;
    let quote = '', output = '', space = false;
    for (const char of token) {
      if (quote) { output += char; if (char === quote) quote = ''; continue; }
      if (/\s/.test(char)) { space = true; continue; }
      if (space) output += ' ';
      space = false;
      output += char;
      if (char === '"' || char === "'") quote = char;
    }
    return output;
  });
}

export async function processCode(mode, input) {
  if (!input.trim()) throw new Error('Enter source text first.');
  if (input.length > 250000) throw new Error('Use at most 250,000 characters per run.');
  if (mode === 'csv') return jsonToCsv(input);
  const prettier = await import('prettier/standalone');
  if (mode === 'css') {
    const postcss = await import('prettier/plugins/postcss');
    return prettier.format(input, { parser:'css', plugins:[postcss], tabWidth:2 });
  }
  if (mode === 'js') {
    const [babel, estree] = await Promise.all([import('prettier/plugins/babel'), import('prettier/plugins/estree')]);
    return prettier.format(input, { parser:'babel', plugins:[babel,estree], tabWidth:2 });
  }
  const html = await import('prettier/plugins/html');
  // Syntax feedback only: retain the original text for conservative minification.
  await prettier.format(input, { parser:'html', plugins:[html], embeddedLanguageFormatting:'off' });
  return minifyHtml(input);
}
