import { _TestUI } from '../testUi';
import { TestResults } from '../_interfaces';


/**----------------------------------------------------------------------------
 * @class   ConsoleUnitTests
 * ----------------------------------------------------------------------------
 * Run all appropriate unit tests that can run in the console
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class ConsoleUnitTestUI extends _TestUI {

    protected _currentGroup: string;
    protected _currentSubgroup: string;

    /**
     * render
     * ----------------------------------------------------------------------------
     * Renders the result of the test to the console
     */
    public renderTest<T>(result: TestResults<T>): void {
        let content: string = this._buildTestString(result);
        if (result.pass) { console.info(content); }
        else { console.error(content); }
    }
    
    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Generate separator for groups
     */
    public startGroup(groupName: string): void {
        let headerStr: string = "";
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
    public startSubgroup(subgroupName: string): void {
        
        let headerStr: string = "";
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
    protected _buildTestString<T>(result: TestResults<T>): string {
        let content: string = "";
        let value: string = this._buildValueString(result);

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