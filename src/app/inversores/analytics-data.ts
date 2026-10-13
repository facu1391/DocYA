export type PatientDay = { fecha: string; nuevos: number };
export type MonthlyCount = { mes: string; total: number };

function argentinaMonth(now: Date) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "America/Argentina/Buenos_Aires", year: "numeric", month: "2-digit",
  }).formatToParts(now);
  return `${parts.find((part) => part.type === "year")?.value}-${parts.find((part) => part.type === "month")?.value}`;
}

export function closedMonths<T extends MonthlyCount>(rows: T[], now = new Date()): T[] {
  const current = argentinaMonth(now);
  return rows.filter((row) => row.mes < current).sort((a, b) => a.mes.localeCompare(b.mes));
}

export function patientMonths(days: PatientDay[], now = new Date()): MonthlyCount[] {
  if (!days.length) return [];
  const firstDate = days.reduce((first, day) => day.fecha < first ? day.fecha : first, days[0].fecha);
  const totals = new Map<string, number>();
  for (const day of days) {
    const month = day.fecha.slice(0, 7);
    // The daily endpoint is a rolling window: omit its first month if incomplete.
    if (month === firstDate.slice(0, 7) && !firstDate.endsWith("-01")) continue;
    totals.set(month, (totals.get(month) ?? 0) + day.nuevos);
  }
  return closedMonths(Array.from(totals, ([mes, total]) => ({ mes, total })), now).slice(-12);
}

export function isPatientGrowth(value: unknown): value is { data: PatientDay[] } {
  if (!value || typeof value !== "object") return false;
  const data = (value as Record<string, unknown>).data;
  return Array.isArray(data) && data.every((day: unknown) => {
    if (!day || typeof day !== "object") return false;
    const row = day as Record<string, unknown>;
    return typeof row.fecha === "string" && /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(row.fecha) &&
      typeof row.nuevos === "number" && Number.isInteger(row.nuevos) && row.nuevos >= 0;
  });
}
