import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { c as LinkButton, H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { C as CardBox } from "./CardBox.js";
import { P as PdfIcon } from "./PdfIcon.js";
import PropTypes from "prop-types";
import { P as PaymentCardIcon } from "./PaymentCardIcon.js";
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
import "react-dom";
import "uuid";
function InfoIcon({
  fillColor = "#48AE5A",
  width = 60,
  height = 61,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 60 61",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M30 58C45.1878 58 57.5 45.6878 57.5 30.5C57.5 15.3122 45.1878 3 30 3C14.8122 3 2.5 15.3122 2.5 30.5C2.5 45.6878 14.8122 58 30 58Z",
        stroke: fillColor,
        strokeWidth: "5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M30 41.5V30.5M30 19.5H30.0275",
        stroke: fillColor,
        strokeWidth: "5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
}
InfoIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function HandCashIcon({
  fillColor = "#48AE5A",
  width = 86,
  height = 85,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 86 86",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M7.5835 38.9585L17.525 27.7775C18.8541 26.2818 20.4849 25.0846 22.3102 24.2647C24.1354 23.4449 26.1136 23.021 28.1145 23.021H28.8335M7.5835 69.0627H27.0627L41.2293 58.4377C41.2293 58.4377 44.0981 56.5004 48.3127 53.1252C57.1668 46.0418 48.3127 34.8289 39.4585 40.7293C32.2477 45.5354 25.2918 49.5835 25.2918 49.5835",
        stroke: fillColor,
        strokeWidth: "4.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M28.8335 47.8127V24.7918C28.8335 22.9132 29.5798 21.1115 30.9082 19.7832C32.2365 18.4548 34.0382 17.7085 35.9168 17.7085H71.3335C73.2121 17.7085 75.0138 18.4548 76.3422 19.7832C77.6706 21.1115 78.4168 22.9132 78.4168 24.7918V46.0418C78.4168 47.9204 77.6706 49.7221 76.3422 51.0505C75.0138 52.3789 73.2121 53.1252 71.3335 53.1252H48.3127",
        stroke: fillColor,
        strokeWidth: "4.5"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M69.5625 35.4522L69.5979 35.4133M37.6875 35.4522L37.7229 35.4133M53.625 42.5002C51.7464 42.5002 49.9447 41.7539 48.6163 40.4255C47.2879 39.0971 46.5417 37.2954 46.5417 35.4168C46.5417 33.5382 47.2879 31.7365 48.6163 30.4082C49.9447 29.0798 51.7464 28.3335 53.625 28.3335C55.5036 28.3335 57.3053 29.0798 58.6337 30.4082C59.9621 31.7365 60.7083 33.5382 60.7083 35.4168C60.7083 37.2954 59.9621 39.0971 58.6337 40.4255C57.3053 41.7539 55.5036 42.5002 53.625 42.5002Z",
        stroke: fillColor,
        strokeWidth: "4.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
}
HandCashIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ReportIcon({
  fillColor = "#48AE5A",
  width = 76,
  height = 76,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 76 76",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M61.0375 22.0875L44.4125 5.4625C43.9375 4.9875 43.4625 4.75 42.75 4.75H19C16.3875 4.75 14.25 6.8875 14.25 9.5V66.5C14.25 69.1125 16.3875 71.25 19 71.25H57C59.6125 71.25 61.75 69.1125 61.75 66.5V23.75C61.75 23.0375 61.5125 22.5625 61.0375 22.0875ZM42.75 10.45L56.05 23.75H42.75V10.45ZM57 66.5H19V9.5H38V23.75C38 26.3625 40.1375 28.5 42.75 28.5H57V66.5Z",
        fill: fillColor
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M23.75 54.25C23.75 53.1454 24.6454 52.25 25.75 52.25H50.25C51.3546 52.25 52.25 53.1454 52.25 54.25V55C52.25 56.1046 51.3546 57 50.25 57H25.75C24.6454 57 23.75 56.1046 23.75 55V54.25ZM23.75 40C23.75 38.8954 24.6454 38 25.75 38H50.25C51.3546 38 52.25 38.8954 52.25 40V40.75C52.25 41.8546 51.3546 42.75 50.25 42.75H25.75C24.6454 42.75 23.75 41.8546 23.75 40.75V40Z",
        fill: fillColor
      }
    )
  );
}
ReportIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function CashIcon({
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
    /* @__PURE__ */ React__default.createElement("g", { clipPath: "url(#clip0_279_3604)" }, /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M60.4219 10.6562H5.57812C4.23132 10.6563 2.93968 11.1913 1.98735 12.1436C1.03502 13.0959 0.5 14.3876 0.5 15.7344L0.5 50.2656C0.5 51.6124 1.03502 52.9041 1.98735 53.8564C2.93968 54.8087 4.23132 55.3438 5.57812 55.3438H60.4219C61.7687 55.3438 63.0603 54.8087 64.0127 53.8564C64.965 52.9041 65.5 51.6124 65.5 50.2656V15.7344C65.5 14.3876 64.965 13.0959 64.0127 12.1436C63.0603 11.1913 61.7687 10.6563 60.4219 10.6562ZM5.57812 15.7344H13.7031C13.6466 16.7383 13.3904 17.7208 12.9493 18.6243C12.5083 19.5279 11.8913 20.3344 11.1346 20.9965C10.3779 21.6586 9.49671 22.163 8.54259 22.4802C7.58846 22.7974 6.58062 22.921 5.57812 22.8438V15.7344ZM5.57812 50.2656V43.1562C6.58062 43.079 7.58846 43.2026 8.54259 43.5198C9.49671 43.837 10.3779 44.3414 11.1346 45.0035C11.8913 45.6656 12.5083 46.4721 12.9493 47.3757C13.3904 48.2792 13.6466 49.2617 13.7031 50.2656H5.57812ZM60.4219 50.2656H52.5C52.6154 48.2752 53.5128 46.411 54.9967 45.0793C56.4805 43.7477 58.4306 43.0564 60.4219 43.1562V50.2656ZM60.4219 38.0781C58.7678 38.0239 57.1193 38.2962 55.5706 38.8795C54.0218 39.4628 52.6032 40.3456 51.3959 41.4775C50.1886 42.6094 49.2162 43.9681 48.5343 45.4761C47.8524 46.984 47.4744 48.6115 47.4219 50.2656H18.5781C18.5256 48.6115 18.1476 46.984 17.4657 45.4761C16.7838 43.9681 15.8114 42.6094 14.6041 41.4775C13.3968 40.3456 11.9782 39.4628 10.4294 38.8795C8.88069 38.2962 7.23217 38.0239 5.57812 38.0781V27.9219C7.23217 27.9761 8.88069 27.7038 10.4294 27.1205C11.9782 26.5372 13.3968 25.6544 14.6041 24.5225C15.8114 23.3906 16.7838 22.0319 17.4657 20.5239C18.1476 19.016 18.5256 17.3885 18.5781 15.7344H47.4219C47.4744 17.3885 47.8524 19.016 48.5343 20.5239C49.2162 22.0319 50.1886 23.3906 51.3959 24.5225C52.6032 25.6544 54.0218 26.5372 55.5706 27.1205C57.1193 27.7038 58.7678 27.9761 60.4219 27.9219V38.0781ZM60.4219 22.8438C58.4306 22.9436 56.4805 22.2523 54.9967 20.9207C53.5128 19.589 52.6154 17.7248 52.5 15.7344H60.4219V22.8438Z",
        fill: fillColor
      }
    ), /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M33 20.8124C31.346 20.7582 29.6974 21.0305 28.1487 21.6138C26.6 22.1971 25.1814 23.0799 23.974 24.2118C22.7667 25.3437 21.7943 26.7024 21.1124 28.2104C20.4305 29.7183 20.0525 31.3458 20 32.9999C20.0525 34.654 20.4305 36.2816 21.1124 37.7895C21.7943 39.2974 22.7667 40.6562 23.974 41.788C25.1814 42.9199 26.6 43.8027 28.1487 44.386C29.6974 44.9693 31.346 45.2416 33 45.1874C34.654 45.2416 36.3026 44.9693 37.8513 44.386C39.4 43.8027 40.8186 42.9199 42.026 41.788C43.2333 40.6562 44.2057 39.2974 44.8876 37.7895C45.5695 36.2816 45.9475 34.654 46 32.9999C45.9475 31.3458 45.5695 29.7183 44.8876 28.2104C44.2057 26.7024 43.2333 25.3437 42.026 24.2118C40.8186 23.0799 39.4 22.1971 37.8513 21.6138C36.3026 21.0305 34.654 20.7582 33 20.8124ZM33 40.1093C31.0087 40.2091 29.0587 39.5179 27.5748 38.1862C26.0909 36.8545 25.1935 34.9904 25.0781 32.9999C25.1935 31.0095 26.0909 29.1453 27.5748 27.8136C29.0587 26.482 31.0087 25.7907 33 25.8906C34.0025 25.8133 35.0103 25.9369 35.9645 26.2541C36.9186 26.5713 37.7998 27.0757 38.5565 27.7378C39.3132 28.3999 39.9301 29.2064 40.3712 30.11C40.8122 31.0135 41.0685 31.996 41.125 32.9999C41.0685 34.0038 40.8122 34.9863 40.3712 35.8899C39.9301 36.7935 39.3132 37.5999 38.5565 38.2621C37.7998 38.9242 36.9186 39.4286 35.9645 39.7458C35.0103 40.063 34.0025 40.1866 33 40.1093Z",
        fill: fillColor
      }
    )),
    /* @__PURE__ */ React__default.createElement("defs", null, /* @__PURE__ */ React__default.createElement("clipPath", { id: "clip0_279_3604" }, /* @__PURE__ */ React__default.createElement("rect", { width: "65", height: "65", fill: "white", transform: "translate(0.5 0.5)" })))
  );
}
CashIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function WorkWithPrivateAccountMain() {
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
  isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_work-with-private-account" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_work-with-private-account__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.workWithPrivateAccount")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_work-with-private-account__header" }, t("workWithPrivateAccount.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_work-with-private-account__description" }, /* @__PURE__ */ React__default.createElement("strong", null, t("workWithPrivateAccount.description")), /* @__PURE__ */ React__default.createElement("ol", null, /* @__PURE__ */ React__default.createElement("li", null, t("workWithPrivateAccount.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("workWithPrivateAccount.list1.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("workWithPrivateAccount.list1.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("workWithPrivateAccount.list1.item4")))), /* @__PURE__ */ React__default.createElement("h2", { className: "aam_work-with-private-account__sections" }, t("workWithPrivateAccount.sections")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_work-with-private-account__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_work-with-private-account",
      Icon: InfoIcon,
      title: t("workWithPrivateAccount.information"),
      description: t("workWithPrivateAccount.informationTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_work-with-private-account",
      Icon: HandCashIcon,
      title: t("workWithPrivateAccount.payments"),
      description: t("workWithPrivateAccount.paymentsTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_work-with-private-account",
      Icon: PaymentCardIcon,
      title: t("workWithPrivateAccount.cardList"),
      description: t("workWithPrivateAccount.cardListTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_work-with-private-account",
      Icon: ReportIcon,
      title: t("workWithPrivateAccount.report"),
      description: t("workWithPrivateAccount.reportTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_work-with-private-account",
      Icon: CashIcon,
      title: t("workWithPrivateAccount.balance"),
      description: t("workWithPrivateAccount.balanceTagline")
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_work-with-private-account__container" }, /* @__PURE__ */ React__default.createElement("strong", { className: "aam_work-with-private-account__container--text" }, t("workWithPrivateAccount.middleDescriptinon")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_work-with-private-account__container--doc-list" }, [].map(({ title, link }) => /* @__PURE__ */ React__default.createElement("li", { key: title }, /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: link,
      onClick: (e) => {
        e.preventDefault();
        handleLinkClick(title, link);
      },
      target: "_blank",
      rel: "noreferrer"
    },
    /* @__PURE__ */ React__default.createElement(PdfIcon, { className: "aam_work-with-private-account__container--doc-icon" }),
    /* @__PURE__ */ React__default.createElement("span", null, title)
  ))))), /* @__PURE__ */ React__default.createElement(LinkButton, { href: "https://lkb.by", target: "_blank", rel: "noopener noreferrer", className: "green" }, t("workWithPrivateAccount.lkbLink")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_work-with-private-account__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("workWithPrivateAccount.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("workWithPrivateAccount.upLink")
  )));
}
function WorkWithPrivateAccount() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.workWithPrivateAccount")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(WorkWithPrivateAccountMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  WorkWithPrivateAccount as default
};
