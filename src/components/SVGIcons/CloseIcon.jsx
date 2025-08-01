import React from 'react';
import PropTypes from 'prop-types';

function CloseIcon({
  fillColor = '#909090', width = 30, height = 30, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8071 7.81574C21.9712 7.97983 22.0633 8.20239 22.0633 8.43445C22.0633 8.66652 21.9712 8.88908 21.8071 9.05317L15.6199 15.2404L21.8071 21.4275C21.9712 21.5916 22.0633 21.8142 22.0633 22.0463C22.0633 22.2783 21.9712 22.5009 21.8071 22.665C21.643 22.8291 21.4204 22.9213 21.1883 22.9213C20.9563 22.9213 20.7337 22.8291 20.5696 22.665L14.3824 16.4778L8.19526 22.665C8.03117 22.8291 7.80861 22.9213 7.57654 22.9213C7.34448 22.9213 7.12192 22.8291 6.95782 22.665C6.79373 22.5009 6.70154 22.2783 6.70154 22.0463C6.70154 21.8142 6.79373 21.5916 6.95782 21.4275L13.145 15.2404L6.95782 9.05317C6.79373 8.88908 6.70154 8.66652 6.70154 8.43445C6.70154 8.20239 6.79373 7.97983 6.95782 7.81574C7.12192 7.65164 7.34448 7.55945 7.57654 7.55945C7.80861 7.55945 8.03117 7.65164 8.19526 7.81574L14.3824 14.0029L20.5696 7.81574C20.7337 7.65164 20.9563 7.55945 21.1883 7.55945C21.4204 7.55945 21.643 7.65164 21.8071 7.81574Z"
        fill={fillColor}
      />
    </svg>
  );
}

CloseIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default CloseIcon;
