"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const toolkip_model_1 = require("@kipprice/toolkip-model");
describe("identfiable guards", () => {
    it("identfies an identifiable", () => {
        const identifiable = {
            greeting: "hello",
            id: "1-test"
        };
        const model = new IdModel(identifiable);
        expect(__1.isIdentifiableModel(model)).toEqual(true);
    });
    it("identifies a non-identifiable", () => {
        const identifiable = {
            greeting: "hello",
            id: "1-test"
        };
        const model = new Model(identifiable);
        expect(__1.isIdentifiableModel(model)).toEqual(false);
    });
});
class Model extends toolkip_model_1._Model {
    get greeting() { return this._greeting; }
    set greeting(data) { this._setValue("greeting", data); }
    get farewell() { return this._farewell; }
    set farewell(data) { this._setValue("farewell", data); }
}
class IdModel extends toolkip_model_1._Model {
    get greeting() { return this._greeting; }
    set greeting(data) { this._setValue("greeting", data); }
    get farewell() { return this._farewell; }
    set farewell(data) { this._setValue("farewell", data); }
    get id() { return this._id; }
    set id(data) { this._setValue("id", data); }
}
