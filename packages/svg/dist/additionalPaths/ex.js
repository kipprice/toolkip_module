"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathExtension_1 = require("./pathExtension");
/**
 * @class	ExElement
 *
 */
class ExElement extends pathExtension_1._PathExtensionElement {
    _generatePoints(centerPt) {
        let pts = [
            { x: 0.25, y: 0.6 },
            { x: 1, y: 0 },
            { x: 2, y: 1.1 },
            { x: 3, y: 0 },
            { x: 3.75, y: 0.6 },
            { x: 2.66, y: 1.75 },
            { x: 3.75, y: 2.9 },
            { x: 3, y: 3.5 },
            { x: 2, y: 2.5 },
            { x: 1, y: 3.5 },
            { x: 0.25, y: 2.9 },
            { x: 1.33, y: 1.75 }
        ];
        for (let pt of pts) {
            pt.x += centerPt.x;
            pt.y += centerPt.y;
        }
        return pts;
    }
}
exports.ExElement = ExElement;
