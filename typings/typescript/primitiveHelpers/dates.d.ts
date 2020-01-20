/**
 * dateDiff
 *
 *	Finds the difference in days between two date objects
 *
 *	@param 	a 				The first date to compare
 *	@param 	b 				The second date to compare
 *	@param 	signed			If true, will take the difference in order
 *								passed in (e.g. A - B)
 *	@param 	includeTime 	If true, will take the ms difference instead of
 *								the day difference
 *  @param 	returnMilli		If true, returns a value in milliseconds even if
 * 								milliseconds weren't compared
 *
 * @returns	The difference between dates
 *
 **/
export declare function dateDiff(a: Date, b: Date, signed?: boolean, includeTime?: boolean, returnMilli?: boolean): number;
export declare enum InclusivityEnum {
    EXCLUSIVE = -1,
    DEFAULT = 0,
    INCLUSIVE = 1
}
/**
 * monthDiff
 *
 * Determine how far apart (in months)
 * @param	a				The first date to compare
 * @param	b				The second date to compare
 * @param	signed			If true
 * @param	inclusivity		Should this diff be inclusive or exclusive
 *
 */
export declare function monthDiff(a: Date, b: Date, signed?: boolean, inclusivity?: InclusivityEnum): number;
/**
 * getToday
 *
 * Grabs the current day, default without any time data
 * @param 	include_time	True if we shouldn't exclude time data
 * @returns Today's date
 *
 */
export declare function getToday(include_time?: boolean): Date;
/**
 * clearTimeInfo
 *
 * Clear out all time info associated with the date, including the timezone
 * @param date - the original date to clear data from
 * @returns The time-agnostic date
 *
 */
export declare function clearTimeInfo(date: Date, clearTZ?: boolean): Date;
/**
 * businessDateDiff
 *
 * Compares two dates to determine the business day difference between them
 * @param 	a 				The first date to compare
 * @param 	b 				The second date to compare
 * @param 	signed 			True if we should compare the dates in order
 * 								(e.g. Date A - Date B)
 * @param 	includeTime 	If true, also compares the time
 * @param 	returnMilli 	Returns the date difference in milliseconds
 * 								instead of days
 * @returns The business-date diff between the 2 dates
 *
 */
export declare function businessDateDiff(a: Date, b: Date, signed?: boolean, includeTime?: boolean, returnMilli?: boolean): number;
/**
 * shortDate
 *
 * Gets the display string of the date in a short format (MM/DD/YYYY)
 * @param 	dt 	The date to get the short date for
 * @returns	The short version of this date
 *
 */
export declare function shortDate(dt: Date): string;
/**
 * inputDateFmt
 *
 * Converts the date into the format used by date inputs
 * @param {Date} dt - The date to convert
 *
 */
export declare function inputDateFmt(dt: Date): string;
/**
 * Takes a string returned by an input field for a date and converts it to a JS date
 * @param {string} iDt - The date string to convert (if available)
 * @param {string} iTime - The time string to convert (if available)
 */
export declare function inputToDate(iDt?: string, iTime?: string): Date;
/**
 * Gets the display string of the time in a short format (HH:MM)
 * @param {Date} dt - The date to extract the time from
 * @param {Boolean} withExtra - If true, will display as HH:MM AM/PM instead of military time
 */
export declare function shortTime(dt: Date, withExtra?: boolean): string;
export declare function inputTimeFmt(time: Date, includeSeconds?: boolean): string;
/**
 * Gets the display string for a date and time
 * @param {Date} dt - The date to extract the formatted string from
 * @param {Boolean} withExtra - If true, uses AM/PM format instead of military time.
 */
export declare function shortDateTime(dt: Date, with_extra?: boolean): string;
export declare function stopwatchDisplay(milli: number, noLeadingZeros: any, noBlanks: any): string;
export interface IStopwatchOptions {
    showMilli?: boolean;
}
export declare function updatedStopwatchDisplay(milli: number, options: IStopwatchOptions): string;
export declare function addToDate(date: Date, counts: IDateDifferences): Date;
/**
 * gets the name of the month given a particular date
 * @param date - the date to get the month from
 * @param [short] - If true, returns the short version of the month name
 * @returns string of month name
 */
export declare function getMonthName(date: Date, short?: boolean): string;
/**
 * getDayOfWeek
 *
 * Get the name of a day of the week
 * @param 	date 	the date to grab the d.o.w. from
 * @param 	short 	If true, returns the short version of the month name
 * @returns string of day-of-week name
 *
 */
export declare function getDayOfWeek(date: Date, short?: boolean): string;
export declare function getLengthOfMonthInDays(date: Date): number;
export declare function isLeapYear(date: Date): boolean;
/** grab the short version of the year */
export declare function getShortYear(date: Date): number;
export declare function isWeekend(date: Date): boolean;
export declare function isToday(date: Date): boolean;
export declare function isSameDate(dateA: Date, dateB: Date): boolean;
/**
 * getDisplayDuration
 *
 * Create a display string for a time duration
 * @param 	counts	The duration to stringify
 * @returns	The display duration string
 *
 */
export declare function getDisplayDuration(counts: IDateDifferences): string;
/**
 * @file Helper functions for working with dates
 * @author Kip Price
 * @version 1.0
 * @since 1.1
 *
 */
export interface IDateDifferences {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}
