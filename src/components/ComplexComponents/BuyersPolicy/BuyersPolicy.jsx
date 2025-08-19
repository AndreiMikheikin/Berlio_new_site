import React from "react";
import { useTranslation } from "react-i18next";

const BuyersPolicy = () => {
    const { t } = useTranslation();

    return (
        <div className="aam_privacy-page">
            <h2 className="aam_privacy-page__title">
                {t('privacyMain.buyersPrivacy')}
            </h2>

            <div className="aam_privacy-page__content">
                {/* TODO: Описание политики для покупателей */}
            </div>
        </div>
    );
};

export default BuyersPolicy;
