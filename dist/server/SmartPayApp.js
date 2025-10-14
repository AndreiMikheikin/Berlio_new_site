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
const TunkImage = "/assets/images/smart-pay-app.jpg";
function SmartPayAppMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_smart-pay-app-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_smart-pay-app-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.smartPayApp")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_smart-pay-app-main__header" }, t("smartPayAppMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_smart-pay-app-main__wrapper" }, /* @__PURE__ */ React__default.createElement("img", { src: TunkImage, alt: "smartPayApp", className: "aam_smart-pay-app-main__wrapper-image" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_smart-pay-app-main__wrapper--description" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_smart-pay-app-main__wrapper--description-title" }, t("smartPayAppMain.description.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_smart-pay-app-main__wrapper--description-sub-title" }, t("smartPayAppMain.description.subTitle1")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_smart-pay-app-main__wrapper--description-sub-title" }, t("smartPayAppMain.description.subTitle2")), /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("p", { className: "aam_smart-pay-app-main__wrapper--description-list-title" }, t("smartPayAppMain.description.listTitle")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("smartPayAppMain.description.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("smartPayAppMain.description.item2")))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_smart-pay-app-main__wrapper--description-sub-title" }, t("smartPayAppMain.description.ps")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_smart-pay-app-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("smartPayAppMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("smartPayAppMain.upLink")
  )));
}
function SmartPayApp() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.smartPayApp")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(SmartPayAppMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  SmartPayApp as default
};
