"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Camera,
  CheckCircle2,
  ChevronDown,
  IdCard,
  Image as ImageIcon,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  User2,
} from "lucide-react";

import LoadingSplash from "@/components/common/LoadingSplash";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type GoogleWindow = Window & {
  google?: {
    accounts?: {
      id?: {
        initialize: (config: {
          client_id: string;
          callback: (response: { credential?: string }) => void;
          auto_select?: boolean;
          cancel_on_tap_outside?: boolean;
        }) => void;
        renderButton: (
          element: HTMLElement,
          options: {
            theme: string;
            size: string;
            shape: string;
            text: string;
            width: number;
            logo_alignment: string;
          },
        ) => void;
      };
    };
    maps?: {
      places?: {
        Autocomplete?: new (
          input: HTMLInputElement,
          options: {
            fields: string[];
            componentRestrictions?: { country: string };
            types?: string[];
          },
        ) => GooglePlacesAutocomplete;
      };
    };
  };
};

type GooglePlacesPlace = {
  formatted_address?: string;
};

type GooglePlacesAutocomplete = {
  addListener: (eventName: "place_changed", handler: () => void) => void;
  getPlace: () => GooglePlacesPlace;
};

type GoogleAuthMedicoResponse = {
  access_token?: string;
  medico_id?: number | string;
  full_name?: string;
  perfil_completo?: boolean;
  validado?: boolean;
  matricula_validada?: boolean;
  medico?: {
    id?: number | string;
    full_name?: string;
    email?: string;
    tipo?: string;
    perfil_completo?: boolean;
    validado?: boolean;
    matricula_validada?: boolean;
  };
  detail?: string;
};

type CountryOption = {
  code: string;
  name: string;
  phoneCode: string;
};

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "327572770521-tom99oocat1tcp9pahlejsar4iu62lhg.apps.googleusercontent.com";

const PLACES_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "AIzaSyDVv_barlVwHJTgLF66dP4ESUffCBuS3uA";

const COUNTRIES: CountryOption[] = [
  { code: "AR", name: "Argentina", phoneCode: "54" },
  { code: "UY", name: "Uruguay", phoneCode: "598" },
  { code: "CL", name: "Chile", phoneCode: "56" },
  { code: "PY", name: "Paraguay", phoneCode: "595" },
  { code: "BO", name: "Bolivia", phoneCode: "591" },
  { code: "PE", name: "Peru", phoneCode: "51" },
  { code: "ES", name: "Espana", phoneCode: "34" },
  { code: "US", name: "Estados Unidos", phoneCode: "1" },
];

function countryFlag(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

async function fileToDataURL(file?: File): Promise<string | undefined> {
  if (!file) return undefined;
  if (file.size > 5 * 1024 * 1024) {
    toast.error("El archivo no puede superar 5 MB");
    return undefined;
  }

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
    reader.readAsDataURL(file);
  });
}

