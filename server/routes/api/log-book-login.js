import express from 'express';
import { comparePassword } from '../../utils/hash.js';
import logBookPool from '../../db/logBookPool.js';
import { generateLogBookToken } from '../../utils/jwt-logbook.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  try {
    const [rows] = await logBookPool.query(
      'SELECT * FROM log_book_users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    /* console.log('DB user row:', user); */

    const passwordMatch = await comparePassword(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateLogBookToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.json({ token });
  } catch (err) {
    console.error('LogBook login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
