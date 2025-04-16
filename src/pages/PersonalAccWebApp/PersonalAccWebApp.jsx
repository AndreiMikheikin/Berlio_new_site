import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import PersonalAccWebAppMain from '../../components/ComplexComponents/PersonalAccWebAppMain/PersonalAccWebAppMain';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

import { useTranslation } from 'react-i18next';

const PersonalAccWebApp = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.personalAccWebApp')}</title>
        <meta name="description" content="Описание производимого оборудования и выпускаемого программного обеспечения" />
        <meta name="keywords" content="Берлио, Оборудование, Программное обеспечение" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <PersonalAccWebAppMain />
      <Footer />
      <SecondaryFooter />
    </>
  );
};

export default PersonalAccWebApp;
