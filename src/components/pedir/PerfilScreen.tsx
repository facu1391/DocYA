"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, User, Phone, CreditCard,
  Calendar, Users, CheckCircle2, Loader2, ChevronDown,
} from "lucide-react";
import AddressInput from "./AddressInput";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type PedirUser = { id: string; full_name: string; email: string; perfil_completo: boolean };

const COUNTRY_CODE = "+54";

const notify = (msg: string, ok = true) => {
  if (typeof document === "undefined") return;
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:600;color:#fff;background:${ok ? "rgba(0,179,166,0.9)" : "rgba(239,68,68,0.9)"};box-shadow:0 8px 24px rgba(0,0,0,0.25)`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
};

export default function PerfilScreen() {
  const router = useRouter();
  const [user, setUser] = useState<PedirUser | null>(null);

  const dark    = true;
  const bg      = "#071b22";
  const surface = "rgba(255,255,255,0.05)";
  const border  = "rgba(255,255,255,0.10)";
  const text    = "#e2f0f0";
  const muted   = "rgba(255,255,255,0.55)";
  const inputBg = "rgba(255,255,255,0.06)";

  const [tipoDoc,     setTipoDoc]     = useState("dni");
  const [nroDoc,      setNroDoc]      = useState("");
  const [telefono,    setTelefono]    = useState("");
  const [direccion,   setDireccion]   = useState("");
  const [fechaNac,    setFechaNac]    = useState("");
  const [sexo,        setSexo]        = useState("masculino");
  const [acepta,      setAcepta]      = useState(false);
  const [submitting,  setSubmitting]  = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pedir_user");
      if (!raw) { router.replace("/pedir"); return; }
      const u = JSON.parse(raw) as PedirUser;
      if (u.perfil_completo) { router.replace("/pedir"); return; }
      setUser(u);
    } catch (_) { router.replace("/pedir"); }
  }, [router]);

  const guardar = useCallback(async () => {
    if (!user) return;
    if (!nroDoc.trim())    return notify("Ingresá tu número de documento", false);
    if (!direccion.trim()) return notify("Ingresá tu dirección", false);
    if (!fechaNac)         return notify("Seleccioná tu fecha de nacimiento", false);
    if (!telefono.trim())  return notify("Ingresá tu teléfono", false);
    if (!acepta)           return notify("Debés aceptar los términos", false);

    const telefonoCom = `${COUNTRY_CODE}${telefono.replace(/\D/g, "")}`;
    if (!/^\+[1-9]\d{7,14}$/.test(telefonoCom))
      return notify("Ingresá un teléfono válido (sin 0 ni 15)", false);

    setSubmitting(true);
    try {
      const res = await fetch(`${API}/completar_perfil`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id:          user.id,
          telefono:         telefonoCom,
          tipo_documento:   tipoDoc,
          numero_documento: nroDoc.trim(),
          direccion:        direccion.trim(),
          fecha_nacimiento: fechaNac,
          sexo,
          acepta_terminos:  acepta,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "No se pudo guardar el perfil");

      const updated: PedirUser = { ...user, perfil_completo: true };
      localStorage.setItem("pedir_user", JSON.stringify(updated));
      notify("¡Perfil completo! Ya podés pedir tu consulta");
      router.push("/pedir");
    } catch (e) {
      notify(e instanceof Error ? e.message : "Error al guardar", false);
    } finally {
      setSubmitting(false);
    }
  }, [user, nroDoc, direccion, fechaNac, telefono, acepta, tipoDoc, sexo, router]);

  if (!user) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%", background: inputBg, border: `1px solid ${border}`,
    borderRadius: 14, padding: "14px 16px", color: text, fontSize: 15,
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${border}`, background: "rgba(7,27,34,0.92)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50, padding: "0 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/pedir" style={{ color: muted, display: "flex" }}><ArrowLeft size={22} /></Link>
          <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png" alt="DocYa" width={80} height={26} style={{ height: 26, width: "auto" }} />
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,179,166,0.12)", border: "1px solid rgba(0,179,166,0.25)", borderRadius: 999, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "#00b3a6", marginBottom: 16 }}>
            <CheckCircle2 size={14} /> Un paso más
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 800, marginBottom: 8 }}>
            Completá tu perfil
          </h1>
          <p style={{ color: muted, fontSize: 15, lineHeight: 1.6 }}>
            Hola <strong style={{ color: text }}>{user.full_name.split(" ")[0]}</strong>, necesitamos algunos datos para poder asignarte un profesional y emitir recetas.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Datos personales */}
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "22px 20px" }}>
            <Label icon={<CreditCard size={15} />} text="Documento" muted={muted} />
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12 }}>
              <div style={{ position: "relative" }}>
                <select
                  value={tipoDoc}
                  onChange={e => setTipoDoc(e.target.value)}
                  style={{ ...inputStyle, appearance: "none", paddingRight: 32 }}
                >
                  <option value="dni">DNI</option>
                  <option value="pasaporte">Pasaporte</option>
                  <option value="otro">Otro</option>
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: muted, pointerEvents: "none" }} />
              </div>
              <input
                value={nroDoc}
                onChange={e => setNroDoc(e.target.value)}
                placeholder="Ej: 30123456"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Teléfono */}
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "22px 20px" }}>
            <Label icon={<Phone size={15} />} text="Teléfono (sin 0 ni 15)" muted={muted} />
            <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 12 }}>
              <div style={{ ...inputStyle, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: muted }}>{COUNTRY_CODE}</div>
              <input
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                placeholder="11 2233 4455"
                inputMode="tel"
                style={inputStyle}
              />
            </div>
            <p style={{ fontSize: 12, color: muted, marginTop: 8 }}>Argentina +54. Ej: 11 2233 4455 (sin el 0 ni el 15)</p>
          </div>

          {/* Dirección — usa el componente reutilizable */}
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "22px 20px" }}>
            <Label icon={<CheckCircle2 size={15} />} text="Dirección habitual" muted={muted} />
            <AddressInput
              value={direccion}
              onChange={setDireccion}
              onPlaceSelect={(addr) => setDireccion(addr)}
              placeholder="Empezá a escribir tu dirección..."
              dark={dark}
            />
            <p style={{ fontSize: 12, color: muted, marginTop: 8 }}>
              Podés cambiar la dirección al hacer cada pedido.
            </p>
          </div>

          {/* Fecha y sexo */}
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "22px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <Label icon={<Calendar size={15} />} text="Fecha de nacimiento" muted={muted} />
                <input
                  type="date"
                  value={fechaNac}
                  onChange={e => setFechaNac(e.target.value)}
                  style={{ ...inputStyle, colorScheme: "dark" }}
                />
              </div>
              <div>
                <Label icon={<Users size={15} />} text="Sexo biológico" muted={muted} />
                <div style={{ position: "relative" }}>
                  <select value={sexo} onChange={e => setSexo(e.target.value)} style={{ ...inputStyle, appearance: "none", paddingRight: 32 }}>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                  <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: muted, pointerEvents: "none" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Términos */}
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <input
                id="acepta-perfil"
                type="checkbox"
                checked={acepta}
                onChange={e => setAcepta(e.target.checked)}
                style={{ marginTop: 2, width: 18, height: 18, flexShrink: 0 }}
              />
              <label htmlFor="acepta-perfil" style={{ fontSize: 14, color: muted, cursor: "pointer", lineHeight: 1.5 }}>
                Acepto los{" "}
                <Link href="/legal/pacientes/terminos" target="_blank" style={{ color: "#00b3a6" }}>Términos y Condiciones</Link>
                {" "}y la{" "}
                <Link href="/legal/pacientes/privacidad" target="_blank" style={{ color: "#00b3a6" }}>Política de Privacidad</Link>.
              </label>
            </div>
          </div>

          {/* Botón */}
          <button
            onClick={guardar}
            disabled={submitting}
            style={{ width: "100%", padding: "17px", borderRadius: 18, border: "none", background: submitting ? "rgba(0,179,166,0.5)" : "linear-gradient(90deg, #00b3a6, #2dd4bf)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "inherit", boxShadow: submitting ? "none" : "0 8px 24px rgba(0,179,166,0.35)" }}
          >
            {submitting ? <><Loader2 size={20} className="animate-spin" />Guardando...</> : <><CheckCircle2 size={20} />Guardar y continuar</>}
          </button>
        </div>
      </main>
    </div>
  );
}

function Label({ icon, text, muted }: { icon: React.ReactNode; text: string; muted: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>
      {icon} {text}
    </div>
  );
}
