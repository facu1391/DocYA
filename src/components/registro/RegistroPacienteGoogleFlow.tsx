"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoadingSplash from "@/components/common/LoadingSplash";
import TermsPaciente from "./TermsPaciente";

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

type GoogleAuthResponse = {
  access_token?: string;
  perfil_completo?: boolean;
  user?: {
    id: string;
    full_name?: string;
    email?: string;
    perfil_completo?: boolean;
  };
  detail?: string;
};

type CountryOption = {
  code: string;
  name: string;
  phoneCode: string;
  flag: string;
};

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "327572770521-tom99oocat1tcp9pahlejsar4iu62lhg.apps.googleusercontent.com";

type GoogleIdConfiguration = {
  client_id: string;
  callback: (response: { credential?: string }) => void | Promise<void>;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
};

const PLACES_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "AIzaSyAcvJIlpOAkRzVaXlcnE8lJQfQGBqx-bKA";

const COUNTRIES: CountryOption[] = [
  { code: "AR", name: "Argentina", phoneCode: "54", flag: "AR" },
  { code: "UY", name: "Uruguay", phoneCode: "598", flag: "UY" },
  { code: "CL", name: "Chile", phoneCode: "56", flag: "CL" },
  { code: "PY", name: "Paraguay", phoneCode: "595", flag: "PY" },
  { code: "BO", name: "Bolivia", phoneCode: "591", flag: "BO" },
  { code: "PE", name: "Perú", phoneCode: "51", flag: "PE" },
  { code: "ES", name: "España", phoneCode: "34", flag: "ES" },
  { code: "US", name: "Estados Unidos", phoneCode: "1", flag: "US" },
];

