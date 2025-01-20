import React from "react";
import PropTypes from "prop-types";
import "../../styles/components/InformationCard.scss";

const InformationCard = ({ title, IconComponent, links, bgImage }) => {
  return (
    <div
      className="aam_information-card"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="aam_information-card__content">
        {IconComponent && (
          <div className="aam_information-card__icon">
            <IconComponent />
          </div>
        )}
        <h3 className="aam_information-card__title">{title}</h3>
      </div>
      <div className="aam_information-card__hover-overlay">
        {links.map(
          (link, index) =>
            link.href && (
              <a
                key={index}
                href={link.href}
                className="aam_information-card__link"
              >
                {link.label}
              </a>
            )
        )}
      </div>
    </div>
  );
};

InformationCard.propTypes = {
  title: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType, // For passing icon components
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  bgImage: PropTypes.string.isRequired,
};

InformationCard.defaultProps = {
  links: [],
};

export default InformationCard;
