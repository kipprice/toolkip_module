import { TestUI } from "../testUi";
import { UI } from "./htmlUi";
import { TestResults, IVisualTestButton } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class   HTMLUnitTestUI
 * ----------------------------------------------------------------------------
 *
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class HTMLUnitTestUI extends TestUI {
    protected _drawable: UI;
    /**
     * HTMLUnitTestUI
     * ----------------------------------------------------------------------------
     * Initialize the UI needed for the HTML Unit Tester
     */
    constructor();
    /**
     * renderTest
     * ----------------------------------------------------------------------------
     * Show the results of the specified test
     */
    renderTest<T>(result: TestResults<T>): void;
    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Create a group, labeled with the specified test
     */
    startGroup(groupName: string): void;
    startSubgroup(subgroupName: string): void;
    addVisualTestButton(btn: IVisualTestButton): void;
}
