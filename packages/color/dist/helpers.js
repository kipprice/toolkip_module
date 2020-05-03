"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
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
function getApparentColor(frontColor, backColor, opacity) {
    // Create the color object
    let col = new color_1.AnyColor(frontColor, opacity);
    // Calculate the new color
    col.getApparentColor(backColor);
    return col.toHexString();
}
exports.getApparentColor = getApparentColor;
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
function getComplementaryColor(color, cutoff) {
    let lightness;
    cutoff = cutoff || 45;
    // Grab the appropriate color
    let col = new color_1.AnyColor(color);
    // Grab the current lightness value
    lightness = col.getLightness();
    if (lightness < cutoff) {
        col.lightness = 95;
    }
    else {
        col.lightness = 5;
    }
    col.generateRgbValues();
    return col.toRgbaString();
}
exports.getComplementaryColor = getComplementaryColor;
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
function hexToRgb(hex) {
    let c = new color_1.HexColor(hex);
    return c.toRgbString();
}
exports.hexToRgb = hexToRgb;
;
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
function hexToRgba(hex, alpha) {
    let c = new color_1.HexColor(hex, alpha);
    return c.toRgbaString();
}
exports.hexToRgba = hexToRgba;
;
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
function hslToRgb(hsl) {
    let c = new color_1.HSLColor(hsl);
    return c.toRgbString();
}
exports.hslToRgb = hslToRgb;
;
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
function hslaToRgba(hsl, alpha) {
    let c = new color_1.HSLColor(hsl, alpha);
    return c.toRgbaString();
}
exports.hslaToRgba = hslaToRgba;
;
