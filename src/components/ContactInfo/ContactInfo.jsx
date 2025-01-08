import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ContactInfo.scss';
import PhoneIcon from '../SVGIcons/PhoneIcon';
import DepartmentAdresses from '../../data/departmentAdresses.json';

import { useTranslation } from 'react-i18next';

const ContactInfo = ({ item }) => {
  const { t } = useTranslation();

  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = item || defaultItem; // Используем выбранный элемент или дефолтный

  if (!displayedItem) {
    return null;
  }

  return (
    <div className="aam_contact-info">
      <div className="aam_service-location">
        {t('customerService')} {t(displayedItem.inCity)}
      </div>
      <a href={`tel:${displayedItem.phoneNumber[0]}`} className="aam_contact-details">
        <PhoneIcon className="aam_phone-icon" />
        <div className="aam_phone-number">{displayedItem.phoneNumber[0]}</div>
      </a>
    </div>
  );
};

ContactInfo.propTypes = {
  item: PropTypes.shape({
    inCity: PropTypes.string.isRequired,
    phoneNumber: PropTypes.arrayOf(PropTypes.string).isRequired, // Исправлено на массив строк
  }),
};

export default ContactInfo;
