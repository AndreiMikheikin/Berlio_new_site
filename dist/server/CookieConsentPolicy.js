import React__default, { useState } from "react";
import { useTranslation } from "react-i18next";
import { P as ParagraphListSection, a as PrivacyData } from "./ApplicantsPolicy2.js";
import { B as Button, C as CookieConsentModal } from "./entry-server.js";
import "prop-types";
import "react-markdown";
import "remark-gfm";
import "react-transition-group";
import "./MinusIcon.js";
import "react-dom/server";
import "@remix-run/router";
import "react-router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "i18next";
import "react-dom";
import "uuid";
const CookieConsentPolicy = () => {
  const { t } = useTranslation();
  const cookieData = PrivacyData.cookiePrivacy;
  const [modalKey, setModalKey] = useState(0);
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.cookieData.title")), /* @__PURE__ */ React__default.createElement("h3", { className: "aam_privacy-page__title" }, t("privacyMain.cookieData.subTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: cookieData, allowMultiple: true }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__button" }, /* @__PURE__ */ React__default.createElement(
    Button,
    {
      label: t("Персональные настройки cookies"),
      onClick: () => setModalKey((prev) => prev + 1),
      variant: "green"
    }
  )), modalKey > 0 && /* @__PURE__ */ React__default.createElement(CookieConsentModal, { key: `modal-${modalKey}`, forceVisible: true }))));
};
export {
  CookieConsentPolicy as default
};
