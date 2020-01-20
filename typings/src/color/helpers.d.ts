/**
 * getApparentColor
 *
 * Calculates the non-opacity value of the semi-transparent front color when placed over another color
 *
 * @param 	frontColor	A color string including an alpha value
 * @param 	backColor	The color that appears in the background
 * @param 	opacity		The opacity of the first color, if not included in the color string
 *
 * @returns	The created apparent color as a hex string
 *
 */
export declare function getApparentColor(frontColor: string, backColor: string, opacity: number): string;
/**
 * getComplementaryColor
 *
 * Find a color that works well with the color passed in
 *
 * @param 	color		The color to find a complement for
 * @param 	cutoff 		How different the lightnesses of the colors need to be
 *
 * @returns	The color string for the appropriate complementary color
 *
 */
export declare function getComplementaryColor(color: string, cutoff: number): string;
/**
 * hexToRgb
 *
 * Converts a hex color string to a RGB color string
 *
 * @param 	hex 	The hex string to convert
 *
 * @returns The appropriate RGB string
 *
 */
export declare function hexToRgb(hex: string): string;
/**
 * hexToRgba
 *
 * Converts a hex color string to rgba color string
 *
 * @param 	hex 	The hex string to parse
 * @param 	alpha 	The alpha value to give the color
 *
 * @returns	The rgba version of this hex string
 *
 */
export declare function hexToRgba(hex: string, alpha: number): string;
/**
 * hslToRgb
 *
 * Converts a HSL string to RGB string
 *
 * @param {string} hsl - The HSL string to parse
 *
 * @returns {string} The RGB string that corresponds
 *
 */
export declare function hslToRgb(hsl: string): string;
/**
 * hslaToRgba
 *
 * Converts a HSLA string to a RGB string
 *
 * @param 	hsl 	The HSL string to convert
 * @param 	alpha 	The alpha value to use, if the hsl string doesn't include it
 *
 * @returns The appropriate RGBA string
 *
 */
export declare function hslaToRgba(hsl: string, alpha: number): string;
/**
 * fullHexString
 *
 * Grabs the hex value for a given number and ensures it is a certain length
 *
 * @param 	val 	The number to convert to Hex
 * @param 	length 	How long the hex string should be
 *
 * @returns The hex value of the passed in number
 *
 */
export declare function fullHexString(val: number, length: number): string;
