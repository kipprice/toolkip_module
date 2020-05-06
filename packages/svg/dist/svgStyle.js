"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
/**----------------------------------------------------------------------------
 * @class	SVGStyle
 * ----------------------------------------------------------------------------
 * Keep track of style changes for SVG elements
 * @version 1.0
 * @author	Kip Price
 * ----------------------------------------------------------------------------
 */
class SVGStyle {
    /**
     * Create a SVGStyle object
     *
     */
    constructor(styles) {
        this.clear();
        if (styles) {
            this.merge(styles);
        }
        this._needsNewString = true;
    }
    /**
     * _setStyle
     *
     * Update a particular style
     * @param 	key 	The key
     * @param 	value 	The value
     *
     */
    _setStyle(key, value) {
        this._innerStyle[key] = value;
        this._needsNewString = true;
    }
    /** fill color or "None" */
    set fill(fill) { this._setStyle("fill", fill); }
    get fill() { return this._innerStyle["fill"]; }
    /** fill opacity */
    set fillOpacity(opacity) { this._setStyle("fillOpacity", opacity); }
    get fillOpacity() { return this._innerStyle["fillOpacity"]; }
    /** font size */
    set fontSize(size) { this._setStyle("fontSize", size); }
    get fontSize() { return this._innerStyle["fontSize"]; }
    /** font weight */
    set fontWeight(weight) { this._setStyle("fontWeight", weight); }
    get fontWeight() { return this._innerStyle["fontWeight"]; }
    /** font family */
    set fontFamily(family) { this._setStyle("fontFamily", family); }
    get fontFamily() { return this._innerStyle["fontFamily"]; }
    /** stroke color */
    set stroke(stroke) { this._setStyle("stroke", stroke); }
    get stroke() { return this._innerStyle["stroke"]; }
    /** stroke width */
    set strokeWidth(width) { this._setStyle("strokeWidth", width); }
    get strokeWidth() { return this._innerStyle["strokeWidth"]; }
    /** stroke opacity */
    set strokeOpacity(opacity) { this._setStyle("strokeOpacity", opacity); }
    get strokeOpacity() { return this._innerStyle["strokeOpacity"]; }
    /** stroke linecap */
    set strokeLinecap(linecap) { this._setStyle("strokeLinecap", linecap); }
    get strokeLinecap() { return this._innerStyle["strokeLinecap"]; }
    /** stroke linejoin */
    set strokeLinejoin(linejoin) { this._setStyle("strokeLinejoin", linejoin); }
    get strokeLinejoin() { return this._innerStyle["strokeLinejoin"]; }
    /** filter */
    set filter(filter) {
        if (filter.substr(0, 4) !== "url(") {
            filter = "url(" + filter + ")";
        }
        this._setStyle("filter", filter);
    }
    get filter() { return this._innerStyle["filter"]; }
    set transform(transform) { this._transform = transform; }
    get transform() { return this._transform; }
    set transition(transition) { this._setStyle("transition", transition); }
    get transition() { return this._innerStyle["transition"]; }
    set strokeDashArray(dashArray) { this._strokeDashArray = dashArray; }
    get strokeDashArray() { return this._strokeDashArray; }
    /**
     * merge
     *
     * Merge another style object into this
     * @param 	style 	The style to merge in
     *
     */
    merge(style) {
        let mappable = (style._innerStyle) || style;
        toolkip_object_helpers_1.map(mappable, (value, key) => {
            if (!this._innerStyle[key] || (this._innerStyle[key] === "None")) {
                this._innerStyle[key] = value;
            }
        });
        if (!this._strokeDashArray) {
            this._strokeDashArray = mappable.strokeDashArray;
        }
        if (!this._transform) {
            this._transform = mappable.transform;
        }
    }
    /**
     * clear
     *
     * Clear out our inner styles to defaults
     *
     */
    clear() {
        this._innerStyle = {
            fill: "None",
            stroke: "None"
        };
    }
    /**
     * assignStyle
     *
     * @param 	element 	The element to set styles on
     *
     */
    assignStyle(element) {
        if (this._needsNewString) {
            this._generateStyleString();
        }
        element.setAttribute("style", this._generatedStyleString);
        if (this._strokeDashArray) {
            element.setAttribute("stroke-dasharray", this._strokeDashArray);
        }
        if (this._transform) {
            element.setAttribute("transform", this._transform);
        }
    }
    /**
     * _generateStyleString
     *
     * Generate the appropriate string for the current style
     *
     */
    _generateStyleString() {
        this._generatedStyleString = "";
        toolkip_object_helpers_1.map(this._innerStyle, (propValue, propName) => {
            let formattedPropName = toolkip_style_helpers_1.getCssPropertyName(propName);
            this._generatedStyleString += toolkip_primitive_helpers_1.format("{0}: {1};", formattedPropName, propValue.toString());
        });
    }
}
exports.SVGStyle = SVGStyle;
