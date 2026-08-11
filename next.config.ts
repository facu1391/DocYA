import type { NextConfig } from "next";

const noIndexHeaders = [
  "/login",
  "/gracias",
  "/pedir/filtro",
  "/pedir/pago",
  "/pedir/consultas",
  "/pedir/buscando",
  "/pedir/pago_resultado",
  "/pedir/solicitar",
  "/pedir/perfil",
  "/pedir/videollamada",
  "/recetario/login",
  "/recetario/completar-perfil",
  "/recetario/cuenta-en-revision",
  "/recetario",
  "/recetario/registro",
  "/recetario/firma-digital",
  "/recetario/dashboard/:path*",
  "/referidos/login",
  "/referidos/link",
  "/referidos/cobros",
  "/referidos/mis-referidos",
  "/referidos/panel",
];

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      ...noIndexHeaders.map((source) => ({
        source,
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noarchive",
          },
        ],
      })),
    ];
  },

  async redirects() {
    return [
      {
        source: "/legal/terminos",
        destination: "/legal/pacientes/terminos",
        permanent: true,
      },
      {
        source: "/legal/privacidad",
        destination: "/legal/pacientes/privacidad",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE ||
      process.env.NEXT_PUBLIC_API_URL ||
      "https://docya-railway-production.up.railway.app";

    return [
      {
        source: "/recetario/recetas/:path*/html",
        destination: `${apiBase}/recetario/recetas/:path*/html`,
      },
      {
        source: "/recetario/certificados/:path*/html",
        destination: `${apiBase}/recetario/certificados/:path*/html`,
      },
      {
        source: "/recetario/verificar/:path*",
        destination: `${apiBase}/recetario/verificar/:path*`,
      },
      // SEO por barrio: la URL publica es /medico-a-domicilio-{barrio} (sin
      // slash) pero Next.js no soporta mezclar texto fijo y un segmento
      // dinamico en el mismo nombre de carpeta, asi que la pagina real vive
      // en /medico-a-domicilio/[barrio] y este rewrite la expone con la URL
      // pedida sin cambiar lo que ve el navegador ni los buscadores.
      // No afecta a /medico-a-domicilio-caba ni /medico-a-domicilio-particular
      // porque esas son rutas estaticas exactas y Next.js las resuelve antes
      // de evaluar este rewrite.
      {
        source: "/medico-a-domicilio-:barrio",
        destination: "/medico-a-domicilio/:barrio",
      },
    ];
  },
};

export default nextConfig;
