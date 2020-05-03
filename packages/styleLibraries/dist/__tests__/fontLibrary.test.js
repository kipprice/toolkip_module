"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const __1 = require("..");
const fontsA = {
    "serif": [{
            format: 'fmt',
            url: 'url'
        }],
    "sanSerif": [{
            format: "fmt",
            url: "url"
        }]
};
const fontsB = {
    "sanSerif": [{
            format: 'other',
            url: "other"
        }]
};
describe('font library', () => {
    it('adds fonts appropriately', () => {
        __1.FontLibrary.add("A", fontsA);
        expect(__1.FontLibrary["_rawStyles"].A).toMatchObject(fontsA);
        expect(__1.FontLibrary["_elems"].A.innerHTML).toEqual(toolkip_style_helpers_1.stringifyStyles(fontsA)[0]);
    });
    it('consolidates multiple fonts', () => {
        __1.FontLibrary.add("test", fontsA);
        __1.FontLibrary.add("test", fontsB, true);
        expect(__1.FontLibrary["_rawStyles"].test)
            .toMatchObject({
            serif: fontsA.serif,
            sanSerif: [
                fontsA.sanSerif[0],
                fontsB.sanSerif[0]
            ]
        });
        expect(__1.FontLibrary["_elems"].test.innerHTML)
            .toEqual(toolkip_style_helpers_1.stringifyStyles({
            serif: fontsA.serif,
            sanSerif: [
                fontsA.sanSerif[0],
                fontsB.sanSerif[0]
            ]
        })[0]);
    });
});
