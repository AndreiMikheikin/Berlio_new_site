import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header'

const News = () => {
  
  return (
    <>
      {/* Мета-теги и заголовок страницы */}
      <HelmetProvider>
        <title>НП ООО "Берлио" - Новости</title>
        <meta name="description" content="Описание компании Берлио" />
        <meta name="keywords" content="Берлио, Новости" />
        <meta name="author" content="AndreiMikheikin" />
      </HelmetProvider>

      {/* Содержимое страницы */}
      <Header />
    </>
  );
};

export default News;