import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from '../locales/en.json';
import translationRu from '../locales/ru.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru', // по умолчанию
    fallbackLng: 'en',
    resources: {
      en: { translation: translationEn },
      ru: { translation: translationRu },
    },
    interpolation: { escapeValue: false },
    initImmediate: false, // важно для SSR
  });

export default i18n;