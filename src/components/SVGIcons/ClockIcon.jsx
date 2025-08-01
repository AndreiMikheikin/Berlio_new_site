import React from 'react';
import PropTypes from 'prop-types';

function ClockIcon({
  fillColor = '#48AE5A', width = 61, height = 60, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 61 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.5 4.18605C16.2433 4.18605 4.68605 15.7433 4.68605 30C4.68605 44.2567 16.2433 55.8139 30.5 55.8139C44.7567 55.8139 56.3139 44.2567 56.3139 30C56.3139 15.7433 44.7567 4.18605 30.5 4.18605ZM0.5 30C0.5 13.4315 13.9315 0 30.5 0C47.0685 0 60.5 13.4315 60.5 30C60.5 46.5685 47.0685 60 30.5 60C13.9315 60 0.5 46.5685 0.5 30ZM30.5 16.7442C31.6559 16.7442 32.593 17.6813 32.593 18.8372V29.133L38.9567 35.4968C39.7741 36.3141 39.7741 37.6394 38.9567 38.4567C38.1394 39.2741 36.8141 39.2741 35.9968 38.4567L29.02 31.48C28.6275 31.0875 28.407 30.5551 28.407 30V18.8372C28.407 17.6813 29.3441 16.7442 30.5 16.7442Z"
        fill={fillColor}
      />
    </svg>
  );
}

ClockIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default ClockIcon;
