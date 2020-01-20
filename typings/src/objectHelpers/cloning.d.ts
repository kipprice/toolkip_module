import { IBasicRect, IPoint } from "../maths/interface";
export declare function cloneRect(rect: IBasicRect): IBasicRect;
export declare function clonePoint(point: IPoint): IPoint;
export declare function clonePointArray(points: IPoint[]): IPoint[];
/**
 * cloneObject
 * ----------------------------------------------------------------------------
 * Generic function to try to clone any object, using JSON stringify + parse
 * @param 	obj		The object to clone
 *
 * @returns	The cloned elements
 */
export declare function cloneObject<T>(obj: T): T;
export declare function shallowCloneObject<T = any>(object: T): T;
