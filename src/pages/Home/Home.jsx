import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header'
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';

const Home = () => {

  return (
    <>
      {/* Мета-теги и заголовок страницы */}
      <HelmetProvider>
        <title>НП ООО "Берлио" - Главная</title>
        <meta name="description" content="Описание компании Берлио" />
        <meta name="keywords" content="Берлио, Главная" />
        <meta name="author" content="AndreiMikheikin" />
      </HelmetProvider>

      {/* Содержимое страницы */}
      <Header />
      <Navigation />
    </>
  );
};

export default Home;
