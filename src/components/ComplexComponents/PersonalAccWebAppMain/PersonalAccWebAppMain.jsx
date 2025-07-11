import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PersonalAccImage from '/assets/images/personal-acc-web-app.jpg';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import '../../../styles/components/ComplexComponents/PersonalAccWebAppMain.scss';

function PersonalAccWebAppMain() {
  const { t } = useTranslation();

  return (
    <main className="aam_personal-acc-web-app-main">
      {/* Breadcrumbs */}
      <div className="aam_personal-acc-web-app-main__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/equipment">{t('breadCrumbs.equipment')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.personalAccWebApp')}
      </div>

      {/* Title */}
      <h1 className="aam_personal-acc-web-app-main__header">{t('personalAccWebAppMain.name')}</h1>

      {/* Description */}
      <div className="aam_personal-acc-web-app-main__wrapper">
        <img src={PersonalAccImage} alt="personalAccWebApp" className="aam_personal-acc-web-app-main__wrapper-image" />
        <div className="aam_personal-acc-web-app-main__wrapper--description">
          <h3 className="aam_personal-acc-web-app-main__wrapper--description-title">{t('personalAccWebAppMain.description.title')}</h3>
          <p className="aam_personal-acc-web-app-main__wrapper--description-sub-title">
            {t('personalAccWebAppMain.description.subTitle')}
            {' '}
            <Link to="https://lkb.by">https://lkb.by</Link>
          </p>
          <div>
            <strong><p className="aam_personal-acc-web-app-main__wrapper--description-list-title">{t('personalAccWebAppMain.description.listTitle')}</p></strong>
            <ul>
              <li>{t('personalAccWebAppMain.description.item1')}</li>
              <li>{t('personalAccWebAppMain.description.item2')}</li>
              <li>{t('personalAccWebAppMain.description.item3')}</li>
              <li>{t('personalAccWebAppMain.description.item4')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Кнопки навигации по сайту */}
      <div className="aam_personal-acc-web-app-main__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('personalAccWebAppMain.homeLink')}
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
          {t('personalAccWebAppMain.upLink')}
        </button>
      </div>
    </main>
  );
}

export default PersonalAccWebAppMain;
