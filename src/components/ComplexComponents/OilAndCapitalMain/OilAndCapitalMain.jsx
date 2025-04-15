import React from "react";
import { Link } from "react-router-dom";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import "../../../styles/components/ComplexComponents/OilAndCapitalMain.scss";

import { useTranslation } from "react-i18next";

const OilAndCapitalMain = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_oil-and-capital-main">
            {/* Breadcrumbs */}
            <div className="aam_oil-and-capital-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/equipment">{t('breadCrumbs.equipment')}</Link> /{' '}
                {t('breadCrumbs.oilAndCapital')}
            </div>

            {/* Title */}
            <h1 className="aam_oil-and-capital-main__header">{t('oilAndCapitalMain.name')}</h1>

            {/* Description */}
            <div className="aam_oil-and-capital-main__wrapper">
                <h3 className="aam_oil-and-capital-main__wrapper--title">{t('oilAndCapitalMain.list.title')}</h3>
                <span className="aam_oil-and-capital-main__wrapper--sub-title">{t('oilAndCapitalMain.list.subTitle')}</span>
                <ul className="aam_oil-and-capital-main__wrapper--list">
                    <li>{t('oilAndCapitalMain.list.item1')}</li>
                    <li>{t('oilAndCapitalMain.list.item2')}</li>
                    <li>{t('oilAndCapitalMain.list.item3')}</li>
                    <li>{t('oilAndCapitalMain.list.item4')}</li>
                    <li>{t('oilAndCapitalMain.list.item5')}</li>
                </ul>
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_oil-and-capital-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("oilAndCapitalMain.homeLink")}
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
                    {t("oilAndCapitalMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default OilAndCapitalMain;