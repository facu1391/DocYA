// Internal operational measurement. No advertising SDK, identifiers or preferences.
const API=process.env.NEXT_PUBLIC_API_BASE || '';
const KEY='docya_request_flow_v1';
const WITHDRAW='docya_conversion_withdrawal_v1';
type Flow={id:string;owner:string;modality:'teleconsulta'|'domicilio';started:number;consulta?:number};
let pending:Promise<unknown>=Promise.resolve();
export function allowed(){return process.env.NEXT_PUBLIC_PATIENT_CONVERSION_ENABLED!=='false';}
function patientSession():{id:string;access_token:string}|null{
  try{const s=JSON.parse(localStorage.getItem('pedir_user')||'null');return s?.id&&s?.access_token?s:null;}catch{return null;}
}
function read():Flow|null {try{return JSON.parse(sessionStorage.getItem(KEY)||'null');}catch{return null;}}
async function send(flow:Flow,event:string,consulta?:number):Promise<Response|undefined>{
  const session=patientSession();
  if(!allowed() || session?.id!==flow.owner)return undefined;
  return fetch(`${API}/analytics/patient-conversion/events`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`},
    body:JSON.stringify({flow_id:flow.id,event,modality:flow.modality,consulta_id:consulta})});
}
async function ensure(flow:Flow){
  if(!await retryWithdrawal())return false;
  const first=await send(flow,'started');if(!first?.ok)return false;
  return (await send(flow,'modality_selected'))?.ok===true;
}
export function startFlow(modality:'teleconsulta'|'domicilio'){
  if(!allowed())return;
  const owner=patientSession()?.id;if(!owner)return;
  let flow=read();
  if(!flow || flow.owner!==owner || flow.modality!==modality || flow.consulta || Date.now()-flow.started>86400000){
    flow={id:crypto.randomUUID(),owner,modality,started:Date.now()};
    sessionStorage.setItem(KEY,JSON.stringify(flow));
  }
  const current=flow;
  // The server deduplicates these transitions, including reloads and React StrictMode.
  pending=pending.catch(()=>undefined).then(()=>ensure(current)).catch(()=>undefined);
}
export function requestCreated(id:unknown,token?:string){
  if(!allowed() || !Number.isInteger(Number(id)) || Number(id)<=0)return;
  const flow=read();const session=patientSession();
  if(!flow || flow.owner!==session?.id || (token && token!==session.access_token))return;
  if(flow.consulta && flow.consulta!==Number(id))return;
  flow.consulta=Number(id);sessionStorage.setItem(KEY,JSON.stringify(flow));
  pending=pending.catch(()=>undefined).then(async()=>{if(await ensure(flow))await send(flow,'request_created',Number(id));}).catch(()=>undefined);
}
export function checkoutStarted(id:unknown){
  if(!allowed())return;
  const flow=read();if(!flow || !Number(id) || flow.consulta!==Number(id))return;
  pending=pending.catch(()=>undefined).then(async()=>{if(await ensure(flow)){const linked=await send(flow,'request_created',flow.consulta);if(linked?.ok)await send(flow,'checkout_started');}}).catch(()=>undefined);
}
export function withdrawFlow(){
  sessionStorage.removeItem(KEY);
  const session=patientSession();
  if(session){localStorage.setItem(WITHDRAW,session.id);void pending.finally(()=>retryWithdrawal()).catch(()=>undefined);}
}
export async function retryWithdrawal(){
  const owner=localStorage.getItem(WITHDRAW);if(!owner)return true;
  const session=patientSession();if(session?.id!==owner)return false;
  try{const res=await fetch(`${API}/analytics/patient-conversion/revoke`,{method:'POST',headers:{Authorization:`Bearer ${session.access_token}`}});
    if(!res.ok)return false;localStorage.removeItem(WITHDRAW);return true;
  }catch{return false;}
}
