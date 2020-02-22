import { StandardElement } from ".";

/**
 * isNullOrUndefined
 * ----------------------------------------------------------------------------
 * Determine whether the data passed in has value
 * 
 * @param   value   The value to check for null / undefined
 * 
 * @returns True if the value is null or undefined
 */
export function isNullOrUndefined(value: any, strCheck?: boolean): boolean {
  if (value === undefined) { return true; }
  if (value === null) { return true; }
  if (strCheck && value === "") { return true; }
  return false;
}

/** 
 * isInterface
 * ----------------------------------------------------------------------------
 * generic function to check if a given object implements a particular interface 
 */
export function isInterface<T extends Object>(test: any, full_imp: T): test is T {

  // Loop through all of the properties of the full interface implementation & make sure at least one required elem is populated in the test
  let prop: string;
  let req_match: boolean = true;
  let val: string;

  for (prop in full_imp) {
    if (full_imp.hasOwnProperty(prop)) {
      val = full_imp[prop];

      if (val && ((test as T)[prop] === undefined)) {
        req_match = false;
        break;
      }
    }
  }

  if (!req_match) { return false; }

  // Now loop through all properties on the test to make sure there aren't extra props
  let has_extra: boolean = false;
  for (prop in test) {
    if (test.hasOwnProperty(prop)) {
      if (full_imp[prop] === undefined) {
        has_extra = true;
        break;
      }
    }
  }

  return (!has_extra);
}

/** 
 * isString
 * ----------------------------------------------------------------------------
 * Check if the element is a string 
 */
export function isString(test: any): test is string {
  return (typeof test === "string");
}

/**
 * isKeyof
 * ----------------------------------------------------------------------------
 * check if a specified value is a keyof of an object type. If used without
 * a reference, just casts a string as type keyof T. If reference is provided
 * validates that this key exists on this type
 */
export function isKeyof<T>(test: any, reference?: T): test is keyof T {
  if (!reference) { return isString(test); }
  return reference.hasOwnProperty(test);
}

/** 
 * isNumber
 * ----------------------------------------------------------------------------
 * check if the element is a number 
 */
export function isNumber(test: any): test is number {
  return (typeof test === "number");
}

/** isBoolean
 * ----------------------------------------------------------------------------
 * check if the element is a boolean 
 */
export function isBoolean(test: any): test is boolean {
  return (typeof test === "boolean");
}

/** 
 * isFunction
 * ----------------------------------------------------------------------------
 * check if the element is a function 
 */
export function isFunction(test: any): test is Function {
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
export function isObject(test: any): test is Object {
  return (typeof test === typeof {});
}

export function isStandardElement(test: any): test is StandardElement {
  if (test instanceof HTMLElement) { return true; }
  if (test instanceof SVGElement) { return true; }
  return false;
}