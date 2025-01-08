import React, { useContext } from 'react';
import '../../styles/components/ContactInfo.scss';
import PhoneIcon from '../SVGIcons/PhoneIcon';
import DepartmentAdresses from '../../data/departmentAdresses.json';

import { useTranslation } from 'react-i18next';
import { SelectedItemContext } from '../../contexts/SelectedItemContext'; // Импортируем контекст

const ContactInfo = () => {
  const { t } = useTranslation();
  const { selectedItem } = useContext(SelectedItemContext); // Получаем значение из контекста

  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = selectedItem || defaultItem; // Используем выбранный элемент из контекста или дефолтный

  if (!displayedItem) {
    return null; // Если нет данных для отображения, ничего не рендерим
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

export default ContactInfo;
