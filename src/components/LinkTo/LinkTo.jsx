import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Импортируем Link из react-router-dom
import '../../styles/components/LinkTo.scss';
import LinkArrowIcon from '../SVGIcons/LinkArrowIcon';

const LinkTo = ({ href, text, variant = 'default', className = '', iconColor = '#48AE5A' }) => {
  return (
    <Link to={href} className={`aam_link-to aam_link-to--${variant} ${className}`}>
      <span className="aam_link-to__text">{text}</span>
      <LinkArrowIcon fillColor={iconColor} className="aam_link-to__icon" />
    </Link>
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
