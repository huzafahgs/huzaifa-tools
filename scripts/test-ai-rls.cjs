const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { PGlite } = require(process.env.PGLITE_MODULE || '@electric-sql/pglite');
(async () => {
 const db = new PGlite();
 await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key, email_confirmed_at timestamptz, is_anonymous boolean default false); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema auth,public to authenticated,anon; grant execute on function auth.uid() to authenticated,anon;`);
 for (const file of ['202609090001_accounts.sql','202609110001_ai_tools.sql','202609110002_ai_batch2.sql']) await db.exec(fs.readFileSync(path.join(__dirname,'../supabase/migrations',file),'utf8'));
 const a='11111111-1111-4111-8111-111111111111', b='22222222-2222-4222-8222-222222222222', c='33333333-3333-4333-8333-333333333333';
 await db.exec(`insert into auth.users(id,email_confirmed_at) values ('${a}',now()),('${b}',now()),('${c}',null)`);
 const as = async id => db.exec(`reset role; set role authenticated; select set_config('request.jwt.claim.sub','${id}',false)`);
 const consume = async () => (await db.query('select public.consume_ai_quota() as ok')).rows[0].ok;
 let checks=0;
 const equal=(a,b)=>{assert.equal(a,b);checks++;};
 await db.exec('set role anon');
 equal((await db.query('select public.ai_tools_ready() as ok')).rows[0].ok,true);
 equal((await db.query('select public.ai_batch2_ready() as ok')).rows[0].ok,true);
 await assert.rejects(db.exec('select public.consume_ai_quota()')); checks++;
 for (const id of [a,b]) {
  await as(id); equal(await consume(),true); equal(await consume(),false);
  for (const table of ['ai_usage','ai_daily_budget']) for (const sql of [`select * from public.${table}`, `delete from public.${table}`, `update public.${table} set requests=0`]) { await assert.rejects(db.exec(sql)); checks++; }
  await db.exec(`insert into public.account_favorites(tool_slug) values ('ai-text-summarizer'); insert into public.account_history(tool_slug) values ('ai-text-summarizer')`);
  equal((await db.query('select * from public.account_history')).rows.length,1);
 }
 await as(c); equal(await consume(),false);
 await db.exec(`reset role; update public.ai_usage set requests=10,last_request=now()-interval '1 minute' where user_id='${a}'`);
 await as(a); equal(await consume(),false);
 await db.exec(`reset role; update public.ai_usage set usage_day=current_date-1,last_request=now()-interval '1 minute' where user_id='${a}'`);
 await as(a); equal(await consume(),true);
 await db.exec(`reset role; update public.ai_daily_budget set requests=200; update public.ai_usage set last_request=now()-interval '1 minute'`);
 await as(b); equal(await consume(),false);
 await db.exec(`reset role; update public.ai_daily_budget set usage_day=current_date-1`);
 await as(b); equal(await consume(),true);
 await db.exec(`reset role; delete from auth.users where id='${a}'`);
 equal((await db.query(`select * from public.ai_usage where user_id='${a}'`)).rows.length,0);
 equal((await db.query('select * from public.account_tool_catalog')).rows.length,115);
 const batch2=(await import(require('node:url').pathToFileURL(path.join(__dirname,'../src/data/aiBatch2.js')))).default;
 await as(b);
 for(const tool of batch2){
  await db.query('insert into public.account_history(tool_slug) values ($1)',[tool.slug]);
  await db.query('insert into public.account_favorites(tool_slug) values ($1)',[tool.slug]);
  checks+=2;
 }
 equal((await db.query('select * from public.account_history')).rows.length,11);
 await as(c); equal((await db.query('select * from public.account_history')).rows.length,0);
 await assert.rejects(db.exec(`insert into public.account_favorites(user_id,tool_slug) values ('${b}','ai-code-explainer')`));checks++;
 await db.exec('reset role');
 const columns=(await db.query("select column_name from information_schema.columns where table_name='ai_usage' order by ordinal_position")).rows.map(x=>x.column_name);
 assert.deepEqual(columns,['user_id','usage_day','requests','last_request']);checks++;
 await db.close(); console.log(`AI SQL: ${checks} checks passed (real local PostgreSQL engine; not hosted migration).`);
})().catch(e=>{console.error(e);process.exit(1)});
