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
      <h2 className="aam_clients-partners-section__title">{t('csSection.name')}</h2>
      <ol className="aam_clients-partners-section__list">
        <li className="aam_clients-partners-section__item">{t('csSection.listItem1')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem2')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem3')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem4')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem5')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem6')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem7')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem8')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem9')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem10')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem11')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem12')}</li>
        <li className="aam_clients-partners-section__item">{t('csSection.listItem13')}</li>
      </ol>
      <h2 className="aam_clients-partners-section__title">{t('psSection.name')}</h2>
      <ol className="aam_clients-partners-section__list">
        <li className="aam_clients-partners-section__item">{t('psSection.listItem1')}</li>
        <li className="aam_clients-partners-section__item">{t('psSection.listItem2')}</li>
        <li className="aam_clients-partners-section__item">{t('psSection.listItem3')}</li>
        <li className="aam_clients-partners-section__item">{t('psSection.listItem4')}</li>
      </ol>
      <div className="aam_clients-partners-section__buttons">
        <Button
          label={t('csSection.forClients')}
          onClick={handleButtonClick1}
          variant="green"
        />
        <Button
          label={t('csSection.forPartners')}
          onClick={handleButtonClick2}
          variant="green"
        />
      </div>
    </section>
  );
}

export default ClientPartnersServicesSection;
