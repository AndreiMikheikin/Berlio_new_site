import React from "react";
import { Link } from "react-router-dom";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import "../../../styles/components/ComplexComponents/VoiceReferenceServiceMain.scss";

import { useTranslation } from "react-i18next";

const VoiceReferenceServiceMain = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_voice-reference-service-main">
            {/* Breadcrumbs */}
            <div className="aam_voice-reference-service-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/partners">{t('breadCrumbs.forPartners')}</Link> /{' '}
                {t('breadCrumbs.voiceRefService')}
            </div>

            {/* Title */}
            <h1 className="aam_voice-reference-service-main__header">{t('voiceRefServiceMain.name')}</h1>

            {/* Description */}
            <div className="aam_voice-reference-service-main__content">
                <p className="aam_voice-reference-service-main__description" style={{ whiteSpace: 'pre-line' }}>{t('voiceRefServiceMain.descr1')}</p>
                <p className="aam_voice-reference-service-main__italic-description">{t('voiceRefServiceMain.descr2')}</p>
                <p className="aam_voice-reference-service-main__description">{t('voiceRefServiceMain.descr3')}</p>
                <p className="aam_voice-reference-service-main__description">{t('voiceRefServiceMain.descr4')}</p>
                <p className="aam_voice-reference-service-main__description">{t('voiceRefServiceMain.descr5')}</p>
                <p className="aam_voice-reference-service-main__description">{t('voiceRefServiceMain.descr6')}</p>
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_voice-reference-service-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("voiceRefServiceMain.homeLink")}
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
                    {t("voiceRefServiceMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default VoiceReferenceServiceMain;