import { IStandardStyles, ICustomFonts } from ".."
import { combineStyles } from '@kipprice/toolkip-combiner"

describe("styleHelpers --> combiner.ts", () => {
    it("combines standard styles appropriately", () => {
        let styleA: IStandardStyles = {
            ".primary": {
                color: "#FFF"
            },
            ".secondary": {
                fontFamily: "Arial"
            }
        }

        let styleB: IStandardStyles = {
            ".primary": {
                backgroundColor: "#333"
            },

            ".secondary": {
                fontFamily: "Calibri"
            },

            ".tertiary": {
                padding: "10px"
            }
        }

        let combo = combineStyles(styleA, styleB);
        let expected = {
            ".primary": {
                color: "#FFF",
                backgroundColor: "#333"
            },

            ".secondary": {
                fontFamily: "Calibri"
            },

            ".tertiary": {
                padding: "10px"
            }
        }

        expect(combo).toMatchObject(expected);
    })

    it("combines fonts appropriately", () => {
        let fontsA: ICustomFonts = {
            "customA": [{ url: "test", format: "any" }],
            "customB": [{ url: "one", format: "any"}, { url: "two", format: "any"}]
        }

        let fontsB: ICustomFonts = {
            "customA": [{ url: "second", format: "any" }],
            "customC": [{ url: "url", format: "any" }]
        }

        let combo = combineStyles(fontsA, fontsB);
        let expected = {
            "customA": [{ url: "test", format: "any" }, { url: "second", format: "any" }],
            "customB": [{ url: "one", format: "any"}, { url: "two", format: "any"}],
            "customC": [{ url: "url", format: "any" }]
        }

        expect(combo).toMatchObject(expected);
    })
})