import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InformationCard from '../../InformationCard/InformationCard';
import '../../../styles/components/ComplexComponents/ForPartnersMain.scss';

import BG1 from '/assets/images/info-card-bg1.jpg';
import BG2 from '/assets/images/info-card-bg2.jpg';
import BG3 from '/assets/images/info-card-bg3.jpg';

import LaptopIcon from '../../SVGIcons/LaptopIcon';
import DocumentIcon from '../../SVGIcons/DocumentIcon';

import cardDataJson from '../../../data/informationCardData.json';

function ForPartnersMain() {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const BG_IMAGES = { BG1, BG2, BG3 };
    const ICONS = { LaptopIcon, DocumentIcon };

    const updatedCards = Object.values(cardDataJson.forPartners).map((card) => ({
      ...card,
      bgImage: BG_IMAGES[card['bg-image']],
      IconComponent: ICONS[card.icon] || null,
    }));

    setCards(updatedCards);
  }, []);

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  return (
    <div className="aam_for-partners-main">
      {/* Breadcrumbs */}
      <div className="aam_for-partners-main__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.forPartners')}
      </div>

      {/* Title */}
      <h1 className="aam_for-partners-main__title">{t('forPartnersMain.title')}</h1>

      {/* Description */}
      <p className="aam_for-partners-main__description">{t('forPartnersMain.description')}</p>

      {/* Cards */}
      <div className="aam_for-partners-main__cards">
        {cards.map((cardData) => (
          <InformationCard
            key={cardData.title}
            title={t(cardData.title)}
            bgImage={cardData.bgImage}
            IconComponent={cardData.IconComponent}
            links={Array.isArray(cardData.links) ? cardData.links.map((link) => ({
              href: link.href.startsWith('http') ? link.href : `${baseUrl}${link.href}`,
              label: t(link.label),
              target: link.href.startsWith('http') ? '_blank' : '_self',
              rel: link.href.startsWith('http') ? 'noopener noreferrer' : undefined,
            })) : []}
            customClass={`clientsCard-${cardData.title.replace(/\s+/g, '-')}`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default ForPartnersMain;
