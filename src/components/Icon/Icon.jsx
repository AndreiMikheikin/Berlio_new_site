import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Icon.scss';

const Icon = ({ name, size = 24, className = '' }) => {
  return (
    <i
      className={`aam_icon aam_icon-${name} ${className}`}
      style={{ fontSize: size }}
    ></i>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Icon;
