import { IStandardStyles, stringifyStyles, ICustomFonts, getCssPropertyName, stringifyStyle } from ".."


const strip = (toStrip: string) => toStrip.replace(/[\t\n]/g, "");

describe("styleHelpers -> stringifier -> stringifyStyles", () => {
    it("stringifies a simple class", () => {
        let cls: IStandardStyles = {
            ".primary": {
                fontFamily: "Arial"
            }
        }

        let expected = ".primary {font-family : Arial;}";
        let stringified = strip(stringifyStyles(cls)[0]);
        expect(stringified).toEqual(expected);
    });

    it("stringifies a set of classes", () => {
        let classes: IStandardStyles = {
            ".primary" : { fontFamily: "Arial" },
            ".secondary": { fontSize: "2em" }
        }

        let expected = ".primary {font-family : Arial;}" +
                        ".secondary {font-size : 2em;}";
        let stringified = strip(stringifyStyles(classes)[0]);
        expect(stringified).toEqual(expected);
    })

    it('stringifies a set of fonts', () => {
        let fonts: ICustomFonts = {
            "font": [
                { format: "fmt", url: "url" },
                { format: "fmt2", url: "url2" }
            ]
        };

        let expected = "@font-face {font-family : font;src : url(url) format(fmt),url(url2) format(fmt2);}";
        let stringified = strip(stringifyStyles(fonts)[0]);
        expect(stringified).toEqual(expected);
    })
});

describe("styleHelpers -> stringifier -> stringifyStyle", () => {
    it('stringifies a simple class', () => {
        expect(strip(stringifyStyle(".primary", { "fontFamily": "Arial" } )))
            .toEqual(".primary {font-family : Arial;}")
    })

    it('stringifies an animation appropriately', () => {
        const expected = '@keyframes rotate {' +
                            'from {transform : rotate(0deg);}' + 
                            'to {transform : rotate(360deg);}' +
                        '}';

        const stringified = strip(stringifyStyle("@keyframes rotate", { 
            from: {
                transform: "rotate(0deg)"
            },
            to: {
                transform: "rotate(360deg)"
            }
         }));
         expect(stringified).toEqual(expected);
    })

    it("renders a default value for a placeholder", () => {
        let style = { boxShadow: "0 1px 5px 3px <shadow:rgba(0,0,0,.2)>"};
        let expected = ".test {box-shadow : 0 1px 5px 3px rgba(0,0,0,.2);}";
        let stringified = strip(stringifyStyle(".test", style));
        expect(stringified).toEqual(expected);
    })

    it("renders the placeholder when there is no default value", () => {
        let style = { boxShadow: "0 1px 5px 3px <shadow>"};
        let expected = ".test {box-shadow : 0 1px 5px 3px <shadow>;}";
        let stringified = strip(stringifyStyle(".test", style));
        expect(stringified).toEqual(expected);
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