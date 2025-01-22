import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import ForPartnersMain from '../../components/ComplexComponents/ForPartnersMain/ForPartnersMain';
import PartnersAdvantagesSection from '../../components/ComplexComponents/PartnersAdvantagesSection/PartnersAdvantagesSection';
import FAQSection from '../../components/ComplexComponents/FAQSection/FAQSection';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

import { useTranslation } from 'react-i18next';

const ForPartners = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.forPartners')}</title>
        <meta name="description" content="Описание производимого оборудования и выпускаемого программного обеспечения, предоставляемого партнерам" />
        <meta name="keywords" content="Берлио, Для партнеров, Оборудование, Программное обеспечение" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <ForPartnersMain />
      <PartnersAdvantagesSection />
      <FAQSection category="partnersFAQ" />
      <Footer />
      <SecondaryFooter />
    </>
  );
};

export default ForPartners;
