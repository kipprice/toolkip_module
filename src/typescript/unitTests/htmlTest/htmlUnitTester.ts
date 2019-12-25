import { UnitTester } from "../test";
import { IVisualTestButton } from "./../_interfaces";
import { HTMLUnitTestUI } from "./htmlUnitTestUi";


/**----------------------------------------------------------------------------
 * @class	HTMLUnitTester
 * ----------------------------------------------------------------------------
 * Unit tester that renders results as HTML elements
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class HTMLUnitTester extends UnitTester {
    protected static _instance: HTMLUnitTester;

    private __ui: HTMLUnitTestUI;
    protected get _ui(): HTMLUnitTestUI { 
        if (this.__ui) { return this.__ui; }
        this.__ui = new HTMLUnitTestUI();
        return this.__ui;
    }

    public visualTest(title: string, buttons: IVisualTestButton[]): void {
        this._ui.startSubgroup(title);
        for (let btn of buttons) {
            this._ui.addVisualTestButton(btn);
        }
    }
}