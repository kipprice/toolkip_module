"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../test");
const consoleUnitTestUi_1 = require("./consoleUnitTestUi");
/**----------------------------------------------------------------------------
 * @class	ConsoleUnitTester
 * ----------------------------------------------------------------------------
 * Unit tester that renders results in the console
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class ConsoleUnitTester extends test_1._UnitTester {
    get _ui() {
        if (this.__ui) {
            return this.__ui;
        }
        this.__ui = new consoleUnitTestUi_1.ConsoleUnitTestUI();
        return this.__ui;
    }
    visualTest(title) {
        console.warn(title + " : Visual tests can't be performed through the console");
    }
}
exports.ConsoleUnitTester = ConsoleUnitTester;
