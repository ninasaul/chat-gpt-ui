export const toString = Object.prototype.toString;

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

export const isDef = (val) => {
  return typeof val !== "undefined";
};

export const isUnDef = (val) => {
  return !isDef(val);
};

export const isObject = (val) => {
  return val !== null && is(val, "Object");
};

export function isDate(val) {
  return is(val, "Date");
}

export function isNull(val) {
  return val === null;
}

export function isNullAndUnDef(val) {
  return isUnDef(val) && isNull(val);
}

export function isNumber(val) {
  return is(val, "Number");
}

export function isPromise(val) {
  return (
    is(val, "Promise") &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  );
}

export function isString(val) {
  return is(val, "String");
}

export const isFunction = (val) => typeof val === "function";

export function isBoolean(val) {
  return is(val, "Boolean");
}

export function isRegExp(val) {
  return is(val, "RegExp");
}

export function isArray(val) {
  return val && Array.isArray(val);
}

export const isWindow = (val) => {
  return typeof window !== "undefined" && is(val, "Window");
};

export const isElement = (val) => {
  return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === "undefined";

export const isClient = typeof window !== "undefined";

export function isImageDom(o) {
  return o && ["IMAGE", "IMG"].includes(o.tagName);
}

export const isTextarea = (element) => {
  return element !== null && element.tagName.toLowerCase() === "textarea";
};

export const isMobile = () => {
  return !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
};

export const setClassName = (arg = {}) => {
  const { base = "z", name, extra = [], className = "", single = [] } = arg;
  const baseName = `${base}-${name}`;
  const extraName = [];
  if (isArray(extra)) {
    for (let i in extra) {
      extra[i] && extraName.push(`${baseName}-${extra[i]}`);
    }
  }
  if (isArray(single)) {
    for (let i in single) {
      single[i] && extraName.push(single[i]);
    }
  }
  return `${baseName} ${extraName.join(" ")}${
    className ? ` ${className}` : ""
  }`;
};

export const classnames = (...arg) => {
  const base = "";
  const [extra, ...rest] = arg;
  const other = [...rest];
  let className = [];
  if (isArray(extra))
    className = [...className, ...extra.map((item) => `${base}${item}`)];
  if (isString(extra)) className.push(`${base}${extra}`);
  for (let i in other) {
    const node = other[i];
    if (isArray(node)) {
      className = [...className, ...node];
    }
    if (isString(node)) {
      className.push(`${node}`);
    }
  }
  return className.join(" ");
};
