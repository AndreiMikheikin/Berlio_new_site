import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';
import PrivacyMain from '../../components/ComplexComponents/PrivacyMain/PrivacyMain';

function Privacy() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.privacy')}</title>
        <meta name="description" content="Описание политик обработки персональных данных компанией Берлио" />
        <meta name="keywords" content="Берлио, Конфиденциальность, Обработка персональных данных" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <PrivacyMain />
      <Footer />
      <SecondaryFooter />
    </>
  );
}

export default Privacy;