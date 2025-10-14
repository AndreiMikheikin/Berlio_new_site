import React__default, { useState, useEffect } from "react";
import { B as Button } from "./entry-server.js";
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
function CreateAdminModal({ onClose, onCreated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleCreate = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Ошибка создания");
      }
      onCreated();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__content" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_modal__title" }, "Создать администратора"), error && /* @__PURE__ */ React__default.createElement("p", { className: "aam_modal__error" }, error), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "text",
      placeholder: "Имя пользователя",
      value: username,
      onChange: (e) => setUsername(e.target.value)
    }
  ), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "password",
      placeholder: "Пароль",
      value: password,
      onChange: (e) => setPassword(e.target.value)
    }
  ), /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__actions" }, /* @__PURE__ */ React__default.createElement(Button, { type: "submit", variant: "green", label: loading ? "Создание..." : "Создать", onClick: handleCreate, disabled: loading }), /* @__PURE__ */ React__default.createElement(Button, { type: "reset", variant: "green", label: "Отмена", onClick: onClose }))));
}
function EditAdminModal({ admin, onClose, onUpdated }) {
  const [username, setUsername] = useState(admin.username);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`/api/admin/admins/${admin.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ username, password: password || void 0 })
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
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__content" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_modal__title" }, "Редактировать администратора"), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "text",
      value: username,
      onChange: (e) => setUsername(e.target.value),
      placeholder: "Имя пользователя"
    }
  ), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: "aam_modal__input",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: "Новый пароль (необязательно)"
    }
  ), error && /* @__PURE__ */ React__default.createElement("p", { className: "aam_modal__error" }, error), /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__actions" }, /* @__PURE__ */ React__default.createElement(Button, { type: "submit", variant: "green", label: "Сохранить", onClick: handleUpdate, disabled: loading }), /* @__PURE__ */ React__default.createElement(Button, { type: "reset", variant: "green", label: "Отмена", onClick: onClose }))));
}
function ConfirmDeleteModal({ onConfirm, onCancel, username }) {
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__content" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_modal__title" }, "Удаление администратора"), /* @__PURE__ */ React__default.createElement("p", { className: "aam_modal__text" }, "Вы уверены, что хотите удалить ", /* @__PURE__ */ React__default.createElement("strong", null, username), "?"), /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__actions" }, /* @__PURE__ */ React__default.createElement(Button, { type: "submit", label: "Удалить", variant: "danger", onClick: onConfirm }), /* @__PURE__ */ React__default.createElement(Button, { type: "reset", label: "Отмена", variant: "green", onClick: onCancel }))));
}
function UserManager() {
  const { role } = useOutletContext();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [adminToDelete, setAdminToDelete] = useState(null);
  if (role !== "superadmin") {
    return /* @__PURE__ */ React__default.createElement("p", null, "У вас нет прав для просмотра администраторов.");
  }
  const fetchAdmins = () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    fetch("/api/admin/admins", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(async (res) => {
      if (!res.ok) throw new Error("Ошибка загрузки данных");
      const data = await res.json();
      setAdmins(data);
    }).catch((err) => console.error("Ошибка загрузки администраторов:", err)).finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchAdmins();
  }, []);
  const handleConfirmDelete = async () => {
    if (!adminToDelete) return;
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`/api/admin/admins/${adminToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Ошибка удаления");
      }
      setAdminToDelete(null);
      fetchAdmins();
    } catch (err) {
      alert(err.message);
    }
  };
  if (loading) return /* @__PURE__ */ React__default.createElement("p", null, "Загрузка администраторов...");
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_user-manager" }, /* @__PURE__ */ React__default.createElement("h2", null, "Управление администраторами"), role === "superadmin" && /* @__PURE__ */ React__default.createElement("button", { className: "aam-user-btn aam-user-btn--add", onClick: () => setShowCreateModal(true) }, "➕ Новый админ"), admins.length === 0 ? /* @__PURE__ */ React__default.createElement("p", null, "Нет администраторов с ролью ", /* @__PURE__ */ React__default.createElement("code", null, "admin"), ".") : /* @__PURE__ */ React__default.createElement("table", { className: "aam_user-manager__table" }, /* @__PURE__ */ React__default.createElement("thead", null, /* @__PURE__ */ React__default.createElement("tr", null, /* @__PURE__ */ React__default.createElement("th", null, "ID"), /* @__PURE__ */ React__default.createElement("th", null, "Имя пользователя"), /* @__PURE__ */ React__default.createElement("th", null, "Роль"), /* @__PURE__ */ React__default.createElement("th", null, "Создан"), /* @__PURE__ */ React__default.createElement("th", null, "Действия"))), /* @__PURE__ */ React__default.createElement("tbody", null, admins.map((admin) => /* @__PURE__ */ React__default.createElement("tr", { key: admin.id }, /* @__PURE__ */ React__default.createElement("td", null, admin.id), /* @__PURE__ */ React__default.createElement("td", null, admin.username), /* @__PURE__ */ React__default.createElement("td", null, admin.role), /* @__PURE__ */ React__default.createElement("td", null, new Date(admin.created_at).toLocaleString("ru-RU")), /* @__PURE__ */ React__default.createElement("td", null, /* @__PURE__ */ React__default.createElement("button", { className: "aam-user-btn aam-user-btn--edit", onClick: () => setEditAdmin(admin) }, "✏️"), /* @__PURE__ */ React__default.createElement("button", { className: "aam-user-btn aam-user-btn--delete", onClick: () => setAdminToDelete(admin) }, "🗑️")))))), showCreateModal && /* @__PURE__ */ React__default.createElement(
    CreateAdminModal,
    {
      onClose: () => setShowCreateModal(false),
      onCreated: fetchAdmins
    }
  ), editAdmin && /* @__PURE__ */ React__default.createElement(
    EditAdminModal,
    {
      admin: editAdmin,
      onClose: () => setEditAdmin(null),
      onUpdated: fetchAdmins
    }
  ), adminToDelete && /* @__PURE__ */ React__default.createElement(
    ConfirmDeleteModal,
    {
      username: adminToDelete.username,
      onConfirm: handleConfirmDelete,
      onCancel: () => setAdminToDelete(null)
    }
  ));
}
export {
  UserManager as default
};
