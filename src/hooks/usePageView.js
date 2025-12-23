import { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import routesMeta from '../contexts/routes.meta.js';

export default function usePageView() {
  const location = useLocation();

  useEffect(() => {
    if (window.__SSR_PAGE_VIEW__) {
      window.__SSR_PAGE_VIEW__ = false;
      return;
    }
    
    const url = location.pathname;

    const matchedRoute = routesMeta.find(route => {
      return matchPath({ path: route.path, end: true }, url);
    });

    if (!matchedRoute) return;

    const entity = matchedRoute.entity || (matchedRoute.key === 'newsDetail' ? 'news' : null);

    let entityId = null;
    if (entity === 'news') {
      const match = url.match(/\/news\/(\d+)/);
      if (match) entityId = match[1];
    }

    fetch('/api/page-views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ route: matchedRoute.path, entity, entityId }),
    });
  }, [location]);
}
