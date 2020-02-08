import { ICustomFonts, stringifyStyles } from "../../../styleHelpers"
import { FontLibrary } from "../fontLibrary"

const fontsA: ICustomFonts = {
    "serif": [{
        format: 'fmt',
        url: 'url'
    }],

    "sanSerif": [{
        format: "fmt",
        url: "url"
    }]
}

const fontsB: ICustomFonts = {
    "sanSerif": [{
        format: 'other',
        url: "other"
    }]
}

describe('font library', () => {
    it('adds fonts appropriately', () => {
        FontLibrary.add("A", fontsA);
        expect(FontLibrary["_rawStyles"].A).toMatchObject(fontsA);
        expect(FontLibrary["_elems"].A.innerHTML).toEqual(stringifyStyles(fontsA)[0])
    })

    it('consolidates multiple fonts', () => {
        FontLibrary.add("test", fontsA);
        FontLibrary.add("test", fontsB, true);
        expect(FontLibrary["_rawStyles"].test)
            .toMatchObject({
                serif: fontsA.serif,
                sanSerif: [
                    fontsA.sanSerif[0],
                    fontsB.sanSerif[0]
                ]
            });

        expect(FontLibrary["_elems"].test.innerHTML)
            .toEqual(stringifyStyles(
                {
                    serif: fontsA.serif,
                    sanSerif: [
                        fontsA.sanSerif[0],
                        fontsB.sanSerif[0]
                    ]
                }
            )[0])
    });
})