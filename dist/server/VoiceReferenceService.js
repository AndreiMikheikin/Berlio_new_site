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
function VoiceReferenceServiceMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_voice-reference-service-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_voice-reference-service-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/partners" }, t("breadCrumbs.forPartners")), " ", "/", " ", t("breadCrumbs.voiceRefService")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_voice-reference-service-main__header" }, t("voiceRefServiceMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_voice-reference-service-main__content" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__description", style: { whiteSpace: "pre-line" } }, t("voiceRefServiceMain.descr1")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__italic-description" }, t("voiceRefServiceMain.descr2")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__description" }, t("voiceRefServiceMain.descr3")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__description" }, t("voiceRefServiceMain.descr4")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__description" }, t("voiceRefServiceMain.descr5")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__description" }, t("voiceRefServiceMain.descr6"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_voice-reference-service-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("voiceRefServiceMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("voiceRefServiceMain.upLink")
  )));
}
function VoiceReferenceService() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.voiceRefService")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(VoiceReferenceServiceMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  VoiceReferenceService as default
};