export default function RegistroProGoogleFlow() {
  const router = useRouter();
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<GooglePlacesAutocomplete | null>(null);
  const googleRenderedRef = useRef(false);
  const dniFrenteRef = useRef<HTMLInputElement | null>(null);
  const dniDorsoRef = useRef<HTMLInputElement | null>(null);
  const selfieRef = useRef<HTMLInputElement | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [stage, setStage] = useState<"google" | "profile">("google");
  const [loadingSplash, setLoadingSplash] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [medicoId, setMedicoId] = useState("");
  const [prefillName, setPrefillName] = useState("");
  const [prefillEmail, setPrefillEmail] = useState("");
  const [tipo, setTipo] = useState("medico");
  const [tipoDocumento, setTipoDocumento] = useState("dni");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [matricula, setMatricula] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);
  const [dniFrente, setDniFrente] = useState<File | undefined>();
  const [dniDorso, setDniDorso] = useState<File | undefined>();
  const [selfieDni, setSelfieDni] = useState<File | undefined>();
  const [statusMessage, setStatusMessage] = useState("");

  const telefonoCompleto = useMemo(() => {
    const digits = telefono.replace(/\D/g, "");
    return `+${selectedCountry.phoneCode}${digits}`;
  }, [telefono, selectedCountry]);

  const handleGoogleCredential = useCallback(async (credential: string) => {
    setGoogleBusy(true);
    setStatusMessage("");

    try {
      const res = await fetch("/api/auth_google_medico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: credential }),
      });
      const data: GoogleAuthMedicoResponse = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.detail || "No se pudo validar Google");
      }

      const nextMedicoId = String(data.medico_id ?? data.medico?.id ?? "");
      if (!nextMedicoId) {
        throw new Error("No se recibio el profesional de Google");
      }

      setMedicoId(nextMedicoId);
      setPrefillName(data.medico?.full_name || data.full_name || "");
      setPrefillEmail(data.medico?.email || "");
      setTipo(data.medico?.tipo || "medico");

      if (data.perfil_completo || data.medico?.perfil_completo) {
        toast.success("Tu cuenta profesional ya esta registrada.");
        setLoadingSplash(true);
        return;
      }

      setStage("profile");
      toast.success("Validamos Google. Completa los datos profesionales.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo iniciar con Google");
    } finally {
      setGoogleBusy(false);
    }
  }, []);

  useEffect(() => {
    if (!loadingSplash) return;
    const t = setTimeout(() => {
      router.push("/gracias?celebra=1&aud=pro");
    }, 1600);
    return () => clearTimeout(t);
  }, [loadingSplash, router]);

  useEffect(() => {
    const googleApi = (window as GoogleWindow).google;
    if (!googleLoaded || googleRenderedRef.current || !googleButtonRef.current || !googleApi?.accounts?.id) {
      return;
    }

    googleApi.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response: { credential?: string }) => {
        if (response?.credential) {
          void handleGoogleCredential(response.credential);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    googleApi.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "signup_with",
      width: 360,
      logo_alignment: "left",
    });

    googleRenderedRef.current = true;
  }, [googleLoaded, handleGoogleCredential]);

  useEffect(() => {
    if (stage !== "profile" || !googleLoaded || !addressInputRef.current) return;

    let attempts = 0;
    const maxAttempts = 20;

    const bindAutocomplete = () => {
      const Autocomplete = (window as GoogleWindow).google?.maps?.places?.Autocomplete;
      if (!Autocomplete || !addressInputRef.current) {
        attempts += 1;
        if (attempts < maxAttempts) {
          window.setTimeout(bindAutocomplete, 300);
        } else {
          setStatusMessage("Google Places no termino de inicializar.");
        }
        return;
      }

      setStatusMessage("");
      autocompleteRef.current = new Autocomplete(addressInputRef.current, {
        fields: ["formatted_address"],
        componentRestrictions: { country: "ar" },
        types: ["address"],
      });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace?.();
        const value = place?.formatted_address || addressInputRef.current?.value || "";
        setDireccion(value);
      });
    };

    bindAutocomplete();
  }, [googleLoaded, stage]);

  const submitProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    const telefonoValido = /^\+[1-9]\d{7,14}$/.test(telefonoCompleto);

    if (!medicoId) {
      toast.error("Primero valida tu cuenta con Google.");
      return;
    }
    if (!numeroDocumento.trim() || !matricula.trim() || !direccion.trim()) {
      toast.error("Completa documento, matricula y direccion.");
      return;
    }
    if (!telefonoValido) {
      toast.error("Ingresa un telefono internacional valido.");
      return;
    }
    if (!dniFrente || !dniDorso || !selfieDni) {
      toast.error("Subi frente, dorso y selfie con documento.");
      return;
    }
    if (!aceptaTerminos) {
      toast.error("Debes aceptar los terminos y condiciones.");
      return;
    }

    setSubmitting(true);
    try {
      const [dniFrente64, dniDorso64, selfieDni64] = await Promise.all([
        fileToDataURL(dniFrente),
        fileToDataURL(dniDorso),
        fileToDataURL(selfieDni),
      ]);
      if (!dniFrente64 || !dniDorso64 || !selfieDni64) return;

      const res = await fetch("/api/completar_perfil_medico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medico_id: Number(medicoId),
          tipo,
          tipo_documento: tipoDocumento,
          numero_documento: numeroDocumento.trim(),
          matricula: matricula.trim(),
          especialidad: especialidad.trim() || null,
          telefono: telefonoCompleto,
          direccion: direccion.trim(),
          foto_dni_frente: dniFrente64,
          foto_dni_dorso: dniDorso64,
          selfie_dni: selfieDni64,
          acepta_terminos: aceptaTerminos,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.detail || "No se pudo completar el perfil");
      }

      toast.success("Registro profesional enviado para revision.");
      setLoadingSplash(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo completar el perfil");
    } finally {
      setSubmitting(false);
    }
  };

  function FileButton({
    label,
    file,
    inputRef,
    onChange,
    icon,
  }: {
    label: string;
    file?: File;
    inputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (file?: File) => void;
    icon: React.ReactNode;
  }) {
    return (
      <div>
        <Label className="mb-1 block">{label}</Label>
        <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2 focus-within:border-[var(--brand)] focus-within:ring-2 focus-within:ring-[var(--brand)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)]">
            {icon}
          </span>
          <span className="flex-1 truncate text-sm text-muted-foreground">
            {file?.name || "Ningun archivo seleccionado"}
          </span>
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="h-9 px-3 bg-[var(--brand)] text-[var(--brand-foreground)] hover:bg-[var(--brand-hover)]"
          >
            Seleccionar
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => onChange(event.target.files?.[0])}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGoogleLoaded(true)}
        onReady={() => setGoogleLoaded(true)}
      />
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${PLACES_API_KEY}&libraries=places&loading=async&language=es&region=AR`}
        strategy="afterInteractive"
      />

      <div className="surface rounded-3xl border p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-6 md:p-8">
        <div className="mb-6">
          <span className="badge">Google</span>
          <h2 className="mt-3 text-xl font-semibold md:text-2xl">
            {stage === "google" ? "Registrate con Google" : "Completa tu perfil profesional"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {stage === "google"
              ? "Usa tu cuenta Google y despues completa la documentacion profesional obligatoria."
              : "Te pedimos los mismos datos y documentos que en el registro de la app DocYa Pro."}
          </p>
        </div>

        {stage === "google" ? (
          <div className="grid gap-5">
            <div className="rounded-2xl border bg-background/70 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-[color-mix(in_srgb,var(--brand)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] p-2 text-[var(--brand)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Primero validamos tu identidad</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Google crea o recupera tu cuenta profesional. Luego cargamos matricula,
                    documento, telefono, direccion y fotos.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-[var(--brand)]" />
                Registro con Google
              </div>
              <div className="flex min-h-12 items-center justify-center">
                {googleBusy ? (
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    Validando tu cuenta
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <div ref={googleButtonRef} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={submitProfile} className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Nombre</Label>
                <div className="relative mt-1">
                  <User2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <Input className="h-11 pl-9 md:h-12" value={prefillName} disabled />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <Input className="h-11 pl-9 md:h-12" value={prefillEmail} disabled />
                </div>
              </div>
            </div>

            <div>
              <Label>Tipo de profesional</Label>
              <div className="relative mt-1">
                <Stethoscope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                <select
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                  className="h-11 w-full rounded-md border bg-background pl-9 pr-8 text-sm outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)] md:h-12"
                >
                  <option value="medico">Medico</option>
                  <option value="enfermero">Enfermero</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Tipo de documento</Label>
                <div className="relative mt-1">
                  <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <select
                    value={tipoDocumento}
                    onChange={(event) => setTipoDocumento(event.target.value)}
                    className="h-11 w-full rounded-md border bg-background pl-9 pr-8 text-sm outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)] md:h-12"
                  >
                    <option value="dni">DNI</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="otro">Otro</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <div>
                <Label>Numero de documento</Label>
                <div className="relative mt-1">
                  <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <Input
                    className="h-11 pl-9 md:h-12"
                    value={numeroDocumento}
                    onChange={(event) => setNumeroDocumento(event.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Matricula profesional</Label>
                <div className="relative mt-1">
                  <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <Input
                    className="h-11 pl-9 md:h-12"
                    value={matricula}
                    onChange={(event) => setMatricula(event.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <Label>Especialidad opcional</Label>
                <div className="relative mt-1">
                  <Stethoscope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <Input
                    className="h-11 pl-9 md:h-12"
                    value={especialidad}
                    onChange={(event) => setEspecialidad(event.target.value)}
                    placeholder="Ej: Clinica, Pediatria, UTI"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
              <div>
                <Label>Pais</Label>
                <div className="relative mt-1">
                  <select
                    value={selectedCountry.code}
                    onChange={(event) => {
                      const nextCountry = COUNTRIES.find(
                        (country) => country.code === event.target.value,
                      );
                      if (nextCountry) setSelectedCountry(nextCountry);
                    }}
                    className="h-11 w-full rounded-md border bg-background px-3 pr-10 text-sm outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)] md:h-12"
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {countryFlag(country.code)} {country.name} (+{country.phoneCode})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <div>
                <Label>Telefono internacional</Label>
                <div className="mt-1 grid grid-cols-[92px_1fr] gap-2">
                  <div className="flex h-11 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium md:h-12">
                    +{selectedCountry.phoneCode}
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                    <Input
                      className="h-11 pl-9 md:h-12"
                      value={telefono}
                      onChange={(event) => setTelefono(event.target.value)}
                      placeholder="Ej: 11 2233 4455"
                      inputMode="tel"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Direccion profesional</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                <input
                  ref={addressInputRef}
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pl-9 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:h-12 md:text-sm"
                  value={direccion}
                  onChange={(event) => setDireccion(event.target.value)}
                  placeholder="Empeza a escribir tu direccion"
                />
              </div>
              {statusMessage ? <p className="mt-1 text-xs text-amber-600">{statusMessage}</p> : null}
            </div>

            <div className="grid gap-4">
              <FileButton
                label="DNI frente"
                file={dniFrente}
                inputRef={dniFrenteRef}
                onChange={setDniFrente}
                icon={<IdCard className="h-4 w-4" />}
              />
              <FileButton
                label="DNI dorso"
                file={dniDorso}
                inputRef={dniDorsoRef}
                onChange={setDniDorso}
                icon={<ImageIcon className="h-4 w-4" />}
              />
              <FileButton
                label="Selfie con documento"
                file={selfieDni}
                inputRef={selfieRef}
                onChange={setSelfieDni}
                icon={<Camera className="h-4 w-4" />}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="aceptaTerminosProGoogle"
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={aceptaTerminos}
                onChange={(event) => setAceptaTerminos(event.target.checked)}
              />
              <Label htmlFor="aceptaTerminosProGoogle" className="text-sm text-muted-foreground">
                Acepto los{" "}
                <Link href="/legal/pro/terminos" className="link-primary">
                  terminos y condiciones
                </Link>{" "}
                de DocYa Pro.
              </Label>
            </div>

            <div className="pt-1 sm:pt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer bg-[var(--brand)] text-[var(--brand-foreground)] hover:bg-[var(--brand-hover)] sm:w-auto"
              >
                {submitting ? (
                  <>
                    Guardando
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Guardar y continuar
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>

      <LoadingSplash
        show={loadingSplash}
        message="Preparando tu cuenta..."
        autoHideMs={1600}
        onHide={() => router.push("/gracias?celebra=1&aud=pro")}
      />
    </>
  );
}
