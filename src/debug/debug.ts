import { IPoint } from '../maths/_interfaces';
import { map } from '../objectHelpers/navigate';

export var IS_DEBUG: boolean = false;

/**
 * printObject
 * ----------------------------------------------------------------------------
 * print out a string representation of the object
 */
export function printObject(obj: any): void {
    let str: string = getObjectString(obj);
    console.log(str);
}

/**
 * getObjectString
 * ----------------------------------------------------------------------------
 * build a formatted string for any arbitrary object
 * @param   obj         The object to print
 * @param   prefix      The current prefix to use for this layer
 * @returns The created string
 */
export function getObjectString(obj: any, prefix?: string, isHtml?: boolean): string {
    if (!prefix) { prefix = ""; }

    if ((typeof obj === "string") ||
        (typeof obj === "number") ||
        (typeof obj === "boolean") ||
        (obj instanceof Date) ||
        (obj instanceof Function))
    { 
        return obj.toString(); 
    }

    let newLine = isHtml ? "<br>" : "\n";
    let tab = isHtml ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "\t";

    let outputStr: string = "";
    outputStr += "{";
    map(
        obj, 
        (elem: any, key: string) => {
            outputStr += newLine + tab + prefix + key + " : " + getObjectString(elem, prefix + tab, isHtml);
        }
    );
    outputStr += newLine + prefix + "}\n";

    return outputStr;
}

/**
 * printCallStack
 * ----------------------------------------------------------------------------
 * Print out the current callstack
 */
export function printCallStack(): void {
    console.log(new Error().stack);
}

/**
 * debugPoint
 * --------------------------------------------------------------------------
 * Print the coordinates contained in a point
 * @param point 	the point to print for debugging
 */
export function debugPoint(point: IPoint): void {
	if (!point.z) {
		console.log("2D POINT: (" + point.x + ", " + point.y + ")");
	} else {
		console.log("3D POINT: (" + point.x + ", " + point.y + ", " + point.z + ")");
	}
}