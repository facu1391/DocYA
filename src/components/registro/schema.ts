import { z } from "zod";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

const fileFieldOptional = z
  .custom<File | undefined>(
    (v) => v === undefined || v instanceof File,
    "Subi un archivo valido",
  )
  .refine((f) => !f || f.size <= 5 * 1024 * 1024, "El archivo no puede superar 5 MB")
  .refine((f) => !f || ALLOWED.includes(f.type), "Formato permitido: JPG/PNG/WebP");

const fileFieldRequired = z
  .custom<File>((v) => v instanceof File, "Subi un archivo valido")
  .refine((f) => f.size <= 5 * 1024 * 1024, "El archivo no puede superar 5 MB")
  .refine((f) => ALLOWED.includes(f.type), "Formato permitido: JPG/PNG/WebP");

export const registroSchema = z
  .object({
    nombreCompleto: z.string().min(3, "Ingresa tu nombre y apellido"),
    email: z.string().email("Email invalido"),
    telefono: z.string().regex(/^\d{6,14}$/, "Ingresa solo numeros, sin el codigo de pais"),
    tipo: z.string().regex(/^(medico|enfermero)$/, "Selecciona una opcion"),
    tipoDocumento: z.string().regex(/^(dni|pasaporte)$/, "Selecciona tipo de documento"),
    numeroDocumento: z.string().min(4, "Ingresa tu numero de documento"),
    matricula: z.string().min(3, "Ingresa tu matricula"),
    especialidad: z.string().optional(),
    direccion: z.string().min(5, "Ingresa tu direccion profesional"),
    password: z.string().min(6, "Minimo 6 caracteres"),
    passwordConfirm: z.string().min(6, "Confirma tu contrasena"),
    aceptaTerminos: z
      .boolean()
      .refine((v) => v === true, { message: "Debes aceptar Terminos y Privacidad" }),
    foto: fileFieldOptional.optional(),
    dniFrente: fileFieldRequired,
    dniDorso: fileFieldRequired,
    selfieDni: fileFieldRequired,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Las contrasenas no coinciden",
  });

export type RegistroFormValues = z.infer<typeof registroSchema>;

export const registroPacienteSchema = z
  .object({
    nombreCompleto: z.string().min(3, "Ingresa tu nombre y apellido"),
    email: z.string().email("Email invalido"),
    telefono: z.string().min(6, "Telefono invalido"),
    dni: z.string().regex(/^\d{7,9}$/, "DNI invalido (7 a 9 digitos)"),
    fechaNacimiento: z.string().min(1, "Ingresa tu fecha de nacimiento"),
    sexo: z.string().regex(/^(masculino|femenino|otro)$/, "Selecciona tu sexo"),
    zona: z.string().min(2, "Ingresa una zona"),
    password: z.string().min(8, "Minimo 8 caracteres"),
    passwordConfirm: z.string().min(8, "Confirma tu contrasena"),
    aceptaTerminos: z
      .boolean()
      .refine((v) => v === true, { message: "Debes aceptar Terminos y Privacidad" }),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Las contrasenas no coinciden",
  });

export type RegistroPacienteValues = z.infer<typeof registroPacienteSchema>;
