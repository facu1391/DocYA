const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const {webcrypto}=require('node:crypto');
function fixture(){
 const calls=[],storage=new Map([['pedir_user',JSON.stringify({id:'owner',access_token:'token'})]]);
 const exports={};const env={NEXT_PUBLIC_PATIENT_CONVERSION_ENABLED:'true',NEXT_PUBLIC_API_BASE:'https://first-party.invalid'};
 const source=fs.readFileSync('src/lib/pedir/conversion.ts','utf8');
 const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(js,{exports,require:()=>{throw new Error('Operational measurement must not import advertising');},process:{env},crypto:webcrypto,Date,Promise,Number,JSON,
  localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
  sessionStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
  fetch:async(url,opts)=>{calls.push({url,...opts});return {ok:true};}});
 return {api:exports,calls,env,storage,flush:async()=>{for(let i=0;i<8;i++)await new Promise(resolve=>setImmediate(resolve));}};
}
test('operational events work without advertising consent; feature disabled produces no events',async()=>{
 for(const preference of [null,false,true]){
  const f=fixture();if(preference!==null)f.storage.set('docya_ad_consent_v1',JSON.stringify({advertising:preference}));
  f.api.startFlow('teleconsulta');await f.flush();assert.equal(f.calls.length,2);
 }
 const g=fixture();g.env.NEXT_PUBLIC_PATIENT_CONVERSION_ENABLED='false';g.api.startFlow('domicilio');await g.flush();assert.equal(g.calls.length,0);
});
test('reload retains flow, transitions carry only allowlisted fields and checkout links request',async()=>{
 const f=fixture();f.api.startFlow('teleconsulta');f.api.startFlow('teleconsulta');f.api.requestCreated(123,'token');f.api.checkoutStarted(123);await f.flush();
 const bodies=f.calls.map(c=>JSON.parse(c.body));assert.equal(new Set(bodies.map(b=>b.flow_id)).size,1);
 assert.deepEqual([...new Set(bodies.map(b=>b.event))],['started','modality_selected','request_created','checkout_started']);
 for(const b of bodies)assert.deepEqual(Object.keys(b).sort(),['consulta_id','event','flow_id','modality'].filter(k=>k!=='consulta_id'||b.consulta_id!==undefined).sort());
 assert.ok(f.calls.every(c=>c.url.startsWith('https://first-party.invalid/analytics/')));
});
test('new modality creates a new logical flow, cross-session response cannot attach',async()=>{
 const f=fixture();f.api.startFlow('domicilio');await f.flush();f.api.startFlow('teleconsulta');f.api.requestCreated(2,'different-token');await f.flush();
 const bodies=f.calls.map(c=>JSON.parse(c.body));assert.equal(new Set(bodies.map(b=>b.flow_id)).size,2);assert.ok(!bodies.some(b=>b.event==='request_created'));
});
test('explicit account data cleanup clears recorded flows without changing advertising preferences',async()=>{
 const f=fixture();f.storage.set('docya_ad_consent_v1','unchanged');f.api.startFlow('teleconsulta');await f.flush();f.api.withdrawFlow();f.api.requestCreated(3);await f.flush();
 assert.ok(f.calls.at(-1).url.endsWith('/revoke'));assert.equal(f.calls.filter(c=>c.body&&JSON.parse(c.body).event==='request_created').length,0);
 assert.equal(f.storage.get('docya_ad_consent_v1'),'unchanged');
});
test('unauthenticated visitors do not generate account funnel events',async()=>{
 const f=fixture();f.storage.delete('pedir_user');f.api.startFlow('teleconsulta');await f.flush();assert.equal(f.calls.length,0);
});
