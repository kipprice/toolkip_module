import { IDictionary } from '@kipprice/toolkip-object-helpers';
import { _Color, HexColor, HSLColor } from './color';
import { HSLPieceEnum } from './_interfaces';


/**----------------------------------------------------------------------------
 * @class	GlobalColor
 * ----------------------------------------------------------------------------
 * handle the global description of colors
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _GlobalColor {
    protected _usedColors: IDictionary<string>;
    protected _innerColor: _Color;

    constructor() {
        this._usedColors = {};
        this._innerColor = new HSLColor("hsl(330, 80%, 50%)");
    }

    public generateColor(id: string, firstRotate?: HSLPieceEnum): _Color {
        
        let colorStr: string = this._usedColors[id] || "";
    
        // Grab the next available color
        if (!colorStr) {
            colorStr = this._innerColor.getNextColor(firstRotate || HSLPieceEnum.HUE);
        }
        let color = new HexColor(colorStr);
    
        // If we received an identifier, use it
        if (id) { this._usedColors[id] = colorStr; }
    
        return color;
    };

    public getCurrentColor() {
        return this._innerColor;
    }
}

export const GlobalColor = new _GlobalColor();