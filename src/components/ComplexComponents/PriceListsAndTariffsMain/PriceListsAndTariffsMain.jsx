import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import ServiceCard from '../../ServiceCard/ServiceCard';
import DocxIcon from '../../SVGIcons/DocxIcon';
import '../../../styles/components/ComplexComponents/PriceListsAndTariffsMain.scss';

function PriceListsAndTariffsMain() {
  const { t } = useTranslation();

  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.download = title.endsWith('.doc') ? title : `${title}.doc`; // Добавляем расширение, если его нет
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  const cardData = [
    {
      titleKey: 'priceListsAndTariffsMain.cardTitle1',
      link: `${baseUrl}/assets/documents/1.doc`,
    },
    {
      titleKey: 'priceListsAndTariffsMain.cardTitle2',
      link: `${baseUrl}/assets/documents/2.doc`,
    },
    {
      titleKey: 'priceListsAndTariffsMain.cardTitle3',
      link: `${baseUrl}/assets/documents/3.doc`,
    },
  ];

  return (
    <main className="aam_price-lists-and-tariffs-main">
      {/* Breadcrumbs */}
      <div className="aam_price-lists-and-tariffs-main__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/clients">{t('breadCrumbs.forClients')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.priceListsAndTariffs')}
      </div>

      {/* Title */}
      <h1 className="aam_price-lists-and-tariffs-main__header">{t('priceListsAndTariffsMain.name')}</h1>

      {/* Resignation Docs */}
      <div className="aam_price-lists-and-tariffs-main__card-boxes">
        {cardData.map((card) => (
          <ServiceCard
            key={card.titleKey}
            className="aam_price-lists-and-tariffs-main__service-card"
            Icon={DocxIcon}
            title={t(card.titleKey)}
            description=""
            link={card.link}
            onClick={() => handleLinkClick(t(card.titleKey), card.link)}
          />
        ))}
      </div>

      {/* Кнопки навигации по сайту */}
      <div className="aam_price-lists-and-tariffs-main__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('priceListsAndTariffsMain.homeLink')}
        </Link>
        <button
          type="button"
          onClick={() => {
            const element = document.getElementById('header');
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }}
          className="secondary-link"
        >
          <UpArrowInCircleIcon className="icon" />
          {t('priceListsAndTariffsMain.upLink')}
        </button>
      </div>
    </main>
  );
}

export default PriceListsAndTariffsMain;
