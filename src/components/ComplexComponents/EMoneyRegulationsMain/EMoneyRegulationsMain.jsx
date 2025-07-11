import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import '../../../styles/components/ComplexComponents/EMoneyRegulationsMain.scss';

function EMoneyRegulationsMain() {
  const { t } = useTranslation();

  return (
    <main className="aam_e-money-regulations-main">
      {/* Breadcrumbs */}
      <div className="aam_e-money-regulations-main__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/clients">{t('breadCrumbs.forClients')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.eMoneyRegulations')}
      </div>

      {/* Title */}
      <h1 className="aam_e-money-regulations-main__header">{t('eMoneyRegulationsMain.name')}</h1>

      {/* Description */}
      <div className="aam_e-money-regulations-main__description">
        <p className="aam_e-money-regulations-main__description--first">
          {t('eMoneyRegulationsMain.descriptionFirst')}
        </p>
        <p className="aam_e-money-regulations-main__description--second">
          <strong>
            {t('eMoneyRegulationsMain.descriptionSecond')}
          </strong>
        </p>
        <p className="aam_e-money-regulations-main__description--third">
          {t('eMoneyRegulationsMain.descriptionThird')}
        </p>
        <ol className="aam_e-money-regulations-main__description--ol">
          <li><span>{t('eMoneyRegulationsMain.descriptionOl.item1')}</span></li>
          <li><span>{t('eMoneyRegulationsMain.descriptionOl.item2')}</span></li>
          <li>
            <span>{t('eMoneyRegulationsMain.descriptionOl.item3.span')}</span>
            <p>{t('eMoneyRegulationsMain.descriptionOl.item3.header')}</p>
            <ul>
              <li><span>{t('eMoneyRegulationsMain.descriptionOl.item3.ulItem1')}</span></li>
              <li><span>{t('eMoneyRegulationsMain.descriptionOl.item3.ulItem2')}</span></li>
            </ul>
          </li>
          <li><span>{t('eMoneyRegulationsMain.descriptionOl.item4')}</span></li>
          <li><span>{t('eMoneyRegulationsMain.descriptionOl.item5')}</span></li>
          <li><span>{t('eMoneyRegulationsMain.descriptionOl.item6')}</span></li>
          <li><span>{t('eMoneyRegulationsMain.descriptionOl.item7')}</span></li>
          <li>
            <span>
              {t('eMoneyRegulationsMain.descriptionOl.item8.before')}
              <Link to="/news">{t('eMoneyRegulationsMain.descriptionOl.item8.firstLink')}</Link>
              {t('eMoneyRegulationsMain.descriptionOl.item8.between')}
              <Link to="https://lkb.by" target="_blank" rel="noopener noreferrer">
                {t('eMoneyRegulationsMain.descriptionOl.item8.secondLink')}
              </Link>
              {t('eMoneyRegulationsMain.descriptionOl.item8.after')}
            </span>
          </li>
        </ol>
      </div>

      {/* Кнопки навигации по сайту */}
      <div className="aam_e-money-regulations-main__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('eMoneyRegulationsMain.homeLink')}
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
          {t('eMoneyRegulationsMain.upLink')}
        </button>
      </div>
    </main>
  );
}

export default EMoneyRegulationsMain;
