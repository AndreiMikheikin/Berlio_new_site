import React__default, { useState, useRef, useEffect } from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { D as DepartmentAdresses, H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { P as PdfIcon } from "./PdfIcon.js";
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
const docSign = "/assets/images/docSign.jpg";
function SignAndResignSection() {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPositions, setDropdownPositions] = useState({});
  const dropdownRefs = useRef({});
  const handlePdfClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const handleLinkClick = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };
  useEffect(() => {
    const positions = {};
    Object.keys(dropdownRefs.current).forEach((index) => {
      const el = dropdownRefs.current[index];
      if (el) positions[index] = el.getBoundingClientRect().top + window.scrollY;
    });
    setDropdownPositions(positions);
  }, []);
  const replacePlaceholders = (phone) => phone.replace("{{fax}}", t("fax")).replace("{{telFax}}", t("telFax"));
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_sign-and-resign-section" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign-section__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.signAndResign")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_sign-and-resign-section__title" }, t("signAndResignSection.nameOLD"), " "), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign-section__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("signAndResignSection.descriptionOLD.item1")), /* @__PURE__ */ React__default.createElement("ol", null, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignSection.descriptionOLD.item2")), t("signAndResignSection.descriptionOLD.item3")), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignSection.descriptionOLD.item4")), t("signAndResignSection.descriptionOLD.item5"))), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignSection.descriptionOLD.item6")), t("signAndResignSection.descriptionOLD.item7"), /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignSection.descriptionOLD.item8")), t("signAndResignSection.descriptionOLD.item9"), /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: "https://belgazprombank.by/about/bankomaty_i_ofisy/",
      target: "_blank",
      rel: "noopener noreferrer"
    },
    "https://belgazprombank.by"
  )), /* @__PURE__ */ React__default.createElement("img", { src: docSign, alt: t("signAndResignSection.descriptionOLD.item9-5"), title: t("signAndResignSection.descriptionOLD.item9-5"), className: "aam_sign-and-resign-section__image" }), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignSection.descriptionOLD.item10")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.descriptionOLD.item10-5"), " ", /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        handleLinkClick(
          "/assets/documents/Договор присоединения Клиента к обслуживанию в электронной платежной системе «Берлио».pdf"
        );
      }
    },
    t("signAndResignSection.descriptionOLD.item10-6")
  ), " ", t("signAndResignSection.descriptionOLD.item10-7"), " ", /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: "/clients/ServiceInEPS#LPADocs"
    },
    t("signAndResignSection.descriptionOLD.item10-8")
  ), " ", t("signAndResignSection.descriptionOLD.item10-9"), " , ", /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        handleLinkClick(
          "/assets/documents/Заявление о присоединении к договору присоединения (общая форма).pdf"
        );
      }
    },
    t("signAndResignSection.descriptionOLD.item10-10")
  ), " ", t("signAndResignSection.descriptionOLD.item11")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.descriptionOLD.item12")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.descriptionOLD.item13")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.descriptionOLD.item14"), " ", /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: "#docs"
    },
    t("signAndResignSection.descriptionOLD.item14-1")
  ), " ", t("signAndResignSection.descriptionOLD.item14-2")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.descriptionOLD.item15"), /* @__PURE__ */ React__default.createElement("p", { className: "aam_sign-and-resign-section__deal-fact" }, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignSection.dealFact"))), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.dealFactList.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.dealFactList.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.dealFactList.item3")))))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("strong", { id: "docs" }, t("signAndResignSection.descriptionOLD.item16")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_sign-and-resign-section__doc-list" }, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        handlePdfClick(
          t("documentsForDownloadMain.lsts.cardTitle1"),
          `${baseUrl}/assets/documents/Список документов для заключения Договора присоединения.pdf`
        );
      },
      target: "_blank",
      rel: "noreferrer"
    },
    /* @__PURE__ */ React__default.createElement(PdfIcon, { className: "aam_sign-and-resign-section__doc-icon" }),
    /* @__PURE__ */ React__default.createElement("span", null, t("documentsForDownloadMain.lsts.cardTitle1"))
  )))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignSection.descriptionOLD.item27")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: "https://belgazprombank.by/korporativnim_klientam/raschetno_kassovoe_obsluzhivani/berlio-ur/",
      target: "_blank",
      rel: "noopener noreferrer"
    },
    "https://belgazprombank.by/korporativnim_klientam/raschetno_kassovoe_obsluzhivani/berlio-ur/"
  )))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignSection.descriptionOLD.item28")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign-section__contacts" }, /* @__PURE__ */ React__default.createElement("table", { className: "aam_sign-and-resign-section__contacts-table" }, /* @__PURE__ */ React__default.createElement("thead", null, /* @__PURE__ */ React__default.createElement("tr", null, /* @__PURE__ */ React__default.createElement("th", null, t("signAndResignSection.table.thead1")), /* @__PURE__ */ React__default.createElement("th", null, t("signAndResignSection.table.thead2")), /* @__PURE__ */ React__default.createElement("th", null, t("signAndResignSection.table.thead3")))), /* @__PURE__ */ React__default.createElement("tbody", null, DepartmentAdresses.map((dep) => /* @__PURE__ */ React__default.createElement("tr", { key: dep.id }, /* @__PURE__ */ React__default.createElement("td", null, /* @__PURE__ */ React__default.createElement("strong", null, t(dep.departmentsName)), /* @__PURE__ */ React__default.createElement("br", null), t("pageTitles./"), /* @__PURE__ */ React__default.createElement("br", null), t(dep.footerAddress)), /* @__PURE__ */ React__default.createElement("td", null, dep.phoneNumber.map((phone, i) => /* @__PURE__ */ React__default.createElement("div", { key: i }, replacePlaceholders(phone)))), /* @__PURE__ */ React__default.createElement("td", null, dep.email?.[1] || "—")))))), /* @__PURE__ */ React__default.createElement("strong", { className: "aam_sign-and-resign-section__asside" }, t("signAndResignSection.descriptionOLD.item26"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign-section__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("signAndResignSection.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("signAndResignSection.upLink")
  )));
}
function SignAndResign() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.signAndResign")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Новости" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(SignAndResignSection, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  SignAndResign as default
};
