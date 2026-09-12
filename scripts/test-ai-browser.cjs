// Isolated browser fixtures: no real users, email, AI credentials or paid requests.
// PLAYWRIGHT_MODULE points to an existing Playwright installation; no prod dependency.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const base = process.env.AI_TEST_BASE || 'http://127.0.0.1:4182';
const viewports = process.env.AI_TEST_READINESS_ONLY ? [375] : [1440,375,320];
(async () => {
 const { default: tools } = await import(pathToFileURL(path.join(__dirname,'../src/data/aiTools.js')));
 const { createHandler } = await import(pathToFileURL(path.join(__dirname,'../api/ai.js')));
 const browser = await chromium.launch({channel:'msedge',headless:true});
 const errors=[]; let checks=0;
 const user={id:'11111111-1111-4111-8111-111111111111',email:'fixture@example.test',email_confirmed_at:'2026-01-01T00:00:00Z',role:'authenticated',aud:'authenticated',app_metadata:{provider:'email'},user_metadata:{}};
 const jwt=[{alg:'HS256',typ:'JWT'},{sub:user.id,aud:'authenticated',exp:Math.floor(Date.now()/1000)+3600},'signature'].map(x=>Buffer.from(JSON.stringify(x)).toString('base64url')).join('.');
 const fixtureOutput='A clear fixture result for reviewing the user interface.\n<script>window.aiUnsafe=true</script>';
 const assertOK=(value,label)=>{assert.ok(value,label);checks++;};
 for (const width of viewports) {
  const context=await browser.newContext({viewport:{width,height:950},reducedMotion:'reduce',permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage(); page.on('pageerror',e=>errors.push(e.message));
  let mode='success',calls=0, cloudWrites=[],favorites=[],history=[],lastPayload;
  await context.addInitScript(({user,jwt})=>{
   localStorage.setItem('sb-njqnorxyfocuuvzjzwci-auth-token',JSON.stringify({access_token:jwt,refresh_token:'fixture-only',expires_in:3600,expires_at:Math.floor(Date.now()/1000)+3600,token_type:'bearer',user}));
  },{user,jwt});
  await page.route(/https:\/\/[^/]+\.supabase\.co\//,async route=>{
   const req=route.request(),url=new URL(req.url()); let body={};
   if(url.pathname.endsWith('/user')) body=user;
   else if(url.pathname.includes('account_favorites')||url.pathname.includes('account_history')) {
    const fav=url.pathname.includes('account_favorites');
    if(req.method()==='POST') { const data=req.postDataJSON();cloudWrites.push(data); if(fav) favorites=[data];else history=[{...data,visited_at:new Date().toISOString()}]; }
    if(req.method()==='DELETE') { if(fav)favorites=[];else history=[]; }
    body=fav?favorites:history;
   } else body=[];
   await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(body)});
  });
  await page.route('**/api/ai',async route=>{
   const request=route.request();
   if(request.method()==='POST'){calls++;lastPayload=request.postDataJSON();if(mode==='slow')await new Promise(r=>setTimeout(r,800));}
   const handler=createHandler({env:{NODE_ENV:'test',OPENAI_API_KEY:mode==='unavailable'?'':'fixture-only',VITE_SUPABASE_URL:'https://test.supabase.co',VITE_SUPABASE_PUBLISHABLE_KEY:'sb_publishable_fixture'},request:async url=>{
    if(url.endsWith('_ready'))return{ok:true,json:async()=>!(mode==='batch1only' && url.endsWith('ai_batch2_ready'))};
    if(url.endsWith('/user'))return{ok:true,json:async()=>user};
    if(url.includes('consume_ai_quota'))return{ok:true,json:async()=>mode!=='limited'};
    if(mode==='error')return{ok:false,status:500,json:async()=>({error:'PRIVATE PROVIDER DETAIL'})};
    return{ok:true,json:async()=>({status:'completed',output:[{type:'message',content:[{type:'output_text',text:fixtureOutput}]}]})};
   }});
   const res={headers:{},setHeader(k,v){this.headers[k]=v},status(v){this.statusCode=v;return this},json(v){this.body=v;return this}};
   await handler({method:request.method(),headers:request.headers(),body:request.postData()},res);
   try { await route.fulfill({status:res.statusCode,headers:res.headers,contentType:'application/json',body:JSON.stringify(res.body)}); }catch{/* A cancelled request may already be closed. */}
  });
  for(const tool of (process.env.AI_TEST_READINESS_ONLY ? [] : tools)){
   mode='success'; await page.goto(base+'/'+tool.slug); await page.getByRole('button',{name:tool.action,exact:true}).waitFor();
   await page.waitForFunction(()=>!document.querySelector('.ai-generate')?.disabled);await page.evaluate(()=>document.fonts.ready);
   assertOK(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow '+width+' '+tool.slug);
   assert.equal(await page.locator('h1').count(),1);checks++;
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://ai-tools-by-huzaifa.vercel.app/'+tool.slug);checks++;
   const schema=await page.locator('script[type="application/ld+json"]').allTextContents();assertOK(schema.some(x=>x.includes('SoftwareApplication')),'tool schema');assertOK(schema.some(x=>x.includes('FAQPage')),'faq schema');schema.forEach(x=>JSON.parse(x));
   assertOK(await page.locator('.ai-orbit').evaluate(el=>getComputedStyle(el).pointerEvents==='none'&&getComputedStyle(el).animationName==='none'),'decor reduced motion');
   const button=page.getByRole('button',{name:tool.action,exact:true});await button.click();await page.getByRole('alert').filter({hasText:'characters with enough context'}).waitFor();
   await page.getByRole('button',{name:'Try an example'}).click();assert.equal(await page.locator('#ai-input').inputValue(),tool.example);checks++;
   for(const field of tool.textFields||[]) {
    const input=page.locator('#ai-detail-'+field.key);assert.equal(await input.inputValue(),tool.exampleDetails[field.key]);checks++;
    if(field.required){await input.fill(' ');await button.click();await page.locator('.ai-error').filter({hasText:'maximum 240'}).waitFor();await input.fill(tool.exampleDetails[field.key]);checks++;}
   }
   for(const field of tool.fields)await page.locator('#ai-'+field.key).selectOption(field.values.at(-1));
   const before=calls;await page.locator('form.ai-panels').evaluate(f=>{f.requestSubmit();f.requestSubmit()});await page.locator('#ai-result').waitFor();assert.equal(calls,before+1);checks++;
   assert.equal(await page.locator('#ai-result').inputValue(),fixtureOutput);assertOK(await page.evaluate(()=>!window.aiUnsafe),'plain text output');
   for(const field of tool.fields){assert.equal(lastPayload.options[field.key],field.values.at(-1));checks++;}
   for(const field of tool.textFields||[]){assert.equal(lastPayload.details[field.key],tool.exampleDetails[field.key]);checks++;}
   await page.getByRole('button',{name:'Copy result'}).click();assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,"\n"),fixtureOutput);checks++;
   assertOK(await page.evaluate(()=>!JSON.stringify(localStorage).includes('A clear fixture result')&&!JSON.stringify(localStorage).includes('library will extend')),'no sensitive local persistence');
   assertOK(cloudWrites.every(x=>Object.keys(x).every(k=>['user_id','tool_slug'].includes(k))),'metadata-only cloud writes');
   if(tool.refine){await page.getByRole('button',{name:'Refine this result'}).click();assertOK((await page.locator('#ai-input').inputValue()).includes(fixtureOutput),'refinement');}
   if(tool===tools[0]) {
    const save=page.locator('.tool-save button');await save.click();await page.waitForFunction(()=>document.querySelector('.tool-save button')?.getAttribute('aria-pressed')==='true');checks++;
    await page.reload();await page.waitForFunction(()=>document.querySelector('.tool-save button')?.getAttribute('aria-pressed')==='true');
    assert.equal(await page.locator('#ai-input').inputValue(),'');assert.equal(await page.locator('#ai-result').count(),0);checks+=2;
    await page.locator('.tool-save button').click();await page.waitForFunction(()=>document.querySelector('.tool-save button')?.getAttribute('aria-pressed')==='false');checks++;
   }
   await page.getByRole('button',{name:'Clear all'}).click();assert.equal(await page.locator('#ai-input').inputValue(),'');assert.equal(await page.locator('#ai-result').count(),0);checks+=2;
   for(const field of tool.textFields||[]){assert.equal(await page.locator('#ai-detail-'+field.key).inputValue(),'');checks++;}
   await page.locator('.ai-faq summary').first().focus();await page.keyboard.press('Enter');assertOK(await page.locator('.ai-faq details').first().getAttribute('open')!==null,'keyboard FAQ');
   console.log('PASS route/editor/schema/privacy '+width+' '+tool.slug);
  }
  const tool=tools[0];await page.goto(base+'/'+tool.slug);await page.waitForFunction(()=>!document.querySelector('.ai-generate')?.disabled);
  mode='slow';await page.getByRole('button',{name:'Try an example'}).click();await page.getByRole('button',{name:tool.action,exact:true}).click();await page.getByText('Shaping your words').waitFor();await page.getByRole('button',{name:'Cancel & clear'}).click();await page.waitForTimeout(1000);assert.equal(await page.locator('#ai-result').count(),0);assert.equal(await page.locator('#ai-input').inputValue(),'');checks+=2;
  for(const fail of ['error','limited']){mode=fail;await page.getByRole('button',{name:'Try an example'}).click();await page.getByRole('button',{name:tool.action,exact:true}).click();await page.locator('.ai-error').waitFor();assertOK(!(await page.locator('body').innerText()).includes('PRIVATE PROVIDER DETAIL'),'safe failure');}
  mode='unavailable';await page.reload();await page.getByText('AI generation is not available yet.',{exact:false}).first().waitFor();assertOK(await page.locator('.ai-generate').isDisabled(),'unavailable disabled');
  mode='batch1only';await page.goto(base+'/ai-product-description-generator');await page.getByText('AI generation is not available yet.',{exact:false}).first().waitFor();assertOK(await page.locator('.ai-generate').isDisabled(),'Batch 2 migration gating');assert.equal(await page.locator('.tool-save button').count(),0);checks++;
  await page.goto(base+'/ai-text-summarizer');await page.waitForFunction(()=>!document.querySelector('.ai-generate')?.disabled);await page.locator('.tool-save button').waitFor();checks++;
  await page.goto(base+'/all-tools?category=AI');assert.equal(await page.locator('.tool-card-link').count(),15);checks++;
  await page.getByLabel('Search all tools').fill('summarizer');assert.equal(await page.locator('.tool-card-link').count(),1);checks++;
  await page.goto(base+'/ai-text-summarizer');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(process.env.AI_QA_OUTPUT||process.cwd(),`ai-${width}.png`),fullPage:true});
  await context.close();
 }
 const guest=await browser.newPage();await guest.route('**/api/ai',r=>r.fulfill({json:{configured:true,catalogReady:true}}));await guest.goto(base+'/ai-email-generator');await guest.getByRole('button',{name:'Draft email'}).waitFor();assertOK(await guest.getByRole('button',{name:'Draft email'}).isDisabled(),'guest cannot generate');
 await guest.goto(base+'/account');await guest.waitForURL('**/login');checks++;
 await guest.close();assert.deepEqual(errors,[]);await browser.close();
 fs.writeFileSync(path.join(process.env.AI_QA_OUTPUT||process.cwd(),'ai-browser-results.json'),JSON.stringify({checks,errors,viewports,provider:'fixture only; no live AI credential'},null,2));
 console.log(`PASS ${checks} browser checks; no uncaught errors. Provider/auth responses are isolated fixtures.`);
})().catch(e=>{console.error(e);process.exit(1)});
