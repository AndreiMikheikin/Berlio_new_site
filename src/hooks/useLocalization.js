import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const useLocalization = () => {
  const { i18n } = useTranslation();

  const switchLocale = (newLocale) => {
    i18n.changeLanguage(newLocale);
  };

  // Обновление тайтла при смене языка
  useEffect(() => {
    const updateTitle = () => {
      const path = window.location.pathname;
      const titleKey = `pageTitles.${path}`;
      const title = i18n.t(titleKey);
      document.title = title;
    };

    // Обновляем заголовок сразу, если переводы уже загружены
    if (i18n.isInitialized) {
      updateTitle();
    }

    // Подписываемся на событие инициализации i18next
    i18n.on('initialized', updateTitle);

    // Отписываемся от события при размонтировании компонента
    return () => {
      i18n.off('initialized', updateTitle);
    };
  }, [i18n, i18n.language]); // Добавляем i18n в зависимости

  return { locale: i18n.language, switchLocale };
};

export default useLocalization;