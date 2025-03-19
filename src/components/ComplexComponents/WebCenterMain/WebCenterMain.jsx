import React from "react";
import { Link } from "react-router-dom";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import "../../../styles/components/ComplexComponents/WebCenterMain.scss";

import { useTranslation } from "react-i18next";

const WebCenterMain = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_web-center-main">
            {/* Breadcrumbs */}
            <div className="aam_web-center-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/partners">{t('breadCrumbs.equipment')}</Link> /{' '}
                {t('breadCrumbs.webCenter')}
            </div>

            {/* Title */}
            <h1 className="aam_web-center-main__header">{t('webCenterMain.name')}</h1>

            {/* Description */}
            <p className="aam_web-center-main__description">{t('webCenterMain.description')}</p>

            {/* Advantages */}
            <div className="aam_web-center-main__wrapper">
                <h3 className="aam_web-center-main__wrapper--title">{t('webCenterMain.list1.title')}</h3>
                <ul className="aam_web-center-main__wrapper--list">
                    <li>{t('webCenterMain.list1.item1')}</li>
                    <li>{t('webCenterMain.list1.item2')}</li>
                    <li>{t('webCenterMain.list1.item3')}</li>
                    <li>{t('webCenterMain.list1.item4')}</li>
                    <li>{t('webCenterMain.list1.item5')}</li>
                    <li>{t('webCenterMain.list1.item6')}</li>
                    <li>{t('webCenterMain.list1.item7')}</li>
                    <li>{t('webCenterMain.list1.item8')}</li>
                </ul>
            </div>

            {/* With Clients Functions */}
            <div className="aam_web-center-main__wrapper">
                <h3 className="aam_web-center-main__wrapper--title">{t('webCenterMain.list2.title')}</h3>
                <ul className="aam_web-center-main__wrapper--list">
                    <li>{t('webCenterMain.list2.item1')}</li>
                    <li>{t('webCenterMain.list2.item2')}</li>
                    <li>{t('webCenterMain.list2.item3')}</li>
                    <li>{t('webCenterMain.list2.item4')}</li>
                    <li>{t('webCenterMain.list2.item5')}</li>
                    <li>{t('webCenterMain.list2.item6')}</li>
                </ul>
            </div>

            {/* With Partners Functions */}
            <div className="aam_web-center-main__wrapper">
                <h3 className="aam_web-center-main__wrapper--title">{t('webCenterMain.list3.title')}
                    <span>{t('webCenterMain.list3.subTitle')}</span>
                </h3>
                <ul className="aam_web-center-main__wrapper--list">
                    <li>{t('webCenterMain.list3.item1')}</li>
                    <li>{t('webCenterMain.list3.item2')}</li>
                    <li>{t('webCenterMain.list3.item3')}</li>
                </ul>
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_web-center-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("webCenterMain.homeLink")}
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
                    {t("webCenterMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default WebCenterMain;