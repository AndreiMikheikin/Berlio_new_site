import React from "react";
import PropTypes from "prop-types";
import "../../styles/components/InformationCard.scss";

const InformationCard = ({ title, IconComponent, links, bgImage, customClass }) => {
  return (
    <div
      className={`aam_information-card ${customClass}`}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
    >
      <div className="aam_information-card__content">
        {IconComponent && (
          <div className="aam_information-card__icon">
            <IconComponent
              fillColor="#FFFFFFFF"
              width="45"
              height="45"
            />
          </div>
        )}
        <h3 className="aam_information-card__title">{title}</h3>
      </div>
      <div className="aam_information-card__hover-overlay">
        {(links || []).map((link, index) =>
          link.href && (
            <a
              key={index}
              href={link.href}
              className="aam_information-card__link"
              target={link.href.startsWith("http") ? "_blank" : "_self"}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
  IconComponent: PropTypes.elementType,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  bgImage: PropTypes.string,
  customClass: PropTypes.string,
};

InformationCard.defaultProps = {
  links: [],
  bgImage: "",
  IconComponent: null,
};

export default InformationCard;
