"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, Stethoscope, Video, HeartPulse, Baby,
  CreditCard, Wallet, Banknote, Loader2, ChevronRight,
  Navigation, ShieldCheck, CheckCircle2, RotateCcw,
} from "lucide-react";
import AddressInput from "./AddressInput";
import MapView from "./MapView";
import { usePedirTheme } from "./theme";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type PedirUser = { id: string; full_name: string; email: string; perfil_completo: boolean; access_token?: string };
type MetodoPago = "tarjeta" | "saldo_mp" | "efectivo";
type Tarifa = { tipo?: string; monto: number; descripcion?: string };

const TIPO_CONFIG = {
  medico:       { label: "Médico a domicilio",     icon: Stethoscope, color: "#00b3a6" },
  teleconsulta: { label: "Teleconsulta",            icon: Video,       color: "#818cf8" },
  enfermero:    { label: "Enfermería a domicilio",  icon: HeartPulse,  color: "#f472b6" },
} as const;

const METODOS: { id: MetodoPago; icon: typeof CreditCard; label: string; sub: string }[] = [
  { id: "tarjeta",  icon: CreditCard, label: "Tarjeta de crédito", sub: "Visa, Mastercard o Amex" },
  { id: "saldo_mp", icon: Wallet,     label: "Saldo Mercado Pago",  sub: "Tu cuenta de MP" },
  { id: "efectivo", icon: Banknote,   label: "Efectivo",            sub: "Le pagás al profesional" },
];

const METODOS_ONLINE = METODOS.filter(m => m.id !== "efectivo");

function tarifaEndpoint(tipo: keyof typeof TIPO_CONFIG) {
  if (tipo === "teleconsulta") return "teleconsulta";
  if (tipo === "enfermero") return "consulta-enfermero";
  return "consulta-medico";
}

