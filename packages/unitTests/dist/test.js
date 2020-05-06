"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
/**----------------------------------------------------------------------------
 * @class	UnitTestUI
 * ----------------------------------------------------------------------------
 * Generates UI to be able to see the results on unit tests
 * @author	Kip Price
 * @version	2.1.0
 * ----------------------------------------------------------------------------
 */
class _UnitTester {
    //#endregion
    //.....................
    /**
     * _test
     * ----------------------------------------------------------------------------
     * State the result of whether a certain test passed or failed
     * @param 	name 			The name of the assertion
     * @param 	actualResult 	What the result of the test was
     * @param 	expectedResult 	What should have been the result
     * @param 	message 		If provided, the additional message to display
     */
    test(name, actualResult, expectedResult, message) {
        message = message || "";
        let pass = this.testEquality(actualResult, expectedResult);
        this._ui.renderTest({
            name: name,
            pass: pass,
            actualResult: actualResult,
            expectedResult: expectedResult,
            message: message
        });
        return pass;
    }
    /**
     * _assert
     * ----------------------------------------------------------------------------
     * Asserts whether the passed in evaluation is true or false
     *
     * @param 	name 			Name of the test we are running
     * @param 	pass 			Evaluation of pass
     * @param 	trueMessage 	What to show if the evaluation passes
     * @param 	falseMessage 	What to show if the evaluation fails
     */
    assert(name, pass, trueMessage, falseMessage) {
        let msg = pass ? trueMessage : falseMessage;
        this._ui.renderTest({
            name: name,
            pass: pass,
            message: msg
        });
    }
    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Add a separator for grouping tests, displayed with the specified name
     */
    startGroup(groupName) {
        this._ui.startGroup(groupName);
    }
    /**
     * startSubgroup
     * ----------------------------------------------------------------------------
     * Add a separator for subgrouping tests, displayed with the specified name
     */
    startSubGroup(subgroupName) {
        this._ui.startSubgroup(subgroupName);
    }
    /**
     * testFunction
     * ----------------------------------------------------------------------------
     * Verify various outputs for a particular function
     * @param 	funcToTest 	Function to test results of
     * @param 	title 		Title for the function subgroup
     * @param 	tests 		Tests to evaluate with this function
     *
     */
    testFunction(funcToTest, title, tests) {
        this._ui.startSubgroup(title);
        // Loop through each of the tests and verify each is working
        for (let idx = 0; idx < tests.length; idx += 1) {
            let testDetails = tests[idx];
            let result = funcToTest.apply(window, testDetails.params);
            this.test(this._getTestName(testDetails), result, testDetails.result);
        }
    }
    //........................
    //#region EQUALITY TEST
    /**
     * testEquality
     * ----------------------------------------------------------------------------
     * Check if the actual and expected results actually match
     *
     * @param actualResult 		What the test returned
     * @param expectedResult 	What the test should have returned
     *
     * @returns	True if the actual result matches the expected result
     */
    testEquality(actualResult, expectedResult) {
        if (actualResult.equals) {
            return actualResult.equals(expectedResult);
        }
        else {
            return (actualResult === expectedResult);
        }
    }
    //#endregion
    //.....................
    //..................
    //#region HELPERS
    _getTestName(test) {
        if (test.details) {
            return test.details;
        }
        return toolkip_primitive_helpers_1.format("({0}) ==> {1}", test.params.join(", "), test.result);
    }
}
exports._UnitTester = _UnitTester;
