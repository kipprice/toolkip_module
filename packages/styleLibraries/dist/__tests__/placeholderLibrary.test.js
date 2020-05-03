"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
// import { createElement } from "@kipprice/toolkip-create-elements";
const stylesA = {
    ".one": {
        backgroundColor: "<bg>",
        fontSize: "<size>"
    },
    ".two": {
        color: "<bg>",
        width: "<width>"
    }
};
const stylesB = {
    ".any": {
        fontSize: "<size>"
    },
    ".two": {
        fontSize: "<size>"
    }
};
describe('placeholderLibrary', () => {
    beforeAll(() => {
        __1.PlaceholderLibrary.add("A", stylesA);
        __1.PlaceholderLibrary.add("B", stylesB);
    });
    beforeEach(() => {
        __1.PlaceholderLibrary.replacePlaceholder({
            newValue: "<size>",
            placeholder: "size",
        });
    });
    it("indexes styles by placeholder", () => {
        __1.PlaceholderLibrary.add("test", stylesB);
        expect(__1.PlaceholderLibrary["_indexedPlaceholders"]).toMatchObject({
            size: {
                test: {
                    ".any": {
                        fontSize: true
                    },
                    ".two": {
                        fontSize: true
                    }
                }
            }
        });
    });
    it("merges styles with the same placeholder", () => {
        expect(__1.PlaceholderLibrary["_indexedPlaceholders"].size).toMatchObject({
            A: {
                ".one": {
                    fontSize: true
                }
            },
            B: {
                ".any": {
                    fontSize: true
                },
                ".two": {
                    fontSize: true
                }
            }
        });
    });
    it("creates elements per placeholder + unique key", () => {
        expect(__1.PlaceholderLibrary["_elems"]).toHaveProperty("A-bg");
        expect(__1.PlaceholderLibrary["_elems"]).toHaveProperty("A-size");
        expect(__1.PlaceholderLibrary["_elems"]).toHaveProperty("A-width");
    });
    it("replaces placeholders globally", () => {
        __1.PlaceholderLibrary.replacePlaceholder({
            newValue: "10rem",
            placeholder: "size"
        });
        expect(__1.PlaceholderLibrary["_elems"]["A-size"].innerHTML)
            .toEqual(toolkip_style_helpers_1.stringifyStyles({ ".one": { fontSize: "10rem" } })[0]);
        expect(__1.PlaceholderLibrary["_elems"]["B-size"].innerHTML)
            .toEqual(toolkip_style_helpers_1.stringifyStyles({
            ".any": { fontSize: "10rem" },
            ".two": { fontSize: "10rem" }
        })[0]);
    });
    it("replaces placeholders within a unique key", () => {
        __1.PlaceholderLibrary.replacePlaceholder({
            newValue: "5rem",
            placeholder: "size",
            uniqueKey: "A"
        });
        expect(__1.PlaceholderLibrary["_elems"]["A-size"].innerHTML)
            .toEqual(toolkip_style_helpers_1.stringifyStyles({ ".one": { fontSize: "5rem" } })[0]);
        expect(__1.PlaceholderLibrary["_elems"]["B-size"].innerHTML)
            .toEqual(toolkip_style_helpers_1.stringifyStyles({
            ".any": { fontSize: "<size>" },
            ".two": { fontSize: "<size>" }
        })[0]);
    });
    // it("replaces a single element's placeholders", () => {
    //     const elem = createElement({ cls: "one"})
    //     PlaceholderLibrary.replacePlaceholder({
    //         newValue: "#FFF",
    //         placeholder: "bg",
    //         uniqueKey: "A",
    //         baseElem: elem
    //     });
    //     expect(elem.style.backgroundColor).toEqual("rgb(255, 255, 255)");
    //     const styleElem = PlaceholderLibrary["_elems"]["A-bg"].innerHTML
    //     const stringified = stringifyStyles({ ".one": { backgroundColor: "<bg>" }, ".two": { color: "<bg>"} })[0]
    //     expect(styleElem).toEqual(stringified)
    // })
});
