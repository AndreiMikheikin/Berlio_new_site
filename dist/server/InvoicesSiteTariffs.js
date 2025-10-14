import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
import { P as PdfIcon } from "./PdfIcon.js";
import { S as ServiceCard } from "./ServiceCard.js";
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
const InvoicesSiteTariffsPNG = "/assets/images/invoicesSiteTariffs.jpg";
function InvoicesSiteTariffsMain() {
  const { t } = useTranslation();
  const handlePdfClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_invoices-site-tariffs-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/invoicesSite" }, t("breadCrumbs.invoicesSite")), " ", "/", " ", t("breadCrumbs.invoicesSiteTariffs")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_invoices-site-tariffs-main__header" }, t("invoicesSiteTariffsMain.name")), /* @__PURE__ */ React__default.createElement("img", { src: InvoicesSiteTariffsPNG, alt: "invoicesSiteTariffs" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("invoicesSiteTariffsMain.description")), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("invoicesSiteTariffsMain.strongDescription")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--title" }, t("invoicesSiteTariffsMain.list.title")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-tariffs-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem2")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem3")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem4")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem5")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem6")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem7"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-tariffs-main__wrapper--ps" }, /* @__PURE__ */ React__default.createElement("strong", null, t("invoicesSiteTariffsMain.list.ps")), " ", /* @__PURE__ */ React__default.createElement(Link, { to: "https://api.cardcenter.by" }, "https://api.cardcenter.by"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--title" }, t("invoicesSiteTariffsMain.wrapper1.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-tariffs-main__wrapper--sub-title" }, t("invoicesSiteTariffsMain.wrapper1.subTitle"), " ", /* @__PURE__ */ React__default.createElement("a", { href: "mailto:info@berlio.by" }, "info@berlio.by"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_invoices-site-tariffs-main__wrapper--service-card-header" }, t("invoicesSiteTariffsMain.serviceCardHeader")), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_invoices-site-tariffs-main__wrapper--service-card",
      Icon: PdfIcon,
      title: t("invoicesSiteTariffsMain.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handlePdfClick(
        t("invoicesSiteTariffsMain.cardTitle1"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--title" }, t("invoicesSiteTariffsMain.wrapper2.title")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper--container" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper--container-block" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-color-title" }, t("invoicesSiteTariffsMain.wrapper2.cont1.title")), /* @__PURE__ */ React__default.createElement("h4", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-sub-title" }, t("invoicesSiteTariffsMain.wrapper2.cont1.subTitle")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont1.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont1.listItem2")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont1.listItem3")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper--container-block" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-color-title" }, t("invoicesSiteTariffsMain.wrapper2.cont2.title")), /* @__PURE__ */ React__default.createElement("h4", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-sub-title" }, t("invoicesSiteTariffsMain.wrapper2.cont2.subTitle")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont2.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont2.listItem2"), " ", /* @__PURE__ */ React__default.createElement(Link, { to: "http://api.cardcenter.by/Help" }, "http://api.cardcenter.by/Help")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont2.listItem3")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper--container-block" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-color-title" }, t("invoicesSiteTariffsMain.wrapper2.cont3.title")), /* @__PURE__ */ React__default.createElement("h4", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-sub-title" }, t("invoicesSiteTariffsMain.wrapper2.cont3.subTitle")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont3.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont3.listItem2")))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("invoicesSiteTariffsMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("invoicesSiteTariffsMain.upLink")
  )));
}
function InvoicesSiteTariffs() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.invoicesSiteTariffs")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(InvoicesSiteTariffsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  InvoicesSiteTariffs as default
};
