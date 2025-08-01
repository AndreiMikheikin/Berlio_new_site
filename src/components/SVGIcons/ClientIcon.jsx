import React from 'react';
import PropTypes from 'prop-types';

function ClientIcon({
  fillColor = '#48AE5A', width = 30, height = 37, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 30 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 0C9.92254 0 5.80645 3.83834 5.80645 8.57317C5.80645 13.308 9.92254 17.1463 15 17.1463C20.0775 17.1463 24.1935 13.308 24.1935 8.57317C24.1935 3.83834 20.0775 0 15 0ZM8.70968 8.57317C8.70968 5.33355 11.5259 2.70732 15 2.70732C18.474 2.70732 21.2903 5.33355 21.2903 8.57317C21.2903 11.8128 18.474 14.439 15 14.439C11.5259 14.439 8.70968 11.8128 8.70968 8.57317Z"
        fill={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 19.8537C11.0529 19.8537 7.4081 20.7033 4.69964 22.1466C2.03225 23.5679 0 25.7378 0 28.4268C0 31.1159 2.03225 33.2857 4.69964 34.7071C7.4081 36.1504 11.0529 37 15 37C18.9471 37 22.5919 36.1504 25.3004 34.7071C27.9677 33.2857 30 31.1159 30 28.4268C30 25.7378 27.9677 23.5679 25.3004 22.1466C22.5919 20.7033 18.9471 19.8537 15 19.8537ZM2.90323 28.4268C2.90323 27.1286 3.90388 25.6887 6.14005 24.4972C8.33514 23.3275 11.4645 22.561 15 22.561C18.5355 22.561 21.6649 23.3275 23.86 24.4972C26.0961 25.6887 27.0968 27.1286 27.0968 28.4268C27.0968 29.725 26.0961 31.1649 23.86 32.3565C21.6649 33.5262 18.5355 34.2927 15 34.2927C11.4645 34.2927 8.33514 33.5262 6.14005 32.3565C3.90388 31.1649 2.90323 29.725 2.90323 28.4268Z"
        fill={fillColor}
      />
    </svg>
  );
}

ClientIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default ClientIcon;
