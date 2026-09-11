import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { PDFDocument } from 'pdf-lib';
import tools from '../src/toolsData.js';
import additions from '../src/data/documentImageTools.js';
import { pageNumbers, checkFiles } from '../src/tools/batch/fileUtils.js';
import { processPdf } from '../src/tools/batch/pdfOperations.js';
import { processCode, jsonToCsv } from '../src/tools/batch/developerOperations.js';
import { digestText } from '../src/tools/batch/textDigest.js';

async function fixture(widths, name='source.pdf') {
  const doc = await PDFDocument.create();
  for (const width of widths) doc.addPage([width,400]).drawText('Test page');
  return new File([await doc.save()],name,{type:'application/pdf'});
}
async function widths(blob) { return (await PDFDocument.load(await blob.arrayBuffer())).getPages().map(page => page.getWidth()); }

test('100 existing tools plus 5 AI tools, 14 original additions and matching lazy registrations', () => {
  assert.equal(tools.filter(t => !t.ai).length,100); assert.equal(tools.filter(t => t.ai).length,5);
  assert.equal(tools.length,105); assert.equal(new Set(tools.map(t => t.slug)).size,105); assert.equal(additions.length,14);
  const registry = readFileSync(new URL('../src/tools/index.js',import.meta.url),'utf8');
  for (const tool of tools) assert.ok(registry.includes(`registerTool("${tool.slug}"`),tool.slug);
  assert.ok(tools.every(tool => !/placeholder|coming soon/i.test(tool.name + tool.category)));
  for (const tool of additions) { assert.ok(tool.help.steps.length); assert.ok(tool.seoDescription); }
});
test('page ranges preserve requested order, deduplicate and reject invalid input', () => {
  assert.deepEqual(pageNumbers('3,1-2,3',5),[2,0,1]);
  for (const value of ['','0','6','3-1','1-9999999','1,,2','1.5','-1']) assert.throws(() => pageNumbers(value,5));
  assert.throws(() => pageNumbers('1-11',20,10));
});
test('file size/count validation', () => {
  assert.throws(() => checkFiles([]));
  assert.throws(() => checkFiles([{size:26*1024*1024}]));
  assert.throws(() => checkFiles(Array.from({length:4},()=>({size:20*1024*1024}))));
});
test('PDF merge preserves pages and file order', async () => {
  const files = [await fixture([111,222]), await fixture([333],'second.pdf')];
  const [output] = await processPdf('merge',files,'');
  assert.deepEqual(await widths(output.blob),[111,222,333]);
  assert.deepEqual(await widths((await processPdf('merge',files.reverse(),''))[0].blob),[333,111,222]);
});
test('PDF split creates requested documents and extractor retains selection order', async () => {
  const file = await fixture([111,222,333,444]);
  const outputs = await processPdf('split',[file],'1-2;4');
  assert.equal(outputs.length,2); assert.deepEqual(await widths(outputs[0].blob),[111,222]); assert.deepEqual(await widths(outputs[1].blob),[444]);
  assert.deepEqual(await widths((await processPdf('extract',[file],'4,1-2'))[0].blob),[444,111,222]);
});
test('PDF malformed files and out-of-bounds pages fail clearly', async () => {
  await assert.rejects(processPdf('merge',[await fixture([100])],''),/two PDFs/);
  await assert.rejects(processPdf('extract',[new File(['broken'],'bad.pdf')],'1'),/Cannot read/);
  await assert.rejects(processPdf('extract',[await fixture([100])],'2'),/between/);
});
test('CSV quoting, union columns, null and formula text protection', () => {
  assert.equal(jsonToCsv(JSON.stringify([{name:'A, B',n:2},{name:'He said "hi"',extra:true}])), '"name","n","extra"\r\n"A, B","2",""\r\n"He said ""hi""","","true"');
  assert.equal(jsonToCsv('[{"name":"=1+1","n":-2},{"name":null}]'),'"name","n"\r\n"\'=1+1","-2"\r\n"",""');
  assert.throws(() => jsonToCsv('[]')); assert.throws(() => jsonToCsv('[{"nested":{}}]')); assert.throws(() => jsonToCsv('{bad}'));
});
test('HTML minification preserves text, quoted attributes and raw contents', async () => {
  const source = '<!-- remove --><div   class="a  b"\n id="x"> A  B <span>C</span> D</div><pre> a\n b </pre><script>globalThis.testExecuted=true; const x = "<!--keep-->";</script>';
  const output = await processCode('html',source);
  assert.ok(output.length < source.length); assert.ok(!output.includes('remove'));
  assert.ok(output.includes('class="a  b" id="x"')); assert.ok(output.includes(' A  B <span>C</span> D'));
  assert.ok(output.includes('<pre> a\n b </pre>')); assert.ok(output.includes('"<!--keep-->"')); assert.equal(globalThis.testExecuted,undefined);
});
test('CSS and JS formatting parse source without execution and report syntax errors', async () => {
  assert.equal(await processCode('css','.a{color:red;padding:8px}'),'.a {\n  color: red;\n  padding: 8px;\n}\n');
  const output = await processCode('js','globalThis.testExecuted=true;const add=(a,b)=>{return a+b}');
  assert.ok(output.includes('return a + b;')); assert.equal(globalThis.testExecuted,undefined);
  await assert.rejects(processCode('js','const = ;')); await assert.rejects(processCode('css','.a { color: red;'));
  await assert.rejects(processCode('js','x'.repeat(250001)));
});
test('real MD5 and SHA-256 match independent digests for empty, ASCII, whitespace and Unicode input', async () => {
  for (const input of ['', 'abc', 'hello\n', 'حذیفہ 😀']) {
    for (const [algorithm,nodeAlgorithm] of [['MD5','md5'],['SHA-256','sha256']]) {
      assert.equal(await digestText(algorithm,input),createHash(nodeAlgorithm).update(input,'utf8').digest('hex'));
    }
  }
  assert.equal(await digestText('MD5','abc'),'900150983cd24fb0d6963f7d28e17f72');
  assert.equal(await digestText('SHA-256','abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});
