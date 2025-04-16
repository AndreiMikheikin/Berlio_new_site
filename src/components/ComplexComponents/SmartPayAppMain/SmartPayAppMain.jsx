import React from "react";
import { Link } from "react-router-dom";
import TunkImage from "../../../assets/images/smart-pay-app.jpg";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import "../../../styles/components/ComplexComponents/SmartPayAppMain.scss";

import { useTranslation } from "react-i18next";

const SmartPayAppMain = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_smart-pay-app-main">
            {/* Breadcrumbs */}
            <div className="aam_smart-pay-app-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/equipment">{t('breadCrumbs.equipment')}</Link> /{' '}
                {t('breadCrumbs.smartPayApp')}
            </div>

            {/* Title */}
            <h1 className="aam_smart-pay-app-main__header">{t('smartPayAppMain.name')}</h1>

            {/* Description */}
            <div className="aam_smart-pay-app-main__wrapper">
                <img src={TunkImage} alt="smartPayApp" className="aam_smart-pay-app-main__wrapper-image" />
                <div className="aam_smart-pay-app-main__wrapper--description">
                    <h3 className="aam_smart-pay-app-main__wrapper--description-title">{t('smartPayAppMain.description.title')}</h3>
                    <p className="aam_smart-pay-app-main__wrapper--description-sub-title">{t('smartPayAppMain.description.subTitle1')}</p>
                    <p className="aam_smart-pay-app-main__wrapper--description-sub-title">{t('smartPayAppMain.description.subTitle2')}</p>
                    <div><p className="aam_smart-pay-app-main__wrapper--description-list-title">{t('smartPayAppMain.description.listTitle')}</p>
                        <ul>
                            <li>{t('smartPayAppMain.description.item1')}</li>
                            <li>{t('smartPayAppMain.description.item2')}</li>
                        </ul>
                    </div>
                    <p className="aam_smart-pay-app-main__wrapper--description-sub-title">{t('smartPayAppMain.description.ps')}</p>
                </div>
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_smart-pay-app-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("smartPayAppMain.homeLink")}
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
                    {t("smartPayAppMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default SmartPayAppMain;