import React from 'react';
import PropTypes from 'prop-types';

function LaptopIcon({
  fillColor = '#48AE5A', width = 46, height = 45, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 46 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.0625 33.757H8.9375C8.19181 33.7563 7.47687 33.4597 6.94958 32.9324C6.4223 32.4051 6.12574 31.6902 6.125 30.9445V11.257C6.12574 10.5113 6.4223 9.79639 6.94958 9.2691C7.47687 8.74182 8.19181 8.44526 8.9375 8.44452H37.0625C37.8082 8.44526 38.5231 8.74182 39.0504 9.2691C39.5777 9.79639 39.8743 10.5113 39.875 11.257V30.9445C39.8739 31.6901 39.5772 32.4048 39.05 32.932C38.5228 33.4592 37.8081 33.7559 37.0625 33.757ZM8.9375 11.257V30.9445H37.0625V11.257H8.9375ZM3.3125 36.5695H42.6875V39.382H3.3125V36.5695Z"
        fill={fillColor}
      />
    </svg>
  );
}

LaptopIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default LaptopIcon;
