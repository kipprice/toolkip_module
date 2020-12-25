import { IDictionary } from '../../../objectHelpers/typings/_interfaces';
import { Color, HSLColor, _Color } from '../colors';
import { HSLPieceEnum } from '../_interfaces';
import { getNextColor } from './rotate';

/**----------------------------------------------------------------------------
 * @class	GlobalColor
 * ----------------------------------------------------------------------------
 * handle the global description of colors
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _GlobalColor {

    protected _usedColors: IDictionary<_Color>;
    protected _startColor: _Color;
    protected _innerColor: _Color;

    constructor() {
        this._usedColors = {};
        this._innerColor = new HSLColor("hsl(330, 80%, 50%)");
        this._startColor = this._innerColor.clone();
    }

    public generateColor(id: string, firstRotate?: HSLPieceEnum): _Color {
        let out: _Color = this._usedColors[id];
    
        // Grab the next available color
        if (!out) {
            out = getNextColor(this._innerColor, this._startColor, firstRotate || HSLPieceEnum.HUE);
            this._innerColor = out.clone(); 
        }
    
        // If we received an identifier, use it
        if (id) { this._usedColors[id] = out; }
    
        return out;
    };

    public getCurrentColor() { return this._innerColor.getCurrentColor(); }
}

export const GlobalColor = new _GlobalColor();

/**
 * getComplementaryColor
 * ----------------------------------------------------------------------------
 * Find a color that works well with the color passed in
 * 
 * @param 	color		The color to find a complement for 
 * @param 	cutoff 		How different the lightnesses of the colors need to be
 * 
 * @returns	The color string for the appropriate complementary color
 */
export function getComplementaryColor(color: string, cutoff: number = 45): string {

	// Grab the appropriate color
	let col = new Color(color);

	// Grab the current lightness value
	const lightness = col.getLightness();

	if (lightness < cutoff) {
		col.lightness = 95;
	} else {
		col.lightness = 5;
	}
	col.generateRgbValues();

    return col.toRgbaString();
}