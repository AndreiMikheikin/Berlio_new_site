import React from 'react';
import { useTranslation } from 'react-i18next';
import CardBox from '../../CardBox/CardBox';
import ClockIcon from '../../SVGIcons/ClockIcon';
import LaptopIcon from '../../SVGIcons/LaptopIcon';
import MultifunctionIcon from '../../SVGIcons/MultifunctionIcon';
import '../../../styles/components/ComplexComponents/ClientsAdvantagesSection.scss';

function ClientsAdvantagesSection() {
  const { t } = useTranslation();
  const CSSSelectorPrefix = 'aam_clients-advantages-section';

  return (
    <section className={`${CSSSelectorPrefix}`}>
      {/* Title */}
      <h2 className={`${CSSSelectorPrefix}__title`}>{t('clientsAdvantages.name')}</h2>

      {/* Cards */}
      <div className={`${CSSSelectorPrefix}__cards-box`}>
        <CardBox
          CSSSelectorPrefix={CSSSelectorPrefix}
          Icon={ClockIcon}
          title={t('clientsAdvantages.customerService')}
          description={t('clientsAdvantages.customerServiceTagline')}
        />
        <CardBox
          CSSSelectorPrefix={CSSSelectorPrefix}
          Icon={LaptopIcon}
          title={t('clientsAdvantages.dealSign')}
          description={t('clientsAdvantages.dealSignTagline')}
        />
        <CardBox
          CSSSelectorPrefix={CSSSelectorPrefix}
          Icon={MultifunctionIcon}
          title={t('clientsAdvantages.personalCabinet')}
          description={t('clientsAdvantages.personalCabinetTagline')}
        />
      </div>
    </section>
  );
}

export default ClientsAdvantagesSection;
