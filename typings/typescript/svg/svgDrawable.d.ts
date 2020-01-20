import { Drawable } from "../drawable/drawable";
import { ISVGElems, ISVGOptions, IPathPoint, IPathSVGAttributes, ISVGAttributes, SVGShapeEnum } from "./_interfaces";
import { IBasicRect, IPoint } from "../maths/interface";
import { SVGStyle } from "./svgStyle";
import { SVGElem } from "./svgElement";
import { PathElement } from "./pathElement";
import { RectangleElement } from "./rectElement";
import { CircleElement } from "./circleElement";
import { ArcElement, PieSliceElement, PolygonElement, StarElement, PathExtensionElement } from "./additionalPathElements";
import { TextElement } from "./textElement";
import { GroupElement } from "./groupElement";
/**----------------------------------------------------------------------------
 * @class 	SVGDrawable
 * ----------------------------------------------------------------------------
 * Create a drawable SVG canvas
 * @author	Kip Price
 * @version 1.1.0
 * ----------------------------------------------------------------------------
 */
export declare class SVGDrawable extends Drawable {
    /** elements within the SVG drawable */
    protected _elems: ISVGElems;
    /** The base element of the SVG canvas */
    base: SVGElement;
    /** the group upon which everything is drawn */
    protected _group: GroupElement;
    /** The rectangle that defines the bounds of the canvas */
    private _view;
    get view(): IBasicRect;
    set view(rect: IBasicRect);
    /** The maximum and minimum values of the SVG canvas */
    private _extrema;
    /** Any options that should be used for this canvas */
    private _options;
    get options(): ISVGOptions;
    /** The bounds of the SVG element in the actual window */
    private _bounds;
    /** styles for the SVG element */
    get style(): SVGStyle;
    private _elemCollections;
    protected _shouldSkipCreateElements(): boolean;
    /**
     * Constructs a basic SVG canvas
     * @param 	id     The ID of the canvas
     * @param 	bounds The real-world (e.g. in window) bounds of the canvas
     * @param 	opts   Any options that should be applied to the canvas
     *
     */
    constructor(bounds?: IBasicRect, opts?: ISVGOptions);
    /**
     * _initializeInternalSizing
     * ----------------------------------------------------------------------------
     * Make sure we have default values for extrema
     *
     */
    private _initializeInternalSizing;
    /**
     * _createDefaultOptions
     * ----------------------------------------------------------------------------
     * Get the set of default options
     * @returns	The created default options
     *
     */
    private _createDefaultOptions;
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Create the elements needed for this SVG drawable
     *
     */
    protected _createElements(): void;
    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Adds the relevant event listeners for the SVG object
     *
     */
    private _addEventListeners;
    /**
     * _onZoom
     *
     * handle zooming in & out
     * @param	direction	If positive, zooms in. If negative, zooms out
     *
     */
    protected _onZoom(direction: number): void;
    /**
     * _onPan
     *
     * handle panning the SVG canvas
     * @param	delta	The amount to pan by
     *
     */
    protected _onPan(delta: IPoint): void;
    /**
     * Sets the real-world width of the canvas
     * @param 	w 	The width to set
     *
     */
    set width(w: number);
    /**
     * Sets the real-world height of the canvas
     * @param 	h 	The height to set
     *
     */
    set height(h: number);
    /**
     * generateViewboxAttribute
     *
     * Create a string that can be used in the viewbox attribute for the SVG
     * @param  	set		True if we should also set the attribute after generating it
     * @returns The viewbox attribute for the current view
     *
     */
    generateViewboxAttribute(set?: boolean): string;
    /**
     * _calculateView
     *
     * Calculate what the view of the SVG should be, based on the extrema
     * @returns True if the extrema were appropriately calculated
     *
     */
    protected _calculateView(): boolean;
    protected _verifyViewMeetsAspectRatio(): void;
    /**
     * _updateExtrema
     *
     * Updates the extreme points of this SVG element after adding an element
     * @param 	extrema 	The extrema of the element just added
     *
     */
    private _updateExtrema;
    /**
     * calculateSVGCoordinates
     *
     * Calculates the SVG coordinates from real coordinates
     * @param   pt	The real coordinates to convert
     * @returns The SVG coordinates for this real point
     *
     */
    calculateSVGCoordinates(pt: IPoint): IPoint;
    /**
     * calculateScreenCoordinates
     *
     * Calculate the real coordinates from SVG coordinates
     * @param 	pt 	The point to convert to real coordinates
     * @returns	The real coordinates for this SVG point
     *
     */
    calculateScreenCoordinates(pt: IPoint): IPoint;
    /**
     * _convertCoordinates
     *
     * Convert one set of coordinates to another
     * @param	pt			The point to convert
     * @param	numerator	The ratio to consider the numerator
     * @param	denominator	The ratio to consider the denominator
     * @returns	The converted point
     *
     */
    private _convertCoordinates;
    /**
     * _convertDistance
     *
     *
     *
     */
    private _convertDistance;
    /**
     * calculateSVGWidth
     *
     * Calculate how wide something is in SVG coordinates when measured in real
     * coordinates.
     *
     * @param	width	The width to convert
     *
     * @returns	The SVG equivalent of the width
     *
     */
    calculateSVGWidth(width: number): number;
    /**
     * calculateSVGHeight
     *
     * Calculate how high something is in SVG coordinates from the real
     * measurement.
     *
     * @param	height	The height to convert
     *
     * @returns	The converted height
     *
     */
    calculateSVGHeight(height: number): number;
    calculateScreenWidth(width: number): number;
    calculateScreenHeight(height: number): number;
    /**
     * addPath
     * ----------------------------------------------------------------------------
     * Add a path to our SVG canvas
     * @param 	points 	The points in the path to add
     * @param 	noFinish 	True if this path should be left unfinished
     * @param 	attr 		Any attributes that should be set for the path
     *
     * @returns	The created PathElement
     */
    addPath(points: IPathPoint[], noFinish?: boolean, attr?: IPathSVGAttributes): PathElement;
    /**
     * addRectangle
     * ----------------------------------------------------------------------------
     * Add a rectangle to our SVG canvas
     * @param 	x 		X coordinate for the rect
     * @param 	y 		y coordinate for the rect
     * @param 	width 	Width for the rect
     * @param 	height 	Height for the rect
     * @param 	attr 	Any attributes that should be set for the rect
     *
     * @returns	The created rectangle
     */
    addRectangle(x: number, y: number, width: number, height: number, attr?: ISVGAttributes): RectangleElement;
    /**
     * addCircle
     * ----------------------------------------------------------------------------
     * Add a circle to our SVG canvas
     * @param 	centerPt	Central point for the circle
     * @param 	radius		Radius for the circle
     * @param 	attr		Any attributes that should be set for the circle
     *
     * @returns	The created circle
     */
    addCircle(centerPt: IPoint, radius: number, attr?: ISVGAttributes): CircleElement;
    /**
     * addPerfectArc
     * ----------------------------------------------------------------------------
     * Add an arc to our SVG canvas
     * @param centerPt
     * @param radius
     * @param startDeg
     * @param endDeg
     * @param direction
     * @param attr
     *
     * @returns	The created arc
     */
    addPerfectArc(centerPt: IPoint, radius: number, startDeg: number, endDeg: number, direction: number, attr?: IPathSVGAttributes): ArcElement;
    /**
     * addPieSlice
     * ----------------------------------------------------------------------------
     * @param centerPt
     * @param radius
     * @param startDeg
     * @param endDeg
     * @param direction
     * @param attr
     *
     * @returns	The created pie slice
     */
    addPieSlice(centerPt: IPoint, radius: number, startDeg: number, endDeg: number, direction: number, attr?: IPathSVGAttributes): PieSliceElement;
    /**
     * addRegularPolygon
     * ----------------------------------------------------------------------------
     * Add a multi-sided polygon to our SVG canvas
     * @param 	centerPt 	Central point for the shape
     * @param 	sides 		Number of sides for the polygon
     * @param 	radius 		Radius for the polygon
     * @param 	attr 		Any attributes that should be set for the circle
     *
     * @returns	The created polygon
     */
    addRegularPolygon(centerPt: IPoint, sides: number, radius: number, attr?: IPathSVGAttributes): PolygonElement;
    addRegularStar(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number, attr?: IPathSVGAttributes): StarElement;
    addText(text: string, point: IPoint, originPt: IPoint, attr?: ISVGAttributes): TextElement;
    addFlowableText(text: string, bounds: IBasicRect, attr: ISVGAttributes): TextElement;
    addGroup(attr?: ISVGAttributes): GroupElement;
    addShape(shapeType: SVGShapeEnum, scale?: number, centerPt?: IPoint, attr?: ISVGAttributes): PathExtensionElement;
    protected _addElementListener(elem: SVGElem): void;
    /**
     * _convertPointsToPathPoints
     * ----------------------------------------------------------------------------
     * Helper function to turn an array of IPoint elements to IPathPoint elements
     * @param   points 	The points to convert
     * @param   scale  	The scale that should be applied to the IPoint before turning into a IPathPoint
     * @returns Array of scaled IPathPoints
     */
    private _convertPointsToPathPoints;
    /**
     * rotateElement
     *
     * Rotates an element around a particular point
     * @param   elem         The element to rotate
     * @param   degree       How many degrees to rotate the element
     * @param   rotateAround What point to rotate around
     * @returns The rotated SVG Element
     *
     */
    rotateElement(elem: SVGElem, degree: number, rotateAround?: IPoint): SVGElem;
    /**
     * clear
     *
     * Clear everything off the canvas
     *
     */
    clear(): void;
}
