import React__default, { useContext } from "react";
import { S as SelectedItemContext, H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { L as LinkTo, D as DepartmentAdresses, H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { S as ServiceCard } from "./ServiceCard.js";
import { O as OilIcon } from "./OilIcon.js";
import { P as PaymentCardIcon } from "./PaymentCardIcon.js";
import { M as MapIcon } from "./MapIcon.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
import PropTypes from "prop-types";
import { P as PdfIcon } from "./PdfIcon.js";
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
function ForBankInformationMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_for-bank-info-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/partners" }, t("breadCrumbs.forPartners")), " ", "/", " ", t("breadCrumbs.forBankInfo")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_for-bank-info-main__header" }, t("forBankInfoMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-main__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      CSSSelectorPrefix: "aam_for-bank-info-main",
      Icon: OilIcon,
      title: t("forBankInfoMain.system"),
      description: t("forBankInfoMain.systemTagline"),
      link: "/partners/cardUsageRules"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      CSSSelectorPrefix: "aam_for-bank-info-main",
      Icon: PaymentCardIcon,
      title: t("forBankInfoMain.usage"),
      description: t("forBankInfoMain.usageTagline"),
      link: "/partners/plasticCardUsageRules"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      CSSSelectorPrefix: "aam_for-bank-info-main",
      Icon: MapIcon,
      title: t("forBankInfoMain.nonResident"),
      description: t("forBankInfoMain.nonResidentTagline"),
      link: "/partners/forNotAResidentsServices"
    }
  )), /* @__PURE__ */ React__default.createElement("footer", { className: "aam_for-bank-info-main__footer" }, /* @__PURE__ */ React__default.createElement(LinkTo, { href: "/about", text: t("forBankInfoMain.readMore") })));
}
function ForBankInformationContactSection() {
  const { t } = useTranslation();
  const { selectedItem } = useContext(SelectedItemContext);
  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = selectedItem || defaultItem;
  if (!displayedItem) {
    return null;
  }
  const {
    departmentsName,
    footerShortAddress,
    phoneNumber,
    email,
    departmentsImage
  } = displayedItem;
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_for-bank-info-contact-section" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__address" }, /* @__PURE__ */ React__default.createElement("h4", { className: "aam_for-bank-info-contact-section__contact-name" }, t(departmentsName)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__contact-address" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__section" }, /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("forBankInfoContact.address"), ":"), " ", t(footerShortAddress))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__section" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-bank-info-contact-section__phone" }, /* @__PURE__ */ React__default.createElement("strong", null, t("forBankInfoContact.phone"), ":"), " ", phoneNumber[0])), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__section" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-bank-info-contact-section__email" }, /* @__PURE__ */ React__default.createElement("strong", null, t("forBankInfoContact.forOrganizations"), ":"), " ", email[0]), /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-bank-info-contact-section__email" }, /* @__PURE__ */ React__default.createElement("strong", null, t("forBankInfoContact.forClientInquiries"), ":"), " ", email[1]))), /* @__PURE__ */ React__default.createElement(LinkTo, { href: "/contacts", text: t("forBankInfoContact.readMore") })), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__image" }, /* @__PURE__ */ React__default.createElement("img", { src: `${departmentsImage}`, alt: departmentsName, title: departmentsName })));
}
function MoneyWithdrawIcon({
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
    /* @__PURE__ */ React__default.createElement("rect", { width: "66", height: "66", fill: "#F5F5F5" }),
    /* @__PURE__ */ React__default.createElement("path", { d: "m-526-1833c0-1.1 0.895-2 2-2h6058c1.1 0 2 0.9 2 2v3681c0 1.1-0.9 2-2 2h-6058c-1.105 0-2-0.9-2-2v-3681z", fill: "#fff" }),
    /* @__PURE__ */ React__default.createElement("path", { d: "m-524-1834h6058v-2h-6058v2zm6059 1v3681h2v-3681h-2zm-1 3682h-6058v2h6058v-2zm-6059-1v-3681h-2v3681h2zm1 1c-0.552 0-1-0.45-1-1h-2c0 1.66 1.343 3 3 3v-2zm6059-1c0 0.55-0.45 1-1 1v2c1.66 0 3-1.34 3-3h-2zm-1-3682c0.55 0 1 0.45 1 1h2c0-1.66-1.34-3-3-3v2zm-6058-2c-1.657 0-3 1.34-3 3h2c0-0.55 0.448-1 1-1v-2z", fill: "#000", fillOpacity: ".1" }),
    /* @__PURE__ */ React__default.createElement("rect", { transform: "translate(-211 -209)", width: "1280", height: "666", fill: "#fff" }),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "m34 34c-1.6812 0-3.3246 0.4985-4.7224 1.4325s-2.4873 2.2615-3.1306 3.8147-0.8117 3.2623-0.4837 4.9111 1.1375 3.1634 2.3263 4.3521c1.1887 1.1888 2.7033 1.9983 4.3521 2.3263s3.3579 0.1597 4.9111-0.4837c1.5532-0.6433 2.8807-1.7328 3.8147-3.1306s1.4325-3.0412 1.4325-4.7224c0-2.2543-0.8956-4.4163-2.4896-6.0104-1.5941-1.594-3.7561-2.4896-6.0104-2.4896zm0 11.333c-0.5604 0-1.1082-0.1662-1.5741-0.4775-0.466-0.3114-0.8291-0.7539-1.0436-1.2716-0.2144-0.5177-0.2705-1.0874-0.1612-1.637s0.3792-1.0545 0.7754-1.4507c0.3963-0.3963 0.9011-0.6661 1.4507-0.7755 0.5496-0.1093 1.1193-0.0532 1.6371 0.1613 0.5177 0.2144 0.9602 0.5776 1.2715 1.0435 0.3113 0.466 0.4775 1.0137 0.4775 1.5741 0 0.7515-0.2985 1.4721-0.8299 2.0035-0.5313 0.5313-1.252 0.8299-2.0034 0.8299zm-2.0117-17.822c0.2695 0.2579 0.5872 0.4601 0.935 0.595 0.3392 0.1499 0.7059 0.2273 1.0767 0.2273s0.7375-0.0774 1.0766-0.2273c0.3478-0.1349 0.6656-0.3371 0.935-0.595l6.4884-6.375c0.5485-0.5486 0.8567-1.2926 0.8567-2.0683 0-0.7758-0.3082-1.5198-0.8567-2.0684-0.5486-0.5485-1.2926-0.8567-2.0684-0.8567-0.7757 0-1.5197 0.3082-2.0683 0.8567l-1.53 1.6717v-10.172c0-0.75145-0.2985-1.4721-0.8299-2.0035-0.5313-0.53136-1.252-0.82987-2.0034-0.82987-0.7515 0-1.4721 0.29851-2.0035 0.82987-0.5313 0.53135-0.8299 1.252-0.8299 2.0035v10.172l-1.53-1.6717c-0.5485-0.5485-1.2925-0.8567-2.0683-0.8567s-1.5198 0.3082-2.0683 0.8567c-0.5486 0.5486-0.8568 1.2926-0.8568 2.0684 0 0.7757 0.3082 1.5197 0.8568 2.0683l6.4883 6.375zm21.845 14.988c0-0.5604-0.1662-1.1081-0.4775-1.5741-0.3113-0.4659-0.7538-0.8291-1.2715-1.0435-0.5178-0.2145-1.0875-0.2706-1.6371-0.1613-0.5496 0.1094-1.0544 0.3792-1.4507 0.7755-0.3962 0.3962-0.6661 0.9011-0.7754 1.4507s-0.0532 1.1193 0.1612 1.637c0.2145 0.5177 0.5776 0.9602 1.0436 1.2716 0.4659 0.3113 1.0137 0.4775 1.5741 0.4775 0.7514 0 1.4721-0.2986 2.0035-0.8299 0.5313-0.5314 0.8298-1.252 0.8298-2.0035zm2.8333-19.833h-8.5c-0.7514 0-1.4721 0.2985-2.0034 0.8299-0.5314 0.5313-0.8299 1.252-0.8299 2.0034 0 0.7515 0.2985 1.4721 0.8299 2.0035 0.5313 0.5313 1.252 0.8299 2.0034 0.8299h8.5c0.7515 0 1.4722 0.2985 2.0035 0.8298 0.5314 0.5314 0.8299 1.252 0.8299 2.0035v22.667c0 0.7514-0.2985 1.4721-0.8299 2.0034-0.5313 0.5314-1.252 0.8299-2.0035 0.8299h-45.333c-0.7514 0-1.4721-0.2985-2.0035-0.8299-0.53135-0.5313-0.82986-1.252-0.82986-2.0034v-22.667c0-0.7515 0.29851-1.4721 0.82986-2.0035 0.53135-0.5313 1.2521-0.8298 2.0035-0.8298h8.5c0.7515 0 1.4721-0.2986 2.0035-0.8299 0.5313-0.5314 0.8298-1.252 0.8298-2.0035 0-0.7514-0.2985-1.4721-0.8298-2.0034-0.5314-0.5314-1.252-0.8299-2.0035-0.8299h-8.5c-2.2543 0-4.4163 0.8955-6.0104 2.4896-1.5941 1.594-2.4896 3.7561-2.4896 6.0104v22.667c0 2.2543 0.89553 4.4163 2.4896 6.0104 1.5941 1.594 3.7561 2.4896 6.0104 2.4896h45.333c2.2544 0 4.4164-0.8956 6.0105-2.4896 1.594-1.5941 2.4896-3.7561 2.4896-6.0104v-22.667c0-2.2543-0.8956-4.4164-2.4896-6.0104-1.5941-1.5941-3.7561-2.4896-6.0105-2.4896zm-42.5 19.833c0 0.5604 0.1662 1.1082 0.4775 1.5741 0.3114 0.466 0.7539 0.8291 1.2716 1.0436 0.5177 0.2144 1.0874 0.2705 1.637 0.1612s1.0545-0.3792 1.4507-0.7754c0.3963-0.3963 0.6661-0.9011 0.7755-1.4507 0.1093-0.5496 0.0532-1.1193-0.1613-1.637-0.2144-0.5178-0.5776-0.9603-1.0435-1.2716s-1.0137-0.4775-1.5741-0.4775c-0.7515 0-1.4721 0.2985-2.0035 0.8299-0.5313 0.5313-0.8299 1.252-0.8299 2.0034z",
        fill: fillColor
      }
    )
  );
}
MoneyWithdrawIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ForBankInformationDocumentsSection() {
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
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_for-bank-info-doc-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_for-bank-info-doc-section__header" }, t("forBankInfoDoc.name")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-bank-info-doc-section__description" }, t("forBankInfoDoc.description")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-doc-section__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: MoneyWithdrawIcon,
      title: t("forBankInfoDoc.headline"),
      description: "",
      link: "/clients/eMoneyRegulations"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_for-bank-info-doc-section__service-card",
      Icon: PdfIcon,
      title: t("forBankInfoDoc.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handleLinkClick(
        t("forBankInfoDoc.cardTitle1"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_for-bank-info-doc-section__service-card",
      Icon: PdfIcon,
      title: t("forBankInfoDoc.cardTitle2"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handleLinkClick(
        t("forBankInfoDoc.cardTitle2"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-doc-section__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("forBankInfoDoc.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("forBankInfoDoc.upLink")
  )));
}
function ForBankInfo() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.forBankInfo")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Новости" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ForBankInformationMain, null), /* @__PURE__ */ React__default.createElement(ForBankInformationContactSection, null), /* @__PURE__ */ React__default.createElement(ForBankInformationDocumentsSection, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  ForBankInfo as default
};
