import { TestUI } from "../testUi";
import { TestResults } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class   ConsoleUnitTests
 * ----------------------------------------------------------------------------
 * Run all appropriate unit tests that can run in the console
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class ConsoleUnitTestUI extends TestUI {
    protected _currentGroup: string;
    protected _currentSubgroup: string;
    /**
     * render
     * ----------------------------------------------------------------------------
     * Renders the result of the test to the console
     */
    renderTest<T>(result: TestResults<T>): void;
    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Generate separator for groups
     */
    startGroup(groupName: string): void;
    /**
     * startSubgroup
     * ----------------------------------------------------------------------------
     * Generate separator for subgroups
     */
    startSubgroup(subgroupName: string): void;
    /**
     * _buildTestString
     * ----------------------------------------------------------------------------
     * Creates a test element for the div with the specified results
     * @returns	The string displaying the result of the test
     */
    protected _buildTestString<T>(result: TestResults<T>): string;
}
