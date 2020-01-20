import { SVGElem } from "./svgElement";
import { IRectSVGAttributes } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class   RectangleElement
 * ----------------------------------------------------------------------------
 * Draw a rectangle on the SVG element
 * @version 1.0
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
export declare class RectangleElement extends SVGElem {
    protected _attributes: IRectSVGAttributes;
    /**
     * Create a rectangle element
     * @param   x           The horizontal position of the rectangle
     * @param   y           The vertical position of the rectangle
     * @param   width       The width of the rectangle
     * @param   height      The height of the rectangle
     * @param   attributes  Attributes to start with
     *
     */
    constructor(x: number, y: number, width: number, height: number, attributes: IRectSVGAttributes);
    /**
     * _setAttributes
     *
     * Set the appropriate attributes for this element
     *
     * @param   attributes  Initial set of attributes
     * @param   x           The horizontal coordinate
     * @param   y           The vertical coordinate
     * @param   width       The width of the rectangle
     * @param   height      The height of the rectangle
     *
     * @returns The updated attributes
     *
     */
    protected _setAttributes(attributes: IRectSVGAttributes, x: number, y: number, width: number, height: number): IRectSVGAttributes;
    protected _updateExtrema(attributes: IRectSVGAttributes): void;
    /**
     * _basicRectToExtrema
     *
     * helper function to turn a basic rect to extrema
     * @param	rect	Rect to convert
     * @returns	The extrema that correspond with the rect
     *
     */
    private _basicRectToExtrema;
    /**
     * _checkBasicRectForBadData
     *
     * helper function to check that a rectangle is actually renderable
     * @param	rect	Determine if a rectangle is renderable
     *
     */
    private _checkBasicRectForBadData;
}
