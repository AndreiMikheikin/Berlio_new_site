import React from 'react';
import PropTypes from 'prop-types';

function CanisterIcon({
  fillColor = '#48AE5A', width = 66, height = 65, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60.0837 27.7144V43.0165C60.0837 50.8273 60.0837 54.7327 57.703 57.1567C55.3251 59.5833 51.4928 59.5833 43.8337 59.5833H22.167C14.5078 59.5833 10.6755 59.5833 8.29762 57.1567C5.91699 54.7354 5.91699 50.8273 5.91699 43.0192V35.444C5.91699 29.7673 5.91699 26.9263 7.4147 24.7731C8.91512 22.62 11.5422 21.6856 16.7991 19.8088L38.4657 12.0765C48.3132 8.56376 53.237 6.80605 56.6603 9.28417C58.5237 10.6302 59.3714 12.8185 59.7587 16.25"
        stroke={fillColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M24.875 37.9167C24.875 34.0871 24.875 32.1723 26.0667 30.9834C27.2529 29.7917 29.1677 29.7917 33 29.7917C36.8296 29.7917 38.7444 29.7917 39.9333 30.9834C41.125 32.1723 41.125 34.0871 41.125 37.9167C41.125 41.7463 41.125 43.6611 39.9333 44.85C38.7444 46.0417 36.8296 46.0417 33 46.0417C29.1704 46.0417 27.2556 46.0417 26.0667 44.85C24.875 43.6638 24.875 41.749 24.875 37.9167Z"
        stroke={fillColor}
        strokeWidth="4"
      />
      <path
        d="M41.1253 29.7917L43.8337 27.0833M24.8753 29.7917L22.167 27.0833M41.1253 46.0417L43.8337 48.75M24.8753 46.0417L22.167 48.75M14.042 19.1208C14.042 15.5865 14.042 13.8206 14.9574 12.6019C15.193 12.2877 15.4693 12.0061 15.7753 11.7677C16.967 10.8333 18.7003 10.8333 22.167 10.8333H24.3824C25.7555 10.8333 26.4435 10.8333 27.0095 10.9877C27.7658 11.199 28.4532 11.6056 29.0027 12.1665C29.5523 12.7275 29.9446 13.4231 30.1403 14.1836"
        stroke={fillColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

CanisterIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default CanisterIcon;
