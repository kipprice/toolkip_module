import { _NamedClass } from '@toolkip/named-class';
import { IEquatable } from '@toolkip/comparable';
import { isNullOrUndefined } from '@toolkip/shared-types';
import { fullHexString, charAt, rest } from '@toolkip/primitive-helpers';
import { roundToPlace } from '@toolkip/maths';
import { BLUE_MULT, DARK_ADDEND, DARK_DIVISOR, DARK_POW, GREEN_MULT, HUE_INTERVAL, LIGHTNESS_LIMITS, LIGHT_DIVISOR, LIGHT_INTERVAL, LIGHT_THRESHOLD, RED_MULT, SATURATION_INTERVAL, SATURATION_LIMITS } from '../_constants';
import { HSLPieceEnum, RGBEnum } from '../_interfaces';

/**----------------------------------------------------------------------------
 * @class	_Color
 * ----------------------------------------------------------------------------
 * Helper functions for manipulating color strings
 * @author	Kip Price
 * @version	1.1.0
 * ----------------------------------------------------------------------------
 */
export abstract class _Color extends _NamedClass implements IEquatable {

	// ..................
	// #region PROPERTIES

	/** keep track of whether the color was parsed correctly */
	protected _parsedCorrectly: boolean;

	/** shared alpha property for the color */
	protected _alpha: number = 1;
	public set alpha(value: number) {
		value = Math.min(1, Math.max(0, value));
		this._alpha = value;
	}
	public get alpha() { return this._alpha; }

	//#region RGB PROPERTIES

	/** red value of RGB */
	protected _red: number;
	public set red(value: number) {
		value = Math.min(255, Math.max(0, Math.round(value)));
		this._red = value;
	}
	public get red() { return this._red; }

	/** green value of RGB */
	protected _green: number;
	public set green(value: number) {
		value = Math.min(255, Math.max(0, Math.round(value)));
		this._green = value;
	}
	public get green() { return this._green; }

	/** blue value of RGB */
	protected _blue: number;
	public set blue(value: number) {
		value = Math.min(255, Math.max(0, Math.round(value)));
		this._blue = value;
	}
	public get blue() { return this._blue; }

	//#endregion

	//#region HSL PROPERTIES

	/** current hue of HSL color */
	protected _hue: number;
	public set hue(value: number) {
		value = Math.min(360, Math.max(0, Math.round(value)));
		this._hue = value;
	}
	public get hue() { return this._hue; }

	/** current saturation value of HSL color */
	protected _saturation: number;
	public set saturation(value: number) {
		value = Math.min(100, Math.max(0, Math.round(value)));
		this._saturation = value;
	}
	public get saturation() { return this._saturation; }

	/** current lightness value of HSL color */
	protected _lightness: number;
	public set lightness(value: number) {
		value = Math.min(100, Math.max(0, Math.round(value)));
		this._lightness = value;
	}
	public get lightness() { return this._lightness; }

	//#endregion

	/** perceived luminance of the color */
	protected _luminance: number;
	public get luminance(): number {
		if (isNullOrUndefined(this._luminance)) { 
			this._luminance = roundToPlace(this._calculateLuminance(), 100); 
		}
		return this._luminance;
	}
	//#endregion
	// ..................

	// .....................
	// #region CONSTRUCTOR

	/**
	 * _Color
	 * ----------------------------------------------------------------------------
	 * Creates an object that can handle color conversions
	 */
	constructor() { super("Color"); };

	//#endregion
	// .....................
	
	// ...........................
	//#region CREATE COLOR STRINGS

	/**
	 * rgbaString
	 * ----------------------------------------------------------------------------
	 * Gets the appropriate RGBA string for this color
	 * @returns	RGBA string for the color
	 */
	public toRgbaString(): string { 
		return `rgba(${this._red}, ${this._green}, ${this._blue}, ${this._alpha})` 
	};

