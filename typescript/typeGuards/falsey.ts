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