import React from 'react';
import PropTypes from 'prop-types';

function UpArrowInCircleIcon({
  fillColor = '#A3A3A3', width = 47, height = 47, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m24.03 13.49c-0.2929-0.2929-0.7677-0.2929-1.0606 0l-4.773 4.773c-0.2929 0.2928-0.2929 0.7677 0 1.0606s0.7678 0.2929 1.0607 0l4.2426-4.2426 4.2426 4.2426c0.2929 0.2929 0.7678 0.2929 1.0607 0s0.2929-0.7678 0-1.0606zm0.2197 20.24v-19.71h-1.5v19.71z"
        fill={fillColor}
      />
      <circle cx="23.5" cy="23.5" r="23" stroke={fillColor} />
    </svg>
  );
}

UpArrowInCircleIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default UpArrowInCircleIcon;
