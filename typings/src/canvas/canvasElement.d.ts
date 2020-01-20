import { IDrawableElements } from "../drawable/_interfaces";
import { ElementType, ICanvasElementTransform, CanvasEventHandler, EventTypeEnum } from "./_interfaces";
import { HTML5Canvas } from "./canvas";
import { CanvasGroup } from "./canvasGroup";
import { CanvasElementStyle } from "./canvasStyle";
import { IBasicRect, IPoint } from "../maths/interface";
/**----------------------------------------------------------------------------
 * @class CanvasElement
 * ----------------------------------------------------------------------------
 * create a canvas element
 * @version 1.1
 * @author	Kip Price
 * ----------------------------------------------------------------------------
 */
export declare abstract class CanvasElement {
    /** unique ID for this particular element */
    protected _id: string;
    get id(): string;
    /** determines whether this is an effect element */
    protected _isEffect: boolean;
    /** keep track of elements for thsi Drawable */
    protected _elems: IDrawableElements;
    /** keep track of the type of element */
    abstract get type(): ElementType;
    protected _type: ElementType;
    /** Track the canvas for ease of grabbing global stats */
    protected _canvas: HTML5Canvas;
    set canvas(canvas: HTML5Canvas);
    /** Every element will have a direct CanvasGroup as a parent (except for the top level CanvasGroup) */
    protected _parent: CanvasGroup;
    set parent(grp: CanvasGroup);
    /** style for the element */
    protected _style: CanvasElementStyle;
    get style(): CanvasElementStyle;
    set style(s: CanvasElementStyle);
    /** how this element will transform */
    protected _transformDetails: ICanvasElementTransform;
    /** layer at which the element should appear. Defaults to 1 */
    protected _layer: number;
    get layer(): number;
    set layer(layer: number);
    /** determines whether this element is off-screen */
    protected _isOffScreen: boolean;
    get isOffScreen(): boolean;
    /** real dimensions for the element */
    protected _dimensions: IBasicRect;
    get dimensions(): IBasicRect;
    set dimensions(dim: IBasicRect);
    /** where the element should current display */
    protected _displayDimensions: IBasicRect;
    get displayDimensions(): IBasicRect;
    /** where the element was previously positioned */
    protected _oldDimensions: IBasicRect;
    /** detect whether the element has been drawn*/
    protected _isDrawn: boolean;
    /** determines if this element is the target of a hover */
    protected _isHoverTarget: boolean;
    get isHoverTarget(): boolean;
    set isHoverTarget(value: boolean);
    /** listeners for events */
    protected _eventFunctions: CanvasEventHandler[][];
    /** handle hiding elements */
    protected _isHidden: boolean;
    get isHidden(): boolean;
    /**
     * create a canvas element
     *
     * @param	id			The unique ID for this
     * @param 	isEffect 	If true, treats this element as an effect
     *
     */
    constructor(id: string, isEffect?: boolean);
    /**
     * _initializeRects
     *
     * create the initial display rectangle
     *
     */
    protected _initializeRects(): void;
    /**
     * _applyStyle
     *
     * update the context to use this element's style
     *
     * @param	context		The Canvas context to draw on
     *
     */
    protected _applyStyle(context: CanvasRenderingContext2D): void;
    /**
     * _restoreStyle
     *
     * set the context style back to what it originally was
     *
     * @param	context
     *
     */
    protected _restoreStyle(context: CanvasRenderingContext2D): void;
    /**
     * transform
     *
     * handle a temporary transform for the element
     *
     * @param 	transformDetails
     *
     */
    transform(transformDetails: ICanvasElementTransform): void;
    /**
     * _cloneForEffect
     *
     * abstract method to get a new cloned element
     *
     * @param	id
     *
     * @returns
     *
     */
    protected abstract _cloneForEffect(id: string): CanvasElement;
    /**
     * _cloneStyle
     *
     * copy style from one elem for use in another
     *
     * @returns
     *
     */
    private _cloneStyle;
    /**
     * _scale
     *
     * standard scale algorithm
     * @param	scaleAmt
     *
     * */
    protected _scale(scaleAmt: number): void;
    /**
     * updateDimensions
     *
     * update the internal dimensions of the element
     * @param	canvasDimensions
     *
     */
    updateDimensions(canvasDimensions: IBasicRect): void;
    /**
     * adjustDimensions
     *
     * shift the dimensions of the element based on the reference point
     * @param	adjustPt
     *
     * */
    adjustDimensions(adjustPt: IPoint): void;
    /**
     * draw
     *
     * abstract method that each child element will implement
     *
     */
    draw(): void;
    /**
     * _onDraw
     *
     * Abstract function that will be implemented by each of the children of this class
     * @param	context
     *
     */
    protected abstract _onDraw(context: CanvasRenderingContext2D): void;
    /**
     * _setIsOffScreen
     *
     * determine whether this element is off screen
     * @param	canvasDimensions
     *
     * */
    protected _setIsOffScreen(canvasDimensions: IBasicRect): void;
    /**
     * _setDimensions
     *
     * allow outsiders to update the internal set of dimensions for this element
     * @param	dim
     *
     */
    protected _setDimensions(dim: IBasicRect): void;
    /**
     * _setCanvas
     *
     * Set our internal canvas
     * @param canvas
     *
     */
    protected _setCanvas(canvas: HTML5Canvas): void;
    /** collect event listeners */
    addEventListener(eventType: EventTypeEnum, eventFunc: CanvasEventHandler): void;
    /** handle click events */
    click(pt: IPoint, e: MouseEvent): void;
    /** handle double clicks */
    doubleClick(pt: IPoint, e: MouseEvent): void;
    /** handle the right click */
    rightClick(pt: IPoint, e: MouseEvent): void;
    /** handle when the mouse enters the element */
    hover(pt: IPoint, e: MouseEvent): void;
    /** handle when the mouse leaves the element */
    leave(pt: IPoint, e: MouseEvent): void;
    /** handle the keypress event */
    keyPress(pt: IPoint, e: KeyboardEvent): void;
    /** handle the focus event */
    focus(pt: IPoint, e: Event): void;
    /** handle the blur event */
    blur(pt: IPoint, e: Event): void;
    /**
     * handleEvent
     *
     * generic handler for all events
     *
     */
    handleEvent(eventType: EventTypeEnum, pt: IPoint, e: Event): void;
    /**
     * swapVisibilty
     *
     * Change whether this element is hidden or shown
     *
     */
    swapVisibility(): void;
    /**
     * hide
     *
     * Hide this element
     *
     */
    hide(): void;
    /**
     * show
     *
     * Show this element if it was hidden
     *
     */
    show(): void;
    /**
     * _debugDimensions
     *
     * display dimensions for debugging purposes
     *
     */
    protected _debugDimensions(): void;
    /**
     * debugDimensions
     *
     * public function for debugging purposes
     *
     */
    debugDimensions(): void;
}
