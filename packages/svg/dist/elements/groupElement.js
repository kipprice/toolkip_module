"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svgElement_1 = require("./svgElement");
const toolkip_data_structures_1 = require("@kipprice/toolkip-data-structures");
const _interfaces_1 = require("../_interfaces");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const pathElement_1 = require("./pathElement");
const rectElement_1 = require("./rectElement");
const circleElement_1 = require("./circleElement");
const additionalPaths_1 = require("../additionalPaths");
const textElement_1 = require("./textElement");
/**----------------------------------------------------------------------------
 * @class   GroupElement
 * ----------------------------------------------------------------------------
 * @version 1.0
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
class GroupElement extends svgElement_1._SVGElem {
    //#endregion
    constructor(attr) {
        super(attr);
        // Initiate collections
        this._svgElems = new toolkip_data_structures_1.Collection();
        this._nonScaled = [];
    }
    static get _nextId() {
        GroupElement._lastId += 1;
        return GroupElement._lastId.toString();
    }
    get nonScaled() { return this._nonScaled; }
    /** override the default style getter; we don't need to apply anything */
    get style() { return this._style; }
    _setAttributes(attributes) {
        attributes.type = "g";
        return attributes;
    }
    _updateExtrema(attributes) { }
    _updateExtremaFromChild(childExtrema) {
        if (!this._extrema) {
            this._extrema = toolkip_object_helpers_1.cloneObject(childExtrema);
            return;
        }
        if (childExtrema.min.x < this._extrema.min.x) {
            this._extrema.min.x = childExtrema.min.x;
        }
        if (childExtrema.min.y < this._extrema.min.y) {
            this._extrema.min.y = childExtrema.min.y;
        }
        if (childExtrema.max.x < this._extrema.max.x) {
            this._extrema.max.x = childExtrema.max.x;
        }
        if (childExtrema.max.y < this._extrema.max.y) {
            this._extrema.max.y = childExtrema.max.y;
        }
    }
    _addChildElement(elem, skipUpdateExtrema) {
        // style the element appropriately
        elem.style.merge(this._style);
        // add the element to our internal array
        this._svgElems.add(elem.id, elem);
        // prevent scaling of the element if appropriate
        if (elem.preventScaling) {
            this._nonScaled.push(elem);
        }
        // update the extrema of the SVG if appropriate
        if (!skipUpdateExtrema) {
            this._updateExtrema(elem.extrema);
        }
        elem.addUpdateListener(() => {
            this._updateExtremaFromChild(elem.extrema);
            this._notifyUpdateListeners();
        });
    }
    //#region ADD PATH
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
    addPath(points, noFinish, attr) {
        attr = this._initializeAttributes(attr);
        attr.noFinish = noFinish;
        let path = new pathElement_1.PathElement(points, attr);
        this._addChildElement(path);
        return path;
    }
    //#endregion
    //#region ADD RECTANGLE
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
    addRectangle(x, y, width, height, attr) {
        attr = this._initializeAttributes(attr);
        let rect = new rectElement_1.RectangleElement(x, y, width, height, attr);
        this._addChildElement(rect);
        return rect;
    }
    //#endregion
    //#region ADD CIRCLE
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
    addCircle(centerPt, radius, attr) {
        attr = this._initializeAttributes(attr);
        let circle = new circleElement_1.CircleElement(centerPt, radius, attr);
        this._addChildElement(circle);
        return circle;
    }
    /**
     * addPerfectArc
     * ----------------------------------------------------------------------------
     * Add a perfect arc to the SVG Canvas
     *
     * @returns	The created arc element
     */
    addPerfectArc(centerPt, radius, startDeg, endDeg, direction, attr) {
        attr = this._initializeAttributes(attr);
        let arc = new additionalPaths_1.ArcElement(centerPt, radius, startDeg, endDeg, direction, attr);
        this._addChildElement(arc);
        return arc;
    }
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
    addPieSlice(centerPt, radius, startDeg, endDeg, direction, attr) {
        attr = this._initializeAttributes(attr);
        let pieSlice = new additionalPaths_1.PieSliceElement(centerPt, radius, startDeg, endDeg, direction, attr);
        this._addChildElement(pieSlice);
        return pieSlice;
    }
    addCurve(points, attr) {
        attr = this._initializeAttributes(attr);
        let curve = new additionalPaths_1.CurveElement(points, attr);
        this._addChildElement(curve);
        return curve;
    }
    //#endregion
    //#endregion
    //#region ADD POLYGON
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
    addRegularPolygon(centerPt, sides, radius, attr) {
        attr = this._initializeAttributes(attr);
        let polygon = new additionalPaths_1.PolygonElement(centerPt, sides, radius, attr);
        this._addChildElement(polygon);
        return polygon;
    }
    //#endregion
    //#region ADD STAR
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
    addRegularStar(centerPt, numberOfPoints, radius, innerRadius, attr) {
        attr = this._initializeAttributes(attr);
        let star = new additionalPaths_1.StarElement(centerPt, numberOfPoints, radius, innerRadius, attr);
        this._addChildElement(star);
        return star;
    }
    //#endregion
    //#region ADD TEXT
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
    addText(text, point, originPt, attr) {
        attr = this._initializeAttributes(attr);
        let txt = new textElement_1.TextElement(text, point, originPt, attr);
        this._addChildElement(txt, true);
        window.setTimeout(() => {
            this._updateExtrema(txt.extrema);
        }, 10);
        return txt;
    }
    addFlowableText(text, bounds, attr) {
        //TODO: Add flowable text
        return null;
    }
    //#endregion
    //#region ADD GROUP
    /**
     * addGroup
     *
     * @param	attr
     * @param 	group
     * @returns	The created element
     *
     */
    addGroup(attr) {
        attr = this._initializeAttributes(attr);
        let grp = new GroupElement(attr);
        this._addChildElement(grp);
        return grp;
    }
    //#endregion
    //#region ADD SHAPES
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
    addShape(shapeType, scale, centerPt, attr) {
        // Use our default scale if one wasn't passed in
        if (!scale) {
            scale = 1;
        }
        if (!centerPt) {
            centerPt = { x: 0, y: 0 };
        }
        // Draw the appropriate shape
        switch (shapeType) {
            case _interfaces_1.SVGShapeEnum.CHECKMARK:
                return this._addCheckShape(scale, centerPt, attr);
            case _interfaces_1.SVGShapeEnum.X:
                return this._addExShape(scale, centerPt, attr);
            case _interfaces_1.SVGShapeEnum.PLUS:
                return this._addPlusShape(scale, centerPt, attr);
        }
    }
    /**
     * Adds a checkmark to the canvas with the provided scale
     *
     */
    _addCheckShape(scale, centerPt, attr) {
        attr = this._initializeAttributes(attr);
        let checkmark = new additionalPaths_1.CheckElement(null, attr, centerPt);
        this._addChildElement(checkmark);
        return checkmark;
    }
    /**
     * Adds an 'ex' to the canvas with the provided scale
     *
     */
    _addExShape(scale, centerPt, attr) {
        attr = this._initializeAttributes(attr);
        let exElem = new additionalPaths_1.ExElement(null, attr, centerPt);
        this._addChildElement(exElem);
        return exElem;
    }
    /**
     * Adds a plus to the canvas with the provided scale
     *
     */
    _addPlusShape(scale, centerPt, attr) {
        attr = this._initializeAttributes(attr);
        let plusSymbol = new additionalPaths_1.PlusElement(null, attr, centerPt);
        this._addChildElement(plusSymbol);
        return plusSymbol;
    }
    //#endregion
    /**
     * _initializeAttributes
     *
     * Create attributes needed to create a shape
     * @param	attr	The attributes to initialize
     * @param	group	The group to add this element to
     * @returns	The updated attributes
     *
     */
    _initializeAttributes(attr) {
        if (!attr) {
            attr = {};
        }
        // set the parent
        attr.parent = this._elems.base;
        // initialize the ID of the child
        if (!attr.id) {
            attr.id = GroupElement._nextId;
        }
        return attr;
    }
    /**
     * clear
     *
     * Clear the contents of this group
     *
     */
    clear() {
        this._elems.base.innerHTML = "";
        this._svgElems.clear();
    }
}
exports.GroupElement = GroupElement;
//#region ID TRACKING
GroupElement._lastId = 0;
