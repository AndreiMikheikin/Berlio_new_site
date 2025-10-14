import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { S as ServiceCard } from "./ServiceCard.js";
import { G as GlobeIcon } from "./GlobeIcon.js";
import PropTypes from "prop-types";
import { L as LaptopIcon } from "./LaptopIcon.js";
import { C as ClientIcon } from "./ClientIcon.js";
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
function EquipmentAndSoftMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_equipment-and-soft-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_equipment-and-soft-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", t("breadCrumbs.equipment")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_equipment-and-soft-main__header" }, t("equipment.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_equipment-and-soft-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("equipment.descr1")), /* @__PURE__ */ React__default.createElement("p", null, t("equipment.descr2"))));
}
function CanisterIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 65,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M60.0837 27.7144V43.0165C60.0837 50.8273 60.0837 54.7327 57.703 57.1567C55.3251 59.5833 51.4928 59.5833 43.8337 59.5833H22.167C14.5078 59.5833 10.6755 59.5833 8.29762 57.1567C5.91699 54.7354 5.91699 50.8273 5.91699 43.0192V35.444C5.91699 29.7673 5.91699 26.9263 7.4147 24.7731C8.91512 22.62 11.5422 21.6856 16.7991 19.8088L38.4657 12.0765C48.3132 8.56376 53.237 6.80605 56.6603 9.28417C58.5237 10.6302 59.3714 12.8185 59.7587 16.25",
        stroke: fillColor,
        strokeWidth: "4",
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M24.875 37.9167C24.875 34.0871 24.875 32.1723 26.0667 30.9834C27.2529 29.7917 29.1677 29.7917 33 29.7917C36.8296 29.7917 38.7444 29.7917 39.9333 30.9834C41.125 32.1723 41.125 34.0871 41.125 37.9167C41.125 41.7463 41.125 43.6611 39.9333 44.85C38.7444 46.0417 36.8296 46.0417 33 46.0417C29.1704 46.0417 27.2556 46.0417 26.0667 44.85C24.875 43.6638 24.875 41.749 24.875 37.9167Z",
        stroke: fillColor,
        strokeWidth: "4"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M41.1253 29.7917L43.8337 27.0833M24.8753 29.7917L22.167 27.0833M41.1253 46.0417L43.8337 48.75M24.8753 46.0417L22.167 48.75M14.042 19.1208C14.042 15.5865 14.042 13.8206 14.9574 12.6019C15.193 12.2877 15.4693 12.0061 15.7753 11.7677C16.967 10.8333 18.7003 10.8333 22.167 10.8333H24.3824C25.7555 10.8333 26.4435 10.8333 27.0095 10.9877C27.7658 11.199 28.4532 11.6056 29.0027 12.1665C29.5523 12.7275 29.9446 13.4231 30.1403 14.1836",
        stroke: fillColor,
        strokeWidth: "4",
        strokeLinecap: "round"
      }
    )
  );
}
CanisterIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ParkSystemIcon$1({
  fillColor = "#48AE5A",
  width = 66,
  height = 65,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M24.875 8.125H11.3333C10.615 8.125 9.92616 8.41034 9.41825 8.91825C8.91034 9.42616 8.625 10.115 8.625 10.8333V24.375C8.625 25.0933 8.91034 25.7822 9.41825 26.2901C9.92616 26.798 10.615 27.0833 11.3333 27.0833H24.875C25.5933 27.0833 26.2822 26.798 26.7901 26.2901C27.298 25.7822 27.5833 25.0933 27.5833 24.375V10.8333C27.5833 10.115 27.298 9.42616 26.7901 8.91825C26.2822 8.41034 25.5933 8.125 24.875 8.125ZM24.875 37.9167H11.3333C10.615 37.9167 9.92616 38.202 9.41825 38.7099C8.91034 39.2178 8.625 39.9067 8.625 40.625V54.1667C8.625 54.885 8.91034 55.5738 9.41825 56.0817C9.92616 56.5897 10.615 56.875 11.3333 56.875H24.875C25.5933 56.875 26.2822 56.5897 26.7901 56.0817C27.298 55.5738 27.5833 54.885 27.5833 54.1667V40.625C27.5833 39.9067 27.298 39.2178 26.7901 38.7099C26.2822 38.202 25.5933 37.9167 24.875 37.9167ZM47.8958 27.0833C49.1407 27.0833 50.3733 26.8381 51.5234 26.3618C52.6734 25.8854 53.7184 25.1872 54.5986 24.3069C55.4788 23.4267 56.1771 22.3818 56.6534 21.2317C57.1298 20.0816 57.375 18.849 57.375 17.6042C57.375 16.3593 57.1298 15.1267 56.6534 13.9766C56.1771 12.8266 55.4788 11.7816 54.5986 10.9014C53.7184 10.0212 52.6734 9.32293 51.5234 8.84656C50.3733 8.37019 49.1407 8.125 47.8958 8.125C45.3818 8.125 42.9707 9.1237 41.193 10.9014C39.4154 12.6791 38.4167 15.0901 38.4167 17.6042C38.4167 20.1182 39.4154 22.5293 41.193 24.3069C42.9707 26.0846 45.3818 27.0833 47.8958 27.0833ZM54.6667 37.9167H41.125C40.4067 37.9167 39.7178 38.202 39.2099 38.7099C38.702 39.2178 38.4167 39.9067 38.4167 40.625V54.1667C38.4167 54.885 38.702 55.5738 39.2099 56.0817C39.7178 56.5897 40.4067 56.875 41.125 56.875H54.6667C55.385 56.875 56.0738 56.5897 56.5817 56.0817C57.0897 55.5738 57.375 54.885 57.375 54.1667V40.625C57.375 39.9067 57.0897 39.2178 56.5817 38.7099C56.0738 38.202 55.385 37.9167 54.6667 37.9167Z",
        stroke: fillColor,
        strokeWidth: "5",
        strokeLinejoin: "round"
      }
    )
  );
}
ParkSystemIcon$1.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ParkSystemIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 65,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M27.5833 13.5417L33 8.125M22.1667 43.3333L43.8333 21.6667M33 56.875L38.4167 51.4583M45.1875 51.4583C46.9832 51.4583 48.7054 50.745 49.9752 49.4752C51.245 48.2054 51.9583 46.4832 51.9583 44.6875C51.9583 42.8918 51.245 41.1696 49.9752 39.8998C48.7054 38.63 46.9832 37.9167 45.1875 37.9167C43.3918 37.9167 41.6696 38.63 40.3998 39.8998C39.13 41.1696 38.4167 42.8918 38.4167 44.6875C38.4167 46.4832 39.13 48.2054 40.3998 49.4752C41.6696 50.745 43.3918 51.4583 45.1875 51.4583ZM20.8125 27.0833C22.6082 27.0833 24.3304 26.37 25.6002 25.1002C26.87 23.8304 27.5833 22.1082 27.5833 20.3125C27.5833 18.5168 26.87 16.7946 25.6002 15.5248C24.3304 14.255 22.6082 13.5417 20.8125 13.5417C19.0168 13.5417 17.2946 14.255 16.0248 15.5248C14.755 16.7946 14.0417 18.5168 14.0417 20.3125C14.0417 22.1082 14.755 23.8304 16.0248 25.1002C17.2946 26.37 19.0168 27.0833 20.8125 27.0833ZM15.3958 56.875C17.1916 56.875 18.9138 56.1616 20.1835 54.8919C21.4533 53.6221 22.1667 51.8999 22.1667 50.1042C22.1667 48.3084 21.4533 46.5862 20.1835 45.3165C18.9138 44.0467 17.1916 43.3333 15.3958 43.3333C13.6001 43.3333 11.8779 44.0467 10.6081 45.3165C9.33835 46.5862 8.625 48.3084 8.625 50.1042C8.625 51.8999 9.33835 53.6221 10.6081 54.8919C11.8779 56.1616 13.6001 56.875 15.3958 56.875ZM50.6042 21.6667C52.3999 21.6667 54.1221 20.9533 55.3919 19.6835C56.6616 18.4138 57.375 16.6916 57.375 14.8958C57.375 13.1001 56.6616 11.3779 55.3919 10.1081C54.1221 8.83835 52.3999 8.125 50.6042 8.125C48.8084 8.125 47.0862 8.83835 45.8165 10.1081C44.5467 11.3779 43.8333 13.1001 43.8333 14.8958C43.8333 16.6916 44.5467 18.4138 45.8165 19.6835C47.0862 20.9533 48.8084 21.6667 50.6042 21.6667Z",
        stroke: fillColor,
        strokeWidth: "4.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
}
ParkSystemIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
const Plate = "/assets/images/plate.png";
function PartnersSoftSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_partners-soft-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_partners-soft-section__header" }, t("equipment.partnersSoftSection.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_partners-soft-section__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: GlobeIcon,
      title: t("equipment.partnersSoftSection.headline1"),
      link: "/equipment/webCenterBerlio"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: CanisterIcon,
      title: t("equipment.partnersSoftSection.headline2"),
      link: "/equipment/oilAndCapital"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: ParkSystemIcon$1,
      title: t("equipment.partnersSoftSection.headline3"),
      link: "/equipment/selfServiceCheckout"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: ParkSystemIcon,
      title: t("equipment.partnersSoftSection.headline4"),
      link: "/equipment/gsAutomationSystem"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: LaptopIcon,
      title: t("equipment.partnersSoftSection.headline5"),
      link: "/equipment/invoicesSite"
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_partners-soft-section__images" }, /* @__PURE__ */ React__default.createElement("img", { src: Plate, alt: t("equipment.partnersSoftSection.plate"), title: t("equipment.partnersSoftSection.plate"), className: "aam_partners-soft-section__image", loading: "lazy" })));
}
function MobileIcon({
  fillColor = "#48AE5A",
  width = 46,
  height = 73,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 46 73",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M36.5 5C37.6935 5 38.8381 5.47411 39.682 6.31802C40.5259 7.16193 41 8.30653 41 9.5V63.5C41 64.6935 40.5259 65.8381 39.682 66.682C38.8381 67.5259 37.6935 68 36.5 68H9.5C8.30653 68 7.16193 67.5259 6.31802 66.682C5.47411 65.8381 5 64.6935 5 63.5V9.5C5 8.30653 5.47411 7.16193 6.31802 6.31802C7.16193 5.47411 8.30653 5 9.5 5H36.5ZM9.5 0.5C7.11305 0.5 4.82387 1.44821 3.13604 3.13604C1.44821 4.82387 0.5 7.11305 0.5 9.5V63.5C0.5 65.8869 1.44821 68.1761 3.13604 69.864C4.82387 71.5518 7.11305 72.5 9.5 72.5H36.5C38.8869 72.5 41.1761 71.5518 42.864 69.864C44.5518 68.1761 45.5 65.8869 45.5 63.5V9.5C45.5 7.11305 44.5518 4.82387 42.864 3.13604C41.1761 1.44821 38.8869 0.5 36.5 0.5L9.5 0.5Z",
        fill: fillColor
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M23 63.5C24.1935 63.5 25.3381 63.0259 26.182 62.182C27.0259 61.3381 27.5 60.1935 27.5 59C27.5 57.8065 27.0259 56.6619 26.182 55.818C25.3381 54.9741 24.1935 54.5 23 54.5C21.8065 54.5 20.6619 54.9741 19.818 55.818C18.9741 56.6619 18.5 57.8065 18.5 59C18.5 60.1935 18.9741 61.3381 19.818 62.182C20.6619 63.0259 21.8065 63.5 23 63.5Z",
        fill: fillColor
      }
    )
  );
}
MobileIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ClientsSoftSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_clients-soft-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_clients-soft-section__header" }, t("equipment.clientsSoftSection.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_clients-soft-section__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: MobileIcon,
      title: t("equipment.clientsSoftSection.headline1"),
      link: "/equipment/berlioCardPayApp"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: ParkSystemIcon$1,
      title: t("equipment.clientsSoftSection.headline2"),
      link: "/equipment/selfServiceCheckout"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: ClientIcon,
      title: t("equipment.clientsSoftSection.headline3"),
      link: "/equipment/personalAccWebApp"
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_clients-soft-section__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("equipment.clientsSoftSection.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("equipment.clientsSoftSection.upLink")
  )));
}
function Equipment() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.equipment")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(EquipmentAndSoftMain, null), /* @__PURE__ */ React__default.createElement(PartnersSoftSection, null), /* @__PURE__ */ React__default.createElement(ClientsSoftSection, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  Equipment as default
};
