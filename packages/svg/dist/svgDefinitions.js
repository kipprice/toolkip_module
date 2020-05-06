"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const svgHelpers_1 = require("./svgHelpers");
class SVGDefinitionsElement extends toolkip_drawable_1._Drawable {
    constructor() {
        super();
        this._elems = {
            base: svgHelpers_1.createSVGElem({ type: "defs" })
        };
        this._createElements();
    }
    get base() { return this._elems.base; }
    get gradients() { return this._gradients; }
    set gradients(data) { this._gradients = data; }
    //#endregion
    _shouldSkipCreateElements() { return true; }
    _createElements() {
        this._addDropShadow();
    }
    _addDropShadow() {
        // Taken from this SO post: https://stackoverflow.com/questions/6088409/svg-drop-shadow-using-css3
        let def = {
            type: "filter",
            id: "dropshadow",
            attr: {
                width: "200%",
                height: "200%",
                x: "-50%",
                y: "-50%"
            },
            children: [
                {
                    type: "feGaussianBlur",
                    attr: {
                        in: "SourceAlpha",
                        stdDeviation: "0.5"
                    }
                },
                {
                    type: "feOffset",
                    attr: {
                        dx: "0.1",
                        dy: "0.1",
                        result: "offsetblur"
                    }
                },
                {
                    type: "feComponentTransfer",
                    children: [
                        {
                            type: "feFuncA",
                            attr: {
                                type: "gamma",
                                exponent: "1.2",
                                amplitude: "0.3"
                            }
                        }
                    ]
                },
                {
                    type: "feMerge",
                    children: [
                        {
                            type: "feMergeNode"
                        },
                        {
                            type: "feMergeNode",
                            attr: { in: "SourceGraphic" }
                        }
                    ]
                }
            ]
        };
        let filter = svgHelpers_1.createSVGElem(def);
        this._elems.base.appendChild(filter);
    }
}
exports.SVGDefinitionsElement = SVGDefinitionsElement;
