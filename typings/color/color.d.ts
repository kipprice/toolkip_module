import { NamedClass } from "../namedClass/namedClass";
import { IEquatable } from "../comparable/comparable";
import { RGBEnum, IColorMultipliers } from "../_(wip)_/_(wip)_color/_interfaces";
import { HSLPieceEnum } from "./_interfaces";
/**
 * @class Color
 * Handles conversion between color values
 * @version 1.1
 *
 */
export declare abstract class Color extends NamedClass implements IEquatable {
    /** keep track of whether the color was parsed correctly */
    protected _parsedCorrectly: boolean;
    /** shared alpha property for the color */
    protected _alpha: number;
    set alpha(value: number);
    get alpha(): number;
    /** red value of RGB */
    protected _red: number;
    set red(value: number);
    get red(): number;
    /** green value of RGB */
    protected _green: number;
    set green(value: number);
    get green(): number;
    /** blue value of RGB */
    protected _blue: number;
    set blue(value: number);
    get blue(): number;
    /** current hue of HSL color */
    protected _hue: number;
    set hue(value: number);
    get hue(): number;
    /** current saturation value of HSL color */
    protected _saturation: number;
    set saturation(value: number);
    get saturation(): number;
    /** current lightness value of HSL color */
    protected _lightness: number;
    set lightness(value: number);
    get lightness(): number;
    protected _startHue: number;
    protected _startSaturation: number;
    protected _startLightness: number;
    /** perceived luminance of the color */
    protected _luminance: number;
    get luminance(): number;
    /**
    * Creates an object that can handle color conversions
    * @constructor
    * @param {number} [r] - The red value for the color
    * @param {number} [g] - The green value for the color
    * @param {number} [b] - The blue value for the color
    * @param {number} [a] - The alpha value for the color
    *
    */
    constructor();
    /**
     * rgbaString
     *
     * Gets the appropriate RGBA string for this color
     *
     * @returns {string} RGBA string for the color
     *
     */
    toRgbaString(): string;
    /**
     * rgbString
     *
     * Grabs the RGB string (with A element if appropriate) for this color
     *
     * @param {boolean} withAlpha - If true, include the alpha element in the returned string
     *
     * @returns {string} The appropriate color string
     *
     */
    toRgbString(with_alpha?: boolean): string;
    /**
     * hslString
     *
     * From the color object, creates a hue-saturation-lightness string
     *
     * @param 	withAlpha 	If true, also adds an alpha element to the end of the string
     *
     * @returns	The HSL string version of this color
     *
     */
    toHslString(with_alpha?: boolean): string;
    /**
     * hslaString
     *
     * From the color object, create a HSLA string
     *
     * @returns A string for the color
     *
     */
    toHslaString(): string;
    /**
     * hexString
     *
     * From the color object, creates a hex color string
     *
     * @param 	withAlpha	True if alpha should be added to the hex string
     *
     * @returns The appropriate hex string
     *
     */
    toHexString(with_alpha?: boolean): string;
    /**
     * generateHslValues
     *
     * Calculates the HSL values for this RGB color and saves it off in the color.
     * Relies on the rgb values already having been set
     *
     */
    generateHslValues(): void;
    /**
     * generateRgbValues
     *
     * Saves off the appropriate RGB values for this color based on its hex values.
     * Relies on the hex colors being set
     *
     */
    generateRgbValues(): void;
    /**
     * _parseFromHexColor
     *
     * Takes in a hex string and saves it internally
     *
     * @param 	hex		The hex string to parse in
     * @param 	alpha 	The alpha value to use
     *
     * @returns True if the parsing succeeds, false otherwise
     *
     */
    protected _parseFromHexColor(hex: string, alpha?: number): boolean;
    /**
     * _parseFromRgbColor
     *
     * Takes in a rgb color string and parses it into our internal format
     *
     * @param 	rgb   	The RGB string to parse
     * @param 	alpha	The alpha value to parse in, if the rgb string doesn't have it
     *
     * @returns True if the parsing succeeds, false otherwise
     *
     */
    protected _parseFromRgbColor(rgb: string, alpha?: number): boolean;
    /**
     * _parseFromHslColor
     *
     * Takes in a HSL string and converts it to the color object's internal format
     *
     * @param 	hsl 	The HSL string to convert. Can also be a HSLA string
     * @param 	alpha 	The alpha value to set, if it is not included in the HSLA string
     *
     * @returns True if the color was successfully parsed, false otherwise.
     *
     */
    protected _parseFromHslColor(hsl: string, alpha?: number): boolean;
    /**
     * _parseColorString
     *
     * Tries to parse a given string into an internal color object
     *
     * @param 	str 	The string to parse
     * @param 	alpha 	The alpha value to use, if not included in the string
     *
     * @returns True if the parsing succeeds, false otherwise
     *
     */
    protected _parseColorString(str: string, alpha?: number): boolean;
    /**
     * updateRgbValue
     *
     * Sets a color value based on the index of the color (ie, red = 0, green = 1)
     *
     * @param 	idx 	The index of the color we are saving
     * @param 	val 	The value that the color should be set to
     *
     */
    updateRgbValue(valueType: RGBEnum, val: number): void;
    /**
     * updateHslValue
     *
     * Sets a color value based on the index of the color (ie, hue = 1, saturation = 2...)
     *
     * @param 	idx 	The index of the color we are saving
     * @param 	val 	The value that the color should be set to
     *
     */
    updateHslValue(valueType: HSLPieceEnum, val: number): void;
    /**
     * getNextHue
     *
     * Grabs the next hue available for this color selector.
     * Can be used as a random color generator
     *
     * @param	firstRotate		The HSL pice that should be rotating first
     * @param 	withAlpha 		True if the alpha value should also be included in the output string
     *
     * @returns The hex color string for the new color
     *
     */
    getNextColor(firstRotate: HSLPieceEnum, withAlpha?: boolean): string;
    /**
     * getCurrentHue
     *
     * Grabs the current string for the color
     *
     * @param	withAlpha	True if the string should include the alpha value
     *
     * @returns The appropriate string for the color
     *
     */
    abstract getCurrentColor(withAlpha?: boolean): string;
    /**
     * rotateAppropriateHSLValue
     *
     * Calculates the next appropriate value for the HSL type, and
     *
     * @param 	idx		The type of HSL values we should rotate
     *
     * @returns	True if a full circle has been made for this particular index;
     * 			False otherwise
     *
     */
    rotateAppropriateHSLValue(idx: HSLPieceEnum): boolean;
    /**
     * rotateHue
     *
     * Rotates our current hue value a set amount
     *
     * @returns The new hue value for the color
     *
     */
    rotateHue(): number;
    /**
     * rotateSaturation
     *
     * Get the next saturation value for this color
     *
     * @returns	The next saturation value
     *
     */
    rotateSaturation(): number;
    /**
     * rotateLightness
     *
     * Get the next lightness value for this color
     *
     * @returns	The next lightness value
     *
     */
    rotateLightness(): number;
    /**
     * rotateHslValue
     *
     * Rotates a given HSL value by an appropriate interval to get a new color
     *
     * @param 	startVal	The value the HSL value started with
     * @param 	inc 		How much the HSL value should be incremented
     * @param 	modBy		What the mod of the HSL value should be
     * @param 	max			The maximum this HSL value can be
     * @param 	min			The minimum this HSL value can be
     *
     * @returns The newly rotate HSL value
     *
     */
    rotateHslValue(startVal: number, inc: number, modBy: number, max?: number, min?: number): number;
    /**
     * getApparentColor
     *
     * Calculates what the display color of this color would be without setting an alpha value.
     * Can calculate what the RGB value should be given a background color instead of RGBA
     *
     * @param 	backColor 	Either the color object or color string for the background color
     *
     * @returns True if we were successfully able to calculate the apparent color.
     *
     */
    getApparentColor(backColor: Color | string): boolean;
    /**
     * compare
     *
     * Finds how similar two colors are based on their HSL values
     * @param {Color} otherColor  - The color we are comparing to
     * @param multipliers - The multipliers we should use to calculate the diff
     * @returns An object containing the total diff calculation as well as the raw diff values
     *
     */
    compare(other_color: Color, multipliers: IColorMultipliers): IColorMultipliers;
    /**
     * averageIn
     *
     * Averages in another color into this one
     * @param   {Color}   other_color The other color to average in
     * @param   {boolean} no_merge    True if we should just return the averages instead of merging them in to this color
     * @returns {Color}               The resulting merged color
     *
     */
    averageIn(other_color: Color, no_merge: boolean): Color | {
        hue: number;
        saturation: number;
        lightness: number;
        alpha: number;
    };
    /**
     * equals
     *
     * Check if two colors are functionally equal
     *
     * @param 	other	The color to compare this to
     *
     * @returns	True if the colors have the same values
     *
     */
    equals(other: Color): boolean;
    /**
     * isDark
     *
     * Checks if this color object is more dark than light
     *
     * @returns True if the color is dark
     *
     */
    isDark(): boolean;
    /**
     * isLight
     *
     * Checks if this color object is more light than dark
     *
     * @returns True if the color is light
     *
     */
    isLight(): boolean;
    /**
     * getLightness
     *
     * Grabs the lightness value of this color
     *
     * @returns The value of this color's lightness
     *
     */
    getLightness(): number;
    /**
     * _calculateLuminance
     *
     * Determine the perceived luminosity of the color
     *
     */
    protected _calculateLuminance(): void;
}
/**
 * @class RGBColor
 * Creates a color based on RGB
 * @version 1.0
 *
 */
