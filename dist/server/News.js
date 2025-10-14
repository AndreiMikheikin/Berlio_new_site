import React__default, { useState, useEffect, useMemo } from "react";
import { D as DropdownIcon, H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { L as Link } from "./index.js";
import slugify from "slugify";
import PropTypes from "prop-types";
import { n as newsDataFallback } from "./newsData.js";
import { useNavigate } from "react-router";
import "react-dom/server";
import "@remix-run/router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "i18next";
import "react-dom";
import "uuid";
function SortDropdown({
  options,
  selectedOption,
  onSelect,
  openFillColor = "#000",
  closedFillColor = "#777"
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [iconFillColor, setIconFillColor] = useState(closedFillColor);
  const handleSelect = (option) => {
    setIsOpen(false);
    onSelect(option);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".aam_sort-dropdown")) {
        setIsOpen(false);
        setIconFillColor(closedFillColor);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closedFillColor]);
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
    setIconFillColor(isOpen ? closedFillColor : openFillColor);
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_sort-dropdown" }, /* @__PURE__ */ React__default.createElement("span", { className: "aam_sort-dropdown__label" }, t("newsBlock.sortBy")), /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_sort-dropdown__header",
      onClick: handleDropdownClick
    },
    /* @__PURE__ */ React__default.createElement("span", { className: `aam_sort-dropdown__text ${isOpen ? "open" : ""}` }, selectedOption.label),
    /* @__PURE__ */ React__default.createElement(
      DropdownIcon,
      {
        className: `aam_sort-dropdown__icon ${isOpen ? "open" : ""}`,
        fillColor: iconFillColor,
        width: "17",
        height: "9"
      }
    )
  ), isOpen && /* @__PURE__ */ React__default.createElement("ul", { className: "aam_sort-dropdown__list" }, options.filter((option) => option.value !== selectedOption.value).map((option) => /* @__PURE__ */ React__default.createElement("li", { key: option.value, className: "aam_sort-dropdown__item" }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      onClick: () => handleSelect(option),
      className: "aam_sort-dropdown__item-button"
    },
    option.label
  ))))));
}
SortDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedOption: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  openFillColor: PropTypes.string,
  closedFillColor: PropTypes.string
};
const isValidDate = (startDate, expireDate, currentDate) => {
  const start = startDate ? new Date(startDate) : null;
  const expire = expireDate ? new Date(expireDate) : null;
  return start === null && (expire === null || currentDate <= expire) || expire === null && start !== null && currentDate >= start || start !== null && expire !== null && currentDate >= start && currentDate <= expire;
};
function NewsBlock() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;
  const sortOptions = useMemo(() => [
    { value: "new", label: t("newsBlock.newFirst") },
    { value: "old", label: t("newsBlock.oldFirst") }
  ], [t]);
  const selectedOption = useMemo(() => {
    return sortOptions.find((option) => option.value === sortOrder) || sortOptions[0];
  }, [sortOrder, sortOptions.map((opt) => opt.label).join(",")]);
  const currentDate = useMemo(() => /* @__PURE__ */ new Date(), []);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/admin/news");
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        const processed = Object.entries(data).map(([id, item]) => {
          const baseTitle = item.titles?.en || item.titles?.ru || `news-${id}`;
          return {
            id,
            ...item,
            slug: item.slug || slugify(baseTitle, { lower: true, strict: true })
          };
        });
        setNewsData(processed);
      } catch (error) {
        console.warn("Ошибка загрузки API, используем fallback:", error.message);
        const fallbackProcessed = Object.entries(newsDataFallback).map(([id, item]) => {
          const baseTitle = item.titles?.en || item.titles?.ru || `news-${id}`;
          return {
            id,
            ...item,
            slug: item.slug || slugify(baseTitle, { lower: true, strict: true })
          };
        });
        setNewsData(fallbackProcessed);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);
  const filteredAndSortedNews = useMemo(() => {
    const filtered = newsData.filter(
      (newsItem) => isValidDate(newsItem.dates.startDate, newsItem.dates.expireDate, currentDate)
    );
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.dates.date);
      const dateB = new Date(b.dates.date);
      return sortOrder === "new" ? dateB - dateA : dateA - dateB;
    });
    return sorted;
  }, [newsData, sortOrder, currentDate]);
  const totalPages = Math.ceil(filteredAndSortedNews.length / newsPerPage);
  const paginatedNews = useMemo(
    () => filteredAndSortedNews.slice(
      (currentPage - 1) * newsPerPage,
      currentPage * newsPerPage
    ),
    [filteredAndSortedNews, currentPage]
  );
  const handleSortSelect = (option) => {
    setSortOrder(option.value);
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i += 1) {
      if (i === 1 || i === totalPages || i >= currentPage - 1 && i <= currentPage + 1) {
        pages.push(
          /* @__PURE__ */ React__default.createElement(
            "button",
            {
              key: i,
              type: "button",
              className: `aam_news-block__pagination-button ${currentPage === i ? "active" : ""}`,
              onClick: () => handlePageChange(i)
            },
            i
          )
        );
      } else if ((i === currentPage - 2 || i === currentPage + 2) && !pages.find((el) => el.key === `dots-${i}`)) {
        pages.push(
          /* @__PURE__ */ React__default.createElement("span", { key: `dots-${i}`, className: "aam_news-block__pagination-dots" }, "...")
        );
      }
    }
    return pages;
  };
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(currentLanguage, options);
  };
  if (loading) {
    return /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-block__loading" }, "Загрузка...");
  }
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_news-block" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-block__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " / ", t("breadCrumbs.news")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_news-block__title" }, t("newsBlock.name")), /* @__PURE__ */ React__default.createElement(
    SortDropdown,
    {
      options: sortOptions,
      selectedOption,
      onSelect: handleSortSelect,
      openFillColor: "#48AE5A",
      closedFillColor: "#000"
    }
  ), /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-block__list" }, paginatedNews.map((newsItem) => /* @__PURE__ */ React__default.createElement(
    "div",
    {
      key: newsItem.id,
      className: "aam_news-block__item",
      role: "button",
      tabIndex: 0,
      onClick: () => navigate(`/news/${newsItem.slug}`),
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/news/${newsItem.slug}`);
        }
      }
    },
    /* @__PURE__ */ React__default.createElement("p", { className: "aam_news-block__item-date" }, formatDate(newsItem.dates.date)),
    /* @__PURE__ */ React__default.createElement("h3", { className: "aam_news-block__item-title" }, newsItem.titles[currentLanguage] || newsItem.titles.ru)
  ))), totalPages > 1 && /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-block__pagination" }, renderPagination()), /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-block__back" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("newsBlock.backHome"))));
}
function News() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.news")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание новостей компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Новости" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(NewsBlock, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  News as default
};
