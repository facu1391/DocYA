// Optional browser QA with an already installed puppeteer-core and local preview.
// First-party attribution with fictitious data. External requests are intercepted.
const assert=require('node:assert/strict');
const puppeteer=require('puppeteer-core');
const target=process.env.MARKETING_UI_TEST_URL || 'http://localhost:3131';
if(new URL(target).hostname!=='localhost')throw new Error('Only a local preview may be tested');
let browser;
(async()=>{
 browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage();let tags=0,visits=0,linked=0,withdrawals=0;const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.evaluateOnNewDocument(()=>{try{localStorage.setItem('pedir_user',JSON.stringify({id:'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',access_token:'preview-only'}));}catch{/* Deliberately inaccessible in the sandboxed child. */}});
 await page.setRequestInterception(true);
 const requestHandler=async req=>{
  const url=new URL(req.url());
  if(url.hostname==='www.googletagmanager.com'){
   tags++;return req.respond({status:200,contentType:'application/javascript',body:'window.providerStub=true;'});
  }
  if(url.hostname==='localhost')return req.continue();
  if(url.hostname!=='marketing-preview.invalid')return req.respond({status:204});
  const headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS'};
  if(req.method()==='OPTIONS')return req.respond({status:204,headers});
  let data={ok:true};
  if(url.pathname==='/marketing/visits'){
   visits++;
   const body=JSON.parse(req.postData());assert.equal(body.advertising,true);assert.equal(body.gclid,'TEST_CLICK_ID_12345');
   assert.equal(body.utm_campaign,'123456');
   assert.ok(!('diagnostico' in body));assert.ok(!('utm_term' in body));
   data={visit_id:'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb',visit_token:'x'.repeat(43),expires_at:'2099-01-01T00:00:00Z',gclid:body.gclid};
  }
  if(url.pathname==='/marketing/me/attribution') {linked++;assert.equal(req.headers().authorization,'Bearer preview-only');}
  if(url.pathname==='/marketing/visits/revoke') withdrawals++;
  return req.respond({status:200,headers,contentType:'application/json',body:JSON.stringify(data)});
 };
 page.on('request',requestHandler);
 await page.setViewport({width:1440,height:1000});
 const clickUrl=target+'/?gclid=TEST_CLICK_ID_12345&utm_source=google&utm_medium=cpc&utm_campaign=123456&utm_term=not-exported';
 await page.goto(clickUrl,{waitUntil:'networkidle2',timeout:120000});
 await page.waitForSelector('[aria-label="Preferencias publicitarias"]');
 assert.equal(tags,0);assert.equal(visits,0);
 assert.equal(await page.$eval('[aria-label="Preferencias publicitarias"]',el=>['fixed','absolute'].includes(getComputedStyle(el).position)),false);
 const click=async text=>page.$$eval('button',(bs,t)=>{const b=bs.find(b=>b.innerText.trim()===t);if(!b)throw Error('Missing '+t);b.click();},text);
 await page.$eval('[aria-label="Cerrar sin cambiar tu elección"]',el=>el.click());
 assert.equal(await page.$('[aria-label="Preferencias publicitarias"]'),null);
 assert.equal(await page.evaluate(()=>localStorage.getItem('docya_ad_consent_v1')),null);
 await page.reload({waitUntil:'networkidle2'});
 assert.equal(await page.$('[aria-label="Preferencias publicitarias"]'),null);
 assert.equal(tags,0);assert.equal(visits,0);
 await click('Preferencias de privacidad');
 await click('Rechazar');assert.equal(tags,0);assert.equal(visits,0);
 await page.reload({waitUntil:'networkidle2'});
 assert.equal(await page.$('[aria-label="Preferencias publicitarias"]'),null);
 await click('Preferencias de privacidad');await click('Aceptar');
 await page.waitForFunction(()=>performance.getEntriesByType('resource').some(r=>r.name.endsWith('/marketing/me/attribution')));
 assert.equal(tags,0);assert.equal(visits,1);assert.equal(linked,1);
 const revoked=page.waitForResponse(response=>response.url().endsWith('/marketing/visits/revoke') && response.request().method()==='POST');
 await click('Preferencias de privacidad');await click('Rechazar');
 await revoked;assert.equal(withdrawals,1);
 assert.equal(await page.$('iframe[title="Medición publicitaria consentida"]'),null);
 assert.equal(await page.evaluate(()=>localStorage.getItem('docya_marketing_visit_v1')),null);
 await page.setViewport({width:390,height:844});await click('Preferencias de privacidad');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.screenshot({path:require('node:path').join(require('node:os').tmpdir(),'docya-marketing-consent-mobile.png')});
 const initialTags=tags,initialVisits=visits;
 const privateContext=await browser.createBrowserContext();
 const privatePage=await privateContext.newPage();
 await privatePage.setRequestInterception(true);privatePage.on('request',requestHandler);
 const privateResponse=await privatePage.goto(target+'/pedir',{waitUntil:'networkidle2',timeout:120000});
 assert.equal(privateResponse.status(),200);
 assert.equal(await privatePage.$('[aria-label="Preferencias publicitarias"]'),null);
 assert.equal(tags,initialTags);assert.equal(visits,initialVisits);
 await privateContext.close();
 const englishContext=await browser.createBrowserContext();
 const englishPage=await englishContext.newPage();
 await englishPage.evaluateOnNewDocument(()=>{try{localStorage.setItem('docya-lang','en');}catch{}});
 await englishPage.setRequestInterception(true);englishPage.on('request',requestHandler);
 await englishPage.goto(target,{waitUntil:'networkidle2',timeout:120000});
 assert.equal(await englishPage.$('[aria-label="Advertising preferences"]'),null);
 await englishPage.goto(clickUrl,{waitUntil:'networkidle2',timeout:120000});
 await englishPage.waitForSelector('[aria-label="Advertising preferences"]');
 assert.ok((await englishPage.$eval('[aria-label="Advertising preferences"]',el=>el.textContent)).includes('Your privacy, your choice'));
 assert.equal(tags,initialTags);assert.equal(visits,initialVisits);
 await englishContext.close();
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({noTrackingBeforeConsent:true,dismissWithoutAccepting:true,rememberedRejection:true,inlineNotice:true,
   campaignIdCaptured:true,firstPartyLink:true,noGoogleTag:true,revocationWorks:true,mobileNoOverflow:true,
   noAutomaticRequestFlowNotice:true,noOrganicNotice:true,englishNotice:true}));
 await browser.close();
})().catch(async e=>{console.error(e);await browser?.close();process.exit(1);});
