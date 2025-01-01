import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header'

const ForPartners = () => {
  
  return (
    <>
      {/* Мета-теги и заголовок страницы */}
      <HelmetProvider>
        <title>НП ООО "Берлио" - Для партнеров</title>
        <meta name="description" content="Описание компании Берлио" />
        <meta name="keywords" content="Берлио, Для партнеров" />
        <meta name="author" content="AndreiMikheikin" />
      </HelmetProvider>

      {/* Содержимое страницы */}
      <Header />
    </>
  );
};

export default ForPartners;
