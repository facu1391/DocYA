/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.docya.com.ar",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.8,
  transform: async (config, path) => {
    // Las paginas por barrio se sirven publicamente con una URL plana
    // (/medico-a-domicilio-palermo). La ruta con slash es solo la ubicacion
    // interna que Next usa antes del rewrite y no debe aparecer en el sitemap.
    const loc = path.startsWith("/medico-a-domicilio/")
      ? path.replace("/medico-a-domicilio/", "/medico-a-domicilio-")
      : path;

    return {
      loc,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  exclude: [
    "/404",
    "/_error",
    "/admin",
    "/login",
    "/gracias",
    "/pedir/filtro",
    "/pedir/pago",
    "/pedir/consultas",
    "/pedir/buscando",
    "/pedir/pago_resultado",
    "/pedir/transferencia",
    "/pedir/solicitar",
    "/pedir/perfil",
    "/pedir/videollamada",
    "/recetario/login",
    "/recetario/completar-perfil",
    "/recetario/cuenta-en-revision",
    "/recetario",
    "/recetario/registro",
    "/recetario/firma-digital",
    "/recetario/dashboard",
    "/recetario/dashboard/*",
    "/referidos/login",
    "/referidos/link",
    "/referidos/cobros",
    "/referidos/mis-referidos",
    "/referidos/panel",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
