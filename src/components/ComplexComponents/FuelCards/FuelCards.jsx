import React from 'react';
import '../../../styles/components/ComplexComponents/FuelCards.scss';
import ServiceCard from '../../ServiceCard/ServiceCard';
import PdfIcon from '../../SVGIcons/PdfIcon';
import RoadJPG from '../../../assets/images/road.jpg';

import { useTranslation } from 'react-i18next';

const FuelCards = () => {
  const { t } = useTranslation();

  const handleLinkClick = (title, link) => {
    console.log(`Download: ${title}`);
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.download = title;
    linkElement.click();
  };

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
      <div className="aam_fuel-cards__image"><img src={RoadJPG} alt={t('fuelCards.road')} loading="lazy" /></div>
      <ServiceCard
        Icon={PdfIcon}
        title={t('fuelCards.cardTitle')}
        link="/assets/documents/1.pdf"
        onClick={() =>
          handleLinkClick(
            t('fuelCards.cardTitle'),
            '/assets/documents/1.pdf'
          )
        }
      />
    </section>
  );
};

export default FuelCards;