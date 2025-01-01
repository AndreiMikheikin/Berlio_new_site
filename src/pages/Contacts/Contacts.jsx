import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header'

const Contacts = () => {
  
  return (
    <>
      {/* Мета-теги и заголовок страницы */}
      <HelmetProvider>
        <title>НП ООО "Берлио" - Контакты</title>
        <meta name="description" content="Описание компании Берлио" />
        <meta name="keywords" content="Берлио, Контакты" />
        <meta name="author" content="AndreiMikheikin" />
      </HelmetProvider>

      {/* Содержимое страницы */}
      <Header />
    </>
  );
};

export default Contacts;
