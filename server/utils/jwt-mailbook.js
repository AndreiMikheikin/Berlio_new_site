import jwt from 'jsonwebtoken';
import 'dotenv/config';

const MAILBOOK_SECRET = process.env.MAILBOOK_SECRET; // отдельный секрет для журнала
if (!MAILBOOK_SECRET) {
  throw new Error('MAILBOOK_SECRET is not defined');
}
const EXPIRES_IN = '8h'; // можно дольше, чем у админки

export const generateMailBookToken = (payload) => {
  return jwt.sign(payload, MAILBOOK_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyMailBookToken = (token) => {
  return jwt.verify(token, MAILBOOK_SECRET);
};