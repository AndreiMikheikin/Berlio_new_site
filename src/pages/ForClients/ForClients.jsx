import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import ForClientsMain from '../../components/ComplexComponents/FotClientsMain/ForClientsMain';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

import { useTranslation } from 'react-i18next';


const ForClients = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.forClients')}</title>
        <meta name="description" content="Описание услуг и программного обеспечения, предоставляемых клиентам" />
        <meta name="keywords" content="Берлио, Для клиентов, Услуги, Программное обеспечение" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <ForClientsMain />
      <Footer />
      <SecondaryFooter />
    </>
  );
};

export default ForClients;
