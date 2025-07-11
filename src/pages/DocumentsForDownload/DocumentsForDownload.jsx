import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import DocumentsForDownloadMain from '../../components/ComplexComponents/DocumentsForDownloadMain/DocumentsForDownloadMain';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

function DocumentsForDownload() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.documentsForDownload')}</title>
        <meta name="description" content="Описание производимого оборудования и выпускаемого программного обеспечения" />
        <meta name="keywords" content="Берлио, Оборудование, Программное обеспечение" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <DocumentsForDownloadMain />
      <Footer />
      <SecondaryFooter />
    </>
  );
}

export default DocumentsForDownload;
