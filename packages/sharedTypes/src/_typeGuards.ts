import { 
  Primitive, 
  IUpdatable, 
  StandardElement, 
  IDrawable, 
  DrawableElement,
  FalsyTypes
} from "./_interfaces";

/**
 * isUndefined
 * ----------------------------------------------------------------------------
 * check explicitly if a value is undefined in a way that makes further
 * manipulation within Typescript easier.
 * @param   value   The value to check for undefined
 * @returns True if the provided value is undefined
 */
export function isUndefined(value: any): value is undefined {
  if (value === undefined) { return true; }
  return false;
}

/**
 * isNullOrUndefined
 * ----------------------------------------------------------------------------
 * Determine whether the data passed is neither null nor undefined. Useful for
 * checking for falsy values if empty string or 0 are valid falsy values in
 * this particular scenario 
 * 
 * @param   value   The value to check for null / undefined
 * @returns True if the value is null or undefined
 */
export function isNullOrUndefined(value: any): value is undefined | null {
  if (value === undefined) { return true; }
  if (value === null) { return true; }
  return false;
}

/**
 * isFalsy
 * ----------------------------------------------------------------------------
 * check if a provided value is falsy, within the types of falsy values that
 * a caller particularly is looking for. For example, if you are checking for
 * null, undefined, or empty string, but zero is valid, a caller can pass in 
 * 'number' to the falsyTypesToIgnore parameter, and treat a zero value as
 * truthy for this case.
 * 
 * @param   value               The value to evaluate for truthiness or falsiness
 * @param   falsyTypesToIgnore  The types of falsy value the caller doesn't 
 *                              want to trigger a 'true' response
 * 
 * @returns False if the value is truthy given the constraints, true otherwise
 * 
 * @example isFalsy(0, ['number']) // => false
 */
export function isFalsy(value: any, falsyTypesToIgnore: FalsyTypes[] = []): boolean {
  if (!!value) { return false; }

  // if the type of falsy value this value is is explicitly skipped, 
  // treat that as a truthy value
  for (let ignoredType of falsyTypesToIgnore) {
    if (ignoredType === value) {
      return false;
    }
  }

  return true;
}

/**
 * isTruthy
 * ----------------------------------------------------------------------------
 * Counterpart to `isFalsy`; checks if the given value is truthy, or should
 * be treated truthy despite being a falsy value. 
 * 
 * @param   value                     The value to check for truthiness
 * @param   falsyTypesToTreatAsTruthy The types that should be treated as 
 *                                    truthy even if they are falsy
 * 
 * @returns True if the specified value is truthy given the constraints, false
 *          otherwise.
 */
export function isTruthy(value: any, falsyTypesToTreatAsTruthy: FalsyTypes[] = []): boolean {
  return !this.isFalsy(value, falsyTypesToTreatAsTruthy);
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
 * isPrimitive
 * ----------------------------------------------------------------------------
 * checks if a particular element is one of the six primitive elements in JS
 * (string, number, boolean, null, undefined, or symbol)
 */
export function isPrimitive(test: any): test is Primitive {
  if (test === null) { return true; }
  switch (typeof test) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return true;
    default:
      return false;
  }
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
export function isArray<T>(test: any): test is Array<T> {
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

/**
 * isDate
 * ----------------------------------------------------------------------------
 * determines whether a given object is a date. Instanceof isn't sufficient so
 * we also compare the prototype
 */
export function isDate(test: any): test is Date {
	if (!(test instanceof Date)) { return false; }
	const protoName = Object.prototype.toString.call(test);
	return protoName === '[object Date]';
}

/**
 * isStandardElement
 * ----------------------------------------------------------------------------
 * verify that the provided element is either an HTML or SVG element
 */
export function isStandardElement(test: any): test is StandardElement {
  if (test instanceof HTMLElement) { return true; }
  if (test instanceof SVGElement) { return true; }
  return false;
}

/** 
 * isDrawable
 * ----------------------------------------------------------------------------
 * check if the element implements the drawable interface 
 */
export function isDrawable(test: any): test is IDrawable {
  return !!(test as IDrawable).draw;
}

/** 
 * isDrawableElement
 * ----------------------------------------------------------------------------
 * check if the element is one that can be used as a drawable base 
 */
export function isDrawableElement(test: any): test is DrawableElement {
  return (!!(test.appendChild));
}

/**
  * isUpdatable
  * ----------------------------------------------------------------------------
  * Determine if this object has an update method
  * @param test 
  */
 export function isUpdatable (test: any): test is IUpdatable {
  if (!test) { return; }
  return !!((test as any).update);
}