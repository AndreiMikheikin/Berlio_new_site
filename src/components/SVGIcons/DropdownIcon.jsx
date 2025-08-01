import React from 'react';
import PropTypes from 'prop-types';

function DropdownIcon({
  fillColor = 'black', width = 17, height = 9, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 17 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Dropdown">
        <path
          id="Vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.868707 1.16183C1.16224 0.831602 1.6679 0.801857 1.99812 1.09539L8.66663 7.02295L15.3351 1.09539C15.6654 0.801857 16.171 0.831602 16.4645 1.16183C16.7581 1.49205 16.7283 1.99771 16.3981 2.29125L9.19812 8.69124C8.89501 8.96067 8.43824 8.96067 8.13514 8.69124L0.935143 2.29125C0.604917 1.99771 0.575173 1.49205 0.868707 1.16183Z"
          fill={fillColor}
        />
      </g>
    </svg>
  );
}

DropdownIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default DropdownIcon;
