import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Dropdown.scss';
import { useTranslation } from 'react-i18next';
import DropdownIcon from '../SVGIcons/DropdownIcon';
import LinkTo from '../LinkTo/LinkTo';
import DepartmentAdresses from '../../data/departmentAdresses.json';

function Dropdown({
  label, onSelect, linkText, linkHref, className = '',
}) {
  const { t } = useTranslation();
  const defaultItem = useMemo(() => DepartmentAdresses.find((item) => item.id === 1), []);

  const [selectedItem, setSelectedItem] = useState(defaultItem);
  const [isOpen, setIsOpen] = useState(false);
  const [fillColor, setFillColor] = useState('black');

  // SSR-safe sessionStorage чтение
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('selectedItem');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSelectedItem(parsed);
        } catch (e) {
          console.warn('Invalid sessionStorage data for selectedItem');
        }
      }
    }
  }, []);

  // Эффект для закрытия Dropdown при клике за пределы компонента
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.aam_dropdown')) {
        setIsOpen(false);
        setFillColor('black');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Сохранение выбора
  useEffect(() => {
    if (typeof window !== 'undefined' && selectedItem) {
      sessionStorage.setItem('selectedItem', JSON.stringify(selectedItem));
      onSelect(selectedItem);
    }
  }, [selectedItem, onSelect]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    setFillColor(isOpen ? 'black' : '#48AE5AFF');
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleLinkClick = (e) => e.stopPropagation();

  return (
    <div className={`aam_dropdown ${className}`}>
      <button
        type="button"
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
            <li key={item.id} className="aam_dropdown-item">
              <button
                type="button"
                className="aam_dropdown-item__button"
                onClick={() => handleSelect(item)}
              >
                <span className="aam_dropdown-item__address">{t(item.address)}</span>
                <span className="aam_dropdown-item__phone">
                  <span>{item.phoneNumber[0]}</span>
                  {item.id === 1 && item.phoneNumber[1] && (
                    <span>{', '}{item.phoneNumber[1]}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
          {linkText && linkHref && (
            <div
              className="aam_dropdown__footer"
              role="button"
              tabIndex={0}
              onClick={handleLinkClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleLinkClick(e);
                }
              }}
            >
              <LinkTo href={linkHref} text={linkText} />
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  className: PropTypes.string,
};

export default Dropdown;
