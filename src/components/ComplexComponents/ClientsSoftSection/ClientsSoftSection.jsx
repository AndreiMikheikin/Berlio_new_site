import React from "react";
import { Link } from "react-router-dom";
import ServiceCard from '../../ServiceCard/ServiceCard';
import MobileIcon from "../../SVGIcons/MobileIcon";
import ParkSystemIcon from "../../SVGIcons/ParkSystemIcon";
import ClientIcon from "../../SVGIcons/ClientIcon";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import "../../../styles/components/ComplexComponents/ClientsSoftSection.scss";

import { useTranslation } from "react-i18next";

const ClientsSoftSection = () => {
    const { t } = useTranslation();

    return (
        <section className="aam_clients-soft-section">
            {/* Title */}
            <h2 className="aam_clients-soft-section__header">{t('equipment.clientsSoftSection.name')}</h2>

            {/* soft */}
            <div className="aam_clients-soft-section__card-boxes">
                <ServiceCard
                    Icon={MobileIcon}
                    title={t('equipment.clientsSoftSection.headline1')}
                    link="https://berliosoft.by/berliocardpay/"
                />
                <ServiceCard
                    Icon={ParkSystemIcon}
                    title={t('equipment.clientsSoftSection.headline2')}
                    link="https://berliosoft.by/kassasamoobsluzhivaniyadlyaazs/#b1316"
                />
                <ServiceCard
                    Icon={ClientIcon}
                    title={t('equipment.clientsSoftSection.headline3')}
                    link="https://berliosoft.by/polichnyykabinetklienta/"
                />
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_clients-soft-section__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("equipment.clientsSoftSection.homeLink")}
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
                    {t("equipment.clientsSoftSection.upLink")}
                </button>
            </div>
        </section>
    );
};

export default ClientsSoftSection;