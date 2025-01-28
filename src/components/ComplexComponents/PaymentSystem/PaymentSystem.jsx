import React from 'react';
import '../../../styles/components/ComplexComponents/PaymentSystem.scss';
import Button from '../../Button/Button';
import GasStationPNG from '../../../assets/images/gas-station.png';

import { useTranslation } from 'react-i18next';

const PaymentSystem = () => {
    const { t } = useTranslation();

    const handleButtonClick = () => {
        console.log('Navigate to: Страница "Заключение и перезаключение договора"');
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
};

export default PaymentSystem;