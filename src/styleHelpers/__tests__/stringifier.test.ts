import { IStandardStyles, stringifyStyles, ICustomFonts, getCssPropertyName, stringifyStyle } from ".."

describe("styleHelpers -> stringifier -> stringifyStyles", () => {
    it("stringifies a simple class", () => {
        let cls: IStandardStyles = {
            ".primary": {
                fontFamily: "Arial"
            }
        }

        let expected = "\t.primary {\n\t\tfont-family : Arial;\n}";
        let stringified = stringifyStyles(cls);
        expect(stringified[0]).toEqual(expected);
    });

    it('stringifies a set of fonts', () => {
        let fonts: ICustomFonts = {
            "font": [
                { format: "fmt", url: "url" },
                { format: "fmt2", url: "url2" }
            ]
        };

        let expected = "\t@font-face {\n\t\tfont-family : font;\n\t\tsrc : url(url) format(fmt),url(url2) format(fmt2);\n}";
        let stringified = stringifyStyles(fonts);
        expect(stringified[0]).toEqual(expected);
    })
});

describe("styleHelpers -> stringifier -> stringifyStyle", () => {
    it('stringifies a simple class', () => {
        expect(stringifyStyle(".primary", { "fontFamily": "Arial" } ))
            .toEqual("\t.primary {\n\t\tfont-family : Arial;\n}")
    })
})

describe("styleHelpers -> stringifier -> getCssPropertyName", () => {

    it('gets an appropriate CSS property name when js version == css version', () => {
        expect(getCssPropertyName("display")).toEqual("display");
    })

    it('gets an appropriate CSS property name when JS version != CSS version (no prefixes)', () => {
        expect(getCssPropertyName("fontSize")).toEqual("font-size");
    })

    it('gets an appropriately webkit prefixed CSS property name', () => {
        expect(getCssPropertyName("webkitAnimation")).toEqual("-webkit-animation")
    })

    it('gets an appropriately moz prefixed CSS property name', () => {
        expect(getCssPropertyName("mozAppearance")).toEqual("-moz-appearance")
    })

    it('gets an appropriately ms prefixed CSS property name', () => {
        expect(getCssPropertyName("msContentZoomChaining")).toEqual("-ms-content-zoom-chaining")
    })

    it('gets an appropriately opera prefixed CSS property name', () => {
        // there aren't actually any o-prefixed properties, but keeping in case
        // there is some old code that needs it
        expect(getCssPropertyName("oAnimation" as any)).toEqual("-o-animation")
    })

    it('gets an appropriately non prefixed CSS property name', () => {
        expect(getCssPropertyName("opacity")).toEqual("opacity")
    })
})