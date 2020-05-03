"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const toolkip_style_libraries_1 = require("@kipprice/toolkip-style-libraries");
// taken from this stack overflow post:
// https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
function setupMatchMedia() {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
}
exports.setupMatchMedia = setupMatchMedia;
class SampleStylable extends __1._Stylable {
}
//..................
//#region STYLES
SampleStylable._uncoloredStyles = {
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
};
class SiblingStylable extends __1._Stylable {
}
SiblingStylable._uncoloredStyles = {
    ".parent": {
        alignItems: "center",
        nested: {
            ".sibling": {
                fontWeight: "bold"
            }
        }
    }
};
class ParentStylable extends __1._Stylable {
}
ParentStylable._uncoloredStyles = {
    ".parent": {
        display: "flex"
    }
};
class DependentStylable extends __1._Stylable {
}
DependentStylable._styleDependencies = [
    ParentStylable,
    SiblingStylable
];
describe("stylable -> Stylable", () => {
    beforeAll(() => {
        setupMatchMedia();
        new SampleStylable();
    });
    it("registers styles with the appropriate libraries", () => {
        const styleLib = toolkip_style_libraries_1.StyleLibrary["_rawStyles"];
        const placeholderLib = toolkip_style_libraries_1.PlaceholderLibrary["_rawStyles"];
        // styles exist at all
        expect(styleLib).toHaveProperty("SampleStylable");
        expect(placeholderLib).toHaveProperty("SampleStylable");
    });
    it("appropriately flattens provided styles", () => {
        const sampleStyles = toolkip_style_libraries_1.StyleLibrary["_rawStyles"].SampleStylable;
        expect(sampleStyles[".base div"]).toBeTruthy();
        expect(sampleStyles[".base .container"]).toBeTruthy();
        expect(sampleStyles[".base:hover"]).toBeTruthy();
    });
    it("sppropriately splits out placeholders", () => {
        const sampleStyles = toolkip_style_libraries_1.StyleLibrary["_rawStyles"].SampleStylable;
        const samplePlaceholders = toolkip_style_libraries_1.PlaceholderLibrary["_rawStyles"].SampleStylable;
        expect(sampleStyles[".base"]).not.toHaveProperty("color");
        expect(samplePlaceholders[".base"]).toHaveProperty("color");
    });
    it("merges in new themes into the libraries", () => {
        let s = new SampleStylable();
        s.mergeInStyles({
            ".test": {
                fontFamily: "Arial",
                color: "<color>"
            }
        });
        const sampleStyles = toolkip_style_libraries_1.StyleLibrary["_rawStyles"].SampleStylable;
        expect(sampleStyles[".test"]).toBeTruthy();
        expect(sampleStyles[".test"]).toMatchObject({ fontFamily: "Arial" });
        const samplePlaceholders = toolkip_style_libraries_1.PlaceholderLibrary["_rawStyles"].SampleStylable;
        expect(samplePlaceholders[".test"]).toBeTruthy();
        expect(samplePlaceholders[".test"]).toMatchObject({ color: "<color>" });
    });
    it("loads dependencies as expected", () => {
        let d = new DependentStylable();
        expect(toolkip_style_libraries_1.StyleLibrary["_rawStyles"]).toHaveProperty("ParentStylable");
        expect(toolkip_style_libraries_1.StyleLibrary["_rawStyles"]).toHaveProperty("SiblingStylable");
    });
});
