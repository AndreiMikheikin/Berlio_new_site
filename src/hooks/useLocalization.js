import { useTranslation } from 'react-i18next';

const useLocalization = () => {
  const { i18n } = useTranslation();

  const switchLocale = (newLocale) => {
    i18n.changeLanguage(newLocale); // Меняет язык i18next
  };

  return { locale: i18n.language, switchLocale };
};

export default useLocalization;
