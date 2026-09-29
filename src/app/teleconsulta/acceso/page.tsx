"use client";

import { useEffect, useState } from "react";
import { Video, ShieldCheck } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_URL || "";

export default function AccesoTeleconsultaPage() {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [data, setData] = useState<{ room_url: string; patient_name: string; doctor_name: string; role: string } | null>(null);
  const [message, setMessage] = useState("Estamos preparando tu acceso seguro.");

  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.slice(1)).get("token");
    if (!token || !API) { setState("error"); setMessage("Este acceso es inválido o venció."); return; }
    fetch(`${API}/teleconsultas/shared-access/exchange`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) })
      .then(async (res) => { const body = await res.json(); if (!res.ok) throw new Error(body.detail || "No pudimos validar el acceso"); setData(body); setState("ready"); })
      .catch((error: Error) => { setState("error"); setMessage(error.message); });
  }, []);

  return <main className="flex min-h-screen items-center justify-center bg-[#061b20] p-5 text-white"><section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b2a30] p-8 text-center shadow-2xl"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-300/15 text-teal-300"><Video size={28} /></span>{state === "loading" && <><h1 className="mt-6 text-2xl font-extrabold">Preparando la teleconsulta</h1><p className="mt-3 text-white/70">{message}</p></>}{state === "error" && <><h1 className="mt-6 text-2xl font-extrabold">No podemos abrir esta consulta</h1><p className="mt-3 text-white/70">{message}</p></>}{state === "ready" && data && <><h1 className="mt-6 text-2xl font-extrabold">Hola, {data.patient_name}</h1><p className="mt-3 text-white/70">{data.doctor_name} está listo para atenderte.</p>{data.role === "acompanante" && <p className="mt-3 rounded-xl bg-teal-300/10 p-3 text-sm text-teal-100">Ingresás como familiar acompañante.</p>}<a href={data.room_url} className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#20cbbc] px-5 py-4 font-bold text-[#042128]">Ingresar a videollamada <Video size={18} /></a><p className="mt-5 flex items-center justify-center gap-2 text-xs text-white/55"><ShieldCheck size={15} /> Acceso temporal para esta consulta</p></>}</section></main>;
}
