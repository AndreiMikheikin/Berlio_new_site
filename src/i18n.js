import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './locales/ru';
import by from './locales/by';
import en from './locales/en';

// Настройка ресурсов
const resources = {
    ru,
    by,
    en,
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
