import routesMeta from '../../src/contexts/routes.meta.js';

const BASE_URL = 'https://new.berlio.by';

const excludedFromSitemap = [
  '/administrator',
];

export function generateSitemap(lastmod = new Date().toISOString()) {
  const staticRoutes = routesMeta
    .filter(route =>
      route.sitemap === true &&          // явно разрешён
      typeof route.path === 'string' &&
      !route.dynamic &&                  // ❗ динамику исключаем
      !route.path.includes(':') &&
      !excludedFromSitemap.includes(route.path)
    )
    .map(route => route.path);

  const uniqueRoutes = [...new Set(staticRoutes)];

  const urls = uniqueRoutes
    .map(path => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.7</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
