import { TestUI } from "./testUi";
import { IUnitTestDetails, IVisualTestButton } from "./_interfaces";
/**----------------------------------------------------------------------------
 * @class	UnitTestUI
 * ----------------------------------------------------------------------------
 * Generates UI to be able to see the results on unit tests
 * @author	Kip Price
 * @version	2.1.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class UnitTester {
    protected abstract get _ui(): TestUI;
    /**
     * _test
     * ----------------------------------------------------------------------------
     * State the result of whether a certain test passed or failed
     * @param 	name 			The name of the assertion
     * @param 	actualResult 	What the result of the test was
     * @param 	expectedResult 	What should have been the result
     * @param 	message 		If provided, the additional message to display
     */
    test(name: string, actualResult: any, expectedResult: any, message?: string): boolean;
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
    assert(name: string, pass: boolean, trueMessage?: string, falseMessage?: string): void;
    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Add a separator for grouping tests, displayed with the specified name
     */
    startGroup(groupName: string): void;
    /**
     * startSubgroup
     * ----------------------------------------------------------------------------
     * Add a separator for subgrouping tests, displayed with the specified name
     */
    startSubGroup(subgroupName: string): void;
    /**
     * testFunction
     * ----------------------------------------------------------------------------
     * Verify various outputs for a particular function
     * @param 	funcToTest 	Function to test results of
     * @param 	title 		Title for the function subgroup
     * @param 	tests 		Tests to evaluate with this function
     *
     */
    protected _testFunction(funcToTest: Function, title: string, tests: IUnitTestDetails[]): void;
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
    testEquality(actualResult: any, expectedResult: any): boolean;
    /**
     * visualTest
     * ----------------------------------------------------------------------------
     * Create an integration test to verify that UI is displaying appropriately
     * @param   title       Title for the group of buttons
     * @param   buttons     Buttons to display
     */
    abstract visualTest(title: string, buttons: IVisualTestButton[]): void;
    protected _getTestName(test: IUnitTestDetails): string;
}
