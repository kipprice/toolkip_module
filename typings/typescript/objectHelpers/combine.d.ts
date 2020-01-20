import { IDictionary } from './_interfaces';
/**
 * combineObjects
 * ----------------------------------------------------------------------------
 * Take two separate objects and combine them into one
 *
 * @param   objA    First object to combine
 * @param   objB    Second object to combine; will override A in cases of conflict
 * @param   deep    True if this should be recursive
 *
 * @returns The combined object
 */
export declare function combineObjects(objA: any, objB: any, deep?: boolean): any;
/**
 * reconcileOptions
 * ----------------------------------------------------------------------------
 * Takes in two different option objects & reconciles the options between them
 *
 * @param   options    The user-defined set of option
 * @param   defaults   The default options
 *
 * @returns The reconciled option list
 */
export declare function reconcileOptions<T extends IDictionary<any>>(options: T, defaults: T): T;
