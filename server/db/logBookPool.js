import 'dotenv/config';
import { createPool } from 'mysql2/promise';

const logBookPool = createPool({
  host: process.env.LOGBOOK_DB_HOST || 'localhost',
  user: process.env.LOGBOOK_DB_USER || 'root',
  password: process.env.LOGBOOK_DB_PASSWORD || '',
  database: process.env.LOGBOOK_DB_NAME || 'log_book_db',
  waitForConnections: true,
  connectionLimit: 1,
  queueLimit: 0,
});

export default logBookPool;