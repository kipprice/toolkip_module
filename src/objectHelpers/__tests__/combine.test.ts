import { combineObjects, reconcileOptions } from ".."

describe("objectHelpers -> combine", () => {
    describe("combineObjects", () => {
        const objA = {
            p1: true,
            p2: "string",
            p3: 15
        }
        
        const objB = {
            p2: "a different string",
            p4: { nested: true }
        }
        
        const objC = {
            p4: { other: "other" },
            p5: "test"
        }

        const objD = {
            p4: null
        }

        it("reconciles empty objects", () => {
            let out = combineObjects({}, {});
            expect(out).toMatchObject(out);
        })

        it("handles when the first object is falsy", () => {
            let out = combineObjects(null, objA);
            expect(out).toMatchObject({});
        })

        it("handles when the second object is falsy", () => {
            let out = combineObjects(objA, null);
            expect(out).toMatchObject({});
        })

        it("combines two objects without overlap", () => {
            let out = combineObjects(objA, objC);
            expect(out).toMatchObject({
                ...objA,
                ...objC
            });
        })

        it("combines two objects with overlap", () => {
            let out = combineObjects(objA, objB);
            expect(out).toMatchObject({
                ...objB,
                p1: true,
                p3: 15
            });
        });

        it("handles deep merge appropriately", () => {
            let out = combineObjects(objB, objC, true);
            expect(out).toMatchObject({
                p2: "a different string",
                p4: { nested: true, other: "other" },
                p5: "test"
            })
        })

        it("skips deep merge if appropriate", () => {
            let out = combineObjects(objB, objC);
            expect(out).toMatchObject({
                p2: "a different string",
                p4: { other: "other" },
                p5: "test"
            })
        })

        it("merges objects deeply even when the source is missing", () => {
            let out = combineObjects(objD, objC, true);
            expect(out).toMatchObject(objC);
        })

        it("skips values that are undefined", () => {
            let out = combineObjects(objC, objD, true);
            expect(out).toMatchObject(objC);
        })
    })

    describe("reconcileOptions", () => {
        
        const optsA = {
            optA: 10,
            optB: true
        }
        
        const optsB = {
            optA: 0,
            optB: false,
            optC: ""
        }
        
        it("reconciles empty defaults", () => {
            let out = reconcileOptions(optsA, {} as any);
            expect(out).toMatchObject(optsA);
        })

        it("reconciles empty options with defaults", () => {
            let out = reconcileOptions({} as any, optsA);
            expect(out).toMatchObject(optsA)
        })

        it("reconciles partially filled options with defaults when undefined / null", () => {
            let out = reconcileOptions(optsA, optsB);
            expect(out).toMatchObject({
                ...optsB,
                optA: 10,
                optB: true
            })
        })

        it("doesn't reconcile when values are falsy", () => {
            let out = reconcileOptions(optsB, optsA);
            expect(out).toMatchObject(optsB);
        })
    })
})