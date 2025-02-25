import React from "react";
import ServiceCard from '../../ServiceCard/ServiceCard';
import GlobeIcon from "../../SVGIcons/GlobeIcon";
import CanisterIcon from "../../SVGIcons/CanisterIcon";
import ParkSystemIcon from "../../SVGIcons/ParkSystemIcon";
import TechnologyIcon from "../../SVGIcons/TechnologyIcon";
import LaptopIcon from "../../SVGIcons/LaptopIcon";
import Plate from "../../../assets/images/plate.png"
import "../../../styles/components/ComplexComponents/PartnersSoftSection.scss"

import { useTranslation } from "react-i18next";

const PartnersSoftSection = () => {
    const { t } = useTranslation();

    return (
        <section className="aam_partners-soft-section">
            {/* Title */}
            <h2 className="aam_partners-soft-section__header">{t('equipment.partnersSoftSection.name')}</h2>

            {/* soft */}
            <div className="aam_partners-soft-section__card-boxes">
                <ServiceCard
                    Icon={GlobeIcon}
                    title={t('equipment.partnersSoftSection.headline1')}
                    link="https://berliosoft.by/webcenterberlio/#block744"
                />
                <ServiceCard
                    Icon={CanisterIcon}
                    title={t('equipment.partnersSoftSection.headline2')}
                    link="https://berliosoft.by/neftikapital/"
                />
                <ServiceCard
                    Icon={ParkSystemIcon}
                    title={t('equipment.partnersSoftSection.headline3')}
                    link="https://berliosoft.by/kassasamoobsluzhivaniyadlyaazs/#b1316"
                />
                <ServiceCard
                    Icon={TechnologyIcon}
                    title={t('equipment.partnersSoftSection.headline4')}
                    link="https://berliosoft.by/sistemaatomatizatsiiazs/#block840"
                />
                <ServiceCard
                    Icon={LaptopIcon}
                    title={t('equipment.partnersSoftSection.headline5')}
                    link="https://berliosoft.by/ETF/"
                />
            </div>
            {/* Image */}
            <div className="aam_partners-soft-section__images">
                <img src={Plate} alt={t('equipment.partnersSoftSection.plate')} title={t('equipment.partnersSoftSection.plate')} className="aam_partners-soft-section__image" loading="lazy" />
            </div>
        </section>
    );
};

export default PartnersSoftSection;