	/**
	 * rgbString
	 * ----------------------------------------------------------------------------
	 * Grabs the RGB string (with A element if appropriate) for this color
	 * @returns The appropriate color string
	 */
	public toRgbString(): string {
		return `rgb(${this._red}, ${this._green}, ${this._blue})`
	};

	/**
	 * hslString
	 * ----------------------------------------------------------------------------
	 * From the color object, creates a hue-saturation-lightness string
	 * @returns	The HSL string version of this color
	 */
	public toHslString(withAlpha?: boolean): string {
		return `hsl(${this._hue}, ${this._saturation}%, ${this._lightness}%)`
	}

	/**
	 * toHslaString
	 * ----------------------------------------------------------------------------
	 * From the color object, create a HSLA string
	 * @returns A string for the color
	 */
	public toHslaString(): string {
		return `hsla(${this._hue}, ${this._saturation}%, ${this._lightness}%, ${this._alpha})`
	};

	/**
	 * hexString
	 * ----------------------------------------------------------------------------
	 * From the color object, creates a hex color string
	 * @returns The appropriate hex string
	 */
	public toHexString(): string {
		const r = fullHexString(this._red, 2);
		const g = fullHexString(this._green, 2);
		const b = fullHexString(this._blue, 2);

		return `#${r}${g}${b}`;
	};

	/**
	 * toHexAlphaString
	 * ----------------------------------------------------------------------------
	 * From the color object, generate a hex string with alpha included
	 * @returns	The appropriate hex code with alpha
	 */
	public toHexAlphaString(): string {
		const r = fullHexString(this._red, 2);
		const g = fullHexString(this._green, 2);
		const b = fullHexString(this._blue, 2);
		const a = fullHexString(Math.round(this._alpha * 255), 2);

		return `#${r}${g}${b}${a}`
	}

	//#endregion
	// ...........................

	// ..........................................
	// #region GENERATE APPROPRIATE COLOR VALUES

	/**
	 * generateHslValues
	 * ----------------------------------------------------------------------------
	 * Calculates the HSL values for this RGB color and saves it off in the color.
	 * Relies on the rgb values already having been set
	 */
	public generateHslValues(): void {
		let hue: number;
		let saturation: number;
		let lightness: number;

		const r = this._red / 255;
		const g = this._green / 255;
		const b = this._blue / 255;

		// Find the max, min, and the difference between them.
		// We need these values to calculate HSL equivalents
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const delta = max - min;

		// Lightness is the average between the two extremes
		lightness = (max + min) / 2;

		// If the max and min are the same, all three are actually the same value,
		// so we can quit now with our grayscale color
		if (max === min) {
			this._hue = 0;
			this._saturation = 0;
			this._lightness = Math.round(lightness * 100);
			return;
		}

		// The saturation is a ratio of the delta of the extremes
		// over a version of the sum of the extremes.
		// It changes when lightness is less or more than 50%.
		if (lightness > .5) {
			saturation = delta / (2 - max - min);
		} else {
			saturation = delta / (max + min);
		}

		// The hue is calculated from the two non-max values
		// If two values match the max, then we just evaluate in order red -> green -> blue

		// ==> Red was the max.
		if (max === r) {
			hue = (g - b) / delta;

			// We need an additional kick if green is less than blue
			if (g < b) { hue += 6; }

		// ==> Green was the max
		} else if (max === g) {
			hue = (b - r) / delta + 2;

		// ==> Blue was the max
		} else {
			hue = (r - g) / delta + 4;
		}

		// Divide by six to get the appropriate average
		hue /= 6;

		// -- Save off the member variables for this color --
		//
		// All values are currently in the range [0,1].
		// Hue needs to be multiplied by 360 to get the appropriate value.
		// Saturation and lightness both need to be multiplied by 100.
		this._hue = roundToPlace(hue * 360, 10);
		this._saturation = roundToPlace(saturation * 100, 10)
		this._lightness = roundToPlace(lightness * 100, 10)
	};

