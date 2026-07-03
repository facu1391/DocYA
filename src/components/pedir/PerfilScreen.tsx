"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Phone, CreditCard,
  Calendar, Users, CheckCircle2, Loader2, ChevronDown,
} from "lucide-react";
import AddressInput from "./AddressInput";
import { usePedirTheme } from "./theme";
import { useI18n } from "@/lib/i18n/context";

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
  const { t } = useI18n();
  const [user, setUser] = useState<PedirUser | null>(null);
  const { dark, bg, surface, brandBorder: border, text, muted, inputBg, headerBg, logo } = usePedirTheme();

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
    } catch { router.replace("/pedir"); }
  }, [router]);

  const guardar = useCallback(async () => {
    if (!user) return;
    if (!nroDoc.trim())    return notify(t.perfil.dniRequerido, false);
    if (!direccion.trim()) return notify(t.perfil.direccionRequerida, false);
    if (!fechaNac)         return notify(t.perfil.fechaRequerida, false);
    if (!telefono.trim())  return notify(t.perfil.telRequerido, false);
    if (!acepta)           return notify(t.perfil.terminosRequeridos, false);

    const telefonoCom = `${COUNTRY_CODE}${telefono.replace(/\D/g, "")}`;
    if (!/^\+[1-9]\d{7,14}$/.test(telefonoCom))
      return notify(t.perfil.telInvalido, false);

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
      if (!res.ok) throw new Error(data?.detail || t.perfil.errorGuardar);

      const updated: PedirUser = { ...user, perfil_completo: true };
      localStorage.setItem("pedir_user", JSON.stringify(updated));
      notify(t.perfil.exito);
      router.push("/pedir");
    } catch (e) {
      notify(e instanceof Error ? e.message : t.perfil.errorGeneral, false);
    } finally {
      setSubmitting(false);
    }
  }, [user, nroDoc, direccion, fechaNac, telefono, acepta, tipoDoc, sexo, router, t]);

  if (!user) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%", background: inputBg, border: `1px solid ${border}`,
    borderRadius: 14, padding: "14px 16px", color: text, fontSize: 15,
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${border}`, background: headerBg, backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50, padding: "0 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/pedir" style={{ color: muted, display: "flex" }}><ArrowLeft size={22} /></Link>
          <Image src={logo} alt="DocYa" width={80} height={26} style={{ width: 80, height: "auto", maxHeight: 26, objectFit: "contain", display: "block", flexShrink: 0 }} />
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,179,166,0.12)", border: "1px solid rgba(0,179,166,0.25)", borderRadius: 999, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "#00b3a6", marginBottom: 16 }}>
            <CheckCircle2 size={14} /> {t.perfil.badge}
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 900, marginBottom: 8, color: "#2dd4bf" }}>
            {t.perfil.title}
          </h1>
          <p style={{ color: muted, fontSize: 15, lineHeight: 1.6 }}>
            {t.perfil.hola} <strong style={{ color: text }}>{user.full_name.split(" ")[0]}</strong>{t.perfil.necesitamosDatos}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Datos personales */}
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "22px 20px" }}>
            <Label icon={<CreditCard size={15} />} text={t.perfil.documento} muted={muted} />
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12 }}>
              <div style={{ position: "relative" }}>
                <select
                  value={tipoDoc}
                  onChange={e => setTipoDoc(e.target.value)}
                  style={{ ...inputStyle, appearance: "none", paddingRight: 32 }}
                >
                  <option value="dni">{t.perfil.dni}</option>
                  <option value="pasaporte">{t.perfil.pasaporte}</option>
                  <option value="otro">{t.perfil.otro}</option>
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: muted, pointerEvents: "none" }} />
              </div>
              <input
                value={nroDoc}
                onChange={e => setNroDoc(e.target.value)}
                placeholder={t.perfil.dniPlaceholder}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Teléfono */}
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "22px 20px" }}>
            <Label icon={<Phone size={15} />} text={t.perfil.telefonoLabel} muted={muted} />
            <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 12 }}>
              <div style={{ ...inputStyle, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: muted }}>{COUNTRY_CODE}</div>
              <input
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                placeholder={t.perfil.telefonoPlaceholder}
                inputMode="tel"
                style={inputStyle}
              />
            </div>
            <p style={{ fontSize: 12, color: muted, marginTop: 8 }}>{t.perfil.telefonoHint}</p>
          </div>

          {/* Dirección — usa el componente reutilizable */}
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "22px 20px" }}>
            <Label icon={<CheckCircle2 size={15} />} text={t.perfil.direccionLabel} muted={muted} />
            <AddressInput
              value={direccion}
              onChange={setDireccion}
              onPlaceSelect={(addr) => setDireccion(addr)}
              placeholder={t.perfil.direccionPlaceholder}
              dark={dark}
            />
            <p style={{ fontSize: 12, color: muted, marginTop: 8 }}>
              {t.perfil.direccionHint}
            </p>
          </div>

          {/* Fecha y sexo */}
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "22px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <Label icon={<Calendar size={15} />} text={t.perfil.fechaNacimiento} muted={muted} />
                <input
                  type="date"
                  value={fechaNac}
                  onChange={e => setFechaNac(e.target.value)}
                  style={{ ...inputStyle, colorScheme: dark ? "dark" : "light" }}
                />
              </div>
              <div>
                <Label icon={<Users size={15} />} text={t.perfil.sexoBiologico} muted={muted} />
                <div style={{ position: "relative" }}>
                  <select value={sexo} onChange={e => setSexo(e.target.value)} style={{ ...inputStyle, appearance: "none", paddingRight: 32 }}>
                    <option value="masculino">{t.perfil.masculino}</option>
                    <option value="femenino">{t.perfil.femenino}</option>
                    <option value="otro">{t.perfil.otro}</option>
                  </select>
                  <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: muted, pointerEvents: "none" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Términos */}
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <input
                id="acepta-perfil"
                type="checkbox"
                checked={acepta}
                onChange={e => setAcepta(e.target.checked)}
                style={{ marginTop: 2, width: 18, height: 18, flexShrink: 0 }}
              />
              <label htmlFor="acepta-perfil" style={{ fontSize: 14, color: muted, cursor: "pointer", lineHeight: 1.5 }}>
                {t.perfil.acepto}{" "}
                <Link href="/legal/pacientes/terminos" target="_blank" style={{ color: "#00b3a6" }}>{t.perfil.terminosCondiciones}</Link>
                {" "}{t.perfil.yLa}{" "}
                <Link href="/legal/pacientes/privacidad" target="_blank" style={{ color: "#00b3a6" }}>{t.perfil.politicaPrivacidad}</Link>.
              </label>
            </div>
          </div>

          {/* Botón */}
          <button
            onClick={guardar}
            disabled={submitting}
            style={{ width: "100%", padding: "17px", borderRadius: 18, border: "none", background: submitting ? "rgba(0,179,166,0.5)" : "linear-gradient(90deg, #00b3a6, #2dd4bf)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "inherit", boxShadow: submitting ? "none" : "0 8px 24px rgba(0,179,166,0.35)" }}
          >
            {submitting ? <><Loader2 size={20} className="animate-spin" />{t.perfil.guardando}</> : <><CheckCircle2 size={20} />{t.perfil.guardarContinuar}</>}
          </button>
        </div>
      </main>
    </div>
  );
}

function Label({ icon, text }: { icon: React.ReactNode; text: string; muted?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
      {icon} {text}
    </div>
  );
}
