import React from "react";
import { Link } from "react-router-dom";
import '../../../styles/components/ComplexComponents/MainAbout.scss';
import mainAboutJPG from '../../../assets/images/mainAbout.jpg';

import { useTranslation } from "react-i18next";

const MainAbout = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_about-block">
            {/*Breadcrumbs */}
            <div className="aam_about-block__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> / {t('breadCrumbs.about')}
            </div>

            {/* Title */}
            <h1 className="aam_about-block__title">{t('aboutBlock.name')}</h1>

            {/* Image */}
            <img src={mainAboutJPG} alt={t('aboutBlock.alt')} className="aam_about-block__image" loading="lazy" />

            {/* Description */}
            <div className="aam_about-block__description">{t('aboutBlock.description')}</div>
        </main>
    );
};

export default MainAbout;