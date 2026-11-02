"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCountries, type CountryCode } from "libphonenumber-js";
import InternationalPhoneInput, { normalizePhoneNumber } from "@/components/common/InternationalPhoneInput";

const API = process.env.NEXT_PUBLIC_API_BASE!;
const PROVINCIAS = [
  "Buenos Aires", "Ciudad Autónoma de Buenos Aires", "Catamarca", "Chaco", "Chubut",
  "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja",
  "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
  "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán",
];
const COMUNAS_CABA = Array.from({ length: 15 }, (_, index) => `Comuna ${index + 1}`);

export default function RegistroPacienteEmailForm() {
  const searchParams = useSearchParams();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoPais, setTelefonoPais] = useState<CountryCode>("AR");
  const [pais, setPais] = useState("Argentina");
  const [provincia, setProvincia] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [localidades, setLocalidades] = useState<string[]>([]);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [loadingLocalidades, setLoadingLocalidades] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailRegistrado, setEmailRegistrado] = useState("");
  const codigoReferido = searchParams.get("ref")?.trim() || "";

  const paises = useMemo(() => {
    const names = new Intl.DisplayNames(["es"], { type: "region" });
    return getCountries()
      .map((code) => ({ code, name: names.of(code) || code }))
      .sort((a, b) => a.name.localeCompare(b.name, "es"));
  }, []);

  useEffect(() => {
    if (!provincia) {
      setLocalidades([]);
      setLocalidad("");
      return;
    }
    if (provincia === "Ciudad Autónoma de Buenos Aires") {
      setLocalidades(COMUNAS_CABA);
      setLocalidad("");
      return;
    }

    let alive = true;
    setLoadingLocalidades(true);
    setLocalidades([]);
    setLocalidad("");
    fetch(`${API}/localidades/${encodeURIComponent(provincia)}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("No se pudieron cargar las localidades");
        const data = await response.json();
        if (alive) setLocalidades(Array.isArray(data.localidades) ? data.localidades : []);
      })
      .catch(() => { if (alive) setLocalidades([]); })
      .finally(() => { if (alive) setLoadingLocalidades(false); });
    return () => { alive = false; };
  }, [provincia]);

  const inputClass = "h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-[var(--foreground)]";

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (nombre.trim().split(/\s+/).length < 2) return setError("Ingresá tu nombre y apellido.");
    if (password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres.");
    if (password !== confirmPassword) return setError("Las contraseñas no coinciden.");
    if (pais === "Argentina" && (!provincia || !localidad)) return setError("Seleccioná provincia y localidad.");
    if (!dni.trim()) return setError("Ingresá tu DNI.");
    if (!fechaNacimiento) return setError("Seleccioná tu fecha de nacimiento.");
    if (!sexo) return setError("Seleccioná tu sexo.");
    if (!aceptaTerminos) return setError("Aceptá los términos y condiciones para continuar.");
    const telefonoNormalizado = normalizePhoneNumber(telefono, telefonoPais);
    if (!telefonoNormalizado) return setError("Ingresá un teléfono válido.");

    setSubmitting(true);
    try {
      const response = await fetch("/api/register_paciente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: nombre.trim(),
          email: email.trim().toLowerCase(),
          password,
          dni: dni.replace(/\D/g, ""),
          telefono: telefonoNormalizado,
          pais,
          provincia: pais === "Argentina" ? provincia : null,
          localidad: pais === "Argentina" ? localidad : null,
          fecha_nacimiento: fechaNacimiento || null,
          sexo: sexo || null,
          acepto_condiciones: true,
          codigo_referido: codigoReferido || undefined,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.detail || "No se pudo crear la cuenta.");
      if (typeof window !== "undefined") window.localStorage.removeItem("docya_ref_code");
      setEmailRegistrado(email.trim().toLowerCase());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo crear la cuenta.");
    } finally {
      setSubmitting(false);
    }
  };

  if (emailRegistrado) {
    return (
      <div className="rounded-3xl border border-teal-500/25 bg-card p-6 text-center shadow-xl sm:p-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 text-2xl text-teal-600">✓</div>
        <h2 className="text-xl font-semibold text-foreground">Revisá tu correo</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enviamos un enlace de activación a <strong className="text-foreground">{emailRegistrado}</strong>. Activá la cuenta y después iniciá sesión con tu email y contraseña.
        </p>
        <Link href="/pedir" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-600 px-5 font-semibold text-white transition hover:bg-teal-700">
          Ir a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-teal-500/20 bg-card p-5 shadow-xl sm:p-7">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Crear cuenta con email</h2>
        <p className="mt-1 text-sm text-muted-foreground">Completá tus datos como en la app. Te vamos a enviar un correo para activar la cuenta.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2"><span className={labelClass}>Nombre y apellido</span><input className={inputClass} autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} required /></label>
        <label className="sm:col-span-2"><span className={labelClass}>Email</span><input className={inputClass} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label><span className={labelClass}>Contraseña</span><input className={inputClass} type="password" autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        <label><span className={labelClass}>Repetir contraseña</span><input className={inputClass} type="password" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></label>
        <label><span className={labelClass}>DNI</span><input className={inputClass} inputMode="numeric" autoComplete="off" value={dni} onChange={(e) => setDni(e.target.value)} required /></label>
        <div><span className={labelClass}>Teléfono</span><InternationalPhoneInput country={telefonoPais} onCountryChange={setTelefonoPais} value={telefono} onChange={setTelefono} background="var(--background)" menuBackground="var(--popover)" border="var(--border)" color="var(--foreground)" muted="var(--muted-foreground)" /></div>
        <label className="sm:col-span-2"><span className={labelClass}>País</span><select className={inputClass} value={pais} onChange={(e) => { setPais(e.target.value); setProvincia(""); setLocalidad(""); }}>{paises.map(({ code, name }) => <option key={code} value={name}>{name}</option>)}</select></label>
        {pais === "Argentina" && <>
          <label><span className={labelClass}>Provincia</span><select className={inputClass} value={provincia} onChange={(e) => setProvincia(e.target.value)} required><option value="">Seleccioná provincia</option>{PROVINCIAS.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label><span className={labelClass}>Localidad / comuna</span><select className={inputClass} value={localidad} onChange={(e) => setLocalidad(e.target.value)} disabled={!provincia || loadingLocalidades} required><option value="">{loadingLocalidades ? "Cargando localidades…" : "Seleccioná localidad"}</option>{localidades.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        </>}
        <label><span className={labelClass}>Fecha de nacimiento</span><input className={inputClass} type="date" autoComplete="bday" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required /></label>
        <label><span className={labelClass}>Sexo</span><select className={inputClass} value={sexo} onChange={(e) => setSexo(e.target.value)} required><option value="">Seleccioná</option><option value="femenino">Femenino</option><option value="masculino">Masculino</option><option value="otro">Otro</option></select></label>
      </div>

      <label className="flex items-start gap-3 text-sm leading-5 text-muted-foreground">
        <input className="mt-1 h-4 w-4 accent-teal-600" type="checkbox" checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} />
        <span>Acepto los <Link className="text-teal-600 underline" href="/legal/pacientes/terminos">Términos y Condiciones</Link> y la <Link className="text-teal-600 underline" href="/legal/pacientes/privacidad">Política de Privacidad</Link>.</span>
      </label>
      {error && <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={submitting || loadingLocalidades} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-teal-600 px-5 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-wait disabled:opacity-60">
        {submitting ? "Creando cuenta…" : "Crear cuenta"}
      </button>
      <p className="text-center text-sm text-muted-foreground">¿Ya tenés cuenta? <Link href="/pedir" className="font-semibold text-teal-600 hover:underline">Iniciá sesión</Link></p>
      <p className="text-center text-sm text-muted-foreground">¿Preferís Google o Apple? <Link href="/registro/paciente" className="font-semibold text-teal-600 hover:underline">Volver al registro social</Link></p>
    </form>
  );
}
