import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
import { S as ServiceCard } from "./ServiceCard.js";
import PropTypes from "prop-types";
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
const iphoneBIC = "/assets/images/iphone-berliointernetclient.png";
function AppStoreIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 66,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 66",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M8.51888 46.7741C7.80059 46.7741 7.11171 46.4887 6.6038 45.9808C6.09589 45.4729 5.81055 44.784 5.81055 44.0657C5.81055 43.3474 6.09589 42.6586 6.6038 42.1506C7.11171 41.6427 7.80059 41.3574 8.51888 41.3574H36.9564C39.6647 41.3574 42.3731 46.7741 41.0189 46.7741H8.51888ZM46.4356 46.7741C45.7173 46.7741 45.0284 46.4887 44.5205 45.9808C44.0126 45.4729 43.7272 44.784 43.7272 44.0657C43.7272 43.3474 44.0126 42.6586 44.5205 42.1506C45.0284 41.6427 45.7173 41.3574 46.4356 41.3574H57.2689C57.9872 41.3574 58.6761 41.6427 59.184 42.1506C59.6919 42.6586 59.9772 43.3474 59.9772 44.0657C59.9772 44.784 59.6919 45.4729 59.184 45.9808C58.6761 46.4887 57.9872 46.7741 57.2689 46.7741H46.4356ZM34.6083 10.2143C34.9667 9.5915 35.5578 9.13663 36.2516 8.94972C36.9454 8.76281 37.6851 8.85917 38.3078 9.21759C38.9306 9.57602 39.3855 10.1672 39.5724 10.861C39.7593 11.5548 39.6629 12.2944 39.3045 12.9172L20.598 45.4063C20.4207 45.7147 20.1845 45.9851 19.9026 46.2022C19.6208 46.4192 19.299 46.5786 18.9556 46.6713C18.6122 46.764 18.2539 46.7881 17.9012 46.7423C17.5484 46.6965 17.2082 46.5817 16.8998 46.4044C16.5915 46.2271 16.321 45.9908 16.104 45.709C15.887 45.4272 15.7276 45.1054 15.6349 44.7619C15.5422 44.4185 15.5181 44.0602 15.5639 43.7075C15.6097 43.3548 15.7245 43.0145 15.9018 42.7061L34.6083 10.2143ZM11.2272 50.8366C12.5814 48.1282 20.7064 45.4199 17.998 50.0782C16.5286 52.5907 15.0543 55.1005 13.5753 57.6074C13.2169 58.2301 12.6258 58.685 11.932 58.8719C11.2382 59.0588 10.4985 58.9625 9.87576 58.6041C9.25299 58.2456 8.79812 57.6545 8.61121 56.9607C8.4243 56.2669 8.52066 55.5272 8.87909 54.9045L11.2272 50.8366ZM25.1291 12.9172C24.7707 12.2944 24.6743 11.5548 24.8612 10.861C25.0481 10.1672 25.503 9.57602 26.1258 9.21759C26.7485 8.85917 27.4882 8.76281 28.182 8.94972C28.8758 9.13663 29.4669 9.5915 29.8253 10.2143L34.546 18.4178C34.7291 18.7262 34.8491 19.068 34.8991 19.4232C34.9491 19.7784 34.928 20.1399 34.8371 20.4869C34.7461 20.8339 34.5872 21.1594 34.3695 21.4444C34.1518 21.7295 33.8796 21.9684 33.5687 22.1474C33.2579 22.3264 32.9146 22.4419 32.5588 22.4872C32.203 22.5324 31.8417 22.5065 31.4959 22.411C31.1502 22.3155 30.8269 22.1522 30.5447 21.9307C30.2626 21.7092 30.0273 21.4339 29.8524 21.1207L25.1291 12.9172ZM35.6022 31.8782C33.1701 27.8157 35.6022 19.6907 37.5414 23.7424L55.5518 54.8991C55.8989 55.5208 55.9872 56.2542 55.7976 56.9405C55.608 57.6269 55.1557 58.2109 54.5386 58.5663C53.9216 58.9216 53.1894 59.0197 52.5006 58.8392C51.8118 58.6587 51.2218 58.2142 50.8583 57.602L35.6022 31.8782Z",
        fill: fillColor
      }
    )
  );
}
AppStoreIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function PlayMarketIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 66,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 66",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M43.4591 43.586L5.85196 5.97425M43.4591 21.5928L5.85196 59.2M4.59375 56.3585V8.81568C4.59375 5.69568 8.26161 3.71783 11.2516 5.23604L58.0377 29.0075C61.1112 30.5675 61.1112 34.6114 58.0377 36.1714L11.2516 59.9428C8.26161 61.461 4.59375 59.4832 4.59375 56.3585Z",
        stroke: fillColor,
        strokeWidth: "5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
}
PlayMarketIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function BerlioInternetClientAppMain() {
  const { t } = useTranslation();
  const handlePlayClick = () => {
    window.open("https://play.google.com/store/apps/details?id=by.berlio.trueClient", "_blank", "noopener,noreferrer");
  };
  const handleAppleClick = () => {
    window.open("https://apps.apple.com/ru/app/berlio-internet-client/id1228629688?ls=1", "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_bic-app-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_bic-app-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.bicApp")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_bic-app-main__header" }, t("bicAppMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_bic-app-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("bicAppMain.description")), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("bicAppMain.ulHeader"))), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item6")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item7"))), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("bicAppMain.stong1"))), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("bicAppMain.stong2"))), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("bicAppMain.stong3"))), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("bicAppMain.stong4")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_bic-app-main__links" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_bic-app-main__service-card",
      Icon: PlayMarketIcon,
      title: t("bicAppMain.cardTitle1"),
      description: "",
      link: "",
      onClick: () => handlePlayClick(
        t("bicAppMain.cardTitle1")
      )
    }
  ), /* @__PURE__ */ React__default.createElement("img", { src: iphoneBIC, alt: "Berlio Internet Client" }), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_bic-app-main__service-card",
      Icon: AppStoreIcon,
      title: t("bicAppMain.cardTitle2"),
      description: "",
      link: "",
      onClick: () => handleAppleClick(
        t("bicAppMain.cardTitle2")
      )
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_bic-app-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("bicAppMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("bicAppMain.upLink")
  )));
}
function BerlioInternetClientApp() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.bicApp")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(BerlioInternetClientAppMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  BerlioInternetClientApp as default
};
