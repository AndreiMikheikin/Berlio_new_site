import React__default from "react";
import PropTypes from "prop-types";
import { L as Link } from "./index.js";
function ServiceCard({
  Icon = null,
  title,
  description = "",
  link = "",
  onClick = null,
  id = null,
  className = ""
}) {
  const isExternalLink = typeof link === "string" && link.startsWith("http");
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(link);
    }
  };
  const CardContent = /* @__PURE__ */ React__default.createElement("div", { id, className: `aam_service-card__button ${className}` }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_service-card__icon" }, Icon && /* @__PURE__ */ React__default.createElement(Icon, null)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_service-card__content" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_service-card__title" }, title), /* @__PURE__ */ React__default.createElement("p", { className: "aam_service-card__description" }, description)));
  return isExternalLink ? /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: link,
      onClick: handleClick,
      className: `aam_service-card ${className}`,
      target: "_blank",
      rel: "noopener noreferrer"
    },
    CardContent
  ) : /* @__PURE__ */ React__default.createElement(Link, { to: link, onClick: handleClick, className: `aam_service-card ${className}` }, CardContent);
}
ServiceCard.propTypes = {
  Icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string
};
export {
  ServiceCard as S
};
