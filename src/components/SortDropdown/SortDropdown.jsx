import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/SortDropdown.scss';
import DropdownIcon from '../SVGIcons/DropdownIcon';

import { useTranslation } from 'react-i18next';

const SortDropdown = ({ options, defaultOption, onSelect, openFillColor, closedFillColor }) => {
    const { t } = useTranslation();
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [iconFillColor, setIconFillColor] = useState(closedFillColor);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.aam_sort-dropdown')) {
                setIsOpen(false); // Закрытие выпадающего списка при клике вне
                setIconFillColor(closedFillColor); // Возвращаем цвет иконки в черный при закрытии
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [closedFillColor]);

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
        setIconFillColor(isOpen ? closedFillColor : openFillColor); // Изменяем цвет иконки в зависимости от состояния
    };

    return (
        <div className="aam_sort-dropdown">
            {/* Заголовок с текущим значением */}
            <span className="aam_sort-dropdown__label">{t('newsBlock.sortBy')}</span>
            <div>
                <button
                    className="aam_sort-dropdown__header"
                    onClick={handleDropdownClick}
                >
                    <span className={`aam_sort-dropdown__text ${isOpen ? 'open' : ''}`}>{selectedOption.label}</span>
                    <DropdownIcon
                        className={`aam_sort-dropdown__icon ${isOpen ? 'open' : ''}`}
                        fillColor={iconFillColor} // Цвет иконки меняется в зависимости от состояния
                        width="17"
                        height="9"
                    />
                </button>

                {/* Пункты, отличающиеся от текущего */}
                {isOpen && (
                    <ul className="aam_sort-dropdown__list">
                        {options
                            .filter((option) => option.value !== selectedOption.value)
                            .map((option) => (
                                <li
                                    key={option.value}
                                    className="aam_sort-dropdown__item"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.label}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

SortDropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    defaultOption: PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    openFillColor: PropTypes.string,
    closedFillColor: PropTypes.string,
};

SortDropdown.defaultProps = {
    openFillColor: '#000',  // цвет для раскрытого состояния
    closedFillColor: '#777', // цвет для закрытого состояния
};

export default SortDropdown;
