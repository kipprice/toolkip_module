import { IPoint } from '../maths/_interfaces';
export declare var IS_DEBUG: boolean;
/**
 * printObject
 * ----------------------------------------------------------------------------
 * print out a string representation of the object
 */
export declare function printObject(obj: any): void;
/**
 * getObjectString
 * ----------------------------------------------------------------------------
 * build a formatted string for any arbitrary object
 * @param   obj         The object to print
 * @param   prefix      The current prefix to use for this layer
 * @returns The created string
 */
export declare function getObjectString(obj: any, prefix?: string, isHtml?: boolean): string;
/**
 * printCallStack
 * ----------------------------------------------------------------------------
 * Print out the current callstack
 */
export declare function printCallStack(): void;
/**
 * debugPoint
 * --------------------------------------------------------------------------
 * Print the coordinates contained in a point
 * @param point 	the point to print for debugging
 */
export declare function debugPoint(point: IPoint): void;
