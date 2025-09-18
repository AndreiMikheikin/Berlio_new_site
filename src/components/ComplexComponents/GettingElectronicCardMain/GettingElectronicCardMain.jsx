import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import CardBox from '../../CardBox/CardBox';
import ClientIcon from '../../SVGIcons/ClientIcon';
import DepartmentEmailDropdown from '../../DeprtmentEmailDropdown/DepartmentEmailDropdown';
import '../../../styles/components/ComplexComponents/GettingElectronicCardMain.scss';

function GettingElectronicCardMain() {
  const { t } = useTranslation();

  return (
    <main className="aam_getting-card-main">
      {/* Breadcrumbs */}
      <div className="aam_getting-card-main__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/clients">{t('breadCrumbs.forClients')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.gettingCard')}
      </div>

      {/* Title */}
      <h1 className="aam_getting-card-main__header">{t('gettingCardMain.name')}</h1>

      {/* Description */}
      <div className="aam_getting-card-main__description">
        <strong className="aam_getting-card-main__description--header">{t('gettingCardMain.applicationHeader')}</strong>
        <ul className="aam_getting-card-main__description--list">
          <li>{t('gettingCardMain.list1.item1')}</li>
          <li>{t('gettingCardMain.list1.item2')}</li>
          <li>
            {t('gettingCardMain.list1.item3')}
            {' '}
            <DepartmentEmailDropdown />
          </li>
        </ul>
        <strong className="aam_getting-card-main__description--footer">{t('gettingCardMain.applicationFooter')}</strong>
      </div>

      {/* Documents */}
      <div className="aam_getting-card-main__documents">
        <h2 className="aam_getting-card-main__documents--header">{t('gettingCardMain.documentsHeader')}</h2>
        <div className="aam_getting-card-main__card-boxes">
          <CardBox
            CSSSelectorPrefix="aam_getting-card-main"
            Icon={ClientIcon}
            title={t('gettingCardMain.supervisor')}
            description={(
              <ul>
                <li style={{ listStyleType: 'decimal', listStylePosition: 'outside', lineHeight: '24.51px' }}>
                  {t('gettingCardMain.supList.item1')}
                </li>
                <li style={{ listStyleType: 'decimal', listStylePosition: 'outside', lineHeight: '24.51px' }}>
                  {t('gettingCardMain.supList.item2')}
                </li>
                <li style={{ listStyleType: 'decimal', listStylePosition: 'outside', lineHeight: '24.51px' }}>
                  {t('gettingCardMain.supList.item3')}
                </li>
              </ul>
                          )}
          />
          <CardBox
            CSSSelectorPrefix="aam_getting-card-main"
            Icon={ClientIcon}
            title={t('gettingCardMain.notSupervisor')}
            description={(
              <ul>
                <li style={{ listStyleType: 'decimal', listStylePosition: 'outside', lineHeight: '24.51px' }}>
                  {t('gettingCardMain.notSupList.item1')}
                </li>
                <li style={{ listStyleType: 'decimal', listStylePosition: 'outside', lineHeight: '24.51px' }}>
                  {t('gettingCardMain.notSupList.item2')}
                </li>
                <li style={{ listStyleType: 'decimal', listStylePosition: 'outside', lineHeight: '24.51px' }}>
                  {t('gettingCardMain.notSupList.item3')}
                </li>
              </ul>
                          )}
          />
        </div>
        <div className="aam_getting-card-main__documents--footer">
          <p className="aam_getting-card-main__documents--footer-primary">
            <strong>
              {t('gettingCardMain.documentsFotterPrimary')}
            </strong>
          </p>
          <p className="aam_getting-card-main__documents--footer-secondary">
            <strong>
              {t('gettingCardMain.documentsFotterSecondary.beforeLink')}
              {' '}
              <a href="https://lkb.by" target="_blank" rel="noopener noreferrer">{t('gettingCardMain.lkbLink')}</a>
              {' '}
              {t('gettingCardMain.documentsFotterSecondary.afterLink')}
            </strong>
          </p>

        </div>
      </div>

      {/* Кнопки навигации по сайту */}
      <div className="aam_getting-card-main__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('gettingCardMain.homeLink')}
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
          {t('gettingCardMain.upLink')}
        </button>
      </div>
    </main>
  );
}

export default GettingElectronicCardMain;
