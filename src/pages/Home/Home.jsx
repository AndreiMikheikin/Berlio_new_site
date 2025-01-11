import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/ComplexComponents/Header/Header';
import Navigation from '../../components/ComplexComponents/Navigation/Navigation';
import SearchInput from '../../components/SearchInput/SearchInput';
import MainBlock from '../../components/ComplexComponents/MainBlock/MainBlock';
import PaymentSystem from '../../components/ComplexComponents/PaymentSystem/PaymentSystem';
import FuelCards from '../../components/ComplexComponents/FuelCards/FuelCards';
import ActualSection from '../../components/ComplexComponents/ActualSection/ActualSection';
import Footer from '../../components/ComplexComponents/Footer/Footer';
import SecondaryFooter from '../../components/SecondaryFooter/SecondaryFooter';

import { useTranslation } from 'react-i18next';


const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('pageTitles.home')}</title>
                <meta name="description" content="Описание компании Берлио" />
                <meta name="keywords" content="Берлио, Главная" />
                <meta name="author" content="AndreiMikheikin" />
            </Helmet>

            <Header />
            <Navigation />
            <SearchInput placeholder={t('search')} />
            <MainBlock />
            <PaymentSystem />
            <FuelCards />
            <ActualSection />
            <Footer />
            <SecondaryFooter />
        </>
    );
};

export default Home;
