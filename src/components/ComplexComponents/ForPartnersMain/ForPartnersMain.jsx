import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InformationCard from "../../InformationCard/InformationCard";
import "../../../styles/components/ComplexComponents/ForPartnersMain.scss";

import BG1 from "../../../assets/images/info-card-bg1.jpg";
import BG2 from "../../../assets/images/info-card-bg2.jpg";
import BG3 from "../../../assets/images/info-card-bg3.jpg";

import LaptopIcon from "../../SVGIcons/LaptopIcon";
import DocumentIcon from "../../SVGIcons/DocumentIcon";

import cardDataJson from "../../../data/informationCardData.json";

import { useTranslation } from "react-i18next";

const ForPartnersMain = () => {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const BG_IMAGES = { BG1, BG2, BG3 };
    const ICONS = { LaptopIcon, DocumentIcon };

    const updatedCards = Object.values(cardDataJson.forPartners).map((card) => ({
      ...card,
      bgImage: BG_IMAGES[card["bg-image"]],
      IconComponent: ICONS[card["icon"]] || null,
    }));

    setCards(updatedCards);
  }, []);

  return (
    <div className="aam_for-partners-main">
      {/* Breadcrumbs */}
      <div className="aam_about-block__breadcrumbs">
        <Link to="/">{t("breadCrumbs.home")}</Link> / {t("breadCrumbs.forPartners")}
      </div>

      {/* Title */}
      <h1 className="aam_for-partners-main__title">{t("forPartnersMain.title")}</h1>

      {/* Description */}
      <p className="aam_for-partners-main__description">{t("forPartnersMain.description")}</p>

      {/* Cards */}
      <div className="aam_for-partners-main__cards">
        {cards.map((cardData, index) => (
          <InformationCard
            key={index}
            title={t(cardData.title)}
            bgImage={cardData.bgImage}
            IconComponent={cardData.IconComponent}
            links={Array.isArray(cardData.links) ? cardData.links.map((link) => ({
              href: link.href,
              label: t(link.label)
            })) : []}
            customClass={`partnersCard-${index + 1}`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

ForPartnersMain.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      bgImage: PropTypes.string.isRequired,
      IconComponent: PropTypes.elementType,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired
        })
      ).isRequired
    })
  )
};

export default ForPartnersMain;
