"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ShieldCheck, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { CONSENT_EVENT, OPEN_CONSENT_EVENT, NOTICE_SESSION_KEY, MARKETING_ENABLED, attachConsultation, consent, ensureVisit, landingEvidence,
  marketingFetch, patientSession, permitted, readProof, retryWithdrawals, saveConsent, publicMarketingPath } from "@/lib/marketing/measurement";
import styles from "./advertising-measurement.module.css";

export default function AdvertisingMeasurement() {
  const path=usePathname();
  const {locale}=useI18n();
  const en=locale==="en";
  const [choice,setChoice]=useState<boolean | null>(null);
  const [open,setOpen]=useState(false);
  const [manual,setManual]=useState(false);
  const evidence=useRef<ReturnType<typeof landingEvidence> | null>(null);
  const notice=useRef<HTMLElement>(null);
  const returnFocus=useRef<HTMLElement | null>(null);
  const dismissed=useRef(false);
  const linked=useRef<string | null>(null);
  const adsLandingEntry=useRef(false);
  const canMeasure=publicMarketingPath(path) || path.startsWith("/pedir");
  const visible=open && (manual || (path !== "/teleconsulta-ads" && publicMarketingPath(path)));

  useEffect(()=>{
    if (!MARKETING_ENABLED) return;
    adsLandingEntry.current=location.pathname === "/teleconsulta-ads";
    evidence.current=landingEvidence(location.href,document.referrer);
    try {dismissed.current=sessionStorage.getItem(NOTICE_SESSION_KEY)==="1";} catch { /* Memory-only dismissal still works. */ }
    const update=()=>{
      const c=consent();
      setChoice(c?.advertising ?? null);
      setOpen(!c && !dismissed.current && Boolean(evidence.current?.gclid));
      setManual(false);
      if (!c?.advertising) linked.current=null;
    };
    const preferences=()=>{
      returnFocus.current=document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setManual(true);setOpen(true);
    };
    update();void retryWithdrawals();
    const withdrawalTimer=setInterval(()=>{
      void retryWithdrawals();
      if (!consent()) {
        setChoice(null);
        linked.current=null;
        if (!dismissed.current && evidence.current?.gclid) setOpen(true);
      }
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
        const entry=evidence.current;
        const hasAdsUtm=adsLandingEntry.current && entry?.utm_source === "google"
          && entry.utm_medium === "cpc" && Boolean(entry.utm_campaign);
        const proof=readProof() || (entry && (entry.gclid || hasAdsUtm) ? await ensureVisit(entry) : null);
        if (!proof || closed || !permitted()) return;
        const patient=patientSession();
        if (!patient) return;
        const key=`${proof.visit_id}:${patient.id}`;
        if (linked.current!==key) {
          await marketingFetch("/me/attribution",{visit_id:proof.visit_id,visit_token:proof.visit_token},patient.access_token);
          linked.current=key;
        }
        const consultation=new URLSearchParams(location.search).get("consulta_id");
        if (consultation) await attachConsultation(consultation,patient.access_token);
      } catch { /* Measurement never interrupts login, payment or care. */ }
      finally {busy=false;}
    };
    void tick();const timer=setInterval(()=>void tick(),30000);
    return ()=>{closed=true;clearInterval(timer);};
  },[choice,path,canMeasure]);

  if (!MARKETING_ENABLED) return null;
  function restoreFocus() {returnFocus.current?.focus();returnFocus.current=null;}
  function dismiss() {
    dismissed.current=true;
    try {sessionStorage.setItem(NOTICE_SESSION_KEY,"1");} catch { /* Do not require storage to continue. */ }
    setOpen(false);setManual(false);restoreFocus();
  }
  function choose(value:boolean) {
    try {saveConsent(value);setOpen(false);setManual(false);} catch {setChoice(false);setOpen(false);}
    restoreFocus();
  }
  return <>
    {visible && <section ref={notice} tabIndex={-1} role="region" aria-label={en ? "Advertising preferences" : "Preferencias publicitarias"}
      className={styles.banner} onKeyDown={event=>{if (event.key==="Escape") {event.stopPropagation();dismiss();}}}>
      <ShieldCheck size={21} className={styles.icon} aria-hidden="true"/>
      <div className={styles.copy}><h2>{en ? "Your privacy, your choice" : "Tu privacidad, tu elección"}</h2>
        <p>{en ? "With your permission, DocYa records where this visit came from to measure its advertising campaigns." : "Con tu permiso, DocYa registra de dónde llegó esta visita para medir sus campañas publicitarias."}</p>
        <a href="/legal/pacientes/privacidad#cookies">{en ? "Privacy details" : "Ver privacidad"}</a>
        {manual && choice!==null && <span className={styles.current}>{en ? `Current choice: ${choice ? "accepted" : "rejected"}` : `Tu elección actual: ${choice ? "aceptada" : "rechazada"}`}</span>}
      </div>
      <div className={styles.actions}><button type="button" onClick={()=>choose(false)}>{en ? "Reject" : "Rechazar"}</button><button type="button" onClick={()=>choose(true)}>{en ? "Accept" : "Aceptar"}</button></div>
      <button type="button" className={styles.close} onClick={dismiss} aria-label={en ? "Close without changing your choice" : "Cerrar sin cambiar tu elección"}><X size={17}/></button>
    </section>}
  </>;
}
