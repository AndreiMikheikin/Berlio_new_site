import React from 'react';
import PropTypes from 'prop-types';

function SearchIcon({
  fillColor = '#A3A3A3', width = 22, height = 22, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Search">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5116 2.30508C5.79152 2.30508 1.96512 6.13149 1.96512 10.8516C1.96512 15.5717 5.79152 19.3981 10.5116 19.3981C15.2317 19.3981 19.0581 15.5717 19.0581 10.8516C19.0581 6.13149 15.2317 2.30508 10.5116 2.30508ZM0.5 10.8516C0.5 5.32232 4.98236 0.839966 10.5116 0.839966C16.0409 0.839966 20.5233 5.32232 20.5233 10.8516C20.5233 13.3526 19.6062 15.6393 18.0901 17.394L21.2854 20.5894C21.5715 20.8755 21.5715 21.3393 21.2854 21.6254C20.9994 21.9115 20.5355 21.9115 20.2494 21.6254L17.0541 18.43C15.2994 19.9462 13.0126 20.8632 10.5116 20.8632C4.98236 20.8632 0.5 16.3809 0.5 10.8516Z"
          fill={fillColor}
        />
      </g>
    </svg>
  );
}

SearchIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default SearchIcon;
