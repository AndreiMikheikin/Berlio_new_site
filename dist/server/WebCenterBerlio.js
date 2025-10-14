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
function WebCenterMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_web-center-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_web-center-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.webCenter")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_web-center-main__header" }, t("webCenterMain.name")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_web-center-main__description" }, t("webCenterMain.description")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_web-center-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_web-center-main__wrapper--title" }, t("webCenterMain.list1.title")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_web-center-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item6")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item7")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item8")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_web-center-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_web-center-main__wrapper--title" }, t("webCenterMain.list2.title")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_web-center-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item6")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_web-center-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_web-center-main__wrapper--title" }, t("webCenterMain.list3.title"), /* @__PURE__ */ React__default.createElement("span", null, t("webCenterMain.list3.subTitle"))), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_web-center-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list3.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list3.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list3.item3")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_web-center-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("webCenterMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("webCenterMain.upLink")
  )));
}
function WebCenterBerlio() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.webCenter")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(WebCenterMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  WebCenterBerlio as default
};
