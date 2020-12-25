import { _Color } from './_color';

/**----------------------------------------------------------------------------
 * @class	HexColor
 * ----------------------------------------------------------------------------
 * manipulates soecifically a hex color
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class HexColor extends _Color {

	/**
	 * Creates a hex color
	 * ----------------------------------------------------------------------------
	 * @param 	hexString	The hex or hex-alpha string to base this color on 
	 * @param 	alpha		If not a part of the string, the alpha value to use 
	 * 						for this color
	 */
	constructor(hexString: string, alpha?: number) {
		super();
		this._parsedCorrectly = this._parseFromHexColor(hexString);
	}

	/**
	 * getCurrentHue
	 * ----------------------------------------------------------------------------
	 * Grabs the current hex string for the color
	 * @param	withAlpha	True if the string should include the alpha value
	 * @returns The hex string for the color
	 */
	public getCurrentColor(withAlpha?: boolean): string {
		return (withAlpha ? this.toHexAlphaString() : this.toHexString())
	}
}