import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CardBox from '../../CardBox/CardBox';
import ServiceCard from '../../ServiceCard/ServiceCard';
import LinkButton from '../../LinkButton/LinkButton';
import PdfIcon from '../../SVGIcons/PdfIcon';
import InfoIcon from '../../SVGIcons/InfoIcon';
import HandCashIcon from '../../SVGIcons/HandCashIcon';
import PaymentCardIcon from '../../SVGIcons/PaymentCardIcon';
import ReportIcon from '../../SVGIcons/ReportIcon';
import CashIcon from '../../SVGIcons/CashIcon';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import '../../../styles/components/ComplexComponents/WorkWithPrivateAccountMain.scss';

function WorkWithPrivateAccountMain() {
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
    <main className="aam_work-with-private-account">
      {/* Breadcrumbs */}
      <div className="aam_work-with-private-account__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/clients">{t('breadCrumbs.forClients')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.workWithPrivateAccount')}
      </div>

      {/* Title */}
      <h1 className="aam_work-with-private-account__header">{t('workWithPrivateAccount.name')}</h1>

      {/* Description */}
      <div className="aam_work-with-private-account__description">
        <strong>{t('workWithPrivateAccount.description')}</strong>
        <ol>
          <li>{t('workWithPrivateAccount.list1.item1')}</li>
          <li>{t('workWithPrivateAccount.list1.item2')}</li>
          <li>{t('workWithPrivateAccount.list1.item3')}</li>
          <li>{t('workWithPrivateAccount.list1.item4')}</li>
        </ol>
      </div>

      {/* Sections */}
      <h2 className="aam_work-with-private-account__sections">{t('workWithPrivateAccount.sections')}</h2>
      <div className="aam_work-with-private-account__card-boxes">
        <CardBox
          CSSSelectorPrefix="aam_work-with-private-account"
          Icon={InfoIcon}
          title={t('workWithPrivateAccount.information')}
          description={t('workWithPrivateAccount.informationTagline')}
        />
        <CardBox
          CSSSelectorPrefix="aam_work-with-private-account"
          Icon={HandCashIcon}
          title={t('workWithPrivateAccount.payments')}
          description={t('workWithPrivateAccount.paymentsTagline')}
        />
        <CardBox
          CSSSelectorPrefix="aam_work-with-private-account"
          Icon={PaymentCardIcon}
          title={t('workWithPrivateAccount.cardList')}
          description={t('workWithPrivateAccount.cardListTagline')}
        />
        <CardBox
          CSSSelectorPrefix="aam_work-with-private-account"
          Icon={ReportIcon}
          title={t('workWithPrivateAccount.report')}
          description={t('workWithPrivateAccount.reportTagline')}
        />
        <CardBox
          CSSSelectorPrefix="aam_work-with-private-account"
          Icon={CashIcon}
          title={t('workWithPrivateAccount.balance')}
          description={t('workWithPrivateAccount.balanceTagline')}
        />
      </div>

      <div className="aam_work-with-private-account__container">
        <strong className="aam_work-with-private-account__container--text">{t('workWithPrivateAccount.middleDescriptinon')}</strong>

        <ServiceCard
          className="aam_work-with-private-account__container--service-card"
          Icon={PdfIcon}
          title={t('workWithPrivateAccount.cardTitle1')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление об изменении (смены) номера мобильного телефона «Мастер-телефон» .pdf`}
          onClick={() => handleLinkClick(
            t('workWithPrivateAccount.cardTitle1'),
            `${baseUrl}/assets/documents/Заявление об изменении (смены) номера мобильного телефона «Мастер-телефон» .pdf`,
          )}
        />
        <ServiceCard
          className="aam_work-with-private-account__container--service-card"
          Icon={PdfIcon}
          title={t('workWithPrivateAccount.cardTitle2')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление об установлении суточной, месячной нормы, категории, приоритета электронной карты (категории).pdf`}
          onClick={() => handleLinkClick(
            t('workWithPrivateAccount.cardTitle2'),
            `${baseUrl}/assets/documents/Заявление об установлении суточной, месячной нормы, категории, приоритета электронной карты (категории).pdf`,
          )}
        />
        <ServiceCard
          className="aam_work-with-private-account__container--service-card"
          Icon={PdfIcon}
          title={t('workWithPrivateAccount.cardTitle3')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление об установлении суточной, месячной нормы, категории, приоритета электронной карты (нормы).pdf`}
          onClick={() => handleLinkClick(
            t('workWithPrivateAccount.cardTitle3'),
            `${baseUrl}/assets/documents/Заявление об установлении суточной, месячной нормы, категории, приоритета электронной карты (нормы).pdf`,
          )}
        />
        <ServiceCard
          className="aam_work-with-private-account__container--service-card"
          Icon={PdfIcon}
          title={t('workWithPrivateAccount.cardTitle4')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление об установлении суточной, месячной нормы, категории, приоритета электронной карты (приоритет).pdf`}
          onClick={() => handleLinkClick(
            t('workWithPrivateAccount.cardTitle4'),
            `${baseUrl}/assets/documents/Заявление об установлении суточной, месячной нормы, категории, приоритета электронной карты (приоритет).pdf`,
          )}
        />
      </div>

      {/* Navigation */}
      {/* Кнопка перехода на сайт */}
      <LinkButton href="https://lkb.by" target="_blank" rel="noopener noreferrer" className="green">
        {t('workWithPrivateAccount.lkbLink')}
      </LinkButton>

      {/* Кнопки навигации по сайту */}
      <div className="aam_work-with-private-account__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('workWithPrivateAccount.homeLink')}
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
          {t('workWithPrivateAccount.upLink')}
        </button>
      </div>
    </main>
  );
}

export default WorkWithPrivateAccountMain;
