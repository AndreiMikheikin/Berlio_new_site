import React__default, { useEffect, useState, useRef } from "react";
import { H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import "react-dom/server";
import "@remix-run/router";
import "react-router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "i18next";
import "react-dom";
import "uuid";
import "./index.js";
function ReaderSVG({ cardRead }) {
  const { t } = useTranslation();
  useEffect(() => {
    if (cardRead) {
      requestAnimationFrame(() => {
        const baElement = document.getElementById("ba");
        if (baElement) baElement.style.fill = "#00ff2f";
        const dfElement = document.getElementById("df");
        const dgElement = document.getElementById("dg");
        if (dfElement && dgElement) {
          dfElement.textContent = t("readerSVG.massage1");
          dgElement.textContent = t("readerSVG.massage2");
        }
      });
    }
  }, [cardRead, t]);
  const hoverMap = React__default.useMemo(() => ({
    "#ck>tspan": "#bd",
    "#cg>tspan": "#be",
    "#cu>tspan": "#bf",
    "#cy>tspan": "#bg",
    "#cw>tspan": "#bh",
    "#da>tspan": "#bi",
    "#dc>tspan": "#bj",
    "#by>tspan": "#bk",
    "#cm>tspan": "#bl",
    "#cs>tspan": "#bm",
    "#ce>tspan": "#bn",
    "#ca>tspan": "#bo",
    "#ci>tspan": "#bp",
    "#cc>tspan": "#bq",
    "#co>tspan": "#br",
    "#cq>tspan": "#bs"
  }), []);
  useEffect(() => {
    let activeElement = null;
    const applyHover = (targetElement) => {
      const element = targetElement;
      if (element !== activeElement) {
        element.style.fill = "#00ff2f";
      }
    };
    const applyNormal = (targetElement) => {
      const element = targetElement;
      if (element !== activeElement) {
        element.style.fill = "#bebebe";
      }
    };
    const handlePress = (targetElement) => {
      const element = targetElement;
      element.style.fill = "#009c1d";
    };
    const handleRelease = (targetElement) => {
      const element = targetElement;
      if (activeElement === element) {
        element.style.fill = "#bebebe";
        activeElement = null;
      } else {
        element.style.fill = "#00ff2f";
      }
    };
    Object.keys(hoverMap).forEach((tspanSelector) => {
      const tspanElement = document.querySelector(tspanSelector);
      const targetElement = document.querySelector(hoverMap[tspanSelector]);
      if (tspanElement && targetElement) {
        targetElement.style.fill = "#bebebe";
        tspanElement.addEventListener("mouseenter", () => applyHover(targetElement));
        tspanElement.addEventListener("mouseleave", () => applyNormal(targetElement));
        tspanElement.addEventListener("mousedown", () => handlePress(targetElement));
        tspanElement.addEventListener("touchstart", () => handlePress(targetElement));
        tspanElement.addEventListener("mouseup", () => handleRelease(targetElement));
        tspanElement.addEventListener("touchend", () => handleRelease(targetElement));
        targetElement.addEventListener("mouseenter", () => applyHover(targetElement));
        targetElement.addEventListener("mouseleave", () => applyNormal(targetElement));
        targetElement.addEventListener("mousedown", () => handlePress(targetElement));
        targetElement.addEventListener("touchstart", () => handlePress(targetElement));
        targetElement.addEventListener("mouseup", () => handleRelease(targetElement));
        targetElement.addEventListener("touchend", () => handleRelease(targetElement));
      }
    });
    const handleClickOutside = (event) => {
      if (!Object.values(hoverMap).includes(`#${event.target.id}`)) {
        if (activeElement) {
          activeElement.style.fill = "#bebebe";
          activeElement = null;
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [hoverMap]);
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 115 150",
      width: "460",
      height: "600",
      className: "aam_reader-SVG",
      "aria-labelledby": "reader-title",
      role: "img"
    },
    /* @__PURE__ */ React__default.createElement("defs", { id: "w" }, /* @__PURE__ */ React__default.createElement("filter", { id: "k", x: "-0.039439", y: "-0.13461", width: "1.0789", height: "1.2692", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "x", stdDeviation: "0.7426663" })), /* @__PURE__ */ React__default.createElement("filter", { id: "j", x: "-0.0092376", y: "-0.01712", width: "1.0185", height: "1.0342", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "y", stdDeviation: "0.049598525" })), /* @__PURE__ */ React__default.createElement("filter", { id: "i", x: "-0.0092376", y: "-0.017119", width: "1.0185", height: "1.0342", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "z", stdDeviation: "0.049598525" })), /* @__PURE__ */ React__default.createElement("filter", { id: "h", x: "-0.0099751", y: "-0.015056", width: "1.02", height: "1.0301", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "aa", stdDeviation: "0.043294729" })), /* @__PURE__ */ React__default.createElement("filter", { id: "g", x: "-0.0099751", y: "-0.015056", width: "1.02", height: "1.0301", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "ab", stdDeviation: "0.043294729" })), /* @__PURE__ */ React__default.createElement("filter", { id: "f", x: "-0.034834", y: "-0.016963", width: "1.0697", height: "1.0339", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "ac", stdDeviation: "0.109099" })), /* @__PURE__ */ React__default.createElement("filter", { id: "e", x: "-0.034688", y: "-0.016893", width: "1.0694", height: "1.0338", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "ad", stdDeviation: "0.109099" })), /* @__PURE__ */ React__default.createElement("filter", { id: "d", x: "-0.034973", y: "-0.014972", width: "1.0699", height: "1.0299", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "ae", stdDeviation: "0.109099" })), /* @__PURE__ */ React__default.createElement("filter", { id: "u", x: "-0.034834", y: "-0.016963", width: "1.0697", height: "1.0339", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "af", stdDeviation: "0.109099" })), /* @__PURE__ */ React__default.createElement("filter", { id: "t", x: "-0.034688", y: "-0.016893", width: "1.0694", height: "1.0338", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "ag", stdDeviation: "0.109099" })), /* @__PURE__ */ React__default.createElement("filter", { id: "r", x: "-0.034982", y: "-0.015285", width: "1.07", height: "1.0306", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "ah", stdDeviation: "0.109099" })), /* @__PURE__ */ React__default.createElement("filter", { id: "q", x: "-0.011136", y: "-0.01301", width: "1.0223", height: "1.026", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "ai", stdDeviation: "0.04939209" })), /* @__PURE__ */ React__default.createElement("filter", { id: "o", x: "-0.011136", y: "-0.01301", width: "1.0223", height: "1.026", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "aj", stdDeviation: "0.04939209" })), /* @__PURE__ */ React__default.createElement("filter", { id: "p", x: "-0.011136", y: "-0.01301", width: "1.0223", height: "1.026", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "ak", stdDeviation: "0.04939209" })), /* @__PURE__ */ React__default.createElement("filter", { id: "n", x: "-0.011136", y: "-0.01301", width: "1.0223", height: "1.026", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "al", stdDeviation: "0.04939209" })), /* @__PURE__ */ React__default.createElement("filter", { id: "m", x: "-0.013551", y: "-0.010768", width: "1.0271", height: "1.0215", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "am", stdDeviation: "0.060036286" })), /* @__PURE__ */ React__default.createElement("filter", { id: "l", x: "-0.013551", y: "-0.010768", width: "1.0271", height: "1.0215", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "an", stdDeviation: "0.060036286" })), /* @__PURE__ */ React__default.createElement(
      "radialGradient",
      {
        id: "a",
        cx: "299.52",
        cy: "252.74",
        r: "48.032",
        gradientTransform: "matrix(2.2909 -0.01041 0.014594 3.2112 -390.35 -555.76)",
        gradientUnits: "userSpaceOnUse"
      },
      /* @__PURE__ */ React__default.createElement("stop", { id: "ao", stopColor: "#48ae5a", offset: "0" }),
      /* @__PURE__ */ React__default.createElement("stop", { id: "ap", stopColor: "#48ae5a", stopOpacity: "0", offset: "1" })
    ), /* @__PURE__ */ React__default.createElement(
      "linearGradient",
      {
        id: "b",
        x1: "215.49",
        x2: "361.5",
        y1: "259.5",
        y2: "250.5",
        gradientUnits: "userSpaceOnUse"
      },
      /* @__PURE__ */ React__default.createElement("stop", { id: "aq", stopColor: "#176224", offset: "0.47415" }),
      /* @__PURE__ */ React__default.createElement("stop", { id: "ar", stopColor: "#176224", stopOpacity: "0", offset: "1" })
    ), /* @__PURE__ */ React__default.createElement(
      "filter",
      {
        id: "s",
        x: "-0.042125",
        y: "-0.031938",
        width: "1.0842",
        height: "1.0639",
        colorInterpolationFilters: "sRGB"
      },
      /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "as", stdDeviation: "1.6678447" })
    ), /* @__PURE__ */ React__default.createElement(
      "linearGradient",
      {
        id: "c",
        x1: "356",
        x2: "332.57",
        y1: "302",
        y2: "221.19",
        gradientUnits: "userSpaceOnUse"
      },
      /* @__PURE__ */ React__default.createElement("stop", { id: "at", offset: "0" }),
      /* @__PURE__ */ React__default.createElement("stop", { id: "au", stopOpacity: "0", offset: "1" })
    )),
    /* @__PURE__ */ React__default.createElement("g", { id: "g1" }, /* @__PURE__ */ React__default.createElement("g", { id: "av", transform: "translate(1.5 -181)" }, /* @__PURE__ */ React__default.createElement("g", { stroke: "#000", strokeLinecap: "round" }, /* @__PURE__ */ React__default.createElement("path", { id: "aw", transform: "matrix(.99992 0 0 1 -213.47 -3.4987)", d: "m231.56 189h76.823c2.5496 0 6.7668-0.0103 9.1103 0.96561 2.2211 0.92487 3.5062 2.4113 4.2997 4.1927 1.1212 2.5173 1.2064 7.0832 1.2064 9.8482v99.133c0 3.789-0.13292 9.9977-1.3957 13.56-2.8369 8.0023-9.2081 10.88-16.505 12.415-2.7973 0.58876-7.4174 0.88536-10.276 0.88536h-51.01c-2.6584 0-6.9853 0.0113-9.6019-0.4435-7.8674-1.3673-13.522-5.8796-16.619-14.025-1.13-2.9714-1.5923-8.1113-1.5923-11.294v-101.13c0-2.2669-0.0996-6.0255 0.73395-8.1201 0.75484-1.8969 2.0862-3.3503 3.9737-4.3759 2.6843-1.4585 7.7821-1.6086 10.853-1.6086z", fill: "url(#c)", filter: "url(#s)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "ax", transform: "matrix(.99992 0 0 1 -215.47 -4.4988)", d: "m231.56 189h76.823c2.5496 0 6.7668-0.0103 9.1103 0.96561 2.2211 0.92487 3.5062 2.4113 4.2997 4.1927 1.1212 2.5173 1.2064 7.0832 1.2064 9.8482v99.133c0 3.789-0.13292 9.9977-1.3957 13.56-2.8369 8.0023-9.2081 10.88-16.505 12.415-2.7973 0.58876-7.4174 0.88536-10.276 0.88536h-51.01c-2.6584 0-6.9853 0.0113-9.6019-0.4435-7.8674-1.3673-13.522-5.8796-16.619-14.025-1.13-2.9714-1.5923-8.1113-1.5923-11.294v-101.13c0-2.2669-0.0996-6.0255 0.73395-8.1201 0.75484-1.8969 2.0862-3.3503 3.9737-4.3759 2.6843-1.4585 7.7821-1.6086 10.853-1.6086z", fill: "url(#b)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "ay", transform: "matrix(.99992 0 0 1 -245.5 6.5007)", d: "m258.63 193h81.336c1.6752 0 4.5477 0.094 5.7676 1.2056 0.38649 0.35219 0.68732 0.76153 0.9035 1.2082 0.62829 1.2982 0.36211 3.7731 0.36211 5.2372v91.349c-10.126 12.908-23.406 17.502-37.577 19.748-5.4557 0.86444-14.429 1.0909-19.835-0.0225-14.418-2.9696-26.464-10.468-37.588-19.725v-91.206c0-1.543-0.13101-4.1984 0.74895-5.4295 0.27087-0.37894 0.60605-0.71929 0.99119-1.0297 1.1286-0.90954 3.4379-1.3347 4.8911-1.3347z", fill: "url(#a)", style: { paintOrder: "markers stroke fill" } })), /* @__PURE__ */ React__default.createElement("g", { id: "g3", transform: "matrix(1.0056 0 0 1.0227 -197.01 7.5311)" }, /* @__PURE__ */ React__default.createElement("rect", { id: "az", x: "219.95", y: "203.41", width: "57.991", height: "16.991", ry: "2.8318", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("rect", { id: "ba", transform: "matrix(.95018 0 0 .90808 13.231 2.6212)", x: "219.89", y: "222.3", width: "57.991", height: "16.991", ry: "2.8318", fill: "#c5c5c5", filter: "url(#k)", stroke: "#c5c5c5", strokeLinecap: "round", strokeWidth: "1.0094", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("rect", { id: "bb", x: "220.29", y: "203.12", width: "57.991", height: "16.991", ry: "2.8318", fill: "none", stroke: "#000", strokeLinecap: "round", strokeWidth: "1.0094", style: { paintOrder: "markers stroke fill" } })), /* @__PURE__ */ React__default.createElement("path", { id: "bc", transform: "translate(-290 -26.492)", d: "m325 274h38v25.97c0 2.2256-0.70839 5.7151-2.0176 7.5102-3.1098 4.2641-7.3354 6.0174-12.042 6.6894-2.7087 0.38675-7.1801 0.51915-9.8851 0.12133-4.8539-0.71388-8.9287-2.8994-12-6.98-1.2944-1.7197-2.0554-5.0583-2.0554-7.2134z", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("g", { fill: "#bebebe" }, /* @__PURE__ */ React__default.createElement("rect", { id: "bd", x: "54.111", y: "264.88", width: "10.645", height: "9.1118", ry: ".49592", filter: "url(#n)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "be", d: "m35.257 258.41c1.6652 4.0288 4.6392 5.012 7.5483 6.5728l-0.0319 8.9272c-3.5899-1.6184-6.0739-3.278-7.4526-6.4831z", filter: "url(#t)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "bf", transform: "translate(-246.87 -23.064)", d: "m282.16 290.9c1.7448 4.1184 4.7478 5.125 7.4849 6.6046l-0.0625 10.369c-7.2e-4 0.11997-0.0935 0.18608-0.20584 0.14404-3.6717-1.3737-6.5034-5.6625-7.0386-9.039-0.12312-0.77677-0.0915-2.0603-0.1028-2.8482z", filter: "url(#r)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "bg", d: "m72.623 247.99-12.886-0.0638c2.7857 1.918 4.2618 4.3598 5.3586 6.9534 4.7374-1.2308 6.6855-3.7957 7.5275-6.8896z", filter: "url(#i)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "bh", d: "m35.218 247.99 12.886-0.0638c-2.7857 1.918-4.2618 4.3595-5.3586 6.9531-4.7374-1.2308-6.6855-3.7954-7.5275-6.8893z", filter: "url(#j)", style: { mixBlendMode: "normal", paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "bi", d: "m48.678 247.9h5.0002v6.8981c-0.45929-0.0164-7.1904 0.012-10.417 0 0.9044-2.441 2.9812-5.3077 5.4166-6.8981z", filter: "url(#h)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "bj", transform: "matrix(-1 0 0 1 363.76 -23.334)", d: "m304.67 271.23h5.0002v6.8981c-0.45929-0.0164-7.1904 0.012-10.417 0 0.9044-2.441 2.9812-5.3077 5.4166-6.8981z", filter: "url(#g)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "bk", d: "m35.26 248.94c1.1902 4.2663 4.0629 5.2842 7.5168 6.5728l1e-5 8.8634c-3.5901-1.6184-6.0104-3.2142-7.3892-6.4193z", filter: "url(#u)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "bl", d: "m72.648 258.29c-1.6652 4.0288-4.6392 5.012-7.5483 6.5728l0.0319 8.9272c3.5899-1.6184 6.0739-3.278 7.4526-6.4831z", filter: "url(#e)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "bm", transform: "translate(-246.87 -23.329)", d: "m319.49 290.79c-1.7448 4.1184-4.7478 5.125-7.4849 6.6046l-2e-3 10.857c-1e-5 0.0211 0.0161 0.0324 0.0359 0.0252 4.3739-1.6005 7.2632-5.8102 7.3551-10.792 3.9e-4 -0.0211 8.9e-4 -0.0553 1e-3 -0.0764z", filter: "url(#d)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "bn", d: "m72.645 248.82c-1.1902 4.2663-4.0629 5.2842-7.5168 6.5728l-1e-5 8.8634c3.5901-1.6184 6.0104-3.2142 7.3892-6.4193z", filter: "url(#f)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("rect", { id: "bo", x: "43.173", y: "255.34", width: "10.645", height: "9.1118", ry: ".49592", filter: "url(#q)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("rect", { id: "bp", x: "43.201", y: "264.92", width: "10.645", height: "9.1118", ry: ".49592", filter: "url(#o)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("rect", { id: "bq", x: "54.164", y: "255.28", width: "10.645", height: "9.1118", ry: ".49592", filter: "url(#p)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "br", transform: "translate(-246.87 -23.064)", d: "m290.07 297.47c2e-3 -3e-3 5e-3 -5e-3 8e-3 -8e-3 0.12622-0.12943 0.4602-0.10613 0.64591-0.10613l9.565-2e-5c0.27549-6e-3 0.30636 0.13689 0.31576 0.2932v12.72c0.0179 0.21282-0.0136 0.38606-0.29321 0.36086l-2.839 5e-3c-0.25999 4.7e-4 -0.67912-0.0309-0.9357-0.0728-2.3794-0.38946-4.6352-0.96077-6.3676-2.186-0.10455-0.074-0.18737-0.24052-0.1874-0.36869l-3e-3 -9.9873c-5e-5 -0.18571-0.03-0.51656 0.0913-0.65054z", filter: "url(#m)", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("path", { id: "bs", transform: "matrix(-1 0 0 1 354.7 -23.093)", d: "m290.07 297.47c2e-3 -3e-3 5e-3 -5e-3 8e-3 -8e-3 0.12622-0.12943 0.4602-0.10613 0.64591-0.10613l9.565-2e-5c0.27549-6e-3 0.30636 0.13689 0.31576 0.2932v12.72c0.0179 0.21282-0.0136 0.38606-0.29321 0.36086l-2.839 5e-3c-0.25999 4.7e-4 -0.67912-0.0309-0.9357-0.0728-2.3794-0.38946-4.6352-0.96077-6.3676-2.186-0.10455-0.074-0.18737-0.24052-0.1874-0.36869l-3e-3 -9.9873c-5e-5 -0.18571-0.03-0.51656 0.0913-0.65054z", filter: "url(#l)", style: { paintOrder: "markers stroke fill" } })), /* @__PURE__ */ React__default.createElement("g", { id: "bt", transform: "translate(-350.96 -50)" }, /* @__PURE__ */ React__default.createElement("circle", { id: "bu", cx: "404.96", cy: "354.58", r: "5.5", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("ellipse", { id: "bv", cx: "405.39", cy: "354.54", rx: "4.3465", ry: "4.3715", fill: "#bebebe", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("circle", { id: "bw", cx: "403.44", cy: "354.56", r: ".5", style: { paintOrder: "markers stroke fill" } }), /* @__PURE__ */ React__default.createElement("circle", { id: "bx", cx: "407.19", cy: "354.5", r: ".5", style: { paintOrder: "markers stroke fill" } }))), /* @__PURE__ */ React__default.createElement("g", { fill: "#333333", fontFamily: "Sans", fontStyle: "italic", fontWeight: "bold", strokeLinecap: "round" }, /* @__PURE__ */ React__default.createElement("g", { fontSize: "4px" }, [...Array(10)].map((_, i) => {
      const ids = ["by", "ca", "cc", "ce", "cg", "ci", "ck", "cm", "co", "cq"];
      const xValues = [
        38.99,
        48.86,
        59.11,
        68.86,
        38.61,
        48.48,
        58.86,
        68.73,
        48.61,
        58.98
      ];
      const yValues = [
        78.22,
        80.17,
        80.17,
        77.67,
        87.17,
        90.04,
        90.04,
        87.92,
        100.92,
        100.92
      ];
      return /* @__PURE__ */ React__default.createElement(
        "text",
        {
          key: ids[i],
          id: ids[i],
          x: xValues[i],
          y: yValues[i],
          xmlSpace: "preserve",
          style: {
            fontVariantCaps: "normal",
            fontVariantEastAsian: "normal",
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
            paintOrder: "markers stroke fill"
          }
        },
        /* @__PURE__ */ React__default.createElement("tspan", { x: xValues[i], y: yValues[i] }, i)
      );
    })), /* @__PURE__ */ React__default.createElement("g", { fontSize: "1.99px" }, [
      {
        id: "cs",
        x: 68.04,
        y: 96.84,
        text: t("readerSVG.enter")
      },
      /* "Ввод" */
      {
        id: "cu",
        x: 38.04,
        y: 96.84,
        text: t("readerSVG.cancel")
      },
      /* "Сброс" */
      {
        id: "cw",
        x: 38.34,
        y: 69.84,
        text: t("readerSVG.return")
      },
      /* "Возврат" */
      {
        id: "cy",
        x: 66.84,
        y: 69.84,
        text: t("readerSVG.doze")
      },
      /* "Доза" */
      {
        id: "da",
        x: 49.11,
        y: 70.97,
        text: t("readerSVG.menu")
      },
      /* "Меню" */
      {
        id: "dc",
        x: 57.49,
        y: 70.97,
        text: t("readerSVG.lang")
      }
      /* "Язык" */
    ].map(({
      id,
      x,
      y,
      text
    }) => /* @__PURE__ */ React__default.createElement(
      "text",
      {
        key: id,
        id,
        x,
        y,
        xmlSpace: "preserve",
        style: {
          fontVariantCaps: "normal",
          fontVariantEastAsian: "normal",
          fontVariantLigatures: "normal",
          fontVariantNumeric: "normal",
          paintOrder: "markers stroke fill"
        }
      },
      /* @__PURE__ */ React__default.createElement("tspan", { x, y }, text)
    )), /* @__PURE__ */ React__default.createElement(
      "text",
      {
        id: "de",
        x: "30.686155",
        y: "40.978397",
        fill: "#000000",
        fontFamily: "'Lucida Console'",
        fontSize: "5px",
        strokeLinecap: "round",
        strokeWidth: ".2",
        style: {
          fontVariantCaps: "normal",
          fontVariantEastAsian: "normal",
          fontVariantLigatures: "normal",
          fontVariantNumeric: "normal",
          fontStyle: "normal",
          paintOrder: "markers stroke fill"
        },
        xmlSpace: "preserve"
      },
      /* @__PURE__ */ React__default.createElement("tspan", { id: "df", x: "30.686155", y: "40.978397" }),
      /* @__PURE__ */ React__default.createElement("tspan", { id: "dg", x: "30.686155", y: "47.645061" })
    ))))
  );
}
ReaderSVG.propTypes = {
  cardRead: PropTypes.bool
};
function ChipCardSVG({ onCardRead }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const startPosition = useRef({ x: 0, y: 0 });
  const timerRef = useRef(null);
  const cardRef = useRef(null);
  const targetRef = useRef(null);
  useEffect(() => {
    targetRef.current = document.getElementById("bv");
    document.documentElement.style.touchAction = "none";
    return () => {
      document.documentElement.style.touchAction = "auto";
    };
  }, []);
  const checkOverlap = (chipRect, targetRect) => !(chipRect.right < targetRect.left || chipRect.left > targetRect.right || chipRect.bottom < targetRect.top || chipRect.top > targetRect.bottom);
  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
    const chipElement = cardRef.current;
    const targetElement = targetRef.current;
    if (!chipElement || !targetElement) return;
    const chipRect = chipElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    if (checkOverlap(chipRect, targetRect)) {
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          setPosition(startPosition.current);
          timerRef.current = null;
          onCardRead();
        }, 1e3);
      }
    } else {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const handleStop = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };
  return /* @__PURE__ */ React__default.createElement(Draggable, { nodeRef: cardRef, position, onDrag: handleDrag, onStop: handleStop }, /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      ref: cardRef,
      id: "e",
      width: "129",
      height: "48",
      viewBox: "0 0 11.377 4.2333",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": "Draggable Chip Card",
      style: { cursor: "grab" }
    },
    /* @__PURE__ */ React__default.createElement("defs", { id: "f" }, /* @__PURE__ */ React__default.createElement("filter", { id: "d52", x: "-.0078181", y: "-.0258", width: "1.0156", height: "1.0516", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ React__default.createElement("feGaussianBlur", { id: "g", stdDeviation: "0.033858607" })), /* @__PURE__ */ React__default.createElement("linearGradient", { id: "a52", x1: ".23246", x2: "10.968", y1: "2.3174", y2: "2.3174", gradientTransform: "translate(.052156 -.22777)", gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ React__default.createElement("stop", { id: "i", stopColor: "#b4b4b4", offset: "0" }), /* @__PURE__ */ React__default.createElement("stop", { id: "h", stopColor: "#5e5e5e", offset: "1" })), /* @__PURE__ */ React__default.createElement("radialGradient", { id: "j52", cx: "8.4485", cy: ".71294", r: "1.4332", gradientTransform: "matrix(1.0271 0 0 .60307 -.21155 .75263)", gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ React__default.createElement("stop", { id: "l", stopColor: "#989898", offset: "0" }), /* @__PURE__ */ React__default.createElement("stop", { id: "m", stopColor: "#a2a2a2", offset: "1" }))),
    /* @__PURE__ */ React__default.createElement("path", { id: "k", transform: "matrix(1.0331 0 0 1.0487 -.32416 -.31877)", d: "m3.3259 0.78318c-0.052773 7.086e-4 -0.10373 0.019505-0.14451 0.053298l-2.2947 1.9025c-0.07404 0.061396-0.18422 0.17416-0.21462 0.26544-0.044698 0.13422-0.019633 0.26451 0.08065 0.39062 0.057778 0.072651 0.172 0.17223 0.24379 0.23102 0.1806 0.14793 0.33014 0.20973 0.47136 0.24846 0.080924 0.022205 0.21579 0.034632 0.29966 0.033879l7.955-0.071316c0.10804-9.538e-4 0.21211-0.041242 0.29303-0.11342l0.99538-0.88768c0.02968-0.026478 0.04105-0.068131 0.02899-0.10619l-0.54018-1.7041c-0.01372-0.043302-0.04047-0.11223-0.068-0.14815-0.04016-0.052355-0.09552-0.094836-0.17976-0.11871-0.2493 0.00497-6.8121 0.025549-6.926 0.024302zm-1.6012 2.0246c0.049067 7.333e-4 0.10179 0.00611 0.13925 0.01405 0.31447 0.066642 0.42987 0.1768 0.48744 0.29955 0.027836 0.059346 0.020413 0.16256-0.018281 0.21527-0.091308 0.12438-0.23719 0.19374-0.43019 0.21562-0.068704 0.00782-0.18142 0.00429-0.24858-0.012018-0.20765-0.050476-0.32551-0.17752-0.3727-0.2982-0.023378-0.059785-0.015445-0.16676 0.015054-0.22332 0.057903-0.10735 0.16802-0.18016 0.3477-0.20682 0.022719-0.00334 0.050852-0.00458 0.080292-0.00419z", fill: "#1b1b1b", filter: "url(#d52)", strokeWidth: ".96817", style: { mixBlendMode: "normal", paintOrder: "markers stroke fill" } }),
    /* @__PURE__ */ React__default.createElement("path", { id: "p", d: "m3.0477 0.48827c-0.054508 7.319e-4 -0.10714 0.020146-0.14926 0.05505l-2.3701 1.965c-0.076474 0.063414-0.19028 0.17989-0.22168 0.27417-0.046167 0.13863-0.020278 0.27321 0.083302 0.40346 0.059678 0.07504 0.17765 0.17789 0.2518 0.23862 0.18654 0.15279 0.34099 0.21662 0.48686 0.25663 0.083584 0.022935 0.22288 0.035771 0.30951 0.034993l8.2165-0.073661c0.11159-9.851e-4 0.21908-0.042598 0.30266-0.11715l1.0281-0.91686c0.03066-0.027348 0.0424-0.070371 0.02994-0.10968l-0.55794-1.7601c-0.01417-0.044726-0.0418-0.11592-0.07024-0.15302-0.04148-0.054076-0.09866-0.097954-0.18567-0.12261-0.2575 0.00513-7.0361 0.026389-7.1537 0.025101zm-1.6538 2.0912c0.05068 7.575e-4 0.10514 0.00631 0.14383 0.014512 0.32481 0.068833 0.444 0.18261 0.50347 0.3094 0.028751 0.061297 0.021084 0.1679-0.018882 0.22235-0.09431 0.12847-0.24499 0.20011-0.44433 0.22271-0.070963 0.00808-0.18738 0.00443-0.25675-0.012413-0.21448-0.052135-0.33621-0.18336-0.38495-0.308-0.024147-0.06175-0.015953-0.17224 0.015549-0.23066 0.059807-0.11088 0.17354-0.18608 0.35913-0.21362 0.023466-0.00345 0.052524-0.00473 0.082932-0.00433z", fill: "url(#a52)", style: { paintOrder: "markers stroke fill" }, strokeWidth: ".089916" }),
    /* @__PURE__ */ React__default.createElement("ellipse", { id: "o", cx: "8.4568", cy: "1.8087", rx: "1.2306", ry: ".60125", fill: "none", stroke: "#a0a0a0", strokeWidth: "1.0391", style: { paintOrder: "markers stroke fill" } }),
    /* @__PURE__ */ React__default.createElement("ellipse", { id: "b", cx: "8.4558", cy: "1.7029", rx: "1.2306", ry: ".60125", fill: "#8d8d8d", stroke: "#8d8d8d", strokeWidth: "1.0391", style: { paintOrder: "markers stroke fill" } }),
    /* @__PURE__ */ React__default.createElement("ellipse", { id: "c", cx: "8.4662", cy: "1.1826", rx: "1.3503", ry: ".60125", fill: "url(#j52)", stroke: "#8d8d8d", strokeWidth: ".50414", style: { paintOrder: "markers stroke fill" } })
  ));
}
ChipCardSVG.propTypes = {
  onCardRead: PropTypes.func
};
function CardUsageMain() {
  const [cardRead, setCardRead] = useState(false);
  const handleCardRead = () => {
    setCardRead(true);
  };
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_card-usage-main" }, /* @__PURE__ */ React__default.createElement(ReaderSVG, { cardRead }), /* @__PURE__ */ React__default.createElement(ChipCardSVG, { onCardRead: handleCardRead }), cardRead && /* @__PURE__ */ React__default.createElement("p", null, "Карта успешно прочитана!"));
}
function CardUsageRules() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.cardUsageRules")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(CardUsageMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  CardUsageRules as default
};
