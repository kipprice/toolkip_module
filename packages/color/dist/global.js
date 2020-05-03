"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
const _interfaces_1 = require("./_interfaces");
/**----------------------------------------------------------------------------
 * @class	GlobalColor
 * ----------------------------------------------------------------------------
 * handle the global description of colors
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _GlobalColor {
    constructor() {
        this._usedColors = {};
        this._innerColor = new color_1.HSLColor("hsl(330, 80%, 50%)");
    }
    generateColor(id, firstRotate) {
        let colorStr = this._usedColors[id] || "";
        // Grab the next available color
        if (!colorStr) {
            colorStr = this._innerColor.getNextColor(firstRotate || _interfaces_1.HSLPieceEnum.HUE);
        }
        let color = new color_1.HexColor(colorStr);
        // If we received an identifier, use it
        if (id) {
            this._usedColors[id] = colorStr;
        }
        return color;
    }
    ;
    getCurrentColor() {
        return this._innerColor;
    }
}
exports.GlobalColor = new _GlobalColor();
