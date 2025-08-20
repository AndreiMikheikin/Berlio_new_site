import React from "react";
import { useTranslation } from "react-i18next";
import PrivacyData from '../../../data/privacyData.json';
import ParagraphListSection from "../ParagraphListSection/ParagraphListSection";
import "../../../styles/components/ComplexComponents/ApplicantsPolicy.scss";

const B2BPolicy = () => {
    const { t } = useTranslation();
    const privacyData = PrivacyData.b2bPrivacy;
    const privacyApplication = PrivacyData.b2bApplication;

    return (
        <div className="aam_privacy-page">
            <div className="aam_privacy-page__wrapper">
                <h2 className="aam_privacy-page__title">
                    {t('privacyMain.b2bData.title')}
                </h2>
                <h3 className="aam_privacy-page__title">
                    {t('privacyMain.b2bData.subTitle')}
                </h3>

                <div className="aam_privacy-page__content">
                    <ParagraphListSection data={privacyData} allowMultiple />
                </div>
            </div>

            <div className="aam_privacy-page__wrapper">
                <h2 className="aam_privacy-page__title">
                    {t('privacyMain.b2bApplicationTitle')}
                </h2>

                <div className="aam_privacy-page__content">
                    <ParagraphListSection data={privacyApplication} allowMultiple />
                </div>
            </div>
        </div>
    );
};

export default B2BPolicy;
