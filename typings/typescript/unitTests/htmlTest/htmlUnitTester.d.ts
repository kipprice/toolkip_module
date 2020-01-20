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
export declare class HTMLUnitTester extends UnitTester {
    protected static _instance: HTMLUnitTester;
    private __ui;
    protected get _ui(): HTMLUnitTestUI;
    visualTest(title: string, buttons: IVisualTestButton[]): void;
}
