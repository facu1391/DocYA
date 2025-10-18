"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registroSchema, type RegistroFormValues } from "./schema";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  User2,
  Mail,
  Phone,
  Stethoscope,
  IdCard,
  Send,
  Loader2,
  Image as ImageIcon,
  IdCard as IdIcon,
  Camera,
  Lock,
} from "lucide-react";
import LoadingSplash from "@/components/common/LoadingSplash";
import ZonaCobertura from "@/components/registro/ZonaCobertura";

export default function RegistroForm() {
  const router = useRouter();
  const [loadingSplash, setLoadingSplash] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RegistroFormValues>({
    resolver: zodResolver(registroSchema),
  });

  // (Seguimos mostrando nombres de archivo aunque no se envíen)
  const foto = watch("foto");
  const dniFrente = watch("dniFrente");
  const dniDorso = watch("dniDorso");
  const selfieDni = watch("selfieDni");

  const onPickFile =
    (field: keyof RegistroFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) setValue(field, f, { shouldValidate: true });
    };

  async function onSubmit(data: RegistroFormValues) {
    try {
      // Mapear zona -> provincia/localidad (heurística simple para payload)
      const rawZona = (data.zona || "").trim();
      const [p1 = "", p2 = ""] = rawZona.split("/").map((s) => s.trim());
      let provincia = "";
      let localidad = "";
      if (p1 && p2) {
        const isProv = (s: string) =>
          /caba|bs\.?as|buenos\s*aires|provincia/i.test(s);
        if (isProv(p1)) {
          provincia = p1;
          localidad = p2;
        } else if (isProv(p2)) {
          provincia = p2;
          localidad = p1;
        } else {
          localidad = p1;
          provincia = p2;
        }
      } else {
        localidad = rawZona;
        provincia = "";
      }

      // Payload en JSON EXACTO como probaste en Postman
      const payload = {
        full_name: data.nombreCompleto.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password,
        matricula: data.matricula.trim(),
        especialidad: data.especialidad.trim(),
        tipo: data.rol,
        telefono: data.telefono.trim(),
        provincia,
        localidad,
        dni: data.dni.trim(),
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let detail = "No se pudo enviar. Probá de nuevo.";
        try {
          const js = await res.json();
          if (js?.detail) detail = js.detail;
        } catch {
          // ignore
        }
        if (res.status === 409) {
          toast.error(detail || "Email o matrícula ya registrados.");
        } else {
          toast.error(detail);
        }
        return;
      }

      const payloadResp = await res.json().catch(() => null);
      toast.success(
        payloadResp?.mensaje ??
          "Registro exitoso ✅. Revisá tu correo para activar tu cuenta."
      );

      // Splash de marca y luego /gracias con confetti
      setLoadingSplash(true);
      // fallback por si el usuario cambia de pestaña
      const timer = setTimeout(() => router.push("/gracias?celebra=1"), 2000);
      return () => clearTimeout(timer);
    } catch {
      toast.error("Error de red. Probá de nuevo.");
      setLoadingSplash(false);
    }
  }

  const Err = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;

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

        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-[var(--brand)] focus-within:border-[var(--brand)]">
          <span className="inline-flex items-center justify-center rounded-md h-8 w-8 border text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]">
            {icon}
          </span>

          <span className="flex-1 truncate text-sm text-muted-foreground">
            {fileName || "Ningún archivo seleccionado"}
          </span>

          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="h-9 px-3 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[var(--brand-foreground)]"
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

        {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:gap-6"
      >
        {/* Nombre completo */}
        <div>
          <Label>Nombre y apellido</Label>
          <div className="relative mt-1">
            <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
            <Input
              className="pl-9 h-11 md:h-12"
              placeholder="Ej: Ana Pérez"
              {...register("nombreCompleto")}
              autoComplete="name"
            />
          </div>
          <Err msg={errors.nombreCompleto?.message} />
        </div>

        {/* Email / Teléfono */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <div>
            <Label>Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input
                type="email"
                className="pl-9 h-11 md:h-12"
                {...register("email")}
                autoComplete="email"
              />
            </div>
            <Err msg={errors.email?.message} />
          </div>

          <div>
            <Label>Teléfono</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input
                className="pl-9 h-11 md:h-12"
                {...register("telefono")}
                inputMode="tel"
                autoComplete="tel"
                placeholder="+54 9 …"
              />
            </div>
            <Err msg={errors.telefono?.message} />
          </div>
        </div>

        {/* Rol / Especialidad */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <div>
            <Label>Rol</Label>
            <div className="relative mt-1">
              <Stethoscope className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <select
                className="w-full h-11 md:h-12 rounded-md border pl-9 pr-8 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)]"
                defaultValue=""
                {...register("rol")}
                aria-invalid={!!errors.rol}
              >
                <option value="">Elegí una opción</option>
                <option value="medico">Médico/a</option>
                <option value="enfermero">Enfermero/a</option>
              </select>
            </div>
            <Err msg={errors.rol?.message} />
          </div>

          <div>
            <Label>Especialidad</Label>
            <div className="relative mt-1">
              <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input
                className="pl-9 h-11 md:h-12"
                placeholder="Ej: Clínica, Pediatría, UTI…"
                {...register("especialidad")}
                autoComplete="off"
              />
            </div>
            <Err msg={errors.especialidad?.message} />
          </div>
        </div>

        {/* Matrícula / DNI */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <div>
            <Label>Matrícula</Label>
            <div className="relative mt-1">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input
                className="pl-9 h-11 md:h-12"
                {...register("matricula")}
                autoComplete="off"
              />
            </div>
            <Err msg={errors.matricula?.message} />
          </div>

          <div>
            <Label>DNI</Label>
            <div className="relative mt-1">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input
                className="pl-9 h-11 md:h-12"
                {...register("dni")}
                inputMode="numeric"
                pattern="\d*"
                placeholder="Solo números"
                autoComplete="off"
              />
            </div>
            <Err msg={errors.dni?.message} />
          </div>
        </div>

        {/* Zona (con selector inteligente → setea `zona` internamente) */}
        <ZonaCobertura
          value={watch("zona")}
          onChangeZona={(zonaStr) => {
            setValue("zona", zonaStr, { shouldValidate: true, shouldDirty: true });
          }}
          error={errors.zona?.message}
        />

        {/* Contraseñas */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <div>
            <Label>Contraseña</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input
                type="password"
                className="pl-9 h-11 md:h-12"
                {...register("password")}
                autoComplete="new-password"
              />
            </div>
            <Err msg={errors.password?.message} />
          </div>

          <div>
            <Label>Confirmar contraseña</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
              <Input
                type="password"
                className="pl-9 h-11 md:h-12"
                {...register("passwordConfirm")}
                autoComplete="new-password"
              />
            </div>
            <Err msg={errors.passwordConfirm?.message} />
          </div>
        </div>

        {/* Archivos (UI visible pero NO se envían aún) */}
        <div className="grid gap-4 sm:gap-5">
          <FileRow
            id="foto"
            label="Foto de perfil"
            icon={<ImageIcon className="h-4 w-4" />}
            onChange={onPickFile("foto")}
            fileName={foto?.name}
            error={errors.foto?.message}
          />
          <FileRow
            id="dniFrente"
            label="DNI Frente"
            icon={<IdIcon className="h-4 w-4" />}
            onChange={onPickFile("dniFrente")}
            fileName={dniFrente?.name}
            error={errors.dniFrente?.message}
          />
          <FileRow
            id="dniDorso"
            label="DNI Dorso"
            icon={<IdIcon className="h-4 w-4" />}
            onChange={onPickFile("dniDorso")}
            fileName={dniDorso?.name}
            error={errors.dniDorso?.message}
          />
          <FileRow
            id="selfieDni"
            label="Selfie con DNI"
            icon={<Camera className="h-4 w-4" />}
            onChange={onPickFile("selfieDni")}
            fileName={selfieDni?.name}
            error={errors.selfieDni?.message}
          />
        </div>

        {/* Aceptación de términos */}
        <div className="flex items-start gap-3">
          <input
            id="aceptaTerminos"
            type="checkbox"
            className="mt-1 h-4 w-4"
            {...register("aceptaTerminos")}
          />
          <Label htmlFor="aceptaTerminos" className="text-sm text-muted-foreground">
            Acepto los{" "}
            <Link href="/legal/pro/terminos" className="link-primary">
              Términos y Condiciones
            </Link>{" "}
            y la{" "}
            <Link href="/legal/pro/privacidad" className="link-primary">
              Política de Privacidad
            </Link>{" "}
            de DocYa Pro.
          </Label>
        </div>
        <Err msg={errors.aceptaTerminos?.message as string | undefined} />

        <div className="pt-1 sm:pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || loadingSplash}
            className="w-full sm:w-auto bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[var(--brand-foreground)]"
          >
            {isSubmitting ? (
              <>
                Enviando
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Registrarme
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Splash con logo DocYa */}
      <LoadingSplash
        show={loadingSplash}
        message="Guardando tu registro…"
        autoHideMs={2000}
        onHide={() => router.push("/gracias?celebra=1")}
      />
    </>
  );
}
