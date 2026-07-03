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
    ];
  },
};

export default nextConfig;
