import React from "react";
import PaymentWirelessIcon from '../../SVGIcons/PaymentWirelessIcon';
import TerminalWindowIcon from '../../SVGIcons/TerminalWindowIcon';
import PaymentCardIcon from "../../SVGIcons/PaymentCardIcon";
import '../../../styles/components/ComplexComponents/SystemPurposeSection.scss';
import CardBox from "../../CardBox/CardBox";
import FuelDispenser from '../../../assets/images/fuel-dispenser.jpg';

import { useTranslation } from "react-i18next";

const SystemPurposeSection = () => {
    const { t } = useTranslation();

    return (
        <section className="aam_purpose-section">
            {/* Title */}
            <h2 className="aam_purpose-section__title">{t('purposeSection.name')}</h2>

            {/* Description */}
            <p className="aam_purpose-section__description">{t('purposeSection.description')}</p>

            {/* System Purpose */}
            <div className="aam_purpose-section__cards-box">
                <CardBox
                    CSSSelectorPrefix={`aam_purpose-section`}
                    Icon={PaymentWirelessIcon}
                    title={t('purposeSection.cardTitle1')}
                />
                <CardBox
                    CSSSelectorPrefix={`aam_purpose-section`}
                    Icon={TerminalWindowIcon}
                    title={t('purposeSection.cardTitle2')}
                />
                <CardBox
                    CSSSelectorPrefix={`aam_purpose-section`}
                    Icon={PaymentCardIcon}
                    title={t('purposeSection.cardTitle3')}
                />
            </div>

            {/* Image */}
            <div className="aam_purpose-section__images">
                <img src={FuelDispenser} alt={t('purposeSection.fuelDispenser')} className="aam_purpose-section__image" />
            </div>

            {/* Card Purpose */}
            <div className="aam_purpose-section__card-purpose">
                <p className="aam_purpose-section__list-title">{t('purposeSection.listTitle')}</p>
                <ul>
                    <ol>
                        <li>{t('purposeSection.listItem1')}</li>
                        <li>{t('purposeSection.listItem2')}</li>
                        <li>{t('purposeSection.listItem3')}</li>
                        <li>{t('purposeSection.listItem4')}</li>
                        <li>{t('purposeSection.listItem5')}</li>
                    </ol>
                    <ol start={6}>
                        <li>{t('purposeSection.listItem6')}</li>
                        <li>{t('purposeSection.listItem7')}</li>
                        <li>{t('purposeSection.listItem8')}</li>
                        <li>{t('purposeSection.listItem9')}</li>
                        <li>{t('purposeSection.listItem10')}</li>
                    </ol>
                    <ol start={11}>
                        <li>{t('purposeSection.listItem11')}</li>
                        <li>{t('purposeSection.listItem12')}</li>
                        <li>{t('purposeSection.listItem13')}</li>
                        <li>{t('purposeSection.listItem14')}</li>
                        <li>{t('purposeSection.listItem15')}</li>
                    </ol>
                </ul>
            </div>
        </section>
    )
};

export default SystemPurposeSection;