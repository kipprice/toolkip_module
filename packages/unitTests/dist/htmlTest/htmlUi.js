"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
/**----------------------------------------------------------------------------
 * @class   HTMLTest
 * ----------------------------------------------------------------------------
 * Generate a HTML UI for a set of unit tests
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class UI extends toolkip_drawable_1._Drawable {
    //#endregion
    //..................
    _createElements() {
        this._groups = [];
        this._elems = {
            base: toolkip_create_elements_1.createElement({
                cls: "tests"
            })
        };
        this._elems.testContainer = toolkip_create_elements_1.createElement({
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
    addVisualButton(btn) {
        let btnElem = toolkip_create_elements_1.createElement({
            cls: "visualTestBtn",
            parent: this._getParentElement(),
            children: [
                { content: btn.label, cls: "innerBtn" }
            ],
            eventListeners: {
                click: () => { btn.callback(); }
            }
        });
    }
    addTestResult(result) {
        let group = this._getParentElement();
        let test = toolkip_create_elements_1.createElement({
            cls: "test",
            parent: group,
            attr: { title: result.value }
        });
        toolkip_create_elements_1.createElement({ cls: result.passStr, content: result.passStr.toUpperCase(), parent: test });
        toolkip_create_elements_1.createElement({ cls: "name", content: result.name, parent: test });
        if (!result.pass) {
            toolkip_create_elements_1.createElement({ cls: "err", content: result.value, parent: test });
            toolkip_create_elements_1.createElement({ cls: "message", content: result.message, parent: test });
        }
    }
    /**
     * startGroup
     * ----------------------------------------------------------------------------
     * Generate a group of unit tests, labeled with the specified name
     */
    startGroup(groupName) {
        let group = toolkip_create_elements_1.createElement({
            cls: "group",
            parent: this._elems.testContainer
        });
        this._groups.push(group);
        // add the name of the group
        toolkip_create_elements_1.createElement({
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
    startSubgroup(subgroupName) {
        // create the title element for this group of elems
        toolkip_create_elements_1.createElement({
            cls: "functionTitle",
            content: subgroupName,
            parent: this._getParentElement()
        });
    }
    _getParentElement() {
        return this._groups[this._groups.length - 1] || this._elems.testContainer;
    }
}
exports.UI = UI;
//#endregion
//.....................
//..................
//#region STYLES
/** styles to use for this unit test */
UI._uncoloredStyles = {
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
        padding: "2px 10px",
        borderRadius: "3px",
        cursor: "pointer",
        width: "auto",
        marginBottom: "8px"
    },
    ".innerBtn": {
        backgroundColor: "#06C",
        display: "inline-block",
        padding: "2px 10px"
    }
};
