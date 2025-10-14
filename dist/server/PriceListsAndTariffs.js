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
function PriceListsAndTariffsMain() {
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
  const cardData = [
    {
      titleKey: "priceListsAndTariffsMain.cardTitle1",
      link: `${baseUrl}/assets/documents/1.doc`
    },
    {
      titleKey: "priceListsAndTariffsMain.cardTitle2",
      link: `${baseUrl}/assets/documents/2.doc`
    },
    {
      titleKey: "priceListsAndTariffsMain.cardTitle3",
      link: `${baseUrl}/assets/documents/3.doc`
    }
  ];
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_price-lists-and-tariffs-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_price-lists-and-tariffs-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.priceListsAndTariffs")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_price-lists-and-tariffs-main__header" }, t("priceListsAndTariffsMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_price-lists-and-tariffs-main__card-boxes" }, cardData.map((card) => /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      key: card.titleKey,
      className: "aam_price-lists-and-tariffs-main__service-card",
      Icon: DocxIcon,
      title: t(card.titleKey),
      description: "",
      link: card.link,
      onClick: () => handleLinkClick(t(card.titleKey), card.link)
    }
  ))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_price-lists-and-tariffs-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("priceListsAndTariffsMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("priceListsAndTariffsMain.upLink")
  )));
}
function PriceListsAndTariffs() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.priceListsAndTariffs")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(PriceListsAndTariffsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  PriceListsAndTariffs as default
};
