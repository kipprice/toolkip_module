import { Drawable } from "../drawable/drawable";
import { IBasicRect, IPoint } from "../maths/_interfaces";
import { IHTML5CanvasOptions, IHTML5CanvasElems } from "./_interfaces";
import { CanvasGroup } from "./canvasGroup";
import { CanvasElement } from "./canvasElement";
/**----------------------------------------------------------------------------
 * @class HTML5Canvas
 * ----------------------------------------------------------------------------
 * class that represents a set of tools around the HTML5 canvas
 * @author	Kip Price
 * @version 1.1
 * ----------------------------------------------------------------------------
 */
export declare class HTML5Canvas extends Drawable {
    /** unique ID for the canvas */
    protected _id: string;
    /** all points that are represented in the canvas */
    private _absoluteDimensions;
    /** The current visible portion of the canvas */
    protected _relativeView: IBasicRect;
    get relativeView(): IBasicRect;
    /** any options to configure this canvas */
    protected _options: IHTML5CanvasOptions;
    /** how much the canvas is currently zoomed */
    protected _zoomFactor: IPoint;
    get zoomFactor(): IPoint;
    set zoomFactor(zoom: IPoint);
    /** tracking points for determining how much to move the canvas */
    private _startDragPoint;
    private _deltaDragPoint;
    /** determine if there is something we need to redraw */
    protected _needsRedraw: boolean;
    get needsRedraw(): boolean;
    set needsRedraw(value: boolean);
    /** elements for the canvas */
    protected _elems: IHTML5CanvasElems;
    /** public getter for canvas element */
    get canvas(): HTMLCanvasElement;
    /** public getter for effects canvas */
    get effectCanvas(): HTMLCanvasElement;
    /** rendering context for the canvas */
    protected _context: CanvasRenderingContext2D;
    get context(): CanvasRenderingContext2D;
    /** rendering context for the effects canvas */
    protected _effectContext: CanvasRenderingContext2D;
    get effectContext(): CanvasRenderingContext2D;
    /** create groups for each of the layers we need */
    protected _layers: CanvasGroup[];
    get layers(): CanvasGroup[];
    /** overridable function for what should happen when the canvas is in the process of rendering */
    protected _onPreRender: Function;
    set onPreRender(preRender: Function);
    /** internal variable to track whether this canvas has found iniital dimensions yet */
    private _needsInitialDimensions;
    /**
     * Create a HTML5 canvas element
     *
     * @param	id			Unqiue ID to use for the canvas
     * @param	options		Options to create the canvas with
     *
     */
    constructor(id?: string, options?: IHTML5CanvasOptions);
    /**
     * _reconcileOptions
     *
     * pull in default options
     *
     * @param	userOptions		The options to reconcile
     *
     */
    protected _reconcileOptions(userOptions: IHTML5CanvasOptions): void;
    /**
     * _createDefaultOptions
     *
     * set our default options
     *
     * @returns	The set of default options for canvases
     *
     */
    protected _createDefaultOptions(): IHTML5CanvasOptions;
    /**
     * _initializeRectangles
     *
     * create the rectangles that the canvas needs to care about
     *
     */
    protected _initializeRectangles(): void;
    /**
     * _shouldSkipCreateElements
     *
     * Don't let the constructor create elements
     *
     */
    protected _shouldSkipCreateElements(): boolean;
    /**
     * _createElements
     *
     * create the canvas element
     *
     */
    protected _createElements(): void;
    /**
     * _createCanvas
     *
     * create an actual canvas element and assigns it to our element
     *
     * @param 	isForEffects 	If true, creates an effect canvas instead
     *
     * @returns	The canvas that is created
     *
     */
    protected _createCanvas(isForEffects?: boolean): HTMLCanvasElement;
    /**
     * draw
     *
     * draws the canvas element
     *
     * @param	parent	The parent element to draw on
     *
     */
    draw(parent?: HTMLElement): void;
    /**
     * clear
     *
     * clear the canvases
     *
     */
    clear(): void;
    /**
     * _drawEachElement
     *
     * loop through every element in the canvas
     *
     */
    private _drawEachElement;
    /**
     * _renderFrame
     *
     * make sure we actually draw something
     *
     */
    protected _renderFrame(): void;
    /**
     * addElement
     *
     * add an element to the canvas
     *
     * @param	elem	The element to add to the canvas
     *
     */
    addElement(elem: CanvasElement): void;
    /**
     * removeElement
     *
     * remove an element from our internal collection
     *
     * @param	id		The id of the element to remove
     *
     * @returns	True if the element was removed
     *
     */
    removeElement(id: string): boolean;
    /**
     * _updateAbsoluteDimensionsFromElem
     *
     * Update how big the canvas is based on the elements that exist on the canvas
     *
     * @param	addedDimensions		The dimensions of the element we are adding
     *
     */
    private _updateAbsoluteDimensionsFromElem;
    /**
     * _getOrCreateLayer
     *
     * find the existing layer or create it if it doesn't exist
     *
     * @param	layerIdx	The index of the layer
     *
     * @returns	The group for the layer
     *
     */
    protected _getOrCreateLayer(layerIdx: number): CanvasGroup;
    /**
     * _onMouseWheel
     *
     * handle the mousewheel event
     *
     * @param	event	The actual event triggered by the mousewheel
     *
     */
    private _onMouseWheel;
    /**
     * zoom
     *
     * actually zoom the canvas an appropriate amount
     *
     * @param	delta	The amount to zoom by
     *
     */
    zoom(delta: number): void;
    /**
     * changeView
     *
     * update the view being displayed on the canvas
     *
     * @param	newDisplay	The dimensions of the new view
     *
     */
    changeView(newDisplay: IBasicRect): void;
    /**
     * _onDrag
     *
     * move the canvas around via a mouse drag
     *
     * @param	delta	The amount the mouse has dragged
     *
     */
    private _onDrag;
    /**
     * _calculateNewCornerFromDelta
     *
     * take zoom into account when calculating the new corner of the canvas
     *
     * @param	delta	The amount that has been dragged
     *
     * @returns	The new corner for the canvas
     *
     */
    private _calculateNewCornerFromDelta;
    /**
     * pan
     *
     * handle a pan event
     *
     * @param	cornerPoint		The new corner for the canvas
     *
     */
    pan(cornerPoint: IPoint): void;
    /**
     * _addEventListeners
     *
     * add all event listeners for the canvas itself
     *
     */
    private _addEventListeners;
    /**
     * _onClick
     *
     * handle clicks on the canvas
     *
     * @param	e		The event itself of the mouse click
     * @param	point	The point that was clicked
     *
     */
    private _onClick;
    /**
     * _onHover
     *
     * handle hovering over elements on the canvas
     *
     * @param	e		The actual mouseover event
     * @param	point	The point that's being hovered over
     *
     */
    private _onHover;
    /**
     * _handleEvent
     *
     * handle a general event
     *
     * @param	eventType	The type of event being handled
     * @param	point		The point this event applies to
     * @param	e			The actual event data
     *
     */
    private _handleEvent;
    /**
     * convertRelativePointToAbsolutePoint
     *
     * convert a point from our relative canvas frame (e.g. visible frame) and
     * the physical space
     *
     * @param	relativePt	The point to convert
     *
     * @returns	The converted point
     *
     */
    convertRelativePointToPhysicalPoint(relativePt: IPoint): IPoint;
    /**
     * convertPhysicalPointToRelativePoint
     *
     * convert a physical point to one within the visible canvas frame
     *
     * @param	physicalPt	The point to convert
     *
     * @returns	The converted relative point
     *
     */
    convertPhysicalPointToRelativePoint(physicalPt: IPoint): IPoint;
    /**
     * convertAbsolutePointToRelativePoint
     *
     * convert a point from absolute position to a visible point
     *
     */
    convertAbsolutePointToRelativePoint(absolutePt: IPoint): IPoint;
    /**
     * convertRelativePointToAbsolutePoint
     *
     * convert a point from a visible point to an absolute point
     *
     * @param	relativePt	The point in relative dimensions
     *
     * @returns	THe converted absolute point
     *
     */
    convertRelativePointToAbsolutePoint(relativePt: IPoint): IPoint;
    /**
     * convertAbsoluteRectToRelativeRect
     *
     * Turn a set of absolute dimensions to their relative counterpart
     *
     * @param 	absoluteRect 	The absolute rect to convert to relative dimensions
     *
     * @returns	The converted rectangle
     *
     */
    convertAbsoluteRectToRelativeRect(absoluteRect: IBasicRect): IBasicRect;
    /**
     * debugRelativeDimensions
     *
     * debug the current view of the canvas
     *
     */
    debugRelativeDimensions(): void;
}
