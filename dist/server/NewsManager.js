import React__default, { useRef, useEffect, useState } from "react";
import { B as Button } from "./entry-server.js";
import slugify from "slugify";
/* empty css             */
import { useOutletContext } from "react-router";
import "react-dom/server";
import "@remix-run/router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-i18next";
import "stream";
import "i18next";
import "prop-types";
import "react-dom";
import "uuid";
function RichTextEditor({ value, onChange, placeholder = "" }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  useEffect(() => {
    let quillInstance;
    if (!editorRef.current) return;
    import("quill").then(({ default: Quill }) => {
      quillInstance = new Quill(editorRef.current, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: [
            [{ header: [2, 3, 4, false] }],
            ["bold", "italic", "underline", "link"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: ["#48AE5A", "#F24942", "#000000", "#FFFFFF", false] }],
            [{ background: ["#48AE5A", "#F24942", "#000000", "#FFFFFF", false] }],
            [{ align: [] }],
            ["clean"]
          ]
        }
      });
      if (value) {
        quillInstance.clipboard.dangerouslyPasteHTML(value);
      }
      quillInstance.on("text-change", () => {
        const html = quillInstance.root.innerHTML;
        onChange(html);
      });
      quillRef.current = quillInstance;
    });
    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
        quillRef.current = null;
        quillInstance = null;
      }
    };
  }, []);
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value || "");
    }
  }, [value]);
  return /* @__PURE__ */ React.createElement("div", { className: "custom-quill-editor", ref: editorRef });
}
function CreateNewsModal({ onClose, onCreated }) {
  const [slug, setSlug] = useState("");
  const [priority, setPriority] = useState("B");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [titles, setTitles] = useState({ ru: "", en: "" });
  const [descriptions, setDescriptions] = useState({ ru: "", en: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!slug.trim()) {
      const firstTitle = titles.ru || titles.en;
      if (firstTitle.trim()) {
        setSlug(slugify(firstTitle, { lower: true, strict: true }));
      }
    }
  }, [titles.ru, titles.en]);
  const handleCreate = async () => {
    setLoading(true);
    setError("");
    const payload = {
      slug,
      priority,
      dates: { date, startDate, expireDate },
      titles,
      descriptions
    };
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Ошибка создания новости");
      }
      onCreated();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleTitleChange = (lang, value) => {
    setTitles((prev) => ({ ...prev, [lang]: value }));
  };
  const handleDescriptionChange = (lang, value) => {
    setDescriptions((prev) => ({ ...prev, [lang]: value }));
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__content" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_modal__title" }, "Создать новость"), error && /* @__PURE__ */ React__default.createElement("p", { className: "aam_modal__error" }, error), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "text",
      placeholder: "Автоматически сгенерируется из заголовка",
      value: slug,
      onChange: (e) => setSlug(e.target.value)
    }
  ), /* @__PURE__ */ React__default.createElement(
    "select",
    {
      className: "aam_modal__input",
      value: priority,
      onChange: (e) => setPriority(e.target.value)
    },
    /* @__PURE__ */ React__default.createElement("option", { value: "A" }, "Приоритет A"),
    /* @__PURE__ */ React__default.createElement("option", { value: "B" }, "Приоритет B")
  ), /* @__PURE__ */ React__default.createElement("label", { htmlFor: "publishDate" }, "Дата публикации", /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "date",
      id: "publishDate",
      value: date,
      onChange: (e) => setDate(e.target.value)
    }
  )), /* @__PURE__ */ React__default.createElement("label", { htmlFor: "startDate" }, "Начало отображения", /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "date",
      id: "startDate",
      value: startDate,
      onChange: (e) => setStartDate(e.target.value)
    }
  )), /* @__PURE__ */ React__default.createElement("label", { htmlFor: "expireDate" }, "Конец отображения", /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "date",
      id: "expireDate",
      value: expireDate,
      onChange: (e) => setExpireDate(e.target.value)
    }
  )), /* @__PURE__ */ React__default.createElement("hr", { className: "aam_modal__divider" }), ["ru", "en"].map((lang) => /* @__PURE__ */ React__default.createElement("div", { key: lang }, /* @__PURE__ */ React__default.createElement("h4", null, "Язык: ", lang.toUpperCase()), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "text",
      placeholder: `Заголовок (${lang})`,
      value: titles[lang],
      onChange: (e) => handleTitleChange(lang, e.target.value)
    }
  ), /* @__PURE__ */ React__default.createElement(
    RichTextEditor,
    {
      value: descriptions[lang],
      onChange: (value) => handleDescriptionChange(lang, value),
      placeholder: `Описание (${lang})`
    }
  ))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__actions" }, /* @__PURE__ */ React__default.createElement(Button, { type: "submit", variant: "green", label: loading ? "Создание..." : "Создать", onClick: handleCreate, disabled: loading }), /* @__PURE__ */ React__default.createElement(Button, { type: "reset", variant: "green", label: "Отмена", onClick: onClose }))));
}
function EditNewsModal({ news, onClose, onUpdated }) {
  const [slug, setSlug] = useState(news.slug);
  const [priority, setPriority] = useState(news.priority);
  const [date, setDate] = useState(news.dates?.date || "");
  const [startDate, setStartDate] = useState(news.dates?.startDate || "");
  const [expireDate, setExpireDate] = useState(news.dates?.expireDate || "");
  const [titles, setTitles] = useState(news.titles || { ru: "", en: "" });
  const [descriptions, setDescriptions] = useState(news.descriptions || { ru: "", en: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    const payload = {
      slug,
      priority,
      dates: { date, startDate, expireDate },
      titles,
      descriptions
    };
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`/api/admin/news/${news.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Ошибка обновления");
      }
      onUpdated();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleTitleChange = (lang, value) => {
    setTitles((prev) => ({ ...prev, [lang]: value }));
  };
  const handleDescriptionChange = (lang, value) => {
    setDescriptions((prev) => ({ ...prev, [lang]: value }));
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__content" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_modal__title" }, "Редактировать новость"), error && /* @__PURE__ */ React__default.createElement("p", { className: "aam_modal__error" }, error), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "text",
      placeholder: "Slug",
      value: slug,
      onChange: (e) => setSlug(e.target.value)
    }
  ), /* @__PURE__ */ React__default.createElement(
    "select",
    {
      className: "aam_modal__input",
      value: priority,
      onChange: (e) => setPriority(e.target.value)
    },
    /* @__PURE__ */ React__default.createElement("option", { value: "A" }, "Приоритет A"),
    /* @__PURE__ */ React__default.createElement("option", { value: "B" }, "Приоритет B")
  ), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "date",
      placeholder: "Дата публикации",
      value: date,
      onChange: (e) => setDate(e.target.value)
    }
  ), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "date",
      placeholder: "Начало отображения",
      value: startDate,
      onChange: (e) => setStartDate(e.target.value)
    }
  ), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "date",
      placeholder: "Конец отображения",
      value: expireDate,
      onChange: (e) => setExpireDate(e.target.value)
    }
  ), /* @__PURE__ */ React__default.createElement("hr", { className: "aam_modal__divider" }), ["ru", "en"].map((lang) => /* @__PURE__ */ React__default.createElement("div", { key: lang }, /* @__PURE__ */ React__default.createElement("h4", null, "Язык: ", lang.toUpperCase()), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "text",
      placeholder: `Заголовок (${lang})`,
      value: titles[lang],
      onChange: (e) => handleTitleChange(lang, e.target.value)
    }
  ), /* @__PURE__ */ React__default.createElement(
    RichTextEditor,
    {
      value: descriptions[lang],
      onChange: (value) => handleDescriptionChange(lang, value),
      placeholder: `Описание (${lang})`
    }
  ))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__actions" }, /* @__PURE__ */ React__default.createElement(Button, { type: "submit", variant: "green", label: loading ? "Сохранение..." : "Сохранить", onClick: handleUpdate, disabled: loading }), /* @__PURE__ */ React__default.createElement(Button, { type: "reset", variant: "green", label: "Отмена", onClick: onClose }))));
}
function ConfirmDeleteNewsModal({ onConfirm, onCancel, title }) {
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__content" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_modal__title" }, "Удаление новости"), /* @__PURE__ */ React__default.createElement("p", { className: "aam_modal__text" }, "Вы уверены, что хотите удалить новость ", /* @__PURE__ */ React__default.createElement("strong", null, title), "?"), /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__actions" }, /* @__PURE__ */ React__default.createElement(Button, { type: "submit", label: "Удалить", variant: "danger", onClick: onConfirm }), /* @__PURE__ */ React__default.createElement(Button, { type: "reset", label: "Отмена", variant: "green", onClick: onCancel }))));
}
function NewsManager() {
  const { role } = useOutletContext();
  if (role !== "admin" && role !== "superadmin") {
    return /* @__PURE__ */ React__default.createElement("p", null, "У вас нет прав для управления новостями.");
  }
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editNews, setEditNews] = useState(null);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const fetchNews = () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    fetch("/api/admin/news", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(async (res) => {
      if (!res.ok) throw new Error("Ошибка загрузки новостей");
      const data = await res.json();
      setNews(data);
    }).catch((err) => console.error("Ошибка загрузки новостей:", err)).finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchNews();
  }, []);
  const handleConfirmDelete = async () => {
    if (!newsToDelete) return;
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`/api/admin/news/${newsToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Ошибка удаления новости");
      }
      setNewsToDelete(null);
      fetchNews();
    } catch (err) {
      alert(err.message);
    }
  };
  if (loading) return /* @__PURE__ */ React__default.createElement("p", null, "Загрузка новостей...");
  const newsArray = Object.entries(news);
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-manager" }, /* @__PURE__ */ React__default.createElement("h2", null, "Управление новостями"), /* @__PURE__ */ React__default.createElement("button", { className: "aam-news-btn aam-news-btn--add", onClick: () => setShowCreateModal(true) }, "➕ Новая новость"), newsArray.length === 0 ? /* @__PURE__ */ React__default.createElement("p", null, "Новостей пока нет.") : /* @__PURE__ */ React__default.createElement("table", { className: "aam_news-manager__table" }, /* @__PURE__ */ React__default.createElement("thead", null, /* @__PURE__ */ React__default.createElement("tr", null, /* @__PURE__ */ React__default.createElement("th", null, "ID"), /* @__PURE__ */ React__default.createElement("th", null, "Slug"), /* @__PURE__ */ React__default.createElement("th", null, "Priority"), /* @__PURE__ */ React__default.createElement("th", null, "Дата"), /* @__PURE__ */ React__default.createElement("th", null, "Заголовок (RU)"), /* @__PURE__ */ React__default.createElement("th", null, "Действия"))), /* @__PURE__ */ React__default.createElement("tbody", null, newsArray.map(([id, item]) => /* @__PURE__ */ React__default.createElement("tr", { key: id }, /* @__PURE__ */ React__default.createElement("td", null, id), /* @__PURE__ */ React__default.createElement("td", null, item.slug), /* @__PURE__ */ React__default.createElement("td", null, item.priority), /* @__PURE__ */ React__default.createElement("td", null, item.dates.date ? new Date(item.dates.date).toLocaleDateString("ru-RU") : "-"), /* @__PURE__ */ React__default.createElement("td", null, item.titles.ru || "-"), /* @__PURE__ */ React__default.createElement("td", null, /* @__PURE__ */ React__default.createElement("button", { className: "aam-news-btn aam-news-btn--edit", onClick: () => setEditNews({ id, ...item }) }, "✏️"), /* @__PURE__ */ React__default.createElement("button", { className: "aam-news-btn aam-news-btn--delete", onClick: () => setNewsToDelete(id) }, "🗑️")))))), showCreateModal && /* @__PURE__ */ React__default.createElement(CreateNewsModal, { onClose: () => setShowCreateModal(false), onCreated: fetchNews }), editNews && /* @__PURE__ */ React__default.createElement(EditNewsModal, { news: editNews, onClose: () => setEditNews(null), onUpdated: fetchNews }), newsToDelete && /* @__PURE__ */ React__default.createElement(
    ConfirmDeleteNewsModal,
    {
      username: news[newsToDelete]?.titles.ru || `Новость #${newsToDelete}`,
      onConfirm: handleConfirmDelete,
      onCancel: () => setNewsToDelete(null)
    }
  ));
}
export {
  NewsManager as default
};
