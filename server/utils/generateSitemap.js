import routes from '../../src/contexts/routes.js'

const BASE_URL = 'http://new.berlio.by'

export function generateSitemap(lastmod = new Date().toISOString()) {
  // фильтруем статичные роуты (без :param)
  const staticRoutes = Object.values(routes).filter(route => !route.includes(':'))

  // убираем дубли с помощью Set
  const uniqueRoutes = Array.from(new Set(staticRoutes))

  const urls = uniqueRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.7</priority>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}
