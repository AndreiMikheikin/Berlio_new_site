import React__default, { useState } from "react";
import PropTypes from "prop-types";
import { L as Link } from "./index.js";
import { useTranslation } from "react-i18next";
import { c as LinkButton } from "./SecondaryFooter.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
function RightArrowIcon({
  fillColor = "#48AE5A",
  width = 27,
  height = 16,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 27 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M26.7071 8.70711C27.0976 8.31658 27.0976 7.68342 26.7071 7.29289L20.3431 0.928932C19.9526 0.538408 19.3195 0.538408 18.9289 0.928932C18.5384 1.31946 18.5384 1.95262 18.9289 2.34315L24.5858 8L18.9289 13.6569C18.5384 14.0474 18.5384 14.6805 18.9289 15.0711C19.3195 15.4616 19.9526 15.4616 20.3431 15.0711L26.7071 8.70711ZM0 9H26V7H0V9Z",
        fill: fillColor
      }
    )
  );
}
RightArrowIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function LogoSection({
  title,
  logos: logos2,
  customClass = "",
  logoBasePath = "/assets/images/"
}) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const logosToShow = 4;
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : logos2.length - logosToShow);
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex < logos2.length - logosToShow ? prevIndex + 1 : 0);
  };
  const prevIconColor = currentIndex === 0 ? "#A3A3A3" : "#48AE5A";
  const nextIconColor = currentIndex === logos2.length - logosToShow ? "#A3A3A3" : "#48AE5A";
  return /* @__PURE__ */ React__default.createElement("section", { className: `aam_logo-section ${customClass}` }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_logo-section__title" }, t(title)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_logo-section__carousel" }, /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: "aam_logo-section__logos",
      style: {
        transform: `translateX(-${currentIndex * 100 / logosToShow}%)`,
        transition: "transform 0.3s ease"
      }
    },
    logos2.map((logo) => /* @__PURE__ */ React__default.createElement("div", { key: logo.src, className: "aam_logo-section__logo" }, /* @__PURE__ */ React__default.createElement(
      "img",
      {
        src: `${logoBasePath}${logo.src}`,
        alt: logo.alt,
        className: "aam_logo-section__logo-image",
        loading: "lazy",
        onError: (e) => {
          e.target.style.display = "none";
        }
      }
    )))
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_logo-section__controls" }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_logo-section__button",
      onClick: handlePrev,
      disabled: currentIndex === 0,
      "aria-label": t("Previous logos")
    },
    /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { fillColor: prevIconColor })
  ), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_logo-section__button",
      onClick: handleNext,
      disabled: currentIndex === logos2.length - logosToShow,
      "aria-label": t("Next logos")
    },
    /* @__PURE__ */ React__default.createElement(RightArrowIcon, { fillColor: nextIconColor })
  )), /* @__PURE__ */ React__default.createElement(
    LinkButton,
    {
      href: "https://map.berlio.by",
      target: "_blank",
      className: "fillGreen"
    },
    t("ourPartnersLogoSection.mapLink")
  ), /* @__PURE__ */ React__default.createElement("div", { className: "aam_logo-section__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("ourPartnersLogoSection.homeLink")), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      onClick: () => {
        const element = document.getElementById("header");
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      },
      className: "secondary-link",
      "aria-label": t("Scroll to top")
    },
    /* @__PURE__ */ React__default.createElement(UpArrowInCircleIcon, { className: "icon" }),
    t("ourPartnersLogoSection.upLink")
  )));
}
LogoSection.propTypes = {
  title: PropTypes.string.isRequired,
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    })
  ).isRequired,
  customClass: PropTypes.string,
  logoBasePath: PropTypes.string
};
const logos = [{ "src": "A-100-logo.png", "alt": "A-100" }, { "src": "gazpromneft-logo.png", "alt": "Gazpromneft" }, { "src": "rn-zapad-logo.png", "alt": "RN Zapad" }, { "src": "tatneft-logo.png", "alt": "Tatneft" }, { "src": "lukoil-logo.png", "alt": "Lukoil" }, { "src": "united-company-logo.png", "alt": "United Company" }];
const partnersLogos = {
  logos
};
export {
  LogoSection as L,
  RightArrowIcon as R,
  partnersLogos as p
};
