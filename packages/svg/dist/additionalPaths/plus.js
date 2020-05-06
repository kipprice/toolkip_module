"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathExtension_1 = require("./pathExtension");
/**
 * @class	PlusElement
 *
 */
class PlusElement extends pathExtension_1._PathExtensionElement {
    _generatePoints(centerPt) {
        let pts = [
            { x: 2, y: 2 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
            { x: 3, y: 2 },
            { x: 5, y: 2 },
            { x: 5, y: 3 },
            { x: 3, y: 3 },
            { x: 3, y: 5 },
            { x: 2, y: 5 },
            { x: 2, y: 3 },
            { x: 0, y: 3 },
            { x: 0, y: 2 }
        ];
        for (let pt of pts) {
            pt.x += centerPt.x;
            pt.y += centerPt.y;
        }
        return pts;
    }
}
exports.PlusElement = PlusElement;
