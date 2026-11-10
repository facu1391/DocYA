import test from 'node:test';
import assert from 'node:assert/strict';
import {parseConsent,landingEvidence,safeConversion,publicMarketingPath} from '../src/lib/marketing/measurement.ts';

test('denied, missing, malformed and expired consent never grant advertising',()=>{
  for(const raw of [null,'{}','bad',JSON.stringify({version:'old',advertising:true,updated_at:new Date().toISOString()})]) assert.equal(parseConsent(raw),null);
  assert.equal(parseConsent(JSON.stringify({version:'ads-v1',advertising:false,updated_at:new Date().toISOString()})).advertising,false);
  assert.equal(parseConsent(JSON.stringify({version:'ads-v1',advertising:true,updated_at:'2020-01-01'})),null);
});
test('only coded attribution and click IDs, no search terms, personal data or full URLs',()=>{
 const r=landingEvidence('https://www.docya.com.ar/?gclid=validClick_12345&utm_source=google&utm_medium=cpc&utm_campaign=brand_1&utm_term=diagnosis&dni=123&utm_content=patient','https://www.google.com/search?q=clinical');
 assert.equal(r.gclid,'validClick_12345');assert.equal(r.utm_campaign,'brand_1');
 assert.equal(r.referrer_host,'www.google.com');assert.ok(!JSON.stringify(r).includes('diagnosis'));assert.ok(!('utm_term' in r));
 const privatePage=landingEvidence('https://www.docya.com.ar/pedir/buscando?consulta_id=12&gclid=validClick_12345','https://www.docya.com.ar/');
 assert.equal(privatePage.gclid,undefined);assert.equal(privatePage.entry_observed,false);
});
test('clinical and account paths are never landing evidence',()=>{
 for(const path of ['/pedir','/pedir/solicitar','/pedir/consultas','/recetario','/pedir/perfil','/pedir/videollamada','/livekit-demo/room/123']) assert.equal(publicMarketingPath(path),false);
});

test('public tourist landing preserves only nonclinical campaign evidence',()=>{
 const r=landingEvidence('https://www.docya.com.ar/doctor-in-buenos-aires?gclid=validClick_12345&utm_medium=cpc','https://www.google.com/');
 assert.equal(r.gclid,'validClick_12345');assert.equal(r.entry_observed,true);
});
test('teleconsulta ads preserves campaign evidence without sending search terms',()=>{
 const url='https://www.docya.com.ar/teleconsulta-ads?utm_source=google&utm_medium=cpc&utm_campaign=123456&utm_term=private';
 const tagged=landingEvidence(url+'&gclid=validClick_12345','https://www.google.com/');
 assert.equal(tagged.gclid,'validClick_12345');
 assert.equal(tagged.utm_source,'google');
 assert.equal(tagged.utm_medium,'cpc');
 assert.equal(tagged.utm_campaign,'123456');
 assert.ok(!('utm_term' in tagged));
 const utmOnly=landingEvidence(url,'https://www.google.com/');
 assert.equal(utmOnly.gclid,undefined);
 assert.equal(utmOnly.utm_campaign,'123456');
});
test('conversion payload requires opaque ID, positive finite amount and ARS',()=>{
 assert.equal(safeConversion({transaction_id:'2fd95b63-2c66-4775-a0a2-96688c10d67f',value:21000,currency:'ARS'}),true);
 for(const value of [0,-1,NaN,Infinity]) assert.equal(safeConversion({transaction_id:'2fd95b63-2c66-4775-a0a2-96688c10d67f',value,currency:'ARS'}),false);
 assert.equal(safeConversion({transaction_id:'patient123',value:21000,currency:'ARS'}),false);
});
