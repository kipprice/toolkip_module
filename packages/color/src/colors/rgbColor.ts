import { _Color } from './_color';

/**----------------------------------------------------------------------------
 * @class	RGBColor
 * ----------------------------------------------------------------------------
 * Creates a color designed to manipulate specifically RGB colors
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class RGBColor extends _Color {


	/**
	 * Creates an RGB Color
	 * ----------------------------------------------------------------------------
	 * @param 	red 	Red value for the color
	 * @param 	green 	Green value for the color
	 * @param 	blue 	Blue value for the color
	 * @param 	alpha 	If provided, the alpha value for the color
	 */
	constructor(red: number, green: number, blue: number, alpha?: number);

	/**
	 * Creates an RGB Color
	 * ----------------------------------------------------------------------------
	 * @param 	rgbString 	RGB or RGBA string for the color
	 * @param 	alpha 		If alpha isn't a part of the string, the alpha value
	 */
	constructor(rgbString: string, alpha?: number);

	/** Creates an RGB Color */
	constructor(redOrRgbString: string | number, greenOrAlpha?: number, blue?: number, alpha?: number) {
		super();

		// Parse the string if it was passed in
		if (typeof redOrRgbString === "string") {
			this._parsedCorrectly = this._parseFromRgbColor(redOrRgbString, greenOrAlpha);

			// Otherwise, use the numeric values
		} else {
			this.red = redOrRgbString;
			this.green = greenOrAlpha;
			this.blue = blue;
			this.alpha = alpha;
			this._parsedCorrectly = true;
		}
	}

	/**
	 * getCurrentHue
	 * ----------------------------------------------------------------------------
	 * Grabs the current RGB string for the color
	 * @param	withAlpha	True if the string should include the alpha value
	 * @returns The RGB string for the color
	 */
	public getCurrentColor(withAlpha?: boolean): string {
		return (withAlpha ? this.toRgbaString() : this.toRgbString());
	}

}