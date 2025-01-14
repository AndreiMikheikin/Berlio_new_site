// ServiceCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../styles/components/ServiceCard.scss';

const ServiceCard = ({ Icon, title, description, link, onClick, id}) => {
  const isExternalLink = typeof link === 'string' && link.startsWith('http');

  const CardContent = (
    <div id={id} className="aam_service-card__button">
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
    <a href={link} onClick={onClick} className="aam_service-card" target="_blank" rel="noopener noreferrer">
      {CardContent}
    </a>
  ) : (
    <Link to={link} onClick={onClick} className="aam_service-card">
      {CardContent}
    </Link>
  );
};

ServiceCard.propTypes = {
  Icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default ServiceCard;
