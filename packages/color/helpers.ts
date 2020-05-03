import { AnyColor, HexColor, HSLColor } from './color';


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
export function getApparentColor(frontColor: string, backColor: string, opacity: number): string {


	// Create the color object
	let col = new AnyColor(frontColor, opacity);

	// Calculate the new color
	col.getApparentColor(backColor);

	return col.toHexString();
}

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
export function getComplementaryColor(color: string, cutoff: number): string {

	let lightness: number;
	cutoff = cutoff || 45;

	// Grab the appropriate color
	let col = new AnyColor(color);

	// Grab the current lightness value
	lightness = col.getLightness();

	if (lightness < cutoff) {
		col.lightness = 95;
	} else {
		col.lightness = 5;
	}
	col.generateRgbValues();

	return col.toRgbaString();
}

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
export function hexToRgb(hex: string): string {
	let c: HexColor = new HexColor(hex);
	return c.toRgbString();
};

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
export function hexToRgba(hex: string, alpha: number): string {
	let c: HexColor = new HexColor(hex, alpha);
	return c.toRgbaString();
};

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
export function hslToRgb(hsl: string): string {
	let c: HSLColor = new HSLColor(hsl);
	return c.toRgbString();
};

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
export function hslaToRgba(hsl: string, alpha: number): string {
	let c: HSLColor = new HSLColor(hsl, alpha);
	return c.toRgbaString();
};