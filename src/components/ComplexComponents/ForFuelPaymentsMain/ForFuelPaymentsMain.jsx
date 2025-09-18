import React from "react";
import { Link } from 'react-router-dom';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import { useTranslation } from "react-i18next";
import PdfIcon from '../../SVGIcons/PdfIcon';

const ForFuelPaymentsMain = () => {
  const { t } = useTranslation();

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  const handleLinkClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="aam_for-fuel-payments">
      {/* Breadcrumbs */}
      <div className="aam_for-fuel-payments__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/clients">{t('breadCrumbs.forClients')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.forFuelPayments')}
      </div>

      {/* Title */}
      <h1 className="aam_for-fuel-payments__header">{t('forFuelPaymentsMain.name')}</h1>

      {/* Description */}
      <div className="aam_for-fuel-payments__description">
        <section className="aam_for-fuel-payments__description--section">
          <h2 className="aam_for-fuel-payments__description--section-header">
            {t('forFuelPaymentsMain.section1.header')}
          </h2>
          <p>
            {t('forFuelPaymentsMain.section1.description')}
            {' '}
            <a href="https://belgazprombank.by/" target="_blank" rel="noopener noreferrer">
              {t('forFuelPaymentsMain.section1.link')}
            </a>
          </p>
          <ul>
            <li>
              <PdfIcon />
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(`${baseUrl}/assets/documents/Платежное паручение для резидентов.pdf`);
                }}
              >
                {t('forFuelPaymentsMain.section1.listItem1')}
              </a>
            </li>
            <li>
              <PdfIcon />
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(`${baseUrl}/assets/documents/Платежное паручение для не резидентов.pdf`);
                }}
              >
                {t('forFuelPaymentsMain.section1.listItem2')}
              </a>
            </li>
          </ul>
        </section>
        <section className="aam_for-fuel-payments__description--section">
          <h2 className="aam_for-fuel-payments__description--section-header">
            {t('forFuelPaymentsMain.section2.header')}
          </h2>
          <p>{t('forFuelPaymentsMain.section2.description')}</p>
          <p>
            {t('forFuelPaymentsMain.section2.phones')}
            {': '}
            <a href="tel:+">397-10-81</a>
            {', '}
            <a href="tel:+">369-10-82</a>
            {', '}
            <a href="tel:+">210-00-00</a>
            {'.'}
          </p>
          <p>
            {t('forFuelPaymentsMain.section2.email')}
            {': '}
            <a href="mailto:info@berlio.by" rel="noopener noreferrer">info@berlio.by</a>
          </p>
        </section>
        <section className="aam_for-fuel-payments__description--section">
          <h2 className="aam_for-fuel-payments__description--section-header">
            {t('forFuelPaymentsMain.section3.header')}
          </h2>
          <ul>
            <li>{t('forFuelPaymentsMain.section3.listItem1')}</li>
            <li>{t('forFuelPaymentsMain.section3.listItem2')}</li>
          </ul>
          <p>{t('forFuelPaymentsMain.section3.description')}</p>
        </section>
      </div>
      <p>{t('forFuelPaymentsMain.description')}</p>

      {/* Кнопки навигации по сайту */}
      <div className="aam_for-fuel-payments__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('forFuelPaymentsMain.homeLink')}
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
          {t('forFuelPaymentsMain.upLink')}
        </button>
      </div>
    </main>
  );
}

export default ForFuelPaymentsMain;
