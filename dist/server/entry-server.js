import * as React$1 from "react";
import React__default, { Component, createContext, useState, useEffect, useMemo, useContext, useCallback, useRef } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { stripBasename, UNSAFE_warning, UNSAFE_invariant, matchPath, joinPaths, Action } from "@remix-run/router";
import { UNSAFE_NavigationContext, useHref, useNavigate, useLocation, useResolvedPath, createPath, UNSAFE_DataRouterStateContext, UNSAFE_DataRouterContext, UNSAFE_useRouteId, UNSAFE_RouteContext, parsePath, Router, useParams, Outlet, useOutletContext, Routes, Route } from "react-router";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { useTranslation, initReactI18next, I18nextProvider } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import slugify from "slugify";
import Draggable from "react-draggable";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CSSTransition } from "react-transition-group";
import i18n from "i18next";
/**
 * React Router DOM v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
let _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
const supportedFormEncTypes = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    process.env.NODE_ENV !== "production" ? UNSAFE_warning(false, '"' + encType + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + defaultEncType + '"')) : void 0;
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0");
        formData.append(prefix + "y", "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}
const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "unstable_viewTransition"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "unstable_viewTransition", "children"], _excluded3 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "unstable_viewTransition"];
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
}
const ViewTransitionContext = /* @__PURE__ */ React$1.createContext({
  isTransitioning: false
});
if (process.env.NODE_ENV !== "production") {
  ViewTransitionContext.displayName = "ViewTransition";
}
const FetchersContext = /* @__PURE__ */ React$1.createContext(/* @__PURE__ */ new Map());
if (process.env.NODE_ENV !== "production") {
  FetchersContext.displayName = "Fetchers";
}
if (process.env.NODE_ENV !== "production") ;
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const Link = /* @__PURE__ */ React$1.forwardRef(function LinkWithRef(_ref7, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace,
    state,
    target,
    to,
    preventScrollReset,
    unstable_viewTransition
  } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename
  } = React$1.useContext(UNSAFE_NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX$1.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        process.env.NODE_ENV !== "production" ? UNSAFE_warning(false, '<Link to="' + to + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.') : void 0;
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative,
    unstable_viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ React$1.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
});
if (process.env.NODE_ENV !== "production") {
  Link.displayName = "Link";
}
const NavLink = /* @__PURE__ */ React$1.forwardRef(function NavLinkWithRef(_ref8, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    unstable_viewTransition,
    children
  } = _ref8, rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
  let path = useResolvedPath(to, {
    relative: rest.relative
  });
  let location = useLocation();
  let routerState = React$1.useContext(UNSAFE_DataRouterStateContext);
  let {
    navigator,
    basename
  } = React$1.useContext(UNSAFE_NavigationContext);
  let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useViewTransitionState(path) && unstable_viewTransition === true;
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename) {
    nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
  }
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /* @__PURE__ */ React$1.createElement(Link, _extends({}, rest, {
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to,
    unstable_viewTransition
  }), typeof children === "function" ? children(renderProps) : children);
});
if (process.env.NODE_ENV !== "production") {
  NavLink.displayName = "NavLink";
}
const Form = /* @__PURE__ */ React$1.forwardRef((_ref9, forwardedRef) => {
  let {
    fetcherKey,
    navigate,
    reloadDocument,
    replace,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    unstable_viewTransition
  } = _ref9, props = _objectWithoutPropertiesLoose(_ref9, _excluded3);
  let submit = useSubmit();
  let formAction = useFormAction(action, {
    relative
  });
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let submitHandler = (event) => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      fetcherKey,
      method: submitMethod,
      navigate,
      replace,
      state,
      relative,
      preventScrollReset,
      unstable_viewTransition
    });
  };
  return /* @__PURE__ */ React$1.createElement("form", _extends({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});
if (process.env.NODE_ENV !== "production") {
  Form.displayName = "Form";
}
if (process.env.NODE_ENV !== "production") ;
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = React$1.useContext(UNSAFE_DataRouterContext);
  !ctx ? process.env.NODE_ENV !== "production" ? UNSAFE_invariant(false, getDataRouterConsoleError(hookName)) : UNSAFE_invariant(false) : void 0;
  return ctx;
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    unstable_viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return React$1.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative,
        unstable_viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, unstable_viewTransition]);
}
function validateClientSideSubmission() {
  if (typeof document === "undefined") {
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
  }
}
let fetcherId = 0;
let getUniqueFetcherId = () => "__" + String(++fetcherId) + "__";
function useSubmit() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseSubmit);
  let {
    basename
  } = React$1.useContext(UNSAFE_NavigationContext);
  let currentRouteId = UNSAFE_useRouteId();
  return React$1.useCallback(function(target, options) {
    if (options === void 0) {
      options = {};
    }
    validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        unstable_flushSync: options.unstable_flushSync
      });
    } else {
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        unstable_flushSync: options.unstable_flushSync,
        unstable_viewTransition: options.unstable_viewTransition
      });
    }
  }, [router, basename, currentRouteId]);
}
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = React$1.useContext(UNSAFE_NavigationContext);
  let routeContext = React$1.useContext(UNSAFE_RouteContext);
  !routeContext ? process.env.NODE_ENV !== "production" ? UNSAFE_invariant(false, "useFormAction must be used inside a RouteContext") : UNSAFE_invariant(false) : void 0;
  let [match] = routeContext.matches.slice(-1);
  let path = _extends({}, useResolvedPath(action ? action : ".", {
    relative
  }));
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    if (params.has("index") && params.get("index") === "") {
      params.delete("index");
      path.search = params.toString() ? "?" + params.toString() : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, opts) {
  if (opts === void 0) {
    opts = {};
  }
  let vtContext = React$1.useContext(ViewTransitionContext);
  !(vtContext != null) ? process.env.NODE_ENV !== "production" ? UNSAFE_invariant(false, "`unstable_useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : UNSAFE_invariant(false) : void 0;
  let {
    basename
  } = useDataRouterContext(DataRouterHook.useViewTransitionState);
  let path = useResolvedPath(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
function StaticRouter({
  basename,
  children,
  location: locationProp = "/",
  future
}) {
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let action = Action.Pop;
  let location = {
    pathname: locationProp.pathname || "/",
    search: locationProp.search || "",
    hash: locationProp.hash || "",
    state: locationProp.state || null,
    key: locationProp.key || "default"
  };
  let staticNavigator = getStatelessNavigator();
  return /* @__PURE__ */ React$1.createElement(Router, {
    basename,
    children,
    location,
    navigationType: action,
    navigator: staticNavigator,
    future,
    static: true
  });
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
    },
    replace(to) {
      throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
    },
    go(delta) {
      throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
    },
    back() {
      throw new Error(`You cannot use navigator.back() on the server because it is a stateless environment.`);
    },
    forward() {
      throw new Error(`You cannot use navigator.forward() on the server because it is a stateless environment.`);
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : createPath(to);
}
function encodeLocation(to) {
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  instances = [];
  canUseDOM = isDocument;
  context;
  value = {
    setHelmet: (serverState) => {
      this.context.helmet = serverState;
    },
    helmetInstances: {
      get: () => this.canUseDOM ? instances : this.instances,
      add: (instance) => {
        (this.canUseDOM ? instances : this.instances).push(instance);
      },
      remove: (instance) => {
        const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
        (this.canUseDOM ? instances : this.instances).splice(index, 1);
      }
    }
  };
  constructor(context, canUseDOM) {
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React__default.createContext(defaultValue);
var HelmetProvider = class _HelmetProvider extends Component {
  static canUseDOM = isDocument;
  helmetData;
  constructor(props) {
    super(props);
    this.helmetData = new HelmetData(this.props.context || {}, _HelmetProvider.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
};
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => tag.parentNode?.removeChild(tag));
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  rendered = false;
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = class extends Component {
  static defaultProps = {
    defer: true,
    encodeSpecialCharacters: true,
    prioritizeSeoTags: false
  };
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
};
const SelectedItemContext = createContext({
  selectedItem: "defaultItem",
  setSelectedItem: () => {
  }
});
function SelectedItemProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    const savedItem = sessionStorage.getItem("selectedItem");
    if (savedItem) {
      setSelectedItem(JSON.parse(savedItem));
    }
  }, []);
  useEffect(() => {
    if (selectedItem !== null) {
      sessionStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    }
  }, [selectedItem]);
  const value = useMemo(() => ({ selectedItem, setSelectedItem }), [selectedItem]);
  return /* @__PURE__ */ React__default.createElement(SelectedItemContext.Provider, { value }, children);
}
SelectedItemProvider.propTypes = {
  children: PropTypes.node.isRequired
};
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}
function Logo({ width = 272, height = 66, className = "" }) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 272 66",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement("g", { id: "Berlio Logo", clipPath: "url(#clip0_246_7727)" }, /* @__PURE__ */ React__default.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M7.87137 17.723L33.9799 17.6805C38.34 17.6805 41.495 18.4958 43.4451 20.1264C45.39 21.7578 46.0892 23.8021 45.5152 26.2055C45.0409 28.2357 43.8053 29.9774 41.8085 31.4308C41.165 31.8914 40.47 32.2867 39.7353 32.6099C39.5183 32.7008 39.3348 32.8486 39.2073 33.035C39.0798 33.2213 39.014 33.4381 39.0179 33.6587C39.0217 33.8793 39.0952 34.094 39.2292 34.2764C39.3632 34.4588 39.5519 34.6009 39.772 34.6853C40.9745 35.1312 42.0347 35.8532 42.8527 36.7833C44.0496 38.2234 44.3895 40.0349 43.8725 42.2178C43.4488 44.0227 42.4983 45.6854 41.1246 47.0246C39.653 48.4853 37.86 49.6366 35.8668 50.4006C34.5875 50.9237 32.7342 51.2969 30.319 51.5316C27.0887 51.854 24.9728 52.0264 23.9438 52.0264L1.38622 52.0604C1.20048 52.0628 1.01658 52.026 0.848512 51.9528C0.680446 51.8795 0.532644 51.7717 0.41635 51.6376C0.300057 51.5034 0.218338 51.3465 0.177411 51.1787C0.136484 51.0109 0.137429 50.8366 0.180172 50.6692L7.87137 17.723ZM18.8021 31.1735H24.872C27.052 31.1735 28.6336 30.8907 29.6198 30.3083C30.0968 30.037 30.5077 29.6771 30.8267 29.2512C31.1457 28.8254 31.3659 28.3429 31.4732 27.8342C31.7052 26.8332 31.4732 26.0557 30.7343 25.4902C29.9954 24.9247 28.597 24.656 26.478 24.6617H21.3119C21.0307 24.6607 20.7577 24.7497 20.5391 24.9135C20.3205 25.0773 20.1696 25.306 20.1119 25.5608L18.8021 31.1791V31.1735ZM15.6542 44.6551L22.7652 44.641C25.1712 44.641 26.9421 44.3073 28.081 43.6598C28.6074 43.3839 29.0651 43.0084 29.4244 42.5577C29.7837 42.1071 30.0365 41.5915 30.1664 41.0444C30.2984 40.6024 30.2843 40.1339 30.1259 39.6994C29.9676 39.265 29.6721 38.8845 29.2779 38.607C28.4474 37.9906 26.8017 37.6796 24.356 37.6853H18.2678C17.9865 37.6843 17.7136 37.7732 17.495 37.937C17.2763 38.1009 17.1255 38.3295 17.0678 38.5844L15.6542 44.6438V44.6551ZM57.8718 17.641L92.7432 17.5872C92.9277 17.5852 93.1102 17.6219 93.2772 17.6945C93.4441 17.7671 93.5911 17.8738 93.7072 18.0066C93.8232 18.1394 93.9053 18.2948 93.9472 18.4611C93.9892 18.6275 93.9899 18.8004 93.9493 18.9671L92.7676 24.034C92.71 24.2889 92.5591 24.5175 92.3405 24.6814C92.1219 24.8452 91.8489 24.9341 91.5677 24.9331L70.1368 24.9671C69.8556 24.9661 69.5826 25.055 69.364 25.2188C69.1454 25.3827 68.9945 25.6113 68.9368 25.8662L68.1949 29.0415C68.1544 29.2079 68.155 29.3807 68.1968 29.5468C68.2385 29.7129 68.3203 29.8682 68.436 30.0009C68.5517 30.1336 68.6983 30.2404 68.8649 30.3132C69.0315 30.386 69.2137 30.423 69.3979 30.4214L88.0625 30.3874C88.247 30.3854 88.4295 30.422 88.5965 30.4947C88.7635 30.5673 88.9105 30.674 89.0265 30.8068C89.1426 30.9396 89.2246 31.0949 89.2666 31.2613C89.3085 31.4276 89.3092 31.6006 89.2686 31.7673L88.1664 36.4751C88.1081 36.7295 87.957 36.9575 87.7384 37.1207C87.5198 37.284 87.2472 37.3725 86.9664 37.3714L67.227 37.4025C66.9458 37.4015 66.6728 37.4905 66.4542 37.6543C66.2356 37.8181 66.0847 38.0468 66.0271 38.3017L64.9798 42.7918C64.9393 42.9582 64.9399 43.1309 64.9817 43.297C65.0234 43.4632 65.1052 43.6184 65.2209 43.7511C65.3366 43.8838 65.4833 43.9906 65.6498 44.0634C65.8164 44.1362 65.9986 44.1732 66.1828 44.1716L87.2198 44.1405C87.4044 44.1388 87.5869 44.1758 87.7537 44.2488C87.9206 44.3217 88.0674 44.4288 88.1832 44.5618C88.2989 44.6949 88.3806 44.8505 88.4221 45.017C88.4637 45.1835 88.4639 45.3566 88.4228 45.5231L87.1435 51.0142C87.0859 51.2691 86.935 51.4978 86.7164 51.6616C86.4978 51.8254 86.2248 51.9143 85.9436 51.9133L50.379 51.9727C50.1949 51.9743 50.0127 51.9374 49.8461 51.8646C49.6795 51.7917 49.5329 51.685 49.4172 51.5523C49.3015 51.4195 49.2197 51.2643 49.1779 51.0982C49.1362 50.932 49.1355 50.7593 49.1761 50.5929L56.6718 18.5373C56.7301 18.2829 56.8812 18.0549 57.0998 17.8916C57.3184 17.7284 57.591 17.6399 57.8718 17.641Z", fill: "#F24942", stroke: "#000D04", strokeWidth: "0.283064", strokeMiterlimit: "10" }), /* @__PURE__ */ React__default.createElement("path", { id: "Vector_2", d: "M190.878 56.8331C191.107 56.7879 216.303 56.6663 215.943 56.8473C175.817 76.1932 128.158 61.7304 120.681 38.5475C120.599 38.2895 120.429 38.0634 120.194 37.9045C119.96 37.7455 119.676 37.6624 119.386 37.6682L116.488 37.6993H116.061C115.747 37.696 115.441 37.7941 115.197 37.9767C114.952 38.1594 114.784 38.4152 114.721 38.7002L111.38 52.9198C111.316 53.2015 111.149 53.4543 110.908 53.6363C110.667 53.8183 110.366 53.9187 110.055 53.9208L95.369 53.9519C95.1618 53.9521 94.9573 53.909 94.7706 53.8258C94.584 53.7426 94.4199 53.6215 94.2908 53.4715C94.1617 53.3215 94.0708 53.1465 94.0249 52.9594C93.9789 52.7723 93.9792 52.5781 94.0256 52.3911L103.668 12.8341C103.738 12.5482 103.912 12.2931 104.16 12.1111C104.408 11.929 104.716 11.831 105.033 11.8331L119.966 11.9095C120.174 11.9134 120.379 11.9605 120.565 12.0474C120.751 12.1342 120.913 12.2586 121.041 12.4114C121.168 12.5641 121.256 12.7413 121.3 12.93C121.343 13.1186 121.34 13.3139 121.291 13.5014L117.285 28.0263C117.237 28.214 117.235 28.4093 117.278 28.5979C117.322 28.7866 117.411 28.9637 117.538 29.1164C117.666 29.2691 117.829 29.3934 118.015 29.4802C118.201 29.5671 118.405 29.6142 118.614 29.6182C121.429 29.6182 124.638 29.4344 125.914 28.7983C126.055 28.7325 126.203 28.6822 126.357 28.6484C131.334 27.3421 134.039 25.0094 134.689 22.3374C135.755 17.9858 131.694 11.2676 121.053 9.00843C119.301 8.62954 116.534 8.06969 110.556 8.02445C108.379 8.00749 106.547 8.00749 104.959 8.03859C101.979 8.08383 99.8329 8.20541 97.7536 8.38637C86.0474 9.44952 79.5164 11.1008 70.7901 14.0131C70.7263 14.0292 70.6608 14.0387 70.5947 14.0414L56.2199 14.0895C55.9608 14.089 55.7097 14.0058 55.509 13.8539C55.3084 13.7019 55.1704 13.4906 55.1184 13.2555C55.0664 13.0203 55.1036 12.7758 55.2236 12.5631C55.3436 12.3503 55.5391 12.1824 55.7772 12.0876C71.6084 5.72002 91.3356 1.34302 111.31 1.34302C139.864 1.34302 181.535 23.4486 138.209 34.9255C137.934 34.9983 137.691 35.1484 137.512 35.355C137.333 35.5617 137.228 35.8147 137.211 36.0791C136.145 53.7879 165.191 63.4156 190.485 56.9858C190.547 56.9506 190.612 56.9203 190.68 56.8953L190.878 56.8331Z", fill: "#48AE5A" }), /* @__PURE__ */ React__default.createElement("path", { id: "Vector_3", d: "M105.033 11.8331C104.717 11.8323 104.411 11.9309 104.164 12.1128C103.917 12.2948 103.744 12.5491 103.674 12.8341L94.0408 52.3911C93.9944 52.5781 93.9942 52.7723 94.0401 52.9594C94.086 53.1465 94.1769 53.3215 94.3061 53.4715C94.4352 53.6216 94.5992 53.7427 94.7859 53.8258C94.9726 53.909 95.1771 53.9521 95.3843 53.9519L110.071 53.9208C110.381 53.9187 110.682 53.8184 110.923 53.6363C111.164 53.4543 111.331 53.2015 111.396 52.9199L114.736 38.7002C114.799 38.4152 114.967 38.1594 115.212 37.9767C115.456 37.7941 115.762 37.696 116.076 37.6993H116.504L119.401 37.6682C119.692 37.6624 119.976 37.7455 120.21 37.9045C120.444 38.0635 120.615 38.2895 120.696 38.5476C128.161 61.7332 175.82 76.1932 215.958 56.8473C216.318 56.6663 191.123 56.7879 190.894 56.8331L190.695 56.8925C190.627 56.9175 190.562 56.9478 190.5 56.983C165.207 63.4128 136.152 53.7851 137.226 36.0763C137.243 35.8119 137.348 35.5589 137.527 35.3522C137.706 35.1456 137.95 34.9955 138.225 34.9227C181.545 23.4458 139.864 1.34021 111.31 1.34021C91.3356 1.34021 71.6176 5.70873 55.7772 12.0848C55.5391 12.1796 55.3436 12.3475 55.2236 12.5602C55.1036 12.773 55.0664 13.0175 55.1184 13.2527C55.1704 13.4878 55.3084 13.6991 55.509 13.8511C55.7097 14.003 55.9608 14.0862 56.2199 14.0867L70.5947 14.0386C70.6608 14.0359 70.7263 14.0264 70.7901 14.0103C79.5164 11.098 86.0565 9.44671 97.7536 8.38357C99.842 8.19978 101.979 8.07254 104.959 8.0273C106.547 7.99619 108.379 7.9962 110.556 8.01316C116.534 8.0584 119.301 8.61825 121.053 8.99714C131.694 11.2592 135.755 17.9745 134.689 22.3261C134.036 25.0094 131.33 27.3421 126.357 28.6484C126.203 28.6822 126.055 28.7325 125.914 28.7983C124.638 29.4345 121.429 29.6183 118.614 29.6183C118.405 29.6142 118.201 29.5671 118.015 29.4802C117.829 29.3934 117.666 29.2691 117.538 29.1164C117.411 28.9637 117.322 28.7866 117.278 28.598C117.235 28.4093 117.237 28.214 117.285 28.0264L121.297 13.5014C121.346 13.3139 121.349 13.1186 121.306 12.93C121.262 12.7414 121.174 12.5641 121.047 12.4114C120.92 12.2586 120.757 12.1342 120.571 12.0474C120.385 11.9605 120.18 11.9134 119.972 11.9095L105.033 11.8331Z", stroke: "#000D04", strokeWidth: "0.283064", strokeMiterlimit: "10" }), /* @__PURE__ */ React__default.createElement("path", { id: "Vector_4", fillRule: "evenodd", clipRule: "evenodd", d: "M163.204 17.6918L175.591 17.672C175.779 17.671 175.965 17.7094 176.135 17.7843C176.304 17.8593 176.454 17.9689 176.571 18.105C176.689 18.241 176.772 18.3999 176.813 18.5698C176.855 18.7397 176.855 18.9161 176.812 19.0858L171.316 42.1131C171.274 42.2828 171.273 42.4593 171.315 42.6291C171.357 42.799 171.44 42.9579 171.557 43.0939C171.675 43.23 171.824 43.3396 171.994 43.4146C172.164 43.4896 172.349 43.528 172.538 43.5269L191.217 43.5014C191.406 43.4998 191.592 43.5379 191.762 43.6127C191.932 43.6875 192.082 43.7971 192.199 43.9333C192.317 44.0695 192.4 44.2286 192.441 44.3987C192.483 44.5688 192.482 44.7454 192.439 44.9152L190.973 51.0424C190.913 51.3002 190.759 51.5309 190.536 51.6957C190.314 51.8605 190.037 51.9493 189.752 51.9472L156.581 52.001C156.393 52.0026 156.207 51.9646 156.037 51.8897C155.866 51.8149 155.717 51.7053 155.599 51.5691C155.482 51.4329 155.399 51.2738 155.357 51.1037C155.316 50.9336 155.317 50.757 155.36 50.5872L163.204 17.6918ZM205.827 17.624L218.257 17.6013C218.445 17.6003 218.631 17.6387 218.801 17.7136C218.971 17.7886 219.12 17.8982 219.238 18.0343C219.355 18.1703 219.438 18.3292 219.48 18.4991C219.521 18.669 219.521 18.8454 219.479 19.0151L211.87 50.9746C211.809 51.2322 211.654 51.4626 211.432 51.6277C211.21 51.7928 210.933 51.8826 210.649 51.8822L199.22 51.8992C199.032 51.9003 198.846 51.8619 198.676 51.7869C198.506 51.7119 198.357 51.6023 198.24 51.4662C198.122 51.3302 198.039 51.1713 197.998 51.0014C197.956 50.8316 197.956 50.6551 197.999 50.4854L205.827 17.624ZM223.982 34.7559C225.313 29.1593 228.403 24.7983 233.252 21.673C238.101 18.5476 244.189 16.9783 251.517 16.9652C259.036 16.9538 264.46 18.475 267.791 21.5288C271.121 24.5825 272.138 28.87 270.844 34.3912C269.889 38.3912 268.218 41.6767 265.83 44.2479C263.339 46.8838 260.211 48.9377 256.701 50.2423C253.016 51.6843 248.653 52.3968 243.648 52.4081C238.56 52.4081 234.488 51.7974 231.435 50.5759C228.507 49.4501 226.121 47.3783 224.718 44.7456C223.279 42.0877 223.037 38.755 223.991 34.7474L223.982 34.7559ZM237.926 34.7757C237.096 38.2404 237.348 40.7276 238.684 42.2375C240.019 43.7474 242.145 44.4958 245.062 44.4826C248.056 44.4826 250.556 43.7408 252.561 42.2573C254.566 40.7738 256.017 38.1131 256.915 34.2752C257.678 31.0575 257.394 28.6937 256.026 27.2064C254.658 25.7192 252.506 24.9868 249.581 24.9897C246.925 24.9383 244.333 25.7474 242.253 27.2771C240.197 28.7814 238.755 31.2818 237.926 34.7785V34.7757Z", fill: "#F24942", stroke: "#000D04", strokeWidth: "0.283064", strokeMiterlimit: "10" }), /* @__PURE__ */ React__default.createElement("path", { id: "Vector_5", d: "M215.341 12.7408C220.849 12.7408 225.313 9.92031 225.313 6.44107C225.313 2.96184 220.849 0.141357 215.341 0.141357C209.834 0.141357 205.369 2.96184 205.369 6.44107C205.369 9.92031 209.834 12.7408 215.341 12.7408Z", fill: "#48AE5A", stroke: "#000D04", strokeWidth: "0.283064", strokeMiterlimit: "10" })),
    /* @__PURE__ */ React__default.createElement("defs", null, /* @__PURE__ */ React__default.createElement("clipPath", { id: "clip0_246_7727" }, /* @__PURE__ */ React__default.createElement("rect", { width: "271.543", height: "66", fill: "white" })))
  );
}
Logo.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function DropdownIcon({
  fillColor = "black",
  width = 17,
  height = 9,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 17 9",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement("g", { id: "Dropdown" }, /* @__PURE__ */ React__default.createElement(
      "path",
      {
        id: "Vector (Stroke)",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.868707 1.16183C1.16224 0.831602 1.6679 0.801857 1.99812 1.09539L8.66663 7.02295L15.3351 1.09539C15.6654 0.801857 16.171 0.831602 16.4645 1.16183C16.7581 1.49205 16.7283 1.99771 16.3981 2.29125L9.19812 8.69124C8.89501 8.96067 8.43824 8.96067 8.13514 8.69124L0.935143 2.29125C0.604917 1.99771 0.575173 1.49205 0.868707 1.16183Z",
        fill: fillColor
      }
    ))
  );
}
DropdownIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function LinkArrowIcon({
  fillColor = "#48AE5A",
  width = 14,
  height = 15,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 14 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.502069 1.22414C0.502069 0.824208 0.826277 0.5 1.22621 0.5H13.2759C13.6758 0.5 14 0.824208 14 1.22414V13.2738C14 13.6737 13.6758 13.9979 13.2759 13.9979C12.8759 13.9979 12.5517 13.6737 12.5517 13.2738V2.97236L1.23618 14.2879C0.953387 14.5707 0.494889 14.5707 0.212095 14.2879C-0.0706984 14.0051 -0.0706984 13.5466 0.212095 13.2638L11.5276 1.94828H1.22621C0.826277 1.94828 0.502069 1.62407 0.502069 1.22414Z",
        fill: fillColor
      }
    )
  );
}
LinkArrowIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function LinkTo({
  href,
  text,
  variant = "default",
  className = "",
  iconColor = "#48AE5A"
}) {
  const isExternal = href.startsWith("http");
  return isExternal ? /* @__PURE__ */ React__default.createElement("a", { href, className: `aam_link-to aam_link-to--${variant} ${className}`, target: "_blank", rel: "noopener noreferrer" }, /* @__PURE__ */ React__default.createElement("span", { className: "aam_link-to__text" }, text), /* @__PURE__ */ React__default.createElement(LinkArrowIcon, { fillColor: iconColor, className: "aam_link-to__icon" })) : /* @__PURE__ */ React__default.createElement(Link, { to: href, className: `aam_link-to aam_link-to--${variant} ${className}` }, /* @__PURE__ */ React__default.createElement("span", { className: "aam_link-to__text" }, text), /* @__PURE__ */ React__default.createElement(LinkArrowIcon, { fillColor: iconColor, className: "aam_link-to__icon" }));
}
LinkTo.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "highlighted"]),
  className: PropTypes.string,
  iconColor: PropTypes.string
};
const DepartmentAdresses = [
  {
    id: 1,
    departmentsName: "minskName",
    address: "minskAddress",
    footerAddress: "minskFooterAddress",
    footerShortAddress: "minskShortAddress",
    inCity: "inMinskCity",
    phoneNumber: [
      "+375 29 623 08 88",
      "+375 29 773 08 88",
      "+375 17 369 12 75 {{fax}}"
    ],
    email: [
      "berlio@berlio.by",
      "info_minsk@berlio.by",
      "cto_minsk@berlio.by"
    ],
    workingHours: [
      "workingHours",
      "fridayWorkingHours",
      "daysOff"
    ],
    departmentsImage: "/assets/images/minskOffice.png",
    coordinates: [
      53.876159,
      27.547862
    ]
  },
  {
    id: 2,
    departmentsName: "brestName",
    address: "brestAddress",
    footerAddress: "brestFooterAddress",
    footerShortAddress: "brestShortAddress",
    inCity: "inBrestCity",
    phoneNumber: [
      "+375 29 720 07 87",
      "+375 162 52 12 15 {{telFax}}"
    ],
    email: [
      "brest@berlio.by",
      "info_brest@berlio.by",
      "cto_brest@berlio.by"
    ],
    workingHours: [
      "workingHours",
      "fridayWorkingHours",
      "daysOff"
    ],
    departmentsImage: "/assets/images/minskOffice.png",
    coordinates: [
      52.092412,
      23.688226
    ]
  },
  {
    id: 3,
    departmentsName: "vitebskName",
    address: "vitebskAddress",
    footerAddress: "vitebskFooterAddress",
    footerShortAddress: "vitebskShortAddress",
    inCity: "inVitebskCity",
    phoneNumber: [
      "+375 29 199 96 32",
      "+375 212 67 59 33 {{telFax}}",
      "+375 212 67 59 34 {{telFax}}"
    ],
    email: [
      "vitebsk@berlio.by",
      "info_vitebsk@berlio.by",
      "cto_vitebsk@berlio.by"
    ],
    workingHours: [
      "workingHours",
      "fridayWorkingHours",
      "daysOff"
    ],
    departmentsImage: "/assets/images/minskOffice.png",
    coordinates: [
      55.186481,
      30.218126
    ]
  },
  {
    id: 4,
    departmentsName: "gomelName",
    address: "gomelAddress",
    footerAddress: "gomelFooterAddress",
    footerShortAddress: "gomelShortAddress",
    inCity: "inGomelCity",
    phoneNumber: [
      "+375 33 320 00 34",
      "+375 232 50 98 65"
    ],
    email: [
      "gomel@berlio.by",
      "info_gomel@berlio.by",
      "cto_gomel@berlio.by"
    ],
    workingHours: [
      "workingHours",
      "fridayWorkingHours",
      "daysOff"
    ],
    departmentsImage: "/assets/images/minskOffice.png",
    coordinates: [
      52.422884,
      30.998204
    ]
  },
  {
    id: 5,
    departmentsName: "grodnoName",
    address: "grodnoAddress",
    footerAddress: "grodnoFooterAddress",
    footerShortAddress: "grodnoShortAddress",
    inCity: "inGrodnoCity",
    phoneNumber: [
      "+375 29 587 69 36",
      "+375 152 31 10 00 {{telFax}}",
      "+375 44 791 02 34"
    ],
    email: [
      "grodno@berlio.by",
      "info_grodno@berlio.by",
      "cto_grodno@berlio.by"
    ],
    workingHours: [
      "workingHours",
      "fridayWorkingHours",
      "daysOff"
    ],
    departmentsImage: "/assets/images/minskOffice.png",
    coordinates: [
      53.658047,
      23.829098
    ]
  },
  {
    id: 6,
    departmentsName: "mogilevName",
    address: "mogilevAddress",
    footerAddress: "mogilevFooterAddress",
    footerShortAddress: "mogilevShortAddress",
    inCity: "inMogilevCity",
    phoneNumber: [
      "+375 29 742 79 13",
      "+375 29 741 01 85"
    ],
    email: [
      "mogilev@berlio.by",
      "info_mogilev@berlio.by",
      "cto_mogilev@berlio.by"
    ],
    workingHours: [
      "workingHours",
      "fridayWorkingHours",
      "daysOff"
    ],
    departmentsImage: "/assets/images/minskOffice.png",
    coordinates: [
      53.888345,
      30.291254
    ]
  }
];
function Dropdown({
  label,
  onSelect,
  linkText,
  linkHref,
  className = ""
}) {
  const { t } = useTranslation();
  const defaultItem = useMemo(() => DepartmentAdresses.find((item) => item.id === 1), []);
  const [selectedItem, setSelectedItem] = useState(defaultItem);
  const [isOpen, setIsOpen] = useState(false);
  const [fillColor, setFillColor] = useState("black");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("selectedItem");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSelectedItem(parsed);
        } catch (e) {
          console.warn("Invalid sessionStorage data for selectedItem");
        }
      }
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".aam_dropdown")) {
        setIsOpen(false);
        setFillColor("black");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined" && selectedItem) {
      sessionStorage.setItem("selectedItem", JSON.stringify(selectedItem));
      onSelect(selectedItem);
    }
  }, [selectedItem, onSelect]);
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    setFillColor(isOpen ? "black" : "#48AE5AFF");
  };
  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };
  const handleLinkClick = (e) => e.stopPropagation();
  return /* @__PURE__ */ React__default.createElement("div", { className: `aam_dropdown ${className}` }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: `aam_dropdown-toggle ${isOpen ? "open" : ""}`,
      onClick: handleToggle
    },
    label,
    /* @__PURE__ */ React__default.createElement(
      DropdownIcon,
      {
        className: `aam_dropdown-icon ${isOpen ? "open" : ""}`,
        fillColor,
        width: "17",
        height: "9"
      }
    )
  ), isOpen && /* @__PURE__ */ React__default.createElement("ul", { className: "aam_dropdown-menu" }, DepartmentAdresses.map((item) => /* @__PURE__ */ React__default.createElement("li", { key: item.id, className: "aam_dropdown-item" }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_dropdown-item__button",
      onClick: () => handleSelect(item)
    },
    /* @__PURE__ */ React__default.createElement("span", { className: "aam_dropdown-item__address" }, t(item.address)),
    /* @__PURE__ */ React__default.createElement("span", { className: "aam_dropdown-item__phone" }, item.phoneNumber[0])
  ))), linkText && linkHref && /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: "aam_dropdown__footer",
      role: "button",
      tabIndex: 0,
      onClick: handleLinkClick,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleLinkClick(e);
        }
      }
    },
    /* @__PURE__ */ React__default.createElement(LinkTo, { href: linkHref, text: linkText })
  )));
}
Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  className: PropTypes.string
};
function PhoneIcon({
  fillColor = "#000D04",
  width = 24,
  height = 23,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 24 23",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement("g", { id: "Phone" }, /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M5.28823 2.24226C6.50556 1.13271 8.50993 1.33021 9.52924 2.57833L10.7902 4.12236C11.6196 5.13792 11.5464 6.5573 10.5619 7.45464L10.3232 7.67227C10.3127 7.70003 10.2874 7.78731 10.3155 7.95318C10.3787 8.32672 10.719 9.11909 12.1475 10.4211C13.5755 11.7227 14.4461 12.0343 14.8593 12.0924C15.0466 12.1188 15.1446 12.0942 15.1749 12.0845L15.5829 11.7127C16.4581 10.9149 17.803 10.7658 18.8866 11.3058L20.7971 12.2578C22.4331 13.073 22.8464 15.1114 21.5061 16.3331L20.0855 17.6279C19.638 18.0358 19.0361 18.376 18.3015 18.4388C16.4925 18.5933 12.2742 18.3961 7.84213 14.3564C3.70422 10.5848 2.91016 7.29584 2.80969 5.67533L3.55848 5.63632L2.80969 5.67533C2.75889 4.85591 3.18131 4.16264 3.71862 3.67289L5.28823 2.24226ZM8.32845 3.40236C7.82183 2.78201 6.87755 2.73269 6.34586 3.2173L4.77626 4.64793C4.44634 4.94864 4.2876 5.28004 4.30727 5.59732C4.3871 6.88486 5.0284 9.85274 8.89977 13.3813C12.9612 17.0832 16.7124 17.1936 18.1623 17.0697C18.4585 17.0444 18.7531 16.9033 19.0279 16.6528L20.4484 15.3581C21.0259 14.8317 20.8985 13.8734 20.0807 13.4659L18.1702 12.5138C17.6427 12.2509 17.0246 12.3377 16.6406 12.6877L16.1851 13.1028L15.6563 12.6153C16.1851 13.1028 16.1844 13.1035 16.1837 13.1041L16.1822 13.1054L16.1792 13.1082L16.1727 13.1139L16.158 13.1264C16.1475 13.1352 16.1355 13.1448 16.1219 13.1551C16.0948 13.1758 16.0613 13.1991 16.0214 13.2236C15.9414 13.2728 15.8356 13.3263 15.7028 13.3716C15.4319 13.4641 15.0748 13.5138 14.6319 13.4515C13.7651 13.3297 12.6169 12.788 11.0899 11.3962C9.56341 10.0048 8.96748 8.95715 8.83324 8.16398C8.7646 7.7584 8.81935 7.43087 8.92148 7.1824C8.97153 7.06063 9.03051 6.96381 9.08464 6.89057C9.11164 6.85405 9.13733 6.82352 9.16 6.79872C9.17134 6.78631 9.18194 6.77533 9.19158 6.76573L9.20531 6.75236L9.2116 6.74644L9.21459 6.74367L9.21605 6.74233C9.21676 6.74167 9.21748 6.74102 9.7463 7.22854L9.21748 6.74102L9.50429 6.4796C9.93289 6.08895 9.99293 5.44045 9.58944 4.94639L8.32845 3.40236Z",
        fill: fillColor
      }
    ))
  );
}
PhoneIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ContactInfo() {
  const { t } = useTranslation();
  const { selectedItem } = useContext(SelectedItemContext);
  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = selectedItem || defaultItem;
  if (!displayedItem || !Array.isArray(displayedItem.phoneNumber) || displayedItem.phoneNumber.length === 0) {
    return null;
  }
  const phone = displayedItem.phoneNumber[0];
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_contact-info" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_service-location" }, t("customerService"), " ", t(displayedItem.inCity)), /* @__PURE__ */ React__default.createElement("a", { href: `tel:${phone}`, className: "aam_contact-details" }, /* @__PURE__ */ React__default.createElement(PhoneIcon, { className: "aam_phone-icon" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_phone-number" }, phone)));
}
function LinkButton({
  children,
  href = "#",
  target = "",
  className = ""
}) {
  const [isActive, setIsActive] = useState(false);
  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);
  const handleMouseLeave = () => setIsActive(false);
  return /* @__PURE__ */ React__default.createElement(
    "a",
    {
      className: `aam_link-button aam_link-button--${className} ${isActive ? "aam_link-button--active" : ""}`,
      href,
      target,
      rel: target === "_blank" ? "noopener noreferrer" : void 0,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      style: { whiteSpace: "nowrap" }
    },
    children
  );
}
LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  target: PropTypes.oneOf(["_self", "_blank", "_parent", "_top"]),
  className: PropTypes.string
};
const useLocalization = () => {
  const { i18n: i18n2, t } = useTranslation();
  const switchLocale = async (newLocale) => {
    if (i18n2.language !== newLocale) {
      try {
        await i18n2.changeLanguage(newLocale);
        localStorage.setItem("i18nextLng", newLocale);
        document.cookie = `lang=${newLocale}; path=/; max-age=31536000`;
      } catch (e) {
        console.error("Ошибка смены языка:", e);
      }
    }
  };
  return {
    locale: i18n2.language || "ru",
    // на всякий случай дефолт
    switchLocale,
    t
  };
};
function LocaleSwitcher({ className = "" }) {
  const { locale, switchLocale } = useLocalization();
  const handleLocaleChange = (newLocale) => {
    if (locale !== newLocale) {
      switchLocale(newLocale);
    }
  };
  return /* @__PURE__ */ React__default.createElement("div", { className }, ["ru", "en"].map((lng) => /* @__PURE__ */ React__default.createElement(
    "button",
    {
      key: lng,
      type: "button",
      className: locale === lng ? "active" : "",
      onClick: () => handleLocaleChange(lng),
      "aria-pressed": locale === lng,
      "aria-label": `Switch language to ${lng.toUpperCase()}`
    },
    lng.toUpperCase()
  )));
}
LocaleSwitcher.propTypes = {
  className: PropTypes.string
};
function Header() {
  const { t } = useTranslation();
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);
  const handleSelect = (item) => {
    setSelectedItem(item);
  };
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(LocaleSwitcher, { className: "aam_locale-switcher" }), /* @__PURE__ */ React__default.createElement("header", { className: "aam_header", id: "header" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_header__logo" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", "aria-label": t("backToHome") }, /* @__PURE__ */ React__default.createElement(Logo, null))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_header__dropdown" }, /* @__PURE__ */ React__default.createElement(
    Dropdown,
    {
      label: t("departmentsPhone"),
      onSelect: handleSelect,
      linkText: t("allContacts"),
      linkHref: "/contacts"
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_header__contactinfo" }, selectedItem && /* @__PURE__ */ React__default.createElement(ContactInfo, { item: selectedItem })), /* @__PURE__ */ React__default.createElement("div", { className: "aam_header__button-container" }, /* @__PURE__ */ React__default.createElement(
    LinkButton,
    {
      href: "https://map.berlio.by/",
      className: "green",
      target: "_blank"
    },
    t("searchAzs")
  ), /* @__PURE__ */ React__default.createElement(
    LinkButton,
    {
      href: "https://lkb.by/",
      className: "gray",
      target: "_blank"
    },
    t("personalAccount")
  ))));
}
function NavigationDropdown({
  label,
  closedColor = "white",
  openColor = "#176224",
  hoverColor = "#176224",
  isOpen,
  onToggle,
  onClose
}) {
  const handleToggle = (e) => {
    e.stopPropagation();
    if (isOpen) {
      onClose();
    } else {
      onToggle();
    }
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_navigation-dropdown" }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_navigation-dropdown__toggle",
      onClick: handleToggle,
      style: {
        color: isOpen ? openColor : closedColor,
        ":hover": { color: hoverColor }
      }
    },
    label,
    /* @__PURE__ */ React__default.createElement(
      DropdownIcon,
      {
        className: `aam_navigation-dropdown__icon ${isOpen ? "open" : ""}`,
        fillColor: isOpen ? openColor : closedColor,
        width: "17",
        height: "9"
      }
    )
  ));
}
NavigationDropdown.propTypes = {
  label: PropTypes.node,
  closedColor: PropTypes.string,
  openColor: PropTypes.string,
  hoverColor: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
function CloseIcon({
  fillColor = "#909090",
  width = 30,
  height = 30,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 30 30",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M21.8071 7.81574C21.9712 7.97983 22.0633 8.20239 22.0633 8.43445C22.0633 8.66652 21.9712 8.88908 21.8071 9.05317L15.6199 15.2404L21.8071 21.4275C21.9712 21.5916 22.0633 21.8142 22.0633 22.0463C22.0633 22.2783 21.9712 22.5009 21.8071 22.665C21.643 22.8291 21.4204 22.9213 21.1883 22.9213C20.9563 22.9213 20.7337 22.8291 20.5696 22.665L14.3824 16.4778L8.19526 22.665C8.03117 22.8291 7.80861 22.9213 7.57654 22.9213C7.34448 22.9213 7.12192 22.8291 6.95782 22.665C6.79373 22.5009 6.70154 22.2783 6.70154 22.0463C6.70154 21.8142 6.79373 21.5916 6.95782 21.4275L13.145 15.2404L6.95782 9.05317C6.79373 8.88908 6.70154 8.66652 6.70154 8.43445C6.70154 8.20239 6.79373 7.97983 6.95782 7.81574C7.12192 7.65164 7.34448 7.55945 7.57654 7.55945C7.80861 7.55945 8.03117 7.65164 8.19526 7.81574L14.3824 14.0029L20.5696 7.81574C20.7337 7.65164 20.9563 7.55945 21.1883 7.55945C21.4204 7.55945 21.643 7.65164 21.8071 7.81574Z",
        fill: fillColor
      }
    )
  );
}
CloseIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
const menuContent = {
  partners: [
    {
      title: "appliedProgramsAndSoftware",
      links: [
        {
          href: "/equipment/webCenterBerlio",
          text: "webCenterBerlio",
          target: "_self"
        },
        {
          href: "/equipment/oilAndCapital",
          text: "oilAndCapital",
          target: "_self"
        },
        {
          href: "/equipment/selfServiceCheckout",
          text: "selfServiceCashRegister",
          target: "_self"
        },
        {
          href: "/equipment/gsAutomationSystem",
          text: "gasStationAutomationSystem",
          target: "_self"
        },
        {
          href: "/equipment/invoicesSite",
          text: "invoiceWebsite",
          target: "_self"
        }
      ]
    },
    {
      title: "usefulInformation",
      links: [
        {
          href: "/partners/voiceRefService",
          text: "voiceInfoService",
          target: "_self"
        },
        {
          href: "/partners/loyaltyProgram",
          text: "loyaltyProgram",
          target: "_self"
        },
        {
          href: "/partners/documentsForDownload",
          text: "downloadableDocuments",
          target: "_self"
        },
        {
          href: "/partners/systemRules",
          text: "berlioPaymentRules",
          target: "_self"
        },
        {
          href: "/partners/forBankInformation",
          text: "bankInformation",
          target: "_self"
        }
      ]
    }
  ],
  clients: [
    {
      title: "electronicPaymentSystem",
      links: [
        {
          href: "/clients/signAndResign",
          text: "contractConclusion",
          target: "_self"
        },
        {
          href: "/clients/gettingElectronicCard",
          text: "eCardReceipt",
          target: "_self"
        },
        {
          href: "/clients/cardUsageRules",
          text: "eCardUsage",
          target: "_self"
        },
        {
          href: "/clients/dealResignation",
          text: "contractTermination",
          target: "_self"
        },
        {
          href: "/clients/priceListsAndTariffs",
          text: "ratesAndTariffs",
          target: "_self"
        },
        {
          href: "/clients/workWithPrivateAccount",
          text: "personalAccountUsage",
          target: "_self"
        },
        {
          href: "/clients/documentsForDownload",
          text: "downloadableDocuments",
          target: "_self"
        }
      ]
    },
    {
      title: "fuelCardsAndGasStations",
      links: [
        {
          href: "https://map.berlio.by",
          text: "gasStationsAndRoutes",
          target: "_blank"
        },
        {
          href: "/clients/plasticCardUsageRules",
          text: "fuelCardUsage",
          target: "_self"
        },
        {
          href: "/clients/tollRoads",
          text: "tollRoads",
          target: "_self"
        },
        {
          href: "/clients/forFuelPayments",
          text: "fuelPayment",
          target: "_self"
        }
      ]
    },
    {
      title: "regulatoryDocuments",
      links: [
        {
          href: "/clients/issuerRules",
          text: "berlioEWalletRules",
          target: "_self"
        },
        {
          href: "/clients/eMoneyRegulations",
          text: "berlioUsageRegulations",
          target: "_self"
        }
      ]
    },
    {
      title: "servicesAndSoftware",
      links: [
        {
          href: "/equipment/berlioInternetClientApp",
          text: "berlioInternetClient",
          target: "_self"
        },
        {
          href: "/equipment/berlioCardPayApp",
          text: "berlioCardPayApp",
          target: "_self"
        },
        {
          href: "/equipment/smartPayApp",
          text: "smartPayApp",
          target: "_self"
        },
        {
          href: "/equipment/selfServiceCheckout",
          text: "selfServiceCashRegister",
          target: "_self"
        },
        {
          href: "/equipment/personalAccWebApp",
          text: "clientCabinetSoftware",
          target: "_self"
        }
      ]
    }
  ]
};
function NavigationDropdownMenu({
  isOpen,
  menuId,
  currentOpenMenu,
  onClose
}) {
  const { t } = useTranslation();
  const [isContentVisible, setContentVisible] = useState(false);
  const isVisible = isOpen && currentOpenMenu === menuId;
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setContentVisible(true), 300);
    } else {
      setContentVisible(false);
    }
  }, [isVisible]);
  const content = menuContent[menuId];
  if (!content) {
    return null;
  }
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: `aam_navigation-dropdown-menu ${isVisible ? "" : "hidden"} aam_navigation-dropdown-menu__${menuId}`
    },
    /* @__PURE__ */ React__default.createElement("button", { type: "button", className: "aam_navigation-dropdown-menu__close", "aria-label": t("closeMenu"), onClick: onClose }, /* @__PURE__ */ React__default.createElement(CloseIcon, null)),
    /* @__PURE__ */ React__default.createElement("div", { className: `aam_navigation-dropdown-menu__content ${isContentVisible ? "is-visible" : ""}` }, content.map((section) => /* @__PURE__ */ React__default.createElement("div", { key: section.title, className: "aam_navigation-dropdown-menu__block" }, /* @__PURE__ */ React__default.createElement("h2", null, t(section.title)), /* @__PURE__ */ React__default.createElement("ul", null, section.links.map((link) => /* @__PURE__ */ React__default.createElement("li", { key: link.href }, /* @__PURE__ */ React__default.createElement(
      "a",
      {
        href: link.href.startsWith("http") ? link.href : `${baseUrl}${link.href}`,
        target: link.target || (link.href.startsWith("http") ? "_blank" : "_self"),
        rel: link.href.startsWith("http") ? "noopener noreferrer" : void 0
      },
      t(link.text)
    )))))))
  );
}
NavigationDropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  // Общее состояние, открыт ли какой-либо Dropdown
  menuId: PropTypes.string.isRequired,
  // Уникальный идентификатор этого меню
  currentOpenMenu: PropTypes.string,
  // Идентификатор текущего открытого меню
  onClose: PropTypes.func.isRequired
  // Функция для закрытия меню
};
function Navigation() {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const handleToggle = (menuId) => {
    setOpenDropdown(menuId === openDropdown ? null : menuId);
  };
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("nav", { className: "aam_navigation" }, /* @__PURE__ */ React__default.createElement("ul", { className: "aam_navigation__list" }, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/about" }, t("aboutBerlio"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(
    NavigationDropdown,
    {
      label: t("forPartners"),
      closedColor: "#FFFFFF",
      openColor: "#176224",
      hoverColor: "#176224",
      isOpen: openDropdown === "partners",
      onToggle: () => handleToggle("partners"),
      onClose: () => setOpenDropdown(null),
      portalClassName: "aam_partners-portal",
      currentOpenMenu: openDropdown
    }
  )), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(
    NavigationDropdown,
    {
      label: t("forClients"),
      closedColor: "#FFFFFF",
      openColor: "#176224",
      hoverColor: "#176224",
      isOpen: openDropdown === "clients",
      onToggle: () => handleToggle("clients"),
      onClose: () => setOpenDropdown(null)
    }
  )), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/news" }, t("news"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("equipmentAndSoftware"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/contacts" }, t("contacts"))))), /* @__PURE__ */ React__default.createElement(
    NavigationDropdownMenu,
    {
      isOpen: openDropdown === "partners",
      menuId: "partners",
      currentOpenMenu: openDropdown,
      onClose: () => setOpenDropdown(null)
    }
  ), /* @__PURE__ */ React__default.createElement(
    NavigationDropdownMenu,
    {
      isOpen: openDropdown === "clients",
      menuId: "clients",
      currentOpenMenu: openDropdown,
      onClose: () => setOpenDropdown(null)
    }
  ));
}
function SearchIcon({
  fillColor = "#A3A3A3",
  width = 22,
  height = 22,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 22 22",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement("g", { id: "Search" }, /* @__PURE__ */ React__default.createElement(
      "path",
      {
        id: "Vector",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.5116 2.30508C5.79152 2.30508 1.96512 6.13149 1.96512 10.8516C1.96512 15.5717 5.79152 19.3981 10.5116 19.3981C15.2317 19.3981 19.0581 15.5717 19.0581 10.8516C19.0581 6.13149 15.2317 2.30508 10.5116 2.30508ZM0.5 10.8516C0.5 5.32232 4.98236 0.839966 10.5116 0.839966C16.0409 0.839966 20.5233 5.32232 20.5233 10.8516C20.5233 13.3526 19.6062 15.6393 18.0901 17.394L21.2854 20.5894C21.5715 20.8755 21.5715 21.3393 21.2854 21.6254C20.9994 21.9115 20.5355 21.9115 20.2494 21.6254L17.0541 18.43C15.2994 19.9462 13.0126 20.8632 10.5116 20.8632C4.98236 20.8632 0.5 16.3809 0.5 10.8516Z",
        fill: fillColor
      }
    ))
  );
}
SearchIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
const routes = {
  mainBlock: "/",
  aboutBlock: "/about",
  contacts: "/contacts",
  newsBlock: "/news",
  detailedNewsMain: "/news/:id",
  equipment: "/equipment",
  webCenterMain: "/equipment/webCenterBerlio",
  oilAndCapitalMain: "/equipment/oilAndCapital",
  selfServiceCheckoutMain: "/equipment/selfServiceCheckout",
  gsAutomationSystemMain: "/equipment/gsAutomationSystem",
  forClientsMain: "/clients",
  signAndResignMain: "/clients/signAndResign",
  signAndResignSection: "/clients/signAndResign",
  gettingCardMain: "/clients/gettingElectronicCard",
  dealResignationMain: "/clients/dealResignation",
  priceListsAndTariffsMain: "/clients/priceListsAndTariffs",
  workWithPrivateAccount: "/clients/workWithPrivateAccount",
  documentsForDownloadMain: "/clients/documentsForDownload",
  eMoneyRegulationsMain: "/clients/eMoneyRegulations",
  bicAppMain: "/clients/berlioInternetClientApp",
  cardUsageRules: "/clients/cardUsageRules",
  plasticCardUsageRules: "/clients/plasticCardUsageRules",
  tollRoads: "/clients/tollRoads",
  forFuelPayments: "/clients/forFuelPayments",
  issuerRules: "/clients/issuerRules",
  forPartnersMain: "/partners",
  voiceRefServiceMain: "/partners/voiceRefService",
  loyaltyProgramMain: "/partners/loyaltyProgram",
  forBankInfoMain: "/partners/forBankInformation",
  forBankInfoDoc: "/partners/documentsForDownload",
  forBankInfoContact: "/partners/forBankInformation",
  cardUsageRulesPartners: "/partners/cardUsageRules",
  plasticCardUsageRulesPartners: "/partners/plasticCardUsageRules",
  forNotAResidentsServices: "/partners/forNotAResidentsServices"
};
const pageTitles$1 = { "/": "НП ООО «Берлио»", "home": "НП ООО «Берлио» - Главная", "about": "НП ООО «Берлио» - О Берлио", "contacts": "НП ООО «Берлио» - Контакты", "news": "НП ООО «Берлио» - Новости", "equipment": "НП ООО «Берлио» - Оборудование и ПО", "webCenter": "НП ООО «Берлио» - “Веб Центр БЕРЛИО”", "oilAndCapital": "НП ООО «Берлио» - ППП “НЕФТЬ И КАПИТАЛ”", "selfServiceCheckout": "НП ООО «Берлио» - Касса самообслуживания", "gsAutomationSystem": "НП ООО «Берлио» - ППП “Система автоматизации АЗС”", "invoicesSite": "НП ООО «Берлио» - “Сайт для выставления счетов-фактур”", "invoicesSiteTariffs": "НП ООО «Берлио» - Тарифы “API BERLIO-INFO”", "forClients": "НП ООО «Берлио» - Для клиентов", "signAndResign": "НП ООО «Берлио» - Заключение и Перезаключение договоров", "gettingElectronicCard": "НП ООО «Берлио» - Получение электронной карты", "cardUsageRules": "НП ООО «Берлио» - Правила пользования электронной картой", "dealResignation": "НП ООО «Берлио» - Расторжение договора", "priceListsAndTariffs": "НП ООО «Берлио» - Прейскуранты и тарифы", "workWithPrivateAccount": "НП ООО «Берлио» - Работа в ЛК", "documentsForDownload": "НП ООО «Берлио» - Документы для скачивания", "systemRules": "НП ООО «Берлио» - Правила платежной системы электронных денег “БЕРЛИО”", "plasticCardUsageRules": "НП ООО «Берлио» - Правила пользования топливной картой", "nonResidentsSupport": "НП ООО «Берлио» - Услуги в отношении нерезидентов РБ", "tollRoads": "НП ООО «Берлио» - Платные дороги", "issuerRules": "НП ООО «Берлио» - Правила платежной системы электронных денег “БЕРЛИО”", "eMoneyRegulations": "НП ООО «Берлио» - Регламент использования электронных денег", "bicApp": "НП ООО «Берлио» - Берлио интернет клиент", "bcpApp": "НП ООО «Берлио» - Приложение “BERLIOCARDPAY”", "smartPayApp": "НП ООО «Берлио» - Приложение “SMARTPAY”", "personalAccWebApp": "НП ООО «Берлио» - Приложение “Личный кабинет клиента”", "forPartners": "НП ООО «Берлио» - Для партнеров", "voiceRefService": "НП ООО «Берлио» - Голосовая справочно-информационная служба", "loyaltyProgram": "НП ООО «Берлио» - Программа лояльности", "forBankInfo": "НП ООО «Берлио» - Для банка", "detailedNews": "НП ООО «Берлио» - Подробности новости", "adminLogin": "НП ООО «Берлио» - Авторизация", "adminDashboard": "НП ООО «Берлио» - Панель администратора", "privacy": "НП ООО «Берлио» - Конфиденциальность" };
const departmentsPhone$1 = "Телефоны филиалов";
const allContacts$1 = "Все контакты";
const searchAzs$1 = "Поиск АЗС";
const personalAccount$1 = "Личный кабинет";
const customerService$1 = "Обслуживание клиентов";
const backToHome$1 = "перейти на главную";
const companyName$1 = "НП ООО «БЕРЛИО»";
const minskName$1 = "Головной офис";
const minskAddress$1 = "Минская область, г. Минск, ул. Быховская 55";
const minskFooterAddress$1 = "ул. Быховская 55, г. Минск, Беларусь, 220007";
const minskShortAddress$1 = "г. Минск, ул. Быховская 55";
const inMinskCity$1 = "в Минске";
const brestName$1 = "Брестский филиал";
const brestAddress$1 = "Брестская область, г. Брест, ул. К.Маркса, 33–43";
const brestFooterAddress$1 = "ул. К.Маркса 33, офис 43, г. Брест, Беларусь, 224005";
const brestShortAddress$1 = "г. Брест, ул. К.Маркса 33-43";
const inBrestCity$1 = "в Бресте";
const vitebskName$1 = "Витебский филиал";
const vitebskAddress$1 = "Витебская область, г. Витебск, ул. Правды, 37, корп.2, кв.84";
const vitebskFooterAddress$1 = "ул. Правды, 37, корп.2, кв.84, г. Витебск, Беларусь, 210029";
const vitebskShortAddress$1 = "г. Витебск, ул. Правды 37,к.2-84";
const inVitebskCity$1 = "в Витебске";
const gomelName$1 = "Гомельский филиал";
const gomelAddress$1 = "Гомельская область, г. Гомель, ул. Речицкая, 1А-419";
const gomelFooterAddress$1 = "ул. Речицкая, 1А, к.419, г. Гомель, Беларусь, 246017";
const gomelShortAddress$1 = "г. Гомель, ул. Речицкая, 1А-419";
const inGomelCity$1 = "в Гомеле";
const grodnoName$1 = "Гродненский филиал";
const grodnoAddress$1 = "Гродненская область, г. Гродно, ул. Победы, 17-7";
const grodnoFooterAddress$1 = "ул. Победы, 17-7, г. Гродно, Беларусь, 230026";
const grodnoShortAddress$1 = "г. Гродно, ул. Победы, 17-7";
const inGrodnoCity$1 = "в Гродно";
const mogilevName$1 = "Могилёвский филиал";
const mogilevAddress$1 = "Могилевская область, г. Могилев, ул. Челюскинцев, 105В";
const mogilevFooterAddress$1 = "ул. Челюскинцев, 105В, г. Могилёв, Беларусь, 212003";
const mogilevShortAddress$1 = "г. Могилев, ул. Челюскинцев, 105В";
const inMogilevCity$1 = "в Могилёве";
const smolenskName$1 = "ООО «БЕРЛИО-КАРД»";
const smolenskAddress$1 = "Смоленская область, г.Смоленск, ул. Памфилова, д.5, о.211";
const belarusName$1 = "Беларусь";
const russiaName$1 = "Россия";
const aboutBerlio$1 = "О Берлио";
const forPartners$2 = "Для партнеров";
const forClients$2 = "Для клиентов";
const news$1 = "Новости";
const equipmentAndSoftware$1 = "Оборудование и ПО";
const contacts$1 = "Контакты";
const closeMenu$1 = "Закрыть меню";
const noResult$1 = 'По вашему запросу "{{query}}" ничего не найдено.';
const search$1 = "Поиск по сайту";
const appliedProgramsAndSoftware$1 = "Прикладные программы и ПО";
const webCenterBerlio$1 = "ПО “Веб Центр БЕРЛИО”";
const oilAndCapital$1 = "ППП “НЕФТЬ И КАПИТАЛ”";
const selfServiceCashRegister$1 = "Касса самообслуживания для сетей АЗС";
const gasStationAutomationSystem$1 = "ППП “Система автоматизации АЗС”";
const invoiceWebsite$1 = "Сайт для выставления счетов-фактур";
const usefulInformation$1 = "Полезная информация";
const voiceInfoService$1 = "Голосовая справочно-информационная служба";
const loyaltyProgram$1 = "Программа лояльности";
const downloadableDocuments$1 = "Документы для скачивания";
const berlioPaymentRules$1 = "Правила платежной системы электронных денег «БЕРЛИО»";
const bankInformation$1 = "Информация для банка";
const electronicPaymentSystem$1 = "Электронная платежная система";
const contractConclusion$1 = "Заключение и перезаключение договора";
const eCardReceipt$1 = "Получение эл.карточки";
const eCardUsage$1 = "Использование эл.карточки";
const contractTermination$1 = "Расторжение договора";
const ratesAndTariffs$1 = "Прейскурант и тарифы";
const personalAccountUsage$1 = "Работа с личным кабинетом";
const fuelCardsAndGasStations$1 = "Топливные карты и АЗС";
const gasStationsAndRoutes$1 = "АЗС и маршруты";
const fuelCardUsage$1 = "Использование топливных карт";
const tollRoads$1 = "Платные дороги (BelToll)";
const fuelPayment$1 = "Оплата за топливо";
const regulatoryDocuments$1 = "Нормативные документы";
const berlioEWalletRules$1 = "Электронные деньги “БЕРЛИО” ОАО “Белгазпромбанк”. Правила";
const berlioUsageRegulations$1 = "Регламент использования электронных денег “БЕРЛИО”";
const servicesAndSoftware$1 = "Сервисы и ПО";
const berlioInternetClient$1 = "Приложение “Berlio Internet client”";
const berlioCardPayApp$1 = "Приложение “BERLIOCARDPAY”";
const smartPayApp$1 = "Приложение “Smartpay”";
const clientCabinetSoftware$1 = "ПО “Личный кабинет клиента”";
const breadCrumbs$1 = { "home": "Главная", "about": "О Берлио", "forPartners": "Для партнеров", "voiceRefService": "Голосовая справочно-информационная служба", "loyaltyProgram": "Программа лояльности", "forBankInfo": "Информация для банка", "forClients": "Для клиентов", "signAndResign": "Заключение и перезаключение договора", "gettingCard": "Получение электронной карты", "dealResignation": "Расторжение договора", "priceListsAndTariffs": "Прейскуранты и тарифы", "workWithPrivateAccount": "Работа в личном кабинете", "documentsForDownload": "Досументы для скачивания", "eMoneyRegulations": "Регламент использования электронных денег", "bicApp": "Приложение “Berlio Internet Client”", "berlioCardPay": "Приложение “BERLIOCARDPAY”", "smartPayApp": "Приложение “SMARTPAY”", "personalAccWebApp": "Приложение “Личный кабинет клиента”", "news": "Новости", "detailedNews": "Детали новости", "equipment": "Оборудование и ПО", "webCenter": "ПО “Веб Центр БЕРЛИО”", "oilAndCapital": "ППП “НЕФТЬ И КАПИТАЛ”", "selfServiceCheckout": "Касса самообслуживания", "gsAutomationSystem": "ППП “Система автоматизации АЗС”", "invoicesSite": "“Сайт для выставления счетов-фактур”", "invoicesSiteTariffs": "Тарифы для доступа к API «Berlio Info»", "privacy": "Конфиденциальность" };
const mainBlock$1 = { "companyName": "Компания НП ООО «БЕРЛИО»", "headline": "Система электронных расчетов на АЗС", "tagline": "используйте электронную карту «БЕРЛИО» и заправляйтесь за 3 минуты", "fuelCardUsage": "Использование топливных карт", "belTollServices": "позволяет оплачивать услуги в системе BelToll (оплата платных дорог)", "nonResidentServices": "Услуги в отношении нерезидентов РБ", "nonResidentSupport": "компания также поддерживает клиентов из ближнего зарубежья", "readMore": "Подробнее" };
const aboutBlock$1 = { "name": "Наша компания", "alt": "Офис НП ООО «Берлио»", "description": "Компания работает на рынке производителей и услуг с 1992 года. Количество объектов, принимающих к оплате карты «БЕРЛИО»: 804 — Беларусь, 379 — Россия" };
const systemSection$1 = { "name": "Система “БЕРЛИО”", "listTitle": "а также", "listItem1": "Разработка и сопровождение программного обеспечения под заказ; разработка, производство, установка и техническое обслуживание оборудования", "listItem2": "Информационно-техническое обслуживание клиентов по системе безналичных расчетов «БЕРЛИО» на автозаправочных станциях, в магазинах и на объектах услуг в Беларуси", "listItem3": "Разработка, производство, установка и обслуживание оборудования управления на автозаправочных станциях, СТО, пунктах взимания дорожных сборов, в магазинах и в других торговых объектах", "listItem4": "Разработка, производство, установка и обслуживание оборудования по обеспечению расчетов по электронным картам", "alt1": "Логотип BERLIO на стеле", "alt2": "Заправка автомобиля" };
const purposeSection$1 = { "name": "Назначение системы", "description": "Система предназначена для оперативного безналичного расчёта по электронным картам. Основными составляющими узлами системы являются:", "cardTitle1": "Расчетный центр", "cardTitle2": "Терминалы", "cardTitle3": "Электронные карты", "fuelDispenser": "Топливораздаточная колонка", "listTitle": "По картам “БЕРЛИО” можно оплатить:", "listItem1": "топливо", "listItem2": "газ", "listItem3": "керосин", "listItem4": "продукты", "listItem5": "промтовары", "listItem6": "масла", "listItem7": "СТО", "listItem8": "техосмотр", "listItem9": "дорожный сбор в системе BelToll", "listItem10": "дорожный сбор в системе ПЛАТОН", "listItem11": "мойку", "listItem12": "пылесос", "listItem13": "стоянку", "listItem14": "Velcom и МТС", "listItem15": "услуги таможенных агентов" };
const cpsSection$1 = { "name": "К услугам клиентов и партнеров", "listItem1": "Оперативное заключение договоров", "listItem2": "Безналичный расчёт", "listItem3": "Своевременная бухгалтерская отчётность", "listItem4": "Использование электронных карт", "listItem5": "Возможность получения предоставляемых услуг (заправка любых видов топлива, покупка товаров народного потребления, оплата услуг, дорожных сборов) по одной электронной карте", "listItem6": "Возможность ограничения видов предоставляемых услуг (заправка только конкретного вида топлива) по указанной клиентом электронной карте", "listItem7": "Возможность ограничения суточной, месячной нормы топлива по указанной клиентом электронной карте, надежный металлический корпус в виде брелка для ключей, гарантия 1 год, индивидуальный пароль, надежная защита от подделки", "forClients": "Для клиентов", "forPartners": "Для партнеров" };
const forPartnersMain$1 = { "title": "Для партнеров", "description": "Выберите раздел и изучите необходимую информацию", "partnerInfo": { "title1": "Прикладные программы и ПО", "title2": "Полезная информация", "title3": "Стать участником системы", "label1": "ПО “Веб Центр БЕРЛИО”", "label2": "ППП “НЕФТЬ И КАПИТАЛ”", "label3": "Касса самообслуживания для сетей АЗС", "label4": "ППП “Система автоматизации АЗС”", "label5": "Сайт для выставления счетов-фактур", "label6": "Голосовая справочно-информационная служба", "label7": "Программа лояльности", "label8": "Документы для скачивания", "label9": "Правила платежной системы электронных денег «БЕРЛИО»", "label10": "Информация для банка" } };
const partnersAdvantages$1 = { "name": "Преимущества для партнеров “БЕРЛИО”", "documentsCycle": "Онлайн-оформление и полный цикл документов", "documentsCycleTagline": "мы предоставляем полную бухгалтерию и работаем оперативно", "billPrint": "Печать фискального чека", "billPrintTagline": "возможность распечатать фискальный чек прямо из личного кабинета", "location": "Удобное расположение офиса", "locationTagline": "добираться к нам очень просто: офис в 4 минутах ходьбы от ст.м. “Ковальская Слобода”" };
const partners$1 = { "faq_title": "Часто задаваемые вопросы", "questions": { "question1": "Как стать партнером?", "question2": "Что необходимо, чтобы заключить договор?", "question3": "Какие преимущества у партнеров?", "question4": "Как получить акт сверки взаиморасчетов по топливу?", "question5": "Как произвести оплату по договору?" }, "answers": { "answer1": "На этом месте находится информация по данному вопросу", "answer2": "На этом месте находится информация по данному вопросу", "answer3": "На этом месте находится информация по данному вопросу", "answer4": "На этом месте находится информация по данному вопросу", "answer5": "На этом месте находится информация по данному вопросу" } };
const voiceRefServiceMain$1 = { "name": "Голосовая справочно-информационная служба", "descr1": "Голосовая справочно-информационная служба предназначена для автоматизации работы с клиентами в организации. Программа использует голосовой факс-модем для выдачи голосового меню клиентам. Принцип работы с клиентами следующий: клиент звонит по номеру телефона, к которому подключен модем или номеру входящей линии внутренней АТС. Модем поднимает трубку телефона и клиенту предлагается голосовое меню, записанное клиентом.\nНапример:", "descr2": "“Здравствуйте. Вы позвонили в справочно-информационную службу фирмы ”БЕРЛИО”. Для получения остатка по договору наберите цифру ’1′. Для получения по факсу отчёта о реализации за текущий месяц наберите цифру ’2′. Для получения по факсу отчёта о реализации за предыдущий месяц наберите цифру ’3′. Для соединения с менеджером наберите цифру ’9’”", "descr3": "Клиент для получения необходимой информации набирает соответствующую цифру на телефонном аппарате. Внимание, набор всех цифр клиент должен производить в тональном режиме. Если для набора городского номера клиент использовал импульсный режим, то перед набором первой цифры необходимо нажать ’*’, чтобы перевести телефон (факс) в тональный набор. Набирать все цифры клиент может как во время паузы, так и во время голосовых сообщений.", "descr4": "Начальное меню с определённой паузой повторяется несколько раз. Количество повторов и время паузы определяется в настройках программы. Если за указанное время клиент не нажал не одной цифры, то клиент соединяется с менеджером (так как если бы он нажал клавишу ‘9’). Если нажатая цифра не соответствует ни одной функции — клиенту сообщается “Сделан неправильный выбор” и меню повторяется заново.", "descr5": "При выборе пункта ’9′ клиент переключается на менеджера. Номер телефона менеджера указывается в настройках программы. Доступность данного пункта возможна только в указанное время, например, только в рабочие дни с 9.00 до 18.00.", "descr6": "При выборе пункта ’1’ клиенту предлагается набрать пятизначный номер договора, после чего ему сообщается об остатке денежных средств на договоре. При выборе пунктов меню ’2′ и ’3′ клиенту предлагается набрать номер договора завершив набор клавишей “#”, после чего клиенту по факсу передаётся Справка о реализации соответственно за текущий или предыдущий периоды.", "homeLink": "На главную", "upLink": "Наверх" };
const loyaltyProgramMain$1 = { "name": "Программа лояльности", "descr1": "Программа лояльности предназначена для развертывания в клиентской сети компании системы предоставления и учета скидок, а также всевозможных акций и бонусных программ с использованием карт лояльности: бумажных (со штрих‐кодами), пластиковых (со штрих‐кодами, электронных (чиповых, с магнитной полосой), а также бесконтактных)", "descrHeader2": "Основные преимущества программы:", "descr2": { "item1": "быстрота и простота использования", "item2": "высокая надежность", "item3": "режим офлайн с записью офлайн информации на карту обеспечивает клиенту доступность программы лояльности даже на объектах без связи с центром лояльности, а компании гарантирует, что клиент не перерасходует накопленные средства", "item4": "огромная гибкость в настройках всевозможных акций", "item5": "более 100 отчетов со всевозможными группировками и фильтрами", "item6": "высокая степень защищенности на всех этапах взаимодействия системы гарантирует безопасность проведения транзакций “Семейная карта” ‐ возможность выпуска неограниченного количества дополнительных карт с одним карт‐счётом (например, когда муж, жена и дети используют один карт‐счёт). В этом случая все движения по программе лояльности проходят по счёту основной карты, при этом для идентификации клиента возможно использование любой из дополнительных карт" }, "descrHeader3": "Преимущества использования бесконтактных электронных карт:", "descr3": "Больший срок службы карт, которые при бесконтактных расчетах, естественно, меньше изнашиваются. Удобство и скорость платежа на автозаправках, в кафе, супермаркетах и т.п. Карты и считыватели отлично защищены от мошенников", "descr4": "Во‐первых карты имеют внутреннюю парольную защиту (отдельно на запись информации и отдельно на чтение), причем пароль устанавливается не на всю карту целиком, а на каждый из сегментов(а их может быть на карте “Mifare 1K” ‐ 10), что позволяет сохранять часть информации и от чтения и от записи, часть только от записи", "descr5": "Во‐вторых, считыватели карт нашего производства не записывают информацию переданную информацию на карту. Вся информация предварительно шифруется и только в зашифрованном виде поступает на карту. Причём к информации дополнительно подмешиваются случайные данные, идентификаторы карты, записанные производителем и недоступные для изменения, а также расчётные контрольные значения. Кроме того на карте ведутся дополнительно контрольные счетные значения которые при изменении данных всегда должны изменяться по заранее известному алгоритму таким образом, что абсолютно идентичная операция с картой при каждом прикладывании имеет совершенно различное представление данных и контрольных значений", "descr6": "Всё это не даёт никакой, даже потенциальной возможности продублировать карту или каким либо образом изменить информацию на карте (любые такие операции приведут к недействительности карты, вследствие, несовпадения контрольных кодов при расшифровке информации на карте)", "descr7": "Аналогично, невозможно изменить данные на этапе взаимодействия компьютера со считывающим устройством. По линиям связи никогда не передаются сами данные, а только их шифрованное представление, смешанные с набором случайных данных и рассчитанных контрольных значений. И даже идентичная операция каждый раз имеет совершенно иное представление, т.е. даже повторив данные и сымитировав обмен, система будет считать все данные недействительными!", "descr8": "Аналогично все коммуникации с центром лояльности системой офлайн и АСУ АЗС имеет шифрование и дополнительный контроль. К тому же при бесконтактных расчетах карта остается в руках у клиента, что снижает риск несанкционированных манипуляций с нею обслуживающим персоналом", "descrHeader9": "Варианты использования программы:", "descr9": { "item1": "дисконтные карты — предоставление клиентам всевозможных скидок выражаемых в % от суммы покупки", "item2": "бонусные карты — аналог дисконтных карт, лишь с тем различием, что клиент за свои покупки получает не скидку, а некий бонус. Бонусом может быть что угодно, варианты ограничены лишь Вашим воображением. Наиболее часто бонусы переводят в денежный эквивалент или в ту продукцию, которую предоставляют, например, литры бензина и т.д. Как один из вариантов использования ‐ зачисление невостребованной клиентом сдачи на его карту", "item3": "электронные кошельки — электронный аналог бумажных талонов с учетом возможности многоразового использования, а также онлайн добавления/ перераспределения сумм/литров на карте", "item4": "многофункциональные карты — например, дисконтные карты с дополнительным накоплением бонусов по акциям", "item5": "поощрительная программа — позволяет в зависимости от активности клиента увеличение или уменьшение его бонусов (как в денежном выражении через начисление предоплаты или изменение статуса, так и в товарном, например, в виде подарков, или возможности безвозмездно приобрести заданное количество товара или услуги). Кроме того, аналогичные увеличения и списания возможно по результатам приобретения определённого количества (или на определённую сумму) товаров и услуг", "item6": "призовая программа — позволяет разыгрывать среди участников программы различные призы (как в денежном выражении через начисление предоплаты или изменение статуса, так и в товарном, например, в виде подарков, или возможности безвозмездно приобрести заданное количество товара или услуги)" }, "homeLink": "На главную", "upLink": "Наверх" };
const forBankInfoMain$1 = { "name": "Наша компания", "system": "Система электронных расчетов на АЗС", "systemTagline": "используйте электронную карту “БЕРЛИО” и заправляйтесь за 3 минуты", "usage": "Использование топливных карт", "usageTagline": "позволяет оплачивать услуги в системе BelToll (оплата платных дорог)", "nonResident": "Услуги в отношении нерезидентов РБ", "nonResidentTagline": "компания также поддерживает клиентов из ближнего зарубежья", "readMore": "Подробнее" };
const forBankInfoContact$1 = { "address": "Адрес", "phone": "Телефон", "forOrganizations": "Корпоративная почта", "forClientInquiries": "Для обращения клиентов", "readMore": "Все контакты" };
const forBankInfoDoc$1 = { "name": "Документы", "description": "Банком-эмитентом ООО “БЕРЛИО” является ОАО “Белгазпромбанк”", "headline": "Регламент использования электронных денег “БЕРЛИО”", "cardTitle1": "Правила ОАО “Белгазпромбанк”", "cardTitle2": "Правила платежной системы электронных денег “БЕРЛИО”", "homeLink": "На главную", "upLink": "Наверх" };
const forClientsMain$1 = { "title": "Для клиентов", "description": "Выберите раздел и изучите необходимую информацию", "clientInfo": { "title1": "Электронная платежная система", "title2": "Топливные карты и АЗС", "title3": "Нормативные документы", "title4": "Сервисы и ПО", "label1": "Заключение и перезаключение договора", "label2": "Получение эл.карточки", "label3": "Использование эл.карточки", "label4": "Расторжение договора", "label5": "Прейскурант и тарифы", "label6": "Работа с личным кабинетом", "label7": "Документы для скачивания", "label8": "АЗС и маршруты", "label9": "Использование топливных карт", "label10": "Платные дороги (BelToll)", "label11": "Оплата за топливо", "label12": "Электронные деньги “БЕРЛИО” ОАО “Белгазпромбанк”. Правила", "label13": "Регламент использования электронных денег “БЕРЛИО”", "label14": "Приложение “Berlio Internet client”", "label15": "Приложение “BERLIOCARDPAY”", "label16": "Приложение “Smartpay”", "label17": "Касса самообслуживания для сетей АЗС", "label18": "ПО “Личный кабинет клиента”" } };
const clientsAdvantages$1 = { "name": "Преимущества для клиентов “БЕРЛИО”", "customerService": "Сервисное обслуживание 24/7", "customerServiceTagline": "оперативная техническая помощь клиентам в любое время суток", "dealSign": "Заключение договора онлайн", "dealSignTagline": "или в офисе в 4 минутах ходьбы от ст.м. “Ковальская Слобода”", "personalCabinet": "Многофункциональный личный кабинет", "personalCabinetTagline": "поддерживается многими АЗС Беларуси и имеет богатый функционал" };
const clients$1 = { "faq_title": "Часто задаваемые вопросы", "questions": { "question1": "Как стать клиентом?", "question2": "Что необходимо, чтобы заключить договор?", "question3": "Как зарегистрировать бортовое устройство?", "question4": "Каков порядок блокировки/разблокировки бортового устройства?", "question5": "Как произвести оплату по договору?" }, "answers": { "answer1": "На этом месте находится информация по данному вопросу", "answer2": "На этом месте находится информация по данному вопросу", "answer3": "На этом месте находится информация по данному вопросу", "answer4": "На этом месте находится информация по данному вопросу", "answer5": "На этом месте находится информация по данному вопросу" } };
const signAndResignMain$1 = { "name": "Обслуживание в электронной платёжной системе “БЕРЛИО”", "description": "Электронная платёжная система “БЕРЛИО” (далее – платёжная система “БЕРЛИО”) представляет собой сообщество пользователей: Участников и Клиентов, взаимодействующих в соответствии с установленными правилами.", "purposeBeforeLink": "Приобретение и оплата за нефтепродукты, товары, работы и услуги производятся на ", "purposeLink": "объектах торговли и сервиса (ОТС) ", "purposeAfterLink": "платёжной системы “БЕРЛИО” электронными деньгами “БЕРЛИО” с применением:", "list1": { "item1": "электронных карт “БЕРЛИО”;", "item2": "пластиковых электронных карт “БЕРЛИО”;", "item3": "других носителей идентификационной информации", "item4": "или их виртуальных эквивалентов" }, "participants": "Участники платежной системы “БЕРЛИО” (поставщики платёжных услуг)", "operator": "Оператор", "operatorTagline": "НП ООО “БЕРЛИО”", "agents": "Агенты", "agentsTagline": "организации,  обслуживающие собственных Клиентов, пользующихся платежной системой “Берлио”, могут иметь ОТС", "emissioner": "Эмитент", "emissionerTagline": "ОАО “Белгазпромбанк”", "tradeAndServiceObject": "ОТС", "tradeAndServiceObjectTagline": "объекты торговли и сервиса (АЗС, СТО, мойки и пр.)", "serviseCenter": "ЦО", "serviseCenterTagline": "центр обслуживания", "customerService": "Обслуживание Клиентов осуществляется на основании:", "list2": { "item1": "договора присоединения клиента к обслуживанию в электронной платёжной системе “БЕРЛИО” – с Оператором (ЦО Оператора)", "item2": "договора на открытие и обслуживание электронного кошелька, покупку электронных денег –  с Эмитентом (Расчётный центр)" }, "systemUsage": "Пользование платёжной системой “БЕРЛИО” осуществляется при наличии у Клиента оригиналов документов:", "list3": { "item1": "заявление о присоединении", "item2": "договор с Эмитентом", "item3": "иные договоры (согласно затребованным Клиентом услугам)" }, "documentsTitle": "Документы (ЛНПА) участников платёжной системы “БЕРЛИО” для ознакомления", "operatorDocumentsTitle": "Документы оператора", "cardTitle1": "Правила оператора электронной платежной системы “БЕРЛИО”", "cardTitle2": "Правила обслуживания в электронной платежной системе “БЕРЛИО”", "cardTitle3": "Договор присоединения клиента к обслуживанию в электронной платежной системе “БЕРЛИО”", "emissionerDocumentsTitle": "Документы эмитента", "cardTitle4": "Правила эмитента электронных денег “БЕРЛИО”", "cardTitle5": "Договор на открытие и обслуживание электронного   кошелька", "footer": "Договоры заключаются по установленным участниками платёжной системы “БЕРЛИО” типовым формам" };
const signAndResignSection$1 = { "name": "Перезаключение / заключение договора", "description": "В связи с изменением законодательства в сфере платёжных систем и приведением в соответствие типовых форм документов платежной системы “БЕРЛИО” (Система), Правил Оператора, Правил обслуживания, внедрением новой технологии обслуживания, действующим Клиентам необходимо перезаключить договоры обслуживания. Перезаключение и заключение Договора присоединения осуществляется по новой процедуре", "dropdown1": "Оформление документов", "link": "самостоятельно", "selfSignList": { "item1": "выполнить на сайте www.lkb.by предрегистрацию клиента: на стартовой странице кликнуть по кнопке “Предрегистрация в электронной платёжной системе “БЕРЛИО", "item2": "ознакомиться с Регистрационной карточкой клиента (РКК), условиями и требованиями Договора присоединения и документов (ЛНПА) Участников платёжной системы “БЕРЛИО”", "item3": "подготовить необходимый пакет документов для заполнения РКК и загрузки сканов", "item4": "заполнить РКК:", "orderedItem1": "выбрать Центр обслуживания", "orderedItem2": "ввести УНП", "orderedItem3": "подтвердить согласие Клиента с условиями и требованиями документов (ЛНПА) проставлением ”галочек” возле “Согласен”. При несогласии/отсутствии “галочек”, кнопка “Продолжить” не доступна, обслуживание действующих Клиентов (Оператора), не перезаключивших договоры, будет прекращено в одностороннем порядке", "orderedItem4": "ввести данные уполномоченного лица (“Мастер-телефон”) на совершение юридически значимых действий в личном кабинете (ЛК) на сайте www.lkb.by, индивидуальный предприниматель указывает свой номер мобильного телефона)", "orderedItem5": "загрузить сканы запрашиваемых документов для Оператора и Эмитента согласно “Списку документов” и РКК", "orderedItem6": "проверить полноту и достоверность данных, при не соответствии, отредактировать, при наличии пустых полей, заполнить их. При  недостаточном объёме сведений для заполнения, сохранить РКК, кликнув на кнопку “Сохранить”, продолжить заполнение можно на стартовой странице www.lkb.by кликнув по кнопке “Предрегистрация в электронной платёжной системе “БЕРЛИО” и введя УНП в поле РКК", "orderedItem7": "по завершению действий кликнуть последовательно на кнопки “Сохранить” и “Отправить” для проверки специалистами ЦО (выбранном изначально) на соответствие/несоответствие сведений в РКК и пакета документов требованиям платёжной системы “БЕРЛИО”", "orderedItem8": "ожидать СМС-сообщение на “Мастер-телефон” о подтверждении предрегистрации, отправляется не позднее 5 рабочих дней с момента получения документов ЦО (данный срок действует в период перезаключения договоров и перехода на новый порядок) для дальнейшего формирования и подписания документов", "orderedItem9": "при подтверждениии предрегистрации, пройти регистрацию в ЛК на сайте www.lkb.by", "orderedItem10": "при отклонении предрегистрации, обратиться в изначально выбранный клиентом ЦО для выяснения несоответствия", "orderedItem11": "сформировать в ЛК Заявление о присоединении, Соглашение о расторжении договора обслуживания (при перезаключении договора)", "orderedItem12": "проверить в Заявлении о присоединении наличие “галок” возле “Согласен” (автоматически проставляются в соответствии с данными клиента из РКК)", "orderedItem13": "распечатать Заявление о присоединении, Соглашение о расторжении договора обслуживания (при перезаключении договора), подписать, скрепить печатью (при использовании)", "orderedItem14": "отправить Оператору, в выбранный при предрегистации ЦО, документ(ы) почтовым отправлением или с нáрочным для аутентификации / регистрации клиента в платёжной системе “БЕРЛИО”", "orderedItem15": "отправить Эмитенту пакет документов по адресу: ОАО “Белгазпромбанк”, г. Минск, ул. Притыцкого,60/2, каб. 301", "orderedItem16": "ожидать СМС-сообщение на “Мастер-телефон” о подтверждении регистрации и присвоенном номере и дате Договора присоединения", "orderedItem17": "после получения Клиентом СМС-сообщения, процедура перезаключения договора в электронной платежной системе “Берлио” считается завершённой", "footer": "Заявление о присоединении, оформленное и отправленное Клиентом на электронную почту Оператора или по факсу, не принимается", "secondaryFooter": "Проверка статуса оформленных документов возможна в личном кабинете" }, "dropdown2": "Оформление документов в Центре обслуживания Оператора", "customerServiceSignList": { "item1": "ознакомиться с условиями и требованиями Договора присоединения и документов (ЛНПА) Участников платёжной системы “БЕРЛИО”, РКК", "item2": "оформить, подписать, скрепить печатью (при использовании) документы для Эмитента (реквизиты договора, соглашения и пр., вопросник для клиента) согласно списку документов", "item3": "подготовить необходимый пакет документов для оформления РКК и Заявления о присоединении. Допускается предоставление запрашиваемых документов в электронном виде (сканы на электронном носителе)", "item4": "обратиться в ЦО Оператора по местонахождению Клиента (головной или региональные ЦО)", "item5": "предоставить необходимый пакет документов для оформления РКК, Заявления о присоединении и загрузки сканов специалистами ЦО", "item6": "подписать, скрепить печатью (при использовании) Заявление о присоединении, Соглашение о расторжении договора обслуживания (при перезаключении договора), предоставленные специалистами ЦО", "item7": "1 экземпляр оригиналов вернуть специалисту ЦО" }, "dealFact": "Фактом присоединения клиента к Договору присоединения считается подтвержденная регистрация клиента в платёжной системе “БЕРЛИО”, подписанное сторонами Заявление о присоединении:", "dealFactList": { "item1": "номером Договора присоединения является номер регистрации Заявления о присоединении", "item2": "датой Договора присоединения является дата регистрации Заявления о присоединении", "item3": "местом составления является местонахождение ЦО, выбранного Клиентом при регистрации" }, "footer": { "beforeTel": "Если у вас возникли вопросы по заключению договора, звоните в наш", "tel1": "центральный офис", "betweenTels": "или отдел по", "tel2": "обслуживанию клиентов", "afterTel": " Также вы можете позвонить в один из офисов наших филиалов на территории РБ или наших представителей в РФ." }, "contactsLink": "Наши филиалы и контакты", "homeLink": "На главную", "upLink": "Наверх" };
const gettingCardMain$1 = { "name": "Получение электронной карточки", "applicationHeader": "Заявка на получение электронной карточки “БЕРЛИО” оформляется:", "list1": { "item1": "личным обращением в ЦО Оператора по местонахождению Клиента (головной или региональные ЦО)", "item2": "звонком по телефону обслуживания клиентов", "item3": "письмом на электронную почту обслуживания клиентов:" }, "mailLink": "info@berlio.by", "applicationFooter": "Вам выпишут счет-фактуру на необходимое количество электронных карточек. Оплата электронной карточки производится на расчетный счет НП ООО  “БЕРЛИО” согласно выписанному счету-фактуре. Цена на электронную карточку устанавливается в соответствии с действующим прейскурантом. Электронная карта выдается только после ее оплаты", "documentsHeader": "Документы для получения электронной карточки", "supervisor": "Руководителю нужны", "supList": { "item1": "приказ о назначении руководителя", "item2": "паспорт или водительское удостоверение", "item3": "копия платежного поручения с отметкой банка (независимо от наличия электронной системы “Клиент-Банк”) - если получение карточки происходит в день оплаты" }, "notSupervisor": "Не руководителю нужны", "notSupList": { "item1": "доверенность на получение ТМЦ", "item2": "паспорт или водительское удостоверение", "item3": "копия платежного поручения с отметкой банка (независимо от наличия электронной системы “Клиент-Банк”) - если получение карточки происходит в день оплаты" }, "documentsFotterPrimary": "При получении электронной карточки держатель устанавливает категорию карточки (дизельная, бензиновая, топливная либо универсальная) и, при необходимости, суточную и/или месячную нормы отпуска.", "documentsFotterSecondary": { "beforeLink": "Изменить/установить нормы и/или заблокировать/разблокировать карточки также можно в ", "afterLink": ", или предоставив письменное заявление в отдел обслуживания по месту заключения договора." }, "lkbLink": "личном кабинете пользователя", "homeLink": "На главную", "upLink": "Наверх" };
const readerSVG$1 = { "enter": "Ввод", "cancel": "Сброс", "return": "Возврат", "doze": "Доза", "menu": "Меню", "lang": "Язык", "massage1": "Введите пин-код", "massage2": "и нажмите “Ввод”" };
const dealResignationMain$1 = { "name": "Расторжение договора", "cardTitle1": "О расторжении договора с НП ООО “БЕРЛИО”", "cardTitle2": "О расторжении договора с ОАО “Белгазпромбанком”", "homeLink": "На главную", "upLink": "Наверх" };
const priceListsAndTariffsMain$1 = { "name": "Прейскуранты и тарифы", "cardTitle1": "Прейскурант №03/2024 от 22.02.2024 (для резидентов)", "cardTitle2": "Прейскурант №01/24 от 17.01.2024", "cardTitle3": "Прейскурант 03/2022 от 17.03.2022 с 21.03.2022", "homeLink": "На главную", "upLink": "Наверх" };
const workWithPrivateAccount$1 = { "name": "Работа с личным кабинетом", "description": "Личный кабинет позволяет пользователю системы самостоятельно просматривать и редактировать информацию по договору:", "list1": { "item1": "общие данные", "item2": "список карт", "item3": "список платежей", "item4": "реализацию и баланс за текущий либо предыдущий месяц" }, "sections": "Разделы личного кабинета", "information": "Информация", "informationTagline": "дата заключения договора, адрес, телефон, email, УНП, банк, расчетный счет организации, текущий остаток денежных средств по договору", "payments": "Платежи", "paymentsTagline": "список платежей по договору за текущий или предыдущий месяц", "cardList": "Список карт", "cardListTagline": "перечень электронных карт договора с указанием номера, даты выдачи, состояния, категории (вида топлива) карты, а также расчитанной суммы на карте", "report": "Отчет о реализации", "reportTagline": "список отпущенных нефтепродуктов (н/п), товаров и услуг по электронным картам договора за месяц", "balance": "Баланс", "balanceTagline": "сальдо, обороты, НДС по договору за текущий или предыдущий месяц", "middleDescriptinon": "Внесение данных и изменение информации осуществляется при подписании соответствующего заявления (оригинал):", "cardTitle1": "Заявление", "lkbLink": "Перейти в личный кабинет", "homeLink": "На главную", "upLink": "Наверх" };
const documentsForDownloadMain$1 = { "name": "Документы для скачивания", "boxesHeaders": { "applications": "Заявления", "sampleLetters": "Образцы писем", "paymentOrders": "Платежные поручения", "notifications": "Уведомления" }, "app": { "cardTitle1": "На разрешение редактирования данных в личном кабинете на сайте", "cardTitle2": "На погашение денег для юр.лиц", "cardTitle3": "О расторжении договора с ОАО “Белгазпромбанком”" }, "letters": { "cardTitle1": "На регистрацию бортового устройства", "cardTitle2": "О переносе карты с одного договора на другой (в рамках одного предприятия)", "cardTitle3": "О запрете (обслуживании, аресте) карты", "cardTitle4": "О принятии карты с другого предприятия", "cardTitle5": "О переносе карты с другого предприятия", "cardTitle6": "О регистрации транспортного средства на 4+ осей", "cardTitle7": "О верном назначении платежа", "cardTitle8": "Для уточнения кода по карте", "cardTitle9": "Об ошибочной оплате на Р/С НП ООО “БЕРЛИО”", "cardTitle10": "О расторжении договора с НП ООО “БЕРЛИО”" }, "orders": { "cardTitle1": "Образец платежного поручения (для резидентов РБ)", "cardTitle2": "Образец платежного поручения (для не резидентов РБ)" }, "notify": { "cardTitle1": "Уведомление ЭЦП" }, "homeLink": "На главную", "upLink": "Наверх" };
const eMoneyRegulationsMain$1 = { "name": "Регламент использования электронных денег “БЕРЛИО”", "descriptionFirst": "В рамках договора обслуживания в платежной системе электронных денег «БЕРЛИО» (далее - «Система») настоящим регламентом определен порядок использования электронных денег «БЕРЛИО»", "descriptionSecond": "В связи с установленным в системе порядком технологического сеанса связи (каждый рабочий день) между процессинговыми центрами и объектами, зачисление электронных денег на договоры и электронные карточки осуществляется следующим образом:", "descriptionThird": "При использовании устройств доступа:", "descriptionOl": { "item1": "Заказчик перечисляет на расчетный счет ОАО «Белгазпромбанк», согласно заключенному договору, денежные средства на приобретение электронных денег «БЕРЛИО»", "item2": "Исполнитель зачисляет денежные средства для приобретения электронных денег на договор Заказчика", "item3": { "span": "Электронные деньги распределяются Исполнителем следующим образом:", "header": "Остаток электронных денег Заказчика в системе по договору в сутки делится на 2 части:", "ulItem1": "- с 18:00 до 24:00 использование электронных денег можно произвести в размере 50% всех электронных денег", "ulItem2": "- с 24:00 до 18:00 следующего дня – на остальные 50%" }, "item4": "Если на договоре Заказчика имеется несколько электронных карточек – то остаток электронных денег одновременно с делением в сутки будет делиться и на количество имеющихся карточек, пропорционально суточной норме", "item5": "Если в текущие сутки была произведена реализация по конкретной электронной карте, то эта сумма уменьшает рассчитанный остаток электронных денег по этой карте (на текущие сутки)", "item6": "В выходные и/или праздничные дни остаток электронных денег Заказчика в системе по договору делится на 3 части", "item7": "Приобретение (использование) электронных денег можно произвести на рассчитанную сумму с учетом (за минусом) реализации за текущие сутки по данной карте", "item8": { "before": "Информирование участников системы о плановых перерывах в работе или возникновении технических сбоев программно-аппаратного комплекса системы, в работе телекоммуникационных операторов, осуществляется путем размещения соответствующего уведомления", "firstLink": " в новостях", "between": " и в", "secondLink": " личном кабинете клиента", "after": " с указанием возможного времени их устранения" } }, "homeLink": "На главную", "upLink": "Наверх" };
const bicAppMain$1 = { "name": "Приложение “Berlio Internet client”", "description": "НП ООО «БЕРЛИО» предлагает своим клиентам возможность для быстрого и удобного доступа к информации о договоре,  с помощью мобильного приложения «Berlio internet client»", "ulHeader": "Приложение предоставляет полный доступ к информации по договору:", "item1": "общая информация о договоре", "item2": "баланс на договоре", "item3": "список карт", "item4": "информация по карте", "item5": "платежи по договору", "item6": "список реализаций", "item7": "электронные счета-фактуры", "stong1": "Информация предоставляется за текущий и прошедший месяц. Меню приложения интуитивно понятное и легкое в освоении", "stong2": "Для использования мобильного приложения необходимо иметь договор с НП ООО «БЕРЛИО» на обслуживание в платежной системе электронных денег «БЕРЛИО»", "stong3": "Установите мобильное приложение на свой телефон. Используйте для входа в мобильное приложение тот же логин и пароль, как и в личном кабинете", "stong4": "Наше приложение доступно для пользователей Android и Iphone", "cardTitle1": "Скачать из Play Маркет", "cardTitle2": "Скачать из Apple Store", "homeLink": "На главную", "upLink": "Наверх" };
const newsBlock$1 = { "sortBy": "Упорядочить:", "name": "Новости", "newFirst": "Сначала новые", "oldFirst": "Сначала старые", "backHome": "На главную" };
const paymentSystem$1 = { "name": "Электронная платежная система «БЕРЛИО»", "coverage": "Систему поддерживают 97% АЗС Беларуси, а также заправки России.", "cardDescription": "Расчет за приобретаемое топливо, товары и услуги производится посредством электронной карточки «BERLIO», которая представляет собой пластиковую карту.", "actionSignContract": "Заключить договор", "gasStations": "АЗС" };
const fuelCards$1 = { "name": "Топливные карты", "fuelCardsDescription1": "Оплата проезда транспортных средств по платным автомобильным", "fuelCardsDescription2": "Залоговая стоимость устройства электронной оплаты (бортового устройства)", "road": "Дорога", "cardTitle": "Выпуск в обращение и использование топливных карт" };
const actualSection$1 = { "name": "Актуальное", "actualBlockTitle1": "Перечень заправок без процентов", "actualBlockDescription1": "Нужно что-то написать!", "actualBlockTitle2": "Оперативная помощь при обращении", "actualBlockDescription2": "Нужно что-то написать!", "actualBlockTitle3": "Сеть АЗС и маршрутов", "actualBlockDescription3": "Нужно что-то написать!" };
const newsSection$1 = { "name": "Последние новости", "linkToNews": "К деталям новости", "prev": "влево", "next": "вправо" };
const detailedNewsMain$1 = { "name": "Детали новости", "notFound": "Новость не найдена", "backToNews": "Вернуться к новостям", "date": "Дата" };
const ourPartnersLogoSection$1 = { "name": "Наши партнеры", "mapLink": "Перечень АЗС", "homeLink": "На главную", "upLink": "Наверх" };
const ourClientsLogoSection$1 = "Наши клиенты";
const equipment$1 = { "name": "Оборудование и ПО", "descr1": "Ниже вы можете ознакомиться с оборудованием, разработанным для клиентов и партнеров НП ООО «БЕРЛИО»", "descr2": "Гарантийные обязательства по обслуживанию всего устанавливаемого оборудования составляют один год с момента установки. Послегарантийное обслуживание производится по дополнительному соглашению сторон", "partnersSoftSection": { "name": "ПО для партнеров “БЕРЛИО”", "headline1": "ПО “Веб Центр БЕРЛИО”", "headline2": "ППП “НЕФТЬ И КАПИТАЛ”", "headline3": "Касса самообслуживания для сетей АЗС", "headline4": "ППП “Система автоматизации АЗС”", "headline5": "Сайт для выставления счетов-фактур", "plate": "Микросхема" }, "clientsSoftSection": { "name": "ПО для клиентов “БЕРЛИО”", "headline1": "Мобильное приложение “BERLIOCARDPAY”", "headline2": "Касса самообслуживания для сетей АЗС", "headline3": "ПО “Личный кабинет клиента”", "homeLink": "На главную", "upLink": "Наверх" } };
const webCenterMain$1 = { "name": "ПО “Веб Центр БЕРЛИО”", "description": "Программное обеспечение «ВебЦентрБерлио» (далее – ВЦ) представляет собой сетевое приложение, размещаемое на сервере, предназначенное для организации работы с клиентами, использующими для безналичных расчетов электронные/топливные карты «БЕРЛИО». ВЦ позволяет регистрировать договоры, карты и Бортовые устройства (далее – БУ), допускать электронные кошельки (далее – ЭК) к использованию, блокировать/разблокировать их использование на объектах, вести бухгалтерский и статистический учёт финансовых операций в платежной системе электронных денег «БЕРЛИО» (далее – Система), с использованием ЭК и электронных денег (далее – ЭД), прослеживать денежный оборот в пределах Системы.", "list1": { "title": "ПРЕИМУЩЕСТВА ВЦ:", "item1": "ВЦ является сетевым приложением;", "item2": "доступ к данным приложения осуществляется с любого компьютера, имеющего выход в сеть;", "item3": "автоматическое обновление приложения (при запуске приложения);", "item4": "для работы приложения нет необходимости содержать собственный сервер и системы резервирования данных;", "item5": "техническая поддержка приложения в режиме 'Online';", "item6": "постоянное развитие проекта, создание и наполнение новым функционалом (в соответствии с требованиями и предложениями заказчика и собственным видением развития Системы)", "item7": "гибкая настройка отчетов с возможностью формирования в различных форматах;", "item8": "квалифицированная поддержка службы и своевременное обновление программ и модулей до актуальных версий." }, "list2": { "title": "ОСНОВНЫЕ ФУНКЦИИ ПРОГРАММЫ ПО РАБОТЕ С КЛИЕНТАМИ:", "item1": "заключение договоров с клиентами на обслуживание в системе электронных денег “БЕРЛИО”;", "item2": "учёт выдачи карт;", "item3": "занесение платежных документов на договор;", "item4": "формирование ежемесячных отчетов;", "item5": "автоматический расчет денежных средств на карте в зависимости от остатка денежных средств на счете клиента;", "item6": "формирование информационно-статистических отчетов." }, "list3": { "title": "ОСНОВНЫЕ ФУНКЦИИ ВЦ ПРИ РАБОТЕ С УЧАСТНИКАМИ СИСТЕМЫ, ", "subTitle": "расчётными центрами других организаций, объектами (пунктами торговли и сервиса с использованием оборудования по приёму карт):", "item1": "конфигурирование центров, объектов и устройств;", "item2": "приём отчетов от центров и объектов;", "item3": "анализ центров и объектов." }, "homeLink": "На главную", "upLink": "Наверх" };
const oilAndCapitalMain$1 = { "name": "ППП «Нефть и капитал»", "list": { "title": "Описание программы", "subTitle": "Комплекс программ состоит из следующих программ:", "item1": "«НЕФТЬ & КАПИТАЛ. Налив» автоматизирует рабочее место оператора налива нефтепродуктов в автоцистерны и железнодорожные цистерны;", "item2": "«НЕФТЬ & КАПИТАЛ. Мониторинг резервуаров» позволяет получать оперативную информацию о состоянии каждого резервуара. Программа получает данную информацию от уровнемера;", "item3": "«НЕФТЬ & КАПИТАЛ. Бухгалтерия» автоматизирует ведение товарного и бухгалтерского учета на объектах нефтепродуктообеспечения, газоснабжения, товарных базах и оптовых складах, а также подготовки документов по обеспечению и контролю качества нефтепродуктов и газа;", "item4": "«НЕФТЬ & КАПИТАЛ. Автовесы. Железнодорожные весы» позволяет получать информацию от электронных автомобильных и железнодорожных весов, уведомлять оператора о появлении на весах транспортного средства;", "item5": "«НЕФТЬ & КАПИТАЛ. Химическая лаборатория» предназначена для автоматизации документооборота лабораторий химического анализа нефти, нефтепродуктов, а также сжиженных углеводородных газов." }, "homeLink": "На главную", "upLink": "Наверх" };
const selfServiceCheckoutMain$1 = { "name": "Касса самообслуживания", "descriptionFirst": "Автоматизация процессов розничной торговли – один из наиболее актуальных трендов последнего времени. Это тенденция добралась и до сетей АЗС. Автоматизация позволят решать задачи по нескольким направлениям, в первую очередь это предоставления большого набора функций для клиента и оптимизация работы персонала на АЗС.", "descriptionPreBold": "Для решения этих задач НП ООО “БЕРЛИО” предлагает новый программный продукт для сетей АЗС – ", "descriptionBold": "кассу самообслуживания (далее – КСО).", "descriptionSecond": "Что такое КСО? В чем заключаются преимущества использования данных систем и какие возможности открываются для пользователей АЗС?", "list1": { "supDescription": "КСО – это программно-аппаратный комплекс, предназначенный для самостоятельной оплаты топлива и сопутствующих товаров клиентом, без привлечения оператора на АЗС. Перечень основных возможностей КСО:", "item1": "оплата топлива и сопутствующих товаров с помощью безналичных способов оплаты: банковские карты, карты «Берлио», системы оплаты «Оплати» и «Cashew» (контактная/бесконтактная);", "item2": "использование карт лояльности, промокодов и баллов;", "item3": "оплата топлива и услуг, оказываемых на АЗС (пылесос, мойка и т.д.);", "item4": "оплата кофе и фастфуда;", "item5": "размещения рекламы." }, "descriptionThird": "НП ООО “БЕРЛИО” предлагает полный комплекс услуг по интеграции и развертыванию КСО, а также техническую поддержку и консультирование специалистов сетей АЗС. При этом каждый проект внедрения адаптируется под особенности, специфику и потребности заказчика – как в плане технического обеспечения, так и цен на проведение работ.", "descriptionFourth": "Технически, КСО состоят из трех основных модулей: модуля управления и обработки данных по товарам, платежного модуля (включая функцию приема банковских карт и карт лояльности), а также контрольных весов, обеспечивающих точность взвешивания и исключающих обман покупателями при оплате.", "list2": { "supDescription": "Какие задачи могут решать КСО на АЗС:", "item1": "оптимизация расходов на оплату труда и снижение нагрузки на персонал АЗС. За счет касс самообслуживания можно значительно увеличить пропускную способность АЗС, не привлекая к работе дополнительных сотрудников, которых можно привлечь к решению других видов задач;", "item2": "сокращение очередей. Рост количества клиентов в выходные дни и часы пик приводит не только к лишней нагрузке на кассы, но и к недовольству самих посетителей. Установка КСО способствует уменьшению очередей на 15-20% даже в период большой активности людей;", "item3": "быстрый расчет и снижение риска ошибок. Современные технологии позволяют наделять КСО высокой точностью. Программное обеспечение обеспечивает максимально корректное распознавание товара за доли секунды, а при заминках или выборе клиентом не того товара, ошибка устраняется практически мгновенно;", "item4": "эргономичное использование торговой площади АЗС. Даже несколько касс самообслуживания занимают примерно столько же места, сколько и один традиционный кассовый узел, что позволяют более выгодно использовать торговые площади АЗС;", "item5": "повышение уровня продаж и степени лояльности покупателей. Сегодня клиенты розничной торговли предпочитают покупать быстро – и при этом иметь точное и подробное представление о том, что именно они покупают. КСО способны удовлетворить все эти потребности, что привлекает больше посетителей;", "item6": "КСО можно использовать как доступную и удобную платформу для размещения контекстной рекламы (статические картинки, видео ролики и т.д.).", "subDescription": "Сегодня можно с уверенностью говорить о росте спроса на КСО в ближайшем будущем. Автоматизированное торговое оборудование демонстрирует широкие возможности во всех аспектах ритейла – от создания комфортных условий для покупателей до значительного роста продаж." }, "homeLink": "На главную", "upLink": "Наверх" };
const gsAutomationSystemMain$1 = { "name": "ППП «Cистема автоматизации АЗС»", "supTitle": "Пакет прикладных программ", "subTitle": "Описание программы", "descriptionFirst": "Пакет прикладных программ «Система автоматизации АЗС» – новый проект НП ООО “БЕРЛИО”, предназначенный для решения задач по управлению сетью АЗС на различных уровнях. Программное обеспечение реализовано в виде многоуровневой системы, позволяющей организовать удалённое управление АЗС из офиса компании, мониторинг процессов на АЗС, передачу и получение данных в реальном режиме времени, распределение задач и актуализацию информации на АЗС, автоматизацию рабочих мест менеджеров и операторов на АЗС и многое другое.", "descriptionSecond": "ППП реализован на принципиально новой программной платформе с возможностью оперативного внедрения, обслуживания и масштабирования.", "list1": { "title": "ВЕРХНИЙ УРОВЕНЬ", "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Управление»", "secondSubTitleBold": "Программное обеспечение «Офис» ", "secondSubTitle": "обеспечивает решение следующих задач из офиса компании:", "item1": "централизованно формировать и отправлять на АЗС данные по ценам на нефтепродукты и услуги;", "item2": "получать курсы валют с НБРБ, пересчитывать цены на нефтепродукты и услуги и оправлять их на АЗС;", "item3": "управлять видами оплаты;", "item4": "управлять доступом операторов (добавлять операторов, блокировать);", "item5": "получать в режиме онлайн информацию о чеках и реализациях, данные по резервуарам;", "item6": "просматривать чеки, документы и «Z-отчеты», отправленные в СККО;", "item7": "получать актуальные остатки по товарам;", "item8": "управлять медиарекламой на мониторах на АЗС (загружать медиафайлы, устанавливать приоритет и периодичность воспроизведения, учитывать статистику воспроизведения).", "imageTitle": "Общая схема ППП", "imageAltAndTitle": "Общая схема ППП" }, "list2": { "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Обслуживание»", "secondSubTitleBold": "Программное обеспечение «ЦТО» ", "secondSubTitle": "обеспечивает в режиме онлайн: мониторинг и обслуживание АЗС, управление конфигурациями АЗС, просмотр системных журналов ошибок, обновление программного обеспечения и базы данных, осуществление резервирования данных." }, "list3": { "title": "НИЖНИЙ УРОВЕНЬ", "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Управление»", "secondSubTitleBold": "Программное обеспечение «Сервер АЗС» ", "secondSubTitle": "обеспечивает: взаимодействие с базой данных на АЗС и внешними хранилищами данных: ПО «Офис», ПО «ЦТО» (также рассматривается возможность работы с облачными ресурсами), синхронизацию рабочих мест, передачу команд управления оборудованием на АЗС (ТРК, пылесосы, мойки, терминал самообслуживания и другое оборудование),  отпуск топлива через мобильное приложение (сервис «SmartPay»)." }, "list4": { "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Менеджер»", "secondSubTitleBold": "Программное обеспечение «Менеджер» ", "secondSubTitle": "обеспечивает прием НП, позволяет вести учет товаров, производить корректировку показателей НП в резервуарах, корректировку счетчиков ТРК, управление доступом операторов к кассовым операциям, просмотр статистики за смену, формирование отчетов." }, "list5": { "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Оператор»", "secondSubTitleBold": "Программное обеспечение «Оператор» ", "secondSubTitle": "обеспечивает продажу НП, товаров и услуг на АЗС за различные виды оплаты, выполнение кассовых операций: аннулирование чека, возврат товаров (услуг) и НП, внесение и выдачу денежных средств, взаимодействие с кассовым оборудованием (чековые принтеры, банковские и топливные терминалы, весы, считыватели штрих-кодов (Qr-кодов), индикаторы покупателей и т.д.), индикацию состояния оборудования на АЗС, формирование отчетов и просмотр данных необходимых для оператора." }, "list6": { "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Инфраструктура»", "secondSubTitleBold": "Решаемые задачи:", "item1": "поддержка развитой инфраструктуры АЗС:", "item2": "вывод информации о работе АЗС (отпуск топлива, готовность заказов, реклама);", "item3": "распознавание номеров машин и передача их в АСУ;", "item4": "управление стелой с ценами на топливо;", "item5": "контроль за работой оборудования на АЗС;", "item6": "прием и обработка электронных накладных с нефтебаз и др." }, "list7": { "title": "ОСНОВНЫМИ НОВЫМИ ВОЗМОЖНОСТЯМИ ЯВЛЯЮТСЯ:", "item1": "Гибкая и настраиваемая конфигурация рабочих мест и сервера, что позволяет создать равнозначные рабочие места операторов с возможностью настройки приоритетов для обработки чеков при включении ТРК посредством считывающих устройств, производства НП ООО «БЕРЛИО» и при оплате мобильными приложениями;", "item2": "Настраиваемая конфигурация с наличием отдельно выделенного компьютера под сервер, что позволяет снизить нагрузку на рабочее место, обеспечить резервное копирование базы данных и оптимизацию выполнения фоновых задач на сервере, что в конечном итоге приведет к исключению «простоя» АЗС;", "item3": "Возможность отпуска НП используя различные режимы «Предоплаты», «Постоплаты», «До полного бака»;", "item4": "Реализация продажи только в режиме «Формирования чека», что позволяет наглядно видеть оператору состав чека (сумму, общую скидку и скидку по каждой позиции), в случае отмены оплаты нет необходимости заново формировать чек;", "item5": "Возможность на рабочем месте оператора формировать несколько чеков в очередь. Данный функционал позволяет отложить сформированный чек и приступить к формированию нового чека для следующего клиента в очереди в случае, если текущий клиент забыл карту для оплаты или отошел за другими товарами;", "item6": "Применение различных платформ кассового оборудования на выбор: фискальный регистратор «TFP-115», «TFP-116», «TFP-118», программная касса «iKASSA»;", "item7": "Наличие новых видов оплаты: смешанная оплата (наличные + банковская карта + сертификаты + подарочные карты), оплата посредством мобильных приложений, оплата различными платежными системами («Оплати», «Cashew»). Добавление новых видов оплаты реализовано отдельным модулем, что существенно сокращает время на реализацию нового функционала;", "item8": "Взаимодействие с программой лояльности;", "item9": "Наличие сенсорного управления в различных режимах отображения;", "item10": "Основной режим формирования чека «Чек до заправки»;", "item11": "Основной режим работы по картам «Берлио» – «Онлайн»;", "item12": "Возможность на рабочем месте оператора формировать группы товаров для добавления их в чек одним нажатием (комбинированные товары);", "item13": "Возможность выдачи наличных по банковской карте;", "item14": "Возможность сверки отчетов и чеков с СККО;", "item15": "Возможность проводить через систему «Расчет» – автоматизированная информационная система единого расчетного и информационного пространства (АИС ЕРИП);", "item16": "Наличие возможности настройки печати дополнительных квитанций к основному чеку;", "item17": "Получение полных данных с уровнемеров в автоматизированном режиме по протоколам TCP-IP, что позволяет оперативно реагировать на окончание топлива;", "item18": "Реализация заправки «На полный бак» через отложенные реализации, что увеличивает пропускную способность АЗС; и многое другое." }, "homeLink": "На главную", "upLink": "Наверх" };
const invoicesSiteMain$1 = { "name": "Сайт выставления электронных счетов-фактур", "siteLink": "https://эсчф.бел", "altAndTitle": "интерфейс https://эсчф.бел", "description": "Сайт для выставления электронных счетов-фактур (ЭСЧФ) предназначен для автоматизации выставления ЭСЧФ клиентов, юридических лиц и индивидуальных предпринимателей, позволяя им самостоятельно подавать заявки на выставление ЭСЧФ по имеющемуся кассовому чеку.", "list1": { "title": "Основные возможности для клиентов:", "listItem1": "самостоятельная подготовка заявок на выставление ЭСЧФ через сайт по кассовому чеку;", "listItem2": "контроль поданных заявок (просмотр информации о статусе обработки ЭСЧФ порталом налоговой инспекции);", "listItem3": "группировка всех своих заявок на сайте с возможность гибкого поиска и фильтрации, а таже выгрузки во внешние программы." }, "list2": { "title": "Основные возможности для компании:", "listItem1": "снижение трудозатрат на подготовку и выставления ЭСЧФ клиентов по кассовым чекам;", "listItem2": "разгрузка персонала (в связи с тем, что клиенты все делают самостоятельно);", "listItem3": "мониторинг поданных заявок на ЭСЧФ и управление пользователями портала;", "listItem4": "возможность размещения рекламных баннеров на сайте;", "listItem5": "автоматические уведомления на выбранные события (например, добавление заявок на выставление ЭСЧФ по закрытому периоду);", "listItem6": "возможность рассылок клиентам, подтвердившим свое согласие, информации (новости, изменение законодательства и т.д.)." }, "list3": { "title": "Работа с сайтом, основные функции и возможности:", "listItem1": "Вход на сайт - авторизация на сайте осуществляется по электронной почте и паролю;", "listItem2": "Регистрация пользователя портала, для которой необходимо указать следующие данные:", "listItem2Details": { "item1": "адрес электронной почты;", "item2": "пароль для работы с порталом;", "item3": "УНП (учетный номер плательщика) организации;", "item4": "телефон - номер контактного телефона пользователя по вопросам ЭСЧФ. работы на портале и т.д." }, "listItem3": "Просмотр заявок (информация о заявке):", "listItem3Details": { "item1": "«№ заявки»(#) – порядковый номер заявки на портале. Заявки нумеруются по каждой организации (УНП) отдельно;", "item2": "«Дата заявки» - дата регистрации заявки на портале;", "item3": "«АЗС» - внутренний (в пределах организации-продавца) номер торгового объекта (автозаправочной станции);", "item4": "«Дата чека» - дата и время совершения покупки;", "item5": "«Номер чека» (№) - номер кассового чека покупки;", "item6": "«СКНО номер» - номер торговой операции, зарегистрированный в налоговом органе с помощью СКНО (средства контроля налоговых органов);", "item7": "«товар /услуга» - название товара, услуги или продукта согласно кассового чека;", "item8": "«Вид оплаты» - наличные, банковская карта и т.д.;", "item9": "«Цена» - цена товара, продукта или услуги в белорусских рублях (BYN);", "item10": "«Количество» - количество товара, продукта или услуги в соответствующих единицах измерения;", "item11": "«Стоимость» - товара, продукта или услуги в белорусских рублях (BYN);", "item12": "«Скидка» - денежная сумма скидки в белорусских рубля (BYN) по данной товарной позиции;", "item13": "«НДС» - сумма налога на добавленную стоимость в белорусских рублях (BYN) по данной товарной позиции;", "item14": "«%НДС» - ставка налога на добавленную стоимость в процентах по данной товарной позиции;", "item15": "«Номер ЭСЧФ» - номер электронного счета-фактуры после его выставления;", "item16": "«Дата выставления ЭСЧФ» - дата, когда был выставлен электронный счет-фактура;", "item17": "«Предприятие продавец» - название торгового предприятия, где совершена покупка;", "item18": "«УНП» - Учетный номер плательщика торгового предприятия, где совершена покупка;", "item19": "«Адрес» - юридический адрес торгового предприятия, где совершена покупка;", "item20": "«Код» - цифровой код статуса электронного счета-фактуры;", "item21": "«Статус ЭСЧФ» - текстовое описание статуса счета-фактуры." } }, "list4": { "listItem1": "Поиск заявок.", "listItem2": "Фильтры.", "listItem3": "Добавление заявки.", "listItem4": "Копирование заявки.", "listItem5": "Аннулирование заявки.", "listItem6": "Обновить список заявок.", "listItem7": "Печать заявок." }, "list5": { "title": "Экспорт заявок в файл:", "subTitle": "Портал ЭСЧФ поддерживает выгрузку заявок в следующие форматы:", "listItem1": "«WORD» (Документ формата Microsoft Word - DOCX)", "listItem2": "«EXCEL» (Документ формата Microsoft Excel - XLSX)", "listItem3": "«PDF» (Документ формата PDF: можно в дальнейшем просмотреть программами Adobe Reader, Foxit Reader, Microsoft Word и т.д.)", "listItem4": "«CSV» (Документ формата CSV: можно в дальнейшем просмотреть программами Microsoft Excel и др., а также импортировать во внешние программы, например, «1С» и др.)", "listItem5": "«XML» (Документ формата XML - можно импортировать во внешние программы, например, «1С» и др.)", "listItem6": "«JSON» (Документ формата JSON -можно импортировать во внешние программы, например, «1С» и др.)" }, "list6": { "title": "Заключение договора и условия поставки: ", "firstSubTitle": "Работа сервиса осуществляется с использованием программного интерфейса API «APIBerlioInfo», который работает в режиме онлайн", "secondSubTitle": "Стоимость подключения к сервису:", "listItem1": "Лицензия на веб-сайт - 1 420,00 рублей без НДС. (единоразовый платеж, цена на услугу может измениться, уточняйте у менеджера). Поставка осуществляется по лицензионному договору.", "listItem2": "Использование программного интерфейса API «APIBerlioInfo» (ежемесячный платеж). Подключение осуществляется по отдельному договору с ежемесячной оплатой согласно Прейскуранта." }, "list7": { "title": "Тарифные планы для доступа к интерфейсу API «Berlio Info»:", "subTitle": "Прейскурант" }, "list8": { "title": "ДОПОЛНИТЕЛЬНО:", "firstSubTitle": "Развёртывание сайта с названием вашей компании. Например,", "colorSpan": "«компания.эсчф.бел»", "secondSubTitle": "Печать в чеке продажи на АЗС информации о сайте для выставления ЭСЧФ." }, "homeLink": "На главную", "upLink": "Наверх" };
const invoicesSiteTariffsMain$1 = { "name": "API «Berlio Info»", "description": "Программное обеспечение «API «Berlio Info» представляет собой программный интерфейс, работающий в «Online» режиме и позволяющий по запросу пользователя получать информацию о состоянии договора (топливных картах) и всех проведенных платах. По желанию пользователя можно настроить получение любой информации о договоре.", "strongDescription": "API «Berlio Info» доступен всем пользователям, заключившим договор на обслуживание в системе электронных денег «Берлио».", "list": { "title": "Основные решаемые задачи:", "listItem1": "получение списка клиентов;", "listItem2": "получение информации о клиенте;", "listItem3": "получение списка карт на договоре;", "listItem4": "получение данных о балансе и оборотах за произвольный месяц/период;", "listItem5": "формирование списка реализаций и платежей клиента;", "listItem6": "формирование выгрузки данных в различные учетные системы в форматах (XML, JSON);", "listItem7": "получение сведений в режимах «Online» и «24/7» и т.д.", "ps": "Список всех реализованных запросов можно посмотреть на сайте сервиса:" }, "wrapper1": { "title": "Подключение API", "subTitle": "Для получения доступа к интерфейсу API «Berlio Info» необходимо прислать заявление на фирменном бланке с указанием названия организации и номера договора. Заявления отправлять по адресу" }, "serviceCardHeader": "Тарифные планы для доступа к интерфейсу API «Berlio Info»", "cardTitle1": "Тарифы для доступа к «API «Berlio Info»", "wrapper2": { "title": "Инструкция для подключения к API", "cont1": { "title": "Требования для подключения API", "subTitle": "Требования", "listItem1": "Подключение к API «Berlio Info» (далее – API) возможно только для клиентов, заключивших договор на обслуживание в системе электронных денег «Берлио».", "listItem2": "Перед использованием API ознакомиться с Прейскурантом цен на услуги доступа.", "listItem3": "Для подключения доступа к API написать письмо с просьбой включения данной услуги на договоре." }, "cont2": { "title": "Порядок подключения к API", "subTitle": "Подключение", "listItem1": "После получения заявки на подключение услуги доступа к API клиенту сообщается токен для вызова методов API.", "listItem2": "Расширяемый перечень методов API доступен по адресу:", "listItem3": "Клиент самостоятельно разрабатывает свое программное обеспечение для доступа к API." }, "cont3": { "title": "Оплата за услугу доступа к API", "subTitle": "Оплата", "listItem1": "Списание производится с договора ежемесячно единой суммой согласно общего количества запросов за месяц по ценам Прейскуранта.", "listItem2": "После каждого обращения (запроса) к API производится расчет стоимости услуги и корректировка суммы списания." } }, "homeLink": "На главную", "upLink": "Наверх" };
const berlioCardPayMain$1 = { "name": "Приложение “BERLIOCARDPAY”", "description": { "title": "BerlioCardPay", "subTitle": "Мобильное приложение «BerlioCardPay» для юридических лиц и сетей АЗС, работающих с использованием электронных денег “БЕРЛИО”.", "listTitle": "Возможности приложения:", "item1": "электронные карты “БЕРЛИО” в вашем мобильном телефоне;", "item2": "привязка электронных карт к приложению с помощью личного кабинета", "item3": "просмотр статистики по заправкам в реальном режиме времени;", "item4": "заправка по виртуальной карте не выходя из автомобиля." }, "homeLink": "На главную", "upLink": "Наверх" };
const smartPayAppMain$1 = { "name": "Приложение “SMARTPAY”", "description": { "title": "Описание программы", "subTitle1": "ПО «SmartPay» - система оплаты топлива на АЗС посредством мобильного приложения.", "subTitle2": "ПО представляет собой сервис-ориентированный комплекс приложений, обеспечивающих оплату и включение топливораздаточных колонок на АЗС через мобильное приложение, без участия оператора.", "listTitle": "ПО «SmartPay» состоит из двух частей:", "item1": "«SmartPayClient» (устанавливается на АЗС Заказчика);", "item2": "«SmartPayServer» (устанавливается в офисе на сервере Разработчика).", "ps": "Взаимодействие ПО «SmartPay» с мобильным приложением осуществляется через сервер Заказчика в соответствии с протоколом, предоставленным Разработчиком." }, "homeLink": "На главную", "upLink": "Наверх" };
const personalAccWebAppMain$1 = { "name": "ПО “Личный кабинет клиента”", "description": { "title": "Описание программы", "subTitle": "ПО «Личный кабинет клиента» предназначено для получения клиентом необходимой информации по счету, картам, реализациям, платежам, а также настройки карт, скачивания отчетных документов, подключения дополнительных сервисов.", "listTitle": "Основные решаемые задачи:", "item1": "просмотр информации о состоянии текущего счета;", "item2": "просмотр и редактирование данных о картах, установка лимитов на карты;", "item3": "получение отчетной информации о реализациях (в т.ч. списка, выставленных на портал налоговой инспекции электронных счет-фактур), платежах, оборотах и балансе за различные периоды;", "item4": "подключение различных сервисов и услуг (оповещение о текущем балансе, SMS и E-mail оповещение, оплата платных дорог, заказ топливных карт других операторов, оплата мобильной связи и других)." }, "homeLink": "На главную", "upLink": "Наверх" };
const privacyMain$1 = /* @__PURE__ */ JSON.parse('{"name":"Обработка персональных данных","cookieConsentPolicy":"Обработка файлов cookies","cookieData":{"title":"ПОЛИТИКА","subTitle":"НП ООО «БЕРЛИО» в отношении обработки файлов куки"},"cookieDataTitles":{"num1":"1. ОБЩИЕ ПОЛОЖЕНИЯ","num2":"2. СУЩНОСТЬ ТЕХНОЛОГИИ КУКИ И ЦЕЛИ ОБРАБОТКИ ФАЙЛОВ КУКИ","num3":"3. ВИДЫ ИСПОЛЬЗУЕМЫХ ОРГАНИЗАЦИЕЙ ФАЙЛОВ КУКИ И СРОКИ ИХ ХРАНЕНИЯ","num4":"4. ПОРЯДОК И УСЛОВИЯ ТРАНСГРАНИЧНОЙ ПЕРЕДАЧИ ДАННЫХ ФАЙЛОВ КУКИ","num5":"5. ПОЛУЧЕНИЕ СОГЛАСИЯ ПОЛЬЗОВАТЕЛЯ САЙТА НА ОБРАБОТКУ ФАЙЛОВ КУКИ","num6":"6. УПРАВЛЕНИЕ ДАННЫМИ, СОБИРАЕМЫМИ С ПОМОЩЬЮ ФАЙЛОВ КУКИ"},"cookieDataContent":{"num1":{"item1":"1.1. Политика НП ООО «БЕРЛИО» в отношении обработки файлов куки (далее – Политика) разработана в соответствии с Законом Республики Беларусь от 07.05.2021 № 99-З «О защите персональных данных» (далее – Закон о защите персональных данных) и иными актами законодательства Республики Беларусь, а также Уставом НП ООО «БЕРЛИО» в целях обеспечения защиты прав и свобод пользователей Сайта НП ООО «БЕРЛИО» https://berlio.by/ (доменные имена ресурсов и информационных систем Агентства в сети Интернет, на которые также распространяется действие Политики: cardcenter.by, lkb.by, эсчф.бел), (далее – Сайт) при обработке их персональных данных.","item2":"1.2. Политика разъясняет пользователям Сайта, какие типы файлов куки (cookie) используются на Сайте, для каких целей и каким образом НП ООО «БЕРЛИО» (далее – Организация) обрабатывает файлы куки, кому они передаются, порядок дачи согласия или отказа от дачи согласия на обработку файлов куки, другую значимую для субъекта информацию, позволяющую ему осознанно принимать решение о даче такого согласия.","item3":"1.3. Действие настоящей Политики распространяется на следующие действия с файлами куки: сбор, систематизацию, хранение, использование, предоставление, удаление. Сведения из файлов куки обрабатываются Организацией исключительно с использованием средств автоматизации.","item4":"1.4. В Политике используются основные термины и их определения в значении, определенном статьей 1 Закона о защите персональных данных.","item5":"1.5. В Политике также используются следующие понятия в значении:","item6":"Оператор / Организация – НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55; общий адрес электронной почты: berlio@berlio.by; общий телефон: +375(17)3691083;","item7":"Сайт – интернет-ресурс НП ООО «БЕРЛИО»: https://www.berlio.by/;","item8":"Пользователь Сайта – субъект персональных данных (физическое лицо), использующий Сайт Организации в соответствии с его функциональным назначением.","item9":"1.6. Политика вступает в силу с момента утверждения и распространяет действие на обработку файлов куки на Сайте Организации.","item10":"1.7. Во исполнение требований пункта 4 статьи 17 Закона о защите персональных данных Политика является общедоступным документом, размещается для свободного доступа в Организации, а также в сети Интернет на Сайте и предусматривает возможность ознакомления с Политикой любых лиц.","item11":"1.8. Организация как Оператор вправе при необходимости в одностороннем порядке вносить в Политику изменения и дополнения с последующим размещением новой редакции Политики на Сайте Организации. Субъекты самостоятельно получают на Сайте Организации информацию об изменениях Политики.","item12":"1.9. Пользователь Сайта вправе обратиться с заявлением о реализации своих прав, предусмотренных статьями 10–13 Закона о защите персональных данных, а также по вопросам, связанным с использованием Организацией файлов куки, направив заявление в письменной форме либо в виде электронного документа, оформленное в соответствии со статьей 14 Закона о защите персональных данных, на почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55, НП ООО «БЕРЛИО» (Организация / Оператор) либо на адрес электронной почты: dpo.minsk@berlio.by.","item13":"1.10. Заявление субъекта персональных данных о реализации его прав должно содержать: его персональные данные – фамилию, собственное имя, отчество (если таковое имеется), адрес его места жительства (места пребывания), дату рождения, идентификационный номер (при отсутствии такого номера – номер документа, удостоверяющего личность субъекта персональных данных, в случаях, если эта информация указывалась субъектом персональных данных при даче своего согласия Оператору или обработка персональных данных осуществляется без согласия субъекта персональных данных); изложение сути его требований; его личную подпись либо электронную цифровую подпись.","item14":"1.11. За содействием в реализации своих прав Пользователь может также обратиться к лицу, ответственному за осуществление внутреннего контроля за обработкой персональных данных в Организации, направив сообщение на адрес электронной почты: dpo.minsk@berlio.by или обратившись по телефону: +375(17)3691083."},"num2":{"item1":"2.1. Файлы куки (сookie) – это небольшие текстовые файлы, сохраненные в браузере компьютера или мобильного устройства Пользователя Сайта.","item2":"Файлы куки отправляются на компьютер или мобильное устройство Пользователя при посещении Сайта. Сайт сохраняет файлы куки на компьютере или мобильном устройстве Пользователя, когда он открывает Сайт. При каждом последующем посещении Сайта файлы куки отправляются обратно на исходный Сайт.","item3":"Файлы куки действуют как память Сайта, позволяя ему запоминать компьютер / мобильное устройство Пользователя при последующих посещениях.","item4":"Файлы куки могут запоминать настройки Пользователя, делать пользование Сайтом более удобным; позволяют Пользователю Сайта не вводить заново или выбирать те же параметры при повторном посещении Сайта, персонализировать содержание Сайта посредством фиксации предпочтений Пользователя, а также настраивать релевантную интересам Пользователя рекламу, улучшая пользовательский опыт.","item5":"Полученная при использовании файлов куки информация может включать сведения о браузере и устройстве Пользователя, данные, собранные в процессе автоматического электронного взаимодействия устройства Пользователя и Сайта, в том числе статистическую и маркетинговую информацию.","item6":"2.2. Организация обрабатывает файлы куки в целях:","item7":"корректного функционирования Сайта и повышения удобства его использования;","item8":"сбора аналитической информации в обобщенном виде для оценки и дальнейшего улучшения работы Сайта;","item9":"оценки пользовательской активности на Сайте;","item10":"предоставления персонализированной рекламы с учётом интересов пользователей Сайта.","item11":"2.3. Организация не использует файлы куки для идентификации субъектов персональных данных."},"num3":{"item1":"3.1. Организация использует (обрабатывает) файлы куки:","item2":"функциональные (технические, необходимые) файлы куки – используются для обеспечения работы и управления Сайтом; необходимы для выполнения Сайтом своих функций и предоставления предполагаемых услуг; позволяют Пользователю просматривать Сайт и использовать его функции; такие файлы куки не требуют согласия на использование на Сайте в случаях, когда хранение информации или получение доступа к информации необходимы для обеспечения циркуляции информации в сети электронной связи;","item3":"персонализированные файлы куки (файлы настроек) – позволяют запоминать информацию и обеспечить Пользователю индивидуальный опыт использования Сайта; устанавливаются в ответ на его действия; такие файлы куки не требуют согласия на использование на Сайте, так как они отвечают за услугу, непосредственно запрашиваемую Пользователем, при условии, что указанные файлы куки используются только для этой цели;","item4":"аналитические (статистические) файлы куки – необязательные (вспомогательные) файлы куки, которые позволяют отслеживать и анализировать поведение Пользователя на Сайте, сохраняют историю посещений Пользователя на страницах Сайта в целях повышения качества функционирования Сайта, определения наиболее и наименее популярных страниц Сайта, обеспечения анализа данных, связанных с использованием услуг, предоставляемых пользователям Сайта; эти файлы куки собирают следующие данные: IP-адрес, тип браузера, платформа, язык, посещенные страницы, время нахождения на Сайте и другую аналитическую информацию; данный тип файлов куки для целей аналитики анонимизируется (обезличивается) и не содержат персональные данные пользователей; такие файлы куки требуют согласия на использование на Сайте;","item5":"рекламные (маркетинговые) файлы куки – необязательные (вспомогательные) файлы куки, которые используются Организацией для целей маркетинга и улучшения качества рекламы, создавая профили интересов пользователей и предлагая им персонализированную релевантную рекламу, которая наиболее соответствует их предпочтениям, интересам; такие файлы куки требуют согласия на использование на Сайте.","item6":"По сроку хранения в браузере устройства Пользователя:","item7":"сеансовые файлы куки – являются временными и хранятся до момента закрытия браузера Пользователем или окончания сеанса использования Сайта;","item8":"постоянные файлы куки – подлежат хранению в памяти устройства Пользователя в течение времени, указанного в параметрах файлов куки, или до момента их непосредственного удаления самим Пользователем.","item9":"В зависимости от правообладания:","item10":"собственные файлы куки – устанавливаются непосредственно Организацией в целях улучшения работы Сайта;","item11":"сторонние (файлы куки третьих лиц) – формируются третьими лицами в автоматическом режиме и используются Организацией как аналитический инструмент взаимодействия Пользователя с Сайтом и настройки актуальной рекламы для Пользователя.","item12":"3.2. Сроки хранения обрабатываемых на Сайте файлов куки:","item13":"функциональные файлы куки хранятся не более одного года;","item14":"персонализированные файлы куки хранятся не более одного года с момента последнего посещения Пользователем Сайта;","item15":"аналитические файлы куки хранятся не более одного года с момента последнего посещения Пользователем Сайта;","item16":"рекламные файлы куки хранятся не более одного года с момента последнего посещения Пользователем Сайта;","item17":"сеансовые (собственные / сторонние) файлы куки хранятся до момента закрытия браузера Пользователем или окончания сеанса использования Сайта;","item18":"собственные постоянные файлы куки хранятся не более одного года с момента последнего посещения Пользователем Сайта;","item19":"сторонние постоянные файлы куки (файлы куки третьих лиц) хранятся до 5338 дней; третьи лица могут улучшать свои сервисы, изменяя функциональность файлов куки, а также сроки хранения сведений, получаемых при помощи данных файлов."},"num4":{"item1":"4.1. Организация осуществляет трансграничную передачу объединенных в общий массив сведений о Пользователях по их поведенческим особенностям данных, не связанных с идентификацией конкретного Пользователя, для аналитических целей.","item2":"4.2. Сведения из файлов куки передаются:","item3":"4.2.1. в рамках функционирования сервиса веб-аналитики Яндекс Метрика и сервиса онлайн-рекламы Яндекс Директ – на серверы ООО «Яндекс», находящиеся в Российской Федерации (119021, г. Москва, ул. Льва Толстого, 16);","item4":"4.2.2. в рамках функционирования сервиса веб-аналитики Google Analytics – на серверы Google Inc., США (1600 Amphitheatre Parkway Mountain View, California 94043, USA);","item5":"4.2.3. в рамках функционирования сервиса показа контекстной рекламы Google AdSense – Google Ireland Ltd., Ирландия (Gordon House Barrow Street Dublin 4, D04E5W5 Ireland).","item6":"4.3. Передача сведений, указанных в пунктах 4.2.1., 4.2.3. осуществляется в государства (Российская Федерация, Республика Ирландия), на территории которых обеспечивается надлежащий уровень защиты прав субъектов персональных данных (стороны Конвенции Совета Европы от 28.01.1981 о защите физических лиц при автоматизированной обработке персональных данных, далее – Конвенция).","item7":"4.4. США (веб-сервис Google Analytics) не относится к числу участников Конвенции, т.е. не является государством, на территории которого обеспечивается надлежащий уровень защиты прав субъектов персональных данных. Организация, используя веб-сервис Google Analytics, может осуществлять трансграничную передачу исключительно объединенных в общий массив сведений о Пользователях по их поведенческим особенностям, то есть данных, не связанных с идентификацией конкретного Пользователя, что исключает возможность установления личности. Таким образом, риск причинения вреда Пользователю Сайта, связанный с особенностями правового режима персональных данных в США, является минимальным."},"num5":{"item1":"5.1. Организация предлагает Пользователю при первом посещении Сайта дать согласие на использование файлов куки либо отказаться от их использования посредством нажатия кнопок соответственно «Принять» или «Отказаться» на всплывающем информационном баннере:","item2":"при нажатии кнопки «Принять» Пользователь Сайта дает согласие на обработку всех типов файлов куки, используемых Организацией;","item3":"при нажатии кнопки «Отказаться» Пользователь Сайта отказывается от использования функциональных, аналитических и рекламных файлов куки.","item4":"5.2. Для реализации полного отказа от обработки файлов куки Пользователю необходимо отключить использование файлов куки путем изменения настроек браузера своего устройства, о чем подробно сказано в разделе 6 настоящей Политики. Организация прекращает сбор информации с помощью файлов куки после их деактивации.","item5":"5.3. Организация может обеспечить полноценное и корректное функционирование Сайта только с использованием технических файлов куки и файлов настроек, поэтому данные типы файлов куки не подлежит отключению.","item6":"5.4. По окончании сроков хранения файлов куки Сайт вновь запросит согласие Пользователя посредством вывода всплывающего информационного баннера.","item7":"5.5. Пользователь Сайта может изменить свой выбор, а также отказаться от использования файлов куки до истечения срока, указанного в настоящей Политике, на странице «Конфиденциальность» в подвале (нижняя часть страницы) Сайта в закладке «Политика обработки файлов cookies» через форму «Персональные настройки cookies».","item8":"5.6. Настройка файлов куки:","item9":"5.6.1. Пользователь Сайта может настроить использование каждого типа файлов куки, за исключением технических файлов куки и файлов настроек (обязательных), которые обеспечивают полноценное и корректное функционирование Сайта, в том числе безопасность Пользователя при использовании Сайта.","item10":"5.6.2. Сайт запоминает выбор настроек файлов куки на 1 год. По окончании этого периода Сайт повторно запрашивает согласие Пользователя.","item11":"5.6.3. Изменение Пользователем выбора настроек файлов куки, а также отказ Пользователя от использования файлов куки до истечения срока, указанного в настоящей Политике, возможны в любое время в интерфейсе Сайта путем перехода по ссылке в подвале (нижней части страницы) Сайта в форму «Персональные настройки куки». Нажимая на кнопку «Принять выбранное» или «Принять все», Пользователь дает согласие на обработку файлов куки в соответствии с настоящей Политикой."},"num6":{"item1":"6.1. Большинство браузеров настроены на прием файлов куки. Поэтому для полноценной реализации права на отказ от обработки файлов куки Пользователь может отключить использование файлов куки путем изменения настроек браузера на своем устройстве.","item2":"Пользователь вправе удалить ранее сохраненные файлы куки, выбрав соответствующую опцию в истории браузера. Некоторые браузеры позволяют посещать сайты в режиме «инкогнито», чтобы ограничить хранимый на компьютере объем информации и автоматически удалять некоторые типы файлов куки.","item3":"6.2. Подробнее о параметрах управления куки можно ознакомиться, перейдя по внешним ссылкам, ведущим на соответствующие страницы сайтов основных браузеров:","item4":"Firefox","item5":"Chrome","item6":"Safari","item7":"Opera","item8":"MicrosoftEdge","item9":"Internet Explorer","item10":"О возможностях управления настройками других браузеров Пользователь может получить уточнения в документации их разработчиков, которыми Организация не располагает.","item11":"6.3. Пользователь может запретить хранение и использование данных, собираемых с помощью файлов куки сервиса веб-аналитики Google Analytics, воспользовавшись плагином, загрузка которого доступна по ссылке: https://tools.google.com/dlpage/gaoptout","item12":"6.4. Пользователь может запретить хранение и использование данных, собираемых с помощью файлов куки сервиса веб-аналитики Яндекс Метрика, воспользовавшись плагином, загрузка которого доступна по ссылке: https://yandex.com/support/metrica/general/opt-out.html","item13":"6.5. Поскольку файлы куки, используемые НП ООО «БЕРЛИО», позволяют Пользователю эффективно использовать функционал Сайта, персонализировать его содержание для предпочтений Пользователя, а также настраивать релевантную интересам Пользователя рекламу, мы рекомендуем оставить файлы куки включенными. Без использования функциональных и аналитических файлов куки НП ООО «БЕРЛИО» не сможет гарантировать Пользователю корректную работу Сайта."}},"buyersPrivacy":"Обработка персональных данных покупателей","buyersData":{"title":"ПОЛИТИКА","subTitle":"НП ООО «БЕРЛИО» в отношении обработки персональных данных физических лиц - представителей покупателей оборудования"},"buyersDataTitles":{"num1":"1. ОБЩИЕ ПОЛОЖЕНИЯ","num2":"2. ЦЕЛИ, ОБЪЕМ, ПРАВОВЫЕ ОСНОВАНИЯ И СРОКИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ","num3":"3. ПОРЯДОК И УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ ОПЕРАТОРОМ","num4":"4. ПРАВА СУБЪЕКТОВ ПЕРСОНАЛЬНЫХ ДАННЫХ И ОБЯЗАННОСТИ ОПЕРАТОРА ПО ИХ РЕАЛИЗАЦИИ","num5":"5. ОБЯЗАННОСТИ ОПЕРАТОРА И МЕРЫ, ПРИНИМАЕМЫЕ ПО ОБЕСПЕЧЕНИЮ ЗАЩИТЫ ПЕРСОНАЛЬНЫХ ДАННЫХ"},"buyersDataContent":{"num1":{"item1":"1.1. Издание Политики в отношении обработки персональных данных физических лиц - представителей покупателей оборудования (далее - Политика) является одной из обязательных принимаемых НП ООО «БЕРЛИО» мер по обеспечению защиты персональных данных, предусмотренных статьей 17 Закона Республики Беларусь от 07.05.2021 № 99- З «О защите персональных данных» (далее - Закон о защите персональных данных). Политика разработана в соответствии с Законом о защите персональных данных и иными актами законодательства Республики Беларусь, а также Уставом НП ООО «БЕРЛИО» в целях обеспечения защиты прав и свобод человека при обработке его персональных данных. Политика разъясняет субъектам персональных данных, каким образом и для каких целей их персональные данные собираются, используются или иным образом обрабатываются, а также отражает имеющиеся в связи с этим у субъектов персональных данных права и механизм их реализации.","item2":"1.2. Политика является локальным правовым актом НП ООО «БЕРЛИО» (далее - Оператор или Организация), регламентирующим отношения, связанные с защитой персональных данных при их обработке, осуществляемой: с использованием средств автоматизации; без использования средств автоматизации, если при этом обеспечиваются поиск персональных данных и (или) доступ к ним по определенным критериям (картотеки, списки, базы данных, журналы и др.).","item3":"1.3. Организация уделяет особое внимание защите персональных данных при их обработке и с уважением относится к соблюдению прав субъектов персональных данных. Обработка персональных данных Организацией как Оператором осуществляется в соответствии с Законом о защите персональных данных и настоящей Политикой.","item4":"1.4. Действие настоящей Политики не распространяется:","item5":"на обработку персональных данных работников, обучающихся, соискателей на трудоустройство, обратившихся лиц, подрядчиков, контрагентов, представителей контрагентов, заказчиков услуг, представителей заказчиков услуг в электронной платежной системе «БЕРЛИО», посетителей;","item6":"на обработку файлов куки;","item7":"на обработку персональных данных при применении видеонаблюдения;","item8":"на обработку персональных данных Организацией в качестве уполномоченного лица;","item9":"на отношения, касающиеся случаев обработки персональных данных физическими лицами в процессе исключительно личного, семейного, домашнего и иного подобного их использования, не связанного с профессиональной или предпринимательской деятельностью.","item10":"1.5. В Политике используются основные термины и их определения в значении, определенном статьей 1 Закона о защите персональных данных.","item11":"1.6. В Политике также используются следующие понятия в значении:","item12":"НП ООО «БЕРЛИО» (Оператор / Организация) – поставщик оборудования Организации;","item13":"сайт Оператора / Организация – веб-сайт НП ООО «БЕРЛИО»: https://www.berlio.by/;","item14":"покупатель оборудования – субъект хозяйствования – юридическое лицо, имеющее намерение заключить, заключающее или заключившее с Организацией договор поставки оборудования (терминалов и др.), в соответствии с которым наряду с поставкой оборудования Организацией также осуществляется его техническое обслуживание, организационное, информационное, техническое сопровождение исполнения договора;","item15":"представитель покупателя оборудования – представитель субъекта хозяйствования – юридического лица, имеющего намерение заключить, заключающего или заключившего с Организацией договор поставки оборудования:","item16":"работник покупателя оборудования, имеющий право заключения договора поставки оборудования с Организацией (в договорах и для целей их исполнения, а также в локальных правовых актах Организации именуется также «уполномоченное лицо»);","item17":"работник покупателя оборудования, являющийся ответственным лицом покупателя оборудования для коммуникации с Организацией по вопросам технического обслуживания поставленного Организацией оборудования, организационного, информационного, технического сопровождение исполнения договора;","item18":"работник оператора топливной системы – ОТС (АЗС, торговой точки), использующего поставленное Организацией оборудование.","item19":"1.7. Юридическим лицом, которое осуществляет обработку персональных данных, является НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55; сайт: https://www.berlio.by/; общий адрес электронной почты: berlio@berlio.by; общий телефон: +375(17)3691083 (Организация / Оператор).","item20":"1.8. Политика вступает в силу с момента утверждения. Во исполнение требований пункта 4 статьи 17 Закона о защите персональных данных Политика является общедоступным документом, размещается для свободного доступа в Организации, а также в сети Интернет на сайте Организации и предусматривает возможность ознакомления с Политикой любых лиц.","item21":"1.9. Организация как Оператор вправе при необходимости в одностороннем порядке вносить в Политику изменения и дополнения с последующим размещением новой редакции Политики в общедоступном месте в Организации и на сайте Организации, где субъекты самостоятельно получают информацию об изменениях Политики.","item22":"1.10. Требования Закона о защите персональных данных и Политики обязательны для исполнения всеми работниками и иными лицами, непосредственно осуществляющими обработку персональных данных."},"num2":{"item1":"2.1. Цели обработки персональных данных в Организации основываются на требованиях законодательства, осуществляемой Организацией деятельности, реализуемых бизнес- и иных процессах, положениях договоров.","item2":"2.2. Организация осуществляет обработку персональных данных субъектов персональных данных в целях, объеме (перечне), на правовых основаниях и в сроки, определенные в Реестре обработки персональных данных (приложение к настоящей Политике, ее неотъемлемая часть)."},"num3":{"item1":"3.1. Обработка персональных данных Оператором:","item2":"осуществляется в соответствии с требованиями законодательства Республики Беларусь как с использованием средств автоматизации, так и без использования таких средств;","item3":"осуществляется с учетом необходимости обеспечения защиты прав и свобод субъектов персональных данных на законной и справедливой основе;","item4":"ограничивается достижением конкретных, заранее определенных и законных целей, установленных в Реестре обработки персональных данных.","item5":"При обработке персональных данных:","item6":"обеспечиваются точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных; Оператором принимаются необходимые меры по удалению или уточнению неполных или неточных персональных данных;","item7":"не допускаются: обработка персональных данных, несовместимая с целями сбора персональных данных, установленными в Реестре обработки персональных данных; объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой; избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.","item8":"3.2. Обработка персональных данных Оператором осуществляется без согласия субъекта персональных данных в соответствии с правовыми основаниями, предусмотренными статьей 6 Закона о защите персональных данных и иными законодательными актами.","item9":"3.3. Обработка персональных данных в Организации осуществляется только работниками, которые в соответствии со своей трудовой функцией непосредственно осуществляют обработку персональных данных в Организации, и иными лицами, допущенными к обработке персональных данных в установленном порядке.","item10":"3.4. Работники Организации и иные лица, непосредственно осуществляющие обработку персональных данных, а также получившие доступ к персональным данным, обрабатываемым Организацией, обязаны выполнять требования законодательства о защите персональных данных и локальных правовых актов Организации в сфере обеспечения защиты персональных данных.","item11":"3.5. Организация как Оператор поручает обработку персональных данных уполномоченным лицам на основании договора, о чем заключает соглашения с уполномоченными лицами об обработке персональных данных в соответствии с требованиями статьи 7 Закона о защите персональных данных. При этом:","item12":"уполномоченное лицо обязано соблюдать требования к обработке персональных данных, предусмотренные Законом о защите персональных данных и иными актами законодательства;","item13":"в целях обеспечения защиты персональных данных при их обработке уполномоченными лицами на уровне не ниже, чем у Оператора: периодически осуществляется контроль за выполнением уполномоченными лицами мер по обеспечению защиты прав субъектов персональных данных при обработке их персональных данных по поручению Оператора; допускается привлечение уполномоченными лицами субуполномоченных лиц при условии письменного уведомления Оператора;","item14":"ответственность перед субъектом персональных данных за действия уполномоченного лица несет Организация как Оператор; уполномоченное лицо несет ответственность перед Организацией как Оператором.","item15":"3.6. Уполномоченными лицами, осуществляющими обработку персональных данных по поручению Организации как Оператора на основании договоров, являются / могут быть юридические лица / индивидуальные предприниматели, оказывающие услуги Организации:","item16":"по предоставлению и обслуживанию программного обеспечения автоматизации бухгалтерского учета – 1С: Бухгалтерия;","item17":"по предоставлению и обслуживанию программного обеспечения Битрикс 24;","item18":"хостинга;","item19":"электронной почты;","item20":"по техническому, организационному, информационному сопровождению электронного документооборота;","item21":"звукозаписи телефонных разговоров;","item22":"СМС-рассылки;","item23":"юридические;","item24":"по изготовлению, распространению (размещению на сайте Организации, в иных интернет-ресурсах) информационных, новостных и рекламных материалов Организации;","item25":"по организации / проведению рекламных и иных мероприятий и / или их информационному освещению.","item26":"3.7. Обработка персональных данных Организацией осуществляется путем:","item27":"получения персональных данных в устной или письменной форме на бумажном носителе либо в электронном виде непосредственно от субъектов персональных данных;","item28":"получения персональных данных от третьих лиц в порядке, установленном законодательством, а также в соответствии с договорами;","item29":"получения персональных данных из общедоступных источников;","item30":"обработки персональных данных в информационных ресурсах (системах), базах данных, реестрах, журналах и других документах Организации;","item31":"использования иных предусмотренных законодательством способов обработки персональных данных.","item32":"3.8. Не допускается раскрытие третьим лицам и распространение персональных данных без согласия субъекта персональных данных, если иное не предусмотрено законодательством.","item33":"3.9. Передача персональных данных государственным органам и организациям, в том числе правоохранительным органам и судам, а также иным организациям и учреждениям осуществляется в соответствии с требованиями законодательства Республики Беларусь (с согласия субъекта персональных данных, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами /при наличии иных правовых оснований обработки/).","item34":"3.10. Трансграничная передача персональных данных на территорию иностранного государства может осуществляться Организацией:","item35":"3.10.1. если на территории иностранного государства обеспечивается надлежащий уровень защиты прав субъектов персональных данных (государства-члены ЕврАзЭс; государства, являющиеся сторонами Конвенции Совета Европы от 28 января 1981 г. о защите физических лиц при автоматизированной обработке персональных данных) – без ограничений при наличии правовых оснований, предусмотренных Законом о защите персональных данных;","item36":"3.10.2. если на территории иностранного государства не обеспечивается надлежащий уровень защиты прав субъектов персональных данных (в том числе при трансграничной передаче персональных данных с использованием электронной почты, мессенджеров для переписки, социальных сетей для распространения информации, когда невозможно установить государство, куда осуществляется трансграничная передача персональных данных, и существует вероятность отсутствия в нем условий для обеспечения надлежащей защиты прав субъектов персональных данных) – в случаях, предусмотренных статьей 9 Закона о защите персональных данных, в том числе когда:","item37":"дано согласие субъекта персональных данных при условии, что субъект персональных данных проинформирован о рисках, возникающих в связи с отсутствием надлежащего уровня их защиты, либо","item38":"персональные данные получены на основании договора, заключенного (заключаемого) с субъектом персональных данных, в целях совершения действий, установленных этим договором, либо","item39":"персональные данные могут быть получены любым лицом посредством направления запроса в случаях и порядке, предусмотренных законодательством, либо","item40":"получено соответствующее разрешение Национального центра защиты персональных данных (далее – НЦЗПД).","item41":"3.11. При трансграничной передаче персональных данных на территорию иностранного государства, где не обеспечивается надлежащий уровень защиты прав субъектов персональных данных, существуют риски:","item42":"отсутствие законодательного регулирования защиты прав субъектов персональных данных;","item43":"отсутствие независимого уполномоченного / контролирующего органа по защите прав субъектов персональных данных;","item44":"отнесение к персональным данным ограниченного перечня сведений о субъекте;","item45":"ограниченный перечень / отсутствие прав субъектов персональных данных;","item46":"широкий доступ к персональным данным у органов государственной власти.","item47":"3.12. Оператор осуществляет обработку, в том числе хранение персональных данных, не дольше, чем этого требуют цели обработки персональных данных, в сроки, установленные в Реестре обработки персональных данных. Определенный срок обработки персональных данных может быть установлен законодательством Республики Беларусь, договором.","item48":"3.13. Обработка персональных данных прекращается при наступлении одного или нескольких из указанных событий (если отсутствуют иные правовые основания для обработки, предусмотренные Законом о защите персональных данных и иными законодательными актами):","item49":"поступление от субъекта персональных данных в установленном порядке требования о прекращении обработки его персональных данных и (или) их удалении;","item50":"достижение целей обработки персональных данных;","item51":"истечение срока хранения персональных данных;","item52":"обнаружение неправомерной обработки персональных данных;","item53":"по требованию Национального центра защиты персональных данных (НЦЗПД);","item54":"ликвидация Организации.","item55":"3.14. Хранение персональных данных осуществляется Оператором в соответствии с требованиями законодательства о защите персональных данных до достижения целей обработки персональных данных в сроки, установленные в Реестре обработки персональных данных. При этом:","item56":"документы на бумажных и иных материальных носителях, содержащие персональные данные, хранятся в помещениях и местах, позволяющих исключить к ним доступ посторонних лиц;","item57":"документы в электронной форме, содержащие персональные данные, хранятся в информационных ресурсах (системах) Организации с обязательным использованием паролей доступа и разграничением доступа;","item58":"документы в электронном виде, содержащие персональные данные, также могут храниться в облачном хранилище, защита которого обеспечивается собственником (владельцем, управляющим) данным интернет-ресурсом, с использованием паролей доступа.","item59":"3.15. Документы на бумажных и иных материальных носителях, содержащие персональные данные, а также персональные данные в электронной форме после прекращения обработки персональных данных уничтожаются / удаляются (блокируются) в соответствии с требованиями законодательства о защите персональных данных, иными актами законодательства и локальными правовыми актами Организации.","item60":""},"num4":{"item1":"4.1. Субъект персональных данных имеет право:","item2":"4.1.1. требовать бесплатного прекращения обработки своих персональных данных, включая их удаление, при отсутствии оснований для их обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item3":"4.1.2. получать информацию, касающуюся обработки своих персональных данных (при этом не должен обосновывать свой интерес к запрашиваемой информации), содержащую: наименование и место нахождения Организации; подтверждение факта обработки персональных данных Организацией (уполномоченным им лицом); его персональные данные и источник их получения; правовые основания и цели обработки персональных данных; срок, на который дано его согласие; наименование и место нахождения уполномоченного лица, которое является государственным органом, иной организацией, если обработка персональных данных поручена такому лицу; иную информацию, предусмотренную законодательством;","item4":"4.1.3. требовать внесения изменений в свои персональные данные в случае, если персональные данные являются неполными, устаревшими или неточными (с приложением соответствующих документов и (или) их заверенных в установленном порядке копий, подтверждающих необходимость внесения изменений в персональные данные);","item5":"4.1.4. получать информацию о предоставлении своих персональных данных третьим лицам один раз в календарный год бесплатно, если иное не предусмотрено Законом о защите персональных данных и иными законодательными актами.","item6":"4.2. Субъект персональных данных также имеет право обжаловать действия (бездействие) и принятые Организацией решения, нарушающие его права при обработке персональных данных, непосредственно в Организацию для принятия мер по восстановлению его нарушенных прав на почтовый адрес или адрес электронной почты, указанные в пункте 4.3. Политики, либо в Национальный центр защиты персональных данных в порядке, установленном законодательством об обращениях граждан и юридических лиц.","item7":"4.3. Субъект персональных данных для реализации прав, предусмотренных статьями 10–13 Закона о защите персональных данных и пунктом 4.1. Политики, подает в Организацию заявление в письменной форме либо в виде электронного документа (подписанного личной электронной цифровой подписью заявителя), оформленное в соответствии со статьей 14 Закона о защите персональных данных, на почтовые адреса центров обслуживания по месту заключения договоров:","item8":"Головной офис НП ООО «БЕРЛИО» (г. Минск):","item9":"220007 г. Минск, ул. Быховская, 55; email: dpo.minsk@berlio.by","item10":"Брестский филиал:","item11":"г. Брест, ул. К. Маркса, 33-43; email: dpo.brest@berlio.by","item12":"Витебский филиал:","item13":"г. Витебск, ул. Правды 37, корп. 2, 84; email: dpo.vitebsk@berlio.by","item14":"Гомельский филиал:","item15":"г. Гомель, ул. Речицкая, 1а-419; email: dpo.gomel@berlio.by","item16":"Гродненский филиал:","item17":"г. Гродно, ул. Победы, 17-7; email: dpo.grodno@berlio.by","item18":"Могилевский филиал:","item19":"г. Могилев, ул. Челюскинцев, 105 В; email: dpo.mogilev@berlio.by","item20":"4.4. Заявление субъекта персональных данных о реализации его прав должно содержать: его персональные данные – фамилию, собственное имя, отчество (если таковое имеется), адрес его места жительства (места пребывания), дату рождения, идентификационный номер (при отсутствии такого номера – номер документа, удостоверяющего личность субъекта персональных данных, если обработка осуществляется без согласия субъекта); изложение сути его требований; личную подпись либо электронную цифровую подпись.","item21":"4.5. За содействием в реализации своих прав субъект персональных данных может обратиться к лицу, ответственному за внутренний контроль, включая направление сообщения на email соответствующего филиала:","item22":"Минск:","item23":"dpo.minsk@berlio.by, тел.: +375(17)3691083","item24":"Брест:","item25":"dpo.brest@berlio.by, тел.: 8(0162)521215, 8(033)3721199","item26":"Витебск:","item27":"dpo.vitebsk@berlio.by, тел.: 8(029)6961196","item28":"Гомель:","item29":"dpo.gomel@berlio.by, тел.: 8(0232)509865, 8(033)3200034","item30":"Гродно:","item31":"dpo.grodno@berlio.by, тел.: 8(0152)316139","item32":"Могилев:","item33":"dpo.mogilev@berlio.by, тел.: 8(0222)767111","item34":"4.6. Ответ на заявление направляется в форме, соответствующей форме подачи заявления, если не указано иное.","item35":"4.7. Работники Организации обязаны на основании поданных субъектом заявлений:","item36":"4.7.1. В течение 15 дней прекратить обработку и удалить персональные данные по требованию субъекта; при невозможности — заблокировать и уведомить; отказ возможен при наличии оснований, с уведомлением в тот же срок.","item37":"4.7.2. В течение 5 рабочих дней предоставить информацию о персональных данных либо отказать с указанием причин, если иное не установлено законом.","item38":"4.7.3. В течение 15 дней внести изменения в персональные данные либо обоснованно отказать.","item39":"4.7.4. В течение 15 дней предоставить сведения о передаче данных третьим лицам за последний год либо отказать по основаниям, предусмотренным законом."},"num5":{"item1":"5.1. Оператор обязан:","item2":"разъяснять субъекту персональных данных его права;","item3":"получать согласие на обработку, если это необходимо;","item4":"обеспечивать защиту данных при обработке;","item5":"при изменении целей — получать согласие при отсутствии иных оснований;","item6":"обеспечивать актуальность и достоверность данных;","item7":"предоставлять субъекту информацию о данных и их передаче;","item8":"вносить изменения в устаревшие/некорректные данные;","item9":"удалять/блокировать данные при отсутствии оснований для обработки;","item10":"принимать меры по защите от неправомерного доступа, удаления, изменения и пр.;","item11":"обеспечивать доступ к Политике до начала обработки;","item12":"уведомлять НЦЗПД о нарушениях не позднее 3 рабочих дней;","item13":"удалять недостоверные данные по требованию НЦЗПД, если не установлен иной порядок;","item14":"исполнять требования НЦЗПД по устранению нарушений;","item15":"предоставлять НЦЗПД информацию для оценки законности обработки;","item16":"выполнять иные обязанности, предусмотренные законом.","item17":"5.2. Оператор самостоятельно определяет перечень мер, необходимых и достаточных для защиты персональных данных с учетом требований законодательства."}},"buyersApplicationTitle":"ПРИЛОЖЕНИЕ","buyersApplication":{"title":"Реестр обработки персональных данных (субъекты персональных данных: физические лица – представители покупателей оборудования).","item1":"Цели обработки персональных данных","item2":"Перечень обрабатываемых персональных данных","item3":"Перечень действий с персональными данными","item4":"Правовые основания обработки персональных данных","item5":"Срок хранения персональных данных","item6":"Подготовка, заключение, исполнение, изменение и расторжение договора поставки оборудования Организации (далее – договор)","item7":"Субъекты: Представители покупателей оборудования: фамилия, имя, отчество, должность, место работы, другая информация, предусмотренная законодательством и договором для заключения и исполнения договора (в том числе в представляемых для заключения договора документах юридического лица), номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты), сведения в электронной цифровой подписи работник ОТС: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты)","item8":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченным лицам, предоставляющим услуги программного обеспечения 1С: Бухгалтерия, Битрикс 24, электронного документооборота, электронной почты, СМС-рассылки, удаление","item9":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона «О защите персональных данных» (далее – Закон): - согласие не требуется «в процессе трудовой (служебной) деятельности субъекта» - законодательство о труде, гражданское законодательство - договор","item10":"на срок договора и 3 года после окончания срока действия договора и проведения налоговыми органами проверки соблюдения налогового законодательства. Если такая проверка не проводилась – 10 лет после окончания срока действия договора (п. 70 Перечня типовых документов … (утв. постановлением Министерства юстиции Республики Беларусь от 24.05.2012 № 140 (далее – Перечень))","item11":"Техническое обслуживание поставленного оборудования, организационное, информационное, техническое сопровождение исполнения договора","item12":"Субъекты: Представители покупателей оборудования: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты работник ОТС: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты","item13":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченным лицам, предоставляющим услуги программного обеспечения 1С: Бухгалтерия, Битрикс 24, электронного документооборота, электронной почты, удаление","item14":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона - законодательство о труде, гражданское законодательство - договор","item15":"на срок договора","item16":"Звукозапись телефонных разговоров работников (представителей) Организации с субъектом в соответствии с договором (в информационном ресурсе Организации)","item17":"фамилия, имя, отчество, должность, место работы, номер телефона","item18":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченному лицу, удаление","item19":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде, гражданское законодательство - договор","item20":"на срок договора","item21":"Отправка уведомлений субъекту в соответствии с договором","item22":"фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты","item23":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченным лицам, предоставляющим услуги электронного документооборота, электронной почты, СМС-рассылки, удаление","item24":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде, гражданское законодательство - договор","item25":"на срок договора","item26":"Обеспечение ведения бухгалтерского и налогового учета по договорам, составления первичных учетных документов","item27":"в объеме, предусмотренном законодательством о бухгалтерском учете, необходимом для достижения цели","item28":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченному лицу, предоставляющему услуги программного обеспечения 1С: Бухгалтерия, удаление","item29":"без согласия субъекта: абз. 20 ст. 6 Закона: - ст. 10 Закона «О бухгалтерском учете и отчетности»","item30":"на срок договора и 3 года после окончания срока действия договора и проведения налоговыми органами проверки соблюдения налогового законодательства. Если такая проверка не проводилась – 10 лет после окончания срока действия договора (п. 70 Перечня)","item31":"Взыскание задолженности, участие в досудебном и судебном разрешении споров","item32":"фамилия, имя, отчество, другая информация, предусмотренная гражданским и процессуальным законодательством, законодательством об исполнительном производстве","item33":"сбор, систематизация, хранение, использование, предоставление судам, органам, осуществляющим исполнительное производство, удаление","item34":"без согласия субъекта: абз. 3, 8, 15 ст. 6 Закона: - Гражданский кодекс, процессуальное законодательство, законодательство об исполнительном производстве","item35":"3 года / 10 лет после исполнения судебных постановлений (в соответствии с общим порядком применительно к договорам)","item36":"Направление в Национальный центр защиты персональных данных (НЦЗПД) уведомлений, информации, связанных с обработкой персональных данных Оператором","item37":"в соответствии с формой уведомления, утв. приказом директора НЦЗПД от 15.11.2021 № 13 «Об уведомлении о нарушениях систем защиты персональных данных», содержанием запроса НЦЗПД","item38":"сбор, систематизация, хранение, использование, предоставление НЦЗПД, удаление","item39":"без согласия субъекта: абз. 20 ст. 6, ст. 16, 18 Закона - п. 8, 26 Положения о Национальном центре защиты персональных данных (утв. Указом Президента Республики Беларусь от 28.10.2021 № 422) - приказ директора НЦЗПД от 15.11.2021 № 13 «Об уведомлении о нарушениях систем защиты персональных данных»","item40":"3 года (п. 33-3 Перечня)","item41":"Предоставление информации в соответствии с требованиями законодательства / по запросам (требованиям) органов внутренних дел, государственной безопасности, финансовых расследований, налоговых органов, прокуратуры","item42":"в соответствии с требованиями законодательства / содержанием запроса","item43":"сбор, систематизация, хранение, использование, предоставление запрашивающему органу, удаление","item44":"без согласия субъекта: абз. 20 ст. 6 Закона: - ст. 7, 24 Закона «Об органах внутренних дел Республики Беларусь» - ст. 15-18 Закона «Об органах государственной безопасности Республики Беларусь» - ст. 11 Закона «Об оперативно-розыскной деятельности» - ст. 6, 13 Закона «Об органах финансовых расследований Комитета государственного контроля Республики Беларусь» - гл. 10 Налогового кодекса Республики Беларусь (общая часть) - ст. 10, 27 Закона «О прокуратуре Республики Беларусь»","item45":"на период услуг (срока договора) и в течение 10 лет после прекращения договора (в течение срока давности привлечения к уголовной ответственности за тяжкие преступления)"},"b2bPrivacy":"Обработка персональных данных представителей заказчиков","b2bData":{"title":"ПОЛИТИКА","subTitle":"НП ООО «БЕРЛИО» в отношении обработки персональных данных физических лиц, представителей заказчиков услуг в электронной платежной системе «БЕРЛИО»"},"b2bDataTitles":{"num1":"1. ОБЩИЕ ПОЛОЖЕНИЯ","num2":"2. ЦЕЛИ, ОБЪЕМ, ПРАВОВЫЕ ОСНОВАНИЯ И СРОКИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ","num3":"3. ПОРЯДОК И УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ ОПЕРАТОРОМ","num4":"4. ПРАВА СУБЪЕКТОВ ПЕРСОНАЛЬНЫХ ДАННЫХ И ОБЯЗАННОСТИ ОПЕРАТОРА ПО ИХ РЕАЛИЗАЦИИ","num5":"5. ОБЯЗАННОСТИ ОПЕРАТОРА И МЕРЫ, ПРИНИМАЕМЫЕ ОПЕРАТОРОМ ПО ОБЕСПЕЧЕНИЮ ЗАЩИТЫ ПЕРСОНАЛЬНЫХ ДАННЫХ"},"b2bDataContent":{"num1":{"item1":"1.1. Издание Политики в отношении обработки персональных данных физических лиц - заказчиков услуг, представителей заказчиков услуг в электронной платежной системе «БЕРЛИО» (далее - Политика) является одной из обязательных принимаемых НП ООО «БЕРЛИО» мер по обеспечению защиты персональных данных, предусмотренных статьей 17 Закона Республики Беларусь от 07.05.2021 № 99-3 «О защите персональных данных» (далее - Закон о защите персональных данных). Политика разработана в соответствии с Законом о защите персональных данных и иными актами законодательства Республики Беларусь, а также Уставом НП ООО «БЕРЛИО» в целях обеспечения защиты прав и свобод человека при обработке его персональных данных. Политика разъясняет субъектам персональных данных, каким образом и для каких целей их персональные данные собираются, используются или иным образом обрабатываются, а также отражает имеющиеся в связи с этим у субъектов персональных данных права и механизм их реализации.","item2":"1.2. Политика является локальным правовым актом НП ООО «БЕРЛИО» (далее - Оператор или Организация), регламентирующим отношения, связанные с защитой персональных данных при их обработке, осуществляемой: с использованием средств автоматизации; без использования средств автоматизации, если при этом обеспечиваются поиск персональных данных и (или) доступ к ним по определенным критериям (картотеки, списки, базы данных, журналы и др.).","item3":"1.3. Организация уделяет особое внимание защите персональных данных при их обработке и с уважением относится к соблюдению прав субъектов персональных данных. Обработка персональных данных Организацией как Оператором осуществляется в соответствии с Законом о защите персональных данных и настоящей Политикой.","item4":"1.4. Действие настоящей Политики не распространяется:","item5":"на обработку персональных данных работников, обучающихся, соискателей на трудоустройство, обратившихся лиц, подрядчиков, контрагентов, представителей контрагентов, заказчиков услуг, представителей заказчиков услуг в электронной платежной системе «БЕРЛИО», посетителей;","item6":"на обработку файлов куки;","item7":"на обработку персональных данных при применении видеонаблюдения;","item8":"на обработку персональных данных Организацией в качестве уполномоченного лица;","item9":"на отношения, касающиеся случаев обработки персональных данных физическими лицами в процессе исключительно личного, семейного, домашнего и иного подобного их использования, не связанного с профессиональной или предпринимательской деятельностью.","item10":"1.5. В Политике используются основные термины и их определения в значении, определенном статьей 1 Закона о защите персональных данных.","item11":"1.6. В Политике также используются следующие понятия в значении:","item12":"НП ООО «БЕРЛИО» (Оператор /в соответствии с законодательством о персональных данных/ или Организация) – поставщик платежных услуг в электронной платежной системе «БЕРЛИО», в том числе с использованием мобильного приложения «Berlio internet client» (далее – ЭПС), собственником (владельцем) которой является НП ООО «БЕРЛИО»; в договорах и для целей их исполнения, а также в локальных правовых актах НП ООО «БЕРЛИО» применительно к ЭПС и отношениям с заказчиками услуг и другими участниками ЭПС именуется также «Оператор»;","item13":"сайт Оператора / Организация – веб-сайт НП ООО «БЕРЛИО»: https://www.berlio.by/;","item14":"заказчик услуг – субъект хозяйствования – юридическое лицо, иная организация, индивидуальный предприниматель, которому Организация в соответствии с законодательством о платежных системах, договором присоединения, иными договорами (в настоящей Политике – «договоры») предоставляет платежные услуги в электронной платежной системе «БЕРЛИО» (ЭПС); в договорах и для целей их исполнения, а также в локальных правовых актах Организации заказчик услуг именуется также «Клиент»;","item15":"представитель заказчика услуг:","item16":"работник заказчика услуг, имеющий право заключения договора с Организацией о предоставлении услуг в ЭПС (в договорах и для целей их исполнения, а также в локальных правовых актах Организации именуется также «уполномоченное лицо»);","item17":"работник заказчика услуг, являющийся ответственным лицом заказчика услуг для коммуникации с Организацией и совершения организационных действий в рамках услуг в ЭПС;","item18":"представитель заказчика услуг – индивидуального предпринимателя, действующий на основании доверенности;","item19":"пользователь:","item20":"работник заказчика услуг, получивший (получающий) доступ к ЭПС и имеющий право пользования услугами, совершения операций с электронными деньгами и иных действий от имени заказчика услуг в ЭПС; сведения о пользователе предоставляет Организации заказчик услуг (его представитель) и / или сам пользователь (в договорах и для целей их исполнения, а также в локальных правовых актах Организации именуется также «уполномоченное лицо»);","item21":"индивидуальный предприниматель – заказчик услуг, получивший (получающий) доступ к ЭПС и имеющий право пользования услугами, совершения операций с электронными деньгами и иных действий в ЭПС от своего имени;","item22":"руководитель, лицо, осуществляющее руководство бухгалтерским учетом, учредитель (участник, член), бенефициарный владелец юридического лица – заказчика услуг.","item23":"1.7. Юридическим лицом, которое осуществляет обработку персональных данных, является НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55; сайт: https://www.berlio.by/; общий адрес электронной почты: berlio@berlio.by; общий телефон: +375(17)3691083 (Организация / Оператор).","item24":"1.8. Политика вступает в силу с момента утверждения. Во исполнение требований пункта 4 статьи 17 Закона о защите персональных данных Политика является общедоступным документом, размещается для свободного доступа в Организации, а также в сети Интернет на сайте Организации и предусматривает возможность ознакомления с Политикой любых лиц.","item25":"1.9. Организация как Оператор вправе при необходимости в одностороннем порядке вносить в Политику изменения и дополнения с последующим размещением новой редакции Политики в общедоступном месте в Организации и на сайте Организации, где субъекты самостоятельно получают информацию об изменениях Политики.","item26":"1.10. Требования Закона о защите персональных данных и Политики обязательны для исполнения всеми работниками и иными лицами, непосредственно осуществляющими обработку персональных данных."},"num2":{"item1":"2.1. Цели обработки персональных данных в Организации основываются на требованиях законодательства, осуществляемой Организацией деятельности, реализуемых бизнес- и иных процессах, положениях договоров.","item2":"2.2. Организация осуществляет обработку персональных данных субъектов персональных данных в целях, объеме (перечне), на правовых основаниях и в сроки, определенные в Реестре обработки персональных данных (приложение к настоящей Политике, ее неотъемлемая часть)."},"num3":{"item1":"3.1. Обработка персональных данных Оператором:","item2":"осуществляется в соответствии с требованиями законодательства Республики Беларусь как с использованием средств автоматизации, так и без использования таких средств;","item3":"осуществляется с учетом необходимости обеспечения защиты прав и свобод субъектов персональных данных на законной и справедливой основе;","item4":"ограничивается достижением конкретных, заранее определенных и законных целей, установленных в Реестре обработки персональных данных.","item5":"При обработке персональных данных:","item6":"обеспечиваются точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных; Оператором принимаются необходимые меры по удалению или уточнению неполных или неточных персональных данных;","item7":"не допускаются: обработка персональных данных, несовместимая с целями сбора персональных данных, установленными в Реестре обработки персональных данных; объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой; избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.","item8":"3.2. Обработка персональных данных Оператором осуществляется без согласия субъекта персональных данных в соответствии с правовыми основаниями, предусмотренными статьей 6 Закона о защите персональных данных и иными законодательными актами.","item9":"3.3. Обработка персональных данных в Организации осуществляется только работниками, которые в соответствии со своей трудовой функцией непосредственно осуществляют обработку персональных данных в Организации, и иными лицами, допущенными к обработке персональных данных в установленном порядке.","item10":"3.4. Работники Организации и иные лица, непосредственно осуществляющие обработку персональных данных, а также получившие доступ к персональным данным, обрабатываемым Организацией, обязаны выполнять требования законодательства о защите персональных данных и локальных правовых актов Организации в сфере обеспечения защиты персональных данных.","item11":"3.5. Организация как Оператор поручает обработку персональных данных уполномоченным лицам на основании договора, о чем заключает соглашения с уполномоченными лицами об обработке персональных данных в соответствии с требованиями статьи 7 Закона о защите персональных данных. При этом:","item12":"уполномоченное лицо обязано соблюдать требования к обработке персональных данных, предусмотренные Законом о защите персональных данных и иными актами законодательства;","item13":"в целях обеспечения защиты персональных данных при их обработке уполномоченными лицами на уровне не ниже, чем у Оператора: периодически осуществляется контроль за выполнением уполномоченными лицами мер по обеспечению защиты прав субъектов персональных данных при обработке их персональных данных по поручению Оператора; допускается привлечение уполномоченными лицами субуполномоченных лиц при условии письменного уведомления Оператора;","item14":"ответственность перед субъектом персональных данных за действия уполномоченного лица несет Организация как Оператор; уполномоченное лицо несет ответственность перед Организацией как Оператором.","item15":"3.6. Уполномоченными лицами, осуществляющими обработку персональных данных по поручению Организации как Оператора на основании договоров, являются / могут быть юридические лица / индивидуальные предприниматели, оказывающие услуги Организации:","item16":"по предоставлению и обслуживанию программного обеспечения автоматизации бухгалтерского учета – 1С: Бухгалтерия;","item17":"по предоставлению и обслуживанию программного обеспечения Битрикс 24;","item18":"хостинга;","item19":"электронной почты;","item20":"по техническому, организационному, информационному сопровождению электронного документооборота;","item21":"звукозаписи телефонных разговоров;","item22":"СМС-рассылки;","item23":"юридические;","item24":"по изготовлению, распространению (размещению на сайте Организации, в иных интернет-ресурсах) информационных, новостных и рекламных материалов Организации;","item25":"по организации / проведению рекламных и иных мероприятий и / или их информационному освещению.","item26":"3.7. Обработка персональных данных Организацией осуществляется путем:","item27":"получения персональных данных в устной или письменной форме на бумажном носителе либо в электронном виде непосредственно от субъектов персональных данных;","item28":"получения персональных данных от третьих лиц в порядке, установленном законодательством, а также в соответствии с договорами;","item29":"получения персональных данных из общедоступных источников;","item30":"обработки персональных данных в информационных ресурсах (системах), базах данных, реестрах, журналах и других документах Организации;","item31":"использования иных предусмотренных законодательством способов обработки персональных данных.","item32":"3.8. Не допускается раскрытие третьим лицам и распространение персональных данных без согласия субъекта персональных данных, если иное не предусмотрено законодательством.","item33":"3.9. Передача персональных данных государственным органам и организациям, в том числе правоохранительным органам и судам, а также иным организациям и учреждениям осуществляется в соответствии с требованиями законодательства Республики Беларусь (с согласия субъекта персональных данных, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами /при наличии иных правовых оснований обработки/).","item34":"3.10. Трансграничная передача персональных данных на территорию иностранного государства может осуществляться Организацией:","item35":"3.10.1. если на территории иностранного государства обеспечивается надлежащий уровень защиты прав субъектов персональных данных (государства-члены ЕврАзЭс; государства, являющиеся сторонами Конвенции Совета Европы от 28 января 1981 г. о защите физических лиц при автоматизированной обработке персональных данных) – без ограничений при наличии правовых оснований, предусмотренных Законом о защите персональных данных;","item36":"3.10.2. если на территории иностранного государства не обеспечивается надлежащий уровень защиты прав субъектов персональных данных (в том числе при трансграничной передаче персональных данных с использованием электронной почты, мессенджеров для переписки, социальных сетей для распространения информации, когда невозможно установить государство, куда осуществляется трансграничная передача персональных данных, и существует вероятность отсутствия в нем условий для обеспечения надлежащей защиты прав субъектов персональных данных) – в случаях, предусмотренных статьей 9 Закона о защите персональных данных, в том числе когда:","item37":"дано согласие субъекта персональных данных при условии, что субъект персональных данных проинформирован о рисках, возникающих в связи с отсутствием надлежащего уровня их защиты, либо","item38":"персональные данные получены на основании договора, заключенного (заключаемого) с субъектом персональных данных, в целях совершения действий, установленных этим договором, либо","item39":"персональные данные могут быть получены любым лицом посредством направления запроса в случаях и порядке, предусмотренных законодательством, либо","item40":"получено соответствующее разрешение Национального центра защиты персональных данных (далее – НЦЗПД).","item41":"3.11. При трансграничной передаче персональных данных на территорию иностранного государства, где не обеспечивается надлежащий уровень защиты прав субъектов персональных данных, существуют риски:","item42":"отсутствие законодательного регулирования защиты прав субъектов персональных данных;","item43":"отсутствие независимого уполномоченного / контролирующего органа по защите прав субъектов персональных данных;","item44":"отнесение к персональным данным ограниченного перечня сведений о субъекте;","item45":"ограниченный перечень / отсутствие прав субъектов персональных данных;","item46":"широкий доступ к персональным данным у органов государственной власти.","item47":"3.12. Оператор осуществляет обработку, в том числе хранение персональных данных, не дольше, чем этого требуют цели обработки персональных данных, в сроки, установленные в Реестре обработки персональных данных. Определенный срок обработки персональных данных может быть установлен законодательством Республики Беларусь, договором.","item48":"3.13. Обработка персональных данных прекращается при наступлении одного или нескольких из указанных событий (если отсутствуют иные правовые основания для обработки, предусмотренные Законом о защите персональных данных и иными законодательными актами):","item49":"поступление от субъекта персональных данных в установленном порядке требования о прекращении обработки его персональных данных и (или) их удалении;","item50":"достижение целей обработки персональных данных;","item51":"истечение срока хранения персональных данных;","item52":"обнаружение неправомерной обработки персональных данных;","item53":"по требованию Национального центра защиты персональных данных (НЦЗПД);","item54":"ликвидация Организации.","item55":"3.14. Хранение персональных данных осуществляется Оператором в соответствии с требованиями законодательства о защите персональных данных до достижения целей обработки персональных данных в сроки, установленные в Реестре обработки персональных данных. При этом:","item56":"документы на бумажных и иных материальных носителях, содержащие персональные данные, хранятся в помещениях и местах, позволяющих исключить к ним доступ посторонних лиц;","item57":"документы в электронной форме, содержащие персональные данные, хранятся в информационных ресурсах (системах) Организации с обязательным использованием паролей доступа и разграничением доступа;","item58":"документы в электронном виде, содержащие персональные данные, также могут храниться в облачном хранилище, защита которого обеспечивается собственником (владельцем, управляющим) данным интернет-ресурсом, с использованием паролей доступа.","item59":"3.15. Документы на бумажных и иных материальных носителях, содержащие персональные данные, а также персональные данные в электронной форме после прекращения обработки персональных данных уничтожаются / удаляются (блокируются) в соответствии с требованиями законодательства о защите персональных данных, иными актами законодательства и локальными правовыми актами Организации."},"num4":{"item1":"4.1. Субъект персональных данных имеет право:","item2":"4.1.1. требовать бесплатного прекращения обработки своих персональных данных, включая их удаление, при отсутствии оснований для их обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item3":"4.1.2. получать информацию, касающуюся обработки своих персональных данных (при этом не должен обосновывать свой интерес к запрашиваемой информации), содержащую: наименование и место нахождения Организации; подтверждение факта обработки персональных данных Организацией (уполномоченным им лицом); его персональные данные и источник их получения; правовые основания и цели обработки персональных данных; срок, на который дано его согласие; наименование и место нахождения уполномоченного лица, которое является государственным органом, иной организацией, если обработка персональных данных поручена такому лицу; иную информацию, предусмотренную законодательством;","item4":"4.1.3. требовать внесения изменений в свои персональные данные в случае, если персональные данные являются неполными, устаревшими или неточными (с приложением соответствующих документов и (или) их заверенных в установленном порядке копий, подтверждающих необходимость внесения изменений в персональные данные);","item5":"4.1.4. получать информацию о предоставлении своих персональных данных третьим лицам один раз в календарный год бесплатно, если иное не предусмотрено Законом о защите персональных данных и иными законодательными актами.","item6":"4.2. Субъект персональных данных также имеет право обжаловать действия (бездействие) и принятые Организацией решения, нарушающие его права при обработке персональных данных, непосредственно в Организацию для принятия мер по восстановлению его нарушенных прав на почтовый адрес или адрес электронной почты, указанные в пункте 4.3. Политики, либо в Национальный центр защиты персональных данных в порядке, установленном законодательством об обращениях граждан и юридических лиц.","item7":"4.3. Субъект персональных данных для реализации прав, предусмотренных статьями 10–13 Закона о защите персональных данных и пунктом 4.1. Политики, подает в Организацию заявление в письменной форме либо в виде электронного документа (подписанного личной электронной цифровой подписью заявителя), оформленное в соответствии со статьей 14 Закона о защите персональных данных, на почтовые адреса центров обслуживания по месту заключения договоров:","item8":"Головной офис НП ООО «БЕРЛИО» (г. Минск):","item9":"220007 г. Минск, ул. Быховская, 55; email: dpo.minsk@berlio.by","item10":"Брестский филиал:","item11":"г. Брест, ул. К. Маркса, 33-43; email: dpo.brest@berlio.by","item12":"Витебский филиал:","item13":"г. Витебск, ул. Правды 37, корп. 2, 84; email: dpo.vitebsk@berlio.by","item14":"Гомельский филиал:","item15":"г. Гомель, ул. Речицкая, 1а-419; email: dpo.gomel@berlio.by","item16":"Гродненский филиал:","item17":"г. Гродно, ул. Победы, 17-7; email: dpo.grodno@berlio.by","item18":"Могилевский филиал:","item19":"г. Могилев, ул. Челюскинцев, 105 В; email: dpo.mogilev@berlio.by","item20":"4.4. Заявление субъекта персональных данных о реализации его прав должно содержать: его персональные данные – фамилию, собственное имя, отчество (если таковое имеется), адрес его места жительства (места пребывания), дату рождения, идентификационный номер (при отсутствии такого номера – номер документа, удостоверяющего личность субъекта персональных данных, если обработка осуществляется без согласия субъекта); изложение сути его требований; личную подпись либо электронную цифровую подпись.","item21":"4.5. За содействием в реализации своих прав субъект персональных данных может обратиться к лицу, ответственному за внутренний контроль, включая направление сообщения на email соответствующего филиала:","item22":"Минск:","item23":"dpo.minsk@berlio.by, тел.: +375(17)3691083","item24":"Брест:","item25":"dpo.brest@berlio.by, тел.: 8(0162)521215, 8(033)3721199","item26":"Витебск:","item27":"dpo.vitebsk@berlio.by, тел.: 8(029)6961196","item28":"Гомель:","item29":"dpo.gomel@berlio.by, тел.: 8(0232)509865, 8(033)3200034","item30":"Гродно:","item31":"dpo.grodno@berlio.by, тел.: 8(0152)316139","item32":"Могилев:","item33":"dpo.mogilev@berlio.by, тел.: 8(0222)767111","item34":"4.6. Ответ на заявление субъекта персональных данных о реализации его прав, предусмотренных пунктом 4.1. Политики, направляется субъекту персональных данных в форме, соответствующей форме подачи заявления, если в самом заявлении не указано иное.","item35":"4.7. Работники Организации, непосредственно осуществляющие обработку персональных данных, обязаны на основании поданного субъектом персональных данных:","item36":"4.7.1. заявления, содержащего требования о бесплатном прекращении обработки своих персональных данных, включая их удаление, в пятнадцатидневный срок после получения заявления:","item37":"прекратить обработку персональных данных, а также осуществить их удаление (обеспечить прекращение обработки персональных данных, а также их удаление уполномоченным лицом) и уведомить об этом субъекта персональных данных;","item38":"при отсутствии технической возможности удаления персональных данных принять меры по недопущению дальнейшей обработки персональных данных, включая их блокирование, и уведомить об этом субъекта персональных данных в тот же срок;","item39":"Оператор вправе отказать субъекту персональных данных в удовлетворении требований о прекращении обработки его персональных данных и (или) их удалении при наличии оснований для обработки персональных данных, предусмотренных Законом о защите персональных данных и иными законодательными актами, в том числе если они являются необходимыми для заявленных целей их обработки, с уведомлением об этом субъекта персональных данных в пятнадцатидневный срок;","item40":"4.7.2. заявления о получении информации, касающейся обработки персональных данных, в течение пяти рабочих дней после его получения, если иной срок не установлен законодательными актами, предоставить субъекту персональных данных в доступной форме эту информацию, либо уведомить его о причинах отказа в ее предоставлении; информация не предоставляется субъекту персональных данных в случаях, предусмотренных частью 3 статьи 11 Закона о защите персональных данных;","item41":"4.7.3. заявления, содержащего требования о внесении изменений в свои персональные данные, в пятнадцатидневный срок после его получения внести соответствующие изменения в персональные данные и уведомить об этом субъекта персональных данных либо уведомить его о причинах отказа во внесении таких изменений, если иной порядок внесения изменений в персональные данные не установлен законодательными актами;","item42":"4.7.4. заявления о получении информации о предоставлении своих персональных данных третьим лицам в пятнадцатидневный срок после его получения предоставить субъекту персональных данных информацию о том, какие его персональные данные и кому предоставлялись в течение года, предшествовавшего дате подачи заявления, либо уведомить субъекта персональных данных о причинах отказа в ее предоставлении; указанная информация может не предоставляться в случаях, предусмотренных пунктом 3 статьи 11 Закона о защите персональных данных, а также если обработка персональных данных осуществляется в соответствии с законодательством об исполнительном производстве, при осуществлении правосудия и организации деятельности судов общей юрисдикции."},"num5":{"item1":"5.1. Оператор обязан:","item2":"разъяснять субъекту персональных данных его права, связанные с обработкой персональных данных;","item3":"получать согласие субъекта персональных данных на их обработку, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами (при наличии иных правовых оснований обработки);","item4":"обеспечивать защиту данных при обработке;","item5":"при изменении целей — получать согласие при отсутствии иных оснований;","item6":"обеспечивать защиту персональных данных в процессе их обработки;","item7":"в случае необходимости изменения первоначально заявленных целей обработки персональных данных получить согласие субъекта персональных данных на обработку его персональных данных в соответствии с измененными целями обработки персональных данных при отсутствии иных оснований для такой обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item8":"принимать меры по обеспечению достоверности обрабатываемых им персональных данных, при необходимости обновлять их;","item9":"предоставлять субъекту персональных данных информацию о его персональных данных, а также о предоставлении его персональных данных третьим лицам, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item10":"вносить изменения в персональные данные, которые являются неполными, устаревшими или неточными, за исключением случаев, когда иной порядок внесения изменений в персональные данные установлен законодательными актами либо если цели обработки персональных данных не предполагают последующих изменений таких данных;","item11":"прекращать обработку персональных данных, а также осуществлять их удаление или блокирование (обеспечивать прекращение обработки персональных данных, а также их удаление или блокирование уполномоченным лицом) при отсутствии оснований для обработки персональных данных, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item12":"принимать правовые, организационные и технические меры по обеспечению защиты персональных данных от несанкционированного или случайного доступа к ним, изменения, блокирования, копирования, распространения, предоставления, удаления персональных данных, а также от иных неправомерных действий в отношении персональных данных;","item13":"обеспечить неограниченный доступ в том числе с использованием сети Интернет, к Политике до начала обработки персональных данных;","item14":"уведомлять НЦЗПД о нарушениях систем защиты персональных данных незамедлительно, но не позднее трех рабочих дней после того, как Оператору стало известно о таких нарушениях, за исключением случаев, предусмотренных НЦЗПД;","item15":"осуществлять изменение, блокирование или удаление недостоверных или полученных незаконным путем персональных данных субъекта персональных данных по требованию НЦЗПД, если иной порядок внесения изменений в персональные данные, их блокирования или удаления не установлен законодательными актами;","item16":"исполнять иные требования НЦЗПД об устранении нарушений законодательства о персональных данных;","item17":"предоставлять НЦЗПД информацию, необходимую для определения законности действий Операторов (уполномоченных лиц);","item18":"выполнять иные обязанности, предусмотренные Законом о защите персональных данных и др. законодательными актами.","item19":"5.2. Оператор определяет состав и перечень мер, необходимых и достаточных для выполнения обязанностей по обеспечению защиты персональных данных, с учетом требований Закона о защите персональных данных и иных актов законодательства."}},"b2bApplicationTitle":"ПРИЛОЖЕНИЕ","b2bApplication":{"title":"Реестр обработки персональных данных (субъекты персональных данных: физические лица – представители покупателей оборудования).","item1":"Цели обработки персональных данных","item2":"Перечень обрабатываемых персональных данных","item3":"Перечень действий с персональными данными","item4":"Правовые основания обработки персональных данных","item5":"Срок хранения персональных данных","item6":"Подготовка, заключение, исполнение, изменение и расторжение договора с Организацией о предоставлении услуг в электронной платежной системе «БЕРЛИО», в том числе с использованием мобильного приложения «Berlio internet client» (ЭПС) (далее – договор), включая идентификацию заказчика услуг, представителя заказчика услуг и проверку достоверности данных","item7":"Субъекты: Представители заказчиков услуг – юридических лиц: фамилия, имя, отчество, должность, место работы, другая информация, предусмотренная законодательством и договором для заключения и исполнения договора (в том числе в представляемых для заключения договора документах юридического лица), номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты), сведения в электронной цифровой подписи. Индивидуальные предприниматели: фамилия, имя, отчество, паспортные данные, место регистрации / жительства, банковские реквизиты для перечисления оплаты услуг, УНП, другая информация, предусмотренная законодательством и договором для заключения и исполнения договора, номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты), сведения в электронной цифровой подписи. Представители заказчиков услуг – индивидуальных предпринимателей: фамилия, имя, отчество, сведения в доверенности, номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты). Пользователи услуг – представители юридических лиц: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты)","item8":"услуги программного обеспечения 1С: Бухгалтерия, Битрикс 24, электронного документооборота, электронной почты, СМС-рассылки, удаление","item9":"от 05.12.2022 № 453 «Об утверждении Инструкции о порядке оказания платежных услуг на территории Республики Беларусь», от 16.09.2022 № 350 «Об утверждении Правил осуществления операций с электронными деньгами» (далее – законодательство о платежных системах) - договор присоединения (с приложениями – Правилами ЭПС, Правилами обслуживания клиента в ЭПС и др.) - иные отдельно заключаемые договоры (далее – договор) для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - согласие не требуется «при получении персональных данных оператором на основании договора, заключенного (заключаемого) с субъектом персональных данных, в целях совершения действий, установленных этим договором» - законодательство о платежных системах -договор","item10":" ","item11":"Идентификация заказчика услуг, представителя заказчика услуг при совершении финансовых операций","item12":"субъект: руководитель, лицо, осуществляющее руководство бухгалтерским учетом, учредитель (участник, член), бенефициарный владелец юридического лица – заказчика услуг, индивидуального предпринимателя – заказчика услуг, пользователя ЭПС: фамилия, имя, отчество, дата и место рождения, гражданство, место жительства и (или) место пребывания, реквизиты документа, удостоверяющего личность, и (или) иного документа, на основании которого проводится идентификация, данные о выгодоприобретателе (при наличии), иные данные, определяемые Национальным банком в целях формирования межбанковской системы идентификации","item13":"сбор, систематизация, хранение, использование, предоставление в орган финансового мониторинга, удаление","item14":"без согласия субъекта: для представителей юридических лиц – абз. 5, 8 ст. 6 Закона: - согласие не требуется «при реализации норм законодательства в области национальной безопасности, о борьбе с коррупцией, о предотвращении легализации доходов, полученных преступным путем, финансирования террористической деятельности и финансирования распространения оружия массового поражения» для индивидуальных предпринимателей – абз. 20 ст. 6 Закона: - согласие не требуется «в случаях, когда обработка персональных данных является необходимой для выполнения обязанностей (полномочий), предусмотренных законодательными актами» - ст. 8 Закона «О мерах по предотвращению легализации доходов, полученных преступным путем, финансирования террористической деятельности и финансирования распространения оружия массового поражения» - иные акты законодательства о ПОД/ФТ - законодательство о платежных системах","item15":"на период услуг (срока договора) и в течение 10 лет после прекращения договора","item16":"Предоставление пользователю услуг доступа к ЭПС (в том числе с использованием мобильного приложения «Berlio internet client»), ее использование и хранение информации в личном кабинете: сбор сообщенных представителем заказчика услуг сведений о пользователе, регистрация заказчика услуг, пользователя в ЭПС, создание личного кабинета пользователя и пользование им, заполнение регистрационной карточки для регистрации в ЭПС, открытие и обслуживание лицевого счета заказчика услуг, авторизация, идентификация, аутентификация, верификация пользователя в ЭПС","item17":"Пользователь – работник заказчика услуг: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты, номера средств доступа, логин, пароль. Пользователь – индивидуальный предприниматель, его представитель: фамилия, имя, отчество, адрес регистрации, номер телефона, адрес электронной почты, номера средств доступа, логин, пароль.","item18":"сбор, систематизация, хранение, использование, удаление","item19":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item20":"предоставление пользователю услуг доступа к ЭПС, ее использование – на период услуг (срока договора) хранение информации в информационном ресурсе Организации – на период услуг (срока договора) и в течение 10 лет после прекращения договора","item21":"Звукозапись телефонных разговоров работников (представителей) Организации с субъектом в соответствии с договором (в информационном ресурсе Организации)","item22":"фамилия, имя, отчество, должность, место работы, номер телефона","item23":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченному лицу, удаление","item24":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде, гражданское законодательство - договор","item25":"на срок договора","item26":"Совершение платежных операций в ЭПС","item27":"номер средства доступа","item28":"сбор, систематизация, хранение, использование, предоставление агентам платежной системы, банку-эмитенту, ГУ «Белавтострада», ИООО «Капш Телематик Сервисиз» (взимание платы за проезд), удаление","item29":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item30":"на период услуг (срока договора) и в течение 10 лет после прекращения договора - ст. 10 Закона «О платежных системах и платежных услугах»: хранение информации о платежных операциях в течение сроков, установленных законодательством для хранения информации об операциях, совершаемых физ. лицами, юрид. лицами в бел. руб., законодательством о ПОД/ФТ","item31":"Возврат субъекту (плательщику) денежных средств (электронных денег) получателем денежных средств (электронных денег) в случаях, установленных пунктом 5 ст. 10 Закона «О платежных системах и платежных услугах»","item32":"номер средства доступа","item33":"сбор, систематизация, хранение, использование, предоставление агентам платежной системы и банку-эмитенту, удаление","item34":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item35":"на период услуг (срока договора) и в течение 10 лет после прекращения договора","item36":"Предоставление субъекту (плательщику), получателю платежа и иным поставщикам платежных услуг информации по платежным операциям осуществляемого платежа и их деталям в соответствии с пунктом 3 ст. 10 Закона «О платежных системах и платежных услугах»","item37":"номер средства доступа","item38":"сбор, систематизация, хранение, использование, предоставление субъекту (плательщику), получателю платежа и иным поставщикам платежных услуг, удаление","item39":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах для индивидуальных предпринимателей – абз. 20 ст. 6 Закона: - законодательство о платежных системах","item40":"на период услуг (срока договора)","item41":"Оказание представителю заказчика услуг, пользователю: технической, организационной, информационной поддержки (сопровождения) пользования ЭПС, в том числе путем рассылки информации о функционировании ЭПС в личном кабинете, на адрес электронной почты и смс-сообщений","item42":"Представитель заказчика услуг, пользователь – работник заказчика услуг: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты, номера средства доступа, логин, пароль. Пользователь – индивидуальный предприниматель, его представитель: фамилия, имя, отчество, адрес регистрации, номер телефона, адрес электронной почты, номера электронных карт, логин, пароль.","item43":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченным лицам, предоставляющим услуги электронной почты, СМС-рассылки, удаление","item44":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item45":"на период услуг (срока договора)","item46":"Звукозапись телефонных разговоров работников (представителей) Организации с субъектом в соответствии с договором (в информационном ресурсе Организации)","item47":"фамилия, имя, отчество, должность, место работы, номер телефона","item48":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченному лицу, удаление","item49":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item50":"на период услуг (срока договора)","item51":"Отправка уведомлений субъекту в соответствии с договором","item52":"сведения в личном кабинете пользователя, номер телефона, адрес электронной почты","item53":"сбор, систематизация, хранение, использование, предоставление, поручение для обработки уполномоченным лицам, предоставляющим услуги электронного документооборота, электронной почты, СМС-рассылки, удаление","item54":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item55":"на период услуг (срока договора)","item56":"Обеспечение ведения бухгалтерского и налогового учета по оказанным Организацией услугам в соответствии с договором, составления первичных учетных документов","item57":"в объеме, предусмотренном законодательством о бухгалтерском учете, необходимом для достижения цели","item58":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченному лицу, предоставляющему услуги программного обеспечения 1С: Бухгалтерия, удаление","item59":"без согласия субъекта: абз. 20 ст. 6 Закона: - ст. 10 Закона «О бухгалтерском учете и отчетности»","item60":"на период услуг (срока договора) и 3 года после проведения налоговыми органами проверки соблюдения налогового законодательства. Если такая проверка не проводилась – 10 лет (п. 70 Перечня)","item61":"Взыскание задолженности, участие в досудебном и судебном разрешении споров","item62":"фамилия, имя, отчество, другая информация, предусмотренная гражданским и процессуальным законодательством, законодательством об исполнительном производстве","item63":"сбор, систематизация, хранение, использование, предоставление судам, органам, осуществляющим исполнительное производство, удаление","item64":"без согласия субъекта: абз. 3, 8, 15 ст. 6 Закона: - Гражданский кодекс, процессуальное законодательство, законодательство об исполнительном производстве","item65":"3 года / 10 лет после исполнения судебных постановлений (в соответствии с общим порядком применительно к договорам)","item66":"Направление в Национальный центр защиты персональных данных (НЦЗПД) уведомлений, информации, связанных с обработкой персональных данных Оператором","item67":"в соответствии с формой уведомления, утв. приказом директора НЦЗПД от 15.11.2021 № 13 «Об уведомлении о нарушениях систем защиты персональных данных», содержанием запроса НЦЗПД","item68":"сбор, систематизация, хранение, использование, предоставление НЦЗПД, удаление","item69":"без согласия субъекта: абз. 20 ст. 6, ст. 16, 18 Закона - п. 8, 26 Положения о Национальном центре защиты персональных данных (утв. Указом Президента Республики Беларусь от 28.10.2021 № 422) - приказ директора НЦЗПД от 15.11.2021 № 13 «Об уведомлении о нарушениях систем защиты персональных данных»","item70":"3 года (п. 33-3 Перечня)","item71":"Предоставление информации в соответствии с требованиями законодательства / по запросам (требованиям) органов внутренних дел, государственной безопасности, финансовых расследований, налоговых органов, прокуратуры","item72":"в соответствии с требованиями законодательства / содержанием запроса","item73":"сбор, систематизация, хранение, использование, предоставление запрашивающему органу, удаление","item74":"без согласия субъекта: абз. 20 ст. 6 Закона: - ст. 7, 24 Закона «Об органах внутренних дел Республики Беларусь» - ст. 15-18 Закона «Об органах государственной безопасности Республики Беларусь» - ст. 11 Закона «Об оперативно-розыскной деятельности» - Указ Президента Республики Беларусь от 18.10.2022 № 368 «О взаимодействии операторов электросвязи, поставщиков услуг электросвязи и владельцев интернет-ресурсов с органами, осуществляющими оперативно-розыскную деятельность» - ст. 6, 13 Закона «Об органах финансовых расследований Комитета государственного контроля Республики Беларусь» - гл. 10 Налогового кодекса Республики Беларусь (общая часть) - ст. 10, 27 Закона «О прокуратуре Республики Беларусь»","item75":"на период услуг (срока договора) и в течение 10 лет после прекращения договора (в течение срока давности привлечения к уголовной ответственности за тяжкие преступления)"},"applicantsPrivacy":"Обработка персональных данных соискателей","applicantsInformationTitle":"ИНФОРМАЦИЯ,","applicantsInformationSubTitle1":"предоставляемая субъекту – соискателю на трудоустройство до получения согласия на обработку персональных данных","applicantsInformationSubTitle2":"(в соответствии с пунктом 5 статьи 5 Закона Республики Беларусь «О защите персональных данных»)","applicantsConsentTitle":"СОГЛАСИЕ","applicantsConsentSubTitle1":"предоставляемое субъекту – соискателю на трудоустройство до получения согласия на обработку персональных данных","applicantsData":{"title":"ПОЛИТИКА","subTitle":"НП ООО «БЕРЛИО» в отношении обработки персональных данных соискателей на трудоустройство"},"applicantsApplicationTitle":"ПРИЛОЖЕНИЕ","applicantsInfoTitles":{"num1":"1. Наименование и место нахождения оператора,","num2":"2. Цели обработки персональных данных, перечни обрабатываемых персональных данных и действий с ними, на совершение которых получается согласие:","num3":"3. Срок,","num4":"4. Общее описание используемых способов обработки персональных данных:","num5":"5. Права, связанные с обработкой персональных данных, и механизм реализации таких прав.","num6":"6. Последствия дачи согласия субъекта персональных данных или отказа в даче такого согласия.","num7":"7. Иная информация,","num8":"8. Информация об уполномоченных лицах:"},"applicantsInfoContent":{"num1":{"item1":"получающего согласие субъекта персональных данных: НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55 (Организация / Оператор)."},"num2":{"item1":"В целях:","item2":"Перечень обрабатываемых персональных данных","item3":"Перечень действий с персональными данными","item4":"Поиск, сбор, в том числе на сайте Организации, рассмотрение и иная обработка информации (резюме) соискателя на трудоустройство, обеспечение коммуникации с субъектом представителей Организации, проведение собеседования, возможное оформление с соискателем трудовых отношений, информирование об отказе в трудоустройстве","item5":"В соответствии со ст. 26 Трудового кодекса Республики Беларусь (далее – ТК) и иными актами законодательства; иная информация, сообщенная о себе субъектом, в том числе об опыте и местах работы, номер телефона, адрес электронной почты","item6":"сбор, системати-зация, хранение, использова-ние, удаление","item7":"Формирование и ведение базы (резерва) соискателей на трудоустройство","item8":"фамилия, имя, отчество, дата рождения, сведения об образовании, номер телефона, адрес электронной почты, иная информация, предусмотренная анкетой (резюме), сообщенная о себе субъектом","item9":"сбор, системати-зация, хранение, использова-ние, удаление","item10":"В других случаях и целях обработка персональных данных осуществляется без согласия субъекта при наличии иных правовых оснований, предусмотренных статьями 6 и 8 Закона о защите персональных данных."},"num3":{"item1":"на который дается согласие субъекта персональных данных: в случае отказа в приеме на работу – 1 год."},"num4":{"item1":"Обработка персональных данных осуществляется путем: получения персональных данных в устной или письменной форме, иным способом непосредственно от субъектов персональных данных; получения персональных данных из общедоступных источников; обработки персональных данных в информационных ресурсах (системах), базах данных, реестрах, журналах и других документах Оператора; использования иных предусмотренных законодательством способов обработки персональных данных, указанных в таблице."},"num5":{"item1":"Субъект персональных данных имеет право:","item2":"в любое время без объяснения причин отозвать свое согласие на обработку персональных данных;","item3":"требовать бесплатного прекращения обработки своих персональных данных, включая их удаление, при отсутствии оснований для их обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item4":"получать информацию, касающуюся обработки своих персональных данных (при этом не должен обосновывать свой интерес к запрашиваемой информации), содержащую: наименование и место нахождения Оператора; подтверждение факта обработки персональных данных Оператором (уполномоченным им лицом); его персональные данные и источник их получения; правовые основания и цели обработки персональных данных; срок, на который дано его согласие; наименование и место нахождения уполномоченного лица, если обработка персональных данных поручена такому лицу; иную информацию, предусмотренную законодательством;","item5":"требовать внесения изменений в свои персональные данные в случае, если они являются неполными, устаревшими или неточными (с приложением соответствующих документов и (или) их заверенных в установленном порядке копий, подтверждающих необходимость внесения изменений в персональные данные);","item6":"получать информацию о предоставлении своих персональных данных третьим лицам один раз в календарный год бесплатно, если иное не предусмотрено Законом о защите персональных данных и иными законодательными актами;","item7":"обжаловать действия (бездействие) и принятые Оператором решения, нарушающие его права при обработке персональных данных, в Национальный центр защиты персональных данных (НЦЗПД) как уполномоченный орган по защите прав субъектов персональных данных в порядке, установленном законодательством об обращениях граждан и юридических лиц; принятое НЦЗПД решение может быть обжаловано субъектом в суд в порядке, установленном законодательством.","item8":"Субъект персональных данных для реализации прав, предусмотренных статьями 10–13 Закона о защите персональных данных, подает Оператору заявление в письменной форме либо в виде электронного документа, оформленное в соответствии со статьей 14 Закона о защите персональных данных, на указанный выше почтовый адрес Оператора либо на электронную почту, указанную в Политике.","item9":"Заявление субъекта должно содержать: его персональные данные – фамилию, имя, отчество, адрес его места жительства (места пребывания), дату рождения, идентификационный номер; изложение сути его требований; его личную подпись либо электронную цифровую подпись.","item10":"Ответ на заявление направляется Оператором субъекту персональных данных в форме, соответствующей форме подачи заявления, если в самом заявлении не указано иное, в сроки, установленные Законом о защите персональных данных."},"num6":{"item1":"Последствием дачи согласия на обработку персональных данных будет являться совершение Оператором действий или совокупности действий с персональными данными субъекта в заявленных Оператором в настоящей Информации целях обработки и объеме персональных данных в соответствии с текстом Согласия субъекта на обработку персональных данных.","item2":"В случае отказа субъекта в даче согласия на обработку его персональных данных Оператор сможет обрабатывать персональные данные субъекта только в случаях и в целях, предусмотренных статьями 6 и 8 Закона о защите персональных данных, когда получение согласия субъекта не требуется."},"num7":{"item1":"необходимая для обеспечения прозрачности процесса обработки персональных данных: вся информация изложена в Политике Оператора в отношении обработки персональных данных, размещенной в общедоступном месте."},"num8":{"item1":"Уполномоченным лицам обработка персональных данных субъектов не поручается."}},"applicantsConsent":{"item1":"Я, ознакомившись с Информацией, предоставляемой субъекту до получения согласия на обработку его персональных данных, в соответствии со статьей 5 Закона Республики Беларусь «О защите персональных данных» даю свое согласие НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55 (далее – Организация / Оператор) на обработку моих персональных данных (согласие оформляется путем простановки «галочки» на сайте Организации):","item2":"в целях:","list1":{"item1":"поиск, сбор, в том числе на сайте Организации, рассмотрение и инаяобработка информации (резюме) соискателя на трудоустройство, обеспечение коммуникации с субъектом представителей Организации, проведение собеседования, возможное оформление с соискателем трудовых отношений, информирование об отказе в трудоустройстве;","item2":"формирование и ведение базы (резерва) соискателей натрудоустройство;"},"item3":"перечень обрабатываемых персональных данных: в соответствии со ст. 26 Трудового кодекса Республики Беларусь и иными актами законодательства; фамилия, имя, отчество, дата рождения, сведения об образовании, номер телефона, адрес электронной почты, иная информация, предусмотренная анкетой (резюме), сообщенная о себе субъектом;","item4":"перечень действий с персональными данными: сбор, систематизация, хранение, использование, удаление.","item5":"Согласие предоставляется на 1 год (в случае отказа в приеме на работу).","item6":"Мне разъяснены и понятны:","list2":{"item1":"мои права, связанные с обработкой персональных данных, механизм их реализации, а также последствия дачи мною согласия или отказа в даче такого согласия;","item2":"то, что настоящее согласие может быть отозвано мной в любой момент в порядке, установленном Законом Республики Беларусь «О защите персональных данных»;","item3":"что при отзыве мной согласия Оператор вправе продолжить обработку моих персональных данных только в случаях, предусмотренных Законом Республики Беларусь «О защите персональных данных» (при наличии правовых оснований)."}},"applicantsTitles":{"num1":"1. ОБЩИЕ ПОЛОЖЕНИЯ","num2":"2. ЦЕЛИ, ОБЪЕМЫ, ПРАВОВЫЕ ОСНОВАНИЯ И СРОКИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ","num3":"3. ПОРЯДОК И УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ ОПЕРАТОРОМ","num4":"4. ПРАВА СУБЪЕКТОВ ПЕРСОНАЛЬНЫХ ДАННЫХ И ОБЯЗАННОСТИ ОПЕРАТОРА ПО ИХ РЕАЛИЗАЦИИ","num5":"5. ОБЯЗАННОСТИ ОПЕРАТОРА И МЕРЫ, ПРИНИМАЕМЫЕ ОПЕРАТОРОМ ПО ОБЕСПЕЧЕНИЮ ЗАЩИТЫ ПЕРСОНАЛЬНЫХ ДАННЫХ"},"applicantsContent":{"num1":{"item1":"1.1. Издание Политики в отношении обработки персональных данных физических лиц - заказчиков услуг, представителей заказчиков услуг в электронной платежной системе «БЕРЛИО» (далее - Политика) является одной из обязательных принимаемых НП ООО «БЕРЛИО» мер по обеспечению защиты персональных данных, предусмотренных статьей 17 Закона Республики Беларусь от 07.05.2021 № 99-3 «О защите персональных данных» (далее - Закон о защите персональных данных). Политика разработана в соответствии с Законом о защите персональных данных и иными актами законодательства Республики Беларусь, а также Уставом НП ООО «БЕРЛИО» в целях обеспечения защиты прав и свобод человека при обработке его персональных данных. Политика разъясняет субъектам персональных данных, каким образом и для каких целей их персональные данные собираются, используются или иным образом обрабатываются, а также отражает имеющиеся в связи с этим у субъектов персональных данных права и механизм их реализации.","item2":"1.2. Политика является локальным правовым актом НП ООО «БЕРЛИО» (далее - Оператор или Организация), регламентирующим отношения, связанные с защитой персональных данных при их обработке, осуществляемой: с использованием средств автоматизации; без использования средств автоматизации, если при этом обеспечиваются поиск персональных данных и (или) доступ к ним по определенным критериям (картотеки, списки, базы данных, журналы и др.).","item3":"1.3. Организация уделяет особое внимание защите персональных данных при их обработке и с уважением относится к соблюдению прав субъектов персональных данных. Обработка персональных данных Организацией как Оператором осуществляется в соответствии с Законом о защите персональных данных и настоящей Политикой.","item4":"1.4. Действие настоящей Политики не распространяется:","item5":"на обработку персональных данных работников, обучающихся, обратившихся лиц, подрядчиков, контрагентов, представителей контрагентов физических лиц – заказчиков услуг, представителей заказчиков услуг, посетителей;","item6":"на обработку файлов куки;","item7":"на обработку персональных данных при применении видеонаблюдения;","item8":"на обработку персональных данных Организацией в качестве уполномоченного лица;","item9":"на отношения, касающиеся случаев обработки персональных данных физическими лицами в процессе исключительно личного, семейного, домашнего и иного подобного их использования, не связанного с профессиональной или предпринимательской деятельностью.","item10":"1.5. В Политике используются основные термины и их определения в значении, определенном статьей 1 Закона о защите персональных данных.","item11":"1.6. В Политике также используются следующие понятия в значении:","item12":"сайт Оператора / Организация – веб-сайт НП ООО «БЕРЛИО»: https://www.berlio.by/;","item13":"соискатель на трудоустройство – физическое лицо, имеющее намерение предоставить, или предоставляющее, или предоставившее свои персональные данные (в виде резюме или иным образом) для целей трудоустройства в Организацию, а равно персональные данные которого собирает и обрабатывает Организация в тех же целях.","item14":"1.7. Юридическим лицом, которое осуществляет обработку персональных данных, является НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55; сайт: https://www.berlio.by/; общий адрес электронной почты: berlio@berlio.by; общий телефон: +375(17)3691083 (Организация / Оператор).","item15":"1.8. Политика вступает в силу с момента утверждения. Во исполнение требований пункта 4 статьи 17 Закона о защите персональных данных Политика является общедоступным документом, размещается для свободного доступа в Организации, а также в сети Интернет на сайте Организации и предусматривает возможность ознакомления с Политикой любых лиц.","item16":"1.9. Организация как Оператор вправе при необходимости в одностороннем порядке вносить в Политику изменения и дополнения с последующим размещением новой редакции Политики в общедоступном месте в Организации и на сайте Организации, где субъекты самостоятельно получают информацию об изменениях Политики.","item17":"1.10. Требования Закона о защите персональных данных и Политики обязательны для исполнения всеми работниками и иными лицами, непосредственно осуществляющими обработку персональных данных."},"num2":{"item1":"2.1. Цели обработки персональных данных в Организации основываются на требованиях законодательства, осуществляемой Организацией деятельности, реализуемых бизнес- и иных процессах, положениях договоров.","item2":"2.2. Организация осуществляет обработку персональных данных субъектов персональных данных в целях, объеме (перечне), на правовых основаниях и в сроки, определенные в Реестре обработки персональных данных (приложение к настоящей Политике, ее неотъемлемая часть)."},"num3":{"item1":"3.1. Обработка персональных данных Оператором: осуществляется в соответствии с требованиями законодательства Республики Беларусь как с использованием средств автоматизации, так и без использования таких средств; осуществляется с учетом необходимости обеспечения защиты прав и свобод субъектов персональных данных на законной и справедливой основе; ограничивается достижением конкретных, заранее определенных и законных целей, установленных в Реестрах обработки персональных данных. При обработке персональных данных:","item2":"обеспечиваются точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных; Оператором принимаются необходимые меры по удалению или уточнению неполных или неточных персональных данных;","item3":"не допускаются: обработка персональных данных, несовместимая с целями сбора персональных данных, установленными в Реестрах обработки персональных данных; объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой; избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.","item4":"3.2. Обработка персональных данных Оператором осуществляется с согласия субъекта персональных данных, за исключением случаев, предусмотренных статьями 6 и 8 Закона о защите персональных данных и иными законодательными актами (то есть при наличии иных правовых оснований обработки).","item5":"3.3. Согласие субъекта персональных данных представляет собой свободное, однозначное, информированное выражение его воли, посредством которого он разрешает Организации обработку своих персональных данных. Форма и содержание согласия на обработку персональных данных разрабатываются Организацией с учетом конкретных целей обработки персональных данных (при отсутствии иных правовых оснований обработки персональных данных). До получения согласия Организация предоставляет субъекту персональных данных информацию, предусмотренную пунктом 5 статьи 5 Закона о защите персональных данных, отдельно от иной предоставляемой ему информации.","item6":"3.4. Согласие на обработку персональных данных:","item7":"3.4.1. предоставляется субъектом Организации в письменной форме путем собственноручного подписания согласия раздельно на не связанные между собой цели обработки персональных данных; согласие может быть отозвано в письменной форме путем подачи в Организацию соответствующего заявления.","item8":"3.4.2. может предоставляться субъектом Организации в электронной форме посредством проставления соответствующей отметки («галочки»), подтверждающей согласие, на сайте Организации, раздельно на не связанные между собой цели обработки персональных данных; там же на сайте согласие может быть отозвано субъектом в электронной форме.","item9":"3.5. Субъект персональных данных при даче своего согласия Оператору:","item10":"в письменном виде – указывает свои фамилию, имя, отчество, дату согласия и ставит подпись;","item11":"в электронном виде – указывает свои фамилию, имя, отчество, иные сведения, предусмотренные регистрационной формой на сайте Организации.","item12":"3.6. Обработка персональных данных в Организации осуществляется только работниками, которые в соответствии со своей трудовой функцией непосредственно осуществляют обработку персональных данных в Организации, и иными лицами, допущенными к обработке персональных данных в установленном порядке.","item13":"3.7. Работники Организации и иные лица, непосредственно осуществляющие обработку персональных данных, а также получившие доступ к персональным данным, обрабатываемым Организацией, обязаны выполнять требования законодательства о защите персональных данных и локальных правовых актов Организации в сфере обеспечения защиты персональных данных.","item14":"3.8. Уполномоченным лицам обработка персональных данных субъектов данной Политики не поручается.","item15":"3.9. Обработка персональных данных Организацией осуществляется путем:","item16":"получения персональных данных в устной или письменной форме непосредственно от субъектов персональных данных;","item17":"получения персональных данных от третьих лиц в порядке, установленном законодательством, а также в соответствии с договорами;","item18":"получения персональных данных из общедоступных источников;","item19":"обработки персональных данных в информационных ресурсах (системах), базах данных, реестрах, журналах и других документах Организации;","item20":"использования иных предусмотренных законодательством способов обработки персональных данных.","item21":"3.10. Не допускается раскрытие третьим лицам и распространение персональных данных без согласия субъекта персональных данных, если иное не предусмотрено законодательством.","item22":"3.11. Передача персональных данных государственным органам и организациям, в том числе правоохранительным органам и судам, а также иным организациям и учреждениям осуществляется в соответствии с требованиями законодательства Республики Беларусь (с согласия субъекта персональных данных, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами /при наличии иных правовых оснований обработки/).","item23":"3.12. Трансграничная передача персональных данных на территорию иностранного государства может осуществляться Организацией:","item24":"3.13. Оператор осуществляет обработку, в том числе хранение персональных данных, не дольше, чем этого требуют цели обработки персональных данных, в сроки, установленные в Реестре обработки персональных данных. Определенный срок обработки персональных данных может быть установлен законодательством Республики Беларусь, договором.","item25":"3.14. Обработка персональных данных прекращается при наступлении одного или нескольких из указанных событий (если отсутствуют иные правовые основания для обработки, предусмотренные Законом о защите персональных данных и иными законодательными актами):","item26":"поступление от субъекта персональных данных в установленном порядке отзыва согласия на обработку его персональных данных;","item27":"поступление от субъекта персональных данных в установленном порядке требования о прекращении обработки его персональных данных и (или) их удалении;","item28":"достижение целей обработки персональных данных;","item29":"истечение срока хранения персональных данных;","item30":"обнаружение неправомерной обработки персональных данных;","item31":"по требованию Национального центра защиты персональных данных (НЦЗПД);","item32":"ликвидация Организации.","item33":"3.15. Хранение персональных данных осуществляется Оператором в соответствии с требованиями законодательства о защите персональных данных до достижения целей обработки персональных данных в сроки, установленные в Реестре обработки персональных данных. При этом:","item34":"документы на бумажных и иных материальных носителях, содержащие персональные данные, хранятся в помещениях и местах, позволяющих исключить к ним доступ посторонних лиц;","item35":"документы в электронной форме, содержащие персональные данные, хранятся в информационных ресурсах (системах) Организации с обязательным использованием паролей доступа и разграничением доступа;","item36":"документы в электронном виде, содержащие персональные данные, также могут храниться в облачном хранилище, защита которого обеспечивается собственником (владельцем, управляющим) данным интернет-ресурсом, с использованием паролей доступа.","item37":"3.16. Документы на бумажных и иных материальных носителях, содержащие персональные данные, а также персональные данные в электронной форме после прекращения обработки персональных данных уничтожаются / удаляются (блокируются) в соответствии с требованиями законодательства о защите персональных данных, иными актами законодательства и локальными правовыми актами Организации."},"num4":{"item1":"4.1. Субъект персональных данных имеет право:","item2":"4.1.1. в любое время без объяснения причин отозвать свое согласие на обработку персональных данных;","item3":"4.1.2. требовать бесплатного прекращения обработки своих персональных данных, включая их удаление, при отсутствии оснований для их обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item4":"4.1.3. получать информацию, касающуюся обработки своих персональных данных (при этом не должен обосновывать свой интерес к запрашиваемой информации), содержащую: наименование и место нахождения Организации; подтверждение факта обработки персональных данных Организацией (уполномоченным им лицом); его персональные данные и источник их получения; правовые основания и цели обработки персональных данных; срок, на который дано его согласие; наименование и место нахождения уполномоченного лица, которое является государственным органом, иной организацией, если обработка персональных данных поручена такому лицу; иную информацию, предусмотренную законодательством;","item5":"4.1.4. требовать внесения изменений в свои персональные данные в случае, если персональные данные являются неполными, устаревшими или неточными (с приложением соответствующих документов и (или) их заверенных в установленном порядке копий, подтверждающих необходимость внесения изменений в персональные данные);","item6":"4.1.5. получать информацию о предоставлении своих персональных данных третьим лицам один раз в календарный год бесплатно, если иное не предусмотрено Законом о защите персональных данных и иными законодательными актами.","item7":"4.2. Субъект персональных данных также имеет право обжаловать действия (бездействие) и принятые Организацией решения, нарушающие его права при обработке персональных данных, непосредственно в Организацию для принятия мер по восстановлению его нарушенных прав на почтовый адрес или адрес электронной почты, указанные в пункте 4.3. Политики, либо в Национальный центр защиты персональных данных в порядке, установленном законодательством об обращениях граждан и юридических лиц.","item8":"4.3. Субъект персональных данных для реализации прав, предусмотренных статьями 10–13 Закона о защите персональных данных и пунктом 4.1. Политики, подает в Организацию заявление в письменной форме либо в виде электронного документа (подписанного личной электронной цифровой подписью заявителя), оформленное в соответствии со статьей 14 Закона о защите персональных данных, на почтовые адреса центров обслуживания по месту заключения договоров:","item9":"Головной офис НП ООО «БЕРЛИО» (г. Минск):","item10":"220007 г. Минск, ул. Быховская, 55; email: dpo.minsk@berlio.by","item11":"Брестский филиал:","item12":"г. Брест, ул. К. Маркса, 33-43; email: dpo.brest@berlio.by","item13":"Витебский филиал:","item14":"г. Витебск, ул. Правды 37, корп. 2, 84; email: dpo.vitebsk@berlio.by","item15":"Гомельский филиал:","item16":"г. Гомель, ул. Речицкая, 1а-419; email: dpo.gomel@berlio.by","item17":"Гродненский филиал:","item18":"г. Гродно, ул. Победы, 17-7; email: dpo.grodno@berlio.by","item19":"Могилевский филиал:","item20":"г. Могилев, ул. Челюскинцев, 105 В; email: dpo.mogilev@berlio.by","item21":"4.4. Заявление субъекта персональных данных о реализации его прав должно содержать: его персональные данные – фамилию, собственное имя, отчество (если таковое имеется), адрес его места жительства (места пребывания), дату рождения, идентификационный номер (при отсутствии такого номера – номер документа, удостоверяющего личность субъекта персональных данных, если обработка осуществляется без согласия субъекта); изложение сути его требований; личную подпись либо электронную цифровую подпись.","item22":"4.5. За содействием в реализации своих прав субъект персональных данных может обратиться к лицу, ответственному за внутренний контроль, включая направление сообщения на email соответствующего филиала:","item23":"Минск:","item24":"dpo.minsk@berlio.by, тел.: +375(17)3691083","item25":"Брест:","item26":"dpo.brest@berlio.by, тел.: 8(0162)521215, 8(033)3721199","item27":"Витебск:","item28":"dpo.vitebsk@berlio.by, тел.: 8(029)6961196","item29":"Гомель:","item30":"dpo.gomel@berlio.by, тел.: 8(0232)509865, 8(033)3200034","item31":"Гродно:","item32":"dpo.grodno@berlio.by, тел.: 8(0152)316139","item33":"Могилев:","item34":"dpo.mogilev@berlio.by, тел.: 8(0222)767111","item35":"4.6. Ответ на заявление субъекта персональных данных о реализации его прав, предусмотренных пунктом 4.1. Политики, направляется субъекту персональных данных в форме, соответствующей форме подачи заявления, если в самом заявлении не указано иное.","item36":"4.7. Работники Организации, непосредственно осуществляющие обработку персональных данных, обязаны на основании поданного субъектом персональных данных:","item37":"4.7.1. заявления об отзыве своего согласия на обработку персональных данных в пятнадцатидневный срок после получения заявления:","item38":"в соответствии с содержанием заявления прекратить обработку персональных данных, осуществить их удаление и уведомить об этом субъекта персональных данных, если отсутствуют иные основания для таких действий с персональными данными, предусмотренные Законом о защите персональных данных и иными законодательными актами;","item39":"при отсутствии технической возможности удаления персональных данных принять меры по недопущению их дальнейшей обработки, включая их блокирование, и уведомить об этом субъекта персональных данных в тот же срок.","item40":"4.7.2. заявления, содержащего требования о бесплатном прекращении обработки своих персональных данных, включая их удаление, в пятнадцатидневный срок после получения заявления:","item41":"прекратить обработку персональных данных, а также осуществить их удаление (обеспечить прекращение обработки персональных данных, а также их удаление уполномоченным лицом) и уведомить об этом субъекта персональных данных;","item42":"при отсутствии технической возможности удаления персональных данных принять меры по недопущению дальнейшей обработки персональных данных, включая их блокирование, и уведомить об этом субъекта персональных данных в тот же срок;","item43":"Оператор вправе отказать субъекту персональных данных в удовлетворении требований о прекращении обработки его персональных данных и (или) их удалении при наличии оснований для обработки персональных данных, предусмотренных Законом о защите персональных данных и иными законодательными актами, в том числе если они являются необходимыми для заявленных целей их обработки, с уведомлением об этом субъекта персональных данных в пятнадцатидневный срок;","item44":"4.7.3. заявления о получении информации, касающейся обработки персональных данных, в течение пяти рабочих дней после его получения, если иной срок не установлен законодательными актами, предоставить субъекту персональных данных в доступной форме эту информацию, либо уведомить его о причинах отказа в ее предоставлении; информация не предоставляется субъекту персональных данных в случаях, предусмотренных частью 3 статьи 11 Закона о защите персональных данных;","item45":"4.7.4. заявления, содержащего требования о внесении изменений в свои персональные данные, в пятнадцатидневный срок после его получения внести соответствующие изменения в персональные данные и уведомить об этом субъекта персональных данных либо уведомить его о причинах отказа во внесении таких изменений, если иной порядок внесения изменений в персональные данные не установлен законодательными актами;","item46":"4.7.5. заявления о получении информации о предоставлении своих персональных данных третьим лицам в пятнадцатидневный срок после его получения предоставить субъекту персональных данных информацию о том, какие его персональные данные и кому предоставлялись в течение года, предшествовавшего дате подачи заявления, либо уведомить субъекта персональных данных о причинах отказа в ее предоставлении; указанная информация может не предоставляться в случаях, предусмотренных пунктом 3 статьи 11 Закона о защите персональных данных, а также если обработка персональных данных осуществляется в соответствии с законодательством об исполнительном производстве, при осуществлении правосудия и организации деятельности судов общей юрисдикции."},"num5":{"item1":"5.1. Оператор обязан:","item2":"разъяснять субъекту персональных данных его права, связанные с обработкой персональных данных;","item3":"получать согласие субъекта персональных данных на их обработку, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами (при наличии иных правовых оснований обработки);","item4":"до получения согласия субъекта персональных данных в письменной либо электронной форме, соответствующей форме выражения такого согласия, предоставить субъекту персональных данных информацию,содержащую: наименование и место нахождения Оператора, получающего согласие субъекта персональных данных; цели обработки персональных данных; перечень персональных данных, на обработку которых дается согласие субъекта персональных данных; срок, на который дается согласие субъекта персональных данных; информацию об уполномоченных лицах в случае, если обработка персональных данных будет осуществляться такими лицами; перечень действий с персональными данными, на совершение которых дается согласие субъекта персональных данных, общее описание используемых Оператором способов обработки персональных данных; иную информацию, необходимую для обеспечения прозрачности процесса обработки персональных данных;","item5":"до получения согласия субъекта персональных данных простым и ясным языком разъяснить субъекту персональных данных его права, связанные с обработкой персональных данных, механизм реализации таких прав, а также последствия дачи согласия субъекта персональных данных или отказа в даче такого согласия; эта информация должна быть предоставлена Оператором субъекту персональных данных в письменной либо электронной форме, соответствующей форме выражения его согласия, отдельно от иной предоставляемой ему информации;","item6":"обеспечивать защиту персональных данных в процессе их обработки;","item7":"в случае необходимости изменения первоначально заявленных целей обработки персональных данных получить согласие субъекта персональных данных на обработку его персональных данных в соответствии с измененными целями обработки персональных данных при отсутствии иных оснований для такой обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item8":"принимать меры по обеспечению достоверности обрабатываемых им персональных данных, при необходимости обновлять их;","item9":"предоставлять субъекту персональных данных информацию о его персональных данных, а также о предоставлении его персональных данных третьим лицам, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item10":"вносить изменения в персональные данные, которые являются неполными, устаревшими или неточными, за исключением случаев, когда иной порядок внесения изменений в персональные данные установлен законодательными актами либо если цели обработки персональных данных не предполагают последующих изменений таких данных;","item11":"прекращать обработку персональных данных, а также осуществлять их удаление или блокирование (обеспечивать прекращение обработки персональных данных, а также их удаление или блокирование уполномоченным лицом) при отсутствии оснований для обработки персональных данных, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item12":"принимать правовые, организационные и технические меры по обеспечению защиты персональных данных от несанкционированного или случайного доступа к ним, изменения, блокирования, копирования, распространения, предоставления, удаления персональных данных, а также от иных неправомерных действий в отношении персональных данных;","item13":"обеспечить неограниченный доступ в том числе с использованием сети Интернет, к Политике до начала обработки персональных данных;","item14":"уведомлять НЦЗПД о нарушениях систем защиты персональных данных незамедлительно, но не позднее трех рабочих дней после того, как Оператору стало известно о таких нарушениях, за исключением случаев, предусмотренных НЦЗПД;","item15":"осуществлять изменение, блокирование или удаление недостоверных или полученных незаконным путем персональных данных субъекта персональных данных по требованию НЦЗПД, если иной порядок внесения изменений в персональные данные, их блокирования или удаления не установлен законодательными актами;","item16":"исполнять иные требования НЦЗПД об устранении нарушений законодательства о персональных данных;","item17":"предоставлять НЦЗПД информацию, необходимую для определения законности действий Операторов (уполномоченных лиц);","item18":"выполнять иные обязанности, предусмотренные Законом о защите персональных данных и др. законодательными актами.","item19":"5.2. Оператор определяет состав и перечень мер, необходимых и достаточных для выполнения обязанностей по обеспечению защиты персональных данных, с учетом требований Закона о защите персональных данных и иных актов законодательства."}},"applicantsApplication":{"title":"Реестр обработки персональных данных (субъекты персональных данных – соискатели на трудоустройство)","item1":"Цели обработки персональных данных","item2":"Перечень обрабатываемых персональных данных","item3":"Перечень действий с персональными данными","item4":"Правовые основания обработки персональных данных","item5":"Срок хранения персональных данных","item6":"Поиск, сбор, в том числе на сайте Организации, рассмотрение и иная обработка информации (резюме) соискателя на трудоустройство, обеспечение коммуникации с субъектом представителей Организации, проведение собеседования, возможное оформление с соискателем трудовых отношений, информирование об отказе в трудоустройстве","item7":"В соответствии со ст. 26 Трудового кодекса Республики Беларусь (далее – ТК) и иными актами законодательства; иная информация, сообщенная о себе субъектом, в том числе об опыте и местах работы, номер телефона, адрес электронной почты","item8":"сбор, систематизация, хранение, использование, удаление","item9":"Согласие субъекта за исключением – без согласия субъекта: - в случае обращения субъекта с заявлением, адресованным Организации и подписанным субъектом – в соответствии с абз. 16 ст. 6 Закона «О защите персональных данных» (далее – Закон); - в отношении распространенных ранее персональных данных – в соответствии с абз. 19 ст. 6 Закона","item10":"в течение срока, на который дано согласие - в случае отказа в приеме на работу (анкеты, автобиографии, листки по учету кадров, заявления, рекомендательные письма, резюме и др.) – 1 год (п. 680 Перечня типовых документов … (утв. постановлением Министерства юстиции Республики Беларусь от 24.05.2012 № 140 (далее – Перечень)) - при приеме на работу – на период трудовых отношений и 55 лет после увольнения (п. 673 Перечня))","item11":"Истребование характеристики с предыдущих мест работы","item12":"Фамилия, имя, отчество, дата рождения, должность, сведения об образовании, трудовой деятельности, иные сведения, предусмотренные постановлением Совета Министров Республики Беларусь от 14.10.2021 № 585 «О форме характеристики»","item13":"сбор, систематизация, хранение, использование, предоставление по месту запроса характеристики, удаление","item14":"без согласия субъекта: абз. 20 ст. 6, абз. 17 п. 2 ст. 8 Закона: - согласие не требуется «в случаях, когда обработка персональных данных является необходимой для выполнения обязанностей (полномочий), предусмотренных законодат. актами» - ст. 26 ТК - п. 11 Декрета Президента Республики Беларусь от 15.12.2014 № 5 «Об усилении требований к руководящим кадрам и работникам организаций» - постановление Совета Министров Республики Беларусь от 14.10.2021 № 585 «О форме характеристики»","item15":"- в случае отказа в приеме на работу – 1 год (п. 680 Перечня) - при приеме на работу – на период трудовых отношений и 55 лет после увольнения (п. 673 Перечня)","item16":"Получение и обработка сведений о состоянии здоровья соискателя на трудоустройство (в случаях, предусмотренных законодательством)","item17":"Фамилия, имя, отчество, дата и место рождения, паспортные данные, сведения о регистрации по месту жительства, сведения о состоянии здоровья в соответствии с Формой 1 здр/у-10 (Приложение 1 к постановлению Министерства здравоохранения Республики Беларусь от 09.07.2010 № 92)","item18":"сбор, систематизация, хранение, использование, удаление","item19":"без согласия субъекта: абз. 17 п. 2 ст. 8 Закона - Постановление Министерства здравоохранения Республики Беларусь от 09.07.2010 № 92","item20":"- в случае отказа в приеме на работу – 1 год (п. 680 Перечня) - при приеме на работу – на период трудовых отношений и 55 лет после увольнения (п. 673 Перечня)","item21":"Получение из единого государственного банка данных о правонарушениях и обработка сведений о привлечении работника к административной, уголовной ответственности (в случаях, предусмотренных законодательством)","item22":"Фамилия, имя, отчество, дата и место рождения, паспортные данные, идентификационный номер, сведения о регистрации по месту жительства, сведения о привлечении к административной, уголовной ответственности","item23":"сбор, систематизация, хранение, использование, предоставление, удаление","item24":"без согласия субъекта: абз. 3 п. 2 ст. 8 Закона - ст. 26 ТК - п. 11 Декрета № 5 - ст. 13, 14, 24 Закона «Об охранной деятельности»","item25":"на период трудовых отношений и 55 лет после увольнения (п. 673 Перечня)","item26":"Формирование и ведение базы (резерва) соискателей на трудоустройство","item27":"фамилия, имя, отчество, дата рождения, сведения об образовании, номер телефона, адрес электронной почты, иная информация, предусмотренная анкетой (резюме), сообщенная о себе субъектом","item28":"сбор, систематизация, хранение, использование, удаление","item29":"Согласие субъекта","item30":"в течение срока, на который дано согласие (на 1 год)","item31":"Организация и обеспечение пропускного режима","item32":"Фамилия, имя, отчество","item33":"сбор, систематизация, хранение, использование, удаление","item34":"без согласия субъекта: абз. 20 ст. 6 Закона - ст. 9, 23 Закона «Об охранной деятельности»","item35":"журнал учета посетителей – 1 год после окончания ведения журнала"},"homeLink":"На главную","upLink":"Наверх"}');
const telFax$1 = "(тел / факс)";
const fax$1 = "(факс)";
const forOrganizations$1 = "Для организаций";
const forClientInquiries$1 = "Для обращения клиентов";
const technicalSupport$1 = "Техническое обслуживание";
const ourBranchesAndContacts$1 = "Наши филиалы и контакты";
const workingHours$1 = "Пн - Чт: 08.30 - 17.30";
const fridayWorkingHours$1 = "Пт: 08.30 - 16.15";
const daysOff$1 = "Сб - Вс: выходной";
const rulesOfUse$1 = "Правила использования";
const offerAgreement$1 = "Договор оферты";
const privacy$1 = "Конфиденциальность";
const help$1 = "Помощь";
const copyright$1 = "© {{year}} НП ООО «Берлио»";
const adminLogin = { "pageTitle": "Авторизация администратора", "username": "Логин", "password": "Пароль", "loading": "Загрузка...", "submit": "Войти" };
const translationRu = {
  pageTitles: pageTitles$1,
  departmentsPhone: departmentsPhone$1,
  allContacts: allContacts$1,
  searchAzs: searchAzs$1,
  personalAccount: personalAccount$1,
  customerService: customerService$1,
  backToHome: backToHome$1,
  companyName: companyName$1,
  minskName: minskName$1,
  minskAddress: minskAddress$1,
  minskFooterAddress: minskFooterAddress$1,
  minskShortAddress: minskShortAddress$1,
  inMinskCity: inMinskCity$1,
  brestName: brestName$1,
  brestAddress: brestAddress$1,
  brestFooterAddress: brestFooterAddress$1,
  brestShortAddress: brestShortAddress$1,
  inBrestCity: inBrestCity$1,
  vitebskName: vitebskName$1,
  vitebskAddress: vitebskAddress$1,
  vitebskFooterAddress: vitebskFooterAddress$1,
  vitebskShortAddress: vitebskShortAddress$1,
  inVitebskCity: inVitebskCity$1,
  gomelName: gomelName$1,
  gomelAddress: gomelAddress$1,
  gomelFooterAddress: gomelFooterAddress$1,
  gomelShortAddress: gomelShortAddress$1,
  inGomelCity: inGomelCity$1,
  grodnoName: grodnoName$1,
  grodnoAddress: grodnoAddress$1,
  grodnoFooterAddress: grodnoFooterAddress$1,
  grodnoShortAddress: grodnoShortAddress$1,
  inGrodnoCity: inGrodnoCity$1,
  mogilevName: mogilevName$1,
  mogilevAddress: mogilevAddress$1,
  mogilevFooterAddress: mogilevFooterAddress$1,
  mogilevShortAddress: mogilevShortAddress$1,
  inMogilevCity: inMogilevCity$1,
  smolenskName: smolenskName$1,
  smolenskAddress: smolenskAddress$1,
  belarusName: belarusName$1,
  russiaName: russiaName$1,
  aboutBerlio: aboutBerlio$1,
  forPartners: forPartners$2,
  forClients: forClients$2,
  news: news$1,
  equipmentAndSoftware: equipmentAndSoftware$1,
  contacts: contacts$1,
  closeMenu: closeMenu$1,
  noResult: noResult$1,
  search: search$1,
  appliedProgramsAndSoftware: appliedProgramsAndSoftware$1,
  webCenterBerlio: webCenterBerlio$1,
  oilAndCapital: oilAndCapital$1,
  selfServiceCashRegister: selfServiceCashRegister$1,
  gasStationAutomationSystem: gasStationAutomationSystem$1,
  invoiceWebsite: invoiceWebsite$1,
  usefulInformation: usefulInformation$1,
  voiceInfoService: voiceInfoService$1,
  loyaltyProgram: loyaltyProgram$1,
  downloadableDocuments: downloadableDocuments$1,
  berlioPaymentRules: berlioPaymentRules$1,
  bankInformation: bankInformation$1,
  electronicPaymentSystem: electronicPaymentSystem$1,
  contractConclusion: contractConclusion$1,
  eCardReceipt: eCardReceipt$1,
  eCardUsage: eCardUsage$1,
  contractTermination: contractTermination$1,
  ratesAndTariffs: ratesAndTariffs$1,
  personalAccountUsage: personalAccountUsage$1,
  fuelCardsAndGasStations: fuelCardsAndGasStations$1,
  gasStationsAndRoutes: gasStationsAndRoutes$1,
  fuelCardUsage: fuelCardUsage$1,
  tollRoads: tollRoads$1,
  fuelPayment: fuelPayment$1,
  regulatoryDocuments: regulatoryDocuments$1,
  berlioEWalletRules: berlioEWalletRules$1,
  berlioUsageRegulations: berlioUsageRegulations$1,
  servicesAndSoftware: servicesAndSoftware$1,
  berlioInternetClient: berlioInternetClient$1,
  berlioCardPayApp: berlioCardPayApp$1,
  smartPayApp: smartPayApp$1,
  clientCabinetSoftware: clientCabinetSoftware$1,
  breadCrumbs: breadCrumbs$1,
  mainBlock: mainBlock$1,
  aboutBlock: aboutBlock$1,
  systemSection: systemSection$1,
  purposeSection: purposeSection$1,
  cpsSection: cpsSection$1,
  forPartnersMain: forPartnersMain$1,
  partnersAdvantages: partnersAdvantages$1,
  partners: partners$1,
  voiceRefServiceMain: voiceRefServiceMain$1,
  loyaltyProgramMain: loyaltyProgramMain$1,
  forBankInfoMain: forBankInfoMain$1,
  forBankInfoContact: forBankInfoContact$1,
  forBankInfoDoc: forBankInfoDoc$1,
  forClientsMain: forClientsMain$1,
  clientsAdvantages: clientsAdvantages$1,
  clients: clients$1,
  signAndResignMain: signAndResignMain$1,
  signAndResignSection: signAndResignSection$1,
  gettingCardMain: gettingCardMain$1,
  readerSVG: readerSVG$1,
  dealResignationMain: dealResignationMain$1,
  priceListsAndTariffsMain: priceListsAndTariffsMain$1,
  workWithPrivateAccount: workWithPrivateAccount$1,
  documentsForDownloadMain: documentsForDownloadMain$1,
  eMoneyRegulationsMain: eMoneyRegulationsMain$1,
  bicAppMain: bicAppMain$1,
  newsBlock: newsBlock$1,
  paymentSystem: paymentSystem$1,
  fuelCards: fuelCards$1,
  actualSection: actualSection$1,
  newsSection: newsSection$1,
  detailedNewsMain: detailedNewsMain$1,
  ourPartnersLogoSection: ourPartnersLogoSection$1,
  ourClientsLogoSection: ourClientsLogoSection$1,
  equipment: equipment$1,
  webCenterMain: webCenterMain$1,
  oilAndCapitalMain: oilAndCapitalMain$1,
  selfServiceCheckoutMain: selfServiceCheckoutMain$1,
  gsAutomationSystemMain: gsAutomationSystemMain$1,
  invoicesSiteMain: invoicesSiteMain$1,
  invoicesSiteTariffsMain: invoicesSiteTariffsMain$1,
  berlioCardPayMain: berlioCardPayMain$1,
  smartPayAppMain: smartPayAppMain$1,
  personalAccWebAppMain: personalAccWebAppMain$1,
  privacyMain: privacyMain$1,
  telFax: telFax$1,
  fax: fax$1,
  forOrganizations: forOrganizations$1,
  forClientInquiries: forClientInquiries$1,
  technicalSupport: technicalSupport$1,
  ourBranchesAndContacts: ourBranchesAndContacts$1,
  workingHours: workingHours$1,
  fridayWorkingHours: fridayWorkingHours$1,
  daysOff: daysOff$1,
  rulesOfUse: rulesOfUse$1,
  offerAgreement: offerAgreement$1,
  privacy: privacy$1,
  help: help$1,
  copyright: copyright$1,
  adminLogin
};
const pageTitles = { "/": "S&P LLC 'Berlio'", "home": "S&P LLC 'Berlio' - Home", "about": "S&P LLC 'Berlio' - About Berlio", "contacts": "S&P LLC 'Berlio' - Contacts", "news": "S&P LLC 'Berlio' - News", "equipment": "S&P LLC 'Berlio' - Equipment and Software", "webCenter": "S&P LLC 'Berlio' - 'Web Center Berlio Software'", "oilAndCapital": "S&P LLC 'Berlio' - Oil and Capital APP", "selfServiceCheckout": "S&P LLC 'Berlio' - Self-service Checkout", "gsAutomationSystem": "S&P LLC 'Berlio' - 'Automation System for GS APP'", "invoicesSite": "NP LLC «Berlio» - 'Invoice Billing Site'", "invoicesSiteTariffs": "NP LLC «Berlio» - 'API BERLIO-INFO' Tariffs", "forClients": "S&P LLC 'Berlio' - For Clients", "signAndResign": "S&P LLC 'Berlio' - Signing and re-signing of the agreement", "gettingElectronicCard": "S&P LLC 'Berlio' - Receiving an electronic card", "cardUsageRules": "S&P LLC 'Berlio' - Rules for using an electronic card", "dealResignation": "S&P LLC 'Berlio' - Termination of Contract", "priceListsAndTariffs": "S&P LLC 'Berlio' - Price Lists and Tariffs", "workWithPrivateAccount": "S&P LLC 'Berlio' - Work with PA", "documentsForDownload": "S&P LLC 'Berlio' - Documents for Download", "systemRules": "S&P LLC 'Berlio' - Rules of the «BERLIO» Electronic Money Payment System", "plasticCardUsageRules": "S&P LLC 'Berlio' - Rules for using a plastic card", "nonResidentsSupport": "S&P LLC 'Berlio' - Services for non-residents of the Republic of Belarus", "tollRoads": "S&P LLC 'Berlio' - Toll Roads", "issuerRules": "S&P LLC 'Berlio' - Regulations of the BERLIO Electronic Money Payment System", "eMoneyRegulations": "S&P LLC 'Berlio' - Regulations for the Use of E-Money", "bicApp": "S&P LLC 'Berlio' - Berlio Internet Client", "bcpApp": "S&P LLC 'Berlio' - “BERLIOCARDPAY” App", "smartPayApp": "S&P LLC 'Berlio' - “SMARTPAY” App", "personalAccWebApp": "S&P LLC 'Berlio' - “Personal Account” App", "forPartners": "S&P LLC 'Berlio' - For Partners", "voiceRefService": "S&P LLC 'Berlio' - Voice Reference and Information Service", "loyaltyProgram": "S&P LLC 'Berlio' - Loyalty Programm", "forBankInfo": "S&P LLC 'Berlio' - For Bank", "detailedNews": "S&P LLC 'Berlio' - News Details", "privacy": "S&P LLC 'Berlio' - Privacy Policy" };
const departmentsPhone = "Departments' Phones";
const allContacts = "All Contacts";
const searchAzs = "GS Search";
const personalAccount = "Personal Account";
const customerService = "Customer Service";
const backToHome = "back home";
const companyName = "S&P LLC “BERLIO”";
const minskName = "Head Office";
const minskAddress = "Minsk Region, Minsk, Bykhovskaya St. 55";
const minskFooterAddress = "Bykhovskaya St. 55, Minsk, Belarus, 220007";
const minskShortAddress = "Minsk, Bykhovskaya St. 55";
const inMinskCity = "in Minsk";
const brestName = "Brest Branch";
const brestAddress = "Brest Region, Brest, Karl Marx St. 33-43";
const brestFooterAddress = "Karl Marx St. 33, Office 43, Brest, Belarus, 224005";
const brestShortAddress = "Brest, Karl Marx St. 33-43";
const inBrestCity = "in Brest";
const vitebskName = "Vitebsk Branch";
const vitebskAddress = "Vitebsk Region, Vitebsk, Pravda St. 37, Building 2, Room 84";
const vitebskFooterAddress = "Pravda St. 37, Building 2, Room 84, Vitebsk, Belarus, 210029";
const vitebskShortAddress = "Vitebsk, Pravda St. 37, b.2-84";
const inVitebskCity = "in Vitebsk";
const gomelName = "Gomel Branch";
const gomelAddress = "Gomel Region, Gomel, Rechitskaya St. 1A-419";
const gomelFooterAddress = "Rechitskaya St. 1A, Office 419, Gomel, Belarus, 246017";
const gomelShortAddress = "Gomel, Rechitskaya St. 1A-419";
const inGomelCity = "in Gomel";
const grodnoName = "Grodno Branch";
const grodnoAddress = "Grodno Region, Grodno, Pobedy St. 17-7";
const grodnoFooterAddress = "Pobedy St. 17-7, Grodno, Belarus, 230026";
const grodnoShortAddress = "Grodno, Pobedy St. 17-7";
const inGrodnoCity = "in Grodno";
const mogilevName = "Mogilev Branch";
const mogilevAddress = "Mogilev Region, Mogilev, Chelyuskintsev St. 105V";
const mogilevFooterAddress = "Chelyuskintsev St. 105V, Mogilev, Belarus, 212003";
const mogilevShortAddress = "Mogilev, Chelyuskintsev St. 105V";
const inMogilevCity = "in Mogilev";
const smolenskName = "LLC «BERLIO-CARD»";
const smolenskAddress = "Smolensk region, Smolensk, Pamfilova st., 5, office 211";
const belarusName = "Belarus";
const russiaName = "Russia";
const aboutBerlio = "About Berlio";
const forPartners$1 = "For Partners";
const forClients$1 = "For Clients";
const news = "News";
const equipmentAndSoftware = "Equipment and Software";
const contacts = "Contacts";
const closeMenu = "Close menu";
const noResult = 'No results found for "{{query}}".';
const search = "Search the site";
const appliedProgramsAndSoftware = "Applied Programs and Software";
const webCenterBerlio = "Web Center Berlio Software";
const oilAndCapital = "Oil and Capital APP";
const selfServiceCashRegister = "Self-service Cash Register for GS Chains";
const gasStationAutomationSystem = "GS Automation System APP";
const invoiceWebsite = "Invoice Website";
const usefulInformation = "Useful Information";
const voiceInfoService = "Voice Information Service";
const loyaltyProgram = "Loyalty Program";
const downloadableDocuments = "Downloadable Documents";
const berlioPaymentRules = "Berlio E-Money Payment System Rules";
const bankInformation = "Bank Information";
const electronicPaymentSystem = "Electronic Payment System";
const contractConclusion = "Contract Conclusion and Renewal";
const eCardReceipt = "E-Card Receipt";
const eCardUsage = "E-Card Usage";
const contractTermination = "Contract Termination";
const ratesAndTariffs = "Price List and Tariffs";
const personalAccountUsage = "Personal Account Usage";
const fuelCardsAndGasStations = "Fuel Cards and GS";
const gasStationsAndRoutes = "GS and Routes";
const fuelCardUsage = "Fuel Card Usage";
const tollRoads = "Toll Roads (BelToll)";
const fuelPayment = "Fuel Payment";
const regulatoryDocuments = "Regulatory Documents";
const berlioEWalletRules = "Berlio E-Money Rules (OJSC BelGazpromBank)";
const berlioUsageRegulations = "Berlio E-Money Usage Regulations";
const servicesAndSoftware = "Services and Software";
const berlioInternetClient = "Berlio Internet Client App";
const berlioCardPayApp = "BerlioCardPay App";
const smartPayApp = "Smartpay App";
const clientCabinetSoftware = "Client Cabinet Software";
const breadCrumbs = { "home": "Home", "about": "About Berlio", "forPartners": "For Partners", "voiceRefService": "Voice Reference and Information Service", "loyaltyProgram": "Loyalty Program", "forBankInfo": "Information for Bank", "forClients": "For Clients", "signAndResign": "Signing and re-signing of the agreement", "gettingCard": "Receiving an electronic card", "dealResignation": "Termination of Contract", "priceListsAndTariffs": "Price Lists and Tariffs", "workWithPrivateAccount": "Work with Private Account", "documentsForDownload": "Documents for Download", "eMoneyRegulations": "Regulations for the Use of E-Money", "bicApp": "Application 'Berlio Internet Client'", "berlioCardPay": "Application 'BERLIOCARDPAY'", "smartPayApp": "Application 'SMARTPAY'", "personalAccWebApp": "Application 'Personal Account'", "news": "News", "detailedNews": "News Details", "equipment": "Equipment and Software", "webCenter": "Web Center Berlio Software", "oilAndCapital": "Oil and Capital APP", "selfServiceCheckout": "Self-service Checkout", "gsAutomationSystem": "Automation System for GS APP", "invoicesSite": "'Invoice Billing Site'", "invoicesSiteTariffs": "Tariffs for access to the «Berlio Info» API", "privacy": "Privacy Policy" };
const mainBlock = { "companyName": "Company S&P LLC «BERLIO»", "headline": "Electronic payment system at gas stations", "tagline": "Use the electronic card «BERLIO» and refuel in just 3 minutes", "fuelCardUsage": "Additional Berlio fuel card usage", "belTollServices": "Allows you to pay for services in the BelToll system (toll road payments)", "nonResidentServices": "Services for non-residents of Belarus", "nonResidentSupport": "The company also supports clients from neighboring countries", "readMore": "Read more" };
const aboutBlock = { "name": "Our Company", "alt": "S&P LLC «BERLIO» office", "description": "The company has been operating in the market of manufacturers and services since 1992. The number of locations accepting «BERLIO» cards for payment: 804 — Belarus, 379 — Russia" };
const systemSection = { "name": "BERLIO System", "listTitle": "as well as", "listItem1": "Development and support of custom software; development, production, installation, and maintenance of equipment", "listItem2": "Information and technical support for clients using the BERLIO cashless payment system at gas stations, stores, and service facilities in Belarus", "listItem3": "Development, production, installation, and maintenance of management equipment for gas stations, service stations, toll points, stores, and other retail facilities", "listItem4": "Development, production, installation, and maintenance of equipment for electronic card payment systems", "alt1": "BERLIO logo on a stelа", "alt2": "Car refueling" };
const purposeSection = { "name": "System Purpose", "description": "The system is designed for efficient cashless payments using electronic cards. The main components of the system are:", "cardTitle1": "Settlement Center", "cardTitle2": "Terminals", "cardTitle3": "Electronic Cards", "fuelDispenser": "Fuel Dispenser", "listTitle": "Using BERLIO cards, you can pay for:", "listItem1": "fuel", "listItem2": "gas", "listItem3": "kerosene", "listItem4": "groceries", "listItem5": "non-food items", "listItem6": "oils", "listItem7": "service stations", "listItem8": "vehicle inspection", "listItem9": "road toll in the BelToll system", "listItem10": "road toll in the PLATON system", "listItem11": "car wash", "listItem12": "vacuum cleaner", "listItem13": "parking", "listItem14": "Velcom and MTS services", "listItem15": "customs agent services" };
const cpsSection = { "name": "Services for Clients and Partners", "listItem1": "Quick contract execution", "listItem2": "Cashless payment", "listItem3": "Timely accounting reports", "listItem4": "Use of electronic cards", "listItem5": "Ability to access provided services (fueling of all types of fuel, purchasing consumer goods, paying for services, road tolls) with a single electronic card", "listItem6": "Ability to restrict types of provided services (e.g., fueling only a specific type of fuel) on a client-designated electronic card", "listItem7": "Ability to limit daily or monthly fuel quotas on a client-designated electronic card, robust metallic case in the form of a key fob, one-year warranty, individual password, reliable protection against forgery", "forClients": "For Clients", "forPartners": "For Partners" };
const forPartnersMain = { "title": "For Partners", "description": "Choose a section and explore the necessary information", "partnerInfo": { "title1": "Applications and Software", "title2": "Useful Information", "title3": "Join the System", "label1": "Software 'Web Center BERLIO'", "label2": "PPP 'Oil and Capital'", "label3": "Self-service checkout for gas station networks", "label4": "PPP 'Gas Station Automation System'", "label5": "Website for issuing invoices", "label6": "Voice reference information service", "label7": "Loyalty program", "label8": "Documents for download", "label9": "Rules of the BERLIO electronic money payment system", "label10": "Information for the bank" } };
const partnersAdvantages = { "name": "Advantages for “BERLIO” Partners", "documentsCycle": "Online processing and full document cycle", "documentsCycleTagline": "we provide complete accounting and operate efficiently", "billPrint": "Fiscal receipt printing", "billPrintTagline": "the ability to print a fiscal receipt directly from the personal account", "location": "Convenient office location", "locationTagline": "easy to reach us: the office is a 4-minute walk from the “Kovalskaya Sloboda” metro station" };
const partners = { "faq_title": "Frequently Asked Questions", "questions": { "question1": "How to become a partner?", "question2": "What is required to sign a contract?", "question3": "What are the benefits for partners?", "question4": "How to get a reconciliation statement for fuel settlements?", "question5": "How to make a payment under the contract?" }, "answers": { "answer1": "This section contains information regarding this question.", "answer2": "This section contains information regarding this question.", "answer3": "This section contains information regarding this question.", "answer4": "This section contains information regarding this question.", "answer5": "This section contains information regarding this question." } };
const voiceRefServiceMain = { "name": "Voice Reference and Information Service", "descr1": "The Voice Reference and Information Service is designed to automate customer service in an organization. The program uses a voice fax modem to provide customers with a voice menu. The principle of working with customers is as follows: the customer calls the phone number connected to the modem or the incoming line number of the internal PBX. The modem picks up the phone, and the customer is offered a voice menu recorded by the client.\nFor example:", "descr2": "“Hello. You have called the reference and information service of the company 'BERLIO'. To check the balance under the contract, press '1'. To receive a sales report for the current month by fax, press '2'. To receive a sales report for the previous month by fax, press '3'. To connect with a manager, press '9'.”", "descr3": "The customer presses the corresponding digit on the telephone keypad to obtain the required information. Please note that the customer must enter all digits in tone mode. If the customer used pulse dialing to call the city number, they must press '*' before entering the first digit to switch the phone (fax) to tone dialing. The customer can enter all digits either during the pause or during voice messages.", "descr4": "The initial menu with a specific pause is repeated several times. The number of repetitions and the pause duration are determined in the program settings. If the customer does not press any digit within the specified time, they are connected to a manager (as if they had pressed '9'). If the pressed digit does not correspond to any function, the customer is informed, 'An incorrect choice has been made,' and the menu is repeated.", "descr5": "When selecting option '9', the customer is transferred to a manager. The manager's phone number is specified in the program settings. This option is only available during the specified time, for example, only on weekdays from 9:00 to 18:00.", "descr6": "When selecting option '1', the customer is prompted to enter a five-digit contract number, after which they are informed of the remaining funds on the contract. When selecting menu options '2' or '3', the customer is prompted to enter the contract number followed by the '#' key, after which a Sales Report for the current or previous period, respectively, is sent to the customer by fax.", "homeLink": "Home", "upLink": "Up" };
const loyaltyProgramMain = { "name": "Loyalty Program", "descr1": "The loyalty program is designed to deploy a system for providing and accounting for discounts, as well as various promotions and bonus programs using loyalty cards: paper (with barcodes), plastic (with barcodes), electronic (chip-based, with magnetic stripes), and contactless cards.", "descrHeader2": "Key advantages of the program:", "descr2": { "item1": "speed and ease of use", "item2": "high reliability", "item3": "offline mode with offline data recording on the card ensures the loyalty program is available even at locations without a connection to the loyalty center, while guaranteeing that the customer does not overspend accumulated funds", "item4": "great flexibility in setting up various promotions", "item5": "over 100 reports with various groupings and filters", "item6": "a high level of security at all stages of system interaction ensures transaction safety. 'Family Card' — the ability to issue an unlimited number of additional cards with a single card account (e.g., when a husband, wife, and children use one card account). In this case, all loyalty program transactions are processed through the main card's account, while any of the additional cards can be used for customer identification" }, "descrHeader3": "Advantages of using contactless electronic cards:", "descr3": "Longer card lifespan, as contactless payments naturally result in less wear and tear. Convenience and speed of payment at gas stations, cafes, supermarkets, etc. Cards and readers are well-protected against fraud.", "descr4": "Firstly, the cards have internal password protection (separately for writing and reading data), with the password set not for the entire card but for each segment (there can be up to 10 segments on a 'Mifare 1K' card), allowing some information to be protected from both reading and writing, and some only from writing.", "descr5": "Secondly, card readers of our production do not record the transmitted information directly onto the card. All information is first encrypted and only then written to the card in encrypted form. Additionally, random data, card identifiers (written by the manufacturer and unchangeable), and calculated control values are mixed into the information. Moreover, the card maintains additional control counters that must change according to a predefined algorithm whenever data is modified, ensuring that even identical operations with the card produce completely different data and control values each time.", "descr6": "All this eliminates any possibility of duplicating the card or altering its information (any such operations will render the card invalid due to mismatched control codes during decryption).", "descr7": "Similarly, it is impossible to alter data during the interaction between the computer and the reader. Communication lines never transmit the actual data, only their encrypted representation mixed with random data and calculated control values. Even identical operations have completely different representations each time, meaning that even if data is replicated and the exchange is simulated, the system will consider all data invalid!", "descr8": "Similarly, all communications with the loyalty center, offline systems, and gas station management systems are encrypted and subject to additional controls. Additionally, during contactless payments, the card remains in the customer's hands, reducing the risk of unauthorized manipulation by staff.", "descrHeader9": "Program usage options:", "descr9": { "item1": "discount cards — providing customers with various discounts expressed as a percentage of the purchase amount", "item2": "bonus cards — similar to discount cards, but instead of a discount, the customer receives a bonus for their purchases. The bonus can be anything, limited only by your imagination. Most often, bonuses are converted into monetary equivalents or the products offered, such as liters of fuel, etc. One usage option is crediting unclaimed change to the customer's card", "item3": "electronic wallets — an electronic alternative to paper vouchers, with the ability for multiple uses and online addition/redistribution of amounts/liters on the card", "item4": "multi-functional cards — for example, discount cards with additional bonus accumulation for promotions", "item5": "incentive program — allows increasing or decreasing a customer's bonuses based on their activity (either in monetary terms through prepayment or status changes, or in goods, such as gifts or the ability to acquire a specified quantity of goods or services free of charge). Additionally, similar increases and deductions can be made based on the purchase of a certain quantity or value of goods and services", "item6": "prize program — allows raffling various prizes among program participants (either in monetary terms through prepayment or status changes, or in goods, such as gifts or the ability to acquire a specified quantity of goods or services free of charge)" }, "homeLink": "Home", "upLink": "Up" };
const forBankInfoMain = { "name": "Our Company", "system": "Electronic payment system at gas stations", "systemTagline": "use the electronic card 'BERLIO' and refuel in 3 minutes", "usage": "Usage of fuel cards", "usageTagline": "allows you to pay for services in the BelToll system (payment for toll roads)", "nonResident": "Services for non-residents of the Republic of Belarus", "nonResidentTagline": "the company also supports clients from neighboring countries", "readMore": "Read more" };
const forBankInfoContact = { "address": "Address", "phone": "Phone", "forOrganizations": "Corporate email", "forClientInquiries": "For client inquiries", "readMore": "All contacts" };
const forBankInfoDoc = { "name": "Documents", "description": "The issuing bank of S&P LLC 'BERLIO' is OJSC 'Belgazprombank'", "headline": "Regulations for the use of electronic money 'BERLIO'", "cardTitle1": "Rules of OJSC 'Belgazprombank'", "cardTitle2": "Rules of the electronic money payment system 'BERLIO'", "homeLink": "Home", "upLink": "Up" };
const forClientsMain = { "title": "For Clients", "description": "Choose a section and explore the necessary information", "clientInfo": { "title1": "Electronic Payment System", "title2": "Fuel Cards and Gas Stations", "title3": "Regulatory Documents", "title4": "Services and Software", "label1": "Contract Conclusion and Renewal", "label2": "Obtaining an Electronic Card", "label3": "Using the Electronic Card", "label4": "Contract Termination", "label5": "Price List and Tariffs", "label6": "Working with the Personal Account", "label7": "Documents for Download", "label8": "Gas Stations and Routes", "label9": "Using Fuel Cards", "label10": "Toll Roads (BelToll)", "label11": "Fuel Payment", "label12": "Electronic Money 'BERLIO' by OAO 'Belgazprombank'. Rules", "label13": "Regulations for the Use of Electronic Money 'BERLIO'", "label14": "App 'Berlio Internet Client'", "label15": "App 'BERLIOCARDPAY'", "label16": "'Smartpay' App", "label17": "Self-Service Kiosk for Gas Station Networks", "label18": "Software 'Personal Account Client'" } };
const clientsAdvantages = { "name": "Advantages for “BERLIO” Clients", "customerService": "24/7 Customer Service", "customerServiceTagline": "prompt technical support for clients at any time of the day", "dealSign": "Online contract signing", "dealSignTagline": "or at the office, a 4-minute walk from the “Kovalskaya Sloboda” metro station", "personalCabinet": "Multifunctional personal account", "personalCabinetTagline": "supported by many gas stations in Belarus and offers rich functionality" };
const clients = { "faq_title": "Frequently Asked Questions", "questions": { "question1": "How to become a client?", "question2": "What is required to sign a contract?", "question3": "How to register an on-board device?", "question4": "What is the procedure for blocking/unblocking an on-board device?", "question5": "How to make a payment under the contract?" }, "answers": { "answer1": "This section contains information regarding this question.", "answer2": "This section contains information regarding this question.", "answer3": "This section contains information regarding this question.", "answer4": "This section contains information regarding this question.", "answer5": "This section contains information regarding this question." } };
const signAndResignMain = { "name": "Service in the electronic payment system 'BERLIO'", "description": "The electronic payment system 'BERLIO' (hereinafter referred to as the 'BERLIO' payment system) is a community of users: Participants and Clients interacting according to established rules.", "purposeBeforeLink": "The purchase and payment for petroleum products, goods, works, and services are carried out at the ", "purposeLink": "trade and service facilities (TSFs) ", "purposeAfterLink": "of the 'BERLIO' payment system using 'BERLIO' electronic money with the use of:", "list1": { "item1": "BERLIO electronic cards;", "item2": "BERLIO plastic electronic cards;", "item3": "other identification information carriers;", "item4": "or their virtual equivalents" }, "participants": "Participants of the 'BERLIO' payment system (payment service providers)", "operator": "Operator", "operatorTagline": "S&P LLC 'BERLIO'", "agents": "Agents", "agentsTagline": "organizations servicing their own Clients using the 'BERLIO' payment system, may have TSFs", "emissioner": "Issuer", "emissionerTagline": "OJSC 'Belgazprombank'", "tradeAndServiceObject": "TSF", "tradeAndServiceObjectTagline": "trade and service facilities (gas stations, service stations, car washes, etc.)", "serviseCenter": "SC", "serviseCenterTagline": "service center", "customerService": "Client servicing is carried out on the basis of:", "list2": { "item1": "an agreement of joining the 'BERLIO' electronic payment system servicing – with the Operator (Operator's SC)", "item2": "an agreement for opening and servicing an electronic wallet, purchasing electronic money – with the Issuer (Settlement Center)" }, "systemUsage": "The use of the 'BERLIO' payment system is carried out upon the availability of original documents from the Client:", "list3": { "item1": "application for joining;", "item2": "agreement with the Issuer;", "item3": "other agreements (according to the services requested by the Client);" }, "documentsTitle": "Documents (LPSA) of 'BERLIO' payment system participants for review", "operatorDocumentsTitle": "Operator's documents", "cardTitle1": "Rules of the operator of the 'BERLIO' electronic payment system", "cardTitle2": "Rules for servicing in the 'BERLIO' electronic payment system", "cardTitle3": "Agreement of joining the servicing in the 'BERLIO' electronic payment system", "emissionerDocumentsTitle": "Issuer's documents", "cardTitle4": "Rules of the issuer of 'BERLIO' electronic money", "cardTitle5": "Agreement for opening and servicing an electronic wallet", "footer": "Agreements are concluded based on the standard forms established by the participants of the 'BERLIO' payment system" };
const signAndResignSection = { "name": "Re-signing / Signing a Contract", "description": "Due to changes in legislation in the field of payment systems and aligning the standard forms of documents of the payment system 'BERLIO' (the System), Operator Rules, Service Rules, and the implementation of a new service technology, existing Clients are required to re-sign their service contracts. The re-signing and signing of the Participation Agreement is carried out under a new procedure.", "dropdown1": "Document Processing", "link": "independently", "selfSignList": { "item1": "perform pre-registration of the client on the website www.lkb.by: on the homepage, click the 'Pre-registration in the electronic payment system BERLIO' button", "item2": "familiarize yourself with the Client Registration Card (CRC), the terms and conditions of the Participation Agreement and documents (LNPAs) of the Participants of the 'BERLIO' payment system", "item3": "prepare the necessary document package for filling out the CRC and uploading scanned copies", "item4": "fill out the CRC:", "orderedItem1": "select the Service Center", "orderedItem2": "enter the UNP", "orderedItem3": "confirm the Client's agreement with the terms and conditions of the documents (LNPAs) by ticking 'Agree'. If there is no agreement/tick, the 'Continue' button will be unavailable. The service of existing Clients (Operator), who have not re-signed contracts, will be terminated unilaterally", "orderedItem4": "enter the details of the authorized person ('Master-phone') to perform legally significant actions in the personal account (PC) on the website www.lkb.by, the individual entrepreneur must provide their mobile phone number", "orderedItem5": "upload the requested documents for the Operator and Issuer according to the 'Document List' and CRC", "orderedItem6": "check the completeness and accuracy of the data, if inaccurate, edit them, and if there are empty fields, fill them in. If there is insufficient information to fill out, save the CRC by clicking 'Save', and you can continue filling it out on the homepage www.lkb.by by clicking the 'Pre-registration in the electronic payment system BERLIO' button and entering the UNP in the CRC field", "orderedItem7": "after completing the actions, click the 'Save' and 'Send' buttons for verification by the selected Service Center (initially chosen) to check compliance with the BERLIO payment system requirements", "orderedItem8": "wait for an SMS message to the 'Master-phone' confirming the pre-registration, which will be sent within 5 business days from the moment the documents are received by the Service Center (this period is valid during the re-signing of contracts and the transition to the new procedure) for further document formation and signing", "orderedItem9": "upon confirmation of pre-registration, proceed with registration in the personal account on the website www.lkb.by", "orderedItem10": "if pre-registration is rejected, contact the initially chosen Service Center to clarify the non-compliance", "orderedItem11": "form a Participation Application and Service Termination Agreement (for contract re-signing) in the personal account", "orderedItem12": "check in the Participation Application the presence of 'Agree' ticks (automatically set based on client data from the CRC)", "orderedItem13": "print the Participation Application and Service Termination Agreement (for contract re-signing), sign, and seal (if applicable)", "orderedItem14": "send the document(s) by postal mail or courier to the Operator for authentication/registration of the client in the 'BERLIO' payment system", "orderedItem15": "send the document package to the Issuer at the address: JSC 'Belgazprombank', Minsk, 60/2 Prititsky Street, office 301", "orderedItem16": "wait for an SMS message to the 'Master-phone' confirming registration and assigning the number and date of the Participation Agreement", "orderedItem17": "after receiving the SMS message, the contract re-signing process in the 'Berlio' electronic payment system is considered completed", "footer": "The Participation Application submitted and sent by the Client to the Operator's email or fax is not accepted", "secondaryFooter": "The status of the submitted documents can be checked in the personal account" }, "dropdown2": "Document Processing at the Operator’s Service Center", "customerServiceSignList": { "item1": "familiarize yourself with the terms and conditions of the Participation Agreement and documents (LNPAs) of the Participants of the 'BERLIO' payment system, CRC", "item2": "prepare, sign, and seal (if applicable) documents for the Issuer (contract details, agreement, etc., client questionnaire) according to the document list", "item3": "prepare the necessary document package for CRC and Participation Application. The requested documents may be provided in electronic form (scans on an electronic medium)", "item4": "contact the Operator’s Service Center located near the Client (head office or regional Service Centers)", "item5": "provide the necessary document package for CRC, Participation Application, and upload scans by the Service Center specialists", "item6": "sign, seal (if applicable) the Participation Application, Service Termination Agreement (for contract re-signing), provided by the Service Center specialists", "item7": "return 1 original copy to the Service Center specialist" }, "dealFact": "The fact of the client’s participation in the Participation Agreement is considered confirmed upon registration of the client in the 'BERLIO' payment system, and the signed Participation Application:", "dealFactList": { "item1": "the Participation Agreement number is the registration number of the Participation Application", "item2": "the Participation Agreement date is the registration date of the Participation Application", "item3": "the place of composition is the location of the Service Center selected by the Client during registration" }, "footer": { "beforeTel": "If you have any questions regarding contract signing, call our", "tel1": "head office", "betweenTels": "or the ", "tel2": "customer service department", "afterTel": " You can also call one of our branch offices in Belarus or our representatives in Russia." }, "contactsLink": "Our branches and contacts", "homeLink": "Home", "upLink": "Up" };
const gettingCardMain = { "name": "Getting an Electronic Card", "applicationHeader": "The application for obtaining a 'BERLIO' electronic card is submitted:", "list1": { "item1": "by personal visit to the Operator's Service Center at the Client's location (head or regional service centers)", "item2": "by calling the customer service phone", "item3": "by sending an email to customer service:" }, "mailLink": "info@berlio.by", "applicationFooter": "You will receive an invoice for the required number of electronic cards. Payment for the electronic card is made to the settlement account of S&P LLC 'BERLIO' according to the issued invoice. The price of the electronic card is determined in accordance with the current price list. The electronic card is issued only after payment.", "documentsHeader": "Documents Required for Obtaining an Electronic Card", "supervisor": "The Supervisor Needs", "supList": { "item1": "an order appointing the supervisor", "item2": "a passport or driver's license", "item3": "a copy of the payment order with a bank mark (regardless of the presence of the 'Client-Bank' electronic system) - if the card is received on the day of payment" }, "notSupervisor": "Non-Supervisors Need", "notSupList": { "item1": "a power of attorney for receiving goods and materials", "item2": "a passport or driver's license", "item3": "a copy of the payment order with a bank mark (regardless of the presence of the 'Client-Bank' electronic system) - if the card is received on the day of payment" }, "documentsFotterPrimary": "When receiving an electronic card, the holder sets the card category (diesel, gasoline, fuel, or universal) and, if necessary, daily and/or monthly limits.", "documentsFotterSecondary": { "beforeLink": "Limits can also be set/changed and cards can be blocked/unblocked in the ", "afterLink": ", or by submitting a written request to the service department at the contract location." }, "lkbLink": "user's personal account", "homeLink": "Home", "upLink": "Up" };
const readerSVG = { "enter": "Enter", "cancel": "Cancel", "return": " Return", "doze": "Doze", "menu": "Menu", "lang": "Lang", "massage1": "Enter your pin", "massage2": "and press 'Enter'" };
const dealResignationMain = { "name": "Termination of Contract", "cardTitle1": "On Termination of Contract with S&P LLC 'BERLIO'", "cardTitle2": "On Termination of Contract with OJSC 'Belgazprombank'", "homeLink": "Home", "upLink": "Up" };
const priceListsAndTariffsMain = { "name": "Price Lists and Tariffs", "cardTitle1": "Price List No. 03/2024 from 22.02.2024 (for residents)", "cardTitle2": "Price List No. 01/24 from 17.01.2024", "cardTitle3": "Price List 03/2022 from 17.03.2022 effective from 21.03.2022", "homeLink": "Home", "upLink": "Up" };
const workWithPrivateAccount = { "name": "Working with the Private Account", "description": "The private account allows system users to independently view and edit contract information:", "list1": { "item1": "general data", "item2": "card list", "item3": "payment list", "item4": "transactions and balance for the current or previous month" }, "sections": "Private Account Sections", "information": "Information", "informationTagline": "contract date, address, phone, email, UNP, bank, organization’s settlement account, current contract balance", "payments": "Payments", "paymentsTagline": "list of contract payments for the current or previous month", "cardList": "Card List", "cardListTagline": "list of contract electronic cards with details such as number, issue date, status, fuel category, and calculated card balance", "report": "Sales Report", "reportTagline": "list of issued petroleum products, goods, and services under the contract’s electronic cards for the month", "balance": "Balance", "balanceTagline": "balance, turnover, and VAT under the contract for the current or previous month", "middleDescriptinon": "Data entry and information changes are carried out upon signing the relevant statement (original document):", "cardTitle1": "Statement", "lkbLink": "Go to Private Account", "homeLink": "Home", "upLink": "Up" };
const documentsForDownloadMain = { "name": "Documents for Download", "boxesHeaders": { "applications": "Applications", "sampleLetters": "Sample Letters", "paymentOrders": "Payment Orders", "notifications": "Notifications" }, "app": { "cardTitle1": "For permission to edit data in the personal account on the website", "cardTitle2": "For debt repayment for legal entities", "cardTitle3": "On contract termination with OJSC 'Belgazprombank'" }, "letters": { "cardTitle1": "For registration of an onboard device", "cardTitle2": "On transferring a card from one contract to another (within the same company)", "cardTitle3": "On card restriction (service, arrest)", "cardTitle4": "On accepting a card from another company", "cardTitle5": "On transferring a card from another company", "cardTitle6": "On registering a vehicle with 4+ axles", "cardTitle7": "On correct payment designation", "cardTitle8": "For clarification of the card code", "cardTitle9": "On erroneous payment to the account of S&P LLC 'BERLIO'", "cardTitle10": "On contract termination with S&P LLC 'BERLIO'" }, "orders": { "cardTitle1": "Sample payment order (for Belarusian residents)", "cardTitle2": "Sample payment order (for non-residents of Belarus)" }, "notify": { "cardTitle1": "Digital Signature Notification" }, "homeLink": "Home", "upLink": "Up" };
const eMoneyRegulationsMain = { "name": "Regulations for the Use of E-Money 'BERLIO'", "descriptionFirst": "As part of the service agreement within the BERLIO e-money payment system (hereinafter referred to as the 'System'), these regulations define the procedure for using BERLIO e-money.", "descriptionSecond": "Due to the established technological communication session schedule in the system (every business day) between processing centers and entities, the crediting of e-money to contracts and electronic cards is carried out as follows:", "descriptionThird": "When using access devices:", "descriptionOl": { "item1": "The customer transfers funds to the settlement account of Belagroprombank OJSC in accordance with the concluded agreement for the purchase of BERLIO e-money.", "item2": "The service provider credits the funds for the purchase of e-money to the customer's contract.", "item3": { "span": "E-money is distributed by the service provider as follows:", "header": "The customer's e-money balance in the system under the contract is divided into two parts per day:", "ulItem1": "- From 18:00 to 24:00, e-money can be used up to 50% of the total balance.", "ulItem2": "- From 24:00 to 18:00 the next day – the remaining 50%." }, "item4": "If the customer has multiple electronic cards under the contract, the e-money balance will be divided not only per day but also among all available cards in proportion to the daily quota.", "item5": "If a transaction was made using a specific electronic card on the current day, this amount reduces the calculated e-money balance for that card (for the current day).", "item6": "On weekends and/or public holidays, the customer's e-money balance in the system under the contract is divided into three parts.", "item7": "The purchase (use) of e-money can be made based on the calculated amount, taking into account (minus) the transactions performed on the current day using this card.", "item8": { "before": "Participants of the system are informed about planned maintenance breaks or technical failures in the system's software and hardware complex, as well as issues with telecommunication operators, through relevant notifications posted", "firstLink": " in the news", "between": " and in", "secondLink": " the client's personal account", "after": " indicating the expected resolution time." } }, "homeLink": "Home", "upLink": "Up" };
const bicAppMain = { "name": "Application 'Berlio Internet Client'", "description": "S&P LLC 'BERLIO' offers its clients a fast and convenient way to access contract information using the 'Berlio Internet Client' mobile application.", "ulHeader": "The application provides full access to contract information:", "item1": "general contract information", "item2": "contract balance", "item3": "list of cards", "item4": "card details", "item5": "contract payments", "item6": "list of transactions", "item7": "electronic invoices", "stong1": "Information is available for the current and previous month. The app menu is intuitive and easy to navigate.", "stong2": "To use the mobile application, you must have a contract with S&P LLC 'BERLIO' for service in the 'BERLIO' electronic money payment system.", "stong3": "Install the mobile application on your phone. Use the same login and password as in your personal account to log in.", "stong4": "Our application is available for Android and iPhone users.", "cardTitle1": "Download from Play Market", "cardTitle2": "Download from Apple Store", "homeLink": "Home", "upLink": "Up" };
const newsBlock = { "sortBy": "Sort by:", "name": "News", "newFirst": "Newest first", "oldFirst": "Oldest first", "backHome": "Back to Home" };
const paymentSystem = { "name": "Electronic Payment System 'BERLIO'", "coverage": "The system is supported by 97% of gas stations in Belarus, as well as gas stations in Russia.", "cardDescription": "Payments for fuel, goods, and services are made using the BERLIO electronic card, which is a plastic card.", "actionSignContract": "Sign a contract", "gasStations": "Gas stations" };
const fuelCards = { "name": "Fuel cards", "fuelCardsDescription1": "Payment for vehicle passage on toll roads", "fuelCardsDescription2": "Deposit cost of the electronic payment device (on-board unit)", "road": "Road", "cardTitle": "Issuance and use of fuel cards" };
const actualSection = { "name": "Actual", "actualBlockTitle1": "List of gas stations without fees", "actualBlockDescription1": "Something needs to be written!", "actualBlockTitle2": "Prompt assistance upon request", "actualBlockDescription2": "Something needs to be written!", "actualBlockTitle3": "Network of gas stations and routes", "actualBlockDescription3": "Something needs to be written!" };
const newsSection = { "title": "Latest news", "linkToNews": "News details", "prev": "left", "next": "right" };
const detailedNewsMain = { "name": "News details", "notFound": "News not found", "backToNews": "Back to News", "date": "Date" };
const ourPartnersLogoSection = { "name": "Our Partners", "mapLink": "GS List", "homeLink": "Home", "upLink": "Up" };
const ourClientsLogoSection = "Our Clients";
const equipment = { "name": "Equipment and Software", "descr1": "Below you can explore the equipment developed for clients and partners of S&P LLC «BERLIO»", "descr2": "Warranty obligations for servicing all installed equipment are valid for one year from the date of installation. Post-warranty maintenance is carried out under an additional agreement between the parties", "partnersSoftSection": { "name": "Software for BERLIO partners", "headline1": "Software “BERLIO Web Center”", "headline2": "Software Package “OIL AND CAPITAL”", "headline3": "Self-service checkout for gas station networks", "headline4": "Software Package “Gas Station Automation System”", "headline5": "Website for issuing invoices", "plate": "Microchip" }, "clientsSoftSection": { "name": "Software for BERLIO clients", "headline1": "Mobile application “BERLIOCARDPAY”", "headline2": "Self-service checkout for gas station networks", "headline3": "Software “Client Personal Account”", "homeLink": "Home", "upLink": "Up" } };
const webCenterMain = { "name": "Software 'Web Center BERLIO'", "description": "The 'WebCenterBerlio' software (hereinafter referred to as WebCenter) is a network application hosted on a server, designed to manage interactions with clients using 'BERLIO' electronic/fuel cards for cashless payments. WebCenter allows for contract registration, card and On-Board Device (OBD) management, electronic wallets (EW) authorization, blocking/unblocking their usage at facilities, financial accounting, and statistical tracking of transactions within the 'BERLIO' electronic money payment system (hereinafter referred to as the System). It enables monitoring of financial flows within the System using EWs and electronic money (EM).", "list1": { "title": "ADVANTAGES OF WebCenter:", "item1": "WebCenter is a network application;", "item2": "Access to application data is available from any computer with network connectivity;", "item3": "Automatic application updates (upon launch);", "item4": "No need to maintain a dedicated server and data backup systems;", "item5": "Online technical support;", "item6": "Continuous project development, feature expansion based on customer requirements and the System's vision;", "item7": "Flexible report customization with various output formats;", "item8": "Qualified service support and timely updates of software and modules to current versions." }, "list2": { "title": "CORE FUNCTIONS FOR CLIENT MANAGEMENT:", "item1": "Signing service contracts with clients within the 'BERLIO' electronic money system;", "item2": "Card issuance tracking;", "item3": "Registering payment documents for contracts;", "item4": "Generating monthly reports;", "item5": "Automatic fund calculation on the card based on the client’s account balance;", "item6": "Generating informational and statistical reports." }, "list3": { "title": "CORE FUNCTIONS OF WEBCENTER FOR SYSTEM PARTICIPANTS, ", "subTitle": "settlement centers of other organizations, and facilities (trade and service points using card processing equipment):", "item1": "Configuration of centers, facilities, and devices;", "item2": "Receiving reports from centers and facilities;", "item3": "Analysis of centers and facilities." }, "homeLink": "Home", "upLink": "Up" };
const oilAndCapitalMain = { "name": "Oil and Capital App", "list": { "title": "Program Description", "subTitle": "The software suite consists of the following programs:", "item1": "«OIL & CAPITAL. Loading» automates the workplace of the operator for loading petroleum products into tank trucks and railway tank cars;", "item2": "«OIL & CAPITAL. Tank Monitoring» provides real-time information about the status of each tank. The program receives this information from the level gauge;", "item3": "«OIL & CAPITAL. Accounting» automates the management of commodity and accounting records at facilities for petroleum product supply, gas supply, commodity bases, and wholesale warehouses, as well as the preparation of documents for ensuring and controlling the quality of petroleum products and gas;", "item4": "«OIL & CAPITAL. Truck Scales. Railway Scales» allows receiving information from electronic truck and railway scales, notifying the operator about the presence of a vehicle on the scales;", "item5": "«OIL & CAPITAL. Chemical Laboratory» is designed to automate the document flow of chemical analysis laboratories for oil, petroleum products, and liquefied hydrocarbon gases." }, "homeLink": "Home", "upLink": "Up" };
const selfServiceCheckoutMain = { "name": "Self-Service Checkout", "descriptionFirst": "Automation of retail processes is one of the most relevant trends of recent times. This trend has also reached gas station networks. Automation allows solving problems in several areas, primarily by providing a wide range of functions for customers and optimizing the work of staff at gas stations.", "descriptionPreBold": "To address these challenges, S&P LLC 'BERLIO' offers a new software product for gas station networks – ", "descriptionBold": "self-service checkout (hereinafter referred to as SSC).", "descriptionSecond": "What is an SSC? What are the advantages of using these systems, and what opportunities do they open up for gas station users?", "list1": { "supDescription": "SSC is a hardware-software complex designed for independent payment of fuel and related goods by customers without involving a gas station operator. The main capabilities of SSC include:", "item1": "payment for fuel and related goods using cashless payment methods: bank cards, 'Berlio' cards, 'Oplati' and 'Cashew' payment systems (contact/contactless);", "item2": "use of loyalty cards, promo codes, and points;", "item3": "payment for fuel and services provided at the gas station (vacuuming, car wash, etc.);", "item4": "payment for coffee and fast food;", "item5": "placement of advertising." }, "descriptionThird": "S&P LLC 'BERLIO' offers a full range of services for the integration and deployment of SSC, as well as technical support and consultation for gas station network specialists. Each implementation project is adapted to the customer's specific features, requirements, and needs – both in terms of technical support and pricing for the work.", "descriptionFourth": "Technically, SSC consists of three main modules: a management and product data processing module, a payment module (including the function of accepting bank cards and loyalty cards), and control scales that ensure weighing accuracy and prevent customer fraud during payment.", "list2": { "supDescription": "What tasks can SSC solve at gas stations:", "item1": "optimization of labor costs and reduction of workload on gas station staff. Self-service checkouts can significantly increase the throughput of gas stations without hiring additional employees, who can be assigned to other tasks;", "item2": "reduction of queues. The increase in the number of customers on weekends and during peak hours not only puts extra pressure on the checkout but also leads to customer dissatisfaction. Installing SSC reduces queues by 15-20%, even during periods of high activity;", "item3": "fast checkout and reduced risk of errors. Modern technologies ensure high accuracy of SSC. The software ensures correct product recognition in fractions of a second, and any delays or incorrect product selections by the customer are resolved almost instantly;", "item4": "ergonomic use of fuel station retail space. Even several self-service checkouts occupy approximately the same space as one traditional checkout, allowing for more efficient use of retail space;", "item5": "increased sales and customer loyalty. Today, retail customers prefer to buy quickly – while having accurate and detailed information about what they are purchasing. SSC can meet all these needs, attracting more visitors;", "item6": "SSC can be used as an affordable and convenient platform for placing contextual advertising (static images, video clips, etc.).", "subDescription": "Today, we can confidently say that the demand for SSC will grow in the near future. Automated retail equipment demonstrates broad capabilities in all aspects of retail – from creating comfortable conditions for customers to significantly increasing sales." }, "homeLink": "Home", "upLink": "Up" };
const gsAutomationSystemMain = { "name": "«Gas Station Automation System App»", "supTitle": "Application Software Package", "subTitle": "Program Description", "descriptionFirst": "The «Gas Station Automation System» application software package is a new project by S&P LLC “BERLIO”, designed to address tasks related to managing a network of fuel stations at various levels. The software is implemented as a multi-level system, enabling remote management of fuel stations from the company’s office, monitoring processes at fuel stations, real-time data transmission and retrieval, task distribution, and updating information at fuel stations, automation of managers’ and operators’ workstations at fuel stations, and much more.", "descriptionSecond": "The App is implemented on a fundamentally new software platform with the capability for rapid deployment, maintenance, and scaling.", "list1": { "title": "UPPER LEVEL", "firstSubTitle": "Level ", "firstSubTitleBold": "«Management»", "secondSubTitleBold": "«Office» Software ", "secondSubTitle": "provides the following tasks from the company’s office:", "item1": "centrally generate and send fuel and service prices to fuel stations;", "item2": "receive currency rates from the National Bank of Belarus, recalculate fuel and service prices, and send them to fuel stations;", "item3": "manage payment methods;", "item4": "manage operator access (add operators, block them);", "item5": "receive real-time information on receipts and sales, tank data;", "item6": "view receipts, documents, and «Z-reports» sent to the SKKO;", "item7": "receive up-to-date product balances;", "item8": "manage media advertising on monitors at fuel stations (upload media files, set playback priority and frequency, track playback statistics).", "imageTitle": "General Scheme of App", "imageAltAndTitle": "General Scheme of App" }, "list2": { "firstSubTitle": "Level ", "firstSubTitleBold": "«Maintenance»", "secondSubTitleBold": "«CTS» Software ", "secondSubTitle": "provides real-time monitoring and maintenance of fuel stations, management of fuel station configurations, viewing system error logs, updating software and databases, and performing data backups." }, "list3": { "title": "LOWER LEVEL", "firstSubTitle": "Level ", "firstSubTitleBold": "«Management»", "secondSubTitleBold": "«Fuel Station Server» Software ", "secondSubTitle": "ensures interaction with the database at the fuel station and external data storage: «Office» software, «CTS» software (with the possibility of working with cloud resources), synchronization of workstations, transmission of equipment control commands at the fuel station (fuel dispensers, vacuum cleaners, car washes, self-service terminals, and other equipment), fuel dispensing via a mobile application («SmartPay» service)." }, "list4": { "firstSubTitle": "Level ", "firstSubTitleBold": "«Manager»", "secondSubTitleBold": "«Manager» Software ", "secondSubTitle": "ensures fuel reception, allows for product accounting, adjustment of fuel parameters in tanks, adjustment of fuel dispenser counters, management of operator access to cash operations, viewing shift statistics, and generating reports." }, "list5": { "firstSubTitle": "Level ", "firstSubTitleBold": "«Operator»", "secondSubTitleBold": "«Operator» Software ", "secondSubTitle": "ensures the sale of fuel, goods, and services at fuel stations for various payment methods, performs cash operations: receipt cancellation, return of goods (services) and fuel, cash deposit and withdrawal, interaction with cash equipment (receipt printers, bank and fuel terminals, scales, barcode (QR-code) scanners, customer displays, etc.), indication of equipment status at fuel stations, report generation, and viewing data necessary for the operator." }, "list6": { "firstSubTitle": "Level ", "firstSubTitleBold": "«Infrastructure»", "secondSubTitleBold": "Tasks addressed:", "item1": "support for advanced fuel station infrastructure:", "item2": "displaying information about fuel station operations (fuel dispensing, order readiness, advertising);", "item3": "license plate recognition and transmission to the automated control system;", "item4": "management of fuel price displays;", "item5": "monitoring the operation of equipment at fuel stations;", "item6": "receiving and processing electronic invoices from oil depots, etc." }, "list7": { "title": "MAIN NEW FEATURES INCLUDE:", "item1": "Flexible and configurable workstation and server configurations, allowing for equal operator workstations with the ability to set priorities for processing receipts when fuel dispensers are activated via reading devices, production of S&P LLC «BERLIO», and payment via mobile applications;", "item2": "Configurable setup with a dedicated server computer, reducing the load on workstations, ensuring database backup, and optimizing background tasks on the server, ultimately eliminating fuel station downtime;", "item3": "Ability to dispense fuel using various modes: «Prepayment», «Postpayment», «Full Tank»;", "item4": "Implementation of sales only in «Receipt Formation» mode, allowing the operator to clearly see the receipt details (total amount, total discount, and discount per item), with no need to re-form the receipt in case of payment cancellation;", "item5": "Ability for the operator to queue multiple receipts. This functionality allows postponing a formed receipt and starting a new one for the next customer in line if the current customer forgets their payment card or steps away for other items;", "item6": "Support for various cash register platforms: fiscal registrar «TFP-115», «TFP-116», «TFP-118», software cash register «iKASSA»;", "item7": "New payment methods: mixed payment (cash + bank card + certificates + gift cards), payment via mobile applications, payment via various payment systems («Oplati», «Cashew»). Adding new payment methods is implemented as a separate module, significantly reducing the time to implement new functionality;", "item8": "Integration with a loyalty program;", "item9": "Touch control in various display modes;", "item10": "Primary receipt formation mode: «Receipt Before Refueling»;", "item11": "Primary mode of operation for «Berlio» cards – «Online»;", "item12": "Ability for the operator to create product groups for adding them to the receipt with a single click (combined products);", "item13": "Ability to dispense cash via bank card;", "item14": "Ability to reconcile reports and receipts with SKKO;", "item15": "Ability to process transactions through the «Calculation» system – an automated information system for a unified settlement and information space (AIS ERIP);", "item16": "Ability to configure printing additional receipts alongside the main receipt;", "item17": "Automated retrieval of full data from level gauges via TCP-IP protocols, allowing for quick response to fuel shortages;", "item18": "Implementation of «Full Tank» refueling via deferred sales, increasing fuel station throughput; and much more." }, "homeLink": "Home", "upLink": "Up" };
const invoicesSiteMain = { "name": "Electronic Invoice Issuance Website", "siteLink": "https://эсчф.бел", "altAndTitle": "interface https://эсчф.бел", "description": "The website for issuing electronic invoices (E-Invoices) is designed to automate the issuance of E-Invoices for clients, legal entities, and individual entrepreneurs, allowing them to independently submit applications for E-Invoice issuance based on an existing cash receipt.", "list1": { "title": "Main features for clients:", "listItem1": "independent preparation of applications for E-Invoice issuance via the website using a cash receipt;", "listItem2": "control over submitted applications (viewing information on the processing status of E-Invoices by the tax authority portal);", "listItem3": "grouping all applications on the website with flexible search and filtering options, as well as exporting to external programs." }, "list2": { "title": "Main features for companies:", "listItem1": "reducing labor costs for preparing and issuing client E-Invoices based on cash receipts;", "listItem2": "reducing employee workload (as clients handle everything independently);", "listItem3": "monitoring submitted E-Invoice applications and managing portal users;", "listItem4": "ability to place advertising banners on the website;", "listItem5": "automatic notifications for selected events (e.g., submission of applications for E-Invoice issuance for a closed period);", "listItem6": "ability to send newsletters to clients who have given their consent (news, legislative changes, etc.)." }, "list3": { "title": "Working with the website: key functions and features:", "listItem1": "Website login - authorization is performed via email and password;", "listItem2": "Portal user registration, which requires the following details:", "listItem2Details": { "item1": "email address;", "item2": "password for portal access;", "item3": "UNP (payer registration number) of the organization;", "item4": "phone number - user's contact number for E-Invoice-related inquiries." }, "listItem3": "Viewing applications (application details):", "listItem3Details": { "item1": "'Application Number' (#) – sequential application number on the portal. Applications are numbered separately for each organization (UNP);", "item2": "'Application Date' - date of application registration on the portal;", "item3": "'Gas Station' - internal number of the trading entity (gas station) within the seller's organization;", "item4": "'Receipt Date' - date and time of purchase;", "item5": "'Receipt Number' (#) - purchase receipt number;", "item6": "'SKNO Number' - trade operation number registered with the tax authority using SKNO (tax control tool);", "item7": "'Product/Service' - name of the product, service, or item according to the receipt;", "item8": "'Payment Method' - cash, bank card, etc.;", "item9": "'Price' - price of the product, item, or service in BYN;", "item10": "'Quantity' - quantity of the product, item, or service in relevant units of measurement;", "item11": "'Total Cost' - cost of the product, item, or service in BYN;", "item12": "'Discount' - discount amount in BYN for this item;", "item13": "'VAT' - value-added tax amount in BYN for this item;", "item14": "'%VAT' - VAT rate in percentage for this item;", "item15": "'E-Invoice Number' - number of the electronic invoice after issuance;", "item16": "'E-Invoice Issuance Date' - date the electronic invoice was issued;", "item17": "'Seller Enterprise' - name of the trading enterprise where the purchase was made;", "item18": "'UNP' - Payer Registration Number of the trading enterprise where the purchase was made;", "item19": "'Address' - legal address of the trading enterprise where the purchase was made;", "item20": "'Code' - numeric code of the electronic invoice status;", "item21": "'E-Invoice Status' - textual description of the invoice status." } }, "list4": { "listItem1": "Application search.", "listItem2": "Filters.", "listItem3": "Adding an application.", "listItem4": "Copying an application.", "listItem5": "Canceling an application.", "listItem6": "Refreshing the application list.", "listItem7": "Printing applications." }, "list5": { "title": "Exporting applications to a file:", "subTitle": "The E-Invoice portal supports application export in the following formats:", "listItem1": "'WORD' (Microsoft Word Document - DOCX)", "listItem2": "'EXCEL' (Microsoft Excel Document - XLSX)", "listItem3": "'PDF' (PDF Document: can be viewed using Adobe Reader, Foxit Reader, Microsoft Word, etc.)", "listItem4": "'CSV' (CSV Document: can be viewed in Microsoft Excel, imported into external programs such as '1C', etc.)", "listItem5": "'XML' (XML Document: can be imported into external programs such as '1C', etc.)", "listItem6": "'JSON' (JSON Document: can be imported into external programs such as '1C', etc.)" }, "list6": { "title": "Contract signing and supply conditions:", "firstSubTitle": "The service operates using the API interface 'APIBerlioInfo', which functions online.", "secondSubTitle": "Service connection cost:", "listItem1": "Website license - 1,420.00 BYN excluding VAT (one-time payment, service price may change, check with the manager). Supply is made under a license agreement.", "listItem2": "Use of the API interface 'APIBerlioInfo' (monthly payment). Connection is made under a separate contract with monthly payment according to the price list." }, "list7": { "title": "Tariff plans for API 'Berlio Info' access:", "subTitle": "Price list" }, "list8": { "title": "ADDITIONALLY:", "firstSubTitle": "Deploying a website under your company name. For example,", "colorSpan": "'company.эсчф.бел'", "secondSubTitle": "Printing information about the E-Invoice issuance website on gas station receipts." }, "homeLink": "Home", "upLink": "Up" };
const invoicesSiteTariffsMain = { "name": "API «Berlio Info»", "description": "The «API «Berlio Info»» software is an online-mode programming interface that allows users to request information about the status of a contract (fuel cards) and all processed payments. Upon the user's request, any contract-related information can be configured for retrieval.", "strongDescription": "The «API «Berlio Info»» is available to all users who have signed a service agreement with the «Berlio» electronic money system.", "list": { "title": "Key tasks addressed:", "listItem1": "retrieving a list of clients;", "listItem2": "obtaining client information;", "listItem3": "retrieving a list of cards under the contract;", "listItem4": "obtaining balance and turnover data for any given month/period;", "listItem5": "generating a list of client transactions and payments;", "listItem6": "exporting data to various accounting systems in formats (XML, JSON);", "listItem7": "retrieving information in «Online» and «24/7» modes, etc.", "ps": "The full list of available requests can be viewed on the service website:" }, "wrapper1": { "title": "API Connection", "subTitle": "To gain access to the «API «Berlio Info»» interface, please submit a formal request on company letterhead, indicating the organization's name and contract number. Send requests to the following address:" }, "serviceCardHeader": "Tariff plans for access to the «API «Berlio Info» interface", "cardTitle1": "Tariffs for access to «API «Berlio Info»", "wrapper2": { "title": "API Connection Guide", "cont1": { "title": "Requirements for API Connection", "subTitle": "Requirements", "listItem1": "Access to the «API «Berlio Info»» (hereinafter referred to as the API) is only available to clients who have signed a service agreement with the «Berlio» electronic money system.", "listItem2": "Before using the API, review the Price List for access services.", "listItem3": "To request API access, send a written application to enable this service under the contract." }, "cont2": { "title": "API Connection Procedure", "subTitle": "Connection", "listItem1": "Upon receiving the API access request, the client will be provided with a token for calling API methods.", "listItem2": "The expandable list of API methods is available at:", "listItem3": "The client independently develops their own software to access the API." }, "cont3": { "title": "Payment for API Access", "subTitle": "Payment", "listItem1": "Fees are deducted monthly from the contract as a lump sum based on the total number of requests made during the month, according to the Price List.", "listItem2": "After each API call (request), the service cost is calculated, and the deduction amount is adjusted accordingly." } }, "homeLink": "Home", "upLink": "Up" };
const berlioCardPayMain = { "name": "Application “BERLIOCARDPAY”", "description": { "title": "BerlioCardPay", "subTitle": "Mobile application «BerlioCardPay» for legal entities and gas station networks working with “BERLIO” electronic money.", "listTitle": "Application features:", "item1": "“BERLIO” electronic cards in your mobile phone;", "item2": "linking electronic cards to the application via personal account", "item3": "real-time fueling statistics;", "item4": "refueling with a virtual card without leaving your car." }, "homeLink": "Home", "upLink": "Up" };
const smartPayAppMain = { "name": "“SMARTPAY” Application", "description": { "title": "Program Description", "subTitle1": "The «SmartPay» software is a fuel payment system at gas stations via a mobile application.", "subTitle2": "The software is a service-oriented application complex that enables payment and activation of fuel dispensers at gas stations through a mobile application, without operator involvement.", "listTitle": "The «SmartPay» software consists of two parts:", "item1": "«SmartPayClient» (installed at the Customer's gas station);", "item2": "«SmartPayServer» (installed at the Developer's office server).", "ps": "The interaction between the «SmartPay» software and the mobile application is carried out through the Customer's server in accordance with the protocol provided by the Developer." }, "homeLink": "Home", "upLink": "Up" };
const personalAccWebAppMain = { "name": "“Customer Personal Account” Software", "description": { "title": "Program Description", "subTitle": "The «Customer Personal Account» software is designed to provide customers with necessary information about their account, cards, transactions, payments, as well as card management, downloading report documents, and connecting additional services.", "listTitle": "Key tasks addressed:", "item1": "viewing current account status information;", "item2": "viewing and editing card data, setting card limits;", "item3": "receiving report information on transactions (including lists of e-invoices submitted to the tax inspectorate portal), payments, turnovers and balances for various periods;", "item4": "connecting various services (balance notifications, SMS and Email alerts, toll road payments, ordering fuel cards from other operators, mobile top-ups, and others)." }, "homeLink": "Home", "upLink": "Back to top" };
const privacyMain = { "name": "Data Processing Policies", "cookieConsentPolicy": "Cookie Policy", "buyersPrivacy": "Personal Data Processing Policy for Buyers", "b2bPrivacy": "Personal Data Processing Policy for Customer Representatives", "applicantsPrivacy": "Personal Data Processing Policy for Job Applicants" };
const telFax = "(tel / fax)";
const fax = "(fax)";
const forOrganizations = "For Organizations";
const forClientInquiries = "For Client Inquiries";
const technicalSupport = "Technical Support";
const ourBranchesAndContacts = "Our Branches and Contacts";
const workingHours = "Mon - Thu: 08:30 AM - 05:30 PM";
const fridayWorkingHours = "Fri: 08.30 AM - 04.15 PM";
const daysOff = "Sat - Sun: Day Off";
const rulesOfUse = "Rules of Use";
const offerAgreement = "Offer Agreement";
const privacy = "Privacy Policy";
const help = "Help";
const copyright = "© {{year}} S&P LLC “BERLIO”";
const translationEn = {
  pageTitles,
  departmentsPhone,
  allContacts,
  searchAzs,
  personalAccount,
  customerService,
  backToHome,
  companyName,
  minskName,
  minskAddress,
  minskFooterAddress,
  minskShortAddress,
  inMinskCity,
  brestName,
  brestAddress,
  brestFooterAddress,
  brestShortAddress,
  inBrestCity,
  vitebskName,
  vitebskAddress,
  vitebskFooterAddress,
  vitebskShortAddress,
  inVitebskCity,
  gomelName,
  gomelAddress,
  gomelFooterAddress,
  gomelShortAddress,
  inGomelCity,
  grodnoName,
  grodnoAddress,
  grodnoFooterAddress,
  grodnoShortAddress,
  inGrodnoCity,
  mogilevName,
  mogilevAddress,
  mogilevFooterAddress,
  mogilevShortAddress,
  inMogilevCity,
  smolenskName,
  smolenskAddress,
  belarusName,
  russiaName,
  aboutBerlio,
  forPartners: forPartners$1,
  forClients: forClients$1,
  news,
  equipmentAndSoftware,
  contacts,
  closeMenu,
  noResult,
  search,
  appliedProgramsAndSoftware,
  webCenterBerlio,
  oilAndCapital,
  selfServiceCashRegister,
  gasStationAutomationSystem,
  invoiceWebsite,
  usefulInformation,
  voiceInfoService,
  loyaltyProgram,
  downloadableDocuments,
  berlioPaymentRules,
  bankInformation,
  electronicPaymentSystem,
  contractConclusion,
  eCardReceipt,
  eCardUsage,
  contractTermination,
  ratesAndTariffs,
  personalAccountUsage,
  fuelCardsAndGasStations,
  gasStationsAndRoutes,
  fuelCardUsage,
  tollRoads,
  fuelPayment,
  regulatoryDocuments,
  berlioEWalletRules,
  berlioUsageRegulations,
  servicesAndSoftware,
  berlioInternetClient,
  berlioCardPayApp,
  smartPayApp,
  clientCabinetSoftware,
  breadCrumbs,
  mainBlock,
  aboutBlock,
  systemSection,
  purposeSection,
  cpsSection,
  forPartnersMain,
  partnersAdvantages,
  partners,
  voiceRefServiceMain,
  loyaltyProgramMain,
  forBankInfoMain,
  forBankInfoContact,
  forBankInfoDoc,
  forClientsMain,
  clientsAdvantages,
  clients,
  signAndResignMain,
  signAndResignSection,
  gettingCardMain,
  readerSVG,
  dealResignationMain,
  priceListsAndTariffsMain,
  workWithPrivateAccount,
  documentsForDownloadMain,
  eMoneyRegulationsMain,
  bicAppMain,
  newsBlock,
  paymentSystem,
  fuelCards,
  actualSection,
  newsSection,
  detailedNewsMain,
  ourPartnersLogoSection,
  ourClientsLogoSection,
  equipment,
  webCenterMain,
  oilAndCapitalMain,
  selfServiceCheckoutMain,
  gsAutomationSystemMain,
  invoicesSiteMain,
  invoicesSiteTariffsMain,
  berlioCardPayMain,
  smartPayAppMain,
  personalAccWebAppMain,
  privacyMain,
  telFax,
  fax,
  forOrganizations,
  forClientInquiries,
  technicalSupport,
  ourBranchesAndContacts,
  workingHours,
  fridayWorkingHours,
  daysOff,
  rulesOfUse,
  offerAgreement,
  privacy,
  help,
  copyright
};
function SearchInput({ placeholder }) {
  const { t, i18n: i18n2 } = useTranslation();
  const [query, setQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const content = i18n2.language === "ru" ? translationRu : translationEn;
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  const performSearch = useCallback((searchQuery, contentData) => {
    const results = [];
    const allowedKeys = Object.keys(routes);
    const searchRecursive = (obj, path = "") => {
      Object.keys(obj).forEach((key) => {
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof obj[key] === "string") {
          if (obj[key].toLowerCase().includes(searchQuery.toLowerCase())) {
            const parentKey = currentPath.split(".")[0];
            if (allowedKeys.includes(parentKey)) {
              results.push({
                text: obj[key],
                parentKey,
                url: `${baseUrl}${routes[parentKey]}`
              });
            }
          }
        } else if (typeof obj[key] === "object") {
          searchRecursive(obj[key], currentPath);
        }
      });
    };
    searchRecursive(contentData);
    return results;
  }, [baseUrl]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query && query.length > 0) {
        const results = performSearch(query, content);
        setSearchResults(results);
        setNoResults(results.length === 0);
      } else {
        setSearchResults([]);
        setNoResults(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, content, performSearch]);
  const highlightText = (text, searchQuery) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return parts.map((part) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return /* @__PURE__ */ React__default.createElement("span", { key: `highlight-${part}`, className: "highlight" }, part);
      }
      return part;
    });
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleBlur = () => {
    setQuery("");
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_search-container" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_search-block" }, /* @__PURE__ */ React__default.createElement(SearchIcon, null), /* @__PURE__ */ React__default.createElement(
    "input",
    {
      name: "SearchInput",
      type: "text",
      value: query,
      onChange: handleChange,
      onBlur: handleBlur,
      placeholder,
      className: "aam_search-input",
      autoComplete: "off"
    }
  )), noResults && query && /* @__PURE__ */ React__default.createElement("div", { className: "aam_no-results-message" }, t("noResult", { query })), searchResults.length > 0 && /* @__PURE__ */ React__default.createElement("div", { className: "aam_search-results" }, searchResults.map((result) => /* @__PURE__ */ React__default.createElement(
    "div",
    {
      key: `${result.text}-${result.url}`,
      className: "aam_search-result"
    },
    /* @__PURE__ */ React__default.createElement("a", { href: result.url }, highlightText(result.text, query))
  ))));
}
SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired
};
function ServiceCard({
  Icon = null,
  title,
  description = "",
  link = "",
  onClick = null,
  id = null,
  className = ""
}) {
  const isExternalLink = typeof link === "string" && link.startsWith("http");
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(link);
    }
  };
  const CardContent = /* @__PURE__ */ React__default.createElement("div", { id, className: `aam_service-card__button ${className}` }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_service-card__icon" }, Icon && /* @__PURE__ */ React__default.createElement(Icon, null)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_service-card__content" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_service-card__title" }, title), /* @__PURE__ */ React__default.createElement("p", { className: "aam_service-card__description" }, description)));
  return isExternalLink ? /* @__PURE__ */ React__default.createElement(
    "a",
    {
      href: link,
      onClick: handleClick,
      className: `aam_service-card ${className}`,
      target: "_blank",
      rel: "noopener noreferrer"
    },
    CardContent
  ) : /* @__PURE__ */ React__default.createElement(Link, { to: link, onClick: handleClick, className: `aam_service-card ${className}` }, CardContent);
}
ServiceCard.propTypes = {
  Icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string
};
function OilIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 70,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 70",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M23.7641 1.77929e-06H27.1191C31.2537 -6.5366e-05 34.5862 -0.000119518 37.2073 0.37938C39.9285 0.773387 42.2197 1.6163 44.0395 3.57603C45.8592 5.53575 46.6419 8.00325 47.0078 10.9338C47.3601 13.7565 47.3601 17.3455 47.36 21.7981V48.8372H49.8434C53.4809 48.8372 56.4297 52.0129 56.4297 55.9302V56.1628C56.4297 57.5114 57.4449 58.6047 58.6971 58.6047C59.9494 58.6047 60.9646 57.5114 60.9646 56.1628V43.2716L56.5461 41.6855C53.7684 40.6884 51.8949 37.889 51.8949 34.7358V26.8605C51.8949 22.8147 54.9403 19.5349 58.6971 19.5349H60.9398C60.7924 17.6797 59.9939 15.9513 58.7028 14.7049C58.5718 14.5784 58.4222 14.4484 57.9853 14.072L54.2575 10.8603C53.2796 10.0178 53.1211 8.48115 53.9033 7.42807C54.6856 6.37499 56.1125 6.20425 57.0903 7.04672L60.867 10.3005C61.2369 10.6191 61.4921 10.839 61.7298 11.0684C63.9641 13.2255 65.3133 16.2485 65.4816 19.4749C65.4995 19.8181 65.4994 20.17 65.4994 20.6801V41.4547C65.5002 41.4923 65.5002 41.5301 65.4994 41.5679V56.1628C65.4994 60.2086 62.4539 63.4884 58.6971 63.4884C54.9403 63.4884 51.8949 60.2086 51.8949 56.1628V55.9302C51.8949 54.7101 50.9764 53.7209 49.8434 53.7209H47.36V65.1163H48.1158C49.3681 65.1163 50.3833 66.2095 50.3833 67.5581C50.3833 68.9067 49.3681 70 48.1158 70H2.76742C1.51516 70 0.5 68.9067 0.5 67.5581C0.5 66.2095 1.51516 65.1163 2.76742 65.1163H3.52323L3.52323 21.7981C3.52316 17.3455 3.52311 13.7565 3.8755 10.9338C4.24136 8.00325 5.02406 5.53575 6.84379 3.57603C8.66352 1.6163 10.9547 0.773387 13.676 0.37938C16.297 -0.000119518 19.6296 -6.5366e-05 23.7641 1.77929e-06ZM8.05807 65.1163H42.8252V21.9767C42.8252 17.3033 42.8204 14.0439 42.5133 11.5846C42.2151 9.19554 41.6696 7.93043 40.8328 7.02934C39.9961 6.12825 38.8214 5.54075 36.603 5.21955C34.3194 4.88891 31.2928 4.88372 26.9532 4.88372H23.93C19.5904 4.88372 16.5638 4.88891 14.2802 5.21955C12.0619 5.54075 10.8871 6.12825 10.0504 7.02934C9.21369 7.93043 8.66816 9.19554 8.36991 11.5846C8.06288 14.0439 8.05807 17.3033 8.05807 21.9767V65.1163ZM60.9646 38.1237V24.4186H58.6971C57.4449 24.4186 56.4297 25.5119 56.4297 26.8605V34.7358C56.4297 35.7869 57.0542 36.72 57.9801 37.0524L60.9646 38.1237ZM20.7715 13.0232C20.8165 13.0233 20.8616 13.0233 20.9068 13.0233H29.9765C30.0217 13.0233 30.0668 13.0233 30.1118 13.0232C31.4203 13.0231 32.62 13.0229 33.5959 13.1642C34.6706 13.3198 35.8065 13.6859 36.7407 14.6921C37.675 15.6982 38.0149 16.9215 38.1594 18.0789C38.2906 19.1299 38.2905 20.4219 38.2904 21.8311V22.1224C38.2905 23.5316 38.2906 24.8236 38.1594 25.8746C38.0149 27.032 37.675 28.2553 36.7407 29.2614C35.8065 30.2675 34.6706 30.6336 33.5959 30.7893C32.62 30.9306 31.4202 30.9304 30.1117 30.9302C30.0668 30.9302 30.0217 30.9302 29.9765 30.9302H20.9068C20.8616 30.9302 20.8165 30.9302 20.7715 30.9302C19.463 30.9304 18.2633 30.9306 17.2874 30.7893C16.2127 30.6336 15.0768 30.2675 14.1425 29.2614C13.2083 28.2553 12.8683 27.032 12.7238 25.8746C12.5926 24.8236 12.5927 23.5316 12.5929 22.1224C12.5929 22.074 12.5929 22.0254 12.5929 21.9767C12.5929 21.928 12.5929 21.8795 12.5929 21.831C12.5927 20.4219 12.5926 19.1299 12.7238 18.0789C12.8683 16.9215 13.2083 15.6982 14.1425 14.6921C15.0768 13.6859 16.2127 13.3198 17.2874 13.1642C18.2633 13.0229 19.463 13.0231 20.7715 13.0232ZM17.3493 18.1452C17.3503 18.1443 17.3505 18.1439 17.3493 18.1452V18.1452ZM17.3565 18.1409L17.3493 18.1452L17.345 18.1534C17.3419 18.1596 17.3371 18.1704 17.3308 18.1869C17.3037 18.2578 17.2575 18.4152 17.2182 18.7296C17.1326 19.4157 17.1278 20.3729 17.1278 21.9767C17.1278 23.5806 17.1326 24.5378 17.2182 25.2239C17.2575 25.5383 17.3037 25.6957 17.3308 25.7666C17.3371 25.7831 17.3419 25.7938 17.345 25.8001L17.3492 25.8081L17.3565 25.8125C17.3624 25.8158 17.3724 25.8211 17.3876 25.8279C17.4535 25.857 17.5997 25.9068 17.8916 25.9491C18.5287 26.0413 19.4175 26.0465 20.9068 26.0465H29.9765C31.4657 26.0465 32.3546 26.0413 32.9916 25.9491C33.2836 25.9068 33.4298 25.857 33.4956 25.8279C33.5109 25.8211 33.5209 25.8158 33.5267 25.8125L33.5341 25.8081L33.5383 25.8001C33.5413 25.7938 33.5462 25.7831 33.5525 25.7666C33.5796 25.6957 33.6258 25.5383 33.665 25.2239C33.7507 24.5378 33.7555 23.5806 33.7555 21.9767C33.7555 20.3729 33.7507 19.4157 33.665 18.7296C33.6258 18.4152 33.5796 18.2578 33.5525 18.1869C33.5462 18.1704 33.5413 18.1596 33.5383 18.1534L33.5341 18.1454L33.5267 18.1409C33.5209 18.1377 33.5109 18.1324 33.4956 18.1256C33.4298 18.0965 33.2836 18.0467 32.9916 18.0044C32.3546 17.9122 31.4657 17.907 29.9765 17.907H20.9068C19.4175 17.907 18.5287 17.9122 17.8916 18.0044C17.5997 18.0467 17.4535 18.0965 17.3876 18.1256C17.3724 18.1324 17.3624 18.1377 17.3565 18.1409ZM17.3492 25.8081C17.3479 25.8067 17.3484 25.807 17.3492 25.8081V25.8081ZM33.5341 25.8081C33.534 25.8081 33.5341 25.8081 33.5341 25.8081V25.8081ZM33.5341 25.8081C33.534 25.8081 33.5341 25.8081 33.5341 25.8081V25.8081ZM15.6161 51.2791C15.6161 49.9305 16.6313 48.8372 17.8836 48.8372H32.9997C34.252 48.8372 35.2671 49.9305 35.2671 51.2791C35.2671 52.6277 34.252 53.7209 32.9997 53.7209H17.8836C16.6313 53.7209 15.6161 52.6277 15.6161 51.2791Z",
        fill: fillColor
      }
    )
  );
}
OilIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function PaymentCardIcon({
  fillColor = "#48AE5A",
  width = 69,
  height = 52,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 69 52",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "m47.313 35.167c-0.68 0-1.332 0.2897-1.812 0.8054-0.481 0.5158-0.751 1.2152-0.751 1.9446 0 0.7293 0.27 1.4288 0.751 1.9445 0.48 0.5157 1.132 0.8055 1.812 0.8055h8.541c0.68 0 1.332-0.2898 1.812-0.8055 0.481-0.5157 0.751-1.2152 0.751-1.9445 0-0.7294-0.27-1.4288-0.751-1.9446-0.48-0.5157-1.132-0.8054-1.812-0.8054zm-46.98-22.917c0-3.1605 1.17-6.1915 3.253-8.4263 2.082-2.2349 4.907-3.4904 7.852-3.4904h46.125c1.458 0 2.902 0.3083 4.249 0.9071 1.347 0.5989 2.571 1.4767 3.602 2.5833 1.031 1.1065 1.849 2.4202 2.407 3.866 0.558 1.4458 0.846 2.9954 0.846 4.5603v27.5c0 1.5649-0.288 3.1145-0.846 4.5603s-1.376 2.7595-2.407 3.8661c-1.031 1.1065-2.255 1.9843-3.602 2.5832s-2.791 0.9071-4.249 0.9071h-46.125c-2.945 0-5.77-1.2555-7.852-3.4903-2.083-2.2348-3.253-5.2659-3.253-8.4264zm63.209 4.5833v-4.5833c0-1.7018-0.63-3.3339-1.752-4.5373-1.121-1.2033-2.642-1.8794-4.227-1.8794h-46.125c-1.586 0-3.107 0.6761-4.228 1.8794-1.122 1.2034-1.752 2.8355-1.752 4.5373v4.5833zm-58.084 5.5v17.417c0 3.542 2.679 6.4167 5.98 6.4167h46.125c1.585 0 3.106-0.6761 4.227-1.8794 1.122-1.2034 1.752-2.8355 1.752-4.5373v-17.417z",
        fill: fillColor
      }
    )
  );
}
PaymentCardIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function MapIcon({
  fillColor = "#48AE5A",
  width = 76,
  height = 76,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 76 76",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M61.3213 7.78625C63.77 9.70625 65.4575 12.8075 66.1475 16.055C66.231 16.0814 66.3125 16.114 66.3913 16.1525L74.06 19.7C74.4886 19.8968 74.852 20.2122 75.1072 20.6089C75.3624 21.0056 75.4987 21.4671 75.5 21.9387V68.315C75.4973 68.7002 75.4053 69.0796 75.2313 69.4233C75.0573 69.7671 74.8061 70.0658 74.4973 70.2962C74.1885 70.5265 73.8305 70.6821 73.4514 70.7509C73.0724 70.8197 72.6825 70.7997 72.3125 70.6925L51.0537 64.6925L25.7788 71.66C25.3227 71.7852 24.8407 71.7801 24.3875 71.645L2.2775 65.0637C1.76645 64.9136 1.31746 64.6027 0.997233 64.1771C0.677004 63.7514 0.502624 63.2339 0.5 62.7012L0.5 15.4925C0.5 13.8425 2.105 12.6575 3.70625 13.1225L25.0888 19.3512L35.9562 16.025C36.1058 15.9808 36.2589 15.9495 36.4137 15.9312C36.8337 13.4712 38.0075 11.1087 39.9762 8.80625C42.3125 6.06875 46.4112 4.46375 50.405 4.2725C54.5487 4.07375 57.7138 4.95875 61.3175 7.7825M5.49875 18.8037V60.86L23.7612 66.2937V24.1175L5.49875 18.8037ZM36.2825 21.1062L28.76 23.405V65.7012L47.7537 60.4737V48.1175C47.7537 46.7525 48.875 45.6462 50.255 45.6462C51.635 45.6462 52.7525 46.7525 52.7525 48.1212V60.035L70.5013 65.0412V23.51L66.3013 21.56C66.23 21.9725 66.14 22.3775 66.0275 22.7712C65.212 25.6466 63.844 28.3355 62 30.6875L52.7113 42.2862C52.4667 42.5912 52.1543 42.8349 51.799 42.9979C51.4437 43.161 51.0553 43.2388 50.6646 43.2254C50.2739 43.2119 49.8918 43.1074 49.5485 42.9203C49.2053 42.7332 48.9105 42.4686 48.6875 42.1475L40.0062 29.5737C38.5737 27.5712 37.5688 25.7862 37.0025 24.1887C36.6471 23.1917 36.4055 22.1576 36.2825 21.1062ZM50.645 9.215C47.9225 9.34625 45.125 10.4412 43.7938 11.9975C42.1925 13.8725 41.405 15.6275 41.2475 17.405C41.06 19.5462 41.1875 21.0575 41.72 22.5537C42.1138 23.66 42.8975 25.0625 44.1087 26.7537L50.9 36.5862L58.0625 27.6425C59.5075 25.7958 60.5787 23.6852 61.2163 21.4287C62.1162 18.2787 60.7588 13.6512 58.2162 11.6637C55.61 9.62 53.6413 9.06875 50.6488 9.215M51.1662 11.8287C55.3062 11.8287 58.6662 15.1475 58.6662 19.2425C58.6608 20.2218 58.4625 21.1905 58.0827 22.0932C57.7028 22.9958 57.1488 23.8148 56.4523 24.5033C55.7558 25.1917 54.9305 25.7362 54.0235 26.1057C53.1165 26.4751 52.1456 26.6622 51.1662 26.6562C47.0262 26.6562 43.6662 23.3375 43.6662 19.2425C43.6662 15.1475 47.0262 11.8287 51.1662 11.8287ZM51.1662 16.7712C50.8397 16.7693 50.5161 16.8316 50.2137 16.9547C49.9113 17.0779 49.6361 17.2594 49.4038 17.4888C49.1715 17.7183 48.9867 17.9913 48.86 18.2922C48.7332 18.5931 48.667 18.916 48.665 19.2425C48.665 20.6075 49.7862 21.7137 51.1662 21.7137C51.4927 21.7152 51.8163 21.6524 52.1186 21.5288C52.4208 21.4052 52.6957 21.2233 52.9276 20.9935C53.1595 20.7637 53.3439 20.4904 53.4702 20.1893C53.5965 19.8883 53.6623 19.5652 53.6637 19.2387C53.6588 18.5807 53.3931 17.9514 52.925 17.4888C52.4568 17.0263 51.8244 16.7683 51.1662 16.7712Z",
        fill: fillColor
      }
    )
  );
}
MapIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
const mainBlockJPG = "/assets/images/mainBlock.jpg";
function SparklingLights() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const lightSources = [
      {
        x: 250,
        y: 10,
        radius: 9,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.01
      },
      {
        x: 270,
        y: 13,
        radius: 12,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.01
      },
      {
        x: 615,
        y: 129,
        radius: 25,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.01
      }
    ];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1180;
    const width = 1180;
    canvas.height = 464;
    const height = 464;
    const backgroundImage = new Image();
    backgroundImage.src = mainBlockJPG;
    backgroundImage.loading = "eager";
    let lights = [...lightSources];
    const drawLights = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(backgroundImage, 0, 0, width, height);
      lights = lights.map((light) => {
        let newOpacity = light.opacity + light.speed;
        let newSpeed = light.speed;
        if (newOpacity > 1 || newOpacity < 0) {
          newSpeed = -newSpeed;
          newOpacity = light.opacity + newSpeed;
        }
        const updatedLight = { ...light, opacity: newOpacity, speed: newSpeed };
        const gradient = ctx.createRadialGradient(
          updatedLight.x,
          updatedLight.y,
          0,
          updatedLight.x,
          updatedLight.y,
          updatedLight.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${updatedLight.opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${updatedLight.opacity * 0.4})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(updatedLight.x, updatedLight.y, updatedLight.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        return updatedLight;
      });
      requestAnimationFrame(drawLights);
    };
    backgroundImage.onload = () => {
      drawLights();
    };
    const resizeHandler = () => {
      canvas.width = 1180;
      canvas.height = 464;
      if (backgroundImage.complete) {
        ctx.drawImage(backgroundImage, 0, 0, width, height);
      }
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_sparkling-container" }, /* @__PURE__ */ React__default.createElement("canvas", { ref: canvasRef, className: "aam_canvas" }));
}
function MainBlock() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_main-block" }, /* @__PURE__ */ React__default.createElement("header", { className: "aam_main-block__header" }, /* @__PURE__ */ React__default.createElement("h1", null, t("mainBlock.companyName")), /* @__PURE__ */ React__default.createElement(SparklingLights, null)), /* @__PURE__ */ React__default.createElement("section", { className: "aam_main-block__services" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: OilIcon,
      title: t("mainBlock.headline"),
      description: t("mainBlock.tagline"),
      link: "/clients/signAndResign"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: PaymentCardIcon,
      title: t("mainBlock.fuelCardUsage"),
      description: t("mainBlock.belTollServices"),
      link: "/clients/plasticCardUsageRules"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: MapIcon,
      title: t("mainBlock.nonResidentServices"),
      description: t("mainBlock.nonResidentSupport"),
      link: "/clients/nonResidentsSupport"
    }
  )), /* @__PURE__ */ React__default.createElement("footer", { className: "aam_main-block__footer" }, /* @__PURE__ */ React__default.createElement(LinkTo, { href: "/about", text: t("mainBlock.readMore") })));
}
function Button({
  label,
  onClick,
  type = "button",
  variant = "default",
  className = "",
  disabled = false
}) {
  const baseClass = "aam_button";
  const variantClass = variant !== "default" ? `${baseClass}--${variant}` : "";
  return /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: type === "submit" ? "submit" : "button",
      className: `${baseClass} ${variantClass} ${className}`.trim(),
      onClick,
      disabled
    },
    label
  );
}
Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["default", "green", "white", "danger"]),
  // Можно расширять
  className: PropTypes.string,
  // Для кастомных случаев
  disabled: PropTypes.bool
};
const GasStationPNG = "/assets/images/gas-station.png";
function PaymentSystem() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/clients/signAndResign");
  };
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_payment-system" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_payment-system__title" }, t("paymentSystem.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_payment-system__description" }, t("paymentSystem.coverage"), /* @__PURE__ */ React__default.createElement("br", null), t("paymentSystem.cardDescription")), /* @__PURE__ */ React__default.createElement(
    Button,
    {
      label: t("paymentSystem.actionSignContract"),
      onClick: handleButtonClick,
      variant: "green"
    }
  ), /* @__PURE__ */ React__default.createElement("div", { className: "aam_payment-system__image" }, /* @__PURE__ */ React__default.createElement("img", { src: GasStationPNG, alt: t("paymentSystem.gasStations"), loading: "lazy" })));
}
function PdfIcon({
  fillColor = "#48AE5A",
  width = 76,
  height = 75,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 76 75",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M66.125 44.5312C66.125 45.1529 65.8781 45.749 65.4385 46.1885C64.999 46.6281 64.4029 46.875 63.7812 46.875H56.75V51.5625H61.4375C62.0591 51.5625 62.6552 51.8094 63.0948 52.249C63.5343 52.6885 63.7812 53.2846 63.7812 53.9062C63.7812 54.5279 63.5343 55.124 63.0948 55.5635C62.6552 56.0031 62.0591 56.25 61.4375 56.25H56.75V60.9375C56.75 61.5591 56.5031 62.1552 56.0635 62.5948C55.624 63.0343 55.0279 63.2812 54.4062 63.2812C53.7846 63.2812 53.1885 63.0343 52.749 62.5948C52.3094 62.1552 52.0625 61.5591 52.0625 60.9375V44.5312C52.0625 43.9096 52.3094 43.3135 52.749 42.874C53.1885 42.4344 53.7846 42.1875 54.4062 42.1875H63.7812C64.4029 42.1875 64.999 42.4344 65.4385 42.874C65.8781 43.3135 66.125 43.9096 66.125 44.5312ZM27.4531 50.3906C27.4531 52.5662 26.5889 54.6527 25.0505 56.1911C23.5121 57.7295 21.4256 58.5938 19.25 58.5938H16.9062V60.9375C16.9062 61.5591 16.6593 62.1552 16.2198 62.5948C15.7802 63.0343 15.1841 63.2812 14.5625 63.2812C13.9409 63.2812 13.3448 63.0343 12.9052 62.5948C12.4657 62.1552 12.2188 61.5591 12.2188 60.9375V44.5312C12.2188 43.9096 12.4657 43.3135 12.9052 42.874C13.3448 42.4344 13.9409 42.1875 14.5625 42.1875H19.25C21.4256 42.1875 23.5121 43.0518 25.0505 44.5901C26.5889 46.1285 27.4531 48.215 27.4531 50.3906ZM22.7656 50.3906C22.7656 49.4582 22.3952 48.564 21.7359 47.9047C21.0766 47.2454 20.1824 46.875 19.25 46.875H16.9062V53.9062H19.25C20.1824 53.9062 21.0766 53.5359 21.7359 52.8765C22.3952 52.2172 22.7656 51.323 22.7656 50.3906ZM48.5469 52.7344C48.5469 55.5316 47.4357 58.2142 45.4578 60.1921C43.4798 62.1701 40.7972 63.2812 38 63.2812H33.3125C32.6909 63.2812 32.0948 63.0343 31.6552 62.5948C31.2157 62.1552 30.9688 61.5591 30.9688 60.9375V44.5312C30.9688 43.9096 31.2157 43.3135 31.6552 42.874C32.0948 42.4344 32.6909 42.1875 33.3125 42.1875H38C40.7972 42.1875 43.4798 43.2987 45.4578 45.2766C47.4357 47.2545 48.5469 49.9372 48.5469 52.7344ZM43.8594 52.7344C43.8594 51.1804 43.2421 49.69 42.1432 48.5912C41.0444 47.4923 39.554 46.875 38 46.875H35.6562V58.5938H38C39.554 58.5938 41.0444 57.9764 42.1432 56.8776C43.2421 55.7787 43.8594 54.2884 43.8594 52.7344ZM12.2188 32.8125V11.7188C12.2188 10.4755 12.7126 9.28326 13.5917 8.40419C14.4708 7.52511 15.663 7.03125 16.9062 7.03125H45.0312C45.3391 7.03101 45.644 7.09143 45.9286 7.20906C46.2131 7.32668 46.4716 7.49922 46.6895 7.7168L63.0957 24.123C63.3133 24.3409 63.4858 24.5994 63.6034 24.8839C63.7211 25.1685 63.7815 25.4734 63.7812 25.7812V32.8125C63.7812 33.4341 63.5343 34.0302 63.0948 34.4698C62.6552 34.9093 62.0591 35.1562 61.4375 35.1562C60.8159 35.1562 60.2198 34.9093 59.7802 34.4698C59.3407 34.0302 59.0938 33.4341 59.0938 32.8125V28.125H45.0312C44.4096 28.125 43.8135 27.8781 43.374 27.4385C42.9344 26.999 42.6875 26.4029 42.6875 25.7812V11.7188H16.9062V32.8125C16.9062 33.4341 16.6593 34.0302 16.2198 34.4698C15.7802 34.9093 15.1841 35.1562 14.5625 35.1562C13.9409 35.1562 13.3448 34.9093 12.9052 34.4698C12.4657 34.0302 12.2188 33.4341 12.2188 32.8125ZM47.375 23.4375H55.7803L47.375 15.0322V23.4375Z",
        fill: fillColor
      }
    )
  );
}
PdfIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
const RoadJPG = "/assets/images/road.jpg";
function FuelCards() {
  const { t } = useTranslation();
  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title;
    linkElement.click();
  };
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_fuel-cards" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_fuel-cards__title" }, t("fuelCards.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_fuel-cards__content" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_fuel-cards__description" }, t("fuelCards.fuelCardsDescription1")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_fuel-cards__description" }, t("fuelCards.fuelCardsDescription2"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_fuel-cards__image" }, /* @__PURE__ */ React__default.createElement("img", { src: RoadJPG, alt: t("fuelCards.road"), loading: "lazy" })), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: PdfIcon,
      title: t("fuelCards.cardTitle"),
      link: "/assets/documents/1.pdf",
      onClick: () => handleLinkClick(
        t("fuelCards.cardTitle"),
        "/assets/documents/1.pdf"
      )
    }
  ));
}
const actual1 = "/assets/images/actual1.jpg";
const actual2 = "/assets/images/actual2.jpg";
const actual3 = "/assets/images/actual3.jpg";
function ActualBlock({
  title,
  description,
  imageUrl,
  href
}) {
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_actual-block" }, /* @__PURE__ */ React__default.createElement("img", { src: imageUrl, alt: title, className: "aam_actual-block__image", loading: "lazy" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_actual-block__content" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_actual-block__title" }, title), /* @__PURE__ */ React__default.createElement("p", { className: "aam_actual-block__description" }, description), /* @__PURE__ */ React__default.createElement(
    LinkTo,
    {
      href,
      text: ""
    }
  )));
}
ActualBlock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};
function ActualSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_actual-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_actual-section__title" }, t("actualSection.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_actual-section__blocks" }, /* @__PURE__ */ React__default.createElement(
    ActualBlock,
    {
      title: t("actualSection.actualBlockTitle1"),
      description: t("actualSection.actualBlockDescription1"),
      imageUrl: actual1,
      href: "https://map.berlio.by/"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ActualBlock,
    {
      title: t("actualSection.actualBlockTitle2"),
      description: t("actualSection.actualBlockDescription2"),
      imageUrl: actual2,
      href: "/contacts"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ActualBlock,
    {
      title: t("actualSection.actualBlockTitle3"),
      description: t("actualSection.actualBlockDescription3"),
      imageUrl: actual3,
      href: "https://map.berlio.by/"
    }
  )));
}
function FooterNavigation() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("nav", { className: "aam_footer-navigation" }, /* @__PURE__ */ React__default.createElement("ul", { className: "aam_footer-navigation__list" }, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/about" }, t("aboutBerlio"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/partners" }, t("forPartners"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("forClients"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/news" }, t("news"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("equipmentAndSoftware"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/contacts" }, t("contacts")))));
}
function ContactAddress({ item }) {
  const { t } = useTranslation();
  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = item || defaultItem;
  if (!displayedItem) {
    return null;
  }
  const {
    departmentsName,
    footerAddress,
    workingHours: workingHours2,
    email
  } = displayedItem;
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("h4", { className: "aam_contact-name" }, t(departmentsName)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_contact-address" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_contact-address__section" }, /* @__PURE__ */ React__default.createElement("p", null, t(footerAddress))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_contact-address__section" }, /* @__PURE__ */ React__default.createElement("p", null, t(workingHours2[0])), /* @__PURE__ */ React__default.createElement("p", null, t(workingHours2[1])), /* @__PURE__ */ React__default.createElement("p", null, t(workingHours2[2]))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_contact-address__section" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_contact-address__email" }, /* @__PURE__ */ React__default.createElement("span", null, t("forOrganizations"), ":"), " ", email[0]), /* @__PURE__ */ React__default.createElement("p", { className: "aam_contact-address__email" }, /* @__PURE__ */ React__default.createElement("span", null, t("forClientInquiries"), ":"), " ", email[1]), /* @__PURE__ */ React__default.createElement("p", { className: "aam_contact-address__email" }, /* @__PURE__ */ React__default.createElement("span", null, t("technicalSupport"), ":"), " ", email[2]))));
}
ContactAddress.propTypes = {
  item: PropTypes.shape({
    address: PropTypes.string.isRequired,
    workingHours: PropTypes.arrayOf(PropTypes.string).isRequired,
    email: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};
function ContactPhones({ item }) {
  const { t } = useTranslation();
  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = item || defaultItem;
  if (!displayedItem) {
    return null;
  }
  const { inCity, phoneNumber } = displayedItem;
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_contact-phones" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_contact-phones__title" }, t("customerService"), " ", t(inCity), ":"), /* @__PURE__ */ React__default.createElement("ul", null, phoneNumber.map((number) => {
    const placeholders = {
      fax: t("fax"),
      telFax: t("telFax")
    };
    return /* @__PURE__ */ React__default.createElement("li", { key: number }, t(number, placeholders));
  })));
}
ContactPhones.propTypes = {
  item: PropTypes.shape({
    inCity: PropTypes.string.isRequired,
    phoneNumber: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};
function Footer() {
  const { t } = useTranslation();
  const { selectedItem } = useContext(SelectedItemContext);
  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = selectedItem || defaultItem;
  if (!displayedItem) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement("footer", { className: "aam_footer" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_footer__navigation" }, /* @__PURE__ */ React__default.createElement(FooterNavigation, null)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_footer__contacts" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_footer__address" }, /* @__PURE__ */ React__default.createElement(ContactAddress, { item: displayedItem })), /* @__PURE__ */ React__default.createElement("div", { className: "aam_footer__contactslink" }, /* @__PURE__ */ React__default.createElement(LinkTo, { href: "/contacts", text: t("ourBranchesAndContacts"), iconColor: "white" })), /* @__PURE__ */ React__default.createElement("div", { className: "aam_footer__phones" }, /* @__PURE__ */ React__default.createElement(ContactPhones, { item: displayedItem }))));
}
function SecondaryFooter() {
  const { t } = useTranslation();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ React__default.createElement("footer", { className: "aam_secondary-footer" }, /* @__PURE__ */ React__default.createElement("nav", { className: "aam_footer-links" }, /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/rules" }, t("rulesOfUse"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/offer" }, t("offerAgreement"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/privacy" }, t("privacy"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement(Link, { to: "/help" }, t("help"))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_footer-copyright" }, t("copyright", { year: currentYear })));
}
const newsDataFallback = {
  "1": { "slug": "initial-news", "priority": "A", "dates": { "date": "2025-07-27T21:00:00.000Z", "startDate": "2025-07-27T21:00:00.000Z", "expireDate": "2025-07-30T21:00:00.000Z" }, "titles": { "ru": 'Рады приветствовать Вас на новом сайте НП ООО "Берлио"!', "en": 'We are pleased to welcome you to the new website of S&P LLC "Berlio"!' }, "descriptions": { "ru": '<h2 class="ql-align-center"><strong style="color: rgb(72, 174, 90);">Уважаемые клиенты</strong><span style="color: rgb(72, 174, 90);">,</span></h2><h2 class="ql-align-center"><br></h2><p class="ql-align-justify">	Мы с радостью сообщаем, что интерфейс нашего сайта обновился! Надеемся, что опыт пользования новым сайтом оставит лишь положительные впечатления. </p><p><br></p><p><em>С уважением,</em></p><p><strong style="color: rgb(242, 73, 66);">команда НП ООО "Берлио"</strong></p>', "en": '<h2 class="ql-align-center"><span style="color: rgb(72, 174, 90);">Dear clients,</span></h2><h2 class="ql-align-center"><br></h2><p class="ql-align-justify">	We are pleased to inform you that the interface of our website has been updated! We hope that your experience with the new site will leave only positive impressions.</p><p><br></p><p><em>Sincerely,</em></p><p><span style="color: rgb(242, 73, 66);">The team of S&amp;P LLC "Berlio"</span></p>' } }
};
function LeftArrowIcon({
  fillColor = "#48AE5A",
  width = 27,
  height = 16,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 27 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM27 7L1 7V9L27 9V7Z",
        fill: fillColor
      }
    )
  );
}
LeftArrowIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function RightArrowIcon({
  fillColor = "#48AE5A",
  width = 27,
  height = 16,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 27 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M26.7071 8.70711C27.0976 8.31658 27.0976 7.68342 26.7071 7.29289L20.3431 0.928932C19.9526 0.538408 19.3195 0.538408 18.9289 0.928932C18.5384 1.31946 18.5384 1.95262 18.9289 2.34315L24.5858 8L18.9289 13.6569C18.5384 14.0474 18.5384 14.6805 18.9289 15.0711C19.3195 15.4616 19.9526 15.4616 20.3431 15.0711L26.7071 8.70711ZM0 9H26V7H0V9Z",
        fill: fillColor
      }
    )
  );
}
RightArrowIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function NewsSection() {
  const { t, i18n: i18n2 } = useTranslation();
  const currentLanguage = i18n2.language;
  const currentDate = /* @__PURE__ */ new Date();
  const isValidDate2 = (startDate, expireDate) => {
    const start = startDate ? new Date(startDate) : null;
    const expire = expireDate ? new Date(expireDate) : null;
    return start === null && (expire === null || currentDate <= expire) || expire === null && start !== null && currentDate >= start || start !== null && expire !== null && currentDate >= start && currentDate <= expire;
  };
  const newsArray = Object.keys(newsDataFallback).map((id) => ({
    id: parseInt(id, 10),
    // Преобразуем ID в число для сортировки
    ...newsDataFallback[id]
  }));
  const sortedNews = newsArray.filter((newsItem) => isValidDate2(
    newsItem.dates.startDate,
    newsItem.dates.expireDate
  )).sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority === "A" ? -1 : 1;
    }
    const dateDiff = new Date(b.dates.date) - new Date(a.dates.date);
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return a.id - b.id;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredNews = sortedNews[currentIndex] || null;
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sortedNews.length) % sortedNews.length);
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedNews.length);
  };
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_news-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_news-section__title" }, t("newsSection.name")), featuredNews && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-section__news-block" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_news-section__news-title" }, featuredNews.titles[currentLanguage] || featuredNews.titles.ru), /* @__PURE__ */ React__default.createElement("p", { className: "aam_news-section__news-date" }, new Date(featuredNews.dates.date).toLocaleDateString(currentLanguage, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-section__navigation" }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_news-section__nav-button",
      onClick: handlePrev
    },
    /* @__PURE__ */ React__default.createElement(LeftArrowIcon, null)
  ), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_news-section__nav-button",
      onClick: handleNext
    },
    /* @__PURE__ */ React__default.createElement(RightArrowIcon, null)
  ), /* @__PURE__ */ React__default.createElement(
    LinkTo,
    {
      className: "aam_news-section__link-to",
      href: `/news/${featuredNews.slug || featuredNews.id}`,
      text: t("newsSection.linkToNews")
    }
  ))));
}
function UpArrowInCircleIcon({
  fillColor = "#A3A3A3",
  width = 47,
  height = 47,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 47 47",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "m24.03 13.49c-0.2929-0.2929-0.7677-0.2929-1.0606 0l-4.773 4.773c-0.2929 0.2928-0.2929 0.7677 0 1.0606s0.7678 0.2929 1.0607 0l4.2426-4.2426 4.2426 4.2426c0.2929 0.2929 0.7678 0.2929 1.0607 0s0.2929-0.7678 0-1.0606zm0.2197 20.24v-19.71h-1.5v19.71z",
        fill: fillColor
      }
    ),
    /* @__PURE__ */ React__default.createElement("circle", { cx: "23.5", cy: "23.5", r: "23", stroke: fillColor })
  );
}
UpArrowInCircleIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function LogoSection({
  title,
  logos: logos2,
  customClass = "",
  logoBasePath = "/assets/images/"
}) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const logosToShow = 4;
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : logos2.length - logosToShow);
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex < logos2.length - logosToShow ? prevIndex + 1 : 0);
  };
  const prevIconColor = currentIndex === 0 ? "#A3A3A3" : "#48AE5A";
  const nextIconColor = currentIndex === logos2.length - logosToShow ? "#A3A3A3" : "#48AE5A";
  return /* @__PURE__ */ React__default.createElement("section", { className: `aam_logo-section ${customClass}` }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_logo-section__title" }, t(title)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_logo-section__carousel" }, /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: "aam_logo-section__logos",
      style: {
        transform: `translateX(-${currentIndex * 100 / logosToShow}%)`,
        transition: "transform 0.3s ease"
      }
    },
    logos2.map((logo) => /* @__PURE__ */ React__default.createElement("div", { key: logo.src, className: "aam_logo-section__logo" }, /* @__PURE__ */ React__default.createElement(
      "img",
      {
        src: `${logoBasePath}${logo.src}`,
        alt: logo.alt,
        className: "aam_logo-section__logo-image",
        loading: "lazy",
        onError: (e) => {
          e.target.style.display = "none";
        }
      }
    )))
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_logo-section__controls" }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_logo-section__button",
      onClick: handlePrev,
      disabled: currentIndex === 0,
      "aria-label": t("Previous logos")
    },
    /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { fillColor: prevIconColor })
  ), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_logo-section__button",
      onClick: handleNext,
      disabled: currentIndex === logos2.length - logosToShow,
      "aria-label": t("Next logos")
    },
    /* @__PURE__ */ React__default.createElement(RightArrowIcon, { fillColor: nextIconColor })
  )), /* @__PURE__ */ React__default.createElement(
    LinkButton,
    {
      href: "https://map.berlio.by",
      target: "_blank",
      className: "fillGreen"
    },
    t("ourPartnersLogoSection.mapLink")
  ), /* @__PURE__ */ React__default.createElement("div", { className: "aam_logo-section__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("ourPartnersLogoSection.homeLink")), /* @__PURE__ */ React__default.createElement(
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
      className: "secondary-link",
      "aria-label": t("Scroll to top")
    },
    /* @__PURE__ */ React__default.createElement(UpArrowInCircleIcon, { className: "icon" }),
    t("ourPartnersLogoSection.upLink")
  )));
}
LogoSection.propTypes = {
  title: PropTypes.string.isRequired,
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    })
  ).isRequired,
  customClass: PropTypes.string,
  logoBasePath: PropTypes.string
};
const logos = [{ "src": "A-100-logo.png", "alt": "A-100" }, { "src": "gazpromneft-logo.png", "alt": "Gazpromneft" }, { "src": "rn-zapad-logo.png", "alt": "RN Zapad" }, { "src": "tatneft-logo.png", "alt": "Tatneft" }, { "src": "lukoil-logo.png", "alt": "Lukoil" }, { "src": "united-company-logo.png", "alt": "United Company" }];
const partnersLogos = {
  logos
};
function Home() {
  const { t } = useTranslation();
  process.env.NODE_ENV === "production";
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.home")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Главная" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(MainBlock, null), /* @__PURE__ */ React__default.createElement(PaymentSystem, null), /* @__PURE__ */ React__default.createElement(FuelCards, null), /* @__PURE__ */ React__default.createElement(ActualSection, null), /* @__PURE__ */ React__default.createElement(NewsSection, null), /* @__PURE__ */ React__default.createElement(
    LogoSection,
    {
      title: t("ourPartnersLogoSection.name"),
      logos: partnersLogos.logos,
      logoBasePath: "/assets/images/",
      customClass: "aam_home-logo-section"
    }
  ), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
const mainAboutJPG = "/assets/images/mainAbout.jpg";
function MainAbout() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_about-block" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_about-block__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", t("breadCrumbs.about")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_about-block__title" }, t("aboutBlock.name")), /* @__PURE__ */ React__default.createElement("img", { src: mainAboutJPG, alt: t("aboutBlock.alt"), className: "aam_about-block__image", loading: "lazy" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_about-block__description" }, t("aboutBlock.description")));
}
const SySJPG1 = "/assets/images/systemSection1.jpg";
const SySJPG2 = "/assets/images/systemSection2.jpg";
function SystemSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_system-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_system-section__title" }, t("systemSection.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_system-section__services" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: OilIcon,
      title: t("mainBlock.headline"),
      description: t("mainBlock.tagline"),
      link: "/clients/signAndResign"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: PaymentCardIcon,
      title: t("mainBlock.fuelCardUsage"),
      description: t("mainBlock.belTollServices"),
      link: "/clients/plasticCardUsageRules"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: MapIcon,
      title: t("mainBlock.nonResidentServices"),
      description: t("mainBlock.nonResidentSupport"),
      link: "/clients/nonResidentsSupport"
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_system-section__additional-services" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_system-section__list-title" }, t("systemSection.listTitle")), /* @__PURE__ */ React__default.createElement("ol", null, /* @__PURE__ */ React__default.createElement("li", null, t("systemSection.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("systemSection.listItem2")), /* @__PURE__ */ React__default.createElement("li", null, t("systemSection.listItem3")), /* @__PURE__ */ React__default.createElement("li", null, t("systemSection.listItem4")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_system-section__images" }, /* @__PURE__ */ React__default.createElement("img", { src: SySJPG1, alt: t("systemSection.alt1"), className: "aam_system-section__image", loading: "lazy" }), /* @__PURE__ */ React__default.createElement("img", { src: SySJPG2, alt: t("systemSection.alt2"), className: "aam_system-section__image", loading: "lazy" })));
}
function PaymentWirelessIcon({
  fillColor = "#48AE5A",
  width = 76,
  height = 76,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 76 76",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M11.75 37.9878C11.75 34.5406 12.429 31.1271 13.7482 27.9424C15.0673 24.7576 17.0009 21.8638 19.4384 19.4262C21.876 16.9887 24.7698 15.0551 27.9546 13.736C31.1394 12.4168 34.5528 11.7378 38 11.7378C41.4472 11.7378 44.8606 12.4168 48.0454 13.736C51.2302 15.0551 54.124 16.9887 56.5616 19.4262C58.9991 21.8638 60.9327 24.7576 62.2518 27.9424C63.571 31.1271 64.25 34.5406 64.25 37.9878C64.25 44.9497 61.4844 51.6265 56.5616 56.5493C51.6387 61.4722 44.9619 64.2378 38 64.2378C31.0381 64.2378 24.3613 61.4722 19.4384 56.5493C14.5156 51.6265 11.75 44.9497 11.75 37.9878ZM38 7.98779C30.0435 7.98779 22.4129 11.1485 16.7868 16.7746C11.1607 22.4007 8 30.0313 8 37.9878C8 45.9443 11.1607 53.5749 16.7868 59.201C22.4129 64.8271 30.0435 67.9878 38 67.9878C45.9565 67.9878 53.5871 64.8271 59.2132 59.201C64.8393 53.5749 68 45.9443 68 37.9878C68 30.0313 64.8393 22.4007 59.2132 16.7746C53.5871 11.1485 45.9565 7.98779 38 7.98779ZM35.6112 23.5315C35.2517 23.1835 34.771 22.989 34.2706 22.989C33.7703 22.989 33.2895 23.1835 32.93 23.5315C32.7546 23.7018 32.6151 23.9055 32.5199 24.1306C32.4246 24.3558 32.3755 24.5977 32.3755 24.8422C32.3755 25.0866 32.4246 25.3286 32.5199 25.5537C32.6151 25.7788 32.7546 25.9826 32.93 26.1528C34.5167 27.6901 35.7784 29.5305 36.64 31.5649C37.5016 33.5992 37.9456 35.786 37.9456 37.9953C37.9456 40.2046 37.5016 42.3913 36.64 44.4257C35.7784 46.4601 34.5167 48.3005 32.93 49.8378C32.7546 50.008 32.6151 50.2117 32.5199 50.4369C32.4246 50.662 32.3755 50.904 32.3755 51.1484C32.3755 51.3929 32.4246 51.6348 32.5199 51.86C32.6151 52.0851 32.7546 52.2888 32.93 52.459C33.2895 52.8071 33.7703 53.0016 34.2706 53.0016C34.771 53.0016 35.2517 52.8071 35.6112 52.459C37.5493 50.5816 39.0903 48.3338 40.1427 45.8491C41.1951 43.3644 41.7374 40.6936 41.7374 37.9953C41.7374 35.297 41.1951 32.6261 40.1427 30.1415C39.0903 27.6568 37.5493 25.409 35.6112 23.5315ZM23.5437 27.2928C23.7137 27.1175 23.9171 26.9781 24.1419 26.8829C24.3667 26.7877 24.6084 26.7386 24.8525 26.7386C25.0966 26.7386 25.3383 26.7877 25.5631 26.8829C25.7879 26.9781 25.9913 27.1175 26.1612 27.2928C31.9287 33.199 31.9287 42.7728 26.1612 48.6753C25.9913 48.8506 25.7879 48.99 25.5631 49.0852C25.3383 49.1804 25.0966 49.2295 24.8525 49.2295C24.6084 49.2295 24.3667 49.1804 24.1419 49.0852C23.9171 48.99 23.7137 48.8506 23.5437 48.6753C23.1966 48.3153 23.0026 47.8348 23.0026 47.3347C23.0026 46.8346 23.1966 46.354 23.5437 45.994C25.6211 43.8458 26.7824 40.9743 26.7824 37.9859C26.7824 34.9975 25.6211 32.1261 23.5437 29.9778C23.1955 29.6177 23.0008 29.1363 23.0008 28.6353C23.0008 28.1343 23.1955 27.6529 23.5437 27.2928ZM45.0312 19.774C44.6616 19.4311 44.1761 19.2406 43.6719 19.2406C43.1677 19.2406 42.6821 19.4311 42.3125 19.774C42.1353 19.939 41.994 20.1386 41.8974 20.3606C41.8008 20.5825 41.751 20.822 41.751 21.064C41.751 21.3061 41.8008 21.5456 41.8974 21.7675C41.994 21.9894 42.1353 22.1891 42.3125 22.354C51.4137 30.9865 51.4137 44.9853 42.3125 53.6178C42.1347 53.7828 41.9929 53.9827 41.896 54.2049C41.799 54.4272 41.7489 54.6671 41.7489 54.9097C41.7489 55.1522 41.799 55.3921 41.896 55.6144C41.9929 55.8367 42.1347 56.0366 42.3125 56.2015C43.0625 56.914 44.2812 56.914 45.035 56.2015C55.6362 46.1403 55.6362 29.8315 45.035 19.774",
        fill: fillColor
      }
    )
  );
}
PaymentWirelessIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function TerminalWindowIcon({
  fillColor = "#48AE5A",
  width = 76,
  height = 76,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 76 76",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M38 37.9878C38.0002 38.3394 37.9213 38.6865 37.7692 39.0035C37.6171 39.3204 37.3955 39.5991 37.1211 39.8188L25.4023 49.1938C25.1619 49.3862 24.8859 49.5293 24.5901 49.615C24.2944 49.7007 23.9846 49.7274 23.6786 49.6933C23.3725 49.6593 23.0761 49.5654 22.8064 49.4168C22.5367 49.2683 22.2988 49.0681 22.1064 48.8276C21.9141 48.5872 21.771 48.3112 21.6853 48.0154C21.5995 47.7197 21.5729 47.4099 21.6069 47.1038C21.641 46.7978 21.7349 46.5014 21.8834 46.2317C22.032 45.9619 22.2322 45.7241 22.4727 45.5317L31.9033 37.9878L22.4727 30.4438C22.2322 30.2515 22.032 30.0136 21.8834 29.7439C21.7349 29.4742 21.641 29.1778 21.6069 28.8717C21.5729 28.5657 21.5995 28.2559 21.6853 27.9602C21.771 27.6644 21.9141 27.3884 22.1064 27.1479C22.2988 26.9075 22.5367 26.7073 22.8064 26.5587C23.0761 26.4102 23.3725 26.3162 23.6786 26.2822C23.9846 26.2482 24.2944 26.2748 24.5901 26.3605C24.8859 26.4463 25.1619 26.5894 25.4023 26.7817L37.1211 36.1567C37.3955 36.3765 37.6171 36.6552 37.7692 36.9721C37.9213 37.2891 38.0002 37.6362 38 37.9878ZM52.0625 45.019H40.3438C39.7221 45.019 39.126 45.266 38.6865 45.7055C38.2469 46.145 38 46.7412 38 47.3628C38 47.9844 38.2469 48.5805 38.6865 49.0201C39.126 49.4596 39.7221 49.7065 40.3438 49.7065H52.0625C52.6841 49.7065 53.2802 49.4596 53.7198 49.0201C54.1593 48.5805 54.4062 47.9844 54.4062 47.3628C54.4062 46.7412 54.1593 46.145 53.7198 45.7055C53.2802 45.266 52.6841 45.019 52.0625 45.019ZM68.4688 16.894V59.0815C68.4688 60.3247 67.9749 61.517 67.0958 62.3961C66.2167 63.2752 65.0245 63.769 63.7812 63.769H12.2188C10.9755 63.769 9.78326 63.2752 8.90419 62.3961C8.02511 61.517 7.53125 60.3247 7.53125 59.0815V16.894C7.53125 15.6508 8.02511 14.4586 8.90419 13.5795C9.78326 12.7004 10.9755 12.2065 12.2188 12.2065H63.7812C65.0245 12.2065 66.2167 12.7004 67.0958 13.5795C67.9749 14.4586 68.4688 15.6508 68.4688 16.894ZM63.7812 59.0815V16.894H12.2188V59.0815H63.7812Z",
        fill: fillColor
      }
    )
  );
}
TerminalWindowIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function CardBox({
  CSSSelectorPrefix,
  Icon,
  title,
  description = ""
}) {
  return /* @__PURE__ */ React__default.createElement("div", { className: `${CSSSelectorPrefix}__card-box` }, Icon && /* @__PURE__ */ React__default.createElement("div", { className: `${CSSSelectorPrefix}__icon` }, /* @__PURE__ */ React__default.createElement(Icon, null)), /* @__PURE__ */ React__default.createElement("h3", { className: `${CSSSelectorPrefix}__card-title` }, title), description && /* @__PURE__ */ React__default.createElement("div", { className: `${CSSSelectorPrefix}__card-description` }, description));
}
CardBox.propTypes = {
  Icon: PropTypes.elementType,
  // Ожидается React-компонент
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  CSSSelectorPrefix: PropTypes.string.isRequired
};
const FuelDispenser = "/assets/images/fuel-dispenser.jpg";
function SystemPurposeSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_purpose-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_purpose-section__title" }, t("purposeSection.name")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_purpose-section__description" }, t("purposeSection.description")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_purpose-section__cards-box" }, /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_purpose-section",
      Icon: PaymentWirelessIcon,
      title: t("purposeSection.cardTitle1")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_purpose-section",
      Icon: TerminalWindowIcon,
      title: t("purposeSection.cardTitle2")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_purpose-section",
      Icon: PaymentCardIcon,
      title: t("purposeSection.cardTitle3")
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_purpose-section__images" }, /* @__PURE__ */ React__default.createElement("img", { src: FuelDispenser, alt: t("purposeSection.fuelDispenser"), className: "aam_purpose-section__image", loading: "lazy" })), /* @__PURE__ */ React__default.createElement("div", { className: "aam_purpose-section__card-purpose" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_purpose-section__list-title" }, t("purposeSection.listTitle")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("ol", null, /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem2")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem3")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem4")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem5"))), /* @__PURE__ */ React__default.createElement("ol", { start: 6 }, /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem6")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem7")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem8")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem9")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem10"))), /* @__PURE__ */ React__default.createElement("ol", { start: 11 }, /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem11")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem12")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem13")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem14")), /* @__PURE__ */ React__default.createElement("li", null, t("purposeSection.listItem15"))))));
}
function ClientPartnersServicesSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleButtonClick1 = () => {
    navigate("/clients");
  };
  const handleButtonClick2 = () => {
    navigate("/partners");
  };
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_clients-partners-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_clients-partners-section__title" }, t("cpsSection.name")), /* @__PURE__ */ React__default.createElement("ol", { className: "aam_clients-partners-section__list" }, /* @__PURE__ */ React__default.createElement("li", { className: "aam_clients-partners-section__item" }, t("cpsSection.listItem1")), /* @__PURE__ */ React__default.createElement("li", { className: "aam_clients-partners-section__item" }, t("cpsSection.listItem2")), /* @__PURE__ */ React__default.createElement("li", { className: "aam_clients-partners-section__item" }, t("cpsSection.listItem3")), /* @__PURE__ */ React__default.createElement("li", { className: "aam_clients-partners-section__item" }, t("cpsSection.listItem4")), /* @__PURE__ */ React__default.createElement("li", { className: "aam_clients-partners-section__item" }, t("cpsSection.listItem5")), /* @__PURE__ */ React__default.createElement("li", { className: "aam_clients-partners-section__item" }, t("cpsSection.listItem6")), /* @__PURE__ */ React__default.createElement("li", { className: "aam_clients-partners-section__item" }, t("cpsSection.listItem7"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_clients-partners-section__buttons" }, /* @__PURE__ */ React__default.createElement(
    Button,
    {
      label: t("cpsSection.forClients"),
      onClick: handleButtonClick1,
      variant: "green"
    }
  ), /* @__PURE__ */ React__default.createElement(
    Button,
    {
      label: t("cpsSection.forPartners"),
      onClick: handleButtonClick2,
      variant: "green"
    }
  )));
}
function About() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.about")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, О Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(MainAbout, null), /* @__PURE__ */ React__default.createElement(SystemSection, null), /* @__PURE__ */ React__default.createElement(SystemPurposeSection, null), /* @__PURE__ */ React__default.createElement(ClientPartnersServicesSection, null), /* @__PURE__ */ React__default.createElement(
    LogoSection,
    {
      title: t("ourPartnersLogoSection.name"),
      logos: partnersLogos.logos,
      logoBasePath: "/assets/images/"
    }
  ), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function BerlioLocationIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 65,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement("defs", { id: "i" }, /* @__PURE__ */ React__default.createElement("radialGradient", { id: "a", cx: "32.055", cy: "24.887", r: "17.953", gradientTransform: "matrix(1.2988 -.003564 .0023311 .84951 -21.856 .55695)", gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ React__default.createElement("stop", { id: "t", stopColor: "#fff", offset: "0" }), /* @__PURE__ */ React__default.createElement("stop", { id: "u", stopColor: fillColor, offset: "1" })), /* @__PURE__ */ React__default.createElement("radialGradient", { id: "b", cx: "32.013", cy: "24.621", r: "19.951", gradientTransform: "matrix(1.1688 -.003207 .0020976 .76442 -17.631 2.8665)", gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ React__default.createElement("stop", { id: "v", stopColor: "#fff", offset: "0" }), /* @__PURE__ */ React__default.createElement("stop", { id: "w", stopColor: fillColor, offset: "1" })), /* @__PURE__ */ React__default.createElement("clipPath", { id: "c" }, /* @__PURE__ */ React__default.createElement("rect", { id: "d", width: "271.54", height: "66", fill: "#fff" }))),
    /* @__PURE__ */ React__default.createElement("g", { id: "e" }, /* @__PURE__ */ React__default.createElement("path", { id: "z", d: "m26.944 3.9014c7.3907 3.4795 11.122 10.08 11.051 19.925-0.01558 2.14-1.0493 5.3873-2.0871 7.2596l-13.519 24.391a4.1415 4.1415 0 0 1-1.0972 1.2749l-0.06934 0.05333a2.3304 2.3304 0 0 1-2.7753 0.04919 6.1371 6.1371 0 0 1-1.7059-2.1419l-12.556-22.951c-0.9819-1.7949-2.0331-4.8931-2.1369-6.9356-0.49304-9.7016 3.0082-16.476 10.689-20.5 3.6746-1.9252 10.457-2.1891 14.208-0.42328z", fill: "url(#a)", stroke: "url(#b)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "4.0098", style: { paintOrder: "stroke fill markers" } })),
    /* @__PURE__ */ React__default.createElement("g", { id: "f", transform: "matrix(.12154 0 0 .12154 3.4993 17.815)", fill: "none" }, /* @__PURE__ */ React__default.createElement("g", { id: "g", clipPath: "url(#c)" }, /* @__PURE__ */ React__default.createElement("path", { id: "j", d: "m7.8714 17.723 26.109-0.0425c4.3601 0 7.5151 0.8153 9.4652 2.4459 1.9449 1.6314 2.6441 3.6757 2.0701 6.0791-0.4743 2.0302-1.7099 3.7719-3.7067 5.2253-0.6435 0.4606-1.3385 0.8559-2.0732 1.1791-0.217 0.0909-0.4005 0.2387-0.528 0.4251-0.1275 0.1863-0.1933 0.4031-0.1894 0.6237 0.0038 0.2206 0.0773 0.4353 0.2113 0.6177s0.3227 0.3245 0.5428 0.4089c1.2025 0.4459 2.2627 1.1679 3.0807 2.098 1.1969 1.4401 1.5368 3.2516 1.0198 5.4345-0.4237 1.8049-1.3742 3.4676-2.7479 4.8068-1.4716 1.4607-3.2646 2.612-5.2578 3.376-1.2793 0.5231-3.1326 0.8963-5.5478 1.131-3.2303 0.3224-5.3462 0.4948-6.3752 0.4948l-22.558 0.034c-0.18574 0.0024-0.36964-0.0344-0.53771-0.1076-0.16807-0.0733-0.31587-0.1811-0.43216-0.3152-0.11629-0.1342-0.19801-0.2911-0.23894-0.4589s-0.039982-0.3421 0.002761-0.5095zm10.931 13.45h6.0699c2.18 0 3.7616-0.2828 4.7478-0.8652 0.477-0.2713 0.8879-0.6312 1.2069-1.0571 0.319-0.4258 0.5392-0.9083 0.6465-1.417 0.232-1.001 0-1.7785-0.7389-2.344s-2.1373-0.8342-4.2563-0.8285h-5.1661c-0.2812-1e-3 -0.5542 0.088-0.7728 0.2518s-0.3695 0.3925-0.4272 0.6473l-1.3098 5.6183zm-3.1479 13.482 7.111-0.0141c2.406 0 4.1769-0.3337 5.3158-0.9812 0.5264-0.2759 0.9841-0.6514 1.3434-1.1021 0.3593-0.4506 0.6121-0.9662 0.742-1.5133 0.132-0.442 0.1179-0.9105-0.0405-1.345-0.1583-0.4344-0.4538-0.8149-0.848-1.0924-0.8305-0.6164-2.4762-0.9274-4.9219-0.9217h-6.0882c-0.2813-1e-3 -0.5542 0.0879-0.7728 0.2517-0.2187 0.1639-0.3695 0.3925-0.4272 0.6474l-1.4136 6.0594zm42.218-27.014 34.871-0.0538c0.1845-2e-3 0.367 0.0347 0.534 0.1073 0.1669 0.0726 0.3139 0.1793 0.43 0.3121 0.116 0.1328 0.1981 0.2882 0.24 0.4545 0.042 0.1664 0.0427 0.3393 0.0021 0.506l-1.1817 5.0669c-0.0576 0.2549-0.2085 0.4835-0.4271 0.6474-0.2186 0.1638-0.4916 0.2527-0.7728 0.2517l-21.431 0.034c-0.2812-1e-3 -0.5542 0.0879-0.7728 0.2517-0.2186 0.1639-0.3695 0.3925-0.4272 0.6474l-0.7419 3.1753c-0.0405 0.1664-0.0399 0.3392 0.0019 0.5053 0.0417 0.1661 0.1235 0.3214 0.2392 0.4541s0.2623 0.2395 0.4289 0.3123 0.3488 0.1098 0.533 0.1082l18.665-0.034c0.1845-2e-3 0.367 0.0346 0.534 0.1073 0.167 0.0726 0.314 0.1793 0.43 0.3121 0.1161 0.1328 0.1981 0.2881 0.2401 0.4545 0.0419 0.1663 0.0426 0.3393 2e-3 0.506l-1.1022 4.7078c-0.0583 0.2544-0.2094 0.4824-0.428 0.6456-0.2186 0.1633-0.4912 0.2518-0.772 0.2507l-19.739 0.0311c-0.2812-1e-3 -0.5542 0.088-0.7728 0.2518s-0.3695 0.3925-0.4271 0.6474l-1.0473 4.4901c-0.0405 0.1664-0.0399 0.3391 0.0019 0.5052 0.0417 0.1662 0.1235 0.3214 0.2392 0.4541s0.2624 0.2395 0.4289 0.3123c0.1666 0.0728 0.3488 0.1098 0.533 0.1082l21.037-0.0311c0.1846-0.0017 0.3671 0.0353 0.5339 0.1083 0.1669 0.0729 0.3137 0.18 0.4295 0.313 0.1157 0.1331 0.1974 0.2887 0.2389 0.4552 0.0416 0.1665 0.0418 0.3396 7e-4 0.5061l-1.2793 5.4911c-0.0576 0.2549-0.2085 0.4836-0.4271 0.6474s-0.4916 0.2527-0.7728 0.2517l-35.565 0.0594c-0.1841 0.0016-0.3663-0.0353-0.5329-0.1081-0.1666-0.0729-0.3132-0.1796-0.4289-0.3123-0.1157-0.1328-0.1975-0.288-0.2393-0.4541-0.0417-0.1662-0.0424-0.3389-0.0018-0.5053l7.4957-32.056c0.0583-0.2544 0.2094-0.4824 0.428-0.6457 0.2186-0.1632 0.4912-0.2517 0.772-0.2506z", clipRule: "evenodd", fill: "#f24942", fillRule: "evenodd", stroke: "#000d04", strokeMiterlimit: "10", strokeWidth: ".28306" }), /* @__PURE__ */ React__default.createElement("path", { id: "k", d: "m190.88 56.833c0.229-0.0452 25.425-0.1668 25.065 0.0142-40.126 19.346-87.785 4.8831-95.262-18.3-0.082-0.258-0.252-0.4841-0.487-0.643-0.234-0.159-0.518-0.2421-0.808-0.2363l-2.898 0.0311h-0.427c-0.314-0.0033-0.62 0.0948-0.864 0.2774-0.245 0.1827-0.413 0.4385-0.476 0.7235l-3.341 14.22c-0.064 0.2817-0.231 0.5345-0.472 0.7165s-0.542 0.2824-0.853 0.2845l-14.686 0.0311c-0.2072 2e-4 -0.4117-0.0429-0.5984-0.1261-0.1866-0.0832-0.3507-0.2043-0.4798-0.3543s-0.22-0.325-0.2659-0.5121c-0.046-0.1871-0.0457-0.3813 7e-4 -0.5683l9.6424-39.557c0.07-0.2859 0.244-0.541 0.492-0.723 0.248-0.1821 0.556-0.2801 0.873-0.278l14.933 0.0764c0.208 0.0039 0.413 0.051 0.599 0.1379 0.186 0.0868 0.348 0.2112 0.476 0.364 0.127 0.1527 0.215 0.3299 0.259 0.5186 0.043 0.1886 0.04 0.3839-9e-3 0.5714l-4.006 14.525c-0.048 0.1877-0.05 0.383-7e-3 0.5716 0.044 0.1887 0.133 0.3658 0.26 0.5185 0.128 0.1527 0.291 0.277 0.477 0.3638 0.186 0.0869 0.39 0.134 0.599 0.138 2.815 0 6.024-0.1838 7.3-0.8199 0.141-0.0658 0.289-0.1161 0.443-0.1499 4.977-1.3063 7.682-3.639 8.332-6.311 1.066-4.3516-2.995-11.07-13.636-13.329-1.752-0.37889-4.519-0.93874-10.497-0.98398-2.177-0.01696-4.009-0.01696-5.597 0.01414-2.98 0.04524-5.1261 0.16682-7.2054 0.34778-11.706 1.0632-18.237 2.7144-26.964 5.6267-0.0638 0.0161-0.1293 0.0256-0.1954 0.0283l-14.375 0.0481c-0.2591-5e-4 -0.5102-0.0837-0.7109-0.2356-0.2006-0.152-0.3386-0.3633-0.3906-0.5984-0.052-0.2352-0.0148-0.4797 0.1052-0.6924 0.12-0.2128 0.3155-0.3807 0.5536-0.4755 15.831-6.3676 35.558-10.745 55.533-10.745 28.554 0 70.225 22.106 26.899 33.582-0.275 0.0728-0.518 0.2229-0.697 0.4295-0.179 0.2067-0.284 0.4597-0.301 0.7241-1.066 17.709 27.98 27.336 53.274 20.907 0.062-0.0352 0.127-0.0655 0.195-0.0905z", fill: fillColor }), /* @__PURE__ */ React__default.createElement("g", { stroke: "#000d04", strokeMiterlimit: "10", strokeWidth: ".28306" }, /* @__PURE__ */ React__default.createElement("path", { id: "l", d: "m105.03 11.833c-0.316-8e-4 -0.622 0.0978-0.869 0.2797-0.247 0.182-0.42 0.4363-0.49 0.7213l-9.6332 39.557c-0.0464 0.187-0.0466 0.3812-7e-4 0.5683s0.1368 0.3621 0.266 0.5121c0.1291 0.1501 0.2931 0.2712 0.4798 0.3543 0.1867 0.0832 0.3912 0.1263 0.5984 0.1261l14.687-0.0311c0.31-0.0021 0.611-0.1024 0.852-0.2845 0.241-0.182 0.408-0.4348 0.473-0.7164l3.34-14.22c0.063-0.285 0.231-0.5408 0.476-0.7235 0.244-0.1826 0.55-0.2807 0.864-0.2774h0.428l2.897-0.0311c0.291-0.0058 0.575 0.0773 0.809 0.2363s0.405 0.385 0.486 0.6431c7.465 23.186 55.124 37.646 95.262 18.3 0.36-0.181-24.835-0.0594-25.064-0.0142l-0.199 0.0594c-0.068 0.025-0.133 0.0553-0.195 0.0905-25.293 6.4298-54.348-3.1979-53.274-20.907 0.017-0.2644 0.122-0.5174 0.301-0.7241 0.179-0.2066 0.423-0.3567 0.698-0.4295 43.32-11.477 1.639-33.582-26.915-33.582-19.974 0-39.692 4.3685-55.533 10.745-0.2381 0.0948-0.4336 0.2627-0.5536 0.4754-0.12 0.2128-0.1572 0.4573-0.1052 0.6925 0.052 0.2351 0.19 0.4464 0.3906 0.5984 0.2007 0.1519 0.4518 0.2351 0.7109 0.2356l14.375-0.0481c0.0661-0.0027 0.1316-0.0122 0.1954-0.0283 8.7263-2.9123 15.266-4.5636 26.964-5.6267 2.0884-0.18379 4.2254-0.31103 7.2054-0.35627 1.588-0.03111 3.42-0.0311 5.597-0.01414 5.978 0.04524 8.745 0.60509 10.497 0.98398 10.641 2.2621 14.702 8.9774 13.636 13.329-0.653 2.6833-3.359 5.016-8.332 6.3223-0.154 0.0338-0.302 0.0841-0.443 0.1499-1.276 0.6362-4.485 0.82-7.3 0.82-0.209-0.0041-0.413-0.0512-0.599-0.1381-0.186-0.0868-0.349-0.2111-0.477-0.3638-0.127-0.1527-0.216-0.3298-0.26-0.5184-0.043-0.1887-0.041-0.384 7e-3 -0.5716l4.012-14.525c0.049-0.1875 0.052-0.3828 9e-3 -0.5714-0.044-0.1886-0.132-0.3659-0.259-0.5186-0.127-0.1528-0.29-0.2772-0.476-0.364-0.186-0.0869-0.391-0.134-0.599-0.1379z" }), /* @__PURE__ */ React__default.createElement("path", { id: "m", d: "m163.2 17.692 12.387-0.0198c0.188-1e-3 0.374 0.0374 0.544 0.1123 0.169 0.075 0.319 0.1846 0.436 0.3207 0.118 0.136 0.201 0.2949 0.242 0.4648 0.042 0.1699 0.042 0.3463-1e-3 0.516l-5.496 23.027c-0.042 0.1697-0.043 0.3462-1e-3 0.516 0.042 0.1699 0.125 0.3288 0.242 0.4648 0.118 0.1361 0.267 0.2457 0.437 0.3207s0.355 0.1134 0.544 0.1123l18.679-0.0255c0.189-0.0016 0.375 0.0365 0.545 0.1113s0.32 0.1844 0.437 0.3206c0.118 0.1362 0.201 0.2953 0.242 0.4654 0.042 0.1701 0.041 0.3467-2e-3 0.5165l-1.466 6.1272c-0.06 0.2578-0.214 0.4885-0.437 0.6533-0.222 0.1648-0.499 0.2536-0.784 0.2515l-33.171 0.0538c-0.188 0.0016-0.374-0.0364-0.544-0.1113-0.171-0.0748-0.32-0.1844-0.438-0.3206-0.117-0.1362-0.2-0.2953-0.242-0.4654-0.041-0.1701-0.04-0.3467 3e-3 -0.5165zm42.623-0.0678 12.43-0.0227c0.188-1e-3 0.374 0.0374 0.544 0.1123 0.17 0.075 0.319 0.1846 0.437 0.3207 0.117 0.136 0.2 0.2949 0.242 0.4648 0.041 0.1699 0.041 0.3463-1e-3 0.516l-7.609 31.96c-0.061 0.2576-0.216 0.488-0.438 0.6531s-0.499 0.2549-0.783 0.2545l-11.429 0.017c-0.188 0.0011-0.374-0.0373-0.544-0.1123s-0.319-0.1846-0.436-0.3207c-0.118-0.136-0.201-0.2949-0.242-0.4648-0.042-0.1698-0.042-0.3463 1e-3 -0.516zm18.155 17.132c1.331-5.5966 4.421-9.9576 9.27-13.083 4.849-3.1254 10.937-4.6947 18.265-4.7078 7.519-0.0114 12.943 1.5098 16.274 4.5636 3.33 3.0537 4.347 7.3412 3.053 12.862-0.955 4-2.626 7.2855-5.014 9.8567-2.491 2.6359-5.619 4.6898-9.129 5.9944-3.685 1.442-8.048 2.1545-13.053 2.1658-5.088 0-9.16-0.6107-12.213-1.8322-2.928-1.1258-5.314-3.1976-6.717-5.8303-1.439-2.6579-1.681-5.9906-0.727-9.9982zm13.944 0.0198c-0.83 3.4647-0.578 5.9519 0.758 7.4618 1.335 1.5099 3.461 2.2583 6.378 2.2451 2.994 0 5.494-0.7418 7.499-2.2253s3.456-4.1442 4.354-7.9821c0.763-3.2177 0.479-5.5815-0.889-7.0688-1.368-1.4872-3.52-2.2196-6.445-2.2167-2.656-0.0514-5.248 0.7577-7.328 2.2874-2.056 1.5043-3.498 4.0047-4.327 7.5014z", clipRule: "evenodd", fill: "#f24942", fillRule: "evenodd" }), /* @__PURE__ */ React__default.createElement("path", { id: "n", d: "m215.34 12.741c5.508 0 9.972-2.8205 9.972-6.2997 0-3.4792-4.464-6.2997-9.972-6.2997-5.507 0-9.972 2.8205-9.972 6.2997 0 3.4792 4.465 6.2997 9.972 6.2997z", fill: fillColor }))))
  );
}
BerlioLocationIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function YandexMap({ coordinates = [53.876159, 27.547862] }) {
  const { locale } = useLocalization();
  const yandexLang = locale === "ru" ? "ru_RU" : "en_US";
  const [iconSvg, setIconSvg] = useState("");
  const [ymapsModules, setYmappsModules] = useState(null);
  const mapRef = useRef(null);
  const placemarkRef = useRef(null);
  useEffect(() => {
    const svg = renderToStaticMarkup(/* @__PURE__ */ React__default.createElement(BerlioLocationIcon, null));
    setIconSvg(svg);
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    import("@pbe/react-yandex-maps").then((ymaps) => {
      setYmappsModules(ymaps);
    });
  }, []);
  useEffect(() => {
    if (mapRef.current && placemarkRef.current && coordinates) {
      mapRef.current.setCenter(coordinates, 17);
      placemarkRef.current.geometry.setCoordinates(coordinates);
    }
  }, [coordinates]);
  if (typeof window === "undefined" || !ymapsModules) {
    return null;
  }
  const yandexApiKey = "a68673c1-5376-48d3-be2e-bebb33a63b12";
  const { YMaps, Map: Map2, Placemark } = ymapsModules;
  const safeCoordinates = Array.isArray(coordinates) && coordinates.length === 2 ? coordinates : [53.876159, 27.547862];
  return /* @__PURE__ */ React__default.createElement(
    YMaps,
    {
      query: {
        lang: yandexLang,
        load: "Map,Placemark,geolocation",
        apikey: yandexApiKey
      }
    },
    /* @__PURE__ */ React__default.createElement(
      Map2,
      {
        defaultState: { center: safeCoordinates, zoom: 17 },
        width: "100%",
        height: "700px",
        instanceRef: (ref) => {
          if (ref) mapRef.current = ref;
        }
      },
      iconSvg && /* @__PURE__ */ React__default.createElement(
        Placemark,
        {
          defaultGeometry: safeCoordinates,
          instanceRef: (ref) => {
            if (ref) placemarkRef.current = ref;
          },
          options: {
            iconLayout: "default#image",
            iconImageHref: `data:image/svg+xml;utf8,${encodeURIComponent(iconSvg)}`,
            iconImageSize: [80, 80],
            iconImageOffset: [-25, -75]
          },
          properties: {
            iconContent: "Моя метка",
            hintContent: "Описание объекта"
          }
        }
      )
    )
  );
}
YandexMap.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number)
};
const USER_ID_COOKIE_NAME = "berlio_user_id";
const STORAGE_KEY = "aam_cookie_consent";
const ONE_YEAR = 365 * 24 * 60 * 60 * 1e3;
const getOrSetUserUUID = () => {
  const existing = document.cookie.split("; ").find((row) => row.startsWith(`${USER_ID_COOKIE_NAME}=`));
  if (existing) {
    return existing.split("=")[1];
  }
  const newUUID = v4();
  document.cookie = `${USER_ID_COOKIE_NAME}=${newUUID}; path=/; max-age=31536000; samesite=lax`;
  return newUUID;
};
const defaultConsent$1 = {
  technical: true,
  functional: false,
  analytics: false,
  marketing: false,
  timestamp: null
};
const getStoredConsent = () => {
  if (typeof window === "undefined") return defaultConsent$1;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultConsent$1, ...JSON.parse(stored) } : defaultConsent$1;
  } catch {
    return defaultConsent$1;
  }
};
const useCookieConsent = () => {
  const [consent, setConsent] = useState(defaultConsent$1);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setConsent(getStoredConsent());
    setIsReady(true);
    const handleConsentChange = () => setConsent(getStoredConsent());
    window.addEventListener("cookie-consent-changed", handleConsentChange);
    window.addEventListener("storage", handleConsentChange);
    return () => {
      window.removeEventListener("cookie-consent-changed", handleConsentChange);
      window.removeEventListener("storage", handleConsentChange);
    };
  }, []);
  const getConsent = useCallback(() => consent, [consent]);
  const saveConsent = useCallback((newConsent) => {
    if (typeof window === "undefined") return;
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const dataWithTimestamp = {
      ...newConsent,
      timestamp
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
    setConsent(dataWithTimestamp);
    window.dispatchEvent(new Event("cookie-consent-changed"));
    const user_uuid = getOrSetUserUUID();
    fetch("/api/cookie-consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_uuid, ...dataWithTimestamp })
    }).catch((err) => {
      console.warn("Не удалось отправить согласие на сервер:", err);
    });
  }, []);
  const needsRenewal = useCallback(() => {
    const { timestamp } = getConsent();
    if (!timestamp) return true;
    try {
      const then = new Date(timestamp).getTime();
      return Date.now() - then > ONE_YEAR;
    } catch {
      return true;
    }
  }, [getConsent]);
  const hasConsentFor = useCallback((...types) => {
    const current = getConsent();
    return types.every((t) => current[t]);
  }, [getConsent]);
  return {
    getConsent,
    saveConsent,
    needsRenewal,
    hasConsentFor,
    consent,
    isReady
  };
};
const defaultConsent = {
  technical: true,
  functional: false,
  analytics: false,
  marketing: false
};
const descriptions = {
  technical: "Используются для обеспечения функционирования сайта, например, сохранение настроек пользователя, поддержка аутентификации, обеспечение безопасности и конфиденциальности данных, управление сессией пользователя и предоставление технической поддержки. Данный тип файлов является обязательным и не подлежит отключению.",
  functional: "Используются для включения функционала, например, Яндекс.Карты.",
  analytics: "Используются для оценки активности пользователя на сайте и анализа взаимодействия, что помогает улучшать производительность сайта. Данные обезличиваются.",
  marketing: "Используются для маркетинга и улучшения качества рекламы, создавая профиль интересов пользователя."
};
const sectionLabels = {
  technical: "Технические файлы cookies",
  functional: "Функциональные файлы cookies",
  analytics: "Аналитические файлы cookies",
  marketing: "Рекламные/маркетинговые файлы cookies"
};
function CookieConsentModal({ forceVisible = false, onConsentSaved = () => {
} }) {
  const {
    getConsent,
    saveConsent,
    needsRenewal,
    isReady
  } = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const [hasMadeChoice, setHasMadeChoice] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState(defaultConsent);
  const [expandedSections, setExpandedSections] = useState({
    technical: false,
    functional: false,
    analytics: false,
    marketing: false
  });
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!isReady || !mounted || hasMadeChoice) return;
    const current = getConsent();
    setConsent(current);
    if (forceVisible) {
      setVisible(true);
      setShowSettings(true);
      return;
    }
    if (needsRenewal()) {
      setVisible(true);
    }
  }, [forceVisible, isReady, mounted, getConsent, needsRenewal, hasMadeChoice]);
  const handleSave = (newConsent) => {
    saveConsent(newConsent);
    onConsentSaved(newConsent);
    setHasMadeChoice(true);
    setVisible(false);
  };
  const acceptAll = () => handleSave({ ...defaultConsent, functional: true, analytics: true, marketing: true });
  const rejectAll = () => handleSave(defaultConsent);
  const acceptSelected = () => handleSave(consent);
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const toggleConsent = (section) => {
    if (section === "technical") return;
    setConsent((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  if (!visible || !mounted) return null;
  return ReactDOM.createPortal(
    /* @__PURE__ */ React__default.createElement("div", { className: "aam_cookie-modal" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_cookie-modal__content" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_cookie-modal__title" }, "Этот сайт использует cookies"), /* @__PURE__ */ React__default.createElement("p", { className: "aam_cookie-modal__description" }, "Файлы cookies делают Вашу работу с сайтом удобнее. Тем не менее, Вы можете отказаться от них или настроить по своему усмотрению.", /* @__PURE__ */ React__default.createElement("span", { className: "aam_cookie-modal__description--warning" }, "Отказ от использования файлов cookies может привести к нестабильной работе некоторых функций сайта!")), /* @__PURE__ */ React__default.createElement(
      "a",
      {
        href: "/privacy/cookie-consent-policy",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "aam_cookie-modal__link"
      },
      "Подробнее о политике обработки cookies"
    ), !showSettings && /* @__PURE__ */ React__default.createElement("div", { className: "aam_cookie-modal__buttons" }, /* @__PURE__ */ React__default.createElement(Button, { label: "Принять все", onClick: acceptAll, variant: "green" }), /* @__PURE__ */ React__default.createElement(Button, { label: "Отказаться", onClick: rejectAll }), /* @__PURE__ */ React__default.createElement(Button, { label: "Настройки файлов cookies", onClick: () => setShowSettings(true) })), showSettings && /* @__PURE__ */ React__default.createElement("div", { className: "aam_cookie-modal__settings" }, Object.keys(sectionLabels).map((section) => /* @__PURE__ */ React__default.createElement("div", { key: section, className: "aam_cookie-modal__section" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_cookie-modal__section-header-wrapper" }, /* @__PURE__ */ React__default.createElement(
      "button",
      {
        type: "button",
        className: "aam_cookie-modal__section-header",
        onClick: () => toggleSection(section),
        "aria-expanded": expandedSections[section],
        "aria-controls": `section-content-${section}`
      },
      /* @__PURE__ */ React__default.createElement("span", null, sectionLabels[section]),
      /* @__PURE__ */ React__default.createElement(
        DropdownIcon,
        {
          className: `aam_cookie-modal__dropdown-icon ${expandedSections[section] ? "expanded" : ""}`
        }
      )
    ), /* @__PURE__ */ React__default.createElement("div", { className: "aam_cookie-modal__section-control" }, section !== "technical" ? /* @__PURE__ */ React__default.createElement(
      "label",
      {
        "aria-label": `Разрешить ${sectionLabels[section]}`,
        className: "aam_cookie-modal__toggle-switch",
        htmlFor: `cookie-toggle-${section}`
      },
      /* @__PURE__ */ React__default.createElement(
        "input",
        {
          id: `cookie-toggle-${section}`,
          type: "checkbox",
          checked: consent[section],
          onChange: () => toggleConsent(section)
        }
      ),
      /* @__PURE__ */ React__default.createElement("span", { className: "slider" })
    ) : /* @__PURE__ */ React__default.createElement(
      "span",
      {
        className: "aam_cookie-modal__always-on",
        role: "note",
        "aria-label": "Всегда активны"
      },
      "Всегда активны"
    ))), expandedSections[section] && /* @__PURE__ */ React__default.createElement(
      "div",
      {
        id: `section-content-${section}`,
        className: "aam_cookie-modal__section-content"
      },
      /* @__PURE__ */ React__default.createElement("p", null, descriptions[section])
    ))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_cookie-modal__buttons aam_cookie-modal__buttons--settings" }, /* @__PURE__ */ React__default.createElement(Button, { label: "Принять все", onClick: acceptAll, variant: "green" }), /* @__PURE__ */ React__default.createElement(Button, { label: "Отказаться", onClick: rejectAll }), /* @__PURE__ */ React__default.createElement(Button, { label: "Принять выбранные", onClick: acceptSelected, variant: "green" })), /* @__PURE__ */ React__default.createElement(
      "button",
      {
        type: "button",
        className: "aam_cookie-modal__close-settings",
        onClick: () => setShowSettings(false)
      },
      "Закрыть настройки"
    )))),
    document.body
  );
}
CookieConsentModal.propTypes = {
  forceVisible: PropTypes.bool,
  onConsentSaved: PropTypes.func
};
function FallbackMap() {
  const { t } = useLocalization();
  const [modalKey, setModalKey] = useState(0);
  const { hasConsentFor, isReady } = useCookieConsent();
  const isMapEnabled = hasConsentFor("functional", "analytics");
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_map-fallback" }, /* @__PURE__ */ React__default.createElement("p", null, t("Для отображения карты необходимо согласие на обработку функциональных и аналитических cookies.")), /* @__PURE__ */ React__default.createElement(
    Button,
    {
      label: t("Настроить cookies"),
      onClick: () => setModalKey((prev) => prev + 1),
      variant: "green",
      disabled: isMapEnabled || !isReady
    }
  ), modalKey > 0 && !isMapEnabled && /* @__PURE__ */ React__default.createElement(CookieConsentModal, { key: `modal-${modalKey}`, forceVisible: true }));
}
function MapWithConsent({ coordinates }) {
  const { consent } = useCookieConsent();
  const hasConsent = Boolean(consent?.functional && consent?.analytics);
  return hasConsent ? /* @__PURE__ */ React__default.createElement(YandexMap, { coordinates }) : /* @__PURE__ */ React__default.createElement(FallbackMap, null);
}
MapWithConsent.propTypes = {
  coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
};
function PlusIcon({
  fillColor = "#000D04",
  width = 26,
  height = 26,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 26 26",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M25.2715 12.8917C25.2715 13.1573 25.1616 13.412 24.9659 13.5998C24.7703 13.7877 24.5049 13.8932 24.2282 13.8932H13.7948V23.9079C13.7948 24.1735 13.6849 24.4283 13.4892 24.6161C13.2936 24.8039 13.0282 24.9094 12.7515 24.9094C12.4748 24.9094 12.2094 24.8039 12.0137 24.6161C11.8181 24.4283 11.7081 24.1735 11.7081 23.9079V13.8932H1.27478C0.998072 13.8932 0.732695 13.7877 0.537032 13.5998C0.341368 13.412 0.231445 13.1573 0.231445 12.8917C0.231445 12.6261 0.341368 12.3713 0.537032 12.1835C0.732695 11.9957 0.998072 11.8902 1.27478 11.8902H11.7081V1.87544C11.7081 1.60983 11.8181 1.3551 12.0137 1.16729C12.2094 0.979475 12.4748 0.873962 12.7515 0.873962C13.0282 0.873962 13.2936 0.979475 13.4892 1.16729C13.6849 1.3551 13.7948 1.60983 13.7948 1.87544V11.8902H24.2282C24.5049 11.8902 24.7703 11.9957 24.9659 12.1835C25.1616 12.3713 25.2715 12.6261 25.2715 12.8917Z",
        fill: fillColor
      }
    )
  );
}
PlusIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function MinusIcon({
  fillColor = "#000D04",
  width = 25,
  height = 13,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 25 13",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M24.3651 1.01404C24.3651 1.21748 24.2843 1.41259 24.1404 1.55645C23.9966 1.70031 23.8014 1.78113 23.598 1.78113H1.09385C0.890375 1.78113 0.695239 1.70031 0.551363 1.55645C0.407488 1.41259 0.32666 1.21748 0.32666 1.01404C0.32666 0.810592 0.407488 0.615481 0.551363 0.471624C0.695239 0.327767 0.890375 0.246948 1.09385 0.246948H23.598C23.8014 0.246948 23.9966 0.327767 24.1404 0.471624C24.2843 0.615481 24.3651 0.810592 24.3651 1.01404Z",
        fill: fillColor
      }
    )
  );
}
MinusIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function LocationIcon({
  fillColor = "#48AE5A",
  width = 60,
  height = 60,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 60 60",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.37209 20.2734C8.37209 8.9376 18.1994 0 30 0C41.8006 0 51.6279 8.9376 51.6279 20.2734C51.6279 30.9091 45.0338 43.3955 34.3948 47.942C31.6017 49.1356 28.3983 49.1356 25.6052 47.942C14.9662 43.3955 8.37209 30.9091 8.37209 20.2734ZM30 4.18605C20.2229 4.18605 12.5581 11.5277 12.5581 20.2734C12.5581 29.5618 18.4338 40.3251 27.2502 44.0927C28.9926 44.8373 31.0074 44.8373 32.7498 44.0927C41.5662 40.3251 47.4419 29.5618 47.4419 20.2734C47.4419 11.5277 39.7771 4.18605 30 4.18605ZM30 18.1395C28.0734 18.1395 26.5116 19.7013 26.5116 21.6279C26.5116 23.5545 28.0734 25.1163 30 25.1163C31.9266 25.1163 33.4884 23.5545 33.4884 21.6279C33.4884 19.7013 31.9266 18.1395 30 18.1395ZM22.3256 21.6279C22.3256 17.3894 25.7615 13.9535 30 13.9535C34.2385 13.9535 37.6744 17.3894 37.6744 21.6279C37.6744 25.8664 34.2385 29.3023 30 29.3023C25.7615 29.3023 22.3256 25.8664 22.3256 21.6279ZM6.54533 38.3626C7.32122 39.2194 7.25559 40.543 6.39873 41.3189C4.81448 42.7535 4.18605 44.1267 4.18605 45.3488C4.18605 47.48 6.20654 50.1065 11.1257 52.3201C15.8484 54.4453 22.5196 55.8139 30 55.8139C37.4804 55.8139 44.1516 54.4453 48.8743 52.3201C53.7935 50.1065 55.8139 47.48 55.8139 45.3488C55.8139 44.1267 55.1855 42.7535 53.6013 41.3189C52.7444 40.543 52.6788 39.2194 53.4547 38.3626C54.2306 37.5057 55.5542 37.4401 56.411 38.216C58.5403 40.1441 60 42.5612 60 45.3488C60 50.1533 55.7733 53.8059 50.5921 56.1375C45.2145 58.5574 37.9322 60 30 60C22.0678 60 14.7855 58.5574 9.40788 56.1375C4.2267 53.8059 0 50.1533 0 45.3488C0 42.5612 1.45967 40.1441 3.58898 38.216C4.44584 37.4401 5.76944 37.5057 6.54533 38.3626Z",
        fill: fillColor
      }
    )
  );
}
LocationIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ContactsMain() {
  const { t } = useTranslation();
  const [isBelarusOpen, setIsBelarusOpen] = useState(false);
  const [isRussiaOpen, setIsRussiaOpen] = useState(false);
  const [activeCoordinates, setActiveCoordinates] = useState(() => {
    return DepartmentAdresses[0].coordinates;
  });
  const russiaData = [
    {
      id: 1,
      departmentsName: t("smolenskName"),
      address: t("smolenskAddress"),
      phoneNumber: ["+7 4812 56 74 43", "+7 910 788 60 66"],
      email: ["info@rosberlio.ru"],
      coordinates: [54.771325, 32.053075]
    }
  ];
  const handleLocationClick = useCallback((coordinates) => {
    if (Array.isArray(coordinates) && coordinates.length === 2) {
      setActiveCoordinates(coordinates);
    } else {
      console.warn("Invalid coordinates:", coordinates);
    }
  }, []);
  const replacePlaceholders = (phoneNumber) => phoneNumber.replace("{{fax}}", t("fax")).replace("{{telFax}}", t("telFax"));
  const handleKeyDown = (event, coordinates) => {
    if (event.key === "Enter" || event.key === " ") {
      handleLocationClick(coordinates);
    }
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_contacts-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_contacts-main__list" }, /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: "aam_contacts-main__header",
      onClick: () => setIsBelarusOpen(!isBelarusOpen),
      onKeyDown: (e) => e.key === "Enter" && setIsBelarusOpen(!isBelarusOpen),
      tabIndex: "0",
      role: "button"
    },
    /* @__PURE__ */ React__default.createElement("h2", null, t("belarusName")),
    isBelarusOpen ? /* @__PURE__ */ React__default.createElement(MinusIcon, null) : /* @__PURE__ */ React__default.createElement(PlusIcon, null)
  ), isBelarusOpen && DepartmentAdresses.map((branch) => /* @__PURE__ */ React__default.createElement(
    "div",
    {
      key: branch.id,
      className: `aam_contacts-main__branch-item ${isBelarusOpen ? "aam_contacts-main__branch-item--open" : ""}`
    },
    /* @__PURE__ */ React__default.createElement("h3", null, t(branch.departmentsName)),
    /* @__PURE__ */ React__default.createElement("div", { className: "aam_contacts-main__branch-details" }, /* @__PURE__ */ React__default.createElement("p", null, t(branch.address)), /* @__PURE__ */ React__default.createElement("p", null, branch.phoneNumber.map(replacePlaceholders).join(", ")), /* @__PURE__ */ React__default.createElement("p", null, branch.email.join(", ")), /* @__PURE__ */ React__default.createElement(
      "div",
      {
        className: "aam_contacts-main__location-icon",
        onClick: () => handleLocationClick(branch.coordinates),
        onKeyDown: (e) => handleKeyDown(e, branch.coordinates),
        tabIndex: "0",
        role: "button"
      },
      /* @__PURE__ */ React__default.createElement(LocationIcon, null)
    ))
  )), /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: "aam_contacts-main__header",
      onClick: () => setIsRussiaOpen(!isRussiaOpen),
      onKeyDown: (e) => e.key === "Enter" && setIsRussiaOpen(!isRussiaOpen),
      tabIndex: "0",
      role: "button"
    },
    /* @__PURE__ */ React__default.createElement("h2", null, t("russiaName")),
    isRussiaOpen ? /* @__PURE__ */ React__default.createElement(MinusIcon, null) : /* @__PURE__ */ React__default.createElement(PlusIcon, null)
  ), isRussiaOpen && russiaData.map((branch) => /* @__PURE__ */ React__default.createElement(
    "div",
    {
      key: branch.id,
      className: `aam_contacts-main__branch-item ${isRussiaOpen ? "aam_contacts-main__branch-item--open" : ""}`
    },
    /* @__PURE__ */ React__default.createElement("h3", null, branch.departmentsName),
    /* @__PURE__ */ React__default.createElement("div", { className: "aam_contacts-main__branch-details" }, /* @__PURE__ */ React__default.createElement("p", null, branch.address), /* @__PURE__ */ React__default.createElement("p", null, branch.phoneNumber.join(", ")), /* @__PURE__ */ React__default.createElement("p", null, branch.email.join(", ")), /* @__PURE__ */ React__default.createElement(
      "div",
      {
        className: "aam_contacts-main__location-icon",
        onClick: () => handleLocationClick(branch.coordinates),
        onKeyDown: (e) => handleKeyDown(e, branch.coordinates),
        tabIndex: "0",
        role: "button"
      },
      /* @__PURE__ */ React__default.createElement(LocationIcon, null)
    ))
  ))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_contacts-main__map" }, /* @__PURE__ */ React__default.createElement(MapWithConsent, { coordinates: activeCoordinates })));
}
function Contacts() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.contacts")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ContactsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function DetailedNewsMain() {
  const { t, i18n: i18n2 } = useTranslation();
  const { id } = useParams();
  const currentLanguage = i18n2.language;
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
function EquipmentAndSoftMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_equipment-and-soft-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_equipment-and-soft-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", t("breadCrumbs.equipment")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_equipment-and-soft-main__header" }, t("equipment.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_equipment-and-soft-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("equipment.descr1")), /* @__PURE__ */ React__default.createElement("p", null, t("equipment.descr2"))));
}
function GlobeIcon({
  fillColor = "#48AE5A",
  width = 60,
  height = 61,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 60 61",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M57.5 30.5C57.5 37.7935 54.6027 44.7882 49.4454 49.9454C44.2882 55.1027 37.2935 58 30 58C22.7065 58 15.7118 55.1027 10.5546 49.9454C5.39731 44.7882 2.5 37.7935 2.5 30.5M57.5 30.5C57.5 23.2065 54.6027 16.2118 49.4454 11.0546C44.2882 5.89731 37.2935 3 30 3C22.7065 3 15.7118 5.89731 10.5546 11.0546C5.39731 16.2118 2.5 23.2065 2.5 30.5M57.5 30.5H2.5",
        stroke: fillColor,
        strokeWidth: "5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M40.5767 30.5C40.0572 40.5565 36.353 50.1872 29.9998 58C23.6465 50.1872 19.9424 40.5565 19.4229 30.5C19.9424 20.4435 23.6465 10.8128 29.9998 3C36.353 10.8128 40.0572 20.4435 40.5767 30.5Z",
        stroke: fillColor,
        strokeWidth: "5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
}
GlobeIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function CanisterIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 65,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M60.0837 27.7144V43.0165C60.0837 50.8273 60.0837 54.7327 57.703 57.1567C55.3251 59.5833 51.4928 59.5833 43.8337 59.5833H22.167C14.5078 59.5833 10.6755 59.5833 8.29762 57.1567C5.91699 54.7354 5.91699 50.8273 5.91699 43.0192V35.444C5.91699 29.7673 5.91699 26.9263 7.4147 24.7731C8.91512 22.62 11.5422 21.6856 16.7991 19.8088L38.4657 12.0765C48.3132 8.56376 53.237 6.80605 56.6603 9.28417C58.5237 10.6302 59.3714 12.8185 59.7587 16.25",
        stroke: fillColor,
        strokeWidth: "4",
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M24.875 37.9167C24.875 34.0871 24.875 32.1723 26.0667 30.9834C27.2529 29.7917 29.1677 29.7917 33 29.7917C36.8296 29.7917 38.7444 29.7917 39.9333 30.9834C41.125 32.1723 41.125 34.0871 41.125 37.9167C41.125 41.7463 41.125 43.6611 39.9333 44.85C38.7444 46.0417 36.8296 46.0417 33 46.0417C29.1704 46.0417 27.2556 46.0417 26.0667 44.85C24.875 43.6638 24.875 41.749 24.875 37.9167Z",
        stroke: fillColor,
        strokeWidth: "4"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M41.1253 29.7917L43.8337 27.0833M24.8753 29.7917L22.167 27.0833M41.1253 46.0417L43.8337 48.75M24.8753 46.0417L22.167 48.75M14.042 19.1208C14.042 15.5865 14.042 13.8206 14.9574 12.6019C15.193 12.2877 15.4693 12.0061 15.7753 11.7677C16.967 10.8333 18.7003 10.8333 22.167 10.8333H24.3824C25.7555 10.8333 26.4435 10.8333 27.0095 10.9877C27.7658 11.199 28.4532 11.6056 29.0027 12.1665C29.5523 12.7275 29.9446 13.4231 30.1403 14.1836",
        stroke: fillColor,
        strokeWidth: "4",
        strokeLinecap: "round"
      }
    )
  );
}
CanisterIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ParkSystemIcon$1({
  fillColor = "#48AE5A",
  width = 66,
  height = 65,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M24.875 8.125H11.3333C10.615 8.125 9.92616 8.41034 9.41825 8.91825C8.91034 9.42616 8.625 10.115 8.625 10.8333V24.375C8.625 25.0933 8.91034 25.7822 9.41825 26.2901C9.92616 26.798 10.615 27.0833 11.3333 27.0833H24.875C25.5933 27.0833 26.2822 26.798 26.7901 26.2901C27.298 25.7822 27.5833 25.0933 27.5833 24.375V10.8333C27.5833 10.115 27.298 9.42616 26.7901 8.91825C26.2822 8.41034 25.5933 8.125 24.875 8.125ZM24.875 37.9167H11.3333C10.615 37.9167 9.92616 38.202 9.41825 38.7099C8.91034 39.2178 8.625 39.9067 8.625 40.625V54.1667C8.625 54.885 8.91034 55.5738 9.41825 56.0817C9.92616 56.5897 10.615 56.875 11.3333 56.875H24.875C25.5933 56.875 26.2822 56.5897 26.7901 56.0817C27.298 55.5738 27.5833 54.885 27.5833 54.1667V40.625C27.5833 39.9067 27.298 39.2178 26.7901 38.7099C26.2822 38.202 25.5933 37.9167 24.875 37.9167ZM47.8958 27.0833C49.1407 27.0833 50.3733 26.8381 51.5234 26.3618C52.6734 25.8854 53.7184 25.1872 54.5986 24.3069C55.4788 23.4267 56.1771 22.3818 56.6534 21.2317C57.1298 20.0816 57.375 18.849 57.375 17.6042C57.375 16.3593 57.1298 15.1267 56.6534 13.9766C56.1771 12.8266 55.4788 11.7816 54.5986 10.9014C53.7184 10.0212 52.6734 9.32293 51.5234 8.84656C50.3733 8.37019 49.1407 8.125 47.8958 8.125C45.3818 8.125 42.9707 9.1237 41.193 10.9014C39.4154 12.6791 38.4167 15.0901 38.4167 17.6042C38.4167 20.1182 39.4154 22.5293 41.193 24.3069C42.9707 26.0846 45.3818 27.0833 47.8958 27.0833ZM54.6667 37.9167H41.125C40.4067 37.9167 39.7178 38.202 39.2099 38.7099C38.702 39.2178 38.4167 39.9067 38.4167 40.625V54.1667C38.4167 54.885 38.702 55.5738 39.2099 56.0817C39.7178 56.5897 40.4067 56.875 41.125 56.875H54.6667C55.385 56.875 56.0738 56.5897 56.5817 56.0817C57.0897 55.5738 57.375 54.885 57.375 54.1667V40.625C57.375 39.9067 57.0897 39.2178 56.5817 38.7099C56.0738 38.202 55.385 37.9167 54.6667 37.9167Z",
        stroke: fillColor,
        strokeWidth: "5",
        strokeLinejoin: "round"
      }
    )
  );
}
ParkSystemIcon$1.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ParkSystemIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 65,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M27.5833 13.5417L33 8.125M22.1667 43.3333L43.8333 21.6667M33 56.875L38.4167 51.4583M45.1875 51.4583C46.9832 51.4583 48.7054 50.745 49.9752 49.4752C51.245 48.2054 51.9583 46.4832 51.9583 44.6875C51.9583 42.8918 51.245 41.1696 49.9752 39.8998C48.7054 38.63 46.9832 37.9167 45.1875 37.9167C43.3918 37.9167 41.6696 38.63 40.3998 39.8998C39.13 41.1696 38.4167 42.8918 38.4167 44.6875C38.4167 46.4832 39.13 48.2054 40.3998 49.4752C41.6696 50.745 43.3918 51.4583 45.1875 51.4583ZM20.8125 27.0833C22.6082 27.0833 24.3304 26.37 25.6002 25.1002C26.87 23.8304 27.5833 22.1082 27.5833 20.3125C27.5833 18.5168 26.87 16.7946 25.6002 15.5248C24.3304 14.255 22.6082 13.5417 20.8125 13.5417C19.0168 13.5417 17.2946 14.255 16.0248 15.5248C14.755 16.7946 14.0417 18.5168 14.0417 20.3125C14.0417 22.1082 14.755 23.8304 16.0248 25.1002C17.2946 26.37 19.0168 27.0833 20.8125 27.0833ZM15.3958 56.875C17.1916 56.875 18.9138 56.1616 20.1835 54.8919C21.4533 53.6221 22.1667 51.8999 22.1667 50.1042C22.1667 48.3084 21.4533 46.5862 20.1835 45.3165C18.9138 44.0467 17.1916 43.3333 15.3958 43.3333C13.6001 43.3333 11.8779 44.0467 10.6081 45.3165C9.33835 46.5862 8.625 48.3084 8.625 50.1042C8.625 51.8999 9.33835 53.6221 10.6081 54.8919C11.8779 56.1616 13.6001 56.875 15.3958 56.875ZM50.6042 21.6667C52.3999 21.6667 54.1221 20.9533 55.3919 19.6835C56.6616 18.4138 57.375 16.6916 57.375 14.8958C57.375 13.1001 56.6616 11.3779 55.3919 10.1081C54.1221 8.83835 52.3999 8.125 50.6042 8.125C48.8084 8.125 47.0862 8.83835 45.8165 10.1081C44.5467 11.3779 43.8333 13.1001 43.8333 14.8958C43.8333 16.6916 44.5467 18.4138 45.8165 19.6835C47.0862 20.9533 48.8084 21.6667 50.6042 21.6667Z",
        stroke: fillColor,
        strokeWidth: "4.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
}
ParkSystemIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function LaptopIcon({
  fillColor = "#48AE5A",
  width = 46,
  height = 45,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 46 45",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M37.0625 33.757H8.9375C8.19181 33.7563 7.47687 33.4597 6.94958 32.9324C6.4223 32.4051 6.12574 31.6902 6.125 30.9445V11.257C6.12574 10.5113 6.4223 9.79639 6.94958 9.2691C7.47687 8.74182 8.19181 8.44526 8.9375 8.44452H37.0625C37.8082 8.44526 38.5231 8.74182 39.0504 9.2691C39.5777 9.79639 39.8743 10.5113 39.875 11.257V30.9445C39.8739 31.6901 39.5772 32.4048 39.05 32.932C38.5228 33.4592 37.8081 33.7559 37.0625 33.757ZM8.9375 11.257V30.9445H37.0625V11.257H8.9375ZM3.3125 36.5695H42.6875V39.382H3.3125V36.5695Z",
        fill: fillColor
      }
    )
  );
}
LaptopIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
const Plate = "/assets/images/plate.png";
function PartnersSoftSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_partners-soft-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_partners-soft-section__header" }, t("equipment.partnersSoftSection.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_partners-soft-section__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: GlobeIcon,
      title: t("equipment.partnersSoftSection.headline1"),
      link: "/equipment/webCenterBerlio"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: CanisterIcon,
      title: t("equipment.partnersSoftSection.headline2"),
      link: "/equipment/oilAndCapital"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: ParkSystemIcon$1,
      title: t("equipment.partnersSoftSection.headline3"),
      link: "/equipment/selfServiceCheckout"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: ParkSystemIcon,
      title: t("equipment.partnersSoftSection.headline4"),
      link: "/equipment/gsAutomationSystem"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: LaptopIcon,
      title: t("equipment.partnersSoftSection.headline5"),
      link: "/equipment/invoicesSite"
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_partners-soft-section__images" }, /* @__PURE__ */ React__default.createElement("img", { src: Plate, alt: t("equipment.partnersSoftSection.plate"), title: t("equipment.partnersSoftSection.plate"), className: "aam_partners-soft-section__image", loading: "lazy" })));
}
function MobileIcon({
  fillColor = "#48AE5A",
  width = 46,
  height = 73,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 46 73",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M36.5 5C37.6935 5 38.8381 5.47411 39.682 6.31802C40.5259 7.16193 41 8.30653 41 9.5V63.5C41 64.6935 40.5259 65.8381 39.682 66.682C38.8381 67.5259 37.6935 68 36.5 68H9.5C8.30653 68 7.16193 67.5259 6.31802 66.682C5.47411 65.8381 5 64.6935 5 63.5V9.5C5 8.30653 5.47411 7.16193 6.31802 6.31802C7.16193 5.47411 8.30653 5 9.5 5H36.5ZM9.5 0.5C7.11305 0.5 4.82387 1.44821 3.13604 3.13604C1.44821 4.82387 0.5 7.11305 0.5 9.5V63.5C0.5 65.8869 1.44821 68.1761 3.13604 69.864C4.82387 71.5518 7.11305 72.5 9.5 72.5H36.5C38.8869 72.5 41.1761 71.5518 42.864 69.864C44.5518 68.1761 45.5 65.8869 45.5 63.5V9.5C45.5 7.11305 44.5518 4.82387 42.864 3.13604C41.1761 1.44821 38.8869 0.5 36.5 0.5L9.5 0.5Z",
        fill: fillColor
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M23 63.5C24.1935 63.5 25.3381 63.0259 26.182 62.182C27.0259 61.3381 27.5 60.1935 27.5 59C27.5 57.8065 27.0259 56.6619 26.182 55.818C25.3381 54.9741 24.1935 54.5 23 54.5C21.8065 54.5 20.6619 54.9741 19.818 55.818C18.9741 56.6619 18.5 57.8065 18.5 59C18.5 60.1935 18.9741 61.3381 19.818 62.182C20.6619 63.0259 21.8065 63.5 23 63.5Z",
        fill: fillColor
      }
    )
  );
}
MobileIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ClientIcon$1({
  fillColor = "#48AE5A",
  width = 30,
  height = 37,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 30 37",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M15 0C9.92254 0 5.80645 3.83834 5.80645 8.57317C5.80645 13.308 9.92254 17.1463 15 17.1463C20.0775 17.1463 24.1935 13.308 24.1935 8.57317C24.1935 3.83834 20.0775 0 15 0ZM8.70968 8.57317C8.70968 5.33355 11.5259 2.70732 15 2.70732C18.474 2.70732 21.2903 5.33355 21.2903 8.57317C21.2903 11.8128 18.474 14.439 15 14.439C11.5259 14.439 8.70968 11.8128 8.70968 8.57317Z",
        fill: fillColor
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M15 19.8537C11.0529 19.8537 7.4081 20.7033 4.69964 22.1466C2.03225 23.5679 0 25.7378 0 28.4268C0 31.1159 2.03225 33.2857 4.69964 34.7071C7.4081 36.1504 11.0529 37 15 37C18.9471 37 22.5919 36.1504 25.3004 34.7071C27.9677 33.2857 30 31.1159 30 28.4268C30 25.7378 27.9677 23.5679 25.3004 22.1466C22.5919 20.7033 18.9471 19.8537 15 19.8537ZM2.90323 28.4268C2.90323 27.1286 3.90388 25.6887 6.14005 24.4972C8.33514 23.3275 11.4645 22.561 15 22.561C18.5355 22.561 21.6649 23.3275 23.86 24.4972C26.0961 25.6887 27.0968 27.1286 27.0968 28.4268C27.0968 29.725 26.0961 31.1649 23.86 32.3565C21.6649 33.5262 18.5355 34.2927 15 34.2927C11.4645 34.2927 8.33514 33.5262 6.14005 32.3565C3.90388 31.1649 2.90323 29.725 2.90323 28.4268Z",
        fill: fillColor
      }
    )
  );
}
ClientIcon$1.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ClientsSoftSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_clients-soft-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_clients-soft-section__header" }, t("equipment.clientsSoftSection.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_clients-soft-section__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: MobileIcon,
      title: t("equipment.clientsSoftSection.headline1"),
      link: "/equipment/berlioCardPayApp"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: ParkSystemIcon$1,
      title: t("equipment.clientsSoftSection.headline2"),
      link: "/equipment/selfServiceCheckout"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: ClientIcon$1,
      title: t("equipment.clientsSoftSection.headline3"),
      link: "/equipment/personalAccWebApp"
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_clients-soft-section__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("equipment.clientsSoftSection.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("equipment.clientsSoftSection.upLink")
  )));
}
function Equipment() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.equipment")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(EquipmentAndSoftMain, null), /* @__PURE__ */ React__default.createElement(PartnersSoftSection, null), /* @__PURE__ */ React__default.createElement(ClientsSoftSection, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function WebCenterMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_web-center-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_web-center-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.webCenter")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_web-center-main__header" }, t("webCenterMain.name")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_web-center-main__description" }, t("webCenterMain.description")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_web-center-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_web-center-main__wrapper--title" }, t("webCenterMain.list1.title")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_web-center-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item6")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item7")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list1.item8")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_web-center-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_web-center-main__wrapper--title" }, t("webCenterMain.list2.title")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_web-center-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list2.item6")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_web-center-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_web-center-main__wrapper--title" }, t("webCenterMain.list3.title"), /* @__PURE__ */ React__default.createElement("span", null, t("webCenterMain.list3.subTitle"))), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_web-center-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list3.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list3.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("webCenterMain.list3.item3")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_web-center-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("webCenterMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("webCenterMain.upLink")
  )));
}
function WebCenterBerlio() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.webCenter")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(WebCenterMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function OilAndCapitalMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_oil-and-capital-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_oil-and-capital-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.oilAndCapital")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_oil-and-capital-main__header" }, t("oilAndCapitalMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_oil-and-capital-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_oil-and-capital-main__wrapper--title" }, t("oilAndCapitalMain.list.title")), /* @__PURE__ */ React__default.createElement("span", { className: "aam_oil-and-capital-main__wrapper--sub-title" }, t("oilAndCapitalMain.list.subTitle")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_oil-and-capital-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("oilAndCapitalMain.list.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("oilAndCapitalMain.list.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("oilAndCapitalMain.list.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("oilAndCapitalMain.list.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("oilAndCapitalMain.list.item5")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_oil-and-capital-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("oilAndCapitalMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("oilAndCapitalMain.upLink")
  )));
}
function OilAndCapital() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.oilAndCapital")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(OilAndCapitalMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function SelfServiceCheckoutMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_self-service-checkout-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.selfServiceCheckout")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_self-service-checkout-main__header" }, t("selfServiceCheckoutMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("selfServiceCheckoutMain.descriptionFirst")), /* @__PURE__ */ React__default.createElement("p", null, t("selfServiceCheckoutMain.descriptionPreBold"), /* @__PURE__ */ React__default.createElement("strong", null, t("selfServiceCheckoutMain.descriptionBold")), " "), /* @__PURE__ */ React__default.createElement("p", null, t("selfServiceCheckoutMain.descriptionSecond"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__wrapper" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_self-service-checkout-main__wrapper--sup-description" }, t("selfServiceCheckoutMain.list1.supDescription")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_self-service-checkout-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list1.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list1.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list1.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list1.item5")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("selfServiceCheckoutMain.descriptionThird")), /* @__PURE__ */ React__default.createElement("p", null, t("selfServiceCheckoutMain.descriptionFourth"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__wrapper" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_self-service-checkout-main__wrapper--sup-description" }, t("selfServiceCheckoutMain.list2.supDescription")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_self-service-checkout-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("selfServiceCheckoutMain.list2.item6"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_self-service-checkout-main__wrapper--sub-description" }, t("selfServiceCheckoutMain.list2.subDescription"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_self-service-checkout-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("selfServiceCheckoutMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("selfServiceCheckoutMain.upLink")
  )));
}
function SelfServiceCheckout() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.selfServiceCheckout")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(SelfServiceCheckoutMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
const AutomationScheme = "/assets/images/Obshchaya-skhema-SA.png";
function GSAutomationSystemMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_gs-automation-system-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.gsAutomationSystem")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_gs-automation-system-main__header" }, t("gsAutomationSystemMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__title" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_gs-automation-system-main__title--sup" }, t("gsAutomationSystemMain.supTitle")), /* @__PURE__ */ React__default.createElement("h2", { className: "aam_gs-automation-system-main__title--sub" }, t("gsAutomationSystemMain.subTitle"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("gsAutomationSystemMain.descriptionFirst")), /* @__PURE__ */ React__default.createElement("p", null, t("gsAutomationSystemMain.descriptionSecond"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_gs-automation-system-main__wrapper--title" }, t("gsAutomationSystemMain.list1.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, t("gsAutomationSystemMain.list1.firstSubTitle"), /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list1.firstSubTitleBold"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list1.secondSubTitleBold")), t("gsAutomationSystemMain.list1.secondSubTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__wrapper--container" }, /* @__PURE__ */ React__default.createElement("ul", { className: "aam_gs-automation-system-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list1.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list1.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list1.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list1.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list1.item6")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list1.item7")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list1.item8"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__image-wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_gs-automation-system-main__image-wrapper--image-title" }, t("gsAutomationSystemMain.list1.imageTitle")), /* @__PURE__ */ React__default.createElement("img", { src: AutomationScheme, alt: t("gsAutomationSystemMain.list1.imageAltAndTitle"), title: t("gsAutomationSystemMain.list1.imageAltAndTitle") })))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__wrapper" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, t("gsAutomationSystemMain.list2.firstSubTitle"), /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list2.firstSubTitleBold"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list2.secondSubTitleBold")), t("gsAutomationSystemMain.list2.secondSubTitle"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_gs-automation-system-main__wrapper--title" }, t("gsAutomationSystemMain.list3.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, t("gsAutomationSystemMain.list3.firstSubTitle"), /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list3.firstSubTitleBold"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list3.secondSubTitleBold")), t("gsAutomationSystemMain.list3.secondSubTitle"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__wrapper" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, t("gsAutomationSystemMain.list4.firstSubTitle"), /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list4.firstSubTitleBold"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list4.secondSubTitleBold")), t("gsAutomationSystemMain.list4.secondSubTitle"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__wrapper" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, t("gsAutomationSystemMain.list5.firstSubTitle"), /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list5.firstSubTitleBold"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list5.secondSubTitleBold")), t("gsAutomationSystemMain.list5.secondSubTitle"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__wrapper" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, t("gsAutomationSystemMain.list6.firstSubTitle"), /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list6.firstSubTitleBold"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_gs-automation-system-main__wrapper--sub-title" }, /* @__PURE__ */ React__default.createElement("strong", null, t("gsAutomationSystemMain.list6.secondSubTitleBold"))), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_gs-automation-system-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list6.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list6.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list6.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list6.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list6.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list6.item6")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_gs-automation-system-main__wrapper--title" }, t("gsAutomationSystemMain.list7.title")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_gs-automation-system-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item6")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item7")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item8")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item9")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item10")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item11")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item12")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item13")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item14")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item15")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item16")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item17")), /* @__PURE__ */ React__default.createElement("li", null, t("gsAutomationSystemMain.list7.item18")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_gs-automation-system-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("gsAutomationSystemMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("gsAutomationSystemMain.upLink")
  )));
}
function GSAutomationSystem() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.gsAutomationSystem")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(GSAutomationSystemMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
const InvoicesSiteImage = "/assets/images/Invoices-site.png";
function InvoicesSiteMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_invoices-site-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.invoicesSite")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_invoices-site-main__header" }, t("invoicesSiteMain.name")), /* @__PURE__ */ React__default.createElement(Link, { to: "https://xn--q1agiw.xn--90ais/", target: "_blank", rel: "noopener noreferrer" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__site-link" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_invoices-site-main__site-link--title" }, t("invoicesSiteMain.siteLink")), /* @__PURE__ */ React__default.createElement(LinkArrowIcon, null))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__image" }, /* @__PURE__ */ React__default.createElement("img", { src: InvoicesSiteImage, alt: t("invoicesSiteMain.altAndTitle"), title: t("invoicesSiteMain.altAndTitle") })), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-main__description" }, t("invoicesSiteMain.description")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-main__wrapper--title" }, t("invoicesSiteMain.list1.title")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list1.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list1.listItem2")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list1.listItem3")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-main__wrapper--title" }, t("invoicesSiteMain.list2.title")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list2.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list2.listItem2")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list2.listItem3")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list2.listItem4")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list2.listItem5")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list2.listItem6")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-main__wrapper--title" }, t("invoicesSiteMain.list3.title")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem2"), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-main__wrapper--sub-list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem2Details.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem2Details.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem2Details.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem2Details.item4")))), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3"), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-main__wrapper--sub-list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item6")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item7")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item8")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item9")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item10")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item11")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item12")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item13")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item14")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item15")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item16")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item17")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item18")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item19")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item20")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list3.listItem3Details.item21")))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__minus-margin" }, /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("h4", null, t("invoicesSiteMain.list4.listItem1"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("h4", null, t("invoicesSiteMain.list4.listItem2"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("h4", null, t("invoicesSiteMain.list4.listItem3"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("h4", null, t("invoicesSiteMain.list4.listItem4"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("h4", null, t("invoicesSiteMain.list4.listItem5"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("h4", null, t("invoicesSiteMain.list4.listItem6"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("h4", null, t("invoicesSiteMain.list4.listItem7"))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-main__wrapper--title" }, t("invoicesSiteMain.list5.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-main__wrapper--sub-title" }, t("invoicesSiteMain.list5.subTitle")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list5.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list5.listItem2")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list5.listItem3")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list5.listItem4")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list5.listItem5")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list5.listItem6")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-main__wrapper--color-title" }, t("invoicesSiteMain.list6.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-main__wrapper--sub-title" }, t("invoicesSiteMain.list6.firstSubTitle")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-main__wrapper--sub-title" }, t("invoicesSiteMain.list6.secondSubTitle")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list6.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteMain.list6.listItem2")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-main__wrapper--color-title" }, t("invoicesSiteMain.list7.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-main__wrapper--sub-title" }, t("invoicesSiteMain.list7.subTitle"), " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment/invoicesSiteTariffs", className: "aam_invoices-site-main__wrapper--color-link" }, t("breadCrumbs.invoicesSiteTariffs")), " ", /* @__PURE__ */ React__default.createElement(LinkArrowIcon, null))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-main__wrapper--title" }, t("invoicesSiteMain.list8.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-main__wrapper--sub-title" }, t("invoicesSiteMain.list8.firstSubTitle"), " ", /* @__PURE__ */ React__default.createElement("span", { className: "aam_invoices-site-main__wrapper--color-span" }, t("invoicesSiteMain.list8.colorSpan"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-main__wrapper--sub-title" }, t("invoicesSiteMain.list8.secondSubTitle"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("invoicesSiteMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("invoicesSiteMain.upLink")
  )));
}
function InvoicesSite() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.invoicesSite")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(InvoicesSiteMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
const InvoicesSiteTariffsPNG = "/assets/images/invoicesSiteTariffs.jpg";
function InvoicesSiteTariffsMain() {
  const { t } = useTranslation();
  const handlePdfClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_invoices-site-tariffs-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/invoicesSite" }, t("breadCrumbs.invoicesSite")), " ", "/", " ", t("breadCrumbs.invoicesSiteTariffs")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_invoices-site-tariffs-main__header" }, t("invoicesSiteTariffsMain.name")), /* @__PURE__ */ React__default.createElement("img", { src: InvoicesSiteTariffsPNG, alt: "invoicesSiteTariffs" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("invoicesSiteTariffsMain.description")), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("invoicesSiteTariffsMain.strongDescription")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--title" }, t("invoicesSiteTariffsMain.list.title")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-tariffs-main__wrapper--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem2")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem3")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem4")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem5")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem6")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.list.listItem7"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-tariffs-main__wrapper--ps" }, /* @__PURE__ */ React__default.createElement("strong", null, t("invoicesSiteTariffsMain.list.ps")), " ", /* @__PURE__ */ React__default.createElement(Link, { to: "https://api.cardcenter.by" }, "https://api.cardcenter.by"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--title" }, t("invoicesSiteTariffsMain.wrapper1.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_invoices-site-tariffs-main__wrapper--sub-title" }, t("invoicesSiteTariffsMain.wrapper1.subTitle"), " ", /* @__PURE__ */ React__default.createElement("a", { href: "mailto:info@berlio.by" }, "info@berlio.by"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_invoices-site-tariffs-main__wrapper--service-card-header" }, t("invoicesSiteTariffsMain.serviceCardHeader")), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_invoices-site-tariffs-main__wrapper--service-card",
      Icon: PdfIcon,
      title: t("invoicesSiteTariffsMain.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handlePdfClick(
        t("invoicesSiteTariffsMain.cardTitle1"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--title" }, t("invoicesSiteTariffsMain.wrapper2.title")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper--container" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper--container-block" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-color-title" }, t("invoicesSiteTariffsMain.wrapper2.cont1.title")), /* @__PURE__ */ React__default.createElement("h4", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-sub-title" }, t("invoicesSiteTariffsMain.wrapper2.cont1.subTitle")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont1.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont1.listItem2")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont1.listItem3")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper--container-block" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-color-title" }, t("invoicesSiteTariffsMain.wrapper2.cont2.title")), /* @__PURE__ */ React__default.createElement("h4", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-sub-title" }, t("invoicesSiteTariffsMain.wrapper2.cont2.subTitle")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont2.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont2.listItem2"), " ", /* @__PURE__ */ React__default.createElement(Link, { to: "http://api.cardcenter.by/Help" }, "http://api.cardcenter.by/Help")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont2.listItem3")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__wrapper--container-block" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-color-title" }, t("invoicesSiteTariffsMain.wrapper2.cont3.title")), /* @__PURE__ */ React__default.createElement("h4", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-sub-title" }, t("invoicesSiteTariffsMain.wrapper2.cont3.subTitle")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_invoices-site-tariffs-main__wrapper--container-block-list" }, /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont3.listItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("invoicesSiteTariffsMain.wrapper2.cont3.listItem2")))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_invoices-site-tariffs-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("invoicesSiteTariffsMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("invoicesSiteTariffsMain.upLink")
  )));
}
function InvoicesSiteTariffs() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.invoicesSiteTariffs")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(InvoicesSiteTariffsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function InformationCard({
  title,
  links = [],
  bgImage = "",
  IconComponent = null,
  customClass
}) {
  return /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: `aam_information-card ${customClass}`,
      style: { backgroundImage: bgImage ? `url(${bgImage})` : "none" }
    },
    /* @__PURE__ */ React__default.createElement("div", { className: "aam_information-card__content" }, IconComponent && /* @__PURE__ */ React__default.createElement("div", { className: "aam_information-card__icon" }, /* @__PURE__ */ React__default.createElement(
      IconComponent,
      {
        fillColor: "#FFFFFFFF",
        width: "45",
        height: "45"
      }
    )), /* @__PURE__ */ React__default.createElement("h3", { className: "aam_information-card__title" }, title)),
    /* @__PURE__ */ React__default.createElement("div", { className: "aam_information-card__hover-overlay" }, (links || []).map((link) => link.href && /* @__PURE__ */ React__default.createElement(
      "a",
      {
        key: link.href,
        href: link.href,
        className: "aam_information-card__link",
        target: link.href.startsWith("http") ? "_blank" : "_self",
        rel: link.href.startsWith("http") ? "noopener noreferrer" : void 0
      },
      link.label
    )))
  );
}
InformationCard.propTypes = {
  title: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string
    })
  ),
  bgImage: PropTypes.string,
  customClass: PropTypes.string
};
const BG4 = "/assets/images/info-card-bg4.jpg";
const BG5 = "/assets/images/info-card-bg5.jpg";
const BG6 = "/assets/images/info-card-bg6.jpg";
const BG7 = "/assets/images/info-card-bg7.jpg";
function DocumentIcon({
  fillColor = "#FFFFFFFF",
  width = 35,
  height = 34,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 35 34",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M15.8318 8.6423e-07H19.1682C21.3309 -3.17492e-05 23.0741 -5.80514e-05 24.4451 0.18427C25.8685 0.375645 27.067 0.785059 28.0189 1.73693C28.4909 2.20892 28.8295 2.74156 29.0743 3.3322C30.5482 3.51684 31.7857 3.92239 32.7631 4.8998C33.7149 5.85167 34.1244 7.05017 34.3157 8.47359C34.5001 9.84461 34.5 11.5878 34.5 13.7505V20.2496C34.5 22.4123 34.5001 24.1556 34.3157 25.5266C34.1244 26.95 33.7149 28.1485 32.7631 29.1004C31.7857 30.0778 30.5482 30.4833 29.0742 30.668C28.8294 31.2585 28.4908 31.7911 28.0189 32.2631C27.067 33.2149 25.8685 33.6244 24.4451 33.8157C23.0741 34.0001 21.3309 34 19.1682 34H15.8318C13.6691 34 11.9259 34.0001 10.5549 33.8157C9.13148 33.6244 7.93298 33.2149 6.98111 32.2631C6.50916 31.7911 6.17056 31.2585 5.92578 30.668C4.45182 30.4833 3.21435 30.0778 2.23693 29.1004C1.28506 28.1485 0.875645 26.95 0.68427 25.5266C0.499942 24.1556 0.499968 22.4124 0.500001 20.2497V13.7505C0.499968 11.5878 0.499942 9.84461 0.68427 8.47359C0.875645 7.05017 1.28506 5.85167 2.23693 4.8998C3.21433 3.92239 4.45178 3.51683 5.92571 3.33219C6.1705 2.74156 6.50912 2.20892 6.98111 1.73693C7.93298 0.785058 9.13148 0.375645 10.5549 0.18427C11.9259 -5.80514e-05 13.6691 -3.17492e-05 15.8318 8.6423e-07ZM5.36822 5.83609C4.67618 6.00287 4.24475 6.24662 3.91425 6.57712C3.47658 7.01479 3.19122 7.62928 3.03521 8.78967C2.87461 9.98418 2.87209 11.5673 2.87209 13.8373V20.1629C2.87209 22.4328 2.87461 24.016 3.03521 25.2105C3.19122 26.3709 3.47658 26.9854 3.91425 27.423C4.24475 27.7535 4.67619 27.9973 5.36824 28.1641C5.24413 26.8812 5.24416 25.3079 5.24419 23.4124V10.5876C5.24416 8.69218 5.24413 7.11895 5.36822 5.83609ZM29.6318 28.1641C30.3238 27.9973 30.7552 27.7535 31.0858 27.423C31.5234 26.9854 31.8088 26.3709 31.9648 25.2105C32.1254 24.016 32.1279 22.4328 32.1279 20.1629V13.8373C32.1279 11.5673 32.1254 9.98418 31.9648 8.78967C31.8088 7.62928 31.5234 7.01479 31.0858 6.57712C30.7552 6.24662 30.3238 6.00287 29.6318 5.8361C29.7559 7.11895 29.7558 8.69219 29.7558 10.5876V23.4123C29.7558 25.3079 29.7559 26.8812 29.6318 28.1641ZM10.871 2.53521C9.71059 2.69122 9.09611 2.97658 8.65843 3.41425C8.22076 3.85192 7.93541 4.46641 7.7794 5.6268C7.6188 6.8213 7.61628 8.40446 7.61628 10.6744V23.3256C7.61628 25.5955 7.6188 27.1787 7.7794 28.3732C7.93541 29.5336 8.22076 30.1481 8.65843 30.5858C9.09611 31.0234 9.71059 31.3088 10.871 31.4648C12.0655 31.6254 13.6486 31.6279 15.9186 31.6279H19.0814C21.3514 31.6279 22.9345 31.6254 24.129 31.4648C25.2894 31.3088 25.9039 31.0234 26.3416 30.5858C26.7792 30.1481 27.0646 29.5336 27.2206 28.3732C27.3812 27.1787 27.3837 25.5955 27.3837 23.3256V10.6744C27.3837 8.40446 27.3812 6.8213 27.2206 5.6268C27.0646 4.46641 26.7792 3.85192 26.3416 3.41425C25.9039 2.97658 25.2894 2.69122 24.129 2.53521C22.9345 2.37461 21.3514 2.37209 19.0814 2.37209H15.9186C13.6486 2.37209 12.0655 2.37461 10.871 2.53521ZM11.5698 12.2558C11.5698 11.6008 12.1008 11.0698 12.7558 11.0698H22.2442C22.8992 11.0698 23.4302 11.6008 23.4302 12.2558C23.4302 12.9108 22.8992 13.4419 22.2442 13.4419H12.7558C12.1008 13.4419 11.5698 12.9108 11.5698 12.2558ZM11.5698 18.5814C11.5698 17.9264 12.1008 17.3953 12.7558 17.3953H22.2442C22.8992 17.3953 23.4302 17.9264 23.4302 18.5814C23.4302 19.2364 22.8992 19.7674 22.2442 19.7674H12.7558C12.1008 19.7674 11.5698 19.2364 11.5698 18.5814ZM11.5698 24.907C11.5698 24.2519 12.1008 23.7209 12.7558 23.7209H17.5C18.155 23.7209 18.686 24.2519 18.686 24.907C18.686 25.562 18.155 26.093 17.5 26.093H12.7558C12.1008 26.093 11.5698 25.562 11.5698 24.907Z",
        fill: fillColor
      }
    )
  );
}
DocumentIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ClientIcon({
  fillColor = "#FFFFFFFF",
  width = 29,
  height = 35,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 29 35",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M14.4097 5.14585e-07H14.5903C17.5307 -2.48532e-05 19.8597 -4.50611e-05 21.6824 0.245016C23.5583 0.497221 25.0766 1.02861 26.274 2.22599C27.4714 3.42337 28.0028 4.94169 28.255 6.81756C28.5 8.64031 28.5 10.9693 28.5 13.9097V20.4903C28.5 23.4307 28.5 25.7597 28.255 27.5824C28.0028 29.4583 27.4714 30.9766 26.274 32.174C25.0766 33.3714 23.5583 33.9028 21.6824 34.155C19.8597 34.4 17.5307 34.4 14.5903 34.4H14.4097C11.4693 34.4 9.14031 34.4 7.31756 34.155C5.44169 33.9028 3.92337 33.3714 2.72599 32.174C1.52861 30.9766 0.997221 29.4583 0.745016 27.5824C0.499955 25.7597 0.499975 23.4307 0.500001 20.4903V13.9097C0.499975 10.9693 0.499955 8.64031 0.745016 6.81756C0.997221 4.94169 1.52861 3.42337 2.72599 2.22599C3.92337 1.02861 5.44169 0.497221 7.31756 0.245016C9.14031 -4.50611e-05 11.4693 -2.48532e-05 14.4097 5.14585e-07ZM7.63736 2.62362C6.02762 2.84004 5.10018 3.24591 4.42305 3.92305C3.74591 4.60018 3.34004 5.52762 3.12361 7.13736C2.90255 8.78162 2.9 10.9491 2.9 14V20.4C2.9 23.4509 2.90255 25.6184 3.12361 27.2626C3.34004 28.8724 3.74591 29.7998 4.42305 30.477C5.10018 31.1541 6.02762 31.56 7.63736 31.7764C9.28162 31.9974 11.4491 32 14.5 32C17.5509 32 19.7184 31.9974 21.3626 31.7764C22.9724 31.56 23.8998 31.1541 24.577 30.477C25.2541 29.7998 25.66 28.8724 25.8764 27.2626C26.0975 25.6184 26.1 23.4509 26.1 20.4V14C26.1 10.9491 26.0975 8.78162 25.8764 7.13736C25.66 5.52762 25.2541 4.60018 24.577 3.92305C23.8998 3.24591 22.9724 2.84004 21.3626 2.62362C19.7184 2.40255 17.5509 2.4 14.5 2.4C11.4491 2.4 9.28162 2.40255 7.63736 2.62362Z",
        fill: fillColor
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.5 28.4C8.5 27.7373 9.03726 27.2 9.7 27.2H19.3C19.9627 27.2 20.5 27.7373 20.5 28.4C20.5 29.0628 19.9627 29.6 19.3 29.6H9.7C9.03726 29.6 8.5 29.0628 8.5 28.4Z",
        fill: fillColor
      }
    )
  );
}
ClientIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
const forPartners = { "num#1": { "icon": "LaptopIcon", "title": "forPartnersMain.partnerInfo.title1", "bg-image": "BG1", "links": [{ "href": "/equipment/webCenterBerlio", "label": "forPartnersMain.partnerInfo.label1" }, { "href": "/equipment/oilAndCapital", "label": "forPartnersMain.partnerInfo.label2" }, { "href": "/equipment/selfServiceCheckout", "label": "forPartnersMain.partnerInfo.label3" }, { "href": "/equipment/gsAutomationSystem", "label": "forPartnersMain.partnerInfo.label4" }, { "href": "/equipment/invoicesSite", "label": "forPartnersMain.partnerInfo.label5" }] }, "num#2": { "icon": "DocumentIcon", "title": "forPartnersMain.partnerInfo.title2", "bg-image": "BG2", "links": [{ "href": "/partners/voiceRefService", "label": "forPartnersMain.partnerInfo.label6" }, { "href": "/partners/loyaltyProgram", "label": "forPartnersMain.partnerInfo.label7" }, { "href": "/partners/documentsForDownload", "label": "forPartnersMain.partnerInfo.label8" }, { "href": "/partners/systemRules", "label": "forPartnersMain.partnerInfo.label9" }, { "href": "/partners/forBankInformation", "label": "forPartnersMain.partnerInfo.label10" }] }, "num#3": { "icon": "DocumentIcon", "title": "forPartnersMain.partnerInfo.title3", "bg-image": "BG3", "links": [{ "href": "#/partners/11" }] } };
const forClients = { "num#1": { "icon": "ClientIcon", "title": "forClientsMain.clientInfo.title1", "bg-image": "BG4", "links": [{ "href": "/clients/signAndResign", "label": "forClientsMain.clientInfo.label1" }, { "href": "/clients/gettingElectronicCard", "label": "forClientsMain.clientInfo.label2" }, { "href": "/clients/cardUsageRules", "label": "forClientsMain.clientInfo.label3" }, { "href": "/clients/dealResignation", "label": "forClientsMain.clientInfo.label4" }, { "href": "/clients/priceListsAndTariffs", "label": "forClientsMain.clientInfo.label5" }, { "href": "/clients/workWithPrivateAccount", "label": "forClientsMain.clientInfo.label6" }, { "href": "/clients/documentsForDownload", "label": "forClientsMain.clientInfo.label7" }] }, "num#2": { "icon": "OilIcon", "title": "forClientsMain.clientInfo.title2", "bg-image": "BG5", "links": [{ "href": "https://map.berlio.by", "label": "forClientsMain.clientInfo.label8" }, { "href": "/clients/plasticCardUsageRules", "label": "forClientsMain.clientInfo.label9" }, { "href": "/clients/tollRoads", "label": "forClientsMain.clientInfo.label10" }, { "href": "/clients/forFuelPayments", "label": "forClientsMain.clientInfo.label11" }] }, "num#3": { "icon": "DocumentIcon", "title": "forClientsMain.clientInfo.title3", "bg-image": "BG6", "links": [{ "href": "/clients/issuerRules", "label": "forClientsMain.clientInfo.label12" }, { "href": "/clients/eMoneyRegulations", "label": "forClientsMain.clientInfo.label13" }] }, "num#4": { "icon": "SmartphoneIcon", "title": "forClientsMain.clientInfo.title4", "bg-image": "BG7", "links": [{ "href": "/equipment/berlioInternetClientApp", "label": "forClientsMain.clientInfo.label14" }, { "href": "/equipment/berlioCardPayApp", "label": "forClientsMain.clientInfo.label15" }, { "href": "/equipment/smartPayApp", "label": "forClientsMain.clientInfo.label16" }, { "href": "/equipment/selfServiceCheckout", "label": "forClientsMain.clientInfo.label17" }, { "href": "/equipment/personalAccWebApp", "label": "forClientsMain.clientInfo.label18" }] } };
const cardDataJson = {
  forPartners,
  forClients
};
function ForClientsMain() {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const BG_IMAGES = {
      BG4,
      BG5,
      BG6,
      BG7
    };
    const ICONS = {
      ClientIcon: ClientIcon$1,
      OilIcon,
      DocumentIcon,
      SmartphoneIcon: ClientIcon
    };
    const updatedCards = Object.values(cardDataJson.forClients).map((card) => ({
      ...card,
      bgImage: BG_IMAGES[card["bg-image"]],
      IconComponent: ICONS[card.icon] || null
    }));
    setCards(updatedCards);
  }, []);
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-clients-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_about-block__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), "/", t("breadCrumbs.forClients")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_for-clients-main__title" }, t("forClientsMain.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-clients-main__description" }, t("forClientsMain.description")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-clients-main__cards" }, cards.map((cardData) => /* @__PURE__ */ React__default.createElement(
    InformationCard,
    {
      key: cardData.title,
      title: t(cardData.title),
      bgImage: cardData.bgImage,
      IconComponent: cardData.IconComponent,
      links: Array.isArray(cardData.links) ? cardData.links.map((link) => ({
        href: link.href.startsWith("http") ? link.href : `${baseUrl}${link.href}`,
        label: t(link.label),
        target: link.href.startsWith("http") ? "_blank" : "_self",
        rel: link.href.startsWith("http") ? "noopener noreferrer" : void 0
      })) : [],
      customClass: `clientsCard-${cardData.title.replace(/\s+/g, "-")}`,
      loading: "lazy"
    }
  ))));
}
function ClockIcon({
  fillColor = "#48AE5A",
  width = 61,
  height = 60,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 61 60",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M30.5 4.18605C16.2433 4.18605 4.68605 15.7433 4.68605 30C4.68605 44.2567 16.2433 55.8139 30.5 55.8139C44.7567 55.8139 56.3139 44.2567 56.3139 30C56.3139 15.7433 44.7567 4.18605 30.5 4.18605ZM0.5 30C0.5 13.4315 13.9315 0 30.5 0C47.0685 0 60.5 13.4315 60.5 30C60.5 46.5685 47.0685 60 30.5 60C13.9315 60 0.5 46.5685 0.5 30ZM30.5 16.7442C31.6559 16.7442 32.593 17.6813 32.593 18.8372V29.133L38.9567 35.4968C39.7741 36.3141 39.7741 37.6394 38.9567 38.4567C38.1394 39.2741 36.8141 39.2741 35.9968 38.4567L29.02 31.48C28.6275 31.0875 28.407 30.5551 28.407 30V18.8372C28.407 17.6813 29.3441 16.7442 30.5 16.7442Z",
        fill: fillColor
      }
    )
  );
}
ClockIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function MultifunctionIcon({
  fillColor = "#48AE5A",
  width = 60,
  height = 66,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 60 66",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M22.4354 1.44622C27.3046 -0.426675 32.6954 -0.426675 37.5646 1.44622L55.4459 8.32394C57.8901 9.26372 59.5 11.6111 59.5 14.2239V14.8181C58.7218 14.2352 57.8666 13.7629 56.9588 13.4148L36.0517 5.37394C32.1563 3.87562 27.8437 3.87562 23.9483 5.37394L3.04121 13.4148C2.13338 13.7629 1.27817 14.2352 0.5 14.8181V14.2282C0.500169 12.9502 0.887683 11.7023 1.61144 10.649C2.33519 9.5957 3.3612 8.78652 4.55414 8.32815L22.4354 1.44622ZM13.3114 25.8469C13.4203 25.5922 13.5783 25.3614 13.7764 25.1678C13.9745 24.9742 14.2088 24.8216 14.466 24.7187C14.7232 24.6157 14.9981 24.5645 15.2751 24.5679C15.5521 24.5713 15.8257 24.6293 16.0802 24.7386L30 30.706L43.9198 24.7386C44.1744 24.6296 44.4479 24.5717 44.7248 24.5684C45.0018 24.5651 45.2766 24.6164 45.5337 24.7193C45.7908 24.8222 46.0252 24.9748 46.2233 25.1683C46.4214 25.3617 46.5795 25.5924 46.6886 25.8469C46.7976 26.1015 46.8554 26.3751 46.8587 26.652C46.862 26.9289 46.8107 27.2038 46.7078 27.4609C46.6049 27.718 46.4524 27.9523 46.2589 28.1504C46.0654 28.3486 45.8348 28.5067 45.5802 28.6157L32.1071 34.3893V47.7486C32.1071 48.3074 31.8851 48.8434 31.49 49.2386C31.0948 49.6337 30.5588 49.8557 30 49.8557C29.4412 49.8557 28.9052 49.6337 28.51 49.2386C28.1149 48.8434 27.8929 48.3074 27.8929 47.7486V34.3893L14.4198 28.6157C14.1651 28.5069 13.9343 28.3489 13.7407 28.1508C13.5471 27.9526 13.3945 27.7183 13.2915 27.4611C13.1886 27.204 13.1373 26.929 13.1408 26.6521C13.1442 26.3751 13.2022 26.1015 13.3114 25.8469ZM25.4612 9.30586C28.3827 8.18213 31.6173 8.18213 34.5388 9.30586L55.4459 17.3509C57.8901 18.2865 59.5 20.6339 59.5 23.2509V51.1748C59.4998 52.4528 59.1123 53.7007 58.3886 54.754C57.6648 55.8072 56.6388 56.6164 55.4459 57.0748L34.5388 65.1156C31.6173 66.2394 28.3827 66.2394 25.4612 65.1156L4.55414 57.0748C3.3612 56.6164 2.33519 55.8072 1.61144 54.754C0.887683 53.7007 0.500169 52.4528 0.5 51.1748V23.2509C0.500169 21.973 0.887683 20.725 1.61144 19.6718C2.33519 18.6185 3.3612 17.8093 4.55414 17.3509L25.4612 9.30586ZM33.0259 13.242C31.0782 12.4928 28.9218 12.4928 26.9741 13.242L6.06707 21.2829C5.66894 21.4355 5.32648 21.7054 5.08495 22.0567C4.84341 22.4081 4.71417 22.8245 4.71429 23.2509V51.1748C4.71384 51.6007 4.84247 52.0167 5.08321 52.3681C5.32395 52.7194 5.66551 52.9895 6.06286 53.1429L26.9741 61.1837C28.9218 61.9329 31.0782 61.9329 33.0259 61.1837L53.9371 53.1429C54.3345 52.9895 54.676 52.7194 54.9168 52.3681C55.1575 52.0167 55.2862 51.6007 55.2857 51.1748V23.2509C55.2862 22.825 55.1575 22.409 54.9168 22.0577C54.676 21.7063 54.3345 21.4362 53.9371 21.2829L33.0259 13.242Z",
        fill: fillColor
      }
    )
  );
}
MultifunctionIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ClientsAdvantagesSection() {
  const { t } = useTranslation();
  const CSSSelectorPrefix = "aam_clients-advantages-section";
  return /* @__PURE__ */ React__default.createElement("section", { className: `${CSSSelectorPrefix}` }, /* @__PURE__ */ React__default.createElement("h2", { className: `${CSSSelectorPrefix}__title` }, t("clientsAdvantages.name")), /* @__PURE__ */ React__default.createElement("div", { className: `${CSSSelectorPrefix}__cards-box` }, /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix,
      Icon: ClockIcon,
      title: t("clientsAdvantages.customerService"),
      description: t("clientsAdvantages.customerServiceTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix,
      Icon: LaptopIcon,
      title: t("clientsAdvantages.dealSign"),
      description: t("clientsAdvantages.dealSignTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix,
      Icon: MultifunctionIcon,
      title: t("clientsAdvantages.personalCabinet"),
      description: t("clientsAdvantages.personalCabinetTagline")
    }
  )));
}
const partnersFAQ = { "faq_title": "partners.faq_title", "questions": { "question1": "partners.questions.question1", "question2": "partners.questions.question2", "question3": "partners.questions.question3", "question4": "partners.questions.question4", "question5": "partners.questions.question5" }, "answers": { "answer1": "partners.answers.answer1", "answer2": "partners.answers.answer2", "answer3": "partners.answers.answer3", "answer4": "partners.answers.answer4", "answer5": "partners.answers.answer5" } };
const clientsFAQ = { "faq_title": "clients.faq_title", "questions": { "question1": "clients.questions.question1", "question2": "clients.questions.question2", "question3": "clients.questions.question3", "question4": "clients.questions.question4", "question5": "clients.questions.question5" }, "answers": { "answer1": "clients.answers.answer1", "answer2": "clients.answers.answer2", "answer3": "clients.answers.answer3", "answer4": "clients.answers.answer4", "answer5": "clients.answers.answer5" } };
const FAQData = {
  partnersFAQ,
  clientsFAQ
};
function FAQSection({ category }) {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const { t } = useTranslation();
  if (!FAQData[category]) {
    return /* @__PURE__ */ React__default.createElement("div", null, t("invalid_category"));
  }
  const {
    questions,
    answers,
    faq_title: faqTitle
  } = FAQData[category];
  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  const renderFAQ = () => {
    const questionKeys = Object.keys(questions);
    const answerKeys = Object.keys(answers);
    return questionKeys.map((questionKey, index) => {
      const questionValue = questions[questionKey];
      const answerValue = answers[answerKeys[index]];
      const isActive = activeQuestion === index;
      return /* @__PURE__ */ React__default.createElement("div", { key: questionKey, className: "aam_faq-section__item" }, /* @__PURE__ */ React__default.createElement(
        "div",
        {
          className: "aam_faq-section__question",
          role: "button",
          tabIndex: 0,
          onClick: () => toggleAnswer(index),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleAnswer(index);
            }
          }
        },
        t(questionValue),
        /* @__PURE__ */ React__default.createElement("span", { className: "aam_faq-section__icon" }, isActive ? /* @__PURE__ */ React__default.createElement(MinusIcon, null) : /* @__PURE__ */ React__default.createElement(PlusIcon, null))
      ), /* @__PURE__ */ React__default.createElement("div", { className: `aam_faq-section__answer ${isActive ? "" : "hidden"}` }, t(answerValue)));
    });
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_faq-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_faq-section__title" }, t(faqTitle)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_faq-section__list" }, renderFAQ()));
}
FAQSection.propTypes = {
  category: PropTypes.string.isRequired
};
function ForClients() {
  const { t } = useTranslation();
  process.env.NODE_ENV === "production";
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.forClients")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание услуг и программного обеспечения, предоставляемых клиентам" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Для клиентов, Услуги, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ForClientsMain, null), /* @__PURE__ */ React__default.createElement(ClientsAdvantagesSection, null), /* @__PURE__ */ React__default.createElement(FAQSection, { category: "clientsFAQ" }), /* @__PURE__ */ React__default.createElement(
    LogoSection,
    {
      title: t("ourClientsLogoSection"),
      logos: partnersLogos.logos,
      logoBasePath: "/assets/images/"
    }
  ), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function SignAndResignMain() {
  const { t } = useTranslation();
  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_sign-and-resign" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.signAndResign")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_sign-and-resign__header" }, t("signAndResignMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("signAndResignMain.description")), /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignMain.purposeBeforeLink"), /* @__PURE__ */ React__default.createElement("a", { href: "https://map.berlio.by", target: "_blank", rel: "noreferrer" }, t("signAndResignMain.purposeLink")), t("signAndResignMain.purposeAfterLink"), " "), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignMain.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignMain.list1.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignMain.list1.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignMain.list1.item4")))), /* @__PURE__ */ React__default.createElement("h2", { className: "aam_sign-and-resign__participants" }, t("signAndResignMain.participants")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_sign-and-resign",
      Icon: ClientIcon$1,
      title: t("signAndResignMain.operator"),
      description: t("signAndResignMain.operatorTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_sign-and-resign",
      Icon: ClientIcon$1,
      title: t("signAndResignMain.agents"),
      description: t("signAndResignMain.agentsTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_sign-and-resign",
      Icon: ClientIcon$1,
      title: t("signAndResignMain.emissioner"),
      description: t("signAndResignMain.emissionerTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_sign-and-resign",
      Icon: ClientIcon$1,
      title: t("signAndResignMain.tradeAndServiceObject"),
      description: t("signAndResignMain.tradeAndServiceObjectTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_sign-and-resign",
      Icon: ClientIcon$1,
      title: t("signAndResignMain.serviseCenter"),
      description: t("signAndResignMain.serviseCenterTagline")
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__customer-service" }, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignMain.customerService")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignMain.list2.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignMain.list2.item2")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__system-usage" }, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignMain.systemUsage")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignMain.list3.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignMain.list3.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignMain.list3.item3")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__documents" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_sign-and-resign__documents-title" }, t("signAndResignMain.documentsTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__operator-documents" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_sign-and-resign__operator-documents-title" }, t("signAndResignMain.operatorDocumentsTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_sign-and-resign__service-card",
      Icon: PdfIcon,
      title: t("signAndResignMain.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handleLinkClick(
        t("signAndResignMain.cardTitle1"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_sign-and-resign__service-card",
      Icon: PdfIcon,
      title: t("signAndResignMain.cardTitle2"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handleLinkClick(
        t("signAndResignMain.cardTitle2"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_sign-and-resign__service-card",
      Icon: PdfIcon,
      title: t("signAndResignMain.cardTitle3"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handleLinkClick(
        t("signAndResignMain.cardTitle3"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__emissioner-documents" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_sign-and-resign__emissioner-documents-title" }, t("signAndResignMain.emissionerDocumentsTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_sign-and-resign__service-card",
      Icon: PdfIcon,
      title: t("signAndResignMain.cardTitle4"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handleLinkClick(
        t("signAndResignMain.cardTitle4"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_sign-and-resign__service-card",
      Icon: PdfIcon,
      title: t("signAndResignMain.cardTitle5"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handleLinkClick(
        t("signAndResignMain.cardTitle5"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  ))))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_sign-and-resign__footer" }, t("signAndResignMain.footer")));
}
function SignAndResignSection() {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPositions, setDropdownPositions] = useState({});
  const dropdownRefs = useRef({});
  useEffect(() => {
    const positions = {};
    Object.keys(dropdownRefs.current).forEach((index) => {
      const el = dropdownRefs.current[index];
      if (el) positions[index] = el.getBoundingClientRect().top + window.scrollY;
    });
    setDropdownPositions(positions);
  }, []);
  const handleToggle = (index) => {
    setOpenDropdown((prev) => prev === index ? null : index);
  };
  const handleDropdownClick = (index) => {
    if (index === 2) {
      const firstDropdown = dropdownRefs.current[1];
      const secondDropdown = dropdownRefs.current[2];
      const firstDropdownHeight = firstDropdown?.offsetHeight || 0;
      const secondDropdownHeight = secondDropdown?.offsetHeight || 0;
      let offset = window.scrollY;
      if (openDropdown === 1) {
        offset -= firstDropdownHeight;
      } else {
        offset = dropdownPositions[2] - dropdownPositions[1] + window.scrollY - secondDropdownHeight;
      }
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_sign-and-resign-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_sign-and-resign-section__title" }, t("signAndResignSection.name")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_sign-and-resign-section__description" }, t("signAndResignSection.description")), /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: "aam_sign-and-resign-section__dropdown-section",
      ref: (el) => {
        dropdownRefs.current[2] = el;
      }
    },
    /* @__PURE__ */ React__default.createElement(
      NavigationDropdown,
      {
        label: /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, t("signAndResignSection.dropdown1"), " ", /* @__PURE__ */ React__default.createElement("a", { href: "https://lkb.by", target: "_blank", rel: "noopener noreferrer" }, t("signAndResignSection.link")), ":"),
        isOpen: openDropdown === 1,
        closedColor: "black",
        openColor: "black",
        hoverColor: "black",
        onToggle: () => {
          handleDropdownClick(1);
          handleToggle(1);
        },
        onClose: () => setOpenDropdown(null)
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "div",
      {
        className: `aam_sign-and-resign-section__self-sign-list ${openDropdown === 1 ? "open" : ""}`
      },
      /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.item4")), /* @__PURE__ */ React__default.createElement("ol", null, /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem1")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem2")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem3")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem4")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem5")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem6")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem7")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem8")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem9")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem10")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem11")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem12")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem13")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem14")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem15")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem16")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.selfSignList.orderedItem17")))),
      /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", { className: "aam_sign-and-resign-section__self-sign-footer" }, t("signAndResignSection.selfSignList.footer"))),
      /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", { className: "aam_sign-and-resign-section__self-sign-secondary-footer" }, t("signAndResignSection.selfSignList.secondaryFooter")))
    )
  ), /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: "aam_sign-and-resign-section__dropdown-section",
      ref: (el) => {
        dropdownRefs.current[2] = el;
      }
    },
    /* @__PURE__ */ React__default.createElement(
      NavigationDropdown,
      {
        label: t("signAndResignSection.dropdown2"),
        isOpen: openDropdown === 2,
        closedColor: "black",
        openColor: "black",
        hoverColor: "black",
        onToggle: () => {
          handleDropdownClick(2);
          handleToggle(2);
        },
        onClose: () => setOpenDropdown(null)
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "div",
      {
        className: `aam_sign-and-resign-section__customer-service-sign-list ${openDropdown === 2 ? "open" : ""}`
      },
      /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.customerServiceSignList.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.customerServiceSignList.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.customerServiceSignList.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.customerServiceSignList.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.customerServiceSignList.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.customerServiceSignList.item6")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.customerServiceSignList.item7")))
    )
  ), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign-section__deal-fact" }, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignSection.dealFact")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.dealFactList.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.dealFactList.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("signAndResignSection.dealFactList.item3")))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_sign-and-resign-section__footer" }, /* @__PURE__ */ React__default.createElement("strong", null, t("signAndResignSection.footer.beforeTel"), " ", /* @__PURE__ */ React__default.createElement("a", { href: "tel:+375 29 623 08 88" }, t("signAndResignSection.footer.tel1")), " ", t("signAndResignSection.footer.betweenTels"), " ", /* @__PURE__ */ React__default.createElement("a", { href: "tel:+375 17 210 00 00" }, t("signAndResignSection.footer.tel2")), ".", t("signAndResignSection.footer.afterTel"))), /* @__PURE__ */ React__default.createElement(LinkButton, { href: `${baseUrl}/contacts`, target: "_self", className: "green" }, t("signAndResignSection.contactsLink")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_sign-and-resign-section__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("signAndResignSection.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("signAndResignSection.upLink")
  )));
}
function SignAndResign() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.signAndResign")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Новости" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(SignAndResignMain, null), /* @__PURE__ */ React__default.createElement(SignAndResignSection, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function GettingElectronicCardMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_getting-card-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_getting-card-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.gettingCard")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_getting-card-main__header" }, t("gettingCardMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_getting-card-main__description" }, /* @__PURE__ */ React__default.createElement("strong", { className: "aam_getting-card-main__description--header" }, t("gettingCardMain.applicationHeader")), /* @__PURE__ */ React__default.createElement("ul", { className: "aam_getting-card-main__description--list" }, /* @__PURE__ */ React__default.createElement("li", null, t("gettingCardMain.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("gettingCardMain.list1.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("gettingCardMain.list1.item3"), " ", /* @__PURE__ */ React__default.createElement("a", { href: "mailto:info@berlio.by", rel: "noopener noreferrer" }, t("gettingCardMain.mailLink")))), /* @__PURE__ */ React__default.createElement("strong", { className: "aam_getting-card-main__description--footer" }, t("gettingCardMain.applicationFooter"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_getting-card-main__documents" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_getting-card-main__documents--header" }, t("gettingCardMain.documentsHeader")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_getting-card-main__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_getting-card-main",
      Icon: ClientIcon$1,
      title: t("gettingCardMain.supervisor"),
      description: /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", { style: { listStyleType: "decimal", listStylePosition: "outside", lineHeight: "24.51px" } }, t("gettingCardMain.supList.item1")), /* @__PURE__ */ React__default.createElement("li", { style: { listStyleType: "decimal", listStylePosition: "outside", lineHeight: "24.51px" } }, t("gettingCardMain.supList.item2")), /* @__PURE__ */ React__default.createElement("li", { style: { listStyleType: "decimal", listStylePosition: "outside", lineHeight: "24.51px" } }, t("gettingCardMain.supList.item3")))
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_getting-card-main",
      Icon: ClientIcon$1,
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
function DocxIcon({
  fillColor = "#48AE5A",
  width = 52,
  height = 65,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 52 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M9.92857 61.4284C8.22361 61.4284 6.58848 60.7511 5.38288 59.5455C4.17729 58.34 3.5 56.7048 3.5 54.9999V8.57129C3.5 5.80986 5.73858 3.57129 8.5 3.57129H30.3575C31.6836 3.57129 32.9554 4.09807 33.893 5.03576L47.0355 18.1783C47.9732 19.1159 48.5 20.3877 48.5 21.7138V54.9999C48.5 56.7048 47.8227 58.34 46.6171 59.5455C45.4115 60.7511 43.7764 61.4284 42.0714 61.4284H9.92857Z",
        stroke: fillColor,
        strokeWidth: "6",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M29.2141 3.57129V17.857C29.2141 20.6184 31.4527 22.857 34.2141 22.857H48.4998",
        stroke: fillColor,
        strokeWidth: "6",
        strokeLinejoin: "round"
      }
    )
  );
}
DocxIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function DealResignationMain() {
  const { t } = useTranslation();
  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".doc") ? title : `${title}.doc`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_deal-resignation-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_deal-resignation-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.dealResignation")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_deal-resignation-main__header" }, t("dealResignationMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_deal-resignation-main__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_deal-resignation-main__service-card",
      Icon: DocxIcon,
      title: t("dealResignationMain.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleLinkClick(
        t("dealResignationMain.cardTitle1"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_deal-resignation-main__service-card",
      Icon: DocxIcon,
      title: t("dealResignationMain.cardTitle2"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleLinkClick(
        t("dealResignationMain.cardTitle2"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_deal-resignation-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("dealResignationMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("dealResignationMain.upLink")
  )));
}
function DealResignation() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.dealResignation")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(DealResignationMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function PriceListsAndTariffsMain() {
  const { t } = useTranslation();
  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".doc") ? title : `${title}.doc`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  const cardData = [
    {
      titleKey: "priceListsAndTariffsMain.cardTitle1",
      link: `${baseUrl}/assets/documents/1.doc`
    },
    {
      titleKey: "priceListsAndTariffsMain.cardTitle2",
      link: `${baseUrl}/assets/documents/2.doc`
    },
    {
      titleKey: "priceListsAndTariffsMain.cardTitle3",
      link: `${baseUrl}/assets/documents/3.doc`
    }
  ];
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_price-lists-and-tariffs-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_price-lists-and-tariffs-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.priceListsAndTariffs")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_price-lists-and-tariffs-main__header" }, t("priceListsAndTariffsMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_price-lists-and-tariffs-main__card-boxes" }, cardData.map((card) => /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      key: card.titleKey,
      className: "aam_price-lists-and-tariffs-main__service-card",
      Icon: DocxIcon,
      title: t(card.titleKey),
      description: "",
      link: card.link,
      onClick: () => handleLinkClick(t(card.titleKey), card.link)
    }
  ))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_price-lists-and-tariffs-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("priceListsAndTariffsMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("priceListsAndTariffsMain.upLink")
  )));
}
function PriceListsAndTariffs() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.priceListsAndTariffs")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(PriceListsAndTariffsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function InfoIcon({
  fillColor = "#48AE5A",
  width = 60,
  height = 61,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 60 61",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M30 58C45.1878 58 57.5 45.6878 57.5 30.5C57.5 15.3122 45.1878 3 30 3C14.8122 3 2.5 15.3122 2.5 30.5C2.5 45.6878 14.8122 58 30 58Z",
        stroke: fillColor,
        strokeWidth: "5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M30 41.5V30.5M30 19.5H30.0275",
        stroke: fillColor,
        strokeWidth: "5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
}
InfoIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function HandCashIcon({
  fillColor = "#48AE5A",
  width = 86,
  height = 85,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 86 86",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M7.5835 38.9585L17.525 27.7775C18.8541 26.2818 20.4849 25.0846 22.3102 24.2647C24.1354 23.4449 26.1136 23.021 28.1145 23.021H28.8335M7.5835 69.0627H27.0627L41.2293 58.4377C41.2293 58.4377 44.0981 56.5004 48.3127 53.1252C57.1668 46.0418 48.3127 34.8289 39.4585 40.7293C32.2477 45.5354 25.2918 49.5835 25.2918 49.5835",
        stroke: fillColor,
        strokeWidth: "4.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M28.8335 47.8127V24.7918C28.8335 22.9132 29.5798 21.1115 30.9082 19.7832C32.2365 18.4548 34.0382 17.7085 35.9168 17.7085H71.3335C73.2121 17.7085 75.0138 18.4548 76.3422 19.7832C77.6706 21.1115 78.4168 22.9132 78.4168 24.7918V46.0418C78.4168 47.9204 77.6706 49.7221 76.3422 51.0505C75.0138 52.3789 73.2121 53.1252 71.3335 53.1252H48.3127",
        stroke: fillColor,
        strokeWidth: "4.5"
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M69.5625 35.4522L69.5979 35.4133M37.6875 35.4522L37.7229 35.4133M53.625 42.5002C51.7464 42.5002 49.9447 41.7539 48.6163 40.4255C47.2879 39.0971 46.5417 37.2954 46.5417 35.4168C46.5417 33.5382 47.2879 31.7365 48.6163 30.4082C49.9447 29.0798 51.7464 28.3335 53.625 28.3335C55.5036 28.3335 57.3053 29.0798 58.6337 30.4082C59.9621 31.7365 60.7083 33.5382 60.7083 35.4168C60.7083 37.2954 59.9621 39.0971 58.6337 40.4255C57.3053 41.7539 55.5036 42.5002 53.625 42.5002Z",
        stroke: fillColor,
        strokeWidth: "4.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
}
HandCashIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ReportIcon({
  fillColor = "#48AE5A",
  width = 76,
  height = 76,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 76 76",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M61.0375 22.0875L44.4125 5.4625C43.9375 4.9875 43.4625 4.75 42.75 4.75H19C16.3875 4.75 14.25 6.8875 14.25 9.5V66.5C14.25 69.1125 16.3875 71.25 19 71.25H57C59.6125 71.25 61.75 69.1125 61.75 66.5V23.75C61.75 23.0375 61.5125 22.5625 61.0375 22.0875ZM42.75 10.45L56.05 23.75H42.75V10.45ZM57 66.5H19V9.5H38V23.75C38 26.3625 40.1375 28.5 42.75 28.5H57V66.5Z",
        fill: fillColor
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M23.75 54.25C23.75 53.1454 24.6454 52.25 25.75 52.25H50.25C51.3546 52.25 52.25 53.1454 52.25 54.25V55C52.25 56.1046 51.3546 57 50.25 57H25.75C24.6454 57 23.75 56.1046 23.75 55V54.25ZM23.75 40C23.75 38.8954 24.6454 38 25.75 38H50.25C51.3546 38 52.25 38.8954 52.25 40V40.75C52.25 41.8546 51.3546 42.75 50.25 42.75H25.75C24.6454 42.75 23.75 41.8546 23.75 40.75V40Z",
        fill: fillColor
      }
    )
  );
}
ReportIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function CashIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 66,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 66",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement("g", { clipPath: "url(#clip0_279_3604)" }, /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M60.4219 10.6562H5.57812C4.23132 10.6563 2.93968 11.1913 1.98735 12.1436C1.03502 13.0959 0.5 14.3876 0.5 15.7344L0.5 50.2656C0.5 51.6124 1.03502 52.9041 1.98735 53.8564C2.93968 54.8087 4.23132 55.3438 5.57812 55.3438H60.4219C61.7687 55.3438 63.0603 54.8087 64.0127 53.8564C64.965 52.9041 65.5 51.6124 65.5 50.2656V15.7344C65.5 14.3876 64.965 13.0959 64.0127 12.1436C63.0603 11.1913 61.7687 10.6563 60.4219 10.6562ZM5.57812 15.7344H13.7031C13.6466 16.7383 13.3904 17.7208 12.9493 18.6243C12.5083 19.5279 11.8913 20.3344 11.1346 20.9965C10.3779 21.6586 9.49671 22.163 8.54259 22.4802C7.58846 22.7974 6.58062 22.921 5.57812 22.8438V15.7344ZM5.57812 50.2656V43.1562C6.58062 43.079 7.58846 43.2026 8.54259 43.5198C9.49671 43.837 10.3779 44.3414 11.1346 45.0035C11.8913 45.6656 12.5083 46.4721 12.9493 47.3757C13.3904 48.2792 13.6466 49.2617 13.7031 50.2656H5.57812ZM60.4219 50.2656H52.5C52.6154 48.2752 53.5128 46.411 54.9967 45.0793C56.4805 43.7477 58.4306 43.0564 60.4219 43.1562V50.2656ZM60.4219 38.0781C58.7678 38.0239 57.1193 38.2962 55.5706 38.8795C54.0218 39.4628 52.6032 40.3456 51.3959 41.4775C50.1886 42.6094 49.2162 43.9681 48.5343 45.4761C47.8524 46.984 47.4744 48.6115 47.4219 50.2656H18.5781C18.5256 48.6115 18.1476 46.984 17.4657 45.4761C16.7838 43.9681 15.8114 42.6094 14.6041 41.4775C13.3968 40.3456 11.9782 39.4628 10.4294 38.8795C8.88069 38.2962 7.23217 38.0239 5.57812 38.0781V27.9219C7.23217 27.9761 8.88069 27.7038 10.4294 27.1205C11.9782 26.5372 13.3968 25.6544 14.6041 24.5225C15.8114 23.3906 16.7838 22.0319 17.4657 20.5239C18.1476 19.016 18.5256 17.3885 18.5781 15.7344H47.4219C47.4744 17.3885 47.8524 19.016 48.5343 20.5239C49.2162 22.0319 50.1886 23.3906 51.3959 24.5225C52.6032 25.6544 54.0218 26.5372 55.5706 27.1205C57.1193 27.7038 58.7678 27.9761 60.4219 27.9219V38.0781ZM60.4219 22.8438C58.4306 22.9436 56.4805 22.2523 54.9967 20.9207C53.5128 19.589 52.6154 17.7248 52.5 15.7344H60.4219V22.8438Z",
        fill: fillColor
      }
    ), /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M33 20.8124C31.346 20.7582 29.6974 21.0305 28.1487 21.6138C26.6 22.1971 25.1814 23.0799 23.974 24.2118C22.7667 25.3437 21.7943 26.7024 21.1124 28.2104C20.4305 29.7183 20.0525 31.3458 20 32.9999C20.0525 34.654 20.4305 36.2816 21.1124 37.7895C21.7943 39.2974 22.7667 40.6562 23.974 41.788C25.1814 42.9199 26.6 43.8027 28.1487 44.386C29.6974 44.9693 31.346 45.2416 33 45.1874C34.654 45.2416 36.3026 44.9693 37.8513 44.386C39.4 43.8027 40.8186 42.9199 42.026 41.788C43.2333 40.6562 44.2057 39.2974 44.8876 37.7895C45.5695 36.2816 45.9475 34.654 46 32.9999C45.9475 31.3458 45.5695 29.7183 44.8876 28.2104C44.2057 26.7024 43.2333 25.3437 42.026 24.2118C40.8186 23.0799 39.4 22.1971 37.8513 21.6138C36.3026 21.0305 34.654 20.7582 33 20.8124ZM33 40.1093C31.0087 40.2091 29.0587 39.5179 27.5748 38.1862C26.0909 36.8545 25.1935 34.9904 25.0781 32.9999C25.1935 31.0095 26.0909 29.1453 27.5748 27.8136C29.0587 26.482 31.0087 25.7907 33 25.8906C34.0025 25.8133 35.0103 25.9369 35.9645 26.2541C36.9186 26.5713 37.7998 27.0757 38.5565 27.7378C39.3132 28.3999 39.9301 29.2064 40.3712 30.11C40.8122 31.0135 41.0685 31.996 41.125 32.9999C41.0685 34.0038 40.8122 34.9863 40.3712 35.8899C39.9301 36.7935 39.3132 37.5999 38.5565 38.2621C37.7998 38.9242 36.9186 39.4286 35.9645 39.7458C35.0103 40.063 34.0025 40.1866 33 40.1093Z",
        fill: fillColor
      }
    )),
    /* @__PURE__ */ React__default.createElement("defs", null, /* @__PURE__ */ React__default.createElement("clipPath", { id: "clip0_279_3604" }, /* @__PURE__ */ React__default.createElement("rect", { width: "65", height: "65", fill: "white", transform: "translate(0.5 0.5)" })))
  );
}
CashIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function WorkWithPrivateAccountMain() {
  const { t } = useTranslation();
  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_work-with-private-account" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_work-with-private-account__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.workWithPrivateAccount")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_work-with-private-account__header" }, t("workWithPrivateAccount.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_work-with-private-account__description" }, /* @__PURE__ */ React__default.createElement("strong", null, t("workWithPrivateAccount.description")), /* @__PURE__ */ React__default.createElement("ol", null, /* @__PURE__ */ React__default.createElement("li", null, t("workWithPrivateAccount.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("workWithPrivateAccount.list1.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("workWithPrivateAccount.list1.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("workWithPrivateAccount.list1.item4")))), /* @__PURE__ */ React__default.createElement("h2", { className: "aam_work-with-private-account__sections" }, t("workWithPrivateAccount.sections")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_work-with-private-account__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_work-with-private-account",
      Icon: InfoIcon,
      title: t("workWithPrivateAccount.information"),
      description: t("workWithPrivateAccount.informationTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_work-with-private-account",
      Icon: HandCashIcon,
      title: t("workWithPrivateAccount.payments"),
      description: t("workWithPrivateAccount.paymentsTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_work-with-private-account",
      Icon: PaymentCardIcon,
      title: t("workWithPrivateAccount.cardList"),
      description: t("workWithPrivateAccount.cardListTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_work-with-private-account",
      Icon: ReportIcon,
      title: t("workWithPrivateAccount.report"),
      description: t("workWithPrivateAccount.reportTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix: "aam_work-with-private-account",
      Icon: CashIcon,
      title: t("workWithPrivateAccount.balance"),
      description: t("workWithPrivateAccount.balanceTagline")
    }
  )), /* @__PURE__ */ React__default.createElement("strong", { className: "aam_work-with-private-account__text" }, t("workWithPrivateAccount.middleDescriptinon")), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_work-with-private-account__service-card",
      Icon: PdfIcon,
      title: t("workWithPrivateAccount.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handleLinkClick(
        t("workWithPrivateAccount.cardTitle1"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(LinkButton, { href: "https://lkb.by", target: "_blank", rel: "noopener noreferrer", className: "green" }, t("workWithPrivateAccount.lkbLink")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_work-with-private-account__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("workWithPrivateAccount.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("workWithPrivateAccount.upLink")
  )));
}
function WorkWithPrivateAccount() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.workWithPrivateAccount")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(WorkWithPrivateAccountMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function DocumentsForDownloadMain() {
  const { t } = useTranslation();
  const handlePdfClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const handleDocClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".doc") ? title : `${title}.doc`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_documents-for-download-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_documents-for-download-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.documentsForDownload")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_documents-for-download-main__header" }, t("documentsForDownloadMain.name")), /* @__PURE__ */ React__default.createElement("h2", { className: "aam_documents-for-download-main__boxes-header" }, t("documentsForDownloadMain.boxesHeaders.applications")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_documents-for-download-main__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: PdfIcon,
      title: t("documentsForDownloadMain.app.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handlePdfClick(
        t("documentsForDownloadMain.app.cardTitle1"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.app.cardTitle2"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.app.cardTitle2"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.app.cardTitle3"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.app.cardTitle3"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("h2", { className: "aam_documents-for-download-main__boxes-header" }, t("documentsForDownloadMain.boxesHeaders.sampleLetters")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_documents-for-download-main__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.letters.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.letters.cardTitle1"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: PdfIcon,
      title: t("documentsForDownloadMain.letters.cardTitle2"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handlePdfClick(
        t("documentsForDownloadMain.letters.cardTitle2"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.letters.cardTitle3"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.letters.cardTitle3"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.letters.cardTitle4"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.letters.cardTitle4"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.letters.cardTitle5"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.letters.cardTitle5"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.letters.cardTitle6"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.letters.cardTitle6"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.letters.cardTitle7"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.letters.cardTitle7"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.letters.cardTitle8"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.letters.cardTitle8"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.letters.cardTitle9"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.letters.cardTitle9"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.letters.cardTitle10"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.letters.cardTitle10"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("h2", { className: "aam_documents-for-download-main__boxes-header" }, t("documentsForDownloadMain.boxesHeaders.paymentOrders")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_documents-for-download-main__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: PdfIcon,
      title: t("documentsForDownloadMain.orders.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handlePdfClick(
        t("documentsForDownloadMain.orders.cardTitle1"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: PdfIcon,
      title: t("documentsForDownloadMain.orders.cardTitle2"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handlePdfClick(
        t("documentsForDownloadMain.orders.cardTitle2"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("h2", { className: "aam_documents-for-download-main__boxes-header" }, t("documentsForDownloadMain.boxesHeaders.notifications")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_documents-for-download-main__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_documents-for-download-main__service-card",
      Icon: DocxIcon,
      title: t("documentsForDownloadMain.notify.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.doc`,
      onClick: () => handleDocClick(
        t("documentsForDownloadMain.notify.cardTitle1"),
        `${baseUrl}/assets/documents/1.doc`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_documents-for-download-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("documentsForDownloadMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
function SystemRulesMain() {
  return /* @__PURE__ */ React__default.createElement(
    "h1",
    {
      style: {
        color: "red",
        width: "400px",
        textAlign: "center",
        margin: "50px auto"
      }
    },
    "Секция с описанием правил системы “БЕРЛИО”"
  );
}
function SystemRules() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.systemRules")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(SystemRulesMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function PlasticCardUsageMain() {
  return /* @__PURE__ */ React__default.createElement(
    "h1",
    {
      style: {
        color: "red",
        width: "400px",
        textAlign: "center",
        margin: "50px auto"
      }
    },
    "Секция с описанием правил использования пластиковых(топливных) карт"
  );
}
function PlasticCardUsageRules() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.plasticCardUsageRules")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(PlasticCardUsageMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function NonResidentsSupportMain() {
  return /* @__PURE__ */ React__default.createElement(
    "h1",
    {
      style: {
        color: "red",
        width: "400px",
        textAlign: "center",
        margin: "50px auto"
      }
    },
    "Секция с описанием услуг предоставляемых клиентам не резидентам."
  );
}
function NonResidentsSupport() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.nonResidentsSupport")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(NonResidentsSupportMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function TollRoadsMain() {
  return /* @__PURE__ */ React__default.createElement(
    "h1",
    {
      style: {
        color: "red",
        width: "400px",
        textAlign: "center",
        margin: "50px auto"
      }
    },
    "Секция с описанием порядка оплаты платных дорог"
  );
}
function TollRoads() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.tollRoads")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(TollRoadsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function ForFuelPaymentsMain() {
  return /* @__PURE__ */ React__default.createElement(
    "h1",
    {
      style: {
        color: "red",
        width: "400px",
        textAlign: "center",
        margin: "50px auto"
      }
    },
    "Секция с описанием способов оплаты за топливо"
  );
}
function ForFuelPayments() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.forFuelPayments")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ForFuelPaymentsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function IssuerRulesMain() {
  return /* @__PURE__ */ React__default.createElement(
    "h1",
    {
      style: {
        color: "red",
        width: "400px",
        textAlign: "center",
        margin: "50px auto"
      }
    },
    "Секция с описанием правил эмитента ЭД “БЕРЛИО”"
  );
}
function IssuerRules() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.issuerRules")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(IssuerRulesMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function EMoneyRegulationsMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_e-money-regulations-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_e-money-regulations-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/clients" }, t("breadCrumbs.forClients")), " ", "/", " ", t("breadCrumbs.eMoneyRegulations")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_e-money-regulations-main__header" }, t("eMoneyRegulationsMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_e-money-regulations-main__description" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_e-money-regulations-main__description--first" }, t("eMoneyRegulationsMain.descriptionFirst")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_e-money-regulations-main__description--second" }, /* @__PURE__ */ React__default.createElement("strong", null, t("eMoneyRegulationsMain.descriptionSecond"))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_e-money-regulations-main__description--third" }, t("eMoneyRegulationsMain.descriptionThird")), /* @__PURE__ */ React__default.createElement("ol", { className: "aam_e-money-regulations-main__description--ol" }, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item1"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item2"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item3.span")), /* @__PURE__ */ React__default.createElement("p", null, t("eMoneyRegulationsMain.descriptionOl.item3.header")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item3.ulItem1"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item3.ulItem2"))))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item4"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item5"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item6"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item7"))), /* @__PURE__ */ React__default.createElement("li", null, /* @__PURE__ */ React__default.createElement("span", null, t("eMoneyRegulationsMain.descriptionOl.item8.before"), /* @__PURE__ */ React__default.createElement(Link, { to: "/news" }, t("eMoneyRegulationsMain.descriptionOl.item8.firstLink")), t("eMoneyRegulationsMain.descriptionOl.item8.between"), /* @__PURE__ */ React__default.createElement(Link, { to: "https://lkb.by", target: "_blank", rel: "noopener noreferrer" }, t("eMoneyRegulationsMain.descriptionOl.item8.secondLink")), t("eMoneyRegulationsMain.descriptionOl.item8.after"))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_e-money-regulations-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("eMoneyRegulationsMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("eMoneyRegulationsMain.upLink")
  )));
}
function EMoneyRegulations() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.eMoneyRegulations")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(EMoneyRegulationsMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
const iphoneBIC = "/assets/images/iphone-berliointernetclient.png";
function AppStoreIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 66,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 66",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M8.51888 46.7741C7.80059 46.7741 7.11171 46.4887 6.6038 45.9808C6.09589 45.4729 5.81055 44.784 5.81055 44.0657C5.81055 43.3474 6.09589 42.6586 6.6038 42.1506C7.11171 41.6427 7.80059 41.3574 8.51888 41.3574H36.9564C39.6647 41.3574 42.3731 46.7741 41.0189 46.7741H8.51888ZM46.4356 46.7741C45.7173 46.7741 45.0284 46.4887 44.5205 45.9808C44.0126 45.4729 43.7272 44.784 43.7272 44.0657C43.7272 43.3474 44.0126 42.6586 44.5205 42.1506C45.0284 41.6427 45.7173 41.3574 46.4356 41.3574H57.2689C57.9872 41.3574 58.6761 41.6427 59.184 42.1506C59.6919 42.6586 59.9772 43.3474 59.9772 44.0657C59.9772 44.784 59.6919 45.4729 59.184 45.9808C58.6761 46.4887 57.9872 46.7741 57.2689 46.7741H46.4356ZM34.6083 10.2143C34.9667 9.5915 35.5578 9.13663 36.2516 8.94972C36.9454 8.76281 37.6851 8.85917 38.3078 9.21759C38.9306 9.57602 39.3855 10.1672 39.5724 10.861C39.7593 11.5548 39.6629 12.2944 39.3045 12.9172L20.598 45.4063C20.4207 45.7147 20.1845 45.9851 19.9026 46.2022C19.6208 46.4192 19.299 46.5786 18.9556 46.6713C18.6122 46.764 18.2539 46.7881 17.9012 46.7423C17.5484 46.6965 17.2082 46.5817 16.8998 46.4044C16.5915 46.2271 16.321 45.9908 16.104 45.709C15.887 45.4272 15.7276 45.1054 15.6349 44.7619C15.5422 44.4185 15.5181 44.0602 15.5639 43.7075C15.6097 43.3548 15.7245 43.0145 15.9018 42.7061L34.6083 10.2143ZM11.2272 50.8366C12.5814 48.1282 20.7064 45.4199 17.998 50.0782C16.5286 52.5907 15.0543 55.1005 13.5753 57.6074C13.2169 58.2301 12.6258 58.685 11.932 58.8719C11.2382 59.0588 10.4985 58.9625 9.87576 58.6041C9.25299 58.2456 8.79812 57.6545 8.61121 56.9607C8.4243 56.2669 8.52066 55.5272 8.87909 54.9045L11.2272 50.8366ZM25.1291 12.9172C24.7707 12.2944 24.6743 11.5548 24.8612 10.861C25.0481 10.1672 25.503 9.57602 26.1258 9.21759C26.7485 8.85917 27.4882 8.76281 28.182 8.94972C28.8758 9.13663 29.4669 9.5915 29.8253 10.2143L34.546 18.4178C34.7291 18.7262 34.8491 19.068 34.8991 19.4232C34.9491 19.7784 34.928 20.1399 34.8371 20.4869C34.7461 20.8339 34.5872 21.1594 34.3695 21.4444C34.1518 21.7295 33.8796 21.9684 33.5687 22.1474C33.2579 22.3264 32.9146 22.4419 32.5588 22.4872C32.203 22.5324 31.8417 22.5065 31.4959 22.411C31.1502 22.3155 30.8269 22.1522 30.5447 21.9307C30.2626 21.7092 30.0273 21.4339 29.8524 21.1207L25.1291 12.9172ZM35.6022 31.8782C33.1701 27.8157 35.6022 19.6907 37.5414 23.7424L55.5518 54.8991C55.8989 55.5208 55.9872 56.2542 55.7976 56.9405C55.608 57.6269 55.1557 58.2109 54.5386 58.5663C53.9216 58.9216 53.1894 59.0197 52.5006 58.8392C51.8118 58.6587 51.2218 58.2142 50.8583 57.602L35.6022 31.8782Z",
        fill: fillColor
      }
    )
  );
}
AppStoreIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function PlayMarketIcon({
  fillColor = "#48AE5A",
  width = 66,
  height = 66,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 66 66",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M43.4591 43.586L5.85196 5.97425M43.4591 21.5928L5.85196 59.2M4.59375 56.3585V8.81568C4.59375 5.69568 8.26161 3.71783 11.2516 5.23604L58.0377 29.0075C61.1112 30.5675 61.1112 34.6114 58.0377 36.1714L11.2516 59.9428C8.26161 61.461 4.59375 59.4832 4.59375 56.3585Z",
        stroke: fillColor,
        strokeWidth: "5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
}
PlayMarketIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function BerlioInternetClientAppMain() {
  const { t } = useTranslation();
  const handlePlayClick = () => {
    window.open("https://play.google.com/store/apps/details?id=by.berlio.trueClient", "_blank", "noopener,noreferrer");
  };
  const handleAppleClick = () => {
    window.open("https://apps.apple.com/ru/app/berlio-internet-client/id1228629688?ls=1", "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_bic-app-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_bic-app-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.bicApp")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_bic-app-main__header" }, t("bicAppMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_bic-app-main__description" }, /* @__PURE__ */ React__default.createElement("p", null, t("bicAppMain.description")), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("bicAppMain.ulHeader"))), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item6")), /* @__PURE__ */ React__default.createElement("li", null, t("bicAppMain.item7"))), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("bicAppMain.stong1"))), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("bicAppMain.stong2"))), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("bicAppMain.stong3"))), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("bicAppMain.stong4")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_bic-app-main__links" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_bic-app-main__service-card",
      Icon: PlayMarketIcon,
      title: t("bicAppMain.cardTitle1"),
      description: "",
      link: "",
      onClick: () => handlePlayClick(
        t("bicAppMain.cardTitle1")
      )
    }
  ), /* @__PURE__ */ React__default.createElement("img", { src: iphoneBIC, alt: "Berlio Internet Client" }), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_bic-app-main__service-card",
      Icon: AppStoreIcon,
      title: t("bicAppMain.cardTitle2"),
      description: "",
      link: "",
      onClick: () => handleAppleClick(
        t("bicAppMain.cardTitle2")
      )
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_bic-app-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("bicAppMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("bicAppMain.upLink")
  )));
}
function BerlioInternetClientApp() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.bicApp")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(BerlioInternetClientAppMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
const AppImage = "/assets/images/berlioCardPay.jpg";
function BerlioCardPayMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_berlio-card-pay-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_berlio-card-pay-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.berlioCardPay")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_berlio-card-pay-main__header" }, t("berlioCardPayMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_berlio-card-pay-main__wrapper" }, /* @__PURE__ */ React__default.createElement("img", { src: AppImage, alt: "BerlioCardPayApp", className: "aam_berlio-card-pay-main__wrapper-image" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_berlio-card-pay-main__wrapper--description" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_berlio-card-pay-main__wrapper--description-title" }, t("berlioCardPayMain.description.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_berlio-card-pay-main__wrapper--description-sub-title" }, t("berlioCardPayMain.description.subTitle")), /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("p", { className: "aam_berlio-card-pay-main__wrapper--description-list-title" }, t("berlioCardPayMain.description.listTitle")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("berlioCardPayMain.description.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("berlioCardPayMain.description.item2"), " ", /* @__PURE__ */ React__default.createElement(Link, { to: "https://lkb.by", target: "_blank" }, "https://lkb.by"), ";"), /* @__PURE__ */ React__default.createElement("li", null, t("berlioCardPayMain.description.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("berlioCardPayMain.description.item4")))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_berlio-card-pay-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("berlioCardPayMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("berlioCardPayMain.upLink")
  )));
}
function BerlioCardPayApp() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.bcpApp")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(BerlioCardPayMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
const TunkImage = "/assets/images/smart-pay-app.jpg";
function SmartPayAppMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_smart-pay-app-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_smart-pay-app-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.smartPayApp")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_smart-pay-app-main__header" }, t("smartPayAppMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_smart-pay-app-main__wrapper" }, /* @__PURE__ */ React__default.createElement("img", { src: TunkImage, alt: "smartPayApp", className: "aam_smart-pay-app-main__wrapper-image" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_smart-pay-app-main__wrapper--description" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_smart-pay-app-main__wrapper--description-title" }, t("smartPayAppMain.description.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_smart-pay-app-main__wrapper--description-sub-title" }, t("smartPayAppMain.description.subTitle1")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_smart-pay-app-main__wrapper--description-sub-title" }, t("smartPayAppMain.description.subTitle2")), /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("p", { className: "aam_smart-pay-app-main__wrapper--description-list-title" }, t("smartPayAppMain.description.listTitle")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("smartPayAppMain.description.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("smartPayAppMain.description.item2")))), /* @__PURE__ */ React__default.createElement("p", { className: "aam_smart-pay-app-main__wrapper--description-sub-title" }, t("smartPayAppMain.description.ps")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_smart-pay-app-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("smartPayAppMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("smartPayAppMain.upLink")
  )));
}
function SmartPayApp() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.smartPayApp")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(SmartPayAppMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
const PersonalAccImage = "/assets/images/personal-acc-web-app.jpg";
function PersonalAccWebAppMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_personal-acc-web-app-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_personal-acc-web-app-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/equipment" }, t("breadCrumbs.equipment")), " ", "/", " ", t("breadCrumbs.personalAccWebApp")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_personal-acc-web-app-main__header" }, t("personalAccWebAppMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_personal-acc-web-app-main__wrapper" }, /* @__PURE__ */ React__default.createElement("img", { src: PersonalAccImage, alt: "personalAccWebApp", className: "aam_personal-acc-web-app-main__wrapper-image" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_personal-acc-web-app-main__wrapper--description" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_personal-acc-web-app-main__wrapper--description-title" }, t("personalAccWebAppMain.description.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_personal-acc-web-app-main__wrapper--description-sub-title" }, t("personalAccWebAppMain.description.subTitle"), " ", /* @__PURE__ */ React__default.createElement(Link, { to: "https://lkb.by" }, "https://lkb.by")), /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("strong", null, /* @__PURE__ */ React__default.createElement("p", { className: "aam_personal-acc-web-app-main__wrapper--description-list-title" }, t("personalAccWebAppMain.description.listTitle"))), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("personalAccWebAppMain.description.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("personalAccWebAppMain.description.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("personalAccWebAppMain.description.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("personalAccWebAppMain.description.item4")))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_personal-acc-web-app-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("personalAccWebAppMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("personalAccWebAppMain.upLink")
  )));
}
function PersonalAccWebApp() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.personalAccWebApp")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(PersonalAccWebAppMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
const BG1 = "/assets/images/info-card-bg1.jpg";
const BG2 = "/assets/images/info-card-bg2.jpg";
const BG3 = "/assets/images/info-card-bg3.jpg";
function ForPartnersMain() {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const BG_IMAGES = { BG1, BG2, BG3 };
    const ICONS = { LaptopIcon, DocumentIcon };
    const updatedCards = Object.values(cardDataJson.forPartners).map((card) => ({
      ...card,
      bgImage: BG_IMAGES[card["bg-image"]],
      IconComponent: ICONS[card.icon] || null
    }));
    setCards(updatedCards);
  }, []);
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-partners-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_about-block__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", t("breadCrumbs.forPartners")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_for-partners-main__title" }, t("forPartnersMain.title")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-partners-main__description" }, t("forPartnersMain.description")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-partners-main__cards" }, cards.map((cardData) => /* @__PURE__ */ React__default.createElement(
    InformationCard,
    {
      key: cardData.title,
      title: t(cardData.title),
      bgImage: cardData.bgImage,
      IconComponent: cardData.IconComponent,
      links: Array.isArray(cardData.links) ? cardData.links.map((link) => ({
        href: link.href.startsWith("http") ? link.href : `${baseUrl}${link.href}`,
        label: t(link.label),
        target: link.href.startsWith("http") ? "_blank" : "_self",
        rel: link.href.startsWith("http") ? "noopener noreferrer" : void 0
      })) : [],
      customClass: `clientsCard-${cardData.title.replace(/\s+/g, "-")}`,
      loading: "lazy"
    }
  ))));
}
function RecycleIcon({
  fillColor = "#48AE5A",
  width = 60,
  height = 60,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 60 60",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M9.99996 30.0625C9.99996 33.6042 10.8858 36.8958 12.6575 39.9375C14.4291 42.9792 16.835 45.4167 19.875 47.25C20.4583 47.625 20.865 48.1358 21.095 48.7825C21.325 49.4292 21.2725 50.0433 20.9375 50.625C20.6041 51.25 20.0941 51.6567 19.4075 51.845C18.7208 52.0333 18.0641 51.96 17.4375 51.625C13.5625 49.375 10.5208 46.3333 8.31246 42.5C6.10412 38.6667 4.99996 34.5208 4.99996 30.0625C4.99996 28.9792 5.07329 27.9167 5.21996 26.875C5.36662 25.8333 5.56412 24.7917 5.81246 23.75L4.99996 24.25C4.41662 24.625 3.79162 24.7192 3.12496 24.5325C2.45829 24.3458 1.95829 23.96 1.62496 23.375C1.29162 22.7917 1.21829 22.1558 1.40496 21.4675C1.59162 20.7792 1.97746 20.2692 2.56246 19.9375L10.125 15.5625C10.7083 15.2292 11.3441 15.1567 12.0325 15.345C12.7208 15.5333 13.2308 15.9183 13.5625 16.5L17.9375 24C18.2708 24.5833 18.3441 25.2192 18.1575 25.9075C17.9708 26.5958 17.585 27.1058 17 27.4375C16.4166 27.7708 15.7816 27.8442 15.095 27.6575C14.4083 27.4708 13.8975 27.085 13.5625 26.5L11.4375 22.8125C10.9791 23.9792 10.625 25.1667 10.375 26.375C10.125 27.5833 9.99996 28.8125 9.99996 30.0625ZM30 10C28.2916 10 26.6041 10.2192 24.9375 10.6575C23.2708 11.0958 21.6875 11.7308 20.1875 12.5625C19.5625 12.8958 18.9066 13.0108 18.22 12.9075C17.5333 12.8042 17.0225 12.46 16.6875 11.875C16.3125 11.2083 16.2291 10.5317 16.4375 9.845C16.6458 9.15833 17.0833 8.62667 17.75 8.25C19.625 7.16667 21.5941 6.35417 23.6575 5.8125C25.7208 5.27083 27.835 5 30 5C33.2916 5 36.4483 5.615 39.47 6.845C42.4916 8.075 45.1891 9.85583 47.5625 12.1875V11.25C47.5625 10.5417 47.8025 9.94833 48.2825 9.47C48.7625 8.99167 49.3558 8.75167 50.0625 8.75C50.7708 8.75 51.365 8.99 51.845 9.47C52.325 9.95 52.5641 10.5433 52.5625 11.25V20C52.5625 20.7083 52.3233 21.3025 51.845 21.7825C51.3666 22.2625 50.7725 22.5017 50.0625 22.5H41.3125C40.6041 22.5 40.0108 22.26 39.5325 21.78C39.0541 21.3 38.8141 20.7067 38.8125 20C38.8125 19.2917 39.0525 18.6983 39.5325 18.22C40.0125 17.7417 40.6058 17.5017 41.3125 17.5H45.625C43.7083 15.125 41.3958 13.2817 38.6875 11.97C35.9791 10.6583 33.0833 10.0017 30 10ZM45.125 43.1875C46.7083 41.3542 47.9166 39.3333 48.75 37.125C49.5833 34.9167 50 32.6042 50 30.1875C50 29.4792 50.24 28.8542 50.72 28.3125C51.2 27.7708 51.7933 27.5 52.5 27.5C53.2083 27.5 53.8025 27.7708 54.2825 28.3125C54.7625 28.8542 55.0016 29.4792 55 30.1875C55 32.8958 54.5725 35.51 53.7175 38.03C52.8625 40.55 51.6233 42.8942 50 45.0625C48.375 47.2292 46.4483 49.0833 44.22 50.625C41.9916 52.1667 39.5641 53.3125 36.9375 54.0625L37.5625 54.4375C38.1458 54.7708 38.5208 55.2817 38.6875 55.97C38.8541 56.6583 38.7708 57.2933 38.4375 57.875C38.1041 58.4583 37.6041 58.8333 36.9375 59C36.2708 59.1667 35.6458 59.0833 35.0625 58.75L27.4375 54.375C26.8541 54.0417 26.4691 53.5308 26.2825 52.8425C26.0958 52.1542 26.1683 51.5192 26.5 50.9375L30.875 43.375C31.2083 42.7917 31.7083 42.4167 32.375 42.25C33.0416 42.0833 33.6666 42.1667 34.25 42.5C34.8333 42.8333 35.2191 43.3442 35.4075 44.0325C35.5958 44.7208 35.5225 45.3558 35.1875 45.9375L32.875 49.875C35.25 49.5417 37.49 48.8017 39.595 47.655C41.7 46.5083 43.5433 45.0192 45.125 43.1875Z",
        fill: fillColor
      }
    )
  );
}
RecycleIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function BarcodeIcon({
  fillColor = "#48AE5A",
  width = 68,
  height = 68,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 68 68",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "M6.80005 19.55C6.80005 17.0702 7.78514 14.692 9.5386 12.9385C11.2921 11.1851 13.6703 10.2 16.15 10.2H18.7C19.3764 10.2 20.025 10.4687 20.5032 10.9469C20.9814 11.4251 21.25 12.0737 21.25 12.75C21.25 13.4263 20.9814 14.0749 20.5032 14.5531C20.025 15.0313 19.3764 15.3 18.7 15.3H16.15C13.804 15.3 11.9 17.204 11.9 19.55V22.1C11.9 22.7763 11.6314 23.4249 11.1532 23.9031C10.675 24.3813 10.0264 24.65 9.35005 24.65C8.67375 24.65 8.02514 24.3813 7.54693 23.9031C7.06871 23.4249 6.80005 22.7763 6.80005 22.1V19.55ZM46.75 12.75C46.75 12.0737 47.0187 11.4251 47.4969 10.9469C47.9751 10.4687 48.6237 10.2 49.3 10.2H51.8501C54.3298 10.2 56.708 11.1851 58.4615 12.9385C60.215 14.692 61.2001 17.0702 61.2001 19.55V22.1C61.2001 22.7763 60.9314 23.4249 60.4532 23.9031C59.975 24.3813 59.3264 24.65 58.6501 24.65C57.9737 24.65 57.3251 24.3813 56.8469 23.9031C56.3687 23.4249 56.1001 22.7763 56.1001 22.1V19.55C56.1001 17.204 54.196 15.3 51.8501 15.3H49.3C48.6237 15.3 47.9751 15.0313 47.4969 14.5531C47.0187 14.0749 46.75 13.4263 46.75 12.75ZM9.35005 43.35C10.0264 43.35 10.675 43.6187 11.1532 44.0969C11.6314 44.5751 11.9 45.2237 11.9 45.9V48.45C11.9 50.796 13.804 52.7 16.15 52.7H18.7C19.3764 52.7 20.025 52.9687 20.5032 53.4469C20.9814 53.9251 21.25 54.5737 21.25 55.25C21.25 55.9263 20.9814 56.5749 20.5032 57.0531C20.025 57.5313 19.3764 57.8 18.7 57.8H16.15C13.6703 57.8 11.2921 56.8149 9.5386 55.0614C7.78514 53.308 6.80005 50.9298 6.80005 48.45V45.9C6.80005 45.2237 7.06871 44.5751 7.54693 44.0969C8.02514 43.6187 8.67375 43.35 9.35005 43.35ZM58.6501 43.35C59.3264 43.35 59.975 43.6187 60.4532 44.0969C60.9314 44.5751 61.2001 45.2237 61.2001 45.9V48.45C61.2001 50.9298 60.215 53.308 58.4615 55.0614C56.708 56.8149 54.3298 57.8 51.8501 57.8H49.3C48.6237 57.8 47.9751 57.5313 47.4969 57.0531C47.0187 56.5749 46.75 55.9263 46.75 55.25C46.75 54.5737 47.0187 53.9251 47.4969 53.4469C47.9751 52.9687 48.6237 52.7 49.3 52.7H51.8501C54.196 52.7 56.1001 50.796 56.1001 48.45V45.9C56.1001 45.2237 56.3687 44.5751 56.8469 44.0969C57.3251 43.6187 57.9737 43.35 58.6501 43.35ZM18.7 20.4C19.3764 20.4 20.025 20.6687 20.5032 21.1469C20.9814 21.6251 21.25 22.2737 21.25 22.95V45.05C21.25 45.7263 20.9814 46.3749 20.5032 46.8531C20.025 47.3313 19.3764 47.6 18.7 47.6C18.0237 47.6 17.3751 47.3313 16.8969 46.8531C16.4187 46.3749 16.15 45.7263 16.15 45.05V22.95C16.15 22.2737 16.4187 21.6251 16.8969 21.1469C17.3751 20.6687 18.0237 20.4 18.7 20.4ZM31.4501 22.95C31.4501 22.2737 31.1814 21.6251 30.7032 21.1469C30.225 20.6687 29.5764 20.4 28.9 20.4C28.2237 20.4 27.5751 20.6687 27.0969 21.1469C26.6187 21.6251 26.35 22.2737 26.35 22.95V45.05C26.35 45.7263 26.6187 46.3749 27.0969 46.8531C27.5751 47.3313 28.2237 47.6 28.9 47.6C29.5764 47.6 30.225 47.3313 30.7032 46.8531C31.1814 46.3749 31.4501 45.7263 31.4501 45.05V22.95ZM39.1 20.4C39.7764 20.4 40.425 20.6687 40.9032 21.1469C41.3814 21.6251 41.6501 22.2737 41.6501 22.95V45.05C41.6501 45.7263 41.3814 46.3749 40.9032 46.8531C40.425 47.3313 39.7764 47.6 39.1 47.6C38.4237 47.6 37.7751 47.3313 37.2969 46.8531C36.8187 46.3749 36.55 45.7263 36.55 45.05V22.95C36.55 22.2737 36.8187 21.6251 37.2969 21.1469C37.7751 20.6687 38.4237 20.4 39.1 20.4ZM51.8501 22.95C51.8501 22.2737 51.5814 21.6251 51.1032 21.1469C50.625 20.6687 49.9764 20.4 49.3 20.4C48.6237 20.4 47.9751 20.6687 47.4969 21.1469C47.0187 21.6251 46.75 22.2737 46.75 22.95V45.05C46.75 45.7263 47.0187 46.3749 47.4969 46.8531C47.9751 47.3313 48.6237 47.6 49.3 47.6C49.9764 47.6 50.625 47.3313 51.1032 46.8531C51.5814 46.3749 51.8501 45.7263 51.8501 45.05V22.95Z",
        fill: fillColor
      }
    )
  );
}
BarcodeIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function PartnersAdvantagesSection() {
  const { t } = useTranslation();
  const CSSSelectorPrefix = "aam_partners-advantages-section";
  return /* @__PURE__ */ React__default.createElement("section", { className: `${CSSSelectorPrefix}` }, /* @__PURE__ */ React__default.createElement("h2", { className: `${CSSSelectorPrefix}__title` }, t("partnersAdvantages.name")), /* @__PURE__ */ React__default.createElement("div", { className: `${CSSSelectorPrefix}__cards-box` }, /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix,
      Icon: RecycleIcon,
      title: t("partnersAdvantages.documentsCycle"),
      description: t("partnersAdvantages.documentsCycleTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix,
      Icon: BarcodeIcon,
      title: t("partnersAdvantages.billPrint"),
      description: t("partnersAdvantages.billPrintTagline")
    }
  ), /* @__PURE__ */ React__default.createElement(
    CardBox,
    {
      CSSSelectorPrefix,
      Icon: LocationIcon,
      title: t("partnersAdvantages.location"),
      description: t("partnersAdvantages.locationTagline")
    }
  )));
}
function ForPartners() {
  const { t } = useTranslation();
  process.env.NODE_ENV === "production";
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.forPartners")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание производимого оборудования и выпускаемого программного обеспечения, предоставляемого партнерам" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Для партнеров, Оборудование, Программное обеспечение" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ForPartnersMain, null), /* @__PURE__ */ React__default.createElement(PartnersAdvantagesSection, null), /* @__PURE__ */ React__default.createElement(FAQSection, { category: "partnersFAQ" }), /* @__PURE__ */ React__default.createElement(
    LogoSection,
    {
      title: t("ourPartnersLogoSection.name"),
      logos: partnersLogos.logos,
      logoBasePath: "/assets/images/"
    }
  ), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function VoiceReferenceServiceMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_voice-reference-service-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_voice-reference-service-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/partners" }, t("breadCrumbs.forPartners")), " ", "/", " ", t("breadCrumbs.voiceRefService")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_voice-reference-service-main__header" }, t("voiceRefServiceMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_voice-reference-service-main__content" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__description", style: { whiteSpace: "pre-line" } }, t("voiceRefServiceMain.descr1")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__italic-description" }, t("voiceRefServiceMain.descr2")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__description" }, t("voiceRefServiceMain.descr3")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__description" }, t("voiceRefServiceMain.descr4")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__description" }, t("voiceRefServiceMain.descr5")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_voice-reference-service-main__description" }, t("voiceRefServiceMain.descr6"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_voice-reference-service-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("voiceRefServiceMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("voiceRefServiceMain.upLink")
  )));
}
function VoiceReferenceService() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.voiceRefService")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(VoiceReferenceServiceMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function LoyaltyProgramMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_loyalty-program-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/partners" }, t("breadCrumbs.forPartners")), " ", "/", " ", t("breadCrumbs.loyaltyProgram")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_loyalty-program-main__header" }, t("loyaltyProgramMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__content" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr1")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, /* @__PURE__ */ React__default.createElement("strong", null, t("loyaltyProgramMain.descrHeader2")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr2.item6")))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, /* @__PURE__ */ React__default.createElement("strong", null, t("loyaltyProgramMain.descrHeader3")), /* @__PURE__ */ React__default.createElement("span", null, t("loyaltyProgramMain.descr3"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr4")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr5")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr6")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr7")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, t("loyaltyProgramMain.descr8")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__description" }, /* @__PURE__ */ React__default.createElement("strong", null, t("loyaltyProgramMain.descrHeader9")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item3")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item4")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item5")), /* @__PURE__ */ React__default.createElement("li", null, t("loyaltyProgramMain.descr9.item6"))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_loyalty-program-main__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("loyaltyProgramMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("loyaltyProgramMain.upLink")
  )));
}
function LoyaltyProgram() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.loyaltyProgram")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(LoyaltyProgramMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function ForBankInformationMain() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_for-bank-info-main" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-main__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", /* @__PURE__ */ React__default.createElement(Link, { to: "/partners" }, t("breadCrumbs.forPartners")), " ", "/", " ", t("breadCrumbs.forBankInfo")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_for-bank-info-main__header" }, t("forBankInfoMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-main__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      CSSSelectorPrefix: "aam_for-bank-info-main",
      Icon: OilIcon,
      title: t("forBankInfoMain.system"),
      description: t("forBankInfoMain.systemTagline"),
      link: "/partners/cardUsageRules"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      CSSSelectorPrefix: "aam_for-bank-info-main",
      Icon: PaymentCardIcon,
      title: t("forBankInfoMain.usage"),
      description: t("forBankInfoMain.usageTagline"),
      link: "/partners/plasticCardUsageRules"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      CSSSelectorPrefix: "aam_for-bank-info-main",
      Icon: MapIcon,
      title: t("forBankInfoMain.nonResident"),
      description: t("forBankInfoMain.nonResidentTagline"),
      link: "/partners/forNotAResidentsServices"
    }
  )), /* @__PURE__ */ React__default.createElement("footer", { className: "aam_for-bank-info-main__footer" }, /* @__PURE__ */ React__default.createElement(LinkTo, { href: "/about", text: t("forBankInfoMain.readMore") })));
}
function ForBankInformationContactSection() {
  const { t } = useTranslation();
  const { selectedItem } = useContext(SelectedItemContext);
  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = selectedItem || defaultItem;
  if (!displayedItem) {
    return null;
  }
  const {
    departmentsName,
    footerShortAddress,
    phoneNumber,
    email,
    departmentsImage
  } = displayedItem;
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_for-bank-info-contact-section" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__address" }, /* @__PURE__ */ React__default.createElement("h4", { className: "aam_for-bank-info-contact-section__contact-name" }, t(departmentsName)), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__contact-address" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__section" }, /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, t("forBankInfoContact.address"), ":"), " ", t(footerShortAddress))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__section" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-bank-info-contact-section__phone" }, /* @__PURE__ */ React__default.createElement("strong", null, t("forBankInfoContact.phone"), ":"), " ", phoneNumber[0])), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__section" }, /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-bank-info-contact-section__email" }, /* @__PURE__ */ React__default.createElement("strong", null, t("forBankInfoContact.forOrganizations"), ":"), " ", email[0]), /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-bank-info-contact-section__email" }, /* @__PURE__ */ React__default.createElement("strong", null, t("forBankInfoContact.forClientInquiries"), ":"), " ", email[1]))), /* @__PURE__ */ React__default.createElement(LinkTo, { href: "/contacts", text: t("forBankInfoContact.readMore") })), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-contact-section__image" }, /* @__PURE__ */ React__default.createElement("img", { src: `${departmentsImage}`, alt: departmentsName, title: departmentsName })));
}
function MoneyWithdrawIcon({
  fillColor = "#48AE5A",
  width = 76,
  height = 76,
  className = ""
}) {
  return /* @__PURE__ */ React__default.createElement(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 76 76",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React__default.createElement("rect", { width: "66", height: "66", fill: "#F5F5F5" }),
    /* @__PURE__ */ React__default.createElement("path", { d: "m-526-1833c0-1.1 0.895-2 2-2h6058c1.1 0 2 0.9 2 2v3681c0 1.1-0.9 2-2 2h-6058c-1.105 0-2-0.9-2-2v-3681z", fill: "#fff" }),
    /* @__PURE__ */ React__default.createElement("path", { d: "m-524-1834h6058v-2h-6058v2zm6059 1v3681h2v-3681h-2zm-1 3682h-6058v2h6058v-2zm-6059-1v-3681h-2v3681h2zm1 1c-0.552 0-1-0.45-1-1h-2c0 1.66 1.343 3 3 3v-2zm6059-1c0 0.55-0.45 1-1 1v2c1.66 0 3-1.34 3-3h-2zm-1-3682c0.55 0 1 0.45 1 1h2c0-1.66-1.34-3-3-3v2zm-6058-2c-1.657 0-3 1.34-3 3h2c0-0.55 0.448-1 1-1v-2z", fill: "#000", fillOpacity: ".1" }),
    /* @__PURE__ */ React__default.createElement("rect", { transform: "translate(-211 -209)", width: "1280", height: "666", fill: "#fff" }),
    /* @__PURE__ */ React__default.createElement(
      "path",
      {
        d: "m34 34c-1.6812 0-3.3246 0.4985-4.7224 1.4325s-2.4873 2.2615-3.1306 3.8147-0.8117 3.2623-0.4837 4.9111 1.1375 3.1634 2.3263 4.3521c1.1887 1.1888 2.7033 1.9983 4.3521 2.3263s3.3579 0.1597 4.9111-0.4837c1.5532-0.6433 2.8807-1.7328 3.8147-3.1306s1.4325-3.0412 1.4325-4.7224c0-2.2543-0.8956-4.4163-2.4896-6.0104-1.5941-1.594-3.7561-2.4896-6.0104-2.4896zm0 11.333c-0.5604 0-1.1082-0.1662-1.5741-0.4775-0.466-0.3114-0.8291-0.7539-1.0436-1.2716-0.2144-0.5177-0.2705-1.0874-0.1612-1.637s0.3792-1.0545 0.7754-1.4507c0.3963-0.3963 0.9011-0.6661 1.4507-0.7755 0.5496-0.1093 1.1193-0.0532 1.6371 0.1613 0.5177 0.2144 0.9602 0.5776 1.2715 1.0435 0.3113 0.466 0.4775 1.0137 0.4775 1.5741 0 0.7515-0.2985 1.4721-0.8299 2.0035-0.5313 0.5313-1.252 0.8299-2.0034 0.8299zm-2.0117-17.822c0.2695 0.2579 0.5872 0.4601 0.935 0.595 0.3392 0.1499 0.7059 0.2273 1.0767 0.2273s0.7375-0.0774 1.0766-0.2273c0.3478-0.1349 0.6656-0.3371 0.935-0.595l6.4884-6.375c0.5485-0.5486 0.8567-1.2926 0.8567-2.0683 0-0.7758-0.3082-1.5198-0.8567-2.0684-0.5486-0.5485-1.2926-0.8567-2.0684-0.8567-0.7757 0-1.5197 0.3082-2.0683 0.8567l-1.53 1.6717v-10.172c0-0.75145-0.2985-1.4721-0.8299-2.0035-0.5313-0.53136-1.252-0.82987-2.0034-0.82987-0.7515 0-1.4721 0.29851-2.0035 0.82987-0.5313 0.53135-0.8299 1.252-0.8299 2.0035v10.172l-1.53-1.6717c-0.5485-0.5485-1.2925-0.8567-2.0683-0.8567s-1.5198 0.3082-2.0683 0.8567c-0.5486 0.5486-0.8568 1.2926-0.8568 2.0684 0 0.7757 0.3082 1.5197 0.8568 2.0683l6.4883 6.375zm21.845 14.988c0-0.5604-0.1662-1.1081-0.4775-1.5741-0.3113-0.4659-0.7538-0.8291-1.2715-1.0435-0.5178-0.2145-1.0875-0.2706-1.6371-0.1613-0.5496 0.1094-1.0544 0.3792-1.4507 0.7755-0.3962 0.3962-0.6661 0.9011-0.7754 1.4507s-0.0532 1.1193 0.1612 1.637c0.2145 0.5177 0.5776 0.9602 1.0436 1.2716 0.4659 0.3113 1.0137 0.4775 1.5741 0.4775 0.7514 0 1.4721-0.2986 2.0035-0.8299 0.5313-0.5314 0.8298-1.252 0.8298-2.0035zm2.8333-19.833h-8.5c-0.7514 0-1.4721 0.2985-2.0034 0.8299-0.5314 0.5313-0.8299 1.252-0.8299 2.0034 0 0.7515 0.2985 1.4721 0.8299 2.0035 0.5313 0.5313 1.252 0.8299 2.0034 0.8299h8.5c0.7515 0 1.4722 0.2985 2.0035 0.8298 0.5314 0.5314 0.8299 1.252 0.8299 2.0035v22.667c0 0.7514-0.2985 1.4721-0.8299 2.0034-0.5313 0.5314-1.252 0.8299-2.0035 0.8299h-45.333c-0.7514 0-1.4721-0.2985-2.0035-0.8299-0.53135-0.5313-0.82986-1.252-0.82986-2.0034v-22.667c0-0.7515 0.29851-1.4721 0.82986-2.0035 0.53135-0.5313 1.2521-0.8298 2.0035-0.8298h8.5c0.7515 0 1.4721-0.2986 2.0035-0.8299 0.5313-0.5314 0.8298-1.252 0.8298-2.0035 0-0.7514-0.2985-1.4721-0.8298-2.0034-0.5314-0.5314-1.252-0.8299-2.0035-0.8299h-8.5c-2.2543 0-4.4163 0.8955-6.0104 2.4896-1.5941 1.594-2.4896 3.7561-2.4896 6.0104v22.667c0 2.2543 0.89553 4.4163 2.4896 6.0104 1.5941 1.594 3.7561 2.4896 6.0104 2.4896h45.333c2.2544 0 4.4164-0.8956 6.0105-2.4896 1.594-1.5941 2.4896-3.7561 2.4896-6.0104v-22.667c0-2.2543-0.8956-4.4164-2.4896-6.0104-1.5941-1.5941-3.7561-2.4896-6.0105-2.4896zm-42.5 19.833c0 0.5604 0.1662 1.1082 0.4775 1.5741 0.3114 0.466 0.7539 0.8291 1.2716 1.0436 0.5177 0.2144 1.0874 0.2705 1.637 0.1612s1.0545-0.3792 1.4507-0.7754c0.3963-0.3963 0.6661-0.9011 0.7755-1.4507 0.1093-0.5496 0.0532-1.1193-0.1613-1.637-0.2144-0.5178-0.5776-0.9603-1.0435-1.2716s-1.0137-0.4775-1.5741-0.4775c-0.7515 0-1.4721 0.2985-2.0035 0.8299-0.5313 0.5313-0.8299 1.252-0.8299 2.0034z",
        fill: fillColor
      }
    )
  );
}
MoneyWithdrawIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};
function ForBankInformationDocumentsSection() {
  const { t } = useTranslation();
  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? process.env.PUBLIC_URL || "" : "";
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_for-bank-info-doc-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_for-bank-info-doc-section__header" }, t("forBankInfoDoc.name")), /* @__PURE__ */ React__default.createElement("p", { className: "aam_for-bank-info-doc-section__description" }, t("forBankInfoDoc.description")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-doc-section__card-boxes" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: MoneyWithdrawIcon,
      title: t("forBankInfoDoc.headline"),
      description: "",
      link: "/clients/eMoneyRegulations"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_for-bank-info-doc-section__service-card",
      Icon: PdfIcon,
      title: t("forBankInfoDoc.cardTitle1"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handleLinkClick(
        t("forBankInfoDoc.cardTitle1"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      className: "aam_for-bank-info-doc-section__service-card",
      Icon: PdfIcon,
      title: t("forBankInfoDoc.cardTitle2"),
      description: "",
      link: `${baseUrl}/assets/documents/1.pdf`,
      onClick: () => handleLinkClick(
        t("forBankInfoDoc.cardTitle2"),
        `${baseUrl}/assets/documents/1.pdf`
      )
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: "aam_for-bank-info-doc-section__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("forBankInfoDoc.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("forBankInfoDoc.upLink")
  )));
}
function ForBankInfo() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.forBankInfo")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Новости" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ForBankInformationMain, null), /* @__PURE__ */ React__default.createElement(ForBankInformationContactSection, null), /* @__PURE__ */ React__default.createElement(ForBankInformationDocumentsSection, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
function ForNotAResidentsServicesMain() {
  return /* @__PURE__ */ React__default.createElement(
    "h1",
    {
      style: {
        color: "red",
        width: "400px",
        textAlign: "center",
        margin: "50px auto"
      }
    },
    "Секция с описанием обслуживания не резидентов РБ"
  );
}
function ForNotAResidentsServices() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.forNotAResidentsServices")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Контакты" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(ForNotAResidentsServicesMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
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
  const { t, i18n: i18n2 } = useTranslation();
  const currentLanguage = i18n2.language;
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
  const [descriptions2, setDescriptions] = useState({ ru: "", en: "" });
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
      descriptions: descriptions2
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
      value: descriptions2[lang],
      onChange: (value) => handleDescriptionChange(lang, value),
      placeholder: `Описание (${lang})`
    }
  ))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_modal__actions" }, /* @__PURE__ */ React__default.createElement(Button, { type: "submit", variant: "green", label: loading ? "Создание..." : "Создать", onClick: handleCreate, disabled: loading }), /* @__PURE__ */ React__default.createElement(Button, { type: "reset", variant: "green", label: "Отмена", onClick: onClose }))));
}
function EditNewsModal({ news: news2, onClose, onUpdated }) {
  const [slug, setSlug] = useState(news2.slug);
  const [priority, setPriority] = useState(news2.priority);
  const [date, setDate] = useState(news2.dates?.date || "");
  const [startDate, setStartDate] = useState(news2.dates?.startDate || "");
  const [expireDate, setExpireDate] = useState(news2.dates?.expireDate || "");
  const [titles, setTitles] = useState(news2.titles || { ru: "", en: "" });
  const [descriptions2, setDescriptions] = useState(news2.descriptions || { ru: "", en: "" });
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
      descriptions: descriptions2
    };
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`/api/admin/news/${news2.id}`, {
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
      value: descriptions2[lang],
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
  const [news2, setNews] = useState({});
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
  const newsArray = Object.entries(news2);
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-manager" }, /* @__PURE__ */ React__default.createElement("h2", null, "Управление новостями"), /* @__PURE__ */ React__default.createElement("button", { className: "aam-news-btn aam-news-btn--add", onClick: () => setShowCreateModal(true) }, "➕ Новая новость"), newsArray.length === 0 ? /* @__PURE__ */ React__default.createElement("p", null, "Новостей пока нет.") : /* @__PURE__ */ React__default.createElement("table", { className: "aam_news-manager__table" }, /* @__PURE__ */ React__default.createElement("thead", null, /* @__PURE__ */ React__default.createElement("tr", null, /* @__PURE__ */ React__default.createElement("th", null, "ID"), /* @__PURE__ */ React__default.createElement("th", null, "Slug"), /* @__PURE__ */ React__default.createElement("th", null, "Priority"), /* @__PURE__ */ React__default.createElement("th", null, "Дата"), /* @__PURE__ */ React__default.createElement("th", null, "Заголовок (RU)"), /* @__PURE__ */ React__default.createElement("th", null, "Действия"))), /* @__PURE__ */ React__default.createElement("tbody", null, newsArray.map(([id, item]) => /* @__PURE__ */ React__default.createElement("tr", { key: id }, /* @__PURE__ */ React__default.createElement("td", null, id), /* @__PURE__ */ React__default.createElement("td", null, item.slug), /* @__PURE__ */ React__default.createElement("td", null, item.priority), /* @__PURE__ */ React__default.createElement("td", null, item.dates.date ? new Date(item.dates.date).toLocaleDateString("ru-RU") : "-"), /* @__PURE__ */ React__default.createElement("td", null, item.titles.ru || "-"), /* @__PURE__ */ React__default.createElement("td", null, /* @__PURE__ */ React__default.createElement("button", { className: "aam-news-btn aam-news-btn--edit", onClick: () => setEditNews({ id, ...item }) }, "✏️"), /* @__PURE__ */ React__default.createElement("button", { className: "aam-news-btn aam-news-btn--delete", onClick: () => setNewsToDelete(id) }, "🗑️")))))), showCreateModal && /* @__PURE__ */ React__default.createElement(CreateNewsModal, { onClose: () => setShowCreateModal(false), onCreated: fetchNews }), editNews && /* @__PURE__ */ React__default.createElement(EditNewsModal, { news: editNews, onClose: () => setEditNews(null), onUpdated: fetchNews }), newsToDelete && /* @__PURE__ */ React__default.createElement(
    ConfirmDeleteNewsModal,
    {
      username: news2[newsToDelete]?.titles.ru || `Новость #${newsToDelete}`,
      onConfirm: handleConfirmDelete,
      onCancel: () => setNewsToDelete(null)
    }
  ));
}
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
const PrivacyMenu = ({ items }) => {
  return /* @__PURE__ */ React__default.createElement("nav", { className: "aam_privacy-menu" }, /* @__PURE__ */ React__default.createElement("ul", { className: "aam_privacy-menu__list" }, items.map(({ label, to }) => /* @__PURE__ */ React__default.createElement("li", { key: to, className: "aam_privacy-menu__item" }, /* @__PURE__ */ React__default.createElement(
    NavLink,
    {
      to,
      end: true,
      className: ({ isActive }) => `aam_privacy-menu__link${isActive ? " aam_privacy-menu__link--active" : ""}`
    },
    label
  )))));
};
PrivacyMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired
    })
  ).isRequired
};
const PrivacyMain = () => {
  const { t } = useTranslation();
  const menuItems = [
    { label: t("privacyMain.cookieConsentPolicy"), to: "/privacy/cookie-consent-policy" },
    { label: t("privacyMain.buyersPrivacy"), to: "/privacy/buyers-policy" },
    { label: t("privacyMain.b2bPrivacy"), to: "/privacy/b2b-policy" },
    { label: t("privacyMain.applicantsPrivacy"), to: "/privacy/applicants-policy" }
  ];
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_privacy" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy__breadcrumbs" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/" }, t("breadCrumbs.home")), " ", "/", " ", t("breadCrumbs.privacy")), /* @__PURE__ */ React__default.createElement("h1", { className: "aam_privacy__header" }, t("privacyMain.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy__wrapper" }, /* @__PURE__ */ React__default.createElement("aside", { className: "aam_privacy__wrapper-tools" }, /* @__PURE__ */ React__default.createElement(PrivacyMenu, { items: menuItems })), /* @__PURE__ */ React__default.createElement("section", { className: "aam_privacy__wrapper-outlet" }, /* @__PURE__ */ React__default.createElement(Outlet, null))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy__site-nav" }, /* @__PURE__ */ React__default.createElement(Link, { to: "/", className: "home-link" }, /* @__PURE__ */ React__default.createElement(LeftArrowIcon, { className: "icon" }), t("privacyMain.homeLink")), /* @__PURE__ */ React__default.createElement(
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
    t("privacyMain.upLink")
  )));
};
function Privacy() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.privacy")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание политик обработки персональных данных компанией Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Конфиденциальность, Обработка персональных данных" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(PrivacyMain, null), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
const cookiePrivacy = [{ "paragraphTitle": "privacyMain.cookieDataTitles.num1", "content": ["privacyMain.cookieDataContent.num1.item1", "privacyMain.cookieDataContent.num1.item2", "privacyMain.cookieDataContent.num1.item3", "privacyMain.cookieDataContent.num1.item4", "privacyMain.cookieDataContent.num1.item5", "privacyMain.cookieDataContent.num1.item6", "privacyMain.cookieDataContent.num1.item7", "privacyMain.cookieDataContent.num1.item8", "privacyMain.cookieDataContent.num1.item9", "privacyMain.cookieDataContent.num1.item10", "privacyMain.cookieDataContent.num1.item11", "privacyMain.cookieDataContent.num1.item12", "privacyMain.cookieDataContent.num1.item13", "privacyMain.cookieDataContent.num1.item14"] }, { "paragraphTitle": "privacyMain.cookieDataTitles.num2", "content": ["privacyMain.cookieDataContent.num2.item1", "privacyMain.cookieDataContent.num2.item2", "privacyMain.cookieDataContent.num2.item3", "privacyMain.cookieDataContent.num2.item4", "privacyMain.cookieDataContent.num2.item5", "privacyMain.cookieDataContent.num2.item6", "- privacyMain.cookieDataContent.num2.item7\n- privacyMain.cookieDataContent.num2.item8\n- privacyMain.cookieDataContent.num2.item9\n- privacyMain.cookieDataContent.num2.item10", "privacyMain.cookieDataContent.num2.item11"] }, { "paragraphTitle": "privacyMain.cookieDataTitles.num3", "content": ["privacyMain.cookieDataContent.num3.item1", "- privacyMain.cookieDataContent.num3.item2\n- privacyMain.cookieDataContent.num3.item3\n- privacyMain.cookieDataContent.num3.item4\n- privacyMain.cookieDataContent.num3.item5", "privacyMain.cookieDataContent.num3.item6", "- privacyMain.cookieDataContent.num3.item7\n- privacyMain.cookieDataContent.num3.item8", "privacyMain.cookieDataContent.num3.item9", "- privacyMain.cookieDataContent.num3.item10\n- privacyMain.cookieDataContent.num3.item11"] }, { "paragraphTitle": "privacyMain.cookieDataTitles.num4", "content": ["privacyMain.cookieDataContent.num4.item1", "privacyMain.cookieDataContent.num4.item2", "privacyMain.cookieDataContent.num4.item3", "privacyMain.cookieDataContent.num4.item4", "privacyMain.cookieDataContent.num4.item5", "privacyMain.cookieDataContent.num4.item6", "privacyMain.cookieDataContent.num4.item7"] }, { "paragraphTitle": "privacyMain.cookieDataTitles.num5", "content": ["privacyMain.cookieDataContent.num5.item1", "- privacyMain.cookieDataContent.num5.item2\n- privacyMain.cookieDataContent.num5.item3", "privacyMain.cookieDataContent.num5.item4", "privacyMain.cookieDataContent.num5.item5", "privacyMain.cookieDataContent.num5.item6", "privacyMain.cookieDataContent.num5.item7", "privacyMain.cookieDataContent.num5.item8", "privacyMain.cookieDataContent.num5.item9", "privacyMain.cookieDataContent.num5.item10", "privacyMain.cookieDataContent.num5.item11"] }, { "paragraphTitle": "privacyMain.cookieDataTitles.num6", "content": ["privacyMain.cookieDataContent.num6.item1", "privacyMain.cookieDataContent.num6.item2", "privacyMain.cookieDataContent.num6.item3", "- privacyMain.cookieDataContent.num6.item4\n- privacyMain.cookieDataContent.num6.item5\n- privacyMain.cookieDataContent.num6.item6\n- privacyMain.cookieDataContent.num6.item7\n- privacyMain.cookieDataContent.num6.item8\n- privacyMain.cookieDataContent.num6.item9", "privacyMain.cookieDataContent.num6.item10", "privacyMain.cookieDataContent.num6.item11", "privacyMain.cookieDataContent.num6.item12", "privacyMain.cookieDataContent.num6.item13"] }];
const buyersPrivacy = [{ "paragraphTitle": "privacyMain.buyersDataTitles.num1", "content": ["privacyMain.buyersDataContent.num1.item1", "privacyMain.buyersDataContent.num1.item2", "privacyMain.buyersDataContent.num1.item3", "privacyMain.buyersDataContent.num1.item4", "- privacyMain.buyersDataContent.num1.item5\n- privacyMain.buyersDataContent.num1.item6\n- privacyMain.buyersDataContent.num1.item7\n- privacyMain.buyersDataContent.num1.item8\n- privacyMain.buyersDataContent.num1.item9", "privacyMain.buyersDataContent.num1.item10", "privacyMain.buyersDataContent.num1.item11", "- privacyMain.buyersDataContent.num1.item12\n- privacyMain.buyersDataContent.num1.item13\n- privacyMain.buyersDataContent.num1.item14\n- privacyMain.buyersDataContent.num1.item15\n  1. privacyMain.buyersDataContent.num1.item16\n  2. privacyMain.buyersDataContent.num1.item17\n  3. privacyMain.buyersDataContent.num1.item18", "privacyMain.buyersDataContent.num1.item19", "privacyMain.buyersDataContent.num1.item20", "privacyMain.buyersDataContent.num1.item21", "privacyMain.buyersDataContent.num1.item22"] }, { "paragraphTitle": "privacyMain.buyersDataTitles.num2", "content": ["privacyMain.buyersDataContent.num2.item1", "privacyMain.buyersDataContent.num2.item2"] }, { "paragraphTitle": "privacyMain.buyersDataTitles.num3", "content": ["privacyMain.buyersDataContent.num3.item1", "- privacyMain.buyersDataContent.num3.item2\n- privacyMain.buyersDataContent.num3.item3\n- privacyMain.buyersDataContent.num3.item4", "privacyMain.buyersDataContent.num3.item5", "- privacyMain.buyersDataContent.num3.item6\n- privacyMain.buyersDataContent.num3.item7", "privacyMain.buyersDataContent.num3.item8", "privacyMain.buyersDataContent.num3.item9", "privacyMain.buyersDataContent.num3.item10", "privacyMain.buyersDataContent.num3.item11", "- privacyMain.buyersDataContent.num3.item12\n- privacyMain.buyersDataContent.num3.item13\n- privacyMain.buyersDataContent.num3.item14", "privacyMain.buyersDataContent.num3.item15", "- privacyMain.buyersDataContent.num3.item16\n- privacyMain.buyersDataContent.num3.item17\n- privacyMain.buyersDataContent.num3.item18\n- privacyMain.buyersDataContent.num3.item19\n- privacyMain.buyersDataContent.num3.item20\n- privacyMain.buyersDataContent.num3.item21\n- privacyMain.buyersDataContent.num3.item22\n- privacyMain.buyersDataContent.num3.item23\n- privacyMain.buyersDataContent.num3.item24\n- privacyMain.buyersDataContent.num3.item25", "privacyMain.buyersDataContent.num3.item26", "- privacyMain.buyersDataContent.num3.item27\n- privacyMain.buyersDataContent.num3.item28\n- privacyMain.buyersDataContent.num3.item29\n- privacyMain.buyersDataContent.num3.item30\n- privacyMain.buyersDataContent.num3.item31", "privacyMain.buyersDataContent.num3.item32", "privacyMain.buyersDataContent.num3.item33", "privacyMain.buyersDataContent.num3.item34", "privacyMain.buyersDataContent.num3.item35", "privacyMain.buyersDataContent.num3.item36", "- privacyMain.buyersDataContent.num3.item37\n- privacyMain.buyersDataContent.num3.item38\n- privacyMain.buyersDataContent.num3.item39\n- privacyMain.buyersDataContent.num3.item40", "privacyMain.buyersDataContent.num3.item41", "- privacyMain.buyersDataContent.num3.item42\n- privacyMain.buyersDataContent.num3.item43\n- privacyMain.buyersDataContent.num3.item44\n- privacyMain.buyersDataContent.num3.item45\n- privacyMain.buyersDataContent.num3.item46", "privacyMain.buyersDataContent.num3.item47", "privacyMain.buyersDataContent.num3.item48", "- privacyMain.buyersDataContent.num3.item49\n- privacyMain.buyersDataContent.num3.item50\n- privacyMain.buyersDataContent.num3.item51\n- privacyMain.buyersDataContent.num3.item52\n- privacyMain.buyersDataContent.num3.item53\n- privacyMain.buyersDataContent.num3.item54", "privacyMain.buyersDataContent.num3.item55", "- privacyMain.buyersDataContent.num3.item56\n- privacyMain.buyersDataContent.num3.item57\n- privacyMain.buyersDataContent.num3.item58", "privacyMain.buyersDataContent.num3.item59"] }, { "paragraphTitle": "privacyMain.buyersDataTitles.num4", "content": ["privacyMain.buyersDataContent.num4.item1", "privacyMain.buyersDataContent.num4.item2", "privacyMain.buyersDataContent.num4.item3", "privacyMain.buyersDataContent.num4.item4", "privacyMain.buyersDataContent.num4.item5", "privacyMain.buyersDataContent.num4.item6", "privacyMain.buyersDataContent.num4.item7", "- **privacyMain.buyersDataContent.num4.item8** privacyMain.buyersDataContent.num4.item9\n- **privacyMain.buyersDataContent.num4.item10** privacyMain.buyersDataContent.num4.item11\n- **privacyMain.buyersDataContent.num4.item12** privacyMain.buyersDataContent.num4.item13\n- **privacyMain.buyersDataContent.num4.item14** privacyMain.buyersDataContent.num4.item15\n- **privacyMain.buyersDataContent.num4.item16** privacyMain.buyersDataContent.num4.item17\n- **privacyMain.buyersDataContent.num4.item18** privacyMain.buyersDataContent.num4.item19", "privacyMain.buyersDataContent.num4.item20", "privacyMain.buyersDataContent.num4.item21", "- **privacyMain.buyersDataContent.num4.item22** privacyMain.buyersDataContent.num4.item23\n- **privacyMain.buyersDataContent.num4.item24** privacyMain.buyersDataContent.num4.item25\n- **privacyMain.buyersDataContent.num4.item26** privacyMain.buyersDataContent.num4.item27\n- **privacyMain.buyersDataContent.num4.item28** privacyMain.buyersDataContent.num4.item29\n- **privacyMain.buyersDataContent.num4.item30** privacyMain.buyersDataContent.num4.item31\n- **privacyMain.buyersDataContent.num4.item32** privacyMain.buyersDataContent.num4.item33", "privacyMain.buyersDataContent.num4.item34", "privacyMain.buyersDataContent.num4.item35", "privacyMain.buyersDataContent.num4.item36", "privacyMain.buyersDataContent.num4.item37", "privacyMain.buyersDataContent.num4.item38", "privacyMain.buyersDataContent.num4.item39"] }, { "paragraphTitle": "privacyMain.buyersDataTitles.num5", "content": ["privacyMain.buyersDataContent.num5.item1", "- privacyMain.buyersDataContent.num5.item2\n- privacyMain.buyersDataContent.num5.item3\n- privacyMain.buyersDataContent.num5.item4\n- privacyMain.buyersDataContent.num5.item5\n- privacyMain.buyersDataContent.num5.item6\n- privacyMain.buyersDataContent.num5.item7\n- privacyMain.buyersDataContent.num5.item8\n- privacyMain.buyersDataContent.num5.item9\n- privacyMain.buyersDataContent.num5.item10\n- privacyMain.buyersDataContent.num5.item11\n- privacyMain.buyersDataContent.num5.item12\n- privacyMain.buyersDataContent.num5.item13\n- privacyMain.buyersDataContent.num5.item14\n- privacyMain.buyersDataContent.num5.item15\n- privacyMain.buyersDataContent.num5.item16", "privacyMain.buyersDataContent.num5.item17"] }];
const buyersApplication = [{ "paragraphTitle": "privacyMain.buyersApplication.title", "content": [{ "table": "| {{item1}} | {{item2}} | {{item3}} | {{item4}} | {{item5}} |\n| --- | --- | --- | --- | --- |\n| {{item6}} | {{item7}} | {{item8}} | {{item9}} | {{item10}} |\n| {{item11}} | {{item12}} | {{item13}} | {{item14}} | {{item15}} |\n| {{item16}} | {{item17}} | {{item18}} | {{item19}} | {{item20}} |\n| {{item21}} | {{item22}} | {{item23}} | {{item24}} | {{item25}} |\n| {{item26}} | {{item27}} | {{item28}} | {{item29}} | {{item30}} |\n| {{item31}} | {{item32}} | {{item33}} | {{item34}} | {{item35}} |\n| {{item36}} | {{item37}} | {{item38}} | {{item39}} | {{item40}} |\n| {{item41}} | {{item42}} | {{item43}} | {{item44}} | {{item45}} |", "item1": "privacyMain.buyersApplication.item1", "item2": "privacyMain.buyersApplication.item2", "item3": "privacyMain.buyersApplication.item3", "item4": "privacyMain.buyersApplication.item4", "item5": "privacyMain.buyersApplication.item5", "item6": "privacyMain.buyersApplication.item6", "item7": "privacyMain.buyersApplication.item7", "item8": "privacyMain.buyersApplication.item8", "item9": "privacyMain.buyersApplication.item9", "item10": "privacyMain.buyersApplication.item10", "item11": "privacyMain.buyersApplication.item11", "item12": "privacyMain.buyersApplication.item12", "item13": "privacyMain.buyersApplication.item13", "item14": "privacyMain.buyersApplication.item14", "item15": "privacyMain.buyersApplication.item15", "item16": "privacyMain.buyersApplication.item16", "item17": "privacyMain.buyersApplication.item17", "item18": "privacyMain.buyersApplication.item18", "item19": "privacyMain.buyersApplication.item19", "item20": "privacyMain.buyersApplication.item20", "item21": "privacyMain.buyersApplication.item21", "item22": "privacyMain.buyersApplication.item22", "item23": "privacyMain.buyersApplication.item23", "item24": "privacyMain.buyersApplication.item24", "item25": "privacyMain.buyersApplication.item25", "item26": "privacyMain.buyersApplication.item26", "item27": "privacyMain.buyersApplication.item27", "item28": "privacyMain.buyersApplication.item28", "item29": "privacyMain.buyersApplication.item29", "item30": "privacyMain.buyersApplication.item30", "item31": "privacyMain.buyersApplication.item31", "item32": "privacyMain.buyersApplication.item32", "item33": "privacyMain.buyersApplication.item33", "item34": "privacyMain.buyersApplication.item34", "item35": "privacyMain.buyersApplication.item35", "item36": "privacyMain.buyersApplication.item36", "item37": "privacyMain.buyersApplication.item37", "item38": "privacyMain.buyersApplication.item38", "item39": "privacyMain.buyersApplication.item39", "item40": "privacyMain.buyersApplication.item40", "item41": "privacyMain.buyersApplication.item41", "item42": "privacyMain.buyersApplication.item42", "item43": "privacyMain.buyersApplication.item43", "item44": "privacyMain.buyersApplication.item44", "item45": "privacyMain.buyersApplication.item45" }] }];
const b2bPrivacy = [{ "paragraphTitle": "privacyMain.b2bDataTitles.num1", "content": ["privacyMain.b2bDataContent.num1.item1", "privacyMain.b2bDataContent.num1.item2", "privacyMain.b2bDataContent.num1.item3", "privacyMain.b2bDataContent.num1.item4", "- privacyMain.b2bDataContent.num1.item5\n- privacyMain.b2bDataContent.num1.item6\n- privacyMain.b2bDataContent.num1.item7\n- privacyMain.b2bDataContent.num1.item8\n- privacyMain.b2bDataContent.num1.item9", "privacyMain.b2bDataContent.num1.item10", "privacyMain.b2bDataContent.num1.item11", "- privacyMain.b2bDataContent.num1.item12\n- privacyMain.b2bDataContent.num1.item13\n- privacyMain.b2bDataContent.num1.item14\n- privacyMain.b2bDataContent.num1.item15\n  1. privacyMain.b2bDataContent.num1.item16\n  2. privacyMain.b2bDataContent.num1.item17\n  3. privacyMain.b2bDataContent.num1.item18\n- privacyMain.b2bDataContent.num1.item19\n  - privacyMain.b2bDataContent.num1.item20\n  - privacyMain.b2bDataContent.num1.item21\n- privacyMain.b2bDataContent.num1.item22", "privacyMain.b2bDataContent.num1.item23", "privacyMain.b2bDataContent.num1.item24", "privacyMain.b2bDataContent.num1.item25", "privacyMain.b2bDataContent.num1.item26"] }, { "paragraphTitle": "privacyMain.b2bDataTitles.num2", "content": ["privacyMain.b2bDataContent.num2.item1", "privacyMain.b2bDataContent.num2.item2"] }, { "paragraphTitle": "privacyMain.b2bDataTitles.num3", "content": ["privacyMain.b2bDataContent.num3.item1", "- privacyMain.b2bDataContent.num3.item2\n- privacyMain.b2bDataContent.num3.item3\n- privacyMain.b2bDataContent.num3.item4", "privacyMain.b2bDataContent.num3.item5", "- privacyMain.b2bDataContent.num3.item6\n- privacyMain.b2bDataContent.num3.item7", "privacyMain.b2bDataContent.num3.item8", "privacyMain.b2bDataContent.num3.item9", "privacyMain.b2bDataContent.num3.item10", "privacyMain.b2bDataContent.num3.item11", "- privacyMain.b2bDataContent.num3.item12\n- privacyMain.b2bDataContent.num3.item13\n- privacyMain.b2bDataContent.num3.item14", "privacyMain.b2bDataContent.num3.item15", "- privacyMain.b2bDataContent.num3.item16\n- privacyMain.b2bDataContent.num3.item17\n- privacyMain.b2bDataContent.num3.item18\n- privacyMain.b2bDataContent.num3.item19\n- privacyMain.b2bDataContent.num3.item20\n- privacyMain.b2bDataContent.num3.item21\n- privacyMain.b2bDataContent.num3.item22\n- privacyMain.b2bDataContent.num3.item23\n- privacyMain.b2bDataContent.num3.item24\n- privacyMain.b2bDataContent.num3.item25", "privacyMain.b2bDataContent.num3.item26", "- privacyMain.b2bDataContent.num3.item27\n- privacyMain.b2bDataContent.num3.item28\n- privacyMain.b2bDataContent.num3.item29\n- privacyMain.b2bDataContent.num3.item30\n- privacyMain.b2bDataContent.num3.item31", "privacyMain.b2bDataContent.num3.item32", "privacyMain.b2bDataContent.num3.item33", "privacyMain.b2bDataContent.num3.item34", "privacyMain.b2bDataContent.num3.item35", "privacyMain.b2bDataContent.num3.item36", "- privacyMain.b2bDataContent.num3.item37\n- privacyMain.b2bDataContent.num3.item38\n- privacyMain.b2bDataContent.num3.item39\n- privacyMain.b2bDataContent.num3.item40", "privacyMain.b2bDataContent.num3.item41", "- privacyMain.b2bDataContent.num3.item42\n- privacyMain.b2bDataContent.num3.item43\n- privacyMain.b2bDataContent.num3.item44\n- privacyMain.b2bDataContent.num3.item45\n- privacyMain.b2bDataContent.num3.item46", "privacyMain.b2bDataContent.num3.item47", "privacyMain.b2bDataContent.num3.item48", "- privacyMain.b2bDataContent.num3.item49\n- privacyMain.b2bDataContent.num3.item50\n- privacyMain.b2bDataContent.num3.item51\n- privacyMain.b2bDataContent.num3.item52\n- privacyMain.b2bDataContent.num3.item53\n- privacyMain.b2bDataContent.num3.item54", "privacyMain.b2bDataContent.num3.item55", "- privacyMain.b2bDataContent.num3.item56\n- privacyMain.b2bDataContent.num3.item57\n- privacyMain.b2bDataContent.num3.item58", "privacyMain.b2bDataContent.num3.item59"] }, { "paragraphTitle": "privacyMain.b2bDataTitles.num4", "content": ["privacyMain.b2bDataContent.num4.item1", "privacyMain.b2bDataContent.num4.item2", "privacyMain.b2bDataContent.num4.item3", "privacyMain.b2bDataContent.num4.item4", "privacyMain.b2bDataContent.num4.item5", "privacyMain.b2bDataContent.num4.item6", "privacyMain.b2bDataContent.num4.item7", "- **privacyMain.b2bDataContent.num4.item8** privacyMain.b2bDataContent.num4.item9\n- **privacyMain.b2bDataContent.num4.item10** privacyMain.b2bDataContent.num4.item11\n- **privacyMain.b2bDataContent.num4.item12** privacyMain.b2bDataContent.num4.item13\n- **privacyMain.b2bDataContent.num4.item14** privacyMain.b2bDataContent.num4.item15\n- **privacyMain.b2bDataContent.num4.item16** privacyMain.b2bDataContent.num4.item17\n- **privacyMain.b2bDataContent.num4.item18** privacyMain.b2bDataContent.num4.item19", "privacyMain.b2bDataContent.num4.item20", "privacyMain.b2bDataContent.num4.item21", "- **privacyMain.b2bDataContent.num4.item22** privacyMain.b2bDataContent.num4.item23\n- **privacyMain.b2bDataContent.num4.item24** privacyMain.b2bDataContent.num4.item25\n- **privacyMain.b2bDataContent.num4.item26** privacyMain.b2bDataContent.num4.item27\n- **privacyMain.b2bDataContent.num4.item28** privacyMain.b2bDataContent.num4.item29\n- **privacyMain.b2bDataContent.num4.item30** privacyMain.b2bDataContent.num4.item31\n- **privacyMain.b2bDataContent.num4.item32** privacyMain.b2bDataContent.num4.item33", "privacyMain.b2bDataContent.num4.item34", "privacyMain.b2bDataContent.num4.item35", "privacyMain.b2bDataContent.num4.item36", "- privacyMain.b2bDataContent.num4.item37\n- privacyMain.b2bDataContent.num4.item38\n- privacyMain.b2bDataContent.num4.item39", "privacyMain.b2bDataContent.num4.item40", "privacyMain.b2bDataContent.num4.item41", "privacyMain.b2bDataContent.num4.item42"] }, { "paragraphTitle": "privacyMain.b2bDataTitles.num5", "content": ["privacyMain.b2bDataContent.num5.item1", "- privacyMain.b2bDataContent.num5.item2\n- privacyMain.b2bDataContent.num5.item3\n- privacyMain.b2bDataContent.num5.item4\n- privacyMain.b2bDataContent.num5.item5\n- privacyMain.b2bDataContent.num5.item6\n- privacyMain.b2bDataContent.num5.item7\n- privacyMain.b2bDataContent.num5.item8\n- privacyMain.b2bDataContent.num5.item9\n- privacyMain.b2bDataContent.num5.item10\n- privacyMain.b2bDataContent.num5.item11\n- privacyMain.b2bDataContent.num5.item12\n- privacyMain.b2bDataContent.num5.item13\n- privacyMain.b2bDataContent.num5.item14\n- privacyMain.b2bDataContent.num5.item15\n- privacyMain.b2bDataContent.num5.item16\n- privacyMain.b2bDataContent.num5.item17\n- privacyMain.b2bDataContent.num5.item18", "privacyMain.b2bDataContent.num5.item19"] }];
const b2bApplication = [{ "paragraphTitle": "privacyMain.b2bApplication.title", "content": [{ "table": "| {{item1}} | {{item2}} | {{item3}} | {{item4}} | {{item5}} |\n| --- | --- | --- | --- | --- |\n| {{item6}} | {{item7}} | {{item8}} | {{item9}} | {{item10}} |\n| {{item11}} | {{item12}} | {{item13}} | {{item14}} | {{item15}} |\n| {{item16}} | {{item17}} | {{item18}} | {{item19}} | {{item20}} |\n| {{item21}} | {{item22}} | {{item23}} | {{item24}} | {{item25}} |\n| {{item26}} | {{item27}} | {{item28}} | {{item29}} | {{item30}} |\n| {{item31}} | {{item32}} | {{item33}} | {{item34}} | {{item35}} |\n| {{item36}} | {{item37}} | {{item38}} | {{item39}} | {{item40}} |\n| {{item41}} | {{item42}} | {{item43}} | {{item44}} | {{item45}} |\n| {{item46}} | {{item47}} | {{item48}} | {{item49}} | {{item50}} |\n| {{item51}} | {{item52}} | {{item53}} | {{item54}} | {{item55}} |\n| {{item56}} | {{item57}} | {{item58}} | {{item59}} | {{item60}} |\n| {{item61}} | {{item62}} | {{item63}} | {{item64}} | {{item65}} |\n| {{item66}} | {{item67}} | {{item68}} | {{item69}} | {{item70}} |\n| {{item71}} | {{item72}} | {{item73}} | {{item74}} | {{item75}} |", "item1": "privacyMain.b2bApplication.item1", "item2": "privacyMain.b2bApplication.item2", "item3": "privacyMain.b2bApplication.item3", "item4": "privacyMain.b2bApplication.item4", "item5": "privacyMain.b2bApplication.item5", "item6": "privacyMain.b2bApplication.item6", "item7": "privacyMain.b2bApplication.item7", "item8": "privacyMain.b2bApplication.item8", "item9": "privacyMain.b2bApplication.item9", "item10": "privacyMain.b2bApplication.item10", "item11": "privacyMain.b2bApplication.item11", "item12": "privacyMain.b2bApplication.item12", "item13": "privacyMain.b2bApplication.item13", "item14": "privacyMain.b2bApplication.item14", "item15": "privacyMain.b2bApplication.item15", "item16": "privacyMain.b2bApplication.item16", "item17": "privacyMain.b2bApplication.item17", "item18": "privacyMain.b2bApplication.item18", "item19": "privacyMain.b2bApplication.item19", "item20": "privacyMain.b2bApplication.item20", "item21": "privacyMain.b2bApplication.item21", "item22": "privacyMain.b2bApplication.item22", "item23": "privacyMain.b2bApplication.item23", "item24": "privacyMain.b2bApplication.item24", "item25": "privacyMain.b2bApplication.item25", "item26": "privacyMain.b2bApplication.item26", "item27": "privacyMain.b2bApplication.item27", "item28": "privacyMain.b2bApplication.item28", "item29": "privacyMain.b2bApplication.item29", "item30": "privacyMain.b2bApplication.item30", "item31": "privacyMain.b2bApplication.item31", "item32": "privacyMain.b2bApplication.item32", "item33": "privacyMain.b2bApplication.item33", "item34": "privacyMain.b2bApplication.item34", "item35": "privacyMain.b2bApplication.item35", "item36": "privacyMain.b2bApplication.item36", "item37": "privacyMain.b2bApplication.item37", "item38": "privacyMain.b2bApplication.item38", "item39": "privacyMain.b2bApplication.item39", "item40": "privacyMain.b2bApplication.item40", "item41": "privacyMain.b2bApplication.item41", "item42": "privacyMain.b2bApplication.item42", "item43": "privacyMain.b2bApplication.item43", "item44": "privacyMain.b2bApplication.item44", "item45": "privacyMain.b2bApplication.item45", "item46": "privacyMain.b2bApplication.item46", "item47": "privacyMain.b2bApplication.item47", "item48": "privacyMain.b2bApplication.item48", "item49": "privacyMain.b2bApplication.item49", "item50": "privacyMain.b2bApplication.item50", "item51": "privacyMain.b2bApplication.item51", "item52": "privacyMain.b2bApplication.item52", "item53": "privacyMain.b2bApplication.item53", "item54": "privacyMain.b2bApplication.item54", "item55": "privacyMain.b2bApplication.item55", "item56": "privacyMain.b2bApplication.item56", "item57": "privacyMain.b2bApplication.item57", "item58": "privacyMain.b2bApplication.item58", "item59": "privacyMain.b2bApplication.item59", "item60": "privacyMain.b2bApplication.item60", "item61": "privacyMain.b2bApplication.item61", "item62": "privacyMain.b2bApplication.item62", "item63": "privacyMain.b2bApplication.item63", "item64": "privacyMain.b2bApplication.item64", "item65": "privacyMain.b2bApplication.item65", "item66": "privacyMain.b2bApplication.item66", "item67": "privacyMain.b2bApplication.item67", "item68": "privacyMain.b2bApplication.item68", "item69": "privacyMain.b2bApplication.item69", "item70": "privacyMain.b2bApplication.item70", "item71": "privacyMain.b2bApplication.item71", "item72": "privacyMain.b2bApplication.item72", "item73": "privacyMain.b2bApplication.item73", "item74": "privacyMain.b2bApplication.item74", "item75": "privacyMain.b2bApplication.item75" }] }];
const applicantsInfo = [{ "paragraphTitle": "privacyMain.applicantsInfoTitles.num1", "content": ["privacyMain.applicantsInfoContent.num1.item1"] }, { "paragraphTitle": "privacyMain.applicantsInfoTitles.num2", "content": [{ "table": "| {{item1}} | {{item2}} | {{item3}} |\n| --- | --- | --- |\n| {{item4}} | {{item5}} | {{item6}} |\n| {{item7}} | {{item8}} | {{item9}} |\n\n{{item10}}", "item1": "privacyMain.applicantsInfoContent.num2.item1", "item2": "privacyMain.applicantsInfoContent.num2.item2", "item3": "privacyMain.applicantsInfoContent.num2.item3", "item4": "privacyMain.applicantsInfoContent.num2.item4", "item5": "privacyMain.applicantsInfoContent.num2.item5", "item6": "privacyMain.applicantsInfoContent.num2.item6", "item7": "privacyMain.applicantsInfoContent.num2.item7", "item8": "privacyMain.applicantsInfoContent.num2.item8", "item9": "privacyMain.applicantsInfoContent.num2.item9", "item10": "privacyMain.applicantsInfoContent.num2.item10" }] }, { "paragraphTitle": "privacyMain.applicantsInfoTitles.num3", "content": ["privacyMain.applicantsInfoContent.num3.item1"] }, { "paragraphTitle": "privacyMain.applicantsInfoTitles.num4", "content": ["privacyMain.applicantsInfoContent.num4.item1"] }, { "paragraphTitle": "privacyMain.applicantsInfoTitles.num5", "content": ["privacyMain.applicantsInfoContent.num5.item1", "1. privacyMain.applicantsInfoContent.num5.item2\n2. privacyMain.applicantsInfoContent.num5.item3\n3. privacyMain.applicantsInfoContent.num5.item4\n4. privacyMain.applicantsInfoContent.num5.item5\n5. privacyMain.applicantsInfoContent.num5.item6\n6. privacyMain.applicantsInfoContent.num5.item7", "privacyMain.applicantsInfoContent.num5.item8", "privacyMain.applicantsInfoContent.num5.item9", "privacyMain.applicantsInfoContent.num5.item10"] }, { "paragraphTitle": "privacyMain.applicantsInfoTitles.num6", "content": ["privacyMain.applicantsInfoContent.num6.item1", "privacyMain.applicantsInfoContent.num6.item2"] }, { "paragraphTitle": "privacyMain.applicantsInfoTitles.num7", "content": ["privacyMain.applicantsInfoContent.num7.item1"] }, { "paragraphTitle": "privacyMain.applicantsInfoTitles.num8", "content": ["privacyMain.applicantsInfoContent.num8.item1"] }];
const applicantsPrivacy = [{ "paragraphTitle": "privacyMain.applicantsTitles.num1", "content": ["privacyMain.applicantsContent.num1.item1", "privacyMain.applicantsContent.num1.item2", "privacyMain.applicantsContent.num1.item3", "privacyMain.applicantsContent.num1.item4", "- privacyMain.applicantsContent.num1.item5\n- privacyMain.applicantsContent.num1.item6\n- privacyMain.applicantsContent.num1.item7\n- privacyMain.applicantsContent.num1.item8\n- privacyMain.applicantsContent.num1.item9", "privacyMain.applicantsContent.num1.item10", "privacyMain.applicantsContent.num1.item11", "- privacyMain.applicantsContent.num1.item12\n- privacyMain.applicantsContent.num1.item13", "privacyMain.applicantsContent.num1.item14", "privacyMain.applicantsContent.num1.item15", "privacyMain.applicantsContent.num1.item16", "privacyMain.applicantsContent.num1.item17"] }, { "paragraphTitle": "privacyMain.applicantsTitles.num2", "content": ["privacyMain.applicantsContent.num2.item1", "privacyMain.applicantsContent.num2.item2"] }, { "paragraphTitle": "privacyMain.applicantsTitles.num3", "content": ["privacyMain.applicantsContent.num3.item1", "- privacyMain.applicantsContent.num3.item2\n- privacyMain.applicantsContent.num3.item3", "privacyMain.applicantsContent.num3.item4", "privacyMain.applicantsContent.num3.item5", "privacyMain.applicantsContent.num3.item6", "privacyMain.applicantsContent.num3.item7", "privacyMain.applicantsContent.num3.item8", "privacyMain.applicantsContent.num3.item9", "- privacyMain.applicantsContent.num3.item10\n- privacyMain.applicantsContent.num3.item11", "privacyMain.applicantsContent.num3.item12", "privacyMain.applicantsContent.num3.item13", "privacyMain.applicantsContent.num3.item14", "privacyMain.applicantsContent.num3.item15", "- privacyMain.applicantsContent.num3.item16\n- privacyMain.applicantsContent.num3.item17\n- privacyMain.applicantsContent.num3.item18\n- privacyMain.applicantsContent.num3.item19\n- privacyMain.applicantsContent.num3.item20", "privacyMain.applicantsContent.num3.item21", "privacyMain.applicantsContent.num3.item22", "privacyMain.applicantsContent.num3.item23", "privacyMain.applicantsContent.num3.item24", "privacyMain.applicantsContent.num3.item25", "- privacyMain.applicantsContent.num3.item26\n- privacyMain.applicantsContent.num3.item27\n- privacyMain.applicantsContent.num3.item28\n- privacyMain.applicantsContent.num3.item29\n- privacyMain.applicantsContent.num3.item30\n- privacyMain.applicantsContent.num3.item31\n- privacyMain.applicantsContent.num3.item32", "privacyMain.applicantsContent.num3.item33", "- privacyMain.applicantsContent.num3.item34\n- privacyMain.applicantsContent.num3.item35\n- privacyMain.applicantsContent.num3.item36", "privacyMain.applicantsContent.num3.item37"] }, { "paragraphTitle": "privacyMain.applicantsTitles.num4", "content": ["privacyMain.applicantsContent.num4.item1", "privacyMain.applicantsContent.num4.item2", "privacyMain.applicantsContent.num4.item3", "privacyMain.applicantsContent.num4.item4", "privacyMain.applicantsContent.num4.item5", "privacyMain.applicantsContent.num4.item6", "privacyMain.applicantsContent.num4.item7", "privacyMain.applicantsContent.num4.item8", "- **privacyMain.applicantsContent.num4.item9** privacyMain.applicantsContent.num4.item10\n- **privacyMain.applicantsContent.num4.item11** privacyMain.applicantsContent.num4.item12\n- **privacyMain.applicantsContent.num4.item13** privacyMain.applicantsContent.num4.item14\n- **privacyMain.applicantsContent.num4.item15** privacyMain.applicantsContent.num4.item16\n- **privacyMain.applicantsContent.num4.item17** privacyMain.applicantsContent.num4.item18\n- **privacyMain.applicantsContent.num4.item19** privacyMain.applicantsContent.num4.item20", "privacyMain.applicantsContent.num4.item21", "privacyMain.applicantsContent.num4.item22", "- **privacyMain.applicantsContent.num4.item23** privacyMain.applicantsContent.num4.item24\n- **privacyMain.applicantsContent.num4.item25** privacyMain.applicantsContent.num4.item26\n- **privacyMain.applicantsContent.num4.item27** privacyMain.applicantsContent.num4.item28\n- **privacyMain.applicantsContent.num4.item29** privacyMain.applicantsContent.num4.item30\n- **privacyMain.applicantsContent.num4.item31** privacyMain.applicantsContent.num4.item32\n- **privacyMain.applicantsContent.num4.item33** privacyMain.applicantsContent.num4.item34", "privacyMain.applicantsContent.num4.item35", "privacyMain.applicantsContent.num4.item36", "privacyMain.applicantsContent.num4.item37", "- privacyMain.applicantsContent.num4.item38\n- privacyMain.applicantsContent.num4.item39", "privacyMain.applicantsContent.num4.item40", "- privacyMain.applicantsContent.num4.item41\n- privacyMain.applicantsContent.num4.item42\n- privacyMain.applicantsContent.num4.item43", "privacyMain.applicantsContent.num4.item44", "privacyMain.applicantsContent.num4.item45", "privacyMain.applicantsContent.num4.item46"] }, { "paragraphTitle": "privacyMain.applicantsTitles.num5", "content": ["privacyMain.applicantsContent.num5.item1", "- privacyMain.applicantsContent.num5.item2\n- privacyMain.applicantsContent.num5.item3\n- privacyMain.applicantsContent.num5.item4\n- privacyMain.applicantsContent.num5.item5\n- privacyMain.applicantsContent.num5.item6\n- privacyMain.applicantsContent.num5.item7\n- privacyMain.applicantsContent.num5.item8\n- privacyMain.applicantsContent.num5.item9\n- privacyMain.applicantsContent.num5.item10\n- privacyMain.applicantsContent.num5.item11\n- privacyMain.applicantsContent.num5.item12\n- privacyMain.applicantsContent.num5.item13\n- privacyMain.applicantsContent.num5.item14\n- privacyMain.applicantsContent.num5.item15\n- privacyMain.applicantsContent.num5.item16\n- privacyMain.applicantsContent.num5.item17\n- privacyMain.applicantsContent.num5.item18", "privacyMain.applicantsContent.num5.item19"] }];
const applicantsApplication = [{ "paragraphTitle": "privacyMain.applicantsApplication.title", "content": [{ "table": "| {{item1}} | {{item2}} | {{item3}} | {{item4}} | {{item5}} |\n| --- | --- | --- | --- | --- |\n| {{item6}} | {{item7}} | {{item8}} | {{item9}} | {{item10}} |\n| {{item11}} | {{item12}} | {{item13}} | {{item14}} | {{item15}} |\n| {{item16}} | {{item17}} | {{item18}} | {{item19}} | {{item20}} |\n| {{item21}} | {{item22}} | {{item23}} | {{item24}} | {{item25}} |\n| {{item26}} | {{item27}} | {{item28}} | {{item29}} | {{item30}} |\n| {{item31}} | {{item32}} | {{item33}} | {{item34}} | {{item35}} |", "item1": "privacyMain.applicantsApplication.item1", "item2": "privacyMain.applicantsApplication.item2", "item3": "privacyMain.applicantsApplication.item3", "item4": "privacyMain.applicantsApplication.item4", "item5": "privacyMain.applicantsApplication.item5", "item6": "privacyMain.applicantsApplication.item6", "item7": "privacyMain.applicantsApplication.item7", "item8": "privacyMain.applicantsApplication.item8", "item9": "privacyMain.applicantsApplication.item9", "item10": "privacyMain.applicantsApplication.item10", "item11": "privacyMain.applicantsApplication.item11", "item12": "privacyMain.applicantsApplication.item12", "item13": "privacyMain.applicantsApplication.item13", "item14": "privacyMain.applicantsApplication.item14", "item15": "privacyMain.applicantsApplication.item15", "item16": "privacyMain.applicantsApplication.item16", "item17": "privacyMain.applicantsApplication.item17", "item18": "privacyMain.applicantsApplication.item18", "item19": "privacyMain.applicantsApplication.item19", "item20": "privacyMain.applicantsApplication.item20", "item21": "privacyMain.applicantsApplication.item21", "item22": "privacyMain.applicantsApplication.item22", "item23": "privacyMain.applicantsApplication.item23", "item24": "privacyMain.applicantsApplication.item24", "item25": "privacyMain.applicantsApplication.item25", "item26": "privacyMain.applicantsApplication.item26", "item27": "privacyMain.applicantsApplication.item27", "item28": "privacyMain.applicantsApplication.item28", "item29": "privacyMain.applicantsApplication.item29", "item30": "privacyMain.applicantsApplication.item30", "item31": "privacyMain.applicantsApplication.item31", "item32": "privacyMain.applicantsApplication.item32", "item33": "privacyMain.applicantsApplication.item33", "item34": "privacyMain.applicantsApplication.item34", "item35": "privacyMain.applicantsApplication.item35" }] }];
const PrivacyData = {
  cookiePrivacy,
  buyersPrivacy,
  buyersApplication,
  b2bPrivacy,
  b2bApplication,
  applicantsInfo,
  applicantsPrivacy,
  applicantsApplication
};
function fillTemplate(template, values, t) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return values[key] ? t(values[key]) : "";
  });
}
function processMarkdown(content, t) {
  const lines = content.split("\n");
  const result = [];
  lines.forEach((line) => {
    const match = line.match(/^(\s*)(-|\d+\.)\s+(.*)$/);
    if (match) {
      const [_, spaces, type, text] = match;
      const level = Math.floor(spaces.length / 2);
      const translatedText = text.replace(/\*\*([^*]+)\*\*/g, (_2, key) => {
        const translated = key.includes(".") ? t(key) : key;
        return `**${translated}**`;
      }).replace(/([^\*\s][^*]*[^\*\s])/g, (key) => {
        return key.includes(".") ? t(key) : key;
      });
      result.push(`${"  ".repeat(level)}${type} ${translatedText}`);
    } else {
      const translated = line.replace(/\*\*([^*]+)\*\*/g, (_, key) => {
        const translated2 = key.includes(".") ? t(key) : key;
        return `**${translated2}**`;
      }).replace(/([^\*\s][^*]*[^\*\s])/g, (key) => {
        return key.includes(".") ? t(key) : key;
      });
      result.push(translated);
    }
  });
  return result.join("\n");
}
function ParagraphListSection({ data, allowMultiple = false }) {
  const [openIndexes, setOpenIndexes] = useState([]);
  const { t } = useTranslation();
  const toggleBlock = (index) => {
    if (allowMultiple) {
      setOpenIndexes(
        (prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => prev.includes(index) ? [] : [index]);
    }
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_paragraph-section" }, data.map((item, index) => {
    const isOpen = openIndexes.includes(index);
    return /* @__PURE__ */ React__default.createElement("div", { key: index, className: "aam_paragraph-section__item" }, /* @__PURE__ */ React__default.createElement(
      "div",
      {
        className: "aam_paragraph-section__title",
        role: "button",
        tabIndex: 0,
        "aria-expanded": isOpen,
        "aria-controls": `paragraph-content-${index}`,
        onClick: () => toggleBlock(index),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleBlock(index);
          }
        }
      },
      t(item.paragraphTitle),
      /* @__PURE__ */ React__default.createElement("span", { className: "aam_paragraph-section__icon" }, isOpen ? /* @__PURE__ */ React__default.createElement(MinusIcon, null) : /* @__PURE__ */ React__default.createElement(PlusIcon, null))
    ), /* @__PURE__ */ React__default.createElement(
      CSSTransition,
      {
        in: isOpen,
        timeout: 300,
        classNames: "aam_paragraph-section__content",
        unmountOnExit: false
      },
      /* @__PURE__ */ React__default.createElement(
        "div",
        {
          id: `paragraph-content-${index}`,
          className: `aam_paragraph-section__content ${isOpen ? "open" : "closed"}`
        },
        item.content.map((contentItem, pIndex) => {
          if (typeof contentItem === "object" && contentItem.table) {
            const markdown = fillTemplate(contentItem.table, contentItem, t);
            return /* @__PURE__ */ React__default.createElement(
              ReactMarkdown,
              {
                key: pIndex,
                remarkPlugins: [remarkGfm],
                components: {
                  table: (props) => /* @__PURE__ */ React__default.createElement("table", { className: "aam_markdown-table", ...props }),
                  thead: (props) => /* @__PURE__ */ React__default.createElement("thead", { ...props }),
                  tbody: (props) => /* @__PURE__ */ React__default.createElement("tbody", { ...props }),
                  tr: (props) => /* @__PURE__ */ React__default.createElement("tr", { ...props }),
                  th: (props) => /* @__PURE__ */ React__default.createElement("th", { ...props }),
                  td: (props) => /* @__PURE__ */ React__default.createElement("td", { ...props }),
                  p: (props) => /* @__PURE__ */ React__default.createElement("p", { ...props }),
                  ul: (props) => /* @__PURE__ */ React__default.createElement("ul", { ...props }),
                  ol: (props) => /* @__PURE__ */ React__default.createElement("ol", { ...props }),
                  li: (props) => /* @__PURE__ */ React__default.createElement("li", { ...props })
                }
              },
              markdown
            );
          }
          if (typeof contentItem === "string") {
            const markdown = processMarkdown(contentItem, t);
            return /* @__PURE__ */ React__default.createElement(ReactMarkdown, { key: pIndex, remarkPlugins: [remarkGfm] }, markdown);
          }
          return null;
        })
      )
    ));
  }));
}
ParagraphListSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      paragraphTitle: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            table: PropTypes.string.isRequired
          })
        ])
      ).isRequired
    })
  ).isRequired,
  allowMultiple: PropTypes.bool
};
const CookieConsentPolicy = () => {
  const { t } = useTranslation();
  const cookieData = PrivacyData.cookiePrivacy;
  const [modalKey, setModalKey] = useState(0);
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.cookieData.title")), /* @__PURE__ */ React__default.createElement("h3", { className: "aam_privacy-page__title" }, t("privacyMain.cookieData.subTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: cookieData, allowMultiple: true }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__button" }, /* @__PURE__ */ React__default.createElement(
    Button,
    {
      label: t("Персональные настройки cookies"),
      onClick: () => setModalKey((prev) => prev + 1),
      variant: "green"
    }
  )), modalKey > 0 && /* @__PURE__ */ React__default.createElement(CookieConsentModal, { key: `modal-${modalKey}`, forceVisible: true }))));
};
const BuyersPolicy = () => {
  const { t } = useTranslation();
  const privacyData = PrivacyData.buyersPrivacy;
  const privacyApplication = PrivacyData.buyersApplication;
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.buyersData.title")), /* @__PURE__ */ React__default.createElement("h3", { className: "aam_privacy-page__title" }, t("privacyMain.buyersData.subTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyData, allowMultiple: true }))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.buyersApplicationTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyApplication, allowMultiple: true }))));
};
const B2BPolicy = () => {
  const { t } = useTranslation();
  const privacyData = PrivacyData.b2bPrivacy;
  const privacyApplication = PrivacyData.b2bApplication;
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.b2bData.title")), /* @__PURE__ */ React__default.createElement("h3", { className: "aam_privacy-page__title" }, t("privacyMain.b2bData.subTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyData, allowMultiple: true }))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.b2bApplicationTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyApplication, allowMultiple: true }))));
};
const ApplicantsPolicy = () => {
  const { t } = useTranslation();
  const privacyInfo = PrivacyData.applicantsInfo;
  const privacyData = PrivacyData.applicantsPrivacy;
  const privacyApplication = PrivacyData.applicantsApplication;
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__title" }, /* @__PURE__ */ React__default.createElement("h2", null, t("privacyMain.applicantsInformationTitle")), /* @__PURE__ */ React__default.createElement("h3", null, t("privacyMain.applicantsInformationSubTitle1")), /* @__PURE__ */ React__default.createElement("h3", null, t("privacyMain.applicantsInformationSubTitle2"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyInfo, allowMultiple: true }))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__title" }, /* @__PURE__ */ React__default.createElement("h2", null, t("privacyMain.applicantsConsentTitle")), /* @__PURE__ */ React__default.createElement("h3", null, t("privacyMain.applicantsConsentSubTitle1"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_paragraph-section__custom" }, /* @__PURE__ */ React__default.createElement("p", null, t("privacyMain.applicantsConsent.item1")), /* @__PURE__ */ React__default.createElement("p", null, t("privacyMain.applicantsConsent.item2")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("privacyMain.applicantsConsent.list1.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("privacyMain.applicantsConsent.list1.item2"))), /* @__PURE__ */ React__default.createElement("p", null, t("privacyMain.applicantsConsent.item3")), /* @__PURE__ */ React__default.createElement("p", null, t("privacyMain.applicantsConsent.item4")), /* @__PURE__ */ React__default.createElement("p", null, t("privacyMain.applicantsConsent.item5")), /* @__PURE__ */ React__default.createElement("p", null, t("privacyMain.applicantsConsent.item6")), /* @__PURE__ */ React__default.createElement("ul", null, /* @__PURE__ */ React__default.createElement("li", null, t("privacyMain.applicantsConsent.list2.item1")), /* @__PURE__ */ React__default.createElement("li", null, t("privacyMain.applicantsConsent.list2.item2")), /* @__PURE__ */ React__default.createElement("li", null, t("privacyMain.applicantsConsent.list2.item3")))))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__title" }, /* @__PURE__ */ React__default.createElement("h2", null, t("privacyMain.applicantsData.title")), /* @__PURE__ */ React__default.createElement("h3", null, t("privacyMain.applicantsData.subTitle"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyData, allowMultiple: true }))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__wrapper" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_privacy-page__title" }, t("privacyMain.applicantsApplicationTitle")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_privacy-page__content" }, /* @__PURE__ */ React__default.createElement(ParagraphListSection, { data: privacyApplication, allowMultiple: true }))));
};
const PrivacyIndexRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("cookie-consent-policy", { replace: true });
  }, [navigate]);
  return null;
};
function App() {
  return /* @__PURE__ */ React__default.createElement(SelectedItemProvider, null, /* @__PURE__ */ React__default.createElement(ScrollToTop, null), /* @__PURE__ */ React__default.createElement(Routes, null, /* @__PURE__ */ React__default.createElement(Route, { path: "/", element: /* @__PURE__ */ React__default.createElement(Home, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/about", element: /* @__PURE__ */ React__default.createElement(About, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/contacts", element: /* @__PURE__ */ React__default.createElement(Contacts, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/news", element: /* @__PURE__ */ React__default.createElement(News, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/news/:id", element: /* @__PURE__ */ React__default.createElement(DetailedNews, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment", element: /* @__PURE__ */ React__default.createElement(Equipment, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/webCenterBerlio", element: /* @__PURE__ */ React__default.createElement(WebCenterBerlio, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/oilAndCapital", element: /* @__PURE__ */ React__default.createElement(OilAndCapital, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/selfServiceCheckout", element: /* @__PURE__ */ React__default.createElement(SelfServiceCheckout, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/gsAutomationSystem", element: /* @__PURE__ */ React__default.createElement(GSAutomationSystem, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/invoicesSite", element: /* @__PURE__ */ React__default.createElement(InvoicesSite, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/invoicesSiteTariffs", element: /* @__PURE__ */ React__default.createElement(InvoicesSiteTariffs, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/berlioInternetClientApp", element: /* @__PURE__ */ React__default.createElement(BerlioInternetClientApp, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/berlioCardPayApp", element: /* @__PURE__ */ React__default.createElement(BerlioCardPayApp, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/smartPayApp", element: /* @__PURE__ */ React__default.createElement(SmartPayApp, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/personalAccWebApp", element: /* @__PURE__ */ React__default.createElement(PersonalAccWebApp, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients", element: /* @__PURE__ */ React__default.createElement(ForClients, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/signAndResign", element: /* @__PURE__ */ React__default.createElement(SignAndResign, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/cardUsageRules", element: /* @__PURE__ */ React__default.createElement(CardUsageRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/gettingElectronicCard", element: /* @__PURE__ */ React__default.createElement(GettingElectronicCard, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/dealResignation", element: /* @__PURE__ */ React__default.createElement(DealResignation, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/priceListsAndTariffs", element: /* @__PURE__ */ React__default.createElement(PriceListsAndTariffs, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/workWithPrivateAccount", element: /* @__PURE__ */ React__default.createElement(WorkWithPrivateAccount, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/documentsForDownload", element: /* @__PURE__ */ React__default.createElement(DocumentsForDownload, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/plasticCardUsageRules", element: /* @__PURE__ */ React__default.createElement(PlasticCardUsageRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/nonResidentsSupport", element: /* @__PURE__ */ React__default.createElement(NonResidentsSupport, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/tollRoads", element: /* @__PURE__ */ React__default.createElement(TollRoads, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/forFuelPayments", element: /* @__PURE__ */ React__default.createElement(ForFuelPayments, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/issuerRules", element: /* @__PURE__ */ React__default.createElement(IssuerRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/eMoneyRegulations", element: /* @__PURE__ */ React__default.createElement(EMoneyRegulations, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners", element: /* @__PURE__ */ React__default.createElement(ForPartners, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/voiceRefService", element: /* @__PURE__ */ React__default.createElement(VoiceReferenceService, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/loyaltyProgram", element: /* @__PURE__ */ React__default.createElement(LoyaltyProgram, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/documentsForDownload", element: /* @__PURE__ */ React__default.createElement(DocumentsForDownload, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/systemRules", element: /* @__PURE__ */ React__default.createElement(SystemRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/forBankInformation", element: /* @__PURE__ */ React__default.createElement(ForBankInfo, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/cardUsageRules", element: /* @__PURE__ */ React__default.createElement(CardUsageRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/plasticCardUsageRules", element: /* @__PURE__ */ React__default.createElement(PlasticCardUsageRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/forNotAResidentsServices", element: /* @__PURE__ */ React__default.createElement(ForNotAResidentsServices, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/privacy", element: /* @__PURE__ */ React__default.createElement(Privacy, null) }, /* @__PURE__ */ React__default.createElement(Route, { index: true, element: /* @__PURE__ */ React__default.createElement(PrivacyIndexRedirect, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "cookie-consent-policy", element: /* @__PURE__ */ React__default.createElement(CookieConsentPolicy, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "buyers-policy", element: /* @__PURE__ */ React__default.createElement(BuyersPolicy, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "b2b-policy", element: /* @__PURE__ */ React__default.createElement(B2BPolicy, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "applicants-policy", element: /* @__PURE__ */ React__default.createElement(ApplicantsPolicy, null) })), /* @__PURE__ */ React__default.createElement(Route, { path: "/administrator", element: /* @__PURE__ */ React__default.createElement(AdminLoginPage, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/adminDashboard", element: /* @__PURE__ */ React__default.createElement(AdminDashboardPage, null) }, /* @__PURE__ */ React__default.createElement(Route, { path: "users", element: /* @__PURE__ */ React__default.createElement(UserManager, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "news", element: /* @__PURE__ */ React__default.createElement(NewsManager, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "sql-explorer", element: /* @__PURE__ */ React__default.createElement(SQLExplorer, null) }))), /* @__PURE__ */ React__default.createElement(CookieConsentModal, null));
}
i18n.use(initReactI18next).init({
  lng: "ru",
  // по умолчанию
  fallbackLng: "en",
  resources: {
    en: { translation: translationEn },
    ru: { translation: translationRu }
  },
  interpolation: { escapeValue: false },
  initImmediate: false
  // важно для SSR
});
async function render(url, initialLang = "ru") {
  try {
    if (i18n.language !== initialLang) {
      await i18n.changeLanguage(initialLang);
    }
    const helmetContext = {};
    const appHtml = renderToString(
      /* @__PURE__ */ React__default.createElement(I18nextProvider, { i18n }, /* @__PURE__ */ React__default.createElement(HelmetProvider, { context: helmetContext }, /* @__PURE__ */ React__default.createElement(StaticRouter, { location: url }, /* @__PURE__ */ React__default.createElement(App, null))))
    );
    const { helmet } = helmetContext;
    const head = `
      ${helmet.title?.toString() || ""}
      ${helmet.meta?.toString() || ""}
      ${helmet.link?.toString() || ""}
    `;
    return { html: appHtml, head, hydrate: true, lang: i18n.language };
  } catch (error) {
    console.error("🔥 SSR render error:", error.stack || error);
    throw error;
  }
}
export {
  render
};
