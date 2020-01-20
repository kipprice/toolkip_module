import { CanvasElement } from "./canvasElement";
import { ElementType } from "./_interfaces";
import { HTML5Canvas } from "./canvas";
import { IPoint } from "../maths/_interfaces";
/**----------------------------------------------------------------------------
 * @class	TextElement
 * ----------------------------------------------------------------------------
 * Draw text on a canvas
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class TextElement extends CanvasElement {
    /** what type of element this is */
    protected _type: ElementType;
    get type(): ElementType;
    /** the text to display in this element */
    private _text;
    set text(txt: string);
    /** tracks whether this text should be considered fixed as opposed to scalable */
    private _fixed;
    set fixed(fixed: boolean);
    /**
     * _setCanvas
     *
     * handle the canvas being assigned to this element
     * @param	canvas	The
     *
     */
    protected _setCanvas(canvas: HTML5Canvas): void;
    /**
     * create the text element
     * @param	id		Unique identifier for the element
     * @param	text	The text to display for the element
     * @param	point	The top-left point for the text
     *
     */
    constructor(id: string, text: string, point: IPoint);
    /**
     * _addStyleChangeListener
     *
     * Handle when the style changes for this element
     *
     */
    private _addStyleChangeListener;
    /**
     * _calculateTextMetrics
     *
     * determine how big the text should be
     *
     */
    private _calculateTextMetrics;
    /**
     * _onDraw
     *
     * draw the text element on the canvas
     * @param	context		The canvas upon which to render
     *
     */
    protected _onDraw(context: CanvasRenderingContext2D): void;
    /**
     * _cloneForEffect
     *
     * clone a text effect
     * @param	id	The identifier to use for the cloned element
     * @returns	The cloned text element
     *
     */
    protected _cloneForEffect(id: string): TextElement;
}
