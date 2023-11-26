"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => MasterObject
});
module.exports = __toCommonJS(src_exports);
var import_lodash = __toESM(require("lodash.clonedeep"));
var MasterObject = class {
  /**
   * Creates an empty object if the passed value is not an object or an array.
   * If an object or array is passed, a deep clone of it is created
   */
  constructor(object) {
    __publicField(this, "object", {});
    if (!(this.isObject(object) || Array.isArray(object)) || this.isDate(object) || object === void 0) {
      return;
    }
    this.object = (0, import_lodash.default)(object);
  }
  /**
   * Get full object or value by passed predicate.
   * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
   * @returns Generic ChangedType | ValueType or undefined if value not exist
   */
  get(predicate) {
    if (this.isPredicate(predicate)) {
      return this.getPredicate(predicate);
    }
    return this.object;
  }
  /**
   * Sets a deep clone value based on the passed predicate.
   * If the predicate path does not exist, it will be created/overridden as follows:
   * string type creates an object, numeric type creates an array.
   * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
   * @param value Generic SetterType, any value to bind
   * @returns this
   */
  set(predicate, value) {
    if (this.isPredicate(predicate)) {
      return this.setPredicate(predicate, value);
    }
    return this;
  }
  /**
   * Removes a value based on the passed predicate.
   * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
   * @returns this
   */
  delete(predicate) {
    if (this.isPredicate(predicate)) {
      return this.deletePredicate(predicate);
    }
    return this;
  }
  /**
   * Checks the existence of a value based on the passed predicate.
   * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
   * @returns boolean
   */
  exist(predicate) {
    if (this.isPredicate(predicate)) {
      return this.existPredicate(predicate);
    }
    return false;
  }
  /**
   * Shows the contents of the object in the console
   * @returns this
   */
  log() {
    console.log(this.object);
    return this;
  }
  getPredicate(predicate) {
    if (!this.isPredicateFilled(predicate)) {
      return void 0;
    }
    let nested = this.object;
    for (let i = 0; i < predicate.length; i++) {
      if ((this.isObject(nested[predicate[i]]) || Array.isArray(nested[predicate[i]])) && predicate[i] in nested && i !== predicate.length - 1) {
        nested = nested[predicate[i]];
      } else {
        if (i === predicate.length - 1) {
          return nested[predicate[i]];
        } else {
          return void 0;
        }
      }
    }
  }
  setPredicate(predicate, value) {
    if (!this.isPredicateFilled(predicate)) {
      return this;
    }
    let nested = this.object;
    for (let i = 0; i < predicate.length; i++) {
      if (!(this.isObject(nested[predicate[i]]) || Array.isArray(nested[predicate[i]])) && i !== predicate.length - 1) {
        if (this.isNumber(predicate[i + 1])) {
          nested[predicate[i]] = [];
        } else {
          nested[predicate[i]] = {};
        }
      }
      if (i === predicate.length - 1) {
        nested[predicate[i]] = (0, import_lodash.default)(value);
      } else {
        nested = nested[predicate[i]];
      }
    }
    return this;
  }
  deletePredicate(predicate) {
    if (!this.isPredicateFilled(predicate)) {
      return this;
    }
    let nested = this.object;
    for (let i = 0; i < predicate.length; i++) {
      if ((this.isObject(nested[predicate[i]]) || Array.isArray(nested[predicate[i]])) && predicate[i] in nested && i !== predicate.length - 1) {
        nested = nested[predicate[i]];
      } else {
        if (i === predicate.length - 1) {
          delete nested[predicate[i]];
        }
        break;
      }
    }
    return this;
  }
  existPredicate(predicate) {
    if (this.isPredicateFilled(predicate) && this.getPredicate(predicate) !== this.object) {
      if (predicate.length > 1) {
        const predicateParent = this.getPredicate(predicate.slice(0, -1));
        if ((this.isObject(predicateParent) || Array.isArray(predicateParent)) && predicate[predicate.length - 1] in predicateParent) {
          return true;
        }
      } else {
        if (predicate[0] in this.object) {
          return true;
        }
      }
    }
    return false;
  }
  isString(value) {
    return typeof value === "string" && value !== "";
  }
  isNumber(value) {
    return typeof value === "number" && !isNaN(+value);
  }
  isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
  isDate(value) {
    return value instanceof Date;
  }
  isPredicate(value) {
    return Array.isArray(value) && value.every((item) => this.isString(item) || this.isNumber(item));
  }
  isPredicateFilled(predicate) {
    return predicate.length > 0;
  }
};
//# sourceMappingURL=index.js.map