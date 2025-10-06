
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registroSchema, type RegistroFormValues } from "./schema";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  User2, Mail, Phone, Stethoscope, IdCard, MapPin,
  MessageSquareText, Send, Loader2, Image as ImageIcon, IdCard as IdIcon, Camera,
} from "lucide-react";
import { useRef } from "react";

export default function RegistroForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RegistroFormValues>({
    resolver: zodResolver(registroSchema),
  });

  // Para mostrar el nombre del archivo elegido
  const foto = watch("foto");
  const dniFrente = watch("dniFrente");
  const dniDorso = watch("dniDorso");
  const selfieDni = watch("selfieDni");

  // helper para setear un File (RHForm en <input type="file"> entrega FileList)
  const onPickFile =
    (field: keyof RegistroFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) setValue(field, f, { shouldValidate: true });
    };

  async function onSubmit(data: RegistroFormValues) {
    try {
      // Enviamos MULTIPART (con archivos)
      const fd = new FormData();
      // Campos de texto
      fd.append("nombre", data.nombre);
      fd.append("apellido", data.apellido);
      fd.append("email", data.email);
      fd.append("telefono", data.telefono);
      fd.append("rol", data.rol);
      fd.append("matricula", data.matricula);
      fd.append("zona", data.zona);
      if (data.comentario) fd.append("comentario", data.comentario);

      // Archivos
      fd.append("foto", data.foto);
      fd.append("dniFrente", data.dniFrente);
      fd.append("dniDorso", data.dniDorso);
      fd.append("selfieDni", data.selfieDni);

      const res = await fetch("/api/registro", {
        method: "POST",
        body: fd, // ¡no pongas Content-Type a mano!
      });
      if (!res.ok) throw new Error("Error al enviar");
      toast.success("Registro enviado ✅");
      router.push("/gracias");
    } catch {
      toast.error("No se pudo enviar. Probá de nuevo.");
    }
  }

  const Err = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;

  // Componente para la fila de archivo (estilo del mock)
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

        <div
          className="
            flex items-center gap-2 rounded-md border bg-background px-3 py-2
            focus-within:ring-2 focus-within:ring-[var(--brand)] focus-within:border-[var(--brand)]
          "
        >
          <span className="inline-flex items-center justify-center rounded-md h-8 w-8 border
                           text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                           bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]">
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:gap-6 motion-safe:animate-in motion-safe:fade-in-50"
    >
      {/* fila 1 */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <div>
          <Label>Nombre</Label>
          <div className="relative mt-1">
            <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
            <Input className="pl-9 h-11 md:h-12" {...register("nombre")} autoComplete="given-name" />
          </div>
          <Err msg={errors.nombre?.message} />
        </div>

        <div>
          <Label>Apellido</Label>
          <div className="relative mt-1">
            <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
            <Input className="pl-9 h-11 md:h-12" {...register("apellido")} autoComplete="family-name" />
          </div>
          <Err msg={errors.apellido?.message} />
        </div>
      </div>

      {/* fila 2 */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <div>
          <Label>Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
            <Input type="email" className="pl-9 h-11 md:h-12" {...register("email")} autoComplete="email" />
          </div>
          <Err msg={errors.email?.message} />
        </div>

        <div>
          <Label>Teléfono</Label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
            <Input className="pl-9 h-11 md:h-12" {...register("telefono")} inputMode="tel" autoComplete="tel" />
          </div>
          <Err msg={errors.telefono?.message} />
        </div>
      </div>

      {/* fila 3 */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <div>
          <Label>Rol</Label>
          <div className="relative mt-1">
            <Stethoscope className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
            <select
              className="w-full h-11 md:h-12 rounded-md border pl-9 pr-8 bg-background
                         focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)]"
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
          <Label>Matrícula</Label>
          <div className="relative mt-1">
            <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
            <Input className="pl-9 h-11 md:h-12" {...register("matricula")} autoComplete="off" />
          </div>
          <Err msg={errors.matricula?.message} />
        </div>
      </div>

      {/* fila 4 */}
      <div>
        <Label>Zona preferida</Label>
        <div className="relative mt-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
          <Input placeholder="Ej: Palermo / Belgrano" className="pl-9 h-11 md:h-12" {...register("zona")} />
        </div>
        <Err msg={errors.zona?.message} />
      </div>

      {/* fila 5 (comentario) */}
      <div>
        <Label>Comentario (opcional)</Label>
        <div className="relative mt-1">
          <MessageSquareText className="absolute left-3 top-3 h-4 w-4 text-[var(--brand)]" />
          <Textarea rows={4} className="pl-9" {...register("comentario")} />
        </div>
      </div>

      {/* ======= ARCHIVOS ======= */}
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

      {/* Disclaimer legal */}
      <p className="text-xs sm:text-[13px] text-muted-foreground">
        Al enviar aceptás los{" "}
        <Link href="/legal/terminos" className="link-primary">Términos</Link>{" "}
        y la{" "}
        <Link href="/legal/privacidad" className="link-primary">Política de Privacidad</Link>{" "}
        de DocYa Pro.
      </p>

      <div className="pt-1 sm:pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
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
  );
}
