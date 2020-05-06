import { _TestUI } from "./testUi";
import { IUnitTestDetails, IVisualTestButton } from "./_interfaces";
import { format } from '@kipprice/toolkip-primitive-helpers';

/**----------------------------------------------------------------------------
 * @class	UnitTestUI
 * ----------------------------------------------------------------------------
 * Generates UI to be able to see the results on unit tests
 * @author	Kip Price
 * @version	2.1.0
 * ----------------------------------------------------------------------------
 */
export abstract class _UnitTester {

	//.....................
	//#region PROPERTIES

	protected abstract get _ui(): _TestUI;

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
	public test(name: string, actualResult: any, expectedResult: any, message?: string): boolean {
		message = message || "";
		let pass: boolean = this.testEquality(actualResult, expectedResult);
		
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
	public assert(name: string, pass: boolean, trueMessage?: string, falseMessage?: string): void {
		let msg: string = pass? trueMessage : falseMessage;
		
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
	public startGroup(groupName: string): void {
		this._ui.startGroup(groupName);
	}

	/**
	 * startSubgroup
	 * ----------------------------------------------------------------------------
	 * Add a separator for subgrouping tests, displayed with the specified name
	 */
	public startSubGroup(subgroupName: string): void {
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
	public testFunction(funcToTest: Function, title: string, tests: IUnitTestDetails[]): void {

		this._ui.startSubgroup(title);

		// Loop through each of the tests and verify each is working
		for (let idx = 0; idx < tests.length; idx += 1) {
			let testDetails: IUnitTestDetails = tests[idx];
			let result: any = funcToTest.apply(window, testDetails.params);
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
	public testEquality(actualResult: any, expectedResult: any): boolean {
		if (actualResult.equals) { return actualResult.equals(expectedResult); }
		else { return (actualResult === expectedResult); }
	}

	//#endregion
	//........................

	//.....................
	//#region VISUAL TESTS

	/**
	 * visualTest
	 * ----------------------------------------------------------------------------
	 * Create an integration test to verify that UI is displaying appropriately
	 * @param   title       Title for the group of buttons
	 * @param   buttons     Buttons to display
	 */
	public abstract visualTest(title: string, buttons: IVisualTestButton[]): void;
	
	//#endregion
	//.....................
	
	//..................
	//#region HELPERS

	protected _getTestName(test: IUnitTestDetails): string {
		if (test.details) { return test.details; }
		
		return format(
			"({0}) ==> {1}",
			test.params.join(", "),
			test.result
		);
	}

	//#endregion
	//..................
}

