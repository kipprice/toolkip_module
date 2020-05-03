import { PlaceholderLibrary } from '@kipprice/toolkip-placeholderlibrary";
import { stringifyStyles, IFlatStyles } from "../../styleHelpers";
import { createElement } from "../../createElements";

const stylesA: IFlatStyles = {
    ".one": {
        backgroundColor: "<bg>",
        fontSize: "<size>"
    },

    ".two": {
        color: "<bg>",
        width: "<width>"
    }
}

const stylesB: IFlatStyles = {
    ".any": {
        fontSize: "<size>"
    },

    ".two": {
        fontSize: "<size>"
    }
}

describe('placeholderLibrary', () => {
    beforeAll(() => {
        PlaceholderLibrary.add("A", stylesA);
        PlaceholderLibrary.add("B", stylesB);
    });

    beforeEach(() => {
        PlaceholderLibrary.replacePlaceholder({
            newValue: "<size>",
            placeholder: "size",
        });
    })

    it("indexes styles by placeholder", () => {
        PlaceholderLibrary.add("test", stylesB);
        expect(PlaceholderLibrary["_indexedPlaceholders"]).toMatchObject({
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
        })
    });

    it("merges styles with the same placeholder", () => {
        

        expect(PlaceholderLibrary["_indexedPlaceholders"].size).toMatchObject({
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
        })
    });

    it("creates elements per placeholder + unique key", () => {
        expect(PlaceholderLibrary["_elems"]).toHaveProperty("A-bg");
        expect(PlaceholderLibrary["_elems"]).toHaveProperty("A-size");
        expect(PlaceholderLibrary["_elems"]).toHaveProperty("A-width");
    });


    it("replaces placeholders globally", () => {
        PlaceholderLibrary.replacePlaceholder({ 
            newValue: "10rem",
            placeholder: "size"
        });

        expect(PlaceholderLibrary["_elems"]["A-size"].innerHTML)
            .toEqual(stringifyStyles({ ".one": { fontSize: "10rem" } })[0]);

        expect(PlaceholderLibrary["_elems"]["B-size"].innerHTML)
            .toEqual(stringifyStyles({ 
                ".any": { fontSize: "10rem" },
                ".two": { fontSize: "10rem" } 
            } )[0]);
    })

    it("replaces placeholders within a unique key", () => {

        PlaceholderLibrary.replacePlaceholder({ 
            newValue: "5rem",
            placeholder: "size",
            uniqueKey: "A"
        });

        expect(PlaceholderLibrary["_elems"]["A-size"].innerHTML)
            .toEqual(stringifyStyles({ ".one": { fontSize: "5rem" } })[0]);

        expect(PlaceholderLibrary["_elems"]["B-size"].innerHTML)
            .toEqual(stringifyStyles({ 
                ".any": { fontSize: "<size>" },
                ".two": { fontSize: "<size>" } 
            } )[0]);
    })
    
    it("replaces a single element's placeholders", () => {
        const elem = createElement({ cls: "one"})
        
        PlaceholderLibrary.replacePlaceholder({
            newValue: "#FFF",
            placeholder: "bg",
            uniqueKey: "A",
            baseElem: elem
        });

        expect(elem.style.backgroundColor).toEqual("rgb(255, 255, 255)");

        const styleElem = PlaceholderLibrary["_elems"]["A-bg"].innerHTML
        const stringified = stringifyStyles({ ".one": { backgroundColor: "<bg>" }, ".two": { color: "<bg>"} })[0]
        expect(styleElem).toEqual(stringified)
    })
})