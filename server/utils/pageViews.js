import pool from '../db/connection.js';

/**
 * Дедуп запросов (StrictMode, двойной render, preload)
 * key -> timestamp
 */
const recentViews = new Map();
const DEDUPE_WINDOW = 1000; // 1 секунда

export async function incrementPageView({ route, entity = null, entityId = null, ua = 'unknown' }) {
  try {
    const now = Date.now();
    const dedupeKey = `${route}|${entity ?? ''}|${entityId ?? ''}|${ua}`;

    // 🛑 анти-дубль
    if (recentViews.has(dedupeKey)) {
      const last = recentViews.get(dedupeKey);
      if (now - last < DEDUPE_WINDOW) {
        return;
      }
    }

    recentViews.set(dedupeKey, now);

    // лёгкая очистка
    if (recentViews.size > 500) {
      for (const [key, time] of recentViews) {
        if (now - time > DEDUPE_WINDOW) {
          recentViews.delete(key);
        }
      }
    }

    console.log('incrementPageView params:', { route, entity, entityId });

    const [rows] = await pool.query(
      `
      SELECT id, views
      FROM page_views
      WHERE route = ?
        AND ((entity = ?) OR (entity IS NULL AND ? IS NULL))
        AND ((entity_id = ?) OR (entity_id IS NULL AND ? IS NULL))
      LIMIT 1
      `,
      [route, entity, entity, entityId, entityId]
    );

    if (rows.length > 0) {
      const id = rows[0].id;

      await pool.query(
        `
        UPDATE page_views
        SET views = views + 1,
            last_view_at = NOW()
        WHERE id = ?
        `,
        [id]
      );

      console.log(`Updated page_views id=${id}, new views=${rows[0].views + 1}`);
    } else {
      await pool.query(
        `
        INSERT INTO page_views (route, entity, entity_id, views, last_view_at)
        VALUES (?, ?, ?, 1, NOW())
        `,
        [route, entity, entityId]
      );

      console.log('Inserted new page_views row for route:', route);
    }
  } catch (err) {
    console.error('incrementPageView error:', err);
  }
}
