import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
import { S as ServiceCard } from "./ServiceCard.js";
import { D as DocxIcon } from "./DocxIcon.js";
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
function DealResignationMain() {
  const { t } = useTranslation();
  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".doc") ? title : `${title}.doc`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_deal-resignation-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_deal-resignation-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.dealResignation")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_deal-resignation-main__header" }, t("dealResignationMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_deal-resignation-main__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_deal-resignation-main__service-card",
      Icon: DocxIcon,
      title: t("dealResignationMain.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleLinkClick(
        t("dealResignationMain.cardTitle1"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_deal-resignation-main__service-card",
      Icon: DocxIcon,
      title: t("dealResignationMain.cardTitle2"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleLinkClick(
        t("dealResignationMain.cardTitle2"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_deal-resignation-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("dealResignationMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("dealResignationMain.upLink")
  )));
}
function DealResignation() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.dealResignation")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(DealResignationMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  DealResignation as default
};
