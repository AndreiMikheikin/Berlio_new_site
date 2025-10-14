import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { P as PdfIcon } from "./PdfIcon.js";
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
const ReportIFRMain = () => {
  const { t } = useTranslation();
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  const handlePdfClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const docsSection = [
    {
      title: t("reportIFRMain.list"),
      docs: [
        {
          title: t("reportIFRMain.cardTitle1"),
          link: `${baseUrl}/assets/documents/Краткий отчет об оценке ИФР.pdf`
        }
      ]
    }
  ];
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_report-IFR-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_report-IFR-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.reportIFR")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_report-IFR-main__header" }, t("reportIFRMain.name")), docsSection.map(({ title, docs }) => /* @__PURE__ */ React__default.createElement("section", { key: title, className: "aam_report-IFR-main__section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_report-IFR-main__documents-title" }, title), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_report-IFR-main__doc-list" }, docs.map(({ title: title2, link }) => /* @__PURE__ */ React__default.createElement("li", { key: title2 }, /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: link,
      onClick: (e) => {
        e.preventDefault();
        handlePdfClick(title2, link);
      },
      target: "_blank",
      rel: "noreferrer"
    },
    /* @__PURE__ */ React__default.createElement(PdfIcon, { className: "aam_report-IFR-main__doc-icon" }),
    /* @__PURE__ */ React__default.createElement("span", null, title2)
  )))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_report-IFR-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("reportIFRMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("reportIFRMain.upLink")
  )));
};
function ReportIFR() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.reportIFR")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Новости" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ReportIFRMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  ReportIFR as default
};
