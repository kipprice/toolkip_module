import { Drawable } from "../../drawable/drawable";
import { IUnitTestElems, VisualResults } from "./_interfaces";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
import { IVisualTestButton } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class   HTMLTest
 * ----------------------------------------------------------------------------
 * Generate a HTML UI for a set of unit tests
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class UI extends Drawable {
    /** drawable associated with this class */
    protected _elems: IUnitTestElems;
    /** styles to use for this unit test */
    protected static _uncoloredStyles: IStandardStyles;
    protected _createElements(): void;
    /**
     * addVisualButton
     * ----------------------------------------------------------------------------
     * Add a button that can render an integration test for verification with the
     * specified details
     */
    addVisualButton(btn: IVisualTestButton): void;
    addTestResult<T>(result: VisualResults<T>): void;
    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Generate a group of unit tests, labeled with the specified name
     */
    startGroup(groupName: string): void;
    /**
     * startSubgroup
     * ----------------------------------------------------------------------------
     * Generate a subgroup of unit tests, labeled with the specified name
     */
    startSubgroup(subgroupName: string): void;
    protected _getParentElement(): HTMLElement;
}
