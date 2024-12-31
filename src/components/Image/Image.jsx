import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Image.scss';

const Image = ({ src, alt, className = '', width, height }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`aam_image ${className}`}
      style={{ width, height }}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Image;
