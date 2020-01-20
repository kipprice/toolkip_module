import { UnitTester } from "../test";
import { ConsoleUnitTestUI } from "./consoleUnitTestUi";
/**----------------------------------------------------------------------------
 * @class	ConsoleUnitTester
 * ----------------------------------------------------------------------------
 * Unit tester that renders results in the console
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class ConsoleUnitTester extends UnitTester {
    private __ui;
    protected get _ui(): ConsoleUnitTestUI;
    visualTest(title: string): void;
}
