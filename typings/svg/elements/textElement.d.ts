import { SVGElem } from './svgElement';
import { IPoint } from '../../maths/_interfaces';
import { SVGStyle } from '../svgStyle';
import { IStandardStyles } from '../../styleHelpers/_interfaces';
import { ISVGAttributes } from '../_interfaces';
/**----------------------------------------------------------------------------
 * @class	TextElement
 * ----------------------------------------------------------------------------
 * render text on the SVG canvas
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class TextElement extends SVGElem {
    protected _text: string;
    protected _originPt: IPoint;
    get style(): SVGStyle;
    protected static _uncoloredStyles: IStandardStyles;
    constructor(text: string, point: IPoint, originPt: IPoint, attr: ISVGAttributes);
    protected _setAttributes(attr: ISVGAttributes, text: string, point: IPoint, originPt: IPoint): ISVGAttributes;
    protected _createElements(attr: ISVGAttributes): void;
    protected _handleOriginPoint(attr: ISVGAttributes): void;
    protected _updateExtremaAndNotifyListeners(attr: ISVGAttributes): void;
    protected _updateExtrema(attr: ISVGAttributes): void;
}
