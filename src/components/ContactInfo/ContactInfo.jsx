import React, { useContext } from 'react';
import '../../styles/components/ContactInfo.scss';
import { useTranslation } from 'react-i18next';
import PhoneIcon from '../SVGIcons/PhoneIcon';
import DepartmentAdresses from '../../data/departmentAdresses.json';

import { SelectedItemContext } from '../../contexts/SelectedItemContext'; // Импортируем контекст

function ContactInfo() {
  const { t } = useTranslation();
  const { selectedItem } = useContext(SelectedItemContext);
  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = selectedItem || defaultItem;

  if (!displayedItem || !Array.isArray(displayedItem.phoneNumber) || displayedItem.phoneNumber.length === 0) {
    return null; // нет данных, чтобы безопасно рендерить
  }

  const phone = displayedItem.phoneNumber[0];

  return (
    <div className="aam_contact-info">
      <div className="aam_service-location">
        {t('customerService')} {t(displayedItem.inCity)}
      </div>
      <a href={`tel:${phone}`} className="aam_contact-details">
        <PhoneIcon className="aam_phone-icon" />
        <div className="aam_phone-number">{phone}</div>
      </a>
    </div>
  );
}


export default ContactInfo;
