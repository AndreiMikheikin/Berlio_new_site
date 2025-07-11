import React from 'react';
import PropTypes from 'prop-types';

function LinkArrowIcon({
  fillColor = '#48AE5A', width = 14, height = 15, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.502069 1.22414C0.502069 0.824208 0.826277 0.5 1.22621 0.5H13.2759C13.6758 0.5 14 0.824208 14 1.22414V13.2738C14 13.6737 13.6758 13.9979 13.2759 13.9979C12.8759 13.9979 12.5517 13.6737 12.5517 13.2738V2.97236L1.23618 14.2879C0.953387 14.5707 0.494889 14.5707 0.212095 14.2879C-0.0706984 14.0051 -0.0706984 13.5466 0.212095 13.2638L11.5276 1.94828H1.22621C0.826277 1.94828 0.502069 1.62407 0.502069 1.22414Z"
        fill={fillColor}
      />
    </svg>
  );
}

LinkArrowIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default LinkArrowIcon;
