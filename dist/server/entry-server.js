import * as React from "react";
import React__default, { Component, createContext, useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Action } from "@remix-run/router";
import { parsePath, Router, createPath, useLocation, Routes, Route, useNavigate } from "react-router";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { initReactI18next, I18nextProvider } from "react-i18next";
import { PassThrough } from "stream";
import i18n from "i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
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
  return /* @__PURE__ */ React.createElement(Router, {
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
const pageTitles$1 = { "/": "S&P LLC 'Berlio'", "home": "S&P LLC 'Berlio' - Home", "about": "S&P LLC 'Berlio' - About Berlio", "contacts": "S&P LLC 'Berlio' - Contacts", "news": "S&P LLC 'Berlio' - News", "equipment": "S&P LLC 'Berlio' - Equipment and Software", "webCenter": "S&P LLC 'Berlio' - 'Web Center Berlio Software'", "oilAndCapital": "S&P LLC 'Berlio' - Oil and Capital APP", "selfServiceCheckout": "S&P LLC 'Berlio' - Self-service Checkout", "gsAutomationSystem": "S&P LLC 'Berlio' - 'Automation System for GS APP'", "invoicesSite": "NP LLC «Berlio» - 'Invoice Billing Site'", "invoicesSiteTariffs": "NP LLC «Berlio» - 'API BERLIO-INFO' Tariffs", "forClients": "S&P LLC 'Berlio' - For Clients", "signAndResign": "S&P LLC 'Berlio' - Signing and re-signing of the agreement", "gettingElectronicCard": "S&P LLC 'Berlio' - Receiving an electronic card", "cardUsageRules": "S&P LLC 'Berlio' - Rules for using an electronic card", "dealResignation": "S&P LLC 'Berlio' - Termination of Contract", "priceListsAndTariffs": "S&P LLC 'Berlio' - Price Lists and Tariffs", "workWithPrivateAccount": "S&P LLC 'Berlio' - Work with PA", "documentsForDownload": "S&P LLC 'Berlio' - Documents for Download", "systemRules": "S&P LLC 'Berlio' - Rules of the «BERLIO» Electronic Money Payment System", "plasticCardUsageRules": "S&P LLC 'Berlio' - Rules for using a plastic card", "nonResidentsSupport": "S&P LLC 'Berlio' - Services for non-residents of the Republic of Belarus", "tollRoads": "S&P LLC 'Berlio' - Toll Roads", "issuerRules": "S&P LLC 'Berlio' - Regulations of the BERLIO Electronic Money Payment System", "eMoneyRegulations": "S&P LLC 'Berlio' - Regulations for the Use of E-Money", "bicApp": "S&P LLC 'Berlio' - Berlio Internet Client", "bcpApp": "S&P LLC 'Berlio' - “BERLIOCARDPAY” App", "smartPayApp": "S&P LLC 'Berlio' - “SMARTPAY” App", "personalAccWebApp": "S&P LLC 'Berlio' - “Personal Account” App", "forPartners": "S&P LLC 'Berlio' - For Partners", "voiceRefService": "S&P LLC 'Berlio' - Voice Reference and Information Service", "loyaltyProgram": "S&P LLC 'Berlio' - Loyalty Programm", "forBankInfo": "S&P LLC 'Berlio' - For Bank", "detailedNews": "S&P LLC 'Berlio' - News Details", "privacy": "S&P LLC 'Berlio' - Privacy Policy" };
const departmentsPhone$1 = "Departments' Phones";
const allContacts$1 = "All Contacts";
const searchAzs$1 = "GS Search";
const personalAccount$1 = "Personal Account";
const customerService$1 = "Customer Service";
const backToHome$1 = "back home";
const companyName$1 = "S&P LLC “BERLIO”";
const minskName$1 = "Head Office";
const minskAddress$1 = "Minsk Region, Minsk, Bykhovskaya St. 55";
const minskFooterAddress$1 = "Bykhovskaya St. 55, Minsk, Belarus, 220007";
const minskShortAddress$1 = "Minsk, Bykhovskaya St. 55";
const inMinskCity$1 = "in Minsk";
const brestName$1 = "Brest Branch";
const brestAddress$1 = "Brest Region, Brest, Karl Marx St. 33-43";
const brestFooterAddress$1 = "Karl Marx St. 33, Office 43, Brest, Belarus, 224005";
const brestShortAddress$1 = "Brest, Karl Marx St. 33-43";
const inBrestCity$1 = "in Brest";
const vitebskName$1 = "Vitebsk Branch";
const vitebskAddress$1 = "Vitebsk Region, Vitebsk, Pravda St. 37, Building 2, Room 84";
const vitebskFooterAddress$1 = "Pravda St. 37, Building 2, Room 84, Vitebsk, Belarus, 210029";
const vitebskShortAddress$1 = "Vitebsk, Pravda St. 37, b.2-84";
const inVitebskCity$1 = "in Vitebsk";
const gomelName$1 = "Gomel Branch";
const gomelAddress$1 = "Gomel Region, Gomel, Rechitskaya St. 1A-419";
const gomelFooterAddress$1 = "Rechitskaya St. 1A, Office 419, Gomel, Belarus, 246017";
const gomelShortAddress$1 = "Gomel, Rechitskaya St. 1A-419";
const inGomelCity$1 = "in Gomel";
const grodnoName$1 = "Grodno Branch";
const grodnoAddress$1 = "Grodno Region, Grodno, Pobedy St. 17-7";
const grodnoFooterAddress$1 = "Pobedy St. 17-7, Grodno, Belarus, 230026";
const grodnoShortAddress$1 = "Grodno, Pobedy St. 17-7";
const inGrodnoCity$1 = "in Grodno";
const mogilevName$1 = "Mogilev Branch";
const mogilevAddress$1 = "Mogilev Region, Mogilev, Chelyuskintsev St. 105V";
const mogilevFooterAddress$1 = "Chelyuskintsev St. 105V, Mogilev, Belarus, 212003";
const mogilevShortAddress$1 = "Mogilev, Chelyuskintsev St. 105V";
const inMogilevCity$1 = "in Mogilev";
const smolenskName$1 = "LLC «BERLIO-CARD»";
const smolenskAddress$1 = "Smolensk region, Smolensk, Pamfilova st., 5, office 211";
const belarusName$1 = "Belarus";
const russiaName$1 = "Russia";
const aboutBerlio$1 = "About Berlio";
const forPartners$1 = "For Partners";
const forClients$1 = "For Clients";
const news$1 = "News";
const equipmentAndSoftware$1 = "Equipment and Software";
const contacts$1 = "Contacts";
const closeMenu$1 = "Close menu";
const noResult$1 = 'No results found for "{{query}}".';
const search$1 = "Search the site";
const appliedProgramsAndSoftware$1 = "Applied Programs and Software";
const webCenterBerlio$1 = "Web Center Berlio Software";
const oilAndCapital$1 = "Oil and Capital APP";
const selfServiceCashRegister$1 = "Self-service Cash Register for GS Chains";
const gasStationAutomationSystem$1 = "GS Automation System APP";
const invoiceWebsite$1 = "Invoice Website";
const usefulInformation$1 = "Useful Information";
const voiceInfoService$1 = "Voice Information Service";
const loyaltyProgram$1 = "Loyalty Program";
const downloadableDocuments$1 = "Downloadable Documents";
const berlioPaymentRules$1 = "Berlio E-Money Payment System Rules";
const bankInformation$1 = "Bank Information";
const electronicPaymentSystem$1 = "Electronic Payment System";
const contractConclusion$1 = "Contract Conclusion and Renewal";
const eCardReceipt$1 = "E-Card Receipt";
const eCardUsage$1 = "E-Card Usage";
const contractTermination$1 = "Contract Termination";
const ratesAndTariffs$1 = "Price List and Tariffs";
const personalAccountUsage$1 = "Personal Account Usage";
const fuelCardsAndGasStations$1 = "Fuel Cards and GS";
const gasStationsAndRoutes$1 = "GS and Routes";
const fuelCardUsage$1 = "Fuel Card Usage";
const tollRoads$1 = "Toll Roads (BelToll)";
const fuelPayment$1 = "Fuel Payment";
const regulatoryDocuments$1 = "Regulatory Documents";
const berlioEWalletRules$1 = "Berlio E-Money Rules (OJSC BelGazpromBank)";
const berlioUsageRegulations$1 = "Berlio E-Money Usage Regulations";
const servicesAndSoftware$1 = "Services and Software";
const berlioInternetClient$1 = "Berlio Internet Client App";
const berlioCardPayApp$1 = "BerlioCardPay App";
const smartPayApp$1 = "Smartpay App";
const clientCabinetSoftware$1 = "Client Cabinet Software";
const breadCrumbs$1 = { "home": "Home", "about": "About Berlio", "forPartners": "For Partners", "voiceRefService": "Voice Reference and Information Service", "loyaltyProgram": "Loyalty Program", "forBankInfo": "Information for Bank", "forClients": "For Clients", "signAndResign": "Signing and re-signing of the agreement", "gettingCard": "Receiving an electronic card", "dealResignation": "Termination of Contract", "priceListsAndTariffs": "Price Lists and Tariffs", "workWithPrivateAccount": "Work with Private Account", "documentsForDownload": "Documents for Download", "eMoneyRegulations": "Regulations for the Use of E-Money", "bicApp": "Application 'Berlio Internet Client'", "berlioCardPay": "Application 'BERLIOCARDPAY'", "smartPayApp": "Application 'SMARTPAY'", "personalAccWebApp": "Application 'Personal Account'", "news": "News", "detailedNews": "News Details", "equipment": "Equipment and Software", "webCenter": "Web Center Berlio Software", "oilAndCapital": "Oil and Capital APP", "selfServiceCheckout": "Self-service Checkout", "gsAutomationSystem": "Automation System for GS APP", "invoicesSite": "'Invoice Billing Site'", "invoicesSiteTariffs": "Tariffs for access to the «Berlio Info» API", "privacy": "Privacy Policy" };
const mainBlock$1 = { "companyName": "Company S&P LLC «BERLIO»", "headline": "Electronic payment system at gas stations", "tagline": "Use the electronic card «BERLIO» and refuel in just 3 minutes", "fuelCardUsage": "Additional Berlio fuel card usage", "belTollServices": "Allows you to pay for services in the BelToll system (toll road payments)", "nonResidentServices": "Services for non-residents of Belarus", "nonResidentSupport": "The company also supports clients from neighboring countries", "readMore": "Read more" };
const aboutBlock$1 = { "name": "Our Company", "alt": "S&P LLC «BERLIO» office", "description": "The company has been operating in the market of manufacturers and services since 1992. The number of locations accepting «BERLIO» cards for payment: 804 — Belarus, 379 — Russia" };
const systemSection$1 = { "name": "BERLIO System", "listTitle": "as well as", "listItem1": "Development and support of custom software; development, production, installation, and maintenance of equipment", "listItem2": "Information and technical support for clients using the BERLIO cashless payment system at gas stations, stores, and service facilities in Belarus", "listItem3": "Development, production, installation, and maintenance of management equipment for gas stations, service stations, toll points, stores, and other retail facilities", "listItem4": "Development, production, installation, and maintenance of equipment for electronic card payment systems", "alt1": "BERLIO logo on a stelа", "alt2": "Car refueling" };
const purposeSection$1 = { "name": "System Purpose", "description": "The system is designed for efficient cashless payments using electronic cards. The main components of the system are:", "cardTitle1": "Settlement Center", "cardTitle2": "Terminals", "cardTitle3": "Electronic Cards", "fuelDispenser": "Fuel Dispenser", "listTitle": "Using BERLIO cards, you can pay for:", "listItem1": "fuel", "listItem2": "gas", "listItem3": "kerosene", "listItem4": "groceries", "listItem5": "non-food items", "listItem6": "oils", "listItem7": "service stations", "listItem8": "vehicle inspection", "listItem9": "road toll in the BelToll system", "listItem10": "road toll in the PLATON system", "listItem11": "car wash", "listItem12": "vacuum cleaner", "listItem13": "parking", "listItem14": "Velcom and MTS services", "listItem15": "customs agent services" };
const cpsSection$1 = { "name": "Services for Clients and Partners", "listItem1": "Quick contract execution", "listItem2": "Cashless payment", "listItem3": "Timely accounting reports", "listItem4": "Use of electronic cards", "listItem5": "Ability to access provided services (fueling of all types of fuel, purchasing consumer goods, paying for services, road tolls) with a single electronic card", "listItem6": "Ability to restrict types of provided services (e.g., fueling only a specific type of fuel) on a client-designated electronic card", "listItem7": "Ability to limit daily or monthly fuel quotas on a client-designated electronic card, robust metallic case in the form of a key fob, one-year warranty, individual password, reliable protection against forgery", "forClients": "For Clients", "forPartners": "For Partners" };
const forPartnersMain$1 = { "title": "For Partners", "description": "Choose a section and explore the necessary information", "partnerInfo": { "title1": "Applications and Software", "title2": "Useful Information", "title3": "Join the System", "label1": "Software 'Web Center BERLIO'", "label2": "PPP 'Oil and Capital'", "label3": "Self-service checkout for gas station networks", "label4": "PPP 'Gas Station Automation System'", "label5": "Website for issuing invoices", "label6": "Voice reference information service", "label7": "Loyalty program", "label8": "Documents for download", "label9": "Rules of the BERLIO electronic money payment system", "label10": "Information for the bank" } };
const partnersAdvantages$1 = { "name": "Advantages for “BERLIO” Partners", "documentsCycle": "Online processing and full document cycle", "documentsCycleTagline": "we provide complete accounting and operate efficiently", "billPrint": "Fiscal receipt printing", "billPrintTagline": "the ability to print a fiscal receipt directly from the personal account", "location": "Convenient office location", "locationTagline": "easy to reach us: the office is a 4-minute walk from the “Kovalskaya Sloboda” metro station" };
const partners$1 = { "faq_title": "Frequently Asked Questions", "questions": { "question1": "How to become a partner?", "question2": "What is required to sign a contract?", "question3": "What are the benefits for partners?", "question4": "How to get a reconciliation statement for fuel settlements?", "question5": "How to make a payment under the contract?" }, "answers": { "answer1": "This section contains information regarding this question.", "answer2": "This section contains information regarding this question.", "answer3": "This section contains information regarding this question.", "answer4": "This section contains information regarding this question.", "answer5": "This section contains information regarding this question." } };
const voiceRefServiceMain$1 = { "name": "Voice Reference and Information Service", "descr1": "The Voice Reference and Information Service is designed to automate customer service in an organization. The program uses a voice fax modem to provide customers with a voice menu. The principle of working with customers is as follows: the customer calls the phone number connected to the modem or the incoming line number of the internal PBX. The modem picks up the phone, and the customer is offered a voice menu recorded by the client.\nFor example:", "descr2": "“Hello. You have called the reference and information service of the company 'BERLIO'. To check the balance under the contract, press '1'. To receive a sales report for the current month by fax, press '2'. To receive a sales report for the previous month by fax, press '3'. To connect with a manager, press '9'.”", "descr3": "The customer presses the corresponding digit on the telephone keypad to obtain the required information. Please note that the customer must enter all digits in tone mode. If the customer used pulse dialing to call the city number, they must press '*' before entering the first digit to switch the phone (fax) to tone dialing. The customer can enter all digits either during the pause or during voice messages.", "descr4": "The initial menu with a specific pause is repeated several times. The number of repetitions and the pause duration are determined in the program settings. If the customer does not press any digit within the specified time, they are connected to a manager (as if they had pressed '9'). If the pressed digit does not correspond to any function, the customer is informed, 'An incorrect choice has been made,' and the menu is repeated.", "descr5": "When selecting option '9', the customer is transferred to a manager. The manager's phone number is specified in the program settings. This option is only available during the specified time, for example, only on weekdays from 9:00 to 18:00.", "descr6": "When selecting option '1', the customer is prompted to enter a five-digit contract number, after which they are informed of the remaining funds on the contract. When selecting menu options '2' or '3', the customer is prompted to enter the contract number followed by the '#' key, after which a Sales Report for the current or previous period, respectively, is sent to the customer by fax.", "homeLink": "Home", "upLink": "Up" };
const loyaltyProgramMain$1 = { "name": "Loyalty Program", "descr1": "The loyalty program is designed to deploy a system for providing and accounting for discounts, as well as various promotions and bonus programs using loyalty cards: paper (with barcodes), plastic (with barcodes), electronic (chip-based, with magnetic stripes), and contactless cards.", "descrHeader2": "Key advantages of the program:", "descr2": { "item1": "speed and ease of use", "item2": "high reliability", "item3": "offline mode with offline data recording on the card ensures the loyalty program is available even at locations without a connection to the loyalty center, while guaranteeing that the customer does not overspend accumulated funds", "item4": "great flexibility in setting up various promotions", "item5": "over 100 reports with various groupings and filters", "item6": "a high level of security at all stages of system interaction ensures transaction safety. 'Family Card' — the ability to issue an unlimited number of additional cards with a single card account (e.g., when a husband, wife, and children use one card account). In this case, all loyalty program transactions are processed through the main card's account, while any of the additional cards can be used for customer identification" }, "descrHeader3": "Advantages of using contactless electronic cards:", "descr3": "Longer card lifespan, as contactless payments naturally result in less wear and tear. Convenience and speed of payment at gas stations, cafes, supermarkets, etc. Cards and readers are well-protected against fraud.", "descr4": "Firstly, the cards have internal password protection (separately for writing and reading data), with the password set not for the entire card but for each segment (there can be up to 10 segments on a 'Mifare 1K' card), allowing some information to be protected from both reading and writing, and some only from writing.", "descr5": "Secondly, card readers of our production do not record the transmitted information directly onto the card. All information is first encrypted and only then written to the card in encrypted form. Additionally, random data, card identifiers (written by the manufacturer and unchangeable), and calculated control values are mixed into the information. Moreover, the card maintains additional control counters that must change according to a predefined algorithm whenever data is modified, ensuring that even identical operations with the card produce completely different data and control values each time.", "descr6": "All this eliminates any possibility of duplicating the card or altering its information (any such operations will render the card invalid due to mismatched control codes during decryption).", "descr7": "Similarly, it is impossible to alter data during the interaction between the computer and the reader. Communication lines never transmit the actual data, only their encrypted representation mixed with random data and calculated control values. Even identical operations have completely different representations each time, meaning that even if data is replicated and the exchange is simulated, the system will consider all data invalid!", "descr8": "Similarly, all communications with the loyalty center, offline systems, and gas station management systems are encrypted and subject to additional controls. Additionally, during contactless payments, the card remains in the customer's hands, reducing the risk of unauthorized manipulation by staff.", "descrHeader9": "Program usage options:", "descr9": { "item1": "discount cards — providing customers with various discounts expressed as a percentage of the purchase amount", "item2": "bonus cards — similar to discount cards, but instead of a discount, the customer receives a bonus for their purchases. The bonus can be anything, limited only by your imagination. Most often, bonuses are converted into monetary equivalents or the products offered, such as liters of fuel, etc. One usage option is crediting unclaimed change to the customer's card", "item3": "electronic wallets — an electronic alternative to paper vouchers, with the ability for multiple uses and online addition/redistribution of amounts/liters on the card", "item4": "multi-functional cards — for example, discount cards with additional bonus accumulation for promotions", "item5": "incentive program — allows increasing or decreasing a customer's bonuses based on their activity (either in monetary terms through prepayment or status changes, or in goods, such as gifts or the ability to acquire a specified quantity of goods or services free of charge). Additionally, similar increases and deductions can be made based on the purchase of a certain quantity or value of goods and services", "item6": "prize program — allows raffling various prizes among program participants (either in monetary terms through prepayment or status changes, or in goods, such as gifts or the ability to acquire a specified quantity of goods or services free of charge)" }, "homeLink": "Home", "upLink": "Up" };
const forBankInfoMain$1 = { "name": "Our Company", "system": "Electronic payment system at gas stations", "systemTagline": "use the electronic card 'BERLIO' and refuel in 3 minutes", "usage": "Usage of fuel cards", "usageTagline": "allows you to pay for services in the BelToll system (payment for toll roads)", "nonResident": "Services for non-residents of the Republic of Belarus", "nonResidentTagline": "the company also supports clients from neighboring countries", "readMore": "Read more" };
const forBankInfoContact$1 = { "address": "Address", "phone": "Phone", "forOrganizations": "Corporate email", "forClientInquiries": "For client inquiries", "readMore": "All contacts" };
const forBankInfoDoc$1 = { "name": "Documents", "description": "The issuing bank of S&P LLC 'BERLIO' is OJSC 'Belgazprombank'", "headline": "Regulations for the use of electronic money 'BERLIO'", "cardTitle1": "Rules of OJSC 'Belgazprombank'", "cardTitle2": "Rules of the electronic money payment system 'BERLIO'", "homeLink": "Home", "upLink": "Up" };
const forClientsMain$1 = { "title": "For Clients", "description": "Choose a section and explore the necessary information", "clientInfo": { "title1": "Electronic Payment System", "title2": "Fuel Cards and Gas Stations", "title3": "Regulatory Documents", "title4": "Services and Software", "label1": "Contract Conclusion and Renewal", "label2": "Obtaining an Electronic Card", "label3": "Using the Electronic Card", "label4": "Contract Termination", "label5": "Price List and Tariffs", "label6": "Working with the Personal Account", "label7": "Documents for Download", "label8": "Gas Stations and Routes", "label9": "Using Fuel Cards", "label10": "Toll Roads (BelToll)", "label11": "Fuel Payment", "label12": "Electronic Money 'BERLIO' by OAO 'Belgazprombank'. Rules", "label13": "Regulations for the Use of Electronic Money 'BERLIO'", "label14": "App 'Berlio Internet Client'", "label15": "App 'BERLIOCARDPAY'", "label16": "'Smartpay' App", "label17": "Self-Service Kiosk for Gas Station Networks", "label18": "Software 'Personal Account Client'" } };
const clientsAdvantages$1 = { "name": "Advantages for “BERLIO” Clients", "customerService": "24/7 Customer Service", "customerServiceTagline": "prompt technical support for clients at any time of the day", "dealSign": "Online contract signing", "dealSignTagline": "or at the office, a 4-minute walk from the “Kovalskaya Sloboda” metro station", "personalCabinet": "Multifunctional personal account", "personalCabinetTagline": "supported by many gas stations in Belarus and offers rich functionality" };
const clients$1 = { "faq_title": "Frequently Asked Questions", "questions": { "question1": "How to become a client?", "question2": "What is required to sign a contract?", "question3": "How to register an on-board device?", "question4": "What is the procedure for blocking/unblocking an on-board device?", "question5": "How to make a payment under the contract?" }, "answers": { "answer1": "This section contains information regarding this question.", "answer2": "This section contains information regarding this question.", "answer3": "This section contains information regarding this question.", "answer4": "This section contains information regarding this question.", "answer5": "This section contains information regarding this question." } };
const signAndResignMain$1 = { "name": "Service in the electronic payment system 'BERLIO'", "description": "The electronic payment system 'BERLIO' (hereinafter referred to as the 'BERLIO' payment system) is a community of users: Participants and Clients interacting according to established rules.", "purposeBeforeLink": "The purchase and payment for petroleum products, goods, works, and services are carried out at the ", "purposeLink": "trade and service facilities (TSFs) ", "purposeAfterLink": "of the 'BERLIO' payment system using 'BERLIO' electronic money with the use of:", "list1": { "item1": "BERLIO electronic cards;", "item2": "BERLIO plastic electronic cards;", "item3": "other identification information carriers;", "item4": "or their virtual equivalents" }, "participants": "Participants of the 'BERLIO' payment system (payment service providers)", "operator": "Operator", "operatorTagline": "S&P LLC 'BERLIO'", "agents": "Agents", "agentsTagline": "organizations servicing their own Clients using the 'BERLIO' payment system, may have TSFs", "emissioner": "Issuer", "emissionerTagline": "OJSC 'Belgazprombank'", "tradeAndServiceObject": "TSF", "tradeAndServiceObjectTagline": "trade and service facilities (gas stations, service stations, car washes, etc.)", "serviseCenter": "SC", "serviseCenterTagline": "service center", "customerService": "Client servicing is carried out on the basis of:", "list2": { "item1": "an agreement of joining the 'BERLIO' electronic payment system servicing – with the Operator (Operator's SC)", "item2": "an agreement for opening and servicing an electronic wallet, purchasing electronic money – with the Issuer (Settlement Center)" }, "systemUsage": "The use of the 'BERLIO' payment system is carried out upon the availability of original documents from the Client:", "list3": { "item1": "application for joining;", "item2": "agreement with the Issuer;", "item3": "other agreements (according to the services requested by the Client);" }, "documentsTitle": "Documents (LPSA) of 'BERLIO' payment system participants for review", "operatorDocumentsTitle": "Operator's documents", "cardTitle1": "Rules of the operator of the 'BERLIO' electronic payment system", "cardTitle2": "Rules for servicing in the 'BERLIO' electronic payment system", "cardTitle3": "Agreement of joining the servicing in the 'BERLIO' electronic payment system", "emissionerDocumentsTitle": "Issuer's documents", "cardTitle4": "Rules of the issuer of 'BERLIO' electronic money", "cardTitle5": "Agreement for opening and servicing an electronic wallet", "footer": "Agreements are concluded based on the standard forms established by the participants of the 'BERLIO' payment system" };
const signAndResignSection$1 = { "name": "Re-signing / Signing a Contract", "description": "Due to changes in legislation in the field of payment systems and aligning the standard forms of documents of the payment system 'BERLIO' (the System), Operator Rules, Service Rules, and the implementation of a new service technology, existing Clients are required to re-sign their service contracts. The re-signing and signing of the Participation Agreement is carried out under a new procedure.", "dropdown1": "Document Processing", "link": "independently", "selfSignList": { "item1": "perform pre-registration of the client on the website www.lkb.by: on the homepage, click the 'Pre-registration in the electronic payment system BERLIO' button", "item2": "familiarize yourself with the Client Registration Card (CRC), the terms and conditions of the Participation Agreement and documents (LNPAs) of the Participants of the 'BERLIO' payment system", "item3": "prepare the necessary document package for filling out the CRC and uploading scanned copies", "item4": "fill out the CRC:", "orderedItem1": "select the Service Center", "orderedItem2": "enter the UNP", "orderedItem3": "confirm the Client's agreement with the terms and conditions of the documents (LNPAs) by ticking 'Agree'. If there is no agreement/tick, the 'Continue' button will be unavailable. The service of existing Clients (Operator), who have not re-signed contracts, will be terminated unilaterally", "orderedItem4": "enter the details of the authorized person ('Master-phone') to perform legally significant actions in the personal account (PC) on the website www.lkb.by, the individual entrepreneur must provide their mobile phone number", "orderedItem5": "upload the requested documents for the Operator and Issuer according to the 'Document List' and CRC", "orderedItem6": "check the completeness and accuracy of the data, if inaccurate, edit them, and if there are empty fields, fill them in. If there is insufficient information to fill out, save the CRC by clicking 'Save', and you can continue filling it out on the homepage www.lkb.by by clicking the 'Pre-registration in the electronic payment system BERLIO' button and entering the UNP in the CRC field", "orderedItem7": "after completing the actions, click the 'Save' and 'Send' buttons for verification by the selected Service Center (initially chosen) to check compliance with the BERLIO payment system requirements", "orderedItem8": "wait for an SMS message to the 'Master-phone' confirming the pre-registration, which will be sent within 5 business days from the moment the documents are received by the Service Center (this period is valid during the re-signing of contracts and the transition to the new procedure) for further document formation and signing", "orderedItem9": "upon confirmation of pre-registration, proceed with registration in the personal account on the website www.lkb.by", "orderedItem10": "if pre-registration is rejected, contact the initially chosen Service Center to clarify the non-compliance", "orderedItem11": "form a Participation Application and Service Termination Agreement (for contract re-signing) in the personal account", "orderedItem12": "check in the Participation Application the presence of 'Agree' ticks (automatically set based on client data from the CRC)", "orderedItem13": "print the Participation Application and Service Termination Agreement (for contract re-signing), sign, and seal (if applicable)", "orderedItem14": "send the document(s) by postal mail or courier to the Operator for authentication/registration of the client in the 'BERLIO' payment system", "orderedItem15": "send the document package to the Issuer at the address: JSC 'Belgazprombank', Minsk, 60/2 Prititsky Street, office 301", "orderedItem16": "wait for an SMS message to the 'Master-phone' confirming registration and assigning the number and date of the Participation Agreement", "orderedItem17": "after receiving the SMS message, the contract re-signing process in the 'Berlio' electronic payment system is considered completed", "footer": "The Participation Application submitted and sent by the Client to the Operator's email or fax is not accepted", "secondaryFooter": "The status of the submitted documents can be checked in the personal account" }, "dropdown2": "Document Processing at the Operator’s Service Center", "customerServiceSignList": { "item1": "familiarize yourself with the terms and conditions of the Participation Agreement and documents (LNPAs) of the Participants of the 'BERLIO' payment system, CRC", "item2": "prepare, sign, and seal (if applicable) documents for the Issuer (contract details, agreement, etc., client questionnaire) according to the document list", "item3": "prepare the necessary document package for CRC and Participation Application. The requested documents may be provided in electronic form (scans on an electronic medium)", "item4": "contact the Operator’s Service Center located near the Client (head office or regional Service Centers)", "item5": "provide the necessary document package for CRC, Participation Application, and upload scans by the Service Center specialists", "item6": "sign, seal (if applicable) the Participation Application, Service Termination Agreement (for contract re-signing), provided by the Service Center specialists", "item7": "return 1 original copy to the Service Center specialist" }, "dealFact": "The fact of the client’s participation in the Participation Agreement is considered confirmed upon registration of the client in the 'BERLIO' payment system, and the signed Participation Application:", "dealFactList": { "item1": "the Participation Agreement number is the registration number of the Participation Application", "item2": "the Participation Agreement date is the registration date of the Participation Application", "item3": "the place of composition is the location of the Service Center selected by the Client during registration" }, "footer": { "beforeTel": "If you have any questions regarding contract signing, call our", "tel1": "head office", "betweenTels": "or the ", "tel2": "customer service department", "afterTel": " You can also call one of our branch offices in Belarus or our representatives in Russia." }, "contactsLink": "Our branches and contacts", "homeLink": "Home", "upLink": "Up" };
const gettingCardMain$1 = { "name": "Getting an Electronic Card", "applicationHeader": "The application for obtaining a 'BERLIO' electronic card is submitted:", "list1": { "item1": "by personal visit to the Operator's Service Center at the Client's location (head or regional service centers)", "item2": "by calling the customer service phone", "item3": "by sending an email to customer service:" }, "mailLink": "info@berlio.by", "applicationFooter": "You will receive an invoice for the required number of electronic cards. Payment for the electronic card is made to the settlement account of S&P LLC 'BERLIO' according to the issued invoice. The price of the electronic card is determined in accordance with the current price list. The electronic card is issued only after payment.", "documentsHeader": "Documents Required for Obtaining an Electronic Card", "supervisor": "The Supervisor Needs", "supList": { "item1": "an order appointing the supervisor", "item2": "a passport or driver's license", "item3": "a copy of the payment order with a bank mark (regardless of the presence of the 'Client-Bank' electronic system) - if the card is received on the day of payment" }, "notSupervisor": "Non-Supervisors Need", "notSupList": { "item1": "a power of attorney for receiving goods and materials", "item2": "a passport or driver's license", "item3": "a copy of the payment order with a bank mark (regardless of the presence of the 'Client-Bank' electronic system) - if the card is received on the day of payment" }, "documentsFotterPrimary": "When receiving an electronic card, the holder sets the card category (diesel, gasoline, fuel, or universal) and, if necessary, daily and/or monthly limits.", "documentsFotterSecondary": { "beforeLink": "Limits can also be set/changed and cards can be blocked/unblocked in the ", "afterLink": ", or by submitting a written request to the service department at the contract location." }, "lkbLink": "user's personal account", "homeLink": "Home", "upLink": "Up" };
const readerSVG$1 = { "enter": "Enter", "cancel": "Cancel", "return": " Return", "doze": "Doze", "menu": "Menu", "lang": "Lang", "massage1": "Enter your pin", "massage2": "and press 'Enter'" };
const dealResignationMain$1 = { "name": "Termination of Contract", "cardTitle1": "On Termination of Contract with S&P LLC 'BERLIO'", "cardTitle2": "On Termination of Contract with OJSC 'Belgazprombank'", "homeLink": "Home", "upLink": "Up" };
const priceListsAndTariffsMain$1 = { "name": "Price Lists and Tariffs", "cardTitle1": "Price List No. 03/2024 from 22.02.2024 (for residents)", "cardTitle2": "Price List No. 01/24 from 17.01.2024", "cardTitle3": "Price List 03/2022 from 17.03.2022 effective from 21.03.2022", "homeLink": "Home", "upLink": "Up" };
const workWithPrivateAccount$1 = { "name": "Working with the Private Account", "description": "The private account allows system users to independently view and edit contract information:", "list1": { "item1": "general data", "item2": "card list", "item3": "payment list", "item4": "transactions and balance for the current or previous month" }, "sections": "Private Account Sections", "information": "Information", "informationTagline": "contract date, address, phone, email, UNP, bank, organization’s settlement account, current contract balance", "payments": "Payments", "paymentsTagline": "list of contract payments for the current or previous month", "cardList": "Card List", "cardListTagline": "list of contract electronic cards with details such as number, issue date, status, fuel category, and calculated card balance", "report": "Sales Report", "reportTagline": "list of issued petroleum products, goods, and services under the contract’s electronic cards for the month", "balance": "Balance", "balanceTagline": "balance, turnover, and VAT under the contract for the current or previous month", "middleDescriptinon": "Data entry and information changes are carried out upon signing the relevant statement (original document):", "cardTitle1": "Statement", "lkbLink": "Go to Private Account", "homeLink": "Home", "upLink": "Up" };
const documentsForDownloadMain$1 = { "name": "Documents for Download", "boxesHeaders": { "applications": "Applications", "sampleLetters": "Sample Letters", "paymentOrders": "Payment Orders", "notifications": "Notifications" }, "app": { "cardTitle1": "For permission to edit data in the personal account on the website", "cardTitle2": "For debt repayment for legal entities", "cardTitle3": "On contract termination with OJSC 'Belgazprombank'" }, "letters": { "cardTitle1": "For registration of an onboard device", "cardTitle2": "On transferring a card from one contract to another (within the same company)", "cardTitle3": "On card restriction (service, arrest)", "cardTitle4": "On accepting a card from another company", "cardTitle5": "On transferring a card from another company", "cardTitle6": "On registering a vehicle with 4+ axles", "cardTitle7": "On correct payment designation", "cardTitle8": "For clarification of the card code", "cardTitle9": "On erroneous payment to the account of S&P LLC 'BERLIO'", "cardTitle10": "On contract termination with S&P LLC 'BERLIO'" }, "orders": { "cardTitle1": "Sample payment order (for Belarusian residents)", "cardTitle2": "Sample payment order (for non-residents of Belarus)" }, "notify": { "cardTitle1": "Digital Signature Notification" }, "homeLink": "Home", "upLink": "Up" };
const eMoneyRegulationsMain$1 = { "name": "Regulations for the Use of E-Money 'BERLIO'", "descriptionFirst": "As part of the service agreement within the BERLIO e-money payment system (hereinafter referred to as the 'System'), these regulations define the procedure for using BERLIO e-money.", "descriptionSecond": "Due to the established technological communication session schedule in the system (every business day) between processing centers and entities, the crediting of e-money to contracts and electronic cards is carried out as follows:", "descriptionThird": "When using access devices:", "descriptionOl": { "item1": "The customer transfers funds to the settlement account of Belagroprombank OJSC in accordance with the concluded agreement for the purchase of BERLIO e-money.", "item2": "The service provider credits the funds for the purchase of e-money to the customer's contract.", "item3": { "span": "E-money is distributed by the service provider as follows:", "header": "The customer's e-money balance in the system under the contract is divided into two parts per day:", "ulItem1": "- From 18:00 to 24:00, e-money can be used up to 50% of the total balance.", "ulItem2": "- From 24:00 to 18:00 the next day – the remaining 50%." }, "item4": "If the customer has multiple electronic cards under the contract, the e-money balance will be divided not only per day but also among all available cards in proportion to the daily quota.", "item5": "If a transaction was made using a specific electronic card on the current day, this amount reduces the calculated e-money balance for that card (for the current day).", "item6": "On weekends and/or public holidays, the customer's e-money balance in the system under the contract is divided into three parts.", "item7": "The purchase (use) of e-money can be made based on the calculated amount, taking into account (minus) the transactions performed on the current day using this card.", "item8": { "before": "Participants of the system are informed about planned maintenance breaks or technical failures in the system's software and hardware complex, as well as issues with telecommunication operators, through relevant notifications posted", "firstLink": " in the news", "between": " and in", "secondLink": " the client's personal account", "after": " indicating the expected resolution time." } }, "homeLink": "Home", "upLink": "Up" };
const bicAppMain$1 = { "name": "Application 'Berlio Internet Client'", "description": "S&P LLC 'BERLIO' offers its clients a fast and convenient way to access contract information using the 'Berlio Internet Client' mobile application.", "ulHeader": "The application provides full access to contract information:", "item1": "general contract information", "item2": "contract balance", "item3": "list of cards", "item4": "card details", "item5": "contract payments", "item6": "list of transactions", "item7": "electronic invoices", "stong1": "Information is available for the current and previous month. The app menu is intuitive and easy to navigate.", "stong2": "To use the mobile application, you must have a contract with S&P LLC 'BERLIO' for service in the 'BERLIO' electronic money payment system.", "stong3": "Install the mobile application on your phone. Use the same login and password as in your personal account to log in.", "stong4": "Our application is available for Android and iPhone users.", "cardTitle1": "Download from Play Market", "cardTitle2": "Download from Apple Store", "homeLink": "Home", "upLink": "Up" };
const newsBlock$1 = { "sortBy": "Sort by:", "name": "News", "newFirst": "Newest first", "oldFirst": "Oldest first", "backHome": "Back to Home" };
const paymentSystem$1 = { "name": "Electronic Payment System 'BERLIO'", "coverage": "The system is supported by 97% of gas stations in Belarus, as well as gas stations in Russia.", "cardDescription": "Payments for fuel, goods, and services are made using the BERLIO electronic card, which is a plastic card.", "actionSignContract": "Sign a contract", "gasStations": "Gas stations" };
const fuelCards$1 = { "name": "Fuel cards", "fuelCardsDescription1": "Payment for vehicle passage on toll roads", "fuelCardsDescription2": "Deposit cost of the electronic payment device (on-board unit)", "road": "Road", "cardTitle": "Issuance and use of fuel cards" };
const actualSection$1 = { "name": "Actual", "actualBlockTitle1": "List of gas stations without fees", "actualBlockDescription1": "Something needs to be written!", "actualBlockTitle2": "Prompt assistance upon request", "actualBlockDescription2": "Something needs to be written!", "actualBlockTitle3": "Network of gas stations and routes", "actualBlockDescription3": "Something needs to be written!" };
const newsSection$1 = { "title": "Latest news", "linkToNews": "News details", "prev": "left", "next": "right" };
const detailedNewsMain$1 = { "name": "News details", "notFound": "News not found", "backToNews": "Back to News", "date": "Date" };
const ourPartnersLogoSection$1 = { "name": "Our Partners", "mapLink": "GS List", "homeLink": "Home", "upLink": "Up" };
const ourClientsLogoSection$1 = "Our Clients";
const equipment$1 = { "name": "Equipment and Software", "descr1": "Below you can explore the equipment developed for clients and partners of S&P LLC «BERLIO»", "descr2": "Warranty obligations for servicing all installed equipment are valid for one year from the date of installation. Post-warranty maintenance is carried out under an additional agreement between the parties", "partnersSoftSection": { "name": "Software for BERLIO partners", "headline1": "Software “BERLIO Web Center”", "headline2": "Software Package “OIL AND CAPITAL”", "headline3": "Self-service checkout for gas station networks", "headline4": "Software Package “Gas Station Automation System”", "headline5": "Website for issuing invoices", "plate": "Microchip" }, "clientsSoftSection": { "name": "Software for BERLIO clients", "headline1": "Mobile application “BERLIOCARDPAY”", "headline2": "Self-service checkout for gas station networks", "headline3": "Software “Client Personal Account”", "homeLink": "Home", "upLink": "Up" } };
const webCenterMain$1 = { "name": "Software 'Web Center BERLIO'", "description": "The 'WebCenterBerlio' software (hereinafter referred to as WebCenter) is a network application hosted on a server, designed to manage interactions with clients using 'BERLIO' electronic/fuel cards for cashless payments. WebCenter allows for contract registration, card and On-Board Device (OBD) management, electronic wallets (EW) authorization, blocking/unblocking their usage at facilities, financial accounting, and statistical tracking of transactions within the 'BERLIO' electronic money payment system (hereinafter referred to as the System). It enables monitoring of financial flows within the System using EWs and electronic money (EM).", "list1": { "title": "ADVANTAGES OF WebCenter:", "item1": "WebCenter is a network application;", "item2": "Access to application data is available from any computer with network connectivity;", "item3": "Automatic application updates (upon launch);", "item4": "No need to maintain a dedicated server and data backup systems;", "item5": "Online technical support;", "item6": "Continuous project development, feature expansion based on customer requirements and the System's vision;", "item7": "Flexible report customization with various output formats;", "item8": "Qualified service support and timely updates of software and modules to current versions." }, "list2": { "title": "CORE FUNCTIONS FOR CLIENT MANAGEMENT:", "item1": "Signing service contracts with clients within the 'BERLIO' electronic money system;", "item2": "Card issuance tracking;", "item3": "Registering payment documents for contracts;", "item4": "Generating monthly reports;", "item5": "Automatic fund calculation on the card based on the client’s account balance;", "item6": "Generating informational and statistical reports." }, "list3": { "title": "CORE FUNCTIONS OF WEBCENTER FOR SYSTEM PARTICIPANTS, ", "subTitle": "settlement centers of other organizations, and facilities (trade and service points using card processing equipment):", "item1": "Configuration of centers, facilities, and devices;", "item2": "Receiving reports from centers and facilities;", "item3": "Analysis of centers and facilities." }, "homeLink": "Home", "upLink": "Up" };
const oilAndCapitalMain$1 = { "name": "Oil and Capital App", "list": { "title": "Program Description", "subTitle": "The software suite consists of the following programs:", "item1": "«OIL & CAPITAL. Loading» automates the workplace of the operator for loading petroleum products into tank trucks and railway tank cars;", "item2": "«OIL & CAPITAL. Tank Monitoring» provides real-time information about the status of each tank. The program receives this information from the level gauge;", "item3": "«OIL & CAPITAL. Accounting» automates the management of commodity and accounting records at facilities for petroleum product supply, gas supply, commodity bases, and wholesale warehouses, as well as the preparation of documents for ensuring and controlling the quality of petroleum products and gas;", "item4": "«OIL & CAPITAL. Truck Scales. Railway Scales» allows receiving information from electronic truck and railway scales, notifying the operator about the presence of a vehicle on the scales;", "item5": "«OIL & CAPITAL. Chemical Laboratory» is designed to automate the document flow of chemical analysis laboratories for oil, petroleum products, and liquefied hydrocarbon gases." }, "homeLink": "Home", "upLink": "Up" };
const selfServiceCheckoutMain$1 = { "name": "Self-Service Checkout", "descriptionFirst": "Automation of retail processes is one of the most relevant trends of recent times. This trend has also reached gas station networks. Automation allows solving problems in several areas, primarily by providing a wide range of functions for customers and optimizing the work of staff at gas stations.", "descriptionPreBold": "To address these challenges, S&P LLC 'BERLIO' offers a new software product for gas station networks – ", "descriptionBold": "self-service checkout (hereinafter referred to as SSC).", "descriptionSecond": "What is an SSC? What are the advantages of using these systems, and what opportunities do they open up for gas station users?", "list1": { "supDescription": "SSC is a hardware-software complex designed for independent payment of fuel and related goods by customers without involving a gas station operator. The main capabilities of SSC include:", "item1": "payment for fuel and related goods using cashless payment methods: bank cards, 'Berlio' cards, 'Oplati' and 'Cashew' payment systems (contact/contactless);", "item2": "use of loyalty cards, promo codes, and points;", "item3": "payment for fuel and services provided at the gas station (vacuuming, car wash, etc.);", "item4": "payment for coffee and fast food;", "item5": "placement of advertising." }, "descriptionThird": "S&P LLC 'BERLIO' offers a full range of services for the integration and deployment of SSC, as well as technical support and consultation for gas station network specialists. Each implementation project is adapted to the customer's specific features, requirements, and needs – both in terms of technical support and pricing for the work.", "descriptionFourth": "Technically, SSC consists of three main modules: a management and product data processing module, a payment module (including the function of accepting bank cards and loyalty cards), and control scales that ensure weighing accuracy and prevent customer fraud during payment.", "list2": { "supDescription": "What tasks can SSC solve at gas stations:", "item1": "optimization of labor costs and reduction of workload on gas station staff. Self-service checkouts can significantly increase the throughput of gas stations without hiring additional employees, who can be assigned to other tasks;", "item2": "reduction of queues. The increase in the number of customers on weekends and during peak hours not only puts extra pressure on the checkout but also leads to customer dissatisfaction. Installing SSC reduces queues by 15-20%, even during periods of high activity;", "item3": "fast checkout and reduced risk of errors. Modern technologies ensure high accuracy of SSC. The software ensures correct product recognition in fractions of a second, and any delays or incorrect product selections by the customer are resolved almost instantly;", "item4": "ergonomic use of fuel station retail space. Even several self-service checkouts occupy approximately the same space as one traditional checkout, allowing for more efficient use of retail space;", "item5": "increased sales and customer loyalty. Today, retail customers prefer to buy quickly – while having accurate and detailed information about what they are purchasing. SSC can meet all these needs, attracting more visitors;", "item6": "SSC can be used as an affordable and convenient platform for placing contextual advertising (static images, video clips, etc.).", "subDescription": "Today, we can confidently say that the demand for SSC will grow in the near future. Automated retail equipment demonstrates broad capabilities in all aspects of retail – from creating comfortable conditions for customers to significantly increasing sales." }, "homeLink": "Home", "upLink": "Up" };
const gsAutomationSystemMain$1 = { "name": "«Gas Station Automation System App»", "supTitle": "Application Software Package", "subTitle": "Program Description", "descriptionFirst": "The «Gas Station Automation System» application software package is a new project by S&P LLC “BERLIO”, designed to address tasks related to managing a network of fuel stations at various levels. The software is implemented as a multi-level system, enabling remote management of fuel stations from the company’s office, monitoring processes at fuel stations, real-time data transmission and retrieval, task distribution, and updating information at fuel stations, automation of managers’ and operators’ workstations at fuel stations, and much more.", "descriptionSecond": "The App is implemented on a fundamentally new software platform with the capability for rapid deployment, maintenance, and scaling.", "list1": { "title": "UPPER LEVEL", "firstSubTitle": "Level ", "firstSubTitleBold": "«Management»", "secondSubTitleBold": "«Office» Software ", "secondSubTitle": "provides the following tasks from the company’s office:", "item1": "centrally generate and send fuel and service prices to fuel stations;", "item2": "receive currency rates from the National Bank of Belarus, recalculate fuel and service prices, and send them to fuel stations;", "item3": "manage payment methods;", "item4": "manage operator access (add operators, block them);", "item5": "receive real-time information on receipts and sales, tank data;", "item6": "view receipts, documents, and «Z-reports» sent to the SKKO;", "item7": "receive up-to-date product balances;", "item8": "manage media advertising on monitors at fuel stations (upload media files, set playback priority and frequency, track playback statistics).", "imageTitle": "General Scheme of App", "imageAltAndTitle": "General Scheme of App" }, "list2": { "firstSubTitle": "Level ", "firstSubTitleBold": "«Maintenance»", "secondSubTitleBold": "«CTS» Software ", "secondSubTitle": "provides real-time monitoring and maintenance of fuel stations, management of fuel station configurations, viewing system error logs, updating software and databases, and performing data backups." }, "list3": { "title": "LOWER LEVEL", "firstSubTitle": "Level ", "firstSubTitleBold": "«Management»", "secondSubTitleBold": "«Fuel Station Server» Software ", "secondSubTitle": "ensures interaction with the database at the fuel station and external data storage: «Office» software, «CTS» software (with the possibility of working with cloud resources), synchronization of workstations, transmission of equipment control commands at the fuel station (fuel dispensers, vacuum cleaners, car washes, self-service terminals, and other equipment), fuel dispensing via a mobile application («SmartPay» service)." }, "list4": { "firstSubTitle": "Level ", "firstSubTitleBold": "«Manager»", "secondSubTitleBold": "«Manager» Software ", "secondSubTitle": "ensures fuel reception, allows for product accounting, adjustment of fuel parameters in tanks, adjustment of fuel dispenser counters, management of operator access to cash operations, viewing shift statistics, and generating reports." }, "list5": { "firstSubTitle": "Level ", "firstSubTitleBold": "«Operator»", "secondSubTitleBold": "«Operator» Software ", "secondSubTitle": "ensures the sale of fuel, goods, and services at fuel stations for various payment methods, performs cash operations: receipt cancellation, return of goods (services) and fuel, cash deposit and withdrawal, interaction with cash equipment (receipt printers, bank and fuel terminals, scales, barcode (QR-code) scanners, customer displays, etc.), indication of equipment status at fuel stations, report generation, and viewing data necessary for the operator." }, "list6": { "firstSubTitle": "Level ", "firstSubTitleBold": "«Infrastructure»", "secondSubTitleBold": "Tasks addressed:", "item1": "support for advanced fuel station infrastructure:", "item2": "displaying information about fuel station operations (fuel dispensing, order readiness, advertising);", "item3": "license plate recognition and transmission to the automated control system;", "item4": "management of fuel price displays;", "item5": "monitoring the operation of equipment at fuel stations;", "item6": "receiving and processing electronic invoices from oil depots, etc." }, "list7": { "title": "MAIN NEW FEATURES INCLUDE:", "item1": "Flexible and configurable workstation and server configurations, allowing for equal operator workstations with the ability to set priorities for processing receipts when fuel dispensers are activated via reading devices, production of S&P LLC «BERLIO», and payment via mobile applications;", "item2": "Configurable setup with a dedicated server computer, reducing the load on workstations, ensuring database backup, and optimizing background tasks on the server, ultimately eliminating fuel station downtime;", "item3": "Ability to dispense fuel using various modes: «Prepayment», «Postpayment», «Full Tank»;", "item4": "Implementation of sales only in «Receipt Formation» mode, allowing the operator to clearly see the receipt details (total amount, total discount, and discount per item), with no need to re-form the receipt in case of payment cancellation;", "item5": "Ability for the operator to queue multiple receipts. This functionality allows postponing a formed receipt and starting a new one for the next customer in line if the current customer forgets their payment card or steps away for other items;", "item6": "Support for various cash register platforms: fiscal registrar «TFP-115», «TFP-116», «TFP-118», software cash register «iKASSA»;", "item7": "New payment methods: mixed payment (cash + bank card + certificates + gift cards), payment via mobile applications, payment via various payment systems («Oplati», «Cashew»). Adding new payment methods is implemented as a separate module, significantly reducing the time to implement new functionality;", "item8": "Integration with a loyalty program;", "item9": "Touch control in various display modes;", "item10": "Primary receipt formation mode: «Receipt Before Refueling»;", "item11": "Primary mode of operation for «Berlio» cards – «Online»;", "item12": "Ability for the operator to create product groups for adding them to the receipt with a single click (combined products);", "item13": "Ability to dispense cash via bank card;", "item14": "Ability to reconcile reports and receipts with SKKO;", "item15": "Ability to process transactions through the «Calculation» system – an automated information system for a unified settlement and information space (AIS ERIP);", "item16": "Ability to configure printing additional receipts alongside the main receipt;", "item17": "Automated retrieval of full data from level gauges via TCP-IP protocols, allowing for quick response to fuel shortages;", "item18": "Implementation of «Full Tank» refueling via deferred sales, increasing fuel station throughput; and much more." }, "homeLink": "Home", "upLink": "Up" };
const invoicesSiteMain$1 = { "name": "Electronic Invoice Issuance Website", "siteLink": "https://эсчф.бел", "altAndTitle": "interface https://эсчф.бел", "description": "The website for issuing electronic invoices (E-Invoices) is designed to automate the issuance of E-Invoices for clients, legal entities, and individual entrepreneurs, allowing them to independently submit applications for E-Invoice issuance based on an existing cash receipt.", "list1": { "title": "Main features for clients:", "listItem1": "independent preparation of applications for E-Invoice issuance via the website using a cash receipt;", "listItem2": "control over submitted applications (viewing information on the processing status of E-Invoices by the tax authority portal);", "listItem3": "grouping all applications on the website with flexible search and filtering options, as well as exporting to external programs." }, "list2": { "title": "Main features for companies:", "listItem1": "reducing labor costs for preparing and issuing client E-Invoices based on cash receipts;", "listItem2": "reducing employee workload (as clients handle everything independently);", "listItem3": "monitoring submitted E-Invoice applications and managing portal users;", "listItem4": "ability to place advertising banners on the website;", "listItem5": "automatic notifications for selected events (e.g., submission of applications for E-Invoice issuance for a closed period);", "listItem6": "ability to send newsletters to clients who have given their consent (news, legislative changes, etc.)." }, "list3": { "title": "Working with the website: key functions and features:", "listItem1": "Website login - authorization is performed via email and password;", "listItem2": "Portal user registration, which requires the following details:", "listItem2Details": { "item1": "email address;", "item2": "password for portal access;", "item3": "UNP (payer registration number) of the organization;", "item4": "phone number - user's contact number for E-Invoice-related inquiries." }, "listItem3": "Viewing applications (application details):", "listItem3Details": { "item1": "'Application Number' (#) – sequential application number on the portal. Applications are numbered separately for each organization (UNP);", "item2": "'Application Date' - date of application registration on the portal;", "item3": "'Gas Station' - internal number of the trading entity (gas station) within the seller's organization;", "item4": "'Receipt Date' - date and time of purchase;", "item5": "'Receipt Number' (#) - purchase receipt number;", "item6": "'SKNO Number' - trade operation number registered with the tax authority using SKNO (tax control tool);", "item7": "'Product/Service' - name of the product, service, or item according to the receipt;", "item8": "'Payment Method' - cash, bank card, etc.;", "item9": "'Price' - price of the product, item, or service in BYN;", "item10": "'Quantity' - quantity of the product, item, or service in relevant units of measurement;", "item11": "'Total Cost' - cost of the product, item, or service in BYN;", "item12": "'Discount' - discount amount in BYN for this item;", "item13": "'VAT' - value-added tax amount in BYN for this item;", "item14": "'%VAT' - VAT rate in percentage for this item;", "item15": "'E-Invoice Number' - number of the electronic invoice after issuance;", "item16": "'E-Invoice Issuance Date' - date the electronic invoice was issued;", "item17": "'Seller Enterprise' - name of the trading enterprise where the purchase was made;", "item18": "'UNP' - Payer Registration Number of the trading enterprise where the purchase was made;", "item19": "'Address' - legal address of the trading enterprise where the purchase was made;", "item20": "'Code' - numeric code of the electronic invoice status;", "item21": "'E-Invoice Status' - textual description of the invoice status." } }, "list4": { "listItem1": "Application search.", "listItem2": "Filters.", "listItem3": "Adding an application.", "listItem4": "Copying an application.", "listItem5": "Canceling an application.", "listItem6": "Refreshing the application list.", "listItem7": "Printing applications." }, "list5": { "title": "Exporting applications to a file:", "subTitle": "The E-Invoice portal supports application export in the following formats:", "listItem1": "'WORD' (Microsoft Word Document - DOCX)", "listItem2": "'EXCEL' (Microsoft Excel Document - XLSX)", "listItem3": "'PDF' (PDF Document: can be viewed using Adobe Reader, Foxit Reader, Microsoft Word, etc.)", "listItem4": "'CSV' (CSV Document: can be viewed in Microsoft Excel, imported into external programs such as '1C', etc.)", "listItem5": "'XML' (XML Document: can be imported into external programs such as '1C', etc.)", "listItem6": "'JSON' (JSON Document: can be imported into external programs such as '1C', etc.)" }, "list6": { "title": "Contract signing and supply conditions:", "firstSubTitle": "The service operates using the API interface 'APIBerlioInfo', which functions online.", "secondSubTitle": "Service connection cost:", "listItem1": "Website license - 1,420.00 BYN excluding VAT (one-time payment, service price may change, check with the manager). Supply is made under a license agreement.", "listItem2": "Use of the API interface 'APIBerlioInfo' (monthly payment). Connection is made under a separate contract with monthly payment according to the price list." }, "list7": { "title": "Tariff plans for API 'Berlio Info' access:", "subTitle": "Price list" }, "list8": { "title": "ADDITIONALLY:", "firstSubTitle": "Deploying a website under your company name. For example,", "colorSpan": "'company.эсчф.бел'", "secondSubTitle": "Printing information about the E-Invoice issuance website on gas station receipts." }, "homeLink": "Home", "upLink": "Up" };
const invoicesSiteTariffsMain$1 = { "name": "API «Berlio Info»", "description": "The «API «Berlio Info»» software is an online-mode programming interface that allows users to request information about the status of a contract (fuel cards) and all processed payments. Upon the user's request, any contract-related information can be configured for retrieval.", "strongDescription": "The «API «Berlio Info»» is available to all users who have signed a service agreement with the «Berlio» electronic money system.", "list": { "title": "Key tasks addressed:", "listItem1": "retrieving a list of clients;", "listItem2": "obtaining client information;", "listItem3": "retrieving a list of cards under the contract;", "listItem4": "obtaining balance and turnover data for any given month/period;", "listItem5": "generating a list of client transactions and payments;", "listItem6": "exporting data to various accounting systems in formats (XML, JSON);", "listItem7": "retrieving information in «Online» and «24/7» modes, etc.", "ps": "The full list of available requests can be viewed on the service website:" }, "wrapper1": { "title": "API Connection", "subTitle": "To gain access to the «API «Berlio Info»» interface, please submit a formal request on company letterhead, indicating the organization's name and contract number. Send requests to the following address:" }, "serviceCardHeader": "Tariff plans for access to the «API «Berlio Info» interface", "cardTitle1": "Tariffs for access to «API «Berlio Info»", "wrapper2": { "title": "API Connection Guide", "cont1": { "title": "Requirements for API Connection", "subTitle": "Requirements", "listItem1": "Access to the «API «Berlio Info»» (hereinafter referred to as the API) is only available to clients who have signed a service agreement with the «Berlio» electronic money system.", "listItem2": "Before using the API, review the Price List for access services.", "listItem3": "To request API access, send a written application to enable this service under the contract." }, "cont2": { "title": "API Connection Procedure", "subTitle": "Connection", "listItem1": "Upon receiving the API access request, the client will be provided with a token for calling API methods.", "listItem2": "The expandable list of API methods is available at:", "listItem3": "The client independently develops their own software to access the API." }, "cont3": { "title": "Payment for API Access", "subTitle": "Payment", "listItem1": "Fees are deducted monthly from the contract as a lump sum based on the total number of requests made during the month, according to the Price List.", "listItem2": "After each API call (request), the service cost is calculated, and the deduction amount is adjusted accordingly." } }, "homeLink": "Home", "upLink": "Up" };
const berlioCardPayMain$1 = { "name": "Application “BERLIOCARDPAY”", "description": { "title": "BerlioCardPay", "subTitle": "Mobile application «BerlioCardPay» for legal entities and gas station networks working with “BERLIO” electronic money.", "listTitle": "Application features:", "item1": "“BERLIO” electronic cards in your mobile phone;", "item2": "linking electronic cards to the application via personal account", "item3": "real-time fueling statistics;", "item4": "refueling with a virtual card without leaving your car." }, "homeLink": "Home", "upLink": "Up" };
const smartPayAppMain$1 = { "name": "“SMARTPAY” Application", "description": { "title": "Program Description", "subTitle1": "The «SmartPay» software is a fuel payment system at gas stations via a mobile application.", "subTitle2": "The software is a service-oriented application complex that enables payment and activation of fuel dispensers at gas stations through a mobile application, without operator involvement.", "listTitle": "The «SmartPay» software consists of two parts:", "item1": "«SmartPayClient» (installed at the Customer's gas station);", "item2": "«SmartPayServer» (installed at the Developer's office server).", "ps": "The interaction between the «SmartPay» software and the mobile application is carried out through the Customer's server in accordance with the protocol provided by the Developer." }, "homeLink": "Home", "upLink": "Up" };
const personalAccWebAppMain$1 = { "name": "“Customer Personal Account” Software", "description": { "title": "Program Description", "subTitle": "The «Customer Personal Account» software is designed to provide customers with necessary information about their account, cards, transactions, payments, as well as card management, downloading report documents, and connecting additional services.", "listTitle": "Key tasks addressed:", "item1": "viewing current account status information;", "item2": "viewing and editing card data, setting card limits;", "item3": "receiving report information on transactions (including lists of e-invoices submitted to the tax inspectorate portal), payments, turnovers and balances for various periods;", "item4": "connecting various services (balance notifications, SMS and Email alerts, toll road payments, ordering fuel cards from other operators, mobile top-ups, and others)." }, "homeLink": "Home", "upLink": "Back to top" };
const privacyMain$1 = { "name": "Data Processing Policies", "cookieConsentPolicy": "Cookie Policy", "buyersPrivacy": "Personal Data Processing Policy for Buyers", "b2bPrivacy": "Personal Data Processing Policy for Customer Representatives", "applicantsPrivacy": "Personal Data Processing Policy for Job Applicants" };
const telFax$1 = "(tel / fax)";
const fax$1 = "(fax)";
const forOrganizations$1 = "For Organizations";
const forClientInquiries$1 = "For Client Inquiries";
const technicalSupport$1 = "Technical Support";
const ourBranchesAndContacts$1 = "Our Branches and Contacts";
const workingHours$1 = "Mon - Thu: 08:30 AM - 05:30 PM";
const fridayWorkingHours$1 = "Fri: 08.30 AM - 04.15 PM";
const daysOff$1 = "Sat - Sun: Day Off";
const rulesOfUse$1 = "Rules of Use";
const offerAgreement$1 = "Offer Agreement";
const privacy$1 = "Privacy Policy";
const help$1 = "Help";
const copyright$1 = "© {{year}} S&P LLC “BERLIO”";
const enContent = {
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
  forPartners: forPartners$1,
  forClients: forClients$1,
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
  copyright: copyright$1
};
const pageTitles = { "/": "НП ООО «БЕРЛИО»", "home": "НП ООО «БЕРЛИО» - Главная", "about": "НП ООО «БЕРЛИО» - О Берлио", "contacts": "НП ООО «БЕРЛИО» - Контакты", "news": "НП ООО «БЕРЛИО» - Новости", "equipment": "НП ООО «БЕРЛИО» - Оборудование и ПО", "webCenter": "НП ООО «БЕРЛИО» - “Веб Центр БЕРЛИО”", "oilAndCapital": "НП ООО «БЕРЛИО» - ППП “НЕФТЬ И КАПИТАЛ”", "selfServiceCheckout": "НП ООО «БЕРЛИО» - Касса самообслуживания", "gsAutomationSystem": "НП ООО «БЕРЛИО» - ППП “Система автоматизации АЗС”", "invoicesSite": "НП ООО «БЕРЛИО» - “Сайт для выставления счетов-фактур”", "invoicesSiteTariffs": "НП ООО «БЕРЛИО» - Тарифы “API BERLIO-INFO”", "forClients": "НП ООО «БЕРЛИО» - Для клиентов", "serviceInEPS": "НП ООО «БЕРЛИО» - Обслуживание в ЭПС  «Берлио»", "signAndResign": "НП ООО «БЕРЛИО» - Заключение и перезаключение договоров в ЭПС «Берлио»", "forFuelPayments": "НП ООО «БЕРЛИО» - Оплата товаров (работ, услуг)", "gettingElectronicCard": "НП ООО «БЕРЛИО» - Получение электронной карты", "cardUsageRules": "НП ООО «БЕРЛИО» - Правила пользования электронной картой", "dealResignation": "НП ООО «БЕРЛИО» - Расторжение договора", "priceListsAndTariffs": "НП ООО «БЕРЛИО» - Прейскуранты и тарифы", "workWithPrivateAccount": "НП ООО «БЕРЛИО» - Работа в ЛК", "documentsForDownload": "НП ООО «БЕРЛИО» - Документы для скачивания", "systemRules": "НП ООО «БЕРЛИО» - Правила платежной системы электронных денег «Берлио»", "plasticCardUsageRules": "НП ООО «БЕРЛИО» - Правила пользования топливной картой", "nonResidentsSupport": "НП ООО «БЕРЛИО» - Услуги в отношении нерезидентов РБ", "tollRoads": "НП ООО «БЕРЛИО» - Платные дороги", "issuerRules": "НП ООО «БЕРЛИО» - Правила платежной системы электронных денег «Берлио»", "eMoneyRegulations": "НП ООО «БЕРЛИО» - Регламент использования электронных денег", "legislation": "НП ООО «БЕРЛИО» - Законодательство", "reportIFR": "НП ООО «БЕРЛИО» - Отчет об оценке ИФР", "bicApp": "НП ООО «БЕРЛИО» - Берлио интернет клиент", "bcpApp": "НП ООО «БЕРЛИО» - Приложение “BERLIOCARDPAY”", "smartPayApp": "НП ООО «БЕРЛИО» - Приложение “SMARTPAY”", "personalAccWebApp": "НП ООО «БЕРЛИО» - Приложение “Личный кабинет клиента”", "forPartners": "НП ООО «БЕРЛИО» - Для партнеров", "voiceRefService": "НП ООО «БЕРЛИО» - Голосовая справочно-информационная служба", "loyaltyProgram": "НП ООО «БЕРЛИО» - Программа лояльности", "forBankInfo": "НП ООО «БЕРЛИО» - Для банка", "detailedNews": "НП ООО «БЕРЛИО» - Подробности новости", "adminLogin": "НП ООО «БЕРЛИО» - Авторизация", "adminDashboard": "НП ООО «БЕРЛИО» - Панель администратора", "privacy": "НП ООО «БЕРЛИО» - Конфиденциальность" };
const departmentsPhone = "Телефоны";
const departments = "Центров обслуживания";
const allContacts = "Все контакты";
const searchAzs = "Поиск АЗС";
const personalAccount = "Личный кабинет";
const customerService = "Обслуживание клиентов";
const backToHome = "перейти на главную";
const companyName = "НП ООО «БЕРЛИО»";
const selectDepartment = "Выбор центра обслуживания";
const minskName = "Головной офис";
const minskAddress = "Минская область, г. Минск, ул. Быховская 55";
const minskFooterAddress = "ул. Быховская 55, г. Минск, Беларусь, 220007";
const minskShortAddress = "г. Минск, ул. Быховская 55";
const inMinskCity = "в Минске";
const brestName = "Брестский филиал";
const brestAddress = "Брестская область, г. Брест, ул. К.Маркса, 33–43";
const brestFooterAddress = "ул. К.Маркса 33, офис 43, г. Брест, Беларусь, 224005";
const brestShortAddress = "г. Брест, ул. К.Маркса 33-43";
const inBrestCity = "в Бресте";
const vitebskName = "Витебский филиал";
const vitebskAddress = "Витебская область, г. Витебск, ул. Правды, 37, корп.2, кв.84";
const vitebskFooterAddress = "ул. Правды, 37, корп.2, кв.84, г. Витебск, Беларусь, 210029";
const vitebskShortAddress = "г. Витебск, ул. Правды 37,к.2-84";
const inVitebskCity = "в Витебске";
const gomelName = "Гомельский филиал";
const gomelAddress = "Гомельская область, г. Гомель, ул. Речицкая, 1А-419";
const gomelFooterAddress = "ул. Речицкая, 1А, к.419, г. Гомель, Беларусь, 246017";
const gomelShortAddress = "г. Гомель, ул. Речицкая, 1А-419";
const inGomelCity = "в Гомеле";
const grodnoName = "Гродненский филиал";
const grodnoAddress = "Гродненская область, г. Гродно, ул. Победы, 17-7";
const grodnoFooterAddress = "ул. Победы, 17-7, г. Гродно, Беларусь, 230026";
const grodnoShortAddress = "г. Гродно, ул. Победы, 17-7";
const inGrodnoCity = "в Гродно";
const mogilevName = "Могилёвский филиал";
const mogilevAddress = "Могилевская область, г. Могилев, ул. Челюскинцев, 105В";
const mogilevFooterAddress = "ул. Челюскинцев, 105В, г. Могилёв, Беларусь, 212003";
const mogilevShortAddress = "г. Могилев, ул. Челюскинцев, 105В";
const inMogilevCity = "в Могилёве";
const smolenskName = "ООО «БЕРЛИО-КАРД»";
const smolenskAddress = "Смоленская область, г.Смоленск, ул. Памфилова, д.5, о.211";
const belarusName = "Беларусь";
const russiaName = "Россия";
const aboutBerlio = "О Берлио";
const forPartners = "Для партнеров";
const forClients = "Для клиентов";
const news = "Новости";
const equipmentAndSoftware = "Оборудование и ПО";
const contacts = "Контакты";
const closeMenu = "Закрыть меню";
const noResult = 'По вашему запросу "{{query}}" ничего не найдено.';
const search = "Поиск по сайту";
const appliedProgramsAndSoftware = "Прикладные программы и ПО";
const webCenterBerlio = "ПО “Веб Центр БЕРЛИО”";
const oilAndCapital = "ППП “НЕФТЬ И КАПИТАЛ”";
const selfServiceCashRegister = "Касса самообслуживания для сетей АЗС";
const gasStationAutomationSystem = "ППП “Система автоматизации АЗС”";
const invoiceWebsite = "Сайт для выставления счетов-фактур";
const usefulInformation = "Полезная информация";
const voiceInfoService = "Голосовая справочно-информационная служба";
const loyaltyProgram = "Программа лояльности";
const downloadableDocuments = "Документы для скачивания";
const berlioPaymentRules = "Правила платежной системы электронных денег «БЕРЛИО»";
const bankInformation = "Информация для банка";
const electronicPaymentSystem = "Электронная платежная система";
const eCardReceipt = "Получение эл.карточки";
const eCardUsage = "Использование эл.карточки";
const contractTermination = "Расторжение договора";
const ratesAndTariffs = "Прейскурант и тарифы";
const fuelCardsAndGasStations = "Топливные карты и АЗС";
const gasStationsAndRoutes = "АЗС и маршруты";
const berlioEWalletRules = "Электронные деньги «Берлио» ОАО “Белгазпромбанк”. Правила";
const berlioUsageRegulations = "Регламент использования электронных денег «Берлио»";
const servicesAndSoftware = "Сервисы и ПО";
const berlioInternetClient = "Приложение “Berlio Internet client”";
const berlioCardPayApp = "Приложение “BERLIOCARDPAY”";
const smartPayApp = "Приложение “Smartpay”";
const clientCabinetSoftware = "ПО “Личный кабинет клиента”";
const electronicBerlioCards = "Электронные карты «Берлио»";
const fuelBerlioCards = "Топливные карты «Берлио»";
const regulatoryDocuments = "Документы";
const serviceInEPS = "Обслуживание в ЭПС  «Берлио»";
const goodsAndServicePayment = "Оплата товаров (работ, услуг)";
const contractConclusion = "Заключение договора ЭПС «Берлио»";
const documentsForDownload = "Формы и списки документов (для скачивания)";
const gettingElectronicCard = "Получение электронной карты";
const personalAccountUsage = "Работа с личным кабинетом";
const tollRoadsService = "Обслуживание в «BelToll»";
const tollRoadsPayment = "Плата за проезд «BelToll»";
const tollRoads = "Заключение договора «BelToll»";
const fuelPayment = "Оплата топлива на АЗС";
const fuelCardUsage = "Выпуск в обращение и использование топливных карт";
const lowAndRegulatory = "Законодательство";
const IFRReport = "Отчёт об оценке ИФР";
const localActsInEPS = "Локально-правовые акты ЭПС «Берлио»";
const breadCrumbs = { "home": "Главная", "about": "О Берлио", "forPartners": "Для партнеров", "voiceRefService": "Голосовая справочно-информационная служба", "loyaltyProgram": "Программа лояльности", "forBankInfo": "Информация для банка", "forClients": "Для клиентов", "serviceInEPS": "Обслуживание в ЭПС «Берлио»", "signAndResign": "Заключение и перезаключение договоров в ЭПС «Берлио»", "forFuelPayments": "Оплата товаров (работ, услуг)", "gettingCard": "Получение электронной карты", "dealResignation": "Расторжение договора", "priceListsAndTariffs": "Прейскуранты и тарифы", "workWithPrivateAccount": "Работа в личном кабинете", "documentsForDownload": "Документы для скачивания", "legislation": "Законодательство", "reportIFR": "Отчет об оценке ИФР", "eMoneyRegulations": "Регламент использования электронных денег", "bicApp": "Приложение “Berlio Internet Client”", "berlioCardPay": "Приложение “BERLIOCARDPAY”", "smartPayApp": "Приложение “SMARTPAY”", "personalAccWebApp": "Приложение “Личный кабинет клиента”", "news": "Новости", "detailedNews": "Детали новости", "equipment": "Оборудование и ПО", "webCenter": "ПО “Веб Центр БЕРЛИО”", "oilAndCapital": "ППП “НЕФТЬ И КАПИТАЛ”", "selfServiceCheckout": "Касса самообслуживания", "gsAutomationSystem": "ППП “Система автоматизации АЗС”", "invoicesSite": "“Сайт для выставления счетов-фактур”", "invoicesSiteTariffs": "Тарифы для доступа к API «Berlio Info»", "privacy": "Конфиденциальность" };
const mainBlock = { "companyName": "Компания НП ООО «БЕРЛИО»", "headline": "Система электронных расчетов на АЗС", "tagline": "используйте электронную карту «БЕРЛИО» и заправляйтесь за 3 минуты", "fuelCardUsage": "Использование топливных карт", "belTollServices": "позволяет оплачивать услуги в системе BelToll (оплата платных дорог)", "nonResidentServices": "Услуги в отношении нерезидентов РБ", "nonResidentSupport": "компания также поддерживает клиентов из ближнего зарубежья", "readMore": "Подробнее" };
const aboutBlock = { "name": "Наша компания", "alt": "Офис НП ООО «Берлио»", "description": "Компания работает на рынке производителей и услуг с 1992 года. Количество объектов, принимающих к оплате карты «БЕРЛИО»: 804 — Беларусь, 379 — Россия" };
const systemSection = { "name": "Система «Берлио»", "listTitle": "а также", "listItem1": "Разработка и сопровождение программного обеспечения под заказ; разработка, производство, установка и техническое обслуживание оборудования", "listItem2": "Информационно-техническое обслуживание клиентов по системе безналичных расчетов «БЕРЛИО» на автозаправочных станциях, в магазинах и на объектах услуг в Беларуси", "listItem3": "Разработка, производство, установка и обслуживание оборудования управления на автозаправочных станциях, СТО, пунктах взимания дорожных сборов, в магазинах и в других торговых объектах", "listItem4": "Разработка, производство, установка и обслуживание оборудования по обеспечению расчетов по электронным картам", "alt1": "Логотип BERLIO на стеле", "alt2": "Заправка автомобиля" };
const purposeSection = { "name": "Назначение системы", "description": "Система предназначена для оперативного безналичного расчёта по электронным картам. Основными составляющими узлами системы являются:", "cardTitle1": "Расчетный центр", "cardTitle2": "Терминалы", "cardTitle3": "Электронные карты", "fuelDispenser": "Топливораздаточная колонка", "listTitle": "По картам «Берлио» можно оплатить:", "listItem1": "топливо", "listItem2": "газ", "listItem3": "керосин", "listItem4": "продукты", "listItem5": "промтовары", "listItem6": "масла", "listItem7": "СТО", "listItem8": "техосмотр", "listItem9": "дорожный сбор в системе BelToll", "listItem10": "дорожный сбор в системе ПЛАТОН", "listItem11": "мойку", "listItem12": "пылесос", "listItem13": "стоянку", "listItem14": "Velcom и МТС", "listItem15": "услуги таможенных агентов" };
const cpsSection = { "name": "К услугам клиентов и партнеров", "listItem1": "Оперативное заключение договоров", "listItem2": "Безналичный расчёт", "listItem3": "Своевременная бухгалтерская отчётность", "listItem4": "Использование электронных карт", "listItem5": "Возможность получения предоставляемых услуг (заправка любых видов топлива, покупка товаров народного потребления, оплата услуг, дорожных сборов) по одной электронной карте", "listItem6": "Возможность ограничения видов предоставляемых услуг (заправка только конкретного вида топлива) по указанной клиентом электронной карте", "listItem7": "Возможность ограничения суточной, месячной нормы топлива по указанной клиентом электронной карте, надежный металлический корпус в виде брелка для ключей, гарантия 1 год, индивидуальный пароль, надежная защита от подделки", "forClients": "Для клиентов", "forPartners": "Для партнеров" };
const forPartnersMain = { "title": "Для партнеров", "description": "Выберите раздел и изучите необходимую информацию", "partnerInfo": { "title1": "Прикладные программы и ПО", "title2": "Полезная информация", "title3": "Стать участником системы", "label1": "ПО “Веб Центр БЕРЛИО”", "label2": "ППП “НЕФТЬ И КАПИТАЛ”", "label3": "Касса самообслуживания для сетей АЗС", "label4": "ППП “Система автоматизации АЗС”", "label5": "Сайт для выставления счетов-фактур", "label6": "Голосовая справочно-информационная служба", "label7": "Программа лояльности", "label8": "Документы для скачивания", "label9": "Правила платежной системы электронных денег «БЕРЛИО»", "label10": "Информация для банка" } };
const partnersAdvantages = { "name": "Преимущества для партнеров «Берлио»", "documentsCycle": "Онлайн-оформление и полный цикл документов", "documentsCycleTagline": "мы предоставляем полную бухгалтерию и работаем оперативно", "billPrint": "Печать фискального чека", "billPrintTagline": "возможность распечатать фискальный чек прямо из личного кабинета", "location": "Удобное расположение офиса", "locationTagline": "добираться к нам очень просто: офис в 4 минутах ходьбы от ст.м. “Ковальская Слобода”" };
const partners = { "faq_title": "Часто задаваемые вопросы", "questions": { "question1": "Как стать партнером?", "question2": "Что необходимо, чтобы заключить договор?", "question3": "Какие преимущества у партнеров?", "question4": "Как получить акт сверки взаиморасчетов по топливу?", "question5": "Как произвести оплату по договору?" }, "answers": { "answer1": "На этом месте находится информация по данному вопросу", "answer2": "На этом месте находится информация по данному вопросу", "answer3": "На этом месте находится информация по данному вопросу", "answer4": "На этом месте находится информация по данному вопросу", "answer5": "На этом месте находится информация по данному вопросу" } };
const voiceRefServiceMain = { "name": "Голосовая справочно-информационная служба", "descr1": "Голосовая справочно-информационная служба предназначена для автоматизации работы с клиентами в организации. Программа использует голосовой факс-модем для выдачи голосового меню клиентам. Принцип работы с клиентами следующий: клиент звонит по номеру телефона, к которому подключен модем или номеру входящей линии внутренней АТС. Модем поднимает трубку телефона и клиенту предлагается голосовое меню, записанное клиентом.\nНапример:", "descr2": "“Здравствуйте. Вы позвонили в справочно-информационную службу фирмы ”БЕРЛИО”. Для получения остатка по договору наберите цифру ’1′. Для получения по факсу отчёта о реализации за текущий месяц наберите цифру ’2′. Для получения по факсу отчёта о реализации за предыдущий месяц наберите цифру ’3′. Для соединения с менеджером наберите цифру ’9’”", "descr3": "Клиент для получения необходимой информации набирает соответствующую цифру на телефонном аппарате. Внимание, набор всех цифр клиент должен производить в тональном режиме. Если для набора городского номера клиент использовал импульсный режим, то перед набором первой цифры необходимо нажать ’*’, чтобы перевести телефон (факс) в тональный набор. Набирать все цифры клиент может как во время паузы, так и во время голосовых сообщений.", "descr4": "Начальное меню с определённой паузой повторяется несколько раз. Количество повторов и время паузы определяется в настройках программы. Если за указанное время клиент не нажал не одной цифры, то клиент соединяется с менеджером (так как если бы он нажал клавишу ‘9’). Если нажатая цифра не соответствует ни одной функции — клиенту сообщается “Сделан неправильный выбор” и меню повторяется заново.", "descr5": "При выборе пункта ’9′ клиент переключается на менеджера. Номер телефона менеджера указывается в настройках программы. Доступность данного пункта возможна только в указанное время, например, только в рабочие дни с 9.00 до 18.00.", "descr6": "При выборе пункта ’1’ клиенту предлагается набрать пятизначный номер договора, после чего ему сообщается об остатке денежных средств на договоре. При выборе пунктов меню ’2′ и ’3′ клиенту предлагается набрать номер договора завершив набор клавишей “#”, после чего клиенту по факсу передаётся Справка о реализации соответственно за текущий или предыдущий периоды.", "homeLink": "На главную", "upLink": "Наверх" };
const loyaltyProgramMain = { "name": "Программа лояльности", "descr1": "Программа лояльности предназначена для развертывания в клиентской сети компании системы предоставления и учета скидок, а также всевозможных акций и бонусных программ с использованием карт лояльности: бумажных (со штрих‐кодами), пластиковых (со штрих‐кодами, электронных (чиповых, с магнитной полосой), а также бесконтактных)", "descrHeader2": "Основные преимущества программы:", "descr2": { "item1": "быстрота и простота использования", "item2": "высокая надежность", "item3": "режим офлайн с записью офлайн информации на карту обеспечивает клиенту доступность программы лояльности даже на объектах без связи с центром лояльности, а компании гарантирует, что клиент не перерасходует накопленные средства", "item4": "огромная гибкость в настройках всевозможных акций", "item5": "более 100 отчетов со всевозможными группировками и фильтрами", "item6": "высокая степень защищенности на всех этапах взаимодействия системы гарантирует безопасность проведения транзакций “Семейная карта” ‐ возможность выпуска неограниченного количества дополнительных карт с одним карт‐счётом (например, когда муж, жена и дети используют один карт‐счёт). В этом случая все движения по программе лояльности проходят по счёту основной карты, при этом для идентификации клиента возможно использование любой из дополнительных карт" }, "descrHeader3": "Преимущества использования бесконтактных электронных карт:", "descr3": "Больший срок службы карт, которые при бесконтактных расчетах, естественно, меньше изнашиваются. Удобство и скорость платежа на автозаправках, в кафе, супермаркетах и т.п. Карты и считыватели отлично защищены от мошенников", "descr4": "Во‐первых карты имеют внутреннюю парольную защиту (отдельно на запись информации и отдельно на чтение), причем пароль устанавливается не на всю карту целиком, а на каждый из сегментов(а их может быть на карте “Mifare 1K” ‐ 10), что позволяет сохранять часть информации и от чтения и от записи, часть только от записи", "descr5": "Во‐вторых, считыватели карт нашего производства не записывают информацию переданную информацию на карту. Вся информация предварительно шифруется и только в зашифрованном виде поступает на карту. Причём к информации дополнительно подмешиваются случайные данные, идентификаторы карты, записанные производителем и недоступные для изменения, а также расчётные контрольные значения. Кроме того на карте ведутся дополнительно контрольные счетные значения которые при изменении данных всегда должны изменяться по заранее известному алгоритму таким образом, что абсолютно идентичная операция с картой при каждом прикладывании имеет совершенно различное представление данных и контрольных значений", "descr6": "Всё это не даёт никакой, даже потенциальной возможности продублировать карту или каким либо образом изменить информацию на карте (любые такие операции приведут к недействительности карты, вследствие, несовпадения контрольных кодов при расшифровке информации на карте)", "descr7": "Аналогично, невозможно изменить данные на этапе взаимодействия компьютера со считывающим устройством. По линиям связи никогда не передаются сами данные, а только их шифрованное представление, смешанные с набором случайных данных и рассчитанных контрольных значений. И даже идентичная операция каждый раз имеет совершенно иное представление, т.е. даже повторив данные и сымитировав обмен, система будет считать все данные недействительными!", "descr8": "Аналогично все коммуникации с центром лояльности системой офлайн и АСУ АЗС имеет шифрование и дополнительный контроль. К тому же при бесконтактных расчетах карта остается в руках у клиента, что снижает риск несанкционированных манипуляций с нею обслуживающим персоналом", "descrHeader9": "Варианты использования программы:", "descr9": { "item1": "дисконтные карты — предоставление клиентам всевозможных скидок выражаемых в % от суммы покупки", "item2": "бонусные карты — аналог дисконтных карт, лишь с тем различием, что клиент за свои покупки получает не скидку, а некий бонус. Бонусом может быть что угодно, варианты ограничены лишь Вашим воображением. Наиболее часто бонусы переводят в денежный эквивалент или в ту продукцию, которую предоставляют, например, литры бензина и т.д. Как один из вариантов использования ‐ зачисление невостребованной клиентом сдачи на его карту", "item3": "электронные кошельки — электронный аналог бумажных талонов с учетом возможности многоразового использования, а также онлайн добавления/ перераспределения сумм/литров на карте", "item4": "многофункциональные карты — например, дисконтные карты с дополнительным накоплением бонусов по акциям", "item5": "поощрительная программа — позволяет в зависимости от активности клиента увеличение или уменьшение его бонусов (как в денежном выражении через начисление предоплаты или изменение статуса, так и в товарном, например, в виде подарков, или возможности безвозмездно приобрести заданное количество товара или услуги). Кроме того, аналогичные увеличения и списания возможно по результатам приобретения определённого количества (или на определённую сумму) товаров и услуг", "item6": "призовая программа — позволяет разыгрывать среди участников программы различные призы (как в денежном выражении через начисление предоплаты или изменение статуса, так и в товарном, например, в виде подарков, или возможности безвозмездно приобрести заданное количество товара или услуги)" }, "homeLink": "На главную", "upLink": "Наверх" };
const forBankInfoMain = { "name": "Наша компания", "system": "Система электронных расчетов на АЗС", "systemTagline": "используйте электронную карту «Берлио» и заправляйтесь за 3 минуты", "usage": "Использование топливных карт", "usageTagline": "позволяет оплачивать услуги в системе BelToll (оплата платных дорог)", "nonResident": "Услуги в отношении нерезидентов РБ", "nonResidentTagline": "компания также поддерживает клиентов из ближнего зарубежья", "readMore": "Подробнее" };
const forBankInfoContact = { "address": "Адрес", "phone": "Телефон", "forOrganizations": "Корпоративная почта", "forClientInquiries": "Для обращения клиентов", "readMore": "Все контакты" };
const forBankInfoDoc = { "name": "Документы", "description": "Банком-эмитентом ООО «Берлио» является ОАО “Белгазпромбанк”", "headline": "Регламент использования электронных денег «Берлио»", "cardTitle1": "Правила ОАО “Белгазпромбанк”", "cardTitle2": "Правила платежной системы электронных денег «Берлио»", "homeLink": "На главную", "upLink": "Наверх" };
const forClientsMain = { "title": "Для клиентов", "description": "Выберите раздел и изучите необходимую информацию", "clientInfo": { "title1": "Электронная платежная система", "title2": "Топливные карты и АЗС", "title3": "Нормативные документы", "title4": "Сервисы и ПО", "label1": "Заключение и перезаключение договора", "label2": "Получение эл.карточки", "label3": "Использование эл.карточки", "label4": "Расторжение договора", "label5": "Прейскурант и тарифы", "label6": "Работа с личным кабинетом", "label7": "Документы для скачивания", "label8": "АЗС и маршруты", "label9": "Использование топливных карт", "label10": "Платные дороги (BelToll)", "label11": "Оплата за топливо", "label12": "Электронные деньги «Берлио» ОАО “Белгазпромбанк”. Правила", "label13": "Регламент использования электронных денег «Берлио»", "label14": "Приложение “Berlio Internet client”", "label15": "Приложение “BERLIOCARDPAY”", "label16": "Приложение “Smartpay”", "label17": "Касса самообслуживания для сетей АЗС", "label18": "ПО “Личный кабинет клиента”" } };
const clientsAdvantages = { "name": "Преимущества для клиентов «Берлио»", "customerService": "Сервисное обслуживание 24/7", "customerServiceTagline": "оперативная техническая помощь клиентам в любое время суток", "dealSign": "Заключение договора онлайн", "dealSignTagline": "или в офисе в 4 минутах ходьбы от ст.м. “Ковальская Слобода”", "personalCabinet": "Многофункциональный личный кабинет", "personalCabinetTagline": "поддерживается многими АЗС Беларуси и имеет богатый функционал" };
const clients = { "faq_title": "Часто задаваемые вопросы", "questions": { "question1": "Как стать клиентом?", "question2": "Что необходимо, чтобы заключить договор?", "question3": "Как зарегистрировать бортовое устройство?", "question4": "Каков порядок блокировки/разблокировки бортового устройства?", "question5": "Как произвести оплату по договору?" }, "answers": { "answer1": "На этом месте находится информация по данному вопросу", "answer2": "На этом месте находится информация по данному вопросу", "answer3": "На этом месте находится информация по данному вопросу", "answer4": "На этом месте находится информация по данному вопросу", "answer5": "На этом месте находится информация по данному вопросу" } };
const signAndResignMain = { "name": "Обслуживание в электронной платежной системе «Берлио»", "description": "Электронная платёжная система «Берлио» (далее – ЭПС) представляет собой сообщество Участников и Клиентов, взаимодействующих в соответствии с установленными правилами.", "purposeBeforeLink": "Приобретение и оплата за нефтепродукты, товары, работы и услуги производятся ", "purposeLink": "в организациях торговли и сервиса ЭПС ", "purposeAfterLink": "электронными деньгами «Берлио» с применением:", "list1": { "item1": "электронных карт «Берлио»;", "item2": "пластиковых электронных карт;", "item3": "других носителей идентификационной информации", "item4": "или их виртуальных эквивалентов" }, "participants": "Участники платежной системы «Берлио» (поставщики платёжных услуг)", "operator": "Оператор", "operatorTagline": "НП ООО «БЕРЛИО»", "agents": "Агенты", "agentsTagline": "организации,  обслуживающие собственных Клиентов, пользующихся платежной системой «Берлио», могут иметь ОТС", "emissioner": "Эмитент", "emissionerTagline": "ОАО «Белгазпромбанк»", "tradeAndServiceObject": "ОТС", "tradeAndServiceObjectTagline": "объекты торговли и сервиса (АЗС, СТО, мойки и пр.)", "serviseCenter": "ЦО", "serviseCenterTagline": "центр обслуживания", "customerService": "Обслуживание Клиентов осуществляется на основании:", "list2": { "item1": "Договора присоединения – с Оператором (ЦО Оператора);", "item2": "Договора обслуживания –  с Эмитентом (Расчётный центр);" }, "systemUsage": "Пользование ЭПС осуществляется при наличии у Клиента оригиналов документов:", "list3": { "item1": "Заявление о присоединении", "item2": "Договор обслуживания", "item3": "Заявление об открытии и обслуживании лицевого счета", "item4": "иные договоры (согласно затребованным Клиентом услугам)" }, "documentsTitle": "Документы (ЛПА) участников ЭПС для ознакомления:", "operatorDocumentsTitle": "Документы оператора", "cardTitle1": "Правила оператора электронной платежной системы «Берлио»", "cardSubtitle1": "Правила Оператора", "cardTitle2": "Правила обслуживания в электронной платежной системе «Берлио»", "cardSubtitle2": "Правила обслуживания", "cardTitle3": "Договор присоединения клиента к обслуживанию в электронной платежной системе «Берлио»", "cardSubtitle3": "Договор присоединения", "cardTitle6": "Перечень цен и тарифов за оказываемые услуги в электронной платежной системе «Берлио»", "cardSubtitle6": "Перечень цен и тарифов", "cardTitle7": "Заявление о присоединении к договору присоединения клиента к обслуживанию в электронной платежной системе «Берлио»", "cardSubtitle7": "Заявление о присоединении", "emissionerDocumentsTitle": "Документы эмитента", "cardTitle4": "Правила эмитента электронных денег «Берлио»", "cardSubtitle4": "Правила Эмитента", "cardTitle5": "Договор на открытие и обслуживание электронного кошелька", "cardSubtitle5": "Договор обслуживания", "footer": "Договоры заключаются по установленным участниками платёжной системы «Берлио» типовым формам." };
const signAndResignSection = { "nameOLD": "Заключение договора в электронной платежной системе «Берлио»", "name": "Перезаключение / заключение договора", "descriptionOLD": { "item1": "Для того, чтобы стать клиентом электронной платежной системы «Берлио» (ЭПС), вам необходимо обратиться в:", "item2": "1. НП ООО «БЕРЛИО» ", "item3": "(головной или региональный центр обслуживания (ЦО) Оператора по месту нахождения клиента) – для заключения договора присоединения к ЭПС;", "item4": "2. ОАО «Белгазпромбанк» ", "item5": "(головное или региональные отделения банка по месту нахождения клиента) – для заключения договора на открытие и обслуживание электронного кошелька, покупку электронных денег.", "item6": "ВНИМАНИЕ! ", "item7": "В связи с требованиями законодательства, изменением условий обслуживания при заключении договора с ОАО «Белгазпромбанк» и идентификация клиента банком осуществляется ", "item8": "ТОЛЬКО в отделениях ОАО «Белгазпромбанк». ", "item9": "Подробная информация о контактах, местах расположения отделений ОАО «Белгазпромбанк» находится на сайте - ", "item9-5": "Подписение договра", "item10": "I. Для оформления документов в Центре обслуживания Оператора:", "item10-5": "ознакомиться с условиями и требованиями", "item10-6": "Договора присоединения", "item10-7": "и", "item10-8": "документов (ЛПА)", "item10-9": "Участников ЭПС", "item10-10": "Заявлением о присоединении", "item11": "к договору присоединения клиента к обслуживанию в электронной платежной системе «Берлио»;", "item12": "подготовить необходимый пакет документов для оформления Заявления о присоединении;", "item13": "обратиться в ЦО Оператора по местонахождению (месту обслуживания) Клиента (головной или региональные ЦО);", "item14": "предоставить", "item14-1": "необходимый пакет документов", "item14-2": "для заключения Договора присоединения и оформления Заявления о присоединении;", "item15": "подписать, скрепить печатью (при использовании) Заявление о присоединении.", "item16": "II. Документы, необходимые для заключения договора с НП ООО «БЕРЛИО»:", "item17": "договор", "item17-1": "(ознакомиться)", "item18": "копия свидетельства о государственной регистрации юридического лица;", "item19": "копия устава юридического лица (1-3 и последняя (с оборотом) страницы Устава);", "item20": "копия документа, удостоверяющего полномочия (решение (протокол) о назначении руководителя);", "item21": "копия приказа о вступлении в должность с указанием начала срока нахождения в должности (договор передачи полномочий исполнительного органа (с индивидуальным предпринимателем – управляющим деятельностью юридического лица), либо доверенность на представление интересов юридического лица с указанием сроков полномочий по доверенности);", "item22": "документ, удостоверяющий личность руководителя либо представителя организации (паспорт/вид на жительство иностранного гражданина/вид на жительство беженца (апатрида) – для обозрения сотрудникам Оператора. Предоставляется только при заключении Договора присоединения в центре обслуживания;", "item23": "уведомление/приказ об отказе от использования печати (в случае принятия решения);", "item24": "согласие на получение документов в электронном виде с ЭЦП;", "item24-5": "(скачать)", "item25": "заявление на внесение изменений в личном кабинете;", "item25-5": "(скачать)", "item25-6": "реквизиты.", "item26": "ВНИМАНИЕ! Копии документов клиент делает самостоятельно. ", "item27": "III. Документы, необходимые для заключения договора с ОАО «Белгазпромбанк»: ", "item28": "IV. Контакты центров обслуживания клиентов НП ООО «БЕРЛИО»" }, "description": "В связи с изменением законодательства в сфере платёжных систем и приведением в соответствие типовых форм документов платежной системы «Берлио» (Система), Правил Оператора, Правил обслуживания, внедрением новой технологии обслуживания, действующим Клиентам необходимо перезаключить договоры обслуживания. Перезаключение и заключение Договора присоединения осуществляется по новой процедуре", "dropdown1": "Оформление документов", "link": "самостоятельно", "selfSignList": { "item1": "выполнить на сайте www.lkb.by предрегистрацию клиента: на стартовой странице кликнуть по кнопке “Предрегистрация в электронной платёжной системе “БЕРЛИО", "item2": "ознакомиться с Регистрационной карточкой клиента (РКК), условиями и требованиями Договора присоединения и документов (ЛНПА) Участников платёжной системы «Берлио»", "item3": "подготовить необходимый пакет документов для заполнения РКК и загрузки сканов", "item4": "заполнить РКК:", "orderedItem1": "выбрать Центр обслуживания", "orderedItem2": "ввести УНП", "orderedItem3": "подтвердить согласие Клиента с условиями и требованиями документов (ЛНПА) проставлением ”галочек” возле “Согласен”. При несогласии/отсутствии “галочек”, кнопка “Продолжить” не доступна, обслуживание действующих Клиентов (Оператора), не перезаключивших договоры, будет прекращено в одностороннем порядке", "orderedItem4": "ввести данные уполномоченного лица (“Мастер-телефон”) на совершение юридически значимых действий в личном кабинете (ЛК) на сайте www.lkb.by, индивидуальный предприниматель указывает свой номер мобильного телефона)", "orderedItem5": "загрузить сканы запрашиваемых документов для Оператора и Эмитента согласно “Списку документов” и РКК", "orderedItem6": "проверить полноту и достоверность данных, при не соответствии, отредактировать, при наличии пустых полей, заполнить их. При  недостаточном объёме сведений для заполнения, сохранить РКК, кликнув на кнопку “Сохранить”, продолжить заполнение можно на стартовой странице www.lkb.by кликнув по кнопке “Предрегистрация в электронной платёжной системе «Берлио» и введя УНП в поле РКК", "orderedItem7": "по завершению действий кликнуть последовательно на кнопки “Сохранить” и “Отправить” для проверки специалистами ЦО (выбранном изначально) на соответствие/несоответствие сведений в РКК и пакета документов требованиям платёжной системы «Берлио»", "orderedItem8": "ожидать СМС-сообщение на “Мастер-телефон” о подтверждении предрегистрации, отправляется не позднее 5 рабочих дней с момента получения документов ЦО (данный срок действует в период перезаключения договоров и перехода на новый порядок) для дальнейшего формирования и подписания документов", "orderedItem9": "при подтверждениии предрегистрации, пройти регистрацию в ЛК на сайте www.lkb.by", "orderedItem10": "при отклонении предрегистрации, обратиться в изначально выбранный клиентом ЦО для выяснения несоответствия", "orderedItem11": "сформировать в ЛК Заявление о присоединении, Соглашение о расторжении договора обслуживания (при перезаключении договора)", "orderedItem12": "проверить в Заявлении о присоединении наличие “галок” возле “Согласен” (автоматически проставляются в соответствии с данными клиента из РКК)", "orderedItem13": "распечатать Заявление о присоединении, Соглашение о расторжении договора обслуживания (при перезаключении договора), подписать, скрепить печатью (при использовании)", "orderedItem14": "отправить Оператору, в выбранный при предрегистации ЦО, документ(ы) почтовым отправлением или с нáрочным для аутентификации / регистрации клиента в платёжной системе «Берлио»", "orderedItem15": "отправить Эмитенту пакет документов по адресу: ОАО “Белгазпромбанк”, г. Минск, ул. Притыцкого,60/2, каб. 301", "orderedItem16": "ожидать СМС-сообщение на “Мастер-телефон” о подтверждении регистрации и присвоенном номере и дате Договора присоединения", "orderedItem17": "после получения Клиентом СМС-сообщения, процедура перезаключения договора в электронной платежной системе «Берлио» считается завершённой", "footer": "Заявление о присоединении, оформленное и отправленное Клиентом на электронную почту Оператора или по факсу, не принимается", "secondaryFooter": "Проверка статуса оформленных документов возможна в личном кабинете" }, "dropdown2": "в Центре обслуживания", "customerServiceSignList": { "item1": "ознакомиться с условиями и требованиями Договора присоединения и документов (ЛНПА) Участников платёжной системы «Берлио», РКК", "item2": "оформить, подписать, скрепить печатью (при использовании) документы для Эмитента (реквизиты договора, соглашения и пр., вопросник для клиента) согласно списку документов", "item3": "подготовить необходимый пакет документов для оформления РКК и Заявления о присоединении. Допускается предоставление запрашиваемых документов в электронном виде (сканы на электронном носителе)", "item4": "обратиться в ЦО Оператора по местонахождению Клиента (головной или региональные ЦО)", "item5": "предоставить необходимый пакет документов для оформления РКК, Заявления о присоединении и загрузки сканов специалистами ЦО", "item6": "подписать, скрепить печатью (при использовании) Заявление о присоединении, Соглашение о расторжении договора обслуживания (при перезаключении договора), предоставленные специалистами ЦО", "item7": "1 экземпляр оригиналов вернуть специалисту ЦО" }, "dealFact": "Фактом присоединения клиента к Договору присоединения считается подтвержденная регистрация клиента в платёжной системе «Берлио», подписанное сторонами Заявление о присоединении:", "dealFactList": { "item1": "номером Договора присоединения является номер регистрации Заявления о присоединении", "item2": "датой Договора присоединения является дата регистрации Заявления о присоединении", "item3": "местом составления является местонахождение ЦО, выбранного Клиентом при регистрации" }, "table": { "thead1": "Центр обслуживания клиентов", "thead2": "Телефоны", "thead3": "Электронная почта" }, "footer": { "beforeTel": "Если у вас возникли вопросы по заключению договора, звоните в наш", "tel1": "центральный офис", "betweenTels": "или отдел по", "tel2": "обслуживанию клиентов", "afterTel": " Также вы можете позвонить в один из офисов наших филиалов на территории РБ или наших представителей в РФ." }, "contactsLink": "Наши филиалы и контакты", "homeLink": "На главную", "upLink": "Наверх" };
const forFuelPaymentsMain = { "name": "Оплата за топливо", "section1": { "header": "Куда платить за топливо?", "description": "Перечисление денежных средств за топливо производится на расчетный счет", "link": "ОАО «Белгазпромбанк»:", "listItem1": "Образец платежного поручения (для резидентов РБ);", "listItem2": "Образец платежного поручения (для не резидентов РБ)." }, "section2": { "header": "Порядок зачисления денежных средств на договор", "description": "Денежные средства зачисляются по безналичному расчету на договор с клиентом  в день оплаты, если копия платежного поручения с проводкой банка предоставлена в расчетный центр до 15:00.", "phones": "по г. Минску", "email": "e-mail" }, "section3": { "header": "Обновление данных на АЗС", "listItem1": "с 18:00 текущих суток можно приобрести топливо на  АЗС в РБ;", "listItem2": "на всех остальных объектах в г. Минске, по республике и другим регионам можно заправиться после 10:00 следующих суток;", "description": "Если в день оплаты копия платежного поручения не предоставлена в РЦ, то порядок включения АЗС аналогичен, но начиная со следующего рабочего дня (суммы зачисляются по банковской выписке)." }, "description": "Внимание!!! Для более оперативного зачисления денежных средств на договор необходимо в день оплаты предоставлять копию платежного поручения с отметкой банка независимо от наличия электронной системы «Клиент-Банк» (если это представляется возможным).", "homeLink": "На главную", "upLink": "Наверх" };
const gettingCardMain = { "name": "Получение электронной карты", "applicationHeader": "Заявка на получение электронной карточки «Берлио» оформляется:", "list1": { "item1": "личным обращением в ЦО Оператора по местонахождению Клиента (головной или региональные ЦО)", "item2": "звонком по телефону обслуживания клиентов", "item3": "письмом на электронную почту обслуживания клиентов:" }, "mailLink": "info@berlio.by", "applicationFooter": "Вам выпишут счет-фактуру на необходимое количество электронных карточек. Оплата электронной карточки производится на расчетный счет НП ООО  «Берлио» согласно выписанному счету-фактуре. Цена на электронную карточку устанавливается в соответствии с действующим прейскурантом. Электронная карта выдается только после ее оплаты", "documentsHeader": "Документы для получения электронной карточки", "supervisor": "Руководителю нужны", "supList": { "item1": "приказ о назначении руководителя", "item2": "паспорт или водительское удостоверение", "item3": "копия платежного поручения с отметкой банка (независимо от наличия электронной системы “Клиент-Банк”) - если получение карточки происходит в день оплаты" }, "notSupervisor": "Не руководителю нужны", "notSupList": { "item1": "доверенность на получение ТМЦ", "item2": "паспорт или водительское удостоверение", "item3": "копия платежного поручения с отметкой банка (независимо от наличия электронной системы “Клиент-Банк”) - если получение карточки происходит в день оплаты" }, "documentsFotterPrimary": "При получении электронной карточки держатель устанавливает категорию карточки (дизельная, бензиновая, топливная либо универсальная) и, при необходимости, суточную и/или месячную нормы отпуска.", "documentsFotterSecondary": { "beforeLink": "Изменить/установить нормы и/или заблокировать/разблокировать карточки также можно в ", "afterLink": ", или предоставив письменное заявление в отдел обслуживания по месту заключения договора." }, "lkbLink": "личном кабинете пользователя", "homeLink": "На главную", "upLink": "Наверх" };
const readerSVG = { "enter": "Ввод", "cancel": "Сброс", "return": "Возврат", "doze": "Доза", "menu": "Меню", "lang": "Язык", "massage1": "Введите пин-код", "massage2": "и нажмите “Ввод”" };
const dealResignationMain = { "name": "Расторжение договора", "cardTitle1": "О расторжении договора с НП ООО «Берлио»", "cardTitle2": "О расторжении договора с ОАО “Белгазпромбанком”", "homeLink": "На главную", "upLink": "Наверх" };
const priceListsAndTariffsMain = { "name": "Прейскуранты и тарифы", "cardTitle1": "Прейскурант №03/2024 от 22.02.2024 (для резидентов)", "cardTitle2": "Прейскурант №01/24 от 17.01.2024", "cardTitle3": "Прейскурант 03/2022 от 17.03.2022 с 21.03.2022", "homeLink": "На главную", "upLink": "Наверх" };
const workWithPrivateAccount = { "name": "Работа с личным кабинетом", "description": "Личный кабинет позволяет пользователю системы самостоятельно просматривать и редактировать информацию по договору:", "list1": { "item1": "общие данные", "item2": "список карт", "item3": "список платежей", "item4": "реализацию и баланс за текущий либо предыдущий месяц" }, "sections": "Разделы личного кабинета", "information": "Информация", "informationTagline": "дата заключения договора, адрес, телефон, email, УНП, банк, расчетный счет организации, текущий остаток денежных средств по договору", "payments": "Платежи", "paymentsTagline": "список платежей по договору за текущий или предыдущий месяц", "cardList": "Список карт", "cardListTagline": "перечень электронных карт договора с указанием номера, даты выдачи, состояния, категории (вида топлива) карты, а также расчитанной суммы на карте", "report": "Отчет о реализации", "reportTagline": "список отпущенных нефтепродуктов (н/п), товаров и услуг по электронным картам договора за месяц", "balance": "Баланс", "balanceTagline": "сальдо, обороты, НДС по договору за текущий или предыдущий месяц", "middleDescriptinon": "Внесение данных и изменение информации осуществляется при подписании соответствующего заявления (оригинал):", "lkbLink": "Перейти в личный кабинет", "homeLink": "На главную", "upLink": "Наверх" };
const documentsForDownloadMain = { "name": "Документы для скачивания", "boxesHeaders": { "lists": "Списки", "agreements": "Соглашения", "regCard": "Регистрационная карточка", "applications": "Заявления", "other": "Другие" }, "lsts": { "cardTitle1": "Список документов для заключения Договора присоединения", "cardTitle2": "Список документов для заключения Договора пользования с ГУ  «Белавтострада» (BelToll)" }, "agr": { "cardTitle1": "Соглашение о расторжении договора на обслуживание (организация)", "cardTitle2": "Соглашение о расторжении договора на обслуживание (ИП, уполномоченное лицо - родственник)", "cardTitle3": "Соглашение о расторжении договора на обслуживание (ИП, уполномоченное лицо - работник)", "cardTitle4": "Соглашение о расторжении договора на обслуживание (ИП)" }, "rCard": { "cardTitle1": "Регистрационная карточка клиента_общая (для ознакомления)" }, "app": { "cardTitle1": "Заявление на получение «Справки-акта о реализации» подписанной ЭЦП", "cardTitle2": "Заявление о блокировке, разблокировке лицевого счёта", "cardTitle3": "Заявление о блокировке, разблокировке средств доступа электронной платежной системы «Берлио»", "cardTitle4": "Заявление о возврате ошибочно перечисленной суммы денежных средств", "cardTitle5": "Заявление о закрытии лицевого счёта", "cardTitle6": "Заявление о запросе информации о ПИН-коде", "cardTitle7": "Заявление о переносе электронной карты с одного лицевого счёта на другой лицевой счёт", "cardTitle8": "Заявление о перераспределении сумм между лицевыми счетами Клиента (перенос)", "cardTitle9": "Заявление о перераспределении сумм между лицевыми счетами Клиента (распределение)", "cardTitle10": "Заявление о присоединении к договору присоединения (ИП)", "cardTitle11": "Заявление о присоединении к договору присоединения (ИП, уполномоченное лицо - работник)", "cardTitle12": "Заявление о присоединении к договору присоединения (ИП, уполномоченное лицо - родственник)", "cardTitle13": "Заявление о присоединении к договору присоединения (организация)", "cardTitle14": "Заявление о расторжении договора", "cardTitle15": "Заявление о регистрации транспортных средств в системе BelToll (2-3 оси)", "cardTitle16": "Заявление о регистрации транспортных средств в системе BelToll (4+ оси)", "cardTitle17": "Заявление об открытии и обслуживании лицевого счёта" }, "oth": { "cardTitle1": "Платежное поручение на покупку электронных денег", "cardTitle2": "Доверенность" }, "homeLink": "На главную", "upLink": "Наверх" };
const eMoneyRegulationsMain = { "name": "Регламент использования электронных денег «Берлио»", "descriptionFirst": "В рамках договора обслуживания в платежной системе электронных денег «БЕРЛИО» (далее - «Система») настоящим регламентом определен порядок использования электронных денег «БЕРЛИО»", "descriptionSecond": "В связи с установленным в системе порядком технологического сеанса связи (каждый рабочий день) между процессинговыми центрами и объектами, зачисление электронных денег на договоры и электронные карточки осуществляется следующим образом:", "descriptionThird": "При использовании устройств доступа:", "descriptionOl": { "item1": "Заказчик перечисляет на расчетный счет ОАО «Белгазпромбанк», согласно заключенному договору, денежные средства на приобретение электронных денег «БЕРЛИО»", "item2": "Исполнитель зачисляет денежные средства для приобретения электронных денег на договор Заказчика", "item3": { "span": "Электронные деньги распределяются Исполнителем следующим образом:", "header": "Остаток электронных денег Заказчика в системе по договору в сутки делится на 2 части:", "ulItem1": "- с 18:00 до 24:00 использование электронных денег можно произвести в размере 50% всех электронных денег", "ulItem2": "- с 24:00 до 18:00 следующего дня – на остальные 50%" }, "item4": "Если на договоре Заказчика имеется несколько электронных карточек – то остаток электронных денег одновременно с делением в сутки будет делиться и на количество имеющихся карточек, пропорционально суточной норме", "item5": "Если в текущие сутки была произведена реализация по конкретной электронной карте, то эта сумма уменьшает рассчитанный остаток электронных денег по этой карте (на текущие сутки)", "item6": "В выходные и/или праздничные дни остаток электронных денег Заказчика в системе по договору делится на 3 части", "item7": "Приобретение (использование) электронных денег можно произвести на рассчитанную сумму с учетом (за минусом) реализации за текущие сутки по данной карте", "item8": { "before": "Информирование участников системы о плановых перерывах в работе или возникновении технических сбоев программно-аппаратного комплекса системы, в работе телекоммуникационных операторов, осуществляется путем размещения соответствующего уведомления", "firstLink": " в новостях", "between": " и в", "secondLink": " личном кабинете клиента", "after": " с указанием возможного времени их устранения" } }, "homeLink": "На главную", "upLink": "Наверх" };
const legislationMain = { "name": "Ссылки на документы и законодательные документы РБ", "list": { "name": "Для ознакомления", "item1": "Закон Республики Беларусь от 19.04.2022 № 164-З «О платежных системах и платежных услугах»", "item2": "Реестр поставщиков платежных услуг и видов оказываемых ими платежных услуг", "item3": "Закон от 30 июня 2014 № 165-З «О мерах по предотвращению легализации доходов, полученных преступным путем, финансирования террористической деятельности и финансирования распространения оружия массового поражения»", "item4": "Постановление Правления Национального банка Республики Беларусь от 05.12.2022 № 453 «Об утверждении Инструкции о порядке оказания платежных услуг на территории Республики Беларусь»", "item5": "Постановление Правления Национального банка Республики Беларусь 31 декабря 2019 г. № 552 «Об утверждении стандартов проведения расчетов»", "item6": "Постановление Правления Национального банка Республики Беларусь от 06.10.2022 № 377 «Об утверждении инструкции о требованиях по защите информации и обеспечению кибербезопасности при оказании платежных услуг»", "item7": "Постановление Правления Национального банка Республики Беларусь от 16.09.2022 N 350 «Об утверждении Правил осуществления операций с электронными деньгами»", "item8": "Стандарт проведения расчётов СПР 7.01-2020 «Деятельность в области платежных систем и платежных услуг. Информационные технологии. Обеспечение непрерывной работы и восстановления работоспособности участника платежного рынка Республики Беларусь. Общие требования.»" }, "homeLink": "На главную", "upLink": "Наверх" };
const reportIFRMain = { "name": "Отчет об оценке ИФР", "list": "Для ознакомления", "cardTitle1": "Отчет об оценкке ИФР", "homeLink": "На главную", "upLink": "Наверх" };
const bicAppMain = { "name": "Приложение “Berlio Internet client”", "description": "НП ООО «БЕРЛИО» предлагает своим клиентам возможность для быстрого и удобного доступа к информации о договоре,  с помощью мобильного приложения «Berlio internet client»", "ulHeader": "Приложение предоставляет полный доступ к информации по договору:", "item1": "общая информация о договоре", "item2": "баланс на договоре", "item3": "список карт", "item4": "информация по карте", "item5": "платежи по договору", "item6": "список реализаций", "item7": "электронные счета-фактуры", "stong1": "Информация предоставляется за текущий и прошедший месяц. Меню приложения интуитивно понятное и легкое в освоении", "stong2": "Для использования мобильного приложения необходимо иметь договор с НП ООО «БЕРЛИО» на обслуживание в платежной системе электронных денег «БЕРЛИО»", "stong3": "Установите мобильное приложение на свой телефон. Используйте для входа в мобильное приложение тот же логин и пароль, как и в личном кабинете", "stong4": "Наше приложение доступно для пользователей Android и Iphone", "cardTitle1": "Скачать из Play Маркет", "cardTitle2": "Скачать из Apple Store", "homeLink": "На главную", "upLink": "Наверх" };
const newsBlock = { "sortBy": "Упорядочить:", "name": "Новости", "newFirst": "Сначала новые", "oldFirst": "Сначала старые", "backHome": "На главную" };
const paymentSystem = { "name": "Электронная платежная система «БЕРЛИО»", "coverage": "Систему поддерживают 97% АЗС Беларуси, а также заправки России.", "cardDescription": "Расчет за приобретаемое топливо, товары и услуги производится посредством электронной карточки «BERLIO», которая представляет собой пластиковую карту.", "actionSignContract": "Заключить договор", "gasStations": "АЗС" };
const fuelCards = { "name": "Топливные карты", "fuelCardsDescription1": "Оплата проезда транспортных средств по платным автомобильным", "fuelCardsDescription2": "Залоговая стоимость устройства электронной оплаты (бортового устройства)", "road": "Дорога", "cardTitle": "Выпуск в обращение и использование топливных карт" };
const actualSection = { "name": "Актуальное", "actualBlockTitle1": "Перечень заправок без процентов", "actualBlockDescription1": "Нужно что-то написать!", "actualBlockTitle2": "Оперативная помощь при обращении", "actualBlockDescription2": "Нужно что-то написать!", "actualBlockTitle3": "Сеть АЗС и маршрутов", "actualBlockDescription3": "Нужно что-то написать!" };
const newsSection = { "name": "Последние новости", "linkToNews": "К деталям новости", "prev": "влево", "next": "вправо" };
const detailedNewsMain = { "name": "Детали новости", "notFound": "Новость не найдена", "backToNews": "Вернуться к новостям", "date": "Дата" };
const ourPartnersLogoSection = { "name": "Наши партнеры", "mapLink": "Перечень АЗС", "homeLink": "На главную", "upLink": "Наверх" };
const ourClientsLogoSection = "Наши клиенты";
const equipment = { "name": "Оборудование и ПО", "descr1": "Ниже вы можете ознакомиться с оборудованием, разработанным для клиентов и партнеров НП ООО «БЕРЛИО»", "descr2": "Гарантийные обязательства по обслуживанию всего устанавливаемого оборудования составляют один год с момента установки. Послегарантийное обслуживание производится по дополнительному соглашению сторон", "partnersSoftSection": { "name": "ПО для партнеров «Берлио»", "headline1": "ПО “Веб Центр БЕРЛИО”", "headline2": "ППП “НЕФТЬ И КАПИТАЛ”", "headline3": "Касса самообслуживания для сетей АЗС", "headline4": "ППП “Система автоматизации АЗС”", "headline5": "Сайт для выставления счетов-фактур", "plate": "Микросхема" }, "clientsSoftSection": { "name": "ПО для клиентов «Берлио»", "headline1": "Мобильное приложение “BERLIOCARDPAY”", "headline2": "Касса самообслуживания для сетей АЗС", "headline3": "ПО “Личный кабинет клиента”", "homeLink": "На главную", "upLink": "Наверх" } };
const webCenterMain = { "name": "ПО “Веб Центр БЕРЛИО”", "description": "Программное обеспечение «ВебЦентрБерлио» (далее – ВЦ) представляет собой сетевое приложение, размещаемое на сервере, предназначенное для организации работы с клиентами, использующими для безналичных расчетов электронные/топливные карты «БЕРЛИО». ВЦ позволяет регистрировать договоры, карты и Бортовые устройства (далее – БУ), допускать электронные кошельки (далее – ЭК) к использованию, блокировать/разблокировать их использование на объектах, вести бухгалтерский и статистический учёт финансовых операций в платежной системе электронных денег «БЕРЛИО» (далее – Система), с использованием ЭК и электронных денег (далее – ЭД), прослеживать денежный оборот в пределах Системы.", "list1": { "title": "ПРЕИМУЩЕСТВА ВЦ:", "item1": "ВЦ является сетевым приложением;", "item2": "доступ к данным приложения осуществляется с любого компьютера, имеющего выход в сеть;", "item3": "автоматическое обновление приложения (при запуске приложения);", "item4": "для работы приложения нет необходимости содержать собственный сервер и системы резервирования данных;", "item5": "техническая поддержка приложения в режиме 'Online';", "item6": "постоянное развитие проекта, создание и наполнение новым функционалом (в соответствии с требованиями и предложениями заказчика и собственным видением развития Системы)", "item7": "гибкая настройка отчетов с возможностью формирования в различных форматах;", "item8": "квалифицированная поддержка службы и своевременное обновление программ и модулей до актуальных версий." }, "list2": { "title": "ОСНОВНЫЕ ФУНКЦИИ ПРОГРАММЫ ПО РАБОТЕ С КЛИЕНТАМИ:", "item1": "заключение договоров с клиентами на обслуживание в системе электронных денег «Берлио»;", "item2": "учёт выдачи карт;", "item3": "занесение платежных документов на договор;", "item4": "формирование ежемесячных отчетов;", "item5": "автоматический расчет денежных средств на карте в зависимости от остатка денежных средств на счете клиента;", "item6": "формирование информационно-статистических отчетов." }, "list3": { "title": "ОСНОВНЫЕ ФУНКЦИИ ВЦ ПРИ РАБОТЕ С УЧАСТНИКАМИ СИСТЕМЫ, ", "subTitle": "расчётными центрами других организаций, объектами (пунктами торговли и сервиса с использованием оборудования по приёму карт):", "item1": "конфигурирование центров, объектов и устройств;", "item2": "приём отчетов от центров и объектов;", "item3": "анализ центров и объектов." }, "homeLink": "На главную", "upLink": "Наверх" };
const oilAndCapitalMain = { "name": "ППП «Нефть и капитал»", "list": { "title": "Описание программы", "subTitle": "Комплекс программ состоит из следующих программ:", "item1": "«НЕФТЬ & КАПИТАЛ. Налив» автоматизирует рабочее место оператора налива нефтепродуктов в автоцистерны и железнодорожные цистерны;", "item2": "«НЕФТЬ & КАПИТАЛ. Мониторинг резервуаров» позволяет получать оперативную информацию о состоянии каждого резервуара. Программа получает данную информацию от уровнемера;", "item3": "«НЕФТЬ & КАПИТАЛ. Бухгалтерия» автоматизирует ведение товарного и бухгалтерского учета на объектах нефтепродуктообеспечения, газоснабжения, товарных базах и оптовых складах, а также подготовки документов по обеспечению и контролю качества нефтепродуктов и газа;", "item4": "«НЕФТЬ & КАПИТАЛ. Автовесы. Железнодорожные весы» позволяет получать информацию от электронных автомобильных и железнодорожных весов, уведомлять оператора о появлении на весах транспортного средства;", "item5": "«НЕФТЬ & КАПИТАЛ. Химическая лаборатория» предназначена для автоматизации документооборота лабораторий химического анализа нефти, нефтепродуктов, а также сжиженных углеводородных газов." }, "homeLink": "На главную", "upLink": "Наверх" };
const selfServiceCheckoutMain = { "name": "Касса самообслуживания", "descriptionFirst": "Автоматизация процессов розничной торговли – один из наиболее актуальных трендов последнего времени. Это тенденция добралась и до сетей АЗС. Автоматизация позволят решать задачи по нескольким направлениям, в первую очередь это предоставления большого набора функций для клиента и оптимизация работы персонала на АЗС.", "descriptionPreBold": "Для решения этих задач НП ООО «Берлио» предлагает новый программный продукт для сетей АЗС – ", "descriptionBold": "кассу самообслуживания (далее – КСО).", "descriptionSecond": "Что такое КСО? В чем заключаются преимущества использования данных систем и какие возможности открываются для пользователей АЗС?", "list1": { "supDescription": "КСО – это программно-аппаратный комплекс, предназначенный для самостоятельной оплаты топлива и сопутствующих товаров клиентом, без привлечения оператора на АЗС. Перечень основных возможностей КСО:", "item1": "оплата топлива и сопутствующих товаров с помощью безналичных способов оплаты: банковские карты, карты «Берлио», системы оплаты «Оплати» и «Cashew» (контактная/бесконтактная);", "item2": "использование карт лояльности, промокодов и баллов;", "item3": "оплата топлива и услуг, оказываемых на АЗС (пылесос, мойка и т.д.);", "item4": "оплата кофе и фастфуда;", "item5": "размещения рекламы." }, "descriptionThird": "НП ООО «Берлио» предлагает полный комплекс услуг по интеграции и развертыванию КСО, а также техническую поддержку и консультирование специалистов сетей АЗС. При этом каждый проект внедрения адаптируется под особенности, специфику и потребности заказчика – как в плане технического обеспечения, так и цен на проведение работ.", "descriptionFourth": "Технически, КСО состоят из трех основных модулей: модуля управления и обработки данных по товарам, платежного модуля (включая функцию приема банковских карт и карт лояльности), а также контрольных весов, обеспечивающих точность взвешивания и исключающих обман покупателями при оплате.", "list2": { "supDescription": "Какие задачи могут решать КСО на АЗС:", "item1": "оптимизация расходов на оплату труда и снижение нагрузки на персонал АЗС. За счет касс самообслуживания можно значительно увеличить пропускную способность АЗС, не привлекая к работе дополнительных сотрудников, которых можно привлечь к решению других видов задач;", "item2": "сокращение очередей. Рост количества клиентов в выходные дни и часы пик приводит не только к лишней нагрузке на кассы, но и к недовольству самих посетителей. Установка КСО способствует уменьшению очередей на 15-20% даже в период большой активности людей;", "item3": "быстрый расчет и снижение риска ошибок. Современные технологии позволяют наделять КСО высокой точностью. Программное обеспечение обеспечивает максимально корректное распознавание товара за доли секунды, а при заминках или выборе клиентом не того товара, ошибка устраняется практически мгновенно;", "item4": "эргономичное использование торговой площади АЗС. Даже несколько касс самообслуживания занимают примерно столько же места, сколько и один традиционный кассовый узел, что позволяют более выгодно использовать торговые площади АЗС;", "item5": "повышение уровня продаж и степени лояльности покупателей. Сегодня клиенты розничной торговли предпочитают покупать быстро – и при этом иметь точное и подробное представление о том, что именно они покупают. КСО способны удовлетворить все эти потребности, что привлекает больше посетителей;", "item6": "КСО можно использовать как доступную и удобную платформу для размещения контекстной рекламы (статические картинки, видео ролики и т.д.).", "subDescription": "Сегодня можно с уверенностью говорить о росте спроса на КСО в ближайшем будущем. Автоматизированное торговое оборудование демонстрирует широкие возможности во всех аспектах ритейла – от создания комфортных условий для покупателей до значительного роста продаж." }, "homeLink": "На главную", "upLink": "Наверх" };
const gsAutomationSystemMain = { "name": "ППП «Cистема автоматизации АЗС»", "supTitle": "Пакет прикладных программ", "subTitle": "Описание программы", "descriptionFirst": "Пакет прикладных программ «Система автоматизации АЗС» – новый проект НП ООО «Берлио», предназначенный для решения задач по управлению сетью АЗС на различных уровнях. Программное обеспечение реализовано в виде многоуровневой системы, позволяющей организовать удалённое управление АЗС из офиса компании, мониторинг процессов на АЗС, передачу и получение данных в реальном режиме времени, распределение задач и актуализацию информации на АЗС, автоматизацию рабочих мест менеджеров и операторов на АЗС и многое другое.", "descriptionSecond": "ППП реализован на принципиально новой программной платформе с возможностью оперативного внедрения, обслуживания и масштабирования.", "list1": { "title": "ВЕРХНИЙ УРОВЕНЬ", "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Управление»", "secondSubTitleBold": "Программное обеспечение «Офис» ", "secondSubTitle": "обеспечивает решение следующих задач из офиса компании:", "item1": "централизованно формировать и отправлять на АЗС данные по ценам на нефтепродукты и услуги;", "item2": "получать курсы валют с НБРБ, пересчитывать цены на нефтепродукты и услуги и оправлять их на АЗС;", "item3": "управлять видами оплаты;", "item4": "управлять доступом операторов (добавлять операторов, блокировать);", "item5": "получать в режиме онлайн информацию о чеках и реализациях, данные по резервуарам;", "item6": "просматривать чеки, документы и «Z-отчеты», отправленные в СККО;", "item7": "получать актуальные остатки по товарам;", "item8": "управлять медиарекламой на мониторах на АЗС (загружать медиафайлы, устанавливать приоритет и периодичность воспроизведения, учитывать статистику воспроизведения).", "imageTitle": "Общая схема ППП", "imageAltAndTitle": "Общая схема ППП" }, "list2": { "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Обслуживание»", "secondSubTitleBold": "Программное обеспечение «ЦТО» ", "secondSubTitle": "обеспечивает в режиме онлайн: мониторинг и обслуживание АЗС, управление конфигурациями АЗС, просмотр системных журналов ошибок, обновление программного обеспечения и базы данных, осуществление резервирования данных." }, "list3": { "title": "НИЖНИЙ УРОВЕНЬ", "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Управление»", "secondSubTitleBold": "Программное обеспечение «Сервер АЗС» ", "secondSubTitle": "обеспечивает: взаимодействие с базой данных на АЗС и внешними хранилищами данных: ПО «Офис», ПО «ЦТО» (также рассматривается возможность работы с облачными ресурсами), синхронизацию рабочих мест, передачу команд управления оборудованием на АЗС (ТРК, пылесосы, мойки, терминал самообслуживания и другое оборудование),  отпуск топлива через мобильное приложение (сервис «SmartPay»)." }, "list4": { "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Менеджер»", "secondSubTitleBold": "Программное обеспечение «Менеджер» ", "secondSubTitle": "обеспечивает прием НП, позволяет вести учет товаров, производить корректировку показателей НП в резервуарах, корректировку счетчиков ТРК, управление доступом операторов к кассовым операциям, просмотр статистики за смену, формирование отчетов." }, "list5": { "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Оператор»", "secondSubTitleBold": "Программное обеспечение «Оператор» ", "secondSubTitle": "обеспечивает продажу НП, товаров и услуг на АЗС за различные виды оплаты, выполнение кассовых операций: аннулирование чека, возврат товаров (услуг) и НП, внесение и выдачу денежных средств, взаимодействие с кассовым оборудованием (чековые принтеры, банковские и топливные терминалы, весы, считыватели штрих-кодов (Qr-кодов), индикаторы покупателей и т.д.), индикацию состояния оборудования на АЗС, формирование отчетов и просмотр данных необходимых для оператора." }, "list6": { "firstSubTitle": "Уровень ", "firstSubTitleBold": "«Инфраструктура»", "secondSubTitleBold": "Решаемые задачи:", "item1": "поддержка развитой инфраструктуры АЗС:", "item2": "вывод информации о работе АЗС (отпуск топлива, готовность заказов, реклама);", "item3": "распознавание номеров машин и передача их в АСУ;", "item4": "управление стелой с ценами на топливо;", "item5": "контроль за работой оборудования на АЗС;", "item6": "прием и обработка электронных накладных с нефтебаз и др." }, "list7": { "title": "ОСНОВНЫМИ НОВЫМИ ВОЗМОЖНОСТЯМИ ЯВЛЯЮТСЯ:", "item1": "Гибкая и настраиваемая конфигурация рабочих мест и сервера, что позволяет создать равнозначные рабочие места операторов с возможностью настройки приоритетов для обработки чеков при включении ТРК посредством считывающих устройств, производства НП ООО «БЕРЛИО» и при оплате мобильными приложениями;", "item2": "Настраиваемая конфигурация с наличием отдельно выделенного компьютера под сервер, что позволяет снизить нагрузку на рабочее место, обеспечить резервное копирование базы данных и оптимизацию выполнения фоновых задач на сервере, что в конечном итоге приведет к исключению «простоя» АЗС;", "item3": "Возможность отпуска НП используя различные режимы «Предоплаты», «Постоплаты», «До полного бака»;", "item4": "Реализация продажи только в режиме «Формирования чека», что позволяет наглядно видеть оператору состав чека (сумму, общую скидку и скидку по каждой позиции), в случае отмены оплаты нет необходимости заново формировать чек;", "item5": "Возможность на рабочем месте оператора формировать несколько чеков в очередь. Данный функционал позволяет отложить сформированный чек и приступить к формированию нового чека для следующего клиента в очереди в случае, если текущий клиент забыл карту для оплаты или отошел за другими товарами;", "item6": "Применение различных платформ кассового оборудования на выбор: фискальный регистратор «TFP-115», «TFP-116», «TFP-118», программная касса «iKASSA»;", "item7": "Наличие новых видов оплаты: смешанная оплата (наличные + банковская карта + сертификаты + подарочные карты), оплата посредством мобильных приложений, оплата различными платежными системами («Оплати», «Cashew»). Добавление новых видов оплаты реализовано отдельным модулем, что существенно сокращает время на реализацию нового функционала;", "item8": "Взаимодействие с программой лояльности;", "item9": "Наличие сенсорного управления в различных режимах отображения;", "item10": "Основной режим формирования чека «Чек до заправки»;", "item11": "Основной режим работы по картам «Берлио» – «Онлайн»;", "item12": "Возможность на рабочем месте оператора формировать группы товаров для добавления их в чек одним нажатием (комбинированные товары);", "item13": "Возможность выдачи наличных по банковской карте;", "item14": "Возможность сверки отчетов и чеков с СККО;", "item15": "Возможность проводить через систему «Расчет» – автоматизированная информационная система единого расчетного и информационного пространства (АИС ЕРИП);", "item16": "Наличие возможности настройки печати дополнительных квитанций к основному чеку;", "item17": "Получение полных данных с уровнемеров в автоматизированном режиме по протоколам TCP-IP, что позволяет оперативно реагировать на окончание топлива;", "item18": "Реализация заправки «На полный бак» через отложенные реализации, что увеличивает пропускную способность АЗС; и многое другое." }, "homeLink": "На главную", "upLink": "Наверх" };
const invoicesSiteMain = { "name": "Сайт выставления электронных счетов-фактур", "siteLink": "https://эсчф.бел", "altAndTitle": "интерфейс https://эсчф.бел", "description": "Сайт для выставления электронных счетов-фактур (ЭСЧФ) предназначен для автоматизации выставления ЭСЧФ клиентов, юридических лиц и индивидуальных предпринимателей, позволяя им самостоятельно подавать заявки на выставление ЭСЧФ по имеющемуся кассовому чеку.", "list1": { "title": "Основные возможности для клиентов:", "listItem1": "самостоятельная подготовка заявок на выставление ЭСЧФ через сайт по кассовому чеку;", "listItem2": "контроль поданных заявок (просмотр информации о статусе обработки ЭСЧФ порталом налоговой инспекции);", "listItem3": "группировка всех своих заявок на сайте с возможность гибкого поиска и фильтрации, а таже выгрузки во внешние программы." }, "list2": { "title": "Основные возможности для компании:", "listItem1": "снижение трудозатрат на подготовку и выставления ЭСЧФ клиентов по кассовым чекам;", "listItem2": "разгрузка персонала (в связи с тем, что клиенты все делают самостоятельно);", "listItem3": "мониторинг поданных заявок на ЭСЧФ и управление пользователями портала;", "listItem4": "возможность размещения рекламных баннеров на сайте;", "listItem5": "автоматические уведомления на выбранные события (например, добавление заявок на выставление ЭСЧФ по закрытому периоду);", "listItem6": "возможность рассылок клиентам, подтвердившим свое согласие, информации (новости, изменение законодательства и т.д.)." }, "list3": { "title": "Работа с сайтом, основные функции и возможности:", "listItem1": "Вход на сайт - авторизация на сайте осуществляется по электронной почте и паролю;", "listItem2": "Регистрация пользователя портала, для которой необходимо указать следующие данные:", "listItem2Details": { "item1": "адрес электронной почты;", "item2": "пароль для работы с порталом;", "item3": "УНП (учетный номер плательщика) организации;", "item4": "телефон - номер контактного телефона пользователя по вопросам ЭСЧФ. работы на портале и т.д." }, "listItem3": "Просмотр заявок (информация о заявке):", "listItem3Details": { "item1": "«№ заявки»(#) – порядковый номер заявки на портале. Заявки нумеруются по каждой организации (УНП) отдельно;", "item2": "«Дата заявки» - дата регистрации заявки на портале;", "item3": "«АЗС» - внутренний (в пределах организации-продавца) номер торгового объекта (автозаправочной станции);", "item4": "«Дата чека» - дата и время совершения покупки;", "item5": "«Номер чека» (№) - номер кассового чека покупки;", "item6": "«СКНО номер» - номер торговой операции, зарегистрированный в налоговом органе с помощью СКНО (средства контроля налоговых органов);", "item7": "«товар /услуга» - название товара, услуги или продукта согласно кассового чека;", "item8": "«Вид оплаты» - наличные, банковская карта и т.д.;", "item9": "«Цена» - цена товара, продукта или услуги в белорусских рублях (BYN);", "item10": "«Количество» - количество товара, продукта или услуги в соответствующих единицах измерения;", "item11": "«Стоимость» - товара, продукта или услуги в белорусских рублях (BYN);", "item12": "«Скидка» - денежная сумма скидки в белорусских рубля (BYN) по данной товарной позиции;", "item13": "«НДС» - сумма налога на добавленную стоимость в белорусских рублях (BYN) по данной товарной позиции;", "item14": "«%НДС» - ставка налога на добавленную стоимость в процентах по данной товарной позиции;", "item15": "«Номер ЭСЧФ» - номер электронного счета-фактуры после его выставления;", "item16": "«Дата выставления ЭСЧФ» - дата, когда был выставлен электронный счет-фактура;", "item17": "«Предприятие продавец» - название торгового предприятия, где совершена покупка;", "item18": "«УНП» - Учетный номер плательщика торгового предприятия, где совершена покупка;", "item19": "«Адрес» - юридический адрес торгового предприятия, где совершена покупка;", "item20": "«Код» - цифровой код статуса электронного счета-фактуры;", "item21": "«Статус ЭСЧФ» - текстовое описание статуса счета-фактуры." } }, "list4": { "listItem1": "Поиск заявок.", "listItem2": "Фильтры.", "listItem3": "Добавление заявки.", "listItem4": "Копирование заявки.", "listItem5": "Аннулирование заявки.", "listItem6": "Обновить список заявок.", "listItem7": "Печать заявок." }, "list5": { "title": "Экспорт заявок в файл:", "subTitle": "Портал ЭСЧФ поддерживает выгрузку заявок в следующие форматы:", "listItem1": "«WORD» (Документ формата Microsoft Word - DOCX)", "listItem2": "«EXCEL» (Документ формата Microsoft Excel - XLSX)", "listItem3": "«PDF» (Документ формата PDF: можно в дальнейшем просмотреть программами Adobe Reader, Foxit Reader, Microsoft Word и т.д.)", "listItem4": "«CSV» (Документ формата CSV: можно в дальнейшем просмотреть программами Microsoft Excel и др., а также импортировать во внешние программы, например, «1С» и др.)", "listItem5": "«XML» (Документ формата XML - можно импортировать во внешние программы, например, «1С» и др.)", "listItem6": "«JSON» (Документ формата JSON -можно импортировать во внешние программы, например, «1С» и др.)" }, "list6": { "title": "Заключение договора и условия поставки: ", "firstSubTitle": "Работа сервиса осуществляется с использованием программного интерфейса API «APIBerlioInfo», который работает в режиме онлайн", "secondSubTitle": "Стоимость подключения к сервису:", "listItem1": "Лицензия на веб-сайт - 1 420,00 рублей без НДС. (единоразовый платеж, цена на услугу может измениться, уточняйте у менеджера). Поставка осуществляется по лицензионному договору.", "listItem2": "Использование программного интерфейса API «APIBerlioInfo» (ежемесячный платеж). Подключение осуществляется по отдельному договору с ежемесячной оплатой согласно Прейскуранта." }, "list7": { "title": "Тарифные планы для доступа к интерфейсу API «Berlio Info»:", "subTitle": "Прейскурант" }, "list8": { "title": "ДОПОЛНИТЕЛЬНО:", "firstSubTitle": "Развёртывание сайта с названием вашей компании. Например,", "colorSpan": "«компания.эсчф.бел»", "secondSubTitle": "Печать в чеке продажи на АЗС информации о сайте для выставления ЭСЧФ." }, "homeLink": "На главную", "upLink": "Наверх" };
const invoicesSiteTariffsMain = { "name": "API «Berlio Info»", "description": "Программное обеспечение «API «Berlio Info» представляет собой программный интерфейс, работающий в «Online» режиме и позволяющий по запросу пользователя получать информацию о состоянии договора (топливных картах) и всех проведенных платах. По желанию пользователя можно настроить получение любой информации о договоре.", "strongDescription": "API «Berlio Info» доступен всем пользователям, заключившим договор на обслуживание в системе электронных денег «Берлио».", "list": { "title": "Основные решаемые задачи:", "listItem1": "получение списка клиентов;", "listItem2": "получение информации о клиенте;", "listItem3": "получение списка карт на договоре;", "listItem4": "получение данных о балансе и оборотах за произвольный месяц/период;", "listItem5": "формирование списка реализаций и платежей клиента;", "listItem6": "формирование выгрузки данных в различные учетные системы в форматах (XML, JSON);", "listItem7": "получение сведений в режимах «Online» и «24/7» и т.д.", "ps": "Список всех реализованных запросов можно посмотреть на сайте сервиса:" }, "wrapper1": { "title": "Подключение API", "subTitle": "Для получения доступа к интерфейсу API «Berlio Info» необходимо прислать заявление на фирменном бланке с указанием названия организации и номера договора. Заявления отправлять по адресу" }, "serviceCardHeader": "Тарифные планы для доступа к интерфейсу API «Berlio Info»", "cardTitle1": "Тарифы для доступа к «API «Berlio Info»", "wrapper2": { "title": "Инструкция для подключения к API", "cont1": { "title": "Требования для подключения API", "subTitle": "Требования", "listItem1": "Подключение к API «Berlio Info» (далее – API) возможно только для клиентов, заключивших договор на обслуживание в системе электронных денег «Берлио».", "listItem2": "Перед использованием API ознакомиться с Прейскурантом цен на услуги доступа.", "listItem3": "Для подключения доступа к API написать письмо с просьбой включения данной услуги на договоре." }, "cont2": { "title": "Порядок подключения к API", "subTitle": "Подключение", "listItem1": "После получения заявки на подключение услуги доступа к API клиенту сообщается токен для вызова методов API.", "listItem2": "Расширяемый перечень методов API доступен по адресу:", "listItem3": "Клиент самостоятельно разрабатывает свое программное обеспечение для доступа к API." }, "cont3": { "title": "Оплата за услугу доступа к API", "subTitle": "Оплата", "listItem1": "Списание производится с договора ежемесячно единой суммой согласно общего количества запросов за месяц по ценам Прейскуранта.", "listItem2": "После каждого обращения (запроса) к API производится расчет стоимости услуги и корректировка суммы списания." } }, "homeLink": "На главную", "upLink": "Наверх" };
const berlioCardPayMain = { "name": "Приложение “BERLIOCARDPAY”", "description": { "title": "BerlioCardPay", "subTitle": "Мобильное приложение «BerlioCardPay» для юридических лиц и сетей АЗС, работающих с использованием электронных денег «Берлио».", "listTitle": "Возможности приложения:", "item1": "электронные карты «Берлио» в вашем мобильном телефоне;", "item2": "привязка электронных карт к приложению с помощью личного кабинета", "item3": "просмотр статистики по заправкам в реальном режиме времени;", "item4": "заправка по виртуальной карте не выходя из автомобиля." }, "homeLink": "На главную", "upLink": "Наверх" };
const smartPayAppMain = { "name": "Приложение “SMARTPAY”", "description": { "title": "Описание программы", "subTitle1": "ПО «SmartPay» - система оплаты топлива на АЗС посредством мобильного приложения.", "subTitle2": "ПО представляет собой сервис-ориентированный комплекс приложений, обеспечивающих оплату и включение топливораздаточных колонок на АЗС через мобильное приложение, без участия оператора.", "listTitle": "ПО «SmartPay» состоит из двух частей:", "item1": "«SmartPayClient» (устанавливается на АЗС Заказчика);", "item2": "«SmartPayServer» (устанавливается в офисе на сервере Разработчика).", "ps": "Взаимодействие ПО «SmartPay» с мобильным приложением осуществляется через сервер Заказчика в соответствии с протоколом, предоставленным Разработчиком." }, "homeLink": "На главную", "upLink": "Наверх" };
const personalAccWebAppMain = { "name": "ПО “Личный кабинет клиента”", "description": { "title": "Описание программы", "subTitle": "ПО «Личный кабинет клиента» предназначено для получения клиентом необходимой информации по счету, картам, реализациям, платежам, а также настройки карт, скачивания отчетных документов, подключения дополнительных сервисов.", "listTitle": "Основные решаемые задачи:", "item1": "просмотр информации о состоянии текущего счета;", "item2": "просмотр и редактирование данных о картах, установка лимитов на карты;", "item3": "получение отчетной информации о реализациях (в т.ч. списка, выставленных на портал налоговой инспекции электронных счет-фактур), платежах, оборотах и балансе за различные периоды;", "item4": "подключение различных сервисов и услуг (оповещение о текущем балансе, SMS и E-mail оповещение, оплата платных дорог, заказ топливных карт других операторов, оплата мобильной связи и других)." }, "homeLink": "На главную", "upLink": "Наверх" };
const privacyMain = /* @__PURE__ */ JSON.parse('{"name":"Обработка персональных данных","cookieConsentPolicy":"Обработка файлов cookies","cookieData":{"title":"ПОЛИТИКА","subTitle":"НП ООО «БЕРЛИО» в отношении обработки файлов куки"},"cookieDataTitles":{"num1":"1. ОБЩИЕ ПОЛОЖЕНИЯ","num2":"2. СУЩНОСТЬ ТЕХНОЛОГИИ КУКИ И ЦЕЛИ ОБРАБОТКИ ФАЙЛОВ КУКИ","num3":"3. ВИДЫ ИСПОЛЬЗУЕМЫХ ОРГАНИЗАЦИЕЙ ФАЙЛОВ КУКИ И СРОКИ ИХ ХРАНЕНИЯ","num4":"4. ПОРЯДОК И УСЛОВИЯ ТРАНСГРАНИЧНОЙ ПЕРЕДАЧИ ДАННЫХ ФАЙЛОВ КУКИ","num5":"5. ПОЛУЧЕНИЕ СОГЛАСИЯ ПОЛЬЗОВАТЕЛЯ САЙТА НА ОБРАБОТКУ ФАЙЛОВ КУКИ","num6":"6. УПРАВЛЕНИЕ ДАННЫМИ, СОБИРАЕМЫМИ С ПОМОЩЬЮ ФАЙЛОВ КУКИ"},"cookieDataContent":{"num1":{"item1":"1.1. Политика НП ООО «БЕРЛИО» в отношении обработки файлов куки (далее – Политика) разработана в соответствии с Законом Республики Беларусь от 07.05.2021 № 99-З «О защите персональных данных» (далее – Закон о защите персональных данных) и иными актами законодательства Республики Беларусь, а также Уставом НП ООО «БЕРЛИО» в целях обеспечения защиты прав и свобод пользователей Сайта НП ООО «БЕРЛИО» https://berlio.by/ (доменные имена ресурсов и информационных систем Агентства в сети Интернет, на которые также распространяется действие Политики: cardcenter.by, lkb.by, эсчф.бел), (далее – Сайт) при обработке их персональных данных.","item2":"1.2. Политика разъясняет пользователям Сайта, какие типы файлов куки (cookie) используются на Сайте, для каких целей и каким образом НП ООО «БЕРЛИО» (далее – Организация) обрабатывает файлы куки, кому они передаются, порядок дачи согласия или отказа от дачи согласия на обработку файлов куки, другую значимую для субъекта информацию, позволяющую ему осознанно принимать решение о даче такого согласия.","item3":"1.3. Действие настоящей Политики распространяется на следующие действия с файлами куки: сбор, систематизацию, хранение, использование, предоставление, удаление. Сведения из файлов куки обрабатываются Организацией исключительно с использованием средств автоматизации.","item4":"1.4. В Политике используются основные термины и их определения в значении, определенном статьей 1 Закона о защите персональных данных.","item5":"1.5. В Политике также используются следующие понятия в значении:","item6":"Оператор / Организация – НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55; общий адрес электронной почты: berlio@berlio.by; общий телефон: +375(17)3691083;","item7":"Сайт – интернет-ресурс НП ООО «БЕРЛИО»: https://www.berlio.by/;","item8":"Пользователь Сайта – субъект персональных данных (физическое лицо), использующий Сайт Организации в соответствии с его функциональным назначением.","item9":"1.6. Политика вступает в силу с момента утверждения и распространяет действие на обработку файлов куки на Сайте Организации.","item10":"1.7. Во исполнение требований пункта 4 статьи 17 Закона о защите персональных данных Политика является общедоступным документом, размещается для свободного доступа в Организации, а также в сети Интернет на Сайте и предусматривает возможность ознакомления с Политикой любых лиц.","item11":"1.8. Организация как Оператор вправе при необходимости в одностороннем порядке вносить в Политику изменения и дополнения с последующим размещением новой редакции Политики на Сайте Организации. Субъекты самостоятельно получают на Сайте Организации информацию об изменениях Политики.","item12":"1.9. Пользователь Сайта вправе обратиться с заявлением о реализации своих прав, предусмотренных статьями 10–13 Закона о защите персональных данных, а также по вопросам, связанным с использованием Организацией файлов куки, направив заявление в письменной форме либо в виде электронного документа, оформленное в соответствии со статьей 14 Закона о защите персональных данных, на почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55, НП ООО «БЕРЛИО» (Организация / Оператор) либо на адрес электронной почты: dpo.minsk@berlio.by.","item13":"1.10. Заявление субъекта персональных данных о реализации его прав должно содержать: его персональные данные – фамилию, собственное имя, отчество (если таковое имеется), адрес его места жительства (места пребывания), дату рождения, идентификационный номер (при отсутствии такого номера – номер документа, удостоверяющего личность субъекта персональных данных, в случаях, если эта информация указывалась субъектом персональных данных при даче своего согласия Оператору или обработка персональных данных осуществляется без согласия субъекта персональных данных); изложение сути его требований; его личную подпись либо электронную цифровую подпись.","item14":"1.11. За содействием в реализации своих прав Пользователь может также обратиться к лицу, ответственному за осуществление внутреннего контроля за обработкой персональных данных в Организации, направив сообщение на адрес электронной почты: dpo.minsk@berlio.by или обратившись по телефону: +375(17)3691083."},"num2":{"item1":"2.1. Файлы куки (сookie) – это небольшие текстовые файлы, сохраненные в браузере компьютера или мобильного устройства Пользователя Сайта.","item2":"Файлы куки отправляются на компьютер или мобильное устройство Пользователя при посещении Сайта. Сайт сохраняет файлы куки на компьютере или мобильном устройстве Пользователя, когда он открывает Сайт. При каждом последующем посещении Сайта файлы куки отправляются обратно на исходный Сайт.","item3":"Файлы куки действуют как память Сайта, позволяя ему запоминать компьютер / мобильное устройство Пользователя при последующих посещениях.","item4":"Файлы куки могут запоминать настройки Пользователя, делать пользование Сайтом более удобным; позволяют Пользователю Сайта не вводить заново или выбирать те же параметры при повторном посещении Сайта, персонализировать содержание Сайта посредством фиксации предпочтений Пользователя, а также настраивать релевантную интересам Пользователя рекламу, улучшая пользовательский опыт.","item5":"Полученная при использовании файлов куки информация может включать сведения о браузере и устройстве Пользователя, данные, собранные в процессе автоматического электронного взаимодействия устройства Пользователя и Сайта, в том числе статистическую и маркетинговую информацию.","item6":"2.2. Организация обрабатывает файлы куки в целях:","item7":"корректного функционирования Сайта и повышения удобства его использования;","item8":"сбора аналитической информации в обобщенном виде для оценки и дальнейшего улучшения работы Сайта;","item9":"оценки пользовательской активности на Сайте;","item10":"предоставления персонализированной рекламы с учётом интересов пользователей Сайта.","item11":"2.3. Организация не использует файлы куки для идентификации субъектов персональных данных."},"num3":{"item1":"3.1. Организация использует (обрабатывает) файлы куки:","item2":"функциональные (технические, необходимые) файлы куки – используются для обеспечения работы и управления Сайтом; необходимы для выполнения Сайтом своих функций и предоставления предполагаемых услуг; позволяют Пользователю просматривать Сайт и использовать его функции; такие файлы куки не требуют согласия на использование на Сайте в случаях, когда хранение информации или получение доступа к информации необходимы для обеспечения циркуляции информации в сети электронной связи;","item3":"персонализированные файлы куки (файлы настроек) – позволяют запоминать информацию и обеспечить Пользователю индивидуальный опыт использования Сайта; устанавливаются в ответ на его действия; такие файлы куки не требуют согласия на использование на Сайте, так как они отвечают за услугу, непосредственно запрашиваемую Пользователем, при условии, что указанные файлы куки используются только для этой цели;","item4":"аналитические (статистические) файлы куки – необязательные (вспомогательные) файлы куки, которые позволяют отслеживать и анализировать поведение Пользователя на Сайте, сохраняют историю посещений Пользователя на страницах Сайта в целях повышения качества функционирования Сайта, определения наиболее и наименее популярных страниц Сайта, обеспечения анализа данных, связанных с использованием услуг, предоставляемых пользователям Сайта; эти файлы куки собирают следующие данные: IP-адрес, тип браузера, платформа, язык, посещенные страницы, время нахождения на Сайте и другую аналитическую информацию; данный тип файлов куки для целей аналитики анонимизируется (обезличивается) и не содержат персональные данные пользователей; такие файлы куки требуют согласия на использование на Сайте;","item5":"рекламные (маркетинговые) файлы куки – необязательные (вспомогательные) файлы куки, которые используются Организацией для целей маркетинга и улучшения качества рекламы, создавая профили интересов пользователей и предлагая им персонализированную релевантную рекламу, которая наиболее соответствует их предпочтениям, интересам; такие файлы куки требуют согласия на использование на Сайте.","item6":"По сроку хранения в браузере устройства Пользователя:","item7":"сеансовые файлы куки – являются временными и хранятся до момента закрытия браузера Пользователем или окончания сеанса использования Сайта;","item8":"постоянные файлы куки – подлежат хранению в памяти устройства Пользователя в течение времени, указанного в параметрах файлов куки, или до момента их непосредственного удаления самим Пользователем.","item9":"В зависимости от правообладания:","item10":"собственные файлы куки – устанавливаются непосредственно Организацией в целях улучшения работы Сайта;","item11":"сторонние (файлы куки третьих лиц) – формируются третьими лицами в автоматическом режиме и используются Организацией как аналитический инструмент взаимодействия Пользователя с Сайтом и настройки актуальной рекламы для Пользователя.","item12":"3.2. Сроки хранения обрабатываемых на Сайте файлов куки:","item13":"функциональные файлы куки хранятся не более одного года;","item14":"персонализированные файлы куки хранятся не более одного года с момента последнего посещения Пользователем Сайта;","item15":"аналитические файлы куки хранятся не более одного года с момента последнего посещения Пользователем Сайта;","item16":"рекламные файлы куки хранятся не более одного года с момента последнего посещения Пользователем Сайта;","item17":"сеансовые (собственные / сторонние) файлы куки хранятся до момента закрытия браузера Пользователем или окончания сеанса использования Сайта;","item18":"собственные постоянные файлы куки хранятся не более одного года с момента последнего посещения Пользователем Сайта;","item19":"сторонние постоянные файлы куки (файлы куки третьих лиц) хранятся до 5338 дней; третьи лица могут улучшать свои сервисы, изменяя функциональность файлов куки, а также сроки хранения сведений, получаемых при помощи данных файлов."},"num4":{"item1":"4.1. Организация осуществляет трансграничную передачу объединенных в общий массив сведений о Пользователях по их поведенческим особенностям данных, не связанных с идентификацией конкретного Пользователя, для аналитических целей.","item2":"4.2. Сведения из файлов куки передаются:","item3":"4.2.1. в рамках функционирования сервиса веб-аналитики Яндекс Метрика и сервиса онлайн-рекламы Яндекс Директ – на серверы ООО «Яндекс», находящиеся в Российской Федерации (119021, г. Москва, ул. Льва Толстого, 16);","item4":"4.2.2. в рамках функционирования сервиса веб-аналитики Google Analytics – на серверы Google Inc., США (1600 Amphitheatre Parkway Mountain View, California 94043, USA);","item5":"4.2.3. в рамках функционирования сервиса показа контекстной рекламы Google AdSense – Google Ireland Ltd., Ирландия (Gordon House Barrow Street Dublin 4, D04E5W5 Ireland).","item6":"4.3. Передача сведений, указанных в пунктах 4.2.1., 4.2.3. осуществляется в государства (Российская Федерация, Республика Ирландия), на территории которых обеспечивается надлежащий уровень защиты прав субъектов персональных данных (стороны Конвенции Совета Европы от 28.01.1981 о защите физических лиц при автоматизированной обработке персональных данных, далее – Конвенция).","item7":"4.4. США (веб-сервис Google Analytics) не относится к числу участников Конвенции, т.е. не является государством, на территории которого обеспечивается надлежащий уровень защиты прав субъектов персональных данных. Организация, используя веб-сервис Google Analytics, может осуществлять трансграничную передачу исключительно объединенных в общий массив сведений о Пользователях по их поведенческим особенностям, то есть данных, не связанных с идентификацией конкретного Пользователя, что исключает возможность установления личности. Таким образом, риск причинения вреда Пользователю Сайта, связанный с особенностями правового режима персональных данных в США, является минимальным."},"num5":{"item1":"5.1. Организация предлагает Пользователю при первом посещении Сайта дать согласие на использование файлов куки либо отказаться от их использования посредством нажатия кнопок соответственно «Принять» или «Отказаться» на всплывающем информационном баннере:","item2":"при нажатии кнопки «Принять» Пользователь Сайта дает согласие на обработку всех типов файлов куки, используемых Организацией;","item3":"при нажатии кнопки «Отказаться» Пользователь Сайта отказывается от использования функциональных, аналитических и рекламных файлов куки.","item4":"5.2. Для реализации полного отказа от обработки файлов куки Пользователю необходимо отключить использование файлов куки путем изменения настроек браузера своего устройства, о чем подробно сказано в разделе 6 настоящей Политики. Организация прекращает сбор информации с помощью файлов куки после их деактивации.","item5":"5.3. Организация может обеспечить полноценное и корректное функционирование Сайта только с использованием технических файлов куки и файлов настроек, поэтому данные типы файлов куки не подлежит отключению.","item6":"5.4. По окончании сроков хранения файлов куки Сайт вновь запросит согласие Пользователя посредством вывода всплывающего информационного баннера.","item7":"5.5. Пользователь Сайта может изменить свой выбор, а также отказаться от использования файлов куки до истечения срока, указанного в настоящей Политике, на странице «Конфиденциальность» в подвале (нижняя часть страницы) Сайта в закладке «Политика обработки файлов cookies» через форму «Персональные настройки cookies».","item8":"5.6. Настройка файлов куки:","item9":"5.6.1. Пользователь Сайта может настроить использование каждого типа файлов куки, за исключением технических файлов куки и файлов настроек (обязательных), которые обеспечивают полноценное и корректное функционирование Сайта, в том числе безопасность Пользователя при использовании Сайта.","item10":"5.6.2. Сайт запоминает выбор настроек файлов куки на 1 год. По окончании этого периода Сайт повторно запрашивает согласие Пользователя.","item11":"5.6.3. Изменение Пользователем выбора настроек файлов куки, а также отказ Пользователя от использования файлов куки до истечения срока, указанного в настоящей Политике, возможны в любое время в интерфейсе Сайта путем перехода по ссылке в подвале (нижней части страницы) Сайта в форму «Персональные настройки куки». Нажимая на кнопку «Принять выбранное» или «Принять все», Пользователь дает согласие на обработку файлов куки в соответствии с настоящей Политикой."},"num6":{"item1":"6.1. Большинство браузеров настроены на прием файлов куки. Поэтому для полноценной реализации права на отказ от обработки файлов куки Пользователь может отключить использование файлов куки путем изменения настроек браузера на своем устройстве.","item2":"Пользователь вправе удалить ранее сохраненные файлы куки, выбрав соответствующую опцию в истории браузера. Некоторые браузеры позволяют посещать сайты в режиме «инкогнито», чтобы ограничить хранимый на компьютере объем информации и автоматически удалять некоторые типы файлов куки.","item3":"6.2. Подробнее о параметрах управления куки можно ознакомиться, перейдя по внешним ссылкам, ведущим на соответствующие страницы сайтов основных браузеров:","item4":"Firefox","item5":"Chrome","item6":"Safari","item7":"Opera","item8":"MicrosoftEdge","item9":"Internet Explorer","item10":"О возможностях управления настройками других браузеров Пользователь может получить уточнения в документации их разработчиков, которыми Организация не располагает.","item11":"6.3. Пользователь может запретить хранение и использование данных, собираемых с помощью файлов куки сервиса веб-аналитики Google Analytics, воспользовавшись плагином, загрузка которого доступна по ссылке: https://tools.google.com/dlpage/gaoptout","item12":"6.4. Пользователь может запретить хранение и использование данных, собираемых с помощью файлов куки сервиса веб-аналитики Яндекс Метрика, воспользовавшись плагином, загрузка которого доступна по ссылке: https://yandex.com/support/metrica/general/opt-out.html","item13":"6.5. Поскольку файлы куки, используемые НП ООО «БЕРЛИО», позволяют Пользователю эффективно использовать функционал Сайта, персонализировать его содержание для предпочтений Пользователя, а также настраивать релевантную интересам Пользователя рекламу, мы рекомендуем оставить файлы куки включенными. Без использования функциональных и аналитических файлов куки НП ООО «БЕРЛИО» не сможет гарантировать Пользователю корректную работу Сайта."}},"buyersPrivacy":"Обработка персональных данных покупателей","buyersData":{"title":"ПОЛИТИКА","subTitle":"НП ООО «БЕРЛИО» в отношении обработки персональных данных физических лиц - представителей покупателей оборудования"},"buyersDataTitles":{"num1":"1. ОБЩИЕ ПОЛОЖЕНИЯ","num2":"2. ЦЕЛИ, ОБЪЕМ, ПРАВОВЫЕ ОСНОВАНИЯ И СРОКИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ","num3":"3. ПОРЯДОК И УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ ОПЕРАТОРОМ","num4":"4. ПРАВА СУБЪЕКТОВ ПЕРСОНАЛЬНЫХ ДАННЫХ И ОБЯЗАННОСТИ ОПЕРАТОРА ПО ИХ РЕАЛИЗАЦИИ","num5":"5. ОБЯЗАННОСТИ ОПЕРАТОРА И МЕРЫ, ПРИНИМАЕМЫЕ ПО ОБЕСПЕЧЕНИЮ ЗАЩИТЫ ПЕРСОНАЛЬНЫХ ДАННЫХ"},"buyersDataContent":{"num1":{"item1":"1.1. Издание Политики в отношении обработки персональных данных физических лиц - представителей покупателей оборудования (далее - Политика) является одной из обязательных принимаемых НП ООО «БЕРЛИО» мер по обеспечению защиты персональных данных, предусмотренных статьей 17 Закона Республики Беларусь от 07.05.2021 № 99- З «О защите персональных данных» (далее - Закон о защите персональных данных). Политика разработана в соответствии с Законом о защите персональных данных и иными актами законодательства Республики Беларусь, а также Уставом НП ООО «БЕРЛИО» в целях обеспечения защиты прав и свобод человека при обработке его персональных данных. Политика разъясняет субъектам персональных данных, каким образом и для каких целей их персональные данные собираются, используются или иным образом обрабатываются, а также отражает имеющиеся в связи с этим у субъектов персональных данных права и механизм их реализации.","item2":"1.2. Политика является локальным правовым актом НП ООО «БЕРЛИО» (далее - Оператор или Организация), регламентирующим отношения, связанные с защитой персональных данных при их обработке, осуществляемой: с использованием средств автоматизации; без использования средств автоматизации, если при этом обеспечиваются поиск персональных данных и (или) доступ к ним по определенным критериям (картотеки, списки, базы данных, журналы и др.).","item3":"1.3. Организация уделяет особое внимание защите персональных данных при их обработке и с уважением относится к соблюдению прав субъектов персональных данных. Обработка персональных данных Организацией как Оператором осуществляется в соответствии с Законом о защите персональных данных и настоящей Политикой.","item4":"1.4. Действие настоящей Политики не распространяется:","item5":"на обработку персональных данных работников, обучающихся, соискателей на трудоустройство, обратившихся лиц, подрядчиков, контрагентов, представителей контрагентов, заказчиков услуг, представителей заказчиков услуг в электронной платежной системе «БЕРЛИО», посетителей;","item6":"на обработку файлов куки;","item7":"на обработку персональных данных при применении видеонаблюдения;","item8":"на обработку персональных данных Организацией в качестве уполномоченного лица;","item9":"на отношения, касающиеся случаев обработки персональных данных физическими лицами в процессе исключительно личного, семейного, домашнего и иного подобного их использования, не связанного с профессиональной или предпринимательской деятельностью.","item10":"1.5. В Политике используются основные термины и их определения в значении, определенном статьей 1 Закона о защите персональных данных.","item11":"1.6. В Политике также используются следующие понятия в значении:","item12":"НП ООО «БЕРЛИО» (Оператор / Организация) – поставщик оборудования Организации;","item13":"сайт Оператора / Организация – веб-сайт НП ООО «БЕРЛИО»: https://www.berlio.by/;","item14":"покупатель оборудования – субъект хозяйствования – юридическое лицо, имеющее намерение заключить, заключающее или заключившее с Организацией договор поставки оборудования (терминалов и др.), в соответствии с которым наряду с поставкой оборудования Организацией также осуществляется его техническое обслуживание, организационное, информационное, техническое сопровождение исполнения договора;","item15":"представитель покупателя оборудования – представитель субъекта хозяйствования – юридического лица, имеющего намерение заключить, заключающего или заключившего с Организацией договор поставки оборудования:","item16":"работник покупателя оборудования, имеющий право заключения договора поставки оборудования с Организацией (в договорах и для целей их исполнения, а также в локальных правовых актах Организации именуется также «уполномоченное лицо»);","item17":"работник покупателя оборудования, являющийся ответственным лицом покупателя оборудования для коммуникации с Организацией по вопросам технического обслуживания поставленного Организацией оборудования, организационного, информационного, технического сопровождение исполнения договора;","item18":"работник оператора топливной системы – ОТС (АЗС, торговой точки), использующего поставленное Организацией оборудование.","item19":"1.7. Юридическим лицом, которое осуществляет обработку персональных данных, является НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55; сайт: https://www.berlio.by/; общий адрес электронной почты: berlio@berlio.by; общий телефон: +375(17)3691083 (Организация / Оператор).","item20":"1.8. Политика вступает в силу с момента утверждения. Во исполнение требований пункта 4 статьи 17 Закона о защите персональных данных Политика является общедоступным документом, размещается для свободного доступа в Организации, а также в сети Интернет на сайте Организации и предусматривает возможность ознакомления с Политикой любых лиц.","item21":"1.9. Организация как Оператор вправе при необходимости в одностороннем порядке вносить в Политику изменения и дополнения с последующим размещением новой редакции Политики в общедоступном месте в Организации и на сайте Организации, где субъекты самостоятельно получают информацию об изменениях Политики.","item22":"1.10. Требования Закона о защите персональных данных и Политики обязательны для исполнения всеми работниками и иными лицами, непосредственно осуществляющими обработку персональных данных."},"num2":{"item1":"2.1. Цели обработки персональных данных в Организации основываются на требованиях законодательства, осуществляемой Организацией деятельности, реализуемых бизнес- и иных процессах, положениях договоров.","item2":"2.2. Организация осуществляет обработку персональных данных субъектов персональных данных в целях, объеме (перечне), на правовых основаниях и в сроки, определенные в Реестре обработки персональных данных (приложение к настоящей Политике, ее неотъемлемая часть)."},"num3":{"item1":"3.1. Обработка персональных данных Оператором:","item2":"осуществляется в соответствии с требованиями законодательства Республики Беларусь как с использованием средств автоматизации, так и без использования таких средств;","item3":"осуществляется с учетом необходимости обеспечения защиты прав и свобод субъектов персональных данных на законной и справедливой основе;","item4":"ограничивается достижением конкретных, заранее определенных и законных целей, установленных в Реестре обработки персональных данных.","item5":"При обработке персональных данных:","item6":"обеспечиваются точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных; Оператором принимаются необходимые меры по удалению или уточнению неполных или неточных персональных данных;","item7":"не допускаются: обработка персональных данных, несовместимая с целями сбора персональных данных, установленными в Реестре обработки персональных данных; объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой; избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.","item8":"3.2. Обработка персональных данных Оператором осуществляется без согласия субъекта персональных данных в соответствии с правовыми основаниями, предусмотренными статьей 6 Закона о защите персональных данных и иными законодательными актами.","item9":"3.3. Обработка персональных данных в Организации осуществляется только работниками, которые в соответствии со своей трудовой функцией непосредственно осуществляют обработку персональных данных в Организации, и иными лицами, допущенными к обработке персональных данных в установленном порядке.","item10":"3.4. Работники Организации и иные лица, непосредственно осуществляющие обработку персональных данных, а также получившие доступ к персональным данным, обрабатываемым Организацией, обязаны выполнять требования законодательства о защите персональных данных и локальных правовых актов Организации в сфере обеспечения защиты персональных данных.","item11":"3.5. Организация как Оператор поручает обработку персональных данных уполномоченным лицам на основании договора, о чем заключает соглашения с уполномоченными лицами об обработке персональных данных в соответствии с требованиями статьи 7 Закона о защите персональных данных. При этом:","item12":"уполномоченное лицо обязано соблюдать требования к обработке персональных данных, предусмотренные Законом о защите персональных данных и иными актами законодательства;","item13":"в целях обеспечения защиты персональных данных при их обработке уполномоченными лицами на уровне не ниже, чем у Оператора: периодически осуществляется контроль за выполнением уполномоченными лицами мер по обеспечению защиты прав субъектов персональных данных при обработке их персональных данных по поручению Оператора; допускается привлечение уполномоченными лицами субуполномоченных лиц при условии письменного уведомления Оператора;","item14":"ответственность перед субъектом персональных данных за действия уполномоченного лица несет Организация как Оператор; уполномоченное лицо несет ответственность перед Организацией как Оператором.","item15":"3.6. Уполномоченными лицами, осуществляющими обработку персональных данных по поручению Организации как Оператора на основании договоров, являются / могут быть юридические лица / индивидуальные предприниматели, оказывающие услуги Организации:","item16":"по предоставлению и обслуживанию программного обеспечения автоматизации бухгалтерского учета – 1С: Бухгалтерия;","item17":"по предоставлению и обслуживанию программного обеспечения Битрикс 24;","item18":"хостинга;","item19":"электронной почты;","item20":"по техническому, организационному, информационному сопровождению электронного документооборота;","item21":"звукозаписи телефонных разговоров;","item22":"СМС-рассылки;","item23":"юридические;","item24":"по изготовлению, распространению (размещению на сайте Организации, в иных интернет-ресурсах) информационных, новостных и рекламных материалов Организации;","item25":"по организации / проведению рекламных и иных мероприятий и / или их информационному освещению.","item26":"3.7. Обработка персональных данных Организацией осуществляется путем:","item27":"получения персональных данных в устной или письменной форме на бумажном носителе либо в электронном виде непосредственно от субъектов персональных данных;","item28":"получения персональных данных от третьих лиц в порядке, установленном законодательством, а также в соответствии с договорами;","item29":"получения персональных данных из общедоступных источников;","item30":"обработки персональных данных в информационных ресурсах (системах), базах данных, реестрах, журналах и других документах Организации;","item31":"использования иных предусмотренных законодательством способов обработки персональных данных.","item32":"3.8. Не допускается раскрытие третьим лицам и распространение персональных данных без согласия субъекта персональных данных, если иное не предусмотрено законодательством.","item33":"3.9. Передача персональных данных государственным органам и организациям, в том числе правоохранительным органам и судам, а также иным организациям и учреждениям осуществляется в соответствии с требованиями законодательства Республики Беларусь (с согласия субъекта персональных данных, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами /при наличии иных правовых оснований обработки/).","item34":"3.10. Трансграничная передача персональных данных на территорию иностранного государства может осуществляться Организацией:","item35":"3.10.1. если на территории иностранного государства обеспечивается надлежащий уровень защиты прав субъектов персональных данных (государства-члены ЕврАзЭс; государства, являющиеся сторонами Конвенции Совета Европы от 28 января 1981 г. о защите физических лиц при автоматизированной обработке персональных данных) – без ограничений при наличии правовых оснований, предусмотренных Законом о защите персональных данных;","item36":"3.10.2. если на территории иностранного государства не обеспечивается надлежащий уровень защиты прав субъектов персональных данных (в том числе при трансграничной передаче персональных данных с использованием электронной почты, мессенджеров для переписки, социальных сетей для распространения информации, когда невозможно установить государство, куда осуществляется трансграничная передача персональных данных, и существует вероятность отсутствия в нем условий для обеспечения надлежащей защиты прав субъектов персональных данных) – в случаях, предусмотренных статьей 9 Закона о защите персональных данных, в том числе когда:","item37":"дано согласие субъекта персональных данных при условии, что субъект персональных данных проинформирован о рисках, возникающих в связи с отсутствием надлежащего уровня их защиты, либо","item38":"персональные данные получены на основании договора, заключенного (заключаемого) с субъектом персональных данных, в целях совершения действий, установленных этим договором, либо","item39":"персональные данные могут быть получены любым лицом посредством направления запроса в случаях и порядке, предусмотренных законодательством, либо","item40":"получено соответствующее разрешение Национального центра защиты персональных данных (далее – НЦЗПД).","item41":"3.11. При трансграничной передаче персональных данных на территорию иностранного государства, где не обеспечивается надлежащий уровень защиты прав субъектов персональных данных, существуют риски:","item42":"отсутствие законодательного регулирования защиты прав субъектов персональных данных;","item43":"отсутствие независимого уполномоченного / контролирующего органа по защите прав субъектов персональных данных;","item44":"отнесение к персональным данным ограниченного перечня сведений о субъекте;","item45":"ограниченный перечень / отсутствие прав субъектов персональных данных;","item46":"широкий доступ к персональным данным у органов государственной власти.","item47":"3.12. Оператор осуществляет обработку, в том числе хранение персональных данных, не дольше, чем этого требуют цели обработки персональных данных, в сроки, установленные в Реестре обработки персональных данных. Определенный срок обработки персональных данных может быть установлен законодательством Республики Беларусь, договором.","item48":"3.13. Обработка персональных данных прекращается при наступлении одного или нескольких из указанных событий (если отсутствуют иные правовые основания для обработки, предусмотренные Законом о защите персональных данных и иными законодательными актами):","item49":"поступление от субъекта персональных данных в установленном порядке требования о прекращении обработки его персональных данных и (или) их удалении;","item50":"достижение целей обработки персональных данных;","item51":"истечение срока хранения персональных данных;","item52":"обнаружение неправомерной обработки персональных данных;","item53":"по требованию Национального центра защиты персональных данных (НЦЗПД);","item54":"ликвидация Организации.","item55":"3.14. Хранение персональных данных осуществляется Оператором в соответствии с требованиями законодательства о защите персональных данных до достижения целей обработки персональных данных в сроки, установленные в Реестре обработки персональных данных. При этом:","item56":"документы на бумажных и иных материальных носителях, содержащие персональные данные, хранятся в помещениях и местах, позволяющих исключить к ним доступ посторонних лиц;","item57":"документы в электронной форме, содержащие персональные данные, хранятся в информационных ресурсах (системах) Организации с обязательным использованием паролей доступа и разграничением доступа;","item58":"документы в электронном виде, содержащие персональные данные, также могут храниться в облачном хранилище, защита которого обеспечивается собственником (владельцем, управляющим) данным интернет-ресурсом, с использованием паролей доступа.","item59":"3.15. Документы на бумажных и иных материальных носителях, содержащие персональные данные, а также персональные данные в электронной форме после прекращения обработки персональных данных уничтожаются / удаляются (блокируются) в соответствии с требованиями законодательства о защите персональных данных, иными актами законодательства и локальными правовыми актами Организации.","item60":""},"num4":{"item1":"4.1. Субъект персональных данных имеет право:","item2":"4.1.1. требовать бесплатного прекращения обработки своих персональных данных, включая их удаление, при отсутствии оснований для их обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item3":"4.1.2. получать информацию, касающуюся обработки своих персональных данных (при этом не должен обосновывать свой интерес к запрашиваемой информации), содержащую: наименование и место нахождения Организации; подтверждение факта обработки персональных данных Организацией (уполномоченным им лицом); его персональные данные и источник их получения; правовые основания и цели обработки персональных данных; срок, на который дано его согласие; наименование и место нахождения уполномоченного лица, которое является государственным органом, иной организацией, если обработка персональных данных поручена такому лицу; иную информацию, предусмотренную законодательством;","item4":"4.1.3. требовать внесения изменений в свои персональные данные в случае, если персональные данные являются неполными, устаревшими или неточными (с приложением соответствующих документов и (или) их заверенных в установленном порядке копий, подтверждающих необходимость внесения изменений в персональные данные);","item5":"4.1.4. получать информацию о предоставлении своих персональных данных третьим лицам один раз в календарный год бесплатно, если иное не предусмотрено Законом о защите персональных данных и иными законодательными актами.","item6":"4.2. Субъект персональных данных также имеет право обжаловать действия (бездействие) и принятые Организацией решения, нарушающие его права при обработке персональных данных, непосредственно в Организацию для принятия мер по восстановлению его нарушенных прав на почтовый адрес или адрес электронной почты, указанные в пункте 4.3. Политики, либо в Национальный центр защиты персональных данных в порядке, установленном законодательством об обращениях граждан и юридических лиц.","item7":"4.3. Субъект персональных данных для реализации прав, предусмотренных статьями 10–13 Закона о защите персональных данных и пунктом 4.1. Политики, подает в Организацию заявление в письменной форме либо в виде электронного документа (подписанного личной электронной цифровой подписью заявителя), оформленное в соответствии со статьей 14 Закона о защите персональных данных, на почтовые адреса центров обслуживания по месту заключения договоров:","item8":"Головной офис НП ООО «БЕРЛИО» (г. Минск):","item9":"220007 г. Минск, ул. Быховская, 55; email: dpo.minsk@berlio.by","item10":"Брестский филиал:","item11":"г. Брест, ул. К. Маркса, 33-43; email: dpo.brest@berlio.by","item12":"Витебский филиал:","item13":"г. Витебск, ул. Правды 37, корп. 2, 84; email: dpo.vitebsk@berlio.by","item14":"Гомельский филиал:","item15":"г. Гомель, ул. Речицкая, 1а-419; email: dpo.gomel@berlio.by","item16":"Гродненский филиал:","item17":"г. Гродно, ул. Победы, 17-7; email: dpo.grodno@berlio.by","item18":"Могилевский филиал:","item19":"г. Могилев, ул. Челюскинцев, 105 В; email: dpo.mogilev@berlio.by","item20":"4.4. Заявление субъекта персональных данных о реализации его прав должно содержать: его персональные данные – фамилию, собственное имя, отчество (если таковое имеется), адрес его места жительства (места пребывания), дату рождения, идентификационный номер (при отсутствии такого номера – номер документа, удостоверяющего личность субъекта персональных данных, если обработка осуществляется без согласия субъекта); изложение сути его требований; личную подпись либо электронную цифровую подпись.","item21":"4.5. За содействием в реализации своих прав субъект персональных данных может обратиться к лицу, ответственному за внутренний контроль, включая направление сообщения на email соответствующего филиала:","item22":"Минск:","item23":"dpo.minsk@berlio.by, тел.: +375(17)3691083","item24":"Брест:","item25":"dpo.brest@berlio.by, тел.: 8(0162)521215, 8(033)3721199","item26":"Витебск:","item27":"dpo.vitebsk@berlio.by, тел.: 8(029)6961196","item28":"Гомель:","item29":"dpo.gomel@berlio.by, тел.: 8(0232)509865, 8(033)3200034","item30":"Гродно:","item31":"dpo.grodno@berlio.by, тел.: 8(0152)316139","item32":"Могилев:","item33":"dpo.mogilev@berlio.by, тел.: 8(0222)767111","item34":"4.6. Ответ на заявление направляется в форме, соответствующей форме подачи заявления, если не указано иное.","item35":"4.7. Работники Организации обязаны на основании поданных субъектом заявлений:","item36":"4.7.1. В течение 15 дней прекратить обработку и удалить персональные данные по требованию субъекта; при невозможности — заблокировать и уведомить; отказ возможен при наличии оснований, с уведомлением в тот же срок.","item37":"4.7.2. В течение 5 рабочих дней предоставить информацию о персональных данных либо отказать с указанием причин, если иное не установлено законом.","item38":"4.7.3. В течение 15 дней внести изменения в персональные данные либо обоснованно отказать.","item39":"4.7.4. В течение 15 дней предоставить сведения о передаче данных третьим лицам за последний год либо отказать по основаниям, предусмотренным законом."},"num5":{"item1":"5.1. Оператор обязан:","item2":"разъяснять субъекту персональных данных его права;","item3":"получать согласие на обработку, если это необходимо;","item4":"обеспечивать защиту данных при обработке;","item5":"при изменении целей — получать согласие при отсутствии иных оснований;","item6":"обеспечивать актуальность и достоверность данных;","item7":"предоставлять субъекту информацию о данных и их передаче;","item8":"вносить изменения в устаревшие/некорректные данные;","item9":"удалять/блокировать данные при отсутствии оснований для обработки;","item10":"принимать меры по защите от неправомерного доступа, удаления, изменения и пр.;","item11":"обеспечивать доступ к Политике до начала обработки;","item12":"уведомлять НЦЗПД о нарушениях не позднее 3 рабочих дней;","item13":"удалять недостоверные данные по требованию НЦЗПД, если не установлен иной порядок;","item14":"исполнять требования НЦЗПД по устранению нарушений;","item15":"предоставлять НЦЗПД информацию для оценки законности обработки;","item16":"выполнять иные обязанности, предусмотренные законом.","item17":"5.2. Оператор самостоятельно определяет перечень мер, необходимых и достаточных для защиты персональных данных с учетом требований законодательства."}},"buyersApplicationTitle":"ПРИЛОЖЕНИЕ","buyersApplication":{"title":"Реестр обработки персональных данных (субъекты персональных данных: физические лица – представители покупателей оборудования).","item1":"Цели обработки персональных данных","item2":"Перечень обрабатываемых персональных данных","item3":"Перечень действий с персональными данными","item4":"Правовые основания обработки персональных данных","item5":"Срок хранения персональных данных","item6":"Подготовка, заключение, исполнение, изменение и расторжение договора поставки оборудования Организации (далее – договор)","item7":"Субъекты: Представители покупателей оборудования: фамилия, имя, отчество, должность, место работы, другая информация, предусмотренная законодательством и договором для заключения и исполнения договора (в том числе в представляемых для заключения договора документах юридического лица), номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты), сведения в электронной цифровой подписи работник ОТС: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты)","item8":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченным лицам, предоставляющим услуги программного обеспечения 1С: Бухгалтерия, Битрикс 24, электронного документооборота, электронной почты, СМС-рассылки, удаление","item9":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона «О защите персональных данных» (далее – Закон): - согласие не требуется «в процессе трудовой (служебной) деятельности субъекта» - законодательство о труде, гражданское законодательство - договор","item10":"на срок договора и 3 года после окончания срока действия договора и проведения налоговыми органами проверки соблюдения налогового законодательства. Если такая проверка не проводилась – 10 лет после окончания срока действия договора (п. 70 Перечня типовых документов … (утв. постановлением Министерства юстиции Республики Беларусь от 24.05.2012 № 140 (далее – Перечень))","item11":"Техническое обслуживание поставленного оборудования, организационное, информационное, техническое сопровождение исполнения договора","item12":"Субъекты: Представители покупателей оборудования: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты работник ОТС: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты","item13":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченным лицам, предоставляющим услуги программного обеспечения 1С: Бухгалтерия, Битрикс 24, электронного документооборота, электронной почты, удаление","item14":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона - законодательство о труде, гражданское законодательство - договор","item15":"на срок договора","item16":"Звукозапись телефонных разговоров работников (представителей) Организации с субъектом в соответствии с договором (в информационном ресурсе Организации)","item17":"фамилия, имя, отчество, должность, место работы, номер телефона","item18":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченному лицу, удаление","item19":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде, гражданское законодательство - договор","item20":"на срок договора","item21":"Отправка уведомлений субъекту в соответствии с договором","item22":"фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты","item23":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченным лицам, предоставляющим услуги электронного документооборота, электронной почты, СМС-рассылки, удаление","item24":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде, гражданское законодательство - договор","item25":"на срок договора","item26":"Обеспечение ведения бухгалтерского и налогового учета по договорам, составления первичных учетных документов","item27":"в объеме, предусмотренном законодательством о бухгалтерском учете, необходимом для достижения цели","item28":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченному лицу, предоставляющему услуги программного обеспечения 1С: Бухгалтерия, удаление","item29":"без согласия субъекта: абз. 20 ст. 6 Закона: - ст. 10 Закона «О бухгалтерском учете и отчетности»","item30":"на срок договора и 3 года после окончания срока действия договора и проведения налоговыми органами проверки соблюдения налогового законодательства. Если такая проверка не проводилась – 10 лет после окончания срока действия договора (п. 70 Перечня)","item31":"Взыскание задолженности, участие в досудебном и судебном разрешении споров","item32":"фамилия, имя, отчество, другая информация, предусмотренная гражданским и процессуальным законодательством, законодательством об исполнительном производстве","item33":"сбор, систематизация, хранение, использование, предоставление судам, органам, осуществляющим исполнительное производство, удаление","item34":"без согласия субъекта: абз. 3, 8, 15 ст. 6 Закона: - Гражданский кодекс, процессуальное законодательство, законодательство об исполнительном производстве","item35":"3 года / 10 лет после исполнения судебных постановлений (в соответствии с общим порядком применительно к договорам)","item36":"Направление в Национальный центр защиты персональных данных (НЦЗПД) уведомлений, информации, связанных с обработкой персональных данных Оператором","item37":"в соответствии с формой уведомления, утв. приказом директора НЦЗПД от 15.11.2021 № 13 «Об уведомлении о нарушениях систем защиты персональных данных», содержанием запроса НЦЗПД","item38":"сбор, систематизация, хранение, использование, предоставление НЦЗПД, удаление","item39":"без согласия субъекта: абз. 20 ст. 6, ст. 16, 18 Закона - п. 8, 26 Положения о Национальном центре защиты персональных данных (утв. Указом Президента Республики Беларусь от 28.10.2021 № 422) - приказ директора НЦЗПД от 15.11.2021 № 13 «Об уведомлении о нарушениях систем защиты персональных данных»","item40":"3 года (п. 33-3 Перечня)","item41":"Предоставление информации в соответствии с требованиями законодательства / по запросам (требованиям) органов внутренних дел, государственной безопасности, финансовых расследований, налоговых органов, прокуратуры","item42":"в соответствии с требованиями законодательства / содержанием запроса","item43":"сбор, систематизация, хранение, использование, предоставление запрашивающему органу, удаление","item44":"без согласия субъекта: абз. 20 ст. 6 Закона: - ст. 7, 24 Закона «Об органах внутренних дел Республики Беларусь» - ст. 15-18 Закона «Об органах государственной безопасности Республики Беларусь» - ст. 11 Закона «Об оперативно-розыскной деятельности» - ст. 6, 13 Закона «Об органах финансовых расследований Комитета государственного контроля Республики Беларусь» - гл. 10 Налогового кодекса Республики Беларусь (общая часть) - ст. 10, 27 Закона «О прокуратуре Республики Беларусь»","item45":"на период услуг (срока договора) и в течение 10 лет после прекращения договора (в течение срока давности привлечения к уголовной ответственности за тяжкие преступления)"},"b2bPrivacy":"Обработка персональных данных представителей заказчиков","b2bData":{"title":"ПОЛИТИКА","subTitle":"НП ООО «БЕРЛИО» в отношении обработки персональных данных физических лиц, представителей заказчиков услуг в электронной платежной системе «БЕРЛИО»"},"b2bDataTitles":{"num1":"1. ОБЩИЕ ПОЛОЖЕНИЯ","num2":"2. ЦЕЛИ, ОБЪЕМ, ПРАВОВЫЕ ОСНОВАНИЯ И СРОКИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ","num3":"3. ПОРЯДОК И УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ ОПЕРАТОРОМ","num4":"4. ПРАВА СУБЪЕКТОВ ПЕРСОНАЛЬНЫХ ДАННЫХ И ОБЯЗАННОСТИ ОПЕРАТОРА ПО ИХ РЕАЛИЗАЦИИ","num5":"5. ОБЯЗАННОСТИ ОПЕРАТОРА И МЕРЫ, ПРИНИМАЕМЫЕ ОПЕРАТОРОМ ПО ОБЕСПЕЧЕНИЮ ЗАЩИТЫ ПЕРСОНАЛЬНЫХ ДАННЫХ"},"b2bDataContent":{"num1":{"item1":"1.1. Издание Политики в отношении обработки персональных данных физических лиц - заказчиков услуг, представителей заказчиков услуг в электронной платежной системе «БЕРЛИО» (далее - Политика) является одной из обязательных принимаемых НП ООО «БЕРЛИО» мер по обеспечению защиты персональных данных, предусмотренных статьей 17 Закона Республики Беларусь от 07.05.2021 № 99-3 «О защите персональных данных» (далее - Закон о защите персональных данных). Политика разработана в соответствии с Законом о защите персональных данных и иными актами законодательства Республики Беларусь, а также Уставом НП ООО «БЕРЛИО» в целях обеспечения защиты прав и свобод человека при обработке его персональных данных. Политика разъясняет субъектам персональных данных, каким образом и для каких целей их персональные данные собираются, используются или иным образом обрабатываются, а также отражает имеющиеся в связи с этим у субъектов персональных данных права и механизм их реализации.","item2":"1.2. Политика является локальным правовым актом НП ООО «БЕРЛИО» (далее - Оператор или Организация), регламентирующим отношения, связанные с защитой персональных данных при их обработке, осуществляемой: с использованием средств автоматизации; без использования средств автоматизации, если при этом обеспечиваются поиск персональных данных и (или) доступ к ним по определенным критериям (картотеки, списки, базы данных, журналы и др.).","item3":"1.3. Организация уделяет особое внимание защите персональных данных при их обработке и с уважением относится к соблюдению прав субъектов персональных данных. Обработка персональных данных Организацией как Оператором осуществляется в соответствии с Законом о защите персональных данных и настоящей Политикой.","item4":"1.4. Действие настоящей Политики не распространяется:","item5":"на обработку персональных данных работников, обучающихся, соискателей на трудоустройство, обратившихся лиц, подрядчиков, контрагентов, представителей контрагентов, заказчиков услуг, представителей заказчиков услуг в электронной платежной системе «БЕРЛИО», посетителей;","item6":"на обработку файлов куки;","item7":"на обработку персональных данных при применении видеонаблюдения;","item8":"на обработку персональных данных Организацией в качестве уполномоченного лица;","item9":"на отношения, касающиеся случаев обработки персональных данных физическими лицами в процессе исключительно личного, семейного, домашнего и иного подобного их использования, не связанного с профессиональной или предпринимательской деятельностью.","item10":"1.5. В Политике используются основные термины и их определения в значении, определенном статьей 1 Закона о защите персональных данных.","item11":"1.6. В Политике также используются следующие понятия в значении:","item12":"НП ООО «БЕРЛИО» (Оператор /в соответствии с законодательством о персональных данных/ или Организация) – поставщик платежных услуг в электронной платежной системе «БЕРЛИО», в том числе с использованием мобильного приложения «Berlio internet client» (далее – ЭПС), собственником (владельцем) которой является НП ООО «БЕРЛИО»; в договорах и для целей их исполнения, а также в локальных правовых актах НП ООО «БЕРЛИО» применительно к ЭПС и отношениям с заказчиками услуг и другими участниками ЭПС именуется также «Оператор»;","item13":"сайт Оператора / Организация – веб-сайт НП ООО «БЕРЛИО»: https://www.berlio.by/;","item14":"заказчик услуг – субъект хозяйствования – юридическое лицо, иная организация, индивидуальный предприниматель, которому Организация в соответствии с законодательством о платежных системах, договором присоединения, иными договорами (в настоящей Политике – «договоры») предоставляет платежные услуги в электронной платежной системе «БЕРЛИО» (ЭПС); в договорах и для целей их исполнения, а также в локальных правовых актах Организации заказчик услуг именуется также «Клиент»;","item15":"представитель заказчика услуг:","item16":"работник заказчика услуг, имеющий право заключения договора с Организацией о предоставлении услуг в ЭПС (в договорах и для целей их исполнения, а также в локальных правовых актах Организации именуется также «уполномоченное лицо»);","item17":"работник заказчика услуг, являющийся ответственным лицом заказчика услуг для коммуникации с Организацией и совершения организационных действий в рамках услуг в ЭПС;","item18":"представитель заказчика услуг – индивидуального предпринимателя, действующий на основании доверенности;","item19":"пользователь:","item20":"работник заказчика услуг, получивший (получающий) доступ к ЭПС и имеющий право пользования услугами, совершения операций с электронными деньгами и иных действий от имени заказчика услуг в ЭПС; сведения о пользователе предоставляет Организации заказчик услуг (его представитель) и / или сам пользователь (в договорах и для целей их исполнения, а также в локальных правовых актах Организации именуется также «уполномоченное лицо»);","item21":"индивидуальный предприниматель – заказчик услуг, получивший (получающий) доступ к ЭПС и имеющий право пользования услугами, совершения операций с электронными деньгами и иных действий в ЭПС от своего имени;","item22":"руководитель, лицо, осуществляющее руководство бухгалтерским учетом, учредитель (участник, член), бенефициарный владелец юридического лица – заказчика услуг.","item23":"1.7. Юридическим лицом, которое осуществляет обработку персональных данных, является НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55; сайт: https://www.berlio.by/; общий адрес электронной почты: berlio@berlio.by; общий телефон: +375(17)3691083 (Организация / Оператор).","item24":"1.8. Политика вступает в силу с момента утверждения. Во исполнение требований пункта 4 статьи 17 Закона о защите персональных данных Политика является общедоступным документом, размещается для свободного доступа в Организации, а также в сети Интернет на сайте Организации и предусматривает возможность ознакомления с Политикой любых лиц.","item25":"1.9. Организация как Оператор вправе при необходимости в одностороннем порядке вносить в Политику изменения и дополнения с последующим размещением новой редакции Политики в общедоступном месте в Организации и на сайте Организации, где субъекты самостоятельно получают информацию об изменениях Политики.","item26":"1.10. Требования Закона о защите персональных данных и Политики обязательны для исполнения всеми работниками и иными лицами, непосредственно осуществляющими обработку персональных данных."},"num2":{"item1":"2.1. Цели обработки персональных данных в Организации основываются на требованиях законодательства, осуществляемой Организацией деятельности, реализуемых бизнес- и иных процессах, положениях договоров.","item2":"2.2. Организация осуществляет обработку персональных данных субъектов персональных данных в целях, объеме (перечне), на правовых основаниях и в сроки, определенные в Реестре обработки персональных данных (приложение к настоящей Политике, ее неотъемлемая часть)."},"num3":{"item1":"3.1. Обработка персональных данных Оператором:","item2":"осуществляется в соответствии с требованиями законодательства Республики Беларусь как с использованием средств автоматизации, так и без использования таких средств;","item3":"осуществляется с учетом необходимости обеспечения защиты прав и свобод субъектов персональных данных на законной и справедливой основе;","item4":"ограничивается достижением конкретных, заранее определенных и законных целей, установленных в Реестре обработки персональных данных.","item5":"При обработке персональных данных:","item6":"обеспечиваются точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных; Оператором принимаются необходимые меры по удалению или уточнению неполных или неточных персональных данных;","item7":"не допускаются: обработка персональных данных, несовместимая с целями сбора персональных данных, установленными в Реестре обработки персональных данных; объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой; избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.","item8":"3.2. Обработка персональных данных Оператором осуществляется без согласия субъекта персональных данных в соответствии с правовыми основаниями, предусмотренными статьей 6 Закона о защите персональных данных и иными законодательными актами.","item9":"3.3. Обработка персональных данных в Организации осуществляется только работниками, которые в соответствии со своей трудовой функцией непосредственно осуществляют обработку персональных данных в Организации, и иными лицами, допущенными к обработке персональных данных в установленном порядке.","item10":"3.4. Работники Организации и иные лица, непосредственно осуществляющие обработку персональных данных, а также получившие доступ к персональным данным, обрабатываемым Организацией, обязаны выполнять требования законодательства о защите персональных данных и локальных правовых актов Организации в сфере обеспечения защиты персональных данных.","item11":"3.5. Организация как Оператор поручает обработку персональных данных уполномоченным лицам на основании договора, о чем заключает соглашения с уполномоченными лицами об обработке персональных данных в соответствии с требованиями статьи 7 Закона о защите персональных данных. При этом:","item12":"уполномоченное лицо обязано соблюдать требования к обработке персональных данных, предусмотренные Законом о защите персональных данных и иными актами законодательства;","item13":"в целях обеспечения защиты персональных данных при их обработке уполномоченными лицами на уровне не ниже, чем у Оператора: периодически осуществляется контроль за выполнением уполномоченными лицами мер по обеспечению защиты прав субъектов персональных данных при обработке их персональных данных по поручению Оператора; допускается привлечение уполномоченными лицами субуполномоченных лиц при условии письменного уведомления Оператора;","item14":"ответственность перед субъектом персональных данных за действия уполномоченного лица несет Организация как Оператор; уполномоченное лицо несет ответственность перед Организацией как Оператором.","item15":"3.6. Уполномоченными лицами, осуществляющими обработку персональных данных по поручению Организации как Оператора на основании договоров, являются / могут быть юридические лица / индивидуальные предприниматели, оказывающие услуги Организации:","item16":"по предоставлению и обслуживанию программного обеспечения автоматизации бухгалтерского учета – 1С: Бухгалтерия;","item17":"по предоставлению и обслуживанию программного обеспечения Битрикс 24;","item18":"хостинга;","item19":"электронной почты;","item20":"по техническому, организационному, информационному сопровождению электронного документооборота;","item21":"звукозаписи телефонных разговоров;","item22":"СМС-рассылки;","item23":"юридические;","item24":"по изготовлению, распространению (размещению на сайте Организации, в иных интернет-ресурсах) информационных, новостных и рекламных материалов Организации;","item25":"по организации / проведению рекламных и иных мероприятий и / или их информационному освещению.","item26":"3.7. Обработка персональных данных Организацией осуществляется путем:","item27":"получения персональных данных в устной или письменной форме на бумажном носителе либо в электронном виде непосредственно от субъектов персональных данных;","item28":"получения персональных данных от третьих лиц в порядке, установленном законодательством, а также в соответствии с договорами;","item29":"получения персональных данных из общедоступных источников;","item30":"обработки персональных данных в информационных ресурсах (системах), базах данных, реестрах, журналах и других документах Организации;","item31":"использования иных предусмотренных законодательством способов обработки персональных данных.","item32":"3.8. Не допускается раскрытие третьим лицам и распространение персональных данных без согласия субъекта персональных данных, если иное не предусмотрено законодательством.","item33":"3.9. Передача персональных данных государственным органам и организациям, в том числе правоохранительным органам и судам, а также иным организациям и учреждениям осуществляется в соответствии с требованиями законодательства Республики Беларусь (с согласия субъекта персональных данных, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами /при наличии иных правовых оснований обработки/).","item34":"3.10. Трансграничная передача персональных данных на территорию иностранного государства может осуществляться Организацией:","item35":"3.10.1. если на территории иностранного государства обеспечивается надлежащий уровень защиты прав субъектов персональных данных (государства-члены ЕврАзЭс; государства, являющиеся сторонами Конвенции Совета Европы от 28 января 1981 г. о защите физических лиц при автоматизированной обработке персональных данных) – без ограничений при наличии правовых оснований, предусмотренных Законом о защите персональных данных;","item36":"3.10.2. если на территории иностранного государства не обеспечивается надлежащий уровень защиты прав субъектов персональных данных (в том числе при трансграничной передаче персональных данных с использованием электронной почты, мессенджеров для переписки, социальных сетей для распространения информации, когда невозможно установить государство, куда осуществляется трансграничная передача персональных данных, и существует вероятность отсутствия в нем условий для обеспечения надлежащей защиты прав субъектов персональных данных) – в случаях, предусмотренных статьей 9 Закона о защите персональных данных, в том числе когда:","item37":"дано согласие субъекта персональных данных при условии, что субъект персональных данных проинформирован о рисках, возникающих в связи с отсутствием надлежащего уровня их защиты, либо","item38":"персональные данные получены на основании договора, заключенного (заключаемого) с субъектом персональных данных, в целях совершения действий, установленных этим договором, либо","item39":"персональные данные могут быть получены любым лицом посредством направления запроса в случаях и порядке, предусмотренных законодательством, либо","item40":"получено соответствующее разрешение Национального центра защиты персональных данных (далее – НЦЗПД).","item41":"3.11. При трансграничной передаче персональных данных на территорию иностранного государства, где не обеспечивается надлежащий уровень защиты прав субъектов персональных данных, существуют риски:","item42":"отсутствие законодательного регулирования защиты прав субъектов персональных данных;","item43":"отсутствие независимого уполномоченного / контролирующего органа по защите прав субъектов персональных данных;","item44":"отнесение к персональным данным ограниченного перечня сведений о субъекте;","item45":"ограниченный перечень / отсутствие прав субъектов персональных данных;","item46":"широкий доступ к персональным данным у органов государственной власти.","item47":"3.12. Оператор осуществляет обработку, в том числе хранение персональных данных, не дольше, чем этого требуют цели обработки персональных данных, в сроки, установленные в Реестре обработки персональных данных. Определенный срок обработки персональных данных может быть установлен законодательством Республики Беларусь, договором.","item48":"3.13. Обработка персональных данных прекращается при наступлении одного или нескольких из указанных событий (если отсутствуют иные правовые основания для обработки, предусмотренные Законом о защите персональных данных и иными законодательными актами):","item49":"поступление от субъекта персональных данных в установленном порядке требования о прекращении обработки его персональных данных и (или) их удалении;","item50":"достижение целей обработки персональных данных;","item51":"истечение срока хранения персональных данных;","item52":"обнаружение неправомерной обработки персональных данных;","item53":"по требованию Национального центра защиты персональных данных (НЦЗПД);","item54":"ликвидация Организации.","item55":"3.14. Хранение персональных данных осуществляется Оператором в соответствии с требованиями законодательства о защите персональных данных до достижения целей обработки персональных данных в сроки, установленные в Реестре обработки персональных данных. При этом:","item56":"документы на бумажных и иных материальных носителях, содержащие персональные данные, хранятся в помещениях и местах, позволяющих исключить к ним доступ посторонних лиц;","item57":"документы в электронной форме, содержащие персональные данные, хранятся в информационных ресурсах (системах) Организации с обязательным использованием паролей доступа и разграничением доступа;","item58":"документы в электронном виде, содержащие персональные данные, также могут храниться в облачном хранилище, защита которого обеспечивается собственником (владельцем, управляющим) данным интернет-ресурсом, с использованием паролей доступа.","item59":"3.15. Документы на бумажных и иных материальных носителях, содержащие персональные данные, а также персональные данные в электронной форме после прекращения обработки персональных данных уничтожаются / удаляются (блокируются) в соответствии с требованиями законодательства о защите персональных данных, иными актами законодательства и локальными правовыми актами Организации."},"num4":{"item1":"4.1. Субъект персональных данных имеет право:","item2":"4.1.1. требовать бесплатного прекращения обработки своих персональных данных, включая их удаление, при отсутствии оснований для их обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item3":"4.1.2. получать информацию, касающуюся обработки своих персональных данных (при этом не должен обосновывать свой интерес к запрашиваемой информации), содержащую: наименование и место нахождения Организации; подтверждение факта обработки персональных данных Организацией (уполномоченным им лицом); его персональные данные и источник их получения; правовые основания и цели обработки персональных данных; срок, на который дано его согласие; наименование и место нахождения уполномоченного лица, которое является государственным органом, иной организацией, если обработка персональных данных поручена такому лицу; иную информацию, предусмотренную законодательством;","item4":"4.1.3. требовать внесения изменений в свои персональные данные в случае, если персональные данные являются неполными, устаревшими или неточными (с приложением соответствующих документов и (или) их заверенных в установленном порядке копий, подтверждающих необходимость внесения изменений в персональные данные);","item5":"4.1.4. получать информацию о предоставлении своих персональных данных третьим лицам один раз в календарный год бесплатно, если иное не предусмотрено Законом о защите персональных данных и иными законодательными актами.","item6":"4.2. Субъект персональных данных также имеет право обжаловать действия (бездействие) и принятые Организацией решения, нарушающие его права при обработке персональных данных, непосредственно в Организацию для принятия мер по восстановлению его нарушенных прав на почтовый адрес или адрес электронной почты, указанные в пункте 4.3. Политики, либо в Национальный центр защиты персональных данных в порядке, установленном законодательством об обращениях граждан и юридических лиц.","item7":"4.3. Субъект персональных данных для реализации прав, предусмотренных статьями 10–13 Закона о защите персональных данных и пунктом 4.1. Политики, подает в Организацию заявление в письменной форме либо в виде электронного документа (подписанного личной электронной цифровой подписью заявителя), оформленное в соответствии со статьей 14 Закона о защите персональных данных, на почтовые адреса центров обслуживания по месту заключения договоров:","item8":"Головной офис НП ООО «БЕРЛИО» (г. Минск):","item9":"220007 г. Минск, ул. Быховская, 55; email: dpo.minsk@berlio.by","item10":"Брестский филиал:","item11":"г. Брест, ул. К. Маркса, 33-43; email: dpo.brest@berlio.by","item12":"Витебский филиал:","item13":"г. Витебск, ул. Правды 37, корп. 2, 84; email: dpo.vitebsk@berlio.by","item14":"Гомельский филиал:","item15":"г. Гомель, ул. Речицкая, 1а-419; email: dpo.gomel@berlio.by","item16":"Гродненский филиал:","item17":"г. Гродно, ул. Победы, 17-7; email: dpo.grodno@berlio.by","item18":"Могилевский филиал:","item19":"г. Могилев, ул. Челюскинцев, 105 В; email: dpo.mogilev@berlio.by","item20":"4.4. Заявление субъекта персональных данных о реализации его прав должно содержать: его персональные данные – фамилию, собственное имя, отчество (если таковое имеется), адрес его места жительства (места пребывания), дату рождения, идентификационный номер (при отсутствии такого номера – номер документа, удостоверяющего личность субъекта персональных данных, если обработка осуществляется без согласия субъекта); изложение сути его требований; личную подпись либо электронную цифровую подпись.","item21":"4.5. За содействием в реализации своих прав субъект персональных данных может обратиться к лицу, ответственному за внутренний контроль, включая направление сообщения на email соответствующего филиала:","item22":"Минск:","item23":"dpo.minsk@berlio.by, тел.: +375(17)3691083","item24":"Брест:","item25":"dpo.brest@berlio.by, тел.: 8(0162)521215, 8(033)3721199","item26":"Витебск:","item27":"dpo.vitebsk@berlio.by, тел.: 8(029)6961196","item28":"Гомель:","item29":"dpo.gomel@berlio.by, тел.: 8(0232)509865, 8(033)3200034","item30":"Гродно:","item31":"dpo.grodno@berlio.by, тел.: 8(0152)316139","item32":"Могилев:","item33":"dpo.mogilev@berlio.by, тел.: 8(0222)767111","item34":"4.6. Ответ на заявление субъекта персональных данных о реализации его прав, предусмотренных пунктом 4.1. Политики, направляется субъекту персональных данных в форме, соответствующей форме подачи заявления, если в самом заявлении не указано иное.","item35":"4.7. Работники Организации, непосредственно осуществляющие обработку персональных данных, обязаны на основании поданного субъектом персональных данных:","item36":"4.7.1. заявления, содержащего требования о бесплатном прекращении обработки своих персональных данных, включая их удаление, в пятнадцатидневный срок после получения заявления:","item37":"прекратить обработку персональных данных, а также осуществить их удаление (обеспечить прекращение обработки персональных данных, а также их удаление уполномоченным лицом) и уведомить об этом субъекта персональных данных;","item38":"при отсутствии технической возможности удаления персональных данных принять меры по недопущению дальнейшей обработки персональных данных, включая их блокирование, и уведомить об этом субъекта персональных данных в тот же срок;","item39":"Оператор вправе отказать субъекту персональных данных в удовлетворении требований о прекращении обработки его персональных данных и (или) их удалении при наличии оснований для обработки персональных данных, предусмотренных Законом о защите персональных данных и иными законодательными актами, в том числе если они являются необходимыми для заявленных целей их обработки, с уведомлением об этом субъекта персональных данных в пятнадцатидневный срок;","item40":"4.7.2. заявления о получении информации, касающейся обработки персональных данных, в течение пяти рабочих дней после его получения, если иной срок не установлен законодательными актами, предоставить субъекту персональных данных в доступной форме эту информацию, либо уведомить его о причинах отказа в ее предоставлении; информация не предоставляется субъекту персональных данных в случаях, предусмотренных частью 3 статьи 11 Закона о защите персональных данных;","item41":"4.7.3. заявления, содержащего требования о внесении изменений в свои персональные данные, в пятнадцатидневный срок после его получения внести соответствующие изменения в персональные данные и уведомить об этом субъекта персональных данных либо уведомить его о причинах отказа во внесении таких изменений, если иной порядок внесения изменений в персональные данные не установлен законодательными актами;","item42":"4.7.4. заявления о получении информации о предоставлении своих персональных данных третьим лицам в пятнадцатидневный срок после его получения предоставить субъекту персональных данных информацию о том, какие его персональные данные и кому предоставлялись в течение года, предшествовавшего дате подачи заявления, либо уведомить субъекта персональных данных о причинах отказа в ее предоставлении; указанная информация может не предоставляться в случаях, предусмотренных пунктом 3 статьи 11 Закона о защите персональных данных, а также если обработка персональных данных осуществляется в соответствии с законодательством об исполнительном производстве, при осуществлении правосудия и организации деятельности судов общей юрисдикции."},"num5":{"item1":"5.1. Оператор обязан:","item2":"разъяснять субъекту персональных данных его права, связанные с обработкой персональных данных;","item3":"получать согласие субъекта персональных данных на их обработку, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами (при наличии иных правовых оснований обработки);","item4":"обеспечивать защиту данных при обработке;","item5":"при изменении целей — получать согласие при отсутствии иных оснований;","item6":"обеспечивать защиту персональных данных в процессе их обработки;","item7":"в случае необходимости изменения первоначально заявленных целей обработки персональных данных получить согласие субъекта персональных данных на обработку его персональных данных в соответствии с измененными целями обработки персональных данных при отсутствии иных оснований для такой обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item8":"принимать меры по обеспечению достоверности обрабатываемых им персональных данных, при необходимости обновлять их;","item9":"предоставлять субъекту персональных данных информацию о его персональных данных, а также о предоставлении его персональных данных третьим лицам, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item10":"вносить изменения в персональные данные, которые являются неполными, устаревшими или неточными, за исключением случаев, когда иной порядок внесения изменений в персональные данные установлен законодательными актами либо если цели обработки персональных данных не предполагают последующих изменений таких данных;","item11":"прекращать обработку персональных данных, а также осуществлять их удаление или блокирование (обеспечивать прекращение обработки персональных данных, а также их удаление или блокирование уполномоченным лицом) при отсутствии оснований для обработки персональных данных, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item12":"принимать правовые, организационные и технические меры по обеспечению защиты персональных данных от несанкционированного или случайного доступа к ним, изменения, блокирования, копирования, распространения, предоставления, удаления персональных данных, а также от иных неправомерных действий в отношении персональных данных;","item13":"обеспечить неограниченный доступ в том числе с использованием сети Интернет, к Политике до начала обработки персональных данных;","item14":"уведомлять НЦЗПД о нарушениях систем защиты персональных данных незамедлительно, но не позднее трех рабочих дней после того, как Оператору стало известно о таких нарушениях, за исключением случаев, предусмотренных НЦЗПД;","item15":"осуществлять изменение, блокирование или удаление недостоверных или полученных незаконным путем персональных данных субъекта персональных данных по требованию НЦЗПД, если иной порядок внесения изменений в персональные данные, их блокирования или удаления не установлен законодательными актами;","item16":"исполнять иные требования НЦЗПД об устранении нарушений законодательства о персональных данных;","item17":"предоставлять НЦЗПД информацию, необходимую для определения законности действий Операторов (уполномоченных лиц);","item18":"выполнять иные обязанности, предусмотренные Законом о защите персональных данных и др. законодательными актами.","item19":"5.2. Оператор определяет состав и перечень мер, необходимых и достаточных для выполнения обязанностей по обеспечению защиты персональных данных, с учетом требований Закона о защите персональных данных и иных актов законодательства."}},"b2bApplicationTitle":"ПРИЛОЖЕНИЕ","b2bApplication":{"title":"Реестр обработки персональных данных (субъекты персональных данных: физические лица – представители покупателей оборудования).","item1":"Цели обработки персональных данных","item2":"Перечень обрабатываемых персональных данных","item3":"Перечень действий с персональными данными","item4":"Правовые основания обработки персональных данных","item5":"Срок хранения персональных данных","item6":"Подготовка, заключение, исполнение, изменение и расторжение договора с Организацией о предоставлении услуг в электронной платежной системе «БЕРЛИО», в том числе с использованием мобильного приложения «Berlio internet client» (ЭПС) (далее – договор), включая идентификацию заказчика услуг, представителя заказчика услуг и проверку достоверности данных","item7":"Субъекты: Представители заказчиков услуг – юридических лиц: фамилия, имя, отчество, должность, место работы, другая информация, предусмотренная законодательством и договором для заключения и исполнения договора (в том числе в представляемых для заключения договора документах юридического лица), номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты), сведения в электронной цифровой подписи. Индивидуальные предприниматели: фамилия, имя, отчество, паспортные данные, место регистрации / жительства, банковские реквизиты для перечисления оплаты услуг, УНП, другая информация, предусмотренная законодательством и договором для заключения и исполнения договора, номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты), сведения в электронной цифровой подписи. Представители заказчиков услуг – индивидуальных предпринимателей: фамилия, имя, отчество, сведения в доверенности, номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты). Пользователи услуг – представители юридических лиц: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты (представляемая контактная информация здесь и далее подразумевает корпоративные контакты)","item8":"услуги программного обеспечения 1С: Бухгалтерия, Битрикс 24, электронного документооборота, электронной почты, СМС-рассылки, удаление","item9":"от 05.12.2022 № 453 «Об утверждении Инструкции о порядке оказания платежных услуг на территории Республики Беларусь», от 16.09.2022 № 350 «Об утверждении Правил осуществления операций с электронными деньгами» (далее – законодательство о платежных системах) - договор присоединения (с приложениями – Правилами ЭПС, Правилами обслуживания клиента в ЭПС и др.) - иные отдельно заключаемые договоры (далее – договор) для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - согласие не требуется «при получении персональных данных оператором на основании договора, заключенного (заключаемого) с субъектом персональных данных, в целях совершения действий, установленных этим договором» - законодательство о платежных системах -договор","item10":" ","item11":"Идентификация заказчика услуг, представителя заказчика услуг при совершении финансовых операций","item12":"субъект: руководитель, лицо, осуществляющее руководство бухгалтерским учетом, учредитель (участник, член), бенефициарный владелец юридического лица – заказчика услуг, индивидуального предпринимателя – заказчика услуг, пользователя ЭПС: фамилия, имя, отчество, дата и место рождения, гражданство, место жительства и (или) место пребывания, реквизиты документа, удостоверяющего личность, и (или) иного документа, на основании которого проводится идентификация, данные о выгодоприобретателе (при наличии), иные данные, определяемые Национальным банком в целях формирования межбанковской системы идентификации","item13":"сбор, систематизация, хранение, использование, предоставление в орган финансового мониторинга, удаление","item14":"без согласия субъекта: для представителей юридических лиц – абз. 5, 8 ст. 6 Закона: - согласие не требуется «при реализации норм законодательства в области национальной безопасности, о борьбе с коррупцией, о предотвращении легализации доходов, полученных преступным путем, финансирования террористической деятельности и финансирования распространения оружия массового поражения» для индивидуальных предпринимателей – абз. 20 ст. 6 Закона: - согласие не требуется «в случаях, когда обработка персональных данных является необходимой для выполнения обязанностей (полномочий), предусмотренных законодательными актами» - ст. 8 Закона «О мерах по предотвращению легализации доходов, полученных преступным путем, финансирования террористической деятельности и финансирования распространения оружия массового поражения» - иные акты законодательства о ПОД/ФТ - законодательство о платежных системах","item15":"на период услуг (срока договора) и в течение 10 лет после прекращения договора","item16":"Предоставление пользователю услуг доступа к ЭПС (в том числе с использованием мобильного приложения «Berlio internet client»), ее использование и хранение информации в личном кабинете: сбор сообщенных представителем заказчика услуг сведений о пользователе, регистрация заказчика услуг, пользователя в ЭПС, создание личного кабинета пользователя и пользование им, заполнение регистрационной карточки для регистрации в ЭПС, открытие и обслуживание лицевого счета заказчика услуг, авторизация, идентификация, аутентификация, верификация пользователя в ЭПС","item17":"Пользователь – работник заказчика услуг: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты, номера средств доступа, логин, пароль. Пользователь – индивидуальный предприниматель, его представитель: фамилия, имя, отчество, адрес регистрации, номер телефона, адрес электронной почты, номера средств доступа, логин, пароль.","item18":"сбор, систематизация, хранение, использование, удаление","item19":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item20":"предоставление пользователю услуг доступа к ЭПС, ее использование – на период услуг (срока договора) хранение информации в информационном ресурсе Организации – на период услуг (срока договора) и в течение 10 лет после прекращения договора","item21":"Звукозапись телефонных разговоров работников (представителей) Организации с субъектом в соответствии с договором (в информационном ресурсе Организации)","item22":"фамилия, имя, отчество, должность, место работы, номер телефона","item23":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченному лицу, удаление","item24":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде, гражданское законодательство - договор","item25":"на срок договора","item26":"Совершение платежных операций в ЭПС","item27":"номер средства доступа","item28":"сбор, систематизация, хранение, использование, предоставление агентам платежной системы, банку-эмитенту, ГУ «Белавтострада», ИООО «Капш Телематик Сервисиз» (взимание платы за проезд), удаление","item29":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item30":"на период услуг (срока договора) и в течение 10 лет после прекращения договора - ст. 10 Закона «О платежных системах и платежных услугах»: хранение информации о платежных операциях в течение сроков, установленных законодательством для хранения информации об операциях, совершаемых физ. лицами, юрид. лицами в бел. руб., законодательством о ПОД/ФТ","item31":"Возврат субъекту (плательщику) денежных средств (электронных денег) получателем денежных средств (электронных денег) в случаях, установленных пунктом 5 ст. 10 Закона «О платежных системах и платежных услугах»","item32":"номер средства доступа","item33":"сбор, систематизация, хранение, использование, предоставление агентам платежной системы и банку-эмитенту, удаление","item34":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item35":"на период услуг (срока договора) и в течение 10 лет после прекращения договора","item36":"Предоставление субъекту (плательщику), получателю платежа и иным поставщикам платежных услуг информации по платежным операциям осуществляемого платежа и их деталям в соответствии с пунктом 3 ст. 10 Закона «О платежных системах и платежных услугах»","item37":"номер средства доступа","item38":"сбор, систематизация, хранение, использование, предоставление субъекту (плательщику), получателю платежа и иным поставщикам платежных услуг, удаление","item39":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах для индивидуальных предпринимателей – абз. 20 ст. 6 Закона: - законодательство о платежных системах","item40":"на период услуг (срока договора)","item41":"Оказание представителю заказчика услуг, пользователю: технической, организационной, информационной поддержки (сопровождения) пользования ЭПС, в том числе путем рассылки информации о функционировании ЭПС в личном кабинете, на адрес электронной почты и смс-сообщений","item42":"Представитель заказчика услуг, пользователь – работник заказчика услуг: фамилия, имя, отчество, должность, место работы, номер телефона, адрес электронной почты, номера средства доступа, логин, пароль. Пользователь – индивидуальный предприниматель, его представитель: фамилия, имя, отчество, адрес регистрации, номер телефона, адрес электронной почты, номера электронных карт, логин, пароль.","item43":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченным лицам, предоставляющим услуги электронной почты, СМС-рассылки, удаление","item44":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item45":"на период услуг (срока договора)","item46":"Звукозапись телефонных разговоров работников (представителей) Организации с субъектом в соответствии с договором (в информационном ресурсе Организации)","item47":"фамилия, имя, отчество, должность, место работы, номер телефона","item48":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченному лицу, удаление","item49":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item50":"на период услуг (срока договора)","item51":"Отправка уведомлений субъекту в соответствии с договором","item52":"сведения в личном кабинете пользователя, номер телефона, адрес электронной почты","item53":"сбор, систематизация, хранение, использование, предоставление, поручение для обработки уполномоченным лицам, предоставляющим услуги электронного документооборота, электронной почты, СМС-рассылки, удаление","item54":"без согласия субъекта: для представителей юридических лиц – абз. 8 ст. 6 Закона: - законодательство о труде - законодательство о платежных системах -договор для индивидуальных предпринимателей – абз. 15 ст. 6 Закона: - законодательство о платежных системах -договор","item55":"на период услуг (срока договора)","item56":"Обеспечение ведения бухгалтерского и налогового учета по оказанным Организацией услугам в соответствии с договором, составления первичных учетных документов","item57":"в объеме, предусмотренном законодательством о бухгалтерском учете, необходимом для достижения цели","item58":"сбор, систематизация, хранение, использование, поручение для обработки уполномоченному лицу, предоставляющему услуги программного обеспечения 1С: Бухгалтерия, удаление","item59":"без согласия субъекта: абз. 20 ст. 6 Закона: - ст. 10 Закона «О бухгалтерском учете и отчетности»","item60":"на период услуг (срока договора) и 3 года после проведения налоговыми органами проверки соблюдения налогового законодательства. Если такая проверка не проводилась – 10 лет (п. 70 Перечня)","item61":"Взыскание задолженности, участие в досудебном и судебном разрешении споров","item62":"фамилия, имя, отчество, другая информация, предусмотренная гражданским и процессуальным законодательством, законодательством об исполнительном производстве","item63":"сбор, систематизация, хранение, использование, предоставление судам, органам, осуществляющим исполнительное производство, удаление","item64":"без согласия субъекта: абз. 3, 8, 15 ст. 6 Закона: - Гражданский кодекс, процессуальное законодательство, законодательство об исполнительном производстве","item65":"3 года / 10 лет после исполнения судебных постановлений (в соответствии с общим порядком применительно к договорам)","item66":"Направление в Национальный центр защиты персональных данных (НЦЗПД) уведомлений, информации, связанных с обработкой персональных данных Оператором","item67":"в соответствии с формой уведомления, утв. приказом директора НЦЗПД от 15.11.2021 № 13 «Об уведомлении о нарушениях систем защиты персональных данных», содержанием запроса НЦЗПД","item68":"сбор, систематизация, хранение, использование, предоставление НЦЗПД, удаление","item69":"без согласия субъекта: абз. 20 ст. 6, ст. 16, 18 Закона - п. 8, 26 Положения о Национальном центре защиты персональных данных (утв. Указом Президента Республики Беларусь от 28.10.2021 № 422) - приказ директора НЦЗПД от 15.11.2021 № 13 «Об уведомлении о нарушениях систем защиты персональных данных»","item70":"3 года (п. 33-3 Перечня)","item71":"Предоставление информации в соответствии с требованиями законодательства / по запросам (требованиям) органов внутренних дел, государственной безопасности, финансовых расследований, налоговых органов, прокуратуры","item72":"в соответствии с требованиями законодательства / содержанием запроса","item73":"сбор, систематизация, хранение, использование, предоставление запрашивающему органу, удаление","item74":"без согласия субъекта: абз. 20 ст. 6 Закона: - ст. 7, 24 Закона «Об органах внутренних дел Республики Беларусь» - ст. 15-18 Закона «Об органах государственной безопасности Республики Беларусь» - ст. 11 Закона «Об оперативно-розыскной деятельности» - Указ Президента Республики Беларусь от 18.10.2022 № 368 «О взаимодействии операторов электросвязи, поставщиков услуг электросвязи и владельцев интернет-ресурсов с органами, осуществляющими оперативно-розыскную деятельность» - ст. 6, 13 Закона «Об органах финансовых расследований Комитета государственного контроля Республики Беларусь» - гл. 10 Налогового кодекса Республики Беларусь (общая часть) - ст. 10, 27 Закона «О прокуратуре Республики Беларусь»","item75":"на период услуг (срока договора) и в течение 10 лет после прекращения договора (в течение срока давности привлечения к уголовной ответственности за тяжкие преступления)"},"applicantsPrivacy":"Обработка персональных данных соискателей","applicantsInformationTitle":"ИНФОРМАЦИЯ,","applicantsInformationSubTitle1":"предоставляемая субъекту – соискателю на трудоустройство до получения согласия на обработку персональных данных","applicantsInformationSubTitle2":"(в соответствии с пунктом 5 статьи 5 Закона Республики Беларусь «О защите персональных данных»)","applicantsConsentTitle":"СОГЛАСИЕ","applicantsConsentSubTitle1":"предоставляемое субъекту – соискателю на трудоустройство до получения согласия на обработку персональных данных","applicantsData":{"title":"ПОЛИТИКА","subTitle":"НП ООО «БЕРЛИО» в отношении обработки персональных данных соискателей на трудоустройство"},"applicantsApplicationTitle":"ПРИЛОЖЕНИЕ","applicantsInfoTitles":{"num1":"1. Наименование и место нахождения оператора,","num2":"2. Цели обработки персональных данных, перечни обрабатываемых персональных данных и действий с ними, на совершение которых получается согласие:","num3":"3. Срок,","num4":"4. Общее описание используемых способов обработки персональных данных:","num5":"5. Права, связанные с обработкой персональных данных, и механизм реализации таких прав.","num6":"6. Последствия дачи согласия субъекта персональных данных или отказа в даче такого согласия.","num7":"7. Иная информация,","num8":"8. Информация об уполномоченных лицах:"},"applicantsInfoContent":{"num1":{"item1":"получающего согласие субъекта персональных данных: НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55 (Организация / Оператор)."},"num2":{"item1":"В целях:","item2":"Перечень обрабатываемых персональных данных","item3":"Перечень действий с персональными данными","item4":"Поиск, сбор, в том числе на сайте Организации, рассмотрение и иная обработка информации (резюме) соискателя на трудоустройство, обеспечение коммуникации с субъектом представителей Организации, проведение собеседования, возможное оформление с соискателем трудовых отношений, информирование об отказе в трудоустройстве","item5":"В соответствии со ст. 26 Трудового кодекса Республики Беларусь (далее – ТК) и иными актами законодательства; иная информация, сообщенная о себе субъектом, в том числе об опыте и местах работы, номер телефона, адрес электронной почты","item6":"сбор, системати-зация, хранение, использова-ние, удаление","item7":"Формирование и ведение базы (резерва) соискателей на трудоустройство","item8":"фамилия, имя, отчество, дата рождения, сведения об образовании, номер телефона, адрес электронной почты, иная информация, предусмотренная анкетой (резюме), сообщенная о себе субъектом","item9":"сбор, системати-зация, хранение, использова-ние, удаление","item10":"В других случаях и целях обработка персональных данных осуществляется без согласия субъекта при наличии иных правовых оснований, предусмотренных статьями 6 и 8 Закона о защите персональных данных."},"num3":{"item1":"на который дается согласие субъекта персональных данных: в случае отказа в приеме на работу – 1 год."},"num4":{"item1":"Обработка персональных данных осуществляется путем: получения персональных данных в устной или письменной форме, иным способом непосредственно от субъектов персональных данных; получения персональных данных из общедоступных источников; обработки персональных данных в информационных ресурсах (системах), базах данных, реестрах, журналах и других документах Оператора; использования иных предусмотренных законодательством способов обработки персональных данных, указанных в таблице."},"num5":{"item1":"Субъект персональных данных имеет право:","item2":"в любое время без объяснения причин отозвать свое согласие на обработку персональных данных;","item3":"требовать бесплатного прекращения обработки своих персональных данных, включая их удаление, при отсутствии оснований для их обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item4":"получать информацию, касающуюся обработки своих персональных данных (при этом не должен обосновывать свой интерес к запрашиваемой информации), содержащую: наименование и место нахождения Оператора; подтверждение факта обработки персональных данных Оператором (уполномоченным им лицом); его персональные данные и источник их получения; правовые основания и цели обработки персональных данных; срок, на который дано его согласие; наименование и место нахождения уполномоченного лица, если обработка персональных данных поручена такому лицу; иную информацию, предусмотренную законодательством;","item5":"требовать внесения изменений в свои персональные данные в случае, если они являются неполными, устаревшими или неточными (с приложением соответствующих документов и (или) их заверенных в установленном порядке копий, подтверждающих необходимость внесения изменений в персональные данные);","item6":"получать информацию о предоставлении своих персональных данных третьим лицам один раз в календарный год бесплатно, если иное не предусмотрено Законом о защите персональных данных и иными законодательными актами;","item7":"обжаловать действия (бездействие) и принятые Оператором решения, нарушающие его права при обработке персональных данных, в Национальный центр защиты персональных данных (НЦЗПД) как уполномоченный орган по защите прав субъектов персональных данных в порядке, установленном законодательством об обращениях граждан и юридических лиц; принятое НЦЗПД решение может быть обжаловано субъектом в суд в порядке, установленном законодательством.","item8":"Субъект персональных данных для реализации прав, предусмотренных статьями 10–13 Закона о защите персональных данных, подает Оператору заявление в письменной форме либо в виде электронного документа, оформленное в соответствии со статьей 14 Закона о защите персональных данных, на указанный выше почтовый адрес Оператора либо на электронную почту, указанную в Политике.","item9":"Заявление субъекта должно содержать: его персональные данные – фамилию, имя, отчество, адрес его места жительства (места пребывания), дату рождения, идентификационный номер; изложение сути его требований; его личную подпись либо электронную цифровую подпись.","item10":"Ответ на заявление направляется Оператором субъекту персональных данных в форме, соответствующей форме подачи заявления, если в самом заявлении не указано иное, в сроки, установленные Законом о защите персональных данных."},"num6":{"item1":"Последствием дачи согласия на обработку персональных данных будет являться совершение Оператором действий или совокупности действий с персональными данными субъекта в заявленных Оператором в настоящей Информации целях обработки и объеме персональных данных в соответствии с текстом Согласия субъекта на обработку персональных данных.","item2":"В случае отказа субъекта в даче согласия на обработку его персональных данных Оператор сможет обрабатывать персональные данные субъекта только в случаях и в целях, предусмотренных статьями 6 и 8 Закона о защите персональных данных, когда получение согласия субъекта не требуется."},"num7":{"item1":"необходимая для обеспечения прозрачности процесса обработки персональных данных: вся информация изложена в Политике Оператора в отношении обработки персональных данных, размещенной в общедоступном месте."},"num8":{"item1":"Уполномоченным лицам обработка персональных данных субъектов не поручается."}},"applicantsConsent":{"item1":"Я, ознакомившись с Информацией, предоставляемой субъекту до получения согласия на обработку его персональных данных, в соответствии со статьей 5 Закона Республики Беларусь «О защите персональных данных» даю свое согласие НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55 (далее – Организация / Оператор) на обработку моих персональных данных (согласие оформляется путем простановки «галочки» на сайте Организации):","item2":"в целях:","list1":{"item1":"поиск, сбор, в том числе на сайте Организации, рассмотрение и инаяобработка информации (резюме) соискателя на трудоустройство, обеспечение коммуникации с субъектом представителей Организации, проведение собеседования, возможное оформление с соискателем трудовых отношений, информирование об отказе в трудоустройстве;","item2":"формирование и ведение базы (резерва) соискателей натрудоустройство;"},"item3":"перечень обрабатываемых персональных данных: в соответствии со ст. 26 Трудового кодекса Республики Беларусь и иными актами законодательства; фамилия, имя, отчество, дата рождения, сведения об образовании, номер телефона, адрес электронной почты, иная информация, предусмотренная анкетой (резюме), сообщенная о себе субъектом;","item4":"перечень действий с персональными данными: сбор, систематизация, хранение, использование, удаление.","item5":"Согласие предоставляется на 1 год (в случае отказа в приеме на работу).","item6":"Мне разъяснены и понятны:","list2":{"item1":"мои права, связанные с обработкой персональных данных, механизм их реализации, а также последствия дачи мною согласия или отказа в даче такого согласия;","item2":"то, что настоящее согласие может быть отозвано мной в любой момент в порядке, установленном Законом Республики Беларусь «О защите персональных данных»;","item3":"что при отзыве мной согласия Оператор вправе продолжить обработку моих персональных данных только в случаях, предусмотренных Законом Республики Беларусь «О защите персональных данных» (при наличии правовых оснований)."}},"applicantsTitles":{"num1":"1. ОБЩИЕ ПОЛОЖЕНИЯ","num2":"2. ЦЕЛИ, ОБЪЕМЫ, ПРАВОВЫЕ ОСНОВАНИЯ И СРОКИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ","num3":"3. ПОРЯДОК И УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ ОПЕРАТОРОМ","num4":"4. ПРАВА СУБЪЕКТОВ ПЕРСОНАЛЬНЫХ ДАННЫХ И ОБЯЗАННОСТИ ОПЕРАТОРА ПО ИХ РЕАЛИЗАЦИИ","num5":"5. ОБЯЗАННОСТИ ОПЕРАТОРА И МЕРЫ, ПРИНИМАЕМЫЕ ОПЕРАТОРОМ ПО ОБЕСПЕЧЕНИЮ ЗАЩИТЫ ПЕРСОНАЛЬНЫХ ДАННЫХ"},"applicantsContent":{"num1":{"item1":"1.1. Издание Политики в отношении обработки персональных данных физических лиц - заказчиков услуг, представителей заказчиков услуг в электронной платежной системе «БЕРЛИО» (далее - Политика) является одной из обязательных принимаемых НП ООО «БЕРЛИО» мер по обеспечению защиты персональных данных, предусмотренных статьей 17 Закона Республики Беларусь от 07.05.2021 № 99-3 «О защите персональных данных» (далее - Закон о защите персональных данных). Политика разработана в соответствии с Законом о защите персональных данных и иными актами законодательства Республики Беларусь, а также Уставом НП ООО «БЕРЛИО» в целях обеспечения защиты прав и свобод человека при обработке его персональных данных. Политика разъясняет субъектам персональных данных, каким образом и для каких целей их персональные данные собираются, используются или иным образом обрабатываются, а также отражает имеющиеся в связи с этим у субъектов персональных данных права и механизм их реализации.","item2":"1.2. Политика является локальным правовым актом НП ООО «БЕРЛИО» (далее - Оператор или Организация), регламентирующим отношения, связанные с защитой персональных данных при их обработке, осуществляемой: с использованием средств автоматизации; без использования средств автоматизации, если при этом обеспечиваются поиск персональных данных и (или) доступ к ним по определенным критериям (картотеки, списки, базы данных, журналы и др.).","item3":"1.3. Организация уделяет особое внимание защите персональных данных при их обработке и с уважением относится к соблюдению прав субъектов персональных данных. Обработка персональных данных Организацией как Оператором осуществляется в соответствии с Законом о защите персональных данных и настоящей Политикой.","item4":"1.4. Действие настоящей Политики не распространяется:","item5":"на обработку персональных данных работников, обучающихся, обратившихся лиц, подрядчиков, контрагентов, представителей контрагентов физических лиц – заказчиков услуг, представителей заказчиков услуг, посетителей;","item6":"на обработку файлов куки;","item7":"на обработку персональных данных при применении видеонаблюдения;","item8":"на обработку персональных данных Организацией в качестве уполномоченного лица;","item9":"на отношения, касающиеся случаев обработки персональных данных физическими лицами в процессе исключительно личного, семейного, домашнего и иного подобного их использования, не связанного с профессиональной или предпринимательской деятельностью.","item10":"1.5. В Политике используются основные термины и их определения в значении, определенном статьей 1 Закона о защите персональных данных.","item11":"1.6. В Политике также используются следующие понятия в значении:","item12":"сайт Оператора / Организация – веб-сайт НП ООО «БЕРЛИО»: https://www.berlio.by/;","item13":"соискатель на трудоустройство – физическое лицо, имеющее намерение предоставить, или предоставляющее, или предоставившее свои персональные данные (в виде резюме или иным образом) для целей трудоустройства в Организацию, а равно персональные данные которого собирает и обрабатывает Организация в тех же целях.","item14":"1.7. Юридическим лицом, которое осуществляет обработку персональных данных, является НП ООО «БЕРЛИО», юридический и почтовый адрес: 220007, г. Минск, ул. Быховская, д. 55; сайт: https://www.berlio.by/; общий адрес электронной почты: berlio@berlio.by; общий телефон: +375(17)3691083 (Организация / Оператор).","item15":"1.8. Политика вступает в силу с момента утверждения. Во исполнение требований пункта 4 статьи 17 Закона о защите персональных данных Политика является общедоступным документом, размещается для свободного доступа в Организации, а также в сети Интернет на сайте Организации и предусматривает возможность ознакомления с Политикой любых лиц.","item16":"1.9. Организация как Оператор вправе при необходимости в одностороннем порядке вносить в Политику изменения и дополнения с последующим размещением новой редакции Политики в общедоступном месте в Организации и на сайте Организации, где субъекты самостоятельно получают информацию об изменениях Политики.","item17":"1.10. Требования Закона о защите персональных данных и Политики обязательны для исполнения всеми работниками и иными лицами, непосредственно осуществляющими обработку персональных данных."},"num2":{"item1":"2.1. Цели обработки персональных данных в Организации основываются на требованиях законодательства, осуществляемой Организацией деятельности, реализуемых бизнес- и иных процессах, положениях договоров.","item2":"2.2. Организация осуществляет обработку персональных данных субъектов персональных данных в целях, объеме (перечне), на правовых основаниях и в сроки, определенные в Реестре обработки персональных данных (приложение к настоящей Политике, ее неотъемлемая часть)."},"num3":{"item1":"3.1. Обработка персональных данных Оператором: осуществляется в соответствии с требованиями законодательства Республики Беларусь как с использованием средств автоматизации, так и без использования таких средств; осуществляется с учетом необходимости обеспечения защиты прав и свобод субъектов персональных данных на законной и справедливой основе; ограничивается достижением конкретных, заранее определенных и законных целей, установленных в Реестрах обработки персональных данных. При обработке персональных данных:","item2":"обеспечиваются точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных; Оператором принимаются необходимые меры по удалению или уточнению неполных или неточных персональных данных;","item3":"не допускаются: обработка персональных данных, несовместимая с целями сбора персональных данных, установленными в Реестрах обработки персональных данных; объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой; избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.","item4":"3.2. Обработка персональных данных Оператором осуществляется с согласия субъекта персональных данных, за исключением случаев, предусмотренных статьями 6 и 8 Закона о защите персональных данных и иными законодательными актами (то есть при наличии иных правовых оснований обработки).","item5":"3.3. Согласие субъекта персональных данных представляет собой свободное, однозначное, информированное выражение его воли, посредством которого он разрешает Организации обработку своих персональных данных. Форма и содержание согласия на обработку персональных данных разрабатываются Организацией с учетом конкретных целей обработки персональных данных (при отсутствии иных правовых оснований обработки персональных данных). До получения согласия Организация предоставляет субъекту персональных данных информацию, предусмотренную пунктом 5 статьи 5 Закона о защите персональных данных, отдельно от иной предоставляемой ему информации.","item6":"3.4. Согласие на обработку персональных данных:","item7":"3.4.1. предоставляется субъектом Организации в письменной форме путем собственноручного подписания согласия раздельно на не связанные между собой цели обработки персональных данных; согласие может быть отозвано в письменной форме путем подачи в Организацию соответствующего заявления.","item8":"3.4.2. может предоставляться субъектом Организации в электронной форме посредством проставления соответствующей отметки («галочки»), подтверждающей согласие, на сайте Организации, раздельно на не связанные между собой цели обработки персональных данных; там же на сайте согласие может быть отозвано субъектом в электронной форме.","item9":"3.5. Субъект персональных данных при даче своего согласия Оператору:","item10":"в письменном виде – указывает свои фамилию, имя, отчество, дату согласия и ставит подпись;","item11":"в электронном виде – указывает свои фамилию, имя, отчество, иные сведения, предусмотренные регистрационной формой на сайте Организации.","item12":"3.6. Обработка персональных данных в Организации осуществляется только работниками, которые в соответствии со своей трудовой функцией непосредственно осуществляют обработку персональных данных в Организации, и иными лицами, допущенными к обработке персональных данных в установленном порядке.","item13":"3.7. Работники Организации и иные лица, непосредственно осуществляющие обработку персональных данных, а также получившие доступ к персональным данным, обрабатываемым Организацией, обязаны выполнять требования законодательства о защите персональных данных и локальных правовых актов Организации в сфере обеспечения защиты персональных данных.","item14":"3.8. Уполномоченным лицам обработка персональных данных субъектов данной Политики не поручается.","item15":"3.9. Обработка персональных данных Организацией осуществляется путем:","item16":"получения персональных данных в устной или письменной форме непосредственно от субъектов персональных данных;","item17":"получения персональных данных от третьих лиц в порядке, установленном законодательством, а также в соответствии с договорами;","item18":"получения персональных данных из общедоступных источников;","item19":"обработки персональных данных в информационных ресурсах (системах), базах данных, реестрах, журналах и других документах Организации;","item20":"использования иных предусмотренных законодательством способов обработки персональных данных.","item21":"3.10. Не допускается раскрытие третьим лицам и распространение персональных данных без согласия субъекта персональных данных, если иное не предусмотрено законодательством.","item22":"3.11. Передача персональных данных государственным органам и организациям, в том числе правоохранительным органам и судам, а также иным организациям и учреждениям осуществляется в соответствии с требованиями законодательства Республики Беларусь (с согласия субъекта персональных данных, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами /при наличии иных правовых оснований обработки/).","item23":"3.12. Трансграничная передача персональных данных на территорию иностранного государства может осуществляться Организацией:","item24":"3.13. Оператор осуществляет обработку, в том числе хранение персональных данных, не дольше, чем этого требуют цели обработки персональных данных, в сроки, установленные в Реестре обработки персональных данных. Определенный срок обработки персональных данных может быть установлен законодательством Республики Беларусь, договором.","item25":"3.14. Обработка персональных данных прекращается при наступлении одного или нескольких из указанных событий (если отсутствуют иные правовые основания для обработки, предусмотренные Законом о защите персональных данных и иными законодательными актами):","item26":"поступление от субъекта персональных данных в установленном порядке отзыва согласия на обработку его персональных данных;","item27":"поступление от субъекта персональных данных в установленном порядке требования о прекращении обработки его персональных данных и (или) их удалении;","item28":"достижение целей обработки персональных данных;","item29":"истечение срока хранения персональных данных;","item30":"обнаружение неправомерной обработки персональных данных;","item31":"по требованию Национального центра защиты персональных данных (НЦЗПД);","item32":"ликвидация Организации.","item33":"3.15. Хранение персональных данных осуществляется Оператором в соответствии с требованиями законодательства о защите персональных данных до достижения целей обработки персональных данных в сроки, установленные в Реестре обработки персональных данных. При этом:","item34":"документы на бумажных и иных материальных носителях, содержащие персональные данные, хранятся в помещениях и местах, позволяющих исключить к ним доступ посторонних лиц;","item35":"документы в электронной форме, содержащие персональные данные, хранятся в информационных ресурсах (системах) Организации с обязательным использованием паролей доступа и разграничением доступа;","item36":"документы в электронном виде, содержащие персональные данные, также могут храниться в облачном хранилище, защита которого обеспечивается собственником (владельцем, управляющим) данным интернет-ресурсом, с использованием паролей доступа.","item37":"3.16. Документы на бумажных и иных материальных носителях, содержащие персональные данные, а также персональные данные в электронной форме после прекращения обработки персональных данных уничтожаются / удаляются (блокируются) в соответствии с требованиями законодательства о защите персональных данных, иными актами законодательства и локальными правовыми актами Организации."},"num4":{"item1":"4.1. Субъект персональных данных имеет право:","item2":"4.1.1. в любое время без объяснения причин отозвать свое согласие на обработку персональных данных;","item3":"4.1.2. требовать бесплатного прекращения обработки своих персональных данных, включая их удаление, при отсутствии оснований для их обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item4":"4.1.3. получать информацию, касающуюся обработки своих персональных данных (при этом не должен обосновывать свой интерес к запрашиваемой информации), содержащую: наименование и место нахождения Организации; подтверждение факта обработки персональных данных Организацией (уполномоченным им лицом); его персональные данные и источник их получения; правовые основания и цели обработки персональных данных; срок, на который дано его согласие; наименование и место нахождения уполномоченного лица, которое является государственным органом, иной организацией, если обработка персональных данных поручена такому лицу; иную информацию, предусмотренную законодательством;","item5":"4.1.4. требовать внесения изменений в свои персональные данные в случае, если персональные данные являются неполными, устаревшими или неточными (с приложением соответствующих документов и (или) их заверенных в установленном порядке копий, подтверждающих необходимость внесения изменений в персональные данные);","item6":"4.1.5. получать информацию о предоставлении своих персональных данных третьим лицам один раз в календарный год бесплатно, если иное не предусмотрено Законом о защите персональных данных и иными законодательными актами.","item7":"4.2. Субъект персональных данных также имеет право обжаловать действия (бездействие) и принятые Организацией решения, нарушающие его права при обработке персональных данных, непосредственно в Организацию для принятия мер по восстановлению его нарушенных прав на почтовый адрес или адрес электронной почты, указанные в пункте 4.3. Политики, либо в Национальный центр защиты персональных данных в порядке, установленном законодательством об обращениях граждан и юридических лиц.","item8":"4.3. Субъект персональных данных для реализации прав, предусмотренных статьями 10–13 Закона о защите персональных данных и пунктом 4.1. Политики, подает в Организацию заявление в письменной форме либо в виде электронного документа (подписанного личной электронной цифровой подписью заявителя), оформленное в соответствии со статьей 14 Закона о защите персональных данных, на почтовые адреса центров обслуживания по месту заключения договоров:","item9":"Головной офис НП ООО «БЕРЛИО» (г. Минск):","item10":"220007 г. Минск, ул. Быховская, 55; email: dpo.minsk@berlio.by","item11":"Брестский филиал:","item12":"г. Брест, ул. К. Маркса, 33-43; email: dpo.brest@berlio.by","item13":"Витебский филиал:","item14":"г. Витебск, ул. Правды 37, корп. 2, 84; email: dpo.vitebsk@berlio.by","item15":"Гомельский филиал:","item16":"г. Гомель, ул. Речицкая, 1а-419; email: dpo.gomel@berlio.by","item17":"Гродненский филиал:","item18":"г. Гродно, ул. Победы, 17-7; email: dpo.grodno@berlio.by","item19":"Могилевский филиал:","item20":"г. Могилев, ул. Челюскинцев, 105 В; email: dpo.mogilev@berlio.by","item21":"4.4. Заявление субъекта персональных данных о реализации его прав должно содержать: его персональные данные – фамилию, собственное имя, отчество (если таковое имеется), адрес его места жительства (места пребывания), дату рождения, идентификационный номер (при отсутствии такого номера – номер документа, удостоверяющего личность субъекта персональных данных, если обработка осуществляется без согласия субъекта); изложение сути его требований; личную подпись либо электронную цифровую подпись.","item22":"4.5. За содействием в реализации своих прав субъект персональных данных может обратиться к лицу, ответственному за внутренний контроль, включая направление сообщения на email соответствующего филиала:","item23":"Минск:","item24":"dpo.minsk@berlio.by, тел.: +375(17)3691083","item25":"Брест:","item26":"dpo.brest@berlio.by, тел.: 8(0162)521215, 8(033)3721199","item27":"Витебск:","item28":"dpo.vitebsk@berlio.by, тел.: 8(029)6961196","item29":"Гомель:","item30":"dpo.gomel@berlio.by, тел.: 8(0232)509865, 8(033)3200034","item31":"Гродно:","item32":"dpo.grodno@berlio.by, тел.: 8(0152)316139","item33":"Могилев:","item34":"dpo.mogilev@berlio.by, тел.: 8(0222)767111","item35":"4.6. Ответ на заявление субъекта персональных данных о реализации его прав, предусмотренных пунктом 4.1. Политики, направляется субъекту персональных данных в форме, соответствующей форме подачи заявления, если в самом заявлении не указано иное.","item36":"4.7. Работники Организации, непосредственно осуществляющие обработку персональных данных, обязаны на основании поданного субъектом персональных данных:","item37":"4.7.1. заявления об отзыве своего согласия на обработку персональных данных в пятнадцатидневный срок после получения заявления:","item38":"в соответствии с содержанием заявления прекратить обработку персональных данных, осуществить их удаление и уведомить об этом субъекта персональных данных, если отсутствуют иные основания для таких действий с персональными данными, предусмотренные Законом о защите персональных данных и иными законодательными актами;","item39":"при отсутствии технической возможности удаления персональных данных принять меры по недопущению их дальнейшей обработки, включая их блокирование, и уведомить об этом субъекта персональных данных в тот же срок.","item40":"4.7.2. заявления, содержащего требования о бесплатном прекращении обработки своих персональных данных, включая их удаление, в пятнадцатидневный срок после получения заявления:","item41":"прекратить обработку персональных данных, а также осуществить их удаление (обеспечить прекращение обработки персональных данных, а также их удаление уполномоченным лицом) и уведомить об этом субъекта персональных данных;","item42":"при отсутствии технической возможности удаления персональных данных принять меры по недопущению дальнейшей обработки персональных данных, включая их блокирование, и уведомить об этом субъекта персональных данных в тот же срок;","item43":"Оператор вправе отказать субъекту персональных данных в удовлетворении требований о прекращении обработки его персональных данных и (или) их удалении при наличии оснований для обработки персональных данных, предусмотренных Законом о защите персональных данных и иными законодательными актами, в том числе если они являются необходимыми для заявленных целей их обработки, с уведомлением об этом субъекта персональных данных в пятнадцатидневный срок;","item44":"4.7.3. заявления о получении информации, касающейся обработки персональных данных, в течение пяти рабочих дней после его получения, если иной срок не установлен законодательными актами, предоставить субъекту персональных данных в доступной форме эту информацию, либо уведомить его о причинах отказа в ее предоставлении; информация не предоставляется субъекту персональных данных в случаях, предусмотренных частью 3 статьи 11 Закона о защите персональных данных;","item45":"4.7.4. заявления, содержащего требования о внесении изменений в свои персональные данные, в пятнадцатидневный срок после его получения внести соответствующие изменения в персональные данные и уведомить об этом субъекта персональных данных либо уведомить его о причинах отказа во внесении таких изменений, если иной порядок внесения изменений в персональные данные не установлен законодательными актами;","item46":"4.7.5. заявления о получении информации о предоставлении своих персональных данных третьим лицам в пятнадцатидневный срок после его получения предоставить субъекту персональных данных информацию о том, какие его персональные данные и кому предоставлялись в течение года, предшествовавшего дате подачи заявления, либо уведомить субъекта персональных данных о причинах отказа в ее предоставлении; указанная информация может не предоставляться в случаях, предусмотренных пунктом 3 статьи 11 Закона о защите персональных данных, а также если обработка персональных данных осуществляется в соответствии с законодательством об исполнительном производстве, при осуществлении правосудия и организации деятельности судов общей юрисдикции."},"num5":{"item1":"5.1. Оператор обязан:","item2":"разъяснять субъекту персональных данных его права, связанные с обработкой персональных данных;","item3":"получать согласие субъекта персональных данных на их обработку, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами (при наличии иных правовых оснований обработки);","item4":"до получения согласия субъекта персональных данных в письменной либо электронной форме, соответствующей форме выражения такого согласия, предоставить субъекту персональных данных информацию,содержащую: наименование и место нахождения Оператора, получающего согласие субъекта персональных данных; цели обработки персональных данных; перечень персональных данных, на обработку которых дается согласие субъекта персональных данных; срок, на который дается согласие субъекта персональных данных; информацию об уполномоченных лицах в случае, если обработка персональных данных будет осуществляться такими лицами; перечень действий с персональными данными, на совершение которых дается согласие субъекта персональных данных, общее описание используемых Оператором способов обработки персональных данных; иную информацию, необходимую для обеспечения прозрачности процесса обработки персональных данных;","item5":"до получения согласия субъекта персональных данных простым и ясным языком разъяснить субъекту персональных данных его права, связанные с обработкой персональных данных, механизм реализации таких прав, а также последствия дачи согласия субъекта персональных данных или отказа в даче такого согласия; эта информация должна быть предоставлена Оператором субъекту персональных данных в письменной либо электронной форме, соответствующей форме выражения его согласия, отдельно от иной предоставляемой ему информации;","item6":"обеспечивать защиту персональных данных в процессе их обработки;","item7":"в случае необходимости изменения первоначально заявленных целей обработки персональных данных получить согласие субъекта персональных данных на обработку его персональных данных в соответствии с измененными целями обработки персональных данных при отсутствии иных оснований для такой обработки, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item8":"принимать меры по обеспечению достоверности обрабатываемых им персональных данных, при необходимости обновлять их;","item9":"предоставлять субъекту персональных данных информацию о его персональных данных, а также о предоставлении его персональных данных третьим лицам, за исключением случаев, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item10":"вносить изменения в персональные данные, которые являются неполными, устаревшими или неточными, за исключением случаев, когда иной порядок внесения изменений в персональные данные установлен законодательными актами либо если цели обработки персональных данных не предполагают последующих изменений таких данных;","item11":"прекращать обработку персональных данных, а также осуществлять их удаление или блокирование (обеспечивать прекращение обработки персональных данных, а также их удаление или блокирование уполномоченным лицом) при отсутствии оснований для обработки персональных данных, предусмотренных Законом о защите персональных данных и иными законодательными актами;","item12":"принимать правовые, организационные и технические меры по обеспечению защиты персональных данных от несанкционированного или случайного доступа к ним, изменения, блокирования, копирования, распространения, предоставления, удаления персональных данных, а также от иных неправомерных действий в отношении персональных данных;","item13":"обеспечить неограниченный доступ в том числе с использованием сети Интернет, к Политике до начала обработки персональных данных;","item14":"уведомлять НЦЗПД о нарушениях систем защиты персональных данных незамедлительно, но не позднее трех рабочих дней после того, как Оператору стало известно о таких нарушениях, за исключением случаев, предусмотренных НЦЗПД;","item15":"осуществлять изменение, блокирование или удаление недостоверных или полученных незаконным путем персональных данных субъекта персональных данных по требованию НЦЗПД, если иной порядок внесения изменений в персональные данные, их блокирования или удаления не установлен законодательными актами;","item16":"исполнять иные требования НЦЗПД об устранении нарушений законодательства о персональных данных;","item17":"предоставлять НЦЗПД информацию, необходимую для определения законности действий Операторов (уполномоченных лиц);","item18":"выполнять иные обязанности, предусмотренные Законом о защите персональных данных и др. законодательными актами.","item19":"5.2. Оператор определяет состав и перечень мер, необходимых и достаточных для выполнения обязанностей по обеспечению защиты персональных данных, с учетом требований Закона о защите персональных данных и иных актов законодательства."}},"applicantsApplication":{"title":"Реестр обработки персональных данных (субъекты персональных данных – соискатели на трудоустройство)","item1":"Цели обработки персональных данных","item2":"Перечень обрабатываемых персональных данных","item3":"Перечень действий с персональными данными","item4":"Правовые основания обработки персональных данных","item5":"Срок хранения персональных данных","item6":"Поиск, сбор, в том числе на сайте Организации, рассмотрение и иная обработка информации (резюме) соискателя на трудоустройство, обеспечение коммуникации с субъектом представителей Организации, проведение собеседования, возможное оформление с соискателем трудовых отношений, информирование об отказе в трудоустройстве","item7":"В соответствии со ст. 26 Трудового кодекса Республики Беларусь (далее – ТК) и иными актами законодательства; иная информация, сообщенная о себе субъектом, в том числе об опыте и местах работы, номер телефона, адрес электронной почты","item8":"сбор, систематизация, хранение, использование, удаление","item9":"Согласие субъекта за исключением – без согласия субъекта: - в случае обращения субъекта с заявлением, адресованным Организации и подписанным субъектом – в соответствии с абз. 16 ст. 6 Закона «О защите персональных данных» (далее – Закон); - в отношении распространенных ранее персональных данных – в соответствии с абз. 19 ст. 6 Закона","item10":"в течение срока, на который дано согласие - в случае отказа в приеме на работу (анкеты, автобиографии, листки по учету кадров, заявления, рекомендательные письма, резюме и др.) – 1 год (п. 680 Перечня типовых документов … (утв. постановлением Министерства юстиции Республики Беларусь от 24.05.2012 № 140 (далее – Перечень)) - при приеме на работу – на период трудовых отношений и 55 лет после увольнения (п. 673 Перечня))","item11":"Истребование характеристики с предыдущих мест работы","item12":"Фамилия, имя, отчество, дата рождения, должность, сведения об образовании, трудовой деятельности, иные сведения, предусмотренные постановлением Совета Министров Республики Беларусь от 14.10.2021 № 585 «О форме характеристики»","item13":"сбор, систематизация, хранение, использование, предоставление по месту запроса характеристики, удаление","item14":"без согласия субъекта: абз. 20 ст. 6, абз. 17 п. 2 ст. 8 Закона: - согласие не требуется «в случаях, когда обработка персональных данных является необходимой для выполнения обязанностей (полномочий), предусмотренных законодат. актами» - ст. 26 ТК - п. 11 Декрета Президента Республики Беларусь от 15.12.2014 № 5 «Об усилении требований к руководящим кадрам и работникам организаций» - постановление Совета Министров Республики Беларусь от 14.10.2021 № 585 «О форме характеристики»","item15":"- в случае отказа в приеме на работу – 1 год (п. 680 Перечня) - при приеме на работу – на период трудовых отношений и 55 лет после увольнения (п. 673 Перечня)","item16":"Получение и обработка сведений о состоянии здоровья соискателя на трудоустройство (в случаях, предусмотренных законодательством)","item17":"Фамилия, имя, отчество, дата и место рождения, паспортные данные, сведения о регистрации по месту жительства, сведения о состоянии здоровья в соответствии с Формой 1 здр/у-10 (Приложение 1 к постановлению Министерства здравоохранения Республики Беларусь от 09.07.2010 № 92)","item18":"сбор, систематизация, хранение, использование, удаление","item19":"без согласия субъекта: абз. 17 п. 2 ст. 8 Закона - Постановление Министерства здравоохранения Республики Беларусь от 09.07.2010 № 92","item20":"- в случае отказа в приеме на работу – 1 год (п. 680 Перечня) - при приеме на работу – на период трудовых отношений и 55 лет после увольнения (п. 673 Перечня)","item21":"Получение из единого государственного банка данных о правонарушениях и обработка сведений о привлечении работника к административной, уголовной ответственности (в случаях, предусмотренных законодательством)","item22":"Фамилия, имя, отчество, дата и место рождения, паспортные данные, идентификационный номер, сведения о регистрации по месту жительства, сведения о привлечении к административной, уголовной ответственности","item23":"сбор, систематизация, хранение, использование, предоставление, удаление","item24":"без согласия субъекта: абз. 3 п. 2 ст. 8 Закона - ст. 26 ТК - п. 11 Декрета № 5 - ст. 13, 14, 24 Закона «Об охранной деятельности»","item25":"на период трудовых отношений и 55 лет после увольнения (п. 673 Перечня)","item26":"Формирование и ведение базы (резерва) соискателей на трудоустройство","item27":"фамилия, имя, отчество, дата рождения, сведения об образовании, номер телефона, адрес электронной почты, иная информация, предусмотренная анкетой (резюме), сообщенная о себе субъектом","item28":"сбор, систематизация, хранение, использование, удаление","item29":"Согласие субъекта","item30":"в течение срока, на который дано согласие (на 1 год)","item31":"Организация и обеспечение пропускного режима","item32":"Фамилия, имя, отчество","item33":"сбор, систематизация, хранение, использование, удаление","item34":"без согласия субъекта: абз. 20 ст. 6 Закона - ст. 9, 23 Закона «Об охранной деятельности»","item35":"журнал учета посетителей – 1 год после окончания ведения журнала"},"homeLink":"На главную","upLink":"Наверх"}');
const telFax = "(тел / факс)";
const fax = "(факс)";
const forOrganizations = "Для организаций";
const forClientInquiries = "Для обращения клиентов";
const technicalSupport = "Техническое обслуживание";
const ourBranchesAndContacts = "Наши филиалы и контакты";
const workingHours = "Пн - Чт: 08.30 - 17.30";
const fridayWorkingHours = "Пт: 08.30 - 16.15";
const daysOff = "Сб - Вс: выходной";
const rulesOfUse = "Правила использования";
const offerAgreement = "Договор оферты";
const privacy = "Конфиденциальность";
const help = "Помощь";
const copyright = "© {{year}} НП ООО «Берлио»";
const adminLogin = { "pageTitle": "Авторизация администратора", "username": "Логин", "password": "Пароль", "loading": "Загрузка...", "submit": "Войти" };
const ruContent = {
  pageTitles,
  departmentsPhone,
  departments,
  allContacts,
  searchAzs,
  personalAccount,
  customerService,
  backToHome,
  companyName,
  selectDepartment,
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
  forPartners,
  forClients,
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
  eCardReceipt,
  eCardUsage,
  contractTermination,
  ratesAndTariffs,
  fuelCardsAndGasStations,
  gasStationsAndRoutes,
  berlioEWalletRules,
  berlioUsageRegulations,
  servicesAndSoftware,
  berlioInternetClient,
  berlioCardPayApp,
  smartPayApp,
  clientCabinetSoftware,
  electronicBerlioCards,
  fuelBerlioCards,
  regulatoryDocuments,
  serviceInEPS,
  goodsAndServicePayment,
  contractConclusion,
  documentsForDownload,
  gettingElectronicCard,
  personalAccountUsage,
  tollRoadsService,
  tollRoadsPayment,
  tollRoads,
  fuelPayment,
  fuelCardUsage,
  lowAndRegulatory,
  IFRReport,
  localActsInEPS,
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
  forFuelPaymentsMain,
  gettingCardMain,
  readerSVG,
  dealResignationMain,
  priceListsAndTariffsMain,
  workWithPrivateAccount,
  documentsForDownloadMain,
  eMoneyRegulationsMain,
  legislationMain,
  reportIFRMain,
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
  copyright,
  adminLogin
};
i18n.use(initReactI18next).init({
  lng: "ru",
  // по умолчанию
  fallbackLng: "en",
  resources: {
    en: { translation: enContent },
    ru: { translation: ruContent }
  },
  interpolation: { escapeValue: false },
  initImmediate: false
  // важно для SSR
});
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
const Home = lazy(() => import("./Home.js"));
const About = lazy(() => import("./About.js"));
const Contacts = lazy(() => import("./Contacts.js"));
const News = lazy(() => import("./News.js"));
const DetailedNews = lazy(() => import("./DetailedNews.js"));
const Equipment = lazy(() => import("./Equipment.js"));
const WebCenterBerlio = lazy(() => import("./WebCenterBerlio.js"));
const OilAndCapital = lazy(() => import("./OilAndCapital.js"));
const SelfServiceCheckout = lazy(() => import("./SelfServiceCheckout.js"));
const GSAutomationSystem = lazy(() => import("./GSAutomationSystem.js"));
const InvoicesSite = lazy(() => import("./InvoicesSite.js"));
const InvoicesSiteTariffs = lazy(() => import("./InvoicesSiteTariffs.js"));
const ForClients = lazy(() => import("./ForClients.js"));
const ServiceInEPSPage = lazy(() => import("./ServiceInEPSPage.js"));
const SignAndResign = lazy(() => import("./SignAndResign.js"));
const GettingElectronicCard = lazy(() => import("./GettingElectronicCard.js"));
const CardUsageRules = lazy(() => import("./CardUsageRules.js"));
const DealResignation = lazy(() => import("./DealResignation.js"));
const PriceListsAndTariffs = lazy(() => import("./PriceListsAndTariffs.js"));
const WorkWithPrivateAccount = lazy(() => import("./WorkWithPrivateAccount.js"));
const DocumentsForDownload = lazy(() => import("./DocumentsForDownload.js"));
const SystemRules = lazy(() => import("./SystemRules.js"));
const PlasticCardUsageRules = lazy(() => import("./PlasticCardUsageRules.js"));
const NonResidentsSupport = lazy(() => import("./NonResidentsSupport.js"));
const TollRoads = lazy(() => import("./TollRoads.js"));
const ForFuelPayments = lazy(() => import("./ForFuelPayments.js"));
const IssuerRules = lazy(() => import("./IssuerRules.js"));
const EMoneyRegulations = lazy(() => import("./EMoneyRegulations.js"));
const BerlioInternetClientApp = lazy(() => import("./BerlioInternetClientApp.js"));
const BerlioCardPayApp = lazy(() => import("./BerlioCardPayApp.js"));
const SmartPayApp = lazy(() => import("./SmartPayApp.js"));
const PersonalAccWebApp = lazy(() => import("./PersonalAccWebApp.js"));
const ForPartners = lazy(() => import("./ForPartners.js"));
const VoiceReferenceService = lazy(() => import("./VoiceReferenceService.js"));
const LoyaltyProgram = lazy(() => import("./LoyaltyProgram.js"));
const ForBankInfo = lazy(() => import("./ForBankInformation.js"));
const ForNotAResidentsServices = lazy(() => import("./ForNotAResidentsServices.js"));
const Privacy = lazy(() => import("./Privacy.js"));
const CookieConsentPolicy = lazy(() => import("./CookieConsentPolicy.js"));
const BuyersPolicy = lazy(() => import("./BuyersPolicy.js"));
const B2BPolicy = lazy(() => import("./B2BPolicy.js"));
const ApplicantsPolicy = lazy(() => import("./ApplicantsPolicy.js"));
const Legislation = lazy(() => import("./Legislation.js"));
const ReportIFR = lazy(() => import("./ReportIFR.js"));
const AdminLoginPage = lazy(() => import("./AdminLoginPage.js"));
const AdminDashboardPage = lazy(() => import("./AdminDashboardPage.js"));
const UserManager = lazy(() => import("./UserManager.js"));
const NewsManager = lazy(() => import("./NewsManager.js"));
const SQLExplorer = lazy(() => import("./SQLExplorer.js"));
const PrivacyIndexRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("cookie-consent-policy", { replace: true });
  }, [navigate]);
  return null;
};
function App() {
  return /* @__PURE__ */ React__default.createElement(SelectedItemProvider, null, /* @__PURE__ */ React__default.createElement(ScrollToTop, null), /* @__PURE__ */ React__default.createElement(Suspense, { fallback: /* @__PURE__ */ React__default.createElement("div", { className: "aam_loader" }, "Loading...") }, /* @__PURE__ */ React__default.createElement(Routes, null, /* @__PURE__ */ React__default.createElement(Route, { path: "/", element: /* @__PURE__ */ React__default.createElement(Home, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/about", element: /* @__PURE__ */ React__default.createElement(About, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/contacts", element: /* @__PURE__ */ React__default.createElement(Contacts, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/news", element: /* @__PURE__ */ React__default.createElement(News, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/news/:id", element: /* @__PURE__ */ React__default.createElement(DetailedNews, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment", element: /* @__PURE__ */ React__default.createElement(Equipment, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/webCenterBerlio", element: /* @__PURE__ */ React__default.createElement(WebCenterBerlio, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/oilAndCapital", element: /* @__PURE__ */ React__default.createElement(OilAndCapital, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/selfServiceCheckout", element: /* @__PURE__ */ React__default.createElement(SelfServiceCheckout, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/gsAutomationSystem", element: /* @__PURE__ */ React__default.createElement(GSAutomationSystem, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/invoicesSite", element: /* @__PURE__ */ React__default.createElement(InvoicesSite, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/invoicesSiteTariffs", element: /* @__PURE__ */ React__default.createElement(InvoicesSiteTariffs, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/berlioInternetClientApp", element: /* @__PURE__ */ React__default.createElement(BerlioInternetClientApp, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/berlioCardPayApp", element: /* @__PURE__ */ React__default.createElement(BerlioCardPayApp, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/smartPayApp", element: /* @__PURE__ */ React__default.createElement(SmartPayApp, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/equipment/personalAccWebApp", element: /* @__PURE__ */ React__default.createElement(PersonalAccWebApp, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients", element: /* @__PURE__ */ React__default.createElement(ForClients, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/serviceInEPS", element: /* @__PURE__ */ React__default.createElement(ServiceInEPSPage, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/forFuelPayments", element: /* @__PURE__ */ React__default.createElement(ForFuelPayments, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/signAndResign", element: /* @__PURE__ */ React__default.createElement(SignAndResign, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/cardUsageRules", element: /* @__PURE__ */ React__default.createElement(CardUsageRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/gettingElectronicCard", element: /* @__PURE__ */ React__default.createElement(GettingElectronicCard, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/dealResignation", element: /* @__PURE__ */ React__default.createElement(DealResignation, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/priceListsAndTariffs", element: /* @__PURE__ */ React__default.createElement(PriceListsAndTariffs, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/workWithPrivateAccount", element: /* @__PURE__ */ React__default.createElement(WorkWithPrivateAccount, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/documentsForDownload", element: /* @__PURE__ */ React__default.createElement(DocumentsForDownload, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/plasticCardUsageRules", element: /* @__PURE__ */ React__default.createElement(PlasticCardUsageRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/nonResidentsSupport", element: /* @__PURE__ */ React__default.createElement(NonResidentsSupport, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/tollRoads", element: /* @__PURE__ */ React__default.createElement(TollRoads, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/issuerRules", element: /* @__PURE__ */ React__default.createElement(IssuerRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/eMoneyRegulations", element: /* @__PURE__ */ React__default.createElement(EMoneyRegulations, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/legislation", element: /* @__PURE__ */ React__default.createElement(Legislation, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/clients/reportIFR", element: /* @__PURE__ */ React__default.createElement(ReportIFR, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners", element: /* @__PURE__ */ React__default.createElement(ForPartners, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/voiceRefService", element: /* @__PURE__ */ React__default.createElement(VoiceReferenceService, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/loyaltyProgram", element: /* @__PURE__ */ React__default.createElement(LoyaltyProgram, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/documentsForDownload", element: /* @__PURE__ */ React__default.createElement(DocumentsForDownload, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/systemRules", element: /* @__PURE__ */ React__default.createElement(SystemRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/forBankInformation", element: /* @__PURE__ */ React__default.createElement(ForBankInfo, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/cardUsageRules", element: /* @__PURE__ */ React__default.createElement(CardUsageRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/plasticCardUsageRules", element: /* @__PURE__ */ React__default.createElement(PlasticCardUsageRules, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/partners/forNotAResidentsServices", element: /* @__PURE__ */ React__default.createElement(ForNotAResidentsServices, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/privacy", element: /* @__PURE__ */ React__default.createElement(Privacy, null) }, /* @__PURE__ */ React__default.createElement(Route, { index: true, element: /* @__PURE__ */ React__default.createElement(PrivacyIndexRedirect, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "cookie-consent-policy", element: /* @__PURE__ */ React__default.createElement(CookieConsentPolicy, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "buyers-policy", element: /* @__PURE__ */ React__default.createElement(BuyersPolicy, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "b2b-policy", element: /* @__PURE__ */ React__default.createElement(B2BPolicy, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "applicants-policy", element: /* @__PURE__ */ React__default.createElement(ApplicantsPolicy, null) })), /* @__PURE__ */ React__default.createElement(Route, { path: "/administrator", element: /* @__PURE__ */ React__default.createElement(AdminLoginPage, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "/adminDashboard", element: /* @__PURE__ */ React__default.createElement(AdminDashboardPage, null) }, /* @__PURE__ */ React__default.createElement(Route, { path: "users", element: /* @__PURE__ */ React__default.createElement(UserManager, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "news", element: /* @__PURE__ */ React__default.createElement(NewsManager, null) }), /* @__PURE__ */ React__default.createElement(Route, { path: "sql-explorer", element: /* @__PURE__ */ React__default.createElement(SQLExplorer, null) })))), /* @__PURE__ */ React__default.createElement(CookieConsentModal, null));
}
async function render(url, initialLang = "ru") {
  try {
    if (i18n.language !== initialLang) {
      await i18n.changeLanguage(initialLang);
    }
    const helmetContext = {};
    return new Promise((resolve, reject) => {
      const stream = new PassThrough();
      let html = "";
      const { pipe, abort } = renderToPipeableStream(
        /* @__PURE__ */ React__default.createElement(I18nextProvider, { i18n }, /* @__PURE__ */ React__default.createElement(HelmetProvider, { context: helmetContext }, /* @__PURE__ */ React__default.createElement(StaticRouter, { location: url }, /* @__PURE__ */ React__default.createElement(App, null)))),
        {
          onAllReady() {
            pipe(stream);
          },
          onShellError(error) {
            reject(error);
          },
          onError(error) {
            console.error("SSR streaming error:", error);
          }
        }
      );
      stream.on("data", (chunk) => {
        html += chunk.toString();
      });
      stream.on("end", () => {
        const { helmet } = helmetContext;
        const head = `
          ${helmet.title?.toString() || ""}
          ${helmet.meta?.toString() || ""}
          ${helmet.link?.toString() || ""}
        `;
        resolve({
          html,
          head,
          hydrate: true,
          lang: i18n.language
        });
      });
      setTimeout(() => abort(), 1e4);
    });
  } catch (error) {
    console.error("🔥 SSR render error:", error.stack || error);
    throw error;
  }
}
export {
  Button as B,
  CookieConsentModal as C,
  DropdownIcon as D,
  Helmet as H,
  SelectedItemContext as S,
  enContent as e,
  ruContent as r,
  render,
  useCookieConsent as u
};
