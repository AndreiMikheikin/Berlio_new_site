import { useEffect, useRef } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import routesMeta from '../contexts/routes.meta.js';

export default function usePageView() {
  const location = useLocation();
  const prevPathRef = useRef(null);

  useEffect(() => {
    const currentPath = location.pathname;

    // первый клиентский проход после SSR
    if (window.__PAGE_VIEW__) {
      window.__PAGE_VIEW__ = false;
      prevPathRef.current = currentPath;
      return;
    }

    // защита от ложного срабатывания при hydration
    if (prevPathRef.current === currentPath) {
      return;
    }

    prevPathRef.current = currentPath;

    const matchedRoute = routesMeta.find(route =>
      matchPath({ path: route.path, end: true }, currentPath)
    );

    if (!matchedRoute) return;

    const entity =
      matchedRoute.entity ||
      (matchedRoute.key === 'newsDetail' ? 'news' : null);

    let entityId = null;
    if (entity === 'news') {
      const match = currentPath.match(/\/news\/(\d+)/);
      if (match) entityId = match[1];
    }

    fetch('/api/page-views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        route: matchedRoute.path,
        entity,
        entityId,
      }),
    });
  }, [location.pathname]);
}
