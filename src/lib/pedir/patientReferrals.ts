const API = process.env.NEXT_PUBLIC_API_BASE!;

export type ReferralReward = {
  id: number;
  cycle_number: number;
  status: string;
};

export type PatientReferralSummary = {
  code: string;
  link: string;
  qualified_referrals: number;
  pending_referrals: number;
  progress_in_cycle: number;
  referrals_per_reward: number;
  available_rewards_count: number;
  rewards: ReferralReward[];
};

export type SafeReferral = {
  id: number;
  display_name: string;
  registration_status: "registered";
  status: "pending_first_teleconsultation" | "qualified";
  registered_at: string;
  qualified_at?: string | null;
};

function auth(token?: string) {
  if (!token) throw new Error("Tu sesión venció. Volvé a iniciar sesión.");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export async function getPatientReferrals(token?: string): Promise<PatientReferralSummary> {
  const res = await fetch(`${API}/patient-referrals/me`, { headers: auth(token), cache: "no-store" });
  if (!res.ok) throw new Error("No pudimos consultar tus invitaciones.");
  return res.json();
}

export async function getSafeReferrals(token?: string): Promise<SafeReferral[]> {
  const res = await fetch(`${API}/patient-referrals/me/referrals`, { headers: auth(token), cache: "no-store" });
  if (!res.ok) throw new Error("No pudimos consultar el estado de tus amigos.");
  const data = await res.json();
  return data.referrals ?? [];
}

export async function reserveReferralReward(token: string | undefined, consultationId: number, idempotencyKey: string) {
  const res = await fetch(`${API}/patient-referrals/vouchers/reserve`, {
    method: "POST",
    headers: auth(token),
    body: JSON.stringify({ consultation_id: consultationId, idempotency_key: idempotencyKey }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "No pudimos reservar tu teleconsulta gratis.");
  }
  return res.json();
}

export function newReferralAttemptKey() {
  return globalThis.crypto?.randomUUID?.() ?? `referral-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
