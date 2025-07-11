import React from 'react';
import { useTranslation } from 'react-i18next';
import CardBox from '../../CardBox/CardBox';
import RecycleIcon from '../../SVGIcons/RecycleIcon';
import BarcodeIcon from '../../SVGIcons/BarcodeIcon';
import LocationIcon from '../../SVGIcons/LocationIcon';
import '../../../styles/components/ComplexComponents/PartnersAdvantagesSection.scss';

function PartnersAdvantagesSection() {
  const { t } = useTranslation();
  const CSSSelectorPrefix = 'aam_partners-advantages-section';

  return (
    <section className={`${CSSSelectorPrefix}`}>
      {/* Title */}
      <h2 className={`${CSSSelectorPrefix}__title`}>{t('partnersAdvantages.name')}</h2>

      {/* Cards */}
      <div className={`${CSSSelectorPrefix}__cards-box`}>
        <CardBox
          CSSSelectorPrefix={CSSSelectorPrefix}
          Icon={RecycleIcon}
          title={t('partnersAdvantages.documentsCycle')}
          description={t('partnersAdvantages.documentsCycleTagline')}
        />
        <CardBox
          CSSSelectorPrefix={CSSSelectorPrefix}
          Icon={BarcodeIcon}
          title={t('partnersAdvantages.billPrint')}
          description={t('partnersAdvantages.billPrintTagline')}
        />
        <CardBox
          CSSSelectorPrefix={CSSSelectorPrefix}
          Icon={LocationIcon}
          title={t('partnersAdvantages.location')}
          description={t('partnersAdvantages.locationTagline')}
        />
      </div>
    </section>
  );
}

export default PartnersAdvantagesSection;
