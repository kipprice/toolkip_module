import { _Drawable } from "@toolkip/drawable";
import { IUnitTestElems, VisualResults } from "./_interfaces";
import { IStandardStyles } from "@toolkip/style-helpers";
import { IVisualTestButton } from '../_interfaces';
import { createElement } from "@toolkip/create-elements";

/**----------------------------------------------------------------------------
 * @class   HTMLTest
 * ----------------------------------------------------------------------------
 * Generate a HTML UI for a set of unit tests
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class UI extends _Drawable {

    //.....................
    //#region PROPERTIES

    /** drawable associated with this class */
    protected _elems: IUnitTestElems;

    protected _groups: HTMLElement[];

    //#endregion
    //.....................

    //..................
    //#region STYLES

    /** styles to use for this unit test */
    protected static _uncoloredStyles: IStandardStyles = {
        ".hidden": {
            display: "none"
        },

        ".group": {
            marginBottom: "10px",
            display: "#666",
            borderCollapse: "collapse",
            width: "20%"
        },

        ".groupName": {
            fontSize: "1.6em",
            color: "#666"
        },

        ".functionTitle": {
            fontSize: "1.3em",
            color: "#888",
            marginLeft: "5px"
        },

        ".tests": {
            marginLeft: "50px",
            fontFamily: "OpenSans, Segoe UI, Calibri, Helvetica"
        },

        ".tests .testContainer": {
            display: "flex",
            flexWrap: "wrap"
        },

        ".test": {
            display: "table-row",

            nested: {
                "> div": {
                    border: "solid transparent",
                    borderWidth: "10px",
                    borderRightWidth: "20px",
                    marginRight: "10px",
                    display: "table-cell"
                },

                ".fail": {
                    color: "rgb(190,50,30)",
                    fontWeight: "bold"
                },

                ".pass": {
                    color: "rgb(50,190,30)",
                    fontWeight: "bold",
                    marginRight: "10px",
                    display: "table-cell"
                },

                ".name": {
                    color: "#333",
                    marginRight: "10px",
                    display: "table-cell"
                },

                ".err": {
                    fontStyle: "italic",
                    color: "#666",
                    fontSize: "0.8em"
                },
        
                ".message": {
                    color: "#888",
                    marginRight: "10px",
                    display: "table-cell"
                }
            }
        },

        ".visualTestBtn": {
            color: "#FFF",
            cursor: "pointer",
            width: "auto",
            margin: "1rem 0",
        },

        ".innerBtn": {
            backgroundColor: "#06C",
            display: "inline-block",
            borderRadius: '50px',
            padding: "0.3rem 1rem",
        }
    }

    //#endregion
    //..................

    protected _createElements(): void {
        this._groups = [];

        this._elems = {
            base: createElement({
                cls: "tests"
            })
        } as IUnitTestElems;

        this._elems.testContainer = createElement({
            cls: "testContainer",
            parent: this._elems.base
        });
    }

    /**
     * addVisualButton
     * ----------------------------------------------------------------------------
     * Add a button that can render an integration test for verification with the 
     * specified details
     */
    public addVisualButton(btn: IVisualTestButton): void {

        let btnElem: HTMLElement = createElement({ 
            cls: "visualTestBtn", 
            parent: this._getParentElement(), 
            children: [
                { content: btn.label, cls: "innerBtn" }
            ],
            eventListeners:{
                click: () => { btn.callback(btnElem); }
            }
        });
    }

    public addTestResult<T>(result: VisualResults<T>): void {
        let group: HTMLElement = this._getParentElement();

        let test: HTMLElement = createElement({ 
            cls: "test", 
            parent: group, 
            attr: { title: result.value } 
        });

        createElement({ cls: result.passStr, content: result.passStr.toUpperCase(), parent: test });
        createElement({ cls: "name", content: result.name, parent: test });

        if (!result.pass) {
            createElement({ cls: "err", content: result.value, parent: test });
            createElement({ cls: "message", content: result.message, parent: test });
        }
    }

    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Generate a group of unit tests, labeled with the specified name
     */
    public startGroup(groupName: string): void {
        let group: HTMLElement = createElement({ 
            cls: "group", 
            parent: this._elems.testContainer 
        });
        this._groups.push(group);
        
        // add the name of the group
        createElement({ 
            cls: "groupName", 
            parent: group, 
            content: groupName 
        });
    }

    /**
     * startSubgroup
     * ----------------------------------------------------------------------------
     * Generate a subgroup of unit tests, labeled with the specified name
     */
    public startSubgroup(subgroupName: string): void {
        // create the title element for this group of elems
        createElement({ 
            cls: "functionTitle", 
            content: subgroupName, 
            parent: this._getParentElement()
        });
    }

    protected _getParentElement(): HTMLElement {
        return this._groups[this._groups.length - 1] || this._elems.testContainer;
    }


}