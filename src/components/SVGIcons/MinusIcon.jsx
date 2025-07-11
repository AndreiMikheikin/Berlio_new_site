import React from 'react';
import PropTypes from 'prop-types';

function MinusIcon({
  fillColor = '#000D04', width = 25, height = 13, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 25 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.3651 1.01404C24.3651 1.21748 24.2843 1.41259 24.1404 1.55645C23.9966 1.70031 23.8014 1.78113 23.598 1.78113H1.09385C0.890375 1.78113 0.695239 1.70031 0.551363 1.55645C0.407488 1.41259 0.32666 1.21748 0.32666 1.01404C0.32666 0.810592 0.407488 0.615481 0.551363 0.471624C0.695239 0.327767 0.890375 0.246948 1.09385 0.246948H23.598C23.8014 0.246948 23.9966 0.327767 24.1404 0.471624C24.2843 0.615481 24.3651 0.810592 24.3651 1.01404Z"
        fill={fillColor}
      />
    </svg>
  );
}

MinusIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default MinusIcon;
