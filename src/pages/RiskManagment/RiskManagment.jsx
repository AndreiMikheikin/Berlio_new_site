import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';
import RiskManagmentMain from '../../components/ComplexComponents/RiskManagmentMain/RiskManagmentMain';

function RiskManagment() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.riskManagment')}</title>
        <meta name="description" content="Описание системы управления рисками" />
        <meta name="keywords" content="Берлио, Система управления рисками" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <RiskManagmentMain />
      <Footer />
      <SecondaryFooter />
    </>
  );
}

export default RiskManagment;
