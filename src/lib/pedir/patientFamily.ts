export type PatientFamilyMember = {
  id: number;
  full_name: string;
  document_type: string;
  document_number?: string | null;
  birth_date: string;
  sex: string;
  relationship: string;
  phone?: string | null;
  address?: string | null;
  address_lat?: number | null;
  address_lng?: number | null;
  address_province?: string | null;
  address_locality?: string | null;
  health_insurance?: string | null;
  member_number?: string | null;
};

export type PatientFamilyMemberInput = Omit<PatientFamilyMember, "id">;

export function familyMemberAge(birthDate: string): number {
  const [year, month, day] = birthDate.split("-").map(Number);
  const today = new Date();
  return today.getFullYear() - year - (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day) ? 1 : 0);
}

const API = process.env.NEXT_PUBLIC_API_BASE!;

function headers(token: string) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

async function parse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.detail || "No se pudo actualizar el grupo familiar");
  return data as T;
}

export async function getPatientFamily(token: string) {
  const response = await fetch(`${API}/patient-family`, { cache: "no-store", headers: headers(token) });
  const data = await parse<{ members: PatientFamilyMember[] }>(response);
  return data.members;
}

export async function createPatientFamilyMember(token: string, input: PatientFamilyMemberInput) {
  const response = await fetch(`${API}/patient-family`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify(input),
  });
  return parse<PatientFamilyMember>(response);
}
