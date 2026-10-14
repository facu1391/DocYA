export const professionalModalities = [
  { id: "teleconsulta-diurna", endpoint: "teleconsulta", turno: "diurna", label: "Teleconsulta" },
  { id: "medico-diurna", endpoint: "consulta-medico", turno: "diurna", label: "Médico a domicilio diurno" },
  { id: "medico-nocturna", endpoint: "consulta-medico", turno: "nocturna", label: "Médico a domicilio nocturno" },
  { id: "teleconsulta-nocturna", endpoint: "teleconsulta", turno: "nocturna", label: "Teleconsulta nocturna" },
] as const;
