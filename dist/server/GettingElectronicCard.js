import React__default, { useState, useRef, useEffect } from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { D as DepartmentAdresses, H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
import { C as CardBox } from "./CardBox.js";
import { C as ClientIcon } from "./ClientIcon.js";
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
function DepartmentEmailDropdown() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_department-dropdown", ref: dropdownRef }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_department-dropdown__toggle",
      onClick: () => setIsOpen((prev) => !prev)
    },
    t("selectDepartment")
  ), isOpen && /* @__PURE__ */ React__default.createElement("ul", { className: "aam_department-dropdown__list" }, DepartmentAdresses.map((dep) => /* @__PURE__ */ React__default.createElement("li", { key: dep.id, className: "aam_department-dropdown__item" }, /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: `mailto:${dep.email[1]}`,
      className: "aam_department-dropdown__link",
      onClick: () => setIsOpen(false)
    },
    t(dep.departmentsName),
    " — ",
    dep.email[1]
  )))));
}
function GettingElectronicCardMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_getting-card-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_getting-card-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.gettingCard")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_getting-card-main__header" }, t("gettingCardMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_getting-card-main__description" }, /* @__PURE__ */ React__default.createElement("strong", { className: "aam_getting-card-main__description--header" }, t("gettingCardMain.applicationHeader")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_getting-card-main__description--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("gettingCardMain.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("gettingCardMain.list1.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("gettingCardMain.list1.item3"), " ", /* @__PURE__ */ React__default.createElement(DepartmentEmailDropdown, null))), /* @__PURE__ */ React__default.createElement("strong", { className: "aam_getting-card-main__description--footer" }, t("gettingCardMain.applicationFooter"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_getting-card-main__documents" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_getting-card-main__documents--header" }, t("gettingCardMain.documentsHeader")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_getting-card-main__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_getting-card-main",
      Icon: ClientIcon,
      title: t("gettingCardMain.supervisor"),
      description: /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", { style: { listStyleType: "decimal", listStylePosition: "outside", lineHeight: "24.51px" } }, t("gettingCardMain.supList.item1")), /* @__PURE__ */ React__default.createElement("li", { style: { listStyleType: "decimal", listStylePosition: "outside", lineHeight: "24.51px" } }, t("gettingCardMain.supList.item2")), /* @__PURE__ */ React__default.createElement("li", { style: { listStyleType: "decimal", listStylePosition: "outside", lineHeight: "24.51px" } }, t("gettingCardMain.supList.item3")))
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_getting-card-main",
      Icon: ClientIcon,
      title: t("gettingCardMain.notSupervisor"),
      description: /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", { style: { listStyleType: "decimal", listStylePosition: "outside", lineHeight: "24.51px" } }, t("gettingCardMain.notSupList.item1")), /* @__PURE__ */ React__default.createElement("li", { style: { listStyleType: "decimal", listStylePosition: "outside", lineHeight: "24.51px" } }, t("gettingCardMain.notSupList.item2")), /* @__PURE__ */ React__default.createElement("li", { style: { listStyleType: "decimal", listStylePosition: "outside", lineHeight: "24.51px" } }, t("gettingCardMain.notSupList.item3")))
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_getting-card-main__documents--footer" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_getting-card-main__documents--footer-primary" }, /* @__PURE__ */ React__default.createElement("strong", null, t("gettingCardMain.documentsFotterPrimary"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_getting-card-main__documents--footer-secondary" }, /* @__PURE__ */ React__default.createElement("strong", null, t("gettingCardMain.documentsFotterSecondary.beforeLink"), " ", /* @__PURE__ */ React__default.createElement("a", { href: "https://lkb.by", target: "_blank", rel: "noopener noreferrer" }, t("gettingCardMain.lkbLink")), " ", t("gettingCardMain.documentsFotterSecondary.afterLink"))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_getting-card-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("gettingCardMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("gettingCardMain.upLink")
  )));
}
function GettingElectronicCard() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.gettingElectronicCard")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(GettingElectronicCardMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  GettingElectronicCard as default
};
