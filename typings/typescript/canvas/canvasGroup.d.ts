import { CanvasElement } from "./canvasElement";
import { Collection } from "../dataStructures/collection/collection";
import { ElementType, EventTypeEnum } from "./_interfaces";
import { IPoint, IBasicRect } from "../maths/interface";
import { HTML5Canvas } from "./canvas";
/**----------------------------------------------------------------------------
 * @class	CanvasGroup
 * ----------------------------------------------------------------------------
 * class that stores collections of other canvas elements
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class CanvasGroup extends CanvasElement {
    /** keep track of the elements in this group */
    protected _elements: Collection<CanvasElement>;
    /** the type of element this is */
    get type(): ElementType;
    /** keep track of the reference point for the group */
    protected _referencePoint: IPoint;
    set referencePoint(refPt: IPoint);
    /** the point for reference for display */
    protected _displayReferencePoint: IPoint;
    /** if true, scales with the rest of the canvas */
    protected _respondToScale: boolean;
    /** true if we haven't yet set the dimensions for the group */
    private _needsInitialDimensions;
    /**
     * isHoverTarget
     * ----------------------------------------------------------------------------
     * groups handle whether they are a hover target a little differently
     *
     * @returns	True if this element is a target for hover
     */
    get isHoverTarget(): boolean;
    /**
     * CanvasGroup
     * ----------------------------------------------------------------------------
     * create a group element that joins other elements together
     *
     * @param	id			The unique ID for the element
     * @param	refPoint	The reference point to use
     *
     */
    constructor(id: string, refPoint?: IPoint);
    /**
     * _initializeRects
     * ----------------------------------------------------------------------------
     * handle the initial rects needed by the group
     */
    protected _initializeRects(): void;
    /**
     * _onDraw
     * ----------------------------------------------------------------------------
     * handle drawing the group
     *
     * @param	context		The context upon which to draw this element
     *
     */
    protected _onDraw(context: CanvasRenderingContext2D): void;
    /**
     * updateDimensions
     * ----------------------------------------------------------------------------
     * update the space occupied by this group
     *
     * @param	visibleWindow	The visible view into the canvas
     *
     */
    updateDimensions(visibleWindow: IBasicRect): void;
    /**
     * addElement
     * ----------------------------------------------------------------------------
     * add an element to this group
     *
     * @param	The element to add to the group
     *
     */
    addElement(elem: CanvasElement): void;
    /**
     * _updateInternalDinensionsFromElement
     * ----------------------------------------------------------------------------
     * make sure our internal dimensions match what our elements
     *
     * @param	elem	THe element we're adding to update dimensions for
     *
     */
    private _updateInternalDimensionsFromElement;
    /**
     * handleEvent
     *
     * groups need some special handling since they need to pass on their events
     *
     * @param	eventType
     * @param	pt			The point
     * @param	e			The actual event we are handling
     *
     */
    handleEvent(eventType: EventTypeEnum, pt: IPoint, e: Event): void;
    /**
     * _clearHover
     *
     * clear hover styles that may have been applied already
     *
     */
    private _clearHover;
    /** find the elements that are located at the provided point */
    private _findElementsAtPoint;
    /** remove elements from layers */
    removeElement(id: string): boolean;
    protected _cloneForEffect(id: string): CanvasGroup;
    /**
     * _scale
     *
     * groups scale by each of their parts scaling
     *
     * @param	scaleAmt	The amount to scale by
     *
     */
    protected _scale(scaleAmt: number): void;
    /**
     * adjustDimensions
     *
     * adjust the dimensions of this group + its children
     *
     * @param	adjustPt	The point we're adjusting to
     *
     */
    adjustDimensions(adjustPt: IPoint): void;
    /**
     * _setCanvas
     *
     * Set our internal canvas
     *
     * @param 	canvas	The canvas to set internally
     *
     */
    protected _setCanvas(canvas: HTML5Canvas): void;
}
