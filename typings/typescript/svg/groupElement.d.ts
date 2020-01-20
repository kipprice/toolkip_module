import { SVGElem } from "./svgElement";
import { Collection } from "../dataStructures/collection/collection";
import { SVGStyle } from "./svgStyle";
import { ISVGAttributes, IPathPoint, IPathSVGAttributes, ICurvePoint, SVGShapeEnum } from "./_interfaces";
import { IExtrema, IPoint, IBasicRect } from "../maths/interface";
import { PathElement } from "./pathElement";
import { RectangleElement } from "./rectElement";
import { IAttributes } from "../htmlHelpers/_interfaces";
import { CircleElement } from "./circleElement";
import { ArcElement, PieSliceElement, CurveElement, PolygonElement, StarElement, PathExtensionElement } from "./additionalPathElements";
import { TextElement } from "./textElement";
/**----------------------------------------------------------------------------
 * @class   GroupElement
 * ----------------------------------------------------------------------------
 * @version 1.0
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
export declare class GroupElement extends SVGElem {
    protected static _lastId: number;
    protected static get _nextId(): string;
    /** all SVG elements in this group */
    protected _svgElems: Collection<SVGElem>;
    /** all elements that should not be scaled in this group */
    protected _nonScaled: SVGElem[];
    get nonScaled(): SVGElem[];
    /** override the default style getter; we don't need to apply anything */
    get style(): SVGStyle;
    constructor(attr: ISVGAttributes);
    protected _setAttributes(attributes: ISVGAttributes): ISVGAttributes;
    protected _updateExtrema(attributes: ISVGAttributes): void;
    protected _updateExtremaFromChild(childExtrema: IExtrema): void;
    private _addChildElement;
    /**
     * addPath
     *
     * Adds a path to the SVG canvas
     *
     * @param 	points   The points to add to the path
     * @param	noFinish True if we should finish the path without closing
     * @param	attr     Any attributes that should be applied
     * @param	group    The group this path should be added to
     *
     * @returns The path that was created
     *
     */
    addPath(points: IPathPoint[], noFinish?: boolean, attr?: IPathSVGAttributes): PathElement;
    /**
     * addRectangle
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param attr
     * @param group
     *
     */
    addRectangle(x: number, y: number, width: number, height: number, attr?: ISVGAttributes): RectangleElement;
    /**
     * addCircle
     *
     * adds a circle to the SVG canvas
     * @param	centerPt
     * @param	radius
     * @param	attr
     * @param	group
     * @returns	The created circle
     *
     */
    addCircle(centerPt: IPoint, radius: number, attr?: IAttributes): CircleElement;
    /**
     * addPerfectArc
     * ----------------------------------------------------------------------------
     * Add a perfect arc to the SVG Canvas
     *
     * @returns	The created arc element
     */
    addPerfectArc(centerPt: IPoint, radius: number, startDeg: number, endDeg: number, direction: number, attr?: IAttributes): ArcElement;
    /**
     * addPieSlice
     * ----------------------------------------------------------------------------
     * Add a pie slice element to the SVG canvas
     * @param 	centerPt
     * @param 	radius
     * @param 	startDeg
     * @param 	endDeg
     * @param 	direction
     * @param 	attr
     *
     * @returns	The created pie slice
     */
    addPieSlice(centerPt: IPoint, radius: number, startDeg: number, endDeg: number, direction: number, attr?: IAttributes): PieSliceElement;
    addCurve(points: ICurvePoint[], attr?: IAttributes): CurveElement;
    /**
     * addRegularPolygon
     *
     * creates a regular polygon to the SVG canvas
     * @param   centerPt The central point of the polygon
     * @param   sides    The number of sides of the polygon
     * @param   radius   The radius of the polygon
     * @param   attr     Any additional attributes
     * @param   group    The group the polygon should be added to
     * @returns The created polygon on the SVG Canvas
     *
     */
    addRegularPolygon(centerPt: IPoint, sides: number, radius: number, attr?: IPathSVGAttributes): PolygonElement;
    /**
     * addRegularStar
     *
     * Creates a regular star on the SVG canvas
     * @param   centerPt      	The point at the center of the star
     * @param   numberOfPoints 	The number of points of this star
     * @param   radius        	[description]
     * @param   innerRadius   	[description]
     * @param   attr          	[description]
     * @param   group         	[description]
     * @returns The created star
     *
     */
    addRegularStar(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number, attr?: IPathSVGAttributes): StarElement;
    /**
     * addtext
     *
     * Adds a text element to the SVG canvas
     * @param   text     The text to add
     * @param   point    The point at which to add the point
     * @param   originPt If provided, the origin point within the text element that defines where the text is drawn
     * @param   attr     Any attributes that should be applied to the element
     * @param   group    The group to add this element to
     * @returns The text element added to the SVG
     *
     */
    addText(text: string, point: IPoint, originPt: IPoint, attr?: ISVGAttributes): TextElement;
    addFlowableText(text: string, bounds: IBasicRect, attr: IAttributes): TextElement;
    /**
     * addGroup
     *
     * @param	attr
     * @param 	group
     * @returns	The created element
     *
     */
    addGroup(attr?: IAttributes): GroupElement;
    /**
     * addShape
     *
     * Adds a particular shape to the SVG canvas
     * @param   shapeType The type of shape to add
     * @param   scale     What scale the shape should be drawn at
     * @param   attr      Any attributes that should be applied to the element
     * @param   group     What group the element should be added to
     * @returns The created shape
     *
     */
    addShape(shapeType: SVGShapeEnum, scale?: number, centerPt?: IPoint, attr?: IAttributes): PathExtensionElement;
    /**
     * Adds a checkmark to the canvas with the provided scale
     *
     */
    private _addCheckShape;
    /**
     * Adds an 'ex' to the canvas with the provided scale
     *
     */
    private _addExShape;
    /**
     * Adds a plus to the canvas with the provided scale
     *
     */
    private _addPlusShape;
    /**
     * _initializeAttributes
     *
     * Create attributes needed to create a shape
     * @param	attr	The attributes to initialize
     * @param	group	The group to add this element to
     * @returns	The updated attributes
     *
     */
    private _initializeAttributes;
    /**
     * clear
     *
     * Clear the contents of this group
     *
     */
    clear(): void;
}
