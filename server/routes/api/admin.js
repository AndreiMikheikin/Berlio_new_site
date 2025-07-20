import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.js';

const router = Router();

router.get('/secure', authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.admin.username}!`, role: req.admin.role });
});

export default router;
