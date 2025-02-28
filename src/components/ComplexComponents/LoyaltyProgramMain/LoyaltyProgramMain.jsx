import React from "react";
import { Link } from "react-router-dom";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import "../../../styles/components/ComplexComponents/LoyaltyProgramMain.scss";

import { useTranslation } from "react-i18next";

const LoyaltyProgramMain = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_loyalty-program-main">
            {/* Breadcrumbs */}
            <div className="aam_loyalty-program-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/partners">{t('breadCrumbs.forPartners')}</Link> /{' '}
                {t('breadCrumbs.loyaltyProgram')}
            </div>

            {/* Title */}
            <h1 className="aam_loyalty-program-main__header">{t('loyaltyProgramMain.name')}</h1>

            {/* Description */}
            <div className="aam_loyalty-program-main__content">
                <div className="aam_loyalty-program-main__description">{t('loyaltyProgramMain.descr1')}</div>
                <div className="aam_loyalty-program-main__description">
                    <strong>{t('loyaltyProgramMain.descrHeader2')}</strong>
                    <ul>
                        <li>{t('loyaltyProgramMain.descr2.item1')}</li>
                        <li>{t('loyaltyProgramMain.descr2.item2')}</li>
                        <li>{t('loyaltyProgramMain.descr2.item3')}</li>
                        <li>{t('loyaltyProgramMain.descr2.item4')}</li>
                        <li>{t('loyaltyProgramMain.descr2.item5')}</li>
                        <li>{t('loyaltyProgramMain.descr2.item6')}</li>
                    </ul>
                </div>
                <div className="aam_loyalty-program-main__description">
                    <strong>{t('loyaltyProgramMain.descrHeader3')}</strong>
                    <span>{t('loyaltyProgramMain.descr3')}</span>
                </div>
                <div className="aam_loyalty-program-main__description">{t('loyaltyProgramMain.descr4')}</div>
                <div className="aam_loyalty-program-main__description">{t('loyaltyProgramMain.descr5')}</div>
                <div className="aam_loyalty-program-main__description">{t('loyaltyProgramMain.descr6')}</div>
                <div className="aam_loyalty-program-main__description">{t('loyaltyProgramMain.descr7')}</div>
                <div className="aam_loyalty-program-main__description">{t('loyaltyProgramMain.descr8')}</div>
                <div className="aam_loyalty-program-main__description">
                    <strong>{t('loyaltyProgramMain.descrHeader9')}</strong>
                    <ul>
                        <li>{t('loyaltyProgramMain.descr9.item1')}</li>
                        <li>{t('loyaltyProgramMain.descr9.item2')}</li>
                        <li>{t('loyaltyProgramMain.descr9.item3')}</li>
                        <li>{t('loyaltyProgramMain.descr9.item4')}</li>
                        <li>{t('loyaltyProgramMain.descr9.item5')}</li>
                        <li>{t('loyaltyProgramMain.descr9.item6')}</li>
                    </ul>
                </div>
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_loyalty-program-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("loyaltyProgramMain.homeLink")}
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
                    {t("loyaltyProgramMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default LoyaltyProgramMain;