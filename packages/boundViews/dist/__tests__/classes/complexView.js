"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _shared_1 = require("./_shared");
const simpleview_1 = require("./simpleview");
class ComplexBoundView extends _shared_1.SampleBV {
    get elems() { return this._elems; }
    _createElements() {
        this._createBase({
            key: "base",
            children: [
                { key: "childArray", bindTo: {
                        key: 'childArray',
                        mapToDrawable: simpleview_1.SimpleBoundView
                    } },
                { key: "childDict", bindTo: {
                        key: 'childDict',
                        mapToDrawable: () => new simpleview_1.SimpleBoundView()
                    } },
                { key: "coreChild", bindTo: "coreChild", drawable: simpleview_1.SimpleBoundView }
            ]
        });
        this.setUpdateFunction("coreChild", (v, e) => {
            this._updateElem(v, e);
        });
    }
}
exports.ComplexBoundView = ComplexBoundView;
