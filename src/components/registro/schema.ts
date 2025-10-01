import { z } from "zod";

export const registroSchema = z.object({
  nombre: z.string().min(2, "Ingresá un nombre válido"),
  apellido: z.string().min(2, "Ingresá un apellido válido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(6, "Teléfono inválido"),
  rol: z.enum(["medico", "enfermero"], { message: "Elegí un rol" }),
  matricula: z.string().min(3, "Ingresá tu matrícula"),
  zona: z.string().min(2, "Ingresá una zona"),
  comentario: z.string().optional(),
});

export type RegistroFormValues = z.infer<typeof registroSchema>;
