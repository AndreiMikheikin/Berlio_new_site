import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header'

const About = () => {
  
  return (
    <>
      {/* Мета-теги и заголовок страницы */}
      <HelmetProvider>
        <title>НП ООО "Берлио" - О компании</title>
        <meta name="description" content="Описание компании Берлио" />
        <meta name="keywords" content="Берлио, О компании" />
        <meta name="author" content="AndreiMikheikin" />
      </HelmetProvider>

      {/* Содержимое страницы */}
      <Header />
    </>
  );
};

export default About;
