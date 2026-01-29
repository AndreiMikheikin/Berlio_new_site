import express from 'express';
import logBookPool from '../../db/logBookPool.js';
import { logAction } from '../../utils/logBookLogger.js';
import { authenticateLogBook } from '../../middlewares/auth-logbook.js';

const router = express.Router();

/**
 * GET /api/log-book
 * Фильтрация + сортировка
 */
router.get('/', authenticateLogBook, async (req, res) => {
  try {
    const {
      recipient,
      document_info,
      confidential_info,
      access_method,
      recipient_signature,
      dateFrom,
      dateTo,
      sort = 'provided_at',
      direction = 'DESC',
    } = req.query;

    const allowedSort = [
      'id',
      'recipient',
      'document_info',
      'confidential_info',
      'provided_at',
      'access_method',
      'recipient_signature',
    ];

    const allowedDir = ['ASC', 'DESC'];

    const safeSort = allowedSort.includes(sort) ? sort : 'provided_at';
    const safeDirection = allowedDir.includes(direction.toUpperCase())
      ? direction.toUpperCase()
      : 'DESC';

    const conditions = [];
    const values = [];

    if (recipient) {
      conditions.push('recipient LIKE ?');
      values.push(`%${recipient}%`);
    }

    if (document_info) {
      conditions.push('document_info LIKE ?');
      values.push(`%${document_info}%`);
    }

    if (confidential_info) {
      conditions.push('confidential_info LIKE ?');
      values.push(`%${confidential_info}%`);
    }

    if (access_method) {
      conditions.push('access_method LIKE ?');
      values.push(`%${access_method}%`);
    }

    if (recipient_signature) {
      conditions.push('recipient_signature LIKE ?');
      values.push(`%${recipient_signature}%`);
    }

    if (dateFrom) {
      conditions.push('provided_at >= ?');
      values.push(dateFrom);
    }

    if (dateTo) {
      conditions.push('provided_at < DATE_ADD(?, INTERVAL 1 DAY)');
      values.push(dateTo);
    }

    const where = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    const sql = `
      SELECT *
      FROM log_book_data
      ${where}
      ORDER BY ${safeSort} ${safeDirection}
    `;

    const [rows] = await logBookPool.query(sql, values);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching log book data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/log-book
 * Создание записи
 */
router.post('/', authenticateLogBook, async (req, res) => {
  const {
    recipient,
    document_info,
    confidential_info,
    provided_at,
    access_method,
  } = req.body;

  if (
    !recipient ||
    !document_info ||
    !confidential_info ||
    !provided_at ||
    !access_method
  ) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  const userName = req.logUser.username;
  const mysqlDate = new Date(provided_at).toISOString().slice(0, 10);

  try {
    const [result] = await logBookPool.query(
      `
      INSERT INTO log_book_data
      (recipient, document_info, confidential_info, provided_at, access_method, recipient_signature)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        recipient,
        document_info,
        confidential_info,
        mysqlDate,
        access_method,
        userName,
      ]
    );

    await logAction('CREATE', result.insertId, userName);

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error creating log book entry:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /api/log-book/:id
 * Обновление записи (только superadmin)
 */
router.put('/:id', authenticateLogBook, async (req, res) => {
  if (req.logUser.role !== 'superadmin') {
    return res
      .status(403)
      .json({ message: 'Forbidden: Only superadmin can update entries' });
  }

  const { id } = req.params;
  const {
    recipient,
    document_info,
    confidential_info,
    provided_at,
    access_method,
  } = req.body;

  if (
    !recipient ||
    !document_info ||
    !confidential_info ||
    !provided_at ||
    !access_method
  ) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  const userName = req.logUser.username;
  const mysqlDate = new Date(provided_at).toISOString().slice(0, 10);

  try {
    const [result] = await logBookPool.query(
      `
      UPDATE log_book_data
      SET
        recipient = ?,
        document_info = ?,
        confidential_info = ?,
        provided_at = ?,
        access_method = ?,
        recipient_signature = ?
      WHERE id = ?
      `,
      [
        recipient,
        document_info,
        confidential_info,
        mysqlDate,
        access_method,
        userName,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    await logAction('UPDATE', id, userName);

    res.json({ message: 'Updated successfully' });
  } catch (err) {
    console.error('Error updating log book entry:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * DELETE /api/log-book/:id
 * Удаление записи (только superadmin)
 */
router.delete('/:id', authenticateLogBook, async (req, res) => {
  if (req.logUser.role !== 'superadmin') {
    return res
      .status(403)
      .json({ message: 'Forbidden: Only superadmin can delete entries' });
  }

  const { id } = req.params;
  const userName = req.logUser.username;

  try {
    const [result] = await logBookPool.query(
      'DELETE FROM log_book_data WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    await logAction('DELETE', id, userName);

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting log book entry:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
