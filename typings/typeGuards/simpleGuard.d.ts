/**
 * isString
 * ----------------------------------------------------------------------------
 * Check if the element is a string
 */
export declare function isString(test: any): test is string;
/**
 * isNumber
 * ----------------------------------------------------------------------------
 * check if the element is a number
 */
export declare function isNumber(test: any): test is number;
/** isBoolean
 * ----------------------------------------------------------------------------
 * check if the element is a boolean
 */
export declare function isBoolean(test: any): test is boolean;
/**
 * isFunction
 * ----------------------------------------------------------------------------
 * check if the element is a function
 */
export declare function isFunction(test: any): test is Function;
/**
  * isArray
  * ----------------------------------------------------------------------------
  * Check if some data is an array
  * @param   test  The data to check
  * @returns True (with type safety) if the data is an array
  */
export declare function isArray(test: any): test is Array<any>;
/**
  * isObject
  * ----------------------------------------------------------------------------
  * Checks if some data is a complex object
  * @param   test  The data to check
  * @returns True (with type safety) if the data is an object
  *
  */
export declare function isObject(test: any): test is Object;
