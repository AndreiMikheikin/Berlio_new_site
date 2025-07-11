import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import ServiceCard from '../../ServiceCard/ServiceCard';
import MoneyWithdrawIcon from '../../SVGIcons/MoneyWithdrawIcon';
import PdfIcon from '../../SVGIcons/PdfIcon';

import '../../../styles/components/ComplexComponents/ForBankInformationDocumentsSection.scss';

function ForBankInformationDocumentsSection() {
  const { t } = useTranslation();

  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.download = title.endsWith('.pdf') ? title : `${title}.pdf`; // Добавляем расширение, если его нет
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  return (
    <section className="aam_for-bank-info-doc-section">
      {/* Title */}
      <h2 className="aam_for-bank-info-doc-section__header">{t('forBankInfoDoc.name')}</h2>

      {/* Description */}
      <p className="aam_for-bank-info-doc-section__description">{t('forBankInfoDoc.description')}</p>

      {/* Card boxes */}
      <div className="aam_for-bank-info-doc-section__card-boxes">
        <ServiceCard
          Icon={MoneyWithdrawIcon}
          title={t('forBankInfoDoc.headline')}
          description=""
          link="/clients/eMoneyRegulations"
        />
        <ServiceCard
          className="aam_for-bank-info-doc-section__service-card"
          Icon={PdfIcon}
          title={t('forBankInfoDoc.cardTitle1')}
          description=""
          link={`${baseUrl}/assets/documents/1.pdf`}
          onClick={() => handleLinkClick(
            t('forBankInfoDoc.cardTitle1'),
            `${baseUrl}/assets/documents/1.pdf`,
          )}
        />
        <ServiceCard
          className="aam_for-bank-info-doc-section__service-card"
          Icon={PdfIcon}
          title={t('forBankInfoDoc.cardTitle2')}
          description=""
          link={`${baseUrl}/assets/documents/1.pdf`}
          onClick={() => handleLinkClick(
            t('forBankInfoDoc.cardTitle2'),
            `${baseUrl}/assets/documents/1.pdf`,
          )}
        />
      </div>

      {/* Кнопки навигации по сайту */}
      <div className="aam_for-bank-info-doc-section__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('forBankInfoDoc.homeLink')}
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
          {t('forBankInfoDoc.upLink')}
        </button>
      </div>
    </section>
  );
}

export default ForBankInformationDocumentsSection;
