import { IStandardStyles, flattenStyles } from ".."

describe('styleHelpers --> flattener', () => {
    it("flattens a set of css styles", () => {
        let unflattened: IStandardStyles = {
            ".a": {
                fontSize: "10em",

                nested: {
                    ".b": {
                        nested: {
                            ".c": {
                                fontFamily: "Arial"
                            },

                            ".mobile &": {
                                width: "10rem"
                            }
                        }
                    }
                }
            }
        }

        let expected = {
            ".a": {
                fontSize: "10em"
            },

            ".a .b .c": {
                fontFamily: "Arial"
            },

            ".mobile .a .b": {
                width: "10rem"
            }
        }

        let flattened = flattenStyles(unflattened);
        expect(flattened).toMatchObject(expected);
    })

    it("handles already-flat styles", () => {
        let preFlattened: IStandardStyles = {
            "a": {
                color: "#FFF"
            },

            "a:hover": {
                textDecoration: "underline"
            }
        };

        let flattened = flattenStyles(preFlattened);
        expect(flattened).toMatchObject(preFlattened);
    })
})