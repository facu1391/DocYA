
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
type Opcion = { id: string; nombre: string };

type Props = {
  label?: string;
  value?: string;
  onChangeZona: (zona: string) => void;
  error?: string;
};

type GeorefProvinciasResp = {
  provincias?: Array<{ id?: string | number; nombre?: string }>;
};
type GeorefComunasResp = {
  comunas?: Array<{ id?: string | number; nombre?: string }>;
};
type GeorefLocalidadesResp = {
  localidades?: Array<{ id?: string | number; nombre?: string }>;
};

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

  // 1) Provincias
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

  // 2) Comunas/Localidades (incluye estrategia robusta para CABA)
  useEffect(() => {
    let cancel = false;

    const mapList = (
      arr: Array<{ id?: string | number; nombre?: string }> | undefined
    ): Opcion[] =>
      (arr ?? [])
        .map((x) => ({
          id: String(x.id ?? ""),
          nombre: String(x.nombre ?? ""),
        }))
        .filter((o) => o.id && o.nombre)
        .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

    const fetchJSON = async <T,>(url: string): Promise<T | null> => {
      try {
        const r = await fetch(url);
        if (!r.ok) return null;
        return (await r.json()) as T;
      } catch {
        return null;
      }
    };

    const loadCABAComunas = async (): Promise<Opcion[]> => {
      const provId = provSelId || "02";
      const provName = provSelNombre || "Ciudad Autónoma de Buenos Aires";
      const candidates: string[] = [
        `https://apis.datos.gob.ar/georef/api/comunas?provincia=${encodeURIComponent(
          provId
        )}&max=100&aplanar=true&campos=id,nombre`,
        `https://apis.datos.gob.ar/georef/api/comunas?provincia=${encodeURIComponent(
          provName
        )}&max=100&aplanar=true&campos=id,nombre`,
        `https://apis.datos.gob.ar/georef/api/comunas?provincia=${encodeURIComponent(
          "CABA"
        )}&max=100&aplanar=true&campos=id,nombre`,
        `https://apis.datos.gob.ar/georef/api/comunas?provincia=${encodeURIComponent(
          "Capital Federal"
        )}&max=100&aplanar=true&campos=id,nombre`,
        // por las dudas sin aplanar
        `https://apis.datos.gob.ar/georef/api/comunas?provincia=${encodeURIComponent(
          provId
        )}&max=100&campos=id,nombre`,
      ];

      for (const url of candidates) {
        const data = await fetchJSON<GeorefComunasResp>(url);
        if (cancel) return [];
        const list = mapList(data?.comunas);
        if (list.length > 0) return list;
      }
      return [];
    };

    const loadLocalidades = async (): Promise<Opcion[]> => {
      const provParam = provSelId
        ? provSelId
        : encodeURIComponent(provSelNombre || "");
      const url =
        `https://apis.datos.gob.ar/georef/api/localidades` +
        `?provincia=${provParam}&max=500&aplanar=true&campos=id,nombre`;
      const data = await fetchJSON<GeorefLocalidadesResp>(url);
      if (cancel) return [];
      return mapList(data?.localidades);
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

  // 3) Notificar a RHF solo cuando CAMBIA la zona (evita bucles)
  const lastZonaRef = useRef<string>("");
  useEffect(() => {
    const prov = provSelNombre?.trim() || "";
    const loc = (manual ? manualTexto : opcionSel)?.trim() || "";
    const zona = [prov, loc].filter(Boolean).join(" / ");

    if (zona !== lastZonaRef.current) {
      lastZonaRef.current = zona;
      onChangeZona(zona);
    }
    // ⚠️ Intencional: NO dependemos de onChangeZona para evitar loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provSelNombre, opcionSel, manual, manualTexto]);

  return (
    <div>
      <Label>{label}</Label>

      {/* Provincia */}
      <div className="relative mt-1">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand)]" />
        <Select
          value={provSelId || undefined}
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
                value={opcionSel || undefined}
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
                      {o.nombre}
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

      {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}

      {value ? (
        <p className="text-xs text-muted-foreground mt-2">
          Selección: <span className="font-medium">{value}</span>
        </p>
      ) : null}
    </div>
  );
}
