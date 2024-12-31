import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Button.scss';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button className={`aam_button ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
