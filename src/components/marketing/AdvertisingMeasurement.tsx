"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ShieldCheck, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { CONSENT_EVENT, OPEN_CONSENT_EVENT, NOTICE_SESSION_KEY, MARKETING_ENABLED, attachConsultation, consent, ensureVisit, landingEvidence,
  marketingFetch, patientSession, permitted, readProof, retryWithdrawals, saveConsent, publicMarketingPath } from "@/lib/marketing/measurement";
import GoogleAnalytics from "./GoogleAnalytics";
import { analyticsConsent, saveAnalyticsConsent } from "@/lib/marketing/analyticsConsent";
import styles from "./advertising-measurement.module.css";

export default function AdvertisingMeasurement() {
  const path=usePathname();
  const {locale}=useI18n();
  const en=locale==="en";
  const [choice,setChoice]=useState<boolean | null>(null);
  const [analytics,setAnalytics]=useState(false);
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

    adsLandingEntry.current=["/teleconsulta-ads", "/certificados"].includes(location.pathname);
    evidence.current=landingEvidence(location.href,document.referrer);
    try {dismissed.current=sessionStorage.getItem(NOTICE_SESSION_KEY)==="1";} catch { /* Memory-only dismissal still works. */ }
    const update=()=>{
      const c=consent();
      setChoice(c?.advertising ?? null);
      setAnalytics(analyticsConsent() === true);
      setOpen((!c && Boolean(evidence.current?.gclid) || analyticsConsent() === null) && !dismissed.current);
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


  function restoreFocus() {returnFocus.current?.focus();returnFocus.current=null;}
  function dismiss() {
    dismissed.current=true;
    try {sessionStorage.setItem(NOTICE_SESSION_KEY,"1");} catch { /* Do not require storage to continue. */ }
    setOpen(false);setManual(false);restoreFocus();
  }
  function choose(value:boolean) {
    try {if (MARKETING_ENABLED) saveConsent(value);setOpen(false);setManual(false);} catch {setChoice(false);setOpen(false);}
    restoreFocus();
  }
  function saveAnalytics() {
    try { saveAnalyticsConsent(analytics); } catch { setAnalytics(false); }
    setOpen(false);setManual(false);restoreFocus();
  }
  return <>
    <GoogleAnalytics />
    {visible && <section ref={notice} tabIndex={-1} role="region" aria-label={en ? "Advertising preferences" : "Preferencias publicitarias"}
      className={styles.banner} onKeyDown={event=>{if (event.key==="Escape") {event.stopPropagation();dismiss();}}}>
      <ShieldCheck size={21} className={styles.icon} aria-hidden="true"/>
      <div className={styles.copy}><h2>{en ? "Your privacy, your choice" : "Tu privacidad, tu elección"}</h2>
        <p>{en ? "Choose whether to allow advertising measurement and, separately, Google Analytics on public pages." : "Elegí si querés permitir la medición publicitaria o Google Analytics en páginas públicas. Las preferencias se guardan por separado."}</p>
        <label><input type="checkbox" checked={analytics} onChange={event=>setAnalytics(event.target.checked)} />{" "}
          {en ? "Allow Google Analytics on public pages" : "Permitir Google Analytics en páginas públicas"}</label>
        <button type="button" onClick={saveAnalytics}>{en ? "Save Analytics preference" : "Guardar preferencia de Analytics"}</button>
        <a href="/legal/pacientes/privacidad#cookies">{en ? "Privacy details" : "Ver privacidad"}</a>
        {MARKETING_ENABLED && manual && choice!==null && <span className={styles.current}>{en ? `Current choice: ${choice ? "accepted" : "rejected"}` : `Tu elección actual: ${choice ? "aceptada" : "rechazada"}`}</span>}
      </div>
      {MARKETING_ENABLED && <div className={styles.actions}><button type="button" onClick={()=>choose(false)}>{en ? "Reject" : "Rechazar"}</button><button type="button" onClick={()=>choose(true)}>{en ? "Accept" : "Aceptar"}</button></div>}
      <button type="button" className={styles.close} onClick={dismiss} aria-label={en ? "Close without changing your choice" : "Cerrar sin cambiar tu elección"}><X size={17}/></button>
    </section>}
  </>;
}
