import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Dropdown.scss';
import DropdownIcon from '../SVGIcons/DropdownIcon';
import LinkTo from '../LinkTo/LinkTo';
import DepartmentAdresses from '../../data/departmentAdresses.json';

import { useTranslation } from 'react-i18next';
import { SelectedItemContext } from '../../contexts/SelectedItemContext'; // Импортируем контекст

const Dropdown = ({ label, onSelect, linkText, linkHref, className = '' }) => {
  const { t } = useTranslation();
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext); // Используем контекст

  const [isOpen, setIsOpen] = useState(false);
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
      setSelectedItem(selectedItem); // Передаем выбранный элемент в контекст
    }
  }, [selectedItem, setSelectedItem]); // Убедитесь, что update происходит только если выбран новый элемент

  const handleToggle = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события, чтобы не сработал handleClickOutside
    setIsOpen(!isOpen);
    setFillColor(isOpen ? 'black' : '#48AE5AFF'); // Меняем цвет иконки на зеленоватый при открытии
  };

  const handleSelect = (item) => {
    onSelect(item); // Передаем выбранный элемент в контекст
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
              <span className="aam_dropdown-item__phone">{item.phoneNumber[0]}</span>
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
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  className: PropTypes.string,
};

export default Dropdown;
