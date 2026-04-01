// src/components/registro/ZonaCobertura.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Edit3 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Provincia = { id: string; nombre: string };
type Opcion = { id: string; nombre: string; display?: string };

type Props = {
  label?: string;
  value?: string;
  onChangeZona: (zona: string) => void;
  error?: string;
};

type GeorefProvinciasResp = {
  provincias?: Array<{ id?: string | number; nombre?: string }>;
};
type GeorefDeptosResp = {
  departamentos?: Array<{ id?: string | number; nombre?: string }>;
};

type LocalidadesBackendResp = {
  provincia: string;
  localidades: string[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export default function ZonaCobertura({
  label = "Zona donde vivís / cobertura",
  value,
  onChangeZona,
  error,
}: Props) {
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [provSelId, setProvSelId] = useState<string>("");
  const [provSelNombre, setProvSelNombre] = useState<string>("");

  const [opciones, setOpciones] = useState<Opcion[]>([]);
  const [opcionSel, setOpcionSel] = useState<string>("");

  const [loadingProv, setLoadingProv] = useState(false);
  const [loadingOpciones, setLoadingOpciones] = useState(false);

  const [manual, setManual] = useState(false);
  const [manualTexto, setManualTexto] = useState<string>("");

  const esCABA = useMemo(
    () =>
      provSelId === "02" ||
      /ciudad\s*aut[oó]noma\s*de\s*buenos\s*aires/i.test(provSelNombre),
    [provSelId, provSelNombre]
  );

  const fetchJSON = async <T,>(url: string): Promise<T | null> => {
    try {
      const r = await fetch(url);
      if (!r.ok) return null;
      return (await r.json()) as T;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    let cancel = false;

    (async () => {
      try {
        setLoadingProv(true);
        const r = await fetch(
          "https://apis.datos.gob.ar/georef/api/provincias?aplanar=true&campos=id,nombre&max=100"
        );
        const data: GeorefProvinciasResp = await r.json();
        if (cancel) return;

        const list: Provincia[] = (data.provincias ?? [])
          .map((p) => ({
            id: String(p.id ?? "").padStart(2, "0"),
            nombre: String(p.nombre ?? ""),
          }))
          .filter((p) => p.id && p.nombre)
          .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

        setProvincias(list);
      } catch {
        setProvincias([]);
      } finally {
        if (!cancel) setLoadingProv(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    let cancel = false;

    const loadCABAComunas = async (): Promise<Opcion[]> => {
      const url =
        "https://apis.datos.gob.ar/georef/api/departamentos?provincia=02&max=100&aplanar=true&campos=id,nombre";
      const data = await fetchJSON<GeorefDeptosResp>(url);
      if (cancel) return [];

      const list: Opcion[] =
        (data?.departamentos ?? [])
          .map((d) => {
            const nombre = String(d.nombre ?? "");
            return {
              id: `${String(d.id ?? "")}-${nombre}`,
              nombre,
              display: nombre,
            };
          })
          .filter((o) => o.id && o.nombre)
          .sort((a, b) => a.nombre!.localeCompare(b.nombre!, "es")) ?? [];

      return list;
    };

    const loadLocalidades = async (): Promise<Opcion[]> => {
      const provNombre = (provSelNombre || "").trim();
      if (!provNombre || !API_BASE) return [];

      const url = `${API_BASE}/localidades/${encodeURIComponent(provNombre)}`;
      const data = await fetchJSON<LocalidadesBackendResp>(url);
      if (cancel || !data) return [];

      const seen = new Set<string>();
      const list: Opcion[] =
        (data.localidades ?? [])
          .map((nombre) => {
            const n = String(nombre || "").trim();
            return { id: `${provNombre}-${n}`, nombre: n, display: n };
          })
          .filter((o) => {
            if (!o.nombre) return false;
            const k = o.nombre.toLowerCase();
            if (seen.has(k)) return false;
            seen.add(k);
            return true;
          })
          .sort((a, b) =>
            (a.display ?? a.nombre).localeCompare(b.display ?? b.nombre, "es")
          ) ?? [];

      return list;
    };

    (async () => {
      setOpciones([]);
      setOpcionSel("");
      setManual(false);
      setManualTexto("");

      if (!provSelId) return;

      try {
        setLoadingOpciones(true);
        const list = esCABA ? await loadCABAComunas() : await loadLocalidades();
        if (!cancel) setOpciones(list);
      } finally {
        if (!cancel) setLoadingOpciones(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [provSelId, provSelNombre, esCABA]);

  const lastZonaRef = useRef<string>("");

  useEffect(() => {
    const prov = provSelNombre?.trim() || "";
    const loc = (manual ? manualTexto : opcionSel)?.trim() || "";
    const zona = [prov, loc].filter(Boolean).join(" / ");
    if (zona !== lastZonaRef.current) {
      lastZonaRef.current = zona;
      onChangeZona(zona);
    }
  }, [provSelNombre, opcionSel, manual, manualTexto, onChangeZona]);

  return (
    <div className="rounded-2xl border border-[color-mix(in_srgb,var(--brand)_8%,var(--border))] p-4 md:p-5">
      <Label>{label}</Label>

      <div className="relative mt-2">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
        <Select
          value={provSelId || ""}
          onValueChange={(id) => {
            setProvSelId(id);
            const p = provincias.find((x) => x.id === id);
            setProvSelNombre(p?.nombre ?? "");
          }}
          disabled={loadingProv}
        >
          <SelectTrigger className="h-11 w-full pl-9 pr-8 md:h-12">
            <SelectValue
              placeholder={loadingProv ? "Cargando provincias…" : "Elegí provincia"}
            />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            align="start"
            sideOffset={4}
            className="max-h-72"
          >
            {provincias.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {provSelId ? (
        <div className="mt-3 space-y-2">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />

            {!manual ? (
              <Select
                value={opcionSel || ""}
                onValueChange={(v) => setOpcionSel(v)}
                disabled={loadingOpciones}
              >
                <SelectTrigger className="h-11 w-full pl-9 pr-8 md:h-12">
                  <SelectValue
                    placeholder={
                      loadingOpciones
                        ? esCABA
                          ? "Cargando comunas…"
                          : "Cargando localidades…"
                        : esCABA
                          ? "Elegí comuna"
                          : "Elegí localidad"
                    }
                  />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  className="max-h-72"
                >
                  {opciones.length === 0 && !loadingOpciones ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Sin resultados
                    </div>
                  ) : null}
                  {opciones.map((o) => (
                    <SelectItem key={o.id} value={o.nombre}>
                      {o.display ?? o.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="relative">
                <Edit3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                <Input
                  className="h-11 pl-9 pr-3 md:h-12"
                  placeholder={esCABA ? "Escribí tu comuna" : "Escribí tu localidad"}
                  value={manualTexto}
                  onChange={(e) => setManualTexto(e.target.value)}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setManual((m) => !m)}
            className="text-xs text-[var(--brand)] underline hover:opacity-90"
          >
            {manual
              ? "Volver a seleccionar de la lista"
              : "No encuentro mi localidad/comuna, quiero escribirla"}
          </button>
        </div>
      ) : null}

      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}

      {value ? (
        <p className="mt-3 text-xs text-muted-foreground">
          Selección: <span className="font-medium">{value}</span>
        </p>
      ) : null}
    </div>
  );
}