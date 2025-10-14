import { useState } from "react";
import { B as Button } from "./entry-server.js";
import "react-dom/server";
import "@remix-run/router";
import "react-router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-i18next";
import "stream";
import "i18next";
import "prop-types";
import "react-dom";
import "uuid";
function SQLExplorer() {
  const [sql, setSql] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const runQuery = async () => {
    if (!sql.trim()) {
      setError("Введите SQL-запрос");
      setResult(null);
      return;
    }
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Пользователь не авторизован");
      setResult(null);
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/sql-explorer/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ sql })
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.rows || `Изменено строк: ${data.affectedRows ?? 0}`);
      }
    } catch (err) {
      setError("Ошибка выполнения запроса: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "aam_sql-explorer" }, /* @__PURE__ */ React.createElement("h2", { className: "aam_sql-title" }, "SQL Explorer"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      className: "aam_sql-textarea",
      value: sql,
      onChange: (e) => setSql(e.target.value),
      placeholder: "Введите SQL-запрос"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "aam_sql-actions" }, /* @__PURE__ */ React.createElement(Button, { type: "submit", variant: "white", label: loading ? "Выполнение..." : "Выполнить", onClick: runQuery, disabled: loading })), error && /* @__PURE__ */ React.createElement("p", { className: "aam_sql-error" }, error), result && /* @__PURE__ */ React.createElement("div", { className: "aam_sql-result" }, Array.isArray(result) ? /* @__PURE__ */ React.createElement("table", { className: "aam_sql-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, Object.keys(result[0] || {}).map((col, idx) => /* @__PURE__ */ React.createElement("th", { key: idx }, col)))), /* @__PURE__ */ React.createElement("tbody", null, result.map((row, rowIndex) => /* @__PURE__ */ React.createElement("tr", { key: rowIndex }, Object.values(row).map((val, colIndex) => /* @__PURE__ */ React.createElement("td", { key: colIndex }, val === null ? "NULL" : String(val))))))) : /* @__PURE__ */ React.createElement("p", null, result)));
}
export {
  SQLExplorer as default
};
