import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ruRaw from './locales/ru.json';
import byRaw from './locales/by.json';
import enRaw from './locales/en.json';

const ru = ruRaw.default || ruRaw;
const by = byRaw.default || byRaw;
const en = enRaw.default || enRaw;

// Настройка ресурсов
const resources = {
  ru: { translation: ru },
  en: { translation: en },
  by: { translation: by },
};

i18n
  .use(LanguageDetector) // Определяет язык браузера
  .use(initReactI18next) // Связывает i18n с React
  .init({
    resources,
    fallbackLng: 'ru', // Язык по умолчанию
    interpolation: {
      escapeValue: false, // React уже экранирует данные
    },
  });

export default i18n;
