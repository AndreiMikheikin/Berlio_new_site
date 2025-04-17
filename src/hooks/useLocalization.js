import { useTranslation } from 'react-i18next';

const useLocalization = () => {
  const { i18n, t } = useTranslation();

  const switchLocale = async (newLocale) => {
    await i18n.changeLanguage(newLocale);
  };

  return { 
    locale: i18n.language, 
    switchLocale,
    t,
  };
};

export default useLocalization;