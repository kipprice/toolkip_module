import { _UnitTester } from '@kipprice/toolkip-test";
import { ConsoleUnitTestUI } from "./consoleUnitTestUi";

/**----------------------------------------------------------------------------
 * @class	ConsoleUnitTester
 * ----------------------------------------------------------------------------
 * Unit tester that renders results in the console
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class ConsoleUnitTester extends _UnitTester {
    private __ui: ConsoleUnitTestUI;
    protected get _ui(): ConsoleUnitTestUI { 
        if (this.__ui) { return this.__ui; }
        this.__ui = new ConsoleUnitTestUI();
        return this.__ui;
    }

    public visualTest(title: string): void {
        console.warn(title + " : Visual tests can't be performed through the console")
    }
}


