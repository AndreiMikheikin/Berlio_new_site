import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';
import ReportIFRMain from '../../components/ComplexComponents/ReportIFRMain/ReportIFRMain';

function ReportIFR() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.reportIFR')}</title>
        <meta name="description" content="Описание компании Берлио" />
        <meta name="keywords" content="Берлио, Новости" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <ReportIFRMain />
      <Footer />
      <SecondaryFooter />
    </>
  );
}

export default ReportIFR;
