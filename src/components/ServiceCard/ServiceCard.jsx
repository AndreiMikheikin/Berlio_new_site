import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../styles/components/ServiceCard.scss';

function ServiceCard({
  Icon = null,
  title,
  description = '',
  link = '',
  onClick = null,
  id = null,
  className = '',
}) {
  const isExternalLink = typeof link === 'string' && link.startsWith('http');

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(link);
    }
  };

  const CardContent = (
    <div id={id} className={`aam_service-card__button ${className}`}>
      <div className="aam_service-card__icon">
        {Icon && <Icon />}
      </div>
      <div className="aam_service-card__content">
        <h3 className="aam_service-card__title">{title}</h3>
        <p className="aam_service-card__description">{description}</p>
      </div>
    </div>
  );

  return isExternalLink ? (
    <a
      href={link}
      onClick={handleClick}
      className={`aam_service-card ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {CardContent}
    </a>
  ) : (
    <Link to={link} onClick={handleClick} className={`aam_service-card ${className}`}>
      {CardContent}
    </Link>
  );
}

ServiceCard.propTypes = {
  Icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default ServiceCard;
