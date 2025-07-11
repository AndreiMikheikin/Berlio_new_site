import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/PaymentSystem.scss';
import { useTranslation } from 'react-i18next';
import Button from '../../Button/Button';
import GasStationPNG from '/assets/images/gas-station.png';

function PaymentSystem() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/clients/signAndResign');
  };

  return (
    <section className="aam_payment-system">
      <h2 className="aam_payment-system__title">{t('paymentSystem.name')}</h2>
      <div className="aam_payment-system__description">
        {t('paymentSystem.coverage')}
        <br />
        {t('paymentSystem.cardDescription')}
      </div>
      <Button
        label={t('paymentSystem.actionSignContract')}
        onClick={handleButtonClick}
        className="green"
      />
      <div className="aam_payment-system__image"><img src={GasStationPNG} alt={t('paymentSystem.gasStations')} loading="lazy" /></div>
    </section>
  );
}

export default PaymentSystem;