export declare class RGBColor extends Color {
    /**
     * Creates an RGB Color
     *
     * @param 	red 	Red value for the color
     * @param 	green 	Green value for the color
     * @param 	blue 	Blue value for the color
     * @param 	alpha 	If provided, the alpha value for the color
     *
     */
    constructor(red: number, green: number, blue: number, alpha?: number);
    /**
     * Creates an RGB Color
     *
     * @param 	rgbString 	RGB or RGBA string for the color
     * @param 	alpha 		If alpha isn't a part of the string, the alpha value
     *
     */
    constructor(rgbString: string, alpha?: number);
    /**
     * getCurrentHue
     *
     * Grabs the current RGB string for the color
     *
     * @param	withAlpha	True if the string should include the alpha value
     *
     * @returns The RGB string for the color
     *
     */
    getCurrentColor(withAlpha?: boolean): string;
}
/**
 * @class HSLColor
 * Creates a color based on HSL
 * @version 1.0
 *
 */
export declare class HSLColor extends Color {
    /**
     * Creates an HSL Color
     *
     * @param 	hue 			Hue to use for this color
     * @param 	saturation 		Saturation value to use for this color
     * @param 	lightness 		Lightness to use for this color
     * @param 	alpha 			If provided, alpha value for the color
     *
     */
    constructor(hue: number, saturation: number, lightness: number, alpha?: number);
    /**
     * Creates an HSL Color
     *
     * @param 	hslString 	The HSL or HSLA string to parse
     * @param 	alpha		If alpha isn't a part of the string, separate value for it
     *
     */
    constructor(hslString: string, alpha?: number);
    /**
     * getCurrentHue
     *
     * Grabs the current HSL string for the color
     *
     * @param	withAlpha	True if the string should include the alpha value
     *
     * @returns The HSL string for the color
     *
     */
    getCurrentColor(withAlpha?: boolean): string;
}
export declare class HexColor extends Color {
    /**
     * Creates a hex color
     *
     * @param 	hexString	The hex or hex-alpha string to base this color on
     * @param 	alpha		If not a part of the string, the alpha value to use
     * 						for this color
     *
     */
    constructor(hexString: string, alpha?: number);
    /**
     * getCurrentHue
     *
     * Grabs the current hex string for the color
     *
     * @param	withAlpha	True if the string should include the alpha value
     *
     * @returns The hex string for the color
     *
     */
    getCurrentColor(withAlpha?: boolean): string;
}
/**
 * @class AnyColor
 * Color class that can take in any color string
 * @version 1.0
 *
 */
export declare class AnyColor extends Color {
    /**
     * Creates a color
     *
     * @param	colorString		The string to create from
     * @param	alpha			If not included in the color string, the alpha
     * 							value to use for the color
     */
    constructor(colorString: string, alpha?: number);
    /**
     * getCurrentColor
     *
     * Grabs the current hex string for the color
     *
     * @param 	withAlpha	True if the string should contain the alpha value
     *
     * @returns	The hex string for the color
     *
     */
    getCurrentColor(withAlpha?: boolean): string;
}
