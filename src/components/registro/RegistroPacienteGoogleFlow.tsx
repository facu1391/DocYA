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

const APPLE_SERVICE_ID =
  process.env.NEXT_PUBLIC_APPLE_SERVICE_ID || "com.docya.web";

const APPLE_REDIRECT_URI =
  process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI ||
  "https://www.docya.com.ar/registro/paciente";

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
  const [appleBusy, setAppleBusy] = useState(false);
  const [aceptaTerminosApple, setAceptaTerminosApple] = useState(false);
  const [aceptaTerminosGeneral, setAceptaTerminosGeneral] = useState(false);
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

  const handleAppleSignIn = useCallback(async () => {
    if (!aceptaTerminosGeneral) {
      toast.error("Debés aceptar los términos y condiciones.");
      return;
    }
    setAppleBusy(true);
    setStatusMessage("");
    try {
      const appleAuth = (window as unknown as { AppleID?: { auth?: { init: (c: object) => void; signIn: () => Promise<{ authorization: { id_token: string }; user?: { name?: { firstName?: string; lastName?: string }; email?: string } }> } } }).AppleID;
      if (!appleAuth?.auth) {
        toast.error("Apple Sign In no está disponible. Intentá desde Safari.");
        return;
      }

      appleAuth.auth.init({
        clientId: APPLE_SERVICE_ID,
        scope: "name email",
        redirectURI: APPLE_REDIRECT_URI,
        usePopup: true,
      });

      const response = await appleAuth.auth.signIn();
      const identityToken = response.authorization?.id_token;
      if (!identityToken) throw new Error("Apple no devolvió un token válido.");

      const firstName = response.user?.name?.firstName ?? "";
      const lastName = response.user?.name?.lastName ?? "";
      const fullName = [firstName, lastName].filter(Boolean).join(" ") || undefined;
      const email = response.user?.email ?? undefined;

      const res = await fetch("/api/auth_apple_paciente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity_token: identityToken, full_name: fullName, email }),
      });
      const data: GoogleAuthResponse = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.detail || "No se pudo validar con Apple");

      const nextUserId = String(data.user?.id ?? "");
      if (!nextUserId) throw new Error("No se recibió el usuario de Apple");

      setUserId(nextUserId);
      setPrefillName(data.user?.full_name ?? fullName ?? "");
      setPrefillEmail(data.user?.email ?? email ?? "");

      if (data.perfil_completo || data.user?.perfil_completo) {
        toast.success("Tu cuenta ya está lista. Ahora podés ingresar a DocYa.");
        setLoadingSplash(true);
        return;
      }

      setStage("profile");
      toast.success("Continuemos con los datos finales de tu perfil.");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "error" in error && (error as { error: string }).error === "popup_closed_by_user") return;
      toast.error(error instanceof Error ? error.message : "No se pudo iniciar con Apple");
    } finally {
      setAppleBusy(false);
    }
  }, [aceptaTerminosGeneral]);

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

    const btnWidth = Math.min(
      googleButtonRef.current.offsetWidth || 300,
      360,
    );
    googleApi.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "signup_with",
      width: btnWidth,
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
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGoogleLoaded(true)}
      />
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        strategy="afterInteractive"
      />
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${PLACES_API_KEY}&libraries=places&loading=async&language=es&region=AR`}
        strategy="afterInteractive"
      />

      <div className="surface w-full overflow-hidden rounded-3xl border p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] [overflow-wrap:anywhere] sm:p-6 md:p-8">
        <div className="mb-6">
          <span className="badge">Pacientes</span>
          <h2 className="mt-3 text-xl font-semibold md:text-2xl">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">{description}</p>
        </div>

        {stage === "google" ? (
          <div className="grid gap-5">
            {/* Validación de identidad */}
            <div className="rounded-2xl border bg-background/70 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-[color-mix(in_srgb,var(--brand)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] p-2 text-[var(--brand)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Primero validamos tu identidad</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Usá tu cuenta Google o Apple y después te pedimos documento, teléfono, dirección y fecha de nacimiento.
                  </p>
                </div>
              </div>
            </div>

            {/* Términos compartidos */}
            <div className="w-full overflow-hidden rounded-2xl border bg-background/70 p-4">
              <div className="mb-3 max-h-40 w-full overflow-y-auto overflow-x-hidden rounded-xl border p-3">
                <TermsPaciente />
              </div>
              <div className="flex w-full min-w-0 items-start gap-3">
                <input
                  id="aceptaTerminosGeneral"
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0"
                  checked={aceptaTerminosGeneral}
                  onChange={(e) => setAceptaTerminosGeneral(e.target.checked)}
                />
                <label
                  htmlFor="aceptaTerminosGeneral"
                  className="min-w-0 flex-1 cursor-pointer text-sm leading-relaxed text-muted-foreground"
                >
                  Acepto los{" "}
                  <Link href="/legal/pacientes/terminos" className="link-primary whitespace-nowrap">
                    Términos y Condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/legal/pacientes/privacidad" className="link-primary whitespace-nowrap">
                    Política de Privacidad
                  </Link>
                  .
                </label>
              </div>
            </div>

            {/* Google */}
            <div className="rounded-2xl border bg-background p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-[var(--brand)]" />
                Ingresar con Google
              </div>
              <div className={`w-full min-h-12 flex items-center justify-center transition-opacity ${!aceptaTerminosGeneral ? "pointer-events-none opacity-40" : ""}`}>
                {googleBusy ? (
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    Validando tu cuenta
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <div ref={googleButtonRef} className="w-full" />
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

            {/* Apple */}
            <div className="rounded-2xl border bg-background p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium">
                <svg className="h-4 w-4" viewBox="0 0 814 1000" fill="currentColor">
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.9-103.2c-46-60.9-85.5-159-85.5-252.9 0-73.4 13.1-145.8 41.1-207.8 40.2-91.5 105-150 165.9-150 62.5 0 101.6 39.5 165.9 39.5 62.5 0 100.2-39.5 165.9-39.5 62.5 0 126.2 58.4 165.9 150zm-114.3-258.8c27.6-31.7 47.6-75.7 47.6-119.8 0-6.1-.5-12.2-1.6-17.3-45.1 1.6-98.8 30.3-130.5 63.2-27.6 29.9-51.2 73.9-51.2 118.5 0 6.7 1.1 13.4 1.6 15.5 2.7.5 7.1 1.1 11.6 1.1 41.9 0 91.5-28.1 122.5-61.2z" />
                </svg>
                Ingresar con Apple
              </div>
              <button
                type="button"
                onClick={handleAppleSignIn}
                disabled={appleBusy || !aceptaTerminosGeneral}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-80 disabled:opacity-40 dark:bg-white dark:text-black"
              >
                {appleBusy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Validando…
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 814 1000" fill="currentColor">
                      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.9-103.2c-46-60.9-85.5-159-85.5-252.9 0-73.4 13.1-145.8 41.1-207.8 40.2-91.5 105-150 165.9-150 62.5 0 101.6 39.5 165.9 39.5 62.5 0 100.2-39.5 165.9-39.5 62.5 0 126.2 58.4 165.9 150zm-114.3-258.8c27.6-31.7 47.6-75.7 47.6-119.8 0-6.1-.5-12.2-1.6-17.3-45.1 1.6-98.8 30.3-130.5 63.2-27.6 29.9-51.2 73.9-51.2 118.5 0 6.7 1.1 13.4 1.6 15.5 2.7.5 7.1 1.1 11.6 1.1 41.9 0 91.5-28.1 122.5-61.2z" />
                    </svg>
                    Continuar con Apple
                  </>
                )}
              </button>
              {codigoReferido ? (
                <p className="mt-2 text-xs font-medium text-[var(--brand)]">
                  Referido aplicado: {codigoReferido}
                </p>
              ) : null}
              <p className="mt-2 text-xs text-muted-foreground">
                Funciona mejor en Safari. En otros navegadores abre un popup de Apple.
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
