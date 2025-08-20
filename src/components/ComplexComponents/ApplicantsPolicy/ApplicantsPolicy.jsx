import React from "react";
import { useTranslation } from "react-i18next";
import PrivacyData from '../../../data/privacyData.json';
import ParagraphListSection from "../ParagraphListSection/ParagraphListSection";
import "../../../styles/components/ComplexComponents/ApplicantsPolicy.scss";

const ApplicantsPolicy = () => {
    const { t } = useTranslation();
    const privacyInfo = PrivacyData.applicantsInfo;
    const privacyData = PrivacyData.applicantsPrivacy;
    const privacyApplication = PrivacyData.applicantsApplication;

    return (
        <div className="aam_privacy-page">
            <div className="aam_privacy-page__wrapper">
                <div className="aam_privacy-page__title">
                    <h2>
                        {t('privacyMain.applicantsInformationTitle')}
                    </h2>
                    <h3>
                        {t('privacyMain.applicantsInformationSubTitle1')}
                    </h3>
                    <h3>
                        {t('privacyMain.applicantsInformationSubTitle2')}
                    </h3>
                </div>

                <div className="aam_privacy-page__content">
                    <ParagraphListSection data={privacyInfo} allowMultiple />
                </div>
            </div>

            <div className="aam_privacy-page__wrapper">
                <div className="aam_privacy-page__title">
                    <h2>{t('privacyMain.applicantsConsentTitle')}</h2>
                    <h3>{t('privacyMain.applicantsConsentSubTitle1')}</h3>
                </div>

                <div className="aam_privacy-page__content">
                    <div className="aam_paragraph-section__custom">
                        <p>{t('privacyMain.applicantsConsent.item1')}</p>
                        <p>{t('privacyMain.applicantsConsent.item2')}</p>
                        <ul>
                            <li>{t('privacyMain.applicantsConsent.list1.item1')}</li>
                            <li>{t('privacyMain.applicantsConsent.list1.item2')}</li>
                        </ul>
                        <p>{t('privacyMain.applicantsConsent.item3')}</p>
                        <p>{t('privacyMain.applicantsConsent.item4')}</p>
                        <p>{t('privacyMain.applicantsConsent.item5')}</p>
                        <p>{t('privacyMain.applicantsConsent.item6')}</p>
                        <ul>
                            <li>{t('privacyMain.applicantsConsent.list2.item1')}</li>
                            <li>{t('privacyMain.applicantsConsent.list2.item2')}</li>
                            <li>{t('privacyMain.applicantsConsent.list2.item3')}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="aam_privacy-page__wrapper">
                <div className="aam_privacy-page__title">
                    <h2>{t('privacyMain.applicantsData.title')}</h2>
                    <h3>{t('privacyMain.applicantsData.subTitle')}</h3>
                </div>

                <div className="aam_privacy-page__content">
                    <ParagraphListSection data={privacyData} allowMultiple />
                </div>
            </div>

            <div className="aam_privacy-page__wrapper">
                <h2 className="aam_privacy-page__title">
                    {t('privacyMain.applicantsApplicationTitle')}
                </h2>

                <div className="aam_privacy-page__content">
                    <ParagraphListSection data={privacyApplication} allowMultiple />
                </div>
            </div>
        </div>
    );
};

export default ApplicantsPolicy;
