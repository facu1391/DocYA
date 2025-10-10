import { z } from "zod";

// Reglas comunes para imágenes (5 MB, jpg/png/webp)
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const fileField = z
  .custom<File>((v) => v instanceof File, "Subí un archivo válido")
  .refine((f) => f.size <= 5 * 1024 * 1024, "El archivo no puede superar 5 MB")
  .refine((f) => ALLOWED.includes(f.type), "Formato permitido: JPG/PNG/WebP");

export const registroSchema = z
  .object({
    // Unificado
    nombreCompleto: z.string().min(3, "Ingresá tu nombre y apellido"),

    email: z.string().email("Email inválido"),
    telefono: z.string().min(6, "Teléfono inválido"),
    rol: z.enum(["medico", "enfermero"], { message: "Elegí un rol" }),

    // Nuevos
    especialidad: z.string().min(2, "Ingresá tu especialidad"),
    dni: z.string().regex(/^\d{7,9}$/, "DNI inválido (7 a 9 dígitos)"),

    // Existentes
    matricula: z.string().min(3, "Ingresá tu matrícula"),
    zona: z.string().min(2, "Ingresá una zona"),

    // Passwords
    password: z.string().min(8, "Mínimo 8 caracteres"),
    passwordConfirm: z.string().min(8, "Confirmá tu contraseña"),

    // Aceptación de T&C (obligatorio)
    aceptaTerminos: z.literal(true, { message: "Debés aceptar Términos y Privacidad" }),

    // Archivos requeridos
    foto: fileField,
    dniFrente: fileField,
    dniDorso: fileField,
    selfieDni: fileField,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Las contraseñas no coinciden",
  });

export type RegistroFormValues = z.infer<typeof registroSchema>;




