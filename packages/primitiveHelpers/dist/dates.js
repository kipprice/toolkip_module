"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numbers_1 = require("./numbers");
const strings_1 = require("./strings");
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
function dateDiff(a, b, signed, includeTime, returnMilli) {
    let ms;
    let diff;
    let dir;
    ms = (1000 * 60 * 60 * 24);
    // clear time data if we don't care about it
    if (!includeTime) {
        a = clearTimeInfo(a, true);
        b = clearTimeInfo(b, true);
    }
    // calculate the date diff in milliseconds
    if ((a > b) || signed) {
        diff = (a - b);
    }
    else {
        diff = (b - a);
    }
    // if we don't want the response in milliseconds, return the days value (including fractional component if appropriate)
    if (!returnMilli) {
        diff = diff / ms;
    }
    return diff;
}
exports.dateDiff = dateDiff;
;
var InclusivityEnum;
(function (InclusivityEnum) {
    InclusivityEnum[InclusivityEnum["EXCLUSIVE"] = -1] = "EXCLUSIVE";
    InclusivityEnum[InclusivityEnum["DEFAULT"] = 0] = "DEFAULT";
    InclusivityEnum[InclusivityEnum["INCLUSIVE"] = 1] = "INCLUSIVE";
})(InclusivityEnum = exports.InclusivityEnum || (exports.InclusivityEnum = {}));
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
function monthDiff(a, b, signed, inclusivity) {
    let monthDiff;
    let yearDiff;
    if ((a > b) || signed) {
        monthDiff = (a.getMonth()) - (b.getMonth()); // 3-12 = -9mo
        yearDiff = (a.getFullYear()) - (b.getFullYear()); // 18 - 17 = 1yr
    }
    else {
        monthDiff = (b.getMonth()) - (a.getMonth());
        yearDiff = (b.getFullYear()) - (a.getFullYear());
    }
    let diff = yearDiff * 12 + monthDiff;
    diff += +inclusivity;
    return diff; // 1 * 12 - 9 => 3
}
exports.monthDiff = monthDiff;
/**
 * getToday
 *
 * Grabs the current day, default without any time data
 * @param 	include_time	True if we shouldn't exclude time data
 * @returns Today's date
 *
 */
function getToday(include_time) {
    ;
    let ret;
    ret = new Date();
    if (include_time)
        return ret;
    // Clear out time data
    ret = clearTimeInfo(ret);
    return ret;
}
exports.getToday = getToday;
;
/**
 * clearTimeInfo
 *
 * Clear out all time info associated with the date, including the timezone
 * @param date - the original date to clear data from
 * @returns The time-agnostic date
 *
 */
function clearTimeInfo(date, clearTZ) {
    let dateStr = shortDate(date);
    let outDate;
    if (clearTZ) {
        outDate = new Date(dateStr + " 00:00Z"); // Convert to this timezone and to the particular date
    }
    else {
        outDate = new Date(dateStr);
    }
    return outDate;
}
exports.clearTimeInfo = clearTimeInfo;
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
function businessDateDiff(a, b, signed, includeTime, returnMilli) {
    ;
    let diff;
    let dayOfWeek;
    let dir;
    let idx;
    // Calculate the standard date
    diff = dateDiff(a, b, signed, includeTime, returnMilli);
    // Grab the 2nd day of the week, because we skip the first day
    dayOfWeek = (b > a ? a.getDay() : b.getDay()) + 1;
    dayOfWeek %= 7;
    if (dayOfWeek < 0) {
        dayOfWeek = 6;
    }
    // Loop through the days between the two dates and pull out any weekend days
    let weekendDays = 0;
    for (idx = 0; idx < Math.abs(diff); idx += 1) {
        // If this day is a weekend, add it to the # of weekend days
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekendDays += 1;
        }
        // grab the next day, based on the date direction
        dayOfWeek += 1;
        dayOfWeek %= 7;
        if (dayOfWeek < 0) {
            dayOfWeek = 6;
        }
    }
    // determine if we need to add or subtract to change the dates
    if (diff < 0) {
        dir = -1;
    }
    else {
        dir = 1;
    }
    return diff - (weekendDays * dir);
}
exports.businessDateDiff = businessDateDiff;
;
/**
 * shortDate
 *
 * Gets the display string of the date in a short format (MM/DD/YYYY)
 * @param 	dt 	The date to get the short date for
 * @returns	The short version of this date
 *
 */
