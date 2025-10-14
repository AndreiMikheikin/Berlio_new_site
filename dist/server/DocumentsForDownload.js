import React__default from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { U as UpArrowInCircleIcon } from "./UpArrowInCircleIcon.js";
import { P as PdfIcon } from "./PdfIcon.js";
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
function DocumentsForDownloadMain() {
  const { t } = useTranslation();
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  const docsSections = [
    {
      title: t("documentsForDownloadMain.boxesHeaders.lists"),
      docs: [
        {
          title: t("documentsForDownloadMain.lsts.cardTitle1"),
          link: `${baseUrl}/assets/documents/Список документов для заключения Договора присоединения.pdf`
        },
        {
          title: t("documentsForDownloadMain.lsts.cardTitle2"),
          link: `${baseUrl}/assets/documents/Список документов для заключения Договора пользования с ГУ  «Белавтострада» (BelToll).pdf`
        }
      ]
    },
    {
      title: t("documentsForDownloadMain.boxesHeaders.agreements"),
      docs: [
        {
          title: t("documentsForDownloadMain.agr.cardTitle1"),
          link: `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (организация).pdf`
        },
        {
          title: t("documentsForDownloadMain.agr.cardTitle2"),
          link: `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП, уполномоченное лицо - родственник).pdf`
        },
        {
          title: t("documentsForDownloadMain.agr.cardTitle3"),
          link: `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП, уполномоченное лицо - работник).pdf`
        },
        {
          title: t("documentsForDownloadMain.agr.cardTitle4"),
          link: `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП).pdf`
        }
      ]
    },
    {
      title: t("documentsForDownloadMain.boxesHeaders.regCard"),
      docs: [
        {
          title: t("documentsForDownloadMain.rCard.cardTitle1"),
          link: `${baseUrl}/assets/documents/Регистрационная карточка клиента_общая (для ознакомления).pdf`
        }
      ]
    },
    {
      title: t("documentsForDownloadMain.boxesHeaders.applications"),
      docs: [
        {
          title: t("documentsForDownloadMain.app.cardTitle1"),
          link: `${baseUrl}/assets/documents/Заявление на получение «Справки-акта о реализации» подписанной ЭЦП.pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle2"),
          link: `${baseUrl}/assets/documents/Заявление о блокировке, разблокировке лицевого счёта.pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle3"),
          link: `${baseUrl}/assets/documents/Заявление о блокировке, разблокировке средств доступа электронной платежной системы «Берлио».pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle4"),
          link: `${baseUrl}/assets/documents/Заявление о возврате ошибочно перечисленной суммы денежных средств.pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle5"),
          link: `${baseUrl}/assets/documents/Заявление о закрытии лицевого счёта.pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle6"),
          link: `${baseUrl}/assets/documents/Заявление о запросе информации о ПИН-коде.pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle7"),
          link: `${baseUrl}/assets/documents/Заявление о переносе электронной карты с одного лицевого счёта на другой лицевой счёт.pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle8"),
          link: `${baseUrl}/assets/documents/Заявление о перераспределении сумм между лицевыми счетами Клиента (перенос).pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle9"),
          link: `${baseUrl}/assets/documents/Заявление о перераспределении сумм между лицевыми счетами Клиента (распределение).pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle10"),
          link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП).pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle11"),
          link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП, уполномоченное лицо - работник).pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle12"),
          link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП, уполномоченное лицо - родственник).pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle13"),
          link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (организация).pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle14"),
          link: `${baseUrl}/assets/documents/Заявление о расторжении договора.pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle15"),
          link: `${baseUrl}/assets/documents/Заявление о регистрации транспортных средств в системе BelToll (2-3 оси).pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle16"),
          link: `${baseUrl}/assets/documents/Заявление о регистрации транспортных средств в системе BelToll (4+ оси).pdf`
        },
        {
          title: t("documentsForDownloadMain.app.cardTitle17"),
          link: `${baseUrl}/assets/documents/Заявление об открытии и обслуживании лицевого счёта.pdf`
        }
      ]
    },
    {
      title: t("documentsForDownloadMain.boxesHeaders.other"),
      docs: [
        {
          title: t("documentsForDownloadMain.oth.cardTitle1"),
          link: `${baseUrl}/assets/documents/Платежное поручение на покупку электронных денег.pdf`
        },
        {
          title: t("documentsForDownloadMain.oth.cardTitle2"),
          link: `${baseUrl}/assets/documents/Доверенность.pdf`
        }
      ]
    }
  ];
  const handlePdfClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_documents-for-download-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_documents-for-download-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.documentsForDownload")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_documents-for-download-main__header" }, t("documentsForDownloadMain.name")), docsSections.map(({ title, docs }) => /* @__PURE__ */ React__default.createElement("section", { key: title, className: "aam_documents-for-download-main__section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_documents-for-download-main__documents-title" }, title), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_documents-for-download-main__doc-list" }, docs.map(({ title: title2, link }) => /* @__PURE__ */ React__default.createElement("li", { key: title2 }, /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: link,
      onClick: (e) => {
        e.preventDefault();
        handlePdfClick(title2, link);
      },
      target: "_blank",
      rel: "noreferrer"
    },
    /* @__PURE__ */ React__default.createElement(PdfIcon, { className: "aam_documents-for-download-main__doc-icon" }),
    /* @__PURE__ */ React__default.createElement("span", null, title2)
  )))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_documents-for-download-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("documentsForDownloadMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("documentsForDownloadMain.upLink")
  )));
}
function DocumentsForDownload() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.documentsForDownload")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(DocumentsForDownloadMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  DocumentsForDownload as default
};
