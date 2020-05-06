"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../test");
const htmlUnitTestUi_1 = require("./htmlUnitTestUi");
/**----------------------------------------------------------------------------
 * @class	HTMLUnitTester
 * ----------------------------------------------------------------------------
 * Unit tester that renders results as HTML elements
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class HTMLUnitTester extends test_1._UnitTester {
    get _ui() {
        if (this.__ui) {
            return this.__ui;
        }
        this.__ui = new htmlUnitTestUi_1.HTMLUnitTestUI();
        return this.__ui;
    }
    visualTest(title, buttons) {
        this._ui.startSubgroup(title);
        for (let btn of buttons) {
            this._ui.addVisualTestButton(btn);
        }
    }
}
exports.HTMLUnitTester = HTMLUnitTester;
