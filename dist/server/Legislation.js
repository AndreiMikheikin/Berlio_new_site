import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { P as PdfIcon } from "./PdfIcon.js";
import { G as GlobeIcon } from "./GlobeIcon.js";
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
const LegislationMain = () => {
  const { t } = useTranslation();
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const docsSection1 = [
    {
      title: t("legislationMain.list.item1"),
      link: `${baseUrl}/assets/documents/Закон Республики Беларусь от 19.04.2022 № 164-З «О платежных системах и платежных услугах»`,
      noDownload: true
    },
    {
      title: t("legislationMain.list.item2"),
      link: `https://www.nbrb.by/payment/register_of_payment_service_providers`,
      noDownload: true
    },
    {
      title: t("legislationMain.list.item3"),
      link: `https://pravo.by/document/?guid=12551&p0=H11400165`,
      noDownload: true
    },
    {
      title: t("legislationMain.list.item4"),
      link: `${baseUrl}/assets/documents/Постановление Правления Национального банка Республики Беларусь от 05.12.2022 № 453 «Об утверждении Инструкции о порядке оказания платежных услуг на территории Республики Беларусь»`,
      noDownload: true
    },
    {
      title: t("legislationMain.list.item5"),
      link: `https://pravo.by/document/?guid=11031&p0=B22035074p`,
      noDownload: true
    },
    {
      title: t("legislationMain.list.item6"),
      link: `https://pravo.by/document/?guid=12551&p0=B22239010&p1=1`,
      noDownload: true
    },
    {
      title: t("legislationMain.list.item7"),
      link: `${baseUrl}/assets/documents/Постановление Правления Национального банка Республики Беларусь от 16.09.2022 N 350 «Об утверждении Правил осуществления операций с электронными деньгами»`,
      noDownload: true
    },
    {
      title: t("legislationMain.list.item8"),
      link: `${baseUrl}/assets/documents/Стандарт проведения расчётов СПР 7.01-2020`,
      noDownload: true
    }
  ];
  const renderDocItem = ({ title, link, noDownload }) => {
    const isExternal = link.startsWith("https");
    return /* @__PURE__ */ React__default.createElement("li", { key: title }, /* @__PURE__ */ React__default.createElement(
      "a",
      {
        href: link,
        onClick: (e) => {
          if (!noDownload && !isExternal) {
            e.preventDefault();
            handleLinkClick(title, link);
          }
        },
        target: noDownload || isExternal ? "_blank" : "_self",
        rel: "noreferrer"
      },
      isExternal ? /* @__PURE__ */ React__default.createElement(GlobeIcon, { className: "aam_legislation-main__doc-icon" }) : /* @__PURE__ */ React__default.createElement(PdfIcon, { className: "aam_legislation-main__doc-icon" }),
      /* @__PURE__ */ React__default.createElement("span", null, title)
    ));
  };
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_legislation-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_legislation-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " /", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " /", " ", t("breadCrumbs.legislation")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_legislation-main__header" }, t("legislationMain.name")), /* @__PURE__ */ React__default.createElement("h2", { className: "aam_legislation-main__list-title" }, t("legislationMain.list.name")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_legislation-main__doc-list" }, docsSection1.map(renderDocItem)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_legislation-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("legislationMain.homeLink")), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      onClick: () => {
        document.getElementById("header")?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      className: "secondary-link"
    },
    /* @__PURE__ */ React__default.createElement(UpArrowInCircleIcon, { className: "icon" }),
    t("legislationMain.upLink")
  )));
};
function Legislation() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.legislation")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Новости" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(LegislationMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  Legislation as default
};
