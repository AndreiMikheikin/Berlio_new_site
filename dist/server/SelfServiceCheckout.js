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
function SelfServiceCheckoutMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_self-service-checkout-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.selfServiceCheckout")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_self-service-checkout-main__header" }, t("selfServiceCheckoutMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("selfServiceCheckoutMain.descriptionFirst")), /* @__PURE__ */ React__default.createElement("p", null, t("selfServiceCheckoutMain.descriptionPreBold"), /* @__PURE__ */ React__default.createElement("strong", null, t("selfServiceCheckoutMain.descriptionBold")), " "), /* @__PURE__ */ React__default.createElement("p", null, t("selfServiceCheckoutMain.descriptionSecond"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__wrapper" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_self-service-checkout-main__wrapper--sup-description" }, t("selfServiceCheckoutMain.list1.supDescription")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_self-service-checkout-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list1.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list1.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list1.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list1.item5")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("selfServiceCheckoutMain.descriptionThird")), /* @__PURE__ */ React__default.createElement("p", null, t("selfServiceCheckoutMain.descriptionFourth"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__wrapper" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_self-service-checkout-main__wrapper--sup-description" }, t("selfServiceCheckoutMain.list2.supDescription")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_self-service-checkout-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item6"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_self-service-checkout-main__wrapper--sub-description" }, t("selfServiceCheckoutMain.list2.subDescription"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("selfServiceCheckoutMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("selfServiceCheckoutMain.upLink")
  )));
}
function SelfServiceCheckout() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.selfServiceCheckout")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(SelfServiceCheckoutMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  SelfServiceCheckout as default
};
