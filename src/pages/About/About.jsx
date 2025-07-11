import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import MainAbout from '../../components/ComplexComponents/MainAbout/MainAbout';
import SystemSection from '../../components/ComplexComponents/SystemSection/SystemSection';
import SystemPurposeSection from '../../components/ComplexComponents/SystemPurposeSection/SystemPurposeSection';
import ClientPartnersServicesSection from '../../components/ComplexComponents/ClientPartnersServicesSection/ClientPartnersServicesSection';
import LogoSection from '../../components/ComplexComponents/LogoSection/LogoSection';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

import partnersLogos from '../../data/partnersLogoData.json';

function About() {
  const { t } = useTranslation();

  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.about')}</title>
        <meta name="description" content="Описание компании Берлио" />
        <meta name="keywords" content="Берлио, О Берлио" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <MainAbout />
      <SystemSection />
      <SystemPurposeSection />
      <ClientPartnersServicesSection />
      <LogoSection
        title={t('ourPartnersLogoSection.name')}
        logos={partnersLogos.logos}
        logoBasePath="/assets/images/"
      />
      <Footer />
      <SecondaryFooter />
    </>
  );
}

export default About;
