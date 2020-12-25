import { _Color } from './_color';

/**----------------------------------------------------------------------------
 * @class	HSLColor
 * ----------------------------------------------------------------------------
 * Color class that deals specifically with HSL formatting
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class HSLColor extends _Color {

	/**
	 * Creates an HSL Color
	 * ----------------------------------------------------------------------------
	 * @param 	hue 			Hue to use for this color
	 * @param 	saturation 		Saturation value to use for this color
	 * @param 	lightness 		Lightness to use for this color
	 * @param 	alpha 			If provided, alpha value for the color
	 */
	constructor(hue: number, saturation: number, lightness: number, alpha?: number);

	/**
	 * Creates an HSL Color
	 * ----------------------------------------------------------------------------
	 * @param 	hslString 	The HSL or HSLA string to parse
	 * @param 	alpha		If alpha isn't a part of the string, separate value for it 
	 */
	constructor(hslString: string, alpha?: number);

	/** Creates an HSL Color */
	constructor(hueOrHslString: string | number, saturationOrAlpha?: number, lightness?: number, alpha?: number) {
		super();

		// parse the color string if passed in
		if (typeof hueOrHslString === "string") {
			this._parsedCorrectly = this._parseFromHslColor(hueOrHslString, saturationOrAlpha);

			// use the numeric values
		} else {
			this.hue = hueOrHslString;
			this.saturation = saturationOrAlpha;
			this.lightness = lightness;
			this.alpha = alpha;
			this._parsedCorrectly = true;
		}
	}

	/**
	 * getCurrentHue
	 * ----------------------------------------------------------------------------
	 * Grabs the current HSL string for the color
	 * @param	withAlpha	True if the string should include the alpha value
	 * @returns The HSL string for the color
	 */
	public getCurrentColor(withAlpha?: boolean): string {
		return (withAlpha ? this.toHslaString() : this.toHslString()) ;
	}
}