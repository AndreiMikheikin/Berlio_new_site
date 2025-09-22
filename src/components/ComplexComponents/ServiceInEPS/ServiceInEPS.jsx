import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../../ServiceCard/ServiceCard';
import PdfIcon from '../../SVGIcons/PdfIcon';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import '../../../styles/components/ComplexComponents/SignAndResignMain.scss';

function ServiceInEPS() {
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
    <main className="aam_sign-and-resign">
      {/* Breadcrumbs */}
      <div className="aam_sign-and-resign__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/clients">{t('breadCrumbs.forClients')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.signAndResign')}
      </div>

      {/* Title */}
      <h1 className="aam_sign-and-resign__header">{t('signAndResignMain.name')}</h1>

      {/* Description */}
      <div className="aam_sign-and-resign__description">
        <p>{t('signAndResignMain.description')}</p>
        <strong>
          {t('signAndResignMain.purposeBeforeLink')}
          <a href="https://map.berlio.by" target="_blank" rel="noreferrer">{t('signAndResignMain.purposeLink')}</a>
          {t('signAndResignMain.purposeAfterLink')}
          {' '}
        </strong>
        <ul>
          <li>{t('signAndResignMain.list1.item1')}</li>
          <li>{t('signAndResignMain.list1.item2')}</li>
          <li>{t('signAndResignMain.list1.item3')}</li>
          <li>{t('signAndResignMain.list1.item4')}</li>
        </ul>
      </div>

      {/* Participants */}
      <h2 className="aam_sign-and-resign__participants">{t('signAndResignMain.participants')}</h2>
      <ul className="aam_sign-and-resign__participants-list">
        <li>{t('signAndResignMain.operator')}{' - '}{t('signAndResignMain.operatorTagline')}</li>
        <li>{t('signAndResignMain.emissioner')}{' - '}{t('signAndResignMain.emissionerTagline')}</li>
        <li>{t('signAndResignMain.agents')}{' - '}{t('signAndResignMain.agentsTagline')}</li>
        <li>{t('signAndResignMain.tradeAndServiceObject')}{' - '}{t('signAndResignMain.tradeAndServiceObjectTagline')}</li>
        <li>{t('signAndResignMain.serviseCenter')}{' - '}{t('signAndResignMain.serviseCenterTagline')}</li>
      </ul>

      <div className="aam_sign-and-resign__documents">
        <h2 className="aam_sign-and-resign__documents-title">{t('signAndResignMain.documentsTitle')}</h2>
        <div className="aam_sign-and-resign__operator-documents">
          <h3 className="aam_sign-and-resign__operator-documents-title">{t('signAndResignMain.operatorDocumentsTitle')}</h3>
          <div className="aam_sign-and-resign__card-boxes">
            <ServiceCard
              className="aam_sign-and-resign__service-card"
              Icon={PdfIcon}
              title={t('signAndResignMain.cardTitle1')}
              description={t('signAndResignMain.cardSubtitle1')}
              link={`${baseUrl}/assets/documents/1.pdf`}
              onClick={() => handleLinkClick(
                t('signAndResignMain.cardTitle1'),
                `${baseUrl}/assets/documents/1.pdf`,
              )}
            />
            <ServiceCard
              className="aam_sign-and-resign__service-card"
              Icon={PdfIcon}
              title={t('signAndResignMain.cardTitle2')}
              description={t('signAndResignMain.cardSubtitle2')}
              link={`${baseUrl}/assets/documents/1.pdf`}
              onClick={() => handleLinkClick(
                t('signAndResignMain.cardTitle2'),
                `${baseUrl}/assets/documents/1.pdf`,
              )}
            />
            <ServiceCard
              className="aam_sign-and-resign__service-card"
              Icon={PdfIcon}
              title={t('signAndResignMain.cardTitle3')}
              description={t('signAndResignMain.cardSubtitle3')}
              link={`${baseUrl}/assets/documents/Договор присоединения Клиента к обслуживанию в электронной платежной системе Берлио.pdf`}
              onClick={() => handleLinkClick(
                t('signAndResignMain.cardTitle3'),
                `${baseUrl}/assets/documents/Договор присоединения Клиента к обслуживанию в электронной платежной системе Берлио.pdf`,
              )}
            />
            <ServiceCard
              className="aam_sign-and-resign__service-card"
              Icon={PdfIcon}
              title={t('signAndResignMain.cardTitle6')}
              description={t('signAndResignMain.cardSubtitle6')}
              link={`${baseUrl}/assets/documents/Перечень цен и тарифов за оказываемые услуги в электронной платёжной системе Берлио.pdf`}
              onClick={() => handleLinkClick(
                t('signAndResignMain.cardTitle6'),
                `${baseUrl}/assets/documents/Перечень цен и тарифов за оказываемые услуги в электронной платёжной системе Берлио.pdf`,
              )}
            />
            <ServiceCard
              className="aam_sign-and-resign__service-card"
              Icon={PdfIcon}
              title={t('signAndResignMain.cardTitle7')}
              description={t('signAndResignMain.cardSubtitle7')}
              link={`${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения клиента к обслуживанию в электронной платежной системе «Берлио».pdf`}
              onClick={() => handleLinkClick(
                t('signAndResignMain.cardTitle7'),
                `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения клиента к обслуживанию в электронной платежной системе «Берлио».pdf`,
              )}
            />
          </div>
          <div className="aam_sign-and-resign__emissioner-documents">
            <h3 className="aam_sign-and-resign__emissioner-documents-title">{t('signAndResignMain.emissionerDocumentsTitle')}</h3>
            <div className="aam_sign-and-resign__card-boxes">
              <ServiceCard
                className="aam_sign-and-resign__service-card"
                Icon={PdfIcon}
                title={t('signAndResignMain.cardTitle4')}
                description={t('signAndResignMain.cardSubtitle4')}
                link={`https://share.google/N8i4oQ79YKy36Htz2`}
                onClick={() => handleLinkClick(
                  t('signAndResignMain.cardTitle4'),
                  `https://share.google/N8i4oQ79YKy36Htz2`,
                )}
              />
              <ServiceCard
                className="aam_sign-and-resign__service-card"
                Icon={PdfIcon}
                title={t('signAndResignMain.cardTitle5')}
                description={t('signAndResignMain.cardSubtitle5')}
                link={`https://belgazprombank.by/korporativnim_klientam/raschetno_kassovoe_obsluzhivani/berlio-ur/`}
                onClick={() => []}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Service & System Usage Reasons */}
      <div className="aam_sign-and-resign__customer-service">
        <strong>{t('signAndResignMain.customerService')}</strong>
        <ul>
          <li>{t('signAndResignMain.list2.item1')}</li>
          <li>{t('signAndResignMain.list2.item2')}</li>
        </ul>
        <p className="aam_sign-and-resign__footer">{t('signAndResignMain.footer')}</p>
      </div>

      {/* System Usage */}
      <div className="aam_sign-and-resign__system-usage">
        <strong>{t('signAndResignMain.systemUsage')}</strong>
        <ul>
          <li>{t('signAndResignMain.list3.item1')}</li>
          <li>{t('signAndResignMain.list3.item2')}</li>
          <li>{t('signAndResignMain.list3.item3')}</li>
          <li>{t('signAndResignMain.list3.item4')}</li>
        </ul>
      </div>

      {/* Кнопки навигации по сайту */}
      <div className="aam_sign-and-resign-section__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('signAndResignSection.homeLink')}
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
          {t('signAndResignSection.upLink')}
        </button>
      </div>
    </main>
  );
}

export default ServiceInEPS;
