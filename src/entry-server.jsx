import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { PassThrough } from 'stream';
import i18n from './i18n/serverI18n';
import App from './App';

export async function render(url, initialLang = 'ru') {
  try {
    if (i18n.language !== initialLang) {
      await i18n.changeLanguage(initialLang);
    }

    const helmetContext = {};

    return new Promise((resolve, reject) => {
      const stream = new PassThrough();
      let html = '';

      const { pipe, abort } = renderToPipeableStream(
        <I18nextProvider i18n={i18n}>
          <HelmetProvider context={helmetContext}>
            <StaticRouter location={url}>
              <App />
            </StaticRouter>
          </HelmetProvider>
        </I18nextProvider>,
        {
          onAllReady() {
            pipe(stream);
          },
          onShellError(error) {
            reject(error);
          },
          onError(error) {
            console.error('SSR streaming error:', error);
          },
        }
      );

      stream.on('data', chunk => {
        html += chunk.toString();
      });

      stream.on('end', () => {
        const { helmet } = helmetContext;
        const head = `
          ${helmet.title?.toString() || ''}
          ${helmet.meta?.toString() || ''}
          ${helmet.link?.toString() || ''}
        `;

        resolve({
          html,
          head,
          hydrate: true,
          lang: i18n.language,
        });
      });

      setTimeout(() => abort(), 10000); // safety timeout
    });
  } catch (error) {
    console.error('🔥 SSR render error:', error.stack || error);
    throw error; // пробрасываем ошибку, Express покажет <!-- SSR Error -->
  }
}
