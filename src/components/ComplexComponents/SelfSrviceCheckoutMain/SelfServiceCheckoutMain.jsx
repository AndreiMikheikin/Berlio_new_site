import React from "react";
import { Link } from "react-router-dom";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import "../../../styles/components/ComplexComponents/SelfServiceCheckoutMain.scss";

import { useTranslation } from "react-i18next";

const SelfServiceCheckoutMain = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_self-service-checkout-main">
            {/* Breadcrumbs */}
            <div className="aam_self-service-checkout-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/equipment">{t('breadCrumbs.equipment')}</Link> /{' '}
                {t('breadCrumbs.selfServiceCheckout')}
            </div>

            {/* Title */}
            <h1 className="aam_self-service-checkout-main__header">{t('selfServiceCheckoutMain.name')}</h1>

            {/* Description */}
            <div  className="aam_self-service-checkout-main__description">
                <p>{t('selfServiceCheckoutMain.descriptionFirst')}</p>
                <p>{t('selfServiceCheckoutMain.descriptionPreBold')}<strong>{t('selfServiceCheckoutMain.descriptionBold')}</strong> </p>
                <p>{t('selfServiceCheckoutMain.descriptionSecond')}</p>
            </div>

            <div className="aam_self-service-checkout-main__wrapper">
                <p className="aam_self-service-checkout-main__wrapper--sup-description">{t('selfServiceCheckoutMain.list1.supDescription')}</p>
                <ul className="aam_self-service-checkout-main__wrapper--list">
                    <li>{t('selfServiceCheckoutMain.list1.item1')}</li>
                    <li>{t('selfServiceCheckoutMain.list1.item2')}</li>
                    <li>{t('selfServiceCheckoutMain.list1.item3')}</li>
                    <li>{t('selfServiceCheckoutMain.list1.item4')}</li>
                    <li>{t('selfServiceCheckoutMain.list1.item5')}</li>
                </ul>
            </div>

            <div  className="aam_self-service-checkout-main__description">
                <p>{t('selfServiceCheckoutMain.descriptionThird')}</p>
                <p>{t('selfServiceCheckoutMain.descriptionFourth')}</p>
            </div>

            <div className="aam_self-service-checkout-main__wrapper">
                <p className="aam_self-service-checkout-main__wrapper--sup-description">{t('selfServiceCheckoutMain.list2.supDescription')}</p>
                <ul className="aam_self-service-checkout-main__wrapper--list">
                    <li>{t('selfServiceCheckoutMain.list2.item1')}</li>
                    <li>{t('selfServiceCheckoutMain.list2.item2')}</li>
                    <li>{t('selfServiceCheckoutMain.list2.item3')}</li>
                    <li>{t('selfServiceCheckoutMain.list2.item4')}</li>
                    <li>{t('selfServiceCheckoutMain.list2.item5')}</li>
                    <li>{t('selfServiceCheckoutMain.list2.item6')}</li>
                </ul>
                <p className="aam_self-service-checkout-main__wrapper--sub-description">{t('selfServiceCheckoutMain.list2.subDescription')}</p>
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_self-service-checkout-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("selfServiceCheckoutMain.homeLink")}
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
                    {t("selfServiceCheckoutMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default SelfServiceCheckoutMain;