"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ShieldCheck, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { CONSENT_EVENT, OPEN_CONSENT_EVENT, NOTICE_SESSION_KEY, MARKETING_ENABLED, attachConsultation, consent, ensureVisit, landingEvidence,
  marketingFetch, patientSession, permitted, readProof, retryWithdrawals, saveConsent, safeConversion,
  publicMarketingPath, type Conversion } from "@/lib/marketing/measurement";
import styles from "./advertising-measurement.module.css";

export default function AdvertisingMeasurement() {
  const path=usePathname();
  const {locale}=useI18n();
  const en=locale==="en";
  const [choice,setChoice]=useState<boolean | null>(null);
  const [open,setOpen]=useState(false);
  const [manual,setManual]=useState(false);
  const [frame,setFrame]=useState<{nonce:string;visit_id:string;gclid?:string} | null>(null);
  const iframe=useRef<HTMLIFrameElement>(null);
  const evidence=useRef<ReturnType<typeof landingEvidence> | null>(null);
  const notice=useRef<HTMLElement>(null);
  const returnFocus=useRef<HTMLElement | null>(null);
  const dismissed=useRef(false);
  const sent=useRef(new Set<string>());
  const canMeasure=publicMarketingPath(path) || path.startsWith("/pedir");
  const visible=open && (manual || publicMarketingPath(path));

  useEffect(()=>{
    if (!MARKETING_ENABLED) return;
    evidence.current=landingEvidence(location.href,document.referrer);
    try {dismissed.current=sessionStorage.getItem(NOTICE_SESSION_KEY)==="1";} catch { /* Memory-only dismissal still works. */ }
    const update=()=>{
      const c=consent();setChoice(c?.advertising ?? null);setOpen(!c && !dismissed.current);setManual(false);
      if (!c?.advertising) {setFrame(null);sent.current.clear();}
    };
    const preferences=()=>{
      returnFocus.current=document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setManual(true);setOpen(true);
    };
    update();void retryWithdrawals();
    const withdrawalTimer=setInterval(()=>{
      void retryWithdrawals();
      if (!consent()) {setChoice(null);setFrame(null);sent.current.clear();if (!dismissed.current) setOpen(true);}
    },60000);
    window.addEventListener(CONSENT_EVENT,update);
    window.addEventListener(OPEN_CONSENT_EVENT,preferences);
    window.addEventListener("storage",update);
    return ()=>{clearInterval(withdrawalTimer);window.removeEventListener(CONSENT_EVENT,update);window.removeEventListener(OPEN_CONSENT_EVENT,preferences);window.removeEventListener("storage",update);};
  },[]);

  useEffect(()=>{
    if (!manual || !visible) return;
    const id=requestAnimationFrame(()=>{notice.current?.scrollIntoView({block:"start",behavior:"instant"});notice.current?.focus({preventScroll:true});});
    return ()=>cancelAnimationFrame(id);
  },[manual,visible]);

  useEffect(()=>{
    if (!choice || !MARKETING_ENABLED || !canMeasure) return;
    let closed=false,busy=false;
    const tick=async()=>{
      if (closed || busy || !permitted()) return;
      busy=true;
      try {
        const proof=await ensureVisit(evidence.current || landingEvidence(location.href,document.referrer));
        if (!proof || closed || !permitted()) return;
        setFrame(f=>f?.visit_id===proof.visit_id ? f : {nonce:crypto.randomUUID(),visit_id:proof.visit_id,gclid:proof.gclid});
        const patient=patientSession();
        if (!patient) return;
        await marketingFetch("/me/attribution",{visit_id:proof.visit_id,visit_token:proof.visit_token},patient.access_token);
        const consultation=new URLSearchParams(location.search).get("consulta_id");
        if (consultation) await attachConsultation(consultation,patient.access_token);
      } catch { /* Measurement never interrupts login, payment or care. */ }
      finally {busy=false;}
    };
    void tick();const timer=setInterval(()=>void tick(),30000);
    return ()=>{closed=true;clearInterval(timer);};
  },[choice,path,canMeasure]);

  useEffect(()=>{
    if (!frame || !choice) return;
    let closed=false;
    const message=async(event:MessageEvent)=>{
      if (event.source!==iframe.current?.contentWindow || event.data?.nonce!==frame.nonce || !permitted()) return;
      if (event.data.type==="ready") {
        iframe.current?.contentWindow?.postMessage({type:"consent",nonce:frame.nonce},"*");
      }
      if (event.data.type==="loaded") {
        const patient=patientSession();
        if (!patient) return;
        try {
          const proof=readProof();if (!proof) return;
          const result=await marketingFetch(`/me/conversions?visit_id=${encodeURIComponent(proof.visit_id)}`,undefined,patient.access_token);
          if (closed || !permitted() || !result.configured || !/^AW-18548149251\/[A-Za-z0-9_-]{5,100}$/.test(result.send_to)) return;
          for (const item of result.events as Conversion[]) {
            if (!safeConversion(item) || sent.current.has(item.transaction_id)) continue;
            sent.current.add(item.transaction_id);
            iframe.current?.contentWindow?.postMessage({type:"conversion",nonce:frame.nonce,
              send_to:result.send_to,transaction_id:item.transaction_id,value:Number(item.value),currency:"ARS"},"*");
          }
        } catch { /* Worker still keeps the event; next visit may retry. */ }
      }
      if (event.data.type==="dispatched" && /^[0-9a-f-]{36}$/i.test(event.data.transaction_id)) {
        const patient=patientSession();if (!patient) return;
        try {await marketingFetch(`/me/conversions/${event.data.transaction_id}/dispatched`,{},patient.access_token);} catch { /* Same transaction ID deduplicates retries. */ }
      }
    };
    window.addEventListener("message",message);
    const timer=setInterval(()=>iframe.current?.contentWindow?.postMessage({type:"poll",nonce:frame.nonce},"*"),30000);
    return ()=>{closed=true;clearInterval(timer);window.removeEventListener("message",message);};
  },[frame,choice]);

  if (!MARKETING_ENABLED) return null;
  function restoreFocus() {returnFocus.current?.focus();returnFocus.current=null;}
  function dismiss() {
    dismissed.current=true;
    try {sessionStorage.setItem(NOTICE_SESSION_KEY,"1");} catch { /* Do not require storage to continue. */ }
    setOpen(false);setManual(false);restoreFocus();
  }
  function choose(value:boolean) {
    try {saveConsent(value);setOpen(false);setManual(false);} catch {setChoice(false);setFrame(null);setOpen(false);}
    restoreFocus();
  }
  const params=frame ? new URLSearchParams({nonce:frame.nonce,...(frame.gclid ? {gclid:frame.gclid} : {})}) : null;
  return <>
    {choice && frame && canMeasure && <iframe ref={iframe} title="Medición publicitaria consentida" src={`/ads-measurement?${params}`}
      onLoad={()=>{if (permitted()) iframe.current?.contentWindow?.postMessage({type:"consent",nonce:frame.nonce},"*");}}
      sandbox="allow-scripts" referrerPolicy="no-referrer" style={{display:"none"}} aria-hidden="true"/>}
    {visible && <section ref={notice} tabIndex={-1} role="region" aria-label={en ? "Advertising preferences" : "Preferencias publicitarias"}
      className={styles.banner} onKeyDown={event=>{if (event.key==="Escape") {event.stopPropagation();dismiss();}}}>
      <ShieldCheck size={21} className={styles.icon} aria-hidden="true"/>
      <div className={styles.copy}><h2>{en ? "Your privacy, your choice" : "Tu privacidad, tu elección"}</h2>
        <p>{en ? "With your permission, we use Google Ads to measure paid consultations from ads. We do not share clinical information." : "Con tu permiso usamos Google Ads para medir consultas pagadas desde anuncios. No compartimos información clínica."}</p>
        <a href="/legal/pacientes/privacidad#cookies">{en ? "Privacy details" : "Ver privacidad"}</a>
        {manual && choice!==null && <span className={styles.current}>{en ? `Current choice: ${choice ? "accepted" : "rejected"}` : `Tu elección actual: ${choice ? "aceptada" : "rechazada"}`}</span>}
      </div>
      <div className={styles.actions}><button type="button" onClick={()=>choose(false)}>{en ? "Reject" : "Rechazar"}</button><button type="button" onClick={()=>choose(true)}>{en ? "Accept" : "Aceptar"}</button></div>
      <button type="button" className={styles.close} onClick={dismiss} aria-label={en ? "Close without changing your choice" : "Cerrar sin cambiar tu elección"}><X size={17}/></button>
    </section>}
  </>;
}
