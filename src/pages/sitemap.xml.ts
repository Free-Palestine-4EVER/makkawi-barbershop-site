import type { APIRoute } from "astro";

/**
 * Crawlers read this outside the site's own runtime, so every entry must be a
 * fully-qualified absolute URL — origin + base combined by hand, not a
 * BASE_URL-relative path.
 */
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL; // "/makkawi-barbershop-site/"
  const abs = (path: string) => new URL(`${base}${path}`, site).toString();

  const pages = [
    { loc: abs("ar/"), priority: "1.0" },
    { loc: abs("en/"), priority: "0.9" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.loc}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${abs("ar/")}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs("en/")}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs("ar/")}"/>
    <changefreq>monthly</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
