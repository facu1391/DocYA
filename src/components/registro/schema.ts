
import { z } from "zod";

// Reglas comunes para imágenes (5 MB, jpg/png/webp)
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const fileField = z
  .custom<File>((v) => v instanceof File, "Subí un archivo válido")
  .refine((f) => f.size <= 5 * 1024 * 1024, "El archivo no puede superar 5 MB")
  .refine((f) => ALLOWED.includes(f.type), "Formato permitido: JPG/PNG/WebP");

// Si querés alguno opcional, usá fileField.optional()
export const registroSchema = z.object({
  nombre: z.string().min(2, "Ingresá un nombre válido"),
  apellido: z.string().min(2, "Ingresá un apellido válido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(6, "Teléfono inválido"),
  rol: z.enum(["medico", "enfermero"], { message: "Elegí un rol" }),
  matricula: z.string().min(3, "Ingresá tu matrícula"),
  zona: z.string().min(2, "Ingresá una zona"),
  comentario: z.string().optional(),

  // 👇 NUEVOS CAMPOS (requeridos; hacelos .optional() si preferís)
  foto: fileField,
  dniFrente: fileField,
  dniDorso: fileField,
  selfieDni: fileField,
});

export type RegistroFormValues = z.infer<typeof registroSchema>;

