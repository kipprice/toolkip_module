"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
/**----------------------------------------------------------------------------
 * @class   _TestUI
 * ----------------------------------------------------------------------------
 * Render the appropriate UI for a set of unit tests
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _TestUI {
    constructor() { }
    /**
     * _buildValueString
     * ----------------------------------------------------------------------------
     * Build the string that will show whether the result is a match or not
     *
     * @param	pass			If true, builds the pass string
     * @param	actualResult	The value that was received
     * @param	expectedResult	The value we should have gotten
     *
     * @returns	A string that's appropriate for this test's result
     */
    _buildValueString(result) {
        if (!result.actualResult || !result.expectedResult) {
            return "";
        }
        if (result.pass) {
            return toolkip_primitive_helpers_1.format("'{0}' = '{1}'", result.actualResult, result.expectedResult);
        }
        else {
            return toolkip_primitive_helpers_1.format("'{0}' != '{1}'", result.actualResult, result.expectedResult);
        }
    }
    /**
     * _passToString
     * ----------------------------------------------------------------------------
     * Display whether the test passed or failed
     *
     * @param 	pass	True if the test passed
     *
     * @returns	Display string for the pass result
     */
    _passToString(pass) {
        return (pass ? "pass" : "fail");
    }
}
exports._TestUI = _TestUI;
