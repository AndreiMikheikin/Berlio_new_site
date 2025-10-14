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
const PersonalAccImage = "/assets/images/personal-acc-web-app.jpg";
function PersonalAccWebAppMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_personal-acc-web-app-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_personal-acc-web-app-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.personalAccWebApp")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_personal-acc-web-app-main__header" }, t("personalAccWebAppMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_personal-acc-web-app-main__wrapper" }, /* @__PURE__ */ React__default.createElement("img", { src: PersonalAccImage, alt: "personalAccWebApp", className: "aam_personal-acc-web-app-main__wrapper-image" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_personal-acc-web-app-main__wrapper--description" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_personal-acc-web-app-main__wrapper--description-title" }, t("personalAccWebAppMain.description.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_personal-acc-web-app-main__wrapper--description-sub-title" }, t("personalAccWebAppMain.description.subTitle"), " ", /* @__PURE__ */ React__default.createElement(Link, { to: "https://lkb.by" }, "https://lkb.by")), /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("strong", null, /* @__PURE__ */ React__default.createElement("p", { className: "aam_personal-acc-web-app-main__wrapper--description-list-title" }, t("personalAccWebAppMain.description.listTitle"))), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("personalAccWebAppMain.description.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("personalAccWebAppMain.description.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("personalAccWebAppMain.description.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("personalAccWebAppMain.description.item4")))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_personal-acc-web-app-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("personalAccWebAppMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("personalAccWebAppMain.upLink")
  )));
}
function PersonalAccWebApp() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.personalAccWebApp")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(PersonalAccWebAppMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  PersonalAccWebApp as default
};
