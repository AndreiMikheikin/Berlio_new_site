import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import { SelectedItemProvider } from '../../contexts/SelectedItemContext';

import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    return (
        <SelectedItemProvider>
            <HelmetProvider>
                <Helmet>
                    <title>НП ООО "Берлио" - Главная</title>
                    <meta name="description" content="Описание компании Берлио" />
                    <meta name="keywords" content="Берлио, Главная" />
                    <meta name="author" content="AndreiMikheikin" />
                </Helmet>
                <Header />
                <Navigation />
                <SearchInput placeholder={t('search')} />
                <Footer />
            </HelmetProvider>
        </SelectedItemProvider>
    );
};

export default Home;
