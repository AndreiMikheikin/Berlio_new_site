import React, { useContext } from 'react';
import LinkTo from '../../LinkTo/LinkTo';
import '../../../styles/components/ComplexComponents/ForBankInformationContactSection.scss';
import DepartmentAdresses from '../../../data/departmentAdresses.json';

import { SelectedItemContext } from '../../../contexts/SelectedItemContext';
import { useTranslation } from 'react-i18next';

const ForBankInformationContactSection = () => {
    const { t } = useTranslation();
    const { selectedItem } = useContext(SelectedItemContext);

    const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
    const displayedItem = selectedItem || defaultItem;

    if (!displayedItem) {
        return null;
    }

    const { departmentsName, footerShortAddress, phoneNumber, email, departmentsImage } = displayedItem;

    return (
        <section className='aam_for-bank-info-contact-section'>
            <div className="aam_for-bank-info-contact-section__address">
                <h4 className="aam_for-bank-info-contact-section__contact-name">{t(departmentsName)}</h4>
                <div className="aam_for-bank-info-contact-section__contact-address">
                    <div className="aam_for-bank-info-contact-section__section">
                    <p><strong>{t('forBankInfoContact.address')}:</strong> {t(footerShortAddress)}</p>
                    </div>
                    <div className="aam_for-bank-info-contact-section__section">
                    <p className="aam_for-bank-info-contact-section__phone"><strong>{t('forBankInfoContact.phone')}:</strong> {phoneNumber[0]}</p>
                    </div>
                    <div className="aam_for-bank-info-contact-section__section">
                        <p className="aam_for-bank-info-contact-section__email"><strong>{t('forBankInfoContact.forOrganizations')}:</strong> {email[0]}</p>
                        <p className="aam_for-bank-info-contact-section__email"><strong>{t('forBankInfoContact.forClientInquiries')}:</strong> {email[1]}</p>
                    </div>
                </div>
                <LinkTo href="/contacts" text={t('forBankInfoContact.readMore')} />
            </div>
            <div className='aam_for-bank-info-contact-section__image'>
                <img src={departmentsImage} alt={departmentsName} title={departmentsName} />
            </div>
        </section>
    );
};

export default ForBankInformationContactSection;