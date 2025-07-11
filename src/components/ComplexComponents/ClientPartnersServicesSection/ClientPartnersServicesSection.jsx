import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/ClientPartnersServicesSection.scss';
import { useTranslation } from 'react-i18next';
import Button from '../../Button/Button';

function ClientPartnersServicesSection() {
  const { t } = useTranslation(); // Вызов метода useTranslation

  const navigate = useNavigate();

  const handleButtonClick1 = () => {
    navigate('/clients');
  };

  const handleButtonClick2 = () => {
    navigate('/partners');
  };

  return (
    <section className="aam_clients-partners-section">
      <h2 className="aam_clients-partners-section__title">{t('cpsSection.name')}</h2>
      <ol className="aam_clients-partners-section__list">
        <li className="aam_clients-partners-section__item">{t('cpsSection.listItem1')}</li>
        <li className="aam_clients-partners-section__item">{t('cpsSection.listItem2')}</li>
        <li className="aam_clients-partners-section__item">{t('cpsSection.listItem3')}</li>
        <li className="aam_clients-partners-section__item">{t('cpsSection.listItem4')}</li>
        <li className="aam_clients-partners-section__item">{t('cpsSection.listItem5')}</li>
        <li className="aam_clients-partners-section__item">{t('cpsSection.listItem6')}</li>
        <li className="aam_clients-partners-section__item">{t('cpsSection.listItem7')}</li>
      </ol>
      <div className="aam_clients-partners-section__buttons">
        <Button
          label={t('cpsSection.forClients')}
          onClick={handleButtonClick1}
          className="green"
        />
        <Button
          label={t('cpsSection.forPartners')}
          onClick={handleButtonClick2}
          className="green"
        />
      </div>
    </section>
  );
}

export default ClientPartnersServicesSection;
