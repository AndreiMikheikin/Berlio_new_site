import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LinkTo from '../../LinkTo/LinkTo';
import ServiceCard from '../../ServiceCard/ServiceCard';
import OilIcon from '../../SVGIcons/OilIcon';
import PaymentCardIcon from '../../SVGIcons/PaymentCardIcon';
import MapIcon from '../../SVGIcons/MapIcon';
import '../../../styles/components/ComplexComponents/ForBankInformationMain.scss';

function ForBankInformationMain() {
  const { t } = useTranslation();

  return (
    <main className="aam_for-bank-info-main">
      {/* Breadcrumbs */}
      <div className="aam_for-bank-info-main__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/partners">{t('breadCrumbs.forPartners')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.forBankInfo')}
      </div>

      {/* Title */}
      <h1 className="aam_for-bank-info-main__header">{t('forBankInfoMain.name')}</h1>

      {/* Card Boxes */}
      <div className="aam_for-bank-info-main__card-boxes">
        <ServiceCard
          CSSSelectorPrefix="aam_for-bank-info-main"
          Icon={OilIcon}
          title={t('forBankInfoMain.system')}
          description={t('forBankInfoMain.systemTagline')}
          link="/partners/cardUsageRules"
        />
        <ServiceCard
          CSSSelectorPrefix="aam_for-bank-info-main"
          Icon={PaymentCardIcon}
          title={t('forBankInfoMain.usage')}
          description={t('forBankInfoMain.usageTagline')}
          link="/partners/plasticCardUsageRules"
        />
        <ServiceCard
          CSSSelectorPrefix="aam_for-bank-info-main"
          Icon={MapIcon}
          title={t('forBankInfoMain.nonResident')}
          description={t('forBankInfoMain.nonResidentTagline')}
          link="/partners/forNotAResidentsServices"
        />
      </div>
      <footer className="aam_for-bank-info-main__footer">
        <LinkTo href="/about" text={t('forBankInfoMain.readMore')} />
      </footer>
    </main>
  );
}

export default ForBankInformationMain;
