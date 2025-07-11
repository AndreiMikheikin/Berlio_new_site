import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from './i18n/serverI18n';

export async function render(url, initialLang = 'ru') {
  try {
    if (i18n.language !== initialLang) {
      await i18n.changeLanguage(initialLang);
    }

    const helmetContext = {};

    const appHtml = renderToString(
      <I18nextProvider i18n={i18n}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </I18nextProvider>
    );

    const { helmet } = helmetContext;

    const head = `
      ${helmet.title?.toString() || ''}
      ${helmet.meta?.toString() || ''}
      ${helmet.link?.toString() || ''}
    `;

    return { html: appHtml, head, hydrate: true, lang: i18n.language };
  } catch (error) {
    console.error('🔥 SSR render error:', error.stack || error);
    throw error; // пробрасываем ошибку, Express покажет <!-- SSR Error -->
  }
}
