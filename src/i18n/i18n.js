import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector'; — временно убираем

import ruRaw from '../locales/ru.json';
import byRaw from '../locales/by.json';
import enRaw from '../locales/en.json';

const ru = ruRaw.default || ruRaw;
const by = byRaw.default || byRaw;
const en = enRaw.default || enRaw;

const resources = {
  ru: { translation: ru },
  en: { translation: en },
  by: { translation: by },
};

// Определим язык до инициализации
let initialLang = 'ru';

if (typeof window !== 'undefined') {
  // 1. Из SSR
  if (window.__I18N__) {
    initialLang = window.__I18N__;
  }
  // 2. Или fallback на localStorage
  else if (localStorage.getItem('i18nextLng')) {
    initialLang = localStorage.getItem('i18nextLng');
  }
  // 3. Или fallback на браузерный язык
  else if (navigator.language) {
    initialLang = navigator.language.split('-')[0]; // например, 'en-US' → 'en'
  }
}

i18n
  //.use(LanguageDetector) — временно выключаем
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
