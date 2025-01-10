import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/LinkTo.scss';
import LinkArrowIcon from '../SVGIcons/LinkArrowIcon';

const LinkTo = ({ href, text, variant = 'default', className = '', iconColor = '#48AE5A' }) => {
  return (
    <a href={href} className={`aam_link-to aam_link-to--${variant} ${className}`}>
      <span className="aam_link-to__text">{text}</span>
      <LinkArrowIcon fillColor={iconColor} className="aam_link-to__icon" />
    </a>
  );
};

LinkTo.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'highlighted']),
  className: PropTypes.string,
  iconColor: PropTypes.string,
};

export default LinkTo;