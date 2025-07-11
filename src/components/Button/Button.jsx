import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Button.scss';

function Button({
  label,
  onClick,
  type = 'button',
  variant = 'default',
  className = '',
  disabled = false,
}) {
  const baseClass = 'aam_button';
  const variantClass = variant !== 'default' ? `${baseClass}--${variant}` : '';

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${baseClass} ${variantClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['default', 'green']), // Можно расширять
  className: PropTypes.string, // Для кастомных случаев
  disabled: PropTypes.bool,
};

export default Button;
