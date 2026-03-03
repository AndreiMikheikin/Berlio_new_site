import express from 'express';
import { comparePassword } from '../../utils/hash.js';
import mailBookPool from '../../db/mailBookPool.js';
import { generateMailBookToken } from '../../utils/jwt-mailbook.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    try {
        const [rows] = await mailBookPool.execute(
            `SELECT id, login AS username, password_hash, role
             FROM mail_book_users
             WHERE login = ?
             LIMIT 1`,
            [username]
        );

        if (!rows.length) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = rows[0];

        const passwordMatch = await comparePassword(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        const token = generateMailBookToken({
            id: user.id,
            username: user.username,
            role: user.role,
        });

        res.json({ id: user.id, token, role: user.role, login: user.username });

    } catch (err) {
        console.error('MailBook login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;