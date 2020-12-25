import { Color, HexColor, HSLColor } from '../colors';

/**
 * convertColor
 * ----------------------------------------------------------------------------
 * translate a color string in hex, rgb, or hsl form into a different color
 * encoding
 * @param	color	The color string to translate
 * @param	output	What type of color string it should be translated to
 * @returns	The translated color string
 */
export const convertColor = (color: string, output: 'rgb' | 'rgba' | 'hex' | 'hexa' | 'hsl' | 'hsla') => {
	const c = new Color(color);
	switch (output) {
		case 'rgb' : c.toRgbString();
		case 'rgba': c.toRgbaString();

		case 'hex' : c.toHexString();
		case 'hexa': c.toHexAlphaString();

		case 'hsl' : c.toHslString();
		case 'hsla': c.toHslaString();
	}
}

//..........................................
//#region DEPRECATED

/**
 * hexToRgb
 * ----------------------------------------------------------------------------
 * Converts a hex color string to a RGB color string
 * @param 	hex 	The hex string to convert
 * @returns The appropriate RGB string
 */
export function hexToRgb(hex: string) {
	const c = new HexColor(hex);
	return c.toRgbString();
};

/**
 * hexToRgba
 * ----------------------------------------------------------------------------
 * Converts a hex color string to rgba color string
 * @param 	hex 	The hex string to parse
 * @param 	alpha 	The alpha value to give the color
 * @returns	The rgba version of this hex string
 */
export function hexaToRgba(hex: string, alpha: number): string {
	let c: HexColor = new HexColor(hex, alpha);
	return c.toRgbaString();
};

/**
 * hslToRgb
 * ----------------------------------------------------------------------------
 * Converts a HSL string to RGB string
 * @param {string} hsl - The HSL string to parse
 * @returns {string} The RGB string that corresponds
 */
export function hslToRgb(hsl: string): string {
	let c: HSLColor = new HSLColor(hsl);
	return c.toRgbString();
};

/**
 * hslaToRgba
 * ----------------------------------------------------------------------------
 * Converts a HSLA string to a RGB string
 * @param 	hsl 	The HSL string to convert
 * @param 	alpha 	The alpha value to use, if the hsl string doesn't include it
 * @returns The appropriate RGBA string
 */
export function hslaToRgba(hsl: string, alpha: number): string {
	let c: HSLColor = new HSLColor(hsl, alpha);
	return c.toRgbaString();
};

//#endregion
//..........................................