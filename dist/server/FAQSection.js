import React__default, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { M as MinusIcon, P as PlusIcon } from "./MinusIcon.js";
function InformationCard({
  title,
  links = [],
  bgImage = "",
  IconComponent = null,
  customClass
}) {
  return /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: `aam_information-card ${customClass}`,
      style: { backgroundImage: bgImage ? `url(${bgImage})` : "none" }
    },
    /* @__PURE__ */ React__default.createElement("div", { className: "aam_information-card__content" }, IconComponent && /* @__PURE__ */ React__default.createElement("div", { className: "aam_information-card__icon" }, /* @__PURE__ */ React__default.createElement(
      IconComponent,
      {
        fillColor: "#FFFFFFFF",
        width: "45",
        height: "45"
      }
    )), /* @__PURE__ */ React__default.createElement("h3", { className: "aam_information-card__title" }, title)),
    /* @__PURE__ */ React__default.createElement("div", { className: "aam_information-card__hover-overlay" }, (links || []).map((link) => link.href && /* @__PURE__ */ React__default.createElement(
      "a",
      {
        key: link.href,
        href: link.href,
        className: "aam_information-card__link",
        target: link.href.startsWith("http") ? "_blank" : "_self",
        rel: link.href.startsWith("http") ? "noopener noreferrer" : void 0
      },
      link.label
    )))
  );
}
InformationCard.propTypes = {
  title: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string
    })
  ),
  bgImage: PropTypes.string,
  customClass: PropTypes.string
};
function DocumentIcon({
  fillColor = "#FFFFFFFF",
  width = 35,
  height = 34,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 35 34",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M15.8318 8.6423e-07H19.1682C21.3309 -3.17492e-05 23.0741 -5.80514e-05 24.4451 0.18427C25.8685 0.375645 27.067 0.785059 28.0189 1.73693C28.4909 2.20892 28.8295 2.74156 29.0743 3.3322C30.5482 3.51684 31.7857 3.92239 32.7631 4.8998C33.7149 5.85167 34.1244 7.05017 34.3157 8.47359C34.5001 9.84461 34.5 11.5878 34.5 13.7505V20.2496C34.5 22.4123 34.5001 24.1556 34.3157 25.5266C34.1244 26.95 33.7149 28.1485 32.7631 29.1004C31.7857 30.0778 30.5482 30.4833 29.0742 30.668C28.8294 31.2585 28.4908 31.7911 28.0189 32.2631C27.067 33.2149 25.8685 33.6244 24.4451 33.8157C23.0741 34.0001 21.3309 34 19.1682 34H15.8318C13.6691 34 11.9259 34.0001 10.5549 33.8157C9.13148 33.6244 7.93298 33.2149 6.98111 32.2631C6.50916 31.7911 6.17056 31.2585 5.92578 30.668C4.45182 30.4833 3.21435 30.0778 2.23693 29.1004C1.28506 28.1485 0.875645 26.95 0.68427 25.5266C0.499942 24.1556 0.499968 22.4124 0.500001 20.2497V13.7505C0.499968 11.5878 0.499942 9.84461 0.68427 8.47359C0.875645 7.05017 1.28506 5.85167 2.23693 4.8998C3.21433 3.92239 4.45178 3.51683 5.92571 3.33219C6.1705 2.74156 6.50912 2.20892 6.98111 1.73693C7.93298 0.785058 9.13148 0.375645 10.5549 0.18427C11.9259 -5.80514e-05 13.6691 -3.17492e-05 15.8318 8.6423e-07ZM5.36822 5.83609C4.67618 6.00287 4.24475 6.24662 3.91425 6.57712C3.47658 7.01479 3.19122 7.62928 3.03521 8.78967C2.87461 9.98418 2.87209 11.5673 2.87209 13.8373V20.1629C2.87209 22.4328 2.87461 24.016 3.03521 25.2105C3.19122 26.3709 3.47658 26.9854 3.91425 27.423C4.24475 27.7535 4.67619 27.9973 5.36824 28.1641C5.24413 26.8812 5.24416 25.3079 5.24419 23.4124V10.5876C5.24416 8.69218 5.24413 7.11895 5.36822 5.83609ZM29.6318 28.1641C30.3238 27.9973 30.7552 27.7535 31.0858 27.423C31.5234 26.9854 31.8088 26.3709 31.9648 25.2105C32.1254 24.016 32.1279 22.4328 32.1279 20.1629V13.8373C32.1279 11.5673 32.1254 9.98418 31.9648 8.78967C31.8088 7.62928 31.5234 7.01479 31.0858 6.57712C30.7552 6.24662 30.3238 6.00287 29.6318 5.8361C29.7559 7.11895 29.7558 8.69219 29.7558 10.5876V23.4123C29.7558 25.3079 29.7559 26.8812 29.6318 28.1641ZM10.871 2.53521C9.71059 2.69122 9.09611 2.97658 8.65843 3.41425C8.22076 3.85192 7.93541 4.46641 7.7794 5.6268C7.6188 6.8213 7.61628 8.40446 7.61628 10.6744V23.3256C7.61628 25.5955 7.6188 27.1787 7.7794 28.3732C7.93541 29.5336 8.22076 30.1481 8.65843 30.5858C9.09611 31.0234 9.71059 31.3088 10.871 31.4648C12.0655 31.6254 13.6486 31.6279 15.9186 31.6279H19.0814C21.3514 31.6279 22.9345 31.6254 24.129 31.4648C25.2894 31.3088 25.9039 31.0234 26.3416 30.5858C26.7792 30.1481 27.0646 29.5336 27.2206 28.3732C27.3812 27.1787 27.3837 25.5955 27.3837 23.3256V10.6744C27.3837 8.40446 27.3812 6.8213 27.2206 5.6268C27.0646 4.46641 26.7792 3.85192 26.3416 3.41425C25.9039 2.97658 25.2894 2.69122 24.129 2.53521C22.9345 2.37461 21.3514 2.37209 19.0814 2.37209H15.9186C13.6486 2.37209 12.0655 2.37461 10.871 2.53521ZM11.5698 12.2558C11.5698 11.6008 12.1008 11.0698 12.7558 11.0698H22.2442C22.8992 11.0698 23.4302 11.6008 23.4302 12.2558C23.4302 12.9108 22.8992 13.4419 22.2442 13.4419H12.7558C12.1008 13.4419 11.5698 12.9108 11.5698 12.2558ZM11.5698 18.5814C11.5698 17.9264 12.1008 17.3953 12.7558 17.3953H22.2442C22.8992 17.3953 23.4302 17.9264 23.4302 18.5814C23.4302 19.2364 22.8992 19.7674 22.2442 19.7674H12.7558C12.1008 19.7674 11.5698 19.2364 11.5698 18.5814ZM11.5698 24.907C11.5698 24.2519 12.1008 23.7209 12.7558 23.7209H17.5C18.155 23.7209 18.686 24.2519 18.686 24.907C18.686 25.562 18.155 26.093 17.5 26.093H12.7558C12.1008 26.093 11.5698 25.562 11.5698 24.907Z",
        fill: fillColor
      }
    )
  );
}
DocumentIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
const forPartners = { "num#1": { "icon": "LaptopIcon", "title": "forPartnersMain.partnerInfo.title1", "bg-image": "BG1", "links": [{ "href": "/equipment/webCenterBerlio", "label": "forPartnersMain.partnerInfo.label1" }, { "href": "/equipment/oilAndCapital", "label": "forPartnersMain.partnerInfo.label2" }, { "href": "/equipment/selfServiceCheckout", "label": "forPartnersMain.partnerInfo.label3" }, { "href": "/equipment/gsAutomationSystem", "label": "forPartnersMain.partnerInfo.label4" }, { "href": "/equipment/invoicesSite", "label": "forPartnersMain.partnerInfo.label5" }] }, "num#2": { "icon": "DocumentIcon", "title": "forPartnersMain.partnerInfo.title2", "bg-image": "BG2", "links": [{ "href": "/partners/voiceRefService", "label": "forPartnersMain.partnerInfo.label6" }, { "href": "/partners/loyaltyProgram", "label": "forPartnersMain.partnerInfo.label7" }, { "href": "/partners/documentsForDownload", "label": "forPartnersMain.partnerInfo.label8" }, { "href": "/partners/systemRules", "label": "forPartnersMain.partnerInfo.label9" }, { "href": "/partners/forBankInformation", "label": "forPartnersMain.partnerInfo.label10" }] }, "num#3": { "icon": "DocumentIcon", "title": "forPartnersMain.partnerInfo.title3", "bg-image": "BG3", "links": [{ "href": "#/partners/11" }] } };
const forClients = { "num#1": { "icon": "ClientIcon", "title": "forClientsMain.clientInfo.title1", "bg-image": "BG4", "links": [{ "href": "/clients/serviceInEPS", "label": "forClientsMain.clientInfo.label1" }, { "href": "/clients/forFuelPayments", "label": "forClientsMain.clientInfo.label2" }, { "href": "/clients/signAndResign", "label": "forClientsMain.clientInfo.label3" }, { "href": "/clients/documentsForDownload", "label": "forClientsMain.clientInfo.label4" }, { "href": "/clients/gettingElectronicCard", "label": "forClientsMain.clientInfo.label5" }, { "href": "/clients/workWithPrivateAccount", "label": "forClientsMain.clientInfo.label6" }] }, "num#2": { "icon": "OilIcon", "title": "forClientsMain.clientInfo.title2", "bg-image": "BG5", "links": [{ "href": "/clients/tollRoadsService", "label": "forClientsMain.clientInfo.label7" }, { "href": "/clients/tollRoadsPayment", "label": "forClientsMain.clientInfo.label8" }, { "href": "/clients/tollRoads", "label": "forClientsMain.clientInfo.label9" }, { "href": "/clients/forFuelPayments", "label": "forClientsMain.clientInfo.label10" }, { "href": "/clients/fuelCardsUsage", "label": "forClientsMain.clientInfo.label11" }] }, "num#3": { "icon": "DocumentIcon", "title": "forClientsMain.clientInfo.title3", "bg-image": "BG6", "links": [{ "href": "/clients/legislation", "label": "forClientsMain.clientInfo.label12" }, { "href": "/clients/reportIFR", "label": "forClientsMain.clientInfo.label13" }, { "href": "/clients/localActsInEPS", "label": "forClientsMain.clientInfo.label14" }] }, "num#4": { "icon": "SmartphoneIcon", "title": "forClientsMain.clientInfo.title4", "bg-image": "BG7", "links": [{ "href": "/equipment/berlioInternetClientApp", "label": "forClientsMain.clientInfo.label15" }, { "href": "/equipment/berlioCardPayApp", "label": "forClientsMain.clientInfo.label16" }, { "href": "/equipment/smartPayApp", "label": "forClientsMain.clientInfo.label17" }, { "href": "/equipment/selfServiceCheckout", "label": "forClientsMain.clientInfo.label18" }, { "href": "/equipment/personalAccWebApp", "label": "forClientsMain.clientInfo.label19" }] } };
const cardDataJson = {
  forPartners,
  forClients
};
const partnersFAQ = { "faq_title": "partners.faq_title", "questions": { "question1": "partners.questions.question1", "question2": "partners.questions.question2", "question3": "partners.questions.question3", "question4": "partners.questions.question4", "question5": "partners.questions.question5" }, "answers": { "answer1": "partners.answers.answer1", "answer2": "partners.answers.answer2", "answer3": "partners.answers.answer3", "answer4": "partners.answers.answer4", "answer5": "partners.answers.answer5" } };
const clientsFAQ = { "faq_title": "clients.faq_title", "questions": { "question1": "clients.questions.question1", "question2": "clients.questions.question2", "question3": "clients.questions.question3", "question4": "clients.questions.question4", "question5": "clients.questions.question5" }, "answers": { "answer1": "clients.answers.answer1", "answer2": "clients.answers.answer2", "answer3": "clients.answers.answer3", "answer4": "clients.answers.answer4", "answer5": "clients.answers.answer5" } };
const FAQData = {
  partnersFAQ,
  clientsFAQ
};
function FAQSection({ category }) {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const { t } = useTranslation();
  if (!FAQData[category]) {
    return /* @__PURE__ */ React__default.createElement("div", null, t("invalid_category"));
  }
  const {
    questions,
    answers,
    faq_title: faqTitle
  } = FAQData[category];
  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  const renderFAQ = () => {
    const questionKeys = Object.keys(questions);
    const answerKeys = Object.keys(answers);
    return questionKeys.map((questionKey, index) => {
      const questionValue = questions[questionKey];
      const answerValue = answers[answerKeys[index]];
      const isActive = activeQuestion === index;
      return /* @__PURE__ */ React__default.createElement("div", { key: questionKey, className: "aam_faq-section__item" }, /* @__PURE__ */ React__default.createElement(
        "div",
        {
          className: "aam_faq-section__question",
          role: "button",
          tabIndex: 0,
          onClick: () => toggleAnswer(index),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleAnswer(index);
            }
          }
        },
        t(questionValue),
        /* @__PURE__ */ React__default.createElement("span", { className: "aam_faq-section__icon" }, isActive ? /* @__PURE__ */ React__default.createElement(MinusIcon, null) : /* @__PURE__ */ React__default.createElement(PlusIcon, null))
      ), /* @__PURE__ */ React__default.createElement("div", { className: `aam_faq-section__answer ${isActive ? "" : "hidden"}` }, t(answerValue)));
    });
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_faq-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_faq-section__title" }, t(faqTitle)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_faq-section__list" }, renderFAQ()));
}
FAQSection.propTypes = {
  category: PropTypes.string.isRequired
};
export {
  DocumentIcon as D,
  FAQSection as F,
  InformationCard as I,
  cardDataJson as c
};