function shortDate(dt) {
    ;
    if (!dt) {
        return "";
    }
    let yr;
    yr = getShortYear(dt);
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + yr;
}
exports.shortDate = shortDate;
;
/**
 * inputDateFmt
 *
 * Converts the date into the format used by date inputs
 * @param {Date} dt - The date to convert
 *
 */
function inputDateFmt(dt) {
    ;
    let m;
    let d;
    let y;
    y = dt.getFullYear();
    m = (dt.getMonth() + 1);
    if (m < 10)
        m = "0" + m;
    d = +dt.getDate();
    if (d < 10)
        d = "0" + d;
    return (dt.getFullYear() + "-" + m + "-" + d);
}
exports.inputDateFmt = inputDateFmt;
;
// InputToDate
//-------------------------------------------
/**
 * Takes a string returned by an input field for a date and converts it to a JS date
 * @param {string} iDt - The date string to convert (if available)
 * @param {string} iTime - The time string to convert (if available)
 */
function inputToDate(iDt, iTime) {
    let outDate;
    // Handle the input date string
    if (iDt) {
        let dtArr = iDt.split("-");
        outDate = new Date(+dtArr[0], +dtArr[1] - 1, +dtArr[2]);
    }
    else if (iTime) {
        outDate = getToday();
    }
    else {
        outDate = null;
        return outDate;
    }
    // Handle the input time string
    if (iTime) {
        let timeArr = iTime.split(":");
        outDate.setHours(+timeArr[0]);
        outDate.setMinutes(+timeArr[1]);
    }
    return outDate;
}
exports.inputToDate = inputToDate;
;
/**
 * Gets the display string of the time in a short format (HH:MM)
 * @param {Date} dt - The date to extract the time from
 * @param {Boolean} withExtra - If true, will display as HH:MM AM/PM instead of military time
 */
function shortTime(dt, withExtra) {
    ;
    let min;
    let min_str;
    let hours;
    let half;
    //Get the minutes value for the current date
    min = +dt.getMinutes();
    hours = +dt.getHours();
    half = "";
    //We need to pad minutes to get a recognizable time format
    if (min < 10) {
        min_str = "0" + min;
    }
    else {
        min_str = min.toString();
    }
    if (withExtra) {
        half = " AM";
        if (hours >= 12)
            half = " PM";
        if (hours > 12)
            hours -= 12;
        if (hours === 0) {
            hours = 12;
        }
    }
    //Return unpadded hours (but in military time) and padded minutes.
    return hours + ":" + min_str + half;
}
exports.shortTime = shortTime;
;
function inputTimeFmt(time, includeSeconds) {
    let out = [];
    let hours = time.getHours();
    out.push(numbers_1.padToDigits(hours, 2));
    let minutes = time.getMinutes();
    out.push(numbers_1.padToDigits(minutes, 2));
    if (includeSeconds) {
        let seconds = time.getSeconds();
        out.push(numbers_1.padToDigits(seconds, 2));
    }
    return out.join(":");
}
exports.inputTimeFmt = inputTimeFmt;
/**
 * Gets the display string for a date and time
 * @param {Date} dt - The date to extract the formatted string from
 * @param {Boolean} withExtra - If true, uses AM/PM format instead of military time.
 */
