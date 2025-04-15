import React from "react";
import { Link } from "react-router-dom";
import '../../../styles/components/ComplexComponents/BerlioInternetClientAppMain.scss';
import iphoneBIC from '../../../assets/images/iphone-berliointernetclient.png';
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import ServiceCard from "../../ServiceCard/ServiceCard";
import AppStoreIcon from "../../SVGIcons/AppleStoreIcon";
import PlayMarketIcon from "../../SVGIcons/PlayMarketIcon";

import { useTranslation } from "react-i18next";

const BerlioInternetClientAppMain = () => {
    const { t } = useTranslation();

    const handlePlayClick = () => {
        window.open("https://play.google.com/store/apps/details?id=by.berlio.trueClient", "_blank", "noopener,noreferrer");
        console.log('Загрузка Берлио Интернет Клиент с PlayMarket');
    };
    
    const handleAppleClick = () => {
        window.open("https://apps.apple.com/ru/app/berlio-internet-client/id1228629688?ls=1", "_blank", "noopener,noreferrer");
        console.log('Загрузка Берлио Интернет Клиент с AppStore');
    };

    return (
        <main className="aam_bic-app-main">
            {/* Breadcrumbs */}
            <div className="aam_bic-app-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/equipment">{t('breadCrumbs.equipment')}</Link> /{' '}
                {t('breadCrumbs.bicApp')}
            </div>

            {/* Title */}
            <h1 className="aam_bic-app-main__header">{t('bicAppMain.name')}</h1>

            {/* Description */}
            <div className="aam_bic-app-main__description">
                <p>{t('bicAppMain.description')}</p>
                <p><strong>{t('bicAppMain.ulHeader')}</strong></p>
                <ul>
                    <li>{t('bicAppMain.item1')}</li>
                    <li>{t('bicAppMain.item2')}</li>
                    <li>{t('bicAppMain.item3')}</li>
                    <li>{t('bicAppMain.item4')}</li>
                    <li>{t('bicAppMain.item5')}</li>
                    <li>{t('bicAppMain.item6')}</li>
                    <li>{t('bicAppMain.item7')}</li>
                </ul>
                <p><strong>{t('bicAppMain.stong1')}</strong></p>
                <p><strong>{t('bicAppMain.stong2')}</strong></p>
                <p><strong>{t('bicAppMain.stong3')}</strong></p>
                <p><strong>{t('bicAppMain.stong4')}</strong></p>
            </div>

            {/* Markets Links */}
            <div className="aam_bic-app-main__links">
                <ServiceCard
                    className="aam_bic-app-main__service-card"
                    Icon={PlayMarketIcon}
                    title={t('bicAppMain.cardTitle1')}
                    description=''
                    link=''
                    onClick={() =>
                        handlePlayClick(
                            t('bicAppMain.cardTitle1'),
                            `#1`
                        )
                    }
                />
                <img src={iphoneBIC} alt="Berlio Internet Client" />
                <ServiceCard
                    className="aam_bic-app-main__service-card"
                    Icon={AppStoreIcon}
                    title={t('bicAppMain.cardTitle2')}
                    description=''
                    link=''
                    onClick={() =>
                        handleAppleClick(
                            t('bicAppMain.cardTitle2'),
                            `#2`
                        )
                    }
                />
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_bic-app-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("bicAppMain.homeLink")}
                </Link>
                <button
                    onClick={() => {
                        const element = document.getElementById("header");
                        if (element) {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        }
                    }}
                    className="secondary-link"
                >
                    <UpArrowInCircleIcon className="icon" />
                    {t("bicAppMain.upLink")}
                </button>
            </div>
        </main>
    )
};

export default BerlioInternetClientAppMain;