import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InformationCard from '../../InformationCard/InformationCard';
import '../../../styles/components/ComplexComponents/ForClientsMain.scss';

import BG4 from '/assets/images/info-card-bg4.jpg';
import BG5 from '/assets/images/info-card-bg5.jpg';
import BG6 from '/assets/images/info-card-bg6.jpg';
import BG7 from '/assets/images/info-card-bg7.jpg';

import ClientIcon from '../../SVGIcons/ClientIcon';
import OilIcon from '../../SVGIcons/OilIcon';
import DocumentIcon from '../../SVGIcons/DocumentIcon';
import SmartphoneIcon from '../../SVGIcons/SmartphoneIcon';

import cardDataJson from '../../../data/informationCardData.json';

function ForClientsMain() {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const BG_IMAGES = {
      BG4, BG5, BG6, BG7,
    };
    const ICONS = {
      ClientIcon, OilIcon, DocumentIcon, SmartphoneIcon,
    };

    const updatedCards = Object.values(cardDataJson.forClients).map((card) => ({
      ...card,
      bgImage: BG_IMAGES[card['bg-image']],
      IconComponent: ICONS[card.icon] || null,
    }));

    setCards(updatedCards);
  }, []);

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  return (
    <div className="aam_for-clients-main">
      {/* Breadcrumbs */}
      <div className="aam_for-clients-main__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.forClients')}
      </div>

      {/* Title */}
      <h1 className="aam_for-clients-main__title">{t('forClientsMain.title')}</h1>

      {/* Description */}
      <p className="aam_for-clients-main__description">{t('forClientsMain.description')}</p>

      {/* Cards */}
      <div className="aam_for-clients-main__cards">
        {cards.map((cardData) => (
          <InformationCard
            key={cardData.title} // Используем title как ключ (предполагается, что уникально)
            title={t(cardData.title)}
            bgImage={cardData.bgImage}
            IconComponent={cardData.IconComponent}
            links={Array.isArray(cardData.links) ? cardData.links.filter(link => !link.disabled).map((link) => ({
              href: link.href.startsWith('http') ? link.href : `${baseUrl}${link.href}`,
              label: t(link.label),
              target: link.href.startsWith('http') ? '_blank' : '_self',
              rel: link.href.startsWith('http') ? 'noopener noreferrer' : undefined,
            })) : []}
            customClass={`clientsCard-${cardData.title.replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`} // Можно сделать кастомный класс на основе title
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default ForClientsMain;
