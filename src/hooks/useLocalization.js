import { useTranslation } from 'react-i18next';

const useLocalization = () => {
  const { i18n, t } = useTranslation();

  const switchLocale = async (newLocale) => {
    if (i18n.language !== newLocale) {
    try {
      await i18n.changeLanguage(newLocale);

      // Сохраняем в localStorage для клиента
      localStorage.setItem('i18nextLng', newLocale);

      // И в cookie для SSR
      document.cookie = `lang=${newLocale}; path=/; max-age=31536000`; // 1 год
    } catch (e) {
      console.error('Ошибка смены языка:', e);
    }
  }
  };

  return {
    locale: i18n.language || 'ru', // на всякий случай дефолт
    switchLocale,
    t,
  };
};

export default useLocalization;
