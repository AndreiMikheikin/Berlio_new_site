import React from 'react';
import PropTypes from 'prop-types';

function GlobeIcon({
  fillColor = '#48AE5A', width = 60, height = 61, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 60 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M57.5 30.5C57.5 37.7935 54.6027 44.7882 49.4454 49.9454C44.2882 55.1027 37.2935 58 30 58C22.7065 58 15.7118 55.1027 10.5546 49.9454C5.39731 44.7882 2.5 37.7935 2.5 30.5M57.5 30.5C57.5 23.2065 54.6027 16.2118 49.4454 11.0546C44.2882 5.89731 37.2935 3 30 3C22.7065 3 15.7118 5.89731 10.5546 11.0546C5.39731 16.2118 2.5 23.2065 2.5 30.5M57.5 30.5H2.5"
        stroke={fillColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.5767 30.5C40.0572 40.5565 36.353 50.1872 29.9998 58C23.6465 50.1872 19.9424 40.5565 19.4229 30.5C19.9424 20.4435 23.6465 10.8128 29.9998 3C36.353 10.8128 40.0572 20.4435 40.5767 30.5Z"
        stroke={fillColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

GlobeIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default GlobeIcon;
