import cloneDeep from 'lodash.clonedeep'

export type Predicate = (string | number)[]

export default class MasterObject<SourceType extends Object | Array<ArrayItemsType>, ArrayItemsType> {
  private object: SourceType = {} as SourceType

  /**
   * Creates an empty object if the passed value is not an object or an array.
   * If an object or array is passed, a deep clone of it is created
   */
  public constructor(object?: SourceType) {
    if (!(this.isObject(object) || Array.isArray(object)) || this.isDate(object) || object === undefined) {
      return
    }

    this.object = cloneDeep(object)
  }

  /**
   * Get full object or value by passed predicate.
   * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
   * @returns Generic ChangedType | ValueType or undefined if value not exist
   */
  public get<ChangedType extends SourceType, ValueType>(predicate?: Predicate): ChangedType | ValueType | undefined {
    if (this.isPredicate(predicate)) {
      return this.getPredicate(predicate) as ValueType | undefined
    }

    return this.object as ChangedType
  }

  /**
   * Sets a deep clone value based on the passed predicate.
   * If the predicate path does not exist, it will be created/overridden as follows:
   * string type creates an object, numeric type creates an array.
   * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
   * @param value Generic SetterType, any value to bind
   * @returns this
   */
  public set<SetterType>(predicate: Predicate, value: SetterType): MasterObject<SourceType, ArrayItemsType> {
    if (this.isPredicate(predicate)) {
      return this.setPredicate(predicate, value)
    }

    return this
  }

  /**
   * Removes a value based on the passed predicate.
   * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
   * @returns this
   */
  public delete(predicate: Predicate): MasterObject<SourceType, ArrayItemsType> {
    if (this.isPredicate(predicate)) {
      return this.deletePredicate(predicate)
    }

    return this
  }

  /**
   * Checks the existence of a value based on the passed predicate.
   * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
   * @returns boolean
   */
  public exist(predicate: Predicate): boolean {
    if (this.isPredicate(predicate)) {
      return this.existPredicate(predicate)
    }

    return false
  }

  /**
   * Shows the contents of the object in the console
   * @returns this
   */
  public log(): MasterObject<SourceType, ArrayItemsType> {
    console.log(this.object)
    return this
  }

  private getPredicate<ValueType>(predicate: Predicate): ValueType | undefined {
    if (!this.isPredicateFilled(predicate)) {
      return undefined
    }

    let nested: any = this.object

    for (let i = 0; i < predicate.length; i++) {
      if (
        (this.isObject(nested[predicate[i]]) || Array.isArray(nested[predicate[i]])) &&
        predicate[i] in nested &&
        i !== predicate.length - 1
      ) {
        nested = nested[predicate[i]]
      } else {
        if (i === predicate.length - 1) {
          return nested[predicate[i]] as ValueType
        } else {
          return undefined
        }
      }
    }
  }

  private setPredicate<T>(predicate: Predicate, value: T): MasterObject<SourceType, ArrayItemsType> {
    if (!this.isPredicateFilled(predicate)) {
      return this
    }

    let nested: any = this.object

    for (let i = 0; i < predicate.length; i++) {
      if (!(this.isObject(nested[predicate[i]]) || Array.isArray(nested[predicate[i]])) && i !== predicate.length - 1) {
        if (this.isNumber(predicate[i + 1])) {
          nested[predicate[i]] = []
        } else {
          nested[predicate[i]] = {}
        }
      }

      if (i === predicate.length - 1) {
        nested[predicate[i]] = cloneDeep(value)
      } else {
        nested = nested[predicate[i]]
      }
    }

    return this
  }

  private deletePredicate(predicate: Predicate): MasterObject<SourceType, ArrayItemsType> {
    if (!this.isPredicateFilled(predicate)) {
      return this
    }

    let nested: any = this.object

    for (let i = 0; i < predicate.length; i++) {
      if (
        (this.isObject(nested[predicate[i]]) || Array.isArray(nested[predicate[i]])) &&
        predicate[i] in nested &&
        i !== predicate.length - 1
      ) {
        nested = nested[predicate[i]]
      } else {
        if (i === predicate.length - 1) {
          delete nested[predicate[i]]
        }

        break
      }
    }

    return this
  }

  private existPredicate(predicate: Predicate): boolean {
    if (this.isPredicateFilled(predicate) && this.getPredicate(predicate) !== this.object) {
      if (predicate.length > 1) {
        const predicateParent = this.getPredicate(predicate.slice(0, -1))

        if (
          (this.isObject(predicateParent) || Array.isArray(predicateParent)) &&
          predicate[predicate.length - 1] in predicateParent
        ) {
          return true
        }
      } else {
        if (predicate[0] in this.object) {
          return true
        }
      }
    }

    return false
  }

  private isString(value: unknown): value is string {
    return typeof value === 'string' && value !== ''
  }

  private isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(+value)
  }

  private isObject(value: unknown): value is Object {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  }

  private isDate(value: unknown): value is Date {
    return value instanceof Date
  }

  private isPredicate(value: unknown): value is Predicate {
    return Array.isArray(value) && value.every(item => this.isString(item) || this.isNumber(item))
  }

  private isPredicateFilled(predicate: Predicate): boolean {
    return predicate.length > 0
  }
}
