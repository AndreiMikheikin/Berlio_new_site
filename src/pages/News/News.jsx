import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';
import { useTranslation } from 'react-i18next';
import NewsBlock from '../../components/ComplexComponents/NewsBlock/NewsBlock';

const News = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pageTitles.news')}</title>
        <meta name="description" content="Описание новостей компании Берлио" />
        <meta name="keywords" content="Берлио, Новости" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <Header />
      <Navigation />
      <SearchInput placeholder={t('search')} />
      <NewsBlock />
      <Footer />
      <SecondaryFooter />
    </>
  );
};

export default News;
