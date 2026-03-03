import 'dotenv/config';
import mysql from "mysql2/promise";

const mailBookPool = mysql.createPool({
  host: process.env.MAILBOOK_DB_HOST,
  port: process.env.MAILBOOK_DB_PORT,
  user: process.env.MAILBOOK_DB_USER,
  password: process.env.MAILBOOK_DB_PASSWORD,
  database: process.env.MAILBOOK_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MailBook MySQL pool initialized");

export default mailBookPool;