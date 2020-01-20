import { Drawable } from "../drawable/drawable";
import { Collection } from "../dataStructures/collection/collection";
import { SVGStyle } from "./svgStyle";
import { ISVGElementElems, ISVGAttributes, SVGUpdateListener } from "./_interfaces";
import { IExtrema, IBasicRect } from "../maths/interface";
/**----------------------------------------------------------------------------
 * @class   SVGElem
 * ----------------------------------------------------------------------------
 * Creates an element on an SVG Drawable
 * @version 1.1
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
export declare abstract class SVGElem extends Drawable {
    /** keep track of the last listener ID used */
    protected _lastListenerId: number;
    /** generate the next listener ID */
    protected get _nextListenerId(): string;
    /** keep track of listeners */
    protected _onUpdateListeners: Collection<SVGUpdateListener>;
    /** add a new listener */
    addUpdateListener(listener: SVGUpdateListener, id?: string): void;
    /** notify listeners of a change */
    protected _notifyUpdateListeners(): void;
    /** unique identifier for the element */
    get id(): string;
    set id(id: string);
    /** keep track of how this element is styled */
    protected _style: SVGStyle;
    get style(): SVGStyle;
    /** keep track of the elements in this SVGElement */
    protected _elems: ISVGElementElems;
    get base(): SVGElement;
    /** determine whether this element should be scalable */
    protected _preventScaling: boolean;
    get preventScaling(): boolean;
    /** keep track of the extrema for this element */
    protected _extrema: IExtrema;
    get extrema(): IExtrema;
    /** store the attributes */
    protected _attributes: ISVGAttributes;
    /**
     * Creates an SVG element
     * @param   attributes  The attributes to create this element with
     *
     */
    constructor(attributes: ISVGAttributes, ...addlArgs: any[]);
    /**
     * _shouldSkipCreateElements
     *
     * Determine whether we should allow elements to be drawn as part of the
     * constructor.
     *
     * @returns True, since we always need attributes
     *
     */
    protected _shouldSkipCreateElements(): boolean;
    /**
     * _createElements
     *
     * Create the elements that make up this SVG Element
     *
     * @param   attributes  Attributes for this element
     *
     */
    protected _createElements(attributes: ISVGAttributes): void;
    /**
     * measureElement
     *
     * Measures an element in the SVG canvas
     * @param   element 	The element to measure
     * @returns The dimensions of the element, in SVG coordinates
     *
     */
    measureElement(): IBasicRect;
    protected _updateExtremaAndNotifyListeners(attributes: ISVGAttributes): void;
    /**
     * _setAttributes
     *
     * Set the appropriate set of attributes for this element
     *
     * @param   attributes  The initial attributes
     * @param   addlArgs    Anything additional we should be passing to the setAttributes function
     *
     * @returns The updated attributes
     *
     */
    protected abstract _setAttributes(attributes: ISVGAttributes, ...addlArgs: any[]): ISVGAttributes;
    protected abstract _updateExtrema(attributes: ISVGAttributes): void;
    scale(scaleAmt: number): void;
}
