import React from "react";
import { Link } from "react-router-dom";
import AppImage from "../../../assets/images/berlioCardPay.jpg";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import "../../../styles/components/ComplexComponents/BerlioCardPayMain.scss";

import { useTranslation } from "react-i18next";

const BerlioCardPayMain = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_berlio-card-pay-main">
            {/* Breadcrumbs */}
            <div className="aam_berlio-card-pay-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/equipment">{t('breadCrumbs.equipment')}</Link> /{' '}
                {t('breadCrumbs.berlioCardPay')}
            </div>

            {/* Title */}
            <h1 className="aam_berlio-card-pay-main__header">{t('berlioCardPayMain.name')}</h1>

            {/* Description */}
            <div className="aam_berlio-card-pay-main__wrapper">
                <img src={AppImage} alt="BerlioCardPayApp" className="aam_berlio-card-pay-main__wrapper-image" />
                <div className="aam_berlio-card-pay-main__wrapper--description">
                    <h3 className="aam_berlio-card-pay-main__wrapper--description-title">{t('berlioCardPayMain.description.title')}</h3>
                    <p className="aam_berlio-card-pay-main__wrapper--description-sub-title">{t('berlioCardPayMain.description.subTitle')}</p>
                    <p className="aam_berlio-card-pay-main__wrapper--description-list-title">{t('berlioCardPayMain.description.listTitle')}</p>
                    <ul>
                        <li>{t('berlioCardPayMain.description.item1')}</li>
                        <li>{t('berlioCardPayMain.description.item2')} <Link to="https://lkb.by" target="_blank">https://lkb.by</Link>{';'}</li>
                        <li>{t('berlioCardPayMain.description.item3')}</li>
                        <li>{t('berlioCardPayMain.description.item4')}</li>
                    </ul>
                </div>
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_berlio-card-pay-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("berlioCardPayMain.homeLink")}
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
                    {t("berlioCardPayMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default BerlioCardPayMain;