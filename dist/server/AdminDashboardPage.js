import React__default, { useState, useEffect } from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { N as NavLink } from "./index.js";
import { useNavigate, Outlet } from "react-router";
import "react-dom/server";
import "@remix-run/router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "i18next";
import "react-dom";
import "uuid";
function AdminMenu({ items }) {
  return /* @__PURE__ */ React__default.createElement("nav", { className: "aam_admin-menu" }, /* @__PURE__ */ React__default.createElement("ul", { className: "aam_admin-menu__list" }, items.map(({ label, to }) => /* @__PURE__ */ React__default.createElement("li", { key: to, className: "aam_admin-menu__item" }, /* @__PURE__ */ React__default.createElement(
    NavLink,
    {
      to,
      end: true,
      className: ({ isActive }) => `aam_admin-menu__link${isActive ? " aam_admin-menu__link--active" : ""}`
    },
    label
  )))));
}
AdminMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired
    })
  ).isRequired
};
function AdminDashboard() {
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSecureInfo = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/administrator");
        return;
      }
      try {
        const res = await fetch("/api/admin/secure", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        if (!res.ok) {
          throw new Error("Ошибка сервера");
        }
        const data = await res.json();
        setMessage(data.message);
        setRole(data.role);
      } catch (err) {
        localStorage.removeItem("authToken");
        navigate("/administrator");
      } finally {
        setLoading(false);
      }
    };
    fetchSecureInfo();
  }, [navigate]);
  if (loading) return /* @__PURE__ */ React__default.createElement("p", { className: "aam_admin-dashboard__loading" }, "Загрузка...");
  const menuItems = [
    { label: "Панель управления", to: "/adminDashboard" },
    { label: "Администраторы", to: "/adminDashboard/users" },
    { label: "Новости", to: "/adminDashboard/news" },
    { label: "SQL Explorer", to: "/adminDashboard/sql-explorer" },
    { label: "Настройки", to: "/adminDashboard/settings" }
  ];
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_admin-dashboard" }, /* @__PURE__ */ React__default.createElement("header", { className: "aam_admin-dashboard__header" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_admin-dashboard__welcome" }, message), /* @__PURE__ */ React__default.createElement("p", { className: "aam_admin-dashboard__role" }, role), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      className: "aam_admin-dashboard__logout",
      onClick: () => {
        localStorage.removeItem("authToken");
        navigate("/administrator");
      }
    },
    "Выход"
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_admin-dashboard__wrapper" }, /* @__PURE__ */ React__default.createElement("aside", { className: "aam_admin-dashboard__wrapper-tools" }, /* @__PURE__ */ React__default.createElement(AdminMenu, { items: menuItems })), /* @__PURE__ */ React__default.createElement("main", { className: "aam_admin-dashboard__wrapper-outlet" }, /* @__PURE__ */ React__default.createElement(Outlet, { context: { role } }))));
}
function AdminDashboardPage() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_admin-dashboard-page" }, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.adminDashboard")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: t("adminDashboard.pageDescription") })), /* @__PURE__ */ React__default.createElement(AdminDashboard, null));
}
export {
  AdminDashboardPage as default
};
