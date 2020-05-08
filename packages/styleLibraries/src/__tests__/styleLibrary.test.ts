import { IFlatStyles, stringifyStyles } from "@toolkip/style-helpers";
import { StyleLibrary } from '..';
import { stripSpaces } from "@toolkip/primitive-helpers";
import { nextRender } from "@toolkip/async";

const stylesA: IFlatStyles = {
    ".one": {
        "fontSize": "10em",
        "color": "#FFF"
    },

    ".two": {
        "fontFamily": "Arial"
    }
}

const stylesB: IFlatStyles = {
    ".two": {
        "backgroundColor": "#333"
    },

    ".two .three": {
        "display": "flex",
        "flexDirection": "row",
        alignItems: "center"
    }
}

describe('styleLibrary', () => {
    it('adds a single style', () => {
        StyleLibrary.add("A", stylesA);
        expect(StyleLibrary['_rawStyles']).toMatchObject({ "A": stylesA });
    })

    it("doesn't add styles with the same key without the force flag", () => {
        StyleLibrary.add("test", stylesA);
        StyleLibrary.add("test", stylesB);
        expect(StyleLibrary["_rawStyles"].test).toMatchObject(stylesA);
        expect(StyleLibrary["_elems"].test.innerHTML)
            .toEqual(stringifyStyles(stylesA)[0]);
    })

    it('it adds multiple distinct styles to rawStyles appropriately', () => {
        StyleLibrary.add("A", stylesA);
        StyleLibrary.add("B", stylesB);
        expect(StyleLibrary['_rawStyles']).toMatchObject({
            "A": stylesA,
            "B": stylesB
        });
    })

    it('merges styles as needed', () => {
        StyleLibrary.add("allStyles", stylesA);
        StyleLibrary.add("allStyles", stylesB, true);
        expect(StyleLibrary["_rawStyles"]).toMatchObject({
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
        })
    })

    it ('renders a style element', () => {
        StyleLibrary.add("A", stylesA);

        const elem = StyleLibrary["_elems"].A;
        expect(elem).toBeInstanceOf(HTMLStyleElement);

        const trimmedContent = stripSpaces(elem.innerHTML);
        const expectedContent = stripSpaces(stringifyStyles(stylesA)[0]);
        expect(trimmedContent).toEqual(expectedContent);
    })

    it('renders separate style elements per unique key', () => {
        StyleLibrary.add("A", stylesA);
        StyleLibrary.add("B", stylesB);
        expect(StyleLibrary["_elems"]).toHaveProperty("A");
        expect(StyleLibrary["_elems"]).toHaveProperty("B");

        const elem = StyleLibrary["_elems"].B;
        const trimmedContent = stripSpaces(elem.innerHTML);
        const expectedContent = stripSpaces(stringifyStyles(stylesB)[0]);
        expect(trimmedContent).toEqual(expectedContent);
    });

    it("renders the style element into the document", async () =>{
        StyleLibrary.add("A", stylesA);
        const elem = StyleLibrary["_elems"].A;
        expect(elem.parentNode).toBeFalsy();
        await nextRender();
        await nextRender();
        expect(elem.parentNode).toEqual(document.head);
    });

    it("removes a set of styles", () => {
        StyleLibrary.add("test", stylesA);
        expect(StyleLibrary["_rawStyles"]).toMatchObject({ test: stylesA });
        StyleLibrary.remove("test");
        expect(StyleLibrary["_rawStyles"]).toMatchObject({});
    });

})