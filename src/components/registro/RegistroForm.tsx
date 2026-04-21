// src/components/registro/RegistroForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registroPacienteSchema,
  registroSchema,
  type RegistroFormValues,
  type RegistroPacienteValues,
} from "./schema";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Camera,
  IdCard,
  Image as ImageIcon,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Send,
  Stethoscope,
  User2,
} from "lucide-react";

import LoadingSplash from "@/components/common/LoadingSplash";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ZonaCobertura from "@/components/registro/ZonaCobertura";
import TermsPaciente from "./TermsPaciente";

type Mode = "pro" | "paciente";

type Props = {
  mode?: Mode;
};

const PRO_COUNTRIES = [
  { code: "AR", phoneCode: "54" },
  { code: "UY", phoneCode: "598" },
  { code: "CL", phoneCode: "56" },
  { code: "PY", phoneCode: "595" },
  { code: "BO", phoneCode: "591" },
  { code: "PE", phoneCode: "51" },
  { code: "ES", phoneCode: "34" },
  { code: "US", phoneCode: "1" },
];

function flagEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export default function RegistroForm({ mode = "pro" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingSplash, setLoadingSplash] = useState(false);
  const [codigoReferido, setCodigoReferido] = useState("");
  const [proCountry, setProCountry] = useState(PRO_COUNTRIES[0]);

  const isPaciente = mode === "paciente";

  useEffect(() => {
    if (!isPaciente) return;
    const refFromUrl = (searchParams.get("ref") || "").trim();
    const refStored =
      typeof window !== "undefined"
        ? window.localStorage.getItem("docya_ref_code") || ""
        : "";
    const finalRef = refFromUrl || refStored;
    if (finalRef) {
      setCodigoReferido(finalRef);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("docya_ref_code", finalRef);
      }
    }
  }, [isPaciente, searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RegistroFormValues | RegistroPacienteValues>({
    resolver: zodResolver(isPaciente ? registroPacienteSchema : registroSchema),
  });

  const foto = watch("foto" as any) as File | undefined;
  const dniFrente = watch("dniFrente" as any) as File | undefined;
  const dniDorso = watch("dniDorso" as any) as File | undefined;
  const selfieDni = watch("selfieDni" as any) as File | undefined;

  const onPickFile =
    (field: keyof RegistroFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) setValue(field as any, f, { shouldValidate: true });
    };

  async function fileToDataURL(file?: File): Promise<string | undefined> {
    if (!file) return undefined;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("El archivo no puede superar 5 MB");
      return undefined;
    }
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
      reader.readAsDataURL(file);
    });
  }

  async function onSubmit(raw: any) {
    try {
      if (!isPaciente) {
        const telefonoDigits = String(raw.telefono ?? "").replace(/\D/g, "");
        const telefonoCompleto = `+${proCountry.phoneCode}${telefonoDigits}`;
        const [fotoPerfil64, dniFrente64, dniDorso64, selfieDni64] =
          await Promise.all([
            fileToDataURL(foto),
            fileToDataURL(dniFrente),
            fileToDataURL(dniDorso),
            fileToDataURL(selfieDni),
          ]);

        const payload = {
          full_name: raw.nombreCompleto.trim(),
          email: String(raw.email).toLowerCase().trim(),
          password: raw.password,
          matricula: raw.matricula?.trim(),
          especialidad: raw.especialidad?.trim() || null,
          tipo: raw.tipo,
          telefono: telefonoCompleto,
          dni: raw.tipoDocumento === "dni" ? raw.numeroDocumento?.trim() : null,
          tipo_documento: raw.tipoDocumento,
          numero_documento: raw.numeroDocumento?.trim(),
          direccion: raw.direccion?.trim(),
          acepta_terminos: raw.aceptaTerminos === true,
          foto_perfil: fotoPerfil64,
          foto_dni_frente: dniFrente64,
          foto_dni_dorso: dniDorso64,
          selfie_dni: selfieDni64,
        };

        const res = await fetch("/api/register_medico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const js = await res.json().catch(() => ({}));
          toast.error(js?.detail || "No se pudo registrar.");
          return;
        }
      } else {
        const rawZona = (raw.zona || "").trim();
        const [p1 = "", p2 = ""] = rawZona.split("/").map((s: string) => s.trim());
        const provincia = p1 && p2 ? p1 : "";
        const localidad = p1 && p2 ? p2 : rawZona;

        const payloadPaciente = {
          email: String(raw.email).toLowerCase().trim(),
          full_name: raw.nombreCompleto.trim(),
          password: raw.password,
          dni: raw.dni?.trim(),
          telefono: raw.telefono?.trim(),
          pais: "Argentina",
          provincia,
          localidad,
          fecha_nacimiento: raw.fechaNacimiento || null,
          sexo: raw.sexo,
          acepto_condiciones: true,
          codigo_referido: codigoReferido || undefined,
        };

        const res = await fetch("/api/register_paciente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadPaciente),
        });

        if (!res.ok) {
          const js = await res.json().catch(() => ({}));
          toast.error(js?.detail || "No se pudo registrar.");
          return;
        }
      }

      toast.success("Registro exitoso. Revisa tu correo para activar tu cuenta.");
      setLoadingSplash(true);
    } catch {
      toast.error("Error de red. Proba de nuevo.");
      setLoadingSplash(false);
    }
  }

  const Err = ({ msg }: { msg?: string }) =>
    msg ? <p className="mt-1 text-xs text-red-500">{msg}</p> : null;

  function FileRow({
    id,
    label,
    icon,
    accept = "image/*",
    onChange,
    fileName,
    error,
  }: {
    id: string;
    label: string;
    icon: React.ReactNode;
    accept?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileName?: string;
    error?: string;
  }) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <div>
        <Label htmlFor={id} className="mb-1 block">
          {label}
        </Label>
        <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2 focus-within:border-[var(--brand)] focus-within:ring-2 focus-within:ring-[var(--brand)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)]">
            {icon}
          </span>
          <span className="flex-1 truncate text-sm text-muted-foreground">
            {fileName || "Ningun archivo seleccionado"}
          </span>
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="h-9 px-3 bg-[var(--brand)] text-[var(--brand-foreground)] hover:bg-[var(--brand-hover)]"
          >
            Seleccionar
          </Button>
          <input
            id={id}
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={onChange}
          />
        </div>
        {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
      </div>
    );
  }

  return (
    <>
      <div className="surface rounded-3xl border p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-6 md:p-8">
        <div className="mb-6">
          <span className="badge">Formulario</span>
          <h2 className="mt-3 text-xl font-semibold md:text-2xl">
            {isPaciente ? "Completa tu registro" : "Registrate en DocYa Pro"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {isPaciente
              ? "Carga tus datos para crear tu cuenta."
              : "Completa tu informacion profesional y documentacion para habilitar tu cuenta."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:gap-6"
        >
          {!isPaciente && (
            <div>
              <Label>Tipo de profesional</Label>
              <div className="relative mt-1">
                <Stethoscope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                <select
                  className="h-11 w-full rounded-md border bg-background pl-9 pr-8 focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] md:h-12"
                  defaultValue=""
                  {...register("tipo" as any)}
                >
                  <option value="">Elegi una opcion</option>
                  <option value="medico">Medico</option>
                  <option value="enfermero">Enfermero</option>
                </select>
              </div>
              <Err msg={(errors as any)?.tipo?.message} />
            </div>
          )}

          <div>
            <Label>Nombre y apellido</Label>
            <div className="relative mt-1">
              <User2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
              <Input
                className="h-11 pl-9 md:h-12"
                placeholder="Ej: Ana Perez"
                {...register("nombreCompleto" as any)}
                autoComplete="name"
              />
            </div>
            <Err msg={(errors as any)?.nombreCompleto?.message} />
          </div>

          {!isPaciente && (
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <div>
                <Label>Tipo de documento</Label>
                <div className="relative mt-1">
                  <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <select
                    className="h-11 w-full rounded-md border bg-background pl-9 pr-8 focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] md:h-12"
                    defaultValue="dni"
                    {...register("tipoDocumento" as any)}
                  >
                    <option value="dni">DNI</option>
                    <option value="pasaporte">Pasaporte</option>
                  </select>
                </div>
                <Err msg={(errors as any)?.tipoDocumento?.message} />
              </div>

              <div>
                <Label>Numero de documento</Label>
                <div className="relative mt-1">
                  <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <Input
                    className="h-11 pl-9 md:h-12"
                    {...register("numeroDocumento" as any)}
                    inputMode="text"
                    autoComplete="off"
                  />
                </div>
                <Err msg={(errors as any)?.numeroDocumento?.message} />
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <div>
              <Label>Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                <Input
                  type="email"
                  className="h-11 pl-9 md:h-12"
                  {...register("email" as any)}
                  autoComplete="email"
                />
              </div>
              <Err msg={(errors as any)?.email?.message} />
            </div>

            <div>
              <Label>Telefono</Label>
              {isPaciente ? (
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <Input
                    className="h-11 pl-9 md:h-12"
                    {...register("telefono" as any)}
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+54 9 ..."
                  />
                </div>
              ) : (
                <div className="mt-1 flex overflow-hidden rounded-md border bg-background focus-within:border-[var(--brand)] focus-within:ring-2 focus-within:ring-[var(--brand)]">
                  <select
                    className="h-11 w-32 border-r bg-background px-2 text-sm outline-none md:h-12"
                    value={proCountry.code}
                    onChange={(e) => {
                      const next = PRO_COUNTRIES.find(
                        (country) => country.code === e.target.value,
                      );
                      if (next) setProCountry(next);
                    }}
                  >
                    {PRO_COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {flagEmoji(country.code)} +{country.phoneCode}
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                    <Input
                      className="h-11 border-0 pl-9 focus-visible:ring-0 md:h-12"
                      {...register("telefono" as any)}
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="1123456789"
                    />
                  </div>
                </div>
              )}
              <Err msg={(errors as any)?.telefono?.message} />
            </div>
          </div>

          {!isPaciente && (
            <>
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <div>
                  <Label>Matricula profesional</Label>
                  <div className="relative mt-1">
                    <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                    <Input
                      className="h-11 pl-9 md:h-12"
                      {...register("matricula" as any)}
                      autoComplete="off"
                    />
                  </div>
                  <Err msg={(errors as any)?.matricula?.message} />
                </div>

                <div>
                  <Label>Especialidad opcional</Label>
                  <div className="relative mt-1">
                    <Stethoscope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                    <Input
                      className="h-11 pl-9 md:h-12"
                      placeholder="Ej: Clinica, Pediatria, UTI"
                      {...register("especialidad" as any)}
                      autoComplete="off"
                    />
                  </div>
                  <Err msg={(errors as any)?.especialidad?.message} />
                </div>
              </div>

              <div>
                <Label>Direccion profesional</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <Input
                    className="h-11 pl-9 md:h-12"
                    placeholder="Ej: Av. Santa Fe 1234, piso 4, CABA"
                    {...register("direccion" as any)}
                    autoComplete="street-address"
                  />
                </div>
                <Err msg={(errors as any)?.direccion?.message} />
              </div>
            </>
          )}

          {isPaciente && (
            <>
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <div>
                  <Label>DNI</Label>
                  <div className="relative mt-1">
                    <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                    <Input
                      className="h-11 pl-9 md:h-12"
                      {...register("dni" as any)}
                      inputMode="numeric"
                      pattern="\d*"
                      placeholder="Solo numeros"
                      autoComplete="off"
                    />
                  </div>
                  <Err msg={(errors as any)?.dni?.message} />
                </div>

                <div>
                  <Label>Fecha de nacimiento</Label>
                  <Input
                    type="date"
                    className="mt-1 h-11 md:h-12"
                    {...register("fechaNacimiento" as any)}
                  />
                  <Err msg={(errors as any)?.fechaNacimiento?.message} />
                </div>
              </div>

              <div>
                <Label>Sexo</Label>
                <select
                  className="mt-1 h-11 w-full rounded-md border bg-background px-3 pr-8 focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] md:h-12"
                  defaultValue=""
                  {...register("sexo" as any)}
                >
                  <option value="">Elegi una opcion</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
                <Err msg={(errors as any)?.sexo?.message} />
              </div>

              <ZonaCobertura
                value={watch("zona" as any) as string}
                onChangeZona={(zonaStr) =>
                  setValue("zona" as any, zonaStr, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                error={(errors as any)?.zona?.message}
              />
            </>
          )}

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <div>
              <Label>Contrasena</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                <Input
                  type="password"
                  className="h-11 pl-9 md:h-12"
                  {...register("password" as any)}
                  autoComplete="new-password"
                />
              </div>
              <Err msg={(errors as any)?.password?.message} />
            </div>

            <div>
              <Label>Confirmar contrasena</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                <Input
                  type="password"
                  className="h-11 pl-9 md:h-12"
                  {...register("passwordConfirm" as any)}
                  autoComplete="new-password"
                />
              </div>
              <Err msg={(errors as any)?.passwordConfirm?.message} />
            </div>
          </div>

          {!isPaciente && (
            <div className="grid gap-4 sm:gap-5">
              <FileRow
                id="foto"
                label="Foto de perfil"
                icon={<ImageIcon className="h-4 w-4" />}
                onChange={onPickFile("foto")}
                fileName={foto?.name}
                error={(errors as any)?.foto?.message}
              />
              <FileRow
                id="dniFrente"
                label="DNI frente"
                icon={<IdCard className="h-4 w-4" />}
                onChange={onPickFile("dniFrente")}
                fileName={dniFrente?.name}
                error={(errors as any)?.dniFrente?.message}
              />
              <FileRow
                id="dniDorso"
                label="DNI dorso"
                icon={<IdCard className="h-4 w-4" />}
                onChange={onPickFile("dniDorso")}
                fileName={dniDorso?.name}
                error={(errors as any)?.dniDorso?.message}
              />
              <FileRow
                id="selfieDni"
                label="Selfie con documento"
                icon={<Camera className="h-4 w-4" />}
                onChange={onPickFile("selfieDni")}
                fileName={selfieDni?.name}
                error={(errors as any)?.selfieDni?.message}
              />
            </div>
          )}

          <div className="flex items-start gap-3">
            <input
              id="aceptaTerminos"
              type="checkbox"
              className="mt-1 h-4 w-4"
              {...register("aceptaTerminos" as any)}
            />
            <Label htmlFor="aceptaTerminos" className="text-sm text-muted-foreground">
              {isPaciente ? (
                <>
                  Acepto los{" "}
                  <Link href="/legal/pacientes/terminos" className="link-primary">
                    Terminos y Condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/legal/pacientes/privacidad" className="link-primary">
                    Politica de Privacidad
                  </Link>
                  .
                </>
              ) : (
                <>
                  Acepto los{" "}
                  <Link href="/legal/pro/terminos" className="link-primary">
                    terminos y condiciones
                  </Link>{" "}
                  de DocYa Pro.
                </>
              )}
            </Label>
          </div>
          <Err msg={(errors as any)?.aceptaTerminos?.message} />

          {isPaciente && (
            <div className="max-h-72 overflow-auto rounded-xl border p-4">
              <TermsPaciente />
            </div>
          )}

          <div className="pt-1 sm:pt-2">
            <Button
              type="submit"
              disabled={isSubmitting || loadingSplash}
              className="w-full cursor-pointer bg-[var(--brand)] text-[var(--brand-foreground)] hover:bg-[var(--brand-hover)] sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  Enviando
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  {isPaciente ? "Registrarme" : "Crear cuenta"}
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <LoadingSplash
        show={loadingSplash}
        message="Guardando tu registro..."
        autoHideMs={2000}
        onHide={() =>
          router.push(
            isPaciente
              ? "/gracias?celebra=1&aud=paciente"
              : "/gracias?celebra=1&aud=pro",
          )
        }
      />
    </>
  );
}
