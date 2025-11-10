"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registroSchema,
  registroPacienteSchema,
  type RegistroFormValues,
  type RegistroPacienteValues,
} from "./schema";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  User2, Mail, Phone, Stethoscope, IdCard, Send, Loader2,
  Image as ImageIcon, IdCard as IdIcon, Camera, Lock,
} from "lucide-react";
import LoadingSplash from "@/components/common/LoadingSplash";
import ZonaCobertura from "@/components/registro/ZonaCobertura";
import TermsPaciente from "./TermsPaciente";

type Mode = "pro" | "paciente";

type Props = {
  mode?: Mode; // default "pro"
};

export default function RegistroForm({ mode = "pro" }: Props) {
  const router = useRouter();
  const [loadingSplash, setLoadingSplash] = useState(false);

  const isPaciente = mode === "paciente";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RegistroFormValues | RegistroPacienteValues>({
    resolver: zodResolver(isPaciente ? registroPacienteSchema : registroSchema),
  });

  // files (para mostrar nombre) — solo relevantes para "pro"
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
      // zona -> provincia / localidad
      const rawZona = (raw.zona || "").trim();
      const [p1 = "", p2 = ""] = rawZona.split("/").map((s: string) => s.trim());
      let provincia = "", localidad = "";
      if (p1 && p2) {
        provincia = p1; localidad = p2;
      } else {
        localidad = rawZona;
      }

      if (!isPaciente) {
        // ====== PROFESIONAL (igual que tu flujo, con imágenes) ======
        const [fotoPerfil64, dniFrente64, dniDorso64, selfieDni64] = await Promise.all([
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
          especialidad: raw.especialidad?.trim(),
          tipo: raw.tipo, // "medico" | "enfermero"
          telefono: raw.telefono?.trim(),
          provincia,
          localidad,
          dni: raw.dni?.trim(),
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
          toast.error(js?.detail || "No se pudo enviar. Probá de nuevo.");
          return;
        }
      } else {
        // ====== PACIENTE (sin imágenes) → proxy /api/register_paciente
        const payloadPaciente = {
          email: String(raw.email).toLowerCase().trim(),
          full_name: raw.nombreCompleto.trim(),
          password: raw.password,
          dni: raw.dni?.trim(),
          telefono: raw.telefono?.trim(),
          pais: "Argentina",
          provincia,
          localidad,
          // ⬇️ ahora se envía al backend
          fecha_nacimiento: raw.fechaNacimiento || null, // "YYYY-MM-DD"
          acepto_condiciones: true,
        };

        const res = await fetch("/api/register_paciente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadPaciente),
        });

        if (!res.ok) {
          const js = await res.json().catch(() => ({}));
          toast.error(js?.detail || "No se pudo enviar. Probá de nuevo.");
          return;
        }
      }

      toast.success("Registro exitoso ✅. Revisá tu correo para activar tu cuenta.");
      setLoadingSplash(true);

      // ⬇️ Redirección diferenciada por audiencia
      const timer = setTimeout(() => {
        if (isPaciente) {
          router.push("/gracias?celebra=1&aud=paciente");
        } else {
          router.push("/gracias?celebra=1&aud=pro");
        }
      }, 2000);
      return () => clearTimeout(timer);
    } catch {
      toast.error("Error de red. Probá de nuevo.");
      setLoadingSplash(false);
    }
  }

  const Err = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;

  function FileRow({
    id, label, icon, accept = "image/*", onChange, fileName, error,
  }: {
    id: string; label: string; icon: React.ReactNode; accept?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileName?: string; error?: string;
  }) {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <div>
        <Label htmlFor={id} className="mb-1 block">{label}</Label>
        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-[var(--brand)] focus-within:border-[var(--brand)]">
          <span className="inline-flex items-center justify-center rounded-md h-8 w-8 border text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]">
            {icon}
          </span>
          <span className="flex-1 truncate text-sm text-muted-foreground">
            {fileName || "Ningún archivo seleccionado"}
          </span>
          <Button type="button" onClick={() => inputRef.current?.click()} className="h-9 px-3 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[var(--brand-foreground)]">
            Seleccionar
          </Button>
          <input id={id} ref={inputRef} type="file" accept={accept} className="hidden" onChange={onChange} />
        </div>
        {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:gap-6">
        {/* Nombre */}
        <div>
          <Label>Nombre y apellido</Label>
          <div className="relative mt-1">
            <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
            <Input className="pl-9 h-11 md:h-12" placeholder="Ej: Ana Pérez" {...register("nombreCompleto" as any)} autoComplete="name" />
          </div>
          <Err msg={(errors as any)?.nombreCompleto?.message} />
        </div>

        {/* Email / Teléfono */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <div>
            <Label>Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input type="email" className="pl-9 h-11 md:h-12" {...register("email" as any)} autoComplete="email" />
            </div>
            <Err msg={(errors as any)?.email?.message} />
          </div>

          <div>
            <Label>Teléfono</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input className="pl-9 h-11 md:h-12" {...register("telefono" as any)} inputMode="tel" autoComplete="tel" placeholder="+54 9 …" />
            </div>
            <Err msg={(errors as any)?.telefono?.message} />
          </div>
        </div>

        {/* SOLO PROFESIONAL: Tipo / Especialidad */}
        {!isPaciente && (
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <div>
              <Label>Tipo de profesional</Label>
              <div className="relative mt-1">
                <Stethoscope className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
                <select
                  className="w-full h-11 md:h-12 rounded-md border pl-9 pr-8 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)]"
                  defaultValue=""
                  {...register("tipo" as any)}
                >
                  <option value="">Elegí una opción</option>
                  <option value="medico">Médico/a</option>
                  <option value="enfermero">Enfermero/a</option>
                </select>
              </div>
              <Err msg={(errors as any)?.tipo?.message} />
            </div>

            <div>
              <Label>Especialidad</Label>
              <div className="relative mt-1">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
                <Input className="pl-9 h-11 md:h-12" placeholder="Ej: Clínica, Pediatría, UTI…" {...register("especialidad" as any)} autoComplete="off" />
              </div>
              <Err msg={(errors as any)?.especialidad?.message} />
            </div>
          </div>
        )}

        {/* Matrícula / DNI (+ Fecha de nacimiento para paciente) */}
        <div className={`grid gap-4 sm:gap-5 ${!isPaciente ? "md:grid-cols-2" : ""}`}>
          {!isPaciente && (
            <div>
              <Label>Matrícula</Label>
              <div className="relative mt-1">
                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
                <Input className="pl-9 h-11 md:h-12" {...register("matricula" as any)} autoComplete="off" />
              </div>
              <Err msg={(errors as any)?.matricula?.message} />
            </div>
          )}

          <div>
            <Label>DNI</Label>
            <div className="relative mt-1">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input
                className="pl-9 h-11 md:h-12"
                {...register("dni" as any)}
                inputMode="numeric"
                pattern="\d*"
                placeholder="Solo números"
                autoComplete="off"
              />
            </div>
            <Err msg={(errors as any)?.dni?.message} />
          </div>

          {/* Campo nuevo: solo paciente */}
          {isPaciente && (
            <div>
              <Label>Fecha de nacimiento</Label>
              <div className="relative mt-1">
                <Input
                  type="date"
                  className="h-11 md:h-12"
                  {...register("fechaNacimiento" as any)}
                />
              </div>
              <Err msg={(errors as any)?.fechaNacimiento?.message} />
            </div>
          )}
        </div>

        {/* Zona */}
        <ZonaCobertura
          value={watch("zona" as any) as string}
          onChangeZona={(zonaStr) => setValue("zona" as any, zonaStr, { shouldValidate: true, shouldDirty: true })}
          error={(errors as any)?.zona?.message}
        />

        {/* Passwords */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <div>
            <Label>Contraseña</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input type="password" className="pl-9 h-11 md:h-12" {...register("password" as any)} autoComplete="new-password" />
            </div>
            <Err msg={(errors as any)?.password?.message} />
          </div>

          <div>
            <Label>Confirmar contraseña</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input type="password" className="pl-9 h-11 md:h-12" {...register("passwordConfirm" as any)} autoComplete="new-password" />
            </div>
            <Err msg={(errors as any)?.passwordConfirm?.message} />
          </div>
        </div>

        {/* UPLOADS: solo pro */}
        {!isPaciente && (
          <div className="grid gap-4 sm:gap-5">
            <FileRow id="foto" label="Foto de perfil" icon={<ImageIcon className="h-4 w-4" />} onChange={onPickFile("foto")} fileName={foto?.name} error={(errors as any)?.foto?.message} />
            <FileRow id="dniFrente" label="DNI Frente" icon={<IdIcon className="h-4 w-4" />} onChange={onPickFile("dniFrente")} fileName={dniFrente?.name} error={(errors as any)?.dniFrente?.message} />
            <FileRow id="dniDorso" label="DNI Dorso" icon={<IdIcon className="h-4 w-4" />} onChange={onPickFile("dniDorso")} fileName={dniDorso?.name} error={(errors as any)?.dniDorso?.message} />
            <FileRow id="selfieDni" label="Selfie con DNI" icon={<Camera className="h-4 w-4" />} onChange={onPickFile("selfieDni")} fileName={selfieDni?.name} error={(errors as any)?.selfieDni?.message} />
          </div>
        )}

        {/* Términos */}
        <div className="flex items-start gap-3">
          <input id="aceptaTerminos" type="checkbox" className="mt-1 h-4 w-4" {...register("aceptaTerminos" as any)} />
          <Label htmlFor="aceptaTerminos" className="text-sm text-muted-foreground">
            {isPaciente ? (
              <>
                Acepto los{" "}
                <Link href="/legal/pacientes/terminos" className="link-primary">Términos y Condiciones</Link> y la{" "}
                <Link href="/legal/pacientes/privacidad" className="link-primary">Política de Privacidad</Link>.
              </>
            ) : (
              <>
                Acepto los{" "}
                <Link href="/legal/pro/terminos" className="link-primary">Términos y Condiciones</Link> y la{" "}
                <Link href="/legal/pro/privacidad" className="link-primary">Política de Privacidad</Link> de DocYa Pro.
              </>
            )}
          </Label>
        </div>
        <Err msg={(errors as any)?.aceptaTerminos?.message} />

        {/* TyC embed para paciente */}
        {isPaciente && (
          <div className="rounded-lg border p-4 max-h-72 overflow-auto">
            <TermsPaciente />
          </div>
        )}

        <div className="pt-1 sm:pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || loadingSplash}
            className="w-full sm:w-auto bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[var(--brand-foreground)] cursor-pointer"
          >
            {isSubmitting ? (
              <>Enviando<Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
            ) : (
              <>Registrarme<Send className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </form>

      <LoadingSplash
        show={loadingSplash}
        message="Guardando tu registro…"
        autoHideMs={2000}
        onHide={() =>
          router.push(
            isPaciente
              ? "/gracias?celebra=1&aud=paciente"
              : "/gracias?celebra=1&aud=pro"
          )
        }
      />
    </>
  );
}
