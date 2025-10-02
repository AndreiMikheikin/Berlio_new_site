import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PdfIcon from '../../SVGIcons/PdfIcon';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import GlobeIcon from '../../SVGIcons/GlobeIcon';
import '../../../styles/components/ComplexComponents/SignAndResignMain.scss';

function ServiceInEPS() {
  const { t } = useTranslation();

  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.download = title.endsWith('.pdf') ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  // Конфиг документов
  const operatorDocs = [
    { title: t('signAndResignMain.cardTitle1'), link: `${baseUrl}/assets/documents/1.pdf` },
    { title: t('signAndResignMain.cardTitle2'), link: `${baseUrl}/assets/documents/Правил обслуживания клиентов в ЭПС «Берлио».pdf` },
    {
      title: t('signAndResignMain.cardTitle3'),
      link: `${baseUrl}/assets/documents/Договор присоединения Клиента к обслуживанию в электронной платежной системе «Берлио».pdf`,
    },
    {
      title: t('signAndResignMain.cardTitle6'),
      link: `${baseUrl}/assets/documents/Перечень цен и тарифов за оказываемые услуги в электронной платёжной системе «Берлио».pdf`,
    },
    {
      title: t('signAndResignMain.cardTitle7'),
      link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (общая форма).pdf`,
    },
  ];

  const emissionerDocs = [
    {
      title: t('signAndResignMain.cardTitle4'),
      link: `${baseUrl}/assets/documents/Правила эмитента электронных денег «Берлио».pdf`,
    },
    {
      title: t('signAndResignMain.cardTitle5'),
      link: `https://belgazprombank.by/korporativnim_klientam/raschetno_kassovoe_obsluzhivani/berlio-ur/`,
      noDownload: true,
    },
  ];

  const renderDocList = (docs) => (
    <ul className="aam_sign-and-resign__doc-list">
      {docs.map(({ title, link, noDownload }) => {
        const isExternal = link.startsWith("https");
        return (
          <li key={title}>
            <a
              href={link}
              onClick={(e) => {
                if (!noDownload) {
                  e.preventDefault();
                  handleLinkClick(title, link);
                }
              }}
              target={noDownload ? "_blank" : "_self"}
              rel="noreferrer"
            >
              {isExternal ? (
                <GlobeIcon className="aam_sign-and-resign__doc-icon" />
              ) : (
                <PdfIcon className="aam_sign-and-resign__doc-icon" />
              )}
              <span>{title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <main className="aam_sign-and-resign">
      {/* Breadcrumbs */}
      <div className="aam_sign-and-resign__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
        <Link to="/clients">{t('breadCrumbs.forClients')}</Link> /{' '}
        {t('breadCrumbs.serviceInEPS')}
      </div>

      {/* Title */}
      <h1 className="aam_sign-and-resign__header">{t('signAndResignMain.name')}</h1>

      {/* Description */}
      <div className="aam_sign-and-resign__description">
        <p className="aam_sign-and-resign__description-first">{t('signAndResignMain.description')}</p>
        <strong>
          {t('signAndResignMain.purposeBeforeLink')}
          <a href="https://map.berlio.by" target="_blank" rel="noreferrer">
            {t('signAndResignMain.purposeLink')}
          </a>
          {t('signAndResignMain.purposeAfterLink')}
        </strong>
        <ul>
          {['item1', 'item2', 'item3', 'item4'].map((key) => (
            <li key={key}>{t(`signAndResignMain.list1.${key}`)}</li>
          ))}
        </ul>
      </div>

      {/* Participants */}
      <div className="aam_sign-and-resign__description">
        <h2 className="aam_sign-and-resign__participants">{t('signAndResignMain.participants')}</h2>
        <ul className="aam_sign-and-resign__participants-list">
          {[
            ['operator', 'operatorTagline'],
            ['emissioner', 'emissionerTagline'],
            ['agents', 'agentsTagline'],
            ['tradeAndServiceObject', 'tradeAndServiceObjectTagline'],
            ['serviseCenter', 'serviseCenterTagline'],
          ].map(([role, tagline]) => (
            <li key={role}>
              {t(`signAndResignMain.${role}`)} - {t(`signAndResignMain.${tagline}`)}
            </li>
          ))}
        </ul>
      </div>

      {/* Customer Service */}
      <div className="aam_sign-and-resign__customer-service">
        <strong>{t('signAndResignMain.customerService')}</strong>
        <ul>
          {['item1', 'item2'].map((key) => (
            <li key={key}>{t(`signAndResignMain.list2.${key}`)}</li>
          ))}
        </ul>
        <p className="aam_sign-and-resign__footer">{t('signAndResignMain.footer')}</p>
      </div>

      {/* System Usage */}
      <div className="aam_sign-and-resign__system-usage">
        <strong>{t('signAndResignMain.systemUsage')}</strong>
        <ul>
          {['item1', 'item2', 'item3', 'item4'].map((key) => (
            <li key={key}>{t(`signAndResignMain.list3.${key}`)}</li>
          ))}
        </ul>
      </div>

      {/* Documents */}
      <div className="aam_sign-and-resign__documents">
        <h2 className="aam_sign-and-resign__documents-title">{t('signAndResignMain.documentsTitle')}</h2>

        <div className="aam_sign-and-resign__operator-documents">
          <h3 className="aam_sign-and-resign__operator-documents-title">
            {t('signAndResignMain.operatorDocumentsTitle')}
          </h3>
          <div className="aam_sign-and-resign__card-boxes">{renderDocList(operatorDocs)}</div>
        </div>

        <div className="aam_sign-and-resign__emissioner-documents">
          <h3 className="aam_sign-and-resign__emissioner-documents-title">
            {t('signAndResignMain.emissionerDocumentsTitle')}
          </h3>
          <div className="aam_sign-and-resign__card-boxes">{renderDocList(emissionerDocs)}</div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="aam_sign-and-resign-section__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('signAndResignSection.homeLink')}
        </Link>
        <button
          type="button"
          onClick={() => {
            document.getElementById('header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="secondary-link"
        >
          <UpArrowInCircleIcon className="icon" />
          {t('signAndResignSection.upLink')}
        </button>
      </div>
    </main>
  );
}

export default ServiceInEPS;
