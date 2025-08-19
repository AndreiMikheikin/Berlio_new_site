import React from "react";
import { useTranslation } from "react-i18next";

const B2BPolicy = () => {
    const { t } = useTranslation();

    return (
        <div className="aam_privacy-page">
            <h2 className="aam_privacy-page__title">
                {t('privacyMain.b2bPrivacy')}
            </h2>

            <div className="aam_privacy-page__content">
                {/* TODO: Описание политики для B2B клиентов */}
            </div>
        </div>
    );
};

export default B2BPolicy;