function parseMonto(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function formatPesos(value?: number | null) {
  if (!value) return "Cargando...";
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
  const router = useRouter();
  const params = useSearchParams();
  const tipo = (params.get("tipo") ?? "medico") as keyof typeof TIPO_CONFIG;
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
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("tarjeta");
  const [submitting, setSubmitting] = useState(false);
  const [tarifa, setTarifa] = useState<Tarifa | null>(null);
  const [tarifaLoading, setTarifaLoading] = useState(true);
  const [tarifaError, setTarifaError] = useState("");
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
        if (!res.ok) throw new Error("No se pudo cargar el precio");
        const data = await res.json();
        const monto = parseMonto(data?.monto);
        if (!monto) throw new Error("No se pudo cargar el precio");
        if (alive) setTarifa({ tipo: data?.tipo, monto, descripcion: data?.descripcion });
      })
      .catch(e => {
        if (alive) setTarifaError(e instanceof Error ? e.message : "No se pudo cargar el precio");
      })
      .finally(() => {
        if (alive) setTarifaLoading(false);
      });

    return () => { alive = false; };
  }, [tipo]);


  const PLACES_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "AIzaSyAcvJIlpOAkRzVaXlcnE8lJQfQGBqx-bKA";

  const usarUbicacionActual = useCallback(() => {
    if (!navigator.geolocation) return notify("Geolocalización no disponible", false);
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
      () => notify("No pudimos obtener tu ubicación", false)
    );
  }, [PLACES_KEY]);

  const handleSubmit = useCallback(async () => {
    if (!user) return;
    if (!motivo.trim()) return notify("Describí el motivo de la consulta", false);
    if (!direccion.trim()) return notify("Ingresá tu dirección", false);
    if (lat === null || lng === null) return notify("Necesitamos tus coordenadas. Usá el botón de ubicación o buscá tu dirección.", false);
    if (!permiteEfectivo && metodoPago === "efectivo") return notify("La teleconsulta no permite pago en efectivo", false);
    if (!tarifa?.monto) return notify("No pudimos cargar el precio desde DocYa. Intentá de nuevo.", false);
    if (esPediatria) {
      if (!pacienteMenorNombre.trim()) return notify("Ingresá el nombre del niño/a", false);
      if (!pacienteMenorDni.trim()) return notify("Ingresá el DNI del niño/a", false);
      const fecha = pacienteMenorFechaNacimiento.trim();
      if (fecha && (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || Number.isNaN(Date.parse(fecha)))) {
        return notify("La fecha de nacimiento debe tener formato AAAA-MM-DD", false);
      }
    }

    setSubmitting(true);
    try {
      const monto = tarifa.monto;

      if (metodoPago === "tarjeta") {
        // Crear previa y abrir formulario MP en modal
        const previaRes = await fetch(`${API}/consultas/crear_previa`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paciente_uuid: user.id, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng, tipo, categoria_consulta: categoriaConsulta, provincia, ...datosPediatricos }),
        });
        if (!previaRes.ok) throw new Error("No se pudo preparar la consulta");
        const { consulta_id } = await previaRes.json();

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
          body: JSON.stringify({ paciente_uuid: user.id, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng, tipo, categoria_consulta: categoriaConsulta, provincia, ...datosPediatricos }),
        });
        if (!previaRes.ok) throw new Error("No se pudo preparar la consulta");
        const { consulta_id } = await previaRes.json();

        const return_base_url = window.location.origin;
        const prefRes = await fetch(`${API}/pagos/saldo-mp/preferencia`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paciente_uuid: user.id, consulta_id, monto, motivo: motivo.trim(), return_base_url }),
        });
        if (!prefRes.ok) throw new Error("No se pudo crear la preferencia");
        const { init_point } = await prefRes.json();

        // Guardar datos en localStorage para recuperarlos al volver de MP
        localStorage.setItem("docya_saldo_mp_pending", JSON.stringify({
          consulta_id, tipo,
          motivo: motivo.trim(),
          direccion: direccion.trim(),
          lat, lng,
          paciente_uuid: user.id,
          access_token: user.access_token,
          categoria_consulta: categoriaConsulta,
          provincia,
          ...datosPediatricos,
        }));

        // Redirect full-page a MP (no iframe — MP bloquea embedding)
        window.location.href = init_point;
        return;
      }

      // Efectivo: solicitar directo
      const res = await fetch(`${API}/consultas/solicitar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paciente_uuid: user.id, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng, metodo_pago: "efectivo", tipo, categoria_consulta: categoriaConsulta, provincia, ...datosPediatricos }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail?.mensaje || err.detail || "No se pudo iniciar la consulta");
      }
      const data = await res.json();
      router.push(`/pedir/buscando?consulta_id=${data.consulta_id}&tipo=${tipo}&metodo=efectivo`);
    } catch (e) {
      notify(e instanceof Error ? e.message : "Error al solicitar", false);
    } finally {
      setSubmitting(false);
    }
  }, [user, motivo, direccion, lat, lng, metodoPago, tipo, router, permiteEfectivo, tarifa, esPediatria, pacienteMenorNombre, pacienteMenorDni, pacienteMenorFechaNacimiento, categoriaConsulta, provincia, datosPediatricos]);

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
            Solicitá tu {cfg.label.toLowerCase()}
          </h1>
          <p style={{ color: muted, fontSize: 15, marginBottom: 32 }}>
            Hola <strong style={{ color: text }}>{user.full_name.split(" ")[0]}</strong>, completá los datos para buscar un profesional.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* MOTIVO */}
            <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
                Motivo de la consulta
              </label>
              <textarea
                value={motivo}
                onChange={e => setMotivo(e.target.value)}
                rows={3}
                placeholder="Describí tus síntomas o el motivo de la consulta..."
                style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "14px 16px", color: text, fontSize: 15, resize: "none", outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.5 }}
              />
              <p style={{ fontSize: 12, color: muted, marginTop: 8 }}>
                Sé específico: síntomas, duración, medicación actual.
              </p>
            </div>

            {/* DIRECCIÓN */}
            <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
                {tipo === "teleconsulta" ? "Tu ubicación (para asignar profesional cercano)" : "Dirección de atención"}
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
                placeholder="Empezá a escribir tu dirección..."
                dark={dark}
              />
              <button
                onClick={usarUbicacionActual}
                style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 13, color: cfg.color, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
              >
                <Navigation size={14} />
                Usar mi ubicación actual
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
                  <p style={{ fontSize: 15, fontWeight: 800, margin: 0, color: text }}>Consulta pediátrica</p>
                  <p style={{ fontSize: 12, color: muted, margin: "2px 0 0" }}>Activá esto si la consulta es para un niño/a.</p>
                </div>
                <div style={{ width: 44, height: 26, borderRadius: 999, background: esPediatria ? cfg.color : border, position: "relative", flexShrink: 0, transition: "background 0.15s" }}>
                  <div style={{ position: "absolute", top: 3, left: esPediatria ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: "#fff", transition: "left 0.15s" }} />
                </div>
              </button>

              {esPediatria && (
                <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
                    Datos del niño/a
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                    <input value={pacienteMenorNombre} onChange={e => setPacienteMenorNombre(e.target.value)} placeholder="Nombre y apellido" style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 14px", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    <input value={pacienteMenorDni} onChange={e => setPacienteMenorDni(e.target.value)} placeholder="DNI del niño/a" inputMode="numeric" style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 14px", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    <input value={pacienteMenorFechaNacimiento} onChange={e => setPacienteMenorFechaNacimiento(e.target.value)} placeholder="Fecha nacimiento AAAA-MM-DD" style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 14px", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    <input value={pacienteMenorSexo} onChange={e => setPacienteMenorSexo(e.target.value)} placeholder="Sexo" style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 14px", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    <input value={responsableVinculo} onChange={e => setResponsableVinculo(e.target.value)} placeholder="Vínculo del responsable" style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 14px", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
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
                <p style={{ fontSize: 12, color: muted, margin: "0 0 4px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.6px" }}>Precio del servicio</p>
                <p style={{ fontSize: 26, fontWeight: 950, color: tarifaError ? "#f87171" : text, margin: 0, lineHeight: 1.1 }}>
                  {tarifaError ? "No disponible" : tarifaLoading ? "Cargando..." : formatPesos(tarifa?.monto)}
                </p>
                <p style={{ fontSize: 12, color: muted, margin: "6px 0 0", lineHeight: 1.4 }}>
                  {tarifaError || tarifa?.descripcion || "Monto actualizado desde DocYa."}
                </p>
              </div>
            </div>

            {/* MÉTODO DE PAGO */}
            <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>
                Método de pago
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, marginBottom: 18 }}>
                {METODOS_ONLINE.map(m => {
                  const selected = metodoPago === m.id;
                  const IconPago = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMetodoPago(m.id)}
                      style={{ minHeight: 54, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 10px", borderRadius: 14, border: `1.5px solid ${selected ? cfg.color : border}`, background: selected ? `${cfg.color}16` : inputBg, cursor: "pointer", color: selected ? cfg.color : muted, fontSize: 13, fontWeight: 800, fontFamily: "inherit", transition: "all 0.15s" }}
                    >
                      <IconPago size={16} />
                      {m.label}
                    </button>
                  );
                })}
              </div>
              {metodoPago !== "efectivo" && (
                <div style={{ borderRadius: 18, border: `1px solid ${border}`, background: inputBg, padding: "18px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <ShieldCheck size={22} color={cfg.color} />
                    <div>
                      <p style={{ fontSize: 17, fontWeight: 900, color: text, margin: 0 }}>Pago con preautorizacion</p>
                      <p style={{ fontSize: 12, color: muted, margin: "2px 0 0" }}>
                        {metodoPago === "tarjeta" ? `Reservamos ${formatPesos(tarifa?.monto)} en tu tarjeta de credito.` : `Generamos el pago por ${formatPesos(tarifa?.monto)} desde tu cuenta de Mercado Pago.`}
                      </p>
                    </div>
                  </div>

                  {[
                    { icon: CreditCard, strong: "No se cobra ahora.", text: metodoPago === "tarjeta" ? "El monto queda reservado en tu tarjeta pero no debitado." : "Mercado Pago prepara la operacion sin confirmar el cobro todavia." },
                    { icon: CheckCircle2, strong: `Se cobra solo si un ${tipo === "enfermero" ? "enfermero" : "medico"} acepta.`, text: "En el momento exacto que alguien acepta tu consulta." },
                    { icon: RotateCcw, strong: "Si nadie acepta o cancelas.", text: "La reserva se libera sola en menos de 5 minutos. No perdes nada." },
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
                    <p style={{ fontSize: 15, fontWeight: 800, margin: 0 }}>Efectivo</p>
                    <p style={{ fontSize: 12, color: muted, margin: "2px 0 0" }}>Le pagas al profesional cuando llega o por transferencia.</p>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: 999, border: `2px solid ${metodoPago === "efectivo" ? cfg.color : border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {metodoPago === "efectivo" && <div style={{ width: 10, height: 10, borderRadius: 999, background: cfg.color }} />}
                  </div>
                </button>
              )}

              {!permiteEfectivo && (
                <p style={{ fontSize: 12, color: muted, marginTop: 12, lineHeight: 1.5 }}>
                  En teleconsulta el pago en efectivo no esta disponible.
                </p>
              )}
            </div>

            {/* BOTÓN SUBMIT */}
            <button
              onClick={handleSubmit}
              disabled={submitting || tarifaLoading || !!tarifaError}
              style={{ width: "100%", padding: "17px 20px", borderRadius: 18, border: "none", background: (submitting || tarifaLoading || tarifaError) ? "rgba(0,179,166,0.5)" : `linear-gradient(90deg, ${cfg.color}, #2dd4bf)`, color: "#fff", fontSize: 16, fontWeight: 700, cursor: (submitting || tarifaLoading || tarifaError) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "inherit", boxShadow: submitting ? "none" : `0 8px 24px ${cfg.color}44` }}
            >
              {submitting ? (
                <><Loader2 size={20} className="animate-spin" /> Buscando profesional...</>
              ) : tarifaLoading ? (
                <><Loader2 size={20} className="animate-spin" /> Cargando precio...</>
              ) : (
                <>{metodoPago === "efectivo" ? "Solicitar" : "Autorizar y pedir"} {cfg.label.toLowerCase()} - {formatPesos(tarifa?.monto)} <ChevronRight size={20} /></>
              )}
            </button>

          </div>
        </main>
      </div>
    </>
  );
}
