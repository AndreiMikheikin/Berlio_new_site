import React from "react";
import ServiceCard from '../../ServiceCard/ServiceCard';
import OilIcon from '../../SVGIcons/OilIcon';
import PaymentCardIcon from '../../SVGIcons/PaymentCardIcon';
import MapIcon from '../../SVGIcons/MapIcon';
import '../../../styles/components/ComplexComponents/SystemSection.scss';
import SySJPG1 from '../../../assets/images/systemSection1.jpg';
import SySJPG2 from '../../../assets/images/systemSection2.jpg';

import { useTranslation } from "react-i18next";

const SystemSection = () => {
    const { t } = useTranslation();

    return (
        <section className="aam_system-section">
            {/* Title */}
            <h2 className="aam_system-section__title">{t('systemSection.name')}</h2>

            {/* Services */}
            <div className="aam_system-section__services">
                <ServiceCard
                    Icon={OilIcon}
                    title={t('mainBlock.headline')}
                    description={t('mainBlock.tagline')}
                    link="/clients/signAndResign"
                />
                <ServiceCard
                    Icon={PaymentCardIcon}
                    title={t('mainBlock.fuelCardUsage')}
                    description={t('mainBlock.belTollServices')}
                    link="/clients/plasticCardUsageRules"
                />
                <ServiceCard
                    Icon={MapIcon}
                    title={t('mainBlock.nonResidentServices')}
                    description={t('mainBlock.nonResidentSupport')}
                    link="/clients/nonResidentsSupport"
                />
            </div>

            <div className="aam_system-section__additional-services">
                <p className="aam_system-section__list-title">{t('systemSection.listTitle')}</p>
                <ol>
                    <li>{t('systemSection.listItem1')}</li>
                    <li>{t('systemSection.listItem2')}</li>
                    <li>{t('systemSection.listItem3')}</li>
                    <li>{t('systemSection.listItem4')}</li>
                </ol>
            </div>

            {/* Images */}
            <div className="aam_system-section__images">
                <img src={SySJPG1} alt={t('systemSection.alt1')} className="aam_system-section__image" loading="lazy" />
                <img src={SySJPG2} alt={t('systemSection.alt2')} className="aam_system-section__image" loading="lazy" />
            </div>
        </section>
    );
};

export default SystemSection;