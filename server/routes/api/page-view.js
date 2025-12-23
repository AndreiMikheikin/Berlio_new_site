import express from 'express';
import pool from '../../db/connection.js';
import { incrementPageView } from '../../utils/pageViews.js';
import { authenticate } from '../../middlewares/auth.js';

const router = express.Router();

// POST: /api/page-views — увеличить счётчик
router.post('/', async (req, res) => {
  const { route, entity, entityId } = req.body;
  const ua = req.headers['user-agent'] || 'unknown';

  try {
    await incrementPageView({ route, entity, entityId, ua });
    res.json({ ok: true });
  } catch (err) {
    console.error('Page view API error:', err);
    res.status(500).json({ ok: false });
  }
});

// GET: /api/page-views — список всех просмотров (для админки)
router.get('/', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, route, entity, entity_id, views, last_view_at
      FROM page_views
      ORDER BY last_view_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error('GET /page-views error:', err);
    res.status(500).json({ error: 'Ошибка при получении просмотров' });
  }
});

export default router;
