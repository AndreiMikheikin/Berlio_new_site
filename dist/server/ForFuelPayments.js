import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
import { P as PdfIcon } from "./PdfIcon.js";
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
const ForFuelPaymentsMain = () => {
  const { t } = useTranslation();
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  const handleLinkClick = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };
  const docsSection1 = [
    {
      title: t("forFuelPaymentsMain.section1.listItem1"),
      link: `${baseUrl}/assets/documents/Платежное паручение для резидентов.pdf`,
      noDownload: true
    },
    {
      title: t("forFuelPaymentsMain.section1.listItem2"),
      link: `${baseUrl}/assets/documents/Платежное паручение для не резидентов.pdf`,
      noDownload: true
    }
  ];
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_for-fuel-payments" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-fuel-payments__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " /", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " /", " ", t("breadCrumbs.forFuelPayments")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_for-fuel-payments__header" }, t("forFuelPaymentsMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-fuel-payments__description" }, /* @__PURE__ */ React__default.createElement("section", { className: "aam_for-fuel-payments__description--section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_for-fuel-payments__description--section-header" }, t("forFuelPaymentsMain.section1.header")), /* @__PURE__ */ React__default.createElement("p", null, t("forFuelPaymentsMain.section1.description"), " ", /* @__PURE__ */ React__default.createElement("a", { href: "https://belgazprombank.by/", target: "_blank", rel: "noopener noreferrer" }, t("forFuelPaymentsMain.section1.link"))), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_for-fuel-payments__doc-list" }, docsSection1.map(({ title, link, noDownload }) => /* @__PURE__ */ React__default.createElement("li", { key: title }, /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: link,
      onClick: (e) => {
        e.preventDefault();
        handleLinkClick(link);
      },
      target: noDownload ? "_blank" : "_self",
      rel: "noreferrer"
    },
    /* @__PURE__ */ React__default.createElement(PdfIcon, { className: "aam_for-fuel-payments__doc-icon" }),
    /* @__PURE__ */ React__default.createElement("span", null, title)
  ))))), /* @__PURE__ */ React__default.createElement("section", { className: "aam_for-fuel-payments__description--section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_for-fuel-payments__description--section-header" }, t("forFuelPaymentsMain.section2.header")), /* @__PURE__ */ React__default.createElement("p", null, t("forFuelPaymentsMain.section2.description")), /* @__PURE__ */ React__default.createElement("p", null, t("forFuelPaymentsMain.section2.phones"), ":", " ", /* @__PURE__ */ React__default.createElement("a", { href: "tel:+375173971081" }, "+375 (17) 397-10-81"), ",", /* @__PURE__ */ React__default.createElement("a", { href: "tel:+375173691082" }, "+375 (17) 369-10-82"), ",", /* @__PURE__ */ React__default.createElement("a", { href: "tel:+375172100000" }, "+375 (17) 210-00-00"), "."), /* @__PURE__ */ React__default.createElement("p", null, t("forFuelPaymentsMain.section2.email"), ":", " ", /* @__PURE__ */ React__default.createElement("a", { href: "mailto:info@berlio.by" }, "info_minsk@berlio.by"))), /* @__PURE__ */ React__default.createElement("section", { className: "aam_for-fuel-payments__description--section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_for-fuel-payments__description--section-header" }, t("forFuelPaymentsMain.section3.header")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("forFuelPaymentsMain.section3.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("forFuelPaymentsMain.section3.listItem2"))), /* @__PURE__ */ React__default.createElement("p", null, t("forFuelPaymentsMain.section3.description")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-fuel-payments__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("forFuelPaymentsMain.homeLink")), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      onClick: () => {
        const element = document.getElementById("header");
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      className: "secondary-link"
    },
    /* @__PURE__ */ React__default.createElement(UpArrowInCircleIcon, { className: "icon" }),
    t("forFuelPaymentsMain.upLink")
  )));
};
function ForFuelPayments() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.forFuelPayments")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ForFuelPaymentsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  ForFuelPayments as default
};
