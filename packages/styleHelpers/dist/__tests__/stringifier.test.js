"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const strip = (toStrip) => toStrip.replace(/[\t\n]/g, "");
describe("styleHelpers -> stringifier -> stringifyStyles", () => {
    it("stringifies a simple class", () => {
        let cls = {
            ".primary": {
                fontFamily: "Arial"
            }
        };
        let expected = ".primary {font-family : Arial;}";
        let stringified = strip(__1.stringifyStyles(cls)[0]);
        expect(stringified).toEqual(expected);
    });
    it("stringifies a set of classes", () => {
        let classes = {
            ".primary": { fontFamily: "Arial" },
            ".secondary": { fontSize: "2em" }
        };
        let expected = ".primary {font-family : Arial;}" +
            ".secondary {font-size : 2em;}";
        let stringified = strip(__1.stringifyStyles(classes)[0]);
        expect(stringified).toEqual(expected);
    });
    it('stringifies a set of fonts', () => {
        let fonts = {
            "font": [
                { format: "fmt", url: "url" },
                { format: "fmt2", url: "url2" }
            ]
        };
        let expected = "@font-face {font-family : font;src : url(url) format(fmt),url(url2) format(fmt2);}";
        let stringified = strip(__1.stringifyStyles(fonts)[0]);
        expect(stringified).toEqual(expected);
    });
});
describe("styleHelpers -> stringifier -> stringifyStyle", () => {
    it('stringifies a simple class', () => {
        expect(strip(__1.stringifyStyle(".primary", { "fontFamily": "Arial" })))
            .toEqual(".primary {font-family : Arial;}");
    });
    it('stringifies an animation appropriately', () => {
        const expected = '@keyframes rotate {' +
            'from {transform : rotate(0deg);}' +
            'to {transform : rotate(360deg);}' +
            '}';
        const stringified = strip(__1.stringifyStyle("@keyframes rotate", {
            from: {
                transform: "rotate(0deg)"
            },
            to: {
                transform: "rotate(360deg)"
            }
        }));
        expect(stringified).toEqual(expected);
    });
    it("renders a default value for a placeholder", () => {
        let style = { boxShadow: "0 1px 5px 3px <shadow:rgba(0,0,0,.2)>" };
        let expected = ".test {box-shadow : 0 1px 5px 3px rgba(0,0,0,.2);}";
        let stringified = strip(__1.stringifyStyle(".test", style));
        expect(stringified).toEqual(expected);
    });
    it("renders the placeholder when there is no default value", () => {
        let style = { boxShadow: "0 1px 5px 3px <shadow>" };
        let expected = ".test {box-shadow : 0 1px 5px 3px <shadow>;}";
        let stringified = strip(__1.stringifyStyle(".test", style));
        expect(stringified).toEqual(expected);
    });
});
describe("styleHelpers -> stringifier -> getCssPropertyName", () => {
    it('gets an appropriate CSS property name when js version == css version', () => {
        expect(__1.getCssPropertyName("display")).toEqual("display");
    });
    it('gets an appropriate CSS property name when JS version != CSS version (no prefixes)', () => {
        expect(__1.getCssPropertyName("fontSize")).toEqual("font-size");
    });
    it('gets an appropriately webkit prefixed CSS property name', () => {
        expect(__1.getCssPropertyName("webkitAnimation")).toEqual("-webkit-animation");
    });
    it('gets an appropriately moz prefixed CSS property name', () => {
        expect(__1.getCssPropertyName("mozAppearance")).toEqual("-moz-appearance");
    });
    it('gets an appropriately ms prefixed CSS property name', () => {
        expect(__1.getCssPropertyName("msContentZoomChaining")).toEqual("-ms-content-zoom-chaining");
    });
    it('gets an appropriately opera prefixed CSS property name', () => {
        // there aren't actually any o-prefixed properties, but keeping in case
        // there is some old code that needs it
        expect(__1.getCssPropertyName("oAnimation")).toEqual("-o-animation");
    });
    it('gets an appropriately non prefixed CSS property name', () => {
        expect(__1.getCssPropertyName("opacity")).toEqual("opacity");
    });
});
