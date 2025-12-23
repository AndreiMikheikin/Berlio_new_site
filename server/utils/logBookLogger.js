import fs from 'fs';
import path from 'path';

const LOG_DIR = path.resolve('./server/logs/log_book_logs');
const LOG_FILE = path.join(LOG_DIR, 'logbook_actions.log');

// Проверяем, есть ли папка, если нет — создаем
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

export async function logAction(actionType, entryId, userName) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${actionType} entry #${entryId} by ${userName}\n`;

  fs.appendFile(LOG_FILE, logLine, (err) => {
    if (err) console.error('Ошибка логирования:', err);
  });
}
