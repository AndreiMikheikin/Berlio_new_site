import React from "react";
import '../../../styles/components/ComplexComponents/ClientPartnersServicesSection.scss';
import Button from "../../Button/Button";

import { useTranslation } from "react-i18next";

const ClientPartnersServicesSection = () => {
    const { t } = useTranslation(); // Вызов метода useTranslation

    const handleButtonClick1 = () => {
        console.log('Navigate to: Страница "Для клиентов"');
    };

    const handleButtonClick2 = () => {
        console.log('Navigate to: Страница "Для партнеров"');
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
};

export default ClientPartnersServicesSection;
