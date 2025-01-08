import { useTranslation } from 'react-i18next';

const useLocalization = () => {
  const { i18n } = useTranslation();

  const switchLocale = (newLocale) => {
    i18n.changeLanguage(newLocale).then(() => {
      window.location.reload(); // Перезагрузка страницы после смены языка
    });
  };

  return { locale: i18n.language, switchLocale };
};

export default useLocalization;
