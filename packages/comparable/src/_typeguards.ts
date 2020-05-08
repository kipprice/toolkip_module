import { IEquatable, IComparable } from "./_interfaces";
import { isNullOrUndefined } from "@toolkip/shared-types";

/**
 * isEquatable
 * ----------------------------------------------------------------------------
 * determine if the specified object can be categorized as equatable
 */
export function isEquatable(obj: any): obj is IEquatable {
	if (isNullOrUndefined(obj)) { return false; }
	if ((obj as any).equals) { return true; }
	return false;
}

/**
 * isComparable
 * ----------------------------------------------------------------------------
 * determine if the specified object can be categorized as comparable
 */
export function isComparable(obj: any): obj is IComparable {
	if (isNullOrUndefined(obj)) { return false; }
	let comp: IComparable = obj as IComparable;
	if (comp.lessThan && comp.greaterThan && comp.equals) { return true; }
	return false;
}