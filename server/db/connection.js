import 'dotenv/config';
import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'berlio_site_db',
  waitForConnections: true,
  connectionLimit: 1,
  queueLimit: 0,
});

/* const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}); */

export default pool;