function countryFlag(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export default function RegistroPacienteGoogleFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<GooglePlacesAutocomplete | null>(null);
  const codigoReferidoRef = useRef("");
  const googleRenderedRef = useRef(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [stage, setStage] = useState<"google" | "profile">("google");
  const [loadingSplash, setLoadingSplash] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState("");
  const [prefillName, setPrefillName] = useState("");
  const [prefillEmail, setPrefillEmail] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("dni");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("masculino");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);
  const [statusMessage, setStatusMessage] = useState("");
  const [codigoReferido, setCodigoReferido] = useState("");

  const telefonoCompleto = useMemo(() => {
    const digits = telefono.replace(/\D/g, "");
    return `+${selectedCountry.phoneCode}${digits}`;
  }, [telefono, selectedCountry]);

  const telefonoValido = (value: string) => /^\+[1-9]\d{7,14}$/.test(value);

  useEffect(() => {
    const refFromUrl = (searchParams.get("ref") || "").trim();
    const refStored =
      typeof window !== "undefined" ? window.localStorage.getItem("docya_ref_code") || "" : "";
    const finalRef = refFromUrl || refStored;
    if (finalRef) {
      setCodigoReferido(finalRef);
      codigoReferidoRef.current = finalRef;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("docya_ref_code", finalRef);
      }
    }
  }, [searchParams]);

  const handleGoogleCredential = useCallback(async (credential: string) => {
    setGoogleBusy(true);
    setStatusMessage("");
    try {
      const res = await fetch("/api/auth_google_paciente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_token: credential,
          codigo_referido: codigoReferidoRef.current || codigoReferido || undefined,
        }),
      });
      const data: GoogleAuthResponse = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.detail || "No se pudo validar Google");
      }

      const nextUserId = String(data.user?.id ?? "");
      if (!nextUserId) {
        throw new Error("No se recibió el usuario de Google");
      }

      setUserId(nextUserId);
      setPrefillName(data.user?.full_name ?? "");
      setPrefillEmail(data.user?.email ?? "");

      if (data.perfil_completo || data.user?.perfil_completo) {
        toast.success("Tu cuenta ya está lista. Ahora podés ingresar a DocYa.");
        setLoadingSplash(true);
        return;
      }

      setStage("profile");
      toast.success("Continuemos con los datos finales de tu perfil.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo iniciar con Google");
    } finally {
      setGoogleBusy(false);
    }
  }, [codigoReferido]);

  useEffect(() => {
    codigoReferidoRef.current = codigoReferido;
  }, [codigoReferido]);

  useEffect(() => {
    if (!loadingSplash) return;
    const t = setTimeout(() => {
      router.push("/gracias?celebra=1&aud=paciente");
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
    } as GoogleIdConfiguration);

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
          setStatusMessage("Google Places no terminó de inicializar.");
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

  const submitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Primero validá tu cuenta con Google.");
      return;
    }
    if (!numeroDocumento.trim()) {
      toast.error("Ingresá tu número de documento.");
      return;
    }
    if (!direccion.trim()) {
      toast.error("Ingresá tu dirección.");
      return;
    }
    if (!fechaNacimiento) {
      toast.error("Elegí tu fecha de nacimiento.");
      return;
    }
    if (!aceptaTerminos) {
      toast.error("Debés aceptar los términos y condiciones.");
      return;
    }
    if (!telefonoValido(telefonoCompleto)) {
      toast.error("Ingresá un teléfono internacional válido.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/completar_perfil_paciente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          telefono: telefonoCompleto,
          tipo_documento: tipoDocumento,
          numero_documento: numeroDocumento.trim(),
          direccion: direccion.trim(),
          fecha_nacimiento: fechaNacimiento,
          sexo,
          acepta_terminos: aceptaTerminos,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.detail || "No se pudo completar el perfil");
      }

      toast.success("Perfil completo. Ya podés seguir con DocYa.");
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("docya_ref_code");
      }
      setLoadingSplash(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo completar el perfil");
    } finally {
      setSubmitting(false);
    }
  };

  const title =
    stage === "google" ? "Registrate con Google" : "Completá tu perfil como en la app";

  const description =
    stage === "google"
      ? "Validá tu cuenta con Google y después te pedimos solo los datos obligatorios del paciente."
      : "Necesitamos los mismos datos adicionales que completás en DocYa para dejar tu cuenta lista.";

  return (
    <>
      <Script
        src={`https://accounts.google.com/gsi/client`}
        strategy="afterInteractive"
        onLoad={() => setGoogleLoaded(true)}
      />
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${PLACES_API_KEY}&libraries=places&loading=async&language=es&region=AR`}
        strategy="afterInteractive"
      />

      <div className="surface rounded-3xl border p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-6 md:p-8">
        <div className="mb-6">
          <span className="badge">Pacientes</span>
          <h2 className="mt-3 text-xl font-semibold md:text-2xl">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">{description}</p>
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
                    Usá tu cuenta Google y después te pedimos documento, teléfono, dirección y fecha de nacimiento.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-[var(--brand)]" />
                Ingresar con Google
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
              <p className="mt-4 text-xs text-muted-foreground">
                Si ya tenías cuenta en DocYa con ese mismo mail, retomamos tu perfil y te pedimos solo lo que falte.
              </p>
              {codigoReferido ? (
                <p className="mt-2 text-xs font-medium text-[var(--brand)]">
                  Referido aplicado: {codigoReferido}
                </p>
              ) : null}
            </div>

            <div className="rounded-2xl border bg-background/60 p-5">
              <p className="text-sm font-medium">¿Preferís registrarte con email y contraseña?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                También podés usar el formulario clásico más abajo si no querés ingresar con Google.
              </p>
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Tipo de documento</Label>
                <div className="relative mt-1">
                  <select
                    value={tipoDocumento}
                    onChange={(e) => setTipoDocumento(e.target.value)}
                    className="h-11 w-full rounded-md border bg-background px-3 pr-10 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:h-12"
                  >
                    <option value="dni">DNI</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="otro">Otro</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <div>
                <Label>Número de documento</Label>
                <div className="relative mt-1">
                  <Input
                    className="h-11 md:h-12"
                    value={numeroDocumento}
                    onChange={(e) => setNumeroDocumento(e.target.value)}
                    placeholder="Ej: 30123456"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
              <div>
                <Label>País</Label>
                <div className="relative mt-1">
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const nextCountry = COUNTRIES.find((country) => country.code === e.target.value);
                      if (nextCountry) setSelectedCountry(nextCountry);
                    }}
                    className="h-11 w-full rounded-md border bg-background px-3 pr-10 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:h-12"
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {countryFlag(country.flag)} {country.name} (+{country.phoneCode})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <div>
                <Label>Teléfono internacional</Label>
                <div className="mt-1 grid grid-cols-[92px_1fr] gap-2">
                  <div className="flex h-11 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium md:h-12">
                    +{selectedCountry.phoneCode}
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                    <Input
                      className="h-11 pl-9 md:h-12"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="Ej: 11 2233 4455"
                      inputMode="tel"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Dirección</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                <input
                  ref={addressInputRef}
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pl-9 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:h-12 md:text-sm"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Empezá a escribir tu dirección"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Usamos Google Maps para autocompletar la dirección como en la app.
              </p>
              {statusMessage ? <p className="mt-1 text-xs text-amber-600">{statusMessage}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Fecha de nacimiento</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand)]" />
                  <Input
                    type="date"
                    className="h-11 pl-9 md:h-12"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Sexo</Label>
                <div className="relative mt-1">
                  <select
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    className="h-11 w-full rounded-md border bg-background px-3 pr-10 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:h-12"
                  >
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="aceptaTerminosPacienteGoogle"
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
              />
              <Label htmlFor="aceptaTerminosPacienteGoogle" className="text-sm text-muted-foreground">
                Acepto los{" "}
                <Link href="/legal/pacientes/terminos" className="link-primary">
                  Términos y Condiciones
                </Link>{" "}
                y la{" "}
                <Link href="/legal/pacientes/privacidad" className="link-primary">
                  Política de Privacidad
                </Link>
                .
              </Label>
            </div>

            <div className="max-h-72 overflow-auto rounded-xl border p-4">
              <TermsPaciente />
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
        message="Preparando tu cuenta…"
        autoHideMs={1600}
        onHide={() => router.push("/gracias?celebra=1&aud=paciente")}
      />
    </>
  );
}
