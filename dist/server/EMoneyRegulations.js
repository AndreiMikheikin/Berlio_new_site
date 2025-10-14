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
function EMoneyRegulationsMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_e-money-regulations-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_e-money-regulations-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.eMoneyRegulations")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_e-money-regulations-main__header" }, t("eMoneyRegulationsMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_e-money-regulations-main__description" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_e-money-regulations-main__description--first" }, t("eMoneyRegulationsMain.descriptionFirst")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_e-money-regulations-main__description--second" }, /* @__PURE__ */ React__default.createElement("strong", null, t("eMoneyRegulationsMain.descriptionSecond"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_e-money-regulations-main__description--third" }, t("eMoneyRegulationsMain.descriptionThird")), /* @__PURE__ */ React__default.createElement("ol", { className: "aam_e-money-regulations-main__description--ol" }, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item1"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item2"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item3.span")), /* @__PURE__ */ React__default.createElement("p", null, t("eMoneyRegulationsMain.descriptionOl.item3.header")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item3.ulItem1"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item3.ulItem2"))))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item4"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item5"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item6"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item7"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item8.before"), /* @__PURE__ */ React__default.createElement(Link, { to: "/news" }, t("eMoneyRegulationsMain.descriptionOl.item8.firstLink")), t("eMoneyRegulationsMain.descriptionOl.item8.between"), /* @__PURE__ */ React__default.createElement(Link, { to: "https://lkb.by", target: "_blank", rel: "noopener noreferrer" }, t("eMoneyRegulationsMain.descriptionOl.item8.secondLink")), t("eMoneyRegulationsMain.descriptionOl.item8.after"))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_e-money-regulations-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("eMoneyRegulationsMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("eMoneyRegulationsMain.upLink")
  )));
}
function EMoneyRegulations() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.eMoneyRegulations")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(EMoneyRegulationsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  EMoneyRegulations as default
};
