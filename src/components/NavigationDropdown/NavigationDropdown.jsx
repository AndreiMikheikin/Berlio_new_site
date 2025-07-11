// NavigationDropdown.jsx

import React from 'react';
import PropTypes from 'prop-types';
import DropdownIcon from '../SVGIcons/DropdownIcon';
import '../../styles/components/NavigationDropdown.scss';

function NavigationDropdown({
  label,
  closedColor = 'white',
  openColor = '#176224',
  hoverColor = '#176224',
  isOpen,
  onToggle,
  onClose,
}) {
  const handleToggle = (e) => {
    e.stopPropagation();
    if (isOpen) {
      onClose();
    } else {
      onToggle();
    }
  };

  return (
    <div className="aam_navigation-dropdown">
      <button
        type="button"
        className="aam_navigation-dropdown__toggle"
        onClick={handleToggle}
        style={{
          color: isOpen ? openColor : closedColor,
          ':hover': { color: hoverColor },
        }}
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
}

NavigationDropdown.propTypes = {
  label: PropTypes.node,
  closedColor: PropTypes.string,
  openColor: PropTypes.string,
  hoverColor: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NavigationDropdown;
