import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';
import { SelectedItemProvider } from '../../contexts/SelectedItemContext';

import { useTranslation } from 'react-i18next';

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <>
      <SelectedItemProvider>
        <HelmetProvider>
          <Helmet>
            <title>НП ООО "Берлио" - Контакты</title>
            <meta name="description" content="Описание компании Берлио" />
            <meta name="keywords" content="Берлио, Контакты" />
            <meta name="author" content="AndreiMikheikin" />
          </Helmet>
        </HelmetProvider>

        <Header />
        <Navigation />
        <SearchInput placeholder={t('search')} />
        <Footer />
        <SecondaryFooter />
      </SelectedItemProvider>
    </>
  );
};

export default Contacts;
