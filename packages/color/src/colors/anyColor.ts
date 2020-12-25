import { _Color } from './_color';

/**----------------------------------------------------------------------------
 * @class	Color
 * ----------------------------------------------------------------------------
 * generic class for any type of color formatting
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class Color extends _Color {

	/**
	 * Creates a color
	 * ----------------------------------------------------------------------------
	 * @param	colorString		The string to create from
	 * @param	alpha			If not included in the color string, the alpha 
	 * 							value to use for the color
	 */
	constructor(colorString: string, alpha?: number) {
		super();
		this._parsedCorrectly = this._parseColorString(colorString, alpha);
	}

	/**
	 * getCurrentColor
	 * ----------------------------------------------------------------------------
	 * Grabs the current hex string for the color
	 * @param 	withAlpha	True if the string should contain the alpha value
	 * @returns	The hex string for the color
	 */
	public getCurrentColor(withAlpha?: boolean): string {
        return (withAlpha ? this.toHexAlphaString() : this.toHexString())
	}
}