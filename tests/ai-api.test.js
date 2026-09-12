import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from '../api/ai.js';
import { validateInput, providerRequest, extractOutput } from '../server/ai.js';
import tools from '../src/data/aiTools.js';

const env = { NODE_ENV: 'production', OPENAI_API_KEY: 'test-only-not-a-credential', VITE_SUPABASE_URL: 'https://test.supabase.co', VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' };
const bodyFor = t => ({ tool: t.slug, text: t.example, options: Object.fromEntries(t.fields.map(f => [f.key, f.values[0]])), ...(t.textFields ? { details: t.exampleDetails } : {}) });
const reqFor = () => ({ method: 'POST', headers: { origin: 'https://ai-tools-by-huzaifa.vercel.app', 'content-type': 'application/json', authorization: `Bearer ${'a'.repeat(40)}` }, body: bodyFor(tools[0]) });
const success = { status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: 'A reviewed test result.' }] }] };
const reply = (status, data) => ({ ok: status < 300, status, json: async () => data });
async function run(req = reqFor(), responses, override = env) {
  responses ??= [...(tools.find(t=>t.slug===req.body?.tool)?.batch===2 ? [reply(200,true)] : []), reply(200, { id: 'verified', email_confirmed_at: '2026-01-01' }), reply(200, true), reply(200, success)];
  const calls = [];
  const res = { headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(v) { this.statusCode=v; return this; }, json(v) { this.body=v; return this; } };
  await createHandler({ env: override, request: async (url, options) => { calls.push({ url, options }); const next = responses.shift(); if (next instanceof Error) throw next; assert.ok(next, 'Unexpected upstream request'); return next; } })(req,res);
  return { ...res, calls };
}
test('fifteen allowlisted tools validate all supported options and use bounded non-stored provider requests', () => {
  for (const tool of tools) {
    for (const field of tool.fields) for (const value of field.values) {
      const body = bodyFor(tool); body.options[field.key] = value;
      const valid = validateInput(body); assert.ok(valid);
      const request = providerRequest(valid);
      assert.equal(request.store, false); assert.equal(request.max_output_tokens, 2200);
      assert.equal(request.model, 'gpt-4.1-mini'); assert.ok(request.input[0].content[0].text.startsWith(tool.example));
      assert.ok(!request.instructions.includes('undefined')); assert.ok(request.instructions.includes(JSON.stringify(body.options)));
      for(const value of Object.values(body.details || {})) assert.ok(request.input[0].content[0].text.includes(value));
    }
  }
});
test('invalid, oversized and proxy-like inputs cannot reach provider', async () => {
  for (const body of [null, [], {}, { ...bodyFor(tools[0]), model: 'other' }, { ...bodyFor(tools[0]), tool: 'unknown' }, { ...bodyFor(tools[0]), text: 'x'.repeat(12001) }, { ...bodyFor(tools[0]), text: '    ' }, { ...bodyFor(tools[0]), options: { length: 'wrong' } }, { ...bodyFor(tools[0]), options: { length: 'Short', url: 'https://evil.test' } }]) {
    const req = reqFor(); req.body = body; const out = await run(req, []); assert.equal(out.statusCode, 400); assert.equal(out.calls.length, 0);
  }
});
test('origin, method, content type and authorization enforce boundaries', async () => {
  for (const [mutate, status] of [
    [r => r.headers.origin = 'https://evil.test', 403], [r => delete r.headers.origin, 403],
    [r => r.method = 'PUT', 405], [r => r.headers['content-type'] = 'text/plain', 415],
    [r => delete r.headers.authorization, 401], [r => r.headers['content-length'] = '60000', 413],
  ]) { const req = reqFor(); mutate(req); const out = await run(req, []); assert.equal(out.statusCode, status); assert.equal(out.calls.length, 0); }
});
test('no configuration and missing migration fail closed', async () => {
  const out = await run(reqFor(), [], {}); assert.equal(out.statusCode, 503); assert.equal(out.calls.length, 0);
  const check = await run({ method: 'GET', headers: {} }, [reply(404, {})]); assert.equal(check.body.configured, false);
  const ready = await run({ method: 'GET', headers: {} }, [reply(200, true),reply(200,true)]); assert.equal(ready.body.configured, true); assert.equal(ready.body.catalogReady, true); assert.equal(ready.body.batch2Ready,true);
  const noKey = await run({ method: 'GET', headers: {} }, [reply(200, true),reply(404,{})], { ...env, OPENAI_API_KEY: '' }); assert.equal(noKey.body.configured, false); assert.equal(noKey.body.catalogReady, true); assert.equal(noKey.body.batch2Ready,false);
  const partial = await run({ method:'GET', headers:{} },[reply(200,true),new Error('offline')]); assert.equal(partial.body.configured,true); assert.equal(partial.body.batch2Ready,false);
  const req=reqFor(); req.body=bodyFor(tools.find(t=>t.batch===2)); const missing=await run(req,[reply(404,{})]); assert.equal(missing.statusCode,503); assert.equal(missing.calls.length,1);
});
test('verified confirmed user and atomic quota precede fixed provider request', async () => {
  for (const tool of tools) {
    const req = reqFor(); req.body = bodyFor(tool); const out = await run(req);
    assert.equal(out.statusCode, 200); assert.equal(out.body.output, 'A reviewed test result.');
    const offset=tool.batch===2?1:0;
    assert.ok(out.calls[offset].url.endsWith('/auth/v1/user')); assert.ok(out.calls[offset+1].url.endsWith('/consume_ai_quota'));
    assert.equal(out.calls[offset+2].url, 'https://api.openai.com/v1/responses');
    assert.equal(out.calls[offset+1].options.body, '{}'); assert.equal(out.headers['Cache-Control'], 'no-store');
    assert.ok(!JSON.stringify(out.body).includes(env.OPENAI_API_KEY));
  }
});
test('per-tool limits, required context, types and unknown fields are enforced before upstream calls', async () => {
  for(const tool of tools.filter(t=>t.batch===2)) {
    const good=bodyFor(tool); assert.ok(validateInput(good));
    const invalid=[{...good,text:'x'.repeat(tool.maxInput+1)},{...good,text:'x'.repeat(tool.minInput-1)},{...good,details:null},{...good,details:{...good.details,system:'override'}},{...good,options:{...good.options,model:'other'}}];
    for(const field of tool.textFields||[]) {
      invalid.push({...good,details:{...good.details,[field.key]:'x'.repeat(field.maxLength+1)}});
      invalid.push({...good,details:{...good.details,[field.key]:123}});
      if(field.required) invalid.push({...good,details:{...good.details,[field.key]:'   '}});
    }
    for(const body of invalid){const req=reqFor();req.body=body;const result=await run(req,[]);assert.equal(result.statusCode,400);assert.equal(result.calls.length,0);}
  }
});
test('unconfirmed users, auth failures, quota failures and outages never call provider', async () => {
  for (const [responses, status] of [
    [[reply(401,{})],401], [[reply(200,{id:'a'})],401], [[reply(200,{id:'a',email_confirmed_at:'yes',is_anonymous:true})],401],
    [[reply(200,{id:'a',email_confirmed_at:'yes'}),reply(200,false)],429],
    [[reply(200,{id:'a',email_confirmed_at:'yes'}),reply(404,{})],503], [[new Error('private error')],503],
  ]) { const out=await run(reqFor(),responses); assert.equal(out.statusCode,status); assert.ok(out.calls.every(c=>!c.url.includes('openai'))); assert.ok(!JSON.stringify(out.body).includes('private error')); }
});
test('provider errors, truncated, refused and empty responses are safe failures', async () => {
  for (const provider of [reply(429,{message:'raw secret'}),reply(500,{message:'raw secret'}),reply(200,{...success,status:'incomplete'}),reply(200,{status:'completed',output:[]}),reply(200,{status:'completed',output:[{type:'message',content:[{type:'refusal',refusal:'no'}]}]})]) {
    const out=await run(reqFor(),[reply(200,{id:'a',email_confirmed_at:'yes'}),reply(200,true),provider]);
    assert.ok(out.statusCode>=400); assert.ok(!JSON.stringify(out.body).includes('raw secret'));
  }
  assert.equal(extractOutput({ ...success, output:[{type:'message',content:[{type:'output_text',text:'x'.repeat(20001)}]}] }),null);
});
test('every Batch 2 tool shares auth, quota and safe provider failure rules', async () => {
 for(const tool of tools.filter(t=>t.batch===2)) {
  const req=reqFor();req.body=bodyFor(tool);
  for(const [responses,status,expectedCalls] of [
    [[reply(200,true),reply(401,{})],401,2],
    [[reply(200,true),reply(200,{id:'a',email_confirmed_at:'yes'}),reply(200,false)],429,3],
    [[reply(200,true),reply(200,{id:'a',email_confirmed_at:'yes'}),reply(200,true),reply(500,{message:'PRIVATE'})],502,4],
  ]){const out=await run(req,responses);assert.equal(out.statusCode,status);assert.equal(out.calls.length,expectedCalls);assert.ok(!JSON.stringify(out.body).includes('PRIVATE'));}
 }
});
