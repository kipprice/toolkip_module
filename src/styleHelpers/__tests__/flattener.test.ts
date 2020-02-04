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
})