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

  if (
    !displayedItem ||
    !Array.isArray(displayedItem.phoneNumber) ||
    displayedItem.phoneNumber.length === 0
  ) {
    return null; // нет данных, чтобы безопасно рендерить
  }

  const firstPhone = displayedItem.phoneNumber[0];
  const secondPhone =
    displayedItem.id === 1 && displayedItem.phoneNumber[1]
      ? displayedItem.phoneNumber[1]
      : null;

  return (
    <div className="aam_contact-info">
      <div className="aam_service-location">
        {t('customerService')} {t(displayedItem.inCity)}
      </div>

      {/* первый номер */}
      <a href={`tel:${firstPhone}`} className="aam_contact-details">
        <PhoneIcon className="aam_phone-icon" />
        <div className="aam_phone-number">{firstPhone}</div>
      </a>

      {/* второй номер только для id=1 */}
      {secondPhone && (
        <a href={`tel:${secondPhone}`} className="aam_contact-details">
          <PhoneIcon className="aam_phone-icon" />
          <div className="aam_phone-number">{secondPhone}</div>
        </a>
      )}
    </div>
  );
}

export default ContactInfo;
