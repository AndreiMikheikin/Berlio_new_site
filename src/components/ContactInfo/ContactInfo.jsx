import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ContactInfo.scss';
import PhoneIcon from '../SVGIcons/PhoneIcon';
import DepartmentAdresses from '../../data/departmentAdresses.json';

const ContactInfo = ({ item }) => {
  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = item || defaultItem; // Используем выбранный элемент или дефолтный

  if (!displayedItem) {
    return null;
  }

  return (
    <div className="aam_contact-info">
      <div className="aam_service-location">
        Обслуживание клиентов {displayedItem.inCity}
      </div>
      <div className="aam_contact-details">
        <PhoneIcon className="aam_phone-icon" />
        <div className="aam_phone-number">{displayedItem.phoneNumber}</div>
      </div>
    </div>
  );
};

ContactInfo.propTypes = {
  item: PropTypes.shape({
    inCity: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }),
};

export default ContactInfo;
