import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';
import { SelectedItemProvider } from '../../contexts/SelectedItemContext';

import { useTranslation } from 'react-i18next';

const Equipment = () => {
  const { t } = useTranslation();

  return (
    <>
      <SelectedItemProvider>
        <HelmetProvider>
          <Helmet>
            <title>НП ООО "Берлио" - Оборудование и ПО</title>
            <meta name="description" content="Описание производимого оборудования и выпускаемого программного обеспечения" />
            <meta name="keywords" content="Берлио, Оборудование, Программное обеспечение" />
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

export default Equipment;
