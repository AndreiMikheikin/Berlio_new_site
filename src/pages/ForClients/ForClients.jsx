import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import ForClientsMain from '../../components/ComplexComponents/FotClientsMain/ForClientsMain';
import ClientsAdvantagesSection from '../../components/ComplexComponents/ClientsAdvantagesSection/ClientsAdvantagesSection';
import FAQSection from '../../components/ComplexComponents/FAQSection/FAQSection';
import LogoSection from '../../components/ComplexComponents/LogoSection/LogoSection';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

import partnersLogos from '../../data/partnersLogoData.json';

function ForClients() {
  const { t } = useTranslation();

  const isProduction = process.env.NODE_ENV === 'production';

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
      <ClientsAdvantagesSection />
      <FAQSection category="clientsFAQ" />
      <LogoSection
        title={t('ourClientsLogoSection')}
        logos={partnersLogos.logos}
        logoBasePath="/assets/images/"
      />
      <Footer />
      <SecondaryFooter />
    </>
  );
}

export default ForClients;
