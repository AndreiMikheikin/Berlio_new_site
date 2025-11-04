import React from 'react';
import PropTypes from 'prop-types';

function PencilIcon({
  fillColor = '#000D04', width = 26, height = 26, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.33333 18.875L0.8125 25.1875L7.125 23.6667L21.2917 9.5L16.5 4.70833L2.33333 18.875ZM24.3958 6.39583C24.8958 5.89583 24.8958 5.08333 24.3958 4.58333L21.4167 1.60417C20.9167 1.10417 20.1042 1.10417 19.6042 1.60417L17.4375 3.77083L22.2292 8.5625L24.3958 6.39583Z"
        fill={fillColor}
      />
    </svg>
  );
}

PencilIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default PencilIcon;
