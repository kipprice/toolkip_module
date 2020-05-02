import { generateUniqueId, IdentifierAssigner, registerUniqueId } from "..";

describe("identifier", () => {
    beforeEach(() => {
        IdentifierAssigner.reset();
    })
    it("registers a new id under the default prefix", () => {
        const id = generateUniqueId();
        expect(id).toEqual("1-id");
        expect(IdentifierAssigner.getLastId("id")).toEqual(1);
    })

    it("registers a new id under the ", () => {
        const genericId = generateUniqueId();
        const testId = generateUniqueId("test");

        expect(genericId).toEqual("1-id");
        expect(testId).toEqual("1-test");
    })

    it("updates the total count", () => {
        generateUniqueId();
        generateUniqueId();
        const id = generateUniqueId();
        expect(id).toEqual("3-id");
    })

    it("updates an id with a later id", () => {
        generateUniqueId();
        generateUniqueId();
        generateUniqueId();
        // last ID should at this point be 3

        const idToUpdate = "10-id";
        const result = registerUniqueId(idToUpdate);
        expect(result).toBeTruthy();
        expect(IdentifierAssigner.getLastId("id")).toEqual(10);
    });

    it("doesn't update a lesser id", () => {
        generateUniqueId();
        generateUniqueId();
        generateUniqueId();
        // last ID should at this point be 3

        const idToUpdate = "2-id";
        const result = registerUniqueId(idToUpdate);
        expect(result).toBeFalsy();
        expect(IdentifierAssigner.getLastId("id")).toEqual(3);
    })

    it("doesn't update a non numeric id", () => {
        generateUniqueId();
        generateUniqueId();
        generateUniqueId();
        // last ID should at this point be 3

        const idToUpdate = "abc-id";
        const result = registerUniqueId(idToUpdate);
        expect(result).toBeFalsy();
        expect(IdentifierAssigner.getLastId("id")).toEqual(3);
    })

    it("handles a non-prefixed id", () => {
        generateUniqueId();
        generateUniqueId();
        generateUniqueId();
        // last ID should at this point be 3

        const idToUpdate = "10";
        const result = registerUniqueId(idToUpdate);
        expect(result).toBeTruthy();
        expect(IdentifierAssigner.getLastId("id")).toEqual(10);
    })
})