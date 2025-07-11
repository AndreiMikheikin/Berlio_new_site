import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { renderPage } from './ssr/render.js'
import { generateSitemap } from './utils/generateSitemap.js'
import cookie from 'cookie';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const serverStartedAt = new Date().toISOString()

const app = express()

const clientDist = path.resolve(__dirname, '../dist/client')

// 1. Отдаём ассеты и фавикон напрямую
app.use('/assets', express.static(path.join(clientDist, 'assets')))
app.use('/favicon.svg', express.static(path.join(clientDist, 'favicon.svg')))
app.use('/favicon.ico', express.static(path.join(clientDist, 'favicon.ico')))

// 2. Генерируем sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  try {
    const xml = generateSitemap(serverStartedAt)
    res
      .status(200)
      .set('Content-Type', 'application/xml')
      .send(xml)
  } catch (err) {
    console.error('Sitemap generation failed:', err)
    res.status(500).send('Internal Server Error')
  }
})

// 3. Генерируем robots.txt
app.get('/robots.txt', (req, res) => {
  const robotsContent = `
User-agent: *
Disallow:

Sitemap: http://new.berlio.by/sitemap.xml
  `.trim()

  res.type('text/plain').send(robotsContent)
})

// 4. SSR только для HTML-запросов
app.get('*', async (req, res, next) => {
  const url = req.originalUrl;

  // Пропускаем статику
  if (/\.(ico|png|jpe?g|gif|svg|woff2?|ttf|eot|otf|webm|mp4)$/i.test(url)) {
    return next();
  }

  try {
    // Парсим куки из заголовка
    const cookies = cookie.parse(req.headers.cookie || '');
    const lang = cookies.lang || 'ru';

    console.log('SSR rendering:', url, '| lang:', lang);

    const html = await renderPage(url, lang);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (err) {
    console.error('SSR error:', err.stack || err);
    res.status(500).end('<!-- SSR Error -->');
  }
});

// 5. Запуск сервера
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`✅ SSR server running at http://localhost:${port}`)
})
