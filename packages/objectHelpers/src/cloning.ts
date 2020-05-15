import { IBasicRect } from '@toolkip/maths';
import { combineObjects } from "./combine";
import { map } from './manipulate';
import { ICustomCloner, Key } from './_interfaces';
import { IPoint, isPrimitive, Primitive, isArray, isObject, isDate } from '@toolkip/shared-types';

export function cloneRect(rect: IBasicRect): IBasicRect {
	let out: IBasicRect = {
		x: rect.x,
		y: rect.y,
		w: rect.w,
		h: rect.h
	};
	return out;
}

export function clonePoint(point: IPoint): IPoint {
	let out: IPoint = {
		x: point.x,
		y: point.y
	};
	return out;
}

export function clonePointArray(points: IPoint[]): IPoint[] {
	let out: IPoint[] = [];

	let pt: IPoint;
	for (pt of points) {
		let clone: IPoint = clonePoint(pt);
		out.push(clone);
	}

	return out;
}

/**
 * cloneObject
 * ----------------------------------------------------------------------------
 * Generic function to try to clone objects, using JSON parse and stringify. 
 * Does not gracefully handle classes, but can handle simple objects with 
 * relative speed

 * @param 	obj		The object to clone
 * 
 * @returns	The cloned elements
 */
export function cloneObject<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

/**
 * clone
 * ----------------------------------------------------------------------------
 * creates a deeply copied element of whatever is passed in; handles conversion
 * of common objects automatically (arrays, simple objects, Dates, primitives),
 * but in the case that special handling is needed, also allows for a custom 
 * cloning functions to be provided
 * 
 * @param	toClone			The element to clone
 * @param	customCloners	If provided, a set of functions that can apply custom
 * 							cloning functions
 * 
 * @returns	A deeply copied version of the provided element
 */
export function clone<T>(toClone: T, customCloners: ICustomCloner<any>[] = [], key?: Key): T {

	// first evaluate the custom functions; these may rely on the key that was sent with 
	// the object that's being cloned
	for (let c of customCloners) {
		if (c.typeGuard(toClone, key)) { return c.cloner(toClone, key); }
	}

	// if there wasn't a custom definition, fall back to the
	// default cloning methods
	if (isPrimitive(toClone)) {
		return _clonePrimitive(toClone);

	} else if (isDate(toClone)) {
		return _cloneDate(toClone);

	} else if (isArray(toClone)) {
		return _cloneArray(toClone, customCloners);

	} else if (isObject(toClone)) {
		return _cloneObject(toClone, customCloners);
	}
}

/**
 * _clonePrimitive
 * ----------------------------------------------------------------------------
 * primitives are special and are a stright copy over
 */
const _clonePrimitive = <T extends Primitive>(primitive: T): T => {
	return primitive;
}

/**
 * _cloneDate
 * ----------------------------------------------------------------------------
 * dates are common enough and complex enough that they get their own helper
 */
const _cloneDate = <T extends Date>(date: T): T => {
	return new Date(date.valueOf()) as T;
}

/**
 * _cloneObject
 * ----------------------------------------------------------------------------
 * this implements the general steps for cloning an object, including 
 * copying over prototypes from class
 */
const _cloneObject = <T extends Object>(obj: T, customCloners: ICustomCloner<any>[]): T => {
	
	// ensure the prototype gets copied over
	const proto = Object.getPrototypeOf(obj);
	const out = Object.create(proto);
	
	// go through each property and copy that over
	map(obj, (v, k) => {
		out[k] = clone(v, customCloners, k);
	});

	// return the result
	return out;
}

/**
 * _cloneArray
 * ----------------------------------------------------------------------------
 * generate a clone of the array by deeply cloning everything else
 */
const _cloneArray = <T extends E[], E = any>(arr: T, customCloners: ICustomCloner<any>[]): T => {
	const out = [];

	for (let e of arr) {
		out.push(clone(e, customCloners));
	}

	return out as T;
}



export function shallowCloneObject<T = any>(object: T): T {
	return combineObjects({}, object);
}
