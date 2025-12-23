import express from 'express';
import logBookPool from '../../db/logBookPool.js';
import { logAction } from '../../utils/logBookLogger.js';
import { authenticateLogBook } from '../../middlewares/auth-logbook.js';

const router = express.Router();

// --- Получение всех записей ---
router.get('/', authenticateLogBook, async (req, res) => {
  try {
    const [rows] = await logBookPool.query(
      'SELECT * FROM log_book_data ORDER BY provided_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching log book data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Добавление новой записи ---
router.post('/', authenticateLogBook, async (req, res) => {
  const { recipient, document_info, confidential_info, provided_at, access_method } = req.body;

  if (!recipient || !document_info || !confidential_info || !provided_at) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  const userName = req.logUser.username;

  // Преобразуем дату к формату YYYY-MM-DD
  const mysqlDate = new Date(provided_at).toISOString().slice(0, 10);

  try {
    const [result] = await logBookPool.query(
      'INSERT INTO log_book_data (recipient, document_info, confidential_info, provided_at, access_method, recipient_signature) VALUES (?, ?, ?, ?, ?, ?)',
      [recipient, document_info, confidential_info, mysqlDate, access_method, userName]
    );

    await logAction('CREATE', result.insertId, userName);

    res.status(201).json({ id: result.insertId });

  } catch (err) {
    console.error('Error creating log book entry:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Обновление записи (только superadmin) ---
router.put('/:id', authenticateLogBook, async (req, res) => {
  if (req.logUser.role !== 'superadmin') {
    return res.status(403).json({ message: 'Forbidden: Only superadmin can update entries' });
  }

  const { id } = req.params;
  const { recipient, document_info, confidential_info, provided_at, access_method } = req.body;

  if (!recipient || !document_info || !confidential_info || !provided_at) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  const userName = req.logUser.username;

  // Преобразуем дату к формату YYYY-MM-DD
  const mysqlDate = new Date(provided_at).toISOString().slice(0, 10);

  try {
    const [result] = await logBookPool.query(
      'UPDATE log_book_data SET recipient = ?, document_info = ?, confidential_info = ?, provided_at = ?, access_method = ?, recipient_signature = ? WHERE id = ?',
      [recipient, document_info, confidential_info, mysqlDate, access_method, userName, id]
    );

    await logAction('UPDATE', id, userName);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Entry not found' });

    res.json({ message: 'Updated successfully' });


  } catch (err) {
    console.error('Error updating log book entry:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Удаление записи (только superadmin) ---
router.delete('/:id', authenticateLogBook, async (req, res) => {
  if (req.logUser.role !== 'superadmin') {
    return res.status(403).json({ message: 'Forbidden: Only superadmin can delete entries' });
  }

  const { id } = req.params;
  const userName = req.logUser.username;

  try {
    const [result] = await logBookPool.query(
      'DELETE FROM log_book_data WHERE id = ?',
      [id]
    );


    await logAction('DELETE', id, userName);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Entry not found' });

    res.json({ message: 'Deleted successfully' });


  } catch (err) {
    console.error('Error deleting log book entry:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
