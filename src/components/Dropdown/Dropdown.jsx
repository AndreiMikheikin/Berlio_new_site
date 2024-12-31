import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Dropdown.scss';
import DropdownIcon from '../SVGIcons/DropdownIcon';
import LinkTo from '../LinkTo/LinkTo';
import DepartmentAdresses from '../../data/departmentAdresses.json'

const Dropdown = ({ label, items, onSelect, linkText, linkHref, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [fillColor, setFillColor] = useState('black');

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };
  const handleChangeColor = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    setFillColor(fillColor === 'black' ? '#48AE5AFF' : 'black');
  };

  // Функция для обработки клика на ссылке (предотвращаем изменение цвета иконки кнопки)
  const handleLinkClick = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события, чтобы не изменился цвет
  };

  return (
    <div className={`aam_dropdown ${className}`} onClick={handleToggle}>
      <button
        className={`aam_dropdown-toggle ${isOpen ? 'open' : ''}`}
        onClick={(e) => {
          handleToggle();
          handleChangeColor(e); // Меняем цвет при клике на кнопку
        }}
      >
        {/* // Устанавливаем {selectedItem || label} если нужно отобразить выбранный элемент */}
        {label} 
        <DropdownIcon 
          className={`aam_dropdown-icon ${isOpen ? 'open' : ''}`}
          fillColor={fillColor} width="17" height="9"
          />
      </button>
      {isOpen && (
        <ul className="aam_dropdown-menu">
          {DepartmentAdresses.map((item, index) => (
            <li
              key={index}
              className="aam_dropdown-item"
              onClick={() => handleSelect(item)}
            >
              <span className="address">{item.address}</span>
              <span className="phone">{item.phoneNumber}</span>
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
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  className: PropTypes.string,
};

export default Dropdown;
