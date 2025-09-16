import jwt from 'jsonwebtoken';
import 'dotenv/config';

const LOGBOOK_SECRET = process.env.LOGBOOK_SECRET; // отдельный секрет для журнала
const EXPIRES_IN = '8h'; // можно дольше, чем у админки

export const generateLogBookToken = (payload) => {
  return jwt.sign(payload, LOGBOOK_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyLogBookToken = (token) => {
  return jwt.verify(token, LOGBOOK_SECRET);
};