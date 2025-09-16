import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderPage } from './ssr/render.js';
import { generateSitemap } from './utils/generateSitemap.js';
import cookie from 'cookie';

import cookieConsentRoute from './routes/api/save-cookie-consent.js';
import loginRoute from './routes/api/login.js';
import adminRoute from './routes/api/admin.js';
import adminsRoute from './routes/api/admin-users.js';
import newsRoute from './routes/api/admin-news.js';
import sqlExplorerRoutes from './routes/api/sql-explorer.js';
import uploadRouter from './routes/api/~upload.js';

import logBookLoginRoute from './routes/api/log-book-login.js';
import logBookRoutes from './routes/api/log-book.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverStartedAt = new Date().toISOString();
const app = express();
const clientDist = path.resolve(__dirname, '../dist/client');

// 1. JSON-парсер
app.use(express.json());

// 2. API endpoints
app.use('/api/cookie-consent', cookieConsentRoute);
app.use('/api/login', loginRoute);
app.use('/api/admin', adminRoute);
app.use('/api/admin', adminsRoute);
app.use('/api/admin', newsRoute);
app.use('/api/sql-explorer', sqlExplorerRoutes);
app.use('/upload', uploadRouter);

// 2.1 API endpoints для Журнала
app.use('/api/log-book-login', logBookLoginRoute);
app.use('/api/log-book', logBookRoutes);

// 3. Отдаём ассеты и фавикон напрямую
app.use('/assets', express.static(path.join(clientDist, 'assets')));
app.use('/favicon.svg', express.static(path.join(clientDist, 'favicon.svg')));
app.use('/favicon.ico', express.static(path.join(clientDist, 'favicon.ico')));
app.use('/data/newsData.json', express.static(path.join(clientDist, 'data/newsData.json')));

// 4. Генерация sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  try {
    const xml = generateSitemap(serverStartedAt);
    res.status(200).type('application/xml').send(xml);
  } catch (err) {
    console.error('Sitemap generation failed:', err);
    res.status(500).send('Internal Server Error');
  }
});

// 5. Генерация robots.txt
app.get('/robots.txt', (req, res) => {
  const robotsContent = `
User-agent: *
Disallow: /administrator

Sitemap: http://new.berlio.by/sitemap.xml
  `.trim();

  res.type('text/plain').send(robotsContent);
});

// 6. SSR для HTML-запросов
app.get('*', async (req, res, next) => {
  const url = req.originalUrl;

  if (/\.(ico|png|jpe?g|gif|svg|woff2?|ttf|eot|otf|webm|mp4)$/i.test(url)) {
    return next();
  }

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const lang = cookies.lang || 'ru';
    console.log('SSR rendering:', url, '| lang:', lang);

    const html = await renderPage(url, lang);
    res.status(200).type('text/html').end(html);
  } catch (err) {
    console.error('SSR error:', err.stack || err);
    res.status(500).end('<!-- SSR Error -->');
  }
});

// 7. Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ SSR server running at http://localhost:${port}`);
});
