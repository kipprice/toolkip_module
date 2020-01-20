/**
 * piece
 * ---------------------------------------------------------------------------
 * Gets a piece of a delimited string
 *
 * @param 	str 		The string to grab a piece from
 * @param 	delim 	The character (or characters) that are delimiting the string
 * @param 	piece 	The piece number to get. Defaults to 1 if not passed in.
 *
 * @return The specified piece of the string, "" if it doesn't exist
 */
export declare function piece(str: string, delim: string, pc?: number): string;
/**
 * addPiece
 * ---------------------------------------------------------------------------
 * Add a new piece to a delimited string, adding the appropriate delimiter if
 * appropriate to do so
 *
 * @param	str			The string to add a piece to
 * @param	nextPiece	The next piece to add to the string
 * @param	delim		Delimiter to use to separate pieces
 *
 * @returns	The pieced-together string
 */
export declare function addPiece(str: string, nextPiece: string, delim: string): string;
/**
 * titleCase
 * ---------------------------------------------------------------------------
 * Capitalizes the first letter of each word of a given string, and converts all else to lowercase
 *
 * @param 	str   	The string to convert to title case
 * @param 	delim 	What separates the different words in this string
 *
 * @returns The string, now in title case
 */
export declare function titleCase(str: string, delim?: string): string;
/**
 * sentenceCase
 * ---------------------------------------------------------------------------
 * Capitalizes the first letter of a given string, and converts the rest to
 * lowercase
 *
 * @param 	str   The string to capitalize
 *
 * @returns The string, now in sentence case
 */
export declare function sentenceCase(str: any): string;
/**
 * charAt
 * ---------------------------------------------------------------------------
 * Slightly more memorable way to get a character at a given position in a
 * string
 *
 * @param 	str 	The string to take the character out of
 * @param 	idx 	What index of the string to get the character of
 *
 * @return The character at the specified position
 */
export declare function charAt(str: string, idx: number): string;
/**
 * rest
 * ---------------------------------------------------------------------------
 * Gets the substring of a string starting from a given index
 *
 * @param 	str 	The string to get the substring of
 * @param 	idx 	What index to start the substring at
 *
 * @return The rest of the string after the provided index
 */
export declare function rest(str: string, idx: number): string;
/**
 * trim
 * ---------------------------------------------------------------------------
 * Trims all white space off of the beginning and end of a string
 *
 * @param 	str 	The string to trim
 *
 * @return The trimmed string
 */
export declare function trim(str: string): string;
/**
 * stripSpaces
 * ---------------------------------------------------------------------------
 * Remove all spaces from the provided string
 *
 * @param 	str	The string to strip
 *
 * @returns	The stripped strings
 */
export declare function stripSpaces(str: string): string;
/**
 * format
 * ---------------------------------------------------------------------------
 * Take a string with placeholders and replaces them with the provided
 * parameters
 *
 * @param 	str 					The string to make replacements within
 * @param		replacements	The strings that should replace the placeholders
 *
 * @returns	The string with replacements made
 */
export declare function format(str: string, ...replacements: any[]): string;
/**
 * isNumeric
 * ---------------------------------------------------------------------------
 * Checks if a string can be parsed into an integer number
 * @param 	str 	The string to test
 *
 * @returns	True if this is an integer string
 */
export declare function isNumeric(str: string): boolean;
/**
 * addLeadingZeros
 * ---------------------------------------------------------------------------
 * Adds a number of leading zeroes before a number
 *
 * @param   count   The number of zeroes to add
 * @param   nums    The numbers to add zeroes to
 *
 * @returns All zero-padded numbers that were passed in
 */
export declare function addLeadingZeroes(count: number, unpadded: number | string): string;
/**
 * stripHTML
 * ---------------------------------------------------------------------------
 * Remove HTML tags from a particular string
 * @param 	str		String to remove tags from
 *
 * @returns	The string stripped of HTML
 */
export declare function stripHTML(str: string): string;
