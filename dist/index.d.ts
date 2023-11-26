type Predicate = (string | number)[];
declare class MasterObject<SourceType extends Object | Array<ArrayItemsType>, ArrayItemsType> {
    private object;
    /**
     * Creates an empty object if the passed value is not an object or an array.
     * If an object or array is passed, a deep clone of it is created
     */
    constructor(object?: SourceType);
    /**
     * Get full object or value by passed predicate.
     * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
     * @returns Generic ChangedType | ValueType or undefined if value not exist
     */
    get<ChangedType extends SourceType, ValueType>(predicate?: Predicate): ChangedType | ValueType | undefined;
    /**
     * Sets a deep clone value based on the passed predicate.
     * If the predicate path does not exist, it will be created/overridden as follows:
     * string type creates an object, numeric type creates an array.
     * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
     * @param value Generic SetterType, any value to bind
     * @returns this
     */
    set<SetterType>(predicate: Predicate, value: SetterType): MasterObject<SourceType, ArrayItemsType>;
    /**
     * Removes a value based on the passed predicate.
     * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
     * @returns this
     */
    delete(predicate: Predicate): MasterObject<SourceType, ArrayItemsType>;
    /**
     * Checks the existence of a value based on the passed predicate.
     * @param predicate type Predicate = (string | number)[], array of string keys or number indexes
     * @returns boolean
     */
    exist(predicate: Predicate): boolean;
    /**
     * Shows the contents of the object in the console
     * @returns this
     */
    log(): MasterObject<SourceType, ArrayItemsType>;
    private getPredicate;
    private setPredicate;
    private deletePredicate;
    private existPredicate;
    private isString;
    private isNumber;
    private isObject;
    private isDate;
    private isPredicate;
    private isPredicateFilled;
}

export { type Predicate, MasterObject as default };
