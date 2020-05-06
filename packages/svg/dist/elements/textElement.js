"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svgElement_1 = require("./svgElement");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
/**----------------------------------------------------------------------------
 * @class	TextElement
 * ----------------------------------------------------------------------------
 * render text on the SVG canvas
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class TextElement extends svgElement_1._SVGElem {
    constructor(text, point, originPt, attr) {
        super(attr, text, point, originPt);
    }
    get style() {
        window.setTimeout(() => {
            this._style.assignStyle(this._elems.base);
            if (!this._originPt) {
                this._notifyUpdateListeners();
            }
        });
        return this._style;
    }
    _setAttributes(attr, text, point, originPt) {
        attr.type = "text";
        attr.x = point.x;
        attr.y = point.y;
        // store the pieces that have to be added post-creation
        this._text = text;
        this._originPt = originPt;
        return attr;
    }
    _createElements(attr) {
        super._createElements(attr);
        toolkip_style_helpers_1.addClass(this._elems.base, "unselectable");
        // update the text
        this._elems.base.innerHTML = this._text;
        // update the origin point if provided
        if (this._originPt) {
            this._elems.base.style.display = "none";
            window.setTimeout(() => {
                this._handleOriginPoint(attr);
                this._elems.base.style.display = "default";
            }, 10);
        }
    }
    _handleOriginPoint(attr) {
        let box = this.measureElement();
        let newPt = {
            x: attr.x - (box.w * this._originPt.x),
            y: attr.y - ((box.h - ((attr.y - box.y) * 2)) * this._originPt.y)
        };
        console.log("box: (" + box.x + ", " + box.y + ") -> (" + box.w + ", " + box.h + ")");
        this._elems.base.setAttribute("x", newPt.x.toString());
        this._elems.base.setAttribute("y", newPt.y.toString());
        box.x = newPt.x;
        box.y = newPt.y;
        console.log("box: (" + box.x + ", " + box.y + ") -> (" + box.w + ", " + box.h + ")");
        this._updateExtrema(box);
        this._notifyUpdateListeners();
    }
    _updateExtremaAndNotifyListeners(attr) {
        this._updateExtrema(attr);
    }
    _updateExtrema(attr) {
        let rect = this.measureElement();
        this._extrema = {
            min: { x: rect.x, y: rect.y },
            max: { x: rect.x + rect.w, y: rect.y + rect.h }
        };
    }
}
exports.TextElement = TextElement;
TextElement._uncoloredStyles = {
    ".unselectable": {
        userSelect: "none",
        mozUserSelect: "none",
        webkitUserSelect: "none",
        khtmlUserSelect: "none",
        oUserSelect: "none"
    }
};
