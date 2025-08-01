import React from 'react';
import PropTypes from 'prop-types';

function ReportIcon({
  fillColor = '#48AE5A', width = 76, height = 76, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M61.0375 22.0875L44.4125 5.4625C43.9375 4.9875 43.4625 4.75 42.75 4.75H19C16.3875 4.75 14.25 6.8875 14.25 9.5V66.5C14.25 69.1125 16.3875 71.25 19 71.25H57C59.6125 71.25 61.75 69.1125 61.75 66.5V23.75C61.75 23.0375 61.5125 22.5625 61.0375 22.0875ZM42.75 10.45L56.05 23.75H42.75V10.45ZM57 66.5H19V9.5H38V23.75C38 26.3625 40.1375 28.5 42.75 28.5H57V66.5Z"
        fill={fillColor}
      />
      <path
        d="M23.75 54.25C23.75 53.1454 24.6454 52.25 25.75 52.25H50.25C51.3546 52.25 52.25 53.1454 52.25 54.25V55C52.25 56.1046 51.3546 57 50.25 57H25.75C24.6454 57 23.75 56.1046 23.75 55V54.25ZM23.75 40C23.75 38.8954 24.6454 38 25.75 38H50.25C51.3546 38 52.25 38.8954 52.25 40V40.75C52.25 41.8546 51.3546 42.75 50.25 42.75H25.75C24.6454 42.75 23.75 41.8546 23.75 40.75V40Z"
        fill={fillColor}
      />
    </svg>
  );
}

ReportIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default ReportIcon;
