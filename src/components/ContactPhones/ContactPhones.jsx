import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ContactPhones.scss';
import { useTranslation } from 'react-i18next';
import DepartmentAdresses from '../../data/departmentAdresses.json';

function ContactPhones({ item }) {
  const { t } = useTranslation();

  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = item || defaultItem; // Используем выбранный элемент или дефолтный

  if (!displayedItem) {
    return null;
  }

  const { inCity, phoneNumber } = displayedItem;

  return (
    <div className="aam_contact-phones">
      <p className="aam_contact-phones__title">
        {t('customerService')}
        {' '}
        {t(inCity)}
        :
      </p>
      <ul>
        {phoneNumber.map((number) => {
          const placeholders = {
            fax: t('fax'),
            telFax: t('telFax'),
          };

          return (
            <li key={number}>{t(number, placeholders)}</li>
          );
        })}
      </ul>
    </div>
  );
}

ContactPhones.propTypes = {
  item: PropTypes.shape({
    inCity: PropTypes.string.isRequired,
    phoneNumber: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default ContactPhones;
