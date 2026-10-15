export const investorSimulation = {
  minDaily: 50,
  maxDaily: 1000,
  step: 50,
  initialDaily: 300,
  days: 30,
  commission: 0.2,
  professionalShare: 0.8,
  modalities: [
    { id: "teleconsulta", es: "Teleconsulta", en: "Video consultation", rate: 21000 },
    { id: "domicilio-dia", es: "Domicilio diurno", en: "Daytime home visit", rate: 42000 },
    { id: "domicilio-noche", es: "Domicilio nocturno", en: "Nighttime home visit", rate: 58000 },
  ],
} as const;

export function calculateInvestorScenario(daily: number, rate: number) {
  const monthly = daily * investorSimulation.days;
  const gmv = monthly * rate;
  return {
    monthly,
    gmv,
    commission: gmv * investorSimulation.commission,
    professionalFees: gmv * investorSimulation.professionalShare,
  };
}
