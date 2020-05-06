"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testUi_1 = require("../testUi");
const htmlUi_1 = require("./htmlUi");
/**----------------------------------------------------------------------------
 * @class   HTMLUnitTestUI
 * ----------------------------------------------------------------------------
 *
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class HTMLUnitTestUI extends testUi_1._TestUI {
    //#endregion
    /**
     * HTMLUnitTestUI
     * ----------------------------------------------------------------------------
     * Initialize the UI needed for the HTML Unit Tester
     */
    constructor() {
        super();
        this._drawable = new htmlUi_1.UI();
        this._drawable.draw(document.body);
    }
    /**
     * renderTest
     * ----------------------------------------------------------------------------
     * Show the results of the specified test
     */
    renderTest(result) {
        let extendedResults = result;
        extendedResults.value = this._buildValueString(result);
        extendedResults.passStr = this._passToString(result.pass);
        this._drawable.addTestResult(extendedResults);
    }
    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Create a group, labeled with the specified test
     */
    startGroup(groupName) {
        this._drawable.startGroup(groupName);
    }
    startSubgroup(subgroupName) {
        this._drawable.startSubgroup(subgroupName);
    }
    addVisualTestButton(btn) {
        this._drawable.addVisualButton(btn);
    }
}
exports.HTMLUnitTestUI = HTMLUnitTestUI;
