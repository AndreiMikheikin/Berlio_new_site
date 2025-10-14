import React__default, { useState, useEffect } from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import slugify from "slugify";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { n as newsDataFallback } from "./newsData.js";
import { useParams } from "react-router";
import "react-dom/server";
import "@remix-run/router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "i18next";
import "prop-types";
import "react-dom";
import "uuid";
function DetailedNewsMain() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const currentLanguage = i18n.language;
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/news");
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        const processed = Object.entries(data).map(([newsId, item]) => {
          const baseTitle = item.titles?.en || item.titles?.ru || `news-${newsId}`;
          return {
            id: newsId,
            ...item,
            slug: item.slug || slugify(baseTitle, { lower: true, strict: true })
          };
        });
        setNewsData(processed);
      } catch (err) {
        console.warn("Ошибка загрузки API, используем fallback:", err.message);
        const fallbackProcessed = Object.entries(newsDataFallback).map(([newsId, item]) => {
          const baseTitle = item.titles?.en || item.titles?.ru || `news-${newsId}`;
          return {
            id: newsId,
            ...item,
            slug: item.slug || slugify(baseTitle, { lower: true, strict: true })
          };
        });
        setNewsData(fallbackProcessed);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);
  if (loading) return /* @__PURE__ */ React__default.createElement("div", null, t("loading"));
  if (error) return /* @__PURE__ */ React__default.createElement("div", null, t("error"), ": ", error);
  if (!newsData) return /* @__PURE__ */ React__default.createElement("div", null, t("detailedNewsMain.notFound"));
  const newsItem = newsData.find((item) => item.id === id || item.slug === id);
  if (!newsItem) {
    return /* @__PURE__ */ React__default.createElement("div", { className: "aam_detailed-news__block" }, /* @__PURE__ */ React__default.createElement("h2", null, t("detailedNewsMain.notFound")), /* @__PURE__ */ React__default.createElement(Link, { to: "/news" }, t("detailedNewsMain.backToNews")));
  }
  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(currentLanguage, options);
  };
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_detailed-news" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_detailed-news__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " / ", /* @__PURE__ */ React__default.createElement(Link, { to: "/news" }, t("breadCrumbs.news")), " / ", t("breadCrumbs.detailedNews")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_detailed-news__header" }, t("detailedNewsMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_detailed-news__block" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_detailed-news__title" }, newsItem.titles[currentLanguage] || newsItem.titles.ru), /* @__PURE__ */ React__default.createElement(
    "p",
    {
      className: "aam_detailed-news__description",
      dangerouslySetInnerHTML: { __html: newsItem.descriptions[currentLanguage] || newsItem.descriptions.ru || "" }
    }
  ), /* @__PURE__ */ React__default.createElement("p", { className: "aam_detailed-news__footer" }, /* @__PURE__ */ React__default.createElement("strong", null, t("detailedNewsMain.date"), ":"), " ", formatDate(newsItem.dates.date))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_detailed-news__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/news", className: "aam_detailed-news__back-to-news" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("detailedNewsMain.backToNews")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_detailed-news__back" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("newsBlock.backHome")))));
}
function DetailedNews() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.detailedNews")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Новости" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(DetailedNewsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  DetailedNews as default
};
