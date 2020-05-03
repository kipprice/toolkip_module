"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const __1 = require("..");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
const toolkip_async_1 = require("@kipprice/toolkip-async");
const stylesA = {
    ".one": {
        "fontSize": "10em",
        "color": "#FFF"
    },
    ".two": {
        "fontFamily": "Arial"
    }
};
const stylesB = {
    ".two": {
        "backgroundColor": "#333"
    },
    ".two .three": {
        "display": "flex",
        "flexDirection": "row",
        alignItems: "center"
    }
};
describe('styleLibrary', () => {
    it('adds a single style', () => {
        __1.StyleLibrary.add("A", stylesA);
        expect(__1.StyleLibrary['_rawStyles']).toMatchObject({ "A": stylesA });
    });
    it("doesn't add styles with the same key without the force flag", () => {
        __1.StyleLibrary.add("test", stylesA);
        __1.StyleLibrary.add("test", stylesB);
        expect(__1.StyleLibrary["_rawStyles"].test).toMatchObject(stylesA);
        expect(__1.StyleLibrary["_elems"].test.innerHTML)
            .toEqual(toolkip_style_helpers_1.stringifyStyles(stylesA)[0]);
    });
    it('it adds multiple distinct styles to rawStyles appropriately', () => {
        __1.StyleLibrary.add("A", stylesA);
        __1.StyleLibrary.add("B", stylesB);
        expect(__1.StyleLibrary['_rawStyles']).toMatchObject({
            "A": stylesA,
            "B": stylesB
        });
    });
    it('merges styles as needed', () => {
        __1.StyleLibrary.add("allStyles", stylesA);
        __1.StyleLibrary.add("allStyles", stylesB, true);
        expect(__1.StyleLibrary["_rawStyles"]).toMatchObject({
            "allStyles": {
                ".one": {
                    fontSize: "10em",
                    color: "#FFF"
                },
                ".two": {
                    fontFamily: "Arial",
                    backgroundColor: "#333"
                },
                ".two .three": {
                    "display": "flex",
                    "flexDirection": "row",
                    alignItems: "center"
                }
            }
        });
    });
    it('renders a style element', () => {
        __1.StyleLibrary.add("A", stylesA);
        const elem = __1.StyleLibrary["_elems"].A;
        expect(elem).toBeInstanceOf(HTMLStyleElement);
        const trimmedContent = toolkip_primitive_helpers_1.stripSpaces(elem.innerHTML);
        const expectedContent = toolkip_primitive_helpers_1.stripSpaces(toolkip_style_helpers_1.stringifyStyles(stylesA)[0]);
        expect(trimmedContent).toEqual(expectedContent);
    });
    it('renders separate style elements per unique key', () => {
        __1.StyleLibrary.add("A", stylesA);
        __1.StyleLibrary.add("B", stylesB);
        expect(__1.StyleLibrary["_elems"]).toHaveProperty("A");
        expect(__1.StyleLibrary["_elems"]).toHaveProperty("B");
        const elem = __1.StyleLibrary["_elems"].B;
        const trimmedContent = toolkip_primitive_helpers_1.stripSpaces(elem.innerHTML);
        const expectedContent = toolkip_primitive_helpers_1.stripSpaces(toolkip_style_helpers_1.stringifyStyles(stylesB)[0]);
        expect(trimmedContent).toEqual(expectedContent);
    });
    it("renders the style element into the document", () => __awaiter(void 0, void 0, void 0, function* () {
        __1.StyleLibrary.add("A", stylesA);
        const elem = __1.StyleLibrary["_elems"].A;
        expect(elem.parentNode).toBeFalsy();
        yield toolkip_async_1.nextRender();
        yield toolkip_async_1.nextRender();
        expect(elem.parentNode).toEqual(document.head);
    }));
    it("removes a set of styles", () => {
        __1.StyleLibrary.add("test", stylesA);
        expect(__1.StyleLibrary["_rawStyles"]).toMatchObject({ test: stylesA });
        __1.StyleLibrary.remove("test");
        expect(__1.StyleLibrary["_rawStyles"]).toMatchObject({});
    });
});
