import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
import "react-dom/server";
import "@remix-run/router";
import "react-router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "i18next";
import "prop-types";
import "react-dom";
import "uuid";
function LoyaltyProgramMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_loyalty-program-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/partners" }, t("breadCrumbs.forPartners")), " ", "/", " ", t("breadCrumbs.loyaltyProgram")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_loyalty-program-main__header" }, t("loyaltyProgramMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__content" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr1")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, /* @__PURE__ */ React__default.createElement("strong", null, t("loyaltyProgramMain.descrHeader2")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item6")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, /* @__PURE__ */ React__default.createElement("strong", null, t("loyaltyProgramMain.descrHeader3")), /* @__PURE__ */ React__default.createElement("span", null, t("loyaltyProgramMain.descr3"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr4")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr5")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr6")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr7")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr8")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, /* @__PURE__ */ React__default.createElement("strong", null, t("loyaltyProgramMain.descrHeader9")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item6"))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("loyaltyProgramMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("loyaltyProgramMain.upLink")
  )));
}
function LoyaltyProgram() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.loyaltyProgram")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(LoyaltyProgramMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  LoyaltyProgram as default
};
