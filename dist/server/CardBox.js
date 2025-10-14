import React__default from "react";
import PropTypes from "prop-types";
function CardBox({
  CSSSelectorPrefix,
  Icon,
  title,
  description = ""
}) {
  return /* @__PURE__ */ React__default.createElement("div", { className: `${CSSSelectorPrefix}__card-box` }, Icon && /* @__PURE__ */ React__default.createElement("div", { className: `${CSSSelectorPrefix}__icon` }, /* @__PURE__ */ React__default.createElement(Icon, null)), /* @__PURE__ */ React__default.createElement("h3", { className: `${CSSSelectorPrefix}__card-title` }, title), description && /* @__PURE__ */ React__default.createElement("div", { className: `${CSSSelectorPrefix}__card-description` }, description));
}
CardBox.propTypes = {
  Icon: PropTypes.elementType,
  // Ожидается React-компонент
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  CSSSelectorPrefix: PropTypes.string.isRequired
};
export {
  CardBox as C
};