	/**
	 * generateRgbValues
	 * ----------------------------------------------------------------------------
	 * Saves off the appropriate RGB values for this color based on its hex values.
	 * Relies on the hex colors being set
	 */
	public generateRgbValues(): void {

		const hue = this._hue / 360;
		const saturation = this._saturation / 100;
		const lightness = this._lightness / 100;

		// If there is not saturation, it's grayscale, so the colors are all equal to the lightness
		if (saturation === 0) {
			this._red = this._green = this._blue = lightness;
			this._red *= 255;
			this._green *= 255;
			this._blue *= 255;
		}

		//If we do have a saturated value, we need to convert it to RGB
		// Get the value of the q coefficient
		let q: number;
		if (lightness < 0.5) {
			q = lightness * (1 + saturation);
		} else {
			q = lightness + saturation - (lightness * saturation);
		}

		// And calculate p from q
		const p = (2 * lightness) - q;

		for (let i = -1; i <= 1; i += 1) {
			let t = hue + (-i / 3);

			// Check for the extremes and adjust them
			if (t < 0) {
				t += 1;
			} else if (t > 1) {
				t -= 1;
			}

			// Find the appropriate case to treat this value as
			if (t < (1 / 6)) {
				this.updateRgbValue(i + 1, (p + ((q - p) * 6 * t)) * 255);
			} else if (t < (1 / 2)) {
				this.updateRgbValue(i + 1, q * 255);
			} else if (t < (2 / 3)) {
				this.updateRgbValue(i + 1, (p + ((q - p) * (2 / 3 - t) * 6)) * 255);
			} else {
				this.updateRgbValue(i + 1, p * 255);
			}
		}
	};

	//#endregion
	// ..........................................

	// .......................................
	// #region PARSE DIFFERENT COLOR STRINGS
	
	/**
	 * _parseFromHexColor
	 * ----------------------------------------------------------------------------
	 * Takes in a hex string and saves it internally
	 *
	 * @param 	hex		The hex string to parse in
	 * @param 	alpha 	The alpha value to use
	 *
	 * @returns True if the parsing succeeds, false otherwise
	 */
	protected _parseFromHexColor(hex: string, alpha?: number): boolean {

		let col: number;
		let pc: string;
		
		const hex_reg = /^#?(?:[0-9A-Fa-f]{3,4}){1,2}$/;
		if (!hex_reg.test(hex)) { return false; }

		// Strip out the # character if it was there
		if (charAt(hex, 0) === "#") { hex = rest(hex, 1); }

		// determine whether we need to increment by one or two
		let inc = 2;
		if (hex.length < 6) {
			inc = 1;
		}

		// Flip through each of the possible columns
		let a_included: boolean = false;
		for (let idx = 0; idx < hex.length; idx += inc) {
			pc = hex.substr(idx, inc);

			if (inc === 1) {
				pc += pc;
			}

			// Parse out the color and set it appropriately
			col = parseInt(pc, 16);
			const valType = (idx / inc);
			if (valType === RGBEnum.ALPHA) {
				a_included = true;
				col = roundToPlace(col / 256, 100);
			}
			this.updateRgbValue((idx / inc), col);
		}

		// Set the alpha value if it wasn't included in the hex string
		if (!a_included) {
			this._alpha = alpha || 1;
		}

		return true;
	};

	/**
	 * _parseFromRgbColor
	 * ----------------------------------------------------------------------------
	 * Takes in a rgb color string and parses it into our internal format
	 *
	 * @param 	rgb   	The RGB string to parse
	 * @param 	alpha	The alpha value to parse in, if the rgb string doesn't have it
	 *
	 * @returns True if the parsing succeeds, false otherwise
	 */
	protected _parseFromRgbColor(rgb: string, alpha?: number): boolean {
	
		const rgb_reg = /rgb\((?:([0-9]{1-3}), ?){3}\)/;
		const rgba_reg = /rgba\((?:([0-9]{1-3}), ?){3}, ?([0-9]{0,1}(?:\.[0-9]+)?)\)/;

		let match: string[];
		if (!rgb_reg.test(rgb)) {
			if (!rgba_reg.test(rgb)) {
				return false;
			} else {
				match = rgba_reg.exec(rgb);
			}
		} else {
			match = rgb_reg.exec(rgb);
		}

		this._red = +match[1];
		this._green = +match[2];
		this._blue = +match[3];

		if ((match[4] !== undefined) || (alpha !== undefined)) {
			this._alpha = +match[4] || alpha;
		}

		return true;
	};

