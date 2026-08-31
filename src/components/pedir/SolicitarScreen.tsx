"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, Stethoscope, Video, HeartPulse, Baby,
  CreditCard, Wallet, Banknote, Landmark, Loader2, ChevronRight,
  Navigation, ShieldCheck, CheckCircle2, RotateCcw, UserRoundCheck,
} from "lucide-react";
import AddressInput from "./AddressInput";
import MapView from "./MapView";
import { usePedirTheme } from "./theme";
import { useI18n } from "@/lib/i18n/context";
import { guardarPagoPendiente } from "@/lib/pedir/pendingPayment";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type PedirUser = { id: string; full_name: string; email: string; perfil_completo: boolean; access_token?: string };
type MetodoPago = "tarjeta" | "saldo_mp" | "transferencia" | "efectivo";
type Tarifa = { tipo?: string; monto: number; descripcion?: string };
type TranslationLanguage = "" | "en" | "pt-br";
type TranslationQuote = {
  available: boolean;
  languages: string[];
  consultation_base_amount: number;
  translation_fee: number;
  translation_charged: boolean;
  total_amount: number;
};

const TIPO_ICONS = {
  medico:       { icon: Stethoscope, color: "#00b3a6" },
  teleconsulta: { icon: Video,       color: "#818cf8" },
  enfermero:    { icon: HeartPulse,  color: "#f472b6" },
} as const;

function tarifaEndpoint(tipo: keyof typeof TIPO_ICONS) {
  if (tipo === "teleconsulta") return "teleconsulta";
  if (tipo === "enfermero") return "consulta-enfermero";
  return "consulta-medico";
}

