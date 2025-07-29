import fs from 'fs/promises';
import path from 'path';
import pool from '../db/connection.js';

const serverJsonPath = path.resolve('src', 'data', 'newsData.json');
const publicJsonPath = path.resolve('public', 'data', 'newsData.json');


export async function syncNewsJson() {
  try {
    const [newsRows] = await pool.query(`
      SELECT n.id, n.slug, n.priority, n.date, n.start_date AS startDate, n.expire_date AS expireDate,
             nt.language, nt.title, nt.description
      FROM news n
      LEFT JOIN news_translations nt ON n.id = nt.news_id
    `);

    // Структурируем данные в объект по id
    const newsMap = {};

    newsRows.forEach(row => {
      const id = row.id.toString();
      if (!newsMap[id]) {
        newsMap[id] = {
          slug: row.slug,
          priority: row.priority,
          dates: {
            date: row.date,
            startDate: row.startDate,
            expireDate: row.expireDate,
          },
          titles: {},
          descriptions: {},
        };
      }
      if (row.language) {
        newsMap[id].titles[row.language] = row.title;
        newsMap[id].descriptions[row.language] = row.description;
      }
    });

    const jsonContent = JSON.stringify(newsMap, null, 2);

    await fs.writeFile(serverJsonPath, jsonContent, 'utf-8');
    await fs.writeFile(publicJsonPath, jsonContent, 'utf-8');

  } catch (err) {
    console.error('Ошибка синхронизации newsData.json:', err);
    throw err;
  }
}
