/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.docya.com.ar",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.8,
  exclude: ["/404", "/_error", "/admin"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://www.docya.com.ar/sitemap.xml",
    ],
  },
};
