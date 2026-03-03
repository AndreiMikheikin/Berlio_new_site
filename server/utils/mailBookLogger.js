import fs from 'fs';
import path from 'path';

const LOG_DIR = path.resolve('./server/logs/mail_book_logs');
const LOG_FILE = path.join(LOG_DIR, 'mailbook_actions.log');

// Создаём папку, если нет
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Логирует действия mail-book
 * @param {string} actionType — тип действия (CREATE, UPDATE, CANCEL)
 * @param {string} entryId — id записи
 * @param {string} userName — логин пользователя
 * @returns {Promise<void>}
 */
export function logAction(actionType, entryId, userName) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${actionType} entry #${entryId} by ${userName}\n`;

  return new Promise((resolve, reject) => {
    fs.appendFile(LOG_FILE, logLine, 'utf-8', (err) => {
      if (err) {
        console.error('Ошибка логирования:', err);
        return reject(err);
      }
      resolve();
    });
  });
}
