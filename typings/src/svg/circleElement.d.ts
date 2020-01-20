import { SVGElem } from "./svgElement";
import { ICircleSVGAttributes, ISVGAttributes } from "./_interfaces";
import { IPoint } from "../maths/interface";
/**----------------------------------------------------------------------------
 * @class   CircleElement
 * ----------------------------------------------------------------------------
 * @version 1.0
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
export declare class CircleElement extends SVGElem {
    /** keep track of attributes for this circle */
    protected _attributes: ICircleSVGAttributes;
    constructor(center: IPoint, radius: number, attributes: ISVGAttributes);
    protected _setAttributes(attributes: ISVGAttributes, center: IPoint, radius: number): ISVGAttributes;
    protected _updateExtrema(attributes: ISVGAttributes): void;
    /**
     * _extremaFromCenterPointAndRadius
     *
     * helper function to calculate extrema from a central point and radius
     *
     */
    private _extremaFromCenterPointAndRadius;
}
