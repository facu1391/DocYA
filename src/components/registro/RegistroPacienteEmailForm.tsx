"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCountries, type CountryCode } from "libphonenumber-js";
import InternationalPhoneInput, { normalizePhoneNumber } from "@/components/common/InternationalPhoneInput";
import AddressInput from "@/components/pedir/AddressInput";
import TermsPaciente from "@/components/registro/TermsPaciente";

const API = process.env.NEXT_PUBLIC_API_BASE!;

export default function RegistroPacienteEmailForm() {
  const searchParams = useSearchParams();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("dni");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [paisPasaporte, setPaisPasaporte] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoPais, setTelefonoPais] = useState<CountryCode>("AR");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("otro");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
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

  const inputClass = "h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-[var(--foreground)]";

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (nombre.trim().split(/\s+/).length < 2) return setError("Ingresá tu nombre y apellido.");
    if (password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres.");
    if (password !== confirmPassword) return setError("Las contraseñas no coinciden.");
    if (!numeroDocumento.trim()) return setError("Ingresá tu número de documento.");
    if (tipoDocumento === "pasaporte" && !paisPasaporte) return setError("Seleccioná el país que emitió tu pasaporte.");
    if (!fechaNacimiento) return setError("Seleccioná tu fecha de nacimiento.");
    if (!direccion.trim()) return setError("Ingresá tu dirección.");
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
          tipo_documento: tipoDocumento,
          numero_documento: numeroDocumento.trim(),
          dni: tipoDocumento === "dni" ? numeroDocumento.replace(/\D/g, "") : null,
          telefono: telefonoNormalizado,
          pais: tipoDocumento === "dni" ? "Argentina" : paisPasaporte,
          direccion: direccion.trim(),
          fecha_nacimiento: fechaNacimiento || null,
          sexo: sexo || null,
          acepto_condiciones: true,
          acepta_terminos: true,
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
      <p className="mt-1 text-sm text-muted-foreground">Completá los mismos datos que te pide DocYa al crear tu perfil. Te enviaremos un correo para activar la cuenta.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2"><span className={labelClass}>Nombre y apellido</span><input className={inputClass} autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} required /></label>
        <label className="sm:col-span-2"><span className={labelClass}>Email</span><input className={inputClass} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label><span className={labelClass}>Contraseña</span><input className={inputClass} type="password" autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        <label><span className={labelClass}>Repetir contraseña</span><input className={inputClass} type="password" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></label>
        <label><span className={labelClass}>Tipo de documento</span><select className={inputClass} value={tipoDocumento} onChange={(e) => { setTipoDocumento(e.target.value); setPaisPasaporte(""); }}><option value="dni">DNI</option><option value="pasaporte">Pasaporte</option><option value="otro">Otro</option></select></label>
        <label><span className={labelClass}>Número de documento</span><input className={inputClass} autoComplete="off" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} required /></label>
        {tipoDocumento === "pasaporte" && <label className="sm:col-span-2"><span className={labelClass}>País que emitió el pasaporte</span><select className={inputClass} value={paisPasaporte} onChange={(e) => setPaisPasaporte(e.target.value)} required><option value="">Seleccioná un país</option>{paises.map(({ code, name }) => <option key={code} value={name}>{name}</option>)}</select></label>}
        <div className="sm:col-span-2"><span className={labelClass}>Teléfono internacional</span><InternationalPhoneInput country={telefonoPais} onCountryChange={setTelefonoPais} value={telefono} onChange={setTelefono} background="var(--background)" menuBackground="var(--popover)" border="var(--border)" color="var(--foreground)" muted="var(--muted-foreground)" /></div>
        <label className="sm:col-span-2"><span className={labelClass}>Dirección</span><AddressInput value={direccion} onChange={setDireccion} placeholder="Empezá a escribir tu dirección" /></label>
        <label><span className={labelClass}>Fecha de nacimiento</span><input className={inputClass} type="date" autoComplete="bday" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required /></label>
        <label><span className={labelClass}>Sexo</span><select className={inputClass} value={sexo} onChange={(e) => setSexo(e.target.value)} required><option value="masculino">Masculino</option><option value="femenino">Femenino</option><option value="otro">Otro</option></select></label>
      </div>

      <label className="flex items-start gap-3 text-sm leading-5 text-muted-foreground">
        <input className="mt-1 h-4 w-4 accent-teal-600" type="checkbox" checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} />
        <span>Acepto los <Link className="text-teal-600 underline" href="/legal/pacientes/terminos">Términos y Condiciones</Link> y la <Link className="text-teal-600 underline" href="/legal/pacientes/privacidad">Política de Privacidad</Link>.</span>
      </label>
      <div className="max-h-72 overflow-auto rounded-xl border border-[var(--border)] p-4"><TermsPaciente /></div>
      {error && <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={submitting} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-teal-600 px-5 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-wait disabled:opacity-60">
        {submitting ? "Creando cuenta…" : "Crear cuenta"}
      </button>
      <p className="text-center text-sm text-muted-foreground">¿Ya tenés cuenta? <Link href="/pedir" className="font-semibold text-teal-600 hover:underline">Iniciá sesión</Link></p>
      <p className="text-center text-sm text-muted-foreground">¿Preferís Google o Apple? <Link href="/registro/paciente" className="font-semibold text-teal-600 hover:underline">Volver al registro social</Link></p>
    </form>
  );
}
