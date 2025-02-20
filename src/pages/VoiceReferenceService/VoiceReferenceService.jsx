import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import VoiceReferenceServiceMain from '../../components/ComplexComponents/VoiceReferenceServiceMain/VoiceReferenceServiceMain';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

import { useTranslation } from 'react-i18next';

const VoiceReferenceService = () => {
    const { t } = useTranslation();
  
    return (
      <>
        <Helmet>
          <title>{t('pageTitles.voiceRefService')}</title>
          <meta name="description" content="Описание компании Берлио" />
          <meta name="keywords" content="Берлио, Контакты" />
          <meta name="author" content="AndreiMikheikin" />
        </Helmet>
  
        <Header />
        <Navigation />
        <SearchInput placeholder={t('search')} />
        <VoiceReferenceServiceMain />
        <Footer />
        <SecondaryFooter />
      </>
    );
  };
  
  export default VoiceReferenceService;