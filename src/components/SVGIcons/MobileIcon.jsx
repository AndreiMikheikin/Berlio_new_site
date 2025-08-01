import React from 'react';
import PropTypes from 'prop-types';

function MobileIcon({
  fillColor = '#48AE5A', width = 46, height = 73, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 46 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.5 5C37.6935 5 38.8381 5.47411 39.682 6.31802C40.5259 7.16193 41 8.30653 41 9.5V63.5C41 64.6935 40.5259 65.8381 39.682 66.682C38.8381 67.5259 37.6935 68 36.5 68H9.5C8.30653 68 7.16193 67.5259 6.31802 66.682C5.47411 65.8381 5 64.6935 5 63.5V9.5C5 8.30653 5.47411 7.16193 6.31802 6.31802C7.16193 5.47411 8.30653 5 9.5 5H36.5ZM9.5 0.5C7.11305 0.5 4.82387 1.44821 3.13604 3.13604C1.44821 4.82387 0.5 7.11305 0.5 9.5V63.5C0.5 65.8869 1.44821 68.1761 3.13604 69.864C4.82387 71.5518 7.11305 72.5 9.5 72.5H36.5C38.8869 72.5 41.1761 71.5518 42.864 69.864C44.5518 68.1761 45.5 65.8869 45.5 63.5V9.5C45.5 7.11305 44.5518 4.82387 42.864 3.13604C41.1761 1.44821 38.8869 0.5 36.5 0.5L9.5 0.5Z"
        fill={fillColor}
      />
      <path
        d="M23 63.5C24.1935 63.5 25.3381 63.0259 26.182 62.182C27.0259 61.3381 27.5 60.1935 27.5 59C27.5 57.8065 27.0259 56.6619 26.182 55.818C25.3381 54.9741 24.1935 54.5 23 54.5C21.8065 54.5 20.6619 54.9741 19.818 55.818C18.9741 56.6619 18.5 57.8065 18.5 59C18.5 60.1935 18.9741 61.3381 19.818 62.182C20.6619 63.0259 21.8065 63.5 23 63.5Z"
        fill={fillColor}
      />
    </svg>
  );
}

MobileIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default MobileIcon;
