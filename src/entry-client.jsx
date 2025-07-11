import React from 'react';
import ReactDOM from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const rootElement = document.getElementById('root');
const helmetContext = {};

// Читаем флаг, который сервер вставил в глобальный объект
const shouldHydrate = window.__HYDRATE__ ?? true; // по умолчанию true, чтобы не сломать

if (shouldHydrate) {
  hydrateRoot(
    rootElement,
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
}
