import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import WorkWithPrivateAccountMain from '../../components/ComplexComponents/WorkWithPrivateAccountMain/WorkWithPrivateAccountMain';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

function WorkWithPrivateAccount() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.workWithPrivateAccount')}</title>
        <meta name="description" content="Описание производимого оборудования и выпускаемого программного обеспечения" />
        <meta name="keywords" content="Берлио, Оборудование, Программное обеспечение" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <WorkWithPrivateAccountMain />
      <Footer />
      <SecondaryFooter />
    </>
  );
}

export default WorkWithPrivateAccount;
