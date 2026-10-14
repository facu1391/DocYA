"use client";

import { useEffect, useState } from "react";
import styles from "@/components/professionals/professionals.module.css";
import { professionalModalities as modalities } from "@/components/professionals/modalities";

// Only explicit professional fees are accepted: never derive them from patient
// prices or a hardcoded commission. Source: the existing public tariff API.
const pesos = (value: number) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);

export default function ProIncomeSimulator() {
  const [selected, setSelected] = useState<string>(modalities[0].id);
  const [consultas, setConsultas] = useState(2);
  const [days, setDays] = useState(5);
  const [fees, setFees] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    setLoading(true);
    void fetch("/api/profesionales/honorarios", { cache: "no-store", signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("Honorarios no disponibles");
      const quotes = await response.json() as Record<string, unknown>;
      return Object.fromEntries(Object.entries(quotes).filter(([id, fee]) => modalities.some(modality => modality.id === id) && typeof fee === "number" && Number.isFinite(fee) && fee > 0)) as Record<string, number>;
    }).catch(() => ({} as Record<string, number>)).then(next => {
      if (!active) return;
      setFees(next);
      setSelected(current => next[current] ? current : Object.keys(next)[0] ?? modalities[0].id);
      setLoading(false);
    }).finally(() => clearTimeout(timeout));
    return () => { active = false; controller.abort(); clearTimeout(timeout); };
  }, [retry]);
  const fee = loading ? undefined : fees[selected];
  const weekly = fee === undefined ? undefined : fee * consultas * days;
  return <div className={styles.simulator}>
    <div className={styles.controls}>
      <label htmlFor="pro-modality">Tipo de consulta</label>
      <select id="pro-modality" value={selected} onChange={event => setSelected(event.target.value)} disabled={loading || !Object.keys(fees).length}>
        {modalities.filter(modality => modality.id !== "teleconsulta-nocturna" || fees[modality.id]).map(modality => <option key={modality.id} value={modality.id} disabled={!loading && !fees[modality.id]}>{modality.label}{!loading && !fees[modality.id] ? " · no disponible" : ""}</option>)}
      </select>
      <div className={styles.rangeLabel}><label htmlFor="pro-consultations">Consultas por día</label><output htmlFor="pro-consultations">{consultas}</output></div>
      <input id="pro-consultations" type="range" min={1} max={10} value={consultas} onChange={event => setConsultas(Number(event.target.value))} />
      <div className={styles.rangeEnds}><span>1 consulta</span><span>10 consultas</span></div>
      <div className={styles.rangeLabel}><label htmlFor="pro-days">Días de trabajo por semana</label><output htmlFor="pro-days">{days}</output></div>
      <input id="pro-days" type="range" min={1} max={7} value={days} onChange={event => setDays(Number(event.target.value))} />
      <div className={styles.rangeEnds}><span>1 día</span><span>7 días</span></div>
    </div>
    <div className={styles.results} role="status" aria-live="polite" aria-atomic="true">
      <p className={styles.eyebrow}>INGRESO MENSUAL ESTIMADO</p>
      <strong className={styles.monthly}>{weekly === undefined ? "—" : pesos(weekly * 4)}</strong>
      <p className={styles.resultNote}>4 semanas · {consultas} {consultas === 1 ? "consulta" : "consultas"} por día · {days} {days === 1 ? "día" : "días"} por semana</p>
      <dl><div><dt>Honorario por consulta</dt><dd>{fee === undefined ? "—" : pesos(fee)}</dd></div><div><dt>Ingreso semanal estimado</dt><dd>{weekly === undefined ? "—" : pesos(weekly)}</dd></div></dl>
      <p className={styles.feeSource}>{loading ? "Consultando honorarios vigentes…" : fee ? "Honorario profesional vigente, después de la comisión de DocYa. No incluye el cargo de gestión del paciente. Importes en pesos argentinos." : "No pudimos consultar un honorario vigente. No mostramos estimaciones con importes antiguos."}</p>
      {!loading && !fee && <button className={styles.secondary} type="button" onClick={() => setRetry(value => value + 1)}>Volver a consultar</button>}
    </div>
    <p className={styles.simulatorDisclaimer}>Simulación ilustrativa. Los ingresos dependen de la demanda, disponibilidad y consultas efectivamente realizadas. No representan ingresos garantizados ni contemplan impuestos o gastos propios.</p>
  </div>;
}
