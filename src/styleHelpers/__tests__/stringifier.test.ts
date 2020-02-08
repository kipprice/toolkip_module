import { IStandardStyles, stringifyStyles, ICustomFonts } from ".."

describe("styleHelpers -> stringifier", () => {
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
})