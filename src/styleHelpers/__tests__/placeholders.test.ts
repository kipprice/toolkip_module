import { IFlatStyles, SplitStyles, splitStyles, findContainedPlaceholder, indexByPlaceholder, replacePlaceholders, combineStyles, mapIndexToStyle } from ".."

const styles = {
    ".primary": {
        color: "#FFF",
        backgroundColor: "<hello>"
    },

    ".secondary": {
        color: "<hello>",
        backgroundColor: "<goodbye>",
        fontSize: "10em"
    },

    ".tertiary": {
        color: "#F00",
        fontFamily: "Arial"
    }
};

const secondaryStyles = {
    ".single": {
        font: "<hello>",
        width: "<goodbye>"
    }
}

const defaultPlaceholderStyles = {
    ".default": {
        backgroundColor: "<default:#444>"
    }
}

const index = {
    "hello": {
        "styles": {
            ".primary": {
                backgroundColor: true
            },
            ".secondary": {
                color: true
            }
        },

        "secondaryStyles": {
            ".single": {
                font: true
            }
        }
    },

    "goodbye": {
        "styles": {
            ".secondary": {
                backgroundColor: true
            }
        },
        "secondaryStyles": {
            ".single": {
                width :true
            }
        }
    }
}

describe('styleHelpers --> placeholders', () => {
    it('splits styles with placeholders from styles without', () => {
        let expected: SplitStyles = {
            standard: {
                ".primary": {
                    color: "#FFF"
                },

                ".secondary": {
                    fontSize: "10em"
                },

                ".tertiary": {
                    color: "#F00",
                    fontFamily: "Arial"
                }
            },

            withPlaceholders: {
                ".primary": {
                    backgroundColor: "<hello>"
                },

                ".secondary": {
                    color: "<hello>",
                    backgroundColor: "<goodbye>",
                }
            }
        }

        let result = splitStyles(styles);
        expect(result).toMatchObject(expected)
    })

    it('finds a placeholder appropriately', () => {
        let inputWithPlaceholder = "has <placeholder>!";
        let inputWithoutPlaceholder = "has no placeholder";

        expect(findContainedPlaceholder(inputWithPlaceholder)).toEqual("placeholder");
        expect(findContainedPlaceholder(inputWithoutPlaceholder)).toBeFalsy();
    })

    it('indexes by placeholder and key', () => {
        let idx = indexByPlaceholder({ styles, secondaryStyles });
        expect(idx).toMatchObject(index);
    })
    it('maps an index to real styles', () => {
        let merged = combineStyles(styles, secondaryStyles);
        let map = mapIndexToStyle(
            index["hello"]["secondaryStyles"],
            merged as IFlatStyles   
        )

        expect(map).toMatchObject({
            ".single": {
                font: "<hello>"
            }
        })
    })

    it("replaces default placeholders", () => {
        let replaced = replacePlaceholders(defaultPlaceholderStyles, "default", "#FFF");
        const expected = {
            ".default": {
                backgroundColor: "#FFF"
            }
        }
        expect(replaced).toMatchObject(expected);
    })

    it('replaces placeholders', () => {
        let expected = {
            ".primary": {
                color: "#FFF",
                backgroundColor: "kip"
            },
        
            ".secondary": {
                color: "kip",
                backgroundColor: "<goodbye>",
                fontSize: "10em"
            },
        
            ".tertiary": {
                color: "#F00",
                fontFamily: "Arial"
            }
        }

        let replacedVersion = replacePlaceholders(styles, "hello", "kip");
        expect(replacedVersion).toMatchObject(expected);
    });

    
})