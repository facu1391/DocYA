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

/** Respuestas tipadas de la API de georef */
type GeorefProvinciasResp = {
  provincias?: Array<{ id?: string | number; nombre?: string }>;
};
type GeorefDeptosResp = {
  departamentos?: Array<{ id?: string | number; nombre?: string }>;
};

/** Respuesta del backend /localidades/{provincia} */
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

  // 1) Provincias (Georef)
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

  // 2) Opciones (CABA: comunas / Resto: localidades del backend)
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
  }, [provSelId, provSelNombre, esCABA]); // ✅ API_BASE eliminado de deps

  // 3) Notificar a RHF
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
    <div>
      <Label>{label}</Label>

      {/* Provincia */}
      <div className="relative mt-1">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
        <Select
          value={provSelId || ""}
          onValueChange={(id) => {
            setProvSelId(id);
            const p = provincias.find((x) => x.id === id);
            setProvSelNombre(p?.nombre ?? "");
          }}
          disabled={loadingProv}
        >
          <SelectTrigger className="w-full h-11 md:h-12 pl-9 pr-8">
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

      {/* Comunas / Localidades */}
      {provSelId ? (
        <div className="mt-3 space-y-2">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />

            {!manual ? (
              <Select
                value={opcionSel || ""}
                onValueChange={(v) => setOpcionSel(v)}
                disabled={loadingOpciones}
              >
                <SelectTrigger className="w-full h-11 md:h-12 pl-9 pr-8">
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
                <Edit3 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
                <Input
                  className="h-11 md:h-12 pl-9 pr-3"
                  placeholder={esCABA ? "Escribí tu comuna" : "Escribí tu localidad"}
                  value={manualTexto}
                  onChange={(e) => setManualTexto(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Toggle manual */}
          <button
            type="button"
            onClick={() => setManual((m) => !m)}
            className="text-xs underline text-[var(--brand)] hover:opacity-90"
          >
            {manual
              ? "Volver a seleccionar de la lista"
              : "No encuentro mi localidad/comuna, quiero escribirla"}
          </button>
        </div>
      ) : null}

      {/* Error */}
      {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}

      {/* Vista previa */}
      {value ? (
        <p className="text-xs text-muted-foreground mt-2">
          Selección: <span className="font-medium">{value}</span>
        </p>
      ) : null}
    </div>
  );
}
