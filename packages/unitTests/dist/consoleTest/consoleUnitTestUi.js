"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testUi_1 = require("../testUi");
/**----------------------------------------------------------------------------
 * @class   ConsoleUnitTests
 * ----------------------------------------------------------------------------
 * Run all appropriate unit tests that can run in the console
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class ConsoleUnitTestUI extends testUi_1._TestUI {
    /**
     * render
     * ----------------------------------------------------------------------------
     * Renders the result of the test to the console
     */
    renderTest(result) {
        let content = this._buildTestString(result);
        if (result.pass) {
            console.info(content);
        }
        else {
            console.error(content);
        }
    }
    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Generate separator for groups
     */
    startGroup(groupName) {
        let headerStr = "";
        for (let i = 0; i < groupName.length + 2; i += 1) {
            headerStr += "=";
        }
        this._currentGroup = groupName;
        console.log("\n" + headerStr + "\n " + groupName + " \n" + headerStr);
    }
    /**
     * startSubgroup
     * ----------------------------------------------------------------------------
     * Generate separator for subgroups
     */
    startSubgroup(subgroupName) {
        let headerStr = "";
        for (let i = 0; i < subgroupName.length + 2; i += 1) {
            headerStr += "-";
        }
        this._currentSubgroup = subgroupName;
        console.log("\n " + subgroupName + " \n" + headerStr);
    }
    /**
     * _buildTestString
     * ----------------------------------------------------------------------------
     * Creates a test element for the div with the specified results
     * @returns	The string displaying the result of the test
     */
    _buildTestString(result) {
        let content = "";
        let value = this._buildValueString(result);
        content += this._passToString(result.pass).toUpperCase();
        content += ": ";
        if (!result.pass) {
            content += this._currentGroup ? this._currentGroup + " --> " : "";
            content += this._currentSubgroup ? this._currentSubgroup + " --> " : "";
        }
        content += result.name;
        content += (!!value ? " [" + value + "]" : "");
        content += (result.message ? " - " + result.message : "");
        return content;
    }
}
exports.ConsoleUnitTestUI = ConsoleUnitTestUI;
