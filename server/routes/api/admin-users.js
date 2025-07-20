import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.js';
import { hashPassword } from '../../utils/hash.js';
import pool from '../../db/connection.js';

const router = Router();

// Middleware: доступ только супер-админу
function onlySuperAdmin(req, res, next) {
  if (req.admin?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Доступ запрещён' });
  }
  next();
}

// GET /api/admin/admins — Получить всех пользователей с ролью "admin"
router.get('/admins', authenticate, onlySuperAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, role, created_at FROM administrators WHERE role = ?',
      ['admin']
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения пользователей' });
  }
});

// POST /api/admin/admins — Создать нового пользователя
router.post('/admins', authenticate, onlySuperAdmin, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Имя пользователя и пароль обязательны' });
  }

  try {
    const passwordHash = await hashPassword(password);
    console.log('Создание нового администратора:', username);
    await pool.query(
      `INSERT INTO administrators (username, password_hash, role, created_at)
       VALUES (?, ?, 'admin', NOW())`,
      [username, passwordHash]
    );
    res.json({ message: 'Пользователь создан' });
  } catch (err) {
    console.error('🔥 Ошибка при вставке администратора:', err.code, err.message);
    res.status(500).json({ error: 'Ошибка создания пользователя' });
  }
});

// PUT /api/admin/admins/:id — Обновить имя и/или пароль
router.put('/admins/:id', authenticate, onlySuperAdmin, async (req, res) => {
  const { username, password } = req.body;
  const fields = [];
  const values = [];

  if (username) {
    fields.push('username = ?');
    values.push(username);
  }

  if (password) {
    const passwordHash = await hashPassword(password);
    fields.push('password_hash = ?');
    values.push(passwordHash);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: 'Нет данных для обновления' });
  }

  try {
    values.push(req.params.id);
    await pool.query(
      `UPDATE administrators SET ${fields.join(', ')} WHERE id = ? AND role = 'admin'`,
      values
    );
    res.json({ message: 'Пользователь обновлён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка обновления' });
  }
});

// DELETE /api/admin/admins/:id — Удалить пользователя
router.delete('/admins/:id', authenticate, onlySuperAdmin, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM administrators WHERE id = ? AND role = "admin"',
      [req.params.id]
    );
    res.json({ message: 'Пользователь удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка удаления' });
  }
});

export default router;
