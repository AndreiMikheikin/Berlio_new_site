import React from "react";
import { useTranslation } from "react-i18next";

const CookieConsentPolicy = () => {
    const { t } = useTranslation();

    return (
        <div className="aam_privacy-page">
            <h2 className="aam_privacy-page__title">
                {t('privacyMain.cookieConsentPolicy')}
            </h2>

            <div className="aam_privacy-page__content">
                {/* TODO: Описание политики cookies */}
            </div>
        </div>
    );
};

export default CookieConsentPolicy;
