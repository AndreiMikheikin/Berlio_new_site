import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { N as NavLink, L as Link } from "./index.js";
import PropTypes from "prop-types";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
import { Outlet } from "react-router";
import "react-dom/server";
import "@remix-run/router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "i18next";
import "react-dom";
import "uuid";
const PrivacyMenu = ({ items }) => {
  return /* @__PURE__ */ React__default.createElement("nav", { className: "aam_privacy-menu" }, /* @__PURE__ */ React__default.createElement("ul", { className: "aam_privacy-menu__list" }, items.map(({ label, to }) => /* @__PURE__ */ React__default.createElement("li", { key: to, className: "aam_privacy-menu__item" }, /* @__PURE__ */ React__default.createElement(
    NavLink,
    {
      to,
      end: true,
      className: ({ isActive }) => `aam_privacy-menu__link${isActive ? " aam_privacy-menu__link--active" : ""}`
    },
    label
  )))));
};
PrivacyMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired
    })
  ).isRequired
};
const PrivacyMain = () => {
  const { t } = useTranslation();
  const menuItems = [
    { label: t("privacyMain.cookieConsentPolicy"), to: "/privacy/cookie-consent-policy" },
    { label: t("privacyMain.buyersPrivacy"), to: "/privacy/buyers-policy" },
    { label: t("privacyMain.b2bPrivacy"), to: "/privacy/b2b-policy" },
    { label: t("privacyMain.applicantsPrivacy"), to: "/privacy/applicants-policy" }
  ];
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_privacy" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", t("breadCrumbs.privacy")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_privacy__header" }, t("privacyMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy__wrapper" }, /* @__PURE__ */ React__default.createElement("aside", { className: "aam_privacy__wrapper-tools" }, /* @__PURE__ */ React__default.createElement(PrivacyMenu, { items: menuItems })), /* @__PURE__ */ React__default.createElement("section", { className: "aam_privacy__wrapper-outlet" }, /* @__PURE__ */ React__default.createElement(Outlet, null))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("privacyMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
      className: "secondary-link"
    },
    /* @__PURE__ */ React__default.createElement(UpArrowInCircleIcon, { className: "icon" }),
    t("privacyMain.upLink")
  )));
};
function Privacy() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.privacy")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание политик обработки персональных данных компанией Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Конфиденциальность, Обработка персональных данных" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(PrivacyMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  Privacy as default
};
