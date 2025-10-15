import React__default, { useState, useEffect } from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { c as cardDataJson, D as DocumentIcon, I as InformationCard, F as FAQSection } from "./FAQSection.js";
import { C as ClientIcon$1 } from "./ClientIcon.js";
import { O as OilIcon } from "./OilIcon.js";
import PropTypes from "prop-types";
import { C as CardBox } from "./CardBox.js";
import { L as LaptopIcon } from "./LaptopIcon.js";
import { L as LogoSection, p as partnersLogos } from "./partnersLogoData.js";
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
import "./MinusIcon.js";
import "./LeftArrowIcon.js";
import "./UpArrowInCircleIcon.js";
const BG4 = "/assets/images/info-card-bg4.jpg";
const BG5 = "/assets/images/info-card-bg5.jpg";
const BG6 = "/assets/images/info-card-bg6.jpg";
const BG7 = "/assets/images/info-card-bg7.jpg";
function ClientIcon({
  fillColor = "#FFFFFFFF",
  width = 29,
  height = 35,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 29 35",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M14.4097 5.14585e-07H14.5903C17.5307 -2.48532e-05 19.8597 -4.50611e-05 21.6824 0.245016C23.5583 0.497221 25.0766 1.02861 26.274 2.22599C27.4714 3.42337 28.0028 4.94169 28.255 6.81756C28.5 8.64031 28.5 10.9693 28.5 13.9097V20.4903C28.5 23.4307 28.5 25.7597 28.255 27.5824C28.0028 29.4583 27.4714 30.9766 26.274 32.174C25.0766 33.3714 23.5583 33.9028 21.6824 34.155C19.8597 34.4 17.5307 34.4 14.5903 34.4H14.4097C11.4693 34.4 9.14031 34.4 7.31756 34.155C5.44169 33.9028 3.92337 33.3714 2.72599 32.174C1.52861 30.9766 0.997221 29.4583 0.745016 27.5824C0.499955 25.7597 0.499975 23.4307 0.500001 20.4903V13.9097C0.499975 10.9693 0.499955 8.64031 0.745016 6.81756C0.997221 4.94169 1.52861 3.42337 2.72599 2.22599C3.92337 1.02861 5.44169 0.497221 7.31756 0.245016C9.14031 -4.50611e-05 11.4693 -2.48532e-05 14.4097 5.14585e-07ZM7.63736 2.62362C6.02762 2.84004 5.10018 3.24591 4.42305 3.92305C3.74591 4.60018 3.34004 5.52762 3.12361 7.13736C2.90255 8.78162 2.9 10.9491 2.9 14V20.4C2.9 23.4509 2.90255 25.6184 3.12361 27.2626C3.34004 28.8724 3.74591 29.7998 4.42305 30.477C5.10018 31.1541 6.02762 31.56 7.63736 31.7764C9.28162 31.9974 11.4491 32 14.5 32C17.5509 32 19.7184 31.9974 21.3626 31.7764C22.9724 31.56 23.8998 31.1541 24.577 30.477C25.2541 29.7998 25.66 28.8724 25.8764 27.2626C26.0975 25.6184 26.1 23.4509 26.1 20.4V14C26.1 10.9491 26.0975 8.78162 25.8764 7.13736C25.66 5.52762 25.2541 4.60018 24.577 3.92305C23.8998 3.24591 22.9724 2.84004 21.3626 2.62362C19.7184 2.40255 17.5509 2.4 14.5 2.4C11.4491 2.4 9.28162 2.40255 7.63736 2.62362Z",
        fill: fillColor
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.5 28.4C8.5 27.7373 9.03726 27.2 9.7 27.2H19.3C19.9627 27.2 20.5 27.7373 20.5 28.4C20.5 29.0628 19.9627 29.6 19.3 29.6H9.7C9.03726 29.6 8.5 29.0628 8.5 28.4Z",
        fill: fillColor
      }
    )
  );
}
ClientIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ForClientsMain() {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const BG_IMAGES = {
      BG4,
      BG5,
      BG6,
      BG7
    };
    const ICONS = {
      ClientIcon: ClientIcon$1,
      OilIcon,
      DocumentIcon,
      SmartphoneIcon: ClientIcon
    };
    const updatedCards = Object.values(cardDataJson.forClients).map((card) => ({
      ...card,
      bgImage: BG_IMAGES[card["bg-image"]],
      IconComponent: ICONS[card.icon] || null
    }));
    setCards(updatedCards);
  }, []);
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-clients-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-clients-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), "/", t("breadCrumbs.forClients")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_for-clients-main__title" }, t("forClientsMain.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-clients-main__description" }, t("forClientsMain.description")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-clients-main__cards" }, cards.map((cardData) => /* @__PURE__ */ React__default.createElement(
    InformationCard,
    {
      key: cardData.title,
      title: t(cardData.title),
      bgImage: cardData.bgImage,
      IconComponent: cardData.IconComponent,
      links: Array.isArray(cardData.links) ? cardData.links.map((link) => ({
        href: link.href.startsWith("http") ? link.href : `${baseUrl}${link.href}`,
        label: t(link.label),
        target: link.href.startsWith("http") ? "_blank" : "_self",
        rel: link.href.startsWith("http") ? "noopener noreferrer" : void 0
      })) : [],
      customClass: `clientsCard-${cardData.title.replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`,
      loading: "lazy"
    }
  ))));
}
function ClockIcon({
  fillColor = "#48AE5A",
  width = 61,
  height = 60,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 61 60",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M30.5 4.18605C16.2433 4.18605 4.68605 15.7433 4.68605 30C4.68605 44.2567 16.2433 55.8139 30.5 55.8139C44.7567 55.8139 56.3139 44.2567 56.3139 30C56.3139 15.7433 44.7567 4.18605 30.5 4.18605ZM0.5 30C0.5 13.4315 13.9315 0 30.5 0C47.0685 0 60.5 13.4315 60.5 30C60.5 46.5685 47.0685 60 30.5 60C13.9315 60 0.5 46.5685 0.5 30ZM30.5 16.7442C31.6559 16.7442 32.593 17.6813 32.593 18.8372V29.133L38.9567 35.4968C39.7741 36.3141 39.7741 37.6394 38.9567 38.4567C38.1394 39.2741 36.8141 39.2741 35.9968 38.4567L29.02 31.48C28.6275 31.0875 28.407 30.5551 28.407 30V18.8372C28.407 17.6813 29.3441 16.7442 30.5 16.7442Z",
        fill: fillColor
      }
    )
  );
}
ClockIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function MultifunctionIcon({
  fillColor = "#48AE5A",
  width = 60,
  height = 66,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 60 66",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M22.4354 1.44622C27.3046 -0.426675 32.6954 -0.426675 37.5646 1.44622L55.4459 8.32394C57.8901 9.26372 59.5 11.6111 59.5 14.2239V14.8181C58.7218 14.2352 57.8666 13.7629 56.9588 13.4148L36.0517 5.37394C32.1563 3.87562 27.8437 3.87562 23.9483 5.37394L3.04121 13.4148C2.13338 13.7629 1.27817 14.2352 0.5 14.8181V14.2282C0.500169 12.9502 0.887683 11.7023 1.61144 10.649C2.33519 9.5957 3.3612 8.78652 4.55414 8.32815L22.4354 1.44622ZM13.3114 25.8469C13.4203 25.5922 13.5783 25.3614 13.7764 25.1678C13.9745 24.9742 14.2088 24.8216 14.466 24.7187C14.7232 24.6157 14.9981 24.5645 15.2751 24.5679C15.5521 24.5713 15.8257 24.6293 16.0802 24.7386L30 30.706L43.9198 24.7386C44.1744 24.6296 44.4479 24.5717 44.7248 24.5684C45.0018 24.5651 45.2766 24.6164 45.5337 24.7193C45.7908 24.8222 46.0252 24.9748 46.2233 25.1683C46.4214 25.3617 46.5795 25.5924 46.6886 25.8469C46.7976 26.1015 46.8554 26.3751 46.8587 26.652C46.862 26.9289 46.8107 27.2038 46.7078 27.4609C46.6049 27.718 46.4524 27.9523 46.2589 28.1504C46.0654 28.3486 45.8348 28.5067 45.5802 28.6157L32.1071 34.3893V47.7486C32.1071 48.3074 31.8851 48.8434 31.49 49.2386C31.0948 49.6337 30.5588 49.8557 30 49.8557C29.4412 49.8557 28.9052 49.6337 28.51 49.2386C28.1149 48.8434 27.8929 48.3074 27.8929 47.7486V34.3893L14.4198 28.6157C14.1651 28.5069 13.9343 28.3489 13.7407 28.1508C13.5471 27.9526 13.3945 27.7183 13.2915 27.4611C13.1886 27.204 13.1373 26.929 13.1408 26.6521C13.1442 26.3751 13.2022 26.1015 13.3114 25.8469ZM25.4612 9.30586C28.3827 8.18213 31.6173 8.18213 34.5388 9.30586L55.4459 17.3509C57.8901 18.2865 59.5 20.6339 59.5 23.2509V51.1748C59.4998 52.4528 59.1123 53.7007 58.3886 54.754C57.6648 55.8072 56.6388 56.6164 55.4459 57.0748L34.5388 65.1156C31.6173 66.2394 28.3827 66.2394 25.4612 65.1156L4.55414 57.0748C3.3612 56.6164 2.33519 55.8072 1.61144 54.754C0.887683 53.7007 0.500169 52.4528 0.5 51.1748V23.2509C0.500169 21.973 0.887683 20.725 1.61144 19.6718C2.33519 18.6185 3.3612 17.8093 4.55414 17.3509L25.4612 9.30586ZM33.0259 13.242C31.0782 12.4928 28.9218 12.4928 26.9741 13.242L6.06707 21.2829C5.66894 21.4355 5.32648 21.7054 5.08495 22.0567C4.84341 22.4081 4.71417 22.8245 4.71429 23.2509V51.1748C4.71384 51.6007 4.84247 52.0167 5.08321 52.3681C5.32395 52.7194 5.66551 52.9895 6.06286 53.1429L26.9741 61.1837C28.9218 61.9329 31.0782 61.9329 33.0259 61.1837L53.9371 53.1429C54.3345 52.9895 54.676 52.7194 54.9168 52.3681C55.1575 52.0167 55.2862 51.6007 55.2857 51.1748V23.2509C55.2862 22.825 55.1575 22.409 54.9168 22.0577C54.676 21.7063 54.3345 21.4362 53.9371 21.2829L33.0259 13.242Z",
        fill: fillColor
      }
    )
  );
}
MultifunctionIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ClientsAdvantagesSection() {
  const { t } = useTranslation();
  const CSSSelectorPrefix = "aam_clients-advantages-section";
  return /* @__PURE__ */ React__default.createElement("section", { className: `${CSSSelectorPrefix}` }, /* @__PURE__ */ React__default.createElement("h2", { className: `${CSSSelectorPrefix}__title` }, t("clientsAdvantages.name")), /* @__PURE__ */ React__default.createElement("div", { className: `${CSSSelectorPrefix}__cards-box` }, /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix,
      Icon: ClockIcon,
      title: t("clientsAdvantages.customerService"),
      description: t("clientsAdvantages.customerServiceTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix,
      Icon: LaptopIcon,
      title: t("clientsAdvantages.dealSign"),
      description: t("clientsAdvantages.dealSignTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix,
      Icon: MultifunctionIcon,
      title: t("clientsAdvantages.personalCabinet"),
      description: t("clientsAdvantages.personalCabinetTagline")
    }
  )));
}
function ForClients() {
  const { t } = useTranslation();
  process.env.NODE_ENV === "production";
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.forClients")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание услуг и программного обеспечения, предоставляемых клиентам" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Для клиентов, Услуги, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ForClientsMain, null), /* @__PURE__ */ React__default.createElement(ClientsAdvantagesSection, null), /* @__PURE__ */ React__default.createElement(FAQSection, { category: "clientsFAQ" }), /* @__PURE__ */ React__default.createElement(
    LogoSection,
    {
      title: t("ourClientsLogoSection"),
      logos: partnersLogos.logos,
      logoBasePath: "/assets/images/"
    }
  ), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  ForClients as default
};