function shortDateTime(dt, with_extra) {
    return shortDate(dt) + " " + shortTime(dt, with_extra);
}
exports.shortDateTime = shortDateTime;
;
function stopwatchDisplay(milli, noLeadingZeros, noBlanks) {
    let seconds;
    let minutes;
    let hours;
    let days;
    let arr;
    let sec_str;
    let min_str;
    let hr_str;
    // Add the leading zeros if appropriate
    if (!noLeadingZeros) {
        sec_str = strings_1.addLeadingZeroes(2, seconds);
        min_str = strings_1.addLeadingZeroes(2, minutes);
        hr_str = strings_1.addLeadingZeroes(2, hours);
    }
    else {
        sec_str = seconds.toString();
        min_str = minutes.toString();
        hr_str = hours.toString();
    }
    return days + "D  " + hr_str + ":" + min_str + ":" + sec_str + " '" + milli;
}
exports.stopwatchDisplay = stopwatchDisplay;
;
function _retrieveCountsFromMilli(milli) {
    let out = {};
    let remaining = milli;
    out.days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    remaining -= (out.days * 24 * 60 * 60 * 1000);
    out.hours = Math.floor(remaining / (60 * 60 * 1000));
    remaining -= (out.hours * 60 * 60 * 1000);
    out.minutes = Math.floor(remaining / (60 * 1000));
    remaining -= (out.minutes * 60 * 1000);
    out.seconds = Math.floor(remaining / 1000);
    remaining -= (out.seconds * 1000);
    out.milliseconds = remaining;
    return out;
}
function updatedStopwatchDisplay(milli, options) {
    let diffs = _retrieveCountsFromMilli(milli);
    let out = [];
    if (diffs.days) {
        out.push(diffs.days + " days");
    }
    if (diffs.hours) {
        out.push(diffs.hours + " hours");
    }
    if (diffs.minutes) {
        out.push(diffs.minutes + " minutes");
    }
    if (diffs.seconds) {
        out.push(diffs.seconds + " seconds");
    }
    if (diffs.milliseconds && options.showMilli) {
        out.push(diffs.milliseconds + " ms");
    }
    return out.join(" ");
}
exports.updatedStopwatchDisplay = updatedStopwatchDisplay;
function addToDate(date, counts) {
    if (counts.milliseconds) {
        date.setMilliseconds(date.getMilliseconds() + counts.milliseconds);
    }
    if (counts.seconds) {
        date.setSeconds(date.getSeconds() + counts.seconds);
    }
    if (counts.minutes) {
        date.setMinutes(date.getMinutes() + counts.minutes);
    }
    if (counts.hours) {
        date.setHours(date.getHours() + counts.hours);
    }
    if (counts.days) {
        date.setDate(date.getDate() + counts.days);
    }
    if (counts.months) {
        date.setMonth(date.getMonth() + counts.months);
    }
    if (counts.years) {
        date.setFullYear(date.getFullYear() + counts.years);
    }
    return date;
}
exports.addToDate = addToDate;
;
/**
 * gets the name of the month given a particular date
 * @param date - the date to get the month from
 * @param [short] - If true, returns the short version of the month name
 * @returns string of month name
 */
function getMonthName(date, short) {
    switch (date.getMonth()) {
        case 0:
            if (short)
                return "Jan";
            return "January";
        case 1:
            if (short)
                return "Feb";
            return "February";
        case 2:
            if (short)
                return "Mar";
            return "March";
        case 3:
            if (short)
                return "Apr";
            return "April";
        case 4:
            return "May";
        case 5:
            if (short)
                return "Jun";
            return "June";
        case 6:
            if (short)
                return "Jul";
            return "July";
        case 7:
            if (short)
                return "Aug";
            return "August";
        case 8:
            if (short)
                return "Sept";
            return "September";
        case 9:
            if (short)
                return "Oct";
            return "October";
        case 10:
            if (short)
                return "Nov";
            return "November";
        case 11:
            if (short)
                return "Dec";
            return "December";
    }
    return "";
}
exports.getMonthName = getMonthName;
;
/**
 * getDayOfWeek
 *
 * Get the name of a day of the week
 * @param 	date 	the date to grab the d.o.w. from
 * @param 	short 	If true, returns the short version of the month name
 * @returns string of day-of-week name
 *
 */
