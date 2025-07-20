import { Router } from 'express';
import db from '../../db/connection.js';
import { comparePassword } from '../../utils/hash.js';
import { generateToken } from '../../utils/jwt.js';

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Missing credentials' });

  try {
    const [rows] = await db.execute(
      'SELECT * FROM administrators WHERE username = ?',
      [username]
    );
    const admin = rows[0];

    if (!admin || !(await comparePassword(password, admin.password_hash))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken({
      id: admin.id,
      username: admin.username,
      role: admin.role,
    });

    res.json({ token });
  } catch (err) {
    console.error('JWT login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
