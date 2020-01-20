import { IDictionary } from './../objectHelpers/_interfaces';
import { Color } from './color';
import { HSLPieceEnum } from './_interfaces';
/**----------------------------------------------------------------------------
 * @class	GlobalColor
 * ----------------------------------------------------------------------------
 * handle the global description of colors
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
declare class _GlobalColor {
    protected _usedColors: IDictionary<string>;
    protected _innerColor: Color;
    constructor();
    generateColor(id: string, firstRotate?: HSLPieceEnum): Color;
    getCurrentColor(): Color;
}
export declare const GlobalColor: _GlobalColor;
export {};
