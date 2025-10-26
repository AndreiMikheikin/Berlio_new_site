import React from 'react';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../../ServiceCard/ServiceCard';
import PaymentWirelessIcon from '../../SVGIcons/PaymentWirelessIcon';
import PaymentCardIcon from '../../SVGIcons/PaymentCardIcon';
import MapIcon from '../../SVGIcons/MapIcon';
import '../../../styles/components/ComplexComponents/SystemSection.scss';
import SySJPG1 from '/assets/images/systemSection1.jpg';
import SySJPG2 from '/assets/images/systemSection2.jpg';

function SystemSection() {
  const { t } = useTranslation();

  return (
    <section className="aam_system-section">
      {/* Title */}
      <h2 className="aam_system-section__title">{t('systemSection.name')}</h2>

      {/* Services */}
      <div className="aam_system-section__services">
        <ServiceCard
          Icon={PaymentCardIcon}
          title={t('systemSection.cardTitle.card1')}
          description={t('systemSection.cardDescription.desc1')}
          link="/clients/gettingElectronicCard"
        />
        <ServiceCard
          Icon={PaymentWirelessIcon}
          title={t('systemSection.cardTitle.card2')}
          description={t('systemSection.cardDescription.desc2')}
          link="/clients/fuelCardsUsage"
        />
        <ServiceCard
          Icon={MapIcon}
          title={t('systemSection.cardTitle.card3')}
          description={t('systemSection.cardDescription.desc3')}
          link="/clients/serviceInEPS"
        />
      </div>

      <div className="aam_system-section__additional-services">
        <p className="aam_system-section__list-title">{t('systemSection.listTitle')}</p>
        <ol>
          <li>{t('systemSection.listItem1')}</li>
          <li>{t('systemSection.listItem2')}</li>
          <li>{t('systemSection.listItem3')}</li>
          <li>{t('systemSection.listItem4')}</li>
          <li>{t('systemSection.listItem5')}</li>
        </ol>
      </div>

      {/* Images */}
      <div className="aam_system-section__images">
        <img src={SySJPG1} alt={t('systemSection.alt1')} className="aam_system-section__image" loading="lazy" />
        <img src={SySJPG2} alt={t('systemSection.alt2')} className="aam_system-section__image" loading="lazy" />
      </div>
    </section>
  );
}

export default SystemSection;
