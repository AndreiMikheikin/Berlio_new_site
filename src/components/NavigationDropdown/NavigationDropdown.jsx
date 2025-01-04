// NavigationDropdown.jsx

import React from 'react';
import PropTypes from 'prop-types';
import DropdownIcon from '../SVGIcons/DropdownIcon';
import '../../styles/components/NavigationDropdown.scss';

const NavigationDropdown = ({
    label,
    closedColor = 'black',
    openColor = 'blue',
    isOpen,
    onToggle,
    onClose,
}) => {
    const handleToggle = (e) => {
        e.stopPropagation();
        isOpen ? onClose() : onToggle();
    };

    return (
        <div className="aam_navigation-dropdown">
            <button
                className="aam_navigation-dropdown__toggle"
                onClick={handleToggle}
                style={{ color: isOpen ? openColor : closedColor }}
            >
                {label}
                <DropdownIcon
                    className={`aam_navigation-dropdown__icon ${isOpen ? 'open' : ''}`}
                    fillColor={isOpen ? openColor : closedColor}
                    width="17"
                    height="9"
                />
            </button>
        </div>
    );
};

NavigationDropdown.propTypes = {
    label: PropTypes.string.isRequired,
    closedColor: PropTypes.string,
    openColor: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default NavigationDropdown;

