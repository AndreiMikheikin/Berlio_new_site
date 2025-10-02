import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import ServiceInEPS from '../../components/ComplexComponents/ServiceInEPS/ServiceInEPS';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

function SignAndResign() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.serviceInEPS')}</title>
        <meta name="description" content="Описание компании Берлио" />
        <meta name="keywords" content="Берлио, Новости" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <ServiceInEPS />
      <Footer />
      <SecondaryFooter />
    </>
  );
}

export default SignAndResign;