function getDayOfWeek(date, short) {
    ;
    switch (date.getDay()) {
        case 0:
            if (short)
                return "Sun";
            return "Sunday";
        case 1:
            if (short)
                return "Mon";
            return "Monday";
        case 2:
            if (short)
                return "Tues";
            return "Tuesday";
        case 3:
            if (short)
                return "Wed";
            return "Wednesday";
        case 4:
            if (short)
                return "Thurs";
            return "Thursday";
        case 5:
            if (short)
                return "Fri";
            return "Friday";
        case 6:
            if (short)
                return "Sat";
            return "Saturday";
    }
    return "";
}
exports.getDayOfWeek = getDayOfWeek;
;
function getLengthOfMonthInDays(date) {
    if (!date) {
        return -1;
    }
    let month = date.getMonth();
    switch (month) {
        case 0: // JANUARY
        case 2: // MARCH
        case 4: // MAY
        case 6: // JULY
        case 7: // AUGUST
        case 9: // OCTOBER
        case 11: // DECEMBER
            return 31;
        case 1: // FEBRUARY
            if (isLeapYear(date)) {
                return 29;
            }
            else {
                return 28;
            }
        default:
            return 30;
    }
}
exports.getLengthOfMonthInDays = getLengthOfMonthInDays;
function isLeapYear(date) {
    if (!date) {
        return false;
    }
    let year = date.getFullYear();
    // leap years are always divisble by 4
    if (year % 4 !== 0) {
        return false;
    }
    // but only century markers that are divisible by 400 are leap years
    if ((year % 100 === 0) && (year % 400 !== 0)) {
        return false;
    }
    return true;
}
exports.isLeapYear = isLeapYear;
/** grab the short version of the year */
function getShortYear(date) {
    return (+date.getFullYear() % 100);
}
exports.getShortYear = getShortYear;
function isWeekend(date) {
    let dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
        return true;
    } // SUNDAY
    if (dayOfWeek === 6) {
        return true;
    } // SATURDAY
    return false; // EVERYTHING ELSE
}
exports.isWeekend = isWeekend;
function isToday(date) {
    let today = getToday();
    let cloneDate = clearTimeInfo(date);
    return isSameDate(today, cloneDate);
}
exports.isToday = isToday;
function isSameDate(dateA, dateB) {
    if (shortDate(dateA) === shortDate(dateB)) {
        return true;
    }
    return false;
}
exports.isSameDate = isSameDate;
/**
 * getDisplayDuration
 *
 * Create a display string for a time duration
 * @param 	counts	The duration to stringify
 * @returns	The display duration string
 *
 */
function getDisplayDuration(counts) {
    // update up to the highest available range for dates
    _updateDateDifferences(1000, counts, "milliseconds", "seconds");
    _updateDateDifferences(60, counts, "seconds", "minutes");
    _updateDateDifferences(60, counts, "minutes", "hours");
    _updateDateDifferences(24, counts, "hours", "days");
    _updateDateDifferences(30, counts, "days", "months");
    _updateDateDifferences(12, counts, "months", "years");
    // create the string based on the counts
    let out = [];
    if (counts.years) {
        out.push(_createPluralString(counts.years, "year"));
    }
    if (counts.months) {
        out.push(_createPluralString(counts.months, "month"));
    }
    if (counts.days) {
        out.push(_createPluralString(counts.days, "day"));
    }
    if (counts.hours) {
        out.push(_createPluralString(counts.hours, "hour"));
    }
    if (counts.minutes) {
        out.push(_createPluralString(counts.minutes, "minute"));
    }
    if (counts.seconds) {
        out.push(_createPluralString(counts.seconds, "second"));
    }
    if (counts.milliseconds) {
        out.push(_createPluralString(counts.milliseconds, "millisecond"));
    }
    return out.join(" ");
}
exports.getDisplayDuration = getDisplayDuration;
function _updateDateDifferences(divisor, out, startKey, endKey) {
    if (!out[startKey]) {
        out[startKey] = 0;
    }
    if (!out[endKey]) {
        out[endKey] = 0;
    }
    let dividend = out[startKey];
    let remainder = dividend % divisor;
    let quotient = Math.floor(dividend / divisor);
    out[startKey] = remainder;
    out[endKey] += quotient;
    return out;
}
function _createPluralString(amount, singular, plural) {
    if (amount === 1) {
        return amount + " " + singular;
    }
    else {
        if (!plural) {
            plural = singular + "s";
        }
        return amount + " " + plural;
    }
}
//#endregion
//..........................................
