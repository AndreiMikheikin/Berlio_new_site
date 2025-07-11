import React from 'react';
import PropTypes from 'prop-types';

function PlayMarketIcon({
  fillColor = '#48AE5A', width = 66, height = 66, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M43.4591 43.586L5.85196 5.97425M43.4591 21.5928L5.85196 59.2M4.59375 56.3585V8.81568C4.59375 5.69568 8.26161 3.71783 11.2516 5.23604L58.0377 29.0075C61.1112 30.5675 61.1112 34.6114 58.0377 36.1714L11.2516 59.9428C8.26161 61.461 4.59375 59.4832 4.59375 56.3585Z"
        stroke={fillColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

    </svg>
  );
}

PlayMarketIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default PlayMarketIcon;
