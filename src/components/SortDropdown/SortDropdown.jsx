import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/SortDropdown.scss';
import DropdownIcon from '../SVGIcons/DropdownIcon';
import { useTranslation } from 'react-i18next';

const SortDropdown = ({ 
    options, 
    defaultOption, 
    onSelect, 
    openFillColor = '#000', 
    closedFillColor = '#777' 
}) => {
    const { t } = useTranslation();
    
    const [isOpen, setIsOpen] = useState(false);
    const [iconFillColor, setIconFillColor] = useState(closedFillColor);

    const selectedOption = defaultOption;

    const handleSelect = (option) => {
        setIsOpen(false);
        onSelect(option);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.aam_sort-dropdown')) {
                setIsOpen(false);
                setIconFillColor(closedFillColor);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [closedFillColor]);

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
        setIconFillColor(isOpen ? closedFillColor : openFillColor);
    };

    return (
        <div className="aam_sort-dropdown">
            <span className="aam_sort-dropdown__label">{t('newsBlock.sortBy')}</span>
            <div>
                <button
                    className="aam_sort-dropdown__header"
                    onClick={handleDropdownClick}
                >
                    <span className={`aam_sort-dropdown__text ${isOpen ? 'open' : ''}`}>
                        {selectedOption.label}
                    </span>
                    <DropdownIcon
                        className={`aam_sort-dropdown__icon ${isOpen ? 'open' : ''}`}
                        fillColor={iconFillColor}
                        width="17"
                        height="9"
                    />
                </button>

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

export default SortDropdown;