function parseMonto(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function formatPesos(value?: number | null, fallback = "...") {
  if (!value) return fallback;
  return `$${value.toLocaleString("es-AR")}`;
}

const notify = (msg: string, ok = true) => {
  if (typeof document === "undefined") return;
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:600;color:#fff;background:${ok ? "rgba(0,179,166,0.9)" : "rgba(239,68,68,0.9)"};box-shadow:0 8px 24px rgba(0,0,0,0.25)`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
};

export default function SolicitarScreen() {
  const { t } = useI18n();
  const router = useRouter();
  const params = useSearchParams();
  const tipo = (params.get("tipo") ?? "medico") as keyof typeof TIPO_ICONS;
  const tipoIcons = TIPO_ICONS[tipo] ?? TIPO_ICONS.medico;

  const TIPO_CONFIG = {
    medico:       { label: t.solicitar.tipos.medico,     ...TIPO_ICONS.medico },
    teleconsulta: { label: t.solicitar.tipos.teleconsulta, ...TIPO_ICONS.teleconsulta },
    enfermero:    { label: t.solicitar.tipos.enfermeria,  ...TIPO_ICONS.enfermero },
  };

  const METODOS: { id: MetodoPago; icon: typeof CreditCard; label: string; sub: string }[] = [
    { id: "transferencia", icon: Landmark, label: "Transferencia bancaria", sub: "Pago rápido y seguro" },
    { id: "saldo_mp", icon: Wallet, label: t.solicitar.metodos.saldoTitle, sub: t.solicitar.metodos.saldoSub },
    { id: "tarjeta", icon: CreditCard, label: "Tarjeta de crédito/débito", sub: t.solicitar.metodos.tarjetaSub },
    { id: "efectivo", icon: Banknote,   label: t.solicitar.metodos.efectivoTitle, sub: t.solicitar.metodos.efectivoSub },
  ];

  const METODOS_ONLINE = METODOS.filter(m => m.id !== "efectivo");

  const cfg = TIPO_CONFIG[tipo] ?? TIPO_CONFIG.medico;

  // AddressInput component maneja el autocomplete internamente

  const [user, setUser] = useState<PedirUser | null>(null);
  const [motivo, setMotivo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [provincia, setProvincia] = useState<string | null>(null);
  const [esPediatria, setEsPediatria] = useState(false);
  const [pacienteMenorNombre, setPacienteMenorNombre] = useState("");
  const [pacienteMenorDni, setPacienteMenorDni] = useState("");
  const [pacienteMenorFechaNacimiento, setPacienteMenorFechaNacimiento] = useState("");
  const [pacienteMenorSexo, setPacienteMenorSexo] = useState("");
  const [responsableVinculo, setResponsableVinculo] = useState("");
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("transferencia");
  const [submitting, setSubmitting] = useState(false);
  const [tarifa, setTarifa] = useState<Tarifa | null>(null);
  const [tarifaLoading, setTarifaLoading] = useState(true);
  const [tarifaError, setTarifaError] = useState("");
  const [translationQuote, setTranslationQuote] = useState<TranslationQuote | null>(null);
  const [translationLanguage, setTranslationLanguage] = useState<TranslationLanguage>("");
  const [confirmacionPaciente, setConfirmacionPaciente] = useState(false);
  const { dark, bg, brandBorder: border, text, muted, inputBg, headerBg, logo } = usePedirTheme();
  const permiteEfectivo = tipo !== "teleconsulta";
  const permitePediatria = tipo !== "enfermero";
  const categoriaConsulta = esPediatria ? "pediatria" : "adultos";
  const datosPediatricos = useMemo(() => esPediatria
    ? {
        paciente_menor_nombre: pacienteMenorNombre.trim(),
        paciente_menor_dni: pacienteMenorDni.trim(),
        paciente_menor_fecha_nacimiento: pacienteMenorFechaNacimiento.trim() || undefined,
        paciente_menor_sexo: pacienteMenorSexo.trim() || undefined,
        responsable_vinculo: responsableVinculo.trim() || undefined,
      }
    : {}, [esPediatria, pacienteMenorNombre, pacienteMenorDni, pacienteMenorFechaNacimiento, pacienteMenorSexo, responsableVinculo]);

  // Auth check
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pedir_user");
      if (!raw) { router.replace("/pedir"); return; }
      setUser(JSON.parse(raw));
    } catch { router.replace("/pedir"); }
  }, [router]);

  // Geolocalización inicial
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => { setLat(pos.coords.latitude); setLng(pos.coords.longitude); },
      () => {}
    );
  }, []);

  useEffect(() => {
    if (!permiteEfectivo && metodoPago === "efectivo") setMetodoPago("tarjeta");
  }, [permiteEfectivo, metodoPago]);

  useEffect(() => {
    let alive = true;
    setTarifaLoading(true);
    setTarifaError("");
    setTarifa(null);

    fetch(`${API}/tarifas/${tarifaEndpoint(tipo)}`, { cache: "no-store" })
      .then(async res => {
        if (!res.ok) throw new Error(t.solicitar.errorPrecio);
        const data = await res.json();
        const monto = parseMonto(data?.monto);
        if (!monto) throw new Error(t.solicitar.errorPrecio);
        if (alive) setTarifa({ tipo: data?.tipo, monto, descripcion: data?.descripcion });
      })
      .catch(e => {
        if (alive) setTarifaError(e instanceof Error ? e.message : t.solicitar.errorPrecio);
      })
      .finally(() => {
        if (alive) setTarifaLoading(false);
      });

    return () => { alive = false; };
  }, [tipo, t]);

  useEffect(() => {
    if (tipo !== "teleconsulta" || !user?.access_token) {
      setTranslationQuote(null);
      setTranslationLanguage("");
      return;
    }
    let alive = true;
    fetch(`${API}/teleconsultations/translation/quote?client_kind=web`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${user.access_token}` },
    })
      .then(async (response) => response.ok ? response.json() : null)
      .then((quote) => {
        if (!alive) return;
        setTranslationQuote(quote?.available ? quote : null);
        if (!quote?.available) setTranslationLanguage("");
      })
      .catch(() => { if (alive) { setTranslationQuote(null); setTranslationLanguage(""); } });
    return () => { alive = false; };
  }, [tipo, user]);

  const translationPayload = useMemo(() => translationLanguage && translationQuote?.available
    ? {
        translation_language: translationLanguage,
        translation_consent: true,
        translation_client_kind: "web",
        translation_capability: "realtime_translation_v1",
      }
    : {}, [translationLanguage, translationQuote]);


  const PLACES_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  const usarUbicacionActual = useCallback(() => {
    if (!navigator.geolocation) return notify(t.solicitar.geoNoDisponible, false);
    if (!PLACES_KEY) return notify(t.solicitar.geoError, false);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=${PLACES_KEY}&language=es`
          );
          const data = await res.json();
          const addr = data.results?.[0]?.formatted_address;
          if (addr) setDireccion(addr);
          const provinciaComp = data.results?.[0]?.address_components?.find(
            (c: { types: string[] }) => c.types.includes("administrative_area_level_1")
          );
          if (provinciaComp?.long_name) setProvincia(provinciaComp.long_name);
        } catch {}
      },
      () => notify(t.solicitar.geoError, false)
    );
  }, [PLACES_KEY, t]);

  const validarSolicitud = useCallback(() => {
    if (!user) return false;
    if (!motivo.trim()) { notify(t.solicitar.motivoRequerido, false); return false; }
    if (!direccion.trim()) { notify(t.solicitar.direccionRequerida, false); return false; }
    if (lat === null || lng === null) { notify(t.solicitar.coordenadasRequeridas, false); return false; }
    if (!permiteEfectivo && metodoPago === "efectivo") { notify(t.solicitar.teleconsultaEfectivo, false); return false; }
    if (!tarifa?.monto) { notify(t.solicitar.errorPrecioRetry, false); return false; }
    if (esPediatria) {
      if (!pacienteMenorNombre.trim()) { notify(t.solicitar.nombreNinio, false); return false; }
      if (!pacienteMenorDni.trim()) { notify(t.solicitar.dniNinio, false); return false; }
      const fecha = pacienteMenorFechaNacimiento.trim();
      if (fecha && (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || Number.isNaN(Date.parse(fecha)))) {
        notify(t.solicitar.fechaFormato, false);
        return false;
      }
    }
    return true;
  }, [user, motivo, direccion, lat, lng, permiteEfectivo, metodoPago, tarifa, esPediatria, pacienteMenorNombre, pacienteMenorDni, pacienteMenorFechaNacimiento, t]);

  const handleSubmit = useCallback(async () => {
    if (!validarSolicitud() || !user || !tarifa?.monto) return;
    setConfirmacionPaciente(false);

    setSubmitting(true);
    try {
      const monto = tarifa.monto;

      if (metodoPago === "transferencia") {
        const previaRes = await fetch(`${API}/consultas/crear_previa`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paciente_uuid: user.id, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng, tipo, canal_atencion: tipo === "teleconsulta" ? "teleconsulta" : "domicilio", metodo_pago: "transferencia", categoria_consulta: categoriaConsulta, provincia, canal_origen: "web", ...translationPayload, ...datosPediatricos }),
        });
        if (!previaRes.ok) throw new Error(t.solicitar.errorPreparar);
        const { consulta_id } = await previaRes.json();
        guardarPagoPendiente({
          consulta_id, tipo, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng,
          paciente_uuid: user.id, access_token: user.access_token,
          categoria_consulta: categoriaConsulta, provincia: provincia ?? undefined,
          metodo_pago: "transferencia", ...translationPayload, ...datosPediatricos,
        });
        router.push(`/pedir/transferencia?consulta_id=${consulta_id}&tipo=${tipo}&monto=${monto}`);
        return;
      }

      if (metodoPago === "tarjeta") {
        // Crear previa y abrir formulario MP en modal
        const previaRes = await fetch(`${API}/consultas/crear_previa`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paciente_uuid: user.id, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng, tipo, categoria_consulta: categoriaConsulta, provincia, canal_origen: "web", ...translationPayload, ...datosPediatricos }),
        });
        if (!previaRes.ok) throw new Error(t.solicitar.errorPreparar);
        const { consulta_id } = await previaRes.json();

        // Guardar datos para recuperarlos si se cierra/refresca la pestaña
        // después de autorizar la tarjeta pero antes de que el iframe
        // confirme por postMessage (el mismo riesgo que ya cubríamos para
        // saldo_mp, ahora también acá).
        guardarPagoPendiente({
          consulta_id, tipo,
          motivo: motivo.trim(),
          direccion: direccion.trim(),
          lat, lng,
          paciente_uuid: user.id,
          access_token: user.access_token,
          categoria_consulta: categoriaConsulta,
          provincia: provincia ?? undefined,
          metodo_pago: "tarjeta",
          ...translationPayload, ...datosPediatricos,
        });

        const mpUrl = `${API}/pagos/embebido/formulario/${consulta_id}`;
        const pagoParams = new URLSearchParams({
          url: mpUrl,
          consulta_id: String(consulta_id),
          motivo: motivo.trim(),
          direccion: direccion.trim(),
          lat: String(lat),
          lng: String(lng),
          tipo,
          metodo: "tarjeta",
          monto: String(monto),
          categoria_consulta: categoriaConsulta,
        });
        if (provincia) pagoParams.set("provincia", provincia);
        Object.entries(datosPediatricos).forEach(([key, value]) => {
          if (value) pagoParams.set(key, String(value));
        });
        router.push(`/pedir/pago?${pagoParams.toString()}`);
        return;
      }

      if (metodoPago === "saldo_mp") {
        const previaRes = await fetch(`${API}/consultas/crear_previa`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paciente_uuid: user.id, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng, tipo, categoria_consulta: categoriaConsulta, provincia, canal_origen: "web", ...translationPayload, ...datosPediatricos }),
        });
        if (!previaRes.ok) throw new Error(t.solicitar.errorPreparar);
        const { consulta_id } = await previaRes.json();

        const return_base_url = window.location.origin;
        const prefRes = await fetch(`${API}/pagos/saldo-mp/preferencia`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paciente_uuid: user.id, consulta_id, monto, motivo: motivo.trim(), return_base_url }),
        });
        if (!prefRes.ok) throw new Error(t.solicitar.errorPreferencia);
        const { init_point } = await prefRes.json();

        // Guardar datos para recuperarlos al volver de MP. En iOS/Safari el
        // redirect externo puede perder una de las dos copias; y si ni
        // siquiera vuelve a esta pestaña, la recuperación global del Home
        // (recuperarConsultaPendienteGlobal) lo reconstruye desde el backend.
        guardarPagoPendiente({
          consulta_id, tipo,
          motivo: motivo.trim(),
          direccion: direccion.trim(),
          lat, lng,
          paciente_uuid: user.id,
          access_token: user.access_token,
          categoria_consulta: categoriaConsulta,
          provincia: provincia ?? undefined,
          metodo_pago: "saldo_mp",
          ...translationPayload, ...datosPediatricos,
        });

        // Redirect full-page a MP (no iframe — MP bloquea embedding)
        window.location.href = init_point;
        return;
      }

      // Efectivo: solicitar directo
      const res = await fetch(`${API}/consultas/solicitar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paciente_uuid: user.id, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng, metodo_pago: "efectivo", tipo, categoria_consulta: categoriaConsulta, provincia, canal_origen: "web", ...datosPediatricos }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail?.mensaje || err.detail || t.solicitar.errorIniciar);
      }
      const data = await res.json();
      router.push(`/pedir/buscando?consulta_id=${data.consulta_id}&tipo=${tipo}&metodo=efectivo`);
    } catch (e) {
      notify(e instanceof Error ? e.message : t.solicitar.errorSolicitar, false);
    } finally {
      setSubmitting(false);
    }
  }, [validarSolicitud, user, tarifa, metodoPago, tipo, motivo, direccion, lat, lng, categoriaConsulta, provincia, datosPediatricos, translationPayload, router, t]);

  if (!user) return null;

  const Icon = cfg.icon;

  return (
    <>

      <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

        {/* HEADER */}
        <header style={{ borderBottom: "1px solid rgba(0,179,166,0.2)", background: headerBg, backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50, padding: "0 20px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/pedir" style={{ color: muted, display: "flex", alignItems: "center" }}>
              <ArrowLeft size={22} />
            </Link>
            <Image src={logo} alt="DocYa" width={80} height={26} style={{ width: 80, height: "auto", maxHeight: 26, objectFit: "contain", display: "block", flexShrink: 0 }} />
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, background: `${cfg.color}18`, border: `1px solid ${cfg.color}40`, borderRadius: 999, padding: "4px 12px 4px 8px" }}>
              <Icon size={14} color={cfg.color} />
              <span style={{ fontSize: 13, fontWeight: 600, color: cfg.color }}>{cfg.label}</span>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, marginBottom: 8, color: "#2dd4bf" }}>
            {t.solicitar.pageTitle} {cfg.label.toLowerCase()}
          </h1>
          <p style={{ color: muted, fontSize: 15, marginBottom: 32 }}>
            {t.solicitar.hola} <strong style={{ color: text }}>{user.full_name.split(" ")[0]}</strong>{t.solicitar.completaDatos}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* MOTIVO */}
            <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
                {t.solicitar.motivoLabel}
              </label>
              <textarea
                value={motivo}
                onChange={e => setMotivo(e.target.value)}
                rows={3}
                placeholder={t.solicitar.motivoPlaceholder}
                style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "14px 16px", color: text, fontSize: 15, resize: "none", outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.5 }}
              />
              <p style={{ fontSize: 12, color: muted, marginTop: 8 }}>
                {t.solicitar.motivoHint}
              </p>
            </div>

            {/* DIRECCIÓN */}
            <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
                {tipo === "teleconsulta" ? t.solicitar.ubicacionTeleconsulta : t.solicitar.direccionLabel}
              </label>
              <AddressInput
                value={direccion}
                onChange={setDireccion}
                onPlaceSelect={(addr, lat, lng, provincia) => {
                  setDireccion(addr);
                  if (lat !== undefined) setLat(lat);
                  if (lng !== undefined) setLng(lng);
                  if (provincia) setProvincia(provincia);
                }}
                placeholder={t.solicitar.direccionPlaceholder}
                dark={dark}
              />
              <button
                onClick={usarUbicacionActual}
                style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 13, color: cfg.color, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
              >
                <Navigation size={14} />
                {t.solicitar.usarUbicacion}
              </button>

              {/* Mini mapa Leaflet */}
              {lat !== null && lng !== null && (
                <MapView lat={lat} lng={lng} height={180} />
              )}
            </div>

            {/* PEDIATRÍA */}
            {permitePediatria && (<>
              <button
                type="button"
                onClick={() => setEsPediatria(v => !v)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", borderRadius: 20, border: `1.5px solid ${esPediatria ? cfg.color : "rgba(0,179,166,0.18)"}`, background: esPediatria ? `${cfg.color}14` : "rgba(0,179,166,0.05)", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${cfg.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Baby size={21} color={cfg.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 800, margin: 0, color: text }}>{t.solicitar.pediatrica}</p>
                  <p style={{ fontSize: 12, color: muted, margin: "2px 0 0" }}>{t.solicitar.pediatricaDesc}</p>
                </div>
                <div style={{ width: 44, height: 26, borderRadius: 999, background: esPediatria ? cfg.color : border, position: "relative", flexShrink: 0, transition: "background 0.15s" }}>
                  <div style={{ position: "absolute", top: 3, left: esPediatria ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: "#fff", transition: "left 0.15s" }} />
                </div>
              </button>

              {esPediatria && (
                <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
                    {t.solicitar.datosNinio}
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                    <input value={pacienteMenorNombre} onChange={e => setPacienteMenorNombre(e.target.value)} placeholder={t.solicitar.nombreApellido} style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 14px", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    <input value={pacienteMenorDni} onChange={e => setPacienteMenorDni(e.target.value)} placeholder={t.solicitar.dniPlaceholder} inputMode="numeric" style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 14px", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    <input value={pacienteMenorFechaNacimiento} onChange={e => setPacienteMenorFechaNacimiento(e.target.value)} placeholder={t.solicitar.fechaNacPlaceholder} style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 14px", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    <input value={pacienteMenorSexo} onChange={e => setPacienteMenorSexo(e.target.value)} placeholder={t.solicitar.sexo} style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 14px", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    <input value={responsableVinculo} onChange={e => setResponsableVinculo(e.target.value)} placeholder={t.solicitar.vinculo} style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 14px", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                  </div>
                </div>
              )}
              </>
            )}

            <div style={{ background: inputBg, border: `1.5px solid ${tarifaError ? "rgba(239,68,68,0.35)" : border}`, borderRadius: 20, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: `${cfg.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CreditCard size={21} color={cfg.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, color: muted, margin: "0 0 4px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.6px" }}>{t.solicitar.precioServicio}</p>
                <p style={{ fontSize: 26, fontWeight: 950, color: tarifaError ? "#f87171" : text, margin: 0, lineHeight: 1.1 }}>
                  {tarifaError ? t.solicitar.noDisponible : tarifaLoading ? t.solicitar.cargando : formatPesos(tarifa?.monto, t.solicitar.cargando)}
                </p>
                <p style={{ fontSize: 12, color: muted, margin: "6px 0 0", lineHeight: 1.4 }}>
                  {tarifaError || tarifa?.descripcion || t.solicitar.montoActualizado}
                </p>
              </div>
            </div>

            {tipo === "teleconsulta" && translationQuote?.available && (
              <div style={{ background: "rgba(37,215,200,0.06)", border: "1.5px solid rgba(37,215,200,0.24)", borderRadius: 20, padding: "20px" }}>
                <p style={{ margin: "0 0 13px", fontSize: 16, fontWeight: 900 }}>{t.solicitar.traduccionTitulo}</p>
                {[
                  { value: "" as TranslationLanguage, label: t.solicitar.sinTraduccion },
                  ...(translationQuote.languages.includes("en") ? [{ value: "en" as TranslationLanguage, label: `${t.solicitar.idiomaIngles} + ${formatPesos(translationQuote.translation_fee)}` }] : []),
                  ...(translationQuote.languages.includes("pt-br") ? [{ value: "pt-br" as TranslationLanguage, label: `${t.solicitar.idiomaPortugues} + ${formatPesos(translationQuote.translation_fee)}` }] : []),
                ].map(option => (
                  <label key={option.value || "none"} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", cursor: "pointer", fontWeight: 750 }}>
                    <input type="radio" name="translation-language" checked={translationLanguage === option.value} onChange={() => setTranslationLanguage(option.value)} />
                    {option.label}
                  </label>
                ))}
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${border}`, fontSize: 13 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>{t.solicitar.teleconsultaLinea}</span><strong>{formatPesos(translationQuote.consultation_base_amount)}</strong></div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7 }}><span>{t.solicitar.traduccionIaLinea}</span><strong>{translationLanguage ? formatPesos(translationQuote.translation_fee) : "$0"}</strong></div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `1px solid ${border}`, fontSize: 17 }}><span>{t.solicitar.totalLinea}</span><strong>{formatPesos(translationLanguage ? translationQuote.total_amount : translationQuote.consultation_base_amount)}</strong></div>
                </div>
                {translationLanguage && !translationQuote.translation_charged && <p style={{ margin: "10px 0 0", color: muted, fontSize: 11.5 }}>{t.solicitar.traduccionNoIncluida}</p>}
              </div>
            )}

            {/* MÉTODO DE PAGO */}
            <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>
                {t.solicitar.metodoPago}
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 18 }}>
                {METODOS_ONLINE.map(m => {
                  const selected = metodoPago === m.id;
                  const recommended = m.id === "transferencia";
                  const IconPago = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMetodoPago(m.id)}
                      style={{ minHeight: recommended ? 76 : 72, display: "flex", alignItems: "center", gap: 10, padding: "12px", borderRadius: 14, border: `1.5px solid ${selected || recommended ? cfg.color : border}`, background: selected ? `${cfg.color}16` : recommended ? `${cfg.color}0b` : inputBg, cursor: "pointer", color: selected || recommended ? cfg.color : muted, fontFamily: "inherit", transition: "all 0.15s", textAlign: "left", boxShadow: recommended ? `0 4px 14px ${cfg.color}18` : "none" }}
                    >
                      <IconPago size={18} style={{ flexShrink: 0 }} />
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: selected || recommended ? cfg.color : text }}>{m.label}</span>
                          {recommended && (
                            <span style={{ borderRadius: 999, background: cfg.color, color: "#fff", padding: "3px 7px", fontSize: 9, fontWeight: 900, letterSpacing: "0.55px", lineHeight: 1 }}>
                              RECOMENDADO
                            </span>
                          )}
                        </span>
                        <span style={{ display: "block", color: muted, fontSize: 11, fontWeight: 600, marginTop: 3, lineHeight: 1.3 }}>{m.sub}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {metodoPago !== "efectivo" && metodoPago !== "transferencia" && (
                <div style={{ borderRadius: 18, border: `1px solid ${border}`, background: inputBg, padding: "18px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <ShieldCheck size={22} color={cfg.color} />
                    <div>
                      <p style={{ fontSize: 17, fontWeight: 900, color: text, margin: 0 }}>{t.solicitar.pagoPreautorizacion}</p>
                      <p style={{ fontSize: 12, color: muted, margin: "2px 0 0" }}>
                        {metodoPago === "tarjeta" ? t.solicitar.reservamos.replace("{monto}", formatPesos(tarifa?.monto, t.solicitar.cargando)) : t.solicitar.generamosPago.replace("{monto}", formatPesos(tarifa?.monto, t.solicitar.cargando))}
                      </p>
                    </div>
                  </div>

                  {[
                    { icon: CreditCard, strong: t.solicitar.noSeCobraAhora, text: metodoPago === "tarjeta" ? t.solicitar.montoReservado : t.solicitar.mpPreparaPago },
                    { icon: CheckCircle2, strong: tipo === "enfermero" ? t.solicitar.seCobraEnfermero : t.solicitar.seCobraMedico, text: t.solicitar.enMomentoAcepta },
                    { icon: RotateCcw, strong: t.solicitar.siNadieAcepta, text: t.solicitar.reservaLibera },
                  ].map(({ icon: BulletIcon, strong, text: itemText }) => (
                    <div key={strong} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <BulletIcon size={17} color={cfg.color} style={{ flexShrink: 0, marginTop: 2 }} />
                      <p style={{ fontSize: 14, color: muted, lineHeight: 1.45, margin: 0 }}>
                        <strong style={{ color: text }}>{strong}</strong> {itemText}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {metodoPago === "transferencia" && (
                <div style={{ borderRadius: 18, border: `1px solid ${border}`, background: inputBg, padding: "18px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Landmark size={22} color={cfg.color} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 900, color: text, margin: 0 }}>Transferencia bancaria</p>
                    <p style={{ fontSize: 13, color: muted, margin: "5px 0 0", lineHeight: 1.5 }}>
                      <strong style={{ color: text }}>La opción más rápida y simple.</strong>{" "}
                      Te mostraremos el alias y CVU para transferir. Una vez realizado el pago,{" "}
                      <strong style={{ color: text }}>lo verificamos de inmediato</strong>{" "}
                      y continuamos con la búsqueda de tu médico.{" "}
                      <strong style={{ color: text }}>No necesitás enviar comprobante.</strong>
                    </p>
                  </div>
                </div>
              )}
              {permiteEfectivo && (
                <button
                  type="button"
                  onClick={() => setMetodoPago("efectivo")}
                  style={{ width: "100%", marginTop: 12, display: "flex", alignItems: "center", gap: 14, padding: "16px", borderRadius: 16, border: `1.5px solid ${metodoPago === "efectivo" ? cfg.color : border}`, background: metodoPago === "efectivo" ? `${cfg.color}14` : inputBg, color: text, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
                >
                  <div style={{ width: 42, height: 42, borderRadius: 14, background: metodoPago === "efectivo" ? `${cfg.color}20` : `${border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Banknote size={20} color={metodoPago === "efectivo" ? cfg.color : muted} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 800, margin: 0 }}>{t.solicitar.metodos.efectivoTitle}</p>
                    <p style={{ fontSize: 12, color: muted, margin: "2px 0 0" }}>{t.solicitar.efectivoDesc}</p>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: 999, border: `2px solid ${metodoPago === "efectivo" ? cfg.color : border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {metodoPago === "efectivo" && <div style={{ width: 10, height: 10, borderRadius: 999, background: cfg.color }} />}
                  </div>
                </button>
              )}

              {!permiteEfectivo && (
                <p style={{ fontSize: 12, color: muted, marginTop: 12, lineHeight: 1.5 }}>
                  {t.solicitar.teleconsultaEfectivoDisabled}
                </p>
              )}
            </div>

            {/* BOTÓN SUBMIT */}
            <button
              onClick={() => {
                if (validarSolicitud()) setConfirmacionPaciente(true);
              }}
              disabled={submitting || tarifaLoading || !!tarifaError}
              style={{ width: "100%", padding: "17px 20px", borderRadius: 18, border: "none", background: (submitting || tarifaLoading || tarifaError) ? "rgba(0,179,166,0.5)" : `linear-gradient(90deg, ${cfg.color}, #2dd4bf)`, color: "#fff", fontSize: 16, fontWeight: 700, cursor: (submitting || tarifaLoading || tarifaError) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "inherit", boxShadow: submitting ? "none" : `0 8px 24px ${cfg.color}44` }}
            >
              {submitting ? (
                <><Loader2 size={20} className="animate-spin" /> {t.solicitar.buscandoProfesional}</>
              ) : tarifaLoading ? (
                <><Loader2 size={20} className="animate-spin" /> {t.solicitar.cargandoPrecio}</>
              ) : (
                <>{metodoPago === "efectivo" ? t.solicitar.solicitarBtn : metodoPago === "transferencia" ? "Ver datos para transferir" : t.solicitar.autorizarPedir} {metodoPago === "transferencia" ? "" : cfg.label.toLowerCase()} - {formatPesos(tarifa?.monto, t.solicitar.cargando)} <ChevronRight size={20} /></>
              )}
            </button>

          </div>
        </main>
      </div>

      {confirmacionPaciente && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmacion-paciente-titulo"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            background: "rgba(2, 12, 20, 0.74)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ width: "100%", maxWidth: 500, overflow: "hidden", borderRadius: 28, border: `1px solid ${border}`, background: inputBg, color: text, boxShadow: "0 28px 80px rgba(0,0,0,0.38)" }}>
            <div style={{ padding: "28px 26px 20px", textAlign: "center", background: `linear-gradient(180deg, ${cfg.color}18, transparent)` }}>
              <div style={{ width: 66, height: 66, margin: "0 auto 16px", borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", background: `${cfg.color}1f`, border: `1px solid ${cfg.color}45` }}>
                <UserRoundCheck size={32} color={cfg.color} />
              </div>
              <h2 id="confirmacion-paciente-titulo" style={{ margin: 0, fontSize: 23, fontWeight: 900, letterSpacing: "-0.3px" }}>
                {t.solicitar.confirmarPacienteTitulo}
              </h2>
              <p style={{ margin: "10px auto 0", maxWidth: 410, color: muted, fontSize: 14, lineHeight: 1.6 }}>
                {t.solicitar.confirmarPacienteIntro}
              </p>
            </div>

            <div style={{ padding: "0 26px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ padding: "15px 16px", borderRadius: 16, background: `${cfg.color}10`, border: `1px solid ${cfg.color}30` }}>
                <p style={{ margin: 0, color: text, fontSize: 14, lineHeight: 1.55 }}>
                  <strong>{t.solicitar.confirmarPacienteAdultoTitulo}</strong> {t.solicitar.confirmarPacienteAdultoTexto}
                </p>
              </div>
              <div style={{ padding: "15px 16px", borderRadius: 16, background: "rgba(129,140,248,0.09)", border: "1px solid rgba(129,140,248,0.25)" }}>
                <p style={{ margin: 0, color: text, fontSize: 14, lineHeight: 1.55 }}>
                  <strong>{t.solicitar.confirmarPacienteMenorTitulo}</strong> {t.solicitar.confirmarPacienteMenorTexto}
                </p>
              </div>
              <p style={{ margin: "2px 2px 0", color: muted, fontSize: 12, lineHeight: 1.5, textAlign: "center" }}>
                {t.solicitar.confirmarPacienteDocumentos}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: 10, padding: "0 26px 26px" }}>
              <button
                type="button"
                onClick={() => setConfirmacionPaciente(false)}
                style={{ padding: "14px 16px", borderRadius: 15, border: `1px solid ${border}`, background: "transparent", color: text, fontSize: 14, fontWeight: 750, cursor: "pointer", fontFamily: "inherit" }}
              >
                {t.solicitar.confirmarPacienteRevisar}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                style={{ padding: "14px 16px", borderRadius: 15, border: "none", background: `linear-gradient(90deg, ${cfg.color}, #2dd4bf)`, color: "#fff", fontSize: 14, fontWeight: 800, cursor: submitting ? "wait" : "pointer", fontFamily: "inherit", boxShadow: `0 10px 24px ${cfg.color}35` }}
              >
                {submitting ? t.solicitar.buscandoProfesional : t.solicitar.confirmarPacienteContinuar}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

