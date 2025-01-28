import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LinkButton from '../../LinkButton/LinkButton';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import RightArrowIcon from '../../SVGIcons/RightArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import '../../../styles/components/ComplexComponents/LogoSection.scss';

import { useTranslation } from 'react-i18next';

const LogoSection = ({ title, logos, logoBasePath }) => {
    const { t } = useTranslation();

    const [currentIndex, setCurrentIndex] = useState(0);
    const logosToShow = 4; // Количество логотипов, отображаемых в карусели

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : logos.length - logosToShow));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < logos.length - logosToShow ? prevIndex + 1 : 0));
    };

    // Цвет иконок в зависимости от состояния кнопок
    const prevIconColor = currentIndex === 0 ? '#A3A3A3' : '#48AE5A';
    const nextIconColor = currentIndex === logos.length - logosToShow ? '#A3A3A3' : '#48AE5A';

    return (
        <section className="aam_logo-section">
            {/* Заголовок */}
            <h2 className="aam_logo-section__title">{title}</h2>

            {/* Карусель логотипов */}
            <div className="aam_logo-section__carousel">
                <div
                    className="aam_logo-section__logos"
                    style={{
                        transform: `translateX(-${(currentIndex * 100) / logosToShow}%)`,
                        transition: 'transform 0.3s ease',
                    }}
                >
                    {logos.map((logo, index) => (
                        <div key={index} className="aam_logo-section__logo">
                            <img
                                src={`${logoBasePath}/${logo.src}`}
                                alt={logo.alt}
                                className="aam_logo-section__logo-image"
                                loading="lazy"
                            />
                        </div>
                    ))}
                    
                </div>
            </div>

            {/* Управляющие кнопки */}
            <div className="aam_logo-section__controls">
                <button
                    className="aam_logo-section__button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    <LeftArrowIcon fillColor={prevIconColor} />
                </button>
                <button
                    className="aam_logo-section__button"
                    onClick={handleNext}
                    disabled={currentIndex === logos.length - logosToShow}
                >
                    <RightArrowIcon fillColor={nextIconColor} />
                </button>
            </div>

            {/* Кнопка перехода на сайт */}
            <LinkButton
                href="https://map.berlio.by"
                target="_blank"
                className="fillGreen"
            >
                {t('ourPartnersLogoSection.mapLink')}
            </LinkButton>

            {/* Кнопки навигации по сайту */}
            <div className="aam_logo-section__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t('ourPartnersLogoSection.homeLink')}
                </Link>
                <button
                    onClick={() => {
                        const element = document.getElementById('header');
                        if (element) {
                            element.scrollIntoView({
                                behavior: 'smooth', // плавная прокрутка
                                block: 'start', // прокрутка к верхней части элемента
                            });
                        }
                    }}
                    className="secondary-link"
                >
                    <UpArrowInCircleIcon className="icon" />
                    {t('ourPartnersLogoSection.upLink')}
                </button>
            </div>
        </section>
    );
};

LogoSection.propTypes = {
    title: PropTypes.string.isRequired,
    logos: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        })
    ).isRequired,
    logoBasePath: PropTypes.string.isRequired,
};

export default LogoSection;
