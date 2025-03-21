import React from "react";
import { Link } from "react-router-dom";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import AutomationScheme from "../../../assets/images/Obshchaya-skhema-SA.png";
import "../../../styles/components/ComplexComponents/GSAutomationSystemMain.scss";

import { useTranslation } from "react-i18next";

const GSAutomationSystemMain = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_gs-automation-system-main">
            {/* Breadcrumbs */}
            <div className="aam_gs-automation-system-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/partners">{t('breadCrumbs.equipment')}</Link> /{' '}
                {t('breadCrumbs.gsAutomationSystem')}
            </div>

            {/* Title */}
            <h1 className="aam_gs-automation-system-main__header">{t('gsAutomationSystemMain.name')}</h1>
            <div className="aam_gs-automation-system-main__title">
                <h3 className="aam_gs-automation-system-main__title--sup">{t('gsAutomationSystemMain.supTitle')}</h3>
                <h2 className="aam_gs-automation-system-main__title--sub">{t('gsAutomationSystemMain.subTitle')}</h2>
            </div>

            {/* Description */}
            <div className="aam_gs-automation-system-main__description">
                <p>{t('gsAutomationSystemMain.descriptionFirst')}</p>
                <p>{t('gsAutomationSystemMain.descriptionSecond')}</p>
            </div>

            <div className="aam_gs-automation-system-main__wrapper">
                <h3 className="aam_gs-automation-system-main__wrapper--title">{t('gsAutomationSystemMain.list1.title')}</h3>
                <p className="aam_gs-automation-system-main__wrapper--sub-title">{t('gsAutomationSystemMain.list1.firstSubTitle')}<strong>{t('gsAutomationSystemMain.list1.firstSubTitleBold')}</strong></p>
                <p className="aam_gs-automation-system-main__wrapper--sub-title"><strong>{t('gsAutomationSystemMain.list1.secondSubTitleBold')}</strong>{t('gsAutomationSystemMain.list1.secondSubTitle')}</p>
                <div className="aam_gs-automation-system-main__wrapper--container">
                    <ul className="aam_gs-automation-system-main__wrapper--list">
                        <li>{t('gsAutomationSystemMain.list1.item1')}</li>
                        <li>{t('gsAutomationSystemMain.list1.item2')}</li>
                        <li>{t('gsAutomationSystemMain.list1.item3')}</li>
                        <li>{t('gsAutomationSystemMain.list1.item4')}</li>
                        <li>{t('gsAutomationSystemMain.list1.item5')}</li>
                        <li>{t('gsAutomationSystemMain.list1.item6')}</li>
                        <li>{t('gsAutomationSystemMain.list1.item7')}</li>
                        <li>{t('gsAutomationSystemMain.list1.item8')}</li>
                    </ul>
                    <div className="aam_gs-automation-system-main__image-wrapper">
                        <h2 className="aam_gs-automation-system-main__image-wrapper--image-title">{t('gsAutomationSystemMain.list1.imageTitle')}</h2>
                        <img src={AutomationScheme} alt={t('gsAutomationSystemMain.list1.imageAltAndTitle')} title={t('gsAutomationSystemMain.list1.imageAltAndTitle')} />
                    </div>
                </div>
            </div>

            <div className="aam_gs-automation-system-main__wrapper">
                <p className="aam_gs-automation-system-main__wrapper--sub-title">{t('gsAutomationSystemMain.list2.firstSubTitle')}<strong>{t('gsAutomationSystemMain.list2.firstSubTitleBold')}</strong></p>
                <p className="aam_gs-automation-system-main__wrapper--sub-title"><strong>{t('gsAutomationSystemMain.list2.secondSubTitleBold')}</strong>{t('gsAutomationSystemMain.list2.secondSubTitle')}</p>
            </div>

            <div className="aam_gs-automation-system-main__wrapper">
                <h3 className="aam_gs-automation-system-main__wrapper--title">{t('gsAutomationSystemMain.list3.title')}</h3>
                <p className="aam_gs-automation-system-main__wrapper--sub-title">{t('gsAutomationSystemMain.list3.firstSubTitle')}<strong>{t('gsAutomationSystemMain.list3.firstSubTitleBold')}</strong></p>
                <p className="aam_gs-automation-system-main__wrapper--sub-title"><strong>{t('gsAutomationSystemMain.list3.secondSubTitleBold')}</strong>{t('gsAutomationSystemMain.list3.secondSubTitle')}</p>
            </div>

            <div className="aam_gs-automation-system-main__wrapper">
                <p className="aam_gs-automation-system-main__wrapper--sub-title">{t('gsAutomationSystemMain.list4.firstSubTitle')}<strong>{t('gsAutomationSystemMain.list4.firstSubTitleBold')}</strong></p>
                <p className="aam_gs-automation-system-main__wrapper--sub-title"><strong>{t('gsAutomationSystemMain.list4.secondSubTitleBold')}</strong>{t('gsAutomationSystemMain.list4.secondSubTitle')}</p>
            </div>

            <div className="aam_gs-automation-system-main__wrapper">
                <p className="aam_gs-automation-system-main__wrapper--sub-title">{t('gsAutomationSystemMain.list5.firstSubTitle')}<strong>{t('gsAutomationSystemMain.list5.firstSubTitleBold')}</strong></p>
                <p className="aam_gs-automation-system-main__wrapper--sub-title"><strong>{t('gsAutomationSystemMain.list5.secondSubTitleBold')}</strong>{t('gsAutomationSystemMain.list5.secondSubTitle')}</p>
            </div>

            <div className="aam_gs-automation-system-main__wrapper">
                <p className="aam_gs-automation-system-main__wrapper--sub-title">{t('gsAutomationSystemMain.list6.firstSubTitle')}<strong>{t('gsAutomationSystemMain.list6.firstSubTitleBold')}</strong></p>
                <p className="aam_gs-automation-system-main__wrapper--sub-title"><strong>{t('gsAutomationSystemMain.list6.secondSubTitleBold')}</strong></p>
                <ul className="aam_gs-automation-system-main__wrapper--list">
                    <li>{t('gsAutomationSystemMain.list6.item1')}</li>
                    <li>{t('gsAutomationSystemMain.list6.item2')}</li>
                    <li>{t('gsAutomationSystemMain.list6.item3')}</li>
                    <li>{t('gsAutomationSystemMain.list6.item4')}</li>
                    <li>{t('gsAutomationSystemMain.list6.item5')}</li>
                    <li>{t('gsAutomationSystemMain.list6.item6')}</li>
                </ul>
            </div>

            <div className="aam_gs-automation-system-main__wrapper">
                <h3 className="aam_gs-automation-system-main__wrapper--title">{t('gsAutomationSystemMain.list7.title')}</h3>
                <ul className="aam_gs-automation-system-main__wrapper--list">
                    <li>{t('gsAutomationSystemMain.list7.item1')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item2')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item3')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item4')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item5')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item6')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item7')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item8')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item9')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item10')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item11')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item12')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item13')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item14')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item15')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item16')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item17')}</li>
                    <li>{t('gsAutomationSystemMain.list7.item18')}</li>
                </ul>
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_gs-automation-system-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("gsAutomationSystemMain.homeLink")}
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
                    {t("gsAutomationSystemMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default GSAutomationSystemMain;