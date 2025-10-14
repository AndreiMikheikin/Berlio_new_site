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
function OilAndCapitalMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_oil-and-capital-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_oil-and-capital-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.oilAndCapital")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_oil-and-capital-main__header" }, t("oilAndCapitalMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_oil-and-capital-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_oil-and-capital-main__wrapper--title" }, t("oilAndCapitalMain.list.title")), /* @__PURE__ */ React__default.createElement("span", { className: "aam_oil-and-capital-main__wrapper--sub-title" }, t("oilAndCapitalMain.list.subTitle")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_oil-and-capital-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("oilAndCapitalMain.list.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("oilAndCapitalMain.list.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("oilAndCapitalMain.list.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("oilAndCapitalMain.list.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("oilAndCapitalMain.list.item5")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_oil-and-capital-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("oilAndCapitalMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("oilAndCapitalMain.upLink")
  )));
}
function OilAndCapital() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.oilAndCapital")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(OilAndCapitalMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  OilAndCapital as default
};
