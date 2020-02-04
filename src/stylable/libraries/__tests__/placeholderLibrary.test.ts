import { IFlatStyles } from "../../..";
import { PlaceholderLibrary } from "../placeholderlibrary";

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

    it("merges styles with the same placeholder"), () => {
        PlaceholderLibrary.add("A", stylesA);
        PlaceholderLibrary.add("B", stylesB);

        expect(PlaceholderLibrary["_indexedPlaceholders"].size).toMatchObject({
            A: {
                ".one": {
                    fontSize: "<size>"
                }
            },

            B: {
                ".any": {
                    fontSize: "<size>"
                },
            
                ".two": {
                    fontSize: "<size>"
                }
            }
        })
    }

    it("creates elements per placeholder + unique key", () => {
        PlaceholderLibrary.add("test", stylesA);
        expect(PlaceholderLibrary["_elems"]).toHaveProperty("test-bg");
        expect(PlaceholderLibrary["_elems"]).toHaveProperty("test-size");
        expect(PlaceholderLibrary["_elems"]).toHaveProperty("test-width");
    });

    it("replaces placeholders globally", () => {
        
    })

    it("replaces placeholders within a unique key", () => {

    })
    
    it("replaces a single element's placeholders", () => {

    })
})