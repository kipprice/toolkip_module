import { _Stylable } from "..";
import { IStandardStyles } from "@kipprice/toolkip-style-helpers";
import { StyleLibrary, PlaceholderLibrary } from "@kipprice/toolkip-style-libraries";

// taken from this stack overflow post:
// https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
export function setupMatchMedia() {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
}

class SampleStylable extends _Stylable<"color" | "width"> {
    //..................
    //#region STYLES
    
    protected static _uncoloredStyles: IStandardStyles = {
        
        ".base": {
            fontSize: "4em",
            color: "<color>",

            nested: {
                "div": {
                    backgroundColor: "#000"
                },

                ".container": {
                    display: "flex",
                    width: "<width>"
                },

                "&:hover": {
                    transform: "scale(1.1)"
                }
            }
        }
    }
    
    //#endregion
    //..................
}

class SiblingStylable extends _Stylable {
    protected static _uncoloredStyles = {
        ".parent": {
            alignItems: "center",

            nested: {
                ".sibling": {
                    fontWeight: "bold"
                }
            }
        }
    }
}

class ParentStylable extends _Stylable {
    protected static _uncoloredStyles = {
        ".parent": {
            display: "flex"
        }
    }
}

class DependentStylable extends _Stylable {
    protected static _styleDependencies = [
        ParentStylable,
        SiblingStylable
    ];
}

describe("stylable -> Stylable", () => {
    beforeAll(() => {
        setupMatchMedia();
        new SampleStylable();
    });

    it("registers styles with the appropriate libraries", () => {
        
        const styleLib = StyleLibrary["_rawStyles"];
        const placeholderLib = PlaceholderLibrary["_rawStyles"];

        // styles exist at all
        expect(styleLib).toHaveProperty("SampleStylable")
        expect(placeholderLib).toHaveProperty("SampleStylable");
    })

    it ("appropriately flattens provided styles", () => {
        const sampleStyles = StyleLibrary["_rawStyles"].SampleStylable;
        expect(sampleStyles[".base div"]).toBeTruthy();
        expect(sampleStyles[".base .container"]).toBeTruthy();
        expect(sampleStyles[".base:hover"]).toBeTruthy();
    })

    it("sppropriately splits out placeholders", () => { 
        const sampleStyles = StyleLibrary["_rawStyles"].SampleStylable;
        const samplePlaceholders = PlaceholderLibrary["_rawStyles"].SampleStylable;

        expect(sampleStyles[".base"]).not.toHaveProperty("color");
        expect(samplePlaceholders[".base"]).toHaveProperty("color");
    })

    it("merges in new themes into the libraries", () => {
        let s = new SampleStylable();
        s.mergeInStyles({
            ".test": {
                fontFamily: "Arial",
                color: "<color>"
            }
        });

        const sampleStyles = StyleLibrary["_rawStyles"].SampleStylable
        
        expect(sampleStyles[".test"]).toBeTruthy();
        expect(sampleStyles[".test"]).toMatchObject({ fontFamily: "Arial" });

        const samplePlaceholders = PlaceholderLibrary["_rawStyles"].SampleStylable
        expect(samplePlaceholders[".test"]).toBeTruthy();
        expect(samplePlaceholders[".test"]).toMatchObject({ color: "<color>" });
    })

    it("loads dependencies as expected", () => {
        let d = new DependentStylable();
        expect(StyleLibrary["_rawStyles"]).toHaveProperty("ParentStylable");
        expect(StyleLibrary["_rawStyles"]).toHaveProperty("SiblingStylable");
    })
})