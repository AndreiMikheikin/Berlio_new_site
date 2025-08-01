import React from 'react';
import PropTypes from 'prop-types';

function DocxIcon({
  fillColor = '#48AE5A', width = 52, height = 65, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 52 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.92857 61.4284C8.22361 61.4284 6.58848 60.7511 5.38288 59.5455C4.17729 58.34 3.5 56.7048 3.5 54.9999V8.57129C3.5 5.80986 5.73858 3.57129 8.5 3.57129H30.3575C31.6836 3.57129 32.9554 4.09807 33.893 5.03576L47.0355 18.1783C47.9732 19.1159 48.5 20.3877 48.5 21.7138V54.9999C48.5 56.7048 47.8227 58.34 46.6171 59.5455C45.4115 60.7511 43.7764 61.4284 42.0714 61.4284H9.92857Z"
        stroke={fillColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.2141 3.57129V17.857C29.2141 20.6184 31.4527 22.857 34.2141 22.857H48.4998"
        stroke={fillColor}
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

DocxIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default DocxIcon;
