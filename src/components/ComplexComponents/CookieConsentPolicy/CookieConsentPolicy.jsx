import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PrivacyData from '../../../data/privacyData.json';
import ParagraphListSection from "../ParagraphListSection/ParagraphListSection";
import CookieConsentModal from '../CookieConsentModal/CookieConsentModal';
import Button from '../../Button/Button';
import "../../../styles/components/ComplexComponents/ApplicantsPolicy.scss";

const CookieConsentPolicy = () => {
    const { t } = useTranslation();
    const cookieData = PrivacyData.cookiePrivacy;

    const [modalKey, setModalKey] = useState(0);

    return (
        <div className="aam_privacy-page">
            <div className="aam_privacy-page__wrapper">
                <h2 className="aam_privacy-page__title">
                    {t('privacyMain.cookieData.title')}
                </h2>
                <h3 className="aam_privacy-page__title">
                    {t('privacyMain.cookieData.subTitle')}
                </h3>

                <div className="aam_privacy-page__content">
                    <ParagraphListSection data={cookieData} allowMultiple />

                    <div className="aam_privacy-page__button">
                        <Button
                            label={t('Персональные настройки cookies')}
                            onClick={() => setModalKey((prev) => prev + 1)}
                            variant="green"
                        />
                    </div>

                    {modalKey > 0 && (
                        <CookieConsentModal key={`modal-${modalKey}`} forceVisible />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CookieConsentPolicy;
