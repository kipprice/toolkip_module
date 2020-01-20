
/** 
 * isString
 * ----------------------------------------------------------------------------
 * Check if the element is a string 
 */
export function isString (test: any) : test is string {
  return (typeof test === "string");
}

/** 
 * isNumber
 * ----------------------------------------------------------------------------
 * check if the element is a number 
 */
export function isNumber (test: any) : test is number {
  return (typeof test === "number");
}

/** isBoolean
 * ----------------------------------------------------------------------------
 * check if the element is a boolean 
 */
export function isBoolean (test: any) : test is boolean {
  return (typeof test === "boolean");
}

/** 
 * isFunction
 * ----------------------------------------------------------------------------
 * check if the element is a function 
 */
export function isFunction (test: any): test is Function {
  return (typeof test === "function");
}

/**
  * isArray
  * ----------------------------------------------------------------------------
  * Check if some data is an array
  * @param   test  The data to check
  * @returns True (with type safety) if the data is an array
  */
 export function isArray(test: any): test is Array<any> {
  return (test instanceof Array);
}

/**
  * isObject
  * ----------------------------------------------------------------------------
  * Checks if some data is a complex object
  * @param   test  The data to check
  * @returns True (with type safety) if the data is an object
  *  
  */
export function isObject (test: any): test is Object {
  return (typeof test === typeof {});
}