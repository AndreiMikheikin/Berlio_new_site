import React from 'react';
import '../../../styles/components/ComplexComponents/FuelCards.scss';
import ServiceCard from '../../ServiceCard/ServiceCard';
import PdfIcon from '../../SVGIcons/PdfIcon';

import { useTranslation } from 'react-i18next';

const FuelCards = () => {
  const { t } = useTranslation();

  const handleLinkClick = () => {
    console.log ('Link to: "Выпуск в обращение и использование топливных карт" ')
  }

  return (
    <section className="aam_fuel-cards">
      <h2 className="aam_fuel-cards__title">{t('fuelCards.name')}</h2>
      <div className="aam_fuel-cards__content">
        <div className="aam_fuel-cards__description">
        {t('fuelCards.fuelCardsDescription1')}
        </div>
        <div className="aam_fuel-cards__description">
        {t('fuelCards.fuelCardsDescription2')}
        </div>
      </div>
      <div className="aam_fuel-cards__image"><img src='/assets/images/road.jpg' alt={t('fuelCards.road')} /></div>
      <ServiceCard
        Icon={PdfIcon}
        title={t('fuelCards.cardTitle')}
        onClick={handleLinkClick}
      />
    </section>
  );
};

export default FuelCards;