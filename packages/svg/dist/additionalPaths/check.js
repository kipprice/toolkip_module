"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathExtension_1 = require("./pathExtension");
/**
 * @class	CheckElement
 *
 */
class CheckElement extends pathExtension_1._PathExtensionElement {
    _generatePoints(centerPt) {
        let pts = [
            { x: -0.15, y: 2.95 },
            { x: 1, y: 4 },
            { x: 1.25, y: 4 },
            { x: 3, y: 0.25 },
            { x: 2.4, y: 0 },
            { x: 1, y: 3 },
            { x: 0.3, y: 2.3 }
        ];
        for (let pt of pts) {
            pt.x += centerPt.x;
            pt.y += centerPt.y;
        }
        return pts;
    }
}
exports.CheckElement = CheckElement;
