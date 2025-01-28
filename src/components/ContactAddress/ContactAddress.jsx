import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ContactAddress.scss';
import DepartmentAdresses from '../../data/departmentAdresses.json';

import { useTranslation } from 'react-i18next';

const ContactAddress = ({ item }) => {
    const { t } = useTranslation();

    const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
    const displayedItem = item || defaultItem; // Используем выбранный элемент или дефолтный

    if (!displayedItem) {
        return null;
    }

    const { departmentsName, footerAddress, workingHours, email } = displayedItem;

    return (
        <>
            <h4 className="aam_contact-name">{t(departmentsName)}</h4>
            <div className="aam_contact-address">
                <div className="aam_contact-address__section">
                    <p>{t(footerAddress)}</p>
                </div>
                <div className="aam_contact-address__section">
                    <p>{t(workingHours[0])}</p>
                    <p>{t(workingHours[1])}</p>
                </div>
                <div className="aam_contact-address__section">
                    <p className="aam_contact-address__email"><span>{t('forOrganizations')}:</span> {email[0]}</p>
                    <p className="aam_contact-address__email"><span>{t('forClientInquiries')}:</span> {email[1]}</p>
                    <p className="aam_contact-address__email"><span>{t('technicalSupport')}:</span> {email[2]}</p>
                </div>
            </div>
        </>
    );
};

ContactAddress.propTypes = {
    item: PropTypes.shape({
        address: PropTypes.string.isRequired,
        workingHours: PropTypes.arrayOf(PropTypes.string).isRequired,
        email: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
};

export default ContactAddress;
