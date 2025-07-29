import express from 'express';
import pool from '../../db/connection.js';
import { authenticate } from '../../middlewares/auth.js';

const router = express.Router();

const forbiddenTablesForAdmin = ['administrators'];

// Выполнение SQL-запроса
router.post('/execute', authenticate, async (req, res) => {
  const { sql } = req.body;

  if (!sql || typeof sql !== 'string') {
    return res.status(400).json({ error: 'Некорректный SQL-запрос' });
  }

  const trimmed = sql.trim().toLowerCase();
  const forbidden = ['drop ', 'truncate ', 'delete from '];

  if (!['superadmin', 'admin'].includes(req.admin?.role)) {
    return res.status(403).json({ error: 'Доступ запрещён' });
  }

  if (forbidden.some(word => trimmed.includes(word))) {
    return res.status(403).json({ error: 'Опасный запрос запрещён' });
  }

  if (req.admin.role === 'admin') {
    for (const table of forbiddenTablesForAdmin) {
      // простой поиск по имени таблицы в запросе
      if (trimmed.includes(table)) {
        return res.status(403).json({ error: `Доступ к таблице "${table}" запрещён` });
      }
    }
  }

  console.log(`[SQL Explorer] Запрос от ${req.admin.username || req.admin.id || 'неизвестного пользователя'} (роль: ${req.admin.role}):`, trimmed);

  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(sql);

      if (Array.isArray(rows)) return res.json({ rows });
      if (typeof rows.affectedRows === 'number') return res.json({ affectedRows: rows.affectedRows });
      return res.json({ rows: [] });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('[SQL Explorer] Ошибка запроса:', err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
