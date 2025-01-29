import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import SignAndResignMain from '../../components/ComplexComponents/SignAndResignMain/SignAndResignMain';
import SignAndResignSection from '../../components/ComplexComponents/SignAndResignSection/SignAndResignSection';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

import { useTranslation } from 'react-i18next';

const SignAndResign = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.signAndResign')}</title>
        <meta name="description" content="Описание компании Берлио" />
        <meta name="keywords" content="Берлио, Новости" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <SignAndResignMain />
      <SignAndResignSection />
      <Footer />
      <SecondaryFooter />
    </>
  );
};

export default SignAndResign;