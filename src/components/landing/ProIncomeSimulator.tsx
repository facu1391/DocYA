"use client";

import { useEffect, useMemo, useState } from "react";
import { HeartPulse, Minus, Plus, SlidersHorizontal, Stethoscope, Wallet } from "lucide-react";

type ProType = "medico" | "enfermero";

type TarifaState = {
  gross: number;
  net: number;
  fromBackend: boolean;
};

const API =
  process.env.NEXT_PUBLIC_API_BASE ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://docya-railway-production.up.railway.app";

const ENDPOINTS: Record<ProType, string> = {
  medico: "consulta-medico",
  enfermero: "consulta-enfermero",
};

const FALLBACK_TARIFAS: Record<ProType, TarifaState> = {
  medico: { gross: 30000, net: 24000, fromBackend: false },
  enfermero: { gross: 20000, net: 16000, fromBackend: false },
};

function parseMoney(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

function extractTarifa(data: Record<string, unknown>, fallback: TarifaState): TarifaState {
  const gross =
    parseMoney(data.monto) ||
    parseMoney(data.precio) ||
    parseMoney(data.total) ||
    fallback.gross;

  const explicitNet =
    parseMoney(data.monto_profesional) ||
    parseMoney(data.neto_profesional) ||
    parseMoney(data.monto_neto_profesional) ||
    parseMoney(data.profesional_monto) ||
    parseMoney(data.monto_neto);

  return {
    gross,
    net: explicitNet || Math.round(gross * 0.8),
    fromBackend: true,
  };
}

function formatPesos(value: number) {
  return `$${value.toLocaleString("es-AR")}`;
}

export default function ProIncomeSimulator() {
  const [type, setType] = useState<ProType>("medico");
  const [consultasDia, setConsultasDia] = useState(4);
  const [diasSemana, setDiasSemana] = useState(5);
  const [tarifas, setTarifas] = useState<Record<ProType, TarifaState>>(FALLBACK_TARIFAS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    Promise.all(
      (Object.entries(ENDPOINTS) as [ProType, string][]).map(async ([key, endpoint]) => {
        try {
          const res = await fetch(`${API.replace(/\/$/, "")}/tarifas/${endpoint}`, { cache: "no-store" });
          if (!res.ok) throw new Error("No tariff");
          const data = await res.json();
          return [key, extractTarifa(data, FALLBACK_TARIFAS[key])] as const;
        } catch {
          return [key, FALLBACK_TARIFAS[key]] as const;
        }
      })
    ).then((items) => {
      if (!alive) return;
      setTarifas(Object.fromEntries(items) as Record<ProType, TarifaState>);
      setLoading(false);
    });

    return () => {
      alive = false;
    };
  }, []);

  const activeTarifa = tarifas[type];
  const result = useMemo(() => {
    const daily = activeTarifa.net * consultasDia;
    const weekly = daily * diasSemana;
    const monthly = weekly * 4;

    return { daily, weekly, monthly };
  }, [activeTarifa.net, consultasDia, diasSemana]);

  const typeConfig = {
    medico: {
      label: "Médico",
      icon: Stethoscope,
      accent: "from-[#4fdbc8] to-[#14b8a6]",
      glow: "shadow-[0_16px_40px_rgba(20,184,166,0.22)]",
    },
    enfermero: {
      label: "Enfermero",
      icon: HeartPulse,
      accent: "from-[#f472b6] to-[#ec4899]",
      glow: "shadow-[0_16px_40px_rgba(236,72,153,0.22)]",
    },
  } as const;

  const ActiveIcon = typeConfig[type].icon;

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.20)] backdrop-blur-xl md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-xl font-bold text-[#4fdbc8]">
          <SlidersHorizontal className="h-5 w-5" /> Simulá tus ingresos
        </h3>
        <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold text-[#bbcac6]">
          {loading ? "Consultando tarifas" : activeTarifa.fromBackend ? "Tarifa actual" : "Estimación"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(typeConfig) as ProType[]).map((key) => {
          const Icon = typeConfig[key].icon;
          const active = key === type;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setType(key)}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-extrabold transition ${
                active
                  ? `border-transparent bg-gradient-to-r ${typeConfig[key].accent} text-[#04151c] ${typeConfig[key].glow}`
                  : "border-white/10 bg-black/20 text-[#d3e5ef] hover:border-[#14b8a6]/40"
              }`}
            >
              <Icon className="h-5 w-5" />
              {typeConfig[key].label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4">
        <Control
          label="Consultas por día"
          value={consultasDia}
          min={1}
          max={12}
          onChange={setConsultasDia}
        />
        <Control
          label="Días por semana"
          value={diasSemana}
          min={1}
          max={7}
          onChange={setDiasSemana}
        />
      </div>

      <div className="mt-6 rounded-3xl border border-[#14b8a6]/25 bg-[#04151c]/65 p-5">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${typeConfig[type].accent} text-[#04151c]`}>
            <ActiveIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8fb6b2]">Neto estimado por consulta</p>
            <p className="text-2xl font-black text-white">{formatPesos(activeTarifa.net)}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Result label="Por día" value={result.daily} />
          <Result label="Por semana" value={result.weekly} featured />
          <Result label="Por mes" value={result.monthly} />
        </div>
      </div>

      <p className="mt-4 flex gap-2 text-xs leading-5 text-[#8fb6b2]">
        <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-[#4fdbc8]" />
        Cálculo orientativo con el valor neto por consulta. Si el backend no informa neto profesional,
        se estima el 80% del precio publicado.
      </p>
    </div>
  );
}

function Control({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const update = (next: number) => onChange(Math.min(max, Math.max(min, next)));

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-white">{label}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => update(value - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#d3e5ef] transition hover:border-[#14b8a6]/50 hover:text-[#4fdbc8]"
            aria-label={`Bajar ${label}`}
          >
            <Minus className="h-4 w-4" />
          </button>
          <strong className="min-w-8 text-center text-xl text-white">{value}</strong>
          <button
            type="button"
            onClick={() => update(value + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#d3e5ef] transition hover:border-[#14b8a6]/50 hover:text-[#4fdbc8]"
            aria-label={`Subir ${label}`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => update(Number(event.target.value))}
        className="h-2 w-full accent-[#14b8a6]"
      />
    </div>
  );
}

function Result({ label, value, featured = false }: { label: string; value: number; featured?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${featured ? "border-[#14b8a6]/40 bg-[#14b8a6]/10" : "border-white/10 bg-white/[0.04]"}`}>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8fb6b2]">{label}</p>
      <p className="mt-1 text-xl font-black text-white md:text-2xl">{formatPesos(value)}</p>
    </div>
  );
}
