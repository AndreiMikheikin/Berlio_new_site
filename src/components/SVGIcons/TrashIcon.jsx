import React from 'react';
import PropTypes from 'prop-types';

function TrashIcon({
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
        d="M21.6667 4.33333H17.3333V2.16667C17.3333 1.525 16.8083 1 16.1667 1H9.83333C9.19167 1 8.66667 1.525 8.66667 2.16667V4.33333H4.33333C3.69167 4.33333 3.16667 4.85833 3.16667 5.5C3.16667 6.14167 3.69167 6.66667 4.33333 6.66667H21.6667C22.3083 6.66667 22.8333 6.14167 22.8333 5.5C22.8333 4.85833 22.3083 4.33333 21.6667 4.33333ZM6.04167 22.1667C6.04167 23.275 6.93333 24.1667 8.04167 24.1667H17.9583C19.0667 24.1667 19.9583 23.275 19.9583 22.1667V8.16667H6.04167V22.1667ZM10.375 10.5C10.375 9.85833 10.9 9.33333 11.5417 9.33333C12.1833 9.33333 12.7083 9.85833 12.7083 10.5V20.5C12.7083 21.1417 12.1833 21.6667 11.5417 21.6667C10.9 21.6667 10.375 21.1417 10.375 20.5V10.5ZM15.625 10.5C15.625 9.85833 16.15 9.33333 16.7917 9.33333C17.4333 9.33333 17.9583 9.85833 17.9583 10.5V20.5C17.9583 21.1417 17.4333 21.6667 16.7917 21.6667C16.15 21.6667 15.625 21.1417 15.625 20.5V10.5Z"
        fill={fillColor}
      />
    </svg>
  );
}

TrashIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default TrashIcon;
