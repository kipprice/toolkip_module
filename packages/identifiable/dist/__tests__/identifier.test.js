"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe("identifier", () => {
    beforeEach(() => {
        __1.IdentifierAssigner.reset();
    });
    it("registers a new id under the default prefix", () => {
        const id = __1.generateUniqueId();
        expect(id).toEqual("1-id");
        expect(__1.IdentifierAssigner.getLastId("id")).toEqual(1);
    });
    it("registers a new id under the ", () => {
        const genericId = __1.generateUniqueId();
        const testId = __1.generateUniqueId("test");
        expect(genericId).toEqual("1-id");
        expect(testId).toEqual("1-test");
    });
    it("updates the total count", () => {
        __1.generateUniqueId();
        __1.generateUniqueId();
        const id = __1.generateUniqueId();
        expect(id).toEqual("3-id");
    });
    it("updates an id with a later id", () => {
        __1.generateUniqueId();
        __1.generateUniqueId();
        __1.generateUniqueId();
        // last ID should at this point be 3
        const idToUpdate = "10-id";
        const result = __1.registerUniqueId(idToUpdate);
        expect(result).toBeTruthy();
        expect(__1.IdentifierAssigner.getLastId("id")).toEqual(10);
    });
    it("doesn't update a lesser id", () => {
        __1.generateUniqueId();
        __1.generateUniqueId();
        __1.generateUniqueId();
        // last ID should at this point be 3
        const idToUpdate = "2-id";
        const result = __1.registerUniqueId(idToUpdate);
        expect(result).toBeFalsy();
        expect(__1.IdentifierAssigner.getLastId("id")).toEqual(3);
    });
    it("doesn't update a non numeric id", () => {
        __1.generateUniqueId();
        __1.generateUniqueId();
        __1.generateUniqueId();
        // last ID should at this point be 3
        const idToUpdate = "abc-id";
        const result = __1.registerUniqueId(idToUpdate);
        expect(result).toBeFalsy();
        expect(__1.IdentifierAssigner.getLastId("id")).toEqual(3);
    });
    it("handles a non-prefixed id", () => {
        __1.generateUniqueId();
        __1.generateUniqueId();
        __1.generateUniqueId();
        // last ID should at this point be 3
        const idToUpdate = "10";
        const result = __1.registerUniqueId(idToUpdate);
        expect(result).toBeTruthy();
        expect(__1.IdentifierAssigner.getLastId("id")).toEqual(10);
    });
});
