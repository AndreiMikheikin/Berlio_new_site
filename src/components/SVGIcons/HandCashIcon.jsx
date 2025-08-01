import React from 'react';
import PropTypes from 'prop-types';

function HandCashIcon({
  fillColor = '#48AE5A', width = 86, height = 85, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 86 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5835 38.9585L17.525 27.7775C18.8541 26.2818 20.4849 25.0846 22.3102 24.2647C24.1354 23.4449 26.1136 23.021 28.1145 23.021H28.8335M7.5835 69.0627H27.0627L41.2293 58.4377C41.2293 58.4377 44.0981 56.5004 48.3127 53.1252C57.1668 46.0418 48.3127 34.8289 39.4585 40.7293C32.2477 45.5354 25.2918 49.5835 25.2918 49.5835"
        stroke={fillColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.8335 47.8127V24.7918C28.8335 22.9132 29.5798 21.1115 30.9082 19.7832C32.2365 18.4548 34.0382 17.7085 35.9168 17.7085H71.3335C73.2121 17.7085 75.0138 18.4548 76.3422 19.7832C77.6706 21.1115 78.4168 22.9132 78.4168 24.7918V46.0418C78.4168 47.9204 77.6706 49.7221 76.3422 51.0505C75.0138 52.3789 73.2121 53.1252 71.3335 53.1252H48.3127"
        stroke={fillColor}
        strokeWidth="4.5"
      />
      <path
        d="M69.5625 35.4522L69.5979 35.4133M37.6875 35.4522L37.7229 35.4133M53.625 42.5002C51.7464 42.5002 49.9447 41.7539 48.6163 40.4255C47.2879 39.0971 46.5417 37.2954 46.5417 35.4168C46.5417 33.5382 47.2879 31.7365 48.6163 30.4082C49.9447 29.0798 51.7464 28.3335 53.625 28.3335C55.5036 28.3335 57.3053 29.0798 58.6337 30.4082C59.9621 31.7365 60.7083 33.5382 60.7083 35.4168C60.7083 37.2954 59.9621 39.0971 58.6337 40.4255C57.3053 41.7539 55.5036 42.5002 53.625 42.5002Z"
        stroke={fillColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

HandCashIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default HandCashIcon;
