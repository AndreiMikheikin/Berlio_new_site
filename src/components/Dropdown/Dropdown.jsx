import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Dropdown.scss';
import DropdownIcon from '../SVGIcons/DropdownIcon';
import LinkTo from '../LinkTo/LinkTo';
import DepartmentAdresses from '../../data/departmentAdresses.json';

import { useTranslation } from 'react-i18next';

const Dropdown = ({ label, onSelect, linkText, linkHref, className = '' }) => {
  const { t } = useTranslation();

  const defaultItem = useMemo(() => DepartmentAdresses.find((item) => item.id === 1), []); // Находим элемент с id = 1 и кэшируем
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultItem || null);
  const [fillColor, setFillColor] = useState('black'); // Изначально черный цвет

  // Эффект для закрытия Dropdown при клике за пределы компонента
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.aam_dropdown')) {
        setIsOpen(false); // Закрытие выпадающего списка при клике вне
        setFillColor('black'); // Возвращаем цвет иконки в черный при закрытии
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedItem) {
      onSelect(selectedItem); // Передаем выбранный элемент в onSelect
    }
  }, [selectedItem, onSelect]);

  const handleToggle = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события, чтобы не сработал handleClickOutside
    setIsOpen(!isOpen);
    setFillColor(isOpen ? 'black' : '#48AE5AFF'); // Меняем цвет иконки на зеленоватый при открытии, и на черный при закрытии
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`aam_dropdown ${className}`}>
      <button
        className={`aam_dropdown-toggle ${isOpen ? 'open' : ''}`}
        onClick={handleToggle}
      >
        {label}
        <DropdownIcon
          className={`aam_dropdown-icon ${isOpen ? 'open' : ''}`}
          fillColor={fillColor}
          width="17"
          height="9"
        />
      </button>
      {isOpen && (
        <ul className="aam_dropdown-menu">
          {DepartmentAdresses.map((item) => (
            <li
              key={item.id}
              className="aam_dropdown-item"
              onClick={() => handleSelect(item)}
            >
              <span className="aam_dropdown-item__address">{t(item.address)}</span>
              <span className="aam_dropdown-item__phone">{item.phoneNumber}</span>
            </li>
          ))}
          {linkText && linkHref && (
            <div className="aam_dropdown__footer" onClick={handleLinkClick}>
              <LinkTo href={linkHref} text={linkText} />
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  className: PropTypes.string,
};

export default Dropdown;
