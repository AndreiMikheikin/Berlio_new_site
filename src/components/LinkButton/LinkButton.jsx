import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/LinkButton.scss';

const LinkButton = ({ 
  children, 
  href = '#', 
  target = '', 
  className = '' 
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);
  const handleMouseLeave = () => setIsActive(false);

  return (
    <a
      className={`aam_link-button aam_link-button--${className}`}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ whiteSpace: 'nowrap' }}
    >
      {children}
    </a>
  );
};

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
  color: PropTypes.oneOf(['green', 'gray']),
  className: PropTypes.string,
};

export default LinkButton;