	/**
	 * _parseFromHslColor
	 * ----------------------------------------------------------------------------
	 * Takes in a HSL string and converts it to the color object's internal format
	 *
	 * @param 	hsl 	The HSL string to convert. Can also be a HSLA string
	 * @param 	alpha 	The alpha value to set, if it is not included in the HSLA string
	 *
	 * @returns True if the color was successfully parsed, false otherwise.
	 */
	protected _parseFromHslColor(hsl: string, alpha?: number): boolean {
		const hsl_reg = /hsl\(([0-9]{1,3}), ?([0-9]{1,3})%, ?([0-9]{1,3})%\)/;
		const hsla_reg = /hsla\(([0-9]{1,3}), ?([0-9]{1,3})%, ?([0-9]{1,3})%, ?([0-9]{0,1}(?:\.[0-9]+)?)\)/;

		// Quit if the regex doesn't match
		let match: string[];
		if (!hsl_reg.test(hsl)) {
			if (!hsla_reg.test(hsl)) {
				return false;
			} else {
				match = hsla_reg.exec(hsl);
			}
		} else {
			match = hsl_reg.exec(hsl);
		}

		// Save off the values parsed out of the string
		this._hue = roundToPlace(parseFloat(match[1]), 10)
		this._saturation = roundToPlace(parseFloat(match[2]), 10);
		this._lightness = roundToPlace(parseFloat(match[3]), 10)

		// Only set the alpha if something is available
		if ((match[4] !== undefined) || (alpha !== undefined)) {
			this._alpha = parseFloat(match[4]) || alpha;
		}

		// Make sure the RGB values are updated too
		this.generateRgbValues();

		return true;
	};

	/**
	 * _parseColorString
	 * ----------------------------------------------------------------------------
	 * Tries to parse a given string into an internal color object
	 *
	 * @param 	str 	The string to parse
	 * @param 	alpha 	The alpha value to use, if not included in the string
	 *
	 * @returns True if the parsing succeeds, false otherwise
	 * 
	 */
	protected _parseColorString(str: string, alpha?: number): boolean {
		
		let success: boolean;

		// Try to parse the string as a RGB value
		success = this._parseFromRgbColor(str, alpha);
		if (success) { return true; }

		// Try to parse the string as a Hex value
		success = this._parseFromHexColor(str, alpha);
		if (success) { return true; }

		// Try to parse the string as a HSL value
		success = this._parseFromHslColor(str, alpha);
		if (success) { return true; }

		// If nothing worked, return false
		return false;
	};

	//#endregion
	// .......................................

	// .....................
	// #region UPDATE COLORS

	/**
	 * getRgbValue
	 * ----------------------------------------------------------------------------
	 * Gets a color value based on the index of the color (ie, red = 0, green = 1)
	 * @param 	idx 	The index of the color we are saving
	 * @returns	The value in the specified RGB parameter
	 */
	public getRgbValue(valueType: RGBEnum) {
		switch (valueType) {
			case RGBEnum.RED:	return this.red;
			case RGBEnum.GREEN:	return this._green;
			case RGBEnum.BLUE:	return this._blue;
			case RGBEnum.ALPHA:	return this._alpha;
		}
	};

	/**
	 * updateRgbValue
	 * ----------------------------------------------------------------------------
	 * sets a specific piece of an RGB color
	 * @param	valueType	The piece to update
	 * @param	val			The value to update to
	 */
	public updateRgbValue(valueType: RGBEnum, val: number) {
		switch (valueType) {
			case RGBEnum.RED:	this.red = val; return;
			case RGBEnum.GREEN:	this.green = val; return;
			case RGBEnum.BLUE:	this.blue = val; return;
			case RGBEnum.ALPHA:	this.alpha = val; return;
		}
	}

