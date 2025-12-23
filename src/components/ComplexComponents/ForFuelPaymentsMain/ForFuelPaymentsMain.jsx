import React from "react";
import { Link } from 'react-router-dom';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import PdfIcon from '../../SVGIcons/PdfIcon';
import { useTranslation } from "react-i18next";
import '../../../styles/components/ComplexComponents/ForFuelPaymentsMain.scss';
import DepartmentEmailDropdown from "../../DeprtmentEmailDropdown/DepartmentEmailDropdown";

const ForFuelPaymentsMain = () => {
  const { t } = useTranslation();

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  const handleLinkClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const docsSection1 = [
    {
      title: t('forFuelPaymentsMain.section.listItem1'),
      link: `${baseUrl}/assets/documents/Платежное паручение для резидентов.pdf`,
      noDownload: true
    },
    /* {
      title: t('forFuelPaymentsMain.section.listItem2'),
      link: `${baseUrl}/assets/documents/Платежное паручение для не резидентов.pdf`,
      noDownload: true
    }, */
  ];

  return (
    <main className="aam_for-fuel-payments">
      {/* Breadcrumbs */}
      <div className="aam_for-fuel-payments__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
        <Link to="/clients">{t('breadCrumbs.forClients')}</Link> /{' '}
        {t('breadCrumbs.forFuelPayments')}
      </div>

      {/* Title */}
      <h1 className="aam_for-fuel-payments__header">{t('forFuelPaymentsMain.name')}</h1>

      {/* Section */}
      <div className="aam_for-fuel-payments__description">
        <section className="aam_for-fuel-payments__description--section">
          <p>{t('forFuelPaymentsMain.section.description1')}</p>
          <p>{t('forFuelPaymentsMain.section.description2')}</p>
          <h2 className="aam_for-fuel-payments__description--section-header">
            {t('forFuelPaymentsMain.section.header')}
          </h2>
          <p>{t('forFuelPaymentsMain.section.description3')}</p>
          <ul className="aam_for-fuel-payments__doc-list">
            {docsSection1.map(({ title, link, noDownload }) => (
              <li key={title}>
                <a
                  href={link}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                  target={noDownload ? "_blank" : "_self"}
                  rel="noreferrer"
                >
                  <PdfIcon className="aam_for-fuel-payments__doc-icon" />
                  <span>{title}</span>
                </a>
              </li>
            ))}
          </ul>
          <p>{t('forFuelPaymentsMain.section.description4')}</p>

          <p>{t('forFuelPaymentsMain.section.description5')}</p>
          <ul className="aam_for-fuel-payments__doc-list">
            {docsSection1.map(({ title, link, noDownload }) => (
              <li key={title}>
                <a
                  href={link}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                  target={noDownload ? "_blank" : "_self"}
                  rel="noreferrer"
                >
                  <PdfIcon className="aam_for-fuel-payments__doc-icon" />
                  <span>{title}</span>
                </a>
              </li>
            ))}
          </ul>
          <p>{t('forFuelPaymentsMain.section.description6')}{' '}
          <DepartmentEmailDropdown /></p>
        </section>
      </div>

      {/* Navigation */}
      <div className="aam_for-fuel-payments__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('forFuelPaymentsMain.homeLink')}
        </Link>
        <button
          type="button"
          onClick={() => {
            const element = document.getElementById('header');
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="secondary-link"
        >
          <UpArrowInCircleIcon className="icon" />
          {t('forFuelPaymentsMain.upLink')}
        </button>
      </div>
    </main>
  );
};

export default ForFuelPaymentsMain;
