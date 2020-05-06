"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _constants_1 = require("./_constants");
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const _interfaces_1 = require("./_interfaces");
const toolkip_maths_1 = require("@kipprice/toolkip-maths");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_html_helpers_1 = require("@kipprice/toolkip-html-helpers");
/**----------------------------------------------------------------------------
 * @class   Tooltip
 * ----------------------------------------------------------------------------
 * Render a dynamic HTML version of a tooltip for an element
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class Tooltip extends toolkip_drawable_1._Drawable {
    //#endregion
    //...............
    //.................................
    //#region INITIALIZE THE TOOLTIP
    /**
     * Tooltip
     * ----------------------------------------------------------------------------
     * Creates an HTML tooltip to show for a particular source element
     * @param   template        The template to use to create the tooltip
     * @param   sourceElem      The element to attach this tooltip to
     * @param   offset          Any offset that should be applied to this tooltip
     */
    constructor(template, sourceElem, offset) {
        super();
        // create elements
        if (!template) {
            template = {};
        }
        template.cls = "tooltip hidden" + (template.cls ? " " + template.cls : "");
        this._createBase(template);
        // assign the offset point
        this._offset = offset || { x: 0, y: 0 };
        // handle the source element (which also assigns listeners and positioning)
        this.sourceElement = sourceElem;
    }
    set sourceElement(elem) {
        this._sourceElement = elem;
        this._addEventListeners();
        window.setTimeout(() => {
            this._positionAppropriately();
        }, 100);
    }
    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Listen to mouse events about the source element in order to show the
     * tooltip associated with it
     */
    _addEventListeners() {
        if (!this._sourceElement) {
            return;
        }
        // add listeners to the source elements
        this._sourceElement.addEventListener("mouseover", () => {
            if (!toolkip_shared_types_1.isNullOrUndefined(this._hideTimeout)) {
                window.clearTimeout(this._hideTimeout);
            }
            this._positionAppropriately();
            window.setTimeout(() => { this.draw(document.body); }, 100);
        });
        this._sourceElement.addEventListener("mouseout", (event) => {
            if (event.target === this._elems.base) {
                return;
            }
            this._hideTimeout = window.setTimeout(() => { this.erase(); }, 100);
        });
        // add listeners to the tooltip itself
        this._elems.base.addEventListener("mouseover", () => {
            if (!toolkip_shared_types_1.isNullOrUndefined(this._hideTimeout)) {
                window.clearTimeout(this._hideTimeout);
            }
        });
        this._elems.base.addEventListener("mouseout", () => {
            if (event.target === this._sourceElement) {
                return;
            }
            this._hideTimeout = window.setTimeout(() => { this.erase(); }, 100);
        });
        toolkip_style_helpers_1.addClass(this._sourceElement, "tooltipSource");
        window.addEventListener("resize", () => { this._positionAppropriately(); });
    }
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * (Does nothing by default)
     */
    _createElements() {
        // Nothing to do here because we use the template in the constructor
    }
    //#endregion
    //.................................
    //..............................
    //#region POSITION THE TOOLTIP
    /**
     * _positionAppropriately
     * ----------------------------------------------------------------------------
     * Move the tooltip to the appropriate position for its source element
     */
    _positionAppropriately() {
        if (!this._sourceElement) {
            return;
        }
        // measure the elements we care about
        this._tooltipRect = toolkip_maths_1.clientRectToBasicRect(toolkip_html_helpers_1.measureElement(this._elems.base));
        this._sourceRect = toolkip_maths_1.clientRectToBasicRect(toolkip_html_helpers_1.measureElement(this._sourceElement));
        // loop through possible positions
        let foundSuccessfulPosition;
        for (let i = _interfaces_1.TooltipPositionType.TOP; i <= _interfaces_1.TooltipPositionType.RIGHT; i += 1) {
            foundSuccessfulPosition = this._assignPosition(i);
            if (foundSuccessfulPosition) {
                break;
            }
        }
        // reset our rects
        this._tooltipRect = null;
        this._sourceRect = null;
    }
    /**
     * _assignPosition
     * ----------------------------------------------------------------------------
     * Try to assign a position for the tooltip
     * @param   position    The position to try
     *
     * @returns True if the tooltip fits at the current position
     */
    _assignPosition(position) {
        let foundSuccessfulPosition = false;
        let rect = {
            x: this._setXPosition(position),
            y: this._setYPosition(position),
            w: this._tooltipRect.w,
            h: this._tooltipRect.h
        };
        // if we couldn't find onscreen positions, we need to try the next config
        if ((rect.x === -1) || (rect.y === -1)) {
            return false;
        }
        // otherwise, we can assign positions based on this rect
        this._elems.base.style.left = rect.x + "px";
        this._elems.base.style.top = rect.y + "px";
        return true;
    }
    /**
     * _setYPosition
     * ----------------------------------------------------------------------------
     * Finds the appropriate Y position for an element given the current placement
     * @param   position    The current placement of the tooltip
     *
     * @returns The y position associated with this placement
     */
    _setYPosition(position) {
        switch (position) {
            case _interfaces_1.TooltipPositionType.TOP:
                return (this._sourceRect.y - this._tooltipRect.h - _constants_1.TOOLTIP_MARGIN + this._offset.y);
            case _interfaces_1.TooltipPositionType.BOTTOM:
                return (this._sourceRect.y + this._sourceRect.h + _constants_1.TOOLTIP_MARGIN + this._offset.y);
            case _interfaces_1.TooltipPositionType.LEFT:
            case _interfaces_1.TooltipPositionType.RIGHT:
                return this._normalizeY(this._sourceRect.y, this._tooltipRect.h);
        }
        return -1;
    }
    /**
     * _setXPosition
     * ----------------------------------------------------------------------------
     * Finds the appropriate X position for an element given the current placement
     * @param   position    The current placement of the tooltip
     *
     * @returns The x position associated with this placement
     */
    _setXPosition(position) {
        switch (position) {
            case _interfaces_1.TooltipPositionType.TOP:
            case _interfaces_1.TooltipPositionType.BOTTOM:
                return this._normalizeX(this._sourceRect.x, this._tooltipRect.w);
            case _interfaces_1.TooltipPositionType.LEFT:
                return (this._sourceRect.x - this._tooltipRect.w - _constants_1.TOOLTIP_MARGIN + this._offset.x);
            case _interfaces_1.TooltipPositionType.RIGHT:
                return (this._sourceRect.x + this._sourceRect.w + _constants_1.TOOLTIP_MARGIN + this._offset.x);
        }
        return -1;
    }
    _normalizeX(x, width) {
        return this._normalize(x + this._offset.x, width, 0, window.innerWidth);
    }
    _normalizeY(y, height) {
        return this._normalize(y + this._offset.y, height, 0, window.innerHeight);
    }
    /**
     * _normalize
     * ----------------------------------------------------------------------------
     * Normalize the partiuclar position to be within the screen
     * @param   pos     The position to normalize
     * @param   dim     The dimension to compare against
     * @param   min     The minimum value that is still on screen
     * @param   max     The maximum value that is still on screen
     *
     * @returns The normalized value
     */
    _normalize(pos, dim, min, max) {
        // make sure we're on screen from the min-side
        if (pos < min) {
            pos = _constants_1.TOOLTIP_MARGIN;
        }
        // and the max
        if ((pos + dim) > max) {
            pos = max - dim - _constants_1.TOOLTIP_MARGIN;
        }
        // if the min-side is now off screen, this isn't a valid position
        if (pos < min) {
            return -1;
        }
        // otherwise return the adjusted value
        return pos;
    }
    //#endregion
    //#region DRAW AND ERASE
    draw(parent) {
        if (!this._elems.base.parentNode) {
            super.draw(parent);
        }
        toolkip_style_helpers_1.removeClass(this._elems.base, "hidden");
    }
    erase() {
        toolkip_style_helpers_1.addClass(this._elems.base, "hidden");
        //setTimeout(() => { super.erase(); }, 110);
    }
}
exports.Tooltip = Tooltip;
//#endregion
//.....................
//...............
//#region STYLES
Tooltip._uncoloredStyles = {
    ".tooltip": {
        position: "absolute",
        left: "0",
        top: "0",
        maxWidth: "300px",
        padding: "3px",
        boxSizing: "border-box",
        boxShadow: "1px 1px 4px 2px rgba(0,0,0,.2)",
        opacity: "1",
        transition: "all 0.1s ease-in-out",
        backgroundColor: "#FFF",
        borderRadius: "3px",
        fontSize: "0.8em",
        lineHeight: "120%",
        nested: {
            "&.hidden": {
                opacity: "0",
                pointerEvents: "none"
            }
        }
    },
    ".tooltipSource": {
        cursor: "pointer"
    }
};