	/**
	 * getHslValue
	 * ----------------------------------------------------------------------------
	 * Gets a color value based on the index of the color (ie, hue = 1, saturation = 2...)
	 * @param 	idx 	The index of the color we are saving
	 * @returns The value of the specified HSL parameter
	 */
	public getHslValue(valueType: HSLPieceEnum) {
		switch (valueType) {
			case HSLPieceEnum.HUE:			return this.hue;
			case HSLPieceEnum.SATURATION:	return this.saturation;
			case HSLPieceEnum.LIGHTNESS:	return this.lightness;
			case HSLPieceEnum.ALPHA:		return this.alpha;
		}
	}

	/**
	 * updateHslValue
	 * ----------------------------------------------------------------------------
	 * set a new value for a specific piece of HSL 
	 * @param	valueType	What piece of the HSL is changing
	 * @param	val			The value to update to
	 */
	public updateHslValue(valueType: HSLPieceEnum, val: number) {
		switch (valueType) {
			case HSLPieceEnum.HUE:			this.hue = val; return;
			case HSLPieceEnum.SATURATION:	this.saturation = val; return;
			case HSLPieceEnum.LIGHTNESS:	this.lightness = val; return;
			case HSLPieceEnum.ALPHA:		this.alpha = val; return;
		}
	}

	//#endregion
	// .....................

	// .............................................
	// #region GET CURRENT HUE

	/**
	 * getCurrentHue
	 * ----------------------------------------------------------------------------
	 * Grabs the current string for the color
	 * @param	withAlpha	True if the string should include the alpha value
	 * @returns The appropriate string for the color
	 */
	public abstract getCurrentColor(withAlpha?: boolean): string;

	//#endregion
	// .............................................

	// ....................................
	// #region COMPARISON

	/**
	 * equals
	 * ----------------------------------------------------------------------------
	 * Check if two colors are functionally equal
	 * @param 	other	The color to compare this to
	 * @returns	True if the colors have the same values
	 */
	public equals(other: _Color): boolean {
		return (this.toHexAlphaString() === other.toHexAlphaString());
	}

	/**
	 * clone
	 * ----------------------------------------------------------------------------
	 * create a copy of this color object
	 */
	public clone(): _Color {
		return new (this.constructor as any)(this.getCurrentColor());
	}

	//#endregion
	// ....................................
	
	// .................................
	// #region LIGHT AND DARK DETECTION

	/**
	 * isDark
	 * ----------------------------------------------------------------------------
	 * Checks if this color object is more dark than light
	 * @returns True if the color is dark
	 */
	public isDark(): boolean {
		return (this.luminance <= 50);
	};

	/**
	 * isLight
	 * ----------------------------------------------------------------------------
	 * Checks if this color object is more light than dark
	 * @returns True if the color is light
	 */
	public isLight(): boolean {
		return (this.luminance > 50);
	};

	/**
	 * getLightness
	 * ----------------------------------------------------------------------------
	 * Grabs the lightness value of this color
	 * @returns The value of this color's lightness
	 */
	public getLightness(): number {
		if (!this._hue) { this.generateHslValues(); }
		return this._lightness;
	}

	/**
	 * _calculateLuminance
	 * ----------------------------------------------------------------------------
	 * Determine the perceived luminosity of the color
	 */
	protected _calculateLuminance(): number {
		const colors = [this.red, this.green, this.blue];

		const adjustedColors = colors.map((c) => {
			const percentage = c / 255;
			return (
				percentage < LIGHT_THRESHOLD ?
				percentage / LIGHT_DIVISOR :
				Math.pow((percentage + DARK_ADDEND) / DARK_DIVISOR, DARK_POW)
			); 
		})
	
		return ((adjustedColors[0] * RED_MULT) + (adjustedColors[1] * GREEN_MULT) + (adjustedColors[2] * BLUE_MULT)) * 100;
	}
	//#endregion
	// .................................
}
