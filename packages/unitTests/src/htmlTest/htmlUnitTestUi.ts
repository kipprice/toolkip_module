import { _TestUI } from '../testUi';
import { UI } from "./htmlUi";
import { TestResults, IVisualTestButton } from '../_interfaces';
import { VisualResults } from "./_interfaces";

/**----------------------------------------------------------------------------
 * @class   HTMLUnitTestUI
 * ----------------------------------------------------------------------------
 * 
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class HTMLUnitTestUI extends _TestUI {

    //#region PROPERTIES
    protected _drawable: UI;
    
    //#endregion

    /**
     * HTMLUnitTestUI
     * ----------------------------------------------------------------------------
     * Initialize the UI needed for the HTML Unit Tester
     */
    constructor() {
        super();
        this._drawable = new UI();
        this._drawable.draw(document.body);
    }

    /**
     * renderTest
     * ----------------------------------------------------------------------------
     * Show the results of the specified test
     */
    public renderTest<T>(result: TestResults<T>): void {
        let extendedResults: VisualResults<T> = result as VisualResults<T>;

        extendedResults.value = this._buildValueString(result);
        extendedResults.passStr = this._passToString(result.pass);

        this._drawable.addTestResult(extendedResults);
    }

    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Create a group, labeled with the specified test
     */
    public startGroup(groupName: string): void {
        this._drawable.startGroup(groupName);
    }

    public startSubgroup(subgroupName: string): void {
        this._drawable.startSubgroup(subgroupName);
    }

    public addVisualTestButton(btn: IVisualTestButton): void {
        this._drawable.addVisualButton(btn);
    }

}