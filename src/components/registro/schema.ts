import { z } from "zod";

// Hacemos opcionales los archivos por ahora
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const fileFieldOptional = z
  .custom<File | undefined>((v) => v === undefined || v instanceof File, "Subí un archivo válido")
  .refine((f) => !f || f.size <= 5 * 1024 * 1024, "El archivo no puede superar 5 MB")
  .refine((f) => !f || ALLOWED.includes(f.type), "Formato permitido: JPG/PNG/WebP");

export const registroSchema = z
  .object({
    nombreCompleto: z.string().min(3, "Ingresá tu nombre y apellido"),

    email: z.string().email("Email inválido"),
    telefono: z.string().min(6, "Teléfono inválido"),
    rol: z.enum(["medico", "enfermero"]),

    especialidad: z.string().min(2, "Ingresá tu especialidad"),
    dni: z.string().regex(/^\d{7,9}$/, "DNI inválido (7 a 9 dígitos)"),

    matricula: z.string().min(3, "Ingresá tu matrícula"),
    zona: z.string().min(2, "Ingresá una zona"),

    password: z.string().min(8, "Mínimo 8 caracteres"),
    passwordConfirm: z.string().min(8, "Confirmá tu contraseña"),

    aceptaTerminos: z
      .boolean()
      .refine((v) => v === true, { message: "Debés aceptar Términos y Privacidad" }),

    // Archivos (opcionales por ahora)
    foto: fileFieldOptional.optional(),
    dniFrente: fileFieldOptional.optional(),
    dniDorso: fileFieldOptional.optional(),
    selfieDni: fileFieldOptional.optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Las contraseñas no coinciden",
  });

export type RegistroFormValues = z.infer<typeof registroSchema>;





