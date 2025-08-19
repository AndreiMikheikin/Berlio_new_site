import React from "react";
import { Outlet, Link } from "react-router-dom";
import PrivacyMenu from "../../PrivacyMenu/PrivacyMenu";
import { useTranslation } from "react-i18next";
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import '../../../styles/components/ComplexComponents/PrivacyMain.scss';

const PrivacyMain = () => {
    const { t } = useTranslation();

    const menuItems = [
        { label: t('privacyMain.cookieConsentPolicy'), to: '/privacy/cookie-consent-policy' },
        { label: t('privacyMain.buyersPrivacy'), to: '/privacy/buyers-policy' },
        { label: t('privacyMain.b2bPrivacy'), to: '/privacy/b2b-policy' },
        { label: t('privacyMain.applicantsPrivacy'), to: '/privacy/applicants-policy' },
    ];

    return (
        <main className="aam_privacy">
            {/* Breadcrumbs */}
            <div className="aam_privacy__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link>
                {' '}
                /
                {' '}
                {t('breadCrumbs.privacy')}
            </div>

            {/* Title */}
            <h1 className="aam_privacy__header">{t('privacyMain.name')}</h1>

            {/* Основной блок: меню + контент */}
            <div className="aam_privacy__wrapper">
                <aside className="aam_privacy__wrapper-tools">
                    <PrivacyMenu items={menuItems} />
                </aside>

                <section className="aam_privacy__wrapper-outlet">
                    <Outlet />
                </section>
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_privacy__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t('privacyMain.homeLink')}
                </Link>
                <button
                    type="button"
                    onClick={() => {
                        const element = document.getElementById('header');
                        if (element) {
                            element.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            });
                        }
                    }}
                    className="secondary-link"
                >
                    <UpArrowInCircleIcon className="icon" />
                    {t('privacyMain.upLink')}
                </button>
            </div>
        </main>
    );
}

export default PrivacyMain;