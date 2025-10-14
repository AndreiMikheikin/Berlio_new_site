import React__default from "react";
import { useTranslation } from "react-i18next";
import { P as ParagraphListSection, a as PrivacyData } from "./ApplicantsPolicy2.js";
import "prop-types";
import "react-markdown";
import "remark-gfm";
import "react-transition-group";
import "./MinusIcon.js";
const BuyersPolicy = () => {
  const { t } = useTranslation();
  const privacyData = PrivacyData.buyersPrivacy;
  const privacyApplication = PrivacyData.buyersApplication;
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.buyersData.title")), /* @__PURE__ */ React__default.createElement("h3", { className: "aam_privacy-page__title" }, t("privacyMain.buyersData.subTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyData, allowMultiple: true }))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.buyersApplicationTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyApplication, allowMultiple: true }))));
};
export {
  BuyersPolicy as default
};
