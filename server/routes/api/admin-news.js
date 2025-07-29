import express from 'express';
import pool from '../../db/connection.js';
import { authenticate } from '../../middlewares/auth.js';
import { syncNewsJson } from '../../utils/syncNewsJson.js';

const router = express.Router();

// Middleware: доступ для admin и superadmin
function onlyAdminOrSuperadmin(req, res, next) {
  const role = req.admin?.role;

  if (role !== 'admin' && role !== 'superadmin') {
    return res.status(403).json({ error: 'Доступ запрещён' });
  }

  next();
}

// GET: /api/admin/news получить все новости
router.get('/news', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        n.id, n.slug, n.priority, n.date, n.start_date, n.expire_date,
        t.language, t.title, t.description
      FROM news n
      LEFT JOIN news_translations t ON n.id = t.news_id
      ORDER BY n.date DESC
    `);

    const result = {};

    for (const row of rows) {
      const id = row.id.toString();

      if (!result[id]) {
        result[id] = {
          slug: row.slug,
          priority: row.priority,
          dates: {
            date: row.date ?? '',
            startDate: row.start_date ?? '',
            expireDate: row.expire_date ?? ''
          },
          titles: {},
          descriptions: {}
        };
      }

      if (row.language) {
        result[id].titles[row.language] = row.title;
        result[id].descriptions[row.language] = row.description;
      }
    }

    res.json(result);
  } catch (err) {
    console.error('GET /news error:', err);
    res.status(500).json({ error: 'Ошибка при получении новостей' });
  }
});

// POST: /api/admin/news создать новость
router.post('/news', authenticate, onlyAdminOrSuperadmin, async (req, res) => {
  try {
    const {
      slug, priority, dates, titles, descriptions
    } = req.body;

    const [result] = await pool.query(`
      INSERT INTO news (slug, priority, date, start_date, expire_date)
      VALUES (?, ?, ?, ?, ?)
    `, [
      slug,
      priority || 'B',
      dates?.date || null,
      dates?.startDate || null,
      dates?.expireDate || null
    ]);

    const newsId = result.insertId;

    for (const lang of Object.keys(titles)) {
      await pool.query(`
        INSERT INTO news_translations (news_id, language, title, description)
        VALUES (?, ?, ?, ?)
      `, [newsId, lang, titles[lang], descriptions[lang]]);
    }

    await syncNewsJson();

    res.status(201).json({ success: true, id: newsId });
  } catch (err) {
    console.error('POST /news error:', err);
    res.status(500).json({ error: 'Ошибка при создании новости' });
  }
});

// PUT: /api/admin/news/:id обновить новость
router.put('/news/:id', authenticate, onlyAdminOrSuperadmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      slug, priority, dates, titles, descriptions
    } = req.body;

    await pool.query(`
      UPDATE news
      SET slug = ?, priority = ?, date = ?, start_date = ?, expire_date = ?
      WHERE id = ?
    `, [
      slug,
      priority || 'B',
      dates?.date || null,
      dates?.startDate || null,
      dates?.expireDate || null,
      id
    ]);

    // Удалим старые переводы
    await pool.query(`DELETE FROM news_translations WHERE news_id = ?`, [id]);

    // Добавим новые переводы
    for (const lang of Object.keys(titles)) {
      await pool.query(`
        INSERT INTO news_translations (news_id, language, title, description)
        VALUES (?, ?, ?, ?)
      `, [id, lang, titles[lang], descriptions[lang]]);
    }

    await syncNewsJson();

    res.json({ success: true });
  } catch (err) {
    console.error('PUT /news/:id error:', err);
    res.status(500).json({ error: 'Ошибка при обновлении новости' });
  }
});

// DELETE: /api/admin/news/:id удалить новость
router.delete('/news/:id', authenticate, onlyAdminOrSuperadmin, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM news WHERE id = ?`, [id]);
    await pool.query(`DELETE FROM news_translations WHERE news_id = ?`, [id]);

    await syncNewsJson();
    
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /news/:id error:', err);
    res.status(500).json({ error: 'Ошибка при удалении новости' });
  }
});

export default router;
