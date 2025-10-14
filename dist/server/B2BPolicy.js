import React__default from "react";
import { useTranslation } from "react-i18next";
import { P as ParagraphListSection, a as PrivacyData } from "./ApplicantsPolicy2.js";
import "prop-types";
import "react-markdown";
import "remark-gfm";
import "react-transition-group";
import "./MinusIcon.js";
const B2BPolicy = () => {
  const { t } = useTranslation();
  const privacyData = PrivacyData.b2bPrivacy;
  const privacyApplication = PrivacyData.b2bApplication;
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.b2bData.title")), /* @__PURE__ */ React__default.createElement("h3", { className: "aam_privacy-page__title" }, t("privacyMain.b2bData.subTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyData, allowMultiple: true }))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.b2bApplicationTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyApplication, allowMultiple: true }))));
};
export {
  B2BPolicy as default
};
