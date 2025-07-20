import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Читаем manifest
const ssrManifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../dist/client/.vite/manifest.json'), 'utf-8')
);

// Шаблон SSR
const templateHtml = fs.readFileSync(
  path.resolve(__dirname, '../../src/index.ssr.html'),
  'utf-8'
);

// Импорт модуля отрисовки
const entryServerPath = path.resolve(__dirname, '../../dist/server/entry-server.js');
const renderModule = await import(pathToFileURL(entryServerPath).href);
const render = renderModule.render ?? renderModule.default;

if (typeof render !== 'function') {
  throw new Error('render is not a function after import');
}

export async function renderPage(url, initialLang = 'ru') {
  try {
    const result = await render(url, initialLang);

    if (!result || typeof result.html !== 'string') {
      throw new Error('render(url) did not return expected object with { html }');
    }

    const {
      html: appHtml,
      head = '',
      hydrate = true,
      lang = initialLang,
    } = result;

    const clientEntry = ssrManifest['src/index.html'];
    if (!clientEntry) {
      console.error('Manifest keys:', Object.keys(ssrManifest));
      throw new Error('Cannot find "src/index.html" in manifest!');
    }

    const jsFile = clientEntry.file;
    const cssFiles = clientEntry.css || [];

    // Добавляем noindex для /administrator
    const headWithNoIndex = url === '/administrator'
      ? head + '\n<meta name="robots" content="noindex, nofollow">'
      : head;

    return templateHtml
      .replace('<!--helmet-head-->', headWithNoIndex)
      .replace('<!--app-html-->', appHtml)
      .replace(
        '<!--preload-links-->',
        [
          ...cssFiles.map(file => `<link rel="stylesheet" href="/${file}">`),
          hydrate ? `<script type="module" src="/${jsFile}"></script>` : '',
        ].filter(Boolean).join('\n')
      )
      .replace('__HYDRATE_FLAG__', hydrate ? 'true' : 'false')
      .replace('__I18N_LANG__', JSON.stringify(lang))
      .replace('__I18N_LANG_SHORT__', lang.split('-')[0] || 'ru');
  } catch (err) {
    console.error('Error in render():', err.stack || err);
    throw err;
  }
}
