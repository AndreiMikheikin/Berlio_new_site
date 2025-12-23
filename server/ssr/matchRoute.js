import routesMeta from '../../src/contexts/routes.meta.js';

/**
 * Ищет маршрут по URL и возвращает объект с info + params
 * @param {string} url - полный URL запроса, например '/news/123'
 * @returns {object|null} - { path, key, sitemap, ssr, entity, params }
 */
export function matchRoute(url) {
  // Убираем query string
  const cleanUrl = url.split('?')[0];

  for (const route of routesMeta) {
    const routeParts = route.path.split('/').filter(Boolean);
    const urlParts = cleanUrl.split('/').filter(Boolean);

    if (routeParts.length !== urlParts.length) continue;

    const params = {};
    let matched = true;

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const urlPart = urlParts[i];

      if (routePart.startsWith(':')) {
        const paramName = routePart.slice(1);
        params[paramName] = urlPart;
      } else if (routePart !== urlPart) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return {
        ...route,
        params: Object.keys(params).length ? params : null,
      };
    }
  }

  return null;
}
