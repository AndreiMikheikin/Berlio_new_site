import React from 'react';
import PropTypes from 'prop-types';

function PlusIcon({
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
        d="M25.2715 12.8917C25.2715 13.1573 25.1616 13.412 24.9659 13.5998C24.7703 13.7877 24.5049 13.8932 24.2282 13.8932H13.7948V23.9079C13.7948 24.1735 13.6849 24.4283 13.4892 24.6161C13.2936 24.8039 13.0282 24.9094 12.7515 24.9094C12.4748 24.9094 12.2094 24.8039 12.0137 24.6161C11.8181 24.4283 11.7081 24.1735 11.7081 23.9079V13.8932H1.27478C0.998072 13.8932 0.732695 13.7877 0.537032 13.5998C0.341368 13.412 0.231445 13.1573 0.231445 12.8917C0.231445 12.6261 0.341368 12.3713 0.537032 12.1835C0.732695 11.9957 0.998072 11.8902 1.27478 11.8902H11.7081V1.87544C11.7081 1.60983 11.8181 1.3551 12.0137 1.16729C12.2094 0.979475 12.4748 0.873962 12.7515 0.873962C13.0282 0.873962 13.2936 0.979475 13.4892 1.16729C13.6849 1.3551 13.7948 1.60983 13.7948 1.87544V11.8902H24.2282C24.5049 11.8902 24.7703 11.9957 24.9659 12.1835C25.1616 12.3713 25.2715 12.6261 25.2715 12.8917Z"
        fill={fillColor}
      />
    </svg>
  );
}

PlusIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default PlusIcon;
