"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardPlus, Stethoscope, Video } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import styles from "./home-conversion.module.css";
type Quote = { monto: number; cargo_gestion?: number };
const services = [
  { id: "teleconsulta", endpoint: "teleconsulta", icon: Video, es: "Teleconsulta", en: "Teleconsultation", href: "/pedir?tipo=teleconsulta", day: "07:00–00:00", night: "00:00–07:00" },
  { id: "medico", endpoint: "consulta-medico", icon: Stethoscope, es: "Médico a domicilio", en: "Doctor at home", href: "/pedir", day: "07:00–20:00", night: "20:00–07:00" },
  { id: "enfermero", endpoint: "consulta-enfermero", icon: ClipboardPlus, es: "Enfermería a domicilio", en: "Nursing at home", href: "/pedir?tipo=enfermero", day: "07:00–20:00", night: "20:00–07:00" },
] as const;
export default function PreciosSection() {
  const { locale } = useI18n();
  const en = locale === "en";
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    let active = true;
    let controller: AbortController | undefined;
    const load = async () => {
      controller?.abort();
      const current = new AbortController();
      controller = current;
      const timeout = setTimeout(() => current.abort(), 7000);
      try {
        const response = await fetch("/api/tarifas-publicas", { cache: "no-store", signal: current.signal });
        if (!response.ok) throw new Error("Tarifas no disponibles");
        const data = await response.json() as Record<string, Quote>;
        const entries = Object.entries(data).filter(([, quote]) => quote && Number.isFinite(quote.monto) && quote.monto > 0);
        if (active && controller === current) {
          setQuotes(Object.fromEntries(entries));
          setLoading(false);
        }
      } catch {
        if (active && controller === current) { setQuotes({}); setLoading(false); }
      } finally { clearTimeout(timeout); }
    };
    void load();
    const timer = window.setInterval(() => { if (!document.hidden) void load(); }, 60_000);
    const onVisible = () => { if (!document.hidden) void load(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { active = false; controller?.abort(); clearInterval(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, []);
  const amount = (id: string, turno: string) => quotes[`${id}-${turno}`]
    ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(quotes[`${id}-${turno}`].monto)
    : loading ? (en ? "Loading…" : "Cargando…") : (en ? "Unavailable" : "No disponible");
  return <section id="precios" className={styles.section} aria-labelledby="home-prices-title"><div className={styles.container}>
    <div className={styles.intro}><h2 id="home-prices-title">{en ? "Know the price before you request care." : "Conocé el precio antes de pedir atención."}</h2><p>{en ? "Pay per consultation. No monthly membership or health insurance required." : "Pagás por consulta. Sin suscripción mensual, obra social ni prepaga."}</p></div>
    <div className={styles.priceGrid}>{services.slice(0, 2).map(service => <article key={service.id} className={styles.priceCard}>
      <h3 className={service.id === "teleconsulta" ? styles.blue : styles.teal}>{en ? service.en : service.es}</h3><p>{service.id === "teleconsulta" ? (en ? "Medical care by video call." : "Consulta médica por videollamada.") : (en ? "A professional visits your home." : "Un profesional va a tu casa.")}</p>
      {["diurna", "nocturna"].map(turno => <div key={turno} className={styles.priceRow}><span>{turno === "diurna" ? (en ? "Daytime" : "Diurna") : (en ? "Nighttime" : "Nocturna")}<small>{turno === "diurna" ? service.day : service.night}</small></span><strong>{amount(service.id, turno)}</strong></div>)}
      <Link className={service.id === "teleconsulta" ? styles.videoButton : styles.homeButton} href={service.href}>{en ? "Request care" : "Solicitar atención"}</Link>
    </article>)}</div>
    <p className={styles.small}>{en ? "ARS. Prices include the applicable service fee. Payment options and any additional charges are shown before you confirm. Argentina time." : "Importes en pesos argentinos, con el cargo de gestión aplicable incluido. Las opciones de pago y cualquier cargo adicional se informan antes de confirmar. Horarios de Argentina."}</p>
    <button type="button" className={styles.textButton} onClick={() => setShowAll(value => !value)} aria-expanded={showAll} aria-controls="home-all-prices">{showAll ? (en ? "Hide full prices" : "Ocultar tarifas completas") : (en ? "View all prices" : "Ver todos los precios")}</button>
    <div id="home-all-prices" hidden={!showAll} className={styles.allPrices}><h3>{en ? "Current service prices" : "Tarifas vigentes por servicio"}</h3><div className={styles.tableWrap}><table><thead><tr><th>{en ? "Service" : "Servicio"}</th><th>{en ? "Daytime" : "Diurna"}</th><th>{en ? "Nighttime" : "Nocturna"}</th></tr></thead><tbody>{services.map(service => <tr key={service.id}><th scope="row"><Link href={service.href}>{en ? service.en : service.es}</Link><small>{service.day} / {service.night}</small></th>{["diurna", "nocturna"].map(turno => <td key={turno}>{amount(service.id, turno)}</td>)}</tr>)}</tbody></table></div><p className={styles.small}>{en ? "Optional services available for your request are priced before payment." : "Los servicios opcionales disponibles para tu solicitud se cotizan antes del pago."}</p></div>
  </div></section>;
}
