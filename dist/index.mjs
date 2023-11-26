var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/index.ts
import cloneDeep from "lodash.clonedeep";
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
    this.object = cloneDeep(object);
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
        nested[predicate[i]] = cloneDeep(value);
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
export {
  MasterObject as default
};
//# sourceMappingURL=index.mjs.map