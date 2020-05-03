"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _shared_1 = require("./_shared");
class SimpleBoundView extends _shared_1.SampleBV {
    get elems() { return this._elems; }
    _createElements() {
        this._createBase({
            key: "base",
            children: [
                { bindTo: "name", key: "name" },
                {
                    bindTo: {
                        key: "count",
                        func: (v, elem) => {
                            elem.innerHTML = "Total: " + v.toString();
                        }
                    },
                    key: "count"
                }
            ]
        });
    }
}
exports.SimpleBoundView = SimpleBoundView;
