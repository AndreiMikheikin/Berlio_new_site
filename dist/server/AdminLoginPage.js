import React__default, { useState } from "react";
import { B as Button, H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
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
function AdminLogin({ onLogin }) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const { message } = await res.json();
        setError(message || t("adminLogin.error"));
        setLoading(false);
        return;
      }
      const { token } = await res.json();
      onLogin(token);
    } catch (e2) {
      setError(t("adminLogin.errorNetwork"));
      setLoading(false);
    }
  }
  return /* @__PURE__ */ React__default.createElement("form", { onSubmit: handleSubmit, noValidate: true, className: "aam_admin-login-page__form" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_admin-login-page__input" }, /* @__PURE__ */ React__default.createElement("label", { htmlFor: "username" }, t("adminLogin.username")), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      id: "username",
      type: "text",
      value: username,
      onChange: (e) => setUsername(e.target.value),
      disabled: loading,
      autoComplete: "username",
      required: true
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_admin-login-page__input" }, /* @__PURE__ */ React__default.createElement("label", { htmlFor: "password" }, t("adminLogin.password")), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      id: "password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      disabled: loading,
      autoComplete: "current-password",
      required: true
    }
  )), /* @__PURE__ */ React__default.createElement(
    Button,
    {
      type: "submit",
      disabled: loading,
      variant: "white",
      label: loading ? t("adminLogin.loading") : t("adminLogin.submit")
    },
    loading ? t("adminLogin.loading") : t("adminLogin.submit")
  ), error && /* @__PURE__ */ React__default.createElement("p", { role: "alert", style: { color: "red" } }, error));
}
AdminLogin.propTypes = {
  onLogin: PropTypes.func.isRequired
};
function AdminLoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    navigate("/adminDashboard");
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_admin-login-page" }, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.adminLogin")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: t("adminLogin.pageDescription") })), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_admin-login-page__title" }, t("adminLogin.pageTitle")), /* @__PURE__ */ React__default.createElement(AdminLogin, { onLogin: handleLogin }));
}
export {
  AdminLoginPage as default
};
