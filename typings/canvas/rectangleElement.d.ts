import { CanvasElement } from "./canvasElement";
import { ElementType } from "./_interfaces";
import { IBasicRect, IPoint } from "../maths/_interfaces";
/**----------------------------------------------------------------------------
 * @class   RectangleElement
 * ----------------------------------------------------------------------------
 * Create a rectangle on the canvas
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class RectangleElement extends CanvasElement {
    /** type of this element */
    protected _type: ElementType;
    get type(): ElementType;
    /** details about how this rectangle used to be displayed */
    protected _oldDimensions: IBasicRect;
    /** what border radius should be used (if any) for this rectangle */
    protected _borderRadius: number;
    set borderRadius(bRad: number);
    /** handle variations in scale between x & y when rounding rectangles */
    protected _displayBorderRadius: IPoint;
    /**
     *  create a rectangle element
     * @param   id          unique ID for the rectangle
     * @param   dimensions  the size of the rectangle (in canvas coordinates)
     *
     */
    constructor(id: string, dimensions: IBasicRect);
    /**
     * _onDraw
     *
     * actually draw the rectangle
     * @param   context     Context in which to draw this element
     *
     */
    protected _onDraw(context: CanvasRenderingContext2D): void;
    /**
     * _unroundedRect
     *
     * Draw a plain unrounded rectangle
     * @param   context     The context in which to render this element
     *
     */
    private _unroundedRect;
    /**
     * _roundedRect
     *
     * Draw a rectangle with rounded corners
     * @param   context     The context in which to draw this rectangle
     *
     */
    private _roundedRect;
    /**
     * updateDimensions
     *
     * Update our rectangle's dimensions
     * @param   canvasDimensions    The dimensions of the canvas as a whole
     *
     */
    updateDimensions(canvasDimensions: IBasicRect): void;
    /**
     * _cloneForEffect
     *
     * clone an element for an effect to be applied
     * @param   id  Unique identifier for the cloned element
     * @returns The cloned rectangle
     *
     */
    protected _cloneForEffect(id: string): RectangleElement;
}
