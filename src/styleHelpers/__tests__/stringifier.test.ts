import { IStandardStyles, stringifyStyles } from ".."

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
    })
})