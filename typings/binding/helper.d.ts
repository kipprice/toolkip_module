import { BoundEvalFunction, BoundUpdateFunction, BoundDeleteFunction } from './_interfaces';
import { IEqualityFunction } from '../comparable/comparable';
/**
 * bind
 * ---------------------------------------------------------------------------
 * Ties a particular piece of data to an update function, so that if the
 * value changes, the update function can be executed
 *
 * @param 	evalFunc 	Function to grab current state of the value
 * @param 	updateFunc 	Function to call upon the value changing
 *
 * @returns	The current state of the value
 */
export declare function bind<T>(evalFunc: BoundEvalFunction<T>, updateFunc: BoundUpdateFunction<T>, deleteFunc?: BoundDeleteFunction, equalsFunc?: IEqualityFunction<T>): T;
