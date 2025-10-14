import React__default, { useEffect } from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { useLocation } from "react-router";
import { P as PdfIcon } from "./PdfIcon.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
import { G as GlobeIcon } from "./GlobeIcon.js";
import "react-dom/server";
import "@remix-run/router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "i18next";
import "prop-types";
import "react-dom";
import "uuid";
function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [hash]);
}
function ServiceInEPS() {
  useScrollToHash();
  const { t } = useTranslation();
  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  const operatorDocs = [
    { title: t("signAndResignMain.cardTitle1"), link: `${baseUrl}/assets/documents/1.pdf` },
    { title: t("signAndResignMain.cardTitle2"), link: `${baseUrl}/assets/documents/Правил обслуживания клиентов в ЭПС «Берлио».pdf` },
    {
      title: t("signAndResignMain.cardTitle3"),
      link: `${baseUrl}/assets/documents/Договор присоединения Клиента к обслуживанию в электронной платежной системе «Берлио».pdf`
    },
    {
      title: t("signAndResignMain.cardTitle6"),
      link: `${baseUrl}/assets/documents/Перечень цен и тарифов за оказываемые услуги в электронной платёжной системе «Берлио».pdf`
    },
    {
      title: t("signAndResignMain.cardTitle7"),
      link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (общая форма).pdf`
    }
  ];
  const emissionerDocs = [
    {
      title: t("signAndResignMain.cardTitle4"),
      link: `${baseUrl}/assets/documents/Правила эмитента электронных денег «Берлио».pdf`
    },
    {
      title: t("signAndResignMain.cardTitle5"),
      link: `https://belgazprombank.by/korporativnim_klientam/raschetno_kassovoe_obsluzhivani/berlio-ur/`,
      noDownload: true
    }
  ];
  const renderDocList = (docs) => /* @__PURE__ */ React__default.createElement("ul", { className: "aam_sign-and-resign__doc-list" }, docs.map(({ title, link, noDownload }) => {
    const isExternal = link.startsWith("https");
    return /* @__PURE__ */ React__default.createElement("li", { key: title }, /* @__PURE__ */ React__default.createElement(
      "a",
      {
        href: link,
        onClick: (e) => {
          if (!noDownload) {
            e.preventDefault();
            handleLinkClick(title, link);
          }
        },
        target: noDownload ? "_blank" : "_self",
        rel: "noreferrer"
      },
      isExternal ? /* @__PURE__ */ React__default.createElement(GlobeIcon, { className: "aam_sign-and-resign__doc-icon" }) : /* @__PURE__ */ React__default.createElement(PdfIcon, { className: "aam_sign-and-resign__doc-icon" }),
      /* @__PURE__ */ React__default.createElement("span", null, title)
    ));
  }));
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_sign-and-resign" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " /", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " /", " ", t("breadCrumbs.serviceInEPS")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_sign-and-resign__header" }, t("signAndResignMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__description" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_sign-and-resign__description-first" }, t("signAndResignMain.description")), /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignMain.purposeBeforeLink"), /* @__PURE__ */ React__default.createElement("a", { href: "https://map.berlio.by", target: "_blank", rel: "noreferrer" }, t("signAndResignMain.purposeLink")), t("signAndResignMain.purposeAfterLink")), /* @__PURE__ */ React__default.createElement("ul", null, ["item1", "item2", "item3", "item4"].map((key) => /* @__PURE__ */ React__default.createElement("li", { key }, t(`signAndResignMain.list1.${key}`))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__description" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_sign-and-resign__participants" }, t("signAndResignMain.participants")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_sign-and-resign__participants-list" }, [
    ["operator", "operatorTagline"],
    ["emissioner", "emissionerTagline"],
    ["agents", "agentsTagline"],
    ["tradeAndServiceObject", "tradeAndServiceObjectTagline"],
    ["serviseCenter", "serviseCenterTagline"]
  ].map(([role, tagline]) => /* @__PURE__ */ React__default.createElement("li", { key: role }, t(`signAndResignMain.${role}`), " - ", t(`signAndResignMain.${tagline}`))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__customer-service" }, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignMain.customerService")), /* @__PURE__ */ React__default.createElement("ul", null, ["item1", "item2"].map((key) => /* @__PURE__ */ React__default.createElement("li", { key }, t(`signAndResignMain.list2.${key}`)))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_sign-and-resign__footer" }, t("signAndResignMain.footer"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__system-usage" }, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignMain.systemUsage")), /* @__PURE__ */ React__default.createElement("ul", null, ["item1", "item2", "item3", "item4"].map((key) => /* @__PURE__ */ React__default.createElement("li", { key }, t(`signAndResignMain.list3.${key}`))))), /* @__PURE__ */ React__default.createElement("div", { id: "LPADocs", className: "aam_sign-and-resign__documents" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_sign-and-resign__documents-title" }, t("signAndResignMain.documentsTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__operator-documents" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_sign-and-resign__operator-documents-title" }, t("signAndResignMain.operatorDocumentsTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__card-boxes" }, renderDocList(operatorDocs))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__emissioner-documents" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_sign-and-resign__emissioner-documents-title" }, t("signAndResignMain.emissionerDocumentsTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__card-boxes" }, renderDocList(emissionerDocs)))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign-section__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("signAndResignSection.homeLink")), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      onClick: () => {
        document.getElementById("header")?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      className: "secondary-link"
    },
    /* @__PURE__ */ React__default.createElement(UpArrowInCircleIcon, { className: "icon" }),
    t("signAndResignSection.upLink")
  )));
}
function SignAndResign() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.serviceInEPS")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Новости" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ServiceInEPS, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  SignAndResign as default
};
