import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';
import LocalActs from '../../components/ComplexComponents/LocalActs/LocalActs';

function LocalActsInEPS() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.localActs')}</title>
        <meta name="description" content="Локально-правовые акты" />
        <meta name="keywords" content="Берлио, Документы, ЛПА" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <LocalActs />
      <Footer />
      <SecondaryFooter />
    </>
  );
}

export default LocalActsInEPS